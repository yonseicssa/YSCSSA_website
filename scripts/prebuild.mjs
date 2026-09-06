/**
 * 构建前生成三样东西：
 * 1. src/generated/git-updated.json —— 每个内容文件最后一次提交时间。
 *    新生指南的「最后更新」由此自动取得，编辑无需填写，也就不会被遗忘（PRD 4.4）。
 *    构建环境没有 git 历史（浅克隆）时回退到 frontmatter 的 updated 字段。
 * 2. public/images/wallpaper/generated/ 与 src/generated/wallpaper.json ——
 *    由后台上传的一张壁纸原图生成桌面与移动两种尺寸，编辑无需自己压缩（PRD 4.1）。
 * 3. public/guide-index.json —— 指南搜索索引。
 *    静态站的搜索在浏览器端执行，常见方案按空格分词，中文会搜不到；
 *    这里直接输出标题、摘要与正文纯文本，前端做子串匹配（PRD 4.4）。
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, extname, join, relative } from 'node:path';
import matter from 'gray-matter';
import sharp from 'sharp';

const root = process.cwd();
const contentDir = join(root, 'src/content');

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

// ---- 1. git 最后提交时间 ----
const gitUpdated = {};
for (const file of walk(contentDir)) {
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
    if (iso) gitUpdated[relative(root, file)] = iso;
  } catch {
    // 没有 git 或没有历史：跳过，使用 frontmatter 的值
  }
}
mkdirSync(join(root, 'src/generated'), { recursive: true });
writeFileSync(join(root, 'src/generated/git-updated.json'), JSON.stringify(gitUpdated, null, 2) + '\n');

// ---- 2. 首页壁纸：一张原图 → 桌面与移动两种尺寸（PRD 4.1）----
// 编辑只需上传一张原图，压缩与切尺寸由构建完成，避免每次换壁纸都要手工处理图片。
// 浏览器按屏幕宽度自动选择（见 components/views/Home.tsx 的 <picture>）。
const WALLPAPER_VARIANTS = [
  { key: 'desktop', longEdge: 2400, maxBytes: 300 * 1024 },
  { key: 'mobile', longEdge: 1200, maxBytes: 120 * 1024 }
];
// PRD 的体积上限是验收硬指标（也直接决定 7.1 的首屏 3 秒与 1.5MB 页面预算），
// 所以先降质量、再缩尺寸，两级都试完仍超标才让构建失败。
// 先降质量：画质下降不易察觉，尺寸变化会。
const WEBP_QUALITIES = [82, 74, 66, 58, 50, 42];
// 质量降到底仍超标时再按比例缩尺寸。细节极密的原图（如大面积树叶、人群、噪点）
// 才会走到这里；普通校园照片在 1 倍尺寸就能满足。
const SCALE_STEPS = [1, 0.85, 0.7, 0.55];
const wallpaperOutDir = join(root, 'public/images/wallpaper/generated');

class WallpaperTooLargeError extends Error {}

const siteSettings = JSON.parse(readFileSync(join(contentDir, 'settings/site.json'), 'utf8'));
const wallpaperSource = join(root, 'public', siteSettings.wallpaper.replace(/^\//, ''));

let wallpaperManifest = { desktop: siteSettings.wallpaper, mobile: null, width: null, height: null };

rmSync(wallpaperOutDir, { recursive: true, force: true });

if (!existsSync(wallpaperSource)) {
  console.warn(`[prebuild] 壁纸原图不存在：${siteSettings.wallpaper}，本次不生成响应式尺寸`);
} else {
  try {
    mkdirSync(wallpaperOutDir, { recursive: true });
    const base = basename(wallpaperSource, extname(wallpaperSource));

    const source = sharp(wallpaperSource);

    for (const variant of WALLPAPER_VARIANTS) {
      let chosen = null;
      let scale = 1;

      search: for (const step of SCALE_STEPS) {
        const longEdge = Math.round(variant.longEdge * step);
        for (const quality of WEBP_QUALITIES) {
          const result = await source
            .clone()
            .resize({ width: longEdge, height: longEdge, fit: 'inside', withoutEnlargement: true })
            .webp({ quality, effort: 6, smartSubsample: true })
            .toBuffer({ resolveWithObject: true });
          chosen = result;
          scale = step;
          if (result.data.length <= variant.maxBytes) break search;
        }
      }

      const cap = Math.round(variant.maxBytes / 1024);
      if (chosen.data.length > variant.maxBytes) {
        // 带着超标的壁纸上线会直接违反验收标准，因此在这里挡住：
        // 构建失败意味着这次改动不会部署，线上仍是上一版，编辑能看到原因。
        throw new WallpaperTooLargeError(
          `壁纸「${siteSettings.wallpaper}」压到 ${chosen.info.width}x${chosen.info.height} ` +
            `仍有 ${Math.round(chosen.data.length / 1024)}KB，超过 ${variant.key} 的 ${cap}KB 上限。` +
            `请换一张细节没那么密集的照片（PRD 4.1）。`
        );
      }

      const fileName = `${base}-${variant.longEdge}.webp`;
      writeFileSync(join(wallpaperOutDir, fileName), chosen.data);
      wallpaperManifest[variant.key] = `/images/wallpaper/generated/${fileName}`;
      if (variant.key === 'desktop') {
        wallpaperManifest.width = chosen.info.width;
        wallpaperManifest.height = chosen.info.height;
      }

      const kb = Math.round(chosen.data.length / 1024);
      const note = scale < 1 ? `，为满足体积上限已缩至 ${Math.round(scale * 100)}%` : '';
      console.log(
        `[prebuild] 壁纸 ${variant.key} ${chosen.info.width}x${chosen.info.height} ${kb}KB（上限 ${cap}KB）${note}`
      );
    }
  } catch (error) {
    // 体积超标是内容问题，必须让构建失败，不能悄悄带着超标的壁纸上线
    if (error instanceof WallpaperTooLargeError) throw error;
    // 其余情况（格式不支持等）不阻断构建：页面回退到原图，站点仍可用，日志里留下原因
    console.warn(`[prebuild] 壁纸处理失败，回退到原图：${error.message}`);
    wallpaperManifest = { desktop: siteSettings.wallpaper, mobile: null, width: null, height: null };
  }
}

writeFileSync(join(root, 'src/generated/wallpaper.json'), JSON.stringify(wallpaperManifest, null, 2) + '\n');

// ---- 3. 指南搜索索引 ----
const guidesDir = join(contentDir, 'guides');
const index = readdirSync(guidesDir)
  .filter((name) => name.endsWith('.md'))
  .map((name) => {
    const { data, content } = matter(readFileSync(join(guidesDir, name), 'utf8'));
    return {
      slug: data.slug,
      title: data.title,
      summary: data.summary,
      text: content
        .replace(/<!--[\s\S]*?-->/g, ' ')
        .replace(/[#>*`_[\]()!-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase()
    };
  });
writeFileSync(join(root, 'public/guide-index.json'), JSON.stringify(index) + '\n');

console.log(`[prebuild] git 时间 ${Object.keys(gitUpdated).length} 条，搜索索引 ${index.length} 篇`);

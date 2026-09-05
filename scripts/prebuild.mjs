/**
 * 构建前生成两个文件：
 * 1. src/generated/git-updated.json —— 每个内容文件最后一次提交时间。
 *    新生指南的「最后更新」由此自动取得，编辑无需填写，也就不会被遗忘（PRD 4.4）。
 *    构建环境没有 git 历史（浅克隆）时回退到 frontmatter 的 updated 字段。
 * 2. public/guide-index.json —— 指南搜索索引。
 *    静态站的搜索在浏览器端执行，常见方案按空格分词，中文会搜不到；
 *    这里直接输出标题、摘要与正文纯文本，前端做子串匹配（PRD 4.4）。
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import matter from 'gray-matter';

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

// ---- 2. 指南搜索索引 ----
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

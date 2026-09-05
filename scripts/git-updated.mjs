/**
 * 生成 src/generated/git-updated.json：每个内容文件最后一次提交的时间。
 * 新生指南的「最后更新」由此自动取得，编辑无需填写，也就不会被遗忘（PRD 4.4）。
 * 若构建环境没有 git 历史（浅克隆），则回退到 frontmatter 里的 updated 字段。
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const contentDir = join(root, 'src/content');
const outFile = join(root, 'src/generated/git-updated.json');

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

const result = {};
for (const file of walk(contentDir)) {
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
    if (iso) result[relative(root, file)] = iso;
  } catch {
    // 没有 git 或没有历史：跳过，使用 frontmatter 的值
  }
}

mkdirSync(join(root, 'src/generated'), { recursive: true });
writeFileSync(outFile, JSON.stringify(result, null, 2) + '\n');
console.log(`[git-updated] ${Object.keys(result).length} 个内容文件`);

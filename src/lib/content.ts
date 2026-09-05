import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { z } from 'zod';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

marked.setOptions({ gfm: true, breaks: false });

function readMarkdownDir(dir: string): { id: string; filePath: string; raw: string }[] {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((name) => name.endsWith('.md'))
    .sort()
    .map((name) => ({
      id: name.replace(/\.md$/, ''),
      filePath: path.join('src/content', dir, name),
      raw: fs.readFileSync(path.join(full, name), 'utf8')
    }));
}

function parse<T extends z.ZodTypeAny>(
  schema: T,
  entry: { id: string; filePath: string; raw: string }
): { id: string; filePath: string; data: z.infer<T>; html: string; body: string } {
  const { data, content } = matter(entry.raw);
  const result = schema.safeParse(data);
  if (!result.success) {
    // 内容有问题时直接让构建失败，避免带着坏数据上线
    throw new Error(`内容格式错误 ${entry.filePath}：\n${JSON.stringify(result.error.format(), null, 2)}`);
  }
  return {
    id: entry.id,
    filePath: entry.filePath,
    data: result.data,
    html: marked.parse(content) as string,
    body: content
  };
}

/* ------------------------------ 活动（PRD 4.3） ------------------------------ */

export const eventSchema = z.object({
  title: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  location: z.string(),
  cover: z.string(),
  coverAlt: z.string(),
  gallery: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
  pinned: z.boolean().default(false),
  // 置顶超过 3 条时按此时间取最近的 3 条（PRD 4.3 列表页）
  pinnedAt: z.coerce.date().optional()
});

export type EventEntry = ReturnType<typeof getEvents>[number];

export function getEvents() {
  return readMarkdownDir('events').map((entry) => parse(eventSchema, entry));
}

/* ---------------------------- 新生指南（PRD 4.4） ---------------------------- */

export const guideSchema = z.object({
  title: z.string(),
  // URL 短名：英文小写加连字符，发布后不得修改（PRD 2.2 / 4.4）
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, '短名只能使用小写英文、数字与连字符'),
  summary: z.string().max(120),
  weight: z.number().optional(),
  // 由后台保存时写入；网站优先显示 git 提交时间（见 lib/guides.ts）
  updated: z.coerce.date()
});

export type GuideEntry = ReturnType<typeof getGuides>[number];

export function getGuides() {
  return readMarkdownDir('guides').map((entry) => parse(guideSchema, entry));
}

/* ------------------------ 可在后台编辑的静态页面文案 ------------------------ */

export const pageSchema = z.object({
  lang: z.enum(['zh', 'ko']),
  // SEO：每页独立标题与描述（PRD 7.3）
  seoTitle: z.string(),
  seoDescription: z.string(),
  heading: z.string(),
  subheading: z.string().optional()
});

export type PageEntry = ReturnType<typeof getPage>;

export function getPage(lang: 'zh' | 'ko', name: 'home' | 'about' | 'partnership') {
  const filePath = path.join('src/content/pages', lang, `${name}.md`);
  const raw = fs.readFileSync(path.join(process.cwd(), filePath), 'utf8');
  return parse(pageSchema, { id: `${lang}/${name}`, filePath, raw });
}

/* --------------------------- 组织架构（PRD 4.2） --------------------------- */

export const departmentSchema = z.object({
  order: z.number().default(99),
  name: z.object({ zh: z.string(), ko: z.string() }),
  description: z.object({ zh: z.string(), ko: z.string() }),
  members: z
    .array(
      z.object({
        name: z.string(), // 中文原文，不作转写（PRD 3.1）
        role: z.object({ zh: z.string(), ko: z.string() }),
        photo: z.string().optional(),
        // 上线前须逐一取得本人同意并存档（PRD 4.2）
        consent: z.boolean().default(false)
      })
    )
    .default([])
});

export type DepartmentEntry = ReturnType<typeof getDepartments>[number];

export function getDepartments() {
  return readMarkdownDir('departments')
    .map((entry) => parse(departmentSchema, entry))
    .sort((a, b) => a.data.order - b.data.order);
}

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { z } from 'zod';
import { iconNames } from '@/components/Icon';

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
  gallery: z.array(z.object({ src: z.string(), alt: z.string() })).default([])
  // 不设「置顶」开关：主打活动全站唯一，在站点设置中指定（PRD 4.3）
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

/**
 * 合作与赞助页在通用页面文案之外，还带一组「合作方式」卡片（PRD 4.5）。
 * 分线上宣传与线下合作两组：这两类合作在赞助商一侧往往对应不同的
 * 预算科目与决策人，分组可帮助对方快速定位。
 */
export const partnershipSchema = pageSchema.extend({
  offerings: z
    .array(
      z.object({
        group: z.enum(['online', 'offline']),
        title: z.string(),
        description: z.string()
      })
    )
    .default([])
});

export type PartnershipEntry = ReturnType<typeof getPartnershipPage>;

export function getPartnershipPage(lang: 'zh' | 'ko') {
  const filePath = path.join('src/content/pages', lang, 'partnership.md');
  const raw = fs.readFileSync(path.join(process.cwd(), filePath), 'utf8');
  return parse(partnershipSchema, { id: `${lang}/partnership`, filePath, raw });
}

export function getPage(lang: 'zh' | 'ko', name: 'home' | 'about' | 'partnership') {
  const filePath = path.join('src/content/pages', lang, `${name}.md`);
  const raw = fs.readFileSync(path.join(process.cwd(), filePath), 'utf8');
  return parse(pageSchema, { id: `${lang}/${name}`, filePath, raw });
}

/* --------------------------- 组织架构（PRD 4.2） --------------------------- */

/**
 * 组织架构只呈现部门与小组结构：一期不展示成员姓名与照片（PRD 4.2）。
 * 这同时消除了个人信息处理的合规要求，也使本页免于每次换届重做。
 */
export const departmentSchema = z.object({
  order: z.number().default(99),
  // 会长团为通栏卡片，横跨页面宽度置于顶部；通栏形态本身即表达其位于上一层级（PRD 4.2）
  leadership: z.boolean().default(false),
  name: z.object({ zh: z.string(), ko: z.string() }),
  description: z.object({ zh: z.string(), ko: z.string() }),
  // 部门可配图标，不使用照片：风格统一、体积小、无版权风险且不会过期（PRD 4.2）
  icon: z.enum(iconNames).optional(),
  // 小组的变动频率高于部门，须在后台可编辑，不得写死在代码中（PRD 4.2）
  groups: z.array(z.object({ zh: z.string(), ko: z.string() })).default([])
});

export type DepartmentEntry = ReturnType<typeof getDepartments>[number];

export function getDepartments() {
  return readMarkdownDir('departments')
    .map((entry) => parse(departmentSchema, entry))
    .sort((a, b) => a.data.order - b.data.order);
}

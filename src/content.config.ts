import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** 活动（PRD 4.3 字段定义） */
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    location: z.string(),
    cover: z.string(),
    coverAlt: z.string(),
    gallery: z
      .array(z.object({ src: z.string(), alt: z.string() }))
      .default([]),
    pinned: z.boolean().default(false),
    // 置顶超过 3 条时按此时间取最近的 3 条（PRD 4.3 列表页）
    pinnedAt: z.coerce.date().optional()
  })
});

/** 新生指南（PRD 4.4 字段定义） */
const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    // URL 短名：英文小写加连字符，发布后不得修改（PRD 2.2 / 4.4）
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, '短名只能使用小写英文、数字与连字符'),
    summary: z.string().max(120),
    weight: z.number().optional(),
    // 由后台保存时自动写入，编辑无需填写（PRD 4.4）
    updated: z.coerce.date()
  })
});

/** 可在后台编辑的静态页面文案（首页简介 / 关于我们 / 合作与赞助），中韩各一份 */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    lang: z.enum(['zh', 'ko']),
    // SEO：每页独立标题与描述（PRD 7.3）
    seoTitle: z.string(),
    seoDescription: z.string(),
    heading: z.string(),
    subheading: z.string().optional()
  })
});

/** 组织架构：部门与成员（PRD 4.2） */
const departments = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/departments' }),
  schema: z.object({
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
  })
});

export const collections = { events, guides, pages, departments };

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { orderedGuides } from '../lib/guides';

/**
 * 新生指南搜索索引（PRD 4.4）。
 * 静态站的搜索在浏览器端执行，多数现成方案依赖空格分词，中文会搜不到结果；
 * 这里直接输出标题、摘要与正文纯文本，前端用子串匹配，中文关键词必定可检索。
 */
export const GET: APIRoute = async () => {
  const guides = orderedGuides(await getCollection('guides'));

  const index = guides.map((guide) => ({
    slug: guide.data.slug,
    title: guide.data.title,
    summary: guide.data.summary,
    text: guide.body
      ?.replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/[#>*`_\[\]()!-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase()
  }));

  return new Response(JSON.stringify(index), {
    headers: { 'content-type': 'application/json; charset=utf-8' }
  });
};

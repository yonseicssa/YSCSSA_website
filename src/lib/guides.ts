import type { CollectionEntry } from 'astro:content';
import gitUpdated from '../generated/git-updated.json';

export type GuideEntry = CollectionEntry<'guides'>;

/**
 * 排序权重升序；权重相同或均为空时按最后更新日期降序（PRD 4.4）。
 * 用手动权重而非日期，是因为指南存在内在阅读顺序。
 */
/**
 * 最后更新时间优先取 git 最后一次提交时间（由 scripts/git-updated.mjs 生成），
 * 构建环境没有 git 历史时回退到 frontmatter 的 updated 字段。
 */
export function effectiveUpdated(guide: GuideEntry): Date {
  const map = gitUpdated as Record<string, string>;
  const iso = guide.filePath ? map[guide.filePath] : undefined;
  return iso ? new Date(iso) : guide.data.updated;
}

export function orderedGuides(guides: GuideEntry[]): GuideEntry[] {
  return [...guides].sort((a, b) => {
    const aw = a.data.weight ?? Number.MAX_SAFE_INTEGER;
    const bw = b.data.weight ?? Number.MAX_SAFE_INTEGER;
    if (aw !== bw) return aw - bw;
    return effectiveUpdated(b).getTime() - effectiveUpdated(a).getTime();
  });
}

/** 对外只显示到月份（PRD 4.4） */
export function updatedLabel(date: Date, lang: 'zh' | 'ko'): string {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  return lang === 'zh' ? `${y} 年 ${m} 月` : `${y}년 ${m}월`;
}

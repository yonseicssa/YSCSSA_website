import { buildSlugMap, effectiveEnd, orderedEvents, pinnedEvents, statusOf, type EventEntry } from './events';
import { formatDateRange } from './date';
import { imageUrl } from './images';
import type { EventCardData } from './eventOrder';
import type { Lang } from '@/i18n/ui';

/** 把内容条目转成可以传给客户端组件的纯数据 */
export function toCards(events: EventEntry[], lang: Lang): EventCardData[] {
  const slugs = buildSlugMap(events);
  const pinnedIds = new Set(pinnedEvents(events).map((event) => event.id));

  return events.map((event) => ({
    slug: slugs.get(event.id)!,
    title: event.data.title,
    location: event.data.location,
    cover: imageUrl(event.data.cover),
    coverAlt: event.data.coverAlt,
    startISO: event.data.startDate.toISOString(),
    endISO: effectiveEnd(event).toISOString(),
    // 置顶最多 3 条的规则在构建期应用，前端只负责排序
    pinned: pinnedIds.has(event.id),
    dateLabel: formatDateRange(event.data.startDate, event.data.endDate, lang),
    initialEnded: statusOf(event) === 'ended'
  }));
}

/** 按 PRD 顺序排好的卡片（置顶 → 即将举行升序 → 已结束降序） */
export function orderedCards(events: EventEntry[], lang: Lang): EventCardData[] {
  const ordered = orderedEvents(events);
  const bySlug = new Map(toCards(events, lang).map((card) => [card.slug, card]));
  const slugs = buildSlugMap(events);
  return ordered.map((event) => bySlug.get(slugs.get(event.id)!)!);
}

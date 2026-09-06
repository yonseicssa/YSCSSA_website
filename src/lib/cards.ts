import { buildSlugMap, effectiveEnd, featuredEvent, statusOf, type EventEntry } from './events';
import { formatDateRange } from './date';
import { imageUrl } from './images';
import type { EventCardData } from './eventOrder';
import type { Lang } from '@/i18n/ui';

/**
 * 把内容条目转成可以传给客户端组件的纯数据。
 * 这里不排序：顺序一律由 lib/eventOrder.ts 的纯函数决定，
 * 服务端与浏览器用同一套逻辑，首屏与挂载后不会出现两种结果。
 */
export function toCards(events: EventEntry[], lang: Lang): EventCardData[] {
  const slugs = buildSlugMap(events);
  const featuredId = featuredEvent(events)?.id ?? null;

  return events.map((event) => ({
    slug: slugs.get(event.id)!,
    title: event.data.title,
    location: event.data.location,
    cover: imageUrl(event.data.cover),
    coverAlt: event.data.coverAlt,
    startISO: event.data.startDate.toISOString(),
    endISO: effectiveEnd(event).toISOString(),
    featured: event.id === featuredId,
    dateLabel: formatDateRange(event.data.startDate, event.data.endDate, lang),
    initialEnded: statusOf(event) === 'ended'
  }));
}

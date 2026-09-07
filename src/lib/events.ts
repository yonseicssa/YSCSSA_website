import type { EventEntry } from './content';
import { endOfDayIfDateOnly, isoDate } from './date';
import { settings } from './settings';

export type { EventEntry };
export type EventStatus = 'upcoming' | 'ended';

/**
 * 活动详情 URL 由系统按开始日期自动生成（PRD 2.2）。
 * 同一天多场活动时，第二场起追加序号：/events/2026-11-15-2
 */
export function buildSlugMap(events: EventEntry[]): Map<string, string> {
  const byDate = new Map<string, EventEntry[]>();
  for (const event of events) {
    const key = isoDate(event.data.startDate);
    byDate.set(key, [...(byDate.get(key) ?? []), event]);
  }

  const slugs = new Map<string, string>();
  for (const [date, sameDay] of byDate) {
    // 同日多场时按文件 id 排序，保证每次构建生成的 URL 稳定不变
    const stable = [...sameDay].sort((a, b) => a.id.localeCompare(b.id));
    stable.forEach((event, index) => {
      slugs.set(event.id, index === 0 ? date : `${date}-${index + 1}`);
    });
  }
  return slugs;
}

/** 结束日期未填写时取开始日期；只填到日期时视为当天结束（PRD 4.3 状态判定） */
export function effectiveEnd(event: EventEntry): Date {
  return endOfDayIfDateOnly(new Date(event.data.endDate ?? event.data.startDate));
}

export function statusOf(event: EventEntry, now: Date = new Date()): EventStatus {
  return effectiveEnd(event).getTime() > now.getTime() ? 'upcoming' : 'ended';
}

/**
 * 主打活动：全站唯一，在站点设置中指定，不做成每场活动的开关（PRD 4.3）。
 * 设置项天然保证唯一性；指向的活动被删除时视为未设置，横幅整块隐藏。
 */
export function featuredEvent(events: EventEntry[]): EventEntry | null {
  const id = settings.featuredEvent?.trim();
  if (!id) return null;
  return events.find((event) => event.id === id) ?? null;
}

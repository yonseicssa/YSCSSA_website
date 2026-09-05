import type { EventEntry } from './content';

export type { EventEntry };
export type EventStatus = 'upcoming' | 'ended';

const MAX_PINNED = 3;

function ymd(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * 活动详情 URL 由系统按开始日期自动生成（PRD 2.2）。
 * 同一天多场活动时，第二场起追加序号：/events/2026-11-15-2
 */
export function buildSlugMap(events: EventEntry[]): Map<string, string> {
  const byDate = new Map<string, EventEntry[]>();
  for (const event of events) {
    const key = ymd(event.data.startDate);
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

/** 结束日期未填写时取开始日期（PRD 4.3 状态判定） */
export function effectiveEnd(event: EventEntry): Date {
  const end = event.data.endDate ?? event.data.startDate;
  // 只填到日期时，视为当天 23:59:59 结束
  const d = new Date(end);
  if (d.getHours() === 0 && d.getMinutes() === 0 && d.getSeconds() === 0) {
    d.setHours(23, 59, 59, 999);
  }
  return d;
}

export function statusOf(event: EventEntry, now: Date = new Date()): EventStatus {
  return effectiveEnd(event).getTime() > now.getTime() ? 'upcoming' : 'ended';
}

/** 置顶最多 3 条；超出时取最近置顶的 3 条，其余自动失效（PRD 4.3） */
export function pinnedEvents(events: EventEntry[]): EventEntry[] {
  return events
    .filter((e) => e.data.pinned)
    .sort((a, b) => {
      const at = (a.data.pinnedAt ?? a.data.startDate).getTime();
      const bt = (b.data.pinnedAt ?? b.data.startDate).getTime();
      return bt - at;
    })
    .slice(0, MAX_PINNED);
}

/**
 * 列表页顺序：置顶（不参与分组）→ 即将举行（开始日期升序）→ 已结束（开始日期降序）
 */
export function orderedEvents(events: EventEntry[], now: Date = new Date()): EventEntry[] {
  const pinned = pinnedEvents(events);
  const pinnedIds = new Set(pinned.map((e) => e.id));
  const rest = events.filter((e) => !pinnedIds.has(e.id));

  const upcoming = rest
    .filter((e) => statusOf(e, now) === 'upcoming')
    .sort((a, b) => a.data.startDate.getTime() - b.data.startDate.getTime());
  const ended = rest
    .filter((e) => statusOf(e, now) === 'ended')
    .sort((a, b) => b.data.startDate.getTime() - a.data.startDate.getTime());

  return [...pinned, ...upcoming, ...ended];
}

/**
 * 首页固定 3 条的填充顺序（PRD 4.1）：
 * 置顶优先（最多 3 条）→ 即将举行按开始日期升序 → 不足时用已结束按开始日期降序补齐
 */
export function homeEvents(events: EventEntry[], now: Date = new Date()): EventEntry[] {
  return orderedEvents(events, now).slice(0, 3);
}

/**
 * 前端可用的活动排序（与 lib/events.ts 的服务端逻辑一致，但只依赖可序列化的数据）。
 * 状态与分组必须在浏览器打开时按当前时间算，静态站不会自动重新构建（PRD 4.3）。
 */
export type EventCardData = {
  slug: string;
  title: string;
  location: string;
  cover: string;
  coverAlt: string;
  /** 结束时间（未填结束日期时为开始当天 23:59:59），ISO 字符串 */
  endISO: string;
  startISO: string;
  /** 已按 PRD「最多 3 条」规则筛选过的置顶标记 */
  pinned: boolean;
  dateLabel: string;
  /** 构建时算出的状态，用于首屏 HTML；挂载后由浏览器按当前时间重算 */
  initialEnded: boolean;
};

export function isEnded(card: EventCardData, now: number): boolean {
  return Date.parse(card.endISO) <= now;
}

/** 置顶在最前（不参与分组）→ 即将举行按开始日期升序 → 已结束按开始日期降序 */
export function orderCards(cards: EventCardData[], now: number): EventCardData[] {
  const pinned = cards.filter((card) => card.pinned);
  const rest = cards.filter((card) => !card.pinned);

  const upcoming = rest
    .filter((card) => !isEnded(card, now))
    .sort((a, b) => Date.parse(a.startISO) - Date.parse(b.startISO));
  const ended = rest
    .filter((card) => isEnded(card, now))
    .sort((a, b) => Date.parse(b.startISO) - Date.parse(a.startISO));

  return [...pinned, ...upcoming, ...ended];
}

/**
 * 前端可用的活动排序（不依赖 node 环境，只吃可序列化的数据）。
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
  /** 是否为站点设置指定的主打活动（PRD 4.3） */
  featured: boolean;
  dateLabel: string;
  /** 构建时算出的状态，用于首屏 HTML；挂载后由浏览器按当前时间重算 */
  initialEnded: boolean;
};

/** now 为 null 时用构建期算好的状态（首屏 HTML），挂载后传入当前时间重算（PRD 4.3） */
export function isEnded(card: EventCardData, now: number | null): boolean {
  return now === null ? card.initialEnded : Date.parse(card.endISO) <= now;
}

/** 即将举行：开始日期升序（离现在越近越靠前） */
export function upcomingCards(cards: EventCardData[], now: number | null): EventCardData[] {
  return cards
    .filter((card) => !isEnded(card, now))
    .sort((a, b) => Date.parse(a.startISO) - Date.parse(b.startISO));
}

/** 已结束：开始日期降序（离现在越近越靠前） */
export function endedCards(cards: EventCardData[], now: number | null): EventCardData[] {
  return cards
    .filter((card) => isEnded(card, now))
    .sort((a, b) => Date.parse(b.startISO) - Date.parse(a.startISO));
}

/**
 * 列表顺序：即将举行升序 → 已结束降序（PRD 4.3）。
 * 主打活动不作特殊处理，正常出现在列表中——横幅是独立模块，不属于列表。
 */
export function orderCards(cards: EventCardData[], now: number | null): EventCardData[] {
  return [...upcomingCards(cards, now), ...endedCards(cards, now)];
}

/**
 * 首页近期活动固定 3 条（PRD 4.1）：
 * 主打活动占第一格 → 其余位置由即将举行按开始日期升序填充 → 仍不足 3 条时用已结束按开始日期降序补齐。
 * 未设置主打活动时，三格全部按即将举行、已结束的顺序填充。
 */
export function homeCards(cards: EventCardData[], now: number | null): EventCardData[] {
  const featured = cards.find((card) => card.featured) ?? null;
  const rest = featured ? cards.filter((card) => card.slug !== featured.slug) : cards;
  return [...(featured ? [featured] : []), ...orderCards(rest, now)].slice(0, 3);
}

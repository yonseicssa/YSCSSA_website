import type { Lang } from '../i18n/ui';

/**
 * 站点时区固定为首尔（UTC+9，无夏令时）：读者、活动与学联都在韩国。
 *
 * 必须显式指定，不能用运行环境的本地时区。内容里的 `2026-09-25` 经 YAML 解析后是
 * UTC 零点，若用 getFullYear() 这类本地方法读取，同一份内容在不同时区的机器上会算出
 * 不同结果——首尔的笔记本、UTC 的托管构建机、美国时区的开发机各得一个答案，
 * 活动的日期显示、状态判定乃至 URL 都会跟着变（PRD 2.2 要求 URL 一经发布不得修改）。
 */
const SITE_UTC_OFFSET_MS = 9 * 60 * 60 * 1000;

/**
 * 把一个时刻平移到站点时区，之后用 getUTC* 读出的就是首尔的年月日。
 * 对内容里的纯日期值（UTC 零点）读回的正是编辑填写的那一天。
 */
function siteTime(date: Date): Date {
  return new Date(date.getTime() + SITE_UTC_OFFSET_MS);
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/** 站点时区下的日历日，用于生成活动 URL 与比较是否同一天 */
export function isoDate(date: Date): string {
  const d = siteTime(date);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

export function formatDate(date: Date, lang: Lang): string {
  const d = siteTime(date);
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth() + 1;
  const day = d.getUTCDate();
  return lang === 'zh' ? `${y} 年 ${m} 月 ${day} 日` : `${y}년 ${m}월 ${day}일`;
}

/** 站点时区下的 [年, 月]，月份从 1 开始 */
export function siteYearMonth(date: Date): [number, number] {
  const d = siteTime(date);
  return [d.getUTCFullYear(), d.getUTCMonth() + 1];
}

/** 站点时区下的「年 月」，用于新生指南的最后更新（PRD 4.4 只显示到月份） */
export function formatMonth(date: Date, lang: Lang): string {
  const [y, m] = siteYearMonth(date);
  return lang === 'zh' ? `${y} 年 ${m} 月` : `${y}년 ${m}월`;
}

/** 跨天活动显示起止（PRD 4.3 详情页） */
export function formatDateRange(start: Date, end: Date | undefined, lang: Lang): string {
  if (!end || isoDate(end) === isoDate(start)) return formatDate(start, lang);
  return `${formatDate(start, lang)} – ${formatDate(end, lang)}`;
}

/**
 * 只填到日期的活动视为当天结束（首尔时间 23:59:59.999）。
 *
 * YAML 把不带时区的值按 UTC 解析，所以 `2026-09-25` 到这里是 UTC 零点；
 * 判断与补齐都基于 UTC，结果与构建机器的时区无关。
 * 若日后需要精确到时刻，frontmatter 里请写明时区偏移（如 `2026-09-25T19:00:00+09:00`）。
 */
export function endOfDayIfDateOnly(date: Date): Date {
  const isDateOnly =
    date.getUTCHours() === 0 &&
    date.getUTCMinutes() === 0 &&
    date.getUTCSeconds() === 0 &&
    date.getUTCMilliseconds() === 0;
  if (!isDateOnly) return date;
  // 该日历日的 24 小时减 1 毫秒，再换回 UTC 时刻
  return new Date(date.getTime() + 24 * 60 * 60 * 1000 - 1 - SITE_UTC_OFFSET_MS);
}

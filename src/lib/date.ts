import type { Lang } from '../i18n/ui';

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function isoDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function formatDate(date: Date, lang: Lang): string {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return lang === 'zh' ? `${y} 年 ${m} 月 ${d} 日` : `${y}년 ${m}월 ${d}일`;
}

/** 跨天活动显示起止（PRD 4.3 详情页） */
export function formatDateRange(start: Date, end: Date | undefined, lang: Lang): string {
  if (!end || isoDate(end) === isoDate(start)) return formatDate(start, lang);
  return `${formatDate(start, lang)} – ${formatDate(end, lang)}`;
}

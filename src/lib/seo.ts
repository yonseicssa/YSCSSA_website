import type { Metadata } from 'next';
import { localePath, type Lang } from '@/i18n/ui';

/**
 * 每页独立的标题与描述，并声明中韩两个版本的对应关系（PRD 7.3）。
 */
export function buildMetadata({
  lang,
  path,
  title,
  description,
  noindex = false
}: {
  lang: Lang;
  /** 不含语言前缀的路径，如 /about、/events/2026-09-25 */
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}): Metadata {
  const canonical = localePath(lang, path);
  const zh = localePath('zh', path);
  const ko = localePath('ko', path);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { zh, ko, 'x-default': zh }
    },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      locale: lang === 'zh' ? 'zh_CN' : 'ko_KR'
    }
  };
}

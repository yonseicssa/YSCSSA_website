import type { MetadataRoute } from 'next';
import { getEvents, getGuides } from '@/lib/content';
import { buildSlugMap } from '@/lib/events';
import { eventPageCount } from '@/components/views/EventsList';
import { localePath } from '@/i18n/ui';
import { SITE_URL } from '@/lib/site';

// 静态导出时 sitemap 必须在构建期生成
export const dynamic = 'force-static';

/** 中韩两版都进 sitemap，并互相声明 hreflang（PRD 7.3）；后台与 404 不收录 */
export default function sitemap(): MetadataRoute.Sitemap {
  const events = getEvents();
  const slugs = buildSlugMap(events);

  const paths = [
    '/',
    '/about',
    '/events',
    '/guide',
    '/partnership',
    ...Array.from({ length: eventPageCount() - 1 }, (_, i) => `/events/page/${i + 2}`),
    ...events.map((event) => `/events/${slugs.get(event.id)!}`),
    ...getGuides().map((guide) => `/guide/${guide.data.slug}`)
  ];

  return paths.flatMap((path) =>
    (['zh', 'ko'] as const).map((lang) => ({
      url: new URL(localePath(lang, path), SITE_URL).href,
      lastModified: new Date(),
      alternates: {
        languages: {
          zh: new URL(localePath('zh', path), SITE_URL).href,
          ko: new URL(localePath('ko', path), SITE_URL).href
        }
      }
    }))
  );
}

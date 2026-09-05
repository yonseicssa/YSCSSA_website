import EventsList, { eventPageCount } from '@/components/views/EventsList';
import { buildMetadata } from '@/lib/seo';
import { t } from '@/i18n/ui';

export function generateStaticParams() {
  // 静态导出要求至少产出一个路由，因此第 1 页也生成一份，
  // 其 canonical 指向 /events，不会造成重复收录。
  return Array.from({ length: eventPageCount() }, (_, i) => ({ page: String(i + 1) }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  return buildMetadata({
    lang: 'ko',
    path: page === '1' ? '/events' : `/events/page/${page}`,
    title: `${t('ko', 'events.title')} · ${t('ko', 'events.page', { n: page })}`,
    description: t('ko', 'site.description')
  });
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  return <EventsList lang="ko" pageNum={Number(page)} />;
}

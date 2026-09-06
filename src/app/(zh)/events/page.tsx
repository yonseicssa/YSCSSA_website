import EventsList from '@/components/views/EventsList';
import { buildMetadata } from '@/lib/seo';
import { t } from '@/i18n/ui';

export function generateMetadata() {
  return buildMetadata({
    lang: 'zh',
    path: '/events',
    title: t('zh', 'events.title'),
    description: t('zh', 'site.description')
  });
}

export default function Page() {
  return <EventsList lang="zh" />;
}

import EventsList from '@/components/views/EventsList';
import { buildMetadata } from '@/lib/seo';
import { t } from '@/i18n/ui';

export function generateMetadata() {
  return buildMetadata({
    lang: 'ko',
    path: '/events',
    title: t('ko', 'events.title'),
    description: t('ko', 'site.description')
  });
}

export default function Page() {
  return <EventsList lang="ko" />;
}

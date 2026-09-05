import { GuideListPage } from '@/components/views/GuidePage';
import { buildMetadata } from '@/lib/seo';
import { t } from '@/i18n/ui';

export function generateMetadata() {
  return buildMetadata({
    lang: 'ko',
    path: '/guide',
    title: t('ko', 'guide.title'),
    description: t('ko', 'guide.intro')
  });
}

export default function Page() {
  return <GuideListPage lang="ko" />;
}

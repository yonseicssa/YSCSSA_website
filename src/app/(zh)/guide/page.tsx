import { GuideListPage } from '@/components/views/GuidePage';
import { buildMetadata } from '@/lib/seo';
import { t } from '@/i18n/ui';

export function generateMetadata() {
  return buildMetadata({
    lang: 'zh',
    path: '/guide',
    title: t('zh', 'guide.title'),
    description: t('zh', 'guide.intro')
  });
}

export default function Page() {
  return <GuideListPage lang="zh" />;
}

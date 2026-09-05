import Partnership from '@/components/views/Partnership';
import { getPage } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export function generateMetadata() {
  const page = getPage('zh', 'partnership');
  return buildMetadata({ lang: 'zh', path: '/partnership', title: page.data.seoTitle, description: page.data.seoDescription });
}

export default function Page() {
  return <Partnership lang="zh" />;
}

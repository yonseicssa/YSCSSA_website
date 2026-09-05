import Home from '@/components/views/Home';
import { getPage } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export function generateMetadata() {
  const page = getPage('zh', 'home');
  return buildMetadata({ lang: 'zh', path: '/', title: page.data.seoTitle, description: page.data.seoDescription });
}

export default function Page() {
  return <Home lang="zh" />;
}

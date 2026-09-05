import About from '@/components/views/About';
import { getPage } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export function generateMetadata() {
  const page = getPage('zh', 'about');
  return buildMetadata({ lang: 'zh', path: '/about', title: page.data.seoTitle, description: page.data.seoDescription });
}

export default function Page() {
  return <About lang="zh" />;
}

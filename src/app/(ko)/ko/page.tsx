import Home from '@/components/views/Home';
import { getPage } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export function generateMetadata() {
  const page = getPage('ko', 'home');
  return buildMetadata({ lang: 'ko', path: '/', title: page.data.seoTitle, description: page.data.seoDescription });
}

export default function Page() {
  return <Home lang="ko" />;
}

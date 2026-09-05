import About from '@/components/views/About';
import { getPage } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export function generateMetadata() {
  const page = getPage('ko', 'about');
  return buildMetadata({ lang: 'ko', path: '/about', title: page.data.seoTitle, description: page.data.seoDescription });
}

export default function Page() {
  return <About lang="ko" />;
}

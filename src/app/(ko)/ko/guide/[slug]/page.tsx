import { GuideDetailPage } from '@/components/views/GuidePage';
import { getGuides } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return getGuides().map((guide) => ({ slug: guide.data.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuides().find((entry) => entry.data.slug === slug)!;
  return buildMetadata({
    lang: 'ko',
    path: `/guide/${slug}`,
    title: guide.data.title,
    description: guide.data.summary
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <GuideDetailPage lang="ko" slug={slug} />;
}

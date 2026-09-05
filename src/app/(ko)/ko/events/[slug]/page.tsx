import EventDetail, { findEventBySlug } from '@/components/views/EventDetail';
import { getEvents } from '@/lib/content';
import { buildSlugMap } from '@/lib/events';
import { formatDateRange } from '@/lib/date';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  const events = getEvents();
  const slugs = buildSlugMap(events);
  return events.map((event) => ({ slug: slugs.get(event.id)! }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = findEventBySlug(slug)!;
  const { title, startDate, endDate, location } = event.data;
  return buildMetadata({
    lang: 'ko',
    path: `/events/${slug}`,
    title,
    description: `${title}｜${formatDateRange(startDate, endDate, 'ko')}｜${location}`
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <EventDetail lang="ko" slug={slug} />;
}

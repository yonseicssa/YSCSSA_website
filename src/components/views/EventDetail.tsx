import Link from 'next/link';
import EventStatusBadge from '../EventStatusBadge';
import Gallery from '../Gallery';
import Icon from '../Icon';
import { getEvents } from '@/lib/content';
import { buildSlugMap, effectiveEnd, statusOf } from '@/lib/events';
import { formatDateRange } from '@/lib/date';
import { imageUrl } from '@/lib/images';
import { localePath, t, type Lang } from '@/i18n/ui';

export function findEventBySlug(slug: string) {
  const events = getEvents();
  const slugs = buildSlugMap(events);
  const event = events.find((entry) => slugs.get(entry.id) === slug);
  return event ?? null;
}

export default function EventDetail({ lang, slug }: { lang: Lang; slug: string }) {
  const event = findEventBySlug(slug)!;
  const { title, startDate, endDate, location, cover, coverAlt, gallery } = event.data;

  return (
    <article className="container section detail">
      <figure className="detail-cover">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl(cover)} alt={coverAlt} width={1600} height={900} fetchPriority="high" />
      </figure>

      <h1>{title}</h1>

      <div className="activity-meta detail-meta">
        <span>
          <Icon name="calendar" size={16} />
          <time dateTime={startDate.toISOString()}>{formatDateRange(startDate, endDate, lang)}</time>
        </span>
        <span>
          <Icon name="location" size={16} />
          {location}
        </span>
        <EventStatusBadge
          endISO={effectiveEnd(event).toISOString()}
          initialEnded={statusOf(event) === 'ended'}
          lang={lang}
        />
      </div>

      <div className="prose" dangerouslySetInnerHTML={{ __html: event.html }} />

      {gallery.length > 0 && (
        <section className="detail-gallery" aria-labelledby="gallery-title">
          <h2 className="section-title" id="gallery-title">
            {t(lang, 'events.gallery')}
          </h2>
          <Gallery
            images={gallery.map((image) => ({ src: imageUrl(image.src), alt: image.alt }))}
            closeLabel={lang === 'zh' ? '关闭' : '닫기'}
          />
        </section>
      )}

      <Link className="link-arrow detail-back" href={localePath(lang, '/events')}>
        <Icon name="arrow-back" size={18} />
        {t(lang, 'events.back')}
      </Link>
    </article>
  );
}

'use client';

import Link from 'next/link';
import Icon from './Icon';
import { isEnded, type EventCardData } from '@/lib/eventOrder';
import { localePath, t, type Lang } from '@/i18n/ui';

export default function EventCard({
  card,
  lang,
  now,
  eager = false
}: {
  card: EventCardData;
  lang: Lang;
  /** 为 null 时用构建期的判定（首屏 HTML），挂载后传入当前时间重算（PRD 4.3） */
  now: number | null;
  eager?: boolean;
}) {
  const ended = now === null ? card.initialEnded : isEnded(card, now);
  const status = ended ? 'ended' : 'upcoming';
  const href = localePath(lang, `/events/${card.slug}`);

  return (
    <article className="activity-card">
      <div className="activity-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="activity-image activity-image-media"
          src={card.cover}
          alt={card.coverAlt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          width={1600}
          height={900}
        />
        {card.pinned && <span className="chip chip-accent chip-pinned">{t(lang, 'events.pinned')}</span>}
        <span className={`event-status chip-status status-${status}`}>
          {t(lang, ended ? 'events.ended' : 'events.upcoming')}
        </span>
      </div>

      <div className="activity-content">
        <h3>
          <Link href={href}>{card.title}</Link>
        </h3>

        <div className="activity-meta">
          <span>
            <Icon name="calendar" size={16} />
            <time dateTime={card.startISO}>{card.dateLabel}</time>
          </span>
          <span>
            <Icon name="location" size={16} />
            {card.location}
          </span>
        </div>
      </div>
    </article>
  );
}

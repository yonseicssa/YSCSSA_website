import Link from 'next/link';
import Icon from './Icon';
import type { EventCardData } from '@/lib/eventOrder';
import { localePath, t, type Lang } from '@/i18n/ui';

/**
 * 主打活动横幅（PRD 4.3）：通栏，位于筛选控件之上，常驻显示，不随筛选变化。
 * 横幅是独立于列表的模块，被主打的活动仍会正常出现在下方列表中。
 */
export default function FeaturedEvent({ card, lang }: { card: EventCardData; lang: Lang }) {
  return (
    <section className="featured-event" aria-labelledby="featured-event-title">
      <Link className="featured-event-link" href={localePath(lang, `/events/${card.slug}`)}>
        <div className="featured-event-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.cover} alt={card.coverAlt} width={1600} height={900} fetchPriority="high" />
        </div>

        <div className="featured-event-body">
          <p className="featured-event-eyebrow">
            <span className="dot" />
            {t(lang, 'events.featured')}
          </p>
          <h2 className="featured-event-title" id="featured-event-title">
            {card.title}
          </h2>
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
      </Link>
    </section>
  );
}

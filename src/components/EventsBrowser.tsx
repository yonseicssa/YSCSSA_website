'use client';

import { useEffect, useMemo, useState } from 'react';
import EventsGrid from './EventsGrid';
import { endedCards, upcomingCards, type EventCardData } from '@/lib/eventOrder';
import { t, type Lang } from '@/i18n/ui';

type Filter = 'all' | 'upcoming' | 'ended';

const filters: { key: Filter; labelKey: 'events.filterAll' | 'events.upcoming' | 'events.ended' }[] = [
  { key: 'all', labelKey: 'events.filterAll' },
  { key: 'upcoming', labelKey: 'events.upcoming' },
  { key: 'ended', labelKey: 'events.ended' }
];

/**
 * 活动列表（PRD 4.3）。
 * 不分页，一次输出全部：筛选在浏览器端执行，若分页则筛选只作用于当前页，结果错误。
 * 「全部」分两组并各带分组标题；选具体筛选时平铺，不显示分组标题。
 */
export default function EventsBrowser({ cards, lang }: { cards: EventCardData[]; lang: Lang }) {
  const [now, setNow] = useState<number | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  useEffect(() => setNow(Date.now()), []);

  const upcoming = useMemo(() => upcomingCards(cards, now), [cards, now]);
  const ended = useMemo(() => endedCards(cards, now), [cards, now]);

  if (cards.length === 0) {
    return <p className="empty-state">{t(lang, 'events.empty')}</p>;
  }

  const single = filter === 'upcoming' ? upcoming : ended;

  return (
    <>
      <div className="activity-filters" role="group" aria-label={t(lang, 'events.filterLabel')}>
        {filters.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`activity-filter-button${filter === item.key ? ' active' : ''}`}
            aria-pressed={filter === item.key}
            onClick={() => setFilter(item.key)}
          >
            {t(lang, item.labelKey)}
          </button>
        ))}
      </div>

      {filter === 'all' ? (
        <>
          {upcoming.length > 0 && (
            <section className="events-group" aria-labelledby="events-group-upcoming">
              <h2 className="events-group-title" id="events-group-upcoming">
                {t(lang, 'events.upcoming')}
              </h2>
              <EventsGrid cards={upcoming} lang={lang} now={now} eagerFirst />
            </section>
          )}
          {ended.length > 0 && (
            <section className="events-group" aria-labelledby="events-group-ended">
              <h2 className="events-group-title" id="events-group-ended">
                {t(lang, 'events.ended')}
              </h2>
              <EventsGrid cards={ended} lang={lang} now={now} eagerFirst={upcoming.length === 0} />
            </section>
          )}
        </>
      ) : single.length === 0 ? (
        <p className="empty-state">{t(lang, 'events.emptyFilter')}</p>
      ) : (
        <EventsGrid cards={single} lang={lang} now={now} eagerFirst />
      )}
    </>
  );
}

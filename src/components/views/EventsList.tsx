import Link from 'next/link';
import EventsGrid from '../EventsGrid';
import PageHeader from '../PageHeader';
import { getEvents } from '@/lib/content';
import { orderedCards } from '@/lib/cards';
import { localePath, t, type Lang } from '@/i18n/ui';

export const PER_PAGE = 12;

export function eventPageCount(): number {
  return Math.max(1, Math.ceil(getEvents().length / PER_PAGE));
}

export default function EventsList({ lang, pageNum }: { lang: Lang; pageNum: number }) {
  const all = orderedCards(getEvents(), lang);
  const totalPages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  const current = all.slice((pageNum - 1) * PER_PAGE, pageNum * PER_PAGE);

  return (
    <>
      <PageHeader title={t(lang, 'events.title')} />

      <section className="container section">
        {current.length === 0 ? (
          <p className="empty-state">{t(lang, 'events.empty')}</p>
        ) : (
          <EventsGrid cards={current} lang={lang} />
        )}

        {totalPages > 1 && (
          <nav className="pagination" aria-label={t(lang, 'events.title')}>
            {pageNum > 1 && (
              <Link
                className="cta-button cta-button-outline"
                href={localePath(lang, pageNum === 2 ? '/events' : `/events/page/${pageNum - 1}`)}
              >
                {t(lang, 'events.prev')}
              </Link>
            )}
            <span className="pagination-status">
              {pageNum} / {totalPages}
            </span>
            {pageNum < totalPages && (
              <Link className="cta-button cta-button-outline" href={localePath(lang, `/events/page/${pageNum + 1}`)}>
                {t(lang, 'events.next')}
              </Link>
            )}
          </nav>
        )}
      </section>
    </>
  );
}

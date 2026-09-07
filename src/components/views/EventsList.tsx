import EventsBrowser from '../EventsBrowser';
import FeaturedEvent from '../FeaturedEvent';
import PageHeader from '../PageHeader';
import { getEvents } from '@/lib/content';
import { toCards } from '@/lib/cards';
import { t, type Lang } from '@/i18n/ui';

export default function EventsList({ lang }: { lang: Lang }) {
  const cards = toCards(getEvents(), lang);
  const featured = cards.find((card) => card.featured) ?? null;

  return (
    <>
      <PageHeader title={t(lang, 'events.title')} />

      <section className="container section">
        {/* 主打横幅在筛选之上，未设置主打活动时整块隐藏（PRD 4.3） */}
        {featured && <FeaturedEvent card={featured} lang={lang} />}

        <EventsBrowser cards={cards} lang={lang} />
      </section>
    </>
  );
}

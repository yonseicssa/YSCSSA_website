'use client';

import { useEffect, useMemo, useState } from 'react';
import EventCard from './EventCard';
import { orderCards, type EventCardData } from '@/lib/eventOrder';
import type { Lang } from '@/i18n/ui';

/**
 * 首屏用构建时算好的顺序（cards 即服务端顺序），挂载后按浏览器当前时间重排。
 * 这样长期不重新部署，列表顺序与状态依然正确（PRD 4.3）。
 */
export default function EventsGrid({
  cards,
  lang,
  limit
}: {
  cards: EventCardData[];
  lang: Lang;
  limit?: number;
}) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);

  const visible = useMemo(() => {
    const ordered = now === null ? cards : orderCards(cards, now);
    return limit ? ordered.slice(0, limit) : ordered;
  }, [cards, limit, now]);

  return (
    <div className="activities-grid activities-grid-3">
      {visible.map((card, index) => (
        <EventCard key={card.slug} card={card} lang={lang} now={now} eager={index === 0} />
      ))}
    </div>
  );
}

'use client';

import { useEffect, useMemo, useState } from 'react';
import EventsGrid from './EventsGrid';
import { homeCards, type EventCardData } from '@/lib/eventOrder';
import type { Lang } from '@/i18n/ui';

/**
 * 首页近期活动固定 3 条（PRD 4.1）。
 * 首屏用构建期的状态渲染，挂载后按浏览器当前时间重算填充顺序，
 * 这样长期不重新部署，首页也不会一直挂着已经结束的「即将举行」（PRD 4.3）。
 */
export default function HomeEvents({ cards, lang }: { cards: EventCardData[]; lang: Lang }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);

  const visible = useMemo(() => homeCards(cards, now), [cards, now]);

  return <EventsGrid cards={visible} lang={lang} now={now} eagerFirst />;
}

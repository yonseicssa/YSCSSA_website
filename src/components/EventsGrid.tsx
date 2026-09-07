import EventCard from './EventCard';
import type { EventCardData } from '@/lib/eventOrder';
import type { Lang } from '@/i18n/ui';

/** 活动卡片网格。只负责渲染，顺序由调用方算好。 */
export default function EventsGrid({
  cards,
  lang,
  now,
  eagerFirst = false
}: {
  cards: EventCardData[];
  lang: Lang;
  /** 为 null 表示用构建期的状态（首屏 HTML），挂载后传入当前时间（PRD 4.3） */
  now: number | null;
  /** 首屏内的第一张图不懒加载（PRD 7.1） */
  eagerFirst?: boolean;
}) {
  return (
    <div className="activities-grid activities-grid-3">
      {cards.map((card, index) => (
        <EventCard key={card.slug} card={card} lang={lang} now={now} eager={eagerFirst && index === 0} />
      ))}
    </div>
  );
}

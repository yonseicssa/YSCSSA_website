'use client';

import { useEffect, useState } from 'react';
import { t, type Lang } from '@/i18n/ui';

/** 详情页的状态标签，同样在打开时按当前时间计算（PRD 4.3） */
export default function EventStatusBadge({
  endISO,
  initialEnded,
  lang
}: {
  endISO: string;
  initialEnded: boolean;
  lang: Lang;
}) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);

  const ended = now === null ? initialEnded : now >= Date.parse(endISO);

  return (
    <span className={`event-status status-${ended ? 'ended' : 'upcoming'}`}>
      {t(lang, ended ? 'events.ended' : 'events.upcoming')}
    </span>
  );
}

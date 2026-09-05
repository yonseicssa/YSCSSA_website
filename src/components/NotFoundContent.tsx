'use client';

import { useEffect, useState } from 'react';
import { t } from '@/i18n/ui';

/** 按访问路径的语言前缀决定显示哪一版（PRD 4.6） */
export default function NotFoundContent() {
  const [lang, setLang] = useState<'zh' | 'ko'>('zh');

  useEffect(() => {
    const korean = location.pathname === '/ko' || location.pathname.startsWith('/ko/');
    setLang(korean ? 'ko' : 'zh');
    document.documentElement.lang = korean ? 'ko' : 'zh';
  }, []);

  return (
    <section className="notfound">
      <div className="container">
        <p className="notfound-code">404</p>
        <h1>{t(lang, 'notFound.title')}</h1>
        <p className="lead">{t(lang, 'notFound.body')}</p>
        <a className="cta-button" href={lang === 'ko' ? '/ko' : '/'}>
          {t(lang, 'notFound.home')}
        </a>
      </div>
    </section>
  );
}

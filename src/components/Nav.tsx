'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Icon from './Icon';
import { alternatePath, localePath, t, type Lang } from '@/i18n/ui';

const links = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.about', href: '/about' },
  { key: 'nav.events', href: '/events' },
  { key: 'nav.guide', href: '/guide' },
  { key: 'nav.partnership', href: '/partnership' }
] as const;

export default function Nav({ lang }: { lang: Lang }) {
  const pathname = usePathname() ?? '/';
  // 去掉语言前缀后再比较，中韩两版共用同一套判断
  const path = pathname.replace(/^\/ko(?=\/|$)/, '') || '/';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-container">
        <Link className="logo" href={localePath(lang, '/')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo-img" src="/images/logo.svg" alt="" width={36} height={36} />
          <span className="logo-abbr">YSCSSA</span>
          <span className="logo-divider" aria-hidden="true" />
          <span className="logo-name">{lang === 'zh' ? '延世学联' : '연세중국학생학자연의회'}</span>
        </Link>

        <ul className={`nav-menu${menuOpen ? ' active' : ''}`}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={localePath(lang, link.href)}
                className={isActive(link.href) ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {t(lang, link.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          {/* 中韩两版是两套 root layout，跨语言必须整页跳转，因此这里用 <a> 而不是 <Link> */}
          <a
            className="lang-switch"
            href={alternatePath(lang, pathname)}
            lang={lang === 'zh' ? 'ko' : 'zh'}
            aria-label={t(lang, 'nav.lang')}
          >
            <Icon name="globe" size={18} />
            <span className="lang-switch-label">{t(lang, 'nav.langSwitch')}</span>
          </a>

          <a className="nav-login" href="/admin" rel="nofollow" title={t(lang, 'nav.loginHint')}>
            {t(lang, 'nav.login')}
          </a>

          <button
            type="button"
            className={`hamburger${menuOpen ? ' active' : ''}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={t(lang, 'nav.menu')}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}

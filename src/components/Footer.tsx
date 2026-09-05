import Link from 'next/link';
import Icon from './Icon';
import { localePath, t, type Lang } from '@/i18n/ui';
import { settings } from '@/lib/settings';

const links = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.about', href: '/about' },
  { key: 'nav.events', href: '/events' },
  { key: 'nav.guide', href: '/guide' },
  { key: 'nav.partnership', href: '/partnership' }
] as const;

export default function Footer({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand-col">
          <div className="footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.svg" alt="" width={32} height={32} />
            <span>{t(lang, 'site.fullName')}</span>
          </div>
          <p className="footer-note">Yonsei Chinese Students and Scholars Association</p>
          <a className="footer-mail" href={`mailto:${settings.email}`}>
            <Icon name="mail" size={18} />
            {settings.email}
          </a>
        </div>

        <nav className="footer-col" aria-labelledby="footer-nav-title">
          <h2 className="footer-col-title" id="footer-nav-title">
            {t(lang, 'footer.nav')}
          </h2>
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={localePath(lang, link.href)}>{t(lang, link.key)}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col social-links" aria-labelledby="footer-follow-title">
          <h2 className="footer-col-title" id="footer-follow-title">
            {t(lang, 'footer.follow')}
          </h2>
          <ul>
            <li>
              <a href={settings.xiaohongshu} target="_blank" rel="noopener noreferrer">
                小红书 <Icon name="external" size={14} />
              </a>
            </li>
            <li>
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer">
                Instagram <Icon name="external" size={14} />
              </a>
            </li>
            <li>
              <span className="footer-wechat">
                {t(lang, 'footer.wechat')}：{settings.wechatName}
              </span>
            </li>
          </ul>
        </nav>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>
            © {year} {t(lang, 'site.fullName')} YSCSSA. {t(lang, 'footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}

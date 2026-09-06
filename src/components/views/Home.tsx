import Link from 'next/link';
import Icon from '../Icon';
import HomeEvents from '../HomeEvents';
import PlatformLinks from '../PlatformLinks';
import { getEvents, getPage } from '@/lib/content';
import { toCards } from '@/lib/cards';
import { imageUrl } from '@/lib/images';
import { settings } from '@/lib/settings';
import { wallpaper } from '@/lib/wallpaper';
import { localePath, t, type Lang } from '@/i18n/ui';

export default function Home({ lang }: { lang: Lang }) {
  const page = getPage(lang, 'home');
  const cards = toCards(getEvents(), lang);

  return (
    <>
      {/* 学联简介 */}
      <section className="hero-wrap">
        <div className="hero hero-intro">
          <div className="hero-content">
            <p className="eyebrow">
              <span className="dot" />
              {page.data.subheading}
            </p>
            <h1>{page.data.heading}</h1>
            <div className="prose lead" dangerouslySetInnerHTML={{ __html: page.html }} />
            <div className="hero-actions">
              <Link className="cta-button" href={localePath(lang, '/about')}>
                {t(lang, 'nav.about')}
                <Icon name="arrow-forward" />
              </Link>
              <Link className="cta-button cta-button-outline" href={localePath(lang, '/guide')}>
                {t(lang, 'nav.guide')}
              </Link>
            </div>
          </div>

          <aside className="brand-card" aria-hidden="true">
            <span className="brand-mark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.svg" alt="" width={56} height={56} />
            </span>
            <p className="brand-abbr">YSCSSA</p>
            <p className="brand-name">{t(lang, 'site.fullName')}</p>
            <p className="brand-en">Yonsei Chinese Students and Scholars Association</p>
            <p className="brand-foot">
              <Icon name="location" size={16} />
              Yonsei University · Seoul
            </p>
          </aside>
        </div>
      </section>

      {/*
        壁纸：全宽静态图片，无轮播、无文字叠加（PRD 4.1）。
        桌面与移动两种尺寸由构建从同一张原图生成，浏览器按屏幕宽度自动选择；
        编辑在后台只需上传一张原图，不必自己压缩或切尺寸。
      */}
      <section className="wallpaper">
        <picture>
          {wallpaper.mobile && (
            <source media="(max-width: 768px)" srcSet={imageUrl(wallpaper.mobile)} type="image/webp" />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl(wallpaper.desktop)}
            alt={settings.wallpaperAlt}
            width={wallpaper.width ?? undefined}
            height={wallpaper.height ?? undefined}
            fetchPriority="high"
          />
        </picture>
      </section>

      {/* 近期活动：一条都没有时整个区块隐藏（PRD 4.1） */}
      {cards.length > 0 && (
        <section className="section" aria-labelledby="recent-events">
          <div className="container">
            <div className="section-head">
              <h2 className="section-title" id="recent-events">
                {t(lang, 'home.recentEvents')}
              </h2>
              <Link className="link-arrow" href={localePath(lang, '/events')}>
                {t(lang, 'home.viewAllEvents')}
                <Icon name="arrow-forward" />
              </Link>
            </div>

            <HomeEvents cards={cards} lang={lang} />
          </div>
        </section>
      )}

      <PlatformLinks lang={lang} />
    </>
  );
}

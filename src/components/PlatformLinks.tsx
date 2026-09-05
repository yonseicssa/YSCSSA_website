'use client';

import { useRef } from 'react';
import Icon from './Icon';
import { settings } from '@/lib/settings';
import { t, type Lang } from '@/i18n/ui';

export default function PlatformLinks({ lang }: { lang: Lang }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <section className="section section-alt" aria-labelledby="platforms-title">
      <div className="container">
        <h2 className="section-title" id="platforms-title">
          {t(lang, 'home.platforms')}
        </h2>
        <p className="section-subtitle">{t(lang, 'home.platformsIntro')}</p>

        <div className="platform-grid">
          <a className="platform-card" href={settings.xiaohongshu} target="_blank" rel="noopener noreferrer">
            <span className="platform-icon" aria-hidden="true">
              <Icon name="book" />
            </span>
            <div>
              <p className="platform-name">小红书</p>
              <p className="platform-hint">@YSCSSA</p>
            </div>
            <Icon name="external" className="platform-go" />
          </a>

          <a className="platform-card" href={settings.instagram} target="_blank" rel="noopener noreferrer">
            <span className="platform-icon" aria-hidden="true">
              <Icon name="camera" />
            </span>
            <div>
              <p className="platform-name">Instagram</p>
              <p className="platform-hint">@yscssa</p>
            </div>
            <Icon name="external" className="platform-go" />
          </a>

          {/* 公众号无法通过网页链接跳转，因此以二维码呈现（PRD 4.1 / 6.4） */}
          <div className="platform-card platform-card-qr">
            <button
              type="button"
              className="qr-button"
              onClick={() => dialogRef.current?.showModal()}
              aria-label={t(lang, 'home.wechatHint')}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={settings.wechatQr} alt={`${settings.wechatName} 微信公众号二维码`} width={120} height={120} />
            </button>
            <div>
              <p className="platform-name">微信公众号</p>
              <p className="platform-hint">{settings.wechatName}</p>
              <p className="platform-hint">{t(lang, 'home.wechatHint')}</p>
            </div>
          </div>
        </div>
      </div>

      <dialog
        className="qr-dialog"
        ref={dialogRef}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={settings.wechatQr} alt={`${settings.wechatName} 微信公众号二维码`} width={480} height={480} />
        <form method="dialog">
          <button className="cta-button cta-button-outline" type="submit">
            {lang === 'zh' ? '关闭' : '닫기'}
          </button>
        </form>
      </dialog>
    </section>
  );
}

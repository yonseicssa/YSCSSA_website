import type { ReactNode } from 'react';
import { Inter, Montserrat } from 'next/font/google';
import Script from 'next/script';
import Nav from './Nav';
import Footer from './Footer';
import { htmlLang, type Lang } from '@/i18n/ui';
import '@/styles/global.css';

// 字体由构建时下载并随站点一起分发，不再向 Google Fonts 发请求
// —— 少一个外部依赖，中国大陆访问也更稳（PRD 7.1 / 7.2）
const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-inter', display: 'swap' });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-montserrat', display: 'swap' });

export default function SiteShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  // Cloudflare Web Analytics（PRD 7.5）：托管平台设置 NEXT_PUBLIC_CF_BEACON_TOKEN 后自动生效
  const beaconToken = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

  return (
    <html lang={htmlLang[lang]} className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          {lang === 'zh' ? '跳到主要内容' : '본문으로 건너뛰기'}
        </a>
        <Nav lang={lang} />
        <main id="main">{children}</main>
        <Footer lang={lang} />

        {beaconToken && (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            strategy="afterInteractive"
            data-cf-beacon={`{"token": "${beaconToken}"}`}
          />
        )}
      </body>
    </html>
  );
}

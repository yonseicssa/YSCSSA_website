import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import SiteShell from '@/components/SiteShell';
import { SITE_URL } from '@/lib/site';
import { t } from '@/i18n/ui';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: t('zh', 'site.fullName'), template: `%s - ${t('zh', 'site.fullName')}` },
  description: t('zh', 'site.description'),
  icons: { icon: '/favicon.ico' }
};

export default function ZhLayout({ children }: { children: ReactNode }) {
  return <SiteShell lang="zh">{children}</SiteShell>;
}

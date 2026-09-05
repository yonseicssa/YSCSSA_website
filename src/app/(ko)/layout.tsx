import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import SiteShell from '@/components/SiteShell';
import { SITE_URL } from '@/lib/site';
import { t } from '@/i18n/ui';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: t('ko', 'site.fullName'), template: `%s - ${t('ko', 'site.fullName')}` },
  description: t('ko', 'site.description'),
  icons: { icon: '/favicon.ico' }
};

export default function KoLayout({ children }: { children: ReactNode }) {
  return <SiteShell lang="ko">{children}</SiteShell>;
}

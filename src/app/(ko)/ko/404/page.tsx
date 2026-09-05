import { buildMetadata } from '@/lib/seo';
import { t } from '@/i18n/ui';

export function generateMetadata() {
  return buildMetadata({
    lang: 'ko',
    path: '/404',
    title: t('ko', 'notFound.title'),
    description: t('ko', 'notFound.body'),
    noindex: true
  });
}

export default function Page() {
  return (
    <section className="notfound">
      <div className="container">
        <p className="notfound-code">404</p>
        <h1>{t('ko', 'notFound.title')}</h1>
        <p className="lead">{t('ko', 'notFound.body')}</p>
        <a className="cta-button" href="/ko">
          {t('ko', 'notFound.home')}
        </a>
      </div>
    </section>
  );
}

import CtaBand from '../CtaBand';
import Icon from '../Icon';
import PageHeader from '../PageHeader';
import { getPage } from '@/lib/content';
import { settings } from '@/lib/settings';
import { t, type Lang } from '@/i18n/ui';

export default function Partnership({ lang }: { lang: Lang }) {
  const page = getPage(lang, 'partnership');

  return (
    <>
      <PageHeader title={page.data.heading} subtitle={page.data.subheading} />

      <section className="container section">
        <div className="prose" dangerouslySetInnerHTML={{ __html: page.html }} />
      </section>

      <CtaBand title={t(lang, 'partnership.ctaTitle')} description={t(lang, 'partnership.ctaBody')}>
        <a className="cta-button cta-button-onDark" href={`mailto:${settings.email}`}>
          {settings.email}
          <Icon name="mail" />
        </a>
      </CtaBand>
    </>
  );
}

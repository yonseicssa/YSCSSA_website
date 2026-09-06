import ContactCard from '../ContactCard';
import PageHeader from '../PageHeader';
import { getPartnershipPage, type PartnershipEntry } from '@/lib/content';
import { contact } from '@/lib/contact';
import { settings } from '@/lib/settings';
import { t, type Lang } from '@/i18n/ui';

type Offering = PartnershipEntry['data']['offerings'][number];

function OfferingGroup({ title, items }: { title: string; items: Offering[] }) {
  if (items.length === 0) return null;

  return (
    <section className="offering-group">
      <h3 className="offering-group-title">{title}</h3>
      <div className="offering-grid">
        {items.map((item) => (
          <article className="offering-card" key={item.title}>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Partnership({ lang }: { lang: Lang }) {
  const page = getPartnershipPage(lang);
  const offerings = page.data.offerings;

  return (
    <>
      <PageHeader title={page.data.heading} subtitle={page.data.subheading} />

      {/* 开篇说明：只描述覆盖人群，不标注各平台的具体粉丝数量（PRD 4.5） */}
      <section className="container section">
        <div className="prose lead" dangerouslySetInnerHTML={{ __html: page.html }} />
      </section>

      {/* 合作方式：分线上宣传与线下合作两组，每组三项 */}
      <section className="section section-alt" aria-labelledby="ways-title">
        <div className="container">
          <h2 className="section-title" id="ways-title">
            {t(lang, 'partnership.ways')}
          </h2>
          <OfferingGroup
            title={t(lang, 'partnership.online')}
            items={offerings.filter((item) => item.group === 'online')}
          />
          <OfferingGroup
            title={t(lang, 'partnership.offline')}
            items={offerings.filter((item) => item.group === 'offline')}
          />
        </div>
      </section>

      {/* 联系我们：区块顶部为学联对外邮箱，单独一行居中（PRD 4.5） */}
      <section className="container section" aria-labelledby="contact-title">
        <h2 className="section-title" id="contact-title">
          {t(lang, 'partnership.contact')}
        </h2>

        <p className="contact-email">
          <a href={`mailto:${settings.email}`}>{settings.email}</a>
        </p>

        <div className="contact-cards">
          {contact.cards.map((card) => (
            <ContactCard key={card.email} card={card} lang={lang} />
          ))}
        </div>
      </section>
    </>
  );
}

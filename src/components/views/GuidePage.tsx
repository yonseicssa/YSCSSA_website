import Link from 'next/link';
import GuideList, { type GuideListItem } from '../GuideList';
import Icon from '../Icon';
import PageHeader from '../PageHeader';
import { getGuides } from '@/lib/content';
import { effectiveUpdated, orderedGuides, updatedLabel, updatedParts } from '@/lib/guides';
import { localePath, t, type Lang } from '@/i18n/ui';

export function guideItems(lang: Lang): GuideListItem[] {
  return orderedGuides(getGuides()).map((guide) => {
    // 年月同样按站点时区取，避免月末的更新在不同时区的构建机上显示成不同月份
    const [year, month] = updatedParts(effectiveUpdated(guide));
    return {
      slug: guide.data.slug,
      title: guide.data.title,
      summary: guide.data.summary,
      year,
      monthLabel: lang === 'zh' ? `${month} 月` : `${month}월`
    };
  });
}

export function GuideListPage({ lang }: { lang: Lang }) {
  return (
    <>
      <PageHeader title={t(lang, 'guide.title')} subtitle={t(lang, 'guide.intro')} />
      <section className="container section">
        <GuideList items={guideItems(lang)} lang={lang} />
      </section>
    </>
  );
}

export function GuideDetailPage({ lang, slug }: { lang: Lang; slug: string }) {
  const guide = getGuides().find((entry) => entry.data.slug === slug)!;

  return (
    <article className="container section detail">
      <h1>{guide.data.title}</h1>
      <p className="guide-updated">
        {t(lang, 'guide.updated')}：{updatedLabel(effectiveUpdated(guide), lang)}
      </p>

      <div className="prose" dangerouslySetInnerHTML={{ __html: guide.html }} />

      <Link className="link-arrow detail-back" href={localePath(lang, '/guide')}>
        <Icon name="arrow-back" size={18} />
        {t(lang, 'guide.back')}
      </Link>
    </article>
  );
}

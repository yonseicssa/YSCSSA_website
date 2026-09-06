import DepartmentCard from '../DepartmentCard';
import PageHeader from '../PageHeader';
import { getDepartments, getPage } from '@/lib/content';
import { t, type Lang } from '@/i18n/ui';

export default function About({ lang }: { lang: Lang }) {
  const page = getPage(lang, 'about');
  const departments = getDepartments();
  const leadership = departments.filter((department) => department.data.leadership);
  const rest = departments.filter((department) => !department.data.leadership);

  return (
    <>
      <PageHeader title={page.data.heading} subtitle={page.data.subheading} />

      <section className="container section">
        <div className="prose" dangerouslySetInnerHTML={{ __html: page.html }} />
      </section>

      {/*
        组织架构（PRD 4.2）：分层卡片，不使用树状连线图。
        层级由卡片的宽度与包含关系表达——会长团通栏在上，部门两列在下，小组在部门卡内。
        树状图为横向布局，窄屏下必须另做一套版式，而多数访客使用手机。
      */}
      <section className="section section-alt" aria-labelledby="org-title">
        <div className="container">
          <h2 className="section-title" id="org-title">
            {t(lang, 'about.org')}
          </h2>

          <div className="org-chart">
            {leadership.map((department) => (
              <DepartmentCard key={department.id} department={department} lang={lang} />
            ))}

            <div className="departments-grid departments-grid-2">
              {rest.map((department) => (
                <DepartmentCard key={department.id} department={department} lang={lang} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import Icon from '../Icon';
import PageHeader from '../PageHeader';
import { getDepartments, getPage } from '@/lib/content';
import { imageUrl } from '@/lib/images';
import { settings } from '@/lib/settings';
import { t, type Lang } from '@/i18n/ui';

export default function About({ lang }: { lang: Lang }) {
  const page = getPage(lang, 'about');
  const departments = getDepartments();

  return (
    <>
      <PageHeader title={page.data.heading} subtitle={page.data.subheading} />

      <section className="container section">
        <div className="prose" dangerouslySetInnerHTML={{ __html: page.html }} />
      </section>

      {/* 组织架构（PRD 4.2） */}
      <section className="section section-alt" aria-labelledby="org-title">
        <div className="container">
          <h2 className="section-title" id="org-title">
            {t(lang, 'about.org')}
          </h2>

          <div className="departments-grid">
            {departments.map((department) => {
              // 未取得本人同意的成员不展示（PRD 4.2）
              const members = department.data.members.filter((member) => member.consent);

              return (
                <article className="department-card" key={department.id}>
                  <h3>{department.data.name[lang]}</h3>
                  <p className="department-summary">{department.data.description[lang]}</p>

                  {members.length > 0 && (
                    <ul className="member-list">
                      {members.map((member) => (
                        <li className="member-card" key={member.name}>
                          <span className="member-photo">
                            {member.photo ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={imageUrl(member.photo)} alt={member.name} width={800} height={800} loading="lazy" />
                            ) : (
                              <Icon name="person" size={28} />
                            )}
                          </span>
                          <span className="member-name">{member.name}</span>
                          <span className="member-role">{member.role[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              );
            })}
          </div>

          <p className="notice">{t(lang, 'about.removalNotice')}</p>
        </div>
      </section>

      {/* 联系方式 */}
      <section className="container section" aria-labelledby="contact-title">
        <h2 className="section-title" id="contact-title">
          {t(lang, 'about.contact')}
        </h2>
        <div className="contact-card">
          <div className="contact-list">
            <div>
              <Icon name="mail" size={20} />
              <span>
                {t(lang, 'about.email')}：<a href={`mailto:${settings.email}`}>{settings.email}</a>
              </span>
            </div>
            <div>
              <Icon name="chat" size={20} />
              <span>
                {lang === 'zh' ? '微信公众号' : '위챗 공식계정'}：{settings.wechatName}
              </span>
            </div>
            <div>
              <Icon name="location" size={20} />
              <span>Yonsei University, Seoul, South Korea</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

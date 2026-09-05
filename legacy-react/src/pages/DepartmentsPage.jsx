import { useState } from 'react';
import { departments } from '../data/departments';

function DepartmentsPage() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <>
      <div className="page-header">
        <h1>部门构成</h1>
        <p>
          延世大学中国学生学者联合会设有完善的组织架构，由主席团领导，下设多个职能部门。各部门分工明确、协同合作，共同为全体会员提供优质服务。
        </p>
      </div>

      <section className="container section">
        <div className="departments-grid">
          {departments.map((department) => {
            const expanded = expandedId === department.id;

            return (
              <article className="department-card" key={department.id}>
                <div className="department-card-top">
                  <span className="department-icon">
                    <span className="material-symbols-outlined">{department.icon}</span>
                  </span>
                  <span className="chip">{department.tag}</span>
                </div>

                <h3>{department.nameEn}</h3>
                <p className="department-name-cn">{department.nameCn}</p>
                <p className="department-summary">{department.summary}</p>

                {expanded && (
                  <div className="department-details">
                    {department.details.map((detail, index) =>
                      typeof detail === 'string' ? (
                        <p key={index}>{detail}</p>
                      ) : (
                        <p key={index}>
                          <strong>{detail.heading}</strong>
                        </p>
                      )
                    )}
                  </div>
                )}

                <button
                  type="button"
                  className="link-arrow"
                  onClick={() => setExpandedId(expanded ? null : department.id)}
                  aria-expanded={expanded}
                >
                  {expanded ? '收起详情' : '查看详情'}
                  <span className="material-symbols-outlined">
                    {expanded ? 'expand_less' : 'arrow_forward'}
                  </span>
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">加入我们</h2>
          <p className="section-subtitle">Join Us</p>
          <p className="lead" style={{ maxWidth: '720px', marginBottom: '32px' }}>
            延世大学中国学生学者联合会欢迎所有有热情、有责任心的同学加入我们的团队！无论你擅长策划、设计、宣传还是组织协调，我们都有适合你的岗位。在这里，你将结识志同道合的朋友，锻炼自己的能力，为中国学生学者服务。
          </p>
          <a href="mailto:contact@yscssa.org" className="cta-button">
            立即报名
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
      </section>
    </>
  );
}

export default DepartmentsPage;

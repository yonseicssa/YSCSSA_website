function DepartmentsPage() {
  return (
    <>
      <div className="page-header">
        <h1>部门构成</h1>
        <p>Our Departments</p>
      </div>

      <section className="section">
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
          <h2 style={{ color: '#003875', fontSize: '2rem', marginBottom: '1rem' }}>组织架构</h2>
          <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: 1.8 }}>
            延世大学中国学生学者联合会设有完善的组织架构，由主席团领导，下设六大职能部门。各部门分工明确、协同合作，共同为全体会员提供优质服务。
          </p>
        </div>

        <div className="departments-grid">
          <div className="department-card">
            <div className="department-icon">👔</div>
            <h3>主席团</h3>
            <p>
              <strong>职责：</strong>负责学联整体工作的规划和决策，协调各部门工作，代表学联对外交流。
            </p>
            <br />
            <p>主席团由主席、副主席组成，是学联的核心领导机构。主席团负责制定学联发展战略，组织召开重要会议，处理学联日常事务。</p>
          </div>

          <div className="department-card">
            <div className="department-icon">📋</div>
            <h3>秘书处</h3>
            <p>
              <strong>职责：</strong>负责学联日常事务管理、会议组织、文件档案管理、财务管理等工作。
            </p>
            <br />
            <p>部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成。</p>
          </div>

          <div className="department-card">
            <div className="department-icon">📢</div>
            <h3>宣传部</h3>
            <p>
              <strong>职责：</strong>负责学联品牌建设、新媒体运营、活动宣传推广、设计制作等工作。
            </p>
            <br />
            <p>部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成。</p>
          </div>

          <div className="department-card">
            <div className="department-icon">🎪</div>
            <h3>组织部</h3>
            <p>
              <strong>职责：</strong>策划组织各类文化活动、体育赛事、节日庆典，丰富会员课余生活。
            </p>
            <br />
            <p>部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成。</p>
          </div>

          <div className="department-card">
            <div className="department-icon">🤝</div>
            <h3>外联部</h3>
            <p>
              <strong>职责：</strong>负责对外联络、合作交流、赞助洽谈、企业对接等工作。
            </p>
            <br />
            <p>部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成。</p>
          </div>

          <div className="department-card">
            <div className="department-icon">🎓</div>
            <h3>信息部</h3>
            <p>
              <strong>职责：</strong>信息部信息部信息部信息部信息部信息部。
            </p>
            <br />
            <p>部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成部门构成。</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#f8f9fa', margin: 0, maxWidth: '100%', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title">加入我们</h2>
          <p className="section-subtitle">Join Us</p>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#555', marginBottom: '2rem' }}>
              延世大学中国学生学者联合会欢迎所有有热情、有责任心的同学加入我们的团队！无论你擅长策划、设计、宣传还是组织协调，我们都有适合你的岗位。在这里，你将结识志同道合的朋友，锻炼自己的能力，为中国学生学者服务。
            </p>
            <a href="#" className="cta-button">
              立即报名
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default DepartmentsPage;

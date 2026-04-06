function AboutPage() {
  return (
    <>
      <div className="page-header">
        <h1>关于本会</h1>
        <p>About Us</p>
      </div>

      <section className="section">
        <div className="about-content">
          <div className="about-text">
            <h3>我们的使命</h3>
            <p>
              延世大学中国学生学者联合会（YSCSSA）是由在延世大学学习和工作的中国学生学者自发组织成立的非营利性组织。我们致力于为在韩中国学生学者提供一个交流、学习、互助的平台。
            </p>
            <br />
            <p>
              关于本会关于本会关于本会关于本会关于本会关于本会关于本会关于本会关于本会关于本会关于本会关于本会关于本会关于本会关于本会关于本会关于本会关于本会关于本会关于本会关于本会。
            </p>
            <br />
            <p>我们秉承“服务学生、促进交流、传承文化”的宗旨，为会员提供学习、生活、就业等方面的帮助和支持。</p>
            <br />
            <h3>组织架构</h3>
            <p>学联设有主席团，下设秘书处、宣传部、文体部、外联部、学术部、权益部等多个职能部门，各司其职，协同合作，共同为会员服务。</p>
            <br />
            <h3>联系我们</h3>
            <p>如果您对学联的工作有任何建议或疑问，欢迎随时与我们联系。我们期待与您的交流！</p>
            <p>
              <strong>邮箱：</strong>contact@yscssa.org
            </p>
            <p>
              <strong>微信公众号：</strong>延世大学中国学联
            </p>
          </div>

          <div className="about-image">
            <div>
              <h3 style={{ marginBottom: '1.5rem' }}>关于我们的图片</h3>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.8rem' }}>图片</p>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.8rem' }}>图片</p>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.8rem' }}>图片</p>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.8rem' }}>图片</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#f8f9fa', margin: 0, maxWidth: '100%', padding: '4rem 2rem' }}>
        <h2 className="section-title">我们的服务</h2>
        <p className="section-subtitle">Our Services</p>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="departments-grid">
            <div className="department-card">
              <div className="department-icon">🎓</div>
              <h3>新生服务</h3>
              <p>为新生提供入学指导、校园介绍、生活咨询等全方位服务，帮助新生快速适应留学生活。</p>
            </div>
            <div className="department-card">
              <div className="department-icon">🎪</div>
              <h3>文化活动</h3>
              <p>定期组织文化交流、节日庆典、体育竞赛等丰富多彩的活动，增进会员间的友谊。</p>
            </div>
            <div className="department-card">
              <div className="department-icon">💼</div>
              <h3>职业发展</h3>
              <p>举办求职讲座、职业规划指导、企业参访等活动，为会员的职业发展保驾护航。</p>
            </div>
            <div className="department-card">
              <div className="department-icon">🛡️</div>
              <h3>权益维护</h3>
              <p>维护会员合法权益，提供法律咨询、心理辅导等服务，保障会员的学习和生活。</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;

const services = [
  {
    icon: 'school',
    title: '新生服务',
    description: '为新生提供入学指导、校园介绍、生活咨询等全方位服务，帮助新生快速适应留学生活。'
  },
  {
    icon: 'festival',
    title: '文化活动',
    description: '定期组织文化交流、节日庆典、体育竞赛等丰富多彩的活动，增进会员间的友谊。'
  },
  {
    icon: 'work',
    title: '职业发展',
    description: '举办求职讲座、职业规划指导、企业参访等活动，为会员的职业发展保驾护航。'
  },
  {
    icon: 'shield',
    title: '权益维护',
    description: '维护会员合法权益，提供法律咨询、心理辅导等服务，保障会员的学习和生活。'
  }
];

function AboutPage() {
  return (
    <>
      <section className="container section">
        <div className="about-content">
          <div className="about-text">
            <span className="chip chip-accent">关于我们</span>
            <h1 style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '16px 0 24px' }}>
              连接中国学子，传承文化精神，共创美好未来
            </h1>
            <p className="lead">
              延世大学中国学生学者联合会（YSCSSA）是由在延世大学学习和工作的中国学生学者自发组织成立的非营利性组织。我们致力于为在韩中国学生学者提供一个交流、学习、互助的平台，搭建起学术交流与生活互助的桥梁。
            </p>

            <div className="about-highlights">
              <div>
                <div className="about-highlight-title">
                  <span className="material-symbols-outlined">account_tree</span>
                  <h3>组织架构</h3>
                </div>
                <p>
                  学联设有主席团，下设战略运营部、媒体宣传部、组织部、合作交流部、信息技术部等多个职能部门，各司其职，协同合作，共同为会员服务。
                </p>
              </div>

              <div>
                <div className="about-highlight-title">
                  <span className="material-symbols-outlined">flag</span>
                  <h3>我们的使命</h3>
                </div>
                <p>
                  秉承“服务学生、促进交流、传承文化”的宗旨，为会员提供学习、生活、就业等方面的帮助和支持，打造互助、包容、充满活力的华人社区。
                </p>
              </div>
            </div>

            <div className="contact-card">
              <h4>联系方式</h4>
              <div className="contact-list">
                <div>
                  <span className="material-symbols-outlined">location_on</span>
                  <span>Yonsei University, Seoul, South Korea</span>
                </div>
                <div>
                  <span className="material-symbols-outlined">mail</span>
                  <span>contact@yscssa.org</span>
                </div>
                <div>
                  <span className="material-symbols-outlined">chat</span>
                  <span>微信公众号：延世大学中国学联</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-image">
            <div>
              <h3>关于我们的图片</h3>
              <p>此处可放置学联合影、校园或活动照片。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">核心业务</h2>
          <p className="section-subtitle">
            我们提供多样化的服务与活动，旨在全方位提升中国留学生在延世大学的学习与生活体验。
          </p>

          <div className="departments-grid grid-4">
            {services.map((service) => (
              <div className="department-card" key={service.title}>
                <div className="department-icon">
                  <span className="material-symbols-outlined">{service.icon}</span>
                </div>
                <h3 style={{ marginTop: '16px' }}>{service.title}</h3>
                <p className="department-summary">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;

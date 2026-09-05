import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { loadPublishedActivities } from '../data/activities';

function HomePage() {
  const latestActivity = useMemo(() => loadPublishedActivities()[0], []);

  return (
    <div className="hero-wrap">
      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">
            <span className="dot" />
            Yonsei Chinese Students and Scholars Association
          </div>

          <h1>延世大学中国学生学者联合会</h1>

          <p>连接中国学子，传承文化精神，共创美好未来</p>

          <div className="hero-actions">
            <Link to="/about" className="cta-button">
              了解更多
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link to="/activities" className="cta-button cta-button-outline">
              活动概览
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <div className="hero-stat-value">6</div>
              <div className="hero-stat-label">职能部门</div>
            </div>
            <div>
              <div className="hero-stat-value">50+</div>
              <div className="hero-stat-label">年度活动</div>
            </div>
            <div>
              <div className="hero-stat-value">2000+</div>
              <div className="hero-stat-label">服务学生学者</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-frame">
            <div className="hero-frame-placeholder">
              <span className="material-symbols-outlined">photo_camera</span>
              校园主视觉图片
            </div>

            {latestActivity && (
              <div className="hero-glass-card">
                <div>
                  <p className="label">最新活动</p>
                  <p className="value">{latestActivity.title}</p>
                </div>
                <div className="hero-glass-icon">
                  <span className="material-symbols-outlined">event</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

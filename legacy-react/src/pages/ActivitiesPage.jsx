import { useMemo, useState } from 'react';
import { activityCategories, formatActivityDate, loadPublishedActivities } from '../data/activities';

function ActivitiesPage() {
  const [activeCategory, setActiveCategory] = useState('全部活动');
  const activities = useMemo(() => loadPublishedActivities(), []);

  const filteredActivities = useMemo(() => {
    if (activeCategory === '全部活动') {
      return activities;
    }

    return activities.filter((activity) => activity.category === activeCategory);
  }, [activeCategory, activities]);

  return (
    <>
      <div className="page-header">
        <h1>活动概览</h1>
        <p>
          延世大学中国学生学者联合会每年举办数十场丰富多彩的活动，涵盖文化交流、学术讲座、体育竞赛、节日庆典等多个领域。我们致力于为会员打造一个充满活力和温暖的社区。
        </p>
      </div>

      <section className="container section">
        <div className="activity-filters">
          {activityCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={`activity-filter-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="activities-grid">
          {filteredActivities.map((activity, index) => (
            <article
              className={`activity-card ${index === 0 ? 'featured' : ''}`}
              key={activity.id || `${activity.title}-${activity.date}`}
            >
              <div className="activity-media">
                {activity.coverMode === 'image' && activity.coverImage ? (
                  <img src={activity.coverImage} alt={activity.title} className="activity-image activity-image-media" />
                ) : (
                  <div className="activity-image">{activity.imageText || activity.title}</div>
                )}
                <span className="chip">{activity.category}</span>
              </div>

              <div className="activity-content">
                <div className="activity-meta">
                  <span>
                    <span className="material-symbols-outlined">calendar_today</span>
                    {activity.date ? formatActivityDate(activity.date) : '时间待定'}
                  </span>
                  <span>
                    <span className="material-symbols-outlined">location_on</span>
                    {activity.location || '地点待定'}
                  </span>
                </div>

                <h3>{activity.title}</h3>
                <p>{activity.description}</p>

                {activity.detailLink && activity.detailLink !== '#' && (
                  <a href={activity.detailLink} target="_blank" rel="noreferrer" className="link-arrow">
                    查看详细信息
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredActivities.length === 0 && <p className="activity-empty">该分类下暂时没有活动，稍后会更新。</p>}
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">精彩瞬间</h2>
          <p className="section-subtitle">Memorable Moments</p>

          <div className="gallery-grid">
            {['活动照片 1', '活动照片 2', '活动照片 3', '活动照片 4'].map((label) => (
              <div className="gallery-item" key={label}>
                <span className="material-symbols-outlined">photo_camera</span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ActivitiesPage;

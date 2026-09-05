import { useEffect, useMemo, useState } from 'react';
import {
  activityAuthKey,
  activityCategories,
  activityDraftStorageKey,
  activityStorageKey,
  createEmptyActivity,
  defaultActivities,
  formatActivityDate,
  loadActivityDrafts,
  loadPublishedActivities
} from '../data/activities';

const adminPassword = 'admin';

function getInitialFormState(drafts) {
  return drafts[0] ?? createEmptyActivity();
}

function ActivityAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => window.sessionStorage.getItem(activityAuthKey) === 'true');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [publishedActivities, setPublishedActivities] = useState(() => loadPublishedActivities());
  const [draftActivities, setDraftActivities] = useState(() => loadActivityDrafts());
  const [selectedId, setSelectedId] = useState(() => loadActivityDrafts()[0]?.id ?? null);
  const [formState, setFormState] = useState(() => getInitialFormState(loadActivityDrafts()));
  const [message, setMessage] = useState('');

  const selectedDraft = useMemo(() => draftActivities.find((activity) => activity.id === selectedId) ?? null, [draftActivities, selectedId]);

  useEffect(() => {
    window.localStorage.setItem(activityDraftStorageKey, JSON.stringify(draftActivities));
  }, [draftActivities]);

  useEffect(() => {
    window.localStorage.setItem(activityStorageKey, JSON.stringify(publishedActivities));
  }, [publishedActivities]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const currentDraft = selectedDraft ?? draftActivities[0] ?? createEmptyActivity();
    setFormState(currentDraft);
    if (!selectedId && draftActivities.length > 0) {
      setSelectedId(draftActivities[0].id);
    }
  }, [draftActivities, isAuthenticated, selectedDraft, selectedId]);

  useEffect(() => {
    if (!isAuthenticated) {
      setPassword('');
      setAuthError('');
      setMessage('');
    }
  }, [isAuthenticated]);

  function handleLogin(event) {
    event.preventDefault();

    if (password === adminPassword) {
      window.sessionStorage.setItem(activityAuthKey, 'true');
      setIsAuthenticated(true);
      setAuthError('');
      setMessage('登录成功。');
      return;
    }

    setAuthError('密码错误，请重新输入。');
  }

  function handleLogout() {
    window.sessionStorage.removeItem(activityAuthKey);
    setIsAuthenticated(false);
    setPassword('');
    setAuthError('');
    setSelectedId(null);
    setFormState(createEmptyActivity());
    setMessage('已退出登录。');
  }

  function updateField(field, value) {
    setFormState((current) => ({
      ...current,
      [field]: value,
      updatedAt: new Date().toISOString()
    }));
  }

  function applyImageFile(file) {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormState((current) => ({
        ...current,
        coverImage: typeof reader.result === 'string' ? reader.result : '',
        coverMode: 'image',
        updatedAt: new Date().toISOString()
      }));
    };
    reader.readAsDataURL(file);
  }

  function handleCreateDraft() {
    const draft = createEmptyActivity();
    setDraftActivities((currentDrafts) => [draft, ...currentDrafts]);
    setSelectedId(draft.id);
    setFormState(draft);
    setMessage('已创建新草稿。');
  }

  function handleSelectDraft(activity) {
    setSelectedId(activity.id);
    setFormState(activity);
  }

  function handleSaveDraft() {
    if (!formState.title.trim()) {
      setMessage('草稿标题不能为空。');
      return;
    }

    const nextDraft = {
      ...formState,
      status: 'draft',
      updatedAt: new Date().toISOString()
    };

    setDraftActivities((currentDrafts) => {
      const exists = currentDrafts.some((item) => item.id === nextDraft.id);
      if (exists) {
        return currentDrafts.map((item) => (item.id === nextDraft.id ? nextDraft : item));
      }

      return [nextDraft, ...currentDrafts];
    });
    setSelectedId(nextDraft.id);
    setFormState(nextDraft);
    setMessage('草稿已保存到本地浏览器。');
  }

  function handlePublish() {
    if (!formState.title.trim()) {
      setMessage('发布前请先填写标题。');
      return;
    }

    const publishedItem = {
      ...formState,
      status: 'published',
      updatedAt: new Date().toISOString()
    };

    setPublishedActivities((currentPublished) => {
      const filtered = currentPublished.filter((activity) => activity.id !== publishedItem.id);
      return [publishedItem, ...filtered];
    });
    setDraftActivities((currentDrafts) => currentDrafts.filter((activity) => activity.id !== publishedItem.id));
    setSelectedId(publishedItem.id);
    setFormState(publishedItem);
    setMessage('已发布到前台活动页。');
  }

  function handleDeleteDraft() {
    if (!selectedId) {
      setMessage('没有可删除的草稿。');
      return;
    }

    setDraftActivities((currentDrafts) => currentDrafts.filter((activity) => activity.id !== selectedId));
    setSelectedId(null);
    setFormState(createEmptyActivity());
    setMessage('草稿已删除。');
  }

  function handleDeleteActivity(activityId) {
    const target = [...draftActivities, ...publishedActivities].find((item) => item.id === activityId);
    if (!target) {
      setMessage('未找到可删除的内容。');
      return;
    }

    const confirmDelete = window.confirm(`确定要删除「${target.title || '未命名活动'}」吗？`);
    if (!confirmDelete) {
      return;
    }

    setDraftActivities((currentDrafts) => currentDrafts.filter((activity) => activity.id !== activityId));
    setPublishedActivities((currentPublished) => currentPublished.filter((activity) => activity.id !== activityId));

    if (selectedId === activityId) {
      setSelectedId(null);
      setFormState(createEmptyActivity());
    }

    setMessage('已有内容已删除。');
  }

  function handleRestoreDefaults() {
    setPublishedActivities(defaultActivities);
    setDraftActivities([]);
    setSelectedId(null);
    setFormState(createEmptyActivity());
    setMessage('已恢复示例数据。');
  }

  if (!isAuthenticated) {
    return (
      <section className="admin-login-shell">
        <div className="admin-login-card">
          <h1>活动管理登录</h1>
          <p>请输入管理员密码进入内容管理系统。</p>
          <form className="admin-login-form" onSubmit={handleLogin}>
            <label>
              密码
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="请输入密码" autoComplete="current-password" />
            </label>
            {authError && <p className="admin-error">{authError}</p>}
            <button type="submit" className="cta-button">
              登录
            </button>
          </form>
        </div>
      </section>
    );
  }

  const coverPreview = formState.coverMode === 'image' && formState.coverImage ? (
    <img src={formState.coverImage} alt="活动封面预览" className="admin-image-preview" />
  ) : (
    <div className="activity-image">{formState.imageText || '预览'}</div>
  );

  return (
    <>
      <div className="page-header">
        <h1>活动管理中心</h1>
        <p>Content Management System</p>
      </div>

      <section className="admin-shell">
        <div className="admin-toolbar">
          <div>
            <h2 className="section-title">管理者页面</h2>
            <p className="section-subtitle">用于活动内容新增、编辑、保存草稿和发布。</p>
          </div>
          <div className="admin-actions">
            <button type="button" className="admin-secondary-button" onClick={handleCreateDraft}>
              新建草稿
            </button>
            <button type="button" className="admin-secondary-button" onClick={handleRestoreDefaults}>
              恢复示例数据
            </button>
            <button type="button" className="admin-danger-button" onClick={handleLogout}>
              退出登录
            </button>
          </div>
        </div>

        <div className="admin-grid">
          <aside className="admin-sidebar">
            <h3>草稿列表</h3>
            {draftActivities.length === 0 ? (
              <p className="admin-empty">暂无草稿，先创建一个活动吧。</p>
            ) : (
              <ul className="admin-list">
                {draftActivities.map((activity) => (
                  <li key={activity.id}>
                    <button
                      type="button"
                      className={`admin-list-item ${selectedId === activity.id ? 'active' : ''}`}
                      onClick={() => handleSelectDraft(activity)}
                    >
                      <span>{activity.title || '未命名草稿'}</span>
                      <small>{formatActivityDate(activity.updatedAt)}</small>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <h3 style={{ marginTop: '2rem' }}>已发布内容</h3>
            <div className="admin-stats">当前发布 {publishedActivities.length} 条</div>

            <h3 style={{ marginTop: '2rem' }}>已有内容删除</h3>
            <div className="admin-content-delete-list">
              {[...draftActivities, ...publishedActivities].length === 0 ? (
                <p className="admin-empty">暂无可删除内容。</p>
              ) : (
                [...draftActivities, ...publishedActivities].map((activity) => (
                  <div key={activity.id} className="admin-content-delete-item">
                    <div>
                      <strong>{activity.title || '未命名活动'}</strong>
                      <p>{activity.status === 'published' ? '已发布' : '草稿'}</p>
                    </div>
                    <button type="button" className="admin-danger-button" onClick={() => handleDeleteActivity(activity.id)}>
                      删除
                    </button>
                  </div>
                ))
              )}
            </div>
          </aside>

          <main className="admin-editor">
            <div className="admin-form-grid">
              <label>
                标题
                <input value={formState.title} onChange={(event) => updateField('title', event.target.value)} placeholder="请输入活动标题" />
              </label>
              <label>
                时间
                <input type="datetime-local" value={formState.date} onChange={(event) => updateField('date', event.target.value)} />
              </label>
              <label>
                分类
                <select value={formState.category} onChange={(event) => updateField('category', event.target.value)}>
                  {activityCategories.filter((item) => item !== '全部活动').map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                卡片内容类型
                <select value={formState.coverMode} onChange={(event) => updateField('coverMode', event.target.value)}>
                  <option value="text">卡片文字</option>
                  <option value="image">上传图片</option>
                </select>
              </label>
              {formState.coverMode === 'text' ? (
                <label>
                  卡片文字
                  <input value={formState.imageText} onChange={(event) => updateField('imageText', event.target.value)} placeholder="卡片封面文字" />
                </label>
              ) : (
                <label>
                  上传图片
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => applyImageFile(event.target.files?.[0] ?? null)}
                  />
                </label>
              )}
              <label>
                活动地点
                <input value={formState.location} onChange={(event) => updateField('location', event.target.value)} placeholder="例如：延世大学校园内" />
              </label>
              <label>
                详细链接
                <input value={formState.detailLink} onChange={(event) => updateField('detailLink', event.target.value)} placeholder="微信公众号或宣传页链接" />
              </label>
              <label className="admin-full-width">
                活动详情
                <textarea value={formState.description} onChange={(event) => updateField('description', event.target.value)} rows={7} placeholder="填写活动说明、时间、地点、报名方式等" />
              </label>
            </div>

            <div className="admin-preview">
              <div className="admin-preview-card">
                {coverPreview}
                <div className="activity-content">
                  <h3>{formState.title || '活动标题预览'}</h3>
                  <p className="activity-date">{formState.date ? formatActivityDate(formState.date) : '活动时间预览'}</p>
                  <p>{formState.description || '活动详情预览'}</p>
                  <p style={{ marginTop: '0.75rem' }}>
                    <strong>地点：</strong>
                    {formState.location || '未填写'}
                  </p>
                </div>
              </div>
            </div>

            <div className="admin-actions-row">
              <button type="button" className="cta-button" onClick={handleSaveDraft}>
                保存草稿
              </button>
              <button type="button" className="admin-secondary-button" onClick={handlePublish}>
                发布到前台
              </button>
              <button type="button" className="admin-danger-button" onClick={handleDeleteDraft}>
                删除草稿
              </button>
            </div>

            {message && <p className="admin-message">{message}</p>}
          </main>
        </div>
      </section>
    </>
  );
}

export default ActivityAdminPage;

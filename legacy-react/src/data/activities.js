export const activityStorageKey = 'yscssa.activities.published';
export const activityDraftStorageKey = 'yscssa.activities.drafts';
export const activityAuthKey = 'yscssa.activities.adminAuth';

export const activityCategories = ['全部活动', '文化活动', '学术讲座', '体育竞赛', '节日庆典'];

function createActivityId(prefix = 'activity') {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${prefix}-${Date.now()}`;
}

export function createEmptyActivity() {
  return {
    id: createActivityId(),
    title: '',
    date: '',
    category: '文化活动',
    imageText: '',
    coverImage: '',
    coverMode: 'text',
    location: '',
    detailLink: '',
    description: '',
    status: 'draft',
    updatedAt: new Date().toISOString()
  };
}

export const defaultActivities = [
  {
    id: 'welcome-party-2024',
    title: '2024秋季迎新晚会',
    date: '2024年9月',
    category: '节日庆典',
    imageText: '迎新晚会',
    coverImage: '',
    coverMode: 'text',
    location: '延世大学校园内',
    detailLink: '#',
    description:
      '活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览。',
    status: 'published',
    updatedAt: '2024-09-01T00:00:00.000Z'
  },
  {
    id: 'china-day-2024',
    title: '中国日',
    date: '2024年9月',
    category: '文化活动',
    imageText: '中国日',
    coverImage: '',
    coverMode: 'text',
    location: '延世大学校园内',
    detailLink: '#',
    description:
      '活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览。',
    status: 'published',
    updatedAt: '2024-09-10T00:00:00.000Z'
  },
  {
    id: 'academic-sharing-2024',
    title: '学术分享会',
    date: '2024年10月',
    category: '学术讲座',
    imageText: '学术分享',
    coverImage: '',
    coverMode: 'text',
    location: '线上会议',
    detailLink: '#',
    description:
      '活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览活动概览。',
    status: 'published',
    updatedAt: '2024-10-05T00:00:00.000Z'
  }
];

function normalizeActivity(activity) {
  return {
    ...createEmptyActivity(),
    ...activity,
    coverMode: activity.coverImage ? 'image' : activity.coverMode || 'text'
  };
}

export function loadPublishedActivities() {
  if (typeof window === 'undefined') {
    return defaultActivities.map(normalizeActivity);
  }

  try {
    const saved = window.localStorage.getItem(activityStorageKey);
    if (!saved) {
      return defaultActivities.map(normalizeActivity);
    }

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed.map(normalizeActivity) : defaultActivities.map(normalizeActivity);
  } catch {
    return defaultActivities.map(normalizeActivity);
  }
}

export function loadActivityDrafts() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const saved = window.localStorage.getItem(activityDraftStorageKey);
    return saved ? JSON.parse(saved).map(normalizeActivity) : [];
  } catch {
    return [];
  }
}

export function formatActivityDate(value) {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

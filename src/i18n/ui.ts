export const languages = ['zh', 'ko'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'zh';

/**
 * 界面文字（PRD 3.1：界面文字中韩都有）。
 * 韩语文案须由韩语流利的成员通读定稿后才能上线（PRD 3.4 / 验收「内容」项）。
 */
export const ui = {
  zh: {
    'site.name': 'YSCSSA 延世学联',
    'site.fullName': '延世大学中国学生学者联谊会',
    'site.description': '延世大学中国学生学者联谊会官方网站：学联简介、活动信息与新生指南。',

    'nav.home': '首页',
    'nav.about': '关于我们',
    'nav.events': '活动',
    'nav.guide': '新生指南',
    'nav.partnership': '合作与赞助',
    'nav.menu': '打开导航菜单',
    'nav.lang': '语言',
    'nav.langSwitch': '한국어',
    'nav.login': '登录',
    'nav.loginHint': '内容后台登录（仅限学联维护人员）',

    'home.eyebrow': 'Yonsei Chinese Students and Scholars Association',
    'home.recentEvents': '近期活动',
    'home.viewAllEvents': '查看全部活动',
    'home.platforms': '关注我们',
    'home.platformsIntro': '在以下平台获取最新活动与生活信息。',
    'home.wechatHint': '点击放大二维码',

    'about.title': '关于我们',
    'about.org': '组织架构',

    'events.title': '活动',
    'events.featured': '主打活动',
    'events.filterLabel': '筛选活动',
    'events.filterAll': '全部',
    'events.upcoming': '即将举行',
    'events.ended': '已结束',
    'events.empty': '暂无活动。',
    'events.emptyFilter': '该分类下暂无活动。',
    'events.date': '日期',
    'events.location': '地点',
    'events.gallery': '活动图集',
    'events.back': '返回活动列表',

    'guide.title': '新生指南',
    'guide.intro': '面向中国学生的长效生活信息，持续更新。',
    'guide.search': '搜索指南',
    'guide.searchPlaceholder': '输入关键词，如：登录证',
    'guide.noResult': '没有找到相关内容，换个关键词试试。',
    'guide.updated': '最后更新',
    'guide.back': '返回新生指南',
    'guide.empty': '暂无内容。',

    'partnership.ways': '合作方式',
    'partnership.online': '线上宣传',
    'partnership.offline': '线下合作',
    'partnership.contact': '联系我们',
    'partnership.email': '邮箱',
    'partnership.wechat': '微信号',

    'notFound.title': '页面不存在',
    'notFound.body': '你访问的页面可能已被移动或删除。',
    'notFound.home': '返回首页',

    'footer.rights': '版权所有',
    'footer.email': '联系邮箱',
    'footer.nav': '网站导航',
    'footer.follow': '关注我们',
    'footer.wechat': '微信公众号'
  },
  ko: {
    'site.name': 'YSCSSA 연세중국학생학자연의회',
    'site.fullName': '연세대학교 중국학생학자연의회',
    'site.description':
      '연세대학교 중국학생학자연의회 공식 홈페이지: 단체 소개, 행사 정보, 신입생 가이드.',

    'nav.home': '홈',
    'nav.about': '소개',
    'nav.events': '행사',
    'nav.guide': '신입생 가이드',
    'nav.partnership': '협력 및 후원',
    'nav.menu': '메뉴 열기',
    'nav.lang': '언어',
    'nav.langSwitch': '中文',
    'nav.login': '로그인',
    'nav.loginHint': '콘텐츠 관리자 로그인 (운영진 전용)',

    'home.eyebrow': 'Yonsei Chinese Students and Scholars Association',
    'home.recentEvents': '최근 행사',
    'home.viewAllEvents': '전체 행사 보기',
    'home.platforms': '채널 안내',
    'home.platformsIntro': '아래 채널에서 최신 행사와 생활 정보를 확인하실 수 있습니다.',
    'home.wechatHint': 'QR 코드를 클릭하면 확대됩니다',

    'about.title': '소개',
    'about.org': '조직 구성',

    'events.title': '행사',
    'events.featured': '주요 행사',
    'events.filterLabel': '행사 필터',
    'events.filterAll': '전체',
    'events.upcoming': '예정',
    'events.ended': '종료',
    'events.empty': '등록된 행사가 없습니다.',
    'events.emptyFilter': '해당 분류에 등록된 행사가 없습니다.',
    'events.date': '일자',
    'events.location': '장소',
    'events.gallery': '행사 사진',
    'events.back': '행사 목록으로',

    'guide.title': '신입생 가이드',
    'guide.intro': '중국 유학생을 위한 생활 정보를 지속적으로 업데이트합니다.',
    'guide.search': '가이드 검색',
    'guide.searchPlaceholder': '검색어를 입력하세요',
    'guide.noResult': '검색 결과가 없습니다. 다른 검색어를 입력해 주세요.',
    'guide.updated': '최종 수정',
    'guide.back': '가이드 목록으로',
    'guide.empty': '등록된 내용이 없습니다.',

    'partnership.ways': '협력 방식',
    'partnership.online': '온라인 홍보',
    'partnership.offline': '오프라인 협력',
    'partnership.contact': '연락처',
    'partnership.email': '이메일',
    'partnership.wechat': '위챗 ID',

    'notFound.title': '페이지를 찾을 수 없습니다',
    'notFound.body': '요청하신 페이지가 이동되었거나 삭제되었을 수 있습니다.',
    'notFound.home': '홈으로 돌아가기',

    'footer.rights': 'All rights reserved.',
    'footer.email': '이메일',
    'footer.nav': '사이트 메뉴',
    'footer.follow': '채널 안내',
    'footer.wechat': '위챗 공식계정'
  }
} as const;

export type UIKey = keyof (typeof ui)['zh'];

export function t(lang: Lang, key: UIKey, vars?: Record<string, string | number>): string {
  const dict = ui[lang] as Record<string, string>;
  let value = dict[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      value = value.replace(`{${k}}`, String(v));
    }
  }
  return value;
}

/** 中文在根路径，韩语统一加 /ko 前缀（PRD 2.2）。 */
export function localePath(lang: Lang, path: string): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  return lang === 'zh' ? clean || '/' : `/ko${clean}`;
}

/** 由当前路径推出另一种语言的同页地址（PRD 3.3：切换后停留在当前页面）。 */
export function alternatePath(lang: Lang, path: string): string {
  const stripped = path.replace(/^\/ko(?=\/|$)/, '') || '/';
  return localePath(lang === 'zh' ? 'ko' : 'zh', stripped);
}

export const htmlLang: Record<Lang, string> = { zh: 'zh', ko: 'ko' };

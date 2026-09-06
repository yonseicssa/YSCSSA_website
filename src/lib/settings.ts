import data from '../content/settings/site.json';

/** 全站设置（后台「全站设置」可改）。 */
export const settings = data as {
  email: string;
  /** 主打活动：活动文件名（不含 .md），全站唯一；留空表示不设主打（PRD 4.3） */
  featuredEvent: string;
  wallpaper: string;
  wallpaperAlt: string;
  xiaohongshu: string;
  instagram: string;
  wechatQr: string;
  wechatName: string;
};

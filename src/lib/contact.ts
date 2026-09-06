import data from '../content/settings/contact.json';

/**
 * 联系我们区块的两张名片（PRD 4.5）。
 * 名片图片全站只有一版，图片本身同时包含中文与韩文，不随页面语言切换；
 * 只有职务文字随语言切换，邮箱与微信号为中性内容不作翻译。
 * 邮箱一律使用域名邮箱，转发至现任者的私人邮箱——换届时只改转发目标，页面无需改动。
 */
export const contact = data as {
  cards: {
    image: string;
    /** 中文原文，不作转写；用于名片图片的 alt 文本 */
    name: string;
    role: { zh: string; ko: string };
    email: string;
    wechat: string;
  }[];
};

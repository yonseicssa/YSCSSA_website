import data from '../generated/wallpaper.json';

/**
 * 首页壁纸的响应式尺寸，由 scripts/prebuild.mjs 在构建前生成（PRD 4.1）。
 * mobile 为 null 表示原图未能处理（缺失或格式不支持），此时页面直接用原图。
 */
export const wallpaper = data as {
  desktop: string;
  mobile: string | null;
  width: number | null;
  height: number | null;
};

/**
 * 所有图片引用统一经过这里（PRD 6.2）。
 * 日后图片量增长需迁移到对象存储时，只改 IMAGE_BASE 一处。
 * 触发条件参考：仓库图片总量超过 200MB 或文件数超过一千。
 */
const IMAGE_BASE = '';

export function imageUrl(path: string): string {
  if (!path) return '';
  if (/^https?:\/\//.test(path)) return path;
  return `${IMAGE_BASE}${path.startsWith('/') ? path : `/${path}`}`;
}

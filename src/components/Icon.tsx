/**
 * 内联 SVG 图标。
 * 不使用 Material Symbols 网页字体：其可变字体单个文件约 3.8MB，
 * 会让单页资源总量远超 1.5MB 的上限（PRD 7.1）。
 */
export const iconNames = [
  'arrow-forward',
  'arrow-back',
  'calendar',
  'location',
  'search',
  'mail',
  'chat',
  'person',
  'book',
  'camera',
  'external',
  'globe',
  'group',
  'link',
  'chart',
  'megaphone'
] as const;

export type IconName = (typeof iconNames)[number];

const paths: Record<IconName, string> = {
  'arrow-forward': '<path d="M4 12h14"/><path d="M13 6l6 6-6 6"/>',
  'arrow-back': '<path d="M20 12H6"/><path d="M11 6l-6 6 6 6"/>',
  calendar:
    '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M8 3v4"/><path d="M16 3v4"/>',
  location: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M16.5 16.5 21 21"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  chat: '<path d="M20 12c0 3.9-3.6 7-8 7-.9 0-1.8-.1-2.6-.4L4 20l1.4-3.6C4.2 15.2 4 13.6 4 12c0-3.9 3.6-7 8-7s8 3.1 8 7z"/>',
  person: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>',
  book: '<path d="M6 4h11a2 2 0 0 1 2 2v14H8a2 2 0 0 1-2-2z"/><path d="M6 16h13"/>',
  camera:
    '<path d="M3 8a2 2 0 0 1 2-2h2.5l1.5-2h6l1.5 2H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="12.5" r="3.5"/>',
  external:
    '<path d="M14 4h6v6"/><path d="m20 4-8 8"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><ellipse cx="12" cy="12" rx="4" ry="9"/>',
  group:
    '<circle cx="9" cy="8" r="3.2"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.2a3.2 3.2 0 0 1 0 5.6"/><path d="M17.8 14.2A6.5 6.5 0 0 1 21.5 20"/>',
  link: '<path d="M10.5 13.5a4.5 4.5 0 0 0 6.6.4l2.6-2.6a4.5 4.5 0 0 0-6.4-6.4L12 6.2"/><path d="M13.5 10.5a4.5 4.5 0 0 0-6.6-.4l-2.6 2.6a4.5 4.5 0 0 0 6.4 6.4L12 17.8"/>',
  chart: '<path d="M3 20h18"/><path d="M6 20v-6"/><path d="M12 20V6"/><path d="M18 20v-9"/>',
  megaphone:
    '<path d="M4 10v3a1.5 1.5 0 0 0 1.5 1.5H7l7.5 4.5V5.5L7 10H5.5A1.5 1.5 0 0 0 4 10z"/><path d="M18 9.5a4 4 0 0 1 0 5.4"/><path d="M7 14.5V19"/>'
};

export default function Icon({
  name,
  size = 20,
  className = ''
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: paths[name] }}
    />
  );
}

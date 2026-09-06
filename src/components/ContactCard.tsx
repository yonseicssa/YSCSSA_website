import { imageUrl } from '@/lib/images';
import type { contact } from '@/lib/contact';
import { t, type Lang } from '@/i18n/ui';

type Card = (typeof contact)['cards'][number];

/**
 * 名片（PRD 4.5）。
 * 名片图中的邮箱与微信号无法被复制，访客需要逐字符手动输入，输错即联系失败，
 * 手机端尤其明显；搜索引擎与屏幕阅读器同样读不到图中文字。
 * 因此名片图片仅承担品牌展示作用，实际联系信息必须以文本形式同时提供。
 */
export default function ContactCard({ card, lang }: { card: Card; lang: Lang }) {
  const role = card.role[lang];
  // alt 文本为职务与姓名（PRD 4.5）；姓名未填写时只写职务，避免出现空档
  const alt = [role, card.name].filter(Boolean).join(' ');

  return (
    <article className="contact-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="contact-card-image"
        src={imageUrl(card.image)}
        alt={alt}
        width={910}
        height={550}
        loading="lazy"
      />

      <h3 className="contact-card-role">
        {role}
        {card.name && <span className="contact-card-name">{card.name}</span>}
      </h3>

      <dl className="contact-card-details">
        <div>
          <dt>{t(lang, 'partnership.email')}</dt>
          <dd>
            <a href={`mailto:${card.email}`}>{card.email}</a>
          </dd>
        </div>
        <div>
          <dt>{t(lang, 'partnership.wechat')}</dt>
          <dd>{card.wechat}</dd>
        </div>
      </dl>
    </article>
  );
}

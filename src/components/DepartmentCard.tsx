import Icon from './Icon';
import type { DepartmentEntry } from '@/lib/content';
import type { Lang } from '@/i18n/ui';

/**
 * 组织架构的部门卡片（PRD 4.2）。
 * 小组以列表形式置于部门卡片内部——部门在卡外、小组在卡内，
 * 这一包含关系本身即表达了两者的层级，不需要额外的连线或说明。
 */
export default function DepartmentCard({
  department,
  lang
}: {
  department: DepartmentEntry;
  lang: Lang;
}) {
  const { name, description, icon, groups, leadership } = department.data;

  return (
    <article className={`department-card${leadership ? ' department-card-wide' : ''}`}>
      <div className="department-card-top">
        {icon && (
          <span className="department-icon" aria-hidden="true">
            <Icon name={icon} size={24} />
          </span>
        )}
        <h3>{name[lang]}</h3>
      </div>

      <p className="department-summary">{description[lang]}</p>

      {groups.length > 0 && (
        <ul className="department-groups">
          {groups.map((group) => (
            <li key={group.zh}>{group[lang]}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

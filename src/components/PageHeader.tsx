export default function PageHeader({
  title,
  subtitle,
  eyebrow
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <header className="page-header">
      <div className="page-header-inner">
        {eyebrow && <p className="page-header-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </header>
  );
}

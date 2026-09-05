import type { ReactNode } from 'react';

export default function CtaBand({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="cta-band">
      <div className="container">
        <div className="cta-band-inner">
          <h2>{title}</h2>
          {description && <p>{description}</p>}
          <div className="cta-band-actions">{children}</div>
        </div>
      </div>
    </section>
  );
}

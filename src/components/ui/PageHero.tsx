type Props = {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  emoji: string;
};
export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  emoji,
}: Props) {
  return (
    <section className="detail-hero">
      <div className="container detail-hero-grid">
        <div>
          <span className="kicker">{eyebrow}</span>
          <h1>
            {title} {highlight && <em>{highlight}</em>}
          </h1>
          <p>{description}</p>
          <span className="detail-bread">
            TRANG CHỦ / {eyebrow.toUpperCase()}
          </span>
        </div>
        <div className="detail-hero-emoji" aria-hidden="true">
          {emoji}
        </div>
      </div>
    </section>
  );
}

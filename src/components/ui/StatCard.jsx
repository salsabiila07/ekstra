export function StatCard({ label, value, icon, detail, tone = 'blue', className = '' }) {
  return (
    <article className={`ui-stat-card ui-stat-card--${tone} ${className}`.trim()}>
      <div className="ui-stat-card__top"><span className="ui-stat-card__label">{label}</span>{icon && <span className="ui-stat-card__icon" aria-hidden="true">{icon}</span>}</div>
      <div className="ui-stat-card__value">{value}</div>
      {detail && <p className="ui-stat-card__detail">{detail}</p>}
    </article>
  );
}

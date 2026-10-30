export function EmptyState({ title = 'Belum ada data', message = 'Data yang tersedia akan ditampilkan di sini.', action, icon = '◇' }) {
  return (
    <div className="ui-feedback ui-empty-state">
      <span className="ui-feedback__icon" aria-hidden="true">{icon}</span>
      <h2>{title}</h2><p>{message}</p>{action && <div className="ui-feedback__action">{action}</div>}
    </div>
  );
}

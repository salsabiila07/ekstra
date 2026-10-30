export function LoadingState({ label = 'Memuat data…' }) {
  return <div className="ui-feedback ui-loading-state" role="status"><span className="ui-spinner" aria-hidden="true" /><span>{label}</span></div>;
}

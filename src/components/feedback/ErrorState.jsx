export function ErrorState({ title = 'Data belum dapat dimuat', message = 'Terjadi kendala saat memuat data. Silakan coba kembali.', onRetry }) {
  return (
    <div className="ui-feedback ui-error-state" role="alert">
      <span className="ui-feedback__icon" aria-hidden="true">!</span><h2>{title}</h2><p>{message}</p>
      {onRetry && <button className="ui-button ui-button--secondary ui-button--small" type="button" onClick={onRetry}>Coba lagi</button>}
    </div>
  );
}

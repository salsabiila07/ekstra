const statusStyles = {
  Menunggu: 'warning',
  Diterima: 'success',
  Ditolak: 'danger',
  Hadir: 'success',
  Izin: 'info',
  Sakit: 'warning',
  Alfa: 'danger',
  Aktif: 'success',
  Nonaktif: 'neutral',
  Diarsipkan: 'neutral',
};

export function StatusBadge({ status, tone, className = '' }) {
  const style = tone ?? statusStyles[status] ?? 'neutral';
  return <span className={`ui-status-badge ui-status-badge--${style} ${className}`.trim()}><span className="ui-status-badge__dot" aria-hidden="true" />{status}</span>;
}

import { useEffect, useId, useRef } from 'react';
import { Button } from './Button.jsx';

export function Dialog({ open, onClose, title, description, children, actions, className = '' }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function handleCancel(event) {
    event.preventDefault();
    onClose?.();
  }

  return (
    <dialog ref={dialogRef} className={`ui-dialog ${className}`.trim()} aria-labelledby={titleId} aria-describedby={description ? descriptionId : undefined} onCancel={handleCancel} onClose={() => { if (open) onClose?.(); }}>
      <div className="ui-dialog__header"><div><h2 id={titleId}>{title}</h2>{description && <p id={descriptionId}>{description}</p>}</div><Button variant="quiet" size="small" aria-label="Tutup dialog" onClick={onClose}>×</Button></div>
      <div className="ui-dialog__body">{children}</div>
      {actions && <div className="ui-dialog__actions">{actions}</div>}
    </dialog>
  );
}

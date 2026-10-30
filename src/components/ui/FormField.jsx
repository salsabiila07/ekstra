import { useId } from 'react';

export function FormField({ label, hint, error, id, required = false, className = '', ...inputProps }) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={['ui-field', className].filter(Boolean).join(' ')}>
      <label className="ui-field__label" htmlFor={fieldId}>
        {label}{required && <span className="ui-field__required" aria-hidden="true"> *</span>}
        {required && <span className="sr-only"> (wajib diisi)</span>}
      </label>
      <input
        className={`ui-input${error ? ' ui-input--error' : ''}`}
        id={fieldId}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        {...inputProps}
      />
      {hint && <span className="ui-field__hint" id={hintId}>{hint}</span>}
      {error && <span className="ui-field__error" id={errorId} role="alert">{error}</span>}
    </div>
  );
}

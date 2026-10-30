export function Button({ variant = 'primary', size = 'medium', loading = false, disabled = false, className = '', children, type = 'button', ...props }) {
  const classes = ['ui-button', `ui-button--${variant}`, `ui-button--${size}`, className].filter(Boolean).join(' ');

  return (
    <button className={classes} type={type} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
      {loading && <span className="ui-spinner ui-spinner--button" aria-hidden="true" />}
      {children}
    </button>
  );
}

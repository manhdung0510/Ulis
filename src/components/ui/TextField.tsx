import { useId, type InputHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
  maxLength?: number;
  value: string;
}

export function TextField({
  label,
  helperText,
  error,
  maxLength,
  value,
  id,
  required,
  className = '',
  ...rest
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const { t } = useTranslation();

  const describedBy = [helperText ? helperId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined;

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={inputId} className="block text-sm font-medium text-ink">
          {label}
          {required && <span className="ml-1 text-primary" aria-hidden="true">*</span>}
        </label>
        {typeof maxLength === 'number' && (
          <span className="text-xs text-muted">
            {t('common.charCount', { count: value.length, max: maxLength })}
          </span>
        )}
      </div>

      <input
        id={inputId}
        value={value}
        maxLength={maxLength}
        required={required}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy}
        className={[
          'w-full min-h-[44px] rounded-sm border bg-surface px-3.5 py-2.5 text-base text-ink',
          'placeholder:text-muted/70 transition-colors duration-150',
          error ? 'border-primary' : 'border-border-strong focus:border-primary',
          'disabled:cursor-not-allowed disabled:bg-sand/60 disabled:opacity-70',
          className,
        ].join(' ')}
        {...rest}
      />

      {helperText && (
        <p id={helperId} className="text-xs text-muted">
          {helperText}
        </p>
      )}

      {error && (
        <p id={errorId} role="status" aria-live="polite" className="text-sm text-primary">
          {error}
        </p>
      )}
    </div>
  );
}

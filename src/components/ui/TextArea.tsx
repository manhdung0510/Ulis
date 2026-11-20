import { useId, type TextareaHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { SupportHintLink } from './SupportHintLink';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
  error?: string;
  maxLength?: number;
  value: string;
  showSupportHint?: boolean;
}

export function TextArea({
  label,
  helperText,
  error,
  maxLength,
  value,
  id,
  required,
  showSupportHint = true,
  rows = 4,
  className = '',
  ...rest
}: TextAreaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const helperId = `${textareaId}-helper`;
  const errorId = `${textareaId}-error`;
  const { t } = useTranslation();

  const describedBy = [helperText ? helperId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined;

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={textareaId} className="block text-sm font-medium text-ink">
          {label}
          {required && <span className="ml-1 text-primary" aria-hidden="true">*</span>}
        </label>
        {typeof maxLength === 'number' && (
          <span className="text-xs text-muted">
            {t('common.charCount', { count: value.length, max: maxLength })}
          </span>
        )}
      </div>

      <textarea
        id={textareaId}
        value={value}
        rows={rows}
        maxLength={maxLength}
        required={required}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy}
        className={[
          'w-full rounded-sm border bg-surface px-3.5 py-2.5 text-base leading-relaxed text-ink',
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

      {showSupportHint && <SupportHintLink />}
    </div>
  );
}

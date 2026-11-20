import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { buttonVariantClasses, type ButtonVariant } from './buttonStyles';

export type { ButtonVariant };

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  loading = false,
  disabled,
  className = '',
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={[
        'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-sm px-4 py-2.5 text-sm font-medium',
        'transition-colors duration-150',
        'disabled:cursor-not-allowed disabled:opacity-55',
        buttonVariantClasses[variant],
        className,
      ].join(' ')}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      <span>{children}</span>
    </button>
  );
}

export type ButtonVariant = 'primary' | 'secondary' | 'quiet';

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-[var(--on-primary)] hover:bg-primary-hover border border-transparent shadow-soft',
  secondary:
    'bg-sand text-ink hover:bg-[#E6DCCB] border border-border-strong',
  quiet:
    'bg-transparent text-ink hover:bg-sand/70 border border-transparent',
};

export function buttonClasses(variant: ButtonVariant = 'primary', className = ''): string {
  return [
    'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-sm px-4 py-2.5 text-sm font-medium',
    'transition-colors duration-150',
    buttonVariantClasses[variant],
    className,
  ].join(' ');
}

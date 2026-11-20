export type ButtonVariant = 'primary' | 'secondary' | 'quiet';

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary:
    'cursor-pointer bg-primary text-[var(--on-primary)] hover:bg-primary-hover border border-transparent shadow-soft active:translate-y-[0.5px]',
  secondary:
    'cursor-pointer bg-sand text-ink hover:bg-[#E6DCCB] border border-border-strong shadow-soft active:translate-y-[0.5px]',
  quiet:
    'cursor-pointer bg-paper/70 text-ink hover:bg-sand border border-border-subtle hover:border-border-strong',
};

export function buttonClasses(variant: ButtonVariant = 'primary', className = ''): string {
  return [
    'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-sm px-4 py-2.5 text-sm font-medium',
    'transition-colors duration-150',
    buttonVariantClasses[variant],
    className,
  ].join(' ');
}

import type { ReactNode } from 'react';

export type TagTone = 'neutral' | 'primary' | 'secondary';

export interface TagProps {
  children: ReactNode;
  tone?: TagTone;
  className?: string;
}

const toneClasses: Record<TagTone, string> = {
  neutral: 'bg-sand text-ink border-border-subtle',
  primary: 'bg-primary-soft text-primary border-primary/25',
  secondary: 'bg-secondary-soft text-secondary border-secondary/25',
};

export function Tag({ children, tone = 'neutral', className = '' }: TagProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-medium leading-5',
        toneClasses[tone],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}

import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tone?: 'surface' | 'sand' | 'paper';
  padded?: boolean;
}

const toneClasses: Record<NonNullable<CardProps['tone']>, string> = {
  surface: 'bg-surface border-border-subtle shadow-soft',
  sand: 'bg-sand border-border-subtle',
  paper: 'bg-paper border-border-subtle',
};

export function Card({
  children,
  tone = 'surface',
  padded = true,
  className = '',
  ...rest
}: CardProps) {
  return (
    <div
      className={[
        'rounded-md border',
        toneClasses[tone],
        padded ? 'p-5 sm:p-6' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}

import type { ReactNode } from 'react';
import { Card } from './Card';

export interface EmptyStateProps {
  title: string;
  body: string;
  action?: ReactNode;
}

export function EmptyState({ title, body, action }: EmptyStateProps) {
  return (
    <Card tone="sand" className="text-center">
      <div className="mx-auto max-w-md space-y-3 py-4">
        <h3 className="font-serif text-lg font-medium text-ink">{title}</h3>
        <p className="text-sm text-muted">{body}</p>
        {action && <div className="pt-2">{action}</div>}
      </div>
    </Card>
  );
}

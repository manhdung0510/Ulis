import { useId, type KeyboardEvent } from 'react';

export interface TabItem<T extends string> {
  id: T;
  label: string;
}

export interface TabsProps<T extends string> {
  items: TabItem<T>[];
  activeId: T;
  onChange: (id: T) => void;
  ariaLabel: string;
}

export function Tabs<T extends string>({
  items,
  activeId,
  onChange,
  ariaLabel,
}: TabsProps<T>) {
  const baseId = useId();

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const next = items[(idx + 1) % items.length];
      if (next) onChange(next.id);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const prev = items[(idx - 1 + items.length) % items.length];
      if (prev) onChange(prev.id);
    }
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="flex flex-wrap gap-1.5 border-b border-border-subtle pb-2"
    >
      {items.map((item, idx) => {
        const selected = item.id === activeId;
        return (
          <button
            key={item.id}
            id={`${baseId}-tab-${item.id}`}
            role="tab"
            type="button"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={[
              'min-h-[44px] cursor-pointer rounded-sm border px-4 py-2 text-sm font-medium transition-colors duration-150',
              selected
                ? 'border-primary bg-primary text-[var(--on-primary)] shadow-soft'
                : 'border-border-subtle bg-sand/70 text-ink hover:border-border-strong hover:bg-sand',
            ].join(' ')}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

import { useId } from 'react';

export interface ChoiceOption {
  value: string;
  label: string;
  description?: string;
  example?: string;
}

interface ChoiceBaseProps {
  name: string;
  options: ChoiceOption[];
  error?: string;
}

export interface SingleChoiceProps extends ChoiceBaseProps {
  mode: 'single';
  value: string;
  onChange: (value: string) => void;
}

export interface MultiChoiceProps extends ChoiceBaseProps {
  mode: 'multi';
  value: string[];
  onChange: (value: string[]) => void;
}

export type ChoiceProps = SingleChoiceProps | MultiChoiceProps;

export function Choice(props: ChoiceProps) {
  const { name, options, error, mode } = props;
  const errorId = useId();

  const toggleMulti = (optionValue: string) => {
    if (mode !== 'multi') return;
    if (props.value.includes(optionValue)) {
      props.onChange(props.value.filter((item) => item !== optionValue));
    } else {
      props.onChange([...props.value, optionValue]);
    }
  };

  return (
    <div className="space-y-2.5" aria-describedby={error ? errorId : undefined}>
      <div className="grid gap-2.5">
        {options.map((option) => {
          const checked =
            mode === 'single' ? props.value === option.value : props.value.includes(option.value);

          return (
            <label
              key={option.value}
              className={[
                'flex min-h-[48px] cursor-pointer items-start gap-3 rounded-sm border p-3.5 transition-colors duration-150',
                checked
                  ? 'border-primary bg-primary-soft/65'
                  : 'border-border-subtle bg-surface hover:border-border-strong',
              ].join(' ')}
            >
              <input
                type={mode === 'single' ? 'radio' : 'checkbox'}
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => {
                  if (mode === 'single') {
                    props.onChange(option.value);
                  } else {
                    toggleMulti(option.value);
                  }
                }}
                className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent-primary)]"
              />
              <span className="space-y-1">
                <span className="block text-sm font-medium text-ink">{option.label}</span>
                {option.description && (
                  <span className="block text-sm text-muted">{option.description}</span>
                )}
                {option.example && (
                  <span className="block text-xs italic text-muted">{option.example}</span>
                )}
              </span>
            </label>
          );
        })}
      </div>

      {error && (
        <p id={errorId} role="status" aria-live="polite" className="text-sm text-primary">
          {error}
        </p>
      )}
    </div>
  );
}

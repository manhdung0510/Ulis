import { useId } from 'react';
import { CheckIcon } from './Icons';

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
  maxSelections?: number;
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
      if (props.maxSelections && props.value.length >= props.maxSelections) {
        return;
      }
      props.onChange([...props.value, optionValue]);
    }
  };

  return (
    <div className="space-y-2.5" aria-describedby={error ? errorId : undefined}>
      <div className="grid gap-2.5">
        {options.map((option) => {
          const checked =
            mode === 'single' ? props.value === option.value : props.value.includes(option.value);
          const limitReached =
            mode === 'multi' &&
            Boolean(props.maxSelections) &&
            props.value.length >= (props.maxSelections ?? 0) &&
            !checked;

          return (
            <label
              key={option.value}
              className={[
                'flex min-h-[52px] items-start gap-3 rounded-sm border p-3.5 transition-all duration-150',
                'focus-within:ring-2 focus-within:ring-[var(--focus-ring)] focus-within:ring-offset-2',
                limitReached
                  ? 'cursor-not-allowed border-border-subtle bg-sand/40 opacity-60'
                  : checked
                    ? 'cursor-pointer border-primary bg-primary-soft/75 shadow-soft'
                    : 'cursor-pointer border-border-strong/60 bg-surface shadow-soft hover:border-primary/70 hover:bg-sand/35',
              ].join(' ')}
            >
              <input
                type={mode === 'single' ? 'radio' : 'checkbox'}
                name={name}
                value={option.value}
                checked={checked}
                disabled={limitReached}
                onChange={() => {
                  if (mode === 'single') {
                    props.onChange(option.value);
                  } else {
                    toggleMulti(option.value);
                  }
                }}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={[
                  'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors',
                  mode === 'single' ? 'rounded-full' : 'rounded-[5px]',
                  checked
                    ? 'border-primary bg-primary text-[var(--on-primary)]'
                    : 'border-border-strong bg-paper text-transparent',
                ].join(' ')}
              >
                {mode === 'single' ? (
                  <span
                    className={`h-2 w-2 rounded-full ${checked ? 'bg-[var(--on-primary)]' : 'bg-transparent'}`}
                  />
                ) : (
                  <CheckIcon size={13} />
                )}
              </span>
              <span className="flex-1 space-y-1">
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

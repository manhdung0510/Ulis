import { useTranslation } from 'react-i18next';

export interface StepperProps {
  currentStep: number;
  totalSteps: number;
  label?: string;
}

export function Stepper({ currentStep, totalSteps, label }: StepperProps) {
  const { t } = useTranslation();
  const safeTotal = Math.max(1, totalSteps);
  const clamped = Math.min(Math.max(1, currentStep), safeTotal);
  const percent = Math.round((clamped / safeTotal) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-medium text-muted">
        <span>{label ?? t('exercises.stepLabel', { current: clamped, total: safeTotal })}</span>
        <span>{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={safeTotal}
        aria-valuenow={clamped}
        className="h-2 w-full overflow-hidden rounded-full bg-sand"
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-200"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

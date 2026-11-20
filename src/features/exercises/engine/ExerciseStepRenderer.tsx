import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Choice, type ChoiceOption } from '@/components/ui/Choice';
import { TextArea } from '@/components/ui/TextArea';
import { Card } from '@/components/ui/Card';
import { EmotionIcon } from '@/components/illustration/EmotionIcons';
import { checkinContentVi } from '@/content/vi/checkin';
import { distortionsVi } from '@/content/vi/distortions';
import { distortionsEn } from '@/content/en/distortions';
import { exercisesContentVi } from '@/content/vi/exercises';
import { exercisesContentEn } from '@/content/en/exercises';
import type { ExerciseStepDefinition } from '@/features/exercises/definitions/exerciseDefinitions';
import type {
  AppLanguage,
  EmotionId,
  EmotionStepValue,
  ExerciseAnswers,
  IntensityLevel,
} from '@/types/domain';

const INTENSITY_LEVELS: IntensityLevel[] = [1, 2, 3, 4, 5];

export interface ExerciseStepRendererProps {
  step: ExerciseStepDefinition;
  answers: ExerciseAnswers;
  lang: AppLanguage;
  error: string;
  onUpdateAnswer: (key: string, value: ExerciseAnswers[string]) => void;
}

export function ExerciseStepRenderer({
  step,
  answers,
  lang,
  error,
  onUpdateAnswer,
}: ExerciseStepRendererProps) {
  const { t } = useTranslation();
  const [exampleOpen, setExampleOpen] = useState(false);

  const exercisesContent = lang === 'en' ? exercisesContentEn : exercisesContentVi;
  const distortions = lang === 'en' ? distortionsEn.items : distortionsVi.items;

  let resolvedOptions: ChoiceOption[] = step.options ?? [];
  if (step.id === 'words' && step.answerKey === 'emotionWords') {
    const groupId = typeof answers.emotionGroup === 'string' ? answers.emotionGroup : '';
    const group =
      exercisesContent.emotionAwareness.groups.find((g) => g.id === groupId) ??
      exercisesContent.emotionAwareness.groups[0];
    resolvedOptions = (group?.words ?? []).map((word) => ({
      value: word,
      label: word,
    }));
  }

  const renderEmotionPicker = (val: EmotionStepValue, onChange: (next: EmotionStepValue) => void) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium text-ink">{step.emotionLabel}</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {checkinContentVi.emotionOrder.map((emotionId: EmotionId) => {
            const checked = val.emotion === emotionId;
            const label = t(`emotions.${emotionId}`);
            return (
              <label
                key={emotionId}
                className={[
                  'flex min-h-[68px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-sm border p-2.5 text-center transition-colors duration-150',
                  'focus-within:ring-2 focus-within:ring-[var(--focus-ring)] focus-within:ring-offset-2',
                  checked
                    ? 'border-primary bg-primary-soft/75 text-ink'
                    : 'border-border-subtle bg-paper text-ink hover:border-border-strong',
                ].join(' ')}
              >
                <input
                  type="radio"
                  name={`${step.id}-emotion`}
                  value={emotionId}
                  checked={checked}
                  onChange={() => onChange({ ...val, emotion: emotionId })}
                  className="sr-only"
                />
                <span className={checked ? 'text-primary' : 'text-ink'}>
                  <EmotionIcon emotion={emotionId} label={label} size={24} decorative />
                </span>
                <span className="text-xs font-medium">{label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-ink">{step.scaleLabel}</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
          {INTENSITY_LEVELS.map((level) => {
            const checked = val.intensity === level;
            return (
              <label
                key={level}
                className={[
                  'flex min-h-[44px] cursor-pointer items-center justify-center rounded-sm border px-2.5 py-2 text-center text-xs font-medium transition-colors duration-150',
                  'focus-within:ring-2 focus-within:ring-[var(--focus-ring)] focus-within:ring-offset-2',
                  checked
                    ? 'border-primary bg-primary text-[var(--on-primary)]'
                    : 'border-border-subtle bg-paper text-ink hover:border-border-strong',
                ].join(' ')}
              >
                <input
                  type="radio"
                  name={`${step.id}-intensity`}
                  value={level}
                  checked={checked}
                  onChange={() => onChange({ ...val, intensity: level })}
                  className="sr-only"
                />
                <span>{t(`checkin.intensityDescriptions.${level}`)}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderScalePicker = (scaleKey: string, labelText?: string) => {
    const current = typeof answers[scaleKey] === 'number' ? (answers[scaleKey] as number) : 3;
    return (
      <div className="space-y-2">
        {labelText && <p className="text-sm font-medium text-ink">{labelText}</p>}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
          {INTENSITY_LEVELS.map((level) => {
            const checked = current === level;
            return (
              <label
                key={level}
                className={[
                  'flex min-h-[44px] cursor-pointer items-center justify-center rounded-sm border px-2.5 py-2 text-center text-xs font-medium transition-colors duration-150',
                  'focus-within:ring-2 focus-within:ring-[var(--focus-ring)] focus-within:ring-offset-2',
                  checked
                    ? 'border-primary bg-primary text-[var(--on-primary)]'
                    : 'border-border-subtle bg-paper text-ink hover:border-border-strong',
                ].join(' ')}
              >
                <input
                  type="radio"
                  name={`${step.id}-${scaleKey}`}
                  value={level}
                  checked={checked}
                  onChange={() => onUpdateAnswer(scaleKey, level)}
                  className="sr-only"
                />
                <span>{t(`checkin.intensityDescriptions.${level}`)}</span>
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h2 className="font-serif text-xl font-semibold text-ink sm:text-2xl">{step.title}</h2>
        <p className="text-sm leading-relaxed text-muted sm:text-base">{step.instruction}</p>
      </div>

      {step.example && (
        <div>
          <button
            type="button"
            aria-expanded={exampleOpen}
            onClick={() => setExampleOpen((prev) => !prev)}
            className="inline-flex min-h-[36px] items-center text-xs font-medium text-primary underline underline-offset-4 hover:text-primary-hover"
          >
            {exampleOpen ? t('common.collapseExample') : t('common.expandExample')}
          </button>
          {exampleOpen && (
            <div className="mt-2 rounded-sm border border-border-subtle bg-sand/70 p-3.5 text-sm leading-relaxed text-ink">
              {step.example}
            </div>
          )}
        </div>
      )}

      {step.showSelectedQuestions && Array.isArray(answers.reframingQuestionIds) && (
        <Card tone="sand" className="space-y-2 !p-4">
          <p className="text-xs font-medium text-muted">
            {exercisesContent.thoughtReframing.steps.rewrite.selectedPromptsHeading}
          </p>
          <ul className="space-y-1.5 text-sm text-ink">
            {answers.reframingQuestionIds.map((qid) => {
              const q = exercisesContent.thoughtReframing.questions.find((item) => item.id === qid);
              return q ? (
                <li key={qid} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{q.label}</span>
                </li>
              ) : null;
            })}
          </ul>
        </Card>
      )}

      {step.type === 'text' && (
        <div className="space-y-5">
          {step.secondaryTextKey && step.secondaryLabel && (
            <TextArea
              label={step.secondaryLabel}
              placeholder={step.secondaryPlaceholder}
              value={
                typeof answers[step.secondaryTextKey] === 'string'
                  ? (answers[step.secondaryTextKey] as string)
                  : ''
              }
              onChange={(e) => onUpdateAnswer(step.secondaryTextKey!, e.target.value)}
              maxLength={step.maxLength}
              rows={3}
              showSupportHint={false}
            />
          )}
          <TextArea
            label={step.label ?? ''}
            placeholder={step.placeholder}
            value={
              typeof answers[step.answerKey] === 'string' ? (answers[step.answerKey] as string) : ''
            }
            onChange={(e) => onUpdateAnswer(step.answerKey, e.target.value)}
            maxLength={step.maxLength}
            required={Boolean(step.minLength)}
            error={error || undefined}
            rows={4}
            showSupportHint
          />
        </div>
      )}

      {step.type === 'emotion' && (
        <div className="space-y-5">
          {step.thoughtKey && (
            <TextArea
              label={step.thoughtLabel ?? ''}
              placeholder={step.thoughtPlaceholder}
              value={
                typeof answers[step.thoughtKey] === 'string'
                  ? (answers[step.thoughtKey] as string)
                  : ''
              }
              onChange={(e) => onUpdateAnswer(step.thoughtKey!, e.target.value)}
              maxLength={step.maxLength}
              required={Boolean(step.minLength)}
              error={error || undefined}
              rows={3}
              showSupportHint
            />
          )}
          {renderEmotionPicker(
            (answers[step.answerKey] as EmotionStepValue | undefined) ?? {
              emotion: 'anxious',
              intensity: 3,
            },
            (next) => onUpdateAnswer(step.answerKey, next)
          )}
        </div>
      )}

      {step.type === 'scale' && (
        <div className="space-y-5">
          {step.thoughtKey && (
            <TextArea
              label={step.thoughtLabel ?? ''}
              placeholder={step.thoughtPlaceholder}
              value={
                typeof answers[step.thoughtKey] === 'string'
                  ? (answers[step.thoughtKey] as string)
                  : ''
              }
              onChange={(e) => onUpdateAnswer(step.thoughtKey!, e.target.value)}
              maxLength={step.maxLength}
              required={Boolean(step.minLength)}
              error={error || undefined}
              rows={3}
              showSupportHint
            />
          )}
          {renderScalePicker(step.scaleKey ?? step.answerKey, step.scaleLabel)}
        </div>
      )}

      {step.type === 'choice-single' && (
        <Choice
          mode="single"
          name={step.id}
          options={resolvedOptions}
          value={typeof answers[step.answerKey] === 'string' ? (answers[step.answerKey] as string) : ''}
          onChange={(val) => {
            onUpdateAnswer(step.answerKey, val);
            if (step.id === 'group') {
              onUpdateAnswer('emotionWords', []);
            }
          }}
          error={error || undefined}
        />
      )}

      {step.type === 'choice-multi' && (
        <Choice
          mode="multi"
          name={step.id}
          options={resolvedOptions}
          value={Array.isArray(answers[step.answerKey]) ? (answers[step.answerKey] as string[]) : []}
          onChange={(nextList) => {
            if (step.answerKey === 'distortionIds') {
              const previous = Array.isArray(answers[step.answerKey])
                ? (answers[step.answerKey] as string[])
                : [];
              if (!previous.includes('unsure') && nextList.includes('unsure')) {
                onUpdateAnswer(step.answerKey, ['unsure']);
                return;
              }
              if (previous.includes('unsure') && nextList.length > 1) {
                onUpdateAnswer(
                  step.answerKey,
                  nextList.filter((item) => item !== 'unsure')
                );
                return;
              }
            }
            onUpdateAnswer(step.answerKey, nextList);
          }}
          error={error || undefined}
        />
      )}

      {step.type === 'intro' && step.dynamicDistortionReflection && (
        <div className="space-y-5">
          {(() => {
            const chosenId =
              typeof answers.distortionId === 'string' ? answers.distortionId : 'unsure';
            const found = distortions.find((d) => d.id === chosenId);
            return (
              <Card tone="sand" className="space-y-3">
                {found ? (
                  <>
                    <h3 className="font-serif text-lg font-semibold text-ink">{found.name}</h3>
                    <p className="text-sm leading-relaxed text-ink">{found.description}</p>
                    <div className="rounded-sm border border-border-subtle bg-surface p-3.5">
                      <p className="text-xs font-medium text-primary">
                        {t('exercises.distortionPromptLabel')}
                      </p>
                      <p className="mt-1 text-sm font-medium text-ink">{found.promptQuestion}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="font-serif text-lg font-semibold text-ink">
                      {t('exercises.unsureOption')}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink">
                      {exercisesContent.distortionSpotter.steps.reflect.unsureExplain}
                    </p>
                    <div className="rounded-sm border border-border-subtle bg-surface p-3.5">
                      <p className="text-xs font-medium text-primary">
                        {t('exercises.distortionPromptLabel')}
                      </p>
                      <p className="mt-1 text-sm font-medium text-ink">
                        {exercisesContent.distortionSpotter.steps.reflect.unsureQuestion}
                      </p>
                    </div>
                  </>
                )}
              </Card>
            );
          })()}

          <TextArea
            label={step.label ?? ''}
            placeholder={step.placeholder}
            value={
              typeof answers[step.answerKey] === 'string' ? (answers[step.answerKey] as string) : ''
            }
            onChange={(e) => onUpdateAnswer(step.answerKey, e.target.value)}
            maxLength={step.maxLength}
            rows={3}
            showSupportHint
          />
        </div>
      )}
    </div>
  );
}

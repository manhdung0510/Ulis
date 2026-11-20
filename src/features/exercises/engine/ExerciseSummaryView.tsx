import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { EmotionIcon } from '@/components/illustration/EmotionIcons';
import { distortionsVi } from '@/content/vi/distortions';
import { distortionsEn } from '@/content/en/distortions';
import { exercisesContentVi } from '@/content/vi/exercises';
import { exercisesContentEn } from '@/content/en/exercises';
import { exercisesMetaVi } from '@/content/vi/exercisesMeta';
import { exercisesMetaEn } from '@/content/en/exercisesMeta';
import type { AppLanguage, ExerciseAnswers, ExerciseId, ExerciseSummary } from '@/types/domain';

export interface ExerciseSummaryViewProps {
  exerciseId: ExerciseId;
  answers: ExerciseAnswers;
  summary: ExerciseSummary;
  lang: AppLanguage;
  saved: boolean;
  saving?: boolean;
  onSaveToJournal?: () => void;
  onRedo?: () => void;
  readOnly?: boolean;
}

export function ExerciseSummaryView({
  exerciseId,
  answers,
  summary,
  lang,
  saved,
  saving = false,
  onSaveToJournal,
  onRedo,
  readOnly = false,
}: ExerciseSummaryViewProps) {
  const { t } = useTranslation();
  const isEn = lang === 'en';
  const meta = (isEn ? exercisesMetaEn : exercisesMetaVi).items[exerciseId];
  const distortions = isEn ? distortionsEn.items : distortionsVi.items;
  const exercisesContent = isEn ? exercisesContentEn : exercisesContentVi;

  const distortionLabels = (summary.distortionIds ?? []).map((id) => {
    if (id === 'unsure') return t('exercises.unsureOption');
    return distortions.find((d) => d.id === id)?.name ?? id;
  });

  const bodySensationLabels = (summary.bodySensations ?? []).map(
    (id) => exercisesContent.emotionAwareness.bodySensations.find((b) => b.id === id)?.label ?? id
  );

  const chosenQuestions = Array.isArray(answers.reframingQuestionIds)
    ? answers.reframingQuestionIds.map(
        (id) => exercisesContent.thoughtReframing.questions.find((q) => q.id === id)?.label ?? id
      )
    : [];

  const emotionGroupLabel = summary.emotionGroup
    ? exercisesContent.emotionAwareness.groups.find((g) => g.id === summary.emotionGroup)?.label
    : undefined;

  return (
    <div className="space-y-6">
      <div className="hidden print-only border-b border-border-subtle pb-2 text-xs text-muted">
        {t('exercises.printHint')}
      </div>

      <Card tone="surface" className="print-card space-y-5">
        <div className="space-y-1">
          <Tag tone="secondary">{meta.title}</Tag>
          <h2 className="font-serif text-2xl font-semibold text-ink">
            {t('exercises.summaryTitle')}
          </h2>
          {!readOnly && <p className="text-sm text-muted">{t('exercises.summarySubtitle')}</p>}
        </div>

        {summary.summarySentence && (
          <div className="rounded-sm border border-secondary/30 bg-secondary-soft/60 p-4">
            <p className="text-xs font-medium text-secondary">
              {t('exercises.summarySentenceLabel')}
            </p>
            <p className="mt-1 font-serif text-lg font-medium text-ink">
              {summary.summarySentence}
            </p>
          </div>
        )}

        {summary.initialThought && summary.balancedThought ? (
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-sm border border-border-subtle bg-sand/60 p-4">
              <p className="text-xs font-medium text-muted">
                {t('exercises.initialThoughtLabel')}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink">{summary.initialThought}</p>
            </div>
            <div className="rounded-sm border border-secondary/35 bg-secondary-soft/50 p-4">
              <p className="text-xs font-medium text-secondary">
                {t('exercises.balancedThoughtLabel')}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink">{summary.balancedThought}</p>
            </div>
          </div>
        ) : (
          summary.initialThought && (
            <div className="rounded-sm border border-border-subtle bg-sand/60 p-4">
              <p className="text-xs font-medium text-muted">
                {t('exercises.initialThoughtLabel')}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink">{summary.initialThought}</p>
            </div>
          )
        )}

        {(summary.emotionBefore || typeof summary.emotionAfter === 'number') && (
          <div className="flex flex-wrap items-center gap-3 rounded-sm border border-border-subtle bg-paper px-4 py-3 text-sm">
            {summary.emotionBefore && (
              <span className="inline-flex items-center gap-2 font-medium text-ink">
                <EmotionIcon
                  emotion={summary.emotionBefore.emotion}
                  label={t(`emotions.${summary.emotionBefore.emotion}`)}
                  size={20}
                />
                <span>
                  {exerciseId === 'thought-record'
                    ? `${t(`emotions.${summary.emotionBefore.emotion}`)} · `
                    : ''}
                  {summary.emotionBefore.intensity}/5
                </span>
              </span>
            )}
            {summary.emotionBefore && typeof summary.emotionAfter === 'number' && (
              <span className="text-muted">
                →{' '}
                {t('exercises.intensityCompare', {
                  before: summary.emotionBefore.intensity,
                  after: summary.emotionAfter,
                })}
              </span>
            )}
          </div>
        )}

        <dl className="space-y-3 border-t border-border-subtle pt-4 text-sm">
          {typeof answers.situation === 'string' && answers.situation.trim() && (
            <div>
              <dt className="text-xs font-medium text-muted">{t('exercises.situationLabel')}</dt>
              <dd className="mt-1 text-ink">{answers.situation}</dd>
            </div>
          )}

          {distortionLabels.length > 0 && (
            <div>
              <dt className="text-xs font-medium text-muted">
                {t('exercises.selectedDistortionsLabel')}
              </dt>
              <dd className="mt-1.5 flex flex-wrap gap-1.5">
                {distortionLabels.map((label) => (
                  <Tag key={label} tone="neutral">
                    {label}
                  </Tag>
                ))}
              </dd>
            </div>
          )}

          {typeof answers.evidenceFor === 'string' && answers.evidenceFor.trim() && (
            <div>
              <dt className="text-xs font-medium text-muted">{t('exercises.evidenceForLabel')}</dt>
              <dd className="mt-1 text-ink">{answers.evidenceFor}</dd>
            </div>
          )}

          {typeof answers.evidenceAgainst === 'string' && answers.evidenceAgainst.trim() && (
            <div>
              <dt className="text-xs font-medium text-muted">
                {t('exercises.evidenceAgainstLabel')}
              </dt>
              <dd className="mt-1 text-ink">{answers.evidenceAgainst}</dd>
            </div>
          )}

          {chosenQuestions.length > 0 && (
            <div>
              <dt className="text-xs font-medium text-muted">
                {t('exercises.chosenQuestionsLabel')}
              </dt>
              <dd className="mt-1">
                <ul className="list-disc space-y-1 pl-5 text-ink">
                  {chosenQuestions.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </dd>
            </div>
          )}

          {typeof answers.reflectionNote === 'string' && answers.reflectionNote.trim() && (
            <div>
              <dt className="text-xs font-medium text-muted">{t('exercises.reflectionLabel')}</dt>
              <dd className="mt-1 text-ink">{answers.reflectionNote}</dd>
            </div>
          )}

          {emotionGroupLabel && summary.emotionWords && summary.emotionWords.length > 0 && (
            <div>
              <dt className="text-xs font-medium text-muted">
                {t('exercises.emotionWordsLabel')}
              </dt>
              <dd className="mt-1.5 flex flex-wrap gap-1.5">
                <Tag tone="primary">{emotionGroupLabel}</Tag>
                {summary.emotionWords.map((w) => (
                  <Tag key={w} tone="neutral">
                    {w}
                  </Tag>
                ))}
              </dd>
            </div>
          )}

          {bodySensationLabels.length > 0 && (
            <div>
              <dt className="text-xs font-medium text-muted">
                {t('exercises.bodySensationsLabel')}
              </dt>
              <dd className="mt-1.5 flex flex-wrap gap-1.5">
                {bodySensationLabels.map((b) => (
                  <Tag key={b} tone="neutral">
                    {b}
                  </Tag>
                ))}
              </dd>
            </div>
          )}
        </dl>

        {!readOnly && (
          <div className="no-print flex flex-wrap items-center gap-3 border-t border-border-subtle pt-4">
            {onSaveToJournal && !saved && (
              <Button variant="primary" onClick={onSaveToJournal} loading={saving}>
                {t('exercises.saveToJournal')}
              </Button>
            )}
            {saved && (
              <Link to="/nhat-ky" className={buttonClasses('primary')}>
                {t('exercises.goToJournal')}
              </Link>
            )}
            {onRedo && (
              <Button variant="secondary" onClick={onRedo} disabled={saving}>
                {t('exercises.redoExercise')}
              </Button>
            )}
            <Button variant="quiet" onClick={() => window.print()}>
              {t('exercises.printSummary')}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

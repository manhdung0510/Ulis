import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { Dialog } from '@/components/ui/Dialog';
import { Stepper } from '@/components/ui/Stepper';
import { useToast } from '@/components/ui/useToast';
import { FEATURES } from '@/config/features';
import { exercisesMetaVi } from '@/content/vi/exercisesMeta';
import { exercisesMetaEn } from '@/content/en/exercisesMeta';
import {
  buildExerciseSummary,
  getExerciseDefinition,
} from '@/features/exercises/definitions/exerciseDefinitions';
import { ExerciseStepRenderer } from '@/features/exercises/engine/ExerciseStepRenderer';
import { ExerciseSummaryView } from '@/features/exercises/engine/ExerciseSummaryView';
import { journalService } from '@/services/journalService';
import type { AppLanguage, ExerciseAnswers, ExerciseId } from '@/types/domain';

const VALID_IDS: ExerciseId[] = [
  'thought-record',
  'distortion-spotter',
  'thought-reframing',
  'emotion-awareness',
];

function isValidExerciseId(id: string | undefined): id is ExerciseId {
  if (!id || !VALID_IDS.includes(id as ExerciseId)) {
    return false;
  }
  if (id === 'emotion-awareness' && !FEATURES.emotionExercise) {
    return false;
  }
  return true;
}

export default function ExerciseRunnerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { showToast } = useToast();

  const lang: AppLanguage = i18n.language === 'en' ? 'en' : 'vi';
  const validId = isValidExerciseId(id);
  const exerciseId: ExerciseId = validId ? id : 'thought-record';

  useEffect(() => {
    if (!validId) {
      showToast(t('app.routeNotFoundToast'));
      navigate('/bai-tap', { replace: true });
    }
  }, [validId, navigate, showToast, t]);

  const definition = useMemo(
    () => getExerciseDefinition(exerciseId, lang),
    [exerciseId, lang]
  );
  const meta = (lang === 'en' ? exercisesMetaEn : exercisesMetaVi).items[exerciseId];

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<ExerciseAnswers>({});
  const [stepError, setStepError] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);
  const [savedToJournal, setSavedToJournal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  const [pendingDraftStep, setPendingDraftStep] = useState<number | null>(null);
  const [pendingDraftAnswers, setPendingDraftAnswers] = useState<ExerciseAnswers | null>(null);

  useEffect(() => {
    const draft = journalService.getDraft(exerciseId);
    if (draft && Object.keys(draft.answers).length > 0) {
      setPendingDraftStep(draft.currentStepIndex);
      setPendingDraftAnswers(draft.answers);
    } else {
      setPendingDraftStep(null);
      setPendingDraftAnswers(null);
    }
    setStepIndex(0);
    setAnswers({});
    setStepError('');
    setIsReviewing(false);
    setSavedToJournal(false);
  }, [exerciseId]);

  const persistDraft = (nextAnswers: ExerciseAnswers, nextStepIndex: number) => {
    journalService.saveDraft({
      exerciseId,
      currentStepIndex: nextStepIndex,
      answers: nextAnswers,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleUpdateAnswer = (key: string, value: ExerciseAnswers[string]) => {
    setStepError('');
    setAnswers((prev) => {
      const next = { ...prev, [key]: value };
      persistDraft(next, stepIndex);
      return next;
    });
  };

  const handleResumeDraft = () => {
    if (pendingDraftAnswers) {
      setAnswers(pendingDraftAnswers);
      setStepIndex(
        Math.min(pendingDraftStep ?? 0, Math.max(0, definition.steps.length - 1))
      );
    }
    setPendingDraftAnswers(null);
    setPendingDraftStep(null);
  };

  const handleStartFresh = () => {
    journalService.clearDraft(exerciseId);
    setPendingDraftAnswers(null);
    setPendingDraftStep(null);
    setAnswers({});
    setStepIndex(0);
    setIsReviewing(false);
    setSavedToJournal(false);
  };

  const currentStep = definition.steps[stepIndex];

  const validateCurrentStep = (): boolean => {
    if (!currentStep) return true;

    if (currentStep.minLength) {
      const targetKey = currentStep.thoughtKey ?? currentStep.answerKey;
      const val = answers[targetKey];
      const text = typeof val === 'string' ? val.trim() : '';
      if (text.length < currentStep.minLength) {
        setStepError(t('exercises.minLengthError', { min: currentStep.minLength }));
        return false;
      }
    }

    if (currentStep.requiredChoice) {
      if (currentStep.type === 'choice-single') {
        const val = answers[currentStep.answerKey];
        if (typeof val !== 'string' || val.trim() === '') {
          setStepError(t('exercises.requiredChoiceError'));
          return false;
        }
      } else if (currentStep.type === 'choice-multi') {
        const list = Array.isArray(answers[currentStep.answerKey])
          ? (answers[currentStep.answerKey] as string[])
          : [];
        const minCount = currentStep.minChoices ?? 1;
        if (list.length < minCount) {
          setStepError(t('exercises.requiredChoiceError'));
          return false;
        }
        if (currentStep.maxChoices && list.length > currentStep.maxChoices) {
          setStepError(currentStep.maxChoiceError ?? t('exercises.requiredChoiceError'));
          return false;
        }
      }
    }

    setStepError('');
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;

    let nextAnswers = answers;
    if (currentStep?.type === 'emotion' && !nextAnswers[currentStep.answerKey]) {
      nextAnswers = {
        ...nextAnswers,
        [currentStep.answerKey]: { emotion: 'anxious', intensity: 3 },
      };
      setAnswers(nextAnswers);
    } else if (currentStep?.type === 'scale') {
      const sKey = currentStep.scaleKey ?? currentStep.answerKey;
      if (typeof nextAnswers[sKey] !== 'number') {
        nextAnswers = { ...nextAnswers, [sKey]: 3 };
        setAnswers(nextAnswers);
      }
    }

    if (stepIndex < definition.steps.length - 1) {
      const nextIdx = stepIndex + 1;
      setStepIndex(nextIdx);
      persistDraft(nextAnswers, nextIdx);
    } else {
      persistDraft(nextAnswers, stepIndex);
      setIsReviewing(true);
    }
  };

  const handleBack = () => {
    setStepError('');
    if (isReviewing) {
      setIsReviewing(false);
      return;
    }
    if (stepIndex > 0) {
      const prevIdx = stepIndex - 1;
      setStepIndex(prevIdx);
      persistDraft(answers, prevIdx);
    }
  };

  const handleAttemptExit = () => {
    const hasProgress = Object.keys(answers).length > 0 && !savedToJournal;
    if (hasProgress) {
      setExitDialogOpen(true);
    } else {
      navigate('/bai-tap');
    }
  };

  const handleSaveToJournal = async () => {
    setSaving(true);
    try {
      const summary = buildExerciseSummary(exerciseId, answers, lang);
      await journalService.saveEntry({
        exerciseId,
        answers,
        summary,
      });
      setSavedToJournal(true);
      showToast(t('exercises.savedToJournalToast'));
    } finally {
      setSaving(false);
    }
  };

  if (!validId) {
    return null;
  }

  const summary = buildExerciseSummary(exerciseId, answers, lang);

  return (
    <div className="space-y-6">
      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <Button variant="quiet" onClick={handleAttemptExit} className="!px-2">
          ← {t('exercises.backToList')}
        </Button>
        <span className="text-xs text-muted">
          {t('common.minutesShort', { minutes: meta.estimatedMinutes })}
        </span>
      </div>

      <header className="no-print space-y-3">
        <h1 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">{meta.title}</h1>
        <DemoNotice variant="disclaimer" />
      </header>

      {pendingDraftAnswers && (
        <Card tone="sand" className="no-print flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-sm font-medium text-ink">{t('exercises.draftFound')}</p>
            <p className="text-xs text-muted">{meta.notebookReference}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" onClick={handleResumeDraft}>
              {t('exercises.resumeDraft')}
            </Button>
            <Button variant="secondary" onClick={handleStartFresh}>
              {t('exercises.startFresh')}
            </Button>
          </div>
        </Card>
      )}

      {!isReviewing && currentStep ? (
        <Card tone="surface" className="space-y-6">
          <Stepper currentStep={stepIndex + 1} totalSteps={definition.steps.length} />

          <ExerciseStepRenderer
            step={currentStep}
            answers={answers}
            lang={lang}
            error={stepError}
            onUpdateAnswer={handleUpdateAnswer}
          />

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-4">
            <Button
              variant="secondary"
              onClick={handleBack}
              disabled={stepIndex === 0}
            >
              {t('common.back')}
            </Button>
            <Button variant="primary" onClick={handleNext}>
              {t('common.continue')}
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="no-print">
            <Button variant="quiet" onClick={handleBack} className="!px-2">
              ← {t('common.back')}
            </Button>
          </div>
          <ExerciseSummaryView
            exerciseId={exerciseId}
            answers={answers}
            summary={summary}
            lang={lang}
            saved={savedToJournal}
            saving={saving}
            onSaveToJournal={handleSaveToJournal}
            onRedo={handleStartFresh}
          />
        </div>
      )}

      <Dialog
        open={exitDialogOpen}
        onClose={() => setExitDialogOpen(false)}
        title={t('exercises.exitConfirmTitle')}
        footer={
          <>
            <Button
              variant="quiet"
              onClick={() => {
                journalService.clearDraft(exerciseId);
                setExitDialogOpen(false);
                navigate('/bai-tap');
              }}
            >
              {t('exercises.exitDiscardDraft')}
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                persistDraft(answers, stepIndex);
                setExitDialogOpen(false);
                navigate('/bai-tap');
              }}
            >
              {t('exercises.exitKeepDraft')}
            </Button>
          </>
        }
      >
        <p className="text-muted">{t('exercises.exitConfirmBody')}</p>
      </Dialog>
    </div>
  );
}

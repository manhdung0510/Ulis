import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { TextArea } from '@/components/ui/TextArea';
import { TextField } from '@/components/ui/TextField';
import type { CreateConsultPostInput } from '@/services/consultService';
import type { ConsultTopic } from '@/types/domain';

export interface AskQuestionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: CreateConsultPostInput) => Promise<void>;
}

const TOPICS: ConsultTopic[] = [
  'study',
  'relationships',
  'anxiety-stress',
  'family',
  'other',
];

export function AskQuestionDialog({
  open,
  onClose,
  onSubmit,
}: AskQuestionDialogProps) {
  const { t, i18n } = useTranslation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState<ConsultTopic>('study');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [reviewStep, setReviewStep] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setTopic('study');
    setIsAnonymous(true);
    setDisplayName('');
    setReviewStep(false);
    setErrorMsg('');
  };

  const handleClose = () => {
    if (submitting) return;
    resetForm();
    onClose();
  };

  const handleGoToReview = () => {
    if (!title.trim() || !content.trim()) {
      setErrorMsg(t('consult.postRequiredError'));
      return;
    }
    if (!isAnonymous && !displayName.trim()) {
      setErrorMsg(t('consult.displayNameRequiredError'));
      return;
    }
    setErrorMsg('');
    setReviewStep(true);
  };

  const handlePublish = async () => {
    setSubmitting(true);
    try {
      await onSubmit({
        title,
        content,
        topic,
        isAnonymous,
        authorName: isAnonymous ? undefined : displayName,
        language: i18n.language === 'en' ? 'en' : 'vi',
      });
      resetForm();
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title={reviewStep ? t('consult.askReviewStepTitle') : t('consult.askFormTitle')}
      footer={
        reviewStep ? (
          <>
            <Button
              variant="quiet"
              onClick={() => setReviewStep(false)}
              disabled={submitting}
            >
              {t('common.back')}
            </Button>
            <Button variant="primary" onClick={() => void handlePublish()} loading={submitting}>
              {t('consult.askSubmitButton')}
            </Button>
          </>
        ) : (
          <>
            <Button variant="quiet" onClick={handleClose}>
              {t('common.cancel')}
            </Button>
            <Button variant="primary" onClick={handleGoToReview}>
              {t('common.continue')}
            </Button>
          </>
        )
      }
    >
      {reviewStep ? (
        <div className="space-y-3">
          <div className="rounded-sm border border-border-subtle bg-sand/60 p-3.5 space-y-2">
            <p className="text-xs text-muted">
              {t(`consult.topics.${topic}`)} ·{' '}
              {isAnonymous ? t('consult.anonymousAuthor') : displayName.trim()}
            </p>
            <p className="font-serif text-base font-semibold text-ink">{title.trim()}</p>
            <p className="text-sm text-ink whitespace-pre-wrap">{content.trim()}</p>
          </div>
          <p className="text-xs text-primary">{t('demo.consultNotice')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <TextField
            label={t('consult.questionTitleLabel')}
            placeholder={t('consult.questionTitlePlaceholder')}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrorMsg('');
            }}
            maxLength={80}
            required
          />

          <TextArea
            label={t('consult.questionContentLabel')}
            placeholder={t('consult.questionContentPlaceholder')}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setErrorMsg('');
            }}
            maxLength={1000}
            rows={4}
            required
          />

          <div className="space-y-1.5">
            <label htmlFor="consult-topic-select" className="block text-sm font-medium text-ink">
              {t('consult.questionTopicLabel')}
            </label>
            <select
              id="consult-topic-select"
              value={topic}
              onChange={(e) => setTopic(e.target.value as ConsultTopic)}
              className="min-h-[44px] w-full rounded-sm border border-border-strong bg-surface px-3 text-sm text-ink"
            >
              {TOPICS.map((item) => (
                <option key={item} value={item}>
                  {t(`consult.topics.${item}`)}
                </option>
              ))}
            </select>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-ink">
              {t('consult.visibilityLabel')}
            </legend>
            <div className="grid gap-2">
              <label
                className={[
                  'flex min-h-[48px] cursor-pointer items-start gap-3 rounded-sm border p-3',
                  isAnonymous
                    ? 'border-primary bg-primary-soft/60'
                    : 'border-border-subtle bg-paper',
                ].join(' ')}
              >
                <input
                  type="radio"
                  name="post-visibility"
                  checked={isAnonymous}
                  onChange={() => {
                    setIsAnonymous(true);
                    setErrorMsg('');
                  }}
                  className="mt-1 h-4 w-4 accent-[var(--accent-primary)]"
                />
                <span>
                  <span className="block text-sm font-medium text-ink">
                    {t('consult.visibilityAnon')}
                  </span>
                  <span className="block text-xs text-muted">
                    {t('consult.visibilityAnonHelp')}
                  </span>
                </span>
              </label>

              <label
                className={[
                  'flex min-h-[48px] cursor-pointer items-start gap-3 rounded-sm border p-3',
                  !isAnonymous
                    ? 'border-primary bg-primary-soft/60'
                    : 'border-border-subtle bg-paper',
                ].join(' ')}
              >
                <input
                  type="radio"
                  name="post-visibility"
                  checked={!isAnonymous}
                  onChange={() => {
                    setIsAnonymous(false);
                    setErrorMsg('');
                  }}
                  className="mt-1 h-4 w-4 accent-[var(--accent-primary)]"
                />
                <span>
                  <span className="block text-sm font-medium text-ink">
                    {t('consult.visibilityPublic')}
                  </span>
                  <span className="block text-xs text-muted">
                    {t('consult.visibilityPublicHelp')}
                  </span>
                </span>
              </label>
            </div>
          </fieldset>

          {!isAnonymous && (
            <TextField
              label={t('consult.displayNameLabel')}
              placeholder={t('consult.displayNamePlaceholder')}
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
                setErrorMsg('');
              }}
              maxLength={30}
              required
            />
          )}

          {errorMsg && (
            <p role="status" aria-live="polite" className="text-sm text-primary">
              {errorMsg}
            </p>
          )}
        </div>
      )}
    </Dialog>
  );
}

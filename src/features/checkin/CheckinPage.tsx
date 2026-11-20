import { useCallback, useEffect, useId, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { Card } from '@/components/ui/Card';
import { TextArea } from '@/components/ui/TextArea';
import { Tag } from '@/components/ui/Tag';
import { useToast } from '@/components/ui/useToast';
import { EmotionIcon } from '@/components/illustration/EmotionIcons';
import { InkDivider } from '@/components/illustration/InkDivider';
import { checkinContentVi } from '@/content/vi/checkin';
import { checkinContentEn } from '@/content/en/checkin';
import { exercisesMetaVi } from '@/content/vi/exercisesMeta';
import { exercisesMetaEn } from '@/content/en/exercisesMeta';
import { getSuggestedExercisesForEmotion, moodService } from '@/services/moodService';
import { addDaysDateKey, formatDisplayDate, formatShortDay } from '@/utils/date';
import type { AppLanguage, EmotionId, IntensityLevel, MoodCheckin } from '@/types/domain';

const INTENSITY_LEVELS: IntensityLevel[] = [1, 2, 3, 4, 5];

export default function CheckinPage() {
  const { t, i18n } = useTranslation();
  const { showToast } = useToast();
  const lang: AppLanguage = i18n.language === 'en' ? 'en' : 'vi';
  const checkinContent = lang === 'en' ? checkinContentEn : checkinContentVi;
  const exercisesMeta = lang === 'en' ? exercisesMetaEn : exercisesMetaVi;

  const emotionGroupId = useId();
  const intensityGroupId = useId();
  const emotionErrorId = useId();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [todayRecord, setTodayRecord] = useState<MoodCheckin | null>(null);
  const [recentRecords, setRecentRecords] = useState<MoodCheckin[]>([]);
  const [isEditing, setIsEditing] = useState(true);
  const [hideSuggestions, setHideSuggestions] = useState(false);

  const [selectedEmotion, setSelectedEmotion] = useState<EmotionId | null>(null);
  const [intensity, setIntensity] = useState<IntensityLevel>(3);
  const [note, setNote] = useState('');
  const [emotionError, setEmotionError] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [today, recent] = await Promise.all([
        moodService.getToday(),
        moodService.getRecent(7),
      ]);
      setTodayRecord(today);
      setRecentRecords(recent);
      if (today) {
        setSelectedEmotion(today.emotion);
        setIntensity(today.intensity);
        setNote(today.note ?? '');
        setIsEditing(false);
      } else {
        setSelectedEmotion(null);
        setIntensity(3);
        setNote('');
        setIsEditing(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
    const handleReset = () => {
      setTodayRecord(null);
      setRecentRecords([]);
      setSelectedEmotion(null);
      setIntensity(3);
      setNote('');
      setEmotionError('');
      setIsEditing(true);
      setHideSuggestions(false);
    };
    window.addEventListener('hoa:data-reset', handleReset);
    return () => {
      window.removeEventListener('hoa:data-reset', handleReset);
    };
  }, [loadData]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedEmotion) {
      setEmotionError(t('checkin.selectEmotionError'));
      return;
    }
    setEmotionError('');
    setSaving(true);
    try {
      const saved = await moodService.saveToday({
        emotion: selectedEmotion,
        intensity,
        note,
      });
      const recent = await moodService.getRecent(7);
      setTodayRecord(saved);
      setRecentRecords(recent);
      setIsEditing(false);
      setHideSuggestions(false);
      showToast(t('checkin.savedToast'));
    } finally {
      setSaving(false);
    }
  };

  const handleStartEdit = () => {
    if (todayRecord) {
      setSelectedEmotion(todayRecord.emotion);
      setIntensity(todayRecord.intensity);
      setNote(todayRecord.note ?? '');
    }
    setIsEditing(true);
  };

  // Build 7-day timeline from 6 days ago to today in Asia/Ho_Chi_Minh
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, idx) => {
    const dateKey = addDaysDateKey(today, idx - 6);
    const record = recentRecords.find((item) => item.dateKey === dateKey) ?? null;
    return {
      dateKey,
      shortLabel: formatShortDay(dateKey, lang),
      record,
    };
  });

  const activeResult = !isEditing && todayRecord ? todayRecord : null;
  const suggestedExercises = activeResult
    ? getSuggestedExercisesForEmotion(activeResult.emotion)
    : [];

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-serif text-3xl font-semibold text-ink">
          {t('checkin.pageTitle')}
        </h1>
        <p className="max-w-2xl text-base text-muted">{t('checkin.pageIntro')}</p>
      </header>

      {loading ? (
        <Card tone="sand">
          <p className="text-sm text-muted" role="status">
            {t('common.loading')}
          </p>
        </Card>
      ) : activeResult ? (
        <Card tone="surface" className="space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-border-subtle bg-sand text-primary">
                <EmotionIcon
                  emotion={activeResult.emotion}
                  label={t(`emotions.${activeResult.emotion}`)}
                  size={34}
                />
              </div>
              <div className="space-y-1">
                <Tag tone="secondary">{t(`emotions.${activeResult.emotion}`)}</Tag>
                <h2 className="font-serif text-xl font-semibold text-ink">
                  {t('checkin.resultHeading')}
                </h2>
                <p className="text-xs text-muted">
                  {t(`checkin.intensityDescriptions.${activeResult.intensity}`)}
                </p>
              </div>
            </div>

            <Button variant="secondary" onClick={handleStartEdit}>
              {t('checkin.editToday')}
            </Button>
          </div>

          <p className="rounded-sm border border-border-subtle bg-sand/60 p-4 text-base leading-relaxed text-ink">
            {checkinContent.warmResponses[activeResult.emotion]}
          </p>

          {activeResult.note && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted">{t('checkin.noteLabel')}</p>
              <p className="rounded-sm border border-border-subtle bg-paper px-3.5 py-2.5 text-sm text-ink">
                {activeResult.note}
              </p>
            </div>
          )}

          {suggestedExercises.length > 0 && !hideSuggestions && (
            <div className="space-y-3 border-t border-border-subtle pt-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-serif text-lg font-semibold text-ink">
                  {t('checkin.suggestedTitle')}
                </h3>
                <button
                  type="button"
                  onClick={() => setHideSuggestions(true)}
                  className="inline-flex min-h-[36px] items-center text-xs text-muted underline underline-offset-4 hover:text-ink"
                >
                  {t('checkin.skipSuggestion')}
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {suggestedExercises.map((exId) => {
                  const meta = exercisesMeta.items[exId];
                  return (
                    <div
                      key={exId}
                      className="flex flex-col justify-between gap-3 rounded-sm border border-border-subtle bg-paper p-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-serif text-base font-semibold text-ink">
                            {meta.title}
                          </span>
                          <span className="text-xs text-muted">
                            {t('common.minutesShort', { minutes: meta.estimatedMinutes })}
                          </span>
                        </div>
                        <p className="text-sm text-muted">{meta.shortDescription}</p>
                      </div>
                      <div>
                        <Link to={`/bai-tap/${exId}`} className={buttonClasses('primary')}>
                          {t('home.startExercise')}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Card>
      ) : (
        <Card tone="surface">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* 8 Emotions selector */}
            <fieldset
              className="space-y-3"
              aria-describedby={emotionError ? emotionErrorId : undefined}
            >
              <legend id={emotionGroupId} className="text-sm font-medium text-ink">
                {t('checkin.selectEmotionLabel')}
              </legend>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {checkinContent.emotionOrder.map((emotionId) => {
                  const checked = selectedEmotion === emotionId;
                  const label = t(`emotions.${emotionId}`);
                  return (
                    <label
                      key={emotionId}
                      className={[
                        'flex min-h-[76px] cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border p-3 text-center transition-colors duration-150',
                        'focus-within:ring-2 focus-within:ring-[var(--focus-ring)] focus-within:ring-offset-2',
                        checked
                          ? 'border-primary bg-primary-soft/75 text-ink'
                          : 'border-border-subtle bg-paper text-ink hover:border-border-strong hover:bg-sand/40',
                      ].join(' ')}
                    >
                      <input
                        type="radio"
                        name="checkin-emotion"
                        value={emotionId}
                        checked={checked}
                        onChange={() => {
                          setSelectedEmotion(emotionId);
                          setEmotionError('');
                        }}
                        className="sr-only"
                      />
                      <span className={checked ? 'text-primary' : 'text-ink'}>
                        <EmotionIcon emotion={emotionId} label={label} size={28} decorative />
                      </span>
                      <span className="text-sm font-medium">{label}</span>
                    </label>
                  );
                })}
              </div>

              {emotionError && (
                <p id={emotionErrorId} role="status" aria-live="polite" className="text-sm text-primary">
                  {emotionError}
                </p>
              )}
            </fieldset>

            {/* Intensity 1-5 */}
            <fieldset className="space-y-3" aria-labelledby={intensityGroupId}>
              <legend id={intensityGroupId} className="text-sm font-medium text-ink">
                {t('checkin.intensityLabel')}
              </legend>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
                {INTENSITY_LEVELS.map((level) => {
                  const checked = intensity === level;
                  return (
                    <label
                      key={level}
                      className={[
                        'flex min-h-[44px] cursor-pointer items-center justify-center rounded-sm border px-3 py-2 text-center text-xs font-medium transition-colors duration-150',
                        'focus-within:ring-2 focus-within:ring-[var(--focus-ring)] focus-within:ring-offset-2',
                        checked
                          ? 'border-primary bg-primary text-[var(--on-primary)]'
                          : 'border-border-subtle bg-paper text-ink hover:border-border-strong hover:bg-sand/50',
                      ].join(' ')}
                    >
                      <input
                        type="radio"
                        name="checkin-intensity"
                        value={level}
                        checked={checked}
                        onChange={() => setIntensity(level)}
                        className="sr-only"
                      />
                      <span>{t(`checkin.intensityDescriptions.${level}`)}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Optional note */}
            <TextArea
              label={`${t('checkin.noteLabel')} (${t('common.optional')})`}
              placeholder={t('checkin.notePlaceholder')}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={280}
              rows={3}
              showSupportHint
            />

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" variant="primary" loading={saving}>
                {todayRecord ? t('checkin.updateButton') : t('checkin.saveButton')}
              </Button>
              {todayRecord && (
                <Button variant="quiet" onClick={() => setIsEditing(false)} disabled={saving}>
                  {t('common.cancel')}
                </Button>
              )}
            </div>
          </form>
        </Card>
      )}

      <InkDivider />

      {/* 7-day history */}
      <section aria-label={t('checkin.historyTitle')} className="space-y-4">
        <div className="space-y-1">
          <h2 className="font-serif text-xl font-semibold text-ink">
            {t('checkin.historyTitle')}
          </h2>
          <p className="text-xs text-muted">{t('checkin.historyLegend')}</p>
        </div>

        <Card tone="sand" className="space-y-4">
          <div className="overflow-x-auto">
            <svg
              viewBox="0 0 350 64"
              className="mx-auto block w-full max-w-md"
              role="img"
              aria-label={t('checkin.historyTitle')}
            >
              <line
                x1="25"
                y1="24"
                x2="325"
                y2="24"
                stroke="var(--border-subtle)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              {last7Days.map((day, idx) => {
                const cx = 25 + idx * 50;
                const hasEntry = Boolean(day.record);
                const emotionLabel = day.record ? t(`emotions.${day.record.emotion}`) : '';
                return (
                  <g key={day.dateKey}>
                    <title>
                      {hasEntry
                        ? `${day.shortLabel}: ${emotionLabel} (${day.record?.intensity}/5)`
                        : day.shortLabel}
                    </title>
                    <circle
                      cx={cx}
                      cy="24"
                      r="11"
                      fill={hasEntry ? 'var(--accent-primary)' : 'var(--bg-surface)'}
                      stroke={hasEntry ? 'var(--accent-primary)' : 'var(--border-strong)'}
                      strokeWidth="1.5"
                      strokeDasharray={hasEntry ? undefined : '3 2'}
                    />
                    {hasEntry && (
                      <circle cx={cx} cy="24" r="3.5" fill="var(--on-primary)" />
                    )}
                    <text
                      x={cx}
                      y="52"
                      textAnchor="middle"
                      fontSize="11"
                      fill="var(--text-muted)"
                    >
                      {day.shortLabel}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {recentRecords.length === 0 ? (
            <p className="text-center text-sm text-muted">{t('checkin.historyEmpty')}</p>
          ) : (
            <ul className="divide-y divide-border-subtle border-t border-border-subtle pt-2">
              {recentRecords.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-start justify-between gap-3 py-3 text-sm"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-primary">
                      <EmotionIcon
                        emotion={item.emotion}
                        label={t(`emotions.${item.emotion}`)}
                        size={22}
                      />
                    </span>
                    <div className="space-y-0.5">
                      <p className="font-medium text-ink">
                        {t(`emotions.${item.emotion}`)}{' '}
                        <span className="font-normal text-muted">
                          · {t('home.todayIntensity', { level: item.intensity })}
                        </span>
                      </p>
                      {item.note && <p className="text-xs text-muted">{item.note}</p>}
                    </div>
                  </div>
                  <span className="text-xs text-muted">
                    {formatDisplayDate(item.dateKey, lang)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>
    </div>
  );
}

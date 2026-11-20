import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { EmotionIcon } from '@/components/illustration/EmotionIcons';
import { Illustration } from '@/components/illustration/Illustration';
import { InkDivider } from '@/components/illustration/InkDivider';
import { guideContentVi } from '@/content/vi/guide';
import { guideContentEn } from '@/content/en/guide';
import { exercisesMetaVi } from '@/content/vi/exercisesMeta';
import { exercisesMetaEn } from '@/content/en/exercisesMeta';
import { getSuggestedExercisesForEmotion, moodService } from '@/services/moodService';
import type { MoodCheckin } from '@/types/domain';

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const guide = isEn ? guideContentEn : guideContentVi;
  const exercisesMeta = isEn ? exercisesMetaEn : exercisesMetaVi;

  const [todayCheckin, setTodayCheckin] = useState<MoodCheckin | null>(null);

  const loadToday = useCallback(async () => {
    const record = await moodService.getToday();
    setTodayCheckin(record);
  }, []);

  useEffect(() => {
    void loadToday();
    const handleReset = () => {
      setTodayCheckin(null);
    };
    window.addEventListener('hoa:data-reset', handleReset);
    return () => {
      window.removeEventListener('hoa:data-reset', handleReset);
    };
  }, [loadToday]);

  const suggestedIds = todayCheckin
    ? getSuggestedExercisesForEmotion(todayCheckin.emotion)
    : [];

  return (
    <div className="space-y-8">
      {/* Hero section */}
      <section className="grid items-center gap-6 md:grid-cols-[1.25fr_0.9fr]">
        <div className="space-y-4">
          <h1 className="font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {t('home.title')}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted">
            {t('home.subtitle')}
          </p>
          <div className="pt-1">
            <Link to="/check-in" className={buttonClasses('primary', 'px-6 text-base')}>
              {todayCheckin ? t('home.updateCheckin') : t('home.primaryCta')}
            </Link>
          </div>
        </div>

        <Illustration
          name="notebook-desk"
          alt={
            isEn
              ? 'Họa notebook illustration placeholder'
              : 'Khung minh họa sổ tay Họa'
          }
          aspect="4/3"
        />
      </section>

      {/* Today's check-in summary if already completed */}
      {todayCheckin && (
        <section aria-label={t('home.todayCheckedInTitle')}>
          <Card tone="sand" className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-border-subtle bg-surface text-primary">
                  <EmotionIcon
                    emotion={todayCheckin.emotion}
                    label={t(`emotions.${todayCheckin.emotion}`)}
                    size={28}
                  />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted">
                    {t('home.todayCheckedInTitle')}
                  </p>
                  <p className="font-serif text-lg font-semibold text-ink">
                    {t(`emotions.${todayCheckin.emotion}`)}{' '}
                    <span className="font-sans text-sm font-normal text-muted">
                      · {t('home.todayIntensity', { level: todayCheckin.intensity })}
                    </span>
                  </p>
                </div>
              </div>

              <Link to="/check-in" className={buttonClasses('secondary')}>
                {t('home.updateCheckin')}
              </Link>
            </div>

            {todayCheckin.note && (
              <p className="rounded-sm border border-border-subtle bg-surface px-3.5 py-2.5 text-sm text-ink">
                {todayCheckin.note}
              </p>
            )}

            {suggestedIds.length > 0 && (
              <div className="space-y-2.5 border-t border-border-subtle pt-3">
                <p className="text-xs font-medium text-muted">
                  {t('home.suggestedExercisesTitle')}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {suggestedIds.map((exId) => {
                    const meta = exercisesMeta.items[exId];
                    return (
                      <div
                        key={exId}
                        className="flex flex-col justify-between gap-3 rounded-sm border border-border-subtle bg-surface p-3.5"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-serif text-base font-semibold text-ink">
                              {meta.title}
                            </h3>
                            <span className="shrink-0 text-xs text-muted">
                              {t('common.minutesShort', { minutes: meta.estimatedMinutes })}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed text-muted">
                            {meta.shortDescription}
                          </p>
                        </div>
                        <div>
                          <Link
                            to={`/bai-tap/${exId}`}
                            className={buttonClasses('quiet', '!min-h-[38px] !px-3 text-xs text-primary')}
                          >
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
        </section>
      )}

      <InkDivider />

      {/* Three purposeful entry points (non-uniform layout) */}
      <section aria-label={t('nav.home')} className="space-y-4">
        <Card tone="sand" className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <h2 className="font-serif text-xl font-semibold text-ink">
              {t('home.entryCheckinTitle')}
            </h2>
            <p className="max-w-xl text-sm text-muted">{t('home.entryCheckinDesc')}</p>
          </div>
          <Link to="/check-in" className={buttonClasses('secondary', 'shrink-0')}>
            {t('home.entryCheckinAction')}
          </Link>
        </Card>

        <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
          <Card tone="surface" className="flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <h2 className="font-serif text-xl font-semibold text-ink">
                {t('home.entryExercisesTitle')}
              </h2>
              <p className="text-sm leading-relaxed text-muted">
                {t('home.entryExercisesDesc')}
              </p>
            </div>
            <div>
              <Link to="/bai-tap" className={buttonClasses('primary')}>
                {t('home.entryExercisesAction')}
              </Link>
            </div>
          </Card>

          <Card tone="paper" className="flex flex-col justify-between gap-4 border-dashed border-border-strong">
            <div className="space-y-2">
              <Tag tone="secondary">{t('common.sampleTag')}</Tag>
              <h2 className="font-serif text-xl font-semibold text-ink">
                {t('home.entryConsultTitle')}
              </h2>
              <p className="text-sm leading-relaxed text-muted">
                {t('home.entryConsultDesc')}
              </p>
            </div>
            <div>
              <Link to="/tham-van" className={buttonClasses('secondary')}>
                {t('home.entryConsultAction')}
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Notebook + Web companion block */}
      <section className="space-y-4 pt-2">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            {t('home.notebookBlockTitle')}
          </h2>
          <Link
            to="/huong-dan"
            className="inline-flex min-h-[36px] items-center text-sm font-medium text-primary underline underline-offset-4 hover:text-primary-hover"
          >
            {t('home.notebookBlockLink')}
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card tone="surface" className="space-y-3">
            <h3 className="font-serif text-lg font-semibold text-ink">
              {t('home.paperColumnTitle')}
            </h3>
            <ul className="space-y-2 text-sm text-muted">
              {guide.paperItems.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card tone="surface" className="space-y-3">
            <h3 className="font-serif text-lg font-semibold text-ink">
              {t('home.webColumnTitle')}
            </h3>
            <ul className="space-y-2 text-sm text-muted">
              {guide.webItems.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}

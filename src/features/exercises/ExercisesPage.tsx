import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { Card } from '@/components/ui/Card';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { ArrowRightIcon, ChevronDownIcon, ClockIcon } from '@/components/ui/Icons';
import { Tag } from '@/components/ui/Tag';
import { InkDivider } from '@/components/illustration/InkDivider';
import { FEATURES } from '@/config/features';
import { exercisesMetaVi } from '@/content/vi/exercisesMeta';
import { exercisesMetaEn } from '@/content/en/exercisesMeta';
import { distortionsVi } from '@/content/vi/distortions';
import { distortionsEn } from '@/content/en/distortions';
import { journalService } from '@/services/journalService';
import type { AppLanguage, ExerciseEntry, ExerciseId } from '@/types/domain';

const EXERCISE_ORDER: ExerciseId[] = [
  'thought-record',
  'distortion-spotter',
  'thought-reframing',
  'emotion-awareness',
];

export default function ExercisesPage() {
  const { t, i18n } = useTranslation();
  const lang: AppLanguage = i18n.language === 'en' ? 'en' : 'vi';
  const metaMap = (lang === 'en' ? exercisesMetaEn : exercisesMetaVi).items;
  const distortions = lang === 'en' ? distortionsEn.items : distortionsVi.items;

  const [entries, setEntries] = useState<ExerciseEntry[]>([]);
  const [distortionsOpen, setDistortionsOpen] = useState(false);

  const loadEntries = useCallback(async () => {
    const list = await journalService.getAll();
    setEntries(list);
  }, []);

  useEffect(() => {
    void loadEntries();
    const handleReset = () => {
      setEntries([]);
    };
    window.addEventListener('hoa:data-reset', handleReset);
    return () => {
      window.removeEventListener('hoa:data-reset', handleReset);
    };
  }, [loadEntries]);

  const visibleExercises = EXERCISE_ORDER.filter(
    (id) => id !== 'emotion-awareness' || FEATURES.emotionExercise
  );

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="font-serif text-3xl font-semibold text-ink">
          {t('exercises.pageTitle')}
        </h1>
        <p className="max-w-2xl text-base text-muted">{t('exercises.pageIntro')}</p>
        <DemoNotice variant="disclaimer" />
      </header>

      <section aria-label={t('exercises.pageTitle')} className="grid gap-4 md:grid-cols-2">
        {visibleExercises.map((id) => {
          const meta = metaMap[id];
          const hasCompleted = entries.some((item) => item.exerciseId === id);
          const hasDraft = Boolean(journalService.getDraft(id));

          return (
            <Card key={id} tone="surface" className="flex flex-col justify-between gap-4">
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {!hasCompleted && <Tag tone="secondary">{t('common.newTag')}</Tag>}
                    {hasDraft && <Tag tone="primary">{t('exercises.draftFound')}</Tag>}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-muted">
                    <ClockIcon size={13} />
                    <span>{t('common.minutesShort', { minutes: meta.estimatedMinutes })}</span>
                  </span>
                </div>

                <h2 className="font-serif text-xl font-semibold text-ink">{meta.title}</h2>
                <p className="text-sm leading-relaxed text-muted">{meta.shortDescription}</p>
                <p className="text-xs text-muted">{meta.notebookReference}</p>
              </div>

              <div>
                <Link to={`/bai-tap/${id}`} className={buttonClasses('primary')}>
                  <span>{hasDraft ? t('exercises.continueDraft') : t('exercises.openExercise')}</span>
                  <ArrowRightIcon size={16} />
                </Link>
              </div>
            </Card>
          );
        })}
      </section>

      <InkDivider />

      <section aria-label={t('exercises.distortionListTitle')} className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-serif text-xl font-semibold text-ink">
            {t('exercises.distortionListTitle')}
          </h2>
          <Button
            variant="secondary"
            aria-expanded={distortionsOpen}
            onClick={() => setDistortionsOpen((prev) => !prev)}
          >
            <span>
              {distortionsOpen ? t('exercises.hideDistortions') : t('exercises.showDistortions')}
            </span>
            <ChevronDownIcon size={16} rotated={distortionsOpen} />
          </Button>
        </div>

        {distortionsOpen && (
          <div className="grid gap-3 md:grid-cols-2">
            {distortions.map((item, index) => (
              <Card key={item.id} tone="paper" className="space-y-2 !p-4">
                <h3 className="font-serif text-base font-semibold text-ink">
                  {index + 1}. {item.name}
                </h3>
                <p className="text-sm text-muted">{item.description}</p>
                <p className="text-xs italic text-ink/90">{item.example}</p>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

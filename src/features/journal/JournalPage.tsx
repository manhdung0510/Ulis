import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { Card } from '@/components/ui/Card';
import { Dialog } from '@/components/ui/Dialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { Tabs, type TabItem } from '@/components/ui/Tabs';
import { Tag } from '@/components/ui/Tag';
import { useToast } from '@/components/ui/useToast';
import { EmotionIcon } from '@/components/illustration/EmotionIcons';
import { InkDivider } from '@/components/illustration/InkDivider';
import { DeleteAllDataDialog } from '@/components/layout/DeleteAllDataDialog';
import { exercisesMetaVi } from '@/content/vi/exercisesMeta';
import { exercisesMetaEn } from '@/content/en/exercisesMeta';
import { ExerciseSummaryView } from '@/features/exercises/engine/ExerciseSummaryView';
import { journalService } from '@/services/journalService';
import { moodService } from '@/services/moodService';
import { clearAllUserDataInStorage } from '@/services/storage';
import { formatDisplayDate } from '@/utils/date';
import type { AppLanguage, ExerciseEntry, MoodCheckin } from '@/types/domain';

type JournalFilter = 'all' | 'checkin' | 'exercise';

type TimelineItem =
  | { kind: 'checkin'; id: string; sortDate: string; data: MoodCheckin }
  | { kind: 'exercise'; id: string; sortDate: string; data: ExerciseEntry };

export default function JournalPage() {
  const { t, i18n } = useTranslation();
  const { showToast } = useToast();
  const lang: AppLanguage = i18n.language === 'en' ? 'en' : 'vi';
  const exercisesMeta = (lang === 'en' ? exercisesMetaEn : exercisesMetaVi).items;

  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<JournalFilter>('all');
  const [checkins, setCheckins] = useState<MoodCheckin[]>([]);
  const [exercises, setExercises] = useState<ExerciseEntry[]>([]);
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<TimelineItem | null>(null);
  const [deletingItem, setDeletingItem] = useState(false);
  const [deleteAllOpen, setDeleteAllOpen] = useState(false);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [moodList, exerciseList] = await Promise.all([
        moodService.getAll(),
        journalService.getAll(),
      ]);
      setCheckins(moodList);
      setExercises(exerciseList);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAll();
    const handleReset = () => {
      setCheckins([]);
      setExercises([]);
      setSelectedItem(null);
      setItemToDelete(null);
    };
    window.addEventListener('hoa:data-reset', handleReset);
    return () => {
      window.removeEventListener('hoa:data-reset', handleReset);
    };
  }, [loadAll]);

  const timeline: TimelineItem[] = [
    ...checkins.map((item) => ({
      kind: 'checkin' as const,
      id: item.id,
      sortDate: item.createdAt,
      data: item,
    })),
    ...exercises.map((item) => ({
      kind: 'exercise' as const,
      id: item.id,
      sortDate: item.createdAt,
      data: item,
    })),
  ]
    .filter((item) => filter === 'all' || item.kind === filter)
    .sort((a, b) => b.sortDate.localeCompare(a.sortDate));

  const filterTabs: TabItem<JournalFilter>[] = [
    { id: 'all', label: t('journal.filterAll') },
    { id: 'checkin', label: t('journal.filterCheckin') },
    { id: 'exercise', label: t('journal.filterExercise') },
  ];

  const handleDeleteSingle = async () => {
    if (!itemToDelete) return;
    setDeletingItem(true);
    try {
      if (itemToDelete.kind === 'checkin') {
        await moodService.deleteById(itemToDelete.id);
        setCheckins((prev) => prev.filter((item) => item.id !== itemToDelete.id));
      } else {
        await journalService.deleteEntry(itemToDelete.id);
        setExercises((prev) => prev.filter((item) => item.id !== itemToDelete.id));
      }
      if (selectedItem?.id === itemToDelete.id) {
        setSelectedItem(null);
      }
      setItemToDelete(null);
      showToast(t('journal.deletedItemToast'));
    } finally {
      setDeletingItem(false);
    }
  };

  const handleDeleteAll = () => {
    clearAllUserDataInStorage();
    setCheckins([]);
    setExercises([]);
    setSelectedItem(null);
    showToast(t('journal.deleteAllSuccessToast'));
    window.dispatchEvent(new CustomEvent('hoa:data-reset'));
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-serif text-3xl font-semibold text-ink">{t('journal.pageTitle')}</h1>
        <p className="max-w-2xl text-base text-muted">{t('journal.pageIntro')}</p>
      </header>

      <Tabs
        items={filterTabs}
        activeId={filter}
        onChange={setFilter}
        ariaLabel={t('journal.pageTitle')}
      />

      {loading ? (
        <Card tone="sand">
          <p className="text-sm text-muted" role="status">
            {t('common.loading')}
          </p>
        </Card>
      ) : timeline.length === 0 ? (
        <EmptyState
          title={t('journal.emptyTitle')}
          body={t('journal.emptyBody')}
          action={
            <Link to="/check-in" className={buttonClasses('primary')}>
              {t('journal.emptyAction')}
            </Link>
          }
        />
      ) : (
        <ul className="space-y-3">
          {timeline.map((item) => {
            if (item.kind === 'checkin') {
              const mood = item.data;
              return (
                <li key={item.id}>
                  <Card tone="surface" className="space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border-subtle bg-sand text-primary">
                          <EmotionIcon
                            emotion={mood.emotion}
                            label={t(`emotions.${mood.emotion}`)}
                            size={22}
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Tag tone="secondary">{t('journal.typeCheckin')}</Tag>
                            <span className="text-xs text-muted">
                              {formatDisplayDate(mood.dateKey, lang)}
                            </span>
                          </div>
                          <h2 className="font-serif text-lg font-semibold text-ink">
                            {t(`emotions.${mood.emotion}`)} ·{' '}
                            <span className="font-sans text-sm font-normal text-muted">
                              {t('home.todayIntensity', { level: mood.intensity })}
                            </span>
                          </h2>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="secondary"
                          onClick={() => setSelectedItem(item)}
                          className="!min-h-[38px] !px-3 text-xs"
                        >
                          {t('journal.viewDetail')}
                        </Button>
                        <Button
                          variant="quiet"
                          onClick={() => setItemToDelete(item)}
                          className="!min-h-[38px] !px-3 text-xs text-primary"
                        >
                          {t('journal.deleteItem')}
                        </Button>
                      </div>
                    </div>

                    {mood.note && <p className="line-clamp-2 text-sm text-muted">{mood.note}</p>}
                  </Card>
                </li>
              );
            }

            const entry = item.data;
            const meta = exercisesMeta[entry.exerciseId];
            const preview =
              entry.summary.balancedThought ??
              entry.summary.summarySentence ??
              entry.summary.initialThought ??
              '';

            return (
              <li key={item.id}>
                <Card tone="surface" className="space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Tag tone="primary">{t('journal.typeExercise')}</Tag>
                        <span className="text-xs text-muted">
                          {formatDisplayDate(entry.createdAt, lang, true)}
                        </span>
                      </div>
                      <h2 className="font-serif text-lg font-semibold text-ink">{meta.title}</h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => setSelectedItem(item)}
                        className="!min-h-[38px] !px-3 text-xs"
                      >
                        {t('journal.viewDetail')}
                      </Button>
                      <Button
                        variant="quiet"
                        onClick={() => setItemToDelete(item)}
                        className="!min-h-[38px] !px-3 text-xs text-primary"
                      >
                        {t('journal.deleteItem')}
                      </Button>
                    </div>
                  </div>

                  {preview && <p className="line-clamp-2 text-sm text-muted">{preview}</p>}
                </Card>
              </li>
            );
          })}
        </ul>
      )}

      <InkDivider />

      <section aria-label={t('journal.dangerZoneTitle')}>
        <Card tone="sand" className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <h2 className="font-serif text-lg font-semibold text-ink">
              {t('journal.dangerZoneTitle')}
            </h2>
            <p className="max-w-xl text-sm text-muted">{t('journal.dangerZoneBody')}</p>
          </div>
          <Button
            variant="secondary"
            onClick={() => setDeleteAllOpen(true)}
            className="shrink-0 border-primary/50 text-primary hover:bg-primary-soft"
          >
            {t('journal.deleteAllButton')}
          </Button>
        </Card>
      </section>

      <Dialog
        open={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        title={t('journal.detailTitle')}
      >
        {selectedItem?.kind === 'checkin' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-border-subtle bg-sand text-primary">
                <EmotionIcon
                  emotion={selectedItem.data.emotion}
                  label={t(`emotions.${selectedItem.data.emotion}`)}
                  size={28}
                />
              </div>
              <div>
                <p className="font-serif text-lg font-semibold text-ink">
                  {t(`emotions.${selectedItem.data.emotion}`)}
                </p>
                <p className="text-xs text-muted">
                  {formatDisplayDate(selectedItem.data.dateKey, lang)} ·{' '}
                  {t(`checkin.intensityDescriptions.${selectedItem.data.intensity}`)}
                </p>
              </div>
            </div>
            {selectedItem.data.note && (
              <div className="rounded-sm border border-border-subtle bg-paper p-3.5 text-sm text-ink">
                {selectedItem.data.note}
              </div>
            )}
          </div>
        )}

        {selectedItem?.kind === 'exercise' && (
          <ExerciseSummaryView
            exerciseId={selectedItem.data.exerciseId}
            answers={selectedItem.data.answers}
            summary={selectedItem.data.summary}
            lang={lang}
            saved
            readOnly
          />
        )}
      </Dialog>

      <Dialog
        open={Boolean(itemToDelete)}
        onClose={() => {
          if (!deletingItem) setItemToDelete(null);
        }}
        title={t('journal.deleteItemTitle')}
        footer={
          <>
            <Button
              variant="quiet"
              onClick={() => setItemToDelete(null)}
              disabled={deletingItem}
            >
              {t('common.cancel')}
            </Button>
            <Button variant="primary" onClick={handleDeleteSingle} loading={deletingItem}>
              {t('common.delete')}
            </Button>
          </>
        }
      >
        <p className="text-muted">{t('journal.deleteItemBody')}</p>
      </Dialog>

      <DeleteAllDataDialog
        open={deleteAllOpen}
        onClose={() => setDeleteAllOpen(false)}
        onConfirmedDelete={handleDeleteAll}
      />
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Dialog } from '@/components/ui/Dialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { Tag } from '@/components/ui/Tag';
import { exercisesMetaVi } from '@/content/vi/exercisesMeta';
import { exercisesMetaEn } from '@/content/en/exercisesMeta';
import { resolveConsultPostForDisplay } from '@/services/consultService';
import type { AppLanguage, ConsultPost, ConsultTopic } from '@/types/domain';
import { formatDisplayDate } from '@/utils/date';

type FilterValue = 'all' | 'mine' | ConsultTopic;

export interface QaTabProps {
  posts: ConsultPost[];
  nowMs: number;
  onOpenAsk: () => void;
  onDeletePost: (id: string) => Promise<void>;
}

const TOPIC_FILTERS: ConsultTopic[] = [
  'study',
  'relationships',
  'anxiety-stress',
  'family',
  'other',
];

export function QaTab({ posts, nowMs, onOpenAsk, onDeletePost }: QaTabProps) {
  const { t, i18n } = useTranslation();
  const lang: AppLanguage = i18n.language === 'en' ? 'en' : 'vi';
  const exercisesMeta = (lang === 'en' ? exercisesMetaEn : exercisesMetaVi).items;

  const [filter, setFilter] = useState<FilterValue>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const visiblePosts = posts.filter((post) => {
    if (filter === 'all') return true;
    if (filter === 'mine') return post.isMine;
    return post.topic === filter;
  });

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await onDeletePost(deleteId);
      setDeleteId(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          <Button
            variant={filter === 'all' ? 'primary' : 'secondary'}
            onClick={() => setFilter('all')}
          >
            {t('consult.filterAllTopics')}
          </Button>
          <Button
            variant={filter === 'mine' ? 'primary' : 'secondary'}
            onClick={() => setFilter('mine')}
          >
            {t('consult.filterMine')}
          </Button>
          {TOPIC_FILTERS.map((topic) => (
            <Button
              key={topic}
              variant={filter === topic ? 'primary' : 'quiet'}
              onClick={() => setFilter(topic)}
            >
              {t(`consult.topics.${topic}`)}
            </Button>
          ))}
        </div>

        <Button variant="primary" onClick={onOpenAsk}>
          {t('consult.askButton')}
        </Button>
      </div>

      {visiblePosts.length === 0 ? (
        <EmptyState
          title={t('consult.emptyPostsFilter')}
          body={t('consult.pageIntro')}
          action={
            <Button variant="primary" onClick={onOpenAsk}>
              {t('consult.askButton')}
            </Button>
          }
        />
      ) : (
        <ul className="space-y-4">
          {visiblePosts.map((rawPost) => {
            const resolved = resolveConsultPostForDisplay(rawPost, lang, nowMs);
            const post = resolved.post;
            const suggestedMeta = resolved.reply?.suggestedExerciseId
              ? exercisesMeta[resolved.reply.suggestedExerciseId]
              : null;

            return (
              <li key={post.id}>
                <Card tone="surface" className="space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Tag tone="neutral">{t(`consult.topics.${post.topic}`)}</Tag>
                      {resolved.replyReady ? (
                        <Tag tone="secondary">{t('consult.statusReplied')}</Tag>
                      ) : (
                        <Tag tone="primary">{t('consult.statusPending')}</Tag>
                      )}
                    </div>
                    <span className="text-xs text-muted">
                      {formatDisplayDate(post.createdAt, lang, true)}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h2 className="font-serif text-lg font-semibold text-ink">{post.title}</h2>
                    <p className="text-xs font-medium text-muted">{resolved.authorLabel}</p>
                    <p className="text-sm leading-relaxed text-ink whitespace-pre-wrap">
                      {post.content}
                    </p>
                  </div>

                  {resolved.replyReady && resolved.reply && (
                    <div className="space-y-2.5 rounded-sm border border-secondary/30 bg-secondary-soft/50 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-secondary">
                          {resolved.reply.counselorName}
                        </p>
                        <span className="text-xs text-muted">{t('common.sampleTag')}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-ink">{resolved.reply.content}</p>
                      {suggestedMeta && resolved.reply.suggestedExerciseId && (
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                          <span className="text-muted">{t('consult.tryExerciseLabel')}</span>
                          <Link
                            to={`/bai-tap/${resolved.reply.suggestedExerciseId}`}
                            className="font-semibold text-primary underline underline-offset-4 hover:text-primary-hover"
                          >
                            {suggestedMeta.title}
                          </Link>
                        </div>
                      )}
                    </div>
                  )}

                  {post.isMine && (
                    <div className="flex justify-end border-t border-border-subtle pt-3">
                      <Button variant="quiet" onClick={() => setDeleteId(post.id)}>
                        {t('common.delete')}
                      </Button>
                    </div>
                  )}
                </Card>
              </li>
            );
          })}
        </ul>
      )}

      <Dialog
        open={Boolean(deleteId)}
        onClose={() => !deleting && setDeleteId(null)}
        title={t('consult.deletePostConfirmTitle')}
        footer={
          <>
            <Button variant="quiet" onClick={() => setDeleteId(null)} disabled={deleting}>
              {t('common.cancel')}
            </Button>
            <Button
              variant="primary"
              onClick={() => void handleConfirmDelete()}
              loading={deleting}
            >
              {t('common.delete')}
            </Button>
          </>
        }
      >
        <p className="text-muted">{t('consult.deletePostConfirmBody')}</p>
      </Dialog>
    </div>
  );
}

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CalendarIcon } from '@/components/ui/Icons';
import { Tag } from '@/components/ui/Tag';
import type { CounselorProfile } from '@/types/domain';

export interface CounselorsTabProps {
  counselors: CounselorProfile[];
  onSelectForBooking: (counselorId: string) => void;
}

const AVATAR_TONE_CLASSES: Record<CounselorProfile['avatarTone'], string> = {
  primary: 'bg-primary text-[var(--on-primary)]',
  secondary: 'bg-secondary text-[var(--on-secondary)]',
  sand: 'bg-sand text-ink border border-border-strong',
};

export function CounselorsTab({
  counselors,
  onSelectForBooking,
}: CounselorsTabProps) {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {counselors.map((counselor) => (
        <Card key={counselor.id} tone="surface" className="flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                aria-hidden="true"
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-serif text-base font-semibold ${AVATAR_TONE_CLASSES[counselor.avatarTone]}`}
              >
                {counselor.initials}
              </div>
              <div className="min-w-0">
                <h2 className="font-serif text-lg font-semibold text-ink leading-snug">
                  {counselor.name}
                </h2>
                <p className="text-xs text-muted">{counselor.title}</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted">{counselor.bio}</p>

            <div className="flex flex-wrap gap-1.5">
              {counselor.focusAreas.map((area) => (
                <Tag key={area} tone="neutral">
                  {area}
                </Tag>
              ))}
            </div>

            <p className="text-xs text-muted">
              {counselor.formats.map((fmt) => t(`consult.counselorFormats.${fmt}`)).join(' · ')}
            </p>
          </div>

          <Button
            variant="primary"
            className="w-full"
            onClick={() => onSelectForBooking(counselor.id)}
          >
            <CalendarIcon size={16} />
            <span>{t('consult.bookWithCounselor')}</span>
          </Button>
        </Card>
      ))}
    </div>
  );
}

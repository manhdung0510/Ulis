import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Dialog } from '@/components/ui/Dialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { CalendarIcon, TrashIcon } from '@/components/ui/Icons';
import { Tag } from '@/components/ui/Tag';
import { formatDisplayDate, getDateKeyInAppTz } from '@/utils/date';
import { downloadAppointmentIcs } from '@/utils/ics';
import type { AppLanguage, Appointment } from '@/types/domain';

export interface AppointmentsTabProps {
  appointments: Appointment[];
  onCancelAppointment: (id: string) => Promise<void>;
  onRebook: (appointment: Appointment) => void;
  onStartNewBooking: () => void;
}

export function AppointmentsTab({
  appointments,
  onCancelAppointment,
  onRebook,
  onStartNewBooking,
}: AppointmentsTabProps) {
  const { t, i18n } = useTranslation();
  const lang: AppLanguage = i18n.language === 'en' ? 'en' : 'vi';
  const todayKey = getDateKeyInAppTz();

  const [cancelTarget, setCancelTarget] = useState<Appointment | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const upcoming = appointments.filter(
    (item) => item.status === 'upcoming' && item.dateKey >= todayKey
  );
  const pastOrCancelled = appointments.filter(
    (item) => item.status === 'cancelled' || item.dateKey < todayKey
  );

  const handleConfirmCancel = async () => {
    if (!cancelTarget) return;
    setCancelling(true);
    try {
      await onCancelAppointment(cancelTarget.id);
      setCancelTarget(null);
    } finally {
      setCancelling(false);
    }
  };

  if (appointments.length === 0) {
    return (
      <EmptyState
        title={t('consult.noAppointmentsTitle')}
        body={t('consult.noAppointmentsBody')}
        action={
          <Button variant="primary" onClick={onStartNewBooking}>
            {t('consult.bookWithCounselor')}
          </Button>
        }
      />
    );
  }

  const renderCard = (item: Appointment, isUpcoming: boolean) => (
    <li key={item.id}>
      <Card tone="surface" className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone={item.status === 'upcoming' ? 'secondary' : 'neutral'}>
                {item.status === 'upcoming'
                  ? t('consult.statusUpcoming')
                  : t('consult.statusCancelled')}
              </Tag>
              <span className="font-mono text-xs font-semibold text-primary">
                {item.referenceCode}
              </span>
            </div>
            <h3 className="font-serif text-lg font-semibold text-ink">{item.counselorName}</h3>
          </div>

          <span className="text-xs text-muted">
            {formatDisplayDate(item.dateKey, lang)} · {item.slotTime}
          </span>
        </div>

        <p className="text-xs text-muted">
          {t(`consult.counselorFormats.${item.format}`)} ·{' '}
          {t(`consult.topics.${item.topic}`)}
        </p>

        {item.note && (
          <p className="rounded-sm border border-border-subtle bg-paper px-3 py-2 text-xs text-ink">
            {item.note}
          </p>
        )}

        <div className="flex flex-wrap gap-2 border-t border-border-subtle pt-3">
          {isUpcoming ? (
            <>
              <Button
                variant="secondary"
                onClick={() => downloadAppointmentIcs(item, lang)}
                className="!px-3 text-xs"
              >
                <CalendarIcon size={15} />
                <span>{t('consult.downloadIcs')}</span>
              </Button>
              <Button
                variant="quiet"
                onClick={() => setCancelTarget(item)}
                className="!px-3 text-xs text-primary"
              >
                <TrashIcon size={15} />
                <span>{t('consult.cancelAppointment')}</span>
              </Button>
            </>
          ) : (
            <Button
              variant="secondary"
              onClick={() => onRebook(item)}
              className="!px-3 text-xs"
            >
              <CalendarIcon size={15} />
              <span>{t('consult.rebookAppointment')}</span>
            </Button>
          )}
        </div>
      </Card>
    </li>
  );

  return (
    <div className="space-y-6">
      {upcoming.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">
            {t('consult.upcomingAppointments')}
          </h2>
          <ul className="grid gap-4 md:grid-cols-2">{upcoming.map((item) => renderCard(item, true))}</ul>
        </section>
      )}

      {pastOrCancelled.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">
            {t('consult.pastAppointments')}
          </h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {pastOrCancelled.map((item) => renderCard(item, false))}
          </ul>
        </section>
      )}

      <Dialog
        open={Boolean(cancelTarget)}
        onClose={() => !cancelling && setCancelTarget(null)}
        title={t('consult.cancelAppointmentTitle')}
        footer={
          <>
            <Button variant="quiet" onClick={() => setCancelTarget(null)} disabled={cancelling}>
              {t('common.cancel')}
            </Button>
            <Button
              variant="primary"
              onClick={() => void handleConfirmCancel()}
              loading={cancelling}
            >
              {t('common.confirm')}
            </Button>
          </>
        }
      >
        <p className="text-muted">{t('consult.cancelAppointmentBody')}</p>
      </Dialog>
    </div>
  );
}

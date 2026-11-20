import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Dialog } from '@/components/ui/Dialog';
import { Stepper } from '@/components/ui/Stepper';
import { Tag } from '@/components/ui/Tag';
import { TextArea } from '@/components/ui/TextArea';
import { TextField } from '@/components/ui/TextField';
import { appointmentService } from '@/services/appointmentService';
import { formatDisplayDate, formatWeekdayShort } from '@/utils/date';
import { downloadAppointmentIcs } from '@/utils/ics';
import type {
  AppLanguage,
  Appointment,
  ConsultFormat,
  ConsultTopic,
  CounselorProfile,
  TimeSlotOption,
} from '@/types/domain';

export interface BookingDialogProps {
  open: boolean;
  counselors: CounselorProfile[];
  initialCounselorId?: string;
  initialFormat?: ConsultFormat;
  initialTopic?: ConsultTopic;
  onClose: () => void;
  onBooked: (appointment: Appointment) => void;
  onViewAppointments: () => void;
}

const TOPICS: ConsultTopic[] = [
  'study',
  'relationships',
  'anxiety-stress',
  'family',
  'other',
];

function isValidContact(contact: string): boolean {
  const trimmed = contact.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneDigits = trimmed.replace(/[\s.-]/g, '');
  const phonePattern = /^(\+?\d{8,13})$/;
  return emailPattern.test(trimmed) || phonePattern.test(phoneDigits);
}

export function BookingDialog({
  open,
  counselors,
  initialCounselorId,
  initialFormat,
  initialTopic,
  onClose,
  onBooked,
  onViewAppointments,
}: BookingDialogProps) {
  const { t, i18n } = useTranslation();
  const lang: AppLanguage = i18n.language === 'en' ? 'en' : 'vi';

  const availableDates = appointmentService.getAvailableDates();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [counselorId, setCounselorId] = useState<string>('');
  const [dateKey, setDateKey] = useState<string>('');
  const [slots, setSlots] = useState<TimeSlotOption[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotTime, setSlotTime] = useState<string>('');

  const [studentName, setStudentName] = useState('');
  const [contact, setContact] = useState('');
  const [format, setFormat] = useState<ConsultFormat>('in-person');
  const [topic, setTopic] = useState<ConsultTopic>('study');
  const [note, setNote] = useState('');
  const [demoAck, setDemoAck] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<Appointment | null>(null);

  useEffect(() => {
    if (!open) return;
    const defaultCounselor =
      counselors.find((c) => c.id === initialCounselorId) ?? counselors[0];
    setCounselorId(defaultCounselor?.id ?? '');
    setFormat(
      initialFormat && defaultCounselor?.formats.includes(initialFormat)
        ? initialFormat
        : (defaultCounselor?.formats[0] ?? 'in-person')
    );
    setTopic(initialTopic ?? 'study');
    setDateKey(availableDates[0] ?? '');
    setSlotTime('');
    setSlots([]);
    setStudentName('');
    setContact('');
    setNote('');
    setDemoAck(false);
    setErrorMsg('');
    setConfirmed(null);
    setStep(initialCounselorId ? 2 : 1);
  }, [open, initialCounselorId, initialFormat, initialTopic, counselors]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedCounselor =
    counselors.find((c) => c.id === counselorId) ?? counselors[0];

  useEffect(() => {
    if (!open || step !== 3 || !counselorId || !dateKey) return;
    let active = true;
    setLoadingSlots(true);
    setErrorMsg('');
    void appointmentService
      .getSlotsForCounselorAndDate(counselorId, dateKey)
      .then((list) => {
        if (!active) return;
        setSlots(list);
        setSlotTime((prev) => {
          const stillAvail = list.find((s) => s.time === prev && s.status === 'available');
          return stillAvail ? prev : '';
        });
      })
      .finally(() => {
        if (active) setLoadingSlots(false);
      });
    return () => {
      active = false;
    };
  }, [open, step, counselorId, dateKey]);

  const handleClose = () => {
    if (submitting) return;
    onClose();
  };

  const handleConfirmBooking = async () => {
    if (!studentName.trim()) {
      setErrorMsg(t('consult.studentNameRequiredError'));
      return;
    }
    if (!isValidContact(contact)) {
      setErrorMsg(t('consult.contactFormatError'));
      return;
    }
    if (!demoAck) {
      setErrorMsg(t('consult.demoAckError'));
      return;
    }
    if (!selectedCounselor || !dateKey || !slotTime) return;

    setErrorMsg('');
    setSubmitting(true);
    try {
      const created = await appointmentService.createAppointment({
        counselorId: selectedCounselor.id,
        counselorName: selectedCounselor.name,
        dateKey,
        slotTime,
        format,
        topic,
        studentName,
        contact,
        note,
      });
      setConfirmed(created);
      onBooked(created);
    } catch {
      setErrorMsg(t('consult.slotUnavailableError'));
      setStep(3);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title={confirmed ? t('consult.bookingSuccessTitle') : t('consult.bookingTitle')}
      footer={
        confirmed ? (
          <>
            <Button
              variant="secondary"
              onClick={() => downloadAppointmentIcs(confirmed, lang)}
            >
              {t('consult.downloadIcs')}
            </Button>
            <Button
              variant="quiet"
              onClick={() => {
                setConfirmed(null);
                setSlotTime('');
                setStep(1);
              }}
            >
              {t('consult.bookAnother')}
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onClose();
                onViewAppointments();
              }}
            >
              {t('consult.tabAppointments')}
            </Button>
          </>
        ) : (
          <>
            {step > 1 && (
              <Button
                variant="quiet"
                onClick={() => {
                  setErrorMsg('');
                  setStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3 | 4) : prev));
                }}
                disabled={submitting}
              >
                {t('common.back')}
              </Button>
            )}
            <Button variant="quiet" onClick={handleClose} disabled={submitting}>
              {t('common.cancel')}
            </Button>
            {step < 4 ? (
              <Button
                variant="primary"
                disabled={
                  (step === 1 && !counselorId) ||
                  (step === 2 && !dateKey) ||
                  (step === 3 && (!slotTime || loadingSlots))
                }
                onClick={() => {
                  setErrorMsg('');
                  setStep((prev) => ((prev + 1) as 1 | 2 | 3 | 4));
                }}
              >
                {t('common.continue')}
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => void handleConfirmBooking()}
                loading={submitting}
              >
                {t('consult.confirmBookingButton')}
              </Button>
            )}
          </>
        )
      }
    >
      {confirmed ? (
        <div className="space-y-4">
          <div className="rounded-sm border border-secondary/35 bg-secondary-soft/60 p-4">
            <p className="text-xs font-medium text-secondary">
              {t('consult.referenceCodeLabel')}
            </p>
            <p className="mt-1 font-serif text-2xl font-semibold tracking-wide text-ink">
              {confirmed.referenceCode}
            </p>
          </div>

          <Card tone="sand" className="space-y-2 !p-4 text-sm">
            <p className="font-semibold text-ink">{confirmed.counselorName}</p>
            <p className="text-muted">
              {formatDisplayDate(confirmed.dateKey, lang)} · {confirmed.slotTime}
            </p>
            <p className="text-muted">
              {t(`consult.counselorFormats.${confirmed.format}`)} ·{' '}
              {t(`consult.topics.${confirmed.topic}`)}
            </p>
            <p className="text-xs text-primary pt-1">{t('demo.consultNotice')}</p>
          </Card>
        </div>
      ) : (
        <div className="space-y-4">
          <Stepper
            currentStep={step}
            totalSteps={4}
            label={`${t('exercises.stepLabel', { current: step, total: 4 })} — ${t(`consult.bookingSteps.${step}`)}`}
          />

          {step === 1 && (
            <div className="space-y-2.5">
              {counselors.map((c) => {
                const selected = c.id === counselorId;
                return (
                  <label
                    key={c.id}
                    className={[
                      'flex min-h-[56px] cursor-pointer items-start gap-3 rounded-sm border p-3.5 transition-colors',
                      selected
                        ? 'border-primary bg-primary-soft/65'
                        : 'border-border-subtle bg-paper hover:border-border-strong',
                    ].join(' ')}
                  >
                    <input
                      type="radio"
                      name="booking-counselor"
                      checked={selected}
                      onChange={() => {
                        setCounselorId(c.id);
                        if (!c.formats.includes(format)) {
                          setFormat(c.formats[0] ?? 'in-person');
                        }
                      }}
                      className="mt-1 h-4 w-4 accent-[var(--accent-primary)]"
                    />
                    <span className="space-y-1">
                      <span className="block font-serif text-base font-semibold text-ink">
                        {c.name}
                      </span>
                      <span className="block text-xs text-muted">{c.title}</span>
                      <span className="block text-xs text-muted">
                        {c.formats.map((f) => t(`consult.counselorFormats.${f}`)).join(' · ')}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <p className="text-xs text-muted">{t('consult.selectDateHelp')}</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {availableDates.map((dKey) => {
                  const active = dKey === dateKey;
                  return (
                    <button
                      key={dKey}
                      type="button"
                      onClick={() => setDateKey(dKey)}
                      className={[
                        'flex min-h-[56px] flex-col items-start justify-center rounded-sm border px-3 py-2 text-left text-xs transition-colors',
                        active
                          ? 'border-primary bg-primary text-[var(--on-primary)]'
                          : 'border-border-subtle bg-paper text-ink hover:border-border-strong',
                      ].join(' ')}
                    >
                      <span className="font-semibold uppercase">
                        {formatWeekdayShort(dKey, lang)}
                      </span>
                      <span>{formatDisplayDate(dKey, lang)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <p className="text-xs text-muted">
                {selectedCounselor?.name} · {formatDisplayDate(dateKey, lang)}
              </p>

              {loadingSlots ? (
                <p className="py-6 text-center text-sm text-muted" role="status">
                  {t('common.loading')}
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {slots.map((slot) => {
                    const selected = slotTime === slot.time;
                    const disabled = slot.status !== 'available';
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={disabled}
                        onClick={() => setSlotTime(slot.time)}
                        className={[
                          'flex min-h-[56px] flex-col items-center justify-center gap-0.5 rounded-sm border px-3 py-2 text-sm transition-colors',
                          disabled
                            ? 'cursor-not-allowed border-border-subtle bg-sand/70 text-muted opacity-75'
                            : selected
                              ? 'border-primary bg-primary text-[var(--on-primary)]'
                              : 'border-border-subtle bg-paper text-ink hover:border-border-strong',
                        ].join(' ')}
                      >
                        <span className="font-semibold">{slot.time}</span>
                        <span className="text-[11px]">
                          {slot.status === 'full'
                            ? t('consult.slotFull')
                            : slot.status === 'booked-by-me'
                              ? t('consult.slotBookedByMe')
                              : t('consult.slotAvailable')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 rounded-sm border border-border-subtle bg-sand/60 px-3 py-2 text-xs text-ink">
                <Tag tone="secondary">{selectedCounselor?.name}</Tag>
                <span>
                  {formatDisplayDate(dateKey, lang)} · {slotTime}
                </span>
              </div>

              <TextField
                label={t('consult.studentNameLabel')}
                placeholder={t('consult.studentNamePlaceholder')}
                value={studentName}
                onChange={(e) => {
                  setStudentName(e.target.value);
                  setErrorMsg('');
                }}
                maxLength={40}
                required
              />

              <TextField
                label={t('consult.contactLabel')}
                placeholder={t('consult.contactPlaceholder')}
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  setErrorMsg('');
                }}
                maxLength={80}
                required
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="booking-format-select" className="block text-sm font-medium text-ink">
                    {t('consult.formatLabel')}
                  </label>
                  <select
                    id="booking-format-select"
                    value={format}
                    onChange={(e) => setFormat(e.target.value as ConsultFormat)}
                    className="min-h-[44px] w-full rounded-sm border border-border-strong bg-surface px-3 text-sm text-ink"
                  >
                    {(selectedCounselor?.formats ?? ['in-person', 'online']).map((fmt) => (
                      <option key={fmt} value={fmt}>
                        {t(`consult.counselorFormats.${fmt}`)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="booking-topic-select" className="block text-sm font-medium text-ink">
                    {t('consult.questionTopicLabel')}
                  </label>
                  <select
                    id="booking-topic-select"
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
              </div>

              <TextArea
                label={`${t('consult.bookingNoteLabel')} (${t('common.optional')})`}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={300}
                rows={2}
                showSupportHint
              />

              <label className="flex min-h-[44px] cursor-pointer items-start gap-2.5 rounded-sm border border-border-subtle bg-paper p-3 text-xs leading-relaxed text-ink">
                <input
                  type="checkbox"
                  checked={demoAck}
                  onChange={(e) => {
                    setDemoAck(e.target.checked);
                    setErrorMsg('');
                  }}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent-primary)]"
                />
                <span>{t('consult.demoAckLabel')}</span>
              </label>

              {errorMsg && (
                <p role="status" aria-live="polite" className="text-sm text-primary">
                  {errorMsg}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </Dialog>
  );
}

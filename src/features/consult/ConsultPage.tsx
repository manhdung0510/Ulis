import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { SupportHintLink } from '@/components/ui/SupportHintLink';
import { Tabs, type TabItem } from '@/components/ui/Tabs';
import { useToast } from '@/components/ui/useToast';
import { appointmentService } from '@/services/appointmentService';
import { consultService, type CreateConsultPostInput } from '@/services/consultService';
import { AskQuestionDialog } from './AskQuestionDialog';
import { AppointmentsTab } from './AppointmentsTab';
import { BookingDialog } from './BookingDialog';
import { CounselorsTab } from './CounselorsTab';
import { QaTab } from './QaTab';
import type {
  AppLanguage,
  Appointment,
  ConsultFormat,
  ConsultPost,
  ConsultTopic,
} from '@/types/domain';

type ConsultTab = 'qa' | 'counselors' | 'appointments';

export default function ConsultPage() {
  const { t, i18n } = useTranslation();
  const { showToast } = useToast();
  const lang: AppLanguage = i18n.language === 'en' ? 'en' : 'vi';

  const [activeTab, setActiveTab] = useState<ConsultTab>('qa');
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<ConsultPost[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [nowMs, setNowMs] = useState(() => Date.now());

  const [askOpen, setAskOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingPreset, setBookingPreset] = useState<{
    counselorId?: string;
    format?: ConsultFormat;
    topic?: ConsultTopic;
  }>({});

  const counselors = appointmentService.getCounselors(lang);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [postList, apptList] = await Promise.all([
        consultService.getPosts(),
        appointmentService.getAppointments(),
      ]);
      setPosts(postList);
      setAppointments(apptList);
      setNowMs(Date.now());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
    const handleReset = () => {
      void loadData();
    };
    window.addEventListener('hoa:data-reset', handleReset);
    return () => {
      window.removeEventListener('hoa:data-reset', handleReset);
    };
  }, [loadData]);

  // Poll persisted replyReadyAt timestamps when any user post is pending
  useEffect(() => {
    const hasPending = posts.some((p) => !p.sampleReply && Boolean(p.replyReadyAt));
    if (!hasPending) return;

    const timer = window.setInterval(() => {
      const currentNow = Date.now();
      setNowMs(currentNow);
      void consultService.resolveReadyReplies(currentNow, lang).then((newlyReplied) => {
        if (newlyReplied.length > 0) {
          void consultService.getPosts(currentNow).then((updated) => {
            setPosts(updated);
            showToast(t('consult.replyToast'));
          });
        }
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [posts, lang, showToast, t]);

  const handleCreatePost = async (input: CreateConsultPostInput) => {
    const created = await consultService.createPost(input);
    setPosts((prev) => [created, ...prev]);
    setNowMs(Date.now());
    showToast(t('consult.postPublishedToast'));
  };

  const handleDeletePost = async (id: string) => {
    await consultService.deletePost(id);
    setPosts((prev) => prev.filter((item) => item.id !== id));
    showToast(t('consult.postDeletedToast'));
  };

  const handleBooked = (created: Appointment) => {
    setAppointments((prev) => [created, ...prev]);
  };

  const handleCancelAppointment = async (id: string) => {
    await appointmentService.cancelAppointment(id);
    setAppointments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'cancelled' } : item))
    );
    showToast(t('consult.appointmentCancelledToast'));
  };

  const openBookingWith = (preset: {
    counselorId?: string;
    format?: ConsultFormat;
    topic?: ConsultTopic;
  }) => {
    setBookingPreset(preset);
    setBookingOpen(true);
  };

  const tabs: TabItem<ConsultTab>[] = [
    { id: 'qa', label: t('consult.tabQa') },
    { id: 'counselors', label: t('consult.tabCounselors') },
    { id: 'appointments', label: t('consult.tabAppointments') },
  ];

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="font-serif text-3xl font-semibold text-ink">{t('consult.pageTitle')}</h1>
        <p className="max-w-2xl text-base text-muted">{t('consult.pageIntro')}</p>
        <DemoNotice variant="consult" />
        <SupportHintLink />
      </header>

      <Tabs
        items={tabs}
        activeId={activeTab}
        onChange={setActiveTab}
        ariaLabel={t('consult.pageTitle')}
      />

      {loading ? (
        <Card tone="sand">
          <p className="text-sm text-muted" role="status">
            {t('common.loading')}
          </p>
        </Card>
      ) : (
        <>
          {activeTab === 'qa' && (
            <QaTab
              posts={posts}
              nowMs={nowMs}
              onOpenAsk={() => setAskOpen(true)}
              onDeletePost={handleDeletePost}
            />
          )}

          {activeTab === 'counselors' && (
            <CounselorsTab
              counselors={counselors}
              onSelectForBooking={(counselorId) => openBookingWith({ counselorId })}
            />
          )}

          {activeTab === 'appointments' && (
            <AppointmentsTab
              appointments={appointments}
              onCancelAppointment={handleCancelAppointment}
              onRebook={(appt) =>
                openBookingWith({
                  counselorId: appt.counselorId,
                  format: appt.format,
                  topic: appt.topic,
                })
              }
              onStartNewBooking={() => openBookingWith({})}
            />
          )}
        </>
      )}

      <AskQuestionDialog
        open={askOpen}
        onClose={() => setAskOpen(false)}
        onSubmit={handleCreatePost}
      />

      <BookingDialog
        open={bookingOpen}
        counselors={counselors}
        initialCounselorId={bookingPreset.counselorId}
        initialFormat={bookingPreset.format}
        initialTopic={bookingPreset.topic}
        onClose={() => setBookingOpen(false)}
        onBooked={handleBooked}
        onViewAppointments={() => setActiveTab('appointments')}
      />
    </div>
  );
}

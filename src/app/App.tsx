import { Suspense, lazy, useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppLayout } from '@/components/layout/AppLayout';
import { ToastProvider } from '@/components/ui/Toast';
import { useToast } from '@/components/ui/useToast';
import { FEATURES } from '@/config/features';

const HomePage = lazy(() => import('@/features/home/HomePage'));
const CheckinPage = lazy(() => import('@/features/checkin/CheckinPage'));
const ExercisesPage = lazy(() => import('@/features/exercises/ExercisesPage'));
const ExerciseRunnerPage = lazy(() => import('@/features/exercises/ExerciseRunnerPage'));
const JournalPage = lazy(() => import('@/features/journal/JournalPage'));
const ConsultPage = lazy(() => import('@/features/consult/ConsultPage'));
const SupportPage = lazy(() => import('@/features/support/SupportPage'));
const GuidePage = lazy(() => import('@/features/guide/GuidePage'));

function RouteLoadingFallback() {
  const { t } = useTranslation();
  return (
    <div className="py-12 text-center text-sm text-muted" role="status">
      {t('common.loading')}
    </div>
  );
}

function UnknownRouteRedirect() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      showToast(t('app.routeNotFoundToast'));
      navigate('/', { replace: true });
    }
  }, [location.pathname, navigate, showToast, t]);

  return <Navigate to="/" replace />;
}

export function App() {
  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ToastProvider>
        <AppLayout>
          <Suspense fallback={<RouteLoadingFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/check-in" element={<CheckinPage />} />
              <Route path="/bai-tap" element={<ExercisesPage />} />
              <Route path="/bai-tap/:id" element={<ExerciseRunnerPage />} />
              <Route path="/nhat-ky" element={<JournalPage />} />
              <Route path="/tham-van" element={<ConsultPage />} />
              {FEATURES.supportPage && <Route path="/ho-tro" element={<SupportPage />} />}
              <Route path="/huong-dan" element={<GuidePage />} />
              <Route path="*" element={<UnknownRouteRedirect />} />
            </Routes>
          </Suspense>
        </AppLayout>
      </ToastProvider>
    </HashRouter>
  );
}

export default App;

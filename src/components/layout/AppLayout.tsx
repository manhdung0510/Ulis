import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { FEATURES } from '@/config/features';
import { FEEDBACK_FORM_URL } from '@/config/app';
import { changeAppLanguage } from '@/i18n';
import {
  clearAllUserDataInStorage,
  isUsingMemoryFallback,
} from '@/services/storage';
import { useToast } from '@/components/ui/useToast';
import { DeleteAllDataDialog } from './DeleteAllDataDialog';
import {
  CheckinIcon,
  ConsultIcon,
  ExercisesIcon,
  HomeIcon,
  JournalIcon,
} from './NavIcons';
import type { AppLanguage } from '@/types/domain';

export function AppLayout({ children }: { children: ReactNode }) {
  const { t, i18n } = useTranslation();
  const { showToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memoryFallback, setMemoryFallback] = useState(() => isUsingMemoryFallback());

  useEffect(() => {
    setMemoryFallback(isUsingMemoryFallback());
  }, [location.pathname]);

  const currentLang: AppLanguage = i18n.language === 'en' ? 'en' : 'vi';

  const navItems = [
    { to: '/', label: t('nav.home'), icon: HomeIcon, end: true },
    { to: '/check-in', label: t('nav.checkin'), icon: CheckinIcon, end: false },
    { to: '/bai-tap', label: t('nav.exercises'), icon: ExercisesIcon, end: false },
    { to: '/tham-van', label: t('nav.consult'), icon: ConsultIcon, end: false },
    { to: '/nhat-ky', label: t('nav.journal'), icon: JournalIcon, end: false },
  ];

  const handleToggleLanguage = () => {
    const nextLang: AppLanguage = currentLang === 'vi' ? 'en' : 'vi';
    changeAppLanguage(nextLang);
  };

  const handleDeleteAll = () => {
    clearAllUserDataInStorage();
    showToast(t('journal.deleteAllSuccessToast'));
    navigate('/', { replace: true });
    window.dispatchEvent(new CustomEvent('hoa:data-reset'));
  };

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <a href="#main-content" className="skip-link no-print">
        {t('app.skipToContent')}
      </a>

      <div className="no-print">
        <DemoNotice variant="banner" />
        {memoryFallback && (
          <div
            role="status"
            className="border-b border-border-subtle bg-primary-soft px-4 py-1.5 text-center text-xs text-ink"
          >
            {t('app.memoryFallbackNotice')}
          </div>
        )}
      </div>

      <header className="no-print sticky top-0 z-30 border-b border-border-subtle bg-paper">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="inline-flex min-h-[44px] items-center gap-2 font-serif text-xl font-semibold tracking-tight text-ink"
          >
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
            <span>{t('app.name')}</span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  [
                    'inline-flex min-h-[44px] items-center rounded-sm px-3.5 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-soft text-primary'
                      : 'text-ink hover:bg-sand/80',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {FEATURES.languageSwitch && (
              <button
                type="button"
                onClick={handleToggleLanguage}
                aria-label={`${t('nav.languageLabel')}: ${currentLang.toUpperCase()}`}
                className="inline-flex min-h-[44px] min-w-[52px] items-center justify-center rounded-sm border border-border-strong bg-surface px-3 text-xs font-semibold tracking-wide text-ink transition-colors hover:bg-sand"
              >
                {currentLang === 'vi' ? 'VI / EN' : 'EN / VI'}
              </button>
            )}
          </div>
        </div>
      </header>

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 pb-24 sm:px-6 sm:py-8 md:pb-12"
      >
        {children}
      </main>

      <footer className="no-print border-t border-border-subtle bg-sand/50 pb-20 md:pb-6">
        <div className="mx-auto max-w-5xl space-y-4 px-4 py-6 sm:px-6">
          <DemoNotice variant="disclaimer" />

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
            <p>{t('footer.projectNote')}</p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {FEATURES.supportPage && (
                <Link
                  to="/ho-tro"
                  className="inline-flex min-h-[36px] items-center underline underline-offset-4 hover:text-primary"
                >
                  {t('footer.supportLink')}
                </Link>
              )}
              <Link
                to="/huong-dan"
                className="inline-flex min-h-[36px] items-center underline underline-offset-4 hover:text-primary"
              >
                {t('footer.guideLink')}
              </Link>
              {FEATURES.feedbackButton && FEEDBACK_FORM_URL.trim() !== '' && (
                <a
                  href={FEEDBACK_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[36px] items-center underline underline-offset-4 hover:text-primary"
                >
                  {t('footer.feedbackLink')}
                </a>
              )}
              <button
                type="button"
                onClick={() => setDeleteDialogOpen(true)}
                className="inline-flex min-h-[36px] items-center text-left text-primary underline underline-offset-4 hover:text-primary-hover"
              >
                {t('footer.deleteDataLink')}
              </button>
            </div>
          </div>
        </div>
      </footer>

      <nav
        aria-label="Mobile bottom navigation"
        className="no-print fixed inset-x-0 bottom-0 z-30 border-t border-border-subtle bg-paper md:hidden"
      >
        <ul className="grid grid-cols-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      'flex min-h-[56px] flex-col items-center justify-center gap-0.5 px-1 py-1.5 text-[11px] font-medium transition-colors',
                      isActive ? 'text-primary' : 'text-muted hover:text-ink',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon active={isActive} />
                      <span className="truncate max-w-full">{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <DeleteAllDataDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirmedDelete={handleDeleteAll}
      />
    </div>
  );
}

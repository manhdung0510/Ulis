import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FEATURES } from '@/config/features';

export function SupportHintLink() {
  const { t } = useTranslation();

  if (!FEATURES.supportPage) {
    return null;
  }

  return (
    <div className="mt-1.5 text-right">
      <Link
        to="/ho-tro"
        className="inline-flex min-h-[44px] items-center text-xs text-muted underline decoration-border-strong underline-offset-4 transition-colors hover:text-primary"
      >
        {t('common.needSupportNow')}
      </Link>
    </div>
  );
}

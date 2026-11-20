import { useTranslation } from 'react-i18next';

export interface DemoNoticeProps {
  variant: 'banner' | 'disclaimer' | 'consult';
  className?: string;
}

export function DemoNotice({ variant, className = '' }: DemoNoticeProps) {
  const { t } = useTranslation();

  if (variant === 'banner') {
    return (
      <div
        role="note"
        className={`border-b border-border-subtle bg-sand px-4 py-2 text-center text-xs leading-relaxed text-ink ${className}`}
      >
        {t('demo.topBanner')}
      </div>
    );
  }

  if (variant === 'consult') {
    return (
      <div
        role="note"
        className={`space-y-1 rounded-sm border border-border-subtle bg-sand/80 px-4 py-3 text-xs leading-relaxed text-ink ${className}`}
      >
        <p className="font-medium text-primary">{t('demo.consultNotice')}</p>
        <p className="text-muted">{t('demo.disclaimer')}</p>
      </div>
    );
  }

  return (
    <p
      role="note"
      className={`rounded-sm border border-border-subtle bg-sand/70 px-3.5 py-2.5 text-xs leading-relaxed text-muted ${className}`}
    >
      {t('demo.disclaimer')}
    </p>
  );
}

import { useTranslation } from 'react-i18next';
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';

export interface OnboardingDialogProps {
  open: boolean;
  onAcknowledge: () => void;
}

export function OnboardingDialog({ open, onAcknowledge }: OnboardingDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      closeable={false}
      title={t('demo.onboardingTitle')}
      footer={
        <Button variant="primary" onClick={onAcknowledge}>
          {t('demo.onboardingConfirm')}
        </Button>
      }
    >
      <div className="space-y-3">
        <div className="rounded-sm border border-border-subtle bg-sand/60 p-3.5">
          <p className="font-medium text-ink">{t('demo.onboardingPoint1Title')}</p>
          <p className="mt-1 text-muted">{t('demo.onboardingPoint1Body')}</p>
        </div>
        <div className="rounded-sm border border-border-subtle bg-sand/60 p-3.5">
          <p className="font-medium text-ink">{t('demo.onboardingPoint2Title')}</p>
          <p className="mt-1 text-muted">{t('demo.onboardingPoint2Body')}</p>
        </div>
        <div className="rounded-sm border border-border-subtle bg-sand/60 p-3.5">
          <p className="font-medium text-ink">{t('demo.onboardingPoint3Title')}</p>
          <p className="mt-1 text-muted">{t('demo.onboardingPoint3Body')}</p>
        </div>
      </div>
    </Dialog>
  );
}

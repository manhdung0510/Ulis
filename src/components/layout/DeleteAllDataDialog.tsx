import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';

export interface DeleteAllDataDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirmedDelete: () => Promise<void> | void;
}

export function DeleteAllDataDialog({
  open,
  onClose,
  onConfirmedDelete,
}: DeleteAllDataDialogProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState<1 | 2>(1);
  const [busy, setBusy] = useState(false);

  const handleClose = () => {
    if (busy) return;
    setStep(1);
    onClose();
  };

  const handleConfirmFinal = async () => {
    setBusy(true);
    try {
      await onConfirmedDelete();
      setStep(1);
      onClose();
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title={step === 1 ? t('journal.deleteAllStep1Title') : t('journal.deleteAllStep2Title')}
      footer={
        <>
          <Button variant="quiet" onClick={handleClose} disabled={busy}>
            {t('common.cancel')}
          </Button>
          {step === 1 ? (
            <Button variant="secondary" onClick={() => setStep(2)}>
              {t('journal.deleteAllStep1Next')}
            </Button>
          ) : (
            <Button variant="primary" onClick={handleConfirmFinal} loading={busy}>
              {t('journal.deleteAllConfirm')}
            </Button>
          )}
        </>
      }
    >
      <p className="text-muted">
        {step === 1 ? t('journal.deleteAllStep1Body') : t('journal.deleteAllStep2Body')}
      </p>
    </Dialog>
  );
}

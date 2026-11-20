import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { Card } from '@/components/ui/Card';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { ArrowLeftIcon, PhoneIcon } from '@/components/ui/Icons';
import { Tag } from '@/components/ui/Tag';
import { supportContentVi } from '@/content/vi/support';
import { supportContentEn } from '@/content/en/support';
import type { AppLanguage } from '@/types/domain';

export default function SupportPage() {
  const { t, i18n } = useTranslation();
  const lang: AppLanguage = i18n.language === 'en' ? 'en' : 'vi';
  const content = lang === 'en' ? supportContentEn : supportContentVi;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-serif text-3xl font-semibold text-ink">{t('support.pageTitle')}</h1>
        <p className="max-w-2xl text-base text-muted">{t('support.pageIntro')}</p>
      </header>

      <Card tone="sand">
        <p className="text-sm leading-relaxed text-ink">{t('support.emergencyNote')}</p>
      </Card>

      <ul className="grid gap-4 md:grid-cols-3">
        {content.resources.map((item) => (
          <li key={item.id}>
            <Card tone="surface" className="flex h-full flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="font-serif text-xl font-semibold text-ink">{item.title}</h2>
                  {item.hours && <Tag tone="secondary">{item.hours}</Tag>}
                  {item.status === 'placeholder' && (
                    <Tag tone="neutral">{t('support.placeholderTag')}</Tag>
                  )}
                </div>

                <p className="text-sm leading-relaxed text-muted">{item.description}</p>
              </div>

              {item.phone && (
                <div>
                  <a href={`tel:${item.phone}`} className={buttonClasses('primary')}>
                    <PhoneIcon size={16} />
                    <span>{t('support.callAction', { phone: item.phone })}</span>
                  </a>
                </div>
              )}
            </Card>
          </li>
        ))}
      </ul>

      <DemoNotice variant="disclaimer" />

      <div>
        <Link to="/" className={buttonClasses('secondary')}>
          <ArrowLeftIcon size={16} />
          <span>{t('support.backHome')}</span>
        </Link>
      </div>
    </div>
  );
}

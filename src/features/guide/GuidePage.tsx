import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { Card } from '@/components/ui/Card';
import { InkDivider } from '@/components/illustration/InkDivider';
import { guideContentVi } from '@/content/vi/guide';
import { guideContentEn } from '@/content/en/guide';

export default function GuidePage() {
  const { t, i18n } = useTranslation();
  const guide = i18n.language === 'en' ? guideContentEn : guideContentVi;

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-serif text-3xl font-semibold text-ink">{t('guide.pageTitle')}</h1>
        <p className="max-w-2xl text-base text-muted">{t('guide.pageIntro')}</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <Card tone="surface" className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">
            {t('home.paperColumnTitle')}
          </h2>
          <ul className="space-y-2.5 text-sm leading-relaxed text-muted">
            {guide.paperItems.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card tone="surface" className="space-y-3">
          <h2 className="font-serif text-xl font-semibold text-ink">
            {t('home.webColumnTitle')}
          </h2>
          <ul className="space-y-2.5 text-sm leading-relaxed text-muted">
            {guide.webItems.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <InkDivider />

      <section className="grid gap-4 md:grid-cols-3">
        {guide.rhythmSteps.map((step) => (
          <Card key={step.title} tone="sand" className="space-y-2">
            <h2 className="font-serif text-lg font-semibold text-ink">{step.title}</h2>
            <p className="text-sm leading-relaxed text-muted">{step.detail}</p>
          </Card>
        ))}
      </section>

      <div className="flex flex-wrap gap-3">
        <Link to="/check-in" className={buttonClasses('primary')}>
          {t('home.primaryCta')}
        </Link>
        <Link to="/bai-tap" className={buttonClasses('secondary')}>
          {t('home.entryExercisesAction')}
        </Link>
      </div>
    </div>
  );
}

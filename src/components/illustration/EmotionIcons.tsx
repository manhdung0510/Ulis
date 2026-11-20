import type { EmotionId } from '@/types/domain';

export interface EmotionIconProps {
  emotion: EmotionId;
  label: string;
  size?: number;
  className?: string;
  decorative?: boolean;
}

export function EmotionIcon({
  emotion,
  label,
  size = 28,
  className = '',
  decorative = false,
}: EmotionIconProps) {
  const renderGlyph = () => {
    switch (emotion) {
      case 'peaceful':
        return (
          <>
            <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.6" />
            <path d="M11 14.5C11.7 13.7 12.8 13.7 13.5 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M18.5 14.5C19.2 13.7 20.3 13.7 21 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M12.5 19.5C13.6 20.5 18.4 20.5 19.5 19.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </>
        );
      case 'joyful':
        return (
          <>
            <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="12" cy="13.5" r="1.2" fill="currentColor" />
            <circle cx="20" cy="13.5" r="1.2" fill="currentColor" />
            <path d="M11 18C12.2 21 19.8 21 21 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </>
        );
      case 'anxious':
        return (
          <>
            <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="12" cy="14" r="1.1" fill="currentColor" />
            <circle cx="20" cy="14" r="1.1" fill="currentColor" />
            <path d="M11 20C12.2 18.8 13.5 20.5 14.8 19.3C16 18.2 17.2 20.5 18.5 19.3C19.6 18.3 20.4 19.5 21 19.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </>
        );
      case 'stressed':
        return (
          <>
            <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.6" />
            <path d="M10.5 12.2L13.8 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M21.5 12.2L18.2 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="12" cy="15" r="1.1" fill="currentColor" />
            <circle cx="20" cy="15" r="1.1" fill="currentColor" />
            <path d="M12 20H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </>
        );
      case 'sad':
        return (
          <>
            <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="12" cy="14" r="1.1" fill="currentColor" />
            <circle cx="20" cy="14" r="1.1" fill="currentColor" />
            <path d="M11.5 20.5C13 18.5 19 18.5 20.5 20.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </>
        );
      case 'angry':
        return (
          <>
            <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.6" />
            <path d="M10.5 11.5L14 13.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M21.5 11.5L18 13.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <circle cx="12.3" cy="15" r="1.1" fill="currentColor" />
            <circle cx="19.7" cy="15" r="1.1" fill="currentColor" />
            <path d="M12 20.5C13.5 19 18.5 19 20 20.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </>
        );
      case 'tired':
        return (
          <>
            <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.6" />
            <path d="M10.5 14.5H13.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M18.2 14.5H21.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M13 19.5C14.5 19 17.5 19 19 19.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </>
        );
      case 'confused':
        return (
          <>
            <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="12" cy="14" r="1.1" fill="currentColor" />
            <circle cx="20" cy="13.5" r="1.1" fill="currentColor" />
            <path d="M12 20C14 19 17.5 20.5 20 18.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </>
        );
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : label}
      className={className}
    >
      {!decorative && <title>{label}</title>}
      {renderGlyph()}
    </svg>
  );
}

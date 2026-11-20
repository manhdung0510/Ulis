import { useState } from 'react';

export type IllustrationName =
  | 'notebook-desk'
  | 'checkin-calm'
  | 'writing-steps'
  | 'consult-corner';

export interface IllustrationProps {
  name: IllustrationName;
  alt: string;
  aspect?: '4/3' | '16/9' | '1/1';
  className?: string;
}

/**
 * Bản đồ đường dẫn ảnh thật khi nhóm chép tệp vào src/assets/illustrations/.
 * Hiện tại để rỗng để hiển thị khung giữ chỗ trung tính đúng tỷ lệ.
 */
const ILLUSTRATION_SOURCES: Partial<Record<IllustrationName, string>> = {};

const aspectClasses: Record<NonNullable<IllustrationProps['aspect']>, string> = {
  '4/3': 'aspect-[4/3]',
  '16/9': 'aspect-[16/9]',
  '1/1': 'aspect-square',
};

export function Illustration({
  name,
  alt,
  aspect = '4/3',
  className = '',
}: IllustrationProps) {
  const [hasError, setHasError] = useState(false);
  const src = ILLUSTRATION_SOURCES[name];

  if (src && !hasError) {
    return (
      <figure className={`overflow-hidden rounded-md border border-border-subtle bg-sand ${className}`}>
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className={`w-full object-cover ${aspectClasses[aspect]}`}
          loading="lazy"
        />
      </figure>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={[
        'flex flex-col items-center justify-center rounded-md border border-dashed border-border-strong/60 bg-sand/70 p-4 text-center',
        aspectClasses[aspect],
        className,
      ].join(' ')}
    >
      <svg
        width="48"
        height="36"
        viewBox="0 0 48 36"
        fill="none"
        aria-hidden="true"
        className="mb-2 text-muted/70"
      >
        <rect x="4" y="4" width="40" height="28" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 24C14 19 18 19 22 23C26 27 30 16 38 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="16" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className="max-w-[22ch] text-xs leading-relaxed text-muted">{alt}</span>
    </div>
  );
}

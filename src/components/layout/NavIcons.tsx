interface IconProps {
  active?: boolean;
}

export function HomeIcon({ active }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 10.5L12 4L20 10.5V19.5C20 20.05 19.55 20.5 19 20.5H5C4.45 20.5 4 20.05 4 19.5V10.5Z"
        stroke="currentColor"
        strokeWidth={active ? 2 : 1.7}
        strokeLinejoin="round"
      />
      <path d="M9.5 20.5V14.5H14.5V20.5" stroke="currentColor" strokeWidth={active ? 2 : 1.7} />
    </svg>
  );
}

export function CheckinIcon({ active }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth={active ? 2 : 1.7}
      />
      <path
        d="M8.5 14C9.4 15.3 10.6 16 12 16C13.4 16 14.6 15.3 15.5 14"
        stroke="currentColor"
        strokeWidth={active ? 2 : 1.7}
        strokeLinecap="round"
      />
      <circle cx="9.2" cy="10" r="1" fill="currentColor" />
      <circle cx="14.8" cy="10" r="1" fill="currentColor" />
    </svg>
  );
}

export function ExercisesIcon({ active }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15.5 4.5L19.5 8.5L9 19H5V15L15.5 4.5Z"
        stroke="currentColor"
        strokeWidth={active ? 2 : 1.7}
        strokeLinejoin="round"
      />
      <path d="M13 7L17 11" stroke="currentColor" strokeWidth={active ? 2 : 1.7} />
    </svg>
  );
}

export function ConsultIcon({ active }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 6.5C5 5.67 5.67 5 6.5 5H17.5C18.33 5 19 5.67 19 6.5V14.5C19 15.33 18.33 16 17.5 16H10L5.5 19.5V16H6.5C5.67 16 5 15.33 5 14.5V6.5Z"
        stroke="currentColor"
        strokeWidth={active ? 2 : 1.7}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function JournalIcon({ active }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="5"
        y="4"
        width="14"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth={active ? 2 : 1.7}
      />
      <path d="M9 4V20" stroke="currentColor" strokeWidth={active ? 2 : 1.7} />
      <path
        d="M12 9H16M12 13H15.5"
        stroke="currentColor"
        strokeWidth={active ? 2 : 1.7}
        strokeLinecap="round"
      />
    </svg>
  );
}

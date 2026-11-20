export function InkDivider({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`my-6 flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 240 12"
        className="h-3 w-48 text-border-strong/70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 6C42 3 82 9 120 6C158 3 198 8 236 5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

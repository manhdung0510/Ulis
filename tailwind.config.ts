import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--bg-paper)',
        sand: 'var(--bg-sand)',
        surface: 'var(--bg-surface)',
        ink: 'var(--text-ink)',
        muted: 'var(--text-muted)',
        primary: {
          DEFAULT: 'var(--accent-primary)',
          hover: 'var(--accent-primary-hover)',
          soft: 'var(--accent-primary-soft)',
        },
        secondary: {
          DEFAULT: 'var(--accent-secondary)',
          hover: 'var(--accent-secondary-hover)',
          soft: 'var(--accent-secondary-soft)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          strong: 'var(--border-strong)',
        },
        focus: 'var(--focus-ring)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        lifted: 'var(--shadow-lifted)',
      },
    },
  },
  plugins: [],
} satisfies Config;

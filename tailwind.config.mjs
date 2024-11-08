/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animation-delay'),
  ],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '2.5rem',
        '2xl': '5rem',
        // xl: '2.5rem',
        // lg: '2.5rem',
        // md: '2.5rem',
        sm: '1.25rem',
      },
      screens: {
        DEFAULT: '80rem',
        '2xl': '86rem',
        // // xl: '80rem',
        // // lg: '64rem',
        // // md: '48rem',
        // sm: '40rem',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        // lg: 'var(--radius)',
        // md: 'calc(var(--radius) - 2px)',
        // sm: 'calc(var(--radius) - 4px)',
        mediaSm: 'var(--radius)',
        mediaMd: 'calc(var(--radius) + 4px)',
        mediaLg: 'calc(var(--radius) + 12px)',
        mediaXl: 'calc(var(--radius) + 20px)',
        media2Xl: 'calc(var(--radius) + 36px)',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsl(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          alt: 'hsl(var(--success-alt))',
        },
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-geist-sans)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--text)',
            '--tw-prose-headings': 'var(--text)',
            h1: {
              fontSize: '4rem',
              fontWeight: '500',
              marginBottom: 0,
              marginTop: 0,
            },
            h2: {
              fontSize: '2.5rem',
              fontWeight: '500',
              marginBottom: 0,
              marginTop: 0,
            },
          },
        },
      }),
    },
    animationDelay: {
      100: '100ms',
      200: '200ms',
      300: '300ms',
      400: '400ms',
      500: '500ms',
      1000: '1000ms',
      1500: '1500ms',
      2000: '2000ms',
      '-3000': '-3000ms',
      '-7000': '-7000ms',
    },
  },
}

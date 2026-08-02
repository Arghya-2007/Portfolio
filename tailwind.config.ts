import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — from Design.md Section 2.1
        ocean:  '#264653',
        teal:   '#2a9d8f',
        gold:   '#e9c46a',
        sand:   '#f4a261',
        coral:  '#e76f51',

        // Surface system — from Design.md Section 2.2
        surface: {
          base:  '#0d1f26',
          deep:  '#152e38',
          mid:   '#1c3d4a',
        },

        // Text system
        text: {
          primary:   '#f0f4f5',
          secondary: '#8faab3',
          muted:     '#4d6b75',
          accent:    '#2a9d8f',
        },
      },

      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        sans:    ['var(--font-inter)', 'sans-serif'],
        mono:    ['var(--font-jetbrains-mono)', 'monospace'],
      },

      fontSize: {
        'display':      ['clamp(3.5rem, 8vw, 7rem)',   { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'hero-sub':     ['clamp(1.1rem, 2.5vw, 1.5rem)', { lineHeight: '1.5' }],
        'section-title':['clamp(2rem, 4vw, 3.5rem)',   { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },

      spacing: {
        'section': '96px',
      },

      borderRadius: {
        'glass':  '16px',
        'glass-lg': '20px',
        'pill':   '100px',
      },

      backdropBlur: {
        'glass':    '20px',
        'glass-lg': '32px',
        'glass-sm': '10px',
      },

      animation: {
        'marquee-left':  'marquee-left 35s linear infinite',
        'marquee-right': 'marquee-right 38s linear infinite',
        'pulse-soft':    'pulse-soft 2.5s ease-in-out infinite',
        'cursor-pulse':  'cursor-pulse 2s ease-in-out infinite',
        'scroll-dot':    'scroll-dot 2s ease-in-out infinite',
      },

      keyframes: {
        'marquee-left': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-right': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.6', transform: 'scale(0.95)' },
        },
        'cursor-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%':      { transform: 'scale(1.3)', opacity: '0.7' },
        },
        'scroll-dot': {
          '0%':   { transform: 'translateY(0)',    opacity: '1' },
          '50%':  { transform: 'translateY(32px)', opacity: '0.3' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
      },

      backgroundImage: {
        'grad-warm': 'linear-gradient(135deg, #e76f51 0%, #e9c46a 100%)',
        'grad-teal': 'linear-gradient(135deg, #2a9d8f 0%, #264653 100%)',
        'grad-dark': 'linear-gradient(180deg, #0d1f26 0%, #152e38 50%, #0d1f26 100%)',
        'grad-vignette': 'radial-gradient(ellipse at center, transparent 40%, #0d1f26 100%)',
      },
    },
  },
  plugins: [],
}

export default config

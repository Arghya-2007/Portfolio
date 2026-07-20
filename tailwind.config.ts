import type { Config } from "tailwindcss"

const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "var(--bg-base)",
        elevated: "var(--bg-elevated)",
        foreground: "var(--text-primary)",
        primary: {
          DEFAULT: "var(--primary-500)",
          300: "var(--primary-300)",
          500: "var(--primary-500)",
          700: "var(--primary-700)",
          foreground: "var(--bg-base)",
        },
        secondary: {
          DEFAULT: "var(--secondary-500)",
          300: "var(--secondary-300)",
          500: "var(--secondary-500)",
          700: "var(--secondary-700)",
          foreground: "var(--bg-base)",
        },
        glass: {
          fill: "var(--surface-glass)",
          border: "var(--border-glass)",
        },
        // Use "content-*" to avoid clash with "secondary" accent color
        // Usage: text-content-primary, text-content-secondary, text-content-tertiary
        content: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
        status: {
          live: "var(--status-live)",
          progress: "var(--status-progress)",
        },
        border: "var(--border-glass)",
        input: "var(--border-glass)",
        ring: "var(--primary-500)",
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        neo: "6px 6px 16px rgba(0,0,0,0.5), -6px -6px 16px rgba(255,255,255,0.02)",
      },
      borderRadius: {
        glass: "20px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

# 🤖 AGENT PROMPT — Portfolio Project Initialization (Phase 0)

## Context

You are initializing a premium developer portfolio website from scratch.
Read the following documents before writing a single file:
- `PRD.md` — Project goals and scope
- `Design.md` — Complete design system (colors, glass formula, typography)
- `Architecture&TechStack.md` — File structure and tech decisions
- `Rules.md` — Coding rules. Follow ALL rules marked 🔒 and 🤖 without exception
- `Phases.md` — This task covers Phase 0 only. Do not build any section content yet.
- `Features.md` — For reference only in this phase. Do not implement features yet.

Your output at the end of this phase: a running Next.js project with zero content, but with the complete foundation — design tokens, providers, hooks, and configuration — in place. `pnpm dev` must run without errors or TypeScript warnings.

---

## STEP 1 — Initialize Next.js Project

Run this exact command. Do not modify flags:

```bash
pnpm create next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --no-git
```

Flags explained:
- `.` — initialize in current directory
- `--app` — App Router (not Pages Router)
- `--no-src-dir` — no `/src` folder, root-level `app/`
- `--import-alias "@/*"` — all internal imports use `@/`
- `--no-git` — skip git init (we handle this separately)

After creation, verify the following files exist before continuing:
- `app/layout.tsx`
- `app/page.tsx`
- `tailwind.config.ts`
- `tsconfig.json`
- `next.config.ts`

---

## STEP 2 — Install All Dependencies

Run these commands in order. Do not combine them:

```bash
# Core animation stack
pnpm add gsap @gsap/react framer-motion lenis

# GPU detection and state
pnpm add detect-gpu zustand

# Form handling and validation
pnpm add react-hook-form zod resend

# UI utilities
pnpm add lucide-react clsx tailwind-merge

# Vercel analytics
pnpm add @vercel/analytics @vercel/speed-insights

# SEO
pnpm add next-sitemap

# Dev dependencies
pnpm add -D @types/node prettier eslint-config-prettier
```

Then initialize Shadcn UI:
```bash
pnpm dlx shadcn@latest init
```
When prompted by Shadcn:
- Style: Default
- Base color: Slate
- CSS variables: Yes

Then add these Shadcn components:
```bash
pnpm dlx shadcn@latest add toast form input textarea label button
```

After all installations, run `pnpm build` to verify no install-time errors exist.

---

## STEP 3 — Create Directory Structure

Create ALL of the following empty directories now. Do not add files yet — just the folders.
Use `mkdir -p` for nested paths:

```
components/sections/
components/ui/
components/layout/
components/providers/
hooks/
lib/gsap/
store/
styles/
content/
public/images/frames/hero/
public/images/frames/about/
public/images/projects/
public/favicon/
```

Verify the full structure matches `Architecture&TechStack.md` Section 2 exactly before continuing.

---

## STEP 4 — Configure `tailwind.config.ts`

Replace the entire contents of `tailwind.config.ts` with the following.
Do not add or remove any token — use exact values from `Design.md`:

```typescript
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
```

---

## STEP 5 — Write `styles/globals.css`

Replace the entire contents of `app/globals.css` with the following.
This file defines CSS custom properties, glass utility classes, and scrollbar styles:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ─── Google Font variables (set by next/font in layout.tsx) ─── */
/* --font-space-grotesk, --font-inter, --font-jetbrains-mono */

/* ─── CSS Custom Properties ─── */
@layer base {
  :root {
    /* Brand colors */
    --color-ocean:  #264653;
    --color-teal:   #2a9d8f;
    --color-gold:   #e9c46a;
    --color-sand:   #f4a261;
    --color-coral:  #e76f51;

    /* Surfaces */
    --surface-base: #0d1f26;
    --surface-deep: #152e38;
    --surface-mid:  #1c3d4a;
    --surface-glass: rgba(26, 50, 62, 0.35);
    --surface-glass-hover: rgba(26, 50, 62, 0.50);

    /* Text */
    --text-primary:   #f0f4f5;
    --text-secondary: #8faab3;
    --text-muted:     #4d6b75;
    --text-accent:    #2a9d8f;

    /* Gradients */
    --grad-warm:  linear-gradient(135deg, #e76f51 0%, #e9c46a 100%);
    --grad-teal:  linear-gradient(135deg, #2a9d8f 0%, #264653 100%);
    --grad-dark:  linear-gradient(180deg, #0d1f26 0%, #152e38 50%, #0d1f26 100%);

    /* Spacing */
    --space-section: 96px;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: auto; /* Lenis handles smooth scroll — disable native */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body {
    background-color: var(--surface-base);
    color: var(--text-primary);
    font-family: var(--font-inter), system-ui, sans-serif;
    overflow-x: hidden;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--surface-base);
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(42, 157, 143, 0.40);
    border-radius: 100px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(42, 157, 143, 0.70);
  }

  /* Selection color */
  ::selection {
    background: rgba(42, 157, 143, 0.30);
    color: var(--text-primary);
  }
}

/* ─── Glass Utility Classes ─── */
@layer components {
  /* Base glass — used on most cards */
  .glass {
    background: rgba(26, 50, 62, 0.35);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(42, 157, 143, 0.20);
    border-radius: 16px;
  }

  /* Elevated glass — modals, featured cards */
  .glass-elevated {
    background: rgba(26, 50, 62, 0.55);
    backdrop-filter: blur(32px) saturate(200%);
    -webkit-backdrop-filter: blur(32px) saturate(200%);
    border: 1px solid rgba(42, 157, 143, 0.30);
    border-radius: 20px;
    box-shadow:
      0 0 0 1px rgba(42, 157, 143, 0.10),
      0 20px 60px rgba(0, 0, 0, 0.40),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  /* Subtle glass — navbar, pills, badges */
  .glass-subtle {
    background: rgba(26, 50, 62, 0.20);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(42, 157, 143, 0.12);
    border-radius: 100px;
  }

  /* Warm accent border (::before) — used on featured cards */
  .glass-accent-warm {
    position: relative;
  }
  .glass-accent-warm::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, #e76f51, #e9c46a);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
                  linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.6;
    pointer-events: none;
    z-index: 0;
  }

  /* Teal accent border */
  .glass-accent-teal {
    position: relative;
  }
  .glass-accent-teal::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, #2a9d8f, #264653);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
                  linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.5;
    pointer-events: none;
    z-index: 0;
  }

  /* Gradient text */
  .text-grad-warm {
    background: linear-gradient(135deg, #e76f51 0%, #e9c46a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .text-grad-teal {
    background: linear-gradient(135deg, #2a9d8f 0%, #e9c46a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Section layout wrapper */
  .section-container {
    @apply max-w-7xl mx-auto px-6 lg:px-12;
  }

  /* Eyebrow label */
  .eyebrow {
    @apply text-xs font-medium tracking-[0.12em] uppercase text-teal;
    font-family: var(--font-inter);
  }
}

/* ─── Reduced motion overrides ─── */
@media (prefers-reduced-motion: reduce) {
  .animate-marquee-left,
  .animate-marquee-right {
    animation-play-state: paused !important;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## STEP 6 — Configure `next.config.ts`

Replace `next.config.ts` with:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable React strict mode for catching issues early
  reactStrictMode: true,

  // Compress output
  compress: true,

  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default nextConfig
```

---

## STEP 7 — Create `lib/utils.ts`

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind classes with clsx. Use this for all conditional className logic.
 * @example cn('base-class', condition && 'conditional-class', 'another-class')
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Linear interpolation — used for cursor smoothing and animation lerp
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Map a value from one range to another
 * @example mapRange(0.5, 0, 1, 0, 100) → 50
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}
```

---

## STEP 8 — Create `lib/gsap/gsap.config.ts`

```typescript
'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

/**
 * Register all GSAP plugins once.
 * Import this file in your root layout (client boundary).
 * NEVER call gsap.registerPlugin() anywhere else in the project.
 */
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin)

// Performance: reduce GSAP's internal timer for smoother animations
gsap.ticker.lagSmoothing(0)

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin }
```

> NOTE: SplitText and DrawSVGPlugin are GSAP Club plugins. If you have a GSAP Club license,
> install the full package. If using free GSAP, comment out SplitText and DrawSVGPlugin
> registrations and remove those imports. Hero text animation will use a CSS alternative.

---

## STEP 9 — Create `store/useAnimationStore.ts`

```typescript
import { create } from 'zustand'

export type GPUTier = 'high' | 'mid' | 'low' | 'unknown'
export type SectionId = 'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'contact'

interface AnimationStore {
  // GPU and motion
  gpuTier: GPUTier
  prefersReducedMotion: boolean
  animationsEnabled: boolean

  // Navigation state
  activeSection: SectionId

  // Actions
  setGpuTier: (tier: GPUTier) => void
  setActiveSection: (section: SectionId) => void
}

export const useAnimationStore = create<AnimationStore>((set, get) => ({
  // Initial state — conservative defaults before detection runs
  gpuTier: 'unknown',
  prefersReducedMotion: false,
  animationsEnabled: false, // false until detection completes

  activeSection: 'hero',

  setGpuTier: (tier: GPUTier) => {
    const { prefersReducedMotion } = get()
    set({
      gpuTier: tier,
      animationsEnabled: tier !== 'low' && !prefersReducedMotion,
    })
  },

  setActiveSection: (section: SectionId) => set({ activeSection: section }),
}))
```

---

## STEP 10 — Create `hooks/useMotionConfig.ts`

```typescript
import { useAnimationStore, type GPUTier } from '@/store/useAnimationStore'

export interface MotionConfig {
  animationsEnabled: boolean
  gpuTier: GPUTier
  reducedMotion: boolean
  /** True only on high-GPU, non-reduced-motion environments */
  fullAnimations: boolean
  /** True on high and mid GPU tiers */
  basicAnimations: boolean
  /** Whether image frame scroll should run */
  imageSequenceEnabled: boolean
  /** Whether custom cursor should render */
  cursorEnabled: boolean
}

/**
 * Consume this hook in every animated component.
 * Never run GSAP or Framer animations without checking animationsEnabled first.
 */
export function useMotionConfig(): MotionConfig {
  const { gpuTier, prefersReducedMotion, animationsEnabled } = useAnimationStore()

  return {
    animationsEnabled,
    gpuTier,
    reducedMotion: prefersReducedMotion,
    fullAnimations: gpuTier === 'high' && !prefersReducedMotion,
    basicAnimations: (gpuTier === 'high' || gpuTier === 'mid') && !prefersReducedMotion,
    imageSequenceEnabled: gpuTier === 'high' && !prefersReducedMotion,
    cursorEnabled: gpuTier === 'high' && !prefersReducedMotion,
  }
}
```

---

## STEP 11 — Create `components/providers/AnimationProvider.tsx`

```typescript
'use client'

import { useEffect } from 'react'
import { getGPUTier } from 'detect-gpu'
import { useAnimationStore, type GPUTier } from '@/store/useAnimationStore'

interface AnimationProviderProps {
  children: React.ReactNode
}

/**
 * Runs GPU detection and prefers-reduced-motion check on mount.
 * Writes results to Zustand store. Must wrap the entire app.
 */
export function AnimationProvider({ children }: AnimationProviderProps) {
  const { setGpuTier } = useAnimationStore()

  useEffect(() => {
    // Check reduced motion preference FIRST (synchronous)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    useAnimationStore.setState({ prefersReducedMotion: reducedMotion })

    // If reduced motion is preferred, skip GPU detection entirely
    if (reducedMotion) {
      useAnimationStore.setState({ gpuTier: 'low', animationsEnabled: false })
      return
    }

    // GPU detection (async)
    const detectGPU = async () => {
      try {
        const result = await getGPUTier()

        let tier: GPUTier
        if (result.tier >= 3) {
          tier = 'high'
        } else if (result.tier === 2) {
          tier = 'mid'
        } else {
          tier = 'low'
        }

        setGpuTier(tier)
      } catch {
        // Detection failed — assume mid tier (safe default)
        setGpuTier('mid')
      }
    }

    detectGPU()

    // Listen for reduced motion changes (user can toggle in OS settings)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e: MediaQueryListEvent) => {
      useAnimationStore.setState({
        prefersReducedMotion: e.matches,
        animationsEnabled: !e.matches && useAnimationStore.getState().gpuTier !== 'low',
      })
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [setGpuTier])

  return <>{children}</>
}
```

---

## STEP 12 — Create `components/providers/LenisProvider.tsx`

```typescript
'use client'

import { useEffect, useRef, createContext, useContext } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from '@/lib/gsap/gsap.config'

const LenisContext = createContext<Lenis | null>(null)

export function useLenis(): Lenis | null {
  return useContext(LenisContext)
}

interface LenisProviderProps {
  children: React.ReactNode
}

/**
 * Initializes Lenis smooth scroll and syncs it with GSAP ScrollTrigger.
 * Disabled on mobile (< 768px) — native scroll is preferred on touch.
 */
export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Disable Lenis on mobile/tablet
    const isMobile = window.innerWidth < 768
    if (isMobile) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker to drive Lenis RAF loop
    // This is imported from gsap.config.ts which already has lagSmoothing(0)
    const { gsap } = require('@/lib/gsap/gsap.config')
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000)
    })

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}
```

---

## STEP 13 — Create `components/providers/MotionProvider.tsx`

```typescript
'use client'

import { MotionConfig } from 'framer-motion'

interface MotionProviderProps {
  children: React.ReactNode
}

/**
 * Wraps the app in Framer Motion's MotionConfig.
 * reducedMotion="user" automatically reads the OS preference.
 * This is the baseline — individual components further gate with useMotionConfig.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
```

---

## STEP 14 — Create `lib/content.ts`

```typescript
/**
 * lib/content.ts — Single source of truth for all portfolio content.
 *
 * All content is typed and exported from here.
 * Components import from this file ONLY — never from ProfileContent.md directly.
 *
 * Update ProfileContent.md → update the values in this file to match.
 * Types must always stay in sync with actual data.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Profile {
  name: string
  firstName: string
  roles: string[]           // Role tag cycling list (Hero section)
  tagline: string           // One-liner under roles
  bio: string[]             // About section paragraphs (array of paragraph strings)
  location: string
  availability: boolean
  avatarSrc: string         // Path to /public/images/avatar.webp
  cvSrc: string             // Path to /public/cv-arghya.pdf
}

export interface Stat {
  label: string
  value: number
  suffix: string            // e.g. '+', 'K+', '%'
}

export interface SkillCategory {
  id: string
  label: string             // 'Frontend', 'Backend & Cloud', etc.
  skills: Skill[]
}

export interface Skill {
  name: string
  iconSrc?: string          // Optional SVG path in /public/icons/
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface Project {
  id: string
  title: string
  shortDescription: string  // Max 120 chars — card display
  fullDescription: string   // Full overlay description
  techStack: string[]
  imageSrc: string          // /public/images/projects/
  videoSrc?: string         // Optional .mp4 for hover preview
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  impact?: string           // Optional metric/impact statement
}

export interface TimelineEntry {
  id: string
  type: 'education' | 'project' | 'work' | 'certification'
  role: string
  organization: string
  dateRange: string
  location?: string
  bullets: string[]
}

export interface SocialLinks {
  github: string
  linkedin: string
  twitter?: string
  email: string
}

// ─── Content ─────────────────────────────────────────────────────────────────
// REPLACE ALL VALUES BELOW with actual content from ProfileContent.md

export const profile: Profile = {
  name:         'Arghya',
  firstName:    'Arghya',
  roles:        [
    'Full Stack Engineer',
    'Cloud Engineer',
    'DevOps Enthusiast',
    'Backend Architect',
  ],
  tagline:      '', // Fill from ProfileContent.md
  bio:          [], // Fill from ProfileContent.md — array of paragraph strings
  location:     'Kolkata, India',
  availability: true,
  avatarSrc:    '/images/avatar.webp',
  cvSrc:        '/cv-arghya.pdf',
}

export const stats: Stat[] = [
  { label: 'Projects Shipped', value: 3,  suffix: '+' },
  { label: 'Technologies',     value: 15, suffix: '+' },
  { label: 'Years Learning',   value: 2,  suffix: '+' },
  // Fill from ProfileContent.md
]

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      // Fill from ProfileContent.md
    ],
  },
  {
    id: 'backend',
    label: 'Backend & Cloud',
    skills: [
      { name: 'Node.js' },
      { name: 'NestJS' },
      { name: 'PostgreSQL' },
      { name: 'Firebase' },
      // Fill from ProfileContent.md
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Tools',
    skills: [
      { name: 'GCP Cloud Run' },
      { name: 'Docker' },
      { name: 'Python' },
      // Fill from ProfileContent.md
    ],
  },
]

export const projects: Project[] = [
  {
    id: 'equilens',
    title: 'EquiLens',
    shortDescription: 'AI bias detection and mitigation platform for HR hiring datasets.',
    fullDescription:  '', // Fill from ProfileContent.md
    techStack:  ['NestJS', 'Python', 'Firebase', 'GCP Cloud Run', 'ML'],
    imageSrc:   '/images/projects/equilens.webp',
    githubUrl:  '', // Fill from ProfileContent.md
    liveUrl:    '', // Fill from ProfileContent.md
    featured:   true,
    impact:     '', // Fill from ProfileContent.md (audit metrics)
  },
  // Add remaining projects from ProfileContent.md
]

export const experience: TimelineEntry[] = [
  {
    id: 'tmsl',
    type: 'education',
    role: 'BCA-H Student',
    organization: 'Techno Main Salt Lake (TMSL)',
    dateRange: '2024 — Present',
    location: 'Kolkata, India',
    bullets: [
      '', // Fill from ProfileContent.md
    ],
  },
  {
    id: 'equilens-build',
    type: 'project',
    role: 'Founder & Lead Engineer',
    organization: 'EquiLens',
    dateRange: '2025 — Present',
    bullets: [
      '', // Fill from ProfileContent.md
    ],
  },
  // Add remaining entries from ProfileContent.md
]

export const social: SocialLinks = {
  github:   '', // Fill from ProfileContent.md
  linkedin: '', // Fill from ProfileContent.md
  twitter:  '', // Fill from ProfileContent.md (optional)
  email:    '', // Fill from ProfileContent.md — DO NOT use raw email in components
}
```

---

## STEP 15 — Create `app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { AnimationProvider } from '@/components/providers/AnimationProvider'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { MotionProvider } from '@/components/providers/MotionProvider'

import '@/app/globals.css'

// ─── Fonts (self-hosted via next/font — zero external request at runtime) ───
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

// ─── Metadata ───────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'Arghya — Full Stack & Cloud Engineer',
    template: '%s | Arghya',
  },
  description:
    'Full Stack Engineer and Cloud Engineering enthusiast building scalable systems and AI-powered products. Based in Kolkata.',
  keywords: [
    'cloud engineering', 'devops', 'next.js', 'nestjs', 'react',
    'typescript', 'portfolio', 'full stack', 'gcp', 'firebase',
  ],
  authors: [{ name: 'Arghya' }],
  creator: 'Arghya',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Arghya — Portfolio',
    title: 'Arghya — Full Stack & Cloud Engineer',
    description: 'Full Stack Engineer and Cloud Engineering enthusiast building scalable systems.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Arghya Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arghya — Full Stack & Cloud Engineer',
    description: 'Full Stack Engineer and Cloud Engineering enthusiast.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
}

// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-surface-base text-text-primary font-sans antialiased overflow-x-hidden">
        <AnimationProvider>
          <LenisProvider>
            <MotionProvider>
              {children}
            </MotionProvider>
          </LenisProvider>
        </AnimationProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

---

## STEP 16 — Create `app/page.tsx`

This is a placeholder. It just proves the providers render without crashing.
Do NOT add section components yet.

```typescript
export default function HomePage() {
  return (
    <main className="min-h-screen bg-surface-base">
      {/* Sections will be added in Phase 1+ */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="glass p-8 text-center">
          <p className="eyebrow mb-4">Phase 0 Complete</p>
          <h1 className="font-display text-section-title text-grad-warm">
            Foundation Ready
          </h1>
          <p className="text-text-secondary mt-4 text-sm">
            Design system active · Providers wired · Ready for Phase 1
          </p>
        </div>
      </div>
    </main>
  )
}
```

---

## STEP 17 — Create `.env.example` and `.env.local`

Create `.env.example` (commit this):
```
RESEND_API_KEY=
CONTACT_RECIPIENT_EMAIL=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Create `.env.local` (NEVER commit — already in .gitignore):
```
RESEND_API_KEY=your_resend_key_here
CONTACT_RECIPIENT_EMAIL=your_email_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Verify `.gitignore` contains `.env.local`. If not, add it.

---

## STEP 18 — Configure `next-sitemap`

Create `next-sitemap.config.js` in project root:

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://arghya.dev',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}
```

Add to `package.json` scripts:
```json
"postbuild": "next-sitemap"
```

---

## STEP 19 — Verification Checklist

Run each check. Do not mark Phase 0 complete until ALL pass:

```bash
# 1. Dev server starts without errors
pnpm dev

# 2. TypeScript compiles clean (zero errors, zero warnings)
pnpm tsc --noEmit

# 3. ESLint passes
pnpm lint

# 4. Production build succeeds
pnpm build
```

Open `http://localhost:3000` — you should see:
- ✅ Dark background (`#0d1f26`) fills the screen
- ✅ A centered glass card with "Foundation Ready" in warm gradient text
- ✅ The eyebrow label "PHASE 0 COMPLETE" in teal
- ✅ No console errors
- ✅ No layout shift
- ✅ Fonts load correctly (Space Grotesk on the heading)

**Browser DevTools checks:**
- ✅ Network tab: fonts are served from `/_next/static/` (not fonts.googleapis.com)
- ✅ No 404 errors in Network tab
- ✅ No React hydration warnings in Console tab
- ✅ CSS variables defined: inspect `:root` in Elements/Styles panel

**If any check fails:** fix the error before proceeding. Do not continue to Phase 1 with a broken foundation.

---

## Phase 0 Complete → Proceed to Phase 1

Once all verifications pass, report:
1. All packages installed and their versions
2. Full directory tree (output of `find . -type f -not -path '*/node_modules/*' -not -path '*/.next/*'`)
3. Any TypeScript errors encountered and how they were resolved
4. Confirmation that `pnpm build` succeeded

Then await Phase 1 instructions.

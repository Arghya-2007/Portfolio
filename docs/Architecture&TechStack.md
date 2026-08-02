# Architecture & TechStack.md — Technical Architecture Document
## Arghya's Developer Portfolio Website

**Version:** 1.0  
**Status:** Pre-Development  
**Last Updated:** 2026-08-01

---

## 1. Tech Stack

### 1.1 Core Framework

| Layer | Technology | Version | Reason |
|---|---|---|---|
| Framework | Next.js | 14.x (App Router) | SSG for portfolio pages, Image optimization, SEO metadata API |
| Language | TypeScript | 5.x | Type safety across components and hooks |
| Styling | Tailwind CSS | 3.x | Utility-first, rapid custom design system implementation |
| Package Manager | pnpm | Latest | Faster installs, disk-efficient |

### 1.2 Animation Stack

| Library | Role | When Used |
|---|---|---|
| GSAP (+ ScrollTrigger, SplitText, DrawSVG) | Scroll-driven animations, timeline sequences, text animations | Hero, Projects horizontal scroll, Timeline draw, section reveals |
| Framer Motion | Component-level animations, layout animations, gesture | Card hovers, whileInView reveals, form fields, page transitions |
| Lenis | Smooth scroll wrapper | Global — wraps entire page scroll |
| detect-gpu | GPU tier detection | On app mount — drives animation config context |

> GSAP handles anything scroll-driven. Framer Motion handles anything component-state-driven. They do not overlap.

### 1.3 UI Libraries

| Library | Role |
|---|---|
| Shadcn UI | Base component primitives (Form, Dialog, Toast) — restyled to glass system |
| React Bits | Animated text components, creative UI primitives |
| Lucide React | Icon set (SVG inline, tree-shakeable) |

### 1.4 State Management

| Library | Role |
|---|---|
| Zustand | Global animation config state (GPU tier, reducedMotion, activeSection) |

> Zustand store is minimal. Only global cross-component state lives here. No server state — this is a static portfolio.

### 1.5 Forms and Communication

| Service | Role |
|---|---|
| Resend | Contact form email delivery (API key stored in Vercel env vars) |
| React Hook Form | Form state, validation |
| Zod | Schema validation for form data |
| Next.js Route Handler | `/api/contact` — server-side form submission handler |

### 1.6 Fonts

```
Google Fonts (self-hosted via next/font/google):
  - Space Grotesk: weights 400, 600, 700
  - Inter: weights 400, 500, 600
  - JetBrains Mono: weights 400, 500
```

Use `next/font/google` — fonts are self-hosted at build time, zero external font request at runtime.

### 1.7 Analytics and Monitoring

| Tool | Purpose |
|---|---|
| Vercel Analytics | Page views, performance, real user metrics (privacy-first) |
| Vercel Speed Insights | Core Web Vitals tracking |

---

## 2. Project File Structure

```
portfolio/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout: fonts, Lenis, providers, metadata
│   ├── page.tsx                  # Home page (single page — all sections)
│   ├── not-found.tsx             # Custom 404
│   └── api/
│       └── contact/
│           └── route.ts          # POST handler for contact form (Resend)
│
├── components/
│   ├── sections/                 # One component per page section
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   │
│   ├── ui/                       # Reusable design system components
│   │   ├── GlassCard.tsx         # Base glass panel component
│   │   ├── GlassButton.tsx       # Primary / secondary / ghost button
│   │   ├── SectionHeader.tsx     # Eyebrow + Title + Subtitle pattern
│   │   ├── TechChip.tsx          # Tech stack badge/chip
│   │   ├── ProjectCard.tsx       # Project showcase card
│   │   ├── TimelineItem.tsx      # Single timeline entry
│   │   ├── SkillBar.tsx          # Animated skill progress bar
│   │   ├── GlowOrb.tsx           # Background glow effect div
│   │   └── AvailabilityBadge.tsx # "Open to work" pulsing pill
│   │
│   ├── layout/
│   │   ├── Navbar.tsx            # Fixed glass navbar
│   │   ├── Footer.tsx            # Minimal footer
│   │   └── CustomCursor.tsx      # Desktop glow cursor (client-only)
│   │
│   └── providers/
│       ├── LenisProvider.tsx     # Lenis smooth scroll setup
│       ├── MotionProvider.tsx    # Framer MotionConfig + reducedMotion
│       └── AnimationProvider.tsx # GPU tier detection → Zustand store
│
├── hooks/
│   ├── useGPUTier.ts             # detect-gpu → returns 'high' | 'mid' | 'low'
│   ├── useMotionConfig.ts        # Reads Zustand → returns animation config object
│   ├── useActiveSection.ts       # Tracks scroll position → active nav link
│   ├── useLenis.ts               # Access Lenis instance from context
│   └── useImageSequence.ts      # Image frame scroll logic
│
├── lib/
│   ├── gsap/
│   │   ├── gsap.config.ts        # GSAP plugin registration (ScrollTrigger, SplitText, DrawSVG)
│   │   ├── animations.ts         # Reusable GSAP animation presets
│   │   └── scrollTrigger.ts      # Shared ScrollTrigger helper functions
│   │
│   ├── content.ts                # Re-exports from ProfileContent.md as typed TS objects
│   ├── validations.ts            # Zod schemas (contact form)
│   └── utils.ts                  # General utility functions
│
├── store/
│   └── useAnimationStore.ts      # Zustand store: gpuTier, reducedMotion, activeSection
│
├── styles/
│   ├── globals.css               # Tailwind base, CSS variables, glass utilities, scrollbar
│   └── animations.css            # CSS keyframes (marquee, pulse, cursor)
│
├── public/
│   ├── images/
│   │   ├── frames/
│   │   │   ├── hero/             # hero-01.webp … hero-10.webp
│   │   │   └── about/            # about-01.webp … about-08.webp
│   │   ├── projects/             # project screenshots, WebP
│   │   └── avatar.webp
│   ├── cv-arghya.pdf             # Downloadable resume
│   ├── og-image.png              # 1200×630 OG image
│   └── favicon/                  # favicon.ico, apple-touch-icon, etc.
│
├── content/
│   └── ProfileContent.md         # Source of truth for all personal content
│
├── .env.local                    # Local env vars (never committed)
├── .env.example                  # Env var template (committed, no secrets)
├── next.config.ts                # Next.js config
├── tailwind.config.ts            # Tailwind: colors, fonts, spacing, plugins
├── tsconfig.json
└── pnpm-lock.yaml
```

---

## 3. Rendering Strategy

| Content | Strategy | Reason |
|---|---|---|
| All portfolio sections | SSG (Static Site Generation) | No dynamic data, blazing fast, perfect Lighthouse |
| Contact form | Client component + Route Handler | Form needs JS, email needs server |
| Image frame sequences | Client component | DOM-driven, scroll event |
| Animations | Client components | All GSAP/Framer are browser-only |

The entire `app/page.tsx` is a Server Component that composes section components. Each section is a Client Component (uses animations). The content (text, projects) is imported from `lib/content.ts` which reads from `ProfileContent.md` — no database, no API.

---

## 4. Animation Architecture

### 4.1 GPU Tier Detection Flow

```
App Mount (AnimationProvider)
  └── detect-gpu runs (async, one-time)
       ├── HIGH  → full animation suite
       ├── MID   → no image sequence, no cursor, keep GSAP
       └── LOW   → no animations, static fallback
            │
            ▼
       Zustand store updated (gpuTier, reducedMotion)
            │
            ▼
       useMotionConfig hook consumed by all animated components
```

### 4.2 GSAP Initialization

GSAP plugins must be registered once. Do this in `lib/gsap/gsap.config.ts`:

```
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVG)
```

Import this file in `app/layout.tsx` inside a `'use client'` boundary. Never import GSAP in server components.

### 4.3 GSAP + Lenis Integration

Lenis must update GSAP ScrollTrigger on every scroll tick. Implement in `LenisProvider.tsx`:

```
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

### 4.4 Image Frame Scroll Architecture

```
useImageSequence(images: string[], scrollProgress: number): string
  - Takes array of preloaded image URLs
  - Returns current frame URL based on scroll progress (0–1)
  - Frame index = Math.floor(scrollProgress * (images.length - 1))

Preloading strategy:
  - First 2 frames: eager (in HTML)
  - Remaining frames: preload via new Image() on component mount
  - Frames stored in useRef (no re-render on progress change)
```

### 4.5 Horizontal Scroll (Projects)

```
GSAP ScrollTrigger horizontal scroll pattern:
  - Pin: the Projects section container
  - Animate: x transform on the cards container
  - Distance: total width of all cards + gaps - viewport width
  - Scrub: true (tied to scroll position, not duration)
  - Start: "top top"
  - End: "+={totalScrollDistance}"
```

---

## 5. Zustand Store Structure

```typescript
interface AnimationStore {
  // GPU / Motion
  gpuTier: 'high' | 'mid' | 'low' | 'unknown'
  prefersReducedMotion: boolean
  animationsEnabled: boolean       // derived: gpuTier !== 'low' && !prefersReducedMotion

  // Navigation
  activeSection: SectionId         // 'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'contact'

  // Actions
  setGpuTier: (tier: GPUTier) => void
  setActiveSection: (section: SectionId) => void
}
```

---

## 6. Contact Form Architecture

```
User fills form (React Hook Form + Zod validation)
  └── POST /api/contact
       ├── Server validates body with Zod
       ├── Calls Resend SDK: send email to arghya@[domain]
       ├── Returns { success: true } or { error: '...' }
       └── Client shows Toast (Shadcn) on success/error
```

Environment variables required:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_RECIPIENT_EMAIL=arghya@[domain]
```

---

## 7. SEO and Metadata

Defined in `app/layout.tsx` via Next.js Metadata API:

```
title: "Arghya — Full Stack & Cloud Engineer"
description: "[From ProfileContent.md — one-liner bio]"
keywords: cloud engineering, devops, next.js, nestjs, react, portfolio
canonical: https://arghya.[tld]
og:image: /og-image.png (1200×630)
og:type: website
twitter:card: summary_large_image
robots: index, follow
```

Sitemap: generated via `next-sitemap` package at build time.

---

## 8. Performance Targets and Strategy

### 8.1 Core Web Vitals Targets

| Metric | Target |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID / INP (Interaction to Next Paint) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| FCP (First Contentful Paint) | < 1.2s |

### 8.2 Bundle Strategy

- GSAP: loaded as a regular import (it's already tree-shakeable per plugin)
- Framer Motion: `LazyMotion` with `domAnimation` feature bundle (reduces size)
- Sections: dynamic import with `next/dynamic` for sections below the fold
- CustomCursor: `dynamic(() => import(...), { ssr: false })` — client-only, no SSR

### 8.3 Image Strategy

- Use `next/image` for ALL images (automatic WebP conversion, lazy load, size optimization)
- Frame images: preloaded manually in useImageSequence hook
- Hero frame 1: `priority={true}` on the first frame `<Image>` for LCP
- Avatar: `priority={true}`, served at exactly the display size (no oversized src)

---

## 9. Environment Variables

```bash
# .env.example
RESEND_API_KEY=           # Resend email API key
CONTACT_RECIPIENT_EMAIL=  # Your email address for contact form delivery
NEXT_PUBLIC_SITE_URL=     # Full URL of deployed site (https://arghya.[tld])
```

`NEXT_PUBLIC_` prefix = exposed to client bundle. All others = server-only.

---

## 10. Development Setup

```bash
# Prerequisites
node >= 20.x
pnpm >= 9.x

# Install
pnpm install

# Dev server
pnpm dev

# Build
pnpm build

# Type check
pnpm type-check

# Lint
pnpm lint
```

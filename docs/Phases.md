# Phases.md — Development Phases & Milestones
## Arghya's Developer Portfolio Website

**Version:** 1.0  
**Status:** Pre-Development  
**Last Updated:** 2026-08-01

---

## Overview

| Phase | Name | Goal | Est. Duration |
|---|---|---|---|
| 0 | Foundation | Project setup, design system, providers | 1–2 days |
| 1 | Core Layout | Navbar, Footer, global elements | 0.5–1 day |
| 2 | Hero | Full hero section with image frame scroll | 2–3 days |
| 3 | About | About section with image scroll + glass card | 1–2 days |
| 4 | Skills | Marquee + category cards | 1–2 days |
| 5 | Projects | Horizontal scroll + project cards | 2–3 days |
| 6 | Experience | Animated timeline | 1–2 days |
| 7 | Contact | Form + social links + API route | 1–2 days |
| 8 | Polish | Cursor, micro-animations, performance | 2–3 days |
| 9 | Launch | SEO, analytics, deploy, smoke test | 1 day |

> Durations are estimates for focused work sessions. Adjust for your schedule.

---

## Phase 0 — Foundation

**Goal:** Project is configured, dependencies installed, design system tokens live, providers wired. No content yet.

### Tasks

- [ ] **0.1** Initialize Next.js project with App Router and TypeScript
  ```bash
  pnpm create next-app@latest portfolio --typescript --tailwind --app --import-alias "@/*"
  ```

- [ ] **0.2** Install all dependencies
  ```bash
  pnpm add gsap @gsap/react framer-motion lenis @studio-freight/lenis detect-gpu zustand
  pnpm add react-hook-form zod resend
  pnpm add lucide-react clsx tailwind-merge
  pnpm add -D @types/node
  # Shadcn UI
  pnpm dlx shadcn-ui@latest init
  ```

- [ ] **0.3** Configure `tailwind.config.ts`
  - Add all color tokens from `Design.md` Section 2
  - Add font family: `Space Grotesk`, `Inter`, `JetBrains Mono`
  - Add custom spacing, border-radius tokens
  - Add `tailwind-merge` + `clsx` utility setup (`cn()` function in `lib/utils.ts`)

- [ ] **0.4** Set up `styles/globals.css`
  - Define all CSS custom properties (`--color-*`, `--surface-*`, `--text-*`, `--grad-*`)
  - Write `.glass`, `.glass-elevated`, `.glass-subtle` utility classes
  - Write scrollbar styling (thin, dark, teal thumb)
  - Write CSS keyframes for marquee animation in `styles/animations.css`

- [ ] **0.5** Configure fonts in `app/layout.tsx`
  - Import Space Grotesk, Inter, JetBrains Mono via `next/font/google`
  - Apply as CSS variables: `--font-sans`, `--font-display`, `--font-mono`

- [ ] **0.6** Set up GSAP in `lib/gsap/gsap.config.ts`
  - Register: `ScrollTrigger`, `SplitText`, `DrawSVG`
  - Export configured `gsap` instance

- [ ] **0.7** Create Zustand store `store/useAnimationStore.ts`
  - Fields: `gpuTier`, `prefersReducedMotion`, `animationsEnabled`, `activeSection`
  - Actions: `setGpuTier`, `setActiveSection`

- [ ] **0.8** Create `providers/AnimationProvider.tsx`
  - Run `detect-gpu` on mount
  - Check `window.matchMedia('(prefers-reduced-motion: reduce)')`
  - Write results to Zustand store

- [ ] **0.9** Create `providers/LenisProvider.tsx`
  - Initialize Lenis
  - Sync with GSAP ticker and ScrollTrigger
  - Disable on mobile (`< 768px`)

- [ ] **0.10** Create `providers/MotionProvider.tsx`
  - Wrap children in Framer `<MotionConfig>`
  - Pass `reducedMotion="user"` (reads system preference automatically)

- [ ] **0.11** Create `hooks/useMotionConfig.ts`
  - Reads Zustand store
  - Returns: `{ animationsEnabled, gpuTier, reducedMotion }`

- [ ] **0.12** Create `lib/content.ts`
  - Parse `content/ProfileContent.md` into typed TypeScript objects
  - Export: `profile`, `projects`, `skills`, `experience`, `social`
  - Define TypeScript types for each

- [ ] **0.13** Set up `.env.example` and `.env.local`
  - Add `RESEND_API_KEY`, `CONTACT_RECIPIENT_EMAIL`, `NEXT_PUBLIC_SITE_URL`

- [ ] **0.14** Configure `next.config.ts`
  - Image domains whitelist (if using external image sources)
  - Compiler options (SVG support if needed)

**Phase 0 Complete When:** `pnpm dev` runs without errors. Tailwind tokens resolve. No content yet — blank dark page is fine.

---

## Phase 1 — Core Layout

**Goal:** Navbar and Footer exist and are functional. Global elements (cursor placeholder, scroll behavior) are in place.

### Tasks

- [ ] **1.1** Create `app/layout.tsx`
  - Add all providers: AnimationProvider, LenisProvider, MotionProvider
  - Add font variables
  - Add base metadata (title, description, OG)
  - Add `<Navbar>` and `<Footer>` as children wrappers

- [ ] **1.2** Build `components/layout/Navbar.tsx`
  - Glass panel (`.glass-subtle`)
  - Logo (left) + Nav links (right) + "Hire Me" CTA
  - Active section indicator (reads Zustand `activeSection`)
  - Animated sliding underline via GSAP
  - Mobile hamburger + full-screen overlay menu (Framer Motion)

- [ ] **1.3** Build `components/layout/Footer.tsx`
  - Minimal: copyright, one-liner, social icons
  - Same glass aesthetic

- [ ] **1.4** Build `hooks/useActiveSection.ts`
  - IntersectionObserver watching all section `id` elements
  - Writes to Zustand `activeSection` on change

- [ ] **1.5** Create `components/layout/CustomCursor.tsx`
  - Basic structure only (outer ring + inner dot)
  - `dynamic` import with `{ ssr: false }`
  - Connect lerp logic — GPU tier gated

- [ ] **1.6** Build `components/ui/SectionHeader.tsx`
  - Eyebrow label (teal, uppercase, spaced)
  - Section title (GSAP SplitText reveal)
  - Optional subtitle
  - Reusable across all sections

**Phase 1 Complete When:** Navbar renders, links scroll to correct sections, active state updates, mobile menu works.

---

## Phase 2 — Hero Section

**Goal:** Hero section is visually complete with image frame scroll, name animation, role cycling, CTAs, and availability badge.

### Tasks

- [ ] **2.1** Build `hooks/useImageSequence.ts`
  - Preload images on mount
  - Accept `scrollProgress` (0–1), return current frame URL
  - No re-render on scroll (uses refs, drives DOM directly)

- [ ] **2.2** Prepare Hero frame images
  - Collect 8–10 high-quality dark/atmospheric WebP images
  - Convert to WebP, compress to < 200KB each
  - Place in `public/images/frames/hero/`

- [ ] **2.3** Build `components/sections/Hero.tsx`
  - Three-layer: image frame BG (z-0), gradient vignette (z-1), content (z-2)
  - GSAP pin + ScrollTrigger driving image sequence via `onUpdate`
  - SplitText character reveal for name (plays once on mount)
  - Role tag cycling component (sub-component or inline)
  - Two CTA buttons (primary + secondary variants)
  - Availability badge (`.glass-subtle` pill + pulsing dot)
  - GPU tier gate: skip image sequence on MID/LOW, skip SplitText on LOW

- [ ] **2.4** Build `components/ui/GlassButton.tsx`
  - Variants: `primary` (warm gradient), `secondary` (glass border), `ghost` (icon circle)
  - Hover: scale + shadow (Framer `whileHover`)
  - Active: slight scale down

- [ ] **2.5** Build `components/ui/AvailabilityBadge.tsx`
  - Glass pill with pulsing green dot
  - Text: "Available for Work" — from `ProfileContent.md`
  - Animated pulse via CSS keyframes

**Phase 2 Complete When:** Hero renders on all viewports. Image sequence works on desktop. Fallback static BG works on mobile/low GPU. Name animation plays on load. CTAs are functional.

---

## Phase 3 — About Section

**Goal:** About section displays bio, stats, and skills with image frame scroll on desktop.

### Tasks

- [ ] **3.1** Prepare About frame images
  - 6–8 images (workspace, project screenshots, personal) as WebP
  - Place in `public/images/frames/about/`

- [ ] **3.2** Build `components/sections/About.tsx`
  - Desktop: horizontal split (55% image, 45% content)
  - Left: image frame sequence (separate GSAP ScrollTrigger, separate `useImageSequence` instance)
  - Right: glass card with bio, stats, skills
  - Mobile: single column (image on top if visible, content below)

- [ ] **3.3** Build stat counter sub-component
  - Count from 0 to target value when scrolled into view
  - GSAP `fromTo` with `power2.out` easing, 1.2s duration
  - Values from `ProfileContent.md`

- [ ] **3.4** Build `components/ui/TechChip.tsx`
  - Tech icon (SVG or Lucide) + tech name
  - `.glass-subtle` background
  - Hover state (teal border brightens)
  - Used in About skills cloud + marquee

**Phase 3 Complete When:** About section renders correctly on all viewports. Stats counter animates on scroll. Skills chips display full stack from `ProfileContent.md`.

---

## Phase 4 — Skills Section

**Goal:** Skills marquee rows and category cards are rendered and animated.

### Tasks

- [ ] **4.1** Build `components/sections/Skills.tsx`
  - Section header via `SectionHeader` component
  - 2–3 marquee rows (alternating direction)
  - Each row: array of `TechChip` components, CSS animation
  - Optional: category cards below/above marquee

- [ ] **4.2** Marquee CSS animation
  - Defined in `styles/animations.css`
  - Two keyframes: `marquee-left` and `marquee-right`
  - `animation-play-state: paused` on `prefers-reduced-motion`

- [ ] **4.3** Build `components/ui/SkillCategoryCard.tsx` (if F-005 included)
  - Glass card with category title + skill list
  - Hover lift (Framer `whileHover`)
  - Teal glow orb behind card on hover

- [ ] **4.4** Build `components/ui/GlowOrb.tsx`
  - Absolute positioned colored div
  - Props: `color` (teal/coral/gold), `size` (px), `opacity`
  - Used throughout site for ambient glow behind elements

**Phase 4 Complete When:** All marquee rows scroll smoothly. Marquee pauses on reduced-motion. All skills from `ProfileContent.md` are displayed.

---

## Phase 5 — Projects Section

**Goal:** Horizontal scroll panel with all project cards, hover overlays, and EquiLens as featured card.

### Tasks

- [ ] **5.1** Build `components/sections/Projects.tsx`
  - GSAP horizontal scroll: pin section, animate cards container on `x`
  - Calculate total scroll distance dynamically from card count
  - Mobile fallback: vertical stack, no pin, no horizontal scroll

- [ ] **5.2** Build `components/ui/ProjectCard.tsx`
  - Screenshot zone with hover video preview
  - Project name, description, tech tags, links
  - Full hover overlay (Framer `AnimatePresence`)
  - Featured variant (warm gradient border accent)

- [ ] **5.3** Build EquiLens card content
  - Data from `ProfileContent.md`
  - Featured badge
  - Impact metric displayed (bias violations, audit results)
  - Cloud Run live link + GitHub link

- [ ] **5.4** Prepare project screenshots
  - WebP screenshots for each project (800×600)
  - Optimize to < 150KB each
  - Place in `public/images/projects/`

**Phase 5 Complete When:** Horizontal scroll works on desktop with smooth Lenis integration. Mobile shows vertical cards. EquiLens is first and featured. All GitHub/live links work.

---

## Phase 6 — Experience Section

**Goal:** Timeline renders and animates correctly with DrawSVG connector line.

### Tasks

- [ ] **6.1** Build `components/sections/Experience.tsx`
  - Center vertical SVG connector line
  - GSAP DrawSVG: line draws from top to bottom on scroll
  - Maps `experience` data from `lib/content.ts`

- [ ] **6.2** Build `components/ui/TimelineItem.tsx`
  - Alternating left/right layout (desktop), right-only (mobile)
  - Pulsing teal dot at line junction
  - Glass card: role, org, date chip, bullets, type badge
  - Framer `whileInView` reveal with `x` offset (alternate direction)

**Phase 6 Complete When:** Line draws progressively on scroll. Cards animate in correctly. All experience data from `ProfileContent.md` is shown.

---

## Phase 7 — Contact Section

**Goal:** Contact form is functional, emails are delivered, social links are correct.

### Tasks

- [ ] **7.1** Build `app/api/contact/route.ts`
  - POST handler: validate body with Zod, call Resend, return JSON response
  - Never expose recipient email in response

- [ ] **7.2** Build `components/sections/Contact.tsx`
  - Big animated section headline
  - Glass form card with React Hook Form
  - Field reveal stagger via Framer `whileInView`
  - Submit button with loading state
  - Toast on success/error (Shadcn Toast)
  - Social links row with icon buttons

- [ ] **7.3** Test contact form end-to-end
  - Submit real form in local dev
  - Verify email arrives with correct data
  - Test validation: empty fields, invalid email
  - Test error state: invalid API key response

**Phase 7 Complete When:** Form submits, email arrives, validation errors show inline, toast shows on submit result.

---

## Phase 8 — Polish

**Goal:** All micro-interactions, cursor, final animation tuning, performance verification.

### Tasks

- [ ] **8.1** Complete `CustomCursor.tsx`
  - Section-aware color changes
  - Scale on hover over interactive elements (`onMouseEnter`/`onMouseLeave`)
  - Verify GPU tier gate is working

- [ ] **8.2** Final animation pass
  - Review all GSAP animations for smoothness at various scroll speeds
  - Review all Framer Motion transitions for feel (spring constants, duration)
  - Ensure all `viewport={{ once: true }}` are set correctly

- [ ] **8.3** Run Lighthouse audit
  - Target: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95, Best Practices 100
  - Fix any failing items
  - Check Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 100ms

- [ ] **8.4** Mobile review pass
  - Test on actual device: iPhone SE (375px), iPhone 14 Pro (393px), Galaxy S21 (360px)
  - Verify all touch interactions work correctly
  - Verify no horizontal overflow on any section

- [ ] **8.5** Accessibility audit
  - Tab through entire site with keyboard
  - Test with screen reader (VoiceOver on macOS or NVDA on Windows)
  - Check all images have correct `alt` text
  - Verify focus indicators are visible

- [ ] **8.6** Cross-browser test
  - Chrome (primary), Firefox, Safari, Edge
  - Verify `backdrop-filter` works (WebKit prefix)
  - Verify font rendering

- [ ] **8.7** Reduce motion test
  - Enable `prefers-reduced-motion: reduce` in OS settings
  - Verify site loads with zero motion, still looks polished

**Phase 8 Complete When:** Lighthouse ≥ 90 on all metrics. Zero accessibility violations on critical paths. Looks and works correctly on Chrome, Firefox, Safari.

---

## Phase 9 — Launch

**Goal:** Site is deployed, monitored, and publicly accessible.

### Tasks

- [ ] **9.1** Final content review
  - Verify all content from `ProfileContent.md` is correctly displayed
  - Proofread all text for typos
  - Verify all external links work (GitHub, LinkedIn, live project URLs)
  - Verify CV PDF downloads correctly and is the latest version

- [ ] **9.2** Set up Vercel project
  - Connect GitHub repo to Vercel
  - Configure environment variables in Vercel dashboard
  - Set custom domain

- [ ] **9.3** Configure `next-sitemap`
  - Generate `sitemap.xml` and `robots.txt` at build
  - Verify sitemap is accessible at `/sitemap.xml`

- [ ] **9.4** Add OG image
  - Create `public/og-image.png` (1200×630)
  - Verify OG tags work using [opengraph.xyz](https://www.opengraph.xyz)

- [ ] **9.5** Deploy to production
  - `git push main` → Vercel auto-deploys
  - Verify production URL loads correctly
  - Verify contact form works in production (real Resend API key)

- [ ] **9.6** Submit to Google Search Console
  - Verify domain ownership
  - Submit sitemap

- [ ] **9.7** Post-launch smoke test
  - Load site on production URL
  - Test contact form (send a real message)
  - Check Vercel Analytics is receiving data
  - Check Vercel Speed Insights is recording Core Web Vitals

**Phase 9 Complete When:** Site is live at custom domain. Contact form works in production. Analytics collecting data. Sitemap submitted.

---

## Milestone Summary

| Milestone | Phase Complete | Deliverable |
|---|---|---|
| 🏗️ Setup complete | Phase 0 | Project runs locally, design system tokens live |
| 🧭 Navigation live | Phase 1 | Navbar functional, smooth scroll works |
| 🎬 Hero shipped | Phase 2 | Most impactful section complete |
| 📖 About shipped | Phase 3 | Bio, stats, skills visible |
| ⚡ Skills shipped | Phase 4 | Marquee running, stack displayed |
| 🚀 Projects shipped | Phase 5 | EquiLens showcased, all projects visible |
| 📅 Timeline shipped | Phase 6 | Experience fully animated |
| 📬 Contact live | Phase 7 | Can receive messages |
| ✨ Polished | Phase 8 | Production-quality feel, passes Lighthouse |
| 🌐 Launched | Phase 9 | Live at custom domain |

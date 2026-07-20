# Phases.md — Build Phases

Build order is deliberately **structure → content → animation → 3D → polish**, so there's always a working, deployable site at every phase instead of getting stuck early inside shader/animation code.

## Phase 0 — Setup
- [ ] Vite + React + TypeScript scaffold
- [ ] Tailwind configured with the full token set from `Design.md`
- [ ] ESLint/Prettier configured per `Rules.md`
- [ ] Folder structure created per `Architechture.md`
- [ ] Deployed once to Vercel/Netlify (even blank) to confirm the pipeline works end to end

## Phase 1 — Static Layout
- [ ] All six sections built as static components with real copy (no animation, no 3D)
- [ ] Glass and neomorphic base components built and reused (`components/glass`, `components/neo`)
- [ ] Fully responsive at desktop/tablet/mobile breakpoints
- [ ] Content wired from `content/projects.ts`, `content/roadmap.ts`, `content/stack.ts` (typed, not hardcoded inline)

## Phase 2 — Motion Layer (GSAP, no 3D yet)
- [ ] Section reveal animations (fade/slide-in on scroll) for About, Tech Stack, Projects, Contact
- [ ] Roadmap horizontal scroll-jack timeline built and working smoothly
- [ ] Magnetic buttons + hover micro-interactions
- [ ] Animated SVG traces (circuit lines) connecting sections
- [ ] `useReducedMotion` hook wired in and respected everywhere motion is added

## Phase 3 — 3D Layer (R3F)
- [ ] Hero `<Canvas>` + `HeroCore` built per `Design.md` §5, with `<Float>` idle motion
- [ ] Scroll-linked behavior: core reacts to scroll progress (rotate/scale/fade as user scrolls past hero)
- [ ] Background particle/gradient layer added, togglable by device-capability flag
- [ ] Mobile/low-end fallback implemented and tested on an actual low-end device or throttled profile

## Phase 4 — Project Showcase Detail
- [ ] Project cards with expand/detail interaction (terminal-style header, status dot, stack badges)
- [ ] Optional mini architecture-diagram SVG for DD Tours (or others)
- [ ] Live links verified (ddtours.in, EquiLens) and "in progress" state styled correctly for AI Notes App

## Phase 5 — Performance & Accessibility Pass
- [ ] Lighthouse run: Performance ≥ 80 mobile, Accessibility ≥ 90
- [ ] Code-splitting confirmed for the `three/` bundle
- [ ] Color contrast checked on all text-over-glass and text-over-3D combinations
- [ ] Keyboard navigation through nav, project cards, and contact form verified
- [ ] `prefers-reduced-motion` verified to disable scroll-jacking and heavy 3D motion

## Phase 6 — Content & SEO Polish
- [ ] Meta tags, OG image, favicon
- [ ] Final proofread of all copy (About, project descriptions, roadmap)
- [ ] Cross-browser check (Chrome, Firefox, Safari, mobile Safari)

## Phase 7 — Launch
- [ ] Final deploy to production domain
- [ ] Smoke test on real mobile device
- [ ] Update GitHub profile README / LinkedIn with the new portfolio link

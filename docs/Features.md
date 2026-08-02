# Features.md — Feature Specification
## Arghya's Developer Portfolio Website

**Version:** 1.0  
**Status:** Pre-Development  
**Last Updated:** 2026-08-01

---

## Feature Priority System

| Priority | Label | Meaning |
|---|---|---|
| P0 | 🔴 Critical | Site is broken/unusable without this |
| P1 | 🟠 High | Core portfolio value. Must ship in v1 |
| P2 | 🟡 Medium | Strong enhancement. Ship if time allows in v1 |
| P3 | 🟢 Nice-to-Have | Deferred to v2 unless quick to build |

---

## Section 1 — Hero

### F-001 · Full-Screen Hero Section 🔴
Display name, role, short tagline, and CTAs in a visually striking full-viewport hero.
- Name rendered in display-size `Space Grotesk` with GSAP SplitText character reveal
- Role tag cycles through 3–4 roles (e.g. "Full Stack Engineer", "Cloud Engineer", "DevOps Enthusiast") with crossfade
- Tagline: one-liner from `ProfileContent.md`
- Two CTAs: "View My Work" (scrolls to Projects) + "Download CV" (triggers PDF download)
- Availability badge: pulsing green dot + "Available for Work" glass pill, top-right or bottom of hero
- Fully responsive (stacks vertically on mobile)

**Acceptance Criteria:**
- Hero is the first visible content on load — no layout shift
- Name animation plays once on load, does not loop
- Role cycling works on mobile (no hover dependency)
- PDF download works across browsers (correct MIME type, direct link)

---

### F-002 · Image Frame Scroll — Hero 🟠
Background image sequence driven by scroll progress in the Hero section.
- 8–12 WebP images preloaded on mount
- Images crossfade (200ms) as user scrolls through Hero
- Dark gradient vignette overlaid on images for text readability
- Section is pinned via GSAP ScrollTrigger for the duration of the sequence

**Acceptance Criteria:**
- No jank or stutter at 60fps on a high-GPU device
- Falls back gracefully to static single image on mid/low GPU or reduced-motion
- First frame visible before any JS executes (static `<img>` with `priority`)

---

## Section 2 — About

### F-003 · About Section — Split Layout 🟠
Horizontal split: image frame scroll continues on left, glass content card on right.
- Left: image sequence continues (separate sequence from Hero, about-specific images)
- Right: glass card with bio text (from `ProfileContent.md`), stat counters, skills chips
- Bio: 2–3 paragraphs max
- Stats: 3–4 animated number counters (e.g. "3+ Projects", "1+ Years", "5 Cloud Certs")
- Skills cloud: role-grouped chips (Cloud, Backend, Frontend, DevOps)
- Section title revealed via GSAP from below

**Acceptance Criteria:**
- Split layout converts to single-column stack on tablet and mobile
- Number counters animate from 0 when scrolled into view (IntersectionObserver or GSAP)
- Image sequence on left is independent scroll from Hero sequence

---

## Section 3 — Skills

### F-004 · Skills Section — Marquee + Cards 🟠
Display technology stack via animated infinite marquee rows.
- 2–3 horizontal marquee rows, alternating scroll direction (left/right)
- Each row: tech chips (icon + name), gap-looped seamlessly
- Row labels: "Frontend", "Backend & Cloud", "DevOps & Tools"
- CSS-only marquee animation (no JS needed for the loop itself)
- Section header revealed via GSAP stagger

**Acceptance Criteria:**
- Marquee is perfectly seamless (no jump/reset visible)
- Marquee pauses on `prefers-reduced-motion` (CSS `animation-play-state: paused`)
- Icons render correctly at 16px (SVG format, no blurry PNGs)
- All tech from `ProfileContent.md` is represented

---

### F-005 · Skill Category Cards 🟡
Above or alongside the marquee, display 4 skill category glass cards with proficiency context.
- Card per category: Frontend, Backend, Cloud/DevOps, Tools
- Each card: category title + 4–6 key skills with mini icon
- Hover: card lifts, teal glow appears beneath
- Revealed via GSAP stagger on scroll enter

**Acceptance Criteria:**
- Cards are readable on mobile without horizontal scroll
- Hover state works on touch as tap toggle

---

## Section 4 — Projects

### F-006 · Projects — Horizontal Scroll Panel 🟠
Featured projects displayed as a GSAP-driven horizontal scroll (pinned section).
- Section pins while user scrolls; cards slide horizontally left
- 3–5 project cards (EquiLens as card #1)
- Each card: screenshot/thumbnail, project name, 1-line description, tech tags, links (GitHub + Live)
- Video preview (autoplay, muted, loop) replaces screenshot on hover

**Acceptance Criteria:**
- Horizontal scroll works smoothly with Lenis (must integrate GSAP + Lenis correctly)
- Falls back to vertical stacked cards on mobile (< 768px) — no horizontal scroll on mobile
- Card count: minimum 3 projects from `ProfileContent.md`
- GitHub and live links open in new tab with `rel="noopener noreferrer"`

---

### F-007 · Project Card — Hover Detail Overlay 🟡
On hover, project card shows a slide-up glass overlay with full project details.
- Overlay slides up from card bottom (Framer Motion `y: "100%" → y: 0`)
- Overlay content: full description, architecture highlights (1–2 lines), impact/metrics
- Links repeat in overlay (CTA format)
- Backdrop dim on rest of card (0.6 opacity on image)

**Acceptance Criteria:**
- Overlay never clips outside card boundaries (`overflow: hidden` on card)
- Overlay is dismissible on mobile (tap anywhere to close)
- Does not interfere with card link clicks when overlay is closed

---

### F-008 · EquiLens — Featured Project Callout 🟠
EquiLens is displayed as the first and largest card, marked as "Featured".
- Warm gradient border accent on card (coral → gold via `::before` pseudo)
- "Featured Project" badge (top-right of card)
- Slightly taller card than standard (500px vs 480px)
- Includes live Cloud Run link + GitHub link
- Short impact stat: "X bias violations detected / mitigated" from audit results

**Acceptance Criteria:**
- EquiLens always renders as first card in horizontal scroll
- Featured badge is visually distinct without being garish
- All content sourced from `ProfileContent.md`

---

## Section 5 — Experience / Timeline

### F-009 · Animated Vertical Timeline 🟠
Display education, project milestones, and experiences as an animated vertical timeline.
- Center vertical connector line (SVG `<path>`) drawn via GSAP DrawSVG on scroll
- Milestone cards alternate left/right of the line (desktop) / right-only (mobile)
- Each milestone: dot (pulsing teal), card (glass), role + org + date + 2–3 bullets
- Cards revealed via Framer Motion `whileInView` with alternating `x` translate
- Type badge per card: "Education" | "Project" | "Open Source" | "Certification"

**Acceptance Criteria:**
- DrawSVG line extends progressively as user scrolls — never jumps to full
- Cards do not overlap the center line on any viewport width
- Mobile layout uses right-aligned single column with left-side connector line

---

## Section 6 — Contact

### F-010 · Contact Section — Glass Form 🔴
Functional contact form that emails Arghya directly.
- Fields: Name, Email, Message (textarea)
- Validation: required fields, valid email format (Zod)
- Submit: POST to `/api/contact` → Resend API → email to Arghya
- Success: Toast notification "Message sent! I'll get back to you soon."
- Error: Toast notification "Something went wrong. Try emailing me directly."
- Direct email fallback link shown below form

**Acceptance Criteria:**
- Form never exposes the recipient email address in the client bundle
- Zod validation runs client-side (React Hook Form) before submit
- Server also validates (Zod in route handler) — never trust client
- Form resets after successful submission
- Works without JavaScript (graceful degradation note: form still renders, POST still works)

---

### F-011 · Social Links Row 🟠
Row of social/professional links below contact form.
- Links: GitHub, LinkedIn, Twitter/X, Email (mailto)
- Display: glass circle icon buttons (Lucide icons)
- Hover: icon scale + teal glow beneath button
- Revealed via Framer `whileInView` stagger

**Acceptance Criteria:**
- All links open in new tab (except mailto)
- Links sourced from `ProfileContent.md` — no hardcoded URLs in components

---

## Global Features

### F-012 · Glass Navbar 🔴
Fixed navigation bar with section links and active state indicator.
- Sections linked: Hero (Logo click), About, Skills, Projects, Experience, Contact
- Active link: detected via Zustand `activeSection` state (set by IntersectionObserver in `useActiveSection`)
- Active indicator: animated underline that slides between links (GSAP)
- "Hire Me" CTA button right-aligned
- Scroll behavior: Lenis `scrollTo` on nav link click (smooth, not native)
- Mobile: hamburger icon → full-screen glass overlay menu

**Acceptance Criteria:**
- Active link updates correctly when scrolling through sections
- Navbar does not cause layout shift on initial render
- Mobile menu opens/closes with Framer Motion (slide + fade)
- Keyboard navigation works (Tab through links, Enter to navigate)

---

### F-013 · Lenis Smooth Scroll 🟠
Site-wide smooth scroll via Lenis.
- Lenis initialized in `LenisProvider` wrapping the entire app
- GSAP ScrollTrigger synced with Lenis scroll events
- `useLenis` hook exposes Lenis instance for programmatic scrolling (nav links)
- Disabled on mobile (< 768px) — native scroll preferred on touch devices

**Acceptance Criteria:**
- No scroll jank introduced by Lenis on desktop
- All anchor links and nav clicks use Lenis `scrollTo` (not `window.scrollTo`)
- GSAP ScrollTrigger animations are perfectly in sync (no drift)

---

### F-014 · GPU Tier Detection + Animation Fallback 🔴
Detect GPU capability on mount and configure animation level accordingly.
- `detect-gpu` runs once on app mount inside `AnimationProvider`
- Result stored in Zustand: `gpuTier: 'high' | 'mid' | 'low'`
- `prefersReducedMotion` also stored (from `window.matchMedia`)
- `useMotionConfig` hook derives animation config from these two values
- All animated components consume `useMotionConfig` before rendering animations

**Acceptance Criteria:**
- Site is fully functional and looks good even at Tier LOW (no broken layouts)
- Detection is async and does not block first render
- `prefers-reduced-motion: reduce` always overrides GPU tier (motion is never shown)

---

### F-015 · Custom Cursor 🟢
Glow cursor for desktop high-GPU users.
- Outer ring: 40px, teal, blurred glow, lerp-lagged
- Inner dot: 6px, solid teal
- Rendered via `dynamic(() => ..., { ssr: false })`
- Section-aware color change (teal → coral → gold by section)
- Scale change on hovering interactive elements

**Acceptance Criteria:**
- Only rendered on `> 1024px` viewport + GPU tier HIGH
- Native cursor hidden only when custom cursor is active
- Does not cause any layout shifts or SSR hydration mismatch

---

### F-016 · SEO and Open Graph 🔴
Complete metadata for search engines and social sharing.
- Title, description, canonical URL, keywords
- OG image (1200×630) showing name, role, and avatar
- Twitter card: `summary_large_image`
- Robots: index, follow
- Sitemap generated at build (`next-sitemap`)
- Favicon set (ico, svg, apple-touch-icon)

---

### F-017 · CV Download 🟠
Downloadable PDF resume from the Hero section CTA and potentially Navbar.
- PDF stored at `public/cv-arghya.pdf`
- Link: `<a href="/cv-arghya.pdf" download="Arghya_CV.pdf">`
- Analytics event fired on download click (Vercel Analytics)

---

### F-018 · Analytics 🟡
Vercel Analytics and Speed Insights for real-world performance tracking.
- Vercel Analytics component added to `app/layout.tsx`
- Vercel Speed Insights component added to `app/layout.tsx`
- No cookie banners required (Vercel Analytics is privacy-first, no PII)

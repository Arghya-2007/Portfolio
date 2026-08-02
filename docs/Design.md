# Design.md — Design System & Visual Specification
## Arghya's Developer Portfolio Website

**Version:** 1.0  
**Status:** Pre-Development  
**Last Updated:** 2026-08-01

---

## 1. Design Philosophy

> "Premium glass sitting on a dark ocean. Every element breathes. Nothing is static. Nothing is gratuitous."

The design language is **Dark Glassmorphism + Kinetic Typography**. The background is always alive (image frame scroll, gradient shifts). The foreground is always glass — translucent, layered, lit from within by the brand palette. Motion is the medium, not decoration.

**Three Core Principles:**
1. **Depth over flatness** — every section has at least 3 visual layers (BG, mid, foreground)
2. **Restraint over excess** — one animation per interaction, not five
3. **Content first** — no animation should ever delay or obscure content readability

---

## 2. Color System

### 2.1 Brand Palette

```
--color-ocean:    #264653   /* Darkest. Primary background anchor */
--color-teal:     #2a9d8f   /* Primary interactive. Links, CTAs, rings */
--color-gold:     #e9c46a   /* Warm accent. Badges, highlights, dots */
--color-sand:     #f4a261   /* Secondary. Hover states, secondary buttons */
--color-coral:    #e76f51   /* Hot accent. Gradient ends, glows, emphasis */
```

### 2.2 Extended Surface System

```
--surface-base:   #0d1f26   /* True dark base. Darkest bg — darker than ocean */
--surface-deep:   #152e38   /* Section bg variant */
--surface-mid:    #1c3d4a   /* Card base before glass overlay */
--surface-glass:  rgba(26, 50, 62, 0.35)   /* Glass panel fill */
--surface-glass-hover: rgba(26, 50, 62, 0.50)

--text-primary:   #f0f4f5   /* Headings. Near white, not pure */
--text-secondary: #8faab3   /* Body, descriptions */
--text-muted:     #4d6b75   /* Labels, metadata, captions */
--text-accent:    #2a9d8f   /* Inline highlights, links */
```

### 2.3 Gradients (Reusable)

```
/* Used on: primary CTA buttons, section dividers, card accents */
--grad-warm:   linear-gradient(135deg, #e76f51 0%, #e9c46a 100%)

/* Used on: teal CTA, glass card borders, skill bars */
--grad-teal:   linear-gradient(135deg, #2a9d8f 0%, #264653 100%)

/* Used on: background depth layers, vignettes */
--grad-dark:   linear-gradient(180deg, #0d1f26 0%, #152e38 50%, #0d1f26 100%)

/* Used on: glow effects behind cards and hero content */
--grad-glow-teal:  radial-gradient(circle, rgba(42,157,143,0.15) 0%, transparent 70%)
--grad-glow-coral: radial-gradient(circle, rgba(231,111,81,0.12) 0%, transparent 70%)
```

### 2.4 Semantic Colors

```
--color-success:  #2a9d8f   /* Reuse teal */
--color-warning:  #e9c46a   /* Gold */
--color-error:    #e76f51   /* Coral */
--color-info:     #4a90a4
```

---

## 3. Typography

### 3.1 Font Stack

```
Primary (Headings, Display):  'Space Grotesk', sans-serif
Secondary (Body, UI):         'Inter', sans-serif
Mono (Code, Tech labels):     'JetBrains Mono', monospace
```

Import order in `layout.tsx` / global CSS: Inter → Space Grotesk → JetBrains Mono.  
Use `font-display: swap` on all three.

### 3.2 Type Scale

| Token | Size | Weight | Font | Usage |
|---|---|---|---|---|
| `--text-display` | clamp(3.5rem, 8vw, 7rem) | 700 | Space Grotesk | Hero name |
| `--text-hero-sub` | clamp(1.1rem, 2.5vw, 1.5rem) | 400 | Inter | Hero role tag |
| `--text-section-title` | clamp(2rem, 4vw, 3.5rem) | 700 | Space Grotesk | Section headings |
| `--text-card-title` | 1.25rem (20px) | 600 | Space Grotesk | Card/project titles |
| `--text-body` | 1rem (16px) | 400 | Inter | Body copy |
| `--text-body-sm` | 0.875rem (14px) | 400 | Inter | Captions, tags |
| `--text-label` | 0.75rem (12px) | 500 | Inter | Labels, badges |
| `--text-mono` | 0.875rem (14px) | 400 | JetBrains Mono | Tech stack tags, code |

### 3.3 Typography Rules

- Line height: `1.7` for body, `1.1` for display headings
- Letter spacing: `-0.03em` for display, `0.08em` for labels and badges (UPPERCASE labels only)
- Never use pure `#ffffff` for text — use `--text-primary` (`#f0f4f5`)
- Max line width for body text: `65ch`
- Section eyebrow labels: `text-label` + uppercase + `letter-spacing: 0.12em` + `--color-teal`

---

## 4. Glassmorphism System

### 4.1 Glass Panel Specification

Every glass component uses this exact formula. Do not deviate.

```css
/* Base Glass */
.glass {
  background: rgba(26, 50, 62, 0.35);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(42, 157, 143, 0.20);
  border-radius: 16px;
}

/* Glass — Elevated (Modals, Featured Cards) */
.glass-elevated {
  background: rgba(26, 50, 62, 0.55);
  backdrop-filter: blur(32px) saturate(200%);
  border: 1px solid rgba(42, 157, 143, 0.30);
  border-radius: 20px;
  box-shadow:
    0 0 0 1px rgba(42, 157, 143, 0.10),
    0 20px 60px rgba(0, 0, 0, 0.40),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* Glass — Subtle (Navbar, Pills, Badges) */
.glass-subtle {
  background: rgba(26, 50, 62, 0.20);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(42, 157, 143, 0.12);
  border-radius: 100px;
}
```

### 4.2 Glass Accent Variants

For cards that need to stand out, add a top-edge gradient border via `::before` pseudo:

```css
/* Top accent line on featured cards */
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
}

.glass-accent-teal::before {
  /* Same pattern, gradient: #2a9d8f → #264653 */
}
```

### 4.3 Glow System

Glows sit behind cards, never on them. Implemented as absolute-positioned `div` with `filter: blur(80px)`.

```
Teal glow:  rgba(42, 157, 143, 0.20) — 300px × 300px blur
Coral glow: rgba(231, 111, 81, 0.15) — 300px × 300px blur
Gold glow:  rgba(233, 196, 106, 0.12) — 200px × 200px blur
```

---

## 5. Component Design Specs

### 5.1 Buttons

```
Primary CTA:
  bg: --grad-warm (coral → gold)
  text: #0d1f26 (dark — for contrast on warm gradient)
  border-radius: 12px
  padding: 14px 32px
  font: Space Grotesk 600 16px
  hover: scale(1.04) + shadow lift
  active: scale(0.97)

Secondary CTA:
  bg: transparent
  border: 1.5px solid rgba(42, 157, 143, 0.50)
  text: --text-primary
  hover: bg rgba(42,157,143,0.10) + border opacity 1.0
  border-radius: 12px

Ghost / Icon:
  bg: glass-subtle
  size: 44px × 44px circle
  icon: 20px
  hover: border teal 0.5 → 1.0 opacity
```

### 5.2 Navbar

```
Position: fixed top-0
Height: 64px
Background: glass-subtle (blur 16px)
Border-bottom: 1px solid rgba(42, 157, 143, 0.12)
Logo: Space Grotesk 700, gradient-text (warm gradient)
Nav links: Inter 500 14px, --text-secondary
Active link: --text-primary + teal underline (2px, animated slide)
CTA: "Hire Me" primary button, small variant
Mobile: hamburger → full-screen glass overlay
```

### 5.3 Project Cards

```
Size: 400px × 480px (desktop), full-width (mobile)
Background: glass-elevated
Header image zone: 200px height, overflow hidden
  - Video preview on hover (autoplay muted loop)
  - Screenshot default state
  - Zoom in slightly on hover (scale 1.05, 400ms ease)
Content zone: padding 24px
  - Project name: --text-card-title + Space Grotesk
  - Description: 2 lines max, --text-secondary, 14px
  - Tech stack: mono tags, glass-subtle background
  - Links row: GitHub icon + Live icon, ghost buttons
Hover state:
  - Card lifts: translateY(-8px) + shadow deepens
  - Teal glow appears beneath card
  - Overlay slides up with full description (Framer)
Featured badge: glass-accent-warm + "Featured" label (top-right)
```

### 5.4 Skill Chips (Marquee)

```
Height: 40px
Padding: 0 16px
Background: glass-subtle
Border: 1px solid rgba(42, 157, 143, 0.15)
Border-radius: 100px
Gap between chips: 12px
Content: Tech icon (16px) + Tech name (Inter 500 13px)
Hover: border teal opacity 0.5, bg slightly brighter
Marquee gap: 48px between end and repeat
```

### 5.5 Timeline Cards

```
Connector line: 2px, dashed, rgba(42,157,143,0.30)
Dot: 12px circle, --color-teal fill, glow ring
Card: glass panel, 320px wide (desktop)
Alternating: left/right of center line
Header: Role title + Org name
Sub: Date range chip (glass-subtle) + location
Body: 2-3 bullet points, 14px body
Tag: Type badge (Education / Project / Work)
```

### 5.6 Section Anatomy

Every section follows this structure:

```
<section>
  ├── [optional] Background Layer     (image, gradient, glow divs — z-index: 0)
  ├── Eyebrow Label                   (teal, uppercase, letter-spaced)
  ├── Section Title                   (display heading, GSAP SplitText reveal)
  ├── Section Subtitle                (optional, body text)
  └── Content Grid / Layout          (section-specific)
```

---

## 6. Animation Design

> Full technical implementation details live in Architecture.md.  
> This section defines WHAT animates and HOW it should feel, not how it's coded.

### 6.1 Animation Vocabulary

| Animation | Feel | Easing | Duration |
|---|---|---|---|
| Section reveal | Content rises from below | `power3.out` | 0.7s |
| Hero name entry | Characters fall into place | `power4.out` stagger | 0.05s per char |
| Card hover lift | Physical, springy | `spring` (Framer) | — |
| Image frame scroll | Cinematic, tied to scroll | ScrollTrigger linear | — |
| Timeline line draw | Deliberate, progressive | `power2.inOut` | scroll-driven |
| Marquee | Seamless, consistent | CSS `linear` | 30–40s loop |
| Cursor glow | Fluid, lagged | lerp 0.08 factor | rAF |
| Number counter | Accelerating | `power2.out` | 1.2s |
| Button hover | Snappy, confident | `power2.out` | 0.2s |
| Nav indicator slide | Smooth, precise | `power2.inOut` | 0.3s |

### 6.2 Scroll Animation Triggers

All GSAP ScrollTrigger start points use `"top 80%"` as default (element enters at 80% from top of viewport). Exceptions:

- Hero: pinned, starts immediately
- Section titles: `"top 75%"` (slightly earlier — large text)
- Timeline line: starts at section top, ends at section bottom

### 6.3 Image Frame Scroll

- Frame count: 8–12 images per sequence (Hero + About, separate sequences)
- Crossfade duration: 200ms between frames
- Trigger: GSAP ScrollTrigger onUpdate → drives frame index
- Frame format: WebP, max 1920×1080, compressed to < 200KB each
- Fallback: single static WebP with CSS `background-attachment: fixed`

### 6.4 Reduced Motion Fallback

When `prefers-reduced-motion: reduce` OR GPU tier is LOW:

- All GSAP animations: instant opacity 1, no movement
- Image frame scroll: single static image, no scroll reaction
- Marquee: paused
- Custom cursor: disabled
- Framer Motion: `<MotionConfig reducedMotion="always">`

---

## 7. Spacing System

```
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  24px
--space-6:  32px
--space-7:  48px
--space-8:  64px
--space-9:  96px
--space-10: 128px

Section vertical padding: --space-9 (96px) top + bottom
Section gap between sections: --space-8 (64px)
Card internal padding: --space-5 (24px)
Component gap (siblings): --space-5 (24px) or --space-6 (32px)
```

---

## 8. Responsive Breakpoints

```
--bp-sm:  480px    /* Large phones */
--bp-md:  768px    /* Tablets */
--bp-lg:  1024px   /* Small laptops */
--bp-xl:  1280px   /* Standard desktop */
--bp-2xl: 1536px   /* Wide desktop */
```

Design base is **mobile-first**. All Tailwind utilities default to mobile, with `md:` and `lg:` overrides.

### Responsive Animation Rules

| Breakpoint | Animation Level |
|---|---|
| < 768px | Simplified — no image frame scroll, no cursor, reduced GSAP |
| 768px–1024px | Mid — image frame scroll active, cursor disabled |
| > 1024px | Full — all animations active (subject to GPU tier) |

---

## 9. Image & Asset Guidelines

- All images: WebP format, converted before adding to `/public`
- Hero frame images: 1920×1080, < 200KB each
- About frame images: 1920×1080, < 200KB each
- Project screenshots: 800×600, < 150KB each
- Icons: SVG inline or Lucide React (no PNG icons)
- Avatar/profile photo: WebP, 400×400, < 80KB, provided in `ProfileContent.md`
- OG image: 1200×630 PNG (exception — PNG required for social sharing)

---

## 10. Cursor Design

Desktop only (> 1024px, GPU tier HIGH or MID):

```
Outer ring:  40px circle, border 1.5px, rgba(42,157,143,0.50), no fill
Inner dot:   6px circle, fill #2a9d8f
Lag factor:  lerp 0.08 (outer ring follows with gentle lag)

States:
  Default:        teal ring + teal dot
  On clickable:   ring scales to 56px + color shifts to coral
  On text:        ring morphs to thin vertical bar (text cursor style)
  Section-aware:  Skills → teal, Projects → coral, Contact → gold
```

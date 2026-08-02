# Rules.md — Engineering Rules & Conventions
## Arghya's Developer Portfolio Website

**Version:** 1.0  
**Status:** Pre-Development  
**Last Updated:** 2026-08-01

> These rules are written for both the Antigravity Agent and the developer.  
> The agent MUST follow all rules marked 🤖. The developer MUST follow all rules marked 👤.  
> Rules marked 🔒 are non-negotiable and override any other instruction.

---

## 1. General Engineering Rules

### 1.1 Absolute Rules 🔒

- **NEVER hardcode personal content** (name, email, project names, descriptions) in component files. All content comes from `lib/content.ts` which reads from `content/ProfileContent.md`.
- **NEVER commit environment variables.** `.env.local` is gitignored. Only `.env.example` is committed, with no values.
- **NEVER use `any` type in TypeScript.** If the type is truly unknown, use `unknown` and narrow it.
- **NEVER use `px` units in Tailwind classes for spacing.** Use the spacing scale (`p-4`, `mt-6`) and the design tokens defined in `tailwind.config.ts`.
- **NEVER import GSAP or GSAP plugins in Server Components.** All GSAP code lives in Client Components or hooks.
- **NEVER animate without checking `animationsEnabled` from `useMotionConfig`.** Every GSAP and Framer animation must be gated.

### 1.2 Code Quality Rules 🤖 👤

- All files are TypeScript (`.tsx` for components, `.ts` for utilities/hooks)
- No JavaScript files in this project (`*.js`, `*.jsx` are forbidden)
- ESLint + Prettier must pass before any commit
- No `console.log` left in committed code. Use `console.warn` or `console.error` for legitimate warnings
- No unused imports. No unused variables. TypeScript's `noUnusedLocals` is enabled
- Functions have explicit return types when not obviously inferred

---

## 2. File and Folder Rules

### 2.1 Naming Conventions 🤖 👤

| Type | Convention | Example |
|---|---|---|
| Component files | PascalCase | `GlassCard.tsx`, `ProjectCard.tsx` |
| Hook files | camelCase with `use` prefix | `useMotionConfig.ts`, `useGPUTier.ts` |
| Utility files | camelCase | `animations.ts`, `utils.ts` |
| CSS files | kebab-case | `globals.css`, `animations.css` |
| Image assets | kebab-case | `hero-frame-01.webp`, `project-equilens.webp` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_FRAME_COUNT`, `SECTION_IDS` |

### 2.2 File Structure Rules 🤖

- Each section component lives in `components/sections/` — one file per section
- Each section component exports exactly ONE default export: the section component
- Shared/reusable components live in `components/ui/` — must be generic, not section-specific
- Hooks are pure functions — no JSX, no component logic
- `lib/` contains pure TypeScript utilities with no React dependencies (except `lib/content.ts`)
- Never create files outside the defined structure in `Architecture&TechStack.md` without updating that document

### 2.3 Import Order 🤖

Always in this order, with blank lines separating groups:

```typescript
// 1. React / Next.js
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

// 2. Third-party libraries
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

// 3. Internal absolute imports (components)
import GlassCard from '@/components/ui/GlassCard'
import SectionHeader from '@/components/ui/SectionHeader'

// 4. Internal hooks / lib / store
import { useMotionConfig } from '@/hooks/useMotionConfig'
import { projects } from '@/lib/content'

// 5. Types
import type { Project } from '@/types'

// 6. Styles (if any)
import styles from './Component.module.css'
```

---

## 3. Component Rules

### 3.1 Component Structure 🤖

Every component file follows this structure:

```typescript
'use client' // if client component

// imports (see import order above)

// types/interfaces (local to this file)
interface Props {
  // ...
}

// constants (local to this file)
const ANIMATION_DURATION = 0.7

// main component (default export at bottom)
function ComponentName({ prop1, prop2 }: Props) {
  // 1. hooks
  // 2. refs
  // 3. state
  // 4. derived values
  // 5. effects
  // 6. handlers
  // 7. render
  return (...)
}

export default ComponentName
```

### 3.2 Server vs Client Components 🤖 🔒

- A component is a **Server Component by default** (no `'use client'` directive)
- Add `'use client'` ONLY when the component uses: `useState`, `useEffect`, `useRef`, event handlers, browser APIs, GSAP, Framer Motion, Zustand
- Section components (`components/sections/`) are ALL `'use client'` — they all use animations
- `components/ui/` components: prefer Server Components unless they need interactivity

### 3.3 Props Rules 🤖

- Destructure props in the function signature, not inside the function body
- Always define a `Props` interface (even for simple components)
- Use optional chaining (`?.`) for optional props, never `!` (non-null assertion) unless unavoidable
- `children` prop: type as `React.ReactNode`

---

## 4. Animation Rules

### 4.1 The Golden Rule 🔒 🤖

```typescript
// ALWAYS do this before any animation:
const { animationsEnabled, reducedMotion } = useMotionConfig()

// GSAP animations:
if (!animationsEnabled) return  // skip setup entirely

// Framer Motion: use MotionConfig at provider level,
// but also guard complex animations:
const variants = animationsEnabled ? myVariants : { initial: {}, animate: {} }
```

### 4.2 GSAP Rules 🤖

- Register plugins ONCE in `lib/gsap/gsap.config.ts`. Never `gsap.registerPlugin()` inside a component.
- All GSAP animations inside a `useEffect`. Always return a cleanup function:
  ```typescript
  useEffect(() => {
    const ctx = gsap.context(() => {
      // your animations
    }, containerRef)
    return () => ctx.revert()
  }, [])
  ```
- Use `gsap.context()` with a container ref — never select elements by class/ID globally
- ScrollTrigger instances must be killed in cleanup: `ctx.revert()` handles this automatically
- Never use `gsap.to(element, ...)` with a DOM element directly. Use refs or selectors within context

### 4.3 Framer Motion Rules 🤖

- Use `whileInView` for scroll-triggered component reveals — not GSAP (GSAP is for scroll-driven timelines, Framer is for component reveals)
- Set `viewport={{ once: true }}` on all `whileInView` — animations should not replay on scroll back
- Use `layout` prop on elements that change size/position (avoids CLS)
- Wrap lists with `AnimatePresence` only when items are added/removed
- Use the `variants` pattern — define animation variants as a `const` outside the component, not inline

```typescript
// CORRECT
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

// WRONG — never define variants inline in JSX
<motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }}>
```

### 4.4 Lenis Rules 🤖

- Never use `window.scrollTo()` in this project. Always use `lenis.scrollTo()`
- Lenis must be initialized before any GSAP ScrollTrigger setup
- Lenis is disabled on mobile (`< 768px`) — check `useIsMobile()` before init

---

## 5. Styling Rules

### 5.1 Tailwind Rules 🤖

- Design tokens (colors, spacing, fonts) are defined in `tailwind.config.ts` — use them, not raw values
- Never use arbitrary values `[...]` for colors defined in the design system
  ```
  ✅ className="bg-ocean text-teal"
  ❌ className="bg-[#264653] text-[#2a9d8f]"
  ```
- Arbitrary values are allowed ONLY for: pixel-perfect one-off sizes, custom clip-paths, and SVG-related values
- Responsive classes: always mobile-first (`text-2xl md:text-4xl lg:text-6xl`)
- Dark mode: all components are dark-only in v1. No `dark:` prefix needed — styles target the dark theme by default

### 5.2 CSS Custom Properties 🤖

- CSS variables (design tokens) are defined in `styles/globals.css`
- Glass utility classes (`.glass`, `.glass-elevated`, `.glass-subtle`) are defined there and referenced via `@apply` or `className`
- Never redeclare CSS variables inside component-level styles
- Do not use CSS Modules (`.module.css`) — Tailwind + globals.css is the system

### 5.3 Glass Component Rules 🤖

- The three glass tiers (`glass`, `glass-elevated`, `glass-subtle`) are defined in `Design.md`
- Use the correct tier for the correct context. Do not invent new glass variants without updating `Design.md`
- `backdrop-filter` must always have `-webkit-backdrop-filter` alongside it
- Never apply `backdrop-filter` to a component whose parent does not have a background — it has nothing to blur

---

## 6. Content Rules

### 6.1 Content Source of Truth 🔒 🤖

- **`content/ProfileContent.md` is the single source of truth** for all personal content
- `lib/content.ts` parses/exports this content as typed TypeScript objects
- Components import from `lib/content.ts` — NEVER directly from the markdown file
- If content needs to be updated, update `ProfileContent.md` only. The TypeScript types in `lib/content.ts` must match

### 6.2 Content Rules 🤖

- Project descriptions from `ProfileContent.md`: max 120 characters for card display, full description for overlay
- Never truncate text with JavaScript — use CSS `line-clamp` utilities
- All external URLs from content must have `https://` prefix validation

---

## 7. Performance Rules

### 7.1 Images 🔒 🤖

- EVERY image uses `next/image`. No raw `<img>` tags (except inside SVG)
- Images must have explicit `width` and `height` props (or `fill` with a sized parent)
- Every `<Image>` must have a meaningful `alt` attribute — no empty `alt=""`
- Hero first frame and avatar: `priority={true}`. Everything else: default lazy load
- All image files in `/public/images/` must be WebP format before commit
- Max file sizes enforced: frames < 200KB, project screenshots < 150KB, avatar < 80KB

### 7.2 Bundle Rules 🤖

- Use `next/dynamic` with `{ ssr: false }` for: CustomCursor, any component that directly accesses `window` or `document` on mount
- Use `next/dynamic` with `loading` spinner for: sections below the fold (Skills, Projects, Experience, Contact)
- No `import *` from any library — named imports only
- Check bundle size with `pnpm build` — warn if first-load JS exceeds 200KB

### 7.3 Third-Party Scripts 🤖

- No third-party scripts loaded synchronously in `<head>`
- Vercel Analytics: use the `@vercel/analytics/react` package (automatic optimization)
- No Google Tag Manager or any script that adds > 50ms to TBT

---

## 8. Accessibility Rules

### 8.1 Mandatory Accessibility 🔒 🤖

- All interactive elements are keyboard reachable (Tab order makes sense)
- All buttons have accessible labels: visible text, `aria-label`, or `aria-labelledby`
- All images have meaningful `alt` text. Decorative images: `alt=""`
- Color contrast: all text meets WCAG AA (4.5:1 for normal text, 3:1 for large text)
- Focus indicators are visible — never `outline: none` without a custom focus style replacement
- Animations respect `prefers-reduced-motion` — verified at OS level, not just CSS

### 8.2 ARIA Rules 🤖

- Use semantic HTML first. ARIA is a last resort
- `<nav>` for navbar, `<main>` for page content, `<section>` with `aria-label` for each section, `<footer>` for footer
- The hamburger menu button needs `aria-expanded` and `aria-controls`
- The contact form: each `<input>` and `<textarea>` has an associated `<label>` via `htmlFor` / `id`

---

## 9. Git Rules

### 9.1 Commit Message Format 👤

Use Conventional Commits:

```
feat(hero): add SplitText character reveal animation
fix(contact): validate email format before POST
style(navbar): adjust glass blur intensity
perf(images): convert project screenshots to WebP
refactor(hooks): extract useImageSequence from Hero component
docs(readme): add local setup instructions
chore(deps): upgrade gsap to 3.13
```

### 9.2 Branch Strategy 👤

```
main          → production (Vercel auto-deploys)
dev           → integration branch
feat/*        → feature branches (e.g. feat/hero-animation)
fix/*         → bug fix branches
```

Never commit directly to `main`. PRs from `feat/*` → `dev` → `main`.

### 9.3 What To Never Commit 🔒

- `.env.local`
- `/node_modules`
- `/.next`
- Raw PNG/JPEG images (WebP only in `/public/images/`)
- GSAP Club license key (if applicable) — use env var
- Any file containing a real email address, API key, or password

---

## 10. Agent-Specific Rules (Antigravity Agent)

### 10.1 When Creating New Files 🤖

- Always check `Architecture&TechStack.md` file structure before creating a file
- Place files in the correct directory as defined in Architecture.md
- Add the `'use client'` directive if the component uses any browser API or React hook
- After creating a component, verify it is exported correctly (default export for components, named export for utilities)

### 10.2 When Modifying Animations 🤖

- Always check `useMotionConfig` is imported and used before adding any animation
- GSAP effects must have cleanup via `gsap.context().revert()`
- Never introduce a new animation that does not degrade gracefully

### 10.3 When Adding Content 🤖

- Read `ProfileContent.md` before writing any component that displays personal data
- All content strings are imported from `lib/content.ts`
- Never hardcode strings like names, project titles, descriptions, or URLs in JSX

### 10.4 When Stuck 🤖

- If uncertain about design decisions, refer to `Design.md`
- If uncertain about where a file belongs, refer to `Architecture&TechStack.md`
- If uncertain about what to build next, refer to `Phases.md`
- If uncertain about a feature's requirements, refer to `Features.md`

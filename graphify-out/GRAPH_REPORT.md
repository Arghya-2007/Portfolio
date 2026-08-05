# Graph Report - PORTFOLIO  (2026-08-05)

## Corpus Check
- 59 files · ~887,908 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 645 nodes · 845 edges · 61 communities (30 shown, 31 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `af18fc6a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- .render
- Rules.md — Engineering Rules & Conventions
- Design.md — Design System & Visual Specification
- devDependencies
- compilerOptions
- Features.md — Feature Specification
- Architecture & TechStack.md — Technical Architecture Document
- TechChip.tsx
- Phases.md — Development Phases & Milestones
- 🤖 AGENT PROMPT — Portfolio Project Initialization (Phase 0)
- components.json
- PRD.md — Product Requirements Document
- Cloud Engineering & DevOps Roadmap
- content.ts
- useLoadingStore
- Hero.tsx
- ProfileContent.md — Source Content (from github.com/Arghya-2007)
- layout.tsx
- useMotionConfig.ts
- VariableProximity.tsx
- TechStack.tsx
- page.tsx
- SkillCard.tsx
- GlassButton.tsx
- CustomCursor.tsx
- useMotionConfig
- dependencies
- DotGrid.tsx
- utils.ts
- ImageItem
- RotatingText.tsx
- gsap.config.ts
- TrueFocus.tsx
- README.md
- eslint.config.mjs
- framer-motion
- gsap
- @gsap/react
- lenis
- lucide-react
- matter-js
- motion
- next
- next.config.ts
- next-sitemap
- ogl
- postprocessing
- react-dom
- react-hook-form
- resend
- sheryjs
- tailwind-merge
- three
- @types/three
- @vercel/analytics
- @vercel/speed-insights
- zod
- zustand
- postcss.config.mjs
- tailwind.config.ts

## God Nodes (most connected - your core abstractions)
1. `🤖 AGENT PROMPT — Portfolio Project Initialization (Phase 0)` - 22 edges
2. `useMotionConfig()` - 20 edges
3. `useLoadingStore` - 19 edges
4. `compilerOptions` - 16 edges
5. `Phases.md — Development Phases & Milestones` - 14 edges
6. `useAnimationStore` - 12 edges
7. `Architecture & TechStack.md — Technical Architecture Document` - 12 edges
8. `Design.md — Design System & Visual Specification` - 12 edges
9. `Rules.md — Engineering Rules & Conventions` - 12 edges
10. `ImageTrailVariant6` - 10 edges

## Surprising Connections (you probably didn't know these)
- `ProjectWrapper()` --calls--> `useLoadingStore`  [EXTRACTED]
  components/Wrappers/ProjectWrapper.tsx → store/useLoadingStore.ts
- `HomePage()` --calls--> `useLoadingStore`  [EXTRACTED]
  app/page.tsx → store/useLoadingStore.ts
- `CustomCursor()` --calls--> `useMotionConfig()`  [EXTRACTED]
  components/layout/CustomCursor.tsx → hooks/useMotionConfig.ts
- `CustomCursor()` --calls--> `useLoadingStore`  [EXTRACTED]
  components/layout/CustomCursor.tsx → store/useLoadingStore.ts
- `LoadingScreen()` --calls--> `useAnimationStore`  [EXTRACTED]
  components/layout/LoadingScreen.tsx → store/useAnimationStore.ts

## Import Cycles
- None detected.

## Communities (61 total, 31 thin omitted)

### Community 0 - ".render"
Cohesion: 0.07
Nodes (15): getLocalPointerPos(), getMouseDistance(), getNewPosition(), ImageTrailConstructor, ImageTrailProps, ImageTrailVariant1, ImageTrailVariant2, ImageTrailVariant3 (+7 more)

### Community 1 - "Rules.md — Engineering Rules & Conventions"
Cohesion: 0.05
Nodes (41): 10.1 When Creating New Files 🤖, 10.2 When Modifying Animations 🤖, 10.3 When Adding Content 🤖, 10.4 When Stuck 🤖, 10. Agent-Specific Rules (Antigravity Agent), 1.1 Absolute Rules 🔒, 1.2 Code Quality Rules 🤖 👤, 1. General Engineering Rules (+33 more)

### Community 2 - "Design.md — Design System & Visual Specification"
Cohesion: 0.06
Nodes (33): 10. Cursor Design, 1. Design Philosophy, 2.1 Brand Palette, 2.2 Extended Surface System, 2.3 Gradients (Reusable), 2.4 Semantic Colors, 2. Color System, 3.1 Font Stack (+25 more)

### Community 3 - "devDependencies"
Cohesion: 0.06
Nodes (33): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, raw-loader, sharp, tailwindcss (+25 more)

### Community 4 - "compilerOptions"
Cohesion: 0.07
Nodes (29): components/layout/SplashCursor.jsx, dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts (+21 more)

### Community 5 - "Features.md — Feature Specification"
Cohesion: 0.07
Nodes (28): Arghya's Developer Portfolio Website, F-001 · Full-Screen Hero Section 🔴, F-002 · Image Frame Scroll — Hero 🟠, F-003 · About Section — Split Layout 🟠, F-004 · Skills Section — Marquee + Cards 🟠, F-005 · Skill Category Cards 🟡, F-006 · Projects — Horizontal Scroll Panel 🟠, F-007 · Project Card — Hover Detail Overlay 🟡 (+20 more)

### Community 6 - "Architecture & TechStack.md — Technical Architecture Document"
Cohesion: 0.07
Nodes (27): 10. Development Setup, 1.1 Core Framework, 1.2 Animation Stack, 1.3 UI Libraries, 1.4 State Management, 1.5 Forms and Communication, 1.6 Fonts, 1.7 Analytics and Monitoring (+19 more)

### Community 8 - "Phases.md — Development Phases & Milestones"
Cohesion: 0.08
Nodes (24): Arghya's Developer Portfolio Website, Milestone Summary, Overview, Phase 0 — Foundation, Phase 1 — Core Layout, Phase 2 — Hero Section, Phase 3 — About Section, Phase 4 — Skills Section (+16 more)

### Community 9 - "🤖 AGENT PROMPT — Portfolio Project Initialization (Phase 0)"
Cohesion: 0.09
Nodes (22): 🤖 AGENT PROMPT — Portfolio Project Initialization (Phase 0), Context, Phase 0 Complete → Proceed to Phase 1, STEP 10 — Create `hooks/useMotionConfig.ts`, STEP 11 — Create `components/providers/AnimationProvider.tsx`, STEP 12 — Create `components/providers/LenisProvider.tsx`, STEP 13 — Create `components/providers/MotionProvider.tsx`, STEP 14 — Create `lib/content.ts` (+14 more)

### Community 10 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 11 - "PRD.md — Product Requirements Document"
Cohesion: 0.10
Nodes (19): 1.1 What Is This, 1.2 Core Purpose, 1.3 Target Audience, 1. Product Overview, 2.1 Primary Goals, 2.2 Success Metrics (Post-Launch), 2. Goals and Success Metrics, 3. User Stories (+11 more)

### Community 12 - "Cloud Engineering & DevOps Roadmap"
Cohesion: 0.10
Nodes (19): Advanced CI/CD, Capstone Project, Cloud Engineering & DevOps Roadmap, Core Tech Stack, Guiding Principles, Monitoring & Observability, Month 11–13: Kubernetes, Month 1–2: Linux, Networking & Git (+11 more)

### Community 13 - "content.ts"
Cohesion: 0.12
Nodes (14): AvailabilityBadge, badgeVariants, Props, experience, Profile, Project, projects, skillCategories (+6 more)

### Community 14 - "useLoadingStore"
Cohesion: 0.17
Nodes (13): CRITICAL_FRAMES, LoadingScreen(), STATUS_STAGES, LenisContext, LenisProvider(), LenisProviderProps, RoadMap(), roadmapData (+5 more)

### Community 15 - "Hero.tsx"
Cohesion: 0.17
Nodes (12): useLenis(), ABOUT_STATS, ALL_SKILLS, getStatIcon(), Hero(), HERO_FRAMES, MobileLayout(), MobileLayoutProps (+4 more)

### Community 16 - "ProfileContent.md — Source Content (from github.com/Arghya-2007)"
Cohesion: 0.15
Nodes (12): 1. DD Tours & Travels, 1. Identity, 2. EquiLens — AI Bias Detector, 2. "Who Am I" (structured self-description, from his README), 3. AI Notes App, 3. Social / Contact Links, 4. Tech Stack (as listed on GitHub profile, grouped), 5. Projects (real, from pinned "ls ./projects" table) (+4 more)

### Community 17 - "layout.tsx"
Cohesion: 0.20
Nodes (8): inter, jetbrainsMono, metadata, spaceGrotesk, CustomCursorDynamic, CustomCursorWrapper(), MotionProvider(), MotionProviderProps

### Community 18 - "useMotionConfig.ts"
Cohesion: 0.29
Nodes (8): AnimationProvider(), AnimationProviderProps, NOTE: 'about' is NOT in this list. The #hero section now covers both, MotionConfig, AnimationStore, GPUTier, SectionId, useAnimationStore

### Community 19 - "VariableProximity.tsx"
Cohesion: 0.17
Nodes (5): dummyProjects, NOTE: IntersectionObserver for isProjectSectionInView is handled by ProjectWrapp, VariableProximity, VariableProximityProps, ProjectWrapper()

### Community 20 - "TechStack.tsx"
Cohesion: 0.29
Nodes (7): NAV_LINKS, Navbar(), CATEGORY_TABS, TechStack(), GlowOrb(), Props, useIsMobile()

### Community 21 - "page.tsx"
Cohesion: 0.22
Nodes (7): Hero, HomePage(), ProjectWrapper, RoadMap, TechStack, SECTION_IDS, useActiveSection()

### Community 22 - "SkillCard.tsx"
Cohesion: 0.29
Nodes (9): GlassButton(), BADGE_STYLES, PROFICIENCY_LEVELS, SkillCard(), SkillCardProps, getTechIcon(), TechChip(), Skill (+1 more)

### Community 23 - "GlassButton.tsx"
Cohesion: 0.22
Nodes (8): ghostHover, ghostTap, hoverStyles, primarySecondaryHover, primarySecondaryTap, Props, transitionConfig, variantStyles

### Community 24 - "CustomCursor.tsx"
Cohesion: 0.29
Nodes (6): ClickRipple, CursorMode, CustomCursor(), PARTICLE_COLORS, StardustParticle, SplashCursor()

### Community 25 - "useMotionConfig"
Cohesion: 0.32
Nodes (6): RoleCycler(), Props, SectionHeader(), TransitionWrapper(), TransitionWrapperProps, useMotionConfig()

### Community 26 - "dependencies"
Cohesion: 0.29
Nodes (7): clsx, detect-gpu, dependencies, clsx, detect-gpu, react, react

### Community 27 - "DotGrid.tsx"
Cohesion: 0.47
Nodes (5): Dot, DotGrid(), DotGridProps, hexToRgb(), throttle()

### Community 30 - "RotatingText.tsx"
Cohesion: 0.40
Nodes (3): RotatingText, RotatingTextProps, RotatingTextRef

### Community 33 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **333 isolated node(s):** `spaceGrotesk`, `inter`, `jetbrainsMono`, `metadata`, `Hero` (+328 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `framer-motion`, `gsap`, `@gsap/react`, `lenis`, `lucide-react`, `matter-js`, `motion`, `next`, `next-sitemap`, `ogl`, `postprocessing`, `react-dom`, `react-hook-form`, `resend`, `sheryjs`, `tailwind-merge`, `three`, `@types/three`, `@vercel/analytics`, `@vercel/speed-insights`, `zod`, `zustand`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **Why does `LenisProvider()` connect `useLoadingStore` to `layout.tsx`, `lenis`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `lenis` connect `lenis` to `dependencies`, `useLoadingStore`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **What connects `spaceGrotesk`, `inter`, `jetbrainsMono` to the rest of the system?**
  _333 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `.render` be split into smaller, more focused modules?**
  _Cohesion score 0.06994535519125683 - nodes in this community are weakly interconnected._
- **Should `Rules.md — Engineering Rules & Conventions` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._
- **Should `Design.md — Design System & Visual Specification` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._
# Graph Report - PORTFOLIO  (2026-08-05)

## Corpus Check
- 66 files · ~892,640 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 735 nodes · 984 edges · 68 communities (35 shown, 33 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.52)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8f4f3c51`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Ui Components
- Layout Components
- Rules Components
- Design Components
- Eslint Components
- Ref Components
- Features Components
- Architecture Components
- Agent Components
- Components Components
- Prd Components
- Roadmapcontent Components
- Phases Components
- Layout Components
- Profilecontent Components
- Layout Components
- Detect Components
- Ui Components
- Readme Components
- Clsx Components
- Layout Components
- Sections Components
- Eslint Components
- Framer Components
- Gsap Components
- Gsap Components
- Hooks Components
- Lucide Components
- Matter Components
- Motion Components
- Next Components
- Next Components
- Next Components
- Ogl Components
- Postprocessing Components
- React Components
- React Components
- Resend Components
- Sheryjs Components
- Tailwind Components
- Three Components
- Types Components
- Vercel Components
- Vercel Components
- Zod Components
- Zustand Components
- Postcss Components
- Tailwind Components
- App Module
- App Module
- Layout Module
- Providers Module
- Providers Module
- Providers Module
- Ui Module
- Ui Module
- Ui Module
- Ui Module
- Ui Module
- Ui Module
- Ui Module
- Ui Module
- Ui Module
- Ui Module
- Ui Module
- Wrappers Module
- Lib Module

## God Nodes (most connected - your core abstractions)
1. `X` - 24 edges
2. `🤖 AGENT PROMPT — Portfolio Project Initialization (Phase 0)` - 22 edges
3. `useMotionConfig()` - 20 edges
4. `useLoadingStore` - 19 edges
5. `compilerOptions` - 16 edges
6. `Phases.md — Development Phases & Milestones` - 14 edges
7. `useAnimationStore` - 12 edges
8. `Architecture & TechStack.md — Technical Architecture Document` - 12 edges
9. `Design.md — Design System & Visual Specification` - 12 edges
10. `Rules.md — Engineering Rules & Conventions` - 12 edges

## Surprising Connections (you probably didn't know these)
- `HomePage()` --calls--> `useLoadingStore`  [EXTRACTED]
  app/page.tsx → store/useLoadingStore.ts
- `ProjectWrapper()` --calls--> `useLoadingStore`  [EXTRACTED]
  components/Wrappers/ProjectWrapper.tsx → store/useLoadingStore.ts
- `TransitionWrapper()` --calls--> `useMotionConfig()`  [EXTRACTED]
  components/Wrappers/TransitionWrapper.tsx → hooks/useMotionConfig.ts
- `CustomCursor()` --calls--> `useMotionConfig()`  [EXTRACTED]
  components/layout/CustomCursor.tsx → hooks/useMotionConfig.ts
- `CustomCursor()` --calls--> `useLoadingStore`  [EXTRACTED]
  components/layout/CustomCursor.tsx → store/useLoadingStore.ts

## Import Cycles
- None detected.

## Communities (68 total, 33 thin omitted)

### Community 0 - "Ui Components"
Cohesion: 0.07
Nodes (15): getLocalPointerPos(), getMouseDistance(), getNewPosition(), ImageTrailConstructor, ImageTrailProps, ImageTrailVariant1, ImageTrailVariant2, ImageTrailVariant3 (+7 more)

### Community 1 - "Layout Components"
Cohesion: 0.22
Nodes (10): useLenis(), ABOUT_STATS, ALL_SKILLS, getStatIcon(), Hero(), HERO_FRAMES, MobileLayout(), MobileLayoutProps (+2 more)

### Community 2 - "Rules Components"
Cohesion: 0.05
Nodes (41): 10.1 When Creating New Files 🤖, 10.2 When Modifying Animations 🤖, 10.3 When Adding Content 🤖, 10.4 When Stuck 🤖, 10. Agent-Specific Rules (Antigravity Agent), 1.1 Absolute Rules 🔒, 1.2 Code Quality Rules 🤖 👤, 1. General Engineering Rules (+33 more)

### Community 3 - "Design Components"
Cohesion: 0.06
Nodes (33): 10. Cursor Design, 1. Design Philosophy, 2.1 Brand Palette, 2.2 Extended Surface System, 2.3 Gradients (Reusable), 2.4 Semantic Colors, 2. Color System, 3.1 Font Stack (+25 more)

### Community 4 - "Eslint Components"
Cohesion: 0.06
Nodes (33): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, raw-loader, sharp, tailwindcss (+25 more)

### Community 5 - "Ref Components"
Cohesion: 0.06
Nodes (30): components/layout/SplashCursor.jsx, components/ui/Backgrounds/Ballpit.tsx, dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts (+22 more)

### Community 6 - "Features Components"
Cohesion: 0.07
Nodes (28): Arghya's Developer Portfolio Website, F-001 · Full-Screen Hero Section 🔴, F-002 · Image Frame Scroll — Hero 🟠, F-003 · About Section — Split Layout 🟠, F-004 · Skills Section — Marquee + Cards 🟠, F-005 · Skill Category Cards 🟡, F-006 · Projects — Horizontal Scroll Panel 🟠, F-007 · Project Card — Hover Detail Overlay 🟡 (+20 more)

### Community 7 - "Architecture Components"
Cohesion: 0.07
Nodes (27): 10. Development Setup, 1.1 Core Framework, 1.2 Animation Stack, 1.3 UI Libraries, 1.4 State Management, 1.5 Forms and Communication, 1.6 Fonts, 1.7 Analytics and Monitoring (+19 more)

### Community 8 - "Agent Components"
Cohesion: 0.09
Nodes (22): 🤖 AGENT PROMPT — Portfolio Project Initialization (Phase 0), Context, Phase 0 Complete → Proceed to Phase 1, STEP 10 — Create `hooks/useMotionConfig.ts`, STEP 11 — Create `components/providers/AnimationProvider.tsx`, STEP 12 — Create `components/providers/LenisProvider.tsx`, STEP 13 — Create `components/providers/MotionProvider.tsx`, STEP 14 — Create `lib/content.ts` (+14 more)

### Community 9 - "Components Components"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 10 - "Prd Components"
Cohesion: 0.10
Nodes (19): 1.1 What Is This, 1.2 Core Purpose, 1.3 Target Audience, 1. Product Overview, 2.1 Primary Goals, 2.2 Success Metrics (Post-Launch), 2. Goals and Success Metrics, 3. User Stories (+11 more)

### Community 11 - "Roadmapcontent Components"
Cohesion: 0.10
Nodes (19): Advanced CI/CD, Capstone Project, Cloud Engineering & DevOps Roadmap, Core Tech Stack, Guiding Principles, Monitoring & Observability, Month 11–13: Kubernetes, Month 1–2: Linux, Networking & Git (+11 more)

### Community 12 - "Phases Components"
Cohesion: 0.08
Nodes (24): Arghya's Developer Portfolio Website, Milestone Summary, Overview, Phase 0 — Foundation, Phase 1 — Core Layout, Phase 2 — Hero Section, Phase 3 — About Section, Phase 4 — Skills Section (+16 more)

### Community 13 - "Layout Components"
Cohesion: 0.29
Nodes (8): CRITICAL_FRAMES, LoadingScreen(), STATUS_STAGES, ProjectWrapper(), ProjectWrapperContent, LoadingStatus, LoadingStore, useLoadingStore

### Community 14 - "Profilecontent Components"
Cohesion: 0.15
Nodes (12): 1. DD Tours & Travels, 1. Identity, 2. EquiLens — AI Bias Detector, 2. "Who Am I" (structured self-description, from his README), 3. AI Notes App, 3. Social / Contact Links, 4. Tech Stack (as listed on GitHub profile, grouped), 5. Projects (real, from pinned "ls ./projects" table) (+4 more)

### Community 15 - "Layout Components"
Cohesion: 0.29
Nodes (6): ClickRipple, CursorMode, CustomCursor(), PARTICLE_COLORS, StardustParticle, SplashCursor()

### Community 16 - "Detect Components"
Cohesion: 0.29
Nodes (7): detect-gpu, framer-motion, dependencies, detect-gpu, framer-motion, sheryjs, sheryjs

### Community 18 - "Readme Components"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 19 - "Clsx Components"
Cohesion: 0.10
Nodes (24): Ballpit(), BallpitProps, createBallpit(), CreateBallpitReturn, createPointerData(), isInside(), onPointerClick(), onPointerLeave() (+16 more)

### Community 20 - "Layout Components"
Cohesion: 0.12
Nodes (14): AvailabilityBadge, badgeVariants, Props, experience, Profile, Project, projects, skillCategories (+6 more)

### Community 21 - "Sections Components"
Cohesion: 0.14
Nodes (8): ContactForm(), FormData, formSchema, GitHubCalendar, GithubGraph(), SocialIcons(), socials, SVGProps

### Community 26 - "Hooks Components"
Cohesion: 0.36
Nodes (6): RoleCycler(), Props, SectionHeader(), MotionConfig, useMotionConfig(), GPUTier

### Community 48 - "App Module"
Cohesion: 0.20
Nodes (8): inter, jetbrainsMono, metadata, spaceGrotesk, CustomCursorDynamic, CustomCursorWrapper(), MotionProvider(), MotionProviderProps

### Community 49 - "App Module"
Cohesion: 0.22
Nodes (11): HomePage(), NAV_LINKS, Navbar(), AnimationProvider(), AnimationProviderProps, NOTE: 'about' is NOT in this list. The #hero section now covers both, SECTION_IDS, useActiveSection() (+3 more)

### Community 50 - "Layout Module"
Cohesion: 0.21
Nodes (7): CATEGORY_TABS, TechStack(), FocusRect, TrueFocusProps, GlowOrb(), Props, useIsMobile()

### Community 51 - "Providers Module"
Cohesion: 0.29
Nodes (9): GlassButton(), BADGE_STYLES, PROFICIENCY_LEVELS, SkillCard(), SkillCardProps, getTechIcon(), TechChip(), Skill (+1 more)

### Community 52 - "Providers Module"
Cohesion: 0.33
Nodes (5): LenisContext, LenisProvider(), LenisProviderProps, lenis, lenis

### Community 53 - "Providers Module"
Cohesion: 0.28
Nodes (6): RoadMap(), roadmapData, TextMarquee(), TextMarqueeProps, Aurora(), AuroraProps

### Community 54 - "Ui Module"
Cohesion: 0.40
Nodes (3): RotatingText, RotatingTextProps, RotatingTextRef

### Community 55 - "Ui Module"
Cohesion: 0.22
Nodes (8): ghostHover, ghostTap, hoverStyles, primarySecondaryHover, primarySecondaryTap, Props, transitionConfig, variantStyles

### Community 56 - "Ui Module"
Cohesion: 0.22
Nodes (5): dummyProjects, Projects, NOTE: IntersectionObserver for isProjectSectionInView is handled by ProjectWrapp, FallingTextProps, ItemData

### Community 58 - "Ui Module"
Cohesion: 0.47
Nodes (5): Dot, DotGrid(), DotGridProps, hexToRgb(), throttle()

### Community 60 - "Ui Module"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Why does useMotionConfig connect Layout Components to Layout Components?, Source Nodes

### Community 77 - "Wrappers Module"
Cohesion: 0.22
Nodes (8): Hero, ProjectWrapper, RoadMap, TechStack, ContactRevealWrapper(), ContactRevealWrapperProps, TransitionWrapper(), TransitionWrapperProps

## Knowledge Gaps
- **355 isolated node(s):** `resend`, `spaceGrotesk`, `inter`, `jetbrainsMono`, `metadata` (+350 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useLoadingStore` connect `Layout Components` to `Layout Components`, `Wrappers Module`, `Layout Components`, `App Module`, `Layout Module`, `Providers Module`, `Providers Module`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Detect Components` to `Eslint Components`, `Framer Components`, `Gsap Components`, `Gsap Components`, `Lucide Components`, `Matter Components`, `Motion Components`, `Next Components`, `Next Components`, `Ogl Components`, `Postprocessing Components`, `React Components`, `React Components`, `Resend Components`, `Tailwind Components`, `Three Components`, `Types Components`, `Vercel Components`, `Vercel Components`, `Zod Components`, `Zustand Components`, `Providers Module`, `Ui Module`, `Ui Module`, `Ui Module`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Why does `LenisProvider()` connect `Providers Module` to `App Module`, `Layout Components`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **What connects `resend`, `spaceGrotesk`, `inter` to the rest of the system?**
  _355 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Ui Components` be split into smaller, more focused modules?**
  _Cohesion score 0.06994535519125683 - nodes in this community are weakly interconnected._
- **Should `Rules Components` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._
- **Should `Design Components` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._
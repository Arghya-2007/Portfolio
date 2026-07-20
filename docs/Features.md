# Features.md — Feature Specifications by Section

## 1. Hero / Boot Sequence
- Full-viewport section with the primary R3F `HeroCore` (see `Design.md` §5) centered/off-center
- On load: short terminal-style typing animation (`const arghya = { ... }` style, echoing the GitHub README identity) before the headline fully reveals
- Headline + subheadline with GSAP stagger text reveal
- Animated background particle/gradient layer active behind the core
- CTA buttons: "View Projects" (scrolls to Projects) and "Get in Touch" (scrolls to Contact), styled as magnetic neomorphic buttons
- Scroll-indicator (small animated chevron/line) at the bottom
- On scroll-out: core rotates/scales/fades via scroll-linked GSAP tied to the shared scroll-progress store

## 2. About / `whoami`
- Glass panel with short bio, framed as a monospace `> whoami` block, echoing the GitHub README style
- Key facts as small badge/pill list: BCA student · Techno Main Salt Lake · Kolkata, India · Aspiring MLOps & AI Infra Engineer
- Subtle parallax on scroll (panel drifts slightly slower than background)
- Animated SVG trace connecting from Hero into this section

## 3. Tech Stack / "System Architecture"
- Animated node/network graph instead of a static logo grid — nodes for categories: Full Stack Web, Databases & Backend, Mobile & App Dev, System Design, Cloud/DevOps/AI Infra *(acquiring)*, Tools & Workflow
- Nodes connected by animated lines (GSAP-driven stroke reveal on scroll into view)
- Hover/tap a node → expands to show specific tools within that category (badges), using the neomorphic panel style
- Distinguish "acquiring" category visually (e.g. dashed/pulsing node) vs. established categories (solid, steady glow) — ties to the roadmap narrative

## 4. Projects / "Deployed Systems"
- Three project cards: **DD Tours & Travels**, **EquiLens**, **AI Notes App**
- Each card:
  - Status dot: green/`--status-live` for DD Tours and EquiLens, amber/`--status-progress` for AI Notes App
  - Terminal-style header: `> deploy <project-slug> --status=<live|in_progress>`
  - Stack shown as small glass pill badges (e.g. Next.js, PostgreSQL, AWS)
  - Short one-line description
  - Expand interaction (GSAP flip/scale) on click/hover to reveal full description + live link button
  - DD Tours card includes an optional mini SVG architecture diagram: Next.js frontend → Node API → PostgreSQL → AWS
- Cards have a subtle 3D tilt-on-hover (CSS 3D transform + GSAP, not full R3F, for performance)
- Grid responsive: 3-column desktop → 1-column mobile, stacked

## 5. Roadmap — 2024 → 2027 Timeline
- Horizontal scroll-jacked timeline (pinned section, GSAP ScrollTrigger) — vertical page scroll drives horizontal timeline movement
- Four stops: 2024 (Full Stack, Mobile, System Design — done), 2025 (Cloud Engineering, DevOps, IaC — in progress), 2026 (MLOps, AI Infra, Automation — target), 2027 (Deploy & scale AI systems in production — goal)
- Each stop is a glass card with a completion-state icon (checkmark / in-progress spinner-style icon / target icon)
- An animated line/trace draws itself along the timeline as the user scrolls, representing the "system being built over time"
- Falls back to a simple vertical stacked list (no scroll-jacking) when `prefers-reduced-motion` is set

## 6. Contact / `connect --with arghya`
- Glass panel with contact form (Name, Email, Message) — neomorphic input fields
- Form validated with React Hook Form + Zod, submits via the chosen form service
- Social links row: GitHub, LinkedIn, live project links — icon buttons with magnetic hover effect
- Closing quote from the GitHub README ("The best AI model is useless without solid infra behind it.") as a styled pull-quote element
- Success/error state for form submission shown inline (no page reload)

## 7. Global Features
- **Navbar:** glass, fixed/sticky, shrinks slightly on scroll (GSAP), smooth-scroll links to each section, active-section indicator synced to the shared scroll-progress store
- **Custom cursor** (optional, desktop only): small glowing dot that scales up over interactive elements — disabled on touch devices
- **Loading screen:** brief boot-sequence-style loader while initial assets/3D load, matching the Hero's terminal aesthetic
- **Footer:** minimal, repeats social links + a small "built with" credit line

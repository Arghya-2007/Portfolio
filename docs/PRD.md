# PRD.md — Product Requirements Document

## 1. Product
**Name:** DevArghya Portfolio ("Infra for Intelligence")
**Type:** Personal developer portfolio — single-page, scroll-driven, 3D-animated
**Owner:** Arghya Pal (DevArghya) — BCA student, aspiring MLOps & AI Infra Engineer

## 2. Purpose
A portfolio that does three jobs at once:
1. Proves frontend/animation skill (React + TS, GSAP, R3F) to recruiters and clients
2. Signals systems/infra thinking (not just "I made a website") through content and framing
3. Converts visitors into contacts — internship recruiters, freelance/dev clients, collaborators

## 3. Target Audience
- Tech recruiters / hiring managers screening for internships & entry roles
- Fellow developers / open-source collaborators
- Potential freelance/dev clients (via DD Tours-style project work)

## 4. Success Criteria
- Loads and is interactive in under ~3s on a mid-range laptop, under ~5s on mobile 4G
- Fully responsive: desktop, tablet, mobile — 3D scene must degrade gracefully, never break layout
- Lighthouse Performance ≥ 80 (mobile), Accessibility ≥ 90
- Clear path to: view live projects, read stack/roadmap, and contact (email/LinkedIn/GitHub) within 2 scrolls or clicks
- Feels distinct — not a recognizable template; achieved via the infra/system narrative + the custom color system in `Design.md`

## 5. Scope (v1)
**In scope:**
- Single-page site: Hero, About, Tech Stack, Projects, Roadmap, Contact
- One primary 3D hero centerpiece + light supporting 3D/SVG touches (see `Features.md`)
- GSAP scroll choreography (ScrollTrigger) across all sections
- Dark theme, glassmorphism + neomorphism per `Design.md`
- Animated background (shader/gradient or particle layer) + animated SVGs for section accents
- Fully responsive with a defined mobile 3D fallback

**Out of scope (v1):**
- Blog/CMS
- Multi-page routing (keep single-page; can revisit in v2)
- Auth/backend/database — this is a static/frontend-only site
- CMS-driven project data (projects are hardcoded/config-driven, not fetched)

## 6. Content Sections (mapped to Features.md)
1. Hero / Boot Sequence
2. About / `whoami`
3. Tech Stack / "System Architecture"
4. Projects / "Deployed Systems" — DD Tours & Travels, EquiLens, AI Notes App
5. Roadmap — 2024 → 2027 horizontal scroll-jacked timeline
6. Contact / `connect --with arghya`

## 7. Constraints
- Built and coded by the owner in the Antigravity IDE — these docs are planning/spec references for that coding agent, not a request for a third party to write the app
- Must run as a static deployable (Vercel-style hosting), no server-side requirements
- Must not compromise mobile usability for the sake of desktop 3D spectacle

## 8. Non-Functional Requirements
- Accessibility: respect `prefers-reduced-motion`, sufficient color contrast for all text over glass surfaces, keyboard-navigable nav and contact form
- Performance: lazy-load the R3F canvas, code-split heavy sections, compress/optimize any 3D assets and textures
- SEO: proper meta tags, OG image, semantic HTML structure despite the animated/SPA feel

## 9. Open Questions (resolve before/while building)
- Final hero 3D concept: distorted core vs. particle constellation vs. server-rack model (see `Design.md` §5)
- Whether the AI Notes App project card links anywhere yet (currently in progress / no live link)

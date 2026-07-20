# Techstack.md — Technology Stack

## Core
| Tech | Purpose |
|---|---|
| **React 18 + TypeScript** | Core UI framework, type safety |
| **Vite** | Build tool/dev server — fast HMR, good default for a static SPA (no need for Next.js since there's no routing/SSR requirement) |
| **Tailwind CSS** | Utility-first styling; design tokens from `Design.md` configured in `tailwind.config.ts` |

## Animation & 3D
| Tech | Purpose |
|---|---|
| **GSAP + ScrollTrigger** | Scroll-driven choreography — section reveals, pinned hero, horizontal roadmap timeline |
| **@react-three/fiber** | React renderer for Three.js — hero 3D core, supporting 3D elements |
| **@react-three/drei** | Helpers: `<Float>`, `<MeshDistortMaterial>`, `<Sparkles>`, `<Environment>`, `<Text3D>` |
| **@react-three/postprocessing** (optional, desktop-only) | Bloom/glow on the hero core for the soft-glow look — gate behind device-capability check |
| **react-bits** | Framework-agnostic animated components (text reveals, backgrounds) that pull in GSAP/Three only where needed — fits naturally alongside hand-rolled GSAP/R3F code |
| **Aceternity UI** (selectively) | 1–2 signature "wow" components only (e.g. spotlight or background-beams effect) — not used as the whole design system |

## UI System
| Tech | Purpose |
|---|---|
| **shadcn/ui** | Unstyled Radix-based primitives (dialog, button, input, tooltip) — fully restyled with the neomorphic/glass tokens, so the design stays custom |
| **Lucide React** | Icon set |
| **class-variance-authority + tailwind-merge** | Managing variant-based component styling cleanly (standard shadcn pairing) |

## State & Forms
| Tech | Purpose |
|---|---|
| **Zustand** | Lightweight shared state — scroll progress, active section, device/motion capability flags |
| **React Hook Form + Zod** | Contact form handling + validation |
| Formspree / Resend (or similar) | Contact form submission endpoint — no custom backend needed |

## Tooling
| Tech | Purpose |
|---|---|
| **ESLint + Prettier** | Code quality/formatting — rules detailed in `Rules.md` |
| **Vercel or Netlify** | Static hosting/deploy |

## Explicitly Not Used (v1)
- No Next.js (no SSR/routing need for a single-page site)
- No CMS/headless backend (content is static/config-driven)
- No Framer Motion as the primary animation engine (GSAP is primary; react-bits pulls it in only per-component where needed) — avoids running two animation libraries doing the same job for the same elements

# Architechture.md — Technical Architecture

## 1. High-Level Architecture
Static, client-rendered single-page app. No backend. All content (projects, roadmap, stack) is config-driven from local TypeScript data files, not fetched from an API. Contact form submits via a third-party form service (e.g. Formspree/Resend) or a simple `mailto:` fallback — no custom backend required for v1.

```
Browser
 └─ React + TypeScript SPA (Vite)
     ├─ Tailwind CSS (design tokens from Design.md)
     ├─ GSAP + ScrollTrigger (scroll choreography)
     ├─ React Three Fiber + drei (hero 3D scene, supporting 3D touches)
     ├─ Config-driven content (projects.ts, roadmap.ts, stack.ts)
     └─ Static deploy (Vercel / Netlify)
```

## 2. Folder Structure
```
src/
├── assets/              # SVGs, fonts, textures, images
├── components/
│   ├── layout/          # Navbar, Footer, Section wrapper
│   ├── ui/               # shadcn-based primitives (Button, Card, Input, Badge)
│   ├── glass/            # Reusable glassmorphic components
│   ├── neo/               # Reusable neomorphic components (buttons, inputs)
│   ├── sections/         # Hero, About, TechStack, Projects, Roadmap, Contact
│   └── three/             # R3F scene, HeroCore, ParticleField, CameraRig
├── content/              # projects.ts, roadmap.ts, stack.ts, socials.ts (typed data)
├── hooks/                # useScrollTrigger, useReducedMotion, useMagneticButton
├── lib/                  # gsap setup/plugins registration, utils, cn()
├── styles/               # globals.css, tailwind design tokens
├── types/                # shared TS types (Project, RoadmapItem, StackNode)
└── App.tsx
```

## 3. Component Architecture
- **Section components** (`sections/*.tsx`) are the top-level building blocks; each owns its own GSAP `ScrollTrigger` setup via a `useLayoutEffect` + cleanup pattern (GSAP context, always revert on unmount).
- **`three/` is isolated**: the R3F `<Canvas>` lives in its own component tree, communicates with the rest of the app only through a small shared state (e.g. Zustand store or React context) for things like "current active section" or "scroll progress" — never prop-drill DOM scroll state deep into the 3D tree.
- **UI primitives** (`components/ui`) come from shadcn/ui, restyled with the neomorphic/glass tokens — do not fork/theme entire component libraries wholesale; keep primitives thin and owned.

## 4. State Management
No global app state library needed beyond:
- **Zustand** (or React Context if preferred) for cross-cutting UI state: active section, scroll progress (0–1) for the 3D scene to react to, reduced-motion flag, mobile/desktop 3D-quality flag.
- Content (projects, stack, roadmap) is static typed data, not state.

## 5. 3D Scene Architecture
- Single `<Canvas>` mounted once (not per-section) and made `position: fixed` behind the scroll content, OR mounted only within the Hero section depending on final design decision in `Design.md` §5 — pick one and stay consistent to avoid GPU context churn.
- `HeroCore` component: geometry + `MeshDistortMaterial`, wrapped in `<Float>`, driven by scroll progress from the shared store (rotate/scale/opacity as user scrolls past hero).
- `ParticleField`/background layer: separate lightweight component, can run on a simpler shader or `<Points>` — must be togglable off entirely on low-end/mobile devices.
- Use `<Suspense>` + a lightweight fallback (skeleton or static gradient) while 3D assets load.
- Dispose of geometries/materials on unmount; avoid creating new Three.js objects inside the render loop.

## 6. Animation Architecture
- Register GSAP plugins (`ScrollTrigger`, and `SplitText`/text-reveal plugin of choice) once in `lib/gsap.ts`.
- Each section's ScrollTrigger instances are scoped with `gsap.context()` tied to that component's ref, reverted on unmount — critical for a SPA to avoid trigger leaks on re-render.
- The horizontal-scroll roadmap timeline uses a single dedicated ScrollTrigger with `pin: true` and a horizontal tween — isolate this in its own component (`sections/Roadmap.tsx`) since it's the most complex animation in the app.
- Animated SVGs (circuit-trace connectors) use stroke-dashoffset reveal driven by `ScrollTrigger` `scrub`, kept in `components/` as small reusable `<AnimatedTrace />` components taking a path + trigger ref.

## 7. Performance Strategy
- Code-split the `three/` tree with `React.lazy` + `Suspense` so the 3D bundle doesn't block first paint of text content.
- Detect device capability (basic heuristic: `navigator.hardwareConcurrency`, viewport width, or a quick FPS probe) to decide "full 3D," "lite 3D" (simpler geometry, no post-processing), or "static fallback" (CSS gradient/SVG only, no canvas).
- Respect `prefers-reduced-motion` at the architecture level: a single hook (`useReducedMotion`) gates both GSAP scroll-jacking and 3D auto-motion.
- Compress/optimize any imported models or textures (glTF + Draco if a model is used instead of procedural geometry).

## 8. Deployment
- Vite build → static output → deploy to Vercel or Netlify.
- Environment: no secrets needed for v1 beyond the contact-form service's public key/endpoint (kept in `.env`, not committed).

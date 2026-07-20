# Rules.md — Coding Agent Rules & Conventions

These are binding conventions for any code generated for this project (by the Antigravity agent or otherwise). Read alongside `Architechture.md` and `Design.md` before generating code.

## 1. General Principles
- Prefer editing/extending existing components over creating near-duplicates. Check `components/` before adding a new one.
- No inline magic numbers for color/spacing — always use Tailwind tokens/theme values defined from `Design.md`, never raw hex codes inline in components.
- No placeholder "Lorem ipsum" left in committed code — use real content from `content/*.ts` or clearly marked `// TODO(content)`.
- Every new component gets a TypeScript interface/type for its props — no untyped `any` props.

## 2. Naming Conventions
- Components: `PascalCase.tsx` (e.g. `ProjectCard.tsx`)
- Hooks: `useCamelCase.ts` (e.g. `useScrollProgress.ts`)
- Content/data files: `camelCase.ts` (e.g. `projects.ts`)
- CSS/Tailwind custom classes (if any beyond utilities): `kebab-case`

## 3. File Structure Rules
- One component per file. Co-locate small sub-components only if they are never reused elsewhere and are under ~30 lines.
- `three/` components never import directly from `sections/` — communication happens only through the shared store (Zustand) per `Architechture.md` §4.
- Content data (`projects.ts`, `roadmap.ts`, `stack.ts`) must be typed against interfaces in `types/`.

## 4. GSAP Rules
- Always wrap GSAP animations tied to a component in `gsap.context()` scoped to a ref, and always `.revert()` in the cleanup function of `useLayoutEffect`/`useEffect`. Untracked ScrollTriggers on a SPA cause memory leaks and duplicate triggers on re-render.
- Never hardcode animation durations/eases ad hoc across files — define a small shared set of durations/eases (per `Design.md` §7) in `lib/gsap.ts` and reuse.
- All scroll-jacking (pinning, horizontal scroll) must check `useReducedMotion` first and fall back to a simple non-jacked layout if true.

## 5. React Three Fiber Rules
- Never create new `THREE.*` objects (geometries, materials) inside the render/frame loop — memoize with `useMemo` or create once outside the component render path.
- Always dispose geometries/materials on unmount where R3F doesn't already handle it automatically.
- All 3D components must have a lightweight fallback rendered during `<Suspense>` loading — never a blank screen.
- Any new 3D element must be gated by the device-capability flag from the shared store before being added to the scene graph — don't add unconditional heavy 3D elements.

## 6. Styling Rules
- Glassmorphism and neomorphism must never be combined on the same DOM element (see `Design.md` §4) — if a component needs both contexts, split it into a glass wrapper containing neo internals, not blended styles.
- All interactive elements (buttons, links, form fields) must have visible focus states, not just hover states.
- Mobile-first: write base Tailwind classes for mobile, layer `md:`/`lg:` overrides for larger screens — do not write desktop-first and retrofit mobile.

## 7. Performance Rules
- Any image/texture asset must be compressed and served in a modern format (WebP/AVIF) with explicit width/height to avoid layout shift.
- Lazy-load anything below the fold that isn't needed for first paint (the 3D canvas, later sections' heavy assets).
- No animation library duplication: GSAP is the primary engine; if a borrowed component (react-bits/Aceternity) bundles its own animation dependency, confirm it doesn't conflict with or duplicate GSAP-driven motion on the same element.

## 8. Accessibility Rules
- Respect `prefers-reduced-motion` everywhere motion is added (GSAP and R3F both).
- Maintain WCAG AA contrast for text over glass/gradient backgrounds — test actual rendered contrast, not just token values in isolation.
- All interactive 3D elements (if any become clickable) must have an equivalent non-3D way to reach the same action (don't lock any functionality behind 3D-only interaction).

## 9. Git/Commit Conventions
- Conventional commits: `feat:`, `fix:`, `style:`, `perf:`, `refactor:`, `chore:`
- One phase (from `Phases.md`) roughly maps to one feature branch/PR where practical.

## 10. What Not To Do
- Don't introduce a second animation library that overlaps GSAP's job (e.g. don't add Framer Motion project-wide just because one borrowed component uses it internally).
- Don't hardcode the color palette anywhere outside the Tailwind config/theme tokens.
- Don't ship the full-fidelity 3D scene unconditionally to mobile — always check the capability flag first.
- Don't add global state for content that's actually static — keep `content/*.ts` as plain typed data, not store state.

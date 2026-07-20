# Design.md — Visual & Interaction Design System

## 1. Design Philosophy
Dark, warm, soft-glowing "living infrastructure" — not the typical neon cyan/violet "AI startup" look. Warmth + softness comes from a **sage-green / terracotta duotone** on a warm (not blue-tinted) near-black base, with all glows and gradients kept low-saturation and diffused rather than harsh neon.

## 2. Color System

### Base
| Token | Hex | Use |
|---|---|---|
| `--bg-base` | `#100F0D` | Page background (warm near-black, not blue-black) |
| `--bg-elevated` | `#171512` | Section backgrounds, slightly lifted panels |
| `--surface-glass` | `rgba(247, 240, 227, 0.05)` | Glass panel fill |
| `--border-glass` | `rgba(247, 240, 227, 0.10)` | Glass panel border (1px) |

### Primary — Sage
| Token | Hex | Use |
|---|---|---|
| `--primary-500` | `#8FBFA3` | Primary accent — links, active states, glow |
| `--primary-300` | `#B7D9C4` | Hover/lighter variant |
| `--primary-700` | `#5C8C71` | Pressed/darker variant, shadows |

### Secondary — Clay
| Token | Hex | Use |
|---|---|---|
| `--secondary-500` | `#E0937A` | CTA buttons, highlights, "live" status glow |
| `--secondary-300` | `#EDB6A2` | Hover variant |
| `--secondary-700` | `#A9654F` | Pressed variant |

### Text
| Token | Hex | Use |
|---|---|---|
| `--text-primary` | `#F2EDE4` | Headings, primary copy (warm off-white, not pure white) |
| `--text-secondary` | `#B8B2A6` | Body copy, muted labels |
| `--text-tertiary` | `#78736A` | Captions, timestamps, disabled |

### Status
| Token | Hex | Use |
|---|---|---|
| `--status-live` | `#8FBFA3` | "Live" project indicator (reuses primary) |
| `--status-progress` | `#E0C27A` | "In progress" indicator — soft amber, not saturated yellow |

**Gradients** (always soft, diffused, never a hard neon stop):
- Hero glow: `radial-gradient(circle at 50% 40%, rgba(143,191,163,0.18), transparent 60%)`
- Section divider wash: `linear-gradient(180deg, transparent, rgba(224,147,122,0.06), transparent)`

**Rule:** never use pure saturated purple/violet/electric-cyan as a primary — that combination is what makes portfolios read as "default AI theme." Sage + clay + warm off-black is the whole differentiator; keep it consistent everywhere, including the 3D scene's material colors and particle colors.

## 3. Typography
- **Headings:** Space Grotesk or Clash Display — geometric, confident, slightly technical
- **Body:** Inter or General Sans — clean, highly legible at small sizes
- **Monospace (terminal/code UI, stats, badges):** JetBrains Mono or Geist Mono — used for the `who am i`, `> deploy`, `ls ./projects` style headers that carry over from the GitHub README identity

Scale (desktop): H1 64–80px / H2 40–48px / H3 28–32px / Body 16–18px / Mono labels 13–14px. Reduce roughly 30–40% on mobile, never below 15px for body text.

## 4. Glassmorphism vs. Neomorphism — Where Each Applies
Do not mix on the same element.

**Glassmorphism** (floating over the 3D/gradient background):
- `background: var(--surface-glass)`
- `backdrop-filter: blur(20px)`
- `border: 1px solid var(--border-glass)`
- `border-radius: 20–24px`
- Used for: navbar, project cards, modals/expanded project view, contact panel

**Neomorphism** (embedded in a flat surface, `--bg-elevated`):
- `box-shadow: 6px 6px 16px rgba(0,0,0,0.5), -6px -6px 16px rgba(255,255,255,0.02)`
- Flat, no border, soft dual shadow
- Used for: buttons, form inputs, toggle switches, the tech-stack "node" panels

## 5. The 3D Hero Concept
Primary choice: a **distorted, slowly-breathing icosahedron/torus-knot "core"** in `--primary-500` wireframe over a translucent `--secondary-500` inner glow, floating with `<Float>` idle motion, reacting subtly to cursor position. This reads as "system core" without being a literal, clichéd sci-fi object.

Fallback/alt concept if the above feels too abstract: a low-poly floating "server rack" model rotating slowly, lit with the same two-tone palette.

## 6. Animated Backgrounds & SVGs
- **Background layer:** a slow, large-scale animated gradient mesh or soft particle field behind all sections, built with either an R3F `<Points>`/shader plane or a lightweight CSS/SVG animated gradient for lower-end devices. Movement should be slow and ambient (data flowing, not flashy) — GSAP drives drift/parallax tied to scroll position, not constant fast motion.
- **Animated SVGs:** hand-drawn line-art icons (circuit traces, node/network lines, a subtle "pipe" connecting sections) animated with GSAP `DrawSVG`-style stroke reveals on scroll into view. Use these for section dividers and to visually connect Hero → About → Stack → Projects → Roadmap → Contact, reinforcing the "one connected system" narrative.
- Keep all ambient background animation at low opacity/contrast so it never competes with foreground text for attention.

## 7. Motion Principles
- Section content reveals: 0.4–0.8s, ease `power3.out`
- Hover/micro-interactions: 0.15–0.3s
- Scroll-pinned/scroll-jacked sequences (hero, roadmap timeline): duration driven by scroll distance, not fixed time
- Respect `prefers-reduced-motion`: disable parallax/scroll-jacking and large 3D motion, keep only simple fades

## 8. Imagery / Iconography
- No stock photography. Use custom line-art SVGs, generated 3D renders, and code/terminal-styled visuals only — this keeps the "infra" identity consistent instead of looking like a generic template with default AI-gradient blobs.
- Icons: Lucide React, recolored to `--text-secondary` at rest, `--primary-500` on hover/active.

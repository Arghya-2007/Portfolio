# PRD.md — Product Requirements Document
## Arghya's Developer Portfolio Website

**Version:** 1.0  
**Status:** Pre-Development  
**Owner:** Arghya (arghya@[domain])  
**Last Updated:** 2026-08-01

---

## 1. Product Overview

### 1.1 What Is This

A personal developer portfolio website for Arghya — a BCA-H student at TMSL with strong full-stack and cloud engineering skills. The site is a premium, animated, dark-themed single-page application that showcases projects, skills, and experience to recruiters, collaborators, and the developer community.

This is not a generic portfolio. It is a statement — engineered to feel as impressive as the work it represents.

### 1.2 Core Purpose

- Establish a strong professional online presence
- Showcase flagship project EquiLens as primary portfolio asset
- Signal competence in modern frontend engineering through the site itself
- Act as a living CV that can be shared with recruiters and companies
- Target: Cloud Engineering, DevOps, and Full-Stack Software Engineering roles

### 1.3 Target Audience

| Audience | Primary Need | What They Judge |
|---|---|---|
| Tech Recruiters | Quick skill/project scan | Clarity, professional polish |
| Hiring Engineers | Depth of technical work | Code quality, architecture thinking |
| Startup Founders | "Can this person ship?" | Projects, stack, availability |
| Open Source / Community | Collaboration potential | GitHub links, personality |
| University Faculty / Peers | Academic + industry balance | Projects, skills, originality |

---

## 2. Goals and Success Metrics

### 2.1 Primary Goals

- **G1:** Recruiter can identify Arghya's core stack and top project within 10 seconds of landing
- **G2:** Site loads and is interactive in under 2.5s on a mid-range Android device (3G)
- **G3:** Contact form is functional and message reaches Arghya within 60 seconds of submission
- **G4:** Portfolio passes Google Lighthouse at ≥ 90 Performance, ≥ 95 Accessibility, ≥ 95 SEO
- **G5:** All animations degrade gracefully on low-GPU devices and prefers-reduced-motion

### 2.2 Success Metrics (Post-Launch)

| Metric | Target |
|---|---|
| Time on site (avg) | > 90 seconds |
| Bounce rate | < 50% |
| Contact form submissions | > 2/month |
| Mobile usability score | 100/100 |
| Resume download clicks | Track via analytics event |

---

## 3. User Stories

### Recruiter
- As a recruiter, I want to see Arghya's name, role, and top skills within the first viewport so I can decide if he matches my requirements in under 10 seconds.
- As a recruiter, I want a downloadable PDF CV link so I can save it to my ATS immediately.
- As a recruiter, I want to see whether Arghya is currently available for work without having to contact him.

### Hiring Engineer
- As a hiring engineer, I want to read about EquiLens — what problem it solves, what architecture it uses, and what Arghya's specific contributions were.
- As a hiring engineer, I want to see the GitHub repo link and a live demo for any project listed.
- As a hiring engineer, I want to understand Arghya's full stack depth, not just a list of logos.

### General Visitor
- As a visitor, I want the site to feel fast, beautiful, and responsive regardless of my device.
- As a visitor with motion sensitivity, I want the site to respect my system's reduced-motion preference and still look polished.
- As a visitor, I want to be able to contact Arghya through a form without leaving the site.

---

## 4. Scope

### 4.1 In Scope

- Single-page application with 6 sections: Hero, About, Skills, Projects, Experience, Contact
- Full GSAP scroll animation system (image frame scroll, horizontal scroll, SplitText, DrawSVG)
- Framer Motion component-level animations (whileInView, hover, layout)
- Lenis smooth scroll integration
- GPU tier detection and three-tier animation fallback
- prefers-reduced-motion support
- Glass morphism UI design system
- Responsive design: mobile (375px), tablet (768px), desktop (1280px+)
- SEO metadata, OG tags, favicon, sitemap
- Functional contact form (email delivery)
- Resume PDF download
- Google Analytics / Vercel Analytics integration

### 4.2 Out of Scope (v1)

- Blog / writing section
- Admin CMS for content editing
- Multi-language (i18n)
- Dark/light mode toggle (dark only, v1)
- Authentication of any kind
- Backend API (contact form uses third-party service)

### 4.3 Future Scope (v2+)

- Blog powered by MDX
- Case study deep-dive pages for each project
- Achievements / certifications section (post GCP cert)
- Interactive 3D elements (Three.js) if GPU budget allows

---

## 5. Constraints and Non-Negotiables

- **Performance is a feature.** No animation or visual effect is worth a Lighthouse score below 85.
- **Accessibility is mandatory.** All interactive elements are keyboard navigable. Color contrast meets WCAG AA.
- **Mobile is not an afterthought.** Every section is designed mobile-first. Animations are simplified on mobile, not broken.
- **No heavy 3D libraries (Three.js, R3F) in v1.** GPU budget is reserved for GSAP and image sequences.
- **All images are WebP, all assets are optimized before commit.** No raw PNG/JPEG in the repo.
- **Contact form must never expose a raw email address in the client bundle.**

---

## 6. Platform and Deployment

| Item | Decision |
|---|---|
| Hosting | Vercel (free tier, auto-deploy from GitHub) |
| Domain | Custom domain (arghya.[tld]) |
| CI/CD | Vercel GitHub integration (push to main = deploy) |
| Environment Vars | Vercel dashboard (never committed) |
| CDN | Vercel Edge Network (built-in) |
| Image Optimization | Next.js `<Image>` component + WebP conversion |
| Analytics | Vercel Analytics (built-in, privacy-friendly) |

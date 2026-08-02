/**
 * lib/content.ts — Single source of truth for all portfolio content.
 *
 * All content is typed and exported from here.
 * Components import from this file ONLY — never from ProfileContent.md directly.
 *
 * Update ProfileContent.md → update the values in this file to match.
 * Types must always stay in sync with actual data.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Profile {
  name: string
  firstName: string
  roles: string[]           // Role tag cycling list (Hero section)
  tagline: string           // One-liner under roles
  bio: string[]             // About section paragraphs (array of paragraph strings)
  location: string
  availability: boolean
  avatarSrc: string         // Path to /public/images/avatar.webp
  cvSrc: string             // Path to /public/cv-arghya.pdf
}

export interface Stat {
  label: string
  value: number
  suffix: string            // e.g. '+', 'K+', '%'
}

export interface SkillCategory {
  id: string
  label: string             // 'Frontend', 'Backend & Cloud', etc.
  skills: Skill[]
}

export interface Skill {
  name: string
  iconSrc?: string          // Optional SVG path in /public/icons/
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface Project {
  id: string
  title: string
  shortDescription: string  // Max 120 chars — card display
  fullDescription: string   // Full overlay description
  techStack: string[]
  imageSrc: string          // /public/images/projects/
  videoSrc?: string         // Optional .mp4 for hover preview
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  impact?: string           // Optional metric/impact statement
}

export interface TimelineEntry {
  id: string
  type: 'education' | 'project' | 'work' | 'certification'
  role: string
  organization: string
  dateRange: string
  location?: string
  bullets: string[]
}

export interface SocialLinks {
  github: string
  linkedin: string
  twitter?: string
  email: string
}

// ─── Content ─────────────────────────────────────────────────────────────────
// REPLACE ALL VALUES BELOW with actual content from ProfileContent.md

export const profile: Profile = {
  name:         'Arghya Pal',
  firstName:    'Arghya',
  roles:        [
    'Full Stack Engineer',
    'Cloud Engineer',
    'DevOps Enthusiast',
    'Backend Architect',
    'Machine Learning Enthusiast',
    'Open Source Contributor',
  ],
  tagline:      'Building Scalable, Cloud-Native Applications.',
  bio:          ['As a Full Stack Engineer & Cloud Enthusiast, I combine robust backend architecture with scalable cloud infrastructure to deliver seamless, enterprise-grade applications. I have a strong focus on building clean, maintainable code and leveraging the latest technologies to solve complex problems. My expertise spans across the full development lifecycle, from initial concept and design to deployment and optimization. I am passionate about continuous learning and constantly exploring new tools and techniques to enhance my skills and deliver exceptional results. '],
  location:     'Kolkata, India',
  availability: true,
  avatarSrc:    '/images/avatar.webp',
  cvSrc:        '/cv-arghya.pdf',
}

export const stats: Stat[] = [
  { label: 'Projects Shipped', value: 3,  suffix: '+' },
  { label: 'Technologies',     value: 15, suffix: '+' },
  { label: 'Years Learning',   value: 2,  suffix: '+' },
  { label: 'Open Source Contributions', value: 2,  suffix: '+' },
  { label: 'Certifications', value: 2,  suffix: '+' },
  // Fill from ProfileContent.md
]

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      // Fill from ProfileContent.md
    ],
  },
  {
    id: 'backend',
    label: 'Backend & Cloud',
    skills: [
      { name: 'Node.js' },
      { name: 'NestJS' },
      { name: 'PostgreSQL' },
      { name: 'Firebase' },
      // Fill from ProfileContent.md
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Tools',
    skills: [
      { name: 'GCP Cloud Run' },
      { name: 'Docker' },
      { name: 'Python' },
      // Fill from ProfileContent.md
    ],
  },
]

export const projects: Project[] = [
  {
    id: 'equilens',
    title: 'EquiLens',
    shortDescription: 'AI bias detection and mitigation platform for HR hiring datasets.',
    fullDescription:  '', // Fill from ProfileContent.md
    techStack:  ['NestJS', 'Python', 'Firebase', 'GCP Cloud Run', 'ML'],
    imageSrc:   '/images/projects/equilens.webp',
    githubUrl:  '', // Fill from ProfileContent.md
    liveUrl:    '', // Fill from ProfileContent.md
    featured:   true,
    impact:     '', // Fill from ProfileContent.md (audit metrics)
  },
  // Add remaining projects from ProfileContent.md
]

export const experience: TimelineEntry[] = [
  {
    id: 'tmsl',
    type: 'education',
    role: 'BCA-H Student',
    organization: 'Techno Main Salt Lake (TMSL)',
    dateRange: '2024 — Present',
    location: 'Kolkata, India',
    bullets: [
      '', // Fill from ProfileContent.md
    ],
  },
  {
    id: 'equilens-build',
    type: 'project',
    role: 'Founder & Lead Engineer',
    organization: 'EquiLens',
    dateRange: '2025 — Present',
    bullets: [
      '', // Fill from ProfileContent.md
    ],
  },
  // Add remaining entries from ProfileContent.md
]

export const social: SocialLinks = {
  github:   'https://github.com/Arghya-2007', // Fill from ProfileContent.md
  linkedin: 'https://www.linkedin.com/in/arghya-pal-87a8b6299/', // Fill from ProfileContent.md
  twitter:  'https://twitter.com/ArghyaPal_07', // Fill from ProfileContent.md (optional)
  email:    '[EMAIL_ADDRESS]', // Fill from ProfileContent.md — DO NOT use raw email in components
}

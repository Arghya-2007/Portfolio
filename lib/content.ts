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
  label: string             // 'Frontend & UI', 'Databases & Backend', etc.
  skills: Skill[]
}

export interface Skill {
  name: string
  brandColor: string        // Hex color for dynamic glows & accents
  category: string          // Category id
  iconSrc?: string          // Optional SVG path in /public/icons/
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  role?: string             // Short architectural role summary
  badge?: 'Core' | 'Production' | 'Cloud-Native' | 'Acquiring' | 'Specialized'
  featured?: boolean        // Included in primary 3D bento grid
  description?: string      // Extended description
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
  name: 'Arghya Pal',
  firstName: 'Arghya',
  roles: [
    'Full Stack Engineer',
    'Cloud Engineer',
    'DevOps Enthusiast',
    'Backend Architect',
    'Machine Learning Enthusiast',
    'Open Source Contributor',
  ],
  tagline: 'Building Scalable, Cloud-Native Applications.',
  bio: ['As a Full Stack Engineer & Cloud Enthusiast, I combine robust backend architecture with scalable cloud infrastructure to deliver seamless, enterprise-grade applications. I have a strong focus on building clean, maintainable code and leveraging the latest technologies to solve complex problems. My expertise spans across the full development lifecycle, from initial concept and design to deployment and optimization. I am passionate about continuous learning and constantly exploring new tools and techniques to enhance my skills and deliver exceptional results. '],
  location: 'Kolkata, India',
  availability: true,
  avatarSrc: '/images/avatar.webp',
  cvSrc: '/cv-arghya.pdf',
}

export const stats: Stat[] = [
  { label: 'Projects Shipped', value: 3, suffix: '+' },
  { label: 'Technologies', value: 25, suffix: '+' },
  { label: 'Years Experience', value: 2, suffix: '+' },
  { label: 'Open Source', value: 2, suffix: '+' },
  { label: 'Certifications', value: 2, suffix: '+' },
]

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend & UI',
    skills: [
      {
        name: 'React',
        brandColor: '#61DAFB',
        category: 'frontend',
        proficiency: 'expert',
        role: 'Component architecture, state engines & reactive UI systems',
        badge: 'Core',
        featured: true,
      },
      {
        name: 'Next.js',
        brandColor: '#FFFFFF',
        category: 'frontend',
        proficiency: 'expert',
        role: 'Server components, edge rendering & hybrid SSR/SSG pipelines',
        badge: 'Core',
        featured: true,
      },
      {
        name: 'TypeScript',
        brandColor: '#3178C6',
        category: 'frontend',
        proficiency: 'expert',
        role: 'Strict static type safety, generics & compile-time correctness',
        badge: 'Core',
        featured: true,
      },
      {
        name: 'Tailwind CSS',
        brandColor: '#38BDF8',
        category: 'frontend',
        proficiency: 'expert',
        role: 'Design token systems, responsive utility architecture & dark modes',
        badge: 'Core',
        featured: true,
      },
      {
        name: 'JavaScript',
        brandColor: '#F7DF1E',
        category: 'frontend',
        proficiency: 'expert',
        role: 'Modern ESNext semantics, asynchronous patterns & DOM APIs',
        badge: 'Production',
      },
      {
        name: 'HTML5 / CSS3',
        brandColor: '#E34F26',
        category: 'frontend',
        proficiency: 'expert',
        role: 'Semantic structure, CSS grid, flexbox & kinetic animations',
        badge: 'Production',
      },
      {
        name: 'REST API',
        brandColor: '#2A9D8F',
        category: 'frontend',
        proficiency: 'advanced',
        role: 'Contract-driven HTTP APIs, client caching & JSON schemas',
        badge: 'Core',
      },
      {
        name: 'Postman',
        brandColor: '#FF6C37',
        category: 'frontend',
        proficiency: 'advanced',
        role: 'Automated endpoint testing, environment mockups & API specs',
        badge: 'Production',
      },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & APIs',
    skills: [
      {
        name: 'Node.js',
        brandColor: '#5FA04E',
        category: 'backend',
        proficiency: 'expert',
        role: 'High-throughput event loops, worker threads & microservice runtimes',
        badge: 'Core',
        featured: true,
      },
      {
        name: 'NestJS',
        brandColor: '#E0234E',
        category: 'backend',
        proficiency: 'expert',
        role: 'Modular DI architectures, interceptors, guards & enterprise services',
        badge: 'Core',
        featured: true,
      },
      {
        name: 'Express.js',
        brandColor: '#F0F4F5',
        category: 'backend',
        proficiency: 'advanced',
        role: 'Lightweight middleware pipelines & micro-routing services',
        badge: 'Production',
      },
      {
        name: 'Python',
        brandColor: '#3776AB',
        category: 'backend',
        proficiency: 'advanced',
        role: 'Data processing pipelines, machine learning scripts & API backends',
        badge: 'Core',
        featured: true,
      },
      {
        name: 'Microservices',
        brandColor: '#F4A261',
        category: 'backend',
        proficiency: 'advanced',
        role: 'Decoupled domain-driven services, API gateways & service discovery',
        badge: 'Core',
      },
      {
        name: 'WebSockets',
        brandColor: '#E9C46A',
        category: 'backend',
        proficiency: 'advanced',
        role: 'Full-duplex real-time communication & live bidirectional events',
        badge: 'Production',
      },
    ],
  },
  {
    id: 'databases',
    label: 'Databases & Storage',
    skills: [
      {
        name: 'PostgreSQL',
        brandColor: '#4169E1',
        category: 'databases',
        proficiency: 'expert',
        role: 'Relational modeling, indexing strategies & ACID transactions',
        badge: 'Core',
        featured: true,
      },
      {
        name: 'Redis',
        brandColor: '#DC382D',
        category: 'databases',
        proficiency: 'advanced',
        role: 'Low-latency in-memory caching, rate limiters & pub/sub messaging',
        badge: 'Core',
        featured: true,
      },
      {
        name: 'MongoDB',
        brandColor: '#47A248',
        category: 'databases',
        proficiency: 'advanced',
        role: 'Document-oriented schemas, aggregation pipelines & replica sets',
        badge: 'Production',
      },
      {
        name: 'Supabase',
        brandColor: '#3ECF8E',
        category: 'databases',
        proficiency: 'advanced',
        role: 'Row-level security, realtime databases & serverless edge storage',
        badge: 'Production',
        featured: true,
      },
      {
        name: 'Prisma',
        brandColor: '#2D3748',
        category: 'databases',
        proficiency: 'advanced',
        role: 'Type-safe query generation, schema migrations & connection pooling',
        badge: 'Production',
      },
    ],
  },
  {
    id: 'cloud-devops',
    label: 'Cloud · DevOps · AI Infra',
    skills: [
      {
        name: 'Docker',
        brandColor: '#2496ED',
        category: 'cloud-devops',
        proficiency: 'expert',
        role: 'Multi-stage builds, lightweight images & container lifecycle',
        badge: 'Core',
        featured: true,
      },
      {
        name: 'Kubernetes',
        brandColor: '#326CE5',
        category: 'cloud-devops',
        proficiency: 'intermediate',
        role: 'Declarative cluster deployments, autoscaling & service mesh',
        badge: 'Cloud-Native',
        featured: true,
      },
      {
        name: 'GCP Cloud Run',
        brandColor: '#4285F4',
        category: 'cloud-devops',
        proficiency: 'advanced',
        role: 'Serverless container deployments, auto-scaling & Cloud IAM',
        badge: 'Cloud-Native',
        featured: true,
      },
      {
        name: 'AWS',
        brandColor: '#FF9900',
        category: 'cloud-devops',
        proficiency: 'intermediate',
        role: 'EC2 compute, S3 storage, CloudFront CDN & IAM policies',
        badge: 'Cloud-Native',
        featured: true,
      },
      {
        name: 'Terraform',
        brandColor: '#844FBA',
        category: 'cloud-devops',
        proficiency: 'intermediate',
        role: 'Declarative Infrastructure as Code & multi-cloud provisioning',
        badge: 'Acquiring',
      },
      {
        name: 'GitHub Actions',
        brandColor: '#2088FF',
        category: 'cloud-devops',
        proficiency: 'advanced',
        role: 'Automated CI/CD matrix builds, artifact staging & release flow',
        badge: 'Production',
      },
      {
        name: 'Linux',
        brandColor: '#FCC624',
        category: 'cloud-devops',
        proficiency: 'expert',
        role: 'POSIX shell scripting, kernel permissions & server administration',
        badge: 'Core',
        featured: true,
      },
      {
        name: 'Nginx',
        brandColor: '#009639',
        category: 'cloud-devops',
        proficiency: 'intermediate',
        role: 'Reverse proxying, SSL termination & rate limiting configs',
        badge: 'Production',
      },
      {
        name: 'MLOps',
        brandColor: '#E76F51',
        category: 'cloud-devops',
        proficiency: 'intermediate',
        role: 'Model training pipelines, inference serving & drift monitoring',
        badge: 'Acquiring',
      },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile & App Dev',
    skills: [
      {
        name: 'Flutter',
        brandColor: '#02569B',
        category: 'mobile',
        proficiency: 'advanced',
        role: 'Cross-platform native performance, custom rendering & Bloc state',
        badge: 'Production',
        featured: true,
      },
      {
        name: 'Kotlin',
        brandColor: '#7F52FF',
        category: 'mobile',
        proficiency: 'intermediate',
        role: 'Modern Android architectures, coroutines & Jetpack components',
        badge: 'Production',
      },
      {
        name: 'Dart',
        brandColor: '#0175C2',
        category: 'mobile',
        proficiency: 'advanced',
        role: 'Sound null-safe type system & reactive asynchronous streams',
        badge: 'Production',
      },
      {
        name: 'Firebase',
        brandColor: '#FFCA28',
        category: 'mobile',
        proficiency: 'advanced',
        role: 'Firestore, cloud messaging, authentication & analytics triggers',
        badge: 'Production',
        featured: true,
      },
      {
        name: 'Android',
        brandColor: '#3DDC84',
        category: 'mobile',
        proficiency: 'intermediate',
        role: 'Native mobile lifecycle, background workers & hardware APIs',
        badge: 'Production',
      },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Workflow',
    skills: [
      {
        name: 'Git & GitHub',
        brandColor: '#F05032',
        category: 'tools',
        proficiency: 'expert',
        role: 'Branching strategies, semantic releases & open-source collaboration',
        badge: 'Core',
        featured: true,
      },
      {
        name: 'VS Code',
        brandColor: '#007ACC',
        category: 'tools',
        proficiency: 'expert',
        role: 'Customized developer tooling, debugging profiles & extensions',
        badge: 'Core',
      },
      {
        name: 'Figma',
        brandColor: '#F24E1E',
        category: 'tools',
        proficiency: 'advanced',
        role: 'UI/UX prototyping, design systems, auto-layouts & wireframing',
        badge: 'Production',
      },
      {
        name: 'Notion',
        brandColor: '#FFFFFF',
        category: 'tools',
        proficiency: 'expert',
        role: 'Engineering knowledge base, project roadmaps & documentation',
        badge: 'Production',
      },
    ],
  },
]

export const projects: Project[] = [
  {
    id: 'equilens',
    title: 'EquiLens',
    shortDescription: 'AI bias detection and mitigation platform for HR hiring datasets.',
    fullDescription: '', // Fill from ProfileContent.md
    techStack: ['NestJS', 'Python', 'Firebase', 'GCP Cloud Run', 'ML'],
    imageSrc: '/images/projects/equilens.webp',
    githubUrl: '', // Fill from ProfileContent.md
    liveUrl: '', // Fill from ProfileContent.md
    featured: true,
    impact: '', // Fill from ProfileContent.md (audit metrics)
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
  github: 'https://github.com/Arghya-2007', // Fill from ProfileContent.md
  linkedin: 'https://www.linkedin.com/in/arghya-pal-87a8b6299/', // Fill from ProfileContent.md
  twitter: 'https://twitter.com/ArghyaPal_07', // Fill from ProfileContent.md (optional)
  email: '[EMAIL_ADDRESS]', // Fill from ProfileContent.md — DO NOT use raw email in components
}

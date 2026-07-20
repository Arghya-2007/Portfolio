import type { StackNode } from '../types'

export const stack: StackNode[] = [
  {
    category: 'Full Stack Web',
    status: 'established',
    tools: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Express',
      'Tailwind CSS',
      'HTML/CSS',
      'REST APIs',
    ],
  },
  {
    category: 'Databases & Backend',
    status: 'established',
    tools: [
      'PostgreSQL',
      'MongoDB',
      'Prisma',
      'Supabase',
      'Firebase',
      'Redis',
    ],
  },
  {
    category: 'Mobile & App Dev',
    status: 'established',
    tools: [
      'React Native',
      'Expo',
      'Flutter',
    ],
  },
  {
    category: 'System Design',
    status: 'established',
    tools: [
      'Load Balancing',
      'Caching Patterns',
      'Database Sharding',
      'Microservices',
      'API Gateway',
      'Message Queues',
    ],
  },
  {
    category: 'Cloud / DevOps / AI Infra',
    status: 'acquiring',
    tools: [
      'AWS (EC2, S3, Lambda)',
      'Docker',
      'Kubernetes',
      'Terraform',
      'CI/CD Pipelines',
      'MLflow',
      'Linux / Shell',
    ],
  },
  {
    category: 'Tools & Workflow',
    status: 'established',
    tools: [
      'Git / GitHub',
      'Figma',
      'Postman',
      'Vercel',
      'Jira / Notion',
    ],
  },
]

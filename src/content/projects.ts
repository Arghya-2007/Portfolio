import type { Project } from '../types'

export const projects: Project[] = [
  {
    slug: 'dd-tours',
    title: 'DD Tours & Travels',
    status: 'live',
    description:
      'Full-stack travel agency platform with booking management, dynamic itineraries, and admin dashboard. Built end-to-end from design to deployment on AWS.',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'AWS EC2', 'Tailwind CSS'],
    liveLink: 'https://ddtours.in/',
    githubLink: 'https://github.com/Arghya-2007/dd-tours',
  },
  {
    slug: 'equilens',
    title: 'EquiLens',
    status: 'live',
    description:
      'AI-powered bias detection and analysis tool that evaluates text for demographic and ideological imbalances using NLP pipelines and scoring models.',
    stack: ['Python', 'Flask', 'React', 'NLP', 'Hugging Face', 'Docker'],
    liveLink: 'https://equilens.devarghya.in',
    githubLink: 'https://github.com/Arghya-2007/equilens',
  },
  {
    slug: 'ai-notes-app',
    title: 'AI Notes App',
    status: 'in_progress',
    description:
      'Intelligent note-taking application with AI-powered summarisation, tagging, and semantic search. Currently in active development.',
    stack: ['React Native', 'TypeScript', 'Supabase', 'OpenAI API', 'Expo'],
  },
]

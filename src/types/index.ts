export interface Project {
  slug: string
  title: string
  status: 'live' | 'in_progress'
  description: string
  stack: string[]
  liveLink?: string
  githubLink?: string
}

export interface RoadmapItem {
  year: string
  title: string
  status: 'done' | 'in_progress' | 'target' | 'goal'
  description: string
}

export interface StackNode {
  category: string
  status: 'established' | 'acquiring'
  tools: string[]
}

export interface Social {
  name: string
  url: string
  icon: string
}

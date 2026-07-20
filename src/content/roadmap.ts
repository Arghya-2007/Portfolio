import type { RoadmapItem } from '../types'

export const roadmap: RoadmapItem[] = [
  {
    year: '2024',
    title: 'Full Stack · Mobile · System Design',
    status: 'done',
    description:
      'Built production web apps with Next.js, Node, and PostgreSQL. Shipped a React Native mobile project. Studied system design fundamentals — load balancing, caching patterns, database sharding.',
  },
  {
    year: '2025',
    title: 'Cloud Engineering · DevOps · IaC',
    status: 'in_progress',
    description:
      'Deep-diving into AWS services, CI/CD pipeline architecture, Terraform/Pulumi for infrastructure-as-code, containerisation with Docker & Kubernetes. Building deploy-ready, production-grade environments.',
  },
  {
    year: '2026',
    title: 'MLOps · AI Infra · Automation',
    status: 'target',
    description:
      'Target: production ML pipelines — model serving (TF Serving, Triton), feature stores, experiment tracking (MLflow/W&B), GPU cluster orchestration, and automated retraining workflows.',
  },
  {
    year: '2027',
    title: 'Deploy & Scale AI in Production',
    status: 'goal',
    description:
      'Goal: end-to-end ownership of AI infrastructure at scale — designing, deploying, and maintaining the systems that keep models reliable, fast, and cost-efficient in production.',
  },
]

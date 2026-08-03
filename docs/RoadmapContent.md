# Cloud Engineering & DevOps Roadmap

**From Full-Stack Developer to Cloud/DevOps Engineer**
*BCA Student, Techno Main Salt Lake | Timeline: Aug 2026 – Mid 2028*

---

## Overview

| | |
|---|---|
| **Starting Point** | 2nd Year BCA — Moderate knowledge in React, Next.js, Node.js, Databases, System Architecture |
| **Goal** | Cloud Engineering, DevOps, and System Architecture mastery |
| **Target** | Internship by mid-2028 (Final Year), Full-time role by 2029 |
| **Duration** | ~24 months of structured, project-driven learning |

---

## Phase 1 — Foundations
**Aug 2026 – Dec 2026 | 2nd Year**

### Month 1–2: Linux, Networking & Git
- Linux fundamentals — file system, permissions, processes, systemd, package management
- Shell scripting with Bash
- Networking essentials — TCP/IP, DNS, HTTP/HTTPS, ports, load balancers, reverse proxies (Nginx)
- Git internals — branching strategies, rebase vs merge, conflict resolution

### Month 3: Docker
- Images, containers, volumes, and networks
- Dockerfile best practices — multi-stage builds, layer caching
- Docker Compose for multi-service local environments
- **Project:** Containerize a full-stack app (Next.js + Node + Postgres/MongoDB) using Compose

### Month 4: CI/CD Basics
- GitHub Actions — pipeline design: lint → test → build → deploy
- **Project:** Auto-deploy a containerized app to a VPS on every push to `main`

---

## Phase 2 — Cloud & Orchestration
**Jan 2027 – Aug 2027 | 3rd Year**

### Month 5–7: AWS Core Services
- EC2, S3, VPC, IAM, RDS, Load Balancers, Route 53, CloudWatch
- Certification: AWS Certified Cloud Practitioner (structural checkpoint, not the end goal)
- **Project:** Manually deploy a 3-tier application on AWS with proper security groups, subnets, and IAM roles

### Month 8–10: Infrastructure as Code
- Terraform — providers, state management, modules, workspaces
- **Project:** Rebuild the AWS 3-tier project entirely in Terraform

### Month 11–13: Kubernetes
- Core concepts — pods, deployments, services, ingress, configmaps, secrets, namespaces
- Local practice with Minikube/Kind → deploy on managed cluster (EKS or DigitalOcean Kubernetes)
- **Project:** Deploy containerized app on K8s with health checks, autoscaling, and rolling updates

---

## Phase 3 — Depth & Observability
**Sep 2027 – Mid 2028**

### Monitoring & Observability
- Prometheus + Grafana for metrics
- Log aggregation — ELK Stack or Loki
- Alerting pipelines

### Security Fundamentals
- Secrets management — HashiCorp Vault or AWS Secrets Manager
- Least-privilege IAM design
- Container image scanning

### Advanced CI/CD
- GitOps workflows with ArgoCD
- Canary and blue-green deployment strategies

### System Design
- Microservices vs monolith tradeoffs
- Message queues — Kafka, RabbitMQ
- Caching strategies, database scaling (read replicas, sharding)
- Reference: *Designing Data-Intensive Applications* — Martin Kleppmann

### Capstone Project
Full microservices application — containerized, deployed on Kubernetes via Terraform, with integrated CI/CD, monitoring, and centralized logging.

---

## Phase 4 — Job Readiness
**Mid 2028 Onward | Final Year**

- Apply for internships targeting Platform Engineering / DevOps / Cloud roles
- Contribute to open-source infrastructure tools (Terraform providers, Kubernetes tooling, CI/CD plugins)
- Mock system design interviews — practice articulating tradeoffs in the capstone project
- Target full-time conversion from final-year internship

---

## Core Tech Stack

| Category | Tools |
|---|---|
| **OS & Scripting** | Linux, Bash |
| **Containers** | Docker, Docker Compose |
| **Orchestration** | Kubernetes |
| **IaC** | Terraform |
| **CI/CD** | GitHub Actions, ArgoCD |
| **Cloud** | AWS (primary) |
| **Observability** | Prometheus, Grafana, ELK/Loki |
| **Databases** | PostgreSQL, MongoDB, Redis |
| **Security** | IAM, Vault, Secrets Manager |

---

## Guiding Principles

- Ship a project to GitHub every month — tutorials without shipped work don't count
- Depth over breadth — master AWS before touching Azure/GCP
- Every phase ends in a real, deployed, breakable project
- Certifications are checkpoints, not credentials to chase

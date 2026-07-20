import { useRef, useLayoutEffect, useEffect } from 'react'
import { projects } from '../../content/projects'
import { GlassPanel } from '../glass/GlassPanel'
import { ExternalLink } from 'lucide-react'
import { gsap, EASE_OUT, DURATION_MEDIUM } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { Project } from '../../types'

interface ProjectsProps {
  className?: string
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !cardRef.current) return

    const card = cardRef.current
    
    // QuickSetters for 3D tilt
    const xTo = gsap.quickTo(card, 'rotationY', { ease: 'power3.out', duration: 0.5 })
    const yTo = gsap.quickTo(card, 'rotationX', { ease: 'power3.out', duration: 0.5 })
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left // x position within the element.
      const y = e.clientY - rect.top  // y position within the element.
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateX = ((y - centerY) / centerY) * -5 // Max 5 deg tilt
      const rotateY = ((x - centerX) / centerX) * 5

      xTo(rotateY)
      yTo(rotateX)
    }
    
    const handleMouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [reducedMotion])

  return (
    <div style={{ perspective: 1000 }}>
      <GlassPanel
        ref={cardRef}
        className="project-card group relative flex flex-col gap-4 h-full overflow-hidden transition-colors hover:border-primary-500/30"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Terminal-style header */}
        <div className="font-mono text-xs md:text-sm space-y-1">
          <div className="flex items-center gap-2">
            {/* Status dot */}
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                project.status === 'live'
                  ? 'bg-status-live shadow-[0_0_6px_rgba(143,191,163,0.5)]'
                  : 'bg-status-progress shadow-[0_0_6px_rgba(224,194,122,0.5)]'
              }`}
            />
            <span style={{ color: 'var(--text-tertiary)' }}>
              {'>'} deploy {project.slug} --status=
              {project.status}
            </span>
          </div>
        </div>

        {/* Project title */}
        <h3 className="text-lg md:text-xl font-heading font-semibold !text-[var(--text-primary)]">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm flex-1">{project.description}</p>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-1.5 transition-all duration-300">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="glass px-2 py-0.5 text-[11px] font-mono rounded-full"
              style={{ color: 'var(--text-secondary)' }}
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Expanded content (Live link) reveals on hover */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
          <div className="overflow-hidden flex flex-col gap-2">
            <div className="pt-2">
              {/* Live link button */}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:text-primary-300 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-md px-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live
                </a>
              )}

              {/* In-progress indicator for projects without live link */}
              {!project.liveLink && (
                <span className="inline-flex items-center gap-2 text-sm font-mono text-status-progress">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-progress" />
                  In Development
                </span>
              )}
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  )
}

export function Projects({ className }: ProjectsProps) {
  const containerRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      // Fade in cards
      gsap.fromTo(
        '.project-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DURATION_MEDIUM,
          ease: EASE_OUT,
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      id="projects"
      ref={containerRef}
      className={`section-padding max-w-6xl mx-auto ${className ?? ''}`}
    >
      {/* Section heading */}
      <p className="font-mono text-sm text-primary mb-2">
        {'>'} ls ./deployed-systems
      </p>
      <h2 className="mb-8 md:mb-12">Projects</h2>

      {/* Project cards grid — 3-col desktop, 1-col mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project as Project} />
        ))}
      </div>
    </section>
  )
}

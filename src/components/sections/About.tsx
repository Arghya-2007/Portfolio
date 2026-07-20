import { useRef, useLayoutEffect } from 'react'
import { GlassPanel } from '../glass/GlassPanel'
import { gsap, EASE_OUT, DURATION_MEDIUM } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface AboutProps {
  className?: string
}

const facts = [
  'BCA Student',
  'Techno Main Salt Lake',
  'MAKAUT University',
  'Kolkata, India',
  'MLOps & AI Infra (aspiring)',
  'Full Stack Developer',
]

export function About({ className }: AboutProps) {
  const containerRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      // Fade in reveal
      gsap.fromTo(
        '.about-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DURATION_MEDIUM,
          ease: EASE_OUT,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Subtle parallax for the glass panel
      gsap.to('.about-panel', {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      id="about"
      ref={containerRef}
      className={`section-padding max-w-5xl mx-auto ${className ?? ''}`}
    >
      {/* Section heading */}
      <p className="about-reveal opacity-0 font-mono text-sm text-primary mb-2">
        {'>'} whoami
      </p>
      <h2 className="about-reveal opacity-0 mb-8 md:mb-12">About Me</h2>

      <GlassPanel className="about-panel about-reveal opacity-0 space-y-6">
        {/* Monospace terminal block */}
        <div className="font-mono text-sm md:text-base space-y-1">
          <p className="text-primary">$ cat ./about.txt</p>
          <div
            className="border-l-2 pl-4 space-y-3 mt-3"
            style={{ borderColor: 'var(--primary-700)' }}
          >
            <p>
              I'm Arghya Pal — a BCA student at Techno Main Salt Lake
              (MAKAUT University), Kolkata, India. I build full-stack
              applications today while working toward a career in MLOps
              and AI Infrastructure Engineering.
            </p>
            <p>
              My focus is the layer between "the model works on my
              laptop" and "the model works in production at scale" —
              deployment pipelines, serving infrastructure, monitoring,
              and the DevOps practices that keep AI systems reliable.
            </p>
            <p>
              Right now I'm sharpening my cloud engineering and DevOps
              skills while shipping real projects (a travel platform, a
              bias-detection tool, an AI notes app) that let me practice
              system design, database architecture, and end-to-end
              deployment.
            </p>
          </div>
        </div>

        {/* Badge/pill list */}
        <div className="flex flex-wrap gap-2 pt-2">
          {facts.map((fact) => (
            <span
              key={fact}
              className="glass px-3 py-1 text-xs md:text-sm font-mono rounded-full"
              style={{ color: 'var(--text-secondary)' }}
            >
              {fact}
            </span>
          ))}
        </div>
      </GlassPanel>
    </section>
  )
}

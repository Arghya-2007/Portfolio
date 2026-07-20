import { useRef, useLayoutEffect } from 'react'
import { stack } from '../../content/stack'
import { cn } from '../../lib/utils'
import { gsap, EASE_OUT, DURATION_MEDIUM } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { AnimatedTrace } from '../ui/AnimatedTrace'

interface TechStackProps {
  className?: string
}

export function TechStack({ className }: TechStackProps) {
  const containerRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      // Fade in nodes
      gsap.fromTo(
        '.stack-node',
        { y: 30, opacity: 0 },
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

      // Pulse acquiring nodes
      gsap.to('.node-acquiring', {
        boxShadow: '0 0 15px rgba(224,147,122,0.4)',
        borderColor: 'rgba(224,147,122,0.8)',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      id="stack"
      ref={containerRef}
      className={`relative section-padding max-w-6xl mx-auto ${className ?? ''}`}
    >
      {/* Background SVG Trace */}
      {!reducedMotion && (
        <div className="absolute inset-0 pointer-events-none -z-10 opacity-30">
          <AnimatedTrace
            pathD="M 10 10 L 30 10 L 30 50 L 80 50 L 80 90 L 100 90"
            color="var(--primary-500)"
            className="w-full h-full"
          />
        </div>
      )}

      {/* Section heading */}
      <p className="font-mono text-sm text-primary mb-2">
        {'>'} ls ./system-architecture
      </p>
      <h2 className="mb-8 md:mb-12">Tech Stack</h2>

      {/* Node/category grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stack.map((node) => (
          <div
            key={node.category}
            className={cn(
              'stack-node neo bg-elevated p-5 md:p-6 space-y-4 transition-colors',
              node.status === 'acquiring' &&
                'node-acquiring border border-dashed border-secondary/40'
            )}
          >
            {/* Category header */}
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  'w-3 h-3 rounded-full shrink-0',
                  node.status === 'established'
                    ? 'bg-primary shadow-[0_0_8px_rgba(143,191,163,0.4)]'
                    : 'bg-secondary/60 border border-dashed border-secondary'
                )}
              />
              <h3 className="text-base md:text-lg font-heading font-semibold !text-[var(--text-primary)]">
                {node.category}
              </h3>
            </div>

            {/* Acquiring label */}
            {node.status === 'acquiring' && (
              <span className="inline-block text-xs font-mono text-secondary px-2 py-0.5 rounded-full bg-secondary/10">
                acquiring
              </span>
            )}

            {/* Tool badges */}
            <div className="flex flex-wrap gap-2">
              {node.tools.map((tool) => (
                <span
                  key={tool}
                  className={cn(
                    'glass px-2.5 py-1 text-xs font-mono rounded-full',
                    node.status === 'acquiring'
                      ? 'opacity-70'
                      : ''
                  )}
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

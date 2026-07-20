import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { roadmap } from '../../content/roadmap'
import { GlassPanel } from '../glass/GlassPanel'
import { Check, Loader, Target, Rocket } from 'lucide-react'
import { cn } from '../../lib/utils'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface RoadmapProps {
  className?: string
}

const statusConfig: Record<
  string,
  { icon: typeof Check; color: string; lineColor: string }
> = {
  done: {
    icon: Check,
    color: 'text-primary bg-primary/15 border-primary/30',
    lineColor: 'bg-primary/40',
  },
  in_progress: {
    icon: Loader,
    color: 'text-status-progress bg-status-progress/15 border-status-progress/30',
    lineColor: 'bg-status-progress/40',
  },
  target: {
    icon: Target,
    color: 'text-secondary bg-secondary/15 border-secondary/30',
    lineColor: 'bg-secondary/20',
  },
  goal: {
    icon: Rocket,
    color: 'text-content-tertiary bg-content-tertiary/10 border-content-tertiary/20',
    lineColor: 'bg-content-tertiary/20',
  },
}

export function Roadmap({ className }: RoadmapProps) {
  const containerRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const useVertical = reducedMotion || isMobile

  useLayoutEffect(() => {
    if (useVertical) return

    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      const totalWidth = wrapper.scrollWidth - window.innerWidth
      
      // Horizontal scroll tween
      gsap.to(wrapper, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      })

      // Trace line animation
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${totalWidth}`,
            scrub: 1,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [useVertical])

  return (
    <section
      id="roadmap"
      ref={containerRef}
      className={`relative ${
        useVertical ? 'section-padding max-w-4xl mx-auto' : 'h-screen flex flex-col justify-center overflow-hidden pt-20 pb-10'
      } ${className ?? ''}`}
    >
      <div className={useVertical ? '' : 'px-8 md:px-16 mb-8 lg:mb-16 shrink-0'}>
        {/* Section heading */}
        <p className="font-mono text-sm text-primary mb-2">
          {'>'} cat ./roadmap.yml
        </p>
        <h2 className="mb-0">Roadmap</h2>
      </div>

      <div className={useVertical ? 'relative mt-8 md:mt-12' : 'relative flex items-center h-full w-full'}>
        
        {/* Background connector line for horizontal mode */}
        {!useVertical && (
          <div className="absolute top-1/2 left-0 w-[200vw] h-1 -translate-y-1/2 bg-elevated/50 z-0 overflow-hidden">
             <div ref={lineRef} className="w-full h-full bg-primary/50 origin-left" />
          </div>
        )}

        <div
          ref={wrapperRef}
          className={
            useVertical
              ? 'flex flex-col'
              : 'flex flex-nowrap items-center gap-8 md:gap-16 lg:gap-32 px-8 md:px-16 w-max z-10'
          }
        >
          {roadmap.map((item, i) => {
            const config = statusConfig[item.status]
            const Icon = config.icon
            const isLast = i === roadmap.length - 1

            return (
              <div
                key={item.year}
                className={
                  useVertical
                    ? 'relative flex gap-4 md:gap-6'
                    : 'relative flex flex-col items-center w-72 md:w-80 lg:w-96 shrink-0'
                }
              >
                {/* Timeline node */}
                <div
                  className={cn(
                    useVertical ? 'flex flex-col items-center' : 'mb-6 flex flex-col items-center justify-center'
                  )}
                >
                  {/* Icon circle */}
                  <div
                    className={cn(
                      'w-10 h-10 md:w-14 md:h-14 rounded-full border flex items-center justify-center shrink-0 z-10 backdrop-blur-md',
                      config.color
                    )}
                  >
                    <Icon className="w-4 h-4 md:w-6 md:h-6" />
                  </div>

                  {/* Vertical line connector (only for vertical mode) */}
                  {useVertical && !isLast && (
                    <div className={cn('w-0.5 flex-1 min-h-8', config.lineColor)} />
                  )}
                </div>

                {/* Content card */}
                <GlassPanel className={useVertical ? 'flex-1 mb-6' : 'w-full'}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-lg md:text-xl font-bold text-primary">
                      {item.year}
                    </span>
                    <span
                      className={cn(
                        'text-xs font-mono px-2 py-0.5 rounded-full border',
                        config.color
                      )}
                    >
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-heading font-semibold mb-2 !text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-sm">{item.description}</p>
                </GlassPanel>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

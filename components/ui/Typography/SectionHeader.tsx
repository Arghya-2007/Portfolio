'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useMotionConfig } from '@/hooks/useMotionConfig'

interface Props {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  /** When true, skip internal GSAP animation — parent timeline controls the reveal */
  disableAnimation?: boolean
}

export default function SectionHeader({ eyebrow, title, subtitle, align = 'left', disableAnimation = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { animationsEnabled } = useMotionConfig()

  useEffect(() => {
    if (!animationsEnabled || disableAnimation) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      tl.fromTo(
        '.header-eyebrow',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        0
      )
      tl.fromTo(
        '.header-title',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        0.1
      )
      if (subtitle) {
        tl.fromTo(
          '.header-subtitle',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          0.2
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [animationsEnabled, disableAnimation, subtitle])

  const alignClass = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'

  return (
    <div ref={containerRef} className={`flex flex-col ${alignClass} mb-12`}>
      <p className="header-eyebrow eyebrow mb-4" style={{ opacity: (animationsEnabled && !disableAnimation) ? 0 : 1 }}>
        {eyebrow}
      </p>
      <h2 className="header-title font-display text-section-title font-bold text-text-primary mb-4" style={{ opacity: (animationsEnabled && !disableAnimation) ? 0 : 1 }}>
        {title}
      </h2>
      {subtitle && (
        <p className="header-subtitle text-text-secondary text-body max-w-[60ch]" style={{ opacity: (animationsEnabled && !disableAnimation) ? 0 : 1 }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

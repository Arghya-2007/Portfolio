'use client'

import { forwardRef, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import { useMotionConfig } from '@/hooks/useMotionConfig'
import { profile } from '@/lib/content'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Props {
  /** When true, skip internal animation — parent GSAP timeline controls the reveal */
  disableAnimation?: boolean
}

// ─── Component ───────────────────────────────────────────────────────────────

const AvailabilityBadge = forwardRef<HTMLDivElement, Props>(
  function AvailabilityBadge({ disableAnimation = false }, ref) {
    const { animationsEnabled } = useMotionConfig()
    const containerRef = useRef<HTMLDivElement>(null)

    const setRefs = (el: HTMLDivElement | null) => {
      containerRef.current = el
      if (typeof ref === 'function') {
        ref(el)
      } else if (ref) {
        ref.current = el
      }
    }

    useGSAP(() => {
      if (!animationsEnabled || disableAnimation || !containerRef.current) return
      
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          delay: 1.8,
          duration: 0.5,
          ease: 'power2.out',
        }
      )
    }, { scope: containerRef, dependencies: [animationsEnabled, disableAnimation] })

    // Don't render if not available for work
    if (!profile.availability) return null

    const content = (
      <>
        {/* Pulsing green dot */}
        <div
          className="w-3 h-3 rounded-full animate-pulse-soft"
          style={{ background: '#22c55e' }}
        />
        <span className="text-text-secondary text-sm font-sans font-medium">
          Available for Work
        </span>
      </>
    )

    // Static render: no animations enabled, OR parent controls animation
    if (!animationsEnabled || disableAnimation) {
      return (
        <div
          ref={ref}
          className="glass-subtle px-4 py-2 rounded-pill w-fit flex items-center gap-2.5"
        >
          {content}
        </div>
      )
    }

    return (
      <div
        ref={setRefs}
        className="glass-subtle px-4 py-2 rounded-pill w-fit flex items-center gap-2.5 opacity-0"
      >
        {content}
      </div>
    )
  }
)

export default AvailabilityBadge

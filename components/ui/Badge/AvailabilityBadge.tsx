'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'

import { useMotionConfig } from '@/hooks/useMotionConfig'
import { profile } from '@/lib/content'

// ─── Animation Variants ──────────────────────────────────────────────────────

const badgeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1.8, duration: 0.5, ease: 'easeOut' as const },
  },
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface Props {
  /** When true, skip internal Framer animation — parent GSAP timeline controls the reveal */
  disableAnimation?: boolean
}

// ─── Component ───────────────────────────────────────────────────────────────

const AvailabilityBadge = forwardRef<HTMLDivElement, Props>(
  function AvailabilityBadge({ disableAnimation = false }, ref) {
    const { animationsEnabled } = useMotionConfig()

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
      <motion.div
        ref={ref}
        className="glass-subtle px-4 py-2 rounded-pill w-fit flex items-center gap-2.5"
        variants={badgeVariants}
        initial="hidden"
        animate="visible"
      >
        {content}
      </motion.div>
    )
  }
)

export default AvailabilityBadge

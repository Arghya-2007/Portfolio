'use client'

import { MotionConfig } from 'framer-motion'

interface MotionProviderProps {
  children: React.ReactNode
}

/**
 * Wraps the app in Framer Motion's MotionConfig.
 * reducedMotion="user" automatically reads the OS preference.
 * This is the baseline — individual components further gate with useMotionConfig.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}

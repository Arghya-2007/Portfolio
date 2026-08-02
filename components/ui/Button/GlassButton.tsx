'use client'

import { motion } from 'framer-motion'

import { useMotionConfig } from '@/hooks/useMotionConfig'
import { cn } from '@/lib/utils'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Props {
  variant: 'primary' | 'secondary' | 'ghost'
  children: React.ReactNode
  onClick?: () => void
  href?: string
  download?: string
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
  'aria-label'?: string
}

// ─── Style Maps ──────────────────────────────────────────────────────────────

const variantStyles = {
  primary: cn(
    'bg-grad-warm text-surface-base',
    'rounded-glass px-8 py-3.5',
    'font-display font-semibold text-base',
    'shadow-[0_4px_20px_rgba(231,111,81,0.25)]',
  ),
  secondary: cn(
    'bg-transparent',
    'border-[1.5px] border-[rgba(42,157,143,0.50)]',
    'text-text-primary',
    'rounded-glass px-8 py-3.5',
    'font-display font-semibold text-base',
  ),
  ghost: cn(
    'glass-subtle',
    'p-2.5 w-11 h-11',
    'flex items-center justify-center',
  ),
} as const

const hoverStyles = {
  primary: 'hover:shadow-[0_6px_30px_rgba(231,111,81,0.40)]',
  secondary: 'hover:border-[rgba(42,157,143,1.0)] hover:bg-[rgba(42,157,143,0.08)]',
  ghost: 'hover:border-[rgba(42,157,143,0.5)]',
} as const

// ─── Framer Motion Variants ──────────────────────────────────────────────────

const primarySecondaryHover = { scale: 1.04, y: -2 }
const primarySecondaryTap = { scale: 0.97 }
const ghostHover = { scale: 1.08 }
const ghostTap = { scale: 0.94 }
const transitionConfig = { duration: 0.2, ease: 'easeOut' as const }

// ─── Component ───────────────────────────────────────────────────────────────

function GlassButton({
  variant,
  children,
  onClick,
  href,
  download: downloadProp,
  className,
  style,
  disabled,
  'aria-label': ariaLabel,
}: Props) {
  const { animationsEnabled } = useMotionConfig()

  // Determine Framer motion props based on variant and animation gate
  const whileHover = animationsEnabled
    ? variant === 'ghost' ? ghostHover : primarySecondaryHover
    : undefined
  const whileTap = animationsEnabled
    ? variant === 'ghost' ? ghostTap : primarySecondaryTap
    : undefined

  const combinedClassName = cn(
    variantStyles[variant],
    hoverStyles[variant],
    'inline-flex items-center justify-center gap-2',
    'transition-all duration-200 cursor-pointer',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal',
    disabled && 'opacity-50 pointer-events-none',
    className,
  )

  // ── Render as anchor ────────────────────────────────────────────────────
  if (href) {
    const isExternal = href.startsWith('http')

    return (
      <motion.a
        href={href}
        download={downloadProp}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={combinedClassName}
        style={style}
        aria-label={ariaLabel}
        whileHover={whileHover}
        whileTap={whileTap}
        transition={transitionConfig}
      >
        {children}
      </motion.a>
    )
  }

  // ── Render as button ────────────────────────────────────────────────────
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
      style={style}
      aria-label={ariaLabel}
      whileHover={whileHover}
      whileTap={whileTap}
      transition={transitionConfig}
    >
      {children}
    </motion.button>
  )
}

export default GlassButton

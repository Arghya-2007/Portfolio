'use client'



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
  primary: 'hover:shadow-[0_6px_30px_rgba(231,111,81,0.40)] hover:scale-[1.04] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 ease-out',
  secondary: 'hover:border-[rgba(42,157,143,1.0)] hover:bg-[rgba(42,157,143,0.08)] hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 ease-out',
  ghost: 'hover:border-[rgba(42,157,143,0.5)] hover:scale-[1.08] active:scale-95 transition-all duration-200 ease-out',
} as const

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

  const combinedClassName = cn(
    variantStyles[variant],
    animationsEnabled && hoverStyles[variant],
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
      <a
        href={href}
        download={downloadProp}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={combinedClassName}
        style={style}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }

  // ── Render as button ────────────────────────────────────────────────────
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

export default GlassButton

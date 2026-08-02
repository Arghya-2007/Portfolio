'use client'

import React, { useRef, useState, useCallback } from 'react'
import { Skill } from '@/lib/content'
import { getTechIcon } from '@/components/ui/Chip/TechChip'
import { useMotionConfig } from '@/hooks/useMotionConfig'
import { cn } from '@/lib/utils'

interface SkillCardProps {
  skill: Skill
  index?: number
  className?: string
}

const BADGE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  Core: {
    bg: 'bg-teal/15',
    text: 'text-teal',
    border: 'border-teal/30',
  },
  Production: {
    bg: 'bg-cyan-500/15',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
  },
  'Cloud-Native': {
    bg: 'bg-blue-500/15',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
  },
  Acquiring: {
    bg: 'bg-amber-500/15',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
  },
  Specialized: {
    bg: 'bg-purple-500/15',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
  },
}

const PROFICIENCY_LEVELS: Record<string, number> = {
  expert: 4,
  advanced: 3,
  intermediate: 2,
  beginner: 1,
}

export default function SkillCard({ skill, index = 0, className }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  
  const [isHovered, setIsHovered] = useState(false)
  const { animationsEnabled } = useMotionConfig()

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !innerRef.current || !animationsEnabled) return

      if (rafRef.current) cancelAnimationFrame(rafRef.current)

      rafRef.current = requestAnimationFrame(() => {
        const rect = cardRef.current!.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        // Tilt physics
        const rotateX = ((y - centerY) / centerY) * -9
        const rotateY = ((x - centerX) / centerX) * 9
        
        const glareX = (x / rect.width) * 100
        const glareY = (y / rect.height) * 100

        innerRef.current!.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`
        
        if (glowRef.current) {
          glowRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, ${skill.brandColor}33 0%, transparent 70%)`
        }
        if (glareRef.current) {
          glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
          glareRef.current.style.opacity = '1'
        }
      })
    },
    [animationsEnabled, skill.brandColor],
  )

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (innerRef.current) {
      innerRef.current.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0)`
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0'
    }
  }, [])

  const badgeStyle = BADGE_STYLES[skill.badge || 'Core'] || BADGE_STYLES.Core
  const levelBars = PROFICIENCY_LEVELS[skill.proficiency || 'advanced'] || 3

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      className={cn('group relative h-full', className)}
    >
      {/* Dynamic Ambient Brand Glow Behind Card */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-2 rounded-3xl opacity-0 blur-2xl transition-opacity duration-500 ease-out group-hover:opacity-100 will-change-transform"
        aria-hidden="true"
      />

      {/* Main 3D Card Shell */}
      <div
        ref={innerRef}
        className={cn(
          'relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6',
          'bg-gradient-to-b from-[#0e222a] via-[#0a181e] to-[#061014]',
          'border border-teal/15 transition-all duration-300 ease-out',
          'group-hover:border-[var(--brand-border)] group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.7),0_0_24px_var(--brand-glow)]',
          'select-none will-change-transform',
        )}
        style={
          {
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out, border-color 0.3s, box-shadow 0.3s',
            '--brand-border': `${skill.brandColor}55`,
            '--brand-glow': `${skill.brandColor}22`,
          } as React.CSSProperties
        }
      >
        {/* Specular Interactive Sheen Overlay */}
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0"
          aria-hidden="true"
        />

        {/* Top Header: Icon + Badge */}
        <div className="relative z-10 flex items-start justify-between gap-3 mb-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#08171e]/90 p-2.5 shadow-inner transition-transform duration-300 group-hover:scale-110"
            style={{
              boxShadow: isHovered
                ? `0 0 16px ${skill.brandColor}40, inset 0 1px 0 rgba(255,255,255,0.15)`
                : 'inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            {getTechIcon(skill.name, 26)}
          </div>

          {skill.badge && (
            <span
              className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider',
                badgeStyle.bg,
                badgeStyle.text,
                badgeStyle.border,
              )}
            >
              {skill.badge}
            </span>
          )}
        </div>

        {/* Middle Body: Skill Name & Role */}
        <div className="relative z-10 flex-1">
          <h3 className="font-display text-lg font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[var(--brand-accent)]"
              style={{ '--brand-accent': skill.brandColor === '#FFFFFF' || skill.brandColor === '#000000' ? '#64ffda' : skill.brandColor } as React.CSSProperties}>
            {skill.name}
          </h3>

          {skill.role && (
            <p className="mt-2 text-xs leading-relaxed text-slate-400/90 group-hover:text-slate-300 transition-colors duration-200">
              {skill.role}
            </p>
          )}
        </div>

        {/* Bottom Footer: Proficiency Level Micro-Meter */}
        <div className="relative z-10 mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 group-hover:text-slate-400 transition-colors">
            {skill.proficiency || 'Advanced'}
          </span>

          <div className="flex items-center gap-1" aria-label={`Proficiency: ${skill.proficiency}`}>
            {[1, 2, 3, 4].map((bar) => (
              <span
                key={bar}
                className={cn(
                  'h-1.5 w-3.5 rounded-full transition-all duration-300',
                  bar <= levelBars
                    ? 'bg-teal shadow-[0_0_6px_rgba(42,157,143,0.6)]'
                    : 'bg-white/10',
                )}
                style={
                  bar <= levelBars && isHovered
                    ? { backgroundColor: skill.brandColor, boxShadow: `0 0 8px ${skill.brandColor}80` }
                    : undefined
                }
              />
            ))}
          </div>
        </div>

        {/* Corner Ambient Accent Light */}
        <div
          className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full opacity-20 blur-xl transition-all duration-300 group-hover:scale-150 group-hover:opacity-40"
          style={{ backgroundColor: skill.brandColor }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

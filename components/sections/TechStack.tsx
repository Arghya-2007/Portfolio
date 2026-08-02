'use client'

import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap/gsap.config'
import { skillCategories, Skill } from '@/lib/content'
import SkillCard from '@/components/ui/Chip/SkillCard'
import TechChip from '@/components/ui/Chip/TechChip'
import SectionHeader from '@/components/ui/Typography/SectionHeader'
import GlowOrb from '@/components/ui/Decorations/GlowOrb'
import DotGrid from '@/components/ui/Backgrounds/DotGrid'
import { useMotionConfig } from '@/hooks/useMotionConfig'
import { useIsMobile } from '@/hooks/useIsMobile'
import { cn } from '@/lib/utils'

const CATEGORY_TABS = [
  { id: 'frontend', label: 'Frontend & UI' },
  { id: 'backend', label: 'Backend & APIs' },
  { id: 'cloud-devops', label: 'Cloud · DevOps · AI' },
  { id: 'databases', label: 'Databases & Cache' },
  { id: 'mobile', label: 'Mobile & Workflow' },
]

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)
  const beamRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  
  const [activeCategory, setActiveCategory] = useState('frontend')
  const [searchQuery, setSearchQuery] = useState('')
  const { animationsEnabled } = useMotionConfig()
  const isMobile = useIsMobile()

  // Flatten all skills
  const allSkills = useMemo(() => {
    return skillCategories.flatMap((cat) => cat.skills)
  }, [])

  // Filter skills by category & search query
  const filteredSkills = useMemo(() => {
    return allSkills.filter((skill) => {
      // Category filter
      const matchesCategory =
        activeCategory === 'mobile'
          ? skill.category === 'mobile' || skill.category === 'tools'
          : skill.category === activeCategory

      // Search filter
      const query = searchQuery.trim().toLowerCase()
      const matchesSearch =
        query === '' ||
        skill.name.toLowerCase().includes(query) ||
        (skill.role && skill.role.toLowerCase().includes(query)) ||
        (skill.badge && skill.badge.toLowerCase().includes(query)) ||
        skill.category.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [allSkills, activeCategory, searchQuery])

  // Marquee item sets for dual streaming bottom tracks
  const marqueeLane1 = useMemo(() => {
    return allSkills.slice(0, 14)
  }, [allSkills])

  const marqueeLane2 = useMemo(() => {
    return allSkills.slice(14).concat(allSkills.slice(0, 4))
  }, [allSkills])

  // ─── "Stacked Card Slide UP Over About Section" GSAP ScrollTrigger ─────────
  useEffect(() => {
    if (!animationsEnabled || !curtainRef.current || !containerRef.current) return

    const curtain = curtainRef.current
    const beam = beamRef.current
    const container = containerRef.current

    const ctx = gsap.context(() => {
      // Initial state: Curtain sits at bottom due to negative margin, add 3D transform
      gsap.set(curtain, {
        rotateX: 4,
        transformOrigin: '50% 0%',
        scale: 0.97,
      })

      // Top specular beam initial state
      if (beam) {
        gsap.set(beam, {
          opacity: 0,
          scaleX: 0,
          transformOrigin: '50% 50%',
        })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'top top',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })

      // Slide curtain UP directly OVER the stationary pinned About section
      tl.to(
        curtain,
        {
          rotateX: 0,
          scale: 1,
          ease: 'none',
        },
        0,
      )

      if (beam) {
        tl.to(
          beam,
          {
            opacity: 1,
            scaleX: 1,
            ease: 'power2.out',
          },
          0.2,
        )
      }
    }, container)

    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    return () => {
      clearTimeout(timer)
      ctx.revert()
    }
  }, [animationsEnabled])

  // ─── Grid Items Stagger Animation (re-runs on filter change) ──────────────
  useEffect(() => {
    if (!animationsEnabled || !gridRef.current) return

    const grid = gridRef.current
    const children = Array.from(grid.children) as HTMLElement[]
    if (children.length === 0) return

    // Clear any leftover GSAP inline styles from previous animation
    children.forEach((child) => {
      gsap.set(child, { clearProps: 'all' })
    })

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        {
          y: 30,
          opacity: 0,
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power3.out',
          delay: 0.05,
        },
      )
    }, grid)

    return () => ctx.revert()
  }, [animationsEnabled, filteredSkills])

  // ─── Auto-Scroll on Mobile for Skill Cards ────────────────────────────────
  useEffect(() => {
    if (!isMobile || !animationsEnabled || !gridRef.current || filteredSkills.length <= 1) return

    let intervalId: NodeJS.Timeout
    let isInteracting = false

    const grid = gridRef.current

    const handleInteractStart = () => { isInteracting = true }
    const handleInteractEnd = () => { isInteracting = false }

    grid.addEventListener('touchstart', handleInteractStart, { passive: true })
    grid.addEventListener('touchend', handleInteractEnd)
    grid.addEventListener('mousedown', handleInteractStart)
    grid.addEventListener('mouseup', handleInteractEnd)
    grid.addEventListener('mouseleave', handleInteractEnd)
    grid.addEventListener('scroll', handleInteractStart, { passive: true })

    // Use a secondary timeout to resume auto-scroll after interaction ends
    let resumeTimeout: NodeJS.Timeout
    const onScrollEnd = () => {
      clearTimeout(resumeTimeout)
      resumeTimeout = setTimeout(() => {
        isInteracting = false
      }, 1500)
    }
    grid.addEventListener('scroll', onScrollEnd, { passive: true })

    intervalId = setInterval(() => {
      if (isInteracting) return

      const scrollLeft = grid.scrollLeft
      const maxScroll = grid.scrollWidth - grid.clientWidth

      // If we've reached the end, scroll back to start, else scroll one item
      if (scrollLeft >= maxScroll - 10) {
        grid.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        // Calculate dynamic card width including gap
        const firstChild = grid.children[0] as HTMLElement
        const cardWidth = firstChild ? firstChild.offsetWidth + 16 : 300
        grid.scrollBy({ left: cardWidth, behavior: 'smooth' })
      }
    }, 3500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(resumeTimeout)
      grid.removeEventListener('touchstart', handleInteractStart)
      grid.removeEventListener('touchend', handleInteractEnd)
      grid.removeEventListener('mousedown', handleInteractStart)
      grid.removeEventListener('mouseup', handleInteractEnd)
      grid.removeEventListener('mouseleave', handleInteractEnd)
      grid.removeEventListener('scroll', handleInteractStart)
      grid.removeEventListener('scroll', onScrollEnd)
    }
  }, [isMobile, animationsEnabled, filteredSkills])

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative z-30 w-full min-h-screen bg-transparent lg:-mt-[100vh] [perspective:1200px] pointer-events-auto"
      aria-label="Technical Skills and System Architecture"
    >
      {/* ─── Solid Curtain Wrapper ("Curtain Lift" Palette Cleanser) ─────── */}
      <div
        ref={curtainRef}
        className="relative w-full min-h-screen overflow-hidden rounded-t-[36px] sm:rounded-t-[56px] bg-gradient-to-b from-[#08171e] via-[#051015] to-[#03090d] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] border-t border-teal/40 pt-16 sm:pt-24 pb-24 will-change-transform"
      >
        {/* Top Edge Specular Glow Beam */}
        <div
          ref={beamRef}
          className="pointer-events-none absolute -top-1 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-teal via-cyan-400 to-transparent blur-[1px] shadow-[0_0_20px_#2a9d8f,0_0_35px_#38bdf8]"
          aria-hidden="true"
        />

        {/* Ambient Depth Orbs */}
        <GlowOrb color="teal" size={550} opacity={0.12} className="-top-32 -left-32" />
        <GlowOrb color="gold" size={450} opacity={0.08} className="top-1/3 -right-32" />
        <GlowOrb color="coral" size={500} opacity={0.08} className="bottom-10 left-1/4" />

        {/* Interactive React Bits DotGrid Background - Disabled on mobile for performance */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none opacity-45 z-0 overflow-hidden">
            <DotGrid
              dotSize={8}
              gap={28}
              baseColor="#123440"
              activeColor="#2a9d8f"
              proximity={160}
              shockRadius={260}
              shockStrength={6}
              resistance={900}
              returnDuration={1.5}
            />
          </div>
        )}

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <SectionHeader
            eyebrow="SYSTEM ARCHITECTURE & CAPABILITIES"
            title="Engineered for Scale, Speed & Precision."
            subtitle="A battle-tested stack spanning reactive frontends, resilient microservices, cloud-native container orchestrations, and high-throughput data pipelines."
            align="center"
          />

          {/* ─── Controls: Category Tabs + Realtime Search Bar ─────────────── */}
          <div className="mt-8 flex flex-col items-center gap-6">
            {/* Category Navigation Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#091b22] border border-teal/20 shadow-lg">
              {CATEGORY_TABS.map((tab) => {
                const isActive = activeCategory === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={cn(
                      'relative px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-medium transition-all duration-200 select-none cursor-pointer',
                      isActive
                        ? 'text-white shadow-[0_0_16px_rgba(42,157,143,0.4)]'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5',
                    )}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal/40 via-teal/30 to-cyan-500/30 border border-teal/50"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10 tracking-wide">{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Instant Search Bar & Active Count */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-2xl px-2">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by technology, keyword, or architectural role (e.g. Next.js, Docker, ACID)..."
                  className={cn(
                    'w-full rounded-xl px-4 py-2.5 pl-10 text-xs sm:text-sm font-sans',
                    'bg-[#0b1d24] text-white placeholder-slate-500',
                    'border border-teal/20 focus:border-teal/60 focus:outline-none focus:ring-1 focus:ring-teal/40',
                    'transition-all duration-200 shadow-inner',
                  )}
                />
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>

                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-white/10"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="shrink-0 text-xs font-mono text-slate-400">
                Showing <span className="text-teal font-semibold">{filteredSkills.length}</span> of {allSkills.length} skills
              </div>
            </div>
          </div>

          {/* ─── Primary 3D Bento Skill Cards Grid ──────────────────────────── */}
          <div
            ref={gridRef}
            className="mt-8 sm:mt-12 flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory pb-6 sm:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {filteredSkills.map((skill, idx) => (
              <SkillCard 
                key={skill.name} 
                skill={skill} 
                index={idx} 
                className="w-[75vw] max-w-[280px] sm:w-auto sm:max-w-none shrink-0 snap-center sm:snap-align-none" 
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredSkills.length === 0 && (
            <div className="mt-16 flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-teal/20 bg-[#091a21]/50">
              <p className="text-base text-slate-300 font-sans">
                No technologies found matching &ldquo;<span className="text-teal">{searchQuery}</span>&rdquo;
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('frontend')
                }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider text-teal border border-teal/40 hover:bg-teal/10 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* ─── Dual Infinite Marquee Streaming Ribbons ─────────────────────── */}
          <div className="mt-24 pt-12 border-t border-white/10">
            <div className="text-center mb-8">
              <span className="eyebrow text-xs uppercase tracking-widest text-slate-400">
                COMPLETE ECOSYSTEM &amp; TOOLING
              </span>
            </div>

            {/* Lane 1: Leftward Streaming Marquee */}
            <div className="group relative flex overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] transform-gpu">
              <div className="flex w-max shrink-0 animate-marquee-left gap-4 group-hover:[animation-play-state:paused] will-change-transform transform-gpu">
                {marqueeLane1.concat(marqueeLane1).map((item, idx) => (
                  <TechChip key={`lane1-${item.name}-${idx}`} name={item.name} />
                ))}
              </div>
            </div>

            {/* Lane 2: Rightward Streaming Marquee */}
            <div className="group relative flex overflow-hidden py-3 mt-4 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] transform-gpu">
              <div className="flex w-max shrink-0 animate-marquee-right gap-4 group-hover:[animation-play-state:paused] will-change-transform transform-gpu">
                {marqueeLane2.concat(marqueeLane2).map((item, idx) => (
                  <TechChip key={`lane2-${item.name}-${idx}`} name={item.name} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

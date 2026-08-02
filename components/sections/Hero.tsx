'use client'

import { useRef, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { gsap, ScrollTrigger } from '@/lib/gsap/gsap.config'
import GlassButton from '@/components/ui/Button/GlassButton'
import AvailabilityBadge from '@/components/ui/Badge/AvailabilityBadge'
import GlowOrb from '@/components/ui/Decorations/GlowOrb'
import SectionHeader from '@/components/ui/Typography/SectionHeader'
import TechChip from '@/components/ui/Chip/TechChip'
import RotatingText from '@/components/ui/Animations/RotatingText/RotatingText'
import TextMarquee from '@/components/ui/Animations/Marquee/TextMarquee'
import FallingText from '@/components/ui/Animations/FallingText/FallingText'
import VariableProximity from '@/components/ui/Animations/VariableProximity/VariableProximity'

import { useMotionConfig } from '@/hooks/useMotionConfig'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useImageSequence } from '@/hooks/useImageSequence'
import { useLenis } from '@/components/providers/LenisProvider'
import { useAnimationStore } from '@/store/useAnimationStore'
import { profile, stats, skillCategories, social } from '@/lib/content'

// ─── Inline SVG Icons (lucide-react does not include brand icons) ────────────

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function getStatIcon(label: string, size = 18) {
  const norm = label.toLowerCase()
  if (norm.includes('project')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 9v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    )
  }
  if (norm.includes('tech')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    )
  }
  if (norm.includes('year') || norm.includes('learn') || norm.includes('experience')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21.42 10.922a1 1 0 0 0-.019-.838L12.83 2.18a2 2 0 0 0-1.66 0L2.6 10.084a1 1 0 0 0 0 1.832l8.57 7.908a2 2 0 0 0 1.66 0l8.57-7.908a1 1 0 0 0 .02-.994z" />
        <path d="M6 12v5c0 2 2.69 3 6 3s6-1 6-3v-5" />
      </svg>
    )
  }
  if (norm.includes('open source') || norm.includes('contribution') || norm.includes('git')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <path d="M13 6h3a2 2 0 0 1 2 2v7" />
        <path d="M6 9v12" />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}

// ─── Constants ───────────────────────────────────────────────────────────────

const FRAME_COUNT = 240
const SCROLL_PER_FRAME = 20

/** Generate the hero frame image paths */
const HERO_FRAMES: string[] = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/images/frames/image-frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
)

/** All skills flattened, first 12 only */
const ALL_SKILLS = skillCategories.flatMap((cat) => cat.skills).slice(0, 12)

/** First 4 stats for the About grid */
const ABOUT_STATS = stats.slice(0, 4)

// ─── RoleCycler Sub-component ────────────────────────────────────────────────

interface RoleCyclerProps {
  roles: string[]
}

function RoleCycler({ roles }: RoleCyclerProps) {
  const { animationsEnabled } = useMotionConfig()

  if (!animationsEnabled || roles.length <= 1) {
    return (
      <span className="text-grad-teal font-display font-semibold text-hero-sub">
        {roles[0]}
      </span>
    )
  }

  return (
    <RotatingText
      texts={roles}
      mainClassName="text-white bg-teal-500 px-4 py-1 sm:py-1.5 rounded-lg font-display font-semibold text-hero-sub inline-flex overflow-hidden"
      staggerFrom="last"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-120%" }}
      staggerDuration={0.04}
      splitLevelClassName="overflow-hidden pb-1"
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      rotationInterval={4000}
    />
  )
}

// ─── Mobile Framer Variants ──────────────────────────────────────────────────

const mobileRevealVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

// ─── Mobile Layout ───────────────────────────────────────────────────────────

interface MobileLayoutProps {
  frames: string[]
}

function MobileLayout({ frames }: MobileLayoutProps) {
  const lenis = useLenis()

  return (
    <>
      {/* ── Mobile Hero ────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
        aria-label="Hero section"
      >
        {/* Static background image */}
        <div className="absolute inset-0 z-0 bg-background">
          <Image
            src={frames[0]}
            alt="Hero background — creative workspace"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            quality={85}
            priority
          />
        </div>

        {/* Gradient vignette */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: [
              'radial-gradient(ellipse at center, transparent 30%, rgba(13, 31, 38, 0.85) 100%)',
              'linear-gradient(to top, rgba(13, 31, 38, 1.0) 0%, transparent 40%)',
            ].join(', '),
          }}
        />

        {/* Content */}
        <div className="relative z-[2] w-full section-container">
          <div className="flex flex-col gap-6 items-center text-center">
            {/* Mobile text marquee */}
            <motion.div
              className="w-full -mt-2 mb-2"
              variants={mobileRevealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <TextMarquee
                text="Welcome to my Portfolio"
                className="py-2 bg-surface-deep/40 backdrop-blur-sm border-y border-teal/15 rounded-lg"
              />
            </motion.div>

            <motion.div variants={mobileRevealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <AvailabilityBadge disableAnimation />
            </motion.div>

            {/* Presented By above H1 */}
            <motion.div
              className="flex items-center gap-2.5 -mb-3"
              variants={mobileRevealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="h-[1px] w-6 bg-teal/40" />
              <span className="eyebrow !text-teal/90 !tracking-[0.25em] text-xs font-semibold">
                Presented by
              </span>
              <span className="h-[1px] w-6 bg-teal/40" />
            </motion.div>

            <motion.h1
              className="font-display text-display text-text-primary"
              variants={mobileRevealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <VariableProximity
                label={profile.name}
                highlightWords={['Pal']}
                highlightClass="text-teal drop-shadow-[0_0_25px_rgba(45,212,191,0.4)]"
                radius={130}
                falloff="linear"
                fromFontVariationSettings="'wght' 500, 'opsz' 14"
                toFontVariationSettings="'wght' 900, 'opsz' 36"
                className="font-bold tracking-tight inline-flex flex-wrap justify-center items-center gap-x-3"
              />
            </motion.h1>

            <motion.div
              className="flex flex-col gap-1 items-center"
              variants={mobileRevealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="eyebrow">Full Stack Engineer based in</span>
              <RoleCycler roles={profile.roles} />
            </motion.div>

            <motion.p
              className="text-text-secondary text-body max-w-[52ch]"
              variants={mobileRevealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              className="flex gap-4 flex-wrap flex-col sm:flex-row"
              variants={mobileRevealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <GlassButton variant="primary" onClick={() => lenis?.scrollTo('#projects')}>
                View My Work
              </GlassButton>
              <GlassButton variant="secondary" href={profile.cvSrc} download="Arghya_CV.pdf">
                Download CV
              </GlassButton>
            </motion.div>

            {/* Mini stat cards row */}
            <motion.div
              className="flex gap-3 flex-wrap justify-center mt-4"
              variants={mobileRevealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {ABOUT_STATS.slice(0, 3).map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl px-4 py-3 text-center border border-teal/30 shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(14, 33, 42, 0.92) 0%, rgba(8, 20, 26, 0.96) 100%)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  }}
                >
                  <div className="font-display text-2xl font-extrabold text-white">
                    {stat.value}<span className="text-teal font-extrabold">{stat.suffix}</span>
                  </div>
                  <div className="text-slate-200 text-[11px] uppercase tracking-wider font-sans font-semibold mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mobile About ───────────────────────────────────────────────── */}
      <section
        className="relative w-full py-section overflow-hidden"
        style={{ background: 'linear-gradient(180deg, rgba(13,31,38,1) 0%, rgba(21,46,56,1) 50%, rgba(13,31,38,1) 100%)' }}
        aria-label="About section"
      >
        <div className="section-container">
          <motion.div variants={mobileRevealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <SectionHeader eyebrow="Who I Am" title="About Me" disableAnimation />
          </motion.div>

          {/* Bio Card */}
          <motion.div
            className="rounded-2xl p-6 sm:p-7 mb-8 flex flex-col gap-4"
            style={{
              background: 'linear-gradient(135deg, rgba(14, 33, 42, 0.92) 0%, rgba(8, 20, 26, 0.96) 100%)',
              backdropFilter: 'blur(28px) saturate(200%)',
              WebkitBackdropFilter: 'blur(28px) saturate(200%)',
              border: '1px solid rgba(42, 157, 143, 0.35)',
              boxShadow: '0 16px 36px -10px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
            }}
            variants={mobileRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {profile.bio.map((paragraph, i) => (
              <p
                key={i}
                className="text-slate-200 text-body leading-relaxed font-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-2 gap-3.5 mb-8"
            variants={mobileRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {ABOUT_STATS.map((stat) => (
              <div
                key={stat.label}
                className="relative rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(14, 33, 42, 0.92) 0%, rgba(8, 20, 26, 0.96) 100%)',
                  backdropFilter: 'blur(28px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(28px) saturate(200%)',
                  border: '1px solid rgba(42, 157, 143, 0.35)',
                  boxShadow: '0 16px 32px -10px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
                }}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-teal/15 text-teal border border-teal/30">
                    {getStatIcon(stat.label, 16)}
                  </div>
                </div>
                <div className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-none tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                  {stat.value}
                  <span className="text-teal font-extrabold ml-0.5">{stat.suffix}</span>
                </div>
                <div className="text-[11px] font-sans font-semibold tracking-wider uppercase text-slate-200 mt-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Core Stack */}
          <motion.div
            className="rounded-2xl p-5 sm:p-6 mb-8"
            style={{
              background: 'linear-gradient(135deg, rgba(14, 33, 42, 0.92) 0%, rgba(8, 20, 26, 0.96) 100%)',
              backdropFilter: 'blur(28px) saturate(200%)',
              WebkitBackdropFilter: 'blur(28px) saturate(200%)',
              border: '1px solid rgba(42, 157, 143, 0.35)',
              boxShadow: '0 16px 36px -10px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
            }}
            variants={mobileRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-3.5">
              <span className="w-2 h-2 rounded-full bg-teal shadow-[0_0_8px_#2a9d8f] animate-pulse" />
              <p className="eyebrow !mb-0 !text-teal-300 font-semibold tracking-widest text-xs uppercase">Core Stack</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {ALL_SKILLS.map((skill) => (
                <TechChip key={skill.name} name={skill.name} />
              ))}
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex gap-3 flex-wrap mt-6"
            variants={mobileRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl inline-flex items-center gap-2.5 bg-[#0c1e26]/80 text-slate-100 text-sm font-sans font-medium border border-teal/30 shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
              >
                <GitHubIcon size={16} />
                GitHub
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl inline-flex items-center gap-2.5 bg-[#0c1e26]/80 text-slate-100 text-sm font-sans font-medium border border-teal/30 shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
              >
                <LinkedInIcon size={16} />
                LinkedIn
              </a>
            )}
          </motion.div>
        </div>
      </section>
    </>
  )
}

// ─── Hero Component (Desktop — Cinematic Pinned Scroll) ──────────────────────

function Hero() {
  const { animationsEnabled, imageSequenceEnabled, basicAnimations } = useMotionConfig()
  const isMobile = useIsMobile()
  const lenis = useLenis()

  // ── Refs ─────────────────────────────────────────────────────────────────
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Layer 2: Billboard name & extras
  const billboardNameRef = useRef<HTMLDivElement>(null)
  const billboardMarqueeRef = useRef<HTMLDivElement>(null)
  const billboardPresentedByRef = useRef<HTMLDivElement>(null)

  // Layer 3: Hero content
  const heroContentRef = useRef<HTMLDivElement>(null)
  const heroLeftRef = useRef<HTMLDivElement>(null)
  const heroRightRef = useRef<HTMLDivElement>(null)
  const heroNameSmallRef = useRef<HTMLHeadingElement>(null)
  const heroAvailabilityRef = useRef<HTMLDivElement>(null)
  const heroRoleRef = useRef<HTMLDivElement>(null)
  const heroTaglineRef = useRef<HTMLParagraphElement>(null)
  const heroCTARef = useRef<HTMLDivElement>(null)
  const heroStatCard1Ref = useRef<HTMLDivElement>(null)
  const heroStatCard2Ref = useRef<HTMLDivElement>(null)
  const heroStatCard3Ref = useRef<HTMLDivElement>(null)

  // Layer 3: About content
  const aboutContentRef = useRef<HTMLDivElement>(null)
  const aboutLeftRef = useRef<HTMLDivElement>(null)
  const aboutRightRef = useRef<HTMLDivElement>(null)
  const aboutBioRef = useRef<HTMLDivElement>(null)
  const aboutLinksRef = useRef<HTMLDivElement>(null)
  const aboutStatsCard1Ref = useRef<HTMLDivElement>(null)
  const aboutStatsCard2Ref = useRef<HTMLDivElement>(null)
  const aboutStatsCard3Ref = useRef<HTMLDivElement>(null)
  const aboutStatsCard4Ref = useRef<HTMLDivElement>(null)
  const statNum1Ref = useRef<HTMLSpanElement>(null)
  const statNum2Ref = useRef<HTMLSpanElement>(null)
  const statNum3Ref = useRef<HTMLSpanElement>(null)
  const statNum4Ref = useRef<HTMLSpanElement>(null)
  const aboutSkillsRef = useRef<HTMLDivElement>(null)

  // Scroll indicator
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  // Memoize frames array so reference stays stable
  const frames = useMemo(() => HERO_FRAMES, [])

  const { setProgress, currentFrameIndex, imagesRef, isLoaded } = useImageSequence(frames)

  // ── Layer 0: Canvas Render ──────────────────────────────────────────────
  useEffect(() => {
    if (!imageSequenceEnabled || isMobile) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const render = () => {
      const image = imagesRef.current[currentFrameIndex] || imagesRef.current[0]
      if (image && image.complete && image.naturalWidth !== 0) {
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
        }

        const canvasRatio = canvas.width / canvas.height
        const imgRatio = image.naturalWidth / image.naturalHeight

        let drawWidth = canvas.width
        let drawHeight = canvas.height
        let offsetX = 0
        let offsetY = 0

        if (canvasRatio > imgRatio) {
          drawHeight = canvas.width / imgRatio
          offsetY = (canvas.height - drawHeight) / 2
        } else {
          drawWidth = canvas.height * imgRatio
          offsetX = (canvas.width - drawWidth) / 2
        }

        ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight)
      }
    }

    render()

    window.addEventListener('resize', render)
    return () => window.removeEventListener('resize', render)
  }, [currentFrameIndex, imageSequenceEnabled, isMobile, imagesRef, isLoaded])

  // ── Master GSAP Timeline ────────────────────────────────────────────────
  useEffect(() => {
    if (!animationsEnabled || isMobile) return
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.delayedCall(0.15, () => {
        if (!sectionRef.current) return

        // ── Compute billboard → hero name transform values ──────────
        const billboardEl = billboardNameRef.current
        const heroSmallEl = heroNameSmallRef.current

        let computedX = 0
        let computedY = 0
        let computedScaleRatio = 0.45

        if (billboardEl && heroSmallEl) {
          const billboardRect = billboardEl.getBoundingClientRect()
          const heroSmallRect = heroSmallEl.getBoundingClientRect()

          computedScaleRatio = heroSmallRect.width / billboardRect.width

          // Offset from center of viewport to center of heroNameSmall
          computedX = Math.round(
            heroSmallRect.left + heroSmallRect.width / 2 - window.innerWidth / 2
          )
          computedY = Math.round(
            heroSmallRect.top + heroSmallRect.height / 2 - window.innerHeight / 2
          )
        }

        // ── ScrollTrigger config ────────────────────────────────────
        const scrollEnd = frames.length * SCROLL_PER_FRAME

        const masterTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${scrollEnd + window.innerHeight * 1.5}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
              const ratio = scrollEnd / (scrollEnd + window.innerHeight * 1.5)
              setProgress(Math.min(self.progress / ratio, 1))
            },
          },
          defaults: { ease: 'power3.out' },
        })

        // Pad timeline so animations finish exactly at `scrollEnd` (4800px), 
        // leaving `window.innerHeight * 1.5` of empty pinned time.
        // The first 0.5 * innerHeight acts as a buffer for the 0.8s scrub lag and reading time.
        // The final 1.0 * innerHeight is when TechStack natively slides over.
        masterTimeline.to({}, { duration: () => 7.8 * (window.innerHeight * 1.5 / scrollEnd) })

        // ─── Phase A: Billboard hold (0 → 1) ───────────────────────
        // Nothing animates. Billboard name sits large and centered.

        // ─── Task 9: Scroll indicator & billboard extras fade-out ───
        if (scrollIndicatorRef.current) {
          masterTimeline.to(
            scrollIndicatorRef.current,
            { opacity: 0, y: 10, duration: 0.4 },
            1.0
          )
        }

        if (billboardMarqueeRef.current) {
          masterTimeline.to(
            billboardMarqueeRef.current,
            { opacity: 0, y: -20, duration: 0.5, ease: 'power2.inOut' },
            1.0
          )
        }

        if (billboardPresentedByRef.current) {
          masterTimeline.to(
            billboardPresentedByRef.current,
            { opacity: 0, y: -15, duration: 0.5, ease: 'power2.inOut' },
            1.0
          )
        }

        // ─── Phase B: Name transform + Hero reveal (1 → 4.5) ───────

        // Billboard layer fades out gracefully as hero content reveals
        if (billboardEl) {
          masterTimeline.to(
            billboardEl,
            { opacity: 0, duration: 0.8, ease: 'power2.inOut' },
            1.2
          )
        }

        // Fade in hero content layer
        if (heroContentRef.current) {
          masterTimeline.to(heroContentRef.current, { opacity: 1, duration: 0.3 }, 1.4)
        }

        // Left column enters from left
        if (heroLeftRef.current) {
          masterTimeline.fromTo(
            heroLeftRef.current,
            { x: -70 },
            { x: 0, ease: 'power3.out', duration: 1.5 },
            1.5
          )
        }

        // Right column enters from right
        if (heroRightRef.current) {
          masterTimeline.fromTo(
            heroRightRef.current,
            { x: 70, opacity: 0 },
            { x: 0, opacity: 1, ease: 'power3.out', duration: 1.5 },
            1.7
          )
        }

        // Individual hero left elements stagger in
        if (heroAvailabilityRef.current) {
          masterTimeline.fromTo(
            heroAvailabilityRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
            2
          )
        }
        if (heroRoleRef.current) {
          masterTimeline.fromTo(
            heroRoleRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
            2.15
          )
        }
        if (heroTaglineRef.current) {
          masterTimeline.fromTo(
            heroTaglineRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
            2.3
          )
        }
        if (heroCTARef.current) {
          masterTimeline.fromTo(
            heroCTARef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
            2.45
          )
        }

        // Cross-fade billboard → hero small name
        if (billboardEl) {
          masterTimeline.to(billboardEl, { opacity: 0, duration: 0.4 }, 2.5)
        }
        if (heroSmallEl) {
          masterTimeline.to(heroSmallEl, { opacity: 1, duration: 0.4 }, 2.5)
        }

        // Stat mini-cards stagger in
        const statCardRefs = [heroStatCard1Ref, heroStatCard2Ref, heroStatCard3Ref]
        const statCardPositions = [2.8, 3.0, 3.2]
        statCardRefs.forEach((ref, i) => {
          if (ref.current) {
            masterTimeline.fromTo(
              ref.current,
              { y: 20, opacity: 0, scale: 0.9 },
              { y: 0, opacity: 1, scale: 1, ease: 'back.out(1.5)', duration: 0.7 },
              statCardPositions[i]
            )
          }
        })

        // ─── Phase C: Hero fades, About enters (4.5 → 6.5) ─────────

        // Fade out hero content
        if (heroContentRef.current) {
          masterTimeline.to(
            heroContentRef.current,
            { opacity: 0, y: -50, duration: 1, ease: 'power2.in' },
            4.5
          )
        }

        // About content fades in
        if (aboutContentRef.current) {
          masterTimeline.fromTo(
            aboutContentRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.8 },
            5.2
          )
        }

        // About left column enters from left
        if (aboutLeftRef.current) {
          masterTimeline.fromTo(
            aboutLeftRef.current,
            { x: -70, opacity: 0 },
            { x: 0, opacity: 1, ease: 'power3.out', duration: 1.2 },
            5.4
          )
        }

        // About right column enters from right
        if (aboutRightRef.current) {
          masterTimeline.fromTo(
            aboutRightRef.current,
            { x: 70, opacity: 0 },
            { x: 0, opacity: 1, ease: 'power3.out', duration: 1.2 },
            5.6
          )
        }

        // Bio paragraphs stagger in
        if (aboutBioRef.current) {
          const bioPs = aboutBioRef.current.querySelectorAll('p')
          if (bioPs.length > 0) {
            masterTimeline.fromTo(
              bioPs,
              { y: 25, opacity: 0 },
              { y: 0, opacity: 1, stagger: 0.2, ease: 'power3.out', duration: 0.8 },
              6.0
            )
          }
        }

        // Stat number cards stagger
        const aboutStatCardRefs = [aboutStatsCard1Ref, aboutStatsCard2Ref, aboutStatsCard3Ref, aboutStatsCard4Ref]
        const aboutStatCards = aboutStatCardRefs
          .map((ref) => ref.current)
          .filter(Boolean) as HTMLDivElement[]
        if (aboutStatCards.length > 0) {
          masterTimeline.fromTo(
            aboutStatCards,
            { y: 30, opacity: 0, scale: 0.92 },
            { y: 0, opacity: 1, scale: 1, stagger: 0.12, ease: 'back.out(1.4)', duration: 0.8 },
            6.2
          )
        }

        // Stat number count-up
        const statNumRefs = [statNum1Ref, statNum2Ref, statNum3Ref, statNum4Ref]
        statNumRefs.forEach((ref, i) => {
          const stat = ABOUT_STATS[i]
          if (ref.current && stat) {
            masterTimeline.fromTo(
              ref.current,
              { innerText: 0 },
              {
                innerText: stat.value,
                snap: { innerText: 1 },
                ease: 'power2.out',
                duration: 1.5,
              },
              6.5
            )
          }
        })

        // Skills chips container
        if (aboutSkillsRef.current) {
          masterTimeline.fromTo(
            aboutSkillsRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, ease: 'power3.out', duration: 0.8 },
            7.0
          )
        }

        // About social links
        if (aboutLinksRef.current) {
          masterTimeline.fromTo(
            aboutLinksRef.current,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, ease: 'power3.out', duration: 0.6 },
            6.8
          )
        }

        // ─── Phase D: About holds (7.0 → 10) ───────────────────────
        // Nothing animates. About is fully visible. Image sequence
        // finishes its progression to the EndFrame holographic image.

        // ─── Task 6: Secondary ScrollTrigger for active section ─────
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: () => `+=${scrollEnd * 0.5}`,
          onEnter: () => useAnimationStore.getState().setActiveSection('about'),
          onLeaveBack: () => useAnimationStore.getState().setActiveSection('hero'),
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [animationsEnabled, isMobile, frames, setProgress])

  // ── Render ──────────────────────────────────────────────────────────────

  // Mobile: completely separate layout
  if (isMobile) {
    return <MobileLayout frames={frames} />
  }

  const showSequence = imageSequenceEnabled

  // Reduced motion: show everything immediately, no scroll animation
  const isReduced = !animationsEnabled

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      aria-label="Hero and About section"
    >
      {/* ── Layer 0: Image Frame Background (z-0) ──────────────────── */}
      <div className="absolute inset-0 z-0 bg-background">
        {showSequence ? (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <Image
            src={frames[0]}
            alt="Hero background — creative workspace"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            quality={85}
            priority
          />
        )}
      </div>

      {/* ── Layer 1: Gradient Vignette (z-1) ───────────────────────── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse at center, transparent 30%, rgba(13, 31, 38, 0.85) 100%)',
            'linear-gradient(to top, rgba(13, 31, 38, 1.0) 0%, transparent 40%)',
          ].join(', '),
        }}
      />
      <div
        className="absolute top-0 left-0 w-[60%] h-full z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(13, 31, 38, 0.90) 0%, rgba(13, 31, 38, 0.70) 60%, transparent 100%)',
        }}
      />

      {/* ── Layer 2: Billboard Name & Extras (z-2) ─────────────────── */}
      <div
        ref={billboardNameRef}
        className="absolute inset-0 z-[2] pointer-events-auto"
        style={{
          overflow: 'hidden',
          opacity: isReduced ? 0 : 1,
        }}
      >
        {/* Top text marquee */}
        <div
          ref={billboardMarqueeRef}
          className="absolute top-20 md:top-24 left-0 right-0 w-full z-10 pointer-events-none"
        >
          <TextMarquee
            text="Welcome to my Portfolio"
            className="py-2.5 bg-surface-deep/35 backdrop-blur-sm border-y border-teal/15"
          />
        </div>

        {/* Presented By Text above H1 (not in same row) */}
        <div
          ref={billboardPresentedByRef}
          className="flex flex-col items-center justify-center pointer-events-none z-10"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, calc(-50% - clamp(4rem, 7.5vw, 6.5rem)))',
            whiteSpace: 'nowrap',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 sm:w-12 bg-teal/40" />
            <span className="eyebrow !text-teal/90 !tracking-[0.3em] text-xs sm:text-sm md:text-base font-semibold">
              Presented by
            </span>
            <span className="h-[1px] w-8 sm:w-12 bg-teal/40" />
          </div>
        </div>

        {/* FallingText Billboard Name with interactive physics on scroll / drag */}
        <FallingText
          text={profile.name}
          highlightWords={['Pal']}
          highlightClass="text-teal drop-shadow-[0_0_35px_rgba(45,212,191,0.45)] font-bold"
          splitBy="letters"
          trigger="scroll"
          forceTrigger={currentFrameIndex > 0}
          gravity={0.9}
          fontSize="clamp(5rem, 11vw, 9rem)"
          mouseConstraintStiffness={0.6}
          backgroundColor="transparent"
          wireframes={false}
          wordSpacing="mx-3 sm:mx-5"
          className="w-full h-full"
        />
      </div>

      {/* ── Layer 3: Content Layer (z-3) ───────────────────────────── */}

      {/* ── Hero Content Container ───────────────────────────────── */}
      <div
        ref={heroContentRef}
        className="absolute inset-0 z-[3] flex items-center"
        style={{ opacity: isReduced ? 1 : 0 }}
      >
        {/* Hero glow orbs */}
        {basicAnimations && (
          <>
            <GlowOrb
              color="teal"
              size={500}
              opacity={0.10}
              className="top-[10%] right-[5%]"
            />
            <GlowOrb
              color="coral"
              size={280}
              opacity={0.07}
              className="bottom-[20%] left-[10%]"
            />
          </>
        )}

        <div className="section-container w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
            {/* ── Left Column ────────────────────────────────────── */}
            <div ref={heroLeftRef} className="flex flex-col gap-6">
              {/* Availability badge */}
              <div ref={heroAvailabilityRef} style={{ opacity: 0 }}>
                <AvailabilityBadge disableAnimation />
              </div>

              {/* Hero small name (cross-fade target) */}
              <h2
                ref={heroNameSmallRef}
                className="font-display text-display text-text-primary"
                style={{ opacity: 0 }}
              >
                <VariableProximity
                  label={profile.name}
                  highlightWords={['Pal']}
                  highlightClass="text-teal drop-shadow-[0_0_25px_rgba(45,212,191,0.35)]"
                  containerRef={heroContentRef}
                  radius={160}
                  falloff="linear"
                  fromFontVariationSettings="'wght' 500, 'opsz' 14"
                  toFontVariationSettings="'wght' 900, 'opsz' 36"
                  className="font-bold tracking-tight inline-flex flex-wrap items-center gap-x-3"
                />
              </h2>

              {/* Role block */}
              <div
                ref={heroRoleRef}
                className="flex items-center gap-3 flex-wrap"
                style={{ opacity: 0 }}
              >
                <span className="eyebrow text-text-primary">I am a&nbsp;</span>
                <RoleCycler roles={profile.roles} />
              </div>

              {/* Tagline */}
              <p
                ref={heroTaglineRef}
                className="text-text-secondary text-body max-w-[52ch]"
                style={{ opacity: 0 }}
              >
                {profile.tagline}
              </p>

              {/* CTA row */}
              <div
                ref={heroCTARef}
                className="relative flex gap-4 flex-wrap flex-col sm:flex-row"
                style={{ opacity: 0 }}
              >
                <GlassButton variant="primary" onClick={() => lenis?.scrollTo('#projects')}>
                  View My Work
                </GlassButton>
                <GlassButton
                  variant="secondary"
                  href={profile.cvSrc}
                  download="Arghya_CV.pdf"
                  style={{
                    background: 'rgba(26, 50, 62, 0.30)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1.5px solid rgba(42, 157, 143, 0.50)',
                    borderRadius: '12px',
                  }}
                >
                  Download CV
                </GlassButton>
              </div>
            </div>

            {/* ── Right Column ───────────────────────────────────── */}
            <div
              ref={heroRightRef}
              className="relative hidden lg:flex items-center justify-center"
              style={{ opacity: 0, minHeight: '400px' }}
            >
              {/* Shared ambient glow */}
              <GlowOrb
                color="teal"
                size={450}
                opacity={0.13}
                className="absolute -top-16 left-1/2 -translate-x-1/2 pointer-events-none"
              />

              {/* Central glass card */}
              <div
                className="rounded-glass-lg p-6 flex flex-col items-center gap-4 z-10"
                style={{
                  background: 'rgba(26, 50, 62, 0.72)',
                  backdropFilter: 'blur(28px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(28px) saturate(200%)',
                  border: '1px solid rgba(42, 157, 143, 0.35)',
                }}
              >
                <Image
                  src={profile.avatarSrc}
                  alt={`${profile.name} avatar`}
                  width={140}
                  height={140}
                  className="rounded-full object-cover ring-2 ring-teal/30"
                  priority
                />
                <span className="text-sm font-sans text-text-secondary">{profile.name}</span>
                <div className="glass-subtle px-3 py-1.5 flex items-center gap-2 text-xs font-sans text-text-secondary">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse-soft"
                    style={{ background: '#22c55e' }}
                  />
                  Available
                </div>
              </div>

              {/* Mini stat cards vertical stack */}
              <div className="flex flex-col gap-3 absolute right-0 top-1/2 -translate-y-1/2 z-20">
                <div
                  ref={heroStatCard1Ref}
                  className="rounded-2xl px-5 py-4 min-w-[130px] border border-teal/30 shadow-[0_12px_28px_rgba(0,0,0,0.6)]"
                  style={{
                    opacity: 0,
                    background: 'linear-gradient(135deg, rgba(14, 33, 42, 0.92) 0%, rgba(8, 20, 26, 0.96) 100%)',
                    backdropFilter: 'blur(24px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(200%)',
                  }}
                >
                  <div className="font-display text-2xl font-extrabold text-white">
                    3<span className="text-teal font-extrabold">+</span>
                  </div>
                  <div className="text-[10px] font-sans font-semibold tracking-[0.10em] uppercase text-slate-200 mt-1">
                    Projects
                  </div>
                </div>
                <div
                  ref={heroStatCard2Ref}
                  className="rounded-2xl px-5 py-4 min-w-[130px] border border-teal/30 shadow-[0_12px_28px_rgba(0,0,0,0.6)]"
                  style={{
                    opacity: 0,
                    background: 'linear-gradient(135deg, rgba(14, 33, 42, 0.92) 0%, rgba(8, 20, 26, 0.96) 100%)',
                    backdropFilter: 'blur(24px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(200%)',
                  }}
                >
                  <div className="font-display text-2xl font-extrabold text-white">
                    15<span className="text-teal font-extrabold">+</span>
                  </div>
                  <div className="text-[10px] font-sans font-semibold tracking-[0.10em] uppercase text-slate-200 mt-1">
                    Technologies
                  </div>
                </div>
                <div
                  ref={heroStatCard3Ref}
                  className="rounded-2xl px-5 py-4 min-w-[130px] border border-teal/30 shadow-[0_12px_28px_rgba(0,0,0,0.6)]"
                  style={{
                    opacity: 0,
                    background: 'linear-gradient(135deg, rgba(14, 33, 42, 0.92) 0%, rgba(8, 20, 26, 0.96) 100%)',
                    backdropFilter: 'blur(24px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(200%)',
                  }}
                >
                  <div className="font-display text-2xl font-extrabold text-white">Cloud Run</div>
                  <div className="text-[10px] font-sans font-semibold tracking-[0.10em] uppercase text-slate-200 mt-1">
                    Deployed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── About Content Container ──────────────────────────────── */}
      <div
        ref={aboutContentRef}
        className="absolute inset-0 z-[3] flex items-center"
        style={{ opacity: isReduced ? 1 : 0 }}
      >
        {/* About glow orbs */}
        {basicAnimations && (
          <>
            <GlowOrb
              color="teal"
              size={400}
              opacity={0.12}
              className="top-[-10%] left-[40%]"
            />
            <GlowOrb
              color="gold"
              size={250}
              opacity={0.08}
              className="bottom-[10%] right-[10%]"
            />
          </>
        )}

        <div className="section-container w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[50%_50%] gap-12 lg:gap-16 items-center">
            {/* ── About Left Column ──────────────────────────────── */}
            <div ref={aboutLeftRef} className="flex flex-col gap-6" style={{ opacity: 0 }}>
              <SectionHeader eyebrow="Who I Am" title="About Me" disableAnimation />

              {/* Glass panel wrapping bio text and social links */}
              <div
                className="rounded-2xl p-7 mt-6 flex flex-col gap-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(14, 33, 42, 0.92) 0%, rgba(8, 20, 26, 0.96) 100%)',
                  backdropFilter: 'blur(30px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                  border: '1px solid rgba(42, 157, 143, 0.35)',
                  boxShadow: '0 20px 45px -15px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 0 25px -8px rgba(42, 157, 143, 0.15)',
                }}
              >
                {/* Bio paragraphs */}
                <div ref={aboutBioRef} className="flex flex-col gap-4">
                  {profile.bio.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-slate-200 text-body leading-relaxed font-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]"
                      style={{ opacity: 0 }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Social links */}
                <div ref={aboutLinksRef} className="flex gap-3 flex-wrap" style={{ opacity: 0 }}>
                  {social.github && (
                    <a
                      href={social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl inline-flex items-center gap-2.5 bg-[#0c1e26]/80 hover:bg-teal/20 text-slate-100 hover:text-white text-sm font-sans font-medium border border-teal/30 hover:border-teal/70 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.4)] hover:shadow-[0_0_15px_rgba(42,157,143,0.3)] transition-all duration-200"
                    >
                      <GitHubIcon size={16} />
                      Arghya-2007
                    </a>
                  )}
                  {social.linkedin && (
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl inline-flex items-center gap-2.5 bg-[#0c1e26]/80 hover:bg-teal/20 text-slate-100 hover:text-white text-sm font-sans font-medium border border-teal/30 hover:border-teal/70 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.4)] hover:shadow-[0_0_15px_rgba(42,157,143,0.3)] transition-all duration-200"
                    >
                      <LinkedInIcon size={16} />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* ── About Right Column ─────────────────────────────── */}
            <div ref={aboutRightRef} className="relative flex flex-col gap-8" style={{ opacity: 0 }}>
              <GlowOrb
                color="teal"
                size={500}
                opacity={0.08}
                className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none"
              />

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {ABOUT_STATS.map((stat, i) => {
                  const cardRef = [aboutStatsCard1Ref, aboutStatsCard2Ref, aboutStatsCard3Ref, aboutStatsCard4Ref][i]
                  const numRef = [statNum1Ref, statNum2Ref, statNum3Ref, statNum4Ref][i]
                  return (
                    <div
                      key={stat.label}
                      ref={cardRef}
                      className="group relative rounded-2xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-teal/60 hover:shadow-[0_0_25px_rgba(42,157,143,0.25)]"
                      style={{
                        opacity: 0,
                        background: 'linear-gradient(135deg, rgba(14, 33, 42, 0.92) 0%, rgba(8, 20, 26, 0.96) 100%)',
                        backdropFilter: 'blur(30px) saturate(200%)',
                        WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                        border: '1px solid rgba(42, 157, 143, 0.35)',
                        boxShadow: '0 16px 36px -10px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 0 20px -5px rgba(42, 157, 143, 0.15)',
                      }}
                    >
                      {/* Subtle ambient corner glow */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-teal/10 rounded-full blur-xl pointer-events-none -mr-6 -mt-6 group-hover:bg-teal/20 transition-all duration-300" />

                      {/* Top row: Icon badge */}
                      <div className="flex items-center justify-between w-full mb-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-teal/15 text-teal border border-teal/30 shadow-[0_0_12px_rgba(42,157,143,0.2)] group-hover:scale-105 group-hover:bg-teal/25 transition-all duration-300">
                          {getStatIcon(stat.label, 18)}
                        </div>
                      </div>

                      {/* Number with animated ref and suffix */}
                      <div className="font-display text-4xl lg:text-5xl font-extrabold text-white leading-none tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                        <span ref={numRef}>0</span>
                        <span className="text-teal drop-shadow-[0_0_12px_rgba(42,157,143,0.5)] font-extrabold ml-0.5">{stat.suffix}</span>
                      </div>

                      {/* Label */}
                      <div className="text-xs font-sans font-semibold tracking-wider uppercase text-slate-200 mt-2.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                        {stat.label}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Core Stack */}
              <div
                ref={aboutSkillsRef}
                className="rounded-2xl p-6 sm:p-7 flex flex-col"
                style={{
                  opacity: 0,
                  background: 'linear-gradient(135deg, rgba(14, 33, 42, 0.92) 0%, rgba(8, 20, 26, 0.96) 100%)',
                  backdropFilter: 'blur(30px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                  border: '1px solid rgba(42, 157, 143, 0.35)',
                  boxShadow: '0 20px 45px -15px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 0 25px -8px rgba(42, 157, 143, 0.15)',
                }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-2 h-2 rounded-full bg-teal shadow-[0_0_8px_#2a9d8f] animate-pulse" />
                  <p className="eyebrow !mb-0 !text-teal-300 font-semibold tracking-widest text-xs uppercase">Core Stack</p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {ALL_SKILLS.map((skill) => (
                    <TechChip key={skill.name} name={skill.name} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ─────────────────────────────────────── */}
      {animationsEnabled && (
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          {/* Vertical line with sliding dot */}
          <div
            className="relative w-[2px] h-10 rounded-sm overflow-hidden"
            style={{ background: 'rgba(42, 157, 143, 0.3)' }}
          >
            <div
              className="absolute top-0 left-0 w-full h-2 rounded-sm animate-scroll-dot"
              style={{ background: 'rgba(42, 157, 143, 0.8)' }}
            />
          </div>
          <span className="text-text-muted text-xs tracking-widest uppercase font-sans">
            scroll
          </span>
        </div>
      )}
    </section>
  )
}

export default Hero

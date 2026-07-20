import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { NeoButton } from '../neo/NeoButton'
import { ChevronDown } from 'lucide-react'
import { gsap, EASE_OUT, DURATION_MEDIUM } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useMagneticButton } from '../../hooks/useMagneticButton'
import { useStore } from '../../store'

interface HeroProps {
  className?: string
}

export function Hero({ className }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  
  const projectsBtnRef = useMagneticButton() as React.MutableRefObject<HTMLButtonElement>
  const contactBtnRef = useMagneticButton() as React.MutableRefObject<HTMLButtonElement>

  const deviceTier = useStore((s) => s.deviceTier)
  const setHeroScrollProgress = useStore((s) => s.setHeroScrollProgress)

  // Terminal typing state
  const [typingText, setTypingText] = useState('')
  const fullText = '> const arghya = { role: "MLOps & AI Infra" }'
  
  useEffect(() => {
    if (reducedMotion) {
      const t = setTimeout(() => setTypingText(fullText), 0)
      return () => clearTimeout(t)
    }
    
    let i = 0
    const interval = setInterval(() => {
      setTypingText(fullText.substring(0, i))
      i++
      if (i > fullText.length) clearInterval(interval)
    }, 50)
    
    return () => clearInterval(interval)
  }, [reducedMotion])

  useLayoutEffect(() => {
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      // Stagger reveal for text content
      gsap.fromTo(
        '.hero-reveal',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DURATION_MEDIUM,
          ease: EASE_OUT,
          stagger: 0.15,
          delay: 0.5, // Wait for typing animation to mostly finish
        }
      )

      // Scroll out effect
      gsap.to('.hero-content', {
        y: -100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            setHeroScrollProgress(self.progress)
          },
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [reducedMotion, setHeroScrollProgress])

  return (
    <section
      id="hero"
      ref={containerRef}
      className={`relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 overflow-hidden ${className ?? ''}`}
    >
      {/* Hero background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(143,191,163,0.18), transparent 60%)',
        }}
      />

      <div className="hero-content relative z-10 flex flex-col items-center gap-8 md:gap-12 lg:flex-row lg:gap-16 max-w-7xl w-full">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          {/* Terminal-style prefix */}
          <p className="font-mono text-sm md:text-base text-primary min-h-[1.5rem]">
            {typingText}
            {!reducedMotion && <span className="animate-pulse">_</span>}
          </p>

          <h1 className="hero-reveal opacity-0">
            Building{' '}
            <span className="text-primary">Infrastructure</span>
            <br />
            for Intelligence
          </h1>

          <p className="hero-reveal opacity-0 text-base md:text-lg max-w-xl mx-auto lg:mx-0">
            Aspiring MLOps & AI Infra Engineer — designing the systems
            that keep models reliable, fast, and production-ready.
          </p>

          {/* CTA buttons */}
          <div className="hero-reveal opacity-0 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <NeoButton
              ref={projectsBtnRef}
              onClick={() =>
                document
                  .getElementById('projects')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="bg-secondary text-secondary-foreground hover:bg-secondary-300"
            >
              View Projects
            </NeoButton>

            <NeoButton
              ref={contactBtnRef}
              onClick={() =>
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Get in Touch
            </NeoButton>
          </div>
        </div>

        {/* 3D placeholder — replaced with R3F HeroCore in Phase 3 */}
        <div className="flex-1 flex items-center justify-center">
          {deviceTier === 'low' && (
            <div
              className="hero-reveal opacity-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(143,191,163,0.25) 0%, rgba(224,147,122,0.10) 50%, transparent 70%)',
                boxShadow:
                  '0 0 80px rgba(143,191,163,0.15), inset 0 0 60px rgba(143,191,163,0.08)',
              }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: 'var(--text-tertiary)' }}
        >
          Scroll
        </span>
        <ChevronDown
          className="w-5 h-5 animate-bounce"
          style={{ color: 'var(--text-tertiary)' }}
        />
      </div>
    </section>
  )
}

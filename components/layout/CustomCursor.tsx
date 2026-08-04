'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useMotionConfig } from '@/hooks/useMotionConfig'
import SplashCursor from './SplashCursor'
import { useLoadingStore } from '@/store/useLoadingStore'

type CursorMode = 'default' | 'pointer' | 'text' | 'view' | 'drag' | 'custom' | 'hidden'

interface StardustParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  decay: number
  color: string
}

interface ClickRipple {
  id: number
  x: number
  y: number
}

const PARTICLE_COLORS = ['#2a9d8f', '#e9c46a', '#e76f51', '#f0f4f5', '#48cae4']

export default function CustomCursor() {
  const { cursorEnabled } = useMotionConfig()
  const isProjectSectionInView = useLoadingStore((state) => state.isProjectSectionInView)

  // References
  const auraRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Cursor state React states for DOM UI morphing
  const [cursorMode, setCursorMode] = useState<CursorMode>('default')
  const [customLabel, setCustomLabel] = useState<string>('')
  const [isClicking, setIsClicking] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [ripples, setRipples] = useState<ClickRipple[]>([])

  // Mutable animation state (avoids React re-renders during RAF)
  const stateRef = useRef({
    targetX: -100,
    targetY: -100,
    prevTargetX: -100,
    prevTargetY: -100,
    outerX: -100,
    outerY: -100,
    innerX: -100,
    innerY: -100,
    auraX: -100,
    auraY: -100,
    speed: 0,
    angle: 0,
    stretch: 1,
    rotation: 0,
    mode: 'default' as CursorMode,
    magneticCenter: null as { x: number; y: number } | null,
    particles: [] as StardustParticle[],
    isActive: false,
  })

  // Spawn stardust particles on fast movement
  const spawnParticles = useCallback((x: number, y: number, speed: number) => {
    if (speed < 2.5 || stateRef.current.particles.length > 40) return

    const count = Math.min(Math.floor(speed / 4) + 1, 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const particleSpeed = Math.random() * 1.5 + 0.5
      const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]

      stateRef.current.particles.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * particleSpeed,
        vy: Math.sin(angle) * particleSpeed,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.4,
        decay: Math.random() * 0.025 + 0.02,
        color,
      })
    }
  }, [])

  useEffect(() => {
    if (!cursorEnabled || isProjectSectionInView) return

    // Add global body class to suppress default OS cursor
    document.body.classList.add('custom-cursor-active')

    const canvas = canvasRef.current
    let ctx: CanvasRenderingContext2D | null = null
    if (canvas) {
      ctx = canvas.getContext('2d')
      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)
    }

    stateRef.current.isActive = true

    // Mouse Move Listener
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const state = stateRef.current

      state.prevTargetX = state.targetX === -100 ? clientX : state.targetX
      state.prevTargetY = state.targetY === -100 ? clientY : state.targetY
      state.targetX = clientX
      state.targetY = clientY

      if (!state.isActive) {
        state.outerX = clientX
        state.outerY = clientY
        state.innerX = clientX
        state.innerY = clientY
        state.auraX = clientX
        state.auraY = clientY
        state.isActive = true
      }

      setIsVisible(true)

      // Intelligent element detection & context-aware mode determination
      const target = e.target as HTMLElement | null
      if (!target) return

      // 0. Disable custom cursor entirely
      if (target.closest('.disable-custom-cursor, #sheryjs, .controlKit, .dg.ac, .lil-gui')) {
        state.mode = 'hidden'
        setCursorMode('hidden')
        state.magneticCenter = null
        return
      }

      // 1. Explicit data-cursor-text
      const textElem = target.closest('[data-cursor-text]') as HTMLElement | null
      if (textElem) {
        const text = textElem.getAttribute('data-cursor-text') || 'EXPLORE'
        state.mode = 'custom'
        setCursorMode('custom')
        setCustomLabel(text)
        state.magneticCenter = null
        return
      }

      // 2. Explicit data-cursor mode
      const explicitCursorElem = target.closest('[data-cursor]') as HTMLElement | null
      if (explicitCursorElem) {
        const mode = explicitCursorElem.getAttribute('data-cursor') as CursorMode
        if (mode) {
          state.mode = mode
          setCursorMode(mode)
          if (mode === 'view') setCustomLabel('VIEW ↗')
          if (mode === 'drag') setCustomLabel('DRAG ↔')
          state.magneticCenter = null
          return
        }
      }

      // 3. Project Cards / View Targets
      const viewCard = target.closest('.project-card, article, [data-project], figure.interactive-media') as HTMLElement | null
      if (viewCard) {
        state.mode = 'view'
        setCursorMode('view')
        setCustomLabel('VIEW ↗')
        state.magneticCenter = null
        return
      }

      // 4. Drag / Canvas Targets
      const dragElem = target.closest('canvas.matter-canvas, [data-draggable], .drag-zone') as HTMLElement | null
      if (dragElem) {
        state.mode = 'drag'
        setCursorMode('drag')
        setCustomLabel('DRAG ↔')
        state.magneticCenter = null
        return
      }

      // 5. Interactive Buttons / Links (with subtle magnetic attraction)
      const buttonOrLink = target.closest('a, button, [role="button"], input[type="submit"], input[type="button"], select, label, .clickable') as HTMLElement | null
      if (buttonOrLink) {
        state.mode = 'pointer'
        setCursorMode('pointer')
        setCustomLabel('')

        // Calculate magnetic center if element is compact
        const rect = buttonOrLink.getBoundingClientRect()
        if (rect.width < 280 && rect.height < 100) {
          state.magneticCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          }
        } else {
          state.magneticCenter = null
        }
        return
      }

      // 6. Text / Headings
      const textBlock = target.closest('p, h1, h2, h3, h4, h5, h6, blockquote, input[type="text"], input[type="email"], textarea') as HTMLElement | null
      if (textBlock && !textBlock.closest('a, button, [role="button"]')) {
        state.mode = 'text'
        setCursorMode('text')
        setCustomLabel('')
        state.magneticCenter = null
        return
      }

      // Default state
      state.mode = 'default'
      setCursorMode('default')
      setCustomLabel('')
      state.magneticCenter = null
    }

    // Mouse Down / Up
    const handleMouseDown = (e: MouseEvent) => {
      if (stateRef.current.mode === 'hidden') return

      setIsClicking(true)

      // Spawn a dynamic shockwave ripple
      const rippleId = Date.now() + Math.random()
      setRipples((prev) => [...prev.slice(-3), { id: rippleId, x: e.clientX, y: e.clientY }])

      // Auto clear ripple after animation finishes
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== rippleId))
      }, 550)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    // Window Boundary Listeners
    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Animation Loop (60/120 FPS RAF)
    let animationFrameId: number

    const renderLoop = () => {
      const state = stateRef.current

      // Calculate instantaneous velocity
      const dx = state.targetX - state.prevTargetX
      const dy = state.targetY - state.prevTargetY
      const instantSpeed = Math.hypot(dx, dy)

      // Smooth velocity interpolation
      state.speed += (instantSpeed - state.speed) * 0.25

      // Aerodynamic stretch and rotation calculation
      if (state.speed > 1.8 && (state.mode === 'default' || state.mode === 'pointer')) {
        const moveAngle = Math.atan2(dy, dx) * (180 / Math.PI)
        state.angle = moveAngle
        const targetStretch = Math.min(1 + state.speed * 0.018, 1.45)
        state.stretch += (targetStretch - state.stretch) * 0.2
      } else {
        state.stretch += (1.0 - state.stretch) * 0.18
        state.angle += (0 - state.angle) * 0.1
      }

      // Continuous subtle HUD rotation
      state.rotation = (state.rotation + (state.mode === 'pointer' ? 1.5 : 0.4)) % 360

      // Magnetic pull physics for outer reticle
      let targetOuterX = state.targetX
      let targetOuterY = state.targetY

      if (state.magneticCenter && state.mode === 'pointer') {
        const magDistX = state.targetX - state.magneticCenter.x
        const magDistY = state.targetY - state.magneticCenter.y
        const magDist = Math.hypot(magDistX, magDistY)

        if (magDist < 90) {
          targetOuterX = state.magneticCenter.x + magDistX * 0.25
          targetOuterY = state.magneticCenter.y + magDistY * 0.25
        }
      }

      // Silky spring / lerp positions
      state.innerX += (state.targetX - state.innerX) * 0.82
      state.innerY += (state.targetY - state.innerY) * 0.82

      const outerLerp = state.magneticCenter ? 0.22 : 0.16
      state.outerX += (targetOuterX - state.outerX) * outerLerp
      state.outerY += (targetOuterY - state.outerY) * outerLerp

      state.auraX += (state.targetX - state.auraX) * 0.09
      state.auraY += (state.targetY - state.auraY) * 0.09

      // Spawn stardust particles
      if (state.mode !== 'hidden') {
        spawnParticles(state.targetX, state.targetY, state.speed)
      }

      // Apply transforms to DOM layers directly
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${state.innerX}px, ${state.innerY}px, 0)`
      }

      if (outerRef.current) {
        if (state.mode === 'default' && state.stretch > 1.05) {
          outerRef.current.style.transform = `translate3d(${state.outerX}px, ${state.outerY}px, 0) rotate(${state.angle}deg) scale(${state.stretch}, ${1 / Math.sqrt(state.stretch)})`
        } else {
          outerRef.current.style.transform = `translate3d(${state.outerX}px, ${state.outerY}px, 0)`
        }
      }

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${state.auraX}px, ${state.auraY}px, 0)`
      }

      // Render Stardust Particles
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (let i = state.particles.length - 1; i >= 0; i--) {
          const p = state.particles[i]
          p.x += p.vx
          p.y += p.vy
          p.alpha -= p.decay
          p.size = Math.max(0, p.size - 0.02)

          if (p.alpha <= 0 || p.size <= 0) {
            state.particles.splice(i, 1)
            continue
          }

          ctx.save()
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.globalAlpha = p.alpha
          ctx.shadowBlur = 6
          ctx.shadowColor = p.color
          ctx.fill()
          ctx.restore()
        }
      }

      state.prevTargetX = state.targetX
      state.prevTargetY = state.targetY

      animationFrameId = requestAnimationFrame(renderLoop)
    }

    animationFrameId = requestAnimationFrame(renderLoop)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(animationFrameId)
    }
  }, [cursorEnabled, isProjectSectionInView, spawnParticles])

  if (!cursorEnabled || isProjectSectionInView) return null

  return (
    <>
      {/* 1. Fluid Splash Effect (Preserved completely) */}
      <div 
        className="!pointer-events-none fixed inset-0 z-[9994] transition-opacity duration-300"
        style={{ opacity: cursorMode === 'hidden' ? 0 : 1 }}
      >
        {cursorMode !== 'hidden' && <SplashCursor COLOR="#2a9d8f" RAINBOW_MODE={false} />}
      </div>

      {/* 2. Cosmic Stardust Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="!pointer-events-none fixed inset-0 z-[9995] transition-opacity duration-300"
        style={{ opacity: isVisible && cursorMode !== 'hidden' ? 1 : 0 }}
      />

      {/* 3. Ambient Luminous Aura (Soft glowing atmospheric trail) */}
      <div
        ref={auraRef}
        className="!pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-[9996] transition-opacity duration-500 will-change-transform"
        style={{ opacity: isVisible ? (cursorMode === 'hidden' ? 0 : 0.85) : 0 }}
      >
        <div
          className="w-[120px] h-[120px] rounded-full blur-[26px]"
          style={{
            background:
              cursorMode === 'pointer' || cursorMode === 'view'
                ? 'radial-gradient(circle, rgba(42,157,143,0.38) 0%, rgba(233,196,106,0.18) 45%, transparent 70%)'
                : 'radial-gradient(circle, rgba(42,157,143,0.26) 0%, rgba(38,70,83,0.12) 50%, transparent 70%)',
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* 4. Click Shockwave Ripples */}
      <div className="!pointer-events-none fixed inset-0 z-[9997] overflow-hidden">
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute rounded-full border border-teal/70 -translate-x-1/2 -translate-y-1/2 animate-cursor-ripple"
            style={{
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
              boxShadow: '0 0 20px rgba(42,157,143,0.6), inset 0 0 10px rgba(233,196,106,0.4)',
            }}
          />
        ))}
      </div>

      {/* 5. Outer HUD Reticle & Context Morphing Layer */}
      <div
        ref={outerRef}
        className="!pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-[9998] flex items-center justify-center will-change-transform"
        style={{
          opacity: isVisible && cursorMode !== 'hidden' ? 1 : 0,
          transition: 'opacity 0.25s ease-out, width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* MODE: Text I-Beam */}
        {cursorMode === 'text' && (
          <div className="relative flex flex-col items-center justify-between h-[28px] w-[3px]">
            {/* Top Serif */}
            <div className="w-[10px] h-[1.5px] bg-gradient-to-r from-transparent via-teal to-transparent shadow-[0_0_8px_rgba(42,157,143,0.9)]" />
            {/* Neon Vertical Bar */}
            <div className="w-[2px] h-full bg-gradient-to-b from-teal via-gold to-teal rounded-full shadow-[0_0_10px_rgba(42,157,143,0.8)] animate-pulse" />
            {/* Bottom Serif */}
            <div className="w-[10px] h-[1.5px] bg-gradient-to-r from-transparent via-teal to-transparent shadow-[0_0_8px_rgba(42,157,143,0.9)]" />
          </div>
        )}

        {/* MODE: View / Media Orb Badge */}
        {cursorMode === 'view' && (
          <div className="relative flex items-center justify-center w-[76px] h-[76px] rounded-full bg-[rgba(21,46,56,0.8)] backdrop-blur-md border border-teal/50 shadow-[0_0_30px_rgba(42,157,143,0.45)] animate-in zoom-in-75 duration-200">
            {/* Rotating border accent */}
            <div className="absolute inset-0 rounded-full border border-dashed border-gold/40 animate-spin" style={{ animationDuration: '12s' }} />
            <span className="font-mono text-[11px] font-bold tracking-widest text-text-primary uppercase drop-shadow-[0_0_6px_rgba(42,157,143,0.8)]">
              {customLabel || 'VIEW ↗'}
            </span>
          </div>
        )}

        {/* MODE: Drag Capsule Badge */}
        {cursorMode === 'drag' && (
          <div className="relative flex items-center justify-center px-4 py-1.5 rounded-full bg-[rgba(21,46,56,0.85)] backdrop-blur-md border border-teal/60 shadow-[0_0_25px_rgba(42,157,143,0.4)] animate-in zoom-in-75 duration-200">
            <span className="font-mono text-[11px] font-bold tracking-wider text-teal drop-shadow-[0_0_6px_rgba(42,157,143,0.8)]">
              {customLabel || 'DRAG ↔'}
            </span>
          </div>
        )}

        {/* MODE: Custom Text Badge */}
        {cursorMode === 'custom' && (
          <div className="relative flex items-center justify-center px-3.5 py-1.5 rounded-full bg-[rgba(21,46,56,0.85)] backdrop-blur-md border border-gold/60 shadow-[0_0_25px_rgba(233,196,106,0.4)] animate-in zoom-in-75 duration-200">
            <span className="font-mono text-[11px] font-bold tracking-wider text-gold drop-shadow-[0_0_6px_rgba(233,196,106,0.8)]">
              {customLabel}
            </span>
          </div>
        )}

        {/* MODE: Default & Pointer (High-Tech HUD Reticle) */}
        {(cursorMode === 'default' || cursorMode === 'pointer') && (
          <div
            className={`relative flex items-center justify-center transition-all duration-300 ${
              cursorMode === 'pointer' ? 'w-[52px] h-[52px]' : 'w-[36px] h-[36px]'
            }`}
          >
            {/* SVG Precision Compass Reticle */}
            <svg
              className="w-full h-full animate-spin"
              style={{
                animationDuration: cursorMode === 'pointer' ? '8s' : '18s',
                animationTimingFunction: 'linear',
              }}
              viewBox="0 0 100 100"
            >
              <defs>
                <linearGradient id="cursorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2a9d8f" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#e9c46a" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#e76f51" stopOpacity="0.75" />
                </linearGradient>
                <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2a9d8f" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#e9c46a" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Outer Dashed Gauge */}
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="url(#cursorGrad)"
                strokeWidth={cursorMode === 'pointer' ? '2.5' : '1.8'}
                strokeDasharray={cursorMode === 'pointer' ? '6 6' : '3 4'}
              />

              {/* Inner Accent Ring */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill={cursorMode === 'pointer' ? 'url(#glowGrad)' : 'none'}
                stroke="rgba(42, 157, 143, 0.25)"
                strokeWidth="1"
              />

              {/* 4 Corner Targeting Tick Brackets */}
              <g stroke="url(#cursorGrad)" strokeWidth={cursorMode === 'pointer' ? '2.5' : '1.8'} fill="none">
                {/* Top-Left */}
                <path d="M 30 18 L 18 18 L 18 30" />
                {/* Top-Right */}
                <path d="M 70 18 L 82 18 L 82 30" />
                {/* Bottom-Left */}
                <path d="M 30 82 L 18 82 L 18 70" />
                {/* Bottom-Right */}
                <path d="M 70 82 L 82 82 L 82 70" />
              </g>

              {/* Orbiting Planetary Satellites */}
              <circle cx="50" cy="6" r={cursorMode === 'pointer' ? '3' : '2'} fill="#e9c46a">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="50" cy="94" r={cursorMode === 'pointer' ? '3' : '2'} fill="#2a9d8f">
                <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>

            {/* Glowing Corner Aura in pointer mode */}
            {cursorMode === 'pointer' && (
              <div className="absolute inset-0 rounded-full border border-teal/40 animate-ping opacity-30" />
            )}
          </div>
        )}
      </div>

      {/* 6. High-Precision Snappy Core Jewel (Zero-Lag Center Dot) */}
      <div
        ref={innerRef}
        className="!pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-[9999] will-change-transform transition-[opacity,transform] duration-150"
        style={{
          opacity: isVisible && cursorMode !== 'text' && cursorMode !== 'hidden' && cursorMode !== 'view' ? 1 : 0,
        }}
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-200 ${
            isClicking ? 'scale-50' : cursorMode === 'pointer' ? 'scale-125' : 'scale-100'
          }`}
        >
          {/* Micro Outer Diamond Halo */}
          <div
            className="w-[10px] h-[10px] rotate-45 border border-teal/80 bg-teal/20 backdrop-blur-[2px]"
            style={{
              boxShadow: '0 0 12px rgba(42, 157, 143, 0.9), 0 0 20px rgba(233, 196, 106, 0.5)',
            }}
          />

          {/* Central Radiant White Jewel */}
          <div className="absolute w-[4px] h-[4px] rounded-full bg-text-primary shadow-[0_0_6px_#ffffff]" />
        </div>
      </div>
    </>
  )
}

'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLoadingStore, type LoadingStatus } from '@/store/useLoadingStore'
import { useAnimationStore } from '@/store/useAnimationStore'

// Key frames to preload during initial splash (first 15 frames + key profile assets)
const CRITICAL_FRAMES = Array.from(
  { length: 240 },
  (_, i) => `/images/frames/image-frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
)

const STATUS_STAGES: { threshold: number; status: LoadingStatus }[] = [
  { threshold: 0, status: 'INITIALIZING ENVIRONMENT' },
  { threshold: 25, status: 'BENCHMARKING GPU & ENGINE' },
  { threshold: 50, status: 'PRELOADING ASSETS & FRAMES' },
  { threshold: 75, status: 'CALIBRATING INTERACTION MESH' },
  { threshold: 99, status: 'SYSTEM READY • WELCOME' },
]

export default function LoadingScreen() {
  const { isLoading, progress, status, setProgress, setStatus, setComplete, mountedComponents } = useLoadingStore()
  const gpuTier = useAnimationStore((state) => state.gpuTier)

  const [assetsReady, setAssetsReady] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const progressRef = useRef(0)
  const animFrameRef = useRef<number | null>(null)

  // ── Asset Preloading (Non-blocking batching) ────────────────────────────────
  useEffect(() => {
    let isCancelled = false

    const preloadAssets = async () => {
      try {
        // 1. Wait for web fonts
        if (typeof document !== 'undefined' && 'fonts' in document) {
          await document.fonts.ready
        }

        // 2. Preload first 24 essential frames without blocking CPU/GPU
        const initialFrames = CRITICAL_FRAMES.slice(0, 24)
        const imagePromises = initialFrames.map((src) => {
          return new Promise<void>((resolve) => {
            const img = new Image()
            img.onload = () => resolve()
            img.onerror = () => resolve() // Continue on error
            img.src = src
          })
        })

        await Promise.all(imagePromises)

        if (!isCancelled) {
          setAssetsReady(true)
        }

        // 3. Queue remainder in background during idle time
        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
          window.requestIdleCallback(() => {
            CRITICAL_FRAMES.slice(24).forEach((src) => {
              const img = new Image()
              img.src = src
            })
          })
        }
      } catch {
        if (!isCancelled) {
          setAssetsReady(true)
        }
      }
    }

    preloadAssets()

    return () => {
      isCancelled = true
    }
  }, [])

  // ── Smooth RAF Progress Interpolation ───────────────────────────────────────
  useEffect(() => {
    if (!isLoading) return

    // Lock page scroll
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const startTime = performance.now()
    const MIN_DURATION = 2200 // 2.2 seconds minimum aesthetic presentation

    const updateProgress = (now: number) => {
      const elapsed = now - startTime
      const timeRatio = Math.min(1, elapsed / MIN_DURATION)

      // Ease out cubic progression
      const easeProgress = 1 - Math.pow(1 - timeRatio, 3)

      const allComponentsMounted = 
        mountedComponents['hero'] && 
        mountedComponents['techStack'] && 
        mountedComponents['roadMap'] && 
        mountedComponents['projectWrapper']

      // Target progress is capped at 88% until actual assets are confirmed ready and dynamic components are mounted
      const maxAllowed = (assetsReady && allComponentsMounted) ? 100 : 88
      const calculated = Math.min(maxAllowed, Math.round(easeProgress * 100))

      if (calculated > progressRef.current) {
        progressRef.current = calculated
        setProgress(calculated)

        // Update status text
        const currentStage = [...STATUS_STAGES]
          .reverse()
          .find((stage) => calculated >= stage.threshold)
        if (currentStage && currentStage.status !== status) {
          setStatus(currentStage.status)
        }
      }

      if (progressRef.current >= 100 && assetsReady) {
        // Completed loading — short hold before exit
        setTimeout(() => {
          setIsExiting(true)
          // Complete after exit curtain transitions
          setTimeout(() => {
            setComplete()
            document.body.style.overflow = originalOverflow
          }, 850)
        }, 300)
      } else {
        animFrameRef.current = requestAnimationFrame(updateProgress)
      }
    }

    animFrameRef.current = requestAnimationFrame(updateProgress)

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
      document.body.style.overflow = originalOverflow
    }
  }, [assetsReady, isLoading, setProgress, setStatus, setComplete, mountedComponents, status])

  if (!isLoading) return null

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="loader-main"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col justify-between items-center bg-[#0d1f26] select-none overflow-hidden cursor-wait"
          style={{ width: '100vw', height: '100vh' }}
        >
          {/* ── Ambient Background Glows ── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#e76f51]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-[#e9c46a]/10 rounded-full blur-[130px] pointer-events-none" />

          {/* ── Subtle Background Architectural Grid ── */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `radial-gradient(rgba(42, 157, 143, 0.3) 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />

          {/* ── Top Header Telemetry ── */}
          <div className="relative z-10 w-full px-6 sm:px-12 pt-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal"></span>
              </span>
              <span className="font-mono text-xs tracking-widest text-teal uppercase font-semibold">
                SYSTEM ONLINE
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-6 font-mono text-[11px] text-text-secondary tracking-wider">
              <span>GPU: <strong className="text-text-primary uppercase">{gpuTier}</strong></span>
              <span className="text-teal/40">/</span>
              <span>RENDER: <strong className="text-text-primary">GSAP + CANVAS</strong></span>
              <span className="text-teal/40">/</span>
              <span>BUILD: <strong className="text-text-primary">2026.08</strong></span>
            </div>
          </div>

          {/* ── Central Cybernetic Loader & Brand Core ── */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 -mt-4">
            {/* Concentric Rotating Rings & Core */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center mb-8">
              {/* Outer Slow Dash Ring */}
              <motion.svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full text-teal/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeDasharray="4 6"
                />
              </motion.svg>

              {/* Middle Reverse Ring */}
              <motion.svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full text-[#e9c46a]/40"
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="18 12"
                />
              </motion.svg>

              {/* Inner Active Progress Ring */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="none"
                  stroke="rgba(42, 157, 143, 0.15)"
                  strokeWidth="3"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="none"
                  stroke="url(#loader-gradient)"
                  strokeWidth="3"
                  strokeDasharray="188.5"
                  strokeDashoffset={188.5 - (188.5 * progress) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-150 ease-out"
                />
                <defs>
                  <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e76f51" />
                    <stop offset="50%" stopColor="#e9c46a" />
                    <stop offset="100%" stopColor="#2a9d8f" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Glowing Center Percentage */}
              <div className="flex flex-col items-center justify-center">
                <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tighter text-text-primary drop-shadow-[0_0_15px_rgba(42,157,143,0.5)] tabular-nums">
                  {String(progress).padStart(2, '0')}
                  <span className="text-base sm:text-lg text-teal font-light ml-0.5">%</span>
                </span>
              </div>
            </div>

            {/* Brand Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-grad-warm mb-2"
            >
              Arghya Pal
            </motion.h1>

            {/* Subtitle / Role Tag */}
            <p className="font-sans text-xs sm:text-sm text-text-secondary tracking-widest uppercase mb-6">
              Full Stack & Cloud Architecture
            </p>

            {/* Status Step Label */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-deep/80 border border-teal/20 backdrop-blur-md">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              <span className="font-mono text-[11px] sm:text-xs text-teal font-medium tracking-wider">
                {status}
              </span>
            </div>
          </div>

          {/* ── Bottom Section: Progress Bar & Footer Telemetry ── */}
          <div className="relative z-10 w-full px-6 sm:px-12 pb-8 flex flex-col items-center">
            {/* Sleek Glowing Progress Bar */}
            <div className="w-full max-w-xl mb-6">
              <div className="relative h-[3px] w-full bg-surface-mid/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#e76f51] via-[#e9c46a] to-teal rounded-full transition-all duration-150 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  {/* Glowing head light */}
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-teal rounded-full blur-sm opacity-90" />
                </div>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between text-center gap-2 font-mono text-[10px] sm:text-[11px] text-text-muted tracking-widest uppercase">
              <span>EXPERIENCE CURATED WITH NEXT.JS 16 & GSAP</span>
              <span>© {new Date().getFullYear()} ARGHYA.DEV • ALL RIGHTS RESERVED</span>
            </div>
          </div>
        </motion.div>
      ) : (
        /* ─── Dual-Panel Curtain Reveal Transition ─── */
        <div key="loader-curtain" className="fixed inset-0 z-[99999] pointer-events-none flex flex-col">
          {/* Top Panel slides up */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.85, ease: [0.77, 0, 0.175, 1] }}
            className="w-full h-1/2 bg-[#0d1f26] border-b border-teal/40 relative shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          >
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-teal to-transparent" />
          </motion.div>

          {/* Bottom Panel slides down */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{ duration: 0.85, ease: [0.77, 0, 0.175, 1] }}
            className="w-full h-1/2 bg-[#0d1f26] border-t border-teal/40 relative shadow-[0_-10px_30px_rgba(0,0,0,0.8)]"
          >
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-teal to-transparent" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

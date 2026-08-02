'use client'

import { useEffect, useState, createContext, useContext } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap/gsap.config'
import { useLoadingStore } from '@/store/useLoadingStore'

const LenisContext = createContext<Lenis | null>(null)

export function useLenis(): Lenis | null {
  return useContext(LenisContext)
}

interface LenisProviderProps {
  children: React.ReactNode
}

/**
 * Initializes Lenis smooth scroll and syncs it with GSAP ScrollTrigger.
 * Disabled on mobile (< 768px) — native scroll is preferred on touch.
 */
export function LenisProvider({ children }: LenisProviderProps) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null)
  const isLoading = useLoadingStore((state) => state.isLoading)

  useEffect(() => {
    // Disable Lenis on mobile/tablet
    const isMobile = window.innerWidth < 768
    if (isMobile) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // eslint-disable-next-line
    setLenisInstance(lenis)

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker to drive Lenis RAF loop
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      setLenisInstance(null)
    }
  }, [])

  // Control scrolling based on global loading state
  useEffect(() => {
    if (!lenisInstance) return

    if (isLoading) {
      lenisInstance.stop()
    } else {
      lenisInstance.start()
    }
  }, [lenisInstance, isLoading])

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  )
}


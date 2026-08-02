'use client'

import { useEffect } from 'react'
import { getGPUTier } from 'detect-gpu'
import { useAnimationStore, type GPUTier } from '@/store/useAnimationStore'

interface AnimationProviderProps {
  children: React.ReactNode
}

/**
 * Runs GPU detection and prefers-reduced-motion check on mount.
 * Writes results to Zustand store. Must wrap the entire app.
 */
export function AnimationProvider({ children }: AnimationProviderProps) {
  const { setGpuTier } = useAnimationStore()

  useEffect(() => {
    // Check reduced motion preference FIRST (synchronous)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    useAnimationStore.setState({ prefersReducedMotion: reducedMotion })

    // If reduced motion is preferred, skip GPU detection entirely
    if (reducedMotion) {
      useAnimationStore.setState({ gpuTier: 'low', animationsEnabled: false })
      return
    }

    // GPU detection (async)
    const detectGPU = async () => {
      try {
        const result = await getGPUTier()

        let tier: GPUTier
        if (result.tier >= 3) {
          tier = 'high'
        } else if (result.tier === 2) {
          tier = 'mid'
        } else {
          tier = 'low'
        }

        setGpuTier(tier)
      } catch {
        // Detection failed — assume mid tier (safe default)
        setGpuTier('mid')
      }
    }

    detectGPU()

    // Listen for reduced motion changes (user can toggle in OS settings)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e: MediaQueryListEvent) => {
      useAnimationStore.setState({
        prefersReducedMotion: e.matches,
        animationsEnabled: !e.matches && useAnimationStore.getState().gpuTier !== 'low',
      })
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [setGpuTier])

  return <>{children}</>
}

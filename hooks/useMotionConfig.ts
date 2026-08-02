import { useAnimationStore, type GPUTier } from '@/store/useAnimationStore'

export interface MotionConfig {
  animationsEnabled: boolean
  gpuTier: GPUTier
  reducedMotion: boolean
  /** True only on high-GPU, non-reduced-motion environments */
  fullAnimations: boolean
  /** True on high and mid GPU tiers */
  basicAnimations: boolean
  /** Whether image frame scroll should run */
  imageSequenceEnabled: boolean
  /** Whether custom cursor should render */
  cursorEnabled: boolean
}

/**
 * Consume this hook in every animated component.
 * Never run GSAP or Framer animations without checking animationsEnabled first.
 */
export function useMotionConfig(): MotionConfig {
  const { gpuTier, prefersReducedMotion, animationsEnabled } = useAnimationStore()

  return {
    animationsEnabled,
    gpuTier,
    reducedMotion: prefersReducedMotion,
    fullAnimations: gpuTier === 'high' && !prefersReducedMotion,
    basicAnimations: (gpuTier === 'high' || gpuTier === 'mid') && !prefersReducedMotion,
    imageSequenceEnabled: gpuTier === 'high' && !prefersReducedMotion,
    cursorEnabled: gpuTier === 'high' && !prefersReducedMotion,
  }
}

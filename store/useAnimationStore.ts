import { create } from 'zustand'

export type GPUTier = 'high' | 'mid' | 'low' | 'unknown'
export type SectionId = 'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'contact'

interface AnimationStore {
  // GPU and motion
  gpuTier: GPUTier
  prefersReducedMotion: boolean
  animationsEnabled: boolean

  // Navigation state
  activeSection: SectionId

  // Actions
  setGpuTier: (tier: GPUTier) => void
  setActiveSection: (section: SectionId) => void
}

export const useAnimationStore = create<AnimationStore>((set, get) => ({
  // Initial state — conservative defaults before detection runs
  gpuTier: 'unknown',
  prefersReducedMotion: false,
  animationsEnabled: false, // false until detection completes

  activeSection: 'hero',

  setGpuTier: (tier: GPUTier) => {
    const { prefersReducedMotion } = get()
    set({
      gpuTier: tier,
      animationsEnabled: tier !== 'low' && !prefersReducedMotion,
    })
  },

  setActiveSection: (section: SectionId) => set({ activeSection: section }),
}))

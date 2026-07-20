import { create } from 'zustand'

export type DeviceTier = 'high' | 'medium' | 'low'

interface AppState {
  heroScrollProgress: number
  setHeroScrollProgress: (progress: number) => void
  globalScrollProgress: number
  setGlobalScrollProgress: (progress: number) => void
  activeSectionIndex: number
  setActiveSectionIndex: (index: number) => void
  sectionScrollProgress: number
  setSectionScrollProgress: (progress: number) => void
  deviceTier: DeviceTier
  setDeviceTier: (tier: DeviceTier) => void
  reducedMotion: boolean
  setReducedMotion: (reduced: boolean) => void
}

// Simple heuristic for device capability
const detectDeviceTier = (): DeviceTier => {
  if (typeof window === 'undefined') return 'high'
  const isMobile = window.innerWidth < 768
  const cores = navigator.hardwareConcurrency || 4

  if (isMobile && cores <= 4) return 'low' // Low-end mobile
  if (isMobile || cores < 6) return 'medium' // Mid-range mobile or low-end desktop
  return 'high' // High-end desktop
}

export const useStore = create<AppState & { isModelInteractive: boolean }>((set, get) => ({
  heroScrollProgress: 0,
  setHeroScrollProgress: (progress) => set({ heroScrollProgress: progress }),
  globalScrollProgress: 0,
  setGlobalScrollProgress: (progress) => set({ globalScrollProgress: progress }),
  activeSectionIndex: 0,
  setActiveSectionIndex: (index) => set({ activeSectionIndex: index }),
  sectionScrollProgress: 0,
  setSectionScrollProgress: (progress) => set({ sectionScrollProgress: progress }),
  deviceTier: detectDeviceTier(),
  setDeviceTier: (tier) => set({ deviceTier: tier }),
  reducedMotion: false,
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
  get isModelInteractive() {
    // Interactive in About (1), TechStack (2), Projects (3), Roadmap (4)
    // Static in Hero (0) and Contact (5)
    const idx = get().activeSectionIndex;
    return idx >= 1 && idx <= 4;
  }
}))

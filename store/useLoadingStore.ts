import { create } from 'zustand'

export type LoadingStatus =
  | 'INITIALIZING ENVIRONMENT'
  | 'BENCHMARKING GPU & ENGINE'
  | 'PRELOADING ASSETS & FRAMES'
  | 'CALIBRATING INTERACTION MESH'
  | 'SYSTEM READY • WELCOME'

interface LoadingStore {
  isLoading: boolean
  isComplete: boolean
  progress: number
  status: LoadingStatus

  mountedComponents: Record<string, boolean>
  isProjectSectionInView: boolean

  setProgress: (progress: number) => void
  setStatus: (status: LoadingStatus) => void
  setIsLoading: (loading: boolean) => void
  setComplete: () => void
  setComponentMounted: (componentName: string) => void
  setIsProjectSectionInView: (inView: boolean) => void
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: true,
  isComplete: false,
  progress: 0,
  status: 'INITIALIZING ENVIRONMENT',
  mountedComponents: {},
  isProjectSectionInView: false,

  setProgress: (progress: number) =>
    set({ progress: Math.min(100, Math.max(0, progress)) }),

  setStatus: (status: LoadingStatus) => set({ status }),

  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  setComplete: () => set({ isLoading: false, isComplete: true }),

  setComponentMounted: (componentName: string) =>
    set((state) => ({
      mountedComponents: { ...state.mountedComponents, [componentName]: true },
    })),

  setIsProjectSectionInView: (inView: boolean) => set({ isProjectSectionInView: inView }),
}))

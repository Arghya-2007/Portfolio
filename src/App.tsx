import { ReactLenis } from 'lenis/react'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { TechStack } from './components/sections/TechStack'
import { Projects } from './components/sections/Projects'
import { Roadmap } from './components/sections/Roadmap'
import { Contact } from './components/sections/Contact'
import { AnimatedTrace } from './components/ui/AnimatedTrace'
import { Suspense, lazy, useRef, useState, useEffect } from 'react'
import { useLenis } from 'lenis/react'
import { useStore } from './store'
import { LoadingScreen } from './components/ui/LoadingScreen'

const ThreeScene = lazy(() => import('./components/three/ThreeScene'))

const SECTION_IDS = ['hero', 'about', 'stack', 'projects', 'roadmap', 'contact'] as const

function ScrollTracker() {
  const setGlobalScrollProgress = useStore((s) => s.setGlobalScrollProgress)
  const setActiveSectionIndex = useStore((s) => s.setActiveSectionIndex)
  const setSectionScrollProgress = useStore((s) => s.setSectionScrollProgress)

  // Cache DOM element refs — resolved lazily on first scroll tick
  const sectionEls = useRef<(HTMLElement | null)[]>([])
  const resolved = useRef(false)

  useLenis(({ progress }) => {
    setGlobalScrollProgress(progress)

    if (typeof window === 'undefined') return

    // Lazily resolve section elements once they exist in the DOM
    if (!resolved.current) {
      sectionEls.current = SECTION_IDS.map((id) => document.getElementById(id))
      if (sectionEls.current.every(Boolean)) resolved.current = true
    }

    const els = sectionEls.current
    if (!els[0]) return // DOM not ready yet

    const scrollY = window.scrollY
    const viewportH = window.innerHeight

    // Build section boundary offsets
    let activeIdx = 0
    let secProgress = 0

    for (let i = 0; i < els.length; i++) {
      const el = els[i]
      if (!el) continue
      const top = el.offsetTop
      const height = el.offsetHeight
      // The section is "active" when the viewport top is within its range
      if (scrollY >= top - viewportH * 0.3) {
        activeIdx = i
        // Progress through this section: 0 = section just entering, 1 = section fully scrolled past
        secProgress = Math.max(0, Math.min(1, (scrollY - (top - viewportH * 0.3)) / (height + viewportH * 0.3)))
      }
    }

    setActiveSectionIndex(activeIdx)
    setSectionScrollProgress(secProgress)
  })

  return null
}

function App() {
  const [mountThree, setMountThree] = useState(false)
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)

  useEffect(() => {
    // Mount the 3D scene after the initial render to prevent blocking LCP
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => setMountThree(true))
    } else {
      setTimeout(() => setMountThree(true), 100)
    }
  }, [])

  useEffect(() => {
    if (!isLoadingComplete) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }
  }, [isLoadingComplete])

  return (
    <ReactLenis root>
      <ScrollTracker />
      <div className="min-h-screen bg-background relative">
        {!isLoadingComplete && (
          <LoadingScreen onComplete={() => setIsLoadingComplete(true)} />
        )}

        {mountThree && (
          <Suspense fallback={null}>
            <ThreeScene />
          </Suspense>
        )}

        <Navbar />

        <main className="relative z-10">
          <Hero />

          <div className="w-full flex justify-center -my-8 md:-my-16 z-0 relative pointer-events-none opacity-50">
            <AnimatedTrace
              pathD="M 50 0 C 50 40 20 60 50 100"
              viewBox="0 0 100 100"
              width="100px"
              height="150px"
              color="var(--secondary-500)"
            />
          </div>

          <About />

          <div className="w-full flex justify-center -my-8 md:-my-16 z-0 relative pointer-events-none opacity-50">
            <AnimatedTrace
              pathD="M 50 0 C 50 40 80 60 50 100"
              viewBox="0 0 100 100"
              width="100px"
              height="150px"
              color="var(--primary-500)"
            />
          </div>

          <TechStack />

          <div className="w-full flex justify-center -my-8 md:-my-16 z-0 relative pointer-events-none opacity-50">
            <AnimatedTrace
              pathD="M 50 0 C 50 40 20 60 50 100"
              viewBox="0 0 100 100"
              width="100px"
              height="150px"
              color="var(--secondary-500)"
            />
          </div>

          <Projects />

          <div className="w-full flex justify-center -my-8 md:-my-16 z-0 relative pointer-events-none opacity-50">
            <AnimatedTrace
              pathD="M 50 0 C 50 40 80 60 50 100"
              viewBox="0 0 100 100"
              width="100px"
              height="150px"
              color="var(--primary-500)"
            />
          </div>

          <Roadmap />

          <div className="w-full flex justify-center -my-8 md:-my-16 z-0 relative pointer-events-none opacity-50">
            <AnimatedTrace
              pathD="M 50 0 C 50 40 20 60 50 100"
              viewBox="0 0 100 100"
              width="100px"
              height="150px"
              color="var(--secondary-500)"
            />
          </div>

          <Contact />
        </main>

        <Footer />
      </div>
    </ReactLenis>
  )
}

export default App

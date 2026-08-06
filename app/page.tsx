'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import { useActiveSection } from '@/hooks/useActiveSection'
import { useLoadingStore } from '@/store/useLoadingStore'
import Contact from '@/components/sections/Contact'

// Hero & TechStack use GSAP and browser APIs — load client-only
const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false })
const TechStack = dynamic(() => import('@/components/sections/TechStack'), { ssr: false })
const RoadMap = dynamic(() => import('@/components/sections/RoadMap'), { ssr: false })
const ProjectWrapper = dynamic(() => import('@/components/Wrappers/ProjectWrapper'), { ssr: false })
import TransitionWrapper from '@/components/Wrappers/TransitionWrapper'
import ContactRevealWrapper from '@/components/Wrappers/ContactRevealWrapper'

export default function HomePage() {
  useActiveSection()
  const isComplete = useLoadingStore((state) => state.isComplete)
  const mainRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!mainRef.current) return
    
    if (isComplete) {
      gsap.to(mainRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform'
      })
    } else {
      gsap.set(mainRef.current, { opacity: 0.8, scale: 0.99 })
    }
  }, [isComplete])

  return (
    <main
      id="main-content"
      ref={mainRef}
      className="relative z-10 min-h-screen origin-center"
      style={{ opacity: 0.8, transform: 'scale(0.99)' }}
    >
      <Hero />
      <TransitionWrapper>
        <TechStack />
        <RoadMap />
      </TransitionWrapper>
      <ProjectWrapper />
      <ContactRevealWrapper>
        <Contact />
      </ContactRevealWrapper>
    </main>
  )
}

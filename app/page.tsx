'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

import { useActiveSection } from '@/hooks/useActiveSection'
import { useLoadingStore } from '@/store/useLoadingStore'

// Hero & TechStack use GSAP and browser APIs — load client-only
const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false })
const TechStack = dynamic(() => import('@/components/sections/TechStack'), { ssr: false })
const RoadMap = dynamic(() => import('@/components/sections/RoadMap'), { ssr: false })
const ProjectWrapper = dynamic(() => import('@/components/Wrappers/ProjectWrapper'), { ssr: false })
import TransitionWrapper from '@/components/Wrappers/TransitionWrapper'

export default function HomePage() {
  useActiveSection()
  const isComplete = useLoadingStore((state) => state.isComplete)

  return (
    <motion.main
      id="main-content"
      initial={{ opacity: 0.8, scale: 0.99 }}
      animate={isComplete ? { opacity: 1, scale: 1, transitionEnd: { transform: 'none' } } : { opacity: 0.8, scale: 0.99 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-surface-base origin-center"
    >
      <Hero />
      <TransitionWrapper>
        <TechStack />
        <RoadMap />
      </TransitionWrapper>
      <ProjectWrapper />
    </motion.main>
  )
}


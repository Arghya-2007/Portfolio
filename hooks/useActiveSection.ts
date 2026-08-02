'use client'

import { useEffect } from 'react'
import { useAnimationStore } from '@/store/useAnimationStore'
import type { SectionId } from '@/store/useAnimationStore'

/**
 * SECTION_IDS for IntersectionObserver tracking.
 *
 * NOTE: 'about' is NOT in this list. The #hero section now covers both
 * the Hero and About phases via a single GSAP-pinned scroll. The About
 * active state is tracked via a secondary ScrollTrigger inside the Hero
 * component (at the 50% midpoint of the pinned scroll distance), which
 * directly calls setActiveSection('about'). IntersectionObserver cannot
 * distinguish between Hero and About since the pinned section never
 * leaves the viewport.
 */
const SECTION_IDS: SectionId[] = ['hero', 'skills', 'projects', 'experience', 'contact']

export function useActiveSection() {
  const setActiveSection = useAnimationStore((state) => state.setActiveSection)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const threshold = isMobile ? 0.2 : 0.4

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId)
          }
        })
      },
      { threshold }
    )

    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [setActiveSection])
}

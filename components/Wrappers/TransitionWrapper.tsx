'use client'

import React, { useRef, useEffect, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap/gsap.config'
import { useGSAP } from '@gsap/react'
import { useMotionConfig } from '@/hooks/useMotionConfig'

interface TransitionWrapperProps {
  children: React.ReactNode
}

export default function TransitionWrapper({ children }: TransitionWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const topLayerRef = useRef<HTMLDivElement>(null)
  const { animationsEnabled } = useMotionConfig()

  // Wait for dynamic children (Hero and TechStack) to fully render their layout
  const [isReady, setIsReady] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Poll to ensure both Hero (pushes this container down) and TechStack (gives this container height) are rendered
    const checkLayout = setInterval(() => {
      // Ensure RoadMap is also mounted before proceeding so querySelectors find it
      const hasRoadMap = !!containerRef.current?.querySelector('#roadmap')

      if (
        containerRef.current &&
        topLayerRef.current &&
        containerRef.current.offsetTop > 50 &&
        topLayerRef.current.offsetHeight > 100 &&
        hasRoadMap
      ) {
        setIsReady(true)
        clearInterval(checkLayout)
      }
    }, 100)
    return () => clearInterval(checkLayout)
  }, [])

  useGSAP(() => {
    if (!mounted || !animationsEnabled || !isReady) return

    const container = containerRef.current
    const topLayer = topLayerRef.current
    if (!container || !topLayer) return

    // Check if the bottom component has a horizontal scroll container
    const isMobile = window.innerWidth < 768
    const horizontalScrollEl = isMobile ? null : container.querySelector('[data-horizontal-scroll="true"]') as HTMLElement | null
    const verticalScrollEl = container.querySelector('[data-vertical-scroll-target="true"]') as HTMLElement | null

    const calculateDistances = () => {
      const wipeDistance = window.innerHeight
      const horizontalScrollDistance = horizontalScrollEl
        ? Math.max(0, horizontalScrollEl.scrollWidth - window.innerWidth)
        : 0
      const verticalScrollDistance = verticalScrollEl
        ? Math.max(0, verticalScrollEl.offsetHeight - window.innerHeight)
        : 0
      return { wipeDistance, horizontalScrollDistance, verticalScrollDistance, total: wipeDistance + horizontalScrollDistance + verticalScrollDistance }
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'bottom bottom',
        end: () => {
          const { total } = calculateDistances()
          return '+=' + total
        },
        pin: true,
        scrub: 0.8,
        pinSpacing: true,
        invalidateOnRefresh: true,
      }
    })

    // Get current distances for relative duration sizing
    const { wipeDistance, horizontalScrollDistance, verticalScrollDistance } = calculateDistances()

    // 1. Wipe TechStack Left
    tl.to(topLayer, {
      xPercent: -100,
      ease: 'none',
      duration: wipeDistance
    })

    // 1.5. If there's a vertical scroll element, scrub it up
    if (verticalScrollEl && verticalScrollDistance > 0) {
      tl.to(verticalScrollEl, {
        y: () => -calculateDistances().verticalScrollDistance,
        ease: 'none',
        duration: verticalScrollDistance
      })
    }

    // 2. If there's a horizontal scroll element, scrub it after the wipe
    if (horizontalScrollEl && horizontalScrollDistance > 0) {
      tl.to(horizontalScrollEl, {
        x: () => -calculateDistances().horizontalScrollDistance,
        ease: 'none',
        duration: horizontalScrollDistance
      })
    }

  }, { scope: containerRef, dependencies: [animationsEnabled, isReady, mounted] })

  useEffect(() => {
    // Force refresh after initial setup
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    const container = containerRef.current
    if (!container) return

    // Watch for dynamic height changes (e.g. user filtering TechStack categories)
    // Debounce and use a delta threshold to prevent infinite refresh loops which cause massive glitching
    let lastHeight = container.offsetHeight
    let resizeTimer: NodeJS.Timeout

    const ro = new ResizeObserver((entries) => {
      const newHeight = entries[0].contentRect.height
      if (Math.abs(newHeight - lastHeight) > 10) {
        lastHeight = newHeight
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(() => {
          ScrollTrigger.refresh()
        }, 150)
      }
    })
    ro.observe(container)

    return () => {
      ro.disconnect()
      clearTimeout(resizeTimer)
    }
  }, [animationsEnabled, isReady, mounted])

  const childArray = React.Children.toArray(children)

  const showAnimatedLayout = mounted && animationsEnabled && isReady;

  return (
    // flow-root creates a Block Formatting Context (BFC) which prevents TechStack's negative top margin
    // from collapsing and pulling this container up.
    <div ref={containerRef} className={`relative w-full ${showAnimatedLayout ? 'flow-root' : 'flex flex-col'} bg-black`}>
      {/* 
        Top Layer: TechStack 
        Placed in normal document flow. Will slide purely LEFT while the container is pinned.
      */}
      <div ref={topLayerRef} className="relative w-full z-10 bg-surface-base">
        {childArray[0]}
      </div>

      {/* 
        Bottom Layer: RoadMap
        Placed absolute at the bottom of the pinned container. 
        Because the container is pinned (viewport pauses), RoadMap will be perfectly stationary!
        No upward/top sliding whatsoever.
      */}
      <div className={showAnimatedLayout ? "absolute bottom-0 left-0 w-full h-screen z-0" : "relative w-full z-0 overflow-hidden"}>
        {childArray[1]}
      </div>
    </div>
  )
}

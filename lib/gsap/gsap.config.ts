'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

/**
 * Register all GSAP plugins once.
 * Import this file in your root layout (client boundary).
 * NEVER call gsap.registerPlugin() anywhere else in the project.
 *
 * SplitText is free for all users since GSAP 3.12+.
 */
gsap.registerPlugin(ScrollTrigger, SplitText)

// Performance: reduce GSAP's internal timer for smoother animations
gsap.ticker.lagSmoothing(0)

export { gsap, ScrollTrigger, SplitText }

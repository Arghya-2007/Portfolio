import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Shared Animation Constants (per Design.md §7)
export const EASE_OUT = 'power3.out'
export const EASE_IN_OUT = 'power3.inOut'

export const DURATION_SHORT = 0.3
export const DURATION_MEDIUM = 0.6
export const DURATION_LONG = 0.8

export { gsap, ScrollTrigger }

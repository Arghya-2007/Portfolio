import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export function useMagneticButton(disabled = false) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null)

  useEffect(() => {
    // Disable on touch devices or if explicitly disabled
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (disabled || isTouchDevice || !ref.current) return

    const element = ref.current
    const ctx = gsap.context(() => {
      const xTo = gsap.quickTo(element, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' })
      const yTo = gsap.quickTo(element, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' })

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const { height, width, left, top } = element.getBoundingClientRect()
        const x = clientX - (left + width / 2)
        const y = clientY - (top + height / 2)

        // Move element slightly towards the cursor
        xTo(x * 0.2)
        yTo(y * 0.2)
      }

      const handleMouseLeave = () => {
        xTo(0)
        yTo(0)
      }

      element.addEventListener('mousemove', handleMouseMove as EventListener)
      element.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        element.removeEventListener('mousemove', handleMouseMove as EventListener)
        element.removeEventListener('mouseleave', handleMouseLeave)
      }
    }, ref)

    return () => ctx.revert()
  }, [disabled])

  return ref
}

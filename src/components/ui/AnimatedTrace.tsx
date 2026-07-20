import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

interface AnimatedTraceProps {
  className?: string
  pathD: string
  viewBox?: string
  color?: string
  width?: string | number
  height?: string | number
}

export function AnimatedTrace({
  className = '',
  pathD,
  viewBox = '0 0 100 100',
  color = 'var(--primary-500)',
  width = '100%',
  height = 100,
}: AnimatedTraceProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!pathRef.current || !svgRef.current) return

    const path = pathRef.current
    const length = path.getTotalLength()

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    })

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 1, // Smooth scrub
        },
      })
    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox={viewBox}
      width={width}
      height={height}
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d={pathD}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
    </svg>
  )
}

'use client'

import React, { forwardRef, useMemo, useRef, useEffect, RefObject } from 'react'

export interface VariableProximityProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string
  fromFontVariationSettings: string
  toFontVariationSettings: string
  containerRef?: RefObject<HTMLElement | null>
  radius?: number
  falloff?: 'linear' | 'exponential' | 'gaussian'
  highlightWords?: string[]
  highlightClass?: string
}

function useAnimationFrame(callback: () => void) {
  useEffect(() => {
    let frameId: number
    const loop = () => {
      callback()
      frameId = requestAnimationFrame(loop)
    }
    frameId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frameId)
  }, [callback])
}

function useMousePositionRef(containerRef?: RefObject<HTMLElement | null>) {
  const positionRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const handleMouseMove = (ev: MouseEvent) => {
      positionRef.current = { x: ev.clientX, y: ev.clientY }
    }

    const handleTouchMove = (ev: TouchEvent) => {
      if (ev.touches.length > 0) {
        const touch = ev.touches[0]
        positionRef.current = { x: touch.clientX, y: touch.clientY }
      }
    }

    const handleMouseLeave = () => {
      positionRef.current = { x: -9999, y: -9999 }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('blur', handleMouseLeave)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('blur', handleMouseLeave)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [containerRef])

  return positionRef
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 150,
    falloff = 'linear',
    highlightWords = [],
    highlightClass = '',
    className = '',
    onClick,
    style,
    ...restProps
  } = props

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const mousePositionRef = useMousePositionRef(containerRef)
  const lastPositionRef = useRef({ x: -1, y: -1 })

  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr: string) => {
      const map = new Map<string, number>()
      if (!settingsStr) return map
      settingsStr
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((s) => {
          const parts = s.split(/\s+/)
          if (parts.length >= 2) {
            const name = parts[0].replace(/['"]/g, '')
            const val = parseFloat(parts[1])
            if (!isNaN(val)) {
              map.set(name, val)
            }
          }
        })
      return map
    }

    const fromSettings = parseSettings(fromFontVariationSettings)
    const toSettings = parseSettings(toFontVariationSettings)

    // Gather all unique axes
    const allAxes = Array.from(new Set([...fromSettings.keys(), ...toSettings.keys()]))

    return allAxes.map((axis) => ({
      axis,
      fromValue: fromSettings.get(axis) ?? 400,
      toValue: toSettings.get(axis) ?? (fromSettings.get(axis) ?? 400),
    }))
  }, [fromFontVariationSettings, toFontVariationSettings])

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

  const calculateFalloff = (distance: number) => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1)
    switch (falloff) {
      case 'exponential':
        return norm ** 2
      case 'gaussian':
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2)
      case 'linear':
      default:
        return norm
    }
  }

  useAnimationFrame(() => {
    const { x, y } = mousePositionRef.current

    // Don't skip if transitioning to offscreen or if position changed
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
      return
    }
    lastPositionRef.current = { x, y }

    letterRefs.current.forEach((letterRef) => {
      if (!letterRef) return

      if (x === -9999 && y === -9999) {
        if (letterRef.style.fontVariationSettings !== fromFontVariationSettings) {
          letterRef.style.fontVariationSettings = fromFontVariationSettings
        }
        return
      }

      const rect = letterRef.getBoundingClientRect()
      const letterCenterX = rect.left + rect.width / 2
      const letterCenterY = rect.top + rect.height / 2

      const distance = calculateDistance(x, y, letterCenterX, letterCenterY)

      if (distance >= radius) {
        if (letterRef.style.fontVariationSettings !== fromFontVariationSettings) {
          letterRef.style.fontVariationSettings = fromFontVariationSettings
        }
        return
      }

      const falloffValue = calculateFalloff(distance)
      const newSettings = parsedSettings
        .map(({ axis, fromValue, toValue }) => {
          const interpolatedValue = Math.round(fromValue + (toValue - fromValue) * falloffValue)
          return `'${axis}' ${interpolatedValue}`
        })
        .join(', ')

      letterRef.style.fontVariationSettings = newSettings
    })
  })

  const words = label.split(' ')
  let letterIndex = 0

  return (
    <>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap');
        .variable-proximity {
          font-family: 'Roboto Flex', var(--font-space-grotesk), sans-serif;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
      <span
        ref={ref}
        className={`variable-proximity ${className}`}
        onClick={onClick}
        style={{ display: 'inline-flex', flexWrap: 'wrap', ...style }}
        {...restProps}
      >
        {words.map((word, wordIndex) => {
          const isHighlighted = highlightWords.some((hw) =>
            word.toLowerCase().startsWith(hw.toLowerCase())
          )
          const wordClass = isHighlighted ? highlightClass : ''

          return (
            <span
              key={wordIndex}
              className={`inline-block whitespace-nowrap ${wordClass}`}
              style={{ display: 'inline-block' }}
            >
              {word.split('').map((letter) => {
                const currentLetterIndex = letterIndex++
                return (
                  <span
                    key={currentLetterIndex}
                    ref={(el: HTMLSpanElement | null) => {
                      letterRefs.current[currentLetterIndex] = el
                    }}
                    style={{
                      display: 'inline-block',
                      fontVariationSettings: fromFontVariationSettings,
                      willChange: 'font-variation-settings',
                      transition: 'font-variation-settings 0.3s ease-out',
                    }}
                    aria-hidden="true"
                  >
                    {letter}
                  </span>
                )
              })}
              {wordIndex < words.length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          )
        })}
        <span className="sr-only">{label}</span>
      </span>
    </>
  )
})

VariableProximity.displayName = 'VariableProximity'
export default VariableProximity

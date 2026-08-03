'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import Matter from 'matter-js'
import { gsap } from '@/lib/gsap/gsap.config'

export interface FallingTextProps {
  text?: string
  highlightWords?: string[]
  highlightClass?: string
  trigger?: 'auto' | 'scroll' | 'click' | 'hover'
  forceTrigger?: boolean
  splitBy?: 'words' | 'letters'
  backgroundColor?: string
  wireframes?: boolean
  gravity?: number
  mouseConstraintStiffness?: number
  fontSize?: string
  wordSpacing?: string
  className?: string
  textClassName?: string
  resetDuration?: number
  onEffectStart?: () => void
  onReset?: () => void
}

interface ItemData {
  elem: HTMLElement
  body: Matter.Body
  targetX: number
  targetY: number
  initialWidth: number
  initialHeight: number
}

const FallingText: React.FC<FallingTextProps> = ({
  text = '',
  highlightWords = [],
  highlightClass = '',
  trigger = 'scroll',
  forceTrigger,
  splitBy = 'letters',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1.0,
  mouseConstraintStiffness = 0.5,
  fontSize = 'clamp(4.5rem, 10vw, 8.5rem)',
  wordSpacing = 'mx-3 sm:mx-5',
  className = '',
  textClassName = '',
  resetDuration = 0.7,
  onEffectStart,
  onReset,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)
  const canvasContainerRef = useRef<HTMLDivElement | null>(null)

  const [effectStarted, setEffectStarted] = useState(false)
  const hasTriggeredRef = useRef(false)
  const isResettingRef = useRef(false)

  const engineRef = useRef<Matter.Engine | null>(null)
  const runnerRef = useRef<Matter.Runner | null>(null)
  const renderRef = useRef<Matter.Render | null>(null)
  const animFrameRef = useRef<number | null>(null)
  const itemsRef = useRef<ItemData[]>([])
  const resetTweensRef = useRef<gsap.core.Tween[]>([])

  const triggerAnimation = useCallback(() => {
    // If currently resetting, cancel reset and resume physics
    if (isResettingRef.current) {
      resetTweensRef.current.forEach((t) => t.kill())
      resetTweensRef.current = []
      isResettingRef.current = false

      if (runnerRef.current && engineRef.current) {
        itemsRef.current.forEach((item) => {
          Matter.Body.setVelocity(item.body, {
            x: (Math.random() - 0.5) * 7,
            y: Math.random() * 2 + 1.2,
          })
          Matter.Body.setAngularVelocity(item.body, (Math.random() - 0.5) * 0.07)
        })
        Matter.Runner.run(runnerRef.current, engineRef.current)
      }

      const updateLoop = () => {
        if (isResettingRef.current) return
        itemsRef.current.forEach(({ body, elem }) => {
          const { x, y } = body.position
          elem.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${body.angle}rad)`
        })
        if (engineRef.current) Matter.Engine.update(engineRef.current, 1000 / 60)
        animFrameRef.current = requestAnimationFrame(updateLoop)
      }
      animFrameRef.current = requestAnimationFrame(updateLoop)
      return
    }

    if (!hasTriggeredRef.current) {
      hasTriggeredRef.current = true
      setEffectStarted(true)
      if (onEffectStart) onEffectStart()
    }
  }, [onEffectStart])

  const resetAnimation = useCallback(() => {
    if (!effectStarted || isResettingRef.current) return
    isResettingRef.current = true

    // Stop physics frame loop & runner
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current)
      animFrameRef.current = null
    }
    if (runnerRef.current) {
      Matter.Runner.stop(runnerRef.current)
    }

    // Kill any existing tweens
    resetTweensRef.current.forEach((t) => t.kill())
    resetTweensRef.current = []

    const items = itemsRef.current
    if (items.length === 0) {
      isResettingRef.current = false
      setEffectStarted(false)
      hasTriggeredRef.current = false
      return
    }

    let completedCount = 0
    items.forEach((item, index) => {
      const currentPos = {
        x: item.body.position.x,
        y: item.body.position.y,
        angle: item.body.angle,
      }

      const tween = gsap.to(currentPos, {
        x: item.targetX,
        y: item.targetY,
        angle: 0,
        duration: resetDuration,
        delay: index * 0.025,
        ease: 'power3.out',
        onUpdate: () => {
          if (item.elem) {
            item.elem.style.transform = `translate3d(${currentPos.x}px, ${currentPos.y}px, 0) translate(-50%, -50%) rotate(${currentPos.angle}rad)`
          }
        },
        onComplete: () => {
          completedCount++
          if (completedCount === items.length) {
            // Cleanup Matter.js instances
            if (renderRef.current) Matter.Render.stop(renderRef.current)
            if (renderRef.current?.canvas && canvasContainerRef.current) {
              canvasContainerRef.current.innerHTML = ''
            }
            if (engineRef.current) {
              Matter.World.clear(engineRef.current.world, false)
              Matter.Engine.clear(engineRef.current)
            }

            // Restore text element to normal layout
            if (textRef.current) {
              textRef.current.style.position = ''
              textRef.current.style.inset = ''
              textRef.current.style.width = ''
              textRef.current.style.height = ''
              textRef.current.style.pointerEvents = ''
            }

            isResettingRef.current = false
            hasTriggeredRef.current = false
            setEffectStarted(false)
            if (onReset) onReset()
          }
        },
      })
      resetTweensRef.current.push(tween)
    })
  }, [effectStarted, resetDuration, onReset])

  // Render initial text spans
  useEffect(() => {
    if (!textRef.current || effectStarted) return

    if (splitBy === 'letters') {
      const words = text.split(' ')
      const newHTML = words
        .map((word, wordIdx) => {
          const isHighlighted = highlightWords.some((hw) =>
            word.toLowerCase().startsWith(hw.toLowerCase()) ||
            word.toLowerCase().includes(hw.toLowerCase())
          )
          const highlightStyle = isHighlighted
            ? highlightClass || 'text-teal drop-shadow-[0_0_35px_rgba(45,212,191,0.45)] font-bold'
            : 'text-text-primary font-bold'

          const letters = word
            .split('')
            .map((char, charIdx) => {
              return `<span
                data-letter-index="${wordIdx}-${charIdx}"
                data-letter="true"
                class="inline-block select-none font-display ${highlightStyle} ${textClassName}"
                style="cursor: grab; will-change: transform;"
              >${char}</span>`
            })
            .join('')

          return `<span data-word-wrapper="true" class="inline-flex ${wordSpacing}">${letters}</span>`
        })
        .join(' ')
      textRef.current.innerHTML = newHTML
    } else {
      const words = text.split(' ')
      const newHTML = words
        .map((word, idx) => {
          const isHighlighted = highlightWords.some((hw) =>
            word.toLowerCase().startsWith(hw.toLowerCase())
          )
          const highlightStyle = isHighlighted
            ? highlightClass || 'text-teal drop-shadow-[0_0_30px_rgba(45,212,191,0.45)] font-bold'
            : 'text-text-primary font-bold'
          return `<span
            data-word-index="${idx}"
            class="inline-block ${wordSpacing} select-none font-display ${highlightStyle} ${textClassName}"
            style="cursor: grab; will-change: transform;"
          >${word}</span>`
        })
        .join(' ')
      textRef.current.innerHTML = newHTML
    }
  }, [text, highlightWords, highlightClass, wordSpacing, textClassName, splitBy, effectStarted])

  // Handle trigger & reset state
  useEffect(() => {
    if (forceTrigger !== undefined) {
      if (forceTrigger) {
        triggerAnimation()
      } else {
        resetAnimation()
      }
      return
    }

    if (trigger === 'auto') {
      triggerAnimation()
      return
    }

    if (trigger === 'scroll') {
      const handleScrollOrWheel = () => {
        if (window.scrollY > 5) {
          triggerAnimation()
        } else if (window.scrollY === 0) {
          resetAnimation()
        }
      }

      window.addEventListener('scroll', handleScrollOrWheel, { passive: true })
      window.addEventListener('wheel', handleScrollOrWheel, { passive: true })
      window.addEventListener('touchmove', handleScrollOrWheel, { passive: true })

      return () => {
        window.removeEventListener('scroll', handleScrollOrWheel)
        window.removeEventListener('wheel', handleScrollOrWheel)
        window.removeEventListener('touchmove', handleScrollOrWheel)
      }
    }
  }, [trigger, forceTrigger, triggerAnimation, resetAnimation])

  // Matter.js Physics Simulation
  useEffect(() => {
    if (!effectStarted) return

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint, Body } = Matter

    if (!containerRef.current || !canvasContainerRef.current || !textRef.current) return

    const containerEl = containerRef.current
    const textEl = textRef.current
    const containerRect = containerEl.getBoundingClientRect()

    const width = containerRect.width || window.innerWidth
    const height = containerRect.height || window.innerHeight

    if (width <= 0 || height <= 0) return

    const spans = Array.from(
      textEl.querySelectorAll('span[data-letter="true"], span[data-word-index]')
    ) as HTMLElement[]
    if (spans.length === 0) return

    // Allow letter spans inside word wrappers to position directly relative to textEl
    const wordWrappers = Array.from(
      textEl.querySelectorAll('span[data-word-wrapper="true"]')
    ) as HTMLElement[]
    wordWrappers.forEach((wrapper) => {
      wrapper.style.display = 'contents'
    })

    const engine = Engine.create()
    engine.world.gravity.y = gravity
    engineRef.current = engine

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
      },
    })
    renderRef.current = render

    // Setup Boundary Walls
    const wallThickness = 120
    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' },
    }

    const floor = Bodies.rectangle(
      width / 2,
      height + wallThickness / 2 - 30,
      width * 3,
      wallThickness,
      boundaryOptions
    )
    const leftWall = Bodies.rectangle(
      -wallThickness / 2 + 10,
      height / 2,
      wallThickness,
      height * 3,
      boundaryOptions
    )
    const rightWall = Bodies.rectangle(
      width + wallThickness / 2 - 10,
      height / 2,
      wallThickness,
      height * 3,
      boundaryOptions
    )
    const ceiling = Bodies.rectangle(
      width / 2,
      -wallThickness / 2 - 50,
      width * 3,
      wallThickness,
      boundaryOptions
    )

    // Calculate exact target resting positions and spawn physical bodies
    const items: ItemData[] = spans.map((elem) => {
      const rect = elem.getBoundingClientRect()
      const x = rect.left - containerRect.left + rect.width / 2
      const y = rect.top - containerRect.top + rect.height / 2
      const w = Math.max(rect.width, 10)
      const h = Math.max(rect.height, 10)

      const chamferRadius = Math.min(w, h) * 0.2
      const body = Bodies.rectangle(x, y, w, h, {
        render: { fillStyle: 'transparent' },
        chamfer: { radius: chamferRadius },
        restitution: 0.78,
        frictionAir: 0.014,
        friction: 0.15,
        density: 0.001,
      })

      // Apply initial dynamic impulse: natural spread
      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 8,
        y: Math.random() * 2.5 + 1.2,
      })
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08)

      return {
        elem,
        body,
        targetX: x,
        targetY: y,
        initialWidth: rect.width,
        initialHeight: rect.height,
      }
    })

    itemsRef.current = items

    // Reposition textEl as full-size overlay
    textEl.style.position = 'absolute'
    textEl.style.inset = '0'
    textEl.style.width = '100%'
    textEl.style.height = '100%'
    textEl.style.pointerEvents = 'none'

    items.forEach(({ elem, body, initialWidth, initialHeight }) => {
      elem.style.position = 'absolute'
      elem.style.left = '0px'
      elem.style.top = '0px'
      elem.style.width = `${initialWidth}px`
      elem.style.height = `${initialHeight}px`
      elem.style.margin = '0px'
      elem.style.pointerEvents = 'auto'
      elem.style.willChange = 'transform'
      elem.style.transform = `translate3d(${body.position.x}px, ${body.position.y}px, 0) translate(-50%, -50%) rotate(${body.angle}rad)`
    })

    // Setup interactive mouse dragging
    const mouse = Mouse.create(containerEl)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    })
    render.mouse = mouse

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...items.map((it) => it.body),
    ])

    const runner = Runner.create()
    runnerRef.current = runner
    Runner.run(runner, engine)
    Render.run(render)

    // Animation frame loop
    const updateLoop = () => {
      if (isResettingRef.current) return
      items.forEach(({ body, elem }) => {
        const { x, y } = body.position
        elem.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${body.angle}rad)`
      })
      Engine.update(engine, 1000 / 60)
      animFrameRef.current = requestAnimationFrame(updateLoop)
    }
    animFrameRef.current = requestAnimationFrame(updateLoop)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      resetTweensRef.current.forEach((t) => t.kill())
      resetTweensRef.current = []
      Render.stop(render)
      Runner.stop(runner)
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.innerHTML = ''
      }
      World.clear(engine.world, false)
      Engine.clear(engine)

      if (textEl) {
        textEl.style.position = ''
        textEl.style.inset = ''
        textEl.style.width = ''
        textEl.style.height = ''
        textEl.style.pointerEvents = ''
      }
    }
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness])

  const handleManualTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      triggerAnimation()
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative z-[1] w-full h-full flex items-center justify-center overflow-hidden pointer-events-auto select-none ${className}`}
      onClick={trigger === 'click' ? handleManualTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleManualTrigger : undefined}
    >
      <div
        ref={textRef}
        className="flex flex-wrap items-center justify-center text-center relative z-10"
        style={{
          fontSize,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
        }}
      />

      <div className="absolute inset-0 z-0 pointer-events-none" ref={canvasContainerRef} />
    </div>
  )
}

export default FallingText

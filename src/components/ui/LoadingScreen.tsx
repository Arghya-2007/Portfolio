import { useEffect, useState, useRef } from 'react'
import { useProgress } from '@react-three/drei'
import { gsap, EASE_OUT, DURATION_MEDIUM } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useStore } from '../../store'

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const { progress } = useProgress()
  const reducedMotion = useReducedMotion()
  const deviceTier = useStore((s) => s.deviceTier)
  
  const [lines, setLines] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  
  const displayProgress = deviceTier === 'low' ? 100 : progress
  const isLoaded = displayProgress === 100

  // 1. Boot Sequence
  useEffect(() => {
    if (reducedMotion) {
      setLines([
        '> initializing system core...',
        '> loading assets...',
        '> compiling infrastructure...',
        '> system ready.'
      ])
      return
    }

    const t1 = setTimeout(() => {
      setLines(['> initializing system core...'])
    }, 100)
    
    const t2 = setTimeout(() => {
      setLines(l => [...l, '> loading assets...'])
    }, 500)
    
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [reducedMotion])
  
  // 2. Finish sequence when loaded
  useEffect(() => {
    if (reducedMotion) {
      if (isLoaded) {
        setTimeout(() => setIsComplete(true), 500)
      }
      return
    }

    if (isLoaded && lines.length >= 2) {
      const t3 = setTimeout(() => {
        setLines(l => {
           if (l.includes('> compiling infrastructure...')) return l
           return [...l, '> compiling infrastructure...']
        })
      }, 400)
      
      const t4 = setTimeout(() => {
        setLines(l => {
           if (l.includes('> system ready.')) return l
           return [...l, '> system ready.']
        })
      }, 800)
      
      const t5 = setTimeout(() => {
        setIsComplete(true)
      }, 1400)
      
      return () => {
        clearTimeout(t3)
        clearTimeout(t4)
        clearTimeout(t5)
      }
    }
  }, [isLoaded, lines.length, reducedMotion])

  // 3. Fallback for slow loading
  useEffect(() => {
    if (!isLoaded && lines.length >= 2 && !reducedMotion) {
      const t = setTimeout(() => {
        setLines(l => {
          if (!l.includes('> still loading assets...')) {
             return [...l, '> still loading assets...']
          }
          return l
        })
      }, 6000)
      return () => clearTimeout(t)
    }
  }, [isLoaded, lines.length, reducedMotion])
  
  // 4. Exit transition
  useEffect(() => {
    if (isComplete) {
      if (reducedMotion) {
        onComplete()
        return
      }

      const ctx = gsap.context(() => {
        gsap.to(containerRef.current, {
          opacity: 0,
          y: -20,
          duration: DURATION_MEDIUM,
          ease: EASE_OUT,
          onComplete: () => {
            onComplete()
          }
        })
      })
      return () => ctx.revert()
    }
  }, [isComplete, onComplete, reducedMotion])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(143,191,163,0.12), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full px-6 md:px-12 max-w-lg flex flex-col gap-8">
        <div 
          className="h-[2px] w-full overflow-hidden rounded-full relative" 
          style={{ backgroundColor: 'var(--surface-glass)' }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(displayProgress)}
        >
           <div 
             className="absolute top-0 left-0 h-full transition-all ease-out"
             style={{ 
                width: `${displayProgress}%`,
                backgroundColor: 'var(--primary-500)',
                boxShadow: '0 0 10px var(--primary-500)',
                transitionDuration: reducedMotion ? '0s' : '0.3s'
             }}
           />
        </div>

        <div className="flex flex-col gap-2 font-mono text-sm md:text-base min-h-[140px]" style={{ color: 'var(--text-secondary)' }}>
           {lines.map((line, i) => {
             const isReadyMsg = line.includes('ready.')
             const color = isReadyMsg ? 'var(--primary-500)' : 'inherit'
             return (
               <div key={i} style={{ color }}>
                 {line}
                 {line.includes('loading assets...') && !isLoaded && (
                   <span className="ml-2" style={{ color: 'var(--text-tertiary)' }}>
                     [{Math.round(displayProgress)}%]
                   </span>
                 )}
               </div>
             )
           })}
           {!isComplete && !reducedMotion && (
             <div className="animate-pulse" style={{ color: 'var(--primary-500)' }}>_</div>
           )}
        </div>
      </div>
    </div>
  )
}

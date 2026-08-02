'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

import { clamp } from '@/lib/utils'

/**
 * useImageSequence — Generic hook for image-frame-scroll sequences.
 *
 * Manages preloading and frame index calculation for any image sequence.
 * Reusable across Hero (Phase 2) and About (Phase 3) sections.
 *
 * Preloading strategy:
 *   Stage 1: First 2 images loaded eagerly (ready before user sees hero)
 *   Stage 2: Remaining images loaded in background
 *
 * @param images - Array of image paths (e.g. ['/images/frames/hero/hero-001.webp', ...])
 * @returns { currentFrame, nextFrame, isLoaded, setProgress }
 */
export function useImageSequence(images: string[]) {
  // Preloaded Image elements stored in ref — never causes re-renders
  const preloadedRef = useRef<HTMLImageElement[]>([])

  // Only these two pieces of state trigger re-renders
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)

  // Track previous frame index to avoid unnecessary re-renders
  const prevIndexRef = useRef(0)

  // ── Preloading ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (images.length === 0) return

    const preloaded: HTMLImageElement[] = new Array(images.length)
    let cancelled = false
    let loadedCount = 0

    const loadImage = (src: string, index: number, eager: boolean): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image()
        if (eager) {
          img.loading = 'eager'
        }
        img.onload = () => {
          if (!cancelled) {
            preloaded[index] = img
            loadedCount++
            // Keep preloadedRef updated so ready frames can be drawn immediately
            if (index < 5 || loadedCount === images.length || loadedCount % 10 === 0) {
              preloadedRef.current = preloaded
            }
          }
          resolve(img)
        }
        img.onerror = () => {
          console.warn(`[useImageSequence] Failed to load: ${src}`)
          resolve(img) // Continue — never throw
        }
        img.src = src
      })
    }

    const preloadAll = async () => {
      // Stage 1: eagerly load first few images (up to 5)
      const eagerCount = Math.min(5, images.length)
      const eagerPromises = images.slice(0, eagerCount).map((src, i) => loadImage(src, i, true))
      await Promise.all(eagerPromises)

      if (cancelled) return
      preloadedRef.current = preloaded
      setIsLoaded(true)

      // Stage 2: background-load remaining images
      if (images.length > eagerCount) {
        const remainingPromises = images.slice(eagerCount).map((src, i) => loadImage(src, i + eagerCount, false))
        await Promise.all(remainingPromises)

        if (cancelled) return
        preloadedRef.current = preloaded
      }
    }

    preloadAll()

    // Cleanup: hint at GC by clearing image srcs
    return () => {
      cancelled = true
      preloaded.forEach((img) => {
        if (img) img.src = ''
      })
      preloadedRef.current = []
    }
  }, [images])

  // ── setProgress ────────────────────────────────────────────────────────────
  const setProgress = useCallback(
    (progress: number) => {
      const maxIndex = images.length - 1
      if (maxIndex < 0) return

      const index = clamp(Math.floor(progress * maxIndex), 0, maxIndex)

      // Only update state when the frame index actually changes
      if (index !== prevIndexRef.current) {
        prevIndexRef.current = index
        setCurrentFrameIndex(index)
      }
    },
    [images.length]
  )

  // ── Derived values ─────────────────────────────────────────────────────────
  const currentFrame = images[currentFrameIndex] ?? images[0] ?? ''
  const nextFrame = images[currentFrameIndex + 1] ?? images[currentFrameIndex] ?? ''

  return {
    currentFrame,
    nextFrame,
    isLoaded,
    setProgress,
    currentFrameIndex,
    imagesRef: preloadedRef,
  }
}

'use client'

import React from 'react'

interface TextMarqueeProps {
  text: string | React.ReactNode
  repeat?: number
  separator?: React.ReactNode
  speedClassName?: string
  className?: string
  textClassName?: string
}

export default function TextMarquee({
  text = 'Welcome to my Portfolio',
  repeat = 6,
  separator = <span className="text-teal text-xs">✦</span>,
  speedClassName = 'animate-marquee-left',
  className = '',
  textClassName = '',
}: TextMarqueeProps) {
  const items = Array.from({ length: repeat })

  return (
    <div
      className={`relative w-full overflow-hidden select-none pointer-events-none ${className}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <div className={`flex w-max ${speedClassName}`}>
        {/* Track 1 */}
        <div className="flex items-center shrink-0 gap-6 sm:gap-8 pr-6 sm:pr-8">
          {items.map((_, i) => (
            <span
              key={`m1-${i}`}
              className={`inline-flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.25em] text-text-secondary/80 ${textClassName}`}
            >
              <span>{text}</span>
              {separator}
            </span>
          ))}
        </div>

        {/* Track 2 for seamless infinite loop */}
        <div className="flex items-center shrink-0 gap-6 sm:gap-8 pr-6 sm:pr-8" aria-hidden="true">
          {items.map((_, i) => (
            <span
              key={`m2-${i}`}
              className={`inline-flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.25em] text-text-secondary/80 ${textClassName}`}
            >
              <span>{text}</span>
              {separator}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

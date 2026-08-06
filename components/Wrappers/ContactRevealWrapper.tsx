'use client'

import React from 'react'

interface ContactRevealWrapperProps {
  children: React.ReactNode
}

export default function ContactRevealWrapper({ children }: ContactRevealWrapperProps) {
  return (
    // The previous section (ProjectWrapper) ends with a 100vh sticky container.
    // By giving this wrapper a negative margin of 100vh and a high z-index,
    // it seamlessly scrolls up OVER the sticky container.
    // This creates a flawless, native vertical "Stack" wipe effect 
    // WITHOUT the GSAP pin-spacer bugs caused by dynamic component loading!
    <div id="contact" className="relative w-full z-[100] -mt-[100vh] bg-neutral-950 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] transform-gpu will-change-transform">
      {children}
    </div>
  )
}

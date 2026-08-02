'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { useAnimationStore } from '@/store/useAnimationStore'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useLenis } from '@/components/providers/LenisProvider'

import { useLoadingStore } from '@/store/useLoadingStore'

const NAV_LINKS = [
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const lenis = useLenis()
  const activeSection = useAnimationStore((state) => state.activeSection)
  const isComplete = useLoadingStore((state) => state.isComplete)
  
  const navRefs = useRef<(HTMLButtonElement | null)[]>([])
  const indicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const activeIndex = NAV_LINKS.findIndex((link) => link.href === `#${activeSection}`)
    const activeNav = navRefs.current[activeIndex]
    
    if (activeNav && indicatorRef.current) {
      const parentRect = activeNav.parentElement?.getBoundingClientRect()
      const navRect = activeNav.getBoundingClientRect()
      
      if (parentRect) {
        gsap.to(indicatorRef.current, {
          left: navRect.left - parentRect.left,
          width: navRect.width,
          duration: 0.3,
          ease: 'power2.inOut',
        })
      }
    }
  }, [activeSection, isMobile])

  const scrollTo = (href: string) => {
    setIsMenuOpen(false)
    if (lenis) {
      lenis.scrollTo(href)
    } else {
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const bgClass = isScrolled ? 'bg-[rgba(26,50,62,0.55)]' : 'bg-[rgba(26,50,62,0.20)]'

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={isComplete ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 h-16 glass-subtle rounded-none border-b border-[rgba(42,157,143,0.12)] transition-colors duration-300 ${bgClass}`}
      >
        <div className="section-container flex items-center justify-between h-full">
          {/* Logo */}
          <button onClick={() => scrollTo('#hero')} className="font-display font-bold text-xl text-grad-warm text-left">
            Arghya.dev
          </button>

          {/* Desktop Nav */}
          {!isMobile && (
            <>
              <nav aria-label="Main navigation" className="relative flex items-center h-full">
                {NAV_LINKS.map((link, i) => {
                  const isActive = `#${activeSection}` === link.href
                  return (
                    <button
                      key={link.href}
                      ref={(el) => { navRefs.current[i] = el }}
                      onClick={() => scrollTo(link.href)}
                      className={`px-4 py-2 font-sans font-medium text-sm transition-colors ${
                        isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {link.label}
                    </button>
                  )
                })}
                <div
                  ref={indicatorRef}
                  className="absolute bottom-0 h-[2px] bg-teal rounded-sm pointer-events-none"
                />
              </nav>

              {/* Hire Me CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('#contact')}
                className="glass-subtle border-teal/50 hover:border-teal/100 hover:bg-[rgba(42,157,143,0.10)] text-text-primary font-sans font-medium text-sm px-4 py-2 rounded-pill transition-colors duration-200"
              >
                Hire Me
              </motion.button>
            </>
          )}

          {/* Mobile Hamburger */}
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
              className="flex flex-col justify-center items-center w-8 h-8 space-y-[5px]"
            >
              <span className="w-[20px] h-[2px] bg-text-primary rounded-sm" />
              <span className="w-[20px] h-[2px] bg-text-primary rounded-sm" />
              <span className="w-[20px] h-[2px] bg-text-primary rounded-sm" />
            </button>
          )}
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[49] glass-elevated !rounded-none flex flex-col justify-center items-center"
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              className="absolute top-4 right-4 p-4 text-text-primary"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                show: {
                  transition: { staggerChildren: 0.06 }
                }
              }}
              className="flex flex-col items-center space-y-6"
            >
              {NAV_LINKS.map((link) => (
                <motion.button
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 }
                  }}
                  onClick={() => scrollTo(link.href)}
                  className={`font-display font-bold text-section-title ${
                    `#${activeSection}` === link.href ? 'text-text-primary' : 'text-text-secondary'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              
              <motion.button
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 }
                }}
                onClick={() => scrollTo('#contact')}
                className="mt-8 glass-subtle border-teal/50 text-text-primary font-sans font-medium px-8 py-3 rounded-pill"
              >
                Hire Me
              </motion.button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

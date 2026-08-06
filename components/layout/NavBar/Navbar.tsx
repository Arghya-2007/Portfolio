'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useLenis } from '@/components/providers/LenisProvider'
import { useLoadingStore } from '@/store/useLoadingStore'
import CardNav, { CardNavItem } from '@/components/layout/NavBar/CardNav'

const navItems: CardNavItem[] = [
  {
    label: "Professional",
    bgColor: "rgba(42, 157, 143, 0.15)", // Glass Teal
    textColor: "#fff",
    links: [
      { label: "Skills", href: "#skills", ariaLabel: "Skills" },
      { label: "Experience", href: "#roadmap", ariaLabel: "Experience" }
    ]
  },
  {
    label: "Work",
    bgColor: "rgba(26, 50, 62, 0.4)", // Glass dark
    textColor: "#fff",
    links: [
      { label: "Projects", href: "#projects", ariaLabel: "Projects" },
    ]
  },
  {
    label: "Connect",
    bgColor: "rgba(233, 196, 106, 0.15)", // Glass yellow
    textColor: "#fff",
    links: [
      { label: "Contact", href: "#contact", ariaLabel: "Contact Me" },
    ]
  }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const lenis = useLenis()
  const isComplete = useLoadingStore((state) => state.isComplete)

  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight || 1);
      
      if (headerRef.current) {
        headerRef.current.style.setProperty('--scroll-progress', Math.max(0, Math.min(1, scrollPercent)).toString());
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // GSAP Header Entrance
  useGSAP(() => {
    if (isComplete) {
      gsap.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.1,
      })
    } else {
      gsap.set(headerRef.current, { y: -80, opacity: 0 })
    }
  }, [isComplete])

  const scrollTo = (href: string | number) => {
    if (lenis) {
      lenis.scrollTo(href, { 
        duration: 2.5, 
        easing: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      })
    } else {
      if (typeof href === 'string') {
        const element = document.querySelector(href)
        element?.scrollIntoView({ behavior: 'smooth' })
      } else if (href === 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 flex justify-center pt-4 md:pt-8 pointer-events-none"
      style={{ opacity: 0, transform: 'translateY(-80px)' }}
    >
      <div className="pointer-events-auto w-full flex justify-center">
        <CardNav
          logo=""
          logoAlt="Arghya.dev"
          items={navItems}
          baseColor={isScrolled ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.03)'}
          menuColor="#E9C46A"
          buttonBgColor="rgba(255,255,255,0.1)"
          buttonTextColor="#E9C46A"
          onLinkClick={scrollTo}
          onCtaClick={() => scrollTo('#contact')}
          ctaText="Hire Me"
          className="backdrop-blur-xl nav-scroll-border rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
        />
      </div>
    </header>
  )
}

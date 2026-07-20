import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface NavbarProps {
  className?: string
}

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar({ className }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const navRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Shrink navbar on scroll
      if (!reducedMotion) {
        ScrollTrigger.create({
          start: 'top -50',
          end: 99999,
          toggleClass: { className: 'nav-scrolled', targets: navRef.current },
        })
      }

      // Active section tracking
      navLinks.forEach((link) => {
        const target = document.querySelector(link.href)
        if (target) {
          ScrollTrigger.create({
            trigger: target,
            start: 'top center',
            end: 'bottom center',
            onToggle: (self) => {
              if (self.isActive) setActiveSection(link.href)
            },
          })
        }
      })
    }, navRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 glass transition-all duration-300 ${
        className ?? ''
      }`}
      style={{
        borderRadius: 0,
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
      }}
    >
      <div className="nav-inner max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between transition-all duration-300 [nav.nav-scrolled_&]:h-14">
        {/* Logo / brand */}
        <a
          href="#hero"
          className="font-heading font-bold text-lg text-primary hover:text-primary-300 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-md"
        >
          DevArghya
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`font-mono text-sm transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-md px-1 ${
                  activeSection === link.href ? 'text-primary' : ''
                }`}
                style={{
                  color:
                    activeSection === link.href
                      ? 'var(--primary-500)'
                      : 'var(--text-secondary)',
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-elevated transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
          ) : (
            <Menu className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-glass-border bg-background/95 backdrop-blur-xl">
          <ul className="flex flex-col py-4 px-4 gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`block py-2 px-3 font-mono text-sm rounded-md transition-colors hover:text-primary hover:bg-elevated focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                    activeSection === link.href ? 'text-primary bg-elevated' : ''
                  }`}
                  style={{
                    color:
                      activeSection === link.href
                        ? 'var(--primary-500)'
                        : 'var(--text-secondary)',
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

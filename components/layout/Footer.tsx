'use client'

import { Mail } from 'lucide-react'

import { social } from '@/lib/content'

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(42,157,143,0.10)] py-6 mt-12">
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm font-sans text-center md:text-left">
          © {new Date().getFullYear()} Arghya. Built with Next.js & ❤️
        </p>

        <div className="flex items-center gap-4">
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center justify-center w-[36px] h-[36px] rounded-full glass-subtle border-[rgba(42,157,143,0.12)] hover:border-[rgba(42,157,143,0.50)] hover:scale-110 active:scale-95 transition-all duration-200 text-text-secondary hover:text-text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.5 5 1.9 5 1.9a5.5 5.5 0 0 0-.1 3.8A5.5 5.5 0 0 0 3 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
            </svg>
          </a>

          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center justify-center w-[36px] h-[36px] rounded-full glass-subtle border-[rgba(42,157,143,0.12)] hover:border-[rgba(42,157,143,0.50)] hover:scale-110 active:scale-95 transition-all duration-200 text-text-secondary hover:text-text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>

          {social.email && (
            <a
              href={`mailto:${social.email}`}
              aria-label="Email"
              className="flex items-center justify-center w-[36px] h-[36px] rounded-full glass-subtle border-[rgba(42,157,143,0.12)] hover:border-[rgba(42,157,143,0.50)] hover:scale-110 active:scale-95 transition-all duration-200 text-text-secondary hover:text-text-primary"
            >
              <Mail size={18} />
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}

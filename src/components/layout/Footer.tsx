import { socials } from '../../content/socials'
import {
  GitFork,
  Briefcase,
  Globe,
  Mail,
  type LucideIcon,
} from 'lucide-react'

interface FooterProps {
  className?: string
}

const iconMap: Record<string, LucideIcon> = {
  GitFork,
  Briefcase,
  Globe,
  Mail,
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={`border-t px-4 py-8 md:px-8 ${className ?? ''}`}
      style={{ borderColor: 'var(--border-glass)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Social icons */}
        <div className="flex items-center gap-4">
          {socials.map((social) => {
            const Icon = iconMap[social.icon] ?? Globe
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-md p-1"
                style={{ color: 'var(--text-tertiary)' }}
              >
                <Icon className="w-4 h-4" />
              </a>
            )
          })}
        </div>

        {/* Credit line */}
        <p
          className="text-xs font-mono"
          style={{ color: 'var(--text-tertiary)' }}
        >
          Built by Arghya Pal · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}

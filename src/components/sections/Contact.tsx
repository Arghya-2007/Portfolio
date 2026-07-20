import { useRef, useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { GlassPanel } from '../glass/GlassPanel'
import { NeoButton } from '../neo/NeoButton'
import { NeoInput } from '../neo/NeoInput'
import { NeoTextarea } from '../neo/NeoTextarea'
import { socials } from '../../content/socials'
import {
  GitFork,
  Briefcase,
  Globe,
  Mail,
  type LucideIcon,
} from 'lucide-react'
import { gsap, EASE_OUT, DURATION_MEDIUM } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useMagneticButton } from '../../hooks/useMagneticButton'

interface ContactProps {
  className?: string
}

/* Zod schema */
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

/* Icon lookup map — maps icon string names from content to Lucide components */
const iconMap: Record<string, LucideIcon> = {
  GitFork,
  Briefcase,
  Globe,
  Mail,
}

// Sub-component so we can call the hook for each link independently
function SocialLink({ social }: { social: typeof socials[0] }) {
  const Icon = iconMap[social.icon] ?? Globe
  const linkRef = useMagneticButton() as React.MutableRefObject<HTMLAnchorElement>

  return (
    <a
      ref={linkRef}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 font-mono text-sm transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-md px-1"
      style={{ color: 'var(--text-secondary)' }}
    >
      <Icon className="w-4 h-4 shrink-0" />
      {social.name}
    </a>
  )
}

export function Contact({ className }: ContactProps) {
  const containerRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = () => {
    // TODO(contact): Wire up to Formspree/Resend or mailto fallback
    reset()
  }

  useLayoutEffect(() => {
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      // Fade in reveal
      gsap.fromTo(
        '.contact-reveal',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DURATION_MEDIUM,
          ease: EASE_OUT,
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      id="contact"
      ref={containerRef}
      className={`section-padding max-w-5xl mx-auto ${className ?? ''}`}
    >
      {/* Section heading */}
      <p className="contact-reveal opacity-0 font-mono text-sm text-primary mb-2">
        {'>'} connect --with arghya
      </p>
      <h2 className="contact-reveal opacity-0 mb-8 md:mb-12">Get in Touch</h2>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Contact form — takes 3 of 5 columns on desktop */}
        <GlassPanel className="contact-reveal opacity-0 lg:col-span-3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            <NeoInput
              label="Name"
              id="contact-name"
              placeholder="Your name"
              {...register('name')}
              error={errors.name?.message}
            />

            <NeoInput
              label="Email"
              id="contact-email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              error={errors.email?.message}
            />

            <NeoTextarea
              label="Message"
              id="contact-message"
              placeholder="What's on your mind?"
              {...register('message')}
              error={errors.message?.message}
            />

            <NeoButton
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary-300 disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </NeoButton>
          </form>
        </GlassPanel>

        {/* Social links + pull quote — takes 2 of 5 columns */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Social links */}
          <GlassPanel className="contact-reveal opacity-0 space-y-4">
            <h3 className="text-base font-heading font-semibold !text-[var(--text-primary)]">
              Connect
            </h3>
            <div className="flex flex-col gap-3">
              {socials.map((social) => (
                <SocialLink key={social.name} social={social} />
              ))}
            </div>
          </GlassPanel>

          {/* Pull quote */}
          <GlassPanel className="contact-reveal opacity-0">
            <blockquote className="border-l-2 border-primary pl-4">
              <p className="font-body text-sm md:text-base italic">
                "The best AI model is useless without solid infra behind
                it."
              </p>
              <cite
                className="block mt-2 text-xs font-mono not-italic"
                style={{ color: 'var(--text-tertiary)' }}
              >
                — Arghya Pal
              </cite>
            </blockquote>
          </GlassPanel>
        </div>
      </div>
    </section>
  )
}

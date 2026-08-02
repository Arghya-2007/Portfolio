import { cn } from '@/lib/utils'

interface Props {
  name: string
  className?: string
  showIcon?: boolean
}

// ─── Brand SVG Icons (Pixel-Perfect, Self-Contained) ──────────────────────────

function ReactIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" fill="none" aria-hidden="true">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  )
}

function NextjsIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none" aria-hidden="true">
      <circle cx="90" cy="90" r="90" fill="#000000" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
      <path
        d="M149.508 157.438L69.1478 54H54V125.979H66.9991V69.3831L139.999 164.845C143.333 162.614 146.509 160.134 149.508 157.438Z"
        fill="url(#nextjs-paint0)"
      />
      <path d="M115 54H128V126H115V54Z" fill="url(#nextjs-paint1)" />
      <defs>
        <linearGradient id="nextjs-paint0" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="nextjs-paint1" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function TypeScriptIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" aria-hidden="true">
      <rect width="128" height="128" rx="20" fill="#3178C6" />
      <path d="M74.34 94.67c2.14 3.66 5.48 6.1 10.36 6.1 5.92 0 9.7-3.05 9.7-7.32 0-5.06-4.08-6.95-10.9-9.87-9.88-4.08-14.39-8.41-14.39-16.7 0-10.06 8.05-17.5 20.85-17.5 8.9 0 15.36 3.05 19.39 9.87l-7.93 5.12c-2.38-4.14-5.73-5.91-11.46-5.91-5.61 0-8.66 2.87-8.66 6.58 0 4.39 3.29 6.22 9.69 8.9 10.97 4.57 15.67 9.02 15.67 17.68 0 11.22-8.78 18.23-22.38 18.23-11.4 0-18.9-4.82-22.68-12.86l8.65-5.02zM15 50.33h39.75v9.88H36.37v51.1H25.38v-51.1H15v-9.88z" fill="#FFF" />
    </svg>
  )
}

function TailwindIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
        fill="#38BDF8"
      />
    </svg>
  )
}

function NodeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 2.2L2.5 10v15.6L16 33.4l13.5-7.8V10L16 2.2zm11.2 22.1L16 30.6 4.8 24.3V11.7L16 5.4l11.2 6.3v12.6z"
        fill="#5FA04E"
      />
      <path
        d="M20.9 14.4c-.4-.7-.9-1.3-1.6-1.7-.7-.4-1.6-.6-2.6-.6s-1.8.2-2.5.6c-.7.4-1.2 1-1.6 1.7-.4.7-.6 1.6-.6 2.6s.2 1.8.6 2.6c.4.7.9 1.3 1.6 1.7.7.4 1.6.6 2.6.6s1.8-.2 2.6-.6c.7-.4 1.2-1 1.6-1.7.4-.7.6-1.6.6-2.6s-.2-1.9-.7-2.6zm-2.4 3.7c-.2.5-.5.8-.9 1.1-.4.2-.9.4-1.5.4s-1.1-.1-1.5-.4c-.4-.2-.7-.6-.9-1.1-.2-.5-.3-1-.3-1.6s.1-1.2.3-1.6c.2-.5.5-.8.9-1.1.4-.2.9-.4 1.5-.4s1.1.1 1.5.4c.4.2.7.6.9 1.1.2.5.3 1 .3 1.6s-.1 1.1-.3 1.6z"
        fill="#5FA04E"
      />
    </svg>
  )
}

function NestJSIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" aria-hidden="true">
      <path
        d="M239.38 67.93c-2.44-8.08-11.45-12.83-20.15-10.6-25.04 6.43-48.43 19.68-67.43 38.21-12.06 11.76-21.73 25.86-28.52 41.59-1.61-4.71-3.69-9.33-6.23-13.82-7.25-12.8-17.5-23.77-29.8-31.91-17.92-11.87-39.26-17.58-60.78-16.27-9.59.58-15.65 9.87-12.63 18.99 15.67 47.45 49.33 87.21 93.38 109.97 4.96 2.56 10.98 1.48 14.81-2.65 18.89-20.35 30.68-46.74 33.36-74.67 4.67-1.39 9.38-2.64 14.12-3.73 13.91-3.21 28.32-4.14 42.49-2.77 8.35.81 15.02-6.52 17.38-14.32 2.37-7.85 2.45-16.08.01-23.99z"
        fill="#E0234E"
      />
    </svg>
  )
}

function PostgresIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.8 14.3c-.6.2-1.3.3-2.1.3-1.8 0-3-.6-3.7-1.7-.4-.7-.6-1.6-.6-2.7 0-1.2.3-2.2.8-3 .6-.9 1.6-1.5 3-1.5 1.5 0 2.6.7 3.2 1.8.5.8.7 1.8.7 3v.6h-5.9c.1.7.3 1.2.7 1.6.4.4.9.6 1.6.6.7 0 1.3-.2 1.8-.5l.5 1.5zm-4.7-5.1h4.1c-.1-.6-.2-1-.5-1.3-.3-.4-.8-.6-1.5-.6-.6 0-1.1.2-1.4.5-.4.3-.6.8-.7 1.4z"
        fill="#4169E1"
      />
    </svg>
  )
}

function FirebaseIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 18.5L7.8 4.2c.1-.4.6-.5.9-.2l4.1 7.2L4.5 18.5z" fill="#FFA000" />
      <path d="M14.2 8.7l2.1-3.9c.2-.4.8-.4 1 0l3.2 13.7-6.3-9.8z" fill="#F57C00" />
      <path d="M4.5 18.5L12 22.8c.4.2.8.2 1.2 0l7.3-4.3-6-3.8-1.7-1.1-7.3 4.9z" fill="#FFCA28" />
    </svg>
  )
}

function CloudRunIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"
        fill="#4285F4"
      />
      <path d="M10 9v6l5-3z" fill="#2a9d8f" />
    </svg>
  )
}

function DockerIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M13 8.5h2V10h-2V8.5zm-3 0h2V10h-2V8.5zm-3 0h2V10H7V8.5zm6-3h2V7h-2V5.5zm-3 0h2V7h-2V5.5zm-3 0h2V7H7V5.5zm-3 3h2V10H4V8.5zm18.5 4.3c-.3-.2-1.3-.7-2.6-.4-.3-1-1-1.7-1.8-2.2l-.6-.4-.4.6c-.5.8-.6 1.8-.4 2.7-.8.4-1.9.4-2.8.2H1.5c-.3 1.2 0 2.8 1 4.1 1.2 1.6 3.1 2.5 5.8 2.5 6.6 0 11.2-3.8 12.8-7.7.7.1 2 .2 2.5-.6.2-.3.2-.6.1-.8z"
        fill="#2496ED"
      />
    </svg>
  )
}

function PythonIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" fill="none" aria-hidden="true">
      <path
        d="M63.58 3C49.9 3 41.24 9.07 41.24 19.98v12.44h22.65v3.11H31.02C17.7 35.53 6 43.18 6 62.46c0 18.8 10.38 26.24 23.49 26.24h7.52v-11.7c0-13.3 11.2-24.98 24.98-24.98h22.58V39.69c0-12.87-10.74-21.78-21-21.78zm-11.22 8.7a3.89 3.89 0 1 1 0 7.78 3.89 3.89 0 0 1 0-7.78z"
        fill="#3776AB"
      />
      <path
        d="M64.42 125c13.68 0 22.34-6.07 22.34-16.98V95.58H64.11v-3.11h32.87c13.32 0 25.02-7.65 25.02-26.93 0-18.8-10.38-26.24-23.49-26.24h-7.52v11.7c0 13.3-11.2 24.98-24.98 24.98H33.42v12.33c0 12.87 10.74 21.78 21 21.78zm11.22-8.7a3.89 3.89 0 1 1 0-7.78 3.89 3.89 0 0 1 0 7.78z"
        fill="#FFD438"
      />
    </svg>
  )
}

function DefaultCodeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#2a9d8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

// ─── Tech Icon Resolver ───────────────────────────────────────────────────────

function getTechIcon(name: string, size = 16) {
  const normalized = name.toLowerCase().trim()

  if (normalized.includes('react')) return <ReactIcon size={size} />
  if (normalized.includes('next')) return <NextjsIcon size={size} />
  if (normalized.includes('type') || normalized === 'ts') return <TypeScriptIcon size={size} />
  if (normalized.includes('tailwind')) return <TailwindIcon size={size} />
  if (normalized.includes('node')) return <NodeIcon size={size} />
  if (normalized.includes('nest')) return <NestJSIcon size={size} />
  if (normalized.includes('postgres') || normalized.includes('sql') || normalized.includes('psql')) return <PostgresIcon size={size} />
  if (normalized.includes('firebase')) return <FirebaseIcon size={size} />
  if (normalized.includes('cloud run') || normalized.includes('gcp') || normalized.includes('google cloud')) return <CloudRunIcon size={size} />
  if (normalized.includes('docker')) return <DockerIcon size={size} />
  if (normalized.includes('python')) return <PythonIcon size={size} />

  return <DefaultCodeIcon size={size} />
}

// ─── TechChip Component ──────────────────────────────────────────────────────

export default function TechChip({ name, className, showIcon = true }: Props) {
  return (
    <span
      className={cn(
        'group relative inline-flex items-center gap-2.5 whitespace-nowrap',
        'px-3.5 py-2 rounded-xl text-xs sm:text-sm font-sans font-medium',
        'bg-[#0c1e26]/85 hover:bg-[#152e38]',
        'backdrop-blur-md saturate-150',
        'border border-teal/25 hover:border-teal/60',
        'text-slate-100 hover:text-white',
        'shadow-[0_4px_14px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]',
        'hover:shadow-[0_0_18px_rgba(42,157,143,0.35),0_6px_20px_rgba(0,0,0,0.6)]',
        'hover:scale-[1.03] active:scale-[0.98]',
        'transition-all duration-200 cursor-default select-none',
        className,
      )}
    >
      {showIcon && (
        <span className="flex items-center justify-center shrink-0 w-4 h-4 transition-transform duration-200 group-hover:scale-110">
          {getTechIcon(name, 16)}
        </span>
      )}
      <span className="tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{name}</span>
    </span>
  )
}

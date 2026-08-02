import React from 'react'
import { cn } from '@/lib/utils'

interface Props {
  name: string
  className?: string
  showIcon?: boolean
}

// ─── Brand SVG Icons (Pixel-Perfect, Self-Contained) ──────────────────────────

export function ReactIcon({ size = 16 }: { size?: number }) {
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

export function NextjsIcon({ size = 16 }: { size?: number }) {
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

export function TypeScriptIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" aria-hidden="true">
      <rect width="128" height="128" rx="20" fill="#3178C6" />
      <path d="M74.34 94.67c2.14 3.66 5.48 6.1 10.36 6.1 5.92 0 9.7-3.05 9.7-7.32 0-5.06-4.08-6.95-10.9-9.87-9.88-4.08-14.39-8.41-14.39-16.7 0-10.06 8.05-17.5 20.85-17.5 8.9 0 15.36 3.05 19.39 9.87l-7.93 5.12c-2.38-4.14-5.73-5.91-11.46-5.91-5.61 0-8.66 2.87-8.66 6.58 0 4.39 3.29 6.22 9.69 8.9 10.97 4.57 15.67 9.02 15.67 17.68 0 11.22-8.78 18.23-22.38 18.23-11.4 0-18.9-4.82-22.68-12.86l8.65-5.02zM15 50.33h39.75v9.88H36.37v51.1H25.38v-51.1H15v-9.88z" fill="#FFF" />
    </svg>
  )
}

export function TailwindIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
        fill="#38BDF8"
      />
    </svg>
  )
}

export function JavaScriptIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path d="M7 16.5c.5.8 1.2 1.3 2.1 1.3 1.1 0 1.9-.6 1.9-2v-6.8h2.3v6.8c0 2.4-1.5 3.5-3.8 3.5-1.9 0-3.1-.9-3.7-2.3l1.2-.5zm8.5-.2c.5.6 1.2 1 2 1 .9 0 1.5-.4 1.5-1.1 0-.8-.6-1.1-1.8-1.6-1.7-.7-2.8-1.4-2.8-3.1 0-1.7 1.3-3 3.3-3 1.4 0 2.5.5 3.2 1.7l-1.6 1c-.4-.7-.9-.9-1.6-.9-.8 0-1.2.4-1.2.9 0 .6.5.9 1.5 1.3 1.9.8 3.1 1.5 3.1 3.3 0 2-1.6 3.2-3.8 3.2-2.1 0-3.4-1-4-2.4l1.4-.4z" fill="#000000" />
    </svg>
  )
}

export function HTMLIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 3l1.6 16.2L12 21.5l6.4-2.3L20 3H4zm13.3 4.2h-7.8l.2 2.2h7.4l-.6 6.3-4.5 1.5-4.5-1.5-.3-3.2h2.2l.1 1.6 2.5.8 2.5-.8.3-2.6H6.6L6 5.1h11.5l-.2 2.1z" fill="#E34F26" />
    </svg>
  )
}

export function NodeIcon({ size = 16 }: { size?: number }) {
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

export function NestJSIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" aria-hidden="true">
      <path
        d="M239.38 67.93c-2.44-8.08-11.45-12.83-20.15-10.6-25.04 6.43-48.43 19.68-67.43 38.21-12.06 11.76-21.73 25.86-28.52 41.59-1.61-4.71-3.69-9.33-6.23-13.82-7.25-12.8-17.5-23.77-29.8-31.91-17.92-11.87-39.26-17.58-60.78-16.27-9.59.58-15.65 9.87-12.63 18.99 15.67 47.45 49.33 87.21 93.38 109.97 4.96 2.56 10.98 1.48 14.81-2.65 18.89-20.35 30.68-46.74 33.36-74.67 4.67-1.39 9.38-2.64 14.12-3.73 13.91-3.21 28.32-4.14 42.49-2.77 8.35.81 15.02-6.52 17.38-14.32 2.37-7.85 2.45-16.08.01-23.99z"
        fill="#E0234E"
      />
    </svg>
  )
}

export function PostgresIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.8 14.3c-.6.2-1.3.3-2.1.3-1.8 0-3-.6-3.7-1.7-.4-.7-.6-1.6-.6-2.7 0-1.2.3-2.2.8-3 .6-.9 1.6-1.5 3-1.5 1.5 0 2.6.7 3.2 1.8.5.8.7 1.8.7 3v.6h-5.9c.1.7.3 1.2.7 1.6.4.4.9.6 1.6.6.7 0 1.3-.2 1.8-.5l.5 1.5zm-4.7-5.1h4.1c-.1-.6-.2-1-.5-1.3-.3-.4-.8-.6-1.5-.6-.6 0-1.1.2-1.4.5-.4.3-.6.8-.7 1.4z"
        fill="#4169E1"
      />
    </svg>
  )
}

export function RedisIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2.5 14.5L12 19.5l9.5-5-3.5-2L12 15.5l-6-3-3.5 2z" fill="#A81F1A" />
      <path d="M2.5 9.5L12 14.5l9.5-5-3.5-2L12 10.5l-6-3-3.5 2z" fill="#DC382D" />
      <path d="M12 2.5L2.5 7.5 6 9.5l6-3 6 3 3.5-2L12 2.5z" fill="#FF4438" />
    </svg>
  )
}

export function MongoIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 1.5C11.6 2 7 8 7 13.5 7 17.5 9.2 21 12 22.5c2.8-1.5 5-5 5-9 0-5.5-4.6-11.5-5-12z" fill="#47A248" />
      <path d="M12 2.5v19c2.3-1.3 4.2-4.5 4.2-8 0-4.8-3.8-10-4.2-11z" fill="#499D4A" />
    </svg>
  )
}

export function SupabaseIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13.2 2.5c.3-.6 1.2-.4 1.3.3l1.8 7.2h6.2c.7 0 1.1.8.6 1.3L10.8 21.5c-.3.6-1.2.4-1.3-.3l-1.8-7.2H1.5c-.7 0-1.1-.8-.6-1.3L13.2 2.5z" fill="#3ECF8E" />
    </svg>
  )
}

export function PrismaIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18.8 19.3L13.5 2.8c-.3-.8-1.4-.9-1.8-.1L3.4 18.2c-.3.7.2 1.5 1 1.5h13.6c.6 0 1.1-.5.8-1.1l-.8-2.3 3.6-3.8c.6-.7.1-1.8-.8-1.8H18l.8 8.6z" fill="#5A67D8" />
    </svg>
  )
}

export function DockerIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M13 8.5h2V10h-2V8.5zm-3 0h2V10h-2V8.5zm-3 0h2V10H7V8.5zm6-3h2V7h-2V5.5zm-3 0h2V7h-2V5.5zm-3 0h2V7H7V5.5zm-3 3h2V10H4V8.5zm18.5 4.3c-.3-.2-1.3-.7-2.6-.4-.3-1-1-1.7-1.8-2.2l-.6-.4-.4.6c-.5.8-.6 1.8-.4 2.7-.8.4-1.9.4-2.8.2H1.5c-.3 1.2 0 2.8 1 4.1 1.2 1.6 3.1 2.5 5.8 2.5 6.6 0 11.2-3.8 12.8-7.7.7.1 2 .2 2.5-.6.2-.3.2-.6.1-.8z"
        fill="#2496ED"
      />
    </svg>
  )
}

export function KubernetesIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.2l8.5 4.9v9.8L12 21.8 3.5 16.9V7.1L12 2.2z" stroke="#326CE5" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.2" fill="#326CE5" />
      <path d="M12 5.5v3.3M12 15.2v3.3M6.5 8.7l2.8 1.6M14.7 13.7l2.8 1.6M17.5 8.7l-2.8 1.6M9.3 13.7l-2.8 1.6" stroke="#326CE5" strokeWidth="1.4" />
    </svg>
  )
}

export function AWSIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.8 11.4c-.8 0-1.5.3-2 .8-.5.5-.7 1.3-.7 2.2 0 1.9 1 2.9 2.9 2.9.8 0 1.5-.3 2.1-.8v-3.7c-.6-.9-1.4-1.4-2.3-1.4z" fill="#FF9900" />
      <path d="M18.8 17.2c-.4.4-1 .6-1.7.6-.8 0-1.5-.3-1.9-.9-.4-.6-.7-1.4-.7-2.5 0-1.1.2-2 .7-2.6.5-.6 1.2-.9 2-.9.7 0 1.3.2 1.6.6v-2h1.6v9h-1.6v-1.3z" fill="#FF9900" />
      <path d="M3.5 19.5c5.5 2.8 12.2 2.1 17-1.2" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19.8 16.8l2.2 2-2.8.8.6-2.8z" fill="#FF9900" />
    </svg>
  )
}

export function GCPIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4" />
      <path d="M10 8.5v7l6-3.5-6-3.5z" fill="#FFFFFF" />
    </svg>
  )
}

export function PythonIcon({ size = 16 }: { size?: number }) {
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

export function FlutterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14.3 2.5L3.8 13l3.2 3.2L17.5 5.7h4.7L14.3 2.5z" fill="#42A5F5" />
      <path d="M14.3 14.8l-3.2 3.2 4.4 4.5h4.7l-5.9-7.7z" fill="#0D47A1" />
      <path d="M11.1 18l3.2-3.2 3.2 3.2-3.2 3.2-3.2-3.2z" fill="#29B6F6" />
    </svg>
  )
}

export function FirebaseIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 18.5L7.8 4.2c.1-.4.6-.5.9-.2l4.1 7.2L4.5 18.5z" fill="#FFA000" />
      <path d="M14.2 8.7l2.1-3.9c.2-.4.8-.4 1 0l3.2 13.7-6.3-9.8z" fill="#F57C00" />
      <path d="M4.5 18.5L12 22.8c.4.2.8.2 1.2 0l7.3-4.3-6-3.8-1.7-1.1-7.3 4.9z" fill="#FFCA28" />
    </svg>
  )
}

export function LinuxIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2c-3.3 0-6 2.7-6 6 0 1.8.8 3.5 2.1 4.6L7 18.5c-.3.8.3 1.5 1.1 1.5h7.8c.8 0 1.4-.7 1.1-1.5l-1.1-5.9C17.2 11.5 18 9.8 18 8c0-3.3-2.7-6-6-6z" fill="#FCC624" />
      <circle cx="10" cy="7" r="1" fill="#000" />
      <circle cx="14" cy="7" r="1" fill="#000" />
      <path d="M10 9.5c.8.6 3.2.6 4 0" stroke="#E65100" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function GitIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21.7 10.7L13.3 2.3a1.9 1.9 0 0 0-2.6 0L8.4 4.6l3.3 3.3a2.2 2.2 0 0 1 2.8 2.8l3.2 3.2a2.2 2.2 0 1 1-1.3 1.3l-3-3v4.6a2.2 2.2 0 1 1-1.9 0V11a2.2 2.2 0 0 1-1.2-2.9L7 5.8 2.3 10.5a1.9 1.9 0 0 0 0 2.6l8.4 8.4a1.9 1.9 0 0 0 2.6 0l8.4-8.4a1.9 1.9 0 0 0 0-2.4z" fill="#F05032" />
    </svg>
  )
}

export function FigmaIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 2h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#F24E1E" />
      <path d="M12 2h4a2.5 2.5 0 0 1 0 5h-4V2z" fill="#FF7262" />
      <path d="M12 7h4a2.5 2.5 0 0 1 0 5h-4V7z" fill="#1ABCFE" />
      <path d="M8 7h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#A259FF" />
      <path d="M8 12h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#0ACF83" />
    </svg>
  )
}

export function PostmanIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#FF6C37" />
      <path d="M17.5 12l-7.5-4.3v8.6l7.5-4.3z" fill="#FFFFFF" />
    </svg>
  )
}

export function DefaultCodeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#2a9d8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

// ─── Tech Icon Resolver ───────────────────────────────────────────────────────

export function getTechIcon(name: string, size = 16): React.ReactNode {
  const norm = name.toLowerCase().trim()

  if (norm.includes('react')) return <ReactIcon size={size} />
  if (norm.includes('next')) return <NextjsIcon size={size} />
  if (norm.includes('typescript') || norm === 'ts') return <TypeScriptIcon size={size} />
  if (norm.includes('tailwind')) return <TailwindIcon size={size} />
  if (norm.includes('javascript') || norm === 'js') return <JavaScriptIcon size={size} />
  if (norm.includes('html') || norm.includes('css')) return <HTMLIcon size={size} />
  if (norm.includes('node')) return <NodeIcon size={size} />
  if (norm.includes('nest')) return <NestJSIcon size={size} />
  if (norm.includes('postgres') || norm.includes('sql') || norm.includes('psql')) return <PostgresIcon size={size} />
  if (norm.includes('redis')) return <RedisIcon size={size} />
  if (norm.includes('mongo')) return <MongoIcon size={size} />
  if (norm.includes('supabase')) return <SupabaseIcon size={size} />
  if (norm.includes('prisma')) return <PrismaIcon size={size} />
  if (norm.includes('docker')) return <DockerIcon size={size} />
  if (norm.includes('kubernetes') || norm.includes('k8s')) return <KubernetesIcon size={size} />
  if (norm.includes('aws')) return <AWSIcon size={size} />
  if (norm.includes('gcp') || norm.includes('google cloud') || norm.includes('cloud run')) return <GCPIcon size={size} />
  if (norm.includes('python')) return <PythonIcon size={size} />
  if (norm.includes('flutter')) return <FlutterIcon size={size} />
  if (norm.includes('firebase')) return <FirebaseIcon size={size} />
  if (norm.includes('linux')) return <LinuxIcon size={size} />
  if (norm.includes('git') || norm.includes('github')) return <GitIcon size={size} />
  if (norm.includes('figma')) return <FigmaIcon size={size} />
  if (norm.includes('postman')) return <PostmanIcon size={size} />

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

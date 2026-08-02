import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import CustomCursorWrapper from '@/components/layout/CustomCursorWrapper'
import LoadingScreen from '@/components/layout/LoadingScreen'
import { AnimationProvider } from '@/components/providers/AnimationProvider'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { MotionProvider } from '@/components/providers/MotionProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

import '@/app/globals.css'

// ─── Fonts (self-hosted via next/font — zero external request at runtime) ───
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

// ─── Metadata ───────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'Arghya — Full Stack & Cloud Engineer',
    template: '%s | Arghya',
  },
  description:
    'Full Stack Engineer and Cloud Engineering enthusiast building scalable systems and AI-powered products. Based in Kolkata.',
  keywords: [
    'cloud engineering', 'devops', 'next.js', 'nestjs', 'react',
    'typescript', 'portfolio', 'full stack', 'gcp', 'firebase',
  ],
  authors: [{ name: 'Arghya' }],
  creator: 'Arghya',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Arghya — Portfolio',
    title: 'Arghya — Full Stack & Cloud Engineer',
    description: 'Full Stack Engineer and Cloud Engineering enthusiast building scalable systems.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Arghya Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arghya — Full Stack & Cloud Engineer',
    description: 'Full Stack Engineer and Cloud Engineering enthusiast.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
}

// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-surface-base text-text-primary font-sans antialiased overflow-x-hidden">
        <AnimationProvider>
          <LenisProvider>
            <MotionProvider>
              <LoadingScreen />
              <Navbar />
              {children}
              <Footer />
            </MotionProvider>
          </LenisProvider>
        </AnimationProvider>
        <CustomCursorWrapper />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

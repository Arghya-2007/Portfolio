'use client'

import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useMotionConfig } from '@/hooks/useMotionConfig'
import { ScrollTrigger } from '@/lib/gsap/gsap.config'
import Aurora from '../ui/Backgrounds/Aurora'
import ImageTrail from '../ui/Animations/HoverEffects/ImageTrail'
import TextMarquee from '../ui/Animations/Marquee/TextMarquee'
import { CheckCircle2, RefreshCw, Target, Flag, Sparkles } from 'lucide-react'
import { useLoadingStore } from '@/store/useLoadingStore'

const roadmapData = [
  {
    year: "2025",
    title: "Foundations & Automation",
    status: "Current Focus",
    icon: CheckCircle2,
    color: "from-emerald-500/20 to-green-900/20",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    image: "/images/roadmap/img-2.webp",
    items: [
      "Mastering Linux internals, Shell scripting, and advanced Git.",
      "Docker containerization for multi-service environments.",
      "Building automated CI/CD pipelines with GitHub Actions."
    ]
  },
  {
    year: "2026",
    title: "Cloud & Orchestration",
    status: "Next Phase",
    icon: RefreshCw,
    color: "from-blue-500/20 to-cyan-900/20",
    border: "border-blue-500/30",
    iconColor: "text-blue-400",
    image: "/images/roadmap/img-7.webp",
    items: [
      "AWS Core Services: EC2, S3, VPC, IAM, and Load Balancers.",
      "Infrastructure as Code (IaC) via Terraform modules & state.",
      "Kubernetes deployments, scaling, and auto-healing clusters."
    ]
  },
  {
    year: "2027",
    title: "Depth & Observability",
    status: "Planned",
    icon: Target,
    color: "from-purple-500/20 to-fuchsia-900/20",
    border: "border-purple-500/30",
    iconColor: "text-purple-400",
    image: "/images/roadmap/img-4.webp",
    items: [
      "System metrics & logging with Prometheus, Grafana, and ELK.",
      "Advanced security (Vault) and GitOps workflows via ArgoCD.",
      "Designing resilient, data-intensive Microservice architectures."
    ]
  },
  {
    year: "2028",
    title: "The North Star",
    status: "Goal",
    icon: Flag,
    color: "from-orange-500/20 to-red-900/20",
    border: "border-orange-500/30",
    iconColor: "text-orange-400",
    image: "/images/roadmap/img-3.webp",
    items: [
      "Securing Platform Engineering and Cloud/DevOps roles.",
      "Contributing to major open-source infrastructure tools.",
      "Full system ownership: from code to highly scalable infra."
    ]
  }
]

export default function RoadMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  const verticalRef = useRef<HTMLDivElement>(null)
  const { animationsEnabled } = useMotionConfig()
  const setComponentMounted = useLoadingStore((state) => state.setComponentMounted)

  useEffect(() => {
    setComponentMounted('roadMap')
  }, [setComponentMounted])

  useEffect(() => {
    if (!verticalRef.current) return
    
    let lastHeight = verticalRef.current.offsetHeight
    let resizeTimer: NodeJS.Timeout

    const ro = new ResizeObserver((entries) => {
      const newHeight = entries[0].contentRect.height
      if (Math.abs(newHeight - lastHeight) > 10) {
        lastHeight = newHeight
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(() => {
          ScrollTrigger.refresh()
        }, 150)
      }
    })
    
    ro.observe(verticalRef.current)
    
    // Also force a refresh after a short delay to catch initial layout shifts
    const initialTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    return () => {
      ro.disconnect()
      clearTimeout(resizeTimer)
      clearTimeout(initialTimer)
    }
  }, [])

  return (
    <section 
      id="roadmap" 
      ref={containerRef}
      className={`relative w-full bg-black text-white ${animationsEnabled ? 'h-screen overflow-hidden' : ''}`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none h-full overflow-hidden">
        <Aurora
          colorStops={["#7cff67", "#B497CF", "#5227FF"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
        {/* Fade mask for background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80" />
      </div>

      <div 
        ref={verticalRef}
        data-vertical-scroll-target={animationsEnabled ? "true" : undefined}
        className="relative z-10 w-full flex flex-col pt-12 md:pt-20 pb-8 h-max will-change-transform"
      >
        <div className="relative z-20 px-8 md:px-[10vw] shrink-0 flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs md:text-sm font-medium tracking-widest text-gray-200 uppercase">Evolution of a Builder</span>
            </motion.div>
            
            <motion.h2 
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 mb-8 cursor-default"
              whileHover={{ scale: 1.02, filter: "brightness(1.2)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              The Journey
            </motion.h2>
            
            <div className="flex flex-col gap-5 max-w-2xl relative">
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                className="absolute -left-4 md:-left-6 top-1 bottom-1 w-[3px] bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-600 rounded-full" 
              />
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl md:text-3xl text-gray-300 font-light leading-snug hover:text-white transition-colors duration-300"
              >
                Building the <strong className="font-semibold text-white">infrastructure</strong> that runs AI. 
                From solid full-stack foundations to planet-scale MLOps.
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-base md:text-lg text-gray-500 font-medium tracking-wide leading-relaxed"
              >
                Every line of code is a step toward autonomous systems. It&apos;s not just about building applications; it&apos;s about engineering the future and pushing the boundaries of what&apos;s possible.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex flex-wrap gap-3 mt-6"
              >
                {["System Architecture", "Cloud & DevOps", "Platform Engineer"].map((tag, idx) => (
                  <motion.span 
                    key={idx}
                    whileHover={{ y: -5, scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.3)" }}
                    className="px-5 py-2.5 text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm cursor-pointer transition-all shadow-lg shadow-black/20"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="w-full lg:w-1/2 h-[400px] md:h-[600px] relative hidden lg:block overflow-hidden rounded-3xl"
          >
            <ImageTrail
              items={[
                '/images/roadmap/img-1.webp',
                '/images/roadmap/img-2.webp',
                '/images/roadmap/img-3.webp',
                '/images/roadmap/img-4.webp',
                '/images/roadmap/img-5.webp',
                '/images/roadmap/img-6.webp',
                '/images/roadmap/img-7.webp',
              ]}
              variant={2}
            />
          </motion.div>
        </div>

        {/* Horizontal Scroll Wrapper */}
        <div className={`relative w-full mt-12 md:mt-24 ${animationsEnabled ? 'overflow-hidden' : ''}`}>
          <div 
            ref={horizontalRef}
            data-horizontal-scroll={animationsEnabled ? "true" : undefined}
            className={`relative z-10 flex items-center gap-6 md:gap-16 py-4 will-change-transform ${
              animationsEnabled 
                ? 'max-md:w-full max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:[scrollbar-width:none] max-md:[-ms-overflow-style:none] max-md:[&::-webkit-scrollbar]:hidden px-4 md:px-[10vw] md:w-max md:pl-[10vw] md:pr-[15vw]' 
                : 'w-full overflow-x-auto snap-x snap-mandatory px-4 md:px-[10vw] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
            }`}
          >
            {roadmapData.map((item, index) => {
              const Icon = item.icon
              return (
                <div 
                  key={index} 
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-12 w-[85vw] md:w-[85vw] lg:w-[60vw] max-w-4xl min-h-[400px] md:h-[60vh] shrink-0 snap-center rounded-[2rem] bg-black/60 backdrop-blur-2xl border ${item.border} overflow-hidden shadow-2xl transform-gpu`}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-50 z-0 pointer-events-none`} />
                  
                  {/* Content */}
                  <div className="z-10 flex flex-col justify-between w-full md:w-2/5 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8">
                    <div className="flex flex-col h-full">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <Icon className={`w-6 h-6 md:w-8 md:h-8 ${item.iconColor}`} />
                          <span className={`text-xs md:text-sm font-semibold tracking-wider uppercase ${item.iconColor}`}>
                            {item.status}
                          </span>
                        </div>
                        <h3 className="text-4xl md:text-7xl font-bold text-white mb-2">{item.year}</h3>
                        <p className="text-lg md:text-2xl text-gray-300 font-medium">{item.title}</p>
                      </div>
                      <div className="mt-6 flex-1 w-full relative min-h-[120px] rounded-2xl overflow-hidden border border-white/10 group hidden md:block">
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                        <Image 
                          src={item.image} 
                          alt={item.title} 
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-700 ease-out" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="z-10 flex flex-col justify-center w-full md:w-3/5 pl-0 md:pl-8">
                    <ul className="space-y-4 md:space-y-6">
                      {item.items.map((desc: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 md:gap-4">
                          <div className="mt-2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/50 shrink-0" />
                          <p className="text-base md:text-xl text-gray-200 leading-relaxed">{desc}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Premium Marquee Banner */}
        <div className="relative w-full mt-12 md:mt-32 py-8 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden flex items-center justify-center transform-gpu will-change-transform">
          {/* Subtle Glow Effects */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-32 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-32 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <TextMarquee 
            text={
              <span className="flex items-center gap-6 md:gap-10">
                <span className="text-gray-300 font-medium uppercase tracking-widest">Evolving from</span>
                <span className="italic font-serif text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">Full-Stack Developer</span>
                <span className="text-gray-300 font-medium uppercase tracking-widest">to</span>
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                  Cloud & DevOps
                </span>
                <span className="text-gray-300 font-medium uppercase tracking-widest">&</span>
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-[0_0_12px_rgba(192,132,252,0.5)]">
                  AI Platform Engineer
                </span>
                <Sparkles className="w-5 h-5 text-white/20 mx-2" />
                <span className="italic font-serif text-orange-300 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]">Building Scalable Infrastructure</span>
                <Sparkles className="w-5 h-5 text-white/20 mx-2" />
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.4)]">
                  Designing Planet-Scale Systems
                </span>
              </span>
            }
            repeat={4}
            speedClassName="animate-marquee-left"
            className="w-full"
            separator={<Sparkles className="w-6 h-6 mx-8 md:mx-12 text-white/40 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />}
            textClassName="!text-xl md:!text-3xl font-sans"
          />
        </div>
      </div>
    </section>
  )
}

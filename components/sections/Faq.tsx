'use client'

import React, { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from '@/lib/gsap/gsap.config'
import MoltenMetal from '@/components/ui/Backgrounds/MoltenMetal'
import StrokeText from '@/components/ui/Animations/TextAnimations/StrokeText'

const faqs = [
  {
    question: 'What cloud platforms do you specialize in?',
    answer:
      'I architect and deploy scalable solutions primarily across AWS and Google Cloud (GCP). My focus is on cloud-native architectures, leveraging serverless computing and managed services to optimize performance and reduce operational overhead.',
    image: '/images/roadmap/img-5.webp'
  },
  {
    question: 'How do you approach CI/CD and automation?',
    answer:
      'Automation is at the core of my DevOps philosophy. I build robust CI/CD pipelines using GitHub Actions, GitLab CI, and ArgoCD for GitOps. This ensures rapid, reliable, and consistent software delivery with automated testing and deployment.',
    image: '/images/roadmap/img-2.webp'
  },
  {
    question: 'What is your experience with Kubernetes?',
    answer:
      'I have extensive experience in container orchestration using Kubernetes. From designing resilient microservices to managing complex stateful workloads and optimizing cluster resource allocation, I ensure high availability and seamless auto-scaling.',
    image: '/images/roadmap/img-6.webp'
  },
  {
    question: 'How do you implement MLOps pipelines?',
    answer:
      'I bridge the gap between data science and production. By utilizing tools like MLflow, Kubeflow, and SageMaker, I automate model training, deployment, and monitoring—ensuring ML models are scalable, reproducible, and continuously evaluated.',
    image: '/images/roadmap/img-1.webp'
  },
  {
    question: 'What is your Platform Engineering strategy?',
    answer:
      'I focus on building Internal Developer Platforms (IDPs) that reduce cognitive load for developers. By treating the platform as a product and abstracting infrastructure complexity using tools like Backstage and Crossplane, I accelerate team velocity.',
    image: '/images/roadmap/img-4.webp'
  },
  {
    question: 'How do you handle Infrastructure as Code (IaC)?',
    answer:
      'I enforce a strict Infrastructure as Code approach using Terraform and Pulumi. This guarantees that all cloud resources are version-controlled, auditable, and can be provisioned or destroyed consistently across development and production environments.',
    image: '/images/roadmap/img-3.webp'
  },
  {
    question: 'How do you ensure DevSecOps and security?',
    answer:
      'Security is integrated from day one. I implement zero-trust architectures, automated vulnerability scanning in the CI pipeline, and enforce strict least-privilege IAM policies to ensure infrastructure and applications remain secure against evolving threats.',
    image: '/images/roadmap/img-7.webp'
  },
]

export default function Faq() {
  const containerRef = useRef<HTMLElement>(null)
  const rightContainerRef = useRef<HTMLDivElement>(null)

  const imgRefs = useRef<(HTMLImageElement | null)[]>([])
  const textRefs = useRef<(HTMLDivElement | null)[]>([])

  const currentIndex = useRef<number>(0)
  const isAnimating = useRef<boolean>(false)
  
  const [activeIndex, setActiveIndex] = useState(0)

  const transitionToFaq = (index: number) => {
    if (currentIndex.current === index) return
    if (isAnimating.current) return

    // We don't strictly block fast scrolling, but to prevent messy overlaps, 
    // we can manage GSAP timelines carefully. 
    // Using gsap.killTweensOf will ensure smooth interruption.
    const prev = currentIndex.current
    currentIndex.current = index

    const currentImg = imgRefs.current[index]
    const prevImg = imgRefs.current[prev]
    const currentText = textRefs.current[index]
    const prevText = textRefs.current[prev]

    if (!currentImg || !prevImg || !currentText || !prevText) return

    // Ensure all other images and texts are pushed back and hidden
    imgRefs.current.forEach((img, i) => {
      if (img && i !== index && i !== prev) {
        gsap.set(img, { zIndex: 0, opacity: 0 })
      }
    })
    textRefs.current.forEach((text, i) => {
      if (text && i !== index && i !== prev) {
        gsap.set(text, { opacity: 0, pointerEvents: 'none' })
      }
    })

    // Prepare new image for a slide-up clip-path animation
    gsap.killTweensOf(currentImg)
    gsap.killTweensOf(prevImg)
    gsap.set(currentImg, {
      zIndex: 2,
      opacity: 1,
      clipPath: 'inset(100% 0% 0% 0%)',
      scale: 1.1
    })

    // Set previous image directly behind it
    gsap.set(prevImg, { zIndex: 1, opacity: 1 })

    // --- Timeline for Image Transition ---
    const tlImage = gsap.timeline()
    tlImage.to(currentImg, {
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: 1,
      duration: 1,
      ease: 'power4.inOut',
    })
    tlImage.to(prevImg, {
      scale: 0.95,
      opacity: 0.5,
      duration: 1,
      ease: 'power4.inOut',
    }, '<')

    // --- Timeline for Text Transition ---
    gsap.killTweensOf(currentText)
    gsap.killTweensOf(prevText)

    const isScrollingDown = index > prev
    const yOffset = isScrollingDown ? 50 : -50

    const tlText = gsap.timeline()

    // Animate old text out
    tlText.to(prevText, {
      y: -yOffset,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.in',
      onComplete: () => {
        gsap.set(prevText, { pointerEvents: 'none' })
      }
    })

    // Animate new text in
    gsap.set(currentText, { pointerEvents: 'auto', y: yOffset, opacity: 0 })
    tlText.to(currentText, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.2') // Slight overlap for fluidity
  }

  useGSAP(
    () => {
      // 1. Initial State Setup
      if (textRefs.current[0] && imgRefs.current[0]) {
        gsap.set(textRefs.current[0], { opacity: 1, y: 0, pointerEvents: 'auto' })
        gsap.set(imgRefs.current[0], { opacity: 1, zIndex: 2, clipPath: 'inset(0% 0% 0% 0%)', scale: 1 })
      }

      // Hide all others initially
      textRefs.current.forEach((el, i) => {
        if (i !== 0 && el) gsap.set(el, { opacity: 0, pointerEvents: 'none' })
      })

      // 2. Premium Section Entrance Animation
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        }
      })

      entranceTl.fromTo(
        '.faq-bg-glow',
        { opacity: 0 },
        { opacity: 0.4, duration: 2, ease: 'power2.inOut' }
      )
      .fromTo(
        '.faq-header h2',
        { opacity: 0, y: 50, rotationX: -30, transformPerspective: 1000 },
        { opacity: 1, y: 0, rotationX: 0, duration: 1.5, ease: 'expo.out' },
        '<0.2'
      )
      .fromTo(
        '.faq-header p',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
        '-=1.0'
      )
      .fromTo(
        '.faq-left-container',
        { opacity: 0, x: -60, rotationY: -15, transformPerspective: 1000 },
        { opacity: 1, x: 0, rotationY: 0, duration: 1.5, ease: 'expo.out' },
        '-=1.2'
      )
      .fromTo(
        rightContainerRef.current,
        { opacity: 0, x: 60, rotationY: 15, transformPerspective: 1000 },
        { opacity: 1, x: 0, rotationY: 0, duration: 1.5, ease: 'expo.out' },
        '-=1.3'
      )

      // 3. Setup ScrollTrigger to Pin the Section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${faqs.length * 90}%`, // Scroll distance proportional to number of FAQs
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          // Map scroll progress (0 to 1) to an index
          let index = Math.floor(self.progress * faqs.length)
          if (index >= faqs.length) index = faqs.length - 1
          if (index < 0) index = 0

          if (index !== currentIndex.current) {
            transitionToFaq(index)
            setActiveIndex(index)
          }
        },
      })

    },
    { scope: containerRef }
  )

  return (
    <section
      id="faq"
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-black text-white flex flex-col pt-12 md:pt-20"
    >
      {/* Dynamic Molten Metal Background */}
      <div className="faq-bg-glow absolute inset-0 z-0 pointer-events-none opacity-0">
        <MoltenMetal
          color1="#3503fc"
          color2="#ff00f7"
          color3="#FFFFFF"
          speed={0.35}
          scale={6}
          detail={3}
          glow={2}
          coreSize={0.1}
          swirl={1.4}
          fold={-0.3}
          blackPoint={0.1}
          brightness={2}
          colorMode="frost"
          grain={true}
          grainIntensity={0.2}
          mouseInteraction={false}
          mouseStrength={1}
          opacity={1.0}
        />
      </div>

      {/* Top Container */}
      <div className="faq-header w-full h-[15vh] shrink-0 flex flex-col items-center justify-center relative z-10 px-4 pb-20">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-600">Questions</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto text-center">
          Everything you need to know about the product and billing. Scroll through to learn more.
        </p>
      </div>

      {/* Main Content Area (Left & Right) */}
      <div className="w-full h-[85vh] flex flex-col md:flex-row relative z-10 max-w-7xl mx-auto pb-10">

        {/* Left Container (Images with GSAP Transitions) */}
        <div className="faq-left-container hidden md:flex w-2/5 h-full p-8 items-center justify-center relative">
          <div className="w-full h-[80%] relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5">
            {faqs.map((faq, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={i}
                ref={(el) => { imgRefs.current[i] = el }}
                src={faq.image}
                alt={`faq-img-${i}`}
                className="w-full h-full object-cover absolute inset-0 opacity-0"
                style={{ willChange: 'clip-path, transform, opacity' }}
              />
            ))}
          </div>
        </div>

        {/* Right Container (Stacked Text, One at a time) */}
        <div
          ref={rightContainerRef}
          className="faq-right-container relative w-full md:w-3/5 h-full p-6 md:p-12 overflow-hidden"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => { textRefs.current[index] = el }}
              className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 pointer-events-none opacity-0"
            >
              <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl transition-colors hover:bg-white/[0.04]">
                <div className="mb-8 cursor-pointer">
                  <StrokeText
                    text={faq.question}
                    strokeColor="#ff00f7"
                    fillColor="#FFFFFF"
                    strokeWidth={1.5}
                    drawDuration={1.2}
                    fillDelay={0.2}
                    stagger={0.02}
                    ease="sine.inOut"
                    trigger="manual"
                    play={activeIndex === index}
                    fillMode="wipe"
                    fontSize={64}
                    fontWeight={800}
                    letterSpacing={-2}
                  />
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-gray-300 to-gray-600 mb-8 rounded-full"></div>
                <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

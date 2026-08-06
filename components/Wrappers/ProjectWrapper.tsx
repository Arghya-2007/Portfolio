"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap/gsap.config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import React, { useRef, useEffect, useState } from "react";
import VariableProximity from "@/components/ui/Animations/VariableProximity/VariableProximity";
import { useLoadingStore } from "@/store/useLoadingStore";
import Projects from "@/components/sections/Projects";

// We extract the premium visual content into its own component 
// so we can render it in both the top and bottom halves for the split effect.
const ProjectWrapperContent = React.memo(function ProjectWrapperContent({ isInView }: { isInView: boolean }) {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Orb 1
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          scale: 1.2,
          opacity: 0.6,
          xPercent: 5,
          yPercent: -5,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // Orb 2
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          scale: 1.3,
          opacity: 0.5,
          xPercent: -5,
          yPercent: 5,
          duration: 7.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1
        });
      }

      // Orb 3
      if (orb3Ref.current) {
        gsap.to(orb3Ref.current, {
          scale: 1.1,
          opacity: 0.5,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2
        });
      }

      // Title Reveal
      if (titleRef.current) {
        // Only run animation when in view to bypass ScrollTrigger issues in nested components
        if (isInView) {
          gsap.fromTo(titleRef.current,
            { opacity: 0, y: 80, filter: "blur(10px)", scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
            }
          );
        }
      }
    });

    return () => ctx.revert();
  }, [isInView]);

  return (
    <div className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Animated Premium Gradient Background Orbs */}
      <div
        ref={orb1Ref}
        className="hidden md:block absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-purple-700/40 blur-[120px] mix-blend-screen pointer-events-none transform-gpu will-change-transform opacity-30"
      />
      <div
        ref={orb2Ref}
        className="hidden md:block absolute -bottom-[10%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-blue-700/40 blur-[130px] mix-blend-screen pointer-events-none transform-gpu will-change-transform opacity-20"
      />
      <div
        ref={orb3Ref}
        className="hidden md:block absolute top-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-rose-600/30 blur-[100px] mix-blend-screen pointer-events-none transform-gpu will-change-transform opacity-30"
      />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)] pointer-events-none"></div>

      {/* Content wrapper with exactly 80% width */}
      <div className="z-10 w-[80%] mx-auto flex flex-col items-center justify-center pb-6">
        <h1
          ref={titleRef}
          className="flex justify-center flex-wrap text-4xl sm:text-6xl md:text-8xl lg:text-[12rem] font-bold tracking-tighter leading-tight w-full drop-shadow-2xl text-center"
        >
          <VariableProximity
            label="My Projects"
            className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 pb-6 pr-8 inline-block"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            falloff="gaussian"
          />
        </h1>
      </div>
    </div>
  );
});

export default function ProjectWrapper() {
  const containerRef = useRef<HTMLElement>(null);
  const visibilityRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);

  const setComponentMounted = useLoadingStore((state) => state.setComponentMounted);
  const setIsProjectSectionInView = useLoadingStore((state) => state.setIsProjectSectionInView);

  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setComponentMounted("projectWrapper");
  }, [setComponentMounted]);

  // Use IntersectionObserver for visibility tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        setIsProjectSectionInView(entry.isIntersecting);
      },
      { rootMargin: "0px" }
    );

    if (visibilityRef.current) {
      observer.observe(visibilityRef.current);
    }

    return () => {
      observer.disconnect();
      setIsProjectSectionInView(false); // Cleanup on unmount
    };
  }, [setIsProjectSectionInView]);

  // GSAP scroll animation for splitting the halves
  useEffect(() => {
    if (!containerRef.current || !topHalfRef.current || !bottomHalfRef.current) return;

    const ctx = gsap.context(() => {
      // The container is 500vh tall, viewport is 100vh.
      // We explicitly set the end to "+=400%" (400vh of scroll distance) 
      // to avoid any layout shift miscalculations on mobile/SSR.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 4}`,
          scrub: true,
          invalidateOnRefresh: true,
          // CRITICAL: Force this ScrollTrigger to refresh LAST!
          // Since the TransitionWrapper above this dynamically pins and adds massive padding AFTER mounting,
          // this component's ScrollTrigger would otherwise calculate its position incorrectly.
          refreshPriority: -1, 
        }
      });

      // We want to wait for 20% (80vh), animate over 20% (80vh), and hold for the remaining 60% (240vh).
      tl.to({}, { duration: 0.2 }) // 0% - 20%: Do nothing (delay)
        .fromTo(topHalfRef.current, { yPercent: 0 }, { yPercent: -100, ease: "none", duration: 0.2 }, 0.2) // 20% - 40%: Split up
        .fromTo(bottomHalfRef.current, { yPercent: 0 }, { yPercent: 100, ease: "none", duration: 0.2 }, 0.2) // 20% - 40%: Split down
        .to({}, { duration: 0.6 }); // 40% - 100%: Hold the split state
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className={`relative h-[500vh] w-full bg-transparent disable-custom-cursor ${!isInView ? 'pointer-events-none' : ''}`}
    >
      {/* Visibility tracker for custom cursor. 
          Tracks only the first 399vh since ContactRevealWrapper covers the last 100vh. */}
      <div ref={visibilityRef} className="absolute top-0 left-0 w-full h-[399vh] pointer-events-none" />

      {/* Sticky container that holds the animation while scrolling */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">

        {/* REVEALED CONTENT (PROJECTS) */}
        {/* It stays in the background and is revealed as the halves split */}
        <div className="absolute inset-0 z-0" style={{ pointerEvents: 'auto' }}>
          <Projects />
        </div>

        {/* TOP HALF SPLIT */}
        <div
          ref={topHalfRef}
          className="absolute top-0 left-0 w-full h-[50dvh] overflow-hidden z-50 transform-gpu will-change-transform"
        >
          {/* We render the full 100vh content, but only the top 50vh is visible due to overflow-hidden */}
          <div className="absolute top-0 left-0 w-full h-[100dvh]">
            <ProjectWrapperContent isInView={isInView} />
          </div>

          {/* Subtle line at the split edge for premium feel */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.4)] z-20" />
        </div>

        {/* BOTTOM HALF SPLIT */}
        <div
          ref={bottomHalfRef}
          className="absolute bottom-0 left-0 w-full h-[50dvh] overflow-hidden z-50 transform-gpu will-change-transform"
        >
          {/* We render the full 100vh content, aligned to the bottom, so only the bottom 50vh is visible */}
          <div className="absolute bottom-0 left-0 w-full h-[100dvh]">
            <ProjectWrapperContent isInView={isInView} />
          </div>

          {/* Subtle line at the split edge for premium feel */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.4)] z-20" />
        </div>

      </div>
    </section>
  );
}

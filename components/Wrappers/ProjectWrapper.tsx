"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import React, { useRef, useEffect } from "react";
import VariableProximity from "@/components/ui/Animations/VariableProximity/VariableProximity";
import { useLoadingStore } from "@/store/useLoadingStore";
import Projects from "@/components/sections/Projects";

// We extract the premium visual content into its own component 
// so we can render it in both the top and bottom halves for the split effect.
const ProjectWrapperContent = React.memo(function ProjectWrapperContent({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  return (
    <div className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Animated Premium Gradient Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: ["0%", "5%", "0%"],
          y: ["0%", "-5%", "0%"],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-purple-700/40 blur-[120px] mix-blend-screen pointer-events-none transform-gpu will-change-transform"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          x: ["0%", "-5%", "0%"],
          y: ["0%", "5%", "0%"],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="hidden md:block absolute -bottom-[10%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-blue-700/40 blur-[130px] mix-blend-screen pointer-events-none transform-gpu will-change-transform"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="hidden md:block absolute top-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-rose-600/30 blur-[100px] mix-blend-screen pointer-events-none transform-gpu will-change-transform"
      />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)] pointer-events-none"></div>

      {/* Content wrapper with exactly 80% width */}
      <div className="z-10 w-[80%] mx-auto flex flex-col items-center justify-center pb-6">
        <motion.h1
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 80, filter: "blur(10px)", scale: 0.9 },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              scale: 1,
              transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
            },
          }}
          className="flex justify-center flex-wrap text-4xl sm:text-6xl md:text-8xl lg:text-[12rem] font-bold tracking-tighter leading-tight w-full drop-shadow-2xl text-center"
        >
          <VariableProximity
            label="My Projects"
            className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 pb-6 pr-8 inline-block"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={250}
            falloff="gaussian"
          />
        </motion.h1>
      </div>
    </div>
  );
});

export default function ProjectWrapper() {
  const containerRef = useRef<HTMLElement>(null);
  const visibilityRef = useRef<HTMLDivElement>(null);
  const setComponentMounted = useLoadingStore((state) => state.setComponentMounted);
  const setIsProjectSectionInView = useLoadingStore((state) => state.setIsProjectSectionInView);

  useEffect(() => {
    setComponentMounted("projectWrapper");
  }, [setComponentMounted]);

  const isInView = useInView(visibilityRef, { margin: "0px" });

  useEffect(() => {
    setIsProjectSectionInView(isInView);
    // Cleanup on unmount
    return () => setIsProjectSectionInView(false);
  }, [isInView, setIsProjectSectionInView]);

  // Track the scroll progress over the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Delay the animation until 20% scroll progress to let the user interact with the text.
  // The halves will be fully open by 40% scroll progress.
  // This leaves 60% of the scroll space (300vh) as a buffer for the user to tap through projects.
  const topY = useTransform(scrollYProgress, [0.2, 0.4], ["0%", "-100%"]);

  // Bottom half slides DOWN by 100% of its height (50vh) -> out of view
  const bottomY = useTransform(scrollYProgress, [0.2, 0.4], ["0%", "100%"]);

  return (
    <section
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
        <motion.div
          className="absolute top-0 left-0 w-full h-[50dvh] overflow-hidden z-10 transform-gpu will-change-transform"
          style={{ y: topY }}
        >
          {/* We render the full 100vh content, but only the top 50vh is visible due to overflow-hidden */}
          <div className="absolute top-0 left-0 w-full h-[100dvh]">
            <ProjectWrapperContent containerRef={containerRef} />
          </div>

          {/* Subtle line at the split edge for premium feel */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.4)] z-20" />
        </motion.div>

        {/* BOTTOM HALF SPLIT */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[50dvh] overflow-hidden z-10 transform-gpu will-change-transform"
          style={{ y: bottomY }}
        >
          {/* We render the full 100vh content, aligned to the bottom, so only the bottom 50vh is visible */}
          <div className="absolute bottom-0 left-0 w-full h-[100dvh]">
            <ProjectWrapperContent containerRef={containerRef} />
          </div>

          {/* Subtle line at the split edge for premium feel */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.4)] z-20" />
        </motion.div>

      </div>
    </section>
  );
}

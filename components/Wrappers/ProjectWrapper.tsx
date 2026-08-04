"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import VariableProximity from "@/components/ui/Animations/VariableProximity/VariableProximity";
import { useLoadingStore } from "@/store/useLoadingStore";

export default function ProjectWrapper() {
  const containerRef = useRef<HTMLElement>(null);
  const setComponentMounted = useLoadingStore((state) => state.setComponentMounted);

  useEffect(() => {
    setComponentMounted("projectWrapper");
  }, [setComponentMounted]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Animated Premium Gradient Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: ["0%", "5%", "0%"],
          y: ["0%", "-5%", "0%"],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-purple-700/40 blur-[120px] mix-blend-screen pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          x: ["0%", "-5%", "0%"],
          y: ["0%", "5%", "0%"],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-[10%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-blue-700/40 blur-[130px] mix-blend-screen pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-rose-600/30 blur-[100px] mix-blend-screen pointer-events-none"
      />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)] pointer-events-none"></div>

      {/* Content wrapper with exactly 80% width */}
      <div className="z-10 w-[80%] mx-auto flex flex-col items-center justify-center pb-6">
        <motion.h1
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
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
          className="flex justify-center flex-wrap text-6xl sm:text-8xl md:text-[10rem] lg:text-[14rem] font-bold tracking-tighter leading-tight w-full drop-shadow-2xl"
        >
          <VariableProximity
            label="My Projects"
            className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 pb-6 inline-block"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={150}
            falloff="linear"
          />
        </motion.h1>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Parallax reveal effect
  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-neutral-950 flex flex-col items-center justify-center text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />

      <motion.div
        style={{ y, opacity }}
        className="z-10 flex flex-col items-center justify-center w-full px-6 text-center"
      >
        <p className="text-blue-400 font-mono text-sm md:text-base uppercase tracking-widest mb-4">
          What&apos;s Next?
        </p>
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          Get In Touch
        </h2>
        <p className="text-white/60 text-lg md:text-2xl max-w-2xl mb-12 font-light leading-relaxed">
          I&apos;m currently open for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
        </p>

        <a
          href="mailto:hello@example.com"
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium tracking-wide text-white transition-transform hover:scale-105"
        >
          <span className="absolute inset-0 w-full h-full border border-white/30 rounded-full group-hover:border-white/80 transition-colors" />
          <span className="absolute inset-0 w-full h-full bg-white/5 rounded-full blur-sm group-hover:bg-white/20 transition-colors" />
          <span className="relative z-10 flex items-center gap-2">
            Say Hello
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </a>
      </motion.div>

      {/* Footer Copyright */}
      <div className="absolute bottom-6 w-full text-center">
        <p className="text-white/30 text-sm font-mono uppercase tracking-widest">
          © {new Date().getFullYear()} — Designed & Built with intent.
        </p>
      </div>
    </section>
  );
}

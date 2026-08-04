"use client";

import { motion } from "framer-motion";

export default function Projects() {
  return (
    <div className="w-full h-full min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden disable-custom-cursor">
      {/* Background premium accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)] pointer-events-none"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 text-center flex flex-col items-center justify-center"
      >
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 drop-shadow-lg">
          Projects
        </h2>
        <p className="text-white/40 text-lg md:text-xl font-light tracking-widest uppercase">
          Coming Soon
        </p>
      </motion.div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Ballpit from "../ui/Backgrounds/Ballpit";
import ContactForm from "../ui/Contact/ContactForm";
import SocialIcons from "../ui/Contact/SocialIcons";
import GithubGraph from "../ui/Contact/GithubGraph";
import VariableProximity from "../ui/Animations/VariableProximity/VariableProximity";
import TrueFocus from "../ui/Animations/TextAnimations/TrueFocus";
import TextMarquee from "../ui/Animations/Marquee/TextMarquee";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-neutral-950 text-white overflow-hidden z-0"
    >
      <div className="relative w-full flex flex-col items-center justify-center">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{
              x: ["-20%", "20%", "-20%"],
              y: ["-20%", "20%", "-20%"],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen transform-gpu will-change-transform"
          />
          <motion.div
            animate={{
              x: ["20%", "-20%", "20%"],
              y: ["20%", "-20%", "20%"],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-[0%] -right-[10%] w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen transform-gpu will-change-transform"
          />
        </div>

        {/* Ballpit Background - layered behind glassmorphism */}
        <div className="absolute inset-0 w-full h-full z-0 opacity-80 pointer-events-auto mix-blend-screen overflow-hidden">
          <Ballpit
            count={120}
            gravity={0}
            friction={0.99}
            wallBounce={0.9}
            followCursor={false}
            minSize={0.4}
            maxSize={0.7}
            colors={[0x2563eb, 0x1d4ed8, 0x000000]}
          />
        </div>
        
        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 z-0 bg-black/40 backdrop-blur-[3px] pointer-events-none" />

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto min-h-full px-6 flex flex-col justify-between py-12 md:py-20 pt-10 md:pt-32">
          
          {/* Top Container */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="w-full text-center mb-12 md:mb-16 shrink-0 will-change-transform"
          >
            <TrueFocus 
              sentence="Ready To Scale?"
              manualMode={false}
              blurAmount={3}
              borderColor="#fdfdfdff"
              glowColor="rgba(45, 136, 248, 0.74)"
              containerClassName="relative flex gap-3 justify-center items-center flex-wrap text-blue-400 font-mono text-xl md:text-2xl uppercase tracking-widest mb-4"
            />
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 px-2 pb-2">
              <VariableProximity
                label="Let's Build & Scale"
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 900"
                containerRef={containerRef}
                radius={120}
                falloff="linear"
              />
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Open to architecting cloud infrastructure, optimizing CI/CD pipelines, and engineering robust full-stack applications.
            </p>
          </motion.div>

          {/* Middle Containers (Left & Right) */}
          <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-10 mb-16 flex-1">
            
            {/* Left Container (approx 35%) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="w-full lg:w-[38%] flex flex-col gap-6 will-change-transform"
            >
              <motion.div 
                whileHover="hover"
                initial="initial"
                variants={{
                  initial: { y: 0 },
                  hover: { y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }
                }}
                className="bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative overflow-hidden group flex-1 transition-colors duration-500 hover:border-white/20"
              >
                {/* Animated Gradient Background */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Shimmer sweep effect */}
                <motion.div 
                  variants={{
                    initial: { x: "-100%", opacity: 0 },
                    hover: { x: "100%", opacity: 1, transition: { repeat: Infinity, duration: 1.5, ease: "linear" } }
                  }}
                  className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
                />

                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  <motion.div 
                    variants={{
                      initial: { scale: 1 },
                      hover: { scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 20 } }
                    }}
                    className="w-32 h-32 rounded-full mb-6 p-1 relative group/avatar cursor-default"
                  >
                    {/* Glowing outer rings */}
                    <div className="absolute inset-0 rounded-full border border-white/10 group-hover/avatar:border-blue-400/50 transition-colors duration-500" />
                    <div className="absolute -inset-2 rounded-full border border-purple-500/20 opacity-0 group-hover/avatar:opacity-100 scale-95 group-hover/avatar:scale-100 transition-all duration-500" />
                    
                    {/* Spinning dash */}
                    <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-transparent border-t-blue-500 group-hover/avatar:border-r-purple-500 animate-spin transition-all duration-500" style={{ animationDuration: '3s' }} />
                    
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-900 ring-2 ring-transparent group-hover/avatar:ring-blue-500/20 transition-all duration-500">
                      <Image 
                        src="/images/avatar.webp" 
                        alt="Arghya"
                        fill
                        className="object-cover transition-transform duration-700 group-hover/avatar:scale-110"
                        sizes="(max-width: 128px) 100vw, 128px"
                      />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-500">Arghya</h3>
                  
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <p className="text-blue-400 font-mono text-sm">Full-Stack Developer</p>
                  </div>
                  
                  <p className="text-white/60 text-base leading-relaxed mb-8 flex-1 group-hover:text-white/80 transition-colors duration-500">
                    Passionate about building scalable applications, creating intuitive user interfaces, and solving complex problems with modern web technologies.
                  </p>
                  
                  {/* Subtle decorative element */}
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6 relative overflow-hidden">
                    <motion.div 
                      variants={{
                        initial: { x: "-100%" },
                        hover: { x: "100%", transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } }
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                    />
                  </div>
                  
                  <div className="text-sm text-white/40 font-mono flex flex-wrap justify-center items-center gap-2 group-hover:text-white/60 transition-colors duration-500">
                    <span>Based in India</span>
                    <span className="text-blue-500/50 hidden sm:inline">•</span>
                    <span>Available Worldwide</span>
                  </div>
                </div>
              </motion.div>

              <GithubGraph />
            </motion.div>

            {/* Right Container (approx 65%) */}
            <div className="w-full lg:w-[62%] flex flex-col">
              <ContactForm />
            </div>

          </div>

          {/* Bottom Container */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="w-full mt-auto pt-10 border-t border-white/10 flex flex-col items-center shrink-0 will-change-transform"
          >
            <h4 className="text-white/50 text-sm font-mono tracking-widest uppercase mb-2">
              Connect With Me
            </h4>
            <SocialIcons />
          </motion.div>

        </div>
        
        {/* Premium Marquee */}
        <div className="w-full relative z-20 border-y border-white/5 bg-white/[0.02] backdrop-blur-md py-4 mt-12 mb-0">
          <TextMarquee 
            text="ARCHITECTING CLOUD INFRASTRUCTURE • AUTOMATING DEVOPS PIPELINES • ENGINEERING FULL-STACK SOLUTIONS"
            repeat={4}
            className="text-white/60"
            textClassName="font-sans font-light tracking-[0.5em] uppercase"
            separator={<span className="text-blue-500/80 mx-6 text-lg">✦</span>}
          />
        </div>
      </div>
    </section>
  );
}

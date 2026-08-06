"use client";

import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap/gsap.config";
import { getGPUTier } from "detect-gpu";
import { ArrowUpRight, Cpu, Layers, Sparkles, TerminalSquare, Rocket, Code2 } from "lucide-react";



const projectsData = [
  {
    title: "DD Tours & Travels",
    category: "Full Stack Travel Platform",
    desc: "Full Stack Travel Booking Platform with real-time listings, user flows & booking system.",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "REST APIs"],
    architecture: "Client-Server with RESTful APIs",
    deployments: ["AWS", "Vercel"],
    link: "https://ddtours.in",
    image: "/images/projects/project-3.webp",
  },
  {
    title: "EquiLens AI BIAS",
    category: "AI BIAS Detector",
    desc: "AI-powered system to detect, visualize and explain bias in text & datasets.",
    techStack: ["React", "Python", "Vertex AI", "Google Cloud"],
    architecture: "Serverless AI Processing Pipeline",
    deployments: ["Firebase", "Google Cloud"],
    link: "https://equilens.devarghya.in",
    image: "/images/projects/project-2.webp",
  },
  {
    title: "AI Notes App",
    category: "Mobile App",
    desc: "Smart student notes manager — AI-assisted tagging, summarization & search.",
    techStack: ["Flutter", "Firebase", "LLMs"],
    architecture: "Event-Driven Mobile Architecture",
    deployments: ["App Store", "Play Store"],
    link: "#",
    image: "/images/projects/project-1.webp",
  },
  {
    title: "Velocity OS",
    category: "System Design",
    desc: "A web-based operating system interface showcasing complex state management.",
    techStack: ["React", "TypeScript", "Redux", "Framer Motion"],
    architecture: "Component-Based Architecture",
    deployments: ["Vercel", "Cloudflare"],
    link: "#",
    image: "/images/projects/project-4.webp",
  },
  {
    title: "Geo Trek Camera",
    category: "Android App",
    desc: "A geo-location based camera app that captures images with location metadata and allows users to share them with their location.",
    techStack: ["Android", "Kotlin", "Google Maps API", "Firebase"],
    architecture: "Client-Server with RESTful APIs",
    deployments: ["Play Store"],
    link: "https://github.com/abhilash-coder/GEOTREKK_CAMERA",
    image: "/images/projects/project-5.webp",
  }
];

const SheryContainer = React.memo(
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>((props, ref) => {
    return (
      <div
        ref={ref}
        className="shery-projects-images w-full h-full opacity-100 cursor-pointer"
        style={{ position: 'relative', width: '100%', height: '100%' }}
      >
        {projectsData.map((project, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={i}
            src={project.image}
            alt={project.title}
            width="1920"
            height="1080"
            crossOrigin="anonymous"
            decoding="async"
            className="w-full h-full object-cover absolute inset-0"
          />
        ))}
      </div>
    );
  })
);

const Projects = React.memo(function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const isAnimating = useRef(false);
  const sheryInitialized = useRef(false);

  // NOTE: IntersectionObserver for isProjectSectionInView is handled by ProjectWrapper
  // via useInView hook. No duplicate observer here to avoid state race conditions.

  useEffect(() => {
    (async () => {
      try {
        const gpuTier = await getGPUTier();
        if (gpuTier.tier < 2 || gpuTier.isMobile) {
          // Mutate DOM safely without state to prevent trashing SheryJS
          if (imagesRef.current) {
            imagesRef.current.classList.add('opacity-90');
          }
        }
      } catch (e) {
        console.warn("Could not detect GPU tier", e);
      }
    })();
  }, []);

  // Play Intro Animation whenever currentIndex changes (safely after React renders)
  useLayoutEffect(() => {
    // Reset containers to prevent layout jumps
    gsap.set([".project-info-left", ".project-info-right"], { opacity: 1, y: 0 }); 

    const tlIn = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      }
    });

    const dly = isInitialMount.current ? 0.5 : 0;
    
    // Premium Blur + Scale Reveal for Title
    tlIn.fromTo(".project-title",
      { opacity: 0, y: 60, filter: "blur(12px)", scale: 0.95 },
      { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 1.2, ease: "power4.out" },
      dly
    );

    tlIn.fromTo(".animate-item",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power3.out" },
      dly + 0.1
    );

    tlIn.fromTo(".separator-line",
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "expo.inOut", transformOrigin: "left center" },
      dly
    );

    isInitialMount.current = false;

    return () => {
      tlIn.kill();
    };
  }, [currentIndex]);

  useEffect(() => {
    const currentImagesRef = imagesRef.current;
    if (sheryInitialized.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let Shery: any;
    let guiInterval: ReturnType<typeof setInterval> | null = null;
    let guiTimeout: ReturnType<typeof setTimeout> | null = null;

    const initShery = async () => {
      if (typeof window === "undefined" || !imagesRef.current) return;
      if (sheryInitialized.current) return;

      try {
        // Step 1: DOM Interactive Check (Wait for the document to be fully loaded to prevent WebGL deadlocks)
        if (document.readyState !== "complete") {
          await new Promise((resolve) => {
            window.addEventListener("load", resolve, { once: true });
          });
        }

        // Wait for all images to fully load to ensure WebGL textures aren't blank
        const imgs = Array.from(imagesRef.current.querySelectorAll("img"));
        await Promise.all(imgs.map(img => {
          if (img.complete && img.naturalWidth > 0) return Promise.resolve();
          return new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        }));

        // Expose GSAP to the window object globally
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).gsap = gsap;

        // Dynamically import Shery to avoid SSR issues
        // @ts-expect-error - SheryJS lacks TypeScript definitions
        Shery = (await import("sheryjs")).default;

        sheryInitialized.current = true;

        Shery.imageEffect(".shery-projects-images", {
          style: 5,
          gooey: true,
          scrollSnapping: true,
          scrollSpeed: 6,
          touchSpeed: 6,
          damping: 7,
          config: {
            a: { value: 2, range: [0, 30] },
            b: { value: -0.91, range: [-1, 1] },
            zindex: { value: 0, range: [-9999999, 9999999] },
            aspect: { value: 1.9056224899598394 },
            ignoreShapeAspect: { value: true },
            shapePosition: { value: { x: 0, y: 0 } },
            shapeScale: { value: { x: 0.5, y: 0.5 } },
            shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
            shapeRadius: { value: 0, range: [0, 2] },
            currentScroll: { value: 0 },
            scrollLerp: { value: 0.07 },
            gooey: { value: true },
            infiniteGooey: { value: true },
            growSize: { value: 4, range: [1, 15] },
            durationOut: { value: 1, range: [0.1, 5] },
            durationIn: { value: 1, range: [0.1, 5] },
            displaceAmount: { value: 0.5 },
            masker: { value: false },
            maskVal: { value: 1, range: [1, 5] },
            scrollType: { value: 0 },
            geoVertex: { range: [1, 64], value: 1 },
            noEffectGooey: { value: false },
            onMouse: { value: 1 },
            noise_speed: { value: 0.2, range: [0, 10] },
            metaball: { value: 0.2, range: [0, 2], _gsap: { id: 3 } },
            discard_threshold: { value: 0.5, range: [0, 1] },
            antialias_threshold: { value: 0.002, range: [0, 0.1] },
            noise_height: { value: 0.5, range: [0, 2] },
            noise_scale: { value: 10, range: [0, 100] },
          }
        });

        // Robustly extract the GUI panel out of the SheryJS stacking context
        // so it sits on top of the <main> layout and remains clickable.
        // Since images take time to load, we poll until the GUI is created.
        guiInterval = setInterval(() => {
          const gui = document.getElementById('controlKit') || document.querySelector('.controlKit');
          if (gui) {
            if (gui.parentElement !== document.body) {
              document.body.appendChild(gui);
            }
            if (guiInterval) clearInterval(guiInterval);
          }
        }, 500);

        // Clear interval after 10s to prevent memory leaks if debug is disabled
        guiTimeout = setTimeout(() => { if (guiInterval) clearInterval(guiInterval); }, 10000);

      } catch (err) {
        console.error("SheryJS Init Error:", err);
      }
    };

    // Initialize after a short delay to ensure React has painted the DOM images
    const timer = setTimeout(initShery, 100);

    return () => {
      clearTimeout(timer);
      if (guiInterval) clearInterval(guiInterval);
      if (guiTimeout) clearTimeout(guiTimeout);

      // Destroy SheryJS WebGL canvases to prevent duplicates on HMR / StrictMode remount
      if (currentImagesRef) {
        const canvases = currentImagesRef.querySelectorAll("canvas");
        canvases.forEach((canvas) => {
          // Attempt to lose the WebGL context to free GPU memory
          const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
          if (gl) {
            const ext = gl.getExtension("WEBGL_lose_context");
            if (ext) ext.loseContext();
          }
          canvas.remove();
        });
      }

      // Kill any ScrollTrigger instances SheryJS may have created inside our container
      ScrollTrigger.getAll()
        .filter((st) => {
          const triggerEl = st.trigger as HTMLElement | undefined;
          return triggerEl?.closest?.(".shery-projects-images");
        })
        .forEach((st) => st.kill());

      sheryInitialized.current = false;
    };
  }, []);

  const handleNext = useCallback((e?: React.SyntheticEvent | Event) => {
    // If it's a touch event on mobile, explicitly dispatch a click to the canvas 
    // to guarantee SheryJS catches it, as native mobile touches can be swallowed.
    if (e && e.type === 'touchstart') {
      const canvas = imagesRef.current?.querySelector('canvas');
      if (canvas) {
        const touch = (e as unknown as React.TouchEvent).touches?.[0];
        const clickEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
          clientX: touch?.clientX || 0,
          clientY: touch?.clientY || 0
        });
        canvas.dispatchEvent(clickEvent);
      }
    }

    if (isAnimating.current) return;
    isAnimating.current = true;

    // Loop back to 0 if at the last project
    const nextIndex = currentIndex >= projectsData.length - 1 ? 0 : currentIndex + 1;

    // Outro Timeline
    const tlOut = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(nextIndex);
        // The React state change triggers the useLayoutEffect above, cleanly playing the Intro animation
      }
    });

    // Premium Blur + Translate Outro for Title
    tlOut.to(".project-title", {
      opacity: 0,
      y: -40,
      filter: "blur(10px)",
      scale: 0.95,
      duration: 0.5,
      ease: "power3.in"
    }, 0);

    tlOut.to(".animate-item", {
      opacity: 0,
      y: -20,
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.in"
    }, 0);

    tlOut.to(".separator-line", {
      scaleX: 0,
      duration: 0.4,
      ease: "power2.in",
      transformOrigin: "right center"
    }, 0);

  }, [currentIndex]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[100dvh] bg-transparent flex flex-col items-center justify-center relative overflow-hidden disable-custom-cursor"
      onClickCapture={handleNext}
      onTouchStartCapture={handleNext}
    >
      {/* 
        SheryJS Container 
        We render all images here. SheryJS will convert them to a WebGL canvas.
        Wrapped in a memoized component so React state updates don't destroy the WebGL canvas.
      */}
      <SheryContainer ref={imagesRef} />

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 bg-gradient-to-r from-black/80 via-transparent to-black/80">

        {/* Left Container */}
        <div ref={textRef} className="project-info-left w-full md:w-[50%] flex flex-col justify-center transform-gpu will-change-transform mt-24 md:mt-0 relative">

          {/* Premium Animated Background SVG decoration */}
          <div className="absolute -top-32 -left-16 w-64 h-64 opacity-20 pointer-events-none mix-blend-screen hidden md:block">
            <svg viewBox="0 0 100 100" className="animate-[spin_20s_linear_infinite] w-full h-full">
              <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" />
              <path d="M50 15 L53 47 L85 50 L53 53 L50 85 L47 53 L15 50 L47 47 Z" fill="none" stroke="white" strokeWidth="1" className="animate-pulse" />
            </svg>
          </div>

          <div className="animate-item flex items-center gap-4 mb-8">
            <span className="w-12 h-[2px] bg-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
            <p className="text-white/80 text-sm md:text-base font-bold tracking-[0.4em] uppercase drop-shadow-md">
              <span className="text-white">{String(currentIndex + 1).padStart(2, '0')}</span> — {projectsData[currentIndex].category}
            </p>
          </div>

          <h2 className="project-title text-7xl md:text-[7rem] lg:text-[9rem] font-black uppercase tracking-tighter text-white mb-12 leading-[0.85] text-balance drop-shadow-2xl" style={{ perspective: "1000px" }}>
            {projectsData[currentIndex].title}
          </h2>

          <div className="animate-item flex">
            <a href={projectsData[currentIndex].link} target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-center gap-3 px-10 py-5 border border-white/30 rounded-full overflow-hidden pointer-events-auto cursor-pointer hover:border-white transition-all duration-500 backdrop-blur-md bg-black/20 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <div className="absolute inset-0 w-full h-full bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              <span className="relative z-10 text-white group-hover:text-black font-bold text-xs md:text-sm uppercase tracking-[0.2em] transition-colors duration-500">
                Explore Project
              </span>
              <ArrowUpRight className="relative z-10 w-4 h-4 text-white group-hover:text-black transition-colors duration-500 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>

        {/* Right Container */}
        <div className="project-info-right w-full md:w-[40%] lg:w-[35%] flex flex-col justify-center gap-10 transform-gpu will-change-transform text-left mb-24 md:mt-0 relative z-10">

          <p className="animate-item text-white/80 text-lg md:text-2xl leading-relaxed font-light text-balance drop-shadow-md">
            {projectsData[currentIndex].desc}
          </p>

          <div className="separator-line w-full h-[1px] bg-gradient-to-r from-white/40 to-transparent"></div>

          <div className="flex flex-col gap-10">
            <div className="animate-item group">
              <div className="flex items-center gap-2 mb-5">
                <Code2 className="w-4 h-4 text-white/50" />
                <h3 className="text-white/50 text-xs font-bold uppercase tracking-[0.2em]">Tech Stack</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {projectsData[currentIndex].techStack.map((tech, i) => (
                  <span key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/90 font-medium text-xs tracking-widest uppercase drop-shadow-md backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                    <Sparkles className="w-3 h-3 text-white/40" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="animate-item group">
              <div className="flex items-center gap-2 mb-5">
                <Layers className="w-4 h-4 text-white/50" />
                <h3 className="text-white/50 text-xs font-bold uppercase tracking-[0.2em]">Architecture</h3>
              </div>
              <div className="flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-all duration-300">
                <Cpu className="w-6 h-6 text-white/70" />
                <p className="text-white/90 font-medium text-sm uppercase tracking-widest leading-relaxed drop-shadow-md">
                  {projectsData[currentIndex].architecture}
                </p>
              </div>
            </div>

            <div className="animate-item group">
              <div className="flex items-center gap-2 mb-5">
                <Rocket className="w-4 h-4 text-white/50" />
                <h3 className="text-white/50 text-xs font-bold uppercase tracking-[0.2em]">Deployments</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {projectsData[currentIndex].deployments.map((dep, i) => (
                  <span key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/90 font-medium text-xs tracking-widest uppercase drop-shadow-md backdrop-blur-md hover:bg-white/10 transition-all duration-300">
                    <TerminalSquare className="w-3 h-3 text-white/40" />
                    {dep}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
});

export default Projects;

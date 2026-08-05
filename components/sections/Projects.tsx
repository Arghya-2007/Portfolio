"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/gsap.config";
import { getGPUTier } from "detect-gpu";


const dummyProjects = [
  {
    title: "Quantum Nexus",
    category: "Web3 Platform",
    desc: "A decentralized exchange with real-time analytics and predictive trading algorithms.",
    image: "/images/projects/project-1.webp",
  },
  {
    title: "Aura Dynamics",
    category: "Generative AI",
    desc: "Interactive AI visualization tool for creating immersive ambient environments.",
    image: "/images/projects/project-2.webp",
  },
  {
    title: "Lumina Frame",
    category: "E-Commerce",
    desc: "A high-performance headless Shopify storefront with custom 3D product configurators.",
    image: "/images/projects/project-3.webp",
  },
  {
    title: "Velocity OS",
    category: "System Design",
    desc: "A web-based operating system interface showcasing complex state management.",
    image: "/images/projects/project-4.webp",
  },
  {
    title: "Chroma Engine",
    category: "Creative Coding",
    desc: "Custom WebGL shader engine built for high-end interactive storytelling.",
    image: "/images/projects/project-5.webp",
  },
];

const SheryContainer = React.memo(
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>((props, ref) => {
    return (
      <div
        ref={ref}
        className="shery-projects-images w-full h-full opacity-100 cursor-pointer"
        style={{ position: 'relative', width: '100%', height: '100%' }}
      >
        {dummyProjects.map((project, i) => (
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
    const nextIndex = currentIndex >= dummyProjects.length - 1 ? 0 : currentIndex + 1;

    // SheryJS handles the WebGL image transition internally via its own mousedown listener now.
    // We only need to animate the text out and in.

    // Animate text out and in
    gsap.to(".project-info", {
      y: -50,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIndex(nextIndex);

        gsap.fromTo(".project-info",
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: "power3.out", onComplete: () => {
              isAnimating.current = false;
            }
          }
        );
      }
    });
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
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center px-12 md:px-24 lg:px-48 bg-gradient-to-t from-black/80 via-transparent to-black/40">
        <div ref={textRef} className="project-info max-w-4xl pt-20 transform-gpu will-change-transform">
          <p className="text-white/60 text-sm md:text-lg font-mono mb-4 uppercase tracking-[0.2em]">
            {String(currentIndex + 1).padStart(2, '0')} — {dummyProjects[currentIndex].category}
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 drop-shadow-2xl">
            {dummyProjects[currentIndex].title}
          </h2>
          <p className="text-white/80 text-lg md:text-2xl font-light leading-relaxed max-w-2xl text-balance drop-shadow-md">
            {dummyProjects[currentIndex].desc}
          </p>

          <div className="mt-12 flex items-center gap-4">
            <div className="w-12 h-[1px] bg-white/40"></div>
            <p className="text-white/40 text-sm uppercase tracking-widest">
              Tap anywhere to view next
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Projects;

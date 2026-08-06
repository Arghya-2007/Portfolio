"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsap.config";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
  </svg>
);

export default function GithubGraph() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Container reveal
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%"
      }}
    );

    // Title reveal
    gsap.fromTo(".github-title",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, delay: 0.2, ease: "power2.out", scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%"
      }}
    );

    // Graph reveal
    gsap.fromTo(".github-graph",
      { opacity: 0, y: 20, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, delay: 0.4, ease: "power3.out", scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%"
      }}
    );
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="w-full bg-black/40 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md mt-6 shadow-2xl relative overflow-hidden group opacity-0 translate-y-[20px]"
      data-cursor="default"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Hover Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />

      {/* Border Gradient overlay */}
      <div className="absolute inset-0 rounded-3xl border border-white/5 group-hover:border-white/20 transition-colors duration-700 pointer-events-none" />

      <div className="relative z-10">
        <div 
          className="github-title flex items-center gap-3 mb-8 opacity-0 -translate-x-[20px]"
        >
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm group-hover:bg-white/10 transition-colors duration-500">
            <GithubIcon className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 tracking-tight">        
            Open Source Contributions
          </h3>
        </div>

        <div 
          className="github-graph overflow-x-auto pb-4 flex justify-start lg:justify-center relative scrollbar-hide opacity-0 translate-y-[20px] blur-[10px]"
        >
          <div className="min-w-[800px] sm:min-w-0 pr-8 lg:pr-0 transition-transform duration-500 hover:scale-[1]">
            <GitHubCalendar 
              username="Arghya-2007" 
              colorScheme="dark"
              theme={{
                dark: ['#1a2014ff', '#1a360fff', '#23741bff', '#32b42bff', '#42e13cff'],
              }}
              blockSize={14}
              blockMargin={5}
              fontSize={14}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

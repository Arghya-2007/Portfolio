"use client";

import { useState, useRef } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsap.config";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Form Container Entrance
    gsap.fromTo(containerRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.3, scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%"
      }}
    );

    // Stagger Form Items
    gsap.fromTo(".contact-form-item",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)", delay: 0.5, scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%"
      }}
    );
  }, { scope: containerRef });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const resData = await response.json();
      
      if (response.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setErrorMsg(resData.error || "Failed to send message");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full relative h-full flex flex-col justify-center group will-change-transform opacity-0 translate-x-[50px]"
    >
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(12deg); }
          100% { transform: translateX(200%) skewX(12deg); }
        }
        .group\\/btn:hover .animate-shine {
          animation: shine 1.5s ease-in-out infinite;
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60%, 100% { transform: rotate(0deg); }
        }
        .animate-wave {
          animation: wave 2.5s infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }
      `}</style>
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-3xl blur-2xl opacity-50 transition duration-500 group-hover:opacity-80" />
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl h-full flex flex-col justify-between overflow-hidden">
        
        {/* Subtle hover gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />

        <h3 className="text-3xl font-semibold mb-6 text-white relative z-10 flex items-center gap-3">
          Let&apos;s Talk
          <div className="animate-wave">
            👋
          </div>
        </h3>
        
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-6 flex-1 flex flex-col justify-center relative z-10"
        >
          <div className="contact-form-item space-y-1.5 group/input opacity-0 translate-y-[15px]">
            <label htmlFor="name" className="text-sm font-medium text-white/70 ml-1 group-focus-within/input:text-blue-400 transition duration-300">Name</label>
            <input
              id="name"
              type="text"
              {...register("name")}
              placeholder="John Doe"
              className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition duration-300`}
            />
            <div className={`grid transition duration-300 ease-in-out ${errors.name ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
              <div className="overflow-hidden">
                <p className="text-red-400 text-xs ml-1">{errors.name?.message}</p>
              </div>
            </div>
          </div>

          <div className="contact-form-item space-y-1.5 group/input opacity-0 translate-y-[15px]">
            <label htmlFor="email" className="text-sm font-medium text-white/70 ml-1 group-focus-within/input:text-blue-400 transition duration-300">Email</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="john@example.com"
              className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition duration-300`}
            />
            <div className={`grid transition duration-300 ease-in-out ${errors.email ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
              <div className="overflow-hidden">
                <p className="text-red-400 text-xs ml-1">{errors.email?.message}</p>
              </div>
            </div>
          </div>

          <div className="contact-form-item space-y-1.5 flex-1 flex flex-col group/input opacity-0 translate-y-[15px]">
            <label htmlFor="message" className="text-sm font-medium text-white/70 ml-1 group-focus-within/input:text-blue-400 transition duration-300">Message</label>
            <textarea
              id="message"
              {...register("message")}
              placeholder="How can I help you?"
              className={`w-full flex-1 min-h-[120px] bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition duration-300 resize-none`}
            />
            <div className={`grid transition duration-300 ease-in-out ${errors.message ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
              <div className="overflow-hidden">
                <p className="text-red-400 text-xs ml-1">{errors.message?.message}</p>
              </div>
            </div>
          </div>

          <div className={`grid transition duration-300 ease-in-out ${errorMsg ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <p className="text-red-400 text-sm">{errorMsg}</p>
            </div>
          </div>

          <div className="contact-form-item opacity-0 translate-y-[15px]">
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white font-medium tracking-wide h-[56px] flex items-center justify-center gap-2 transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-2 group/btn border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:scale-[1.02] hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.6)] active:scale-[0.98]"
            >
              <div 
                className="animate-shine absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full" 
              />
              
              <div className="relative z-10 drop-shadow-md w-full h-full flex items-center justify-center">
                {/* Idle State */}
                <div className={`absolute flex items-center justify-center gap-2 transition duration-500 ${isSubmitting || isSuccess ? 'opacity-0 translate-y-[20px] pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                  <span className="text-2xl font-semibold tracking-wider">Initialize Sequence</span>
                  <Send className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </div>
                
                {/* Loading State */}
                <div className={`absolute flex items-center justify-center gap-2 transition duration-500 ${isSubmitting ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-[20px] pointer-events-none'}`}>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Deploying Message...</span>
                </div>
                
                {/* Success State */}
                <div className={`absolute flex items-center justify-center gap-2 text-green-300 transition duration-500 ${isSuccess ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Message Deployed!</span>
                </div>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

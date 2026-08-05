"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const buttonVariants: Variants = {
    initial: { scale: 1, boxShadow: "0 0 0px rgba(59,130,246,0)" },
    hover: { 
      scale: 1.01, 
      boxShadow: "0 10px 40px -10px rgba(59,130,246,0.6)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.98 }
  };

  const shineVariants: Variants = {
    initial: { x: "-100%" },
    hover: { 
      x: "100%", 
      transition: { 
        repeat: Infinity, 
        duration: 1.5, 
        ease: "easeInOut",
        repeatDelay: 0.2
      } 
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      viewport={{ once: true, margin: "-50px" }}
      className="w-full relative h-full flex flex-col justify-center group will-change-transform"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-3xl blur-2xl opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl h-full flex flex-col justify-between overflow-hidden">
        
        {/* Subtle hover gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <h3 className="text-3xl font-semibold mb-6 text-white relative z-10 flex items-center gap-3">
          Let&apos;s Talk
          <motion.div
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block origin-bottom-right"
          >
            👋
          </motion.div>
        </h3>
        
        <motion.form 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-6 flex-1 flex flex-col justify-center relative z-10"
        >
          <motion.div variants={itemVariants} className="space-y-1.5 group/input">
            <label htmlFor="name" className="text-sm font-medium text-white/70 ml-1 group-focus-within/input:text-blue-400 transition-colors duration-300">Name</label>
            <input
              id="name"
              type="text"
              {...register("name")}
              placeholder="John Doe"
              className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300`}
            />
            <AnimatePresence>
              {errors.name && (
                <motion.p initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 4 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="text-red-400 text-xs ml-1 overflow-hidden">
                  {errors.name.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1.5 group/input">
            <label htmlFor="email" className="text-sm font-medium text-white/70 ml-1 group-focus-within/input:text-blue-400 transition-colors duration-300">Email</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="john@example.com"
              className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300`}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 4 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="text-red-400 text-xs ml-1 overflow-hidden">
                  {errors.email.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1.5 flex-1 flex flex-col group/input">
            <label htmlFor="message" className="text-sm font-medium text-white/70 ml-1 group-focus-within/input:text-blue-400 transition-colors duration-300">Message</label>
            <textarea
              id="message"
              {...register("message")}
              placeholder="How can I help you?"
              className={`w-full flex-1 min-h-[120px] bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 resize-none`}
            />
            <AnimatePresence>
              {errors.message && (
                <motion.p initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 4 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="text-red-400 text-xs ml-1 overflow-hidden">
                  {errors.message.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {errorMsg && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-sm overflow-hidden">
                {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.div variants={itemVariants}>
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              disabled={isSubmitting}
              type="submit"
              className="w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white font-medium tracking-wide py-4 px-6 flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-2 group/btn border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
            >
              <motion.div 
                variants={shineVariants} 
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" 
              />
              
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 relative z-10 drop-shadow-md"
                  >
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Deploying Message...</span>
                  </motion.div>
                ) : isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2 text-green-300 relative z-10 drop-shadow-md"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Message Deployed!</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 relative z-10 drop-shadow-md"
                  >
                    <span className="text-2xl font-semibold tracking-wider">Initialize Sequence</span>
                    <Send className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
}

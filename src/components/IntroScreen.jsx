"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // Prevent scroll while intro is showing
    document.body.style.overflow = "hidden";

    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 45); // ~4.5 seconds to reach 100

    // Hide intro after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#020617] overflow-hidden"
        >
          {/* Background Gradient Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px]" />
          </div>

          {/* Grid lines background */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: "radial-gradient(circle, #818cf8 1px, transparent 1px)", 
              backgroundSize: "24px 24px" 
            }} 
          />

          {/* Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
            
            {/* Logo Wrapper with Rotating Glow Ring */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative mb-8"
            >
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8
                }}
                className="relative"
              >
                {/* Outer Gradient Glow Ring */}
                <div className="absolute inset-[-6px] rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-75 blur-md animate-spin-slow" />
                
                {/* Inner White/Dark Border Ring */}
                <div className="absolute inset-[-2px] rounded-full bg-slate-950" />
                
                {/* Logo Image */}
                <div className="relative w-28 h-28 rounded-full overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center bg-slate-950">
                  <img
                    src="/SUDHEER PVT.LTD.png"
                    alt="Sudheer Pvt.Ltd Logo"
                    className="w-full h-full object-cover scale-105"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Application Name */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-6xl font-black tracking-tight mb-3"
            >
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(to right, #FF9933, #FF9933 33%, #ffffff 33%, #ffffff 66%, #138808 66%, #138808)"
                }}
              >
                Sudheer Pvt.Ltd
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-sm md:text-base text-slate-400 font-medium tracking-widest uppercase mb-12 max-w-md"
            >
              Verification & Corporate Registry API
            </motion.p>

            {/* Premium Loader Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="w-64 md:w-80 h-[4px] bg-slate-800 rounded-full overflow-hidden relative border border-white/5"
            >
              {/* Indian Tricolour fill */}
              <div
                className="h-full transition-all duration-150 ease-out shadow-[0_0_8px_rgba(255,153,51,0.6)]"
                style={{ 
                  width: `${progress}%`,
                  background: "linear-gradient(to right, #FF9933, #FF9933 33%, #ffffff 33%, #ffffff 66%, #138808 66%, #138808)"
                }}
              />
            </motion.div>
            
            {/* Loading text percentage */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.2 }}
              className="text-xs text-slate-400 mt-2 font-mono"
            >
              {progress}%
            </motion.span>
          </div>

          {/* Bottom Government Logo Badge — Circular Curved Cut */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
          >
            {/* Circular curved-cut logo */}
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-[-3px] rounded-full bg-gradient-to-r from-primary/50 via-secondary/50 to-accent/50 blur-sm" />
              <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-white/15 shadow-2xl bg-white flex items-center justify-center">
                <img 
                  src="/Screenshot 2026-06-05 152126.png" 
                  alt="Ministry of Corporate Affairs Logo" 
                  className="w-full h-full object-contain p-1"
                />
              </div>
            </div>
            <div className="text-center">
              <p 
                className="text-[9px] uppercase font-black tracking-widest bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(to right, #FF9933, #ffffff, #138808)" }}
              >
                Official Data Source
              </p>
              <p 
                className="text-[11px] font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(to right, #FF9933, #ffffff, #138808)" }}
              >
                Ministry of Corporate Affairs, Gov of India
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

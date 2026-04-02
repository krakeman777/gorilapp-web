"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRef, useState, useCallback } from "react";
import WaitlistModal from "./WaitlistModal";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement for "premium" feel (Higher damping, lower stiffness = silkier)
  const springConfig = { stiffness: 70, damping: 30 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate relative position (-0.5 to 0.5)
    const xPct = (clientX / innerWidth) - 0.5;
    const yPct = (clientY / innerHeight) - 0.5;
    
    mouseX.set(xPct);
    mouseY.set(yPct);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Use Springs for smoother, inertia-based parallax (60fps feel)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax calculations (Scroll-based)
  const logoY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const logoScale = useTransform(smoothProgress, [0, 1], [1.1, 1.4]);
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);
  const opacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const blur = useTransform(smoothProgress, [0, 0.4], ["0px", "10px"]);

  // Parallax calculations (Mouse-based) - Subtler ranges
  const logoMouseX = useTransform(smoothMouseX, [-0.5, 0.5], ["-1.5%", "1.5%"]);
  const logoMouseY = useTransform(smoothMouseY, [-0.5, 0.5], ["-1.5%", "1.5%"]);
  const textMouseX = useTransform(smoothMouseX, [-0.5, 0.5], ["0.5%", "-0.5%"]);
  const textMouseY = useTransform(smoothMouseY, [-0.5, 0.5], ["0.5%", "-0.5%"]);


  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black select-none pointer-events-auto"
    >
      {/* SOCIAL LINKS - Top Right */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute top-6 right-6 md:top-10 md:right-10 z-50 flex items-center gap-6"
      >
        <a 
          href="https://instagram.com/gorilapp.fit" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-3 text-brand-text-muted hover:text-brand-primary transition-all duration-300"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            gorilapp.fit
          </span>
          <div className="p-3 bg-white/5 backdrop-blur-md border border-white/5 rounded-full group-hover:border-brand-primary/30 group-hover:scale-110 transition-all duration-300">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-[18px] h-[18px]"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </div>
        </a>
      </motion.div>


      {/* BACKGROUND LOGO OVERLAY (PARALLAX) - Optimized for 60FPS */}

      <motion.div
        style={{ 
          y: logoY, 
          x: logoMouseX,
          translateY: logoMouseY, // Combined with y (scroll)
          scale: logoScale, 
          opacity,
          filter: `blur(${blur})`,
          willChange: "transform, opacity, filter" 
        }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none -translate-y-20 transform-gpu"
      >
        <div className="relative w-[110%] h-[110%] md:w-[90%] md:h-[90%] lg:w-[100%] lg:h-[100%]">
          <Image
            src="/logo.png"
            alt="Gorilapp Background Logo"
            fill
            className="object-contain opacity-[0.35] filter grayscale contrast-125 selection:bg-transparent"
            priority
          />
          {/* Gradient Overlays with GPU acceleration */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90 transform-gpu" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-90 transform-gpu" />
        </div>
      </motion.div>

      {/* FOREGROUND CONTENT */}
      <motion.div
        style={{ 
          y: textY, 
          x: textMouseX,
          translateY: textMouseY,
          opacity,
          willChange: "transform, opacity" 
        }}
        className="z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl translate-y-32 transform-gpu"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center"
        >
          {/* SEMANTIC H1 - Screen Reader optimized but styled for impact */}
          <h1 className="sr-only">Tracker de Entrenamiento para Atletas de Alto Rendimiento.</h1>
          
          <div className="text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] font-display font-black text-brand-text tracking-[-0.05em] uppercase leading-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] selection:bg-brand-primary selection:text-black">
            GORILAPP
          </div>


          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 flex flex-col items-center space-y-6"
          >
            <div className="inline-block relative overflow-hidden px-8 py-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-sm transform-gpu">
              <h2 className="text-brand-text font-mono text-xs md:text-sm tracking-[0.2em] uppercase">
                Entrena con Disciplina: Progress without audience.
              </h2>
              <div className="absolute bottom-0 left-0 h-[1.5px] bg-brand-primary w-full opacity-50" />
            </div>

            {/* SECONDARY SEO HEADINGS - Integrated but legible */}
            <div className="flex flex-col gap-3 max-w-lg mt-4">
               <h2 className="text-[11px] md:text-xs uppercase font-mono tracking-[0.1em] text-brand-text-muted">
                 Registro de Sobrecarga Progresiva y PRs.
               </h2>
               <h2 className="text-[11px] md:text-xs uppercase font-mono tracking-[0.1em] text-brand-text-muted">
                 Analíticas de Fuerza y Tonelaje.
               </h2>
            </div>
          </motion.div>
        </motion.div>



        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-16 flex flex-col items-center gap-10"
        >
          {/* RESERVE BUTTON (CTA) - Ergonomics: Centered but large for easy reach */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="group relative flex items-center gap-4 px-12 py-6 bg-brand-primary text-black font-display font-black text-sm tracking-[0.25em] uppercase rounded-full shadow-[0_20px_40px_rgba(var(--brand-primary-rgb),0.15)] transition-all hover:bg-brand-text overflow-hidden transform-gpu touch-manipulation"
          >
            <span className="relative z-10">SÉ EL PRIMERO</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />

            {/* Premium Glossy Reflection */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </motion.button>



          <div className="flex flex-col items-center gap-3">
            <p className="text-brand-text-muted font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] leading-relaxed">
              ESTABLECE TU LEGADO <br className="md:hidden" /> EN LAS SOMBRAS.
            </p>
          </div>

        </motion.div>
      </motion.div>

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* CRT Scanline Overlay - Optimized with pointer-events-none */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,1,0.06))] bg-[length:100%_2px,2px_100%] transform-gpu" />
    </section>
  );
}

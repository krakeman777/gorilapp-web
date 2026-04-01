'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { BRAND_COLORS, UI_CONFIG } from '@/config/branding';

/**
 * LogoHero: Fullscreen parallax hero with hardware-accelerated animations 
 * Optimized for 60fps and centered minimalist branding.
 */
export default function LogoHero() {
  const { scrollYProgress } = useScroll();

  // Parallax effects optimized for 60fps (transform and opacity only)
  // using hardware acceleration via will-change
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

  return (
    <section
      className="section-full"
      aria-label="Presentación de Gorilapp"
      role="banner"
    >
      <motion.div
        style={{
          scale,
          opacity,
          y,
          willChange: 'transform, opacity'
        }}
        className="flex flex-col items-center justify-center text-center px-6"
      >
        <div className="relative mb-8 md:mb-12">
          <Image
            src="/logo.png"
            alt="Logo oficial de Gorilapp"
            width={240}
            height={240}
            priority
            className="w-[180px] md:w-[240px] h-auto"
            style={{
              filter: 'drop-shadow(0 0 40px rgba(192,192,200,0.1))',
              objectFit: 'contain'
            }}
            data-testid="hero-logo"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.4,
            duration: UI_CONFIG.animationDuration,
            ease: "easeOut"
          }}
        >
          <span
            className="uber-text-accent tracking-widest text-[10px] md:text-xs font-black mb-4 block animate-pulse"
            style={{ color: BRAND_COLORS.accent }}
          >
            CULTURISMO SIN TONTERÍAS
          </span>
          <h1 className="text-3xl md:text-7xl font-black leading-[0.9] mb-8 select-none flex flex-col items-center">
            <span className="text-xl md:text-2xl mb-2 opacity-80 tracking-tighter uppercase">Registro de Entrenamiento</span>
            <span>PROGRESS WITHOUT <span className="uber-text-accent" style={{ color: BRAND_COLORS.accent }}>AUDIENCE</span></span>
          </h1>

          <div className="mt-8 md:mt-12 opacity-30">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke={BRAND_COLORS.accent}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-bounce"
              aria-hidden="true"
            >
              <path d="M7 13l5 5 5-5" />
              <path d="M7 6l5 5 5-5" className="opacity-50" />
            </svg>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Glow background - High Performance Radial Gradient */}
      <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] opacity-20"
          style={{
            background: `radial-gradient(circle at center, ${BRAND_COLORS.accentGlow} 0%, transparent 60%)`,
            willChange: 'opacity'
          }}
        />
      </div>
    </section>
  );
}

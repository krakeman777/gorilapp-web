'use client';
import React from 'react';
import LogoHero from '@/components/LogoHero';
import EvolutionMountain from '@/components/EvolutionMountain';
import { motion } from 'framer-motion';
import { BRAND_COLORS, UI_CONFIG } from '@/config/branding';

/**
 * Main Landing Page: Optimized for 60fps, Accessibility, and One-Handed Responsive Use.
 * Built with Next.js App Router and Framer Motion.
 */
export default function LandingPage() {
  return (
    <>
      {/* JSON-LD for Organization / SoftwareApp */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Gorilapp",
            "operatingSystem": "Web",
            "applicationCategory": "FitnessApplication",
            "description": "El ecosistema de registro definitivo para atletas que basan su crecimiento en datos empíricos.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
      <div className="scroll-container" role="main">
      {/* 1. SECCIÓN HERO - FULLSCREEN PARALLAX */}
      <LogoHero />

      {/* 2. SECCIÓN FILOSOFÍA - MINIMALIST */}
      <section className="section-full bg-[#0a0a0a]" aria-label="Nuestra Filosofía">
        <div className="container max-w-5xl px-12 md:px-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: UI_CONFIG.animationDuration, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'opacity, transform' }}
          >
            <h2 className="text-4xl md:text-[7rem] font-black mb-10 leading-[0.85] select-none tracking-tighter">
              HAZLO SIN <span className="uber-text-accent" style={{ color: BRAND_COLORS.accent }}>GANAS.</span>
            </h2>
            <p className="text-lg md:text-4xl text-zinc-400 font-light leading-tight mb-10 max-w-4xl">
              La motivación es un lujo; la disciplina es una <span className="text-white font-black underline decoration-zinc-800 underline-offset-8">necesidad absoluta</span>. 
              El mundo del fitness se ha convertido en un espectáculo de validación social.
              En <span className="text-white font-bold opacity-100">Gorilapp</span> lo rechazamos. 
            </p>
            <div className="h-px w-24 bg-zinc-800 mb-10"></div>
            <p className="text-md md:text-2xl text-zinc-500 font-medium leading-relaxed opacity-80 max-w-2xl">
              Construye tu legado en silencio. Registra tu tonelaje, audita tus descansos y supera al fantasma de tu entrenamiento anterior.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. SECCIÓN MÓDULOS - GRID MINIMAL */}
      <section className="section-full bg-[#000000]" aria-label="Características Principales">
        <div className="container px-12 md:px-24 max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {[
              { label: 'Precisión', title: 'Auditoría Estructural', desc: 'Registra el volumen exacto para cada bloque. Desde aislamientos a levantamientos pesados.' },
              { label: 'Foco', title: 'Consola Implacable', desc: 'Interfaz oscura, diseñada para la acción. Sin distracciones. Solo tú y el hierro.' },
              { label: 'Datos', title: 'Progreso Empírico', desc: 'Visualiza tu evolución real. Gráficas de tu RM y tonelaje acumulado.' }
            ].map((module, idx) => (
              <motion.div 
                key={idx}
                className="glass-card flex flex-col justify-between hover:border-zinc-500 transition-all duration-700 group cursor-default"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: 'opacity, transform' }}
              >
                <div>
                  <span className="uber-text-accent text-[11px] font-black tracking-widest mb-6 block uppercase leading-none opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: BRAND_COLORS.accent }}>
                    {module.label}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-black mb-6 leading-none tracking-tight group-hover:text-white transition-colors">{module.title}</h3>
                </div>
                <p className="text-zinc-500 text-sm md:text-lg leading-relaxed group-hover:text-zinc-300 transition-colors">{module.desc}</p>
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-20 transition-opacity">
                   <div className="absolute top-4 right-4 w-4 h-px bg-white"></div>
                   <div className="absolute top-4 right-4 w-px h-4 bg-white"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN GAMIFICACIÓN - LA MONTAÑA (Responsive peaks) */}
      <EvolutionMountain />

      {/* 5. CTA FINAL / FOOTER */}
      <section className="section-full bg-[#000000]" aria-label="Registro y Cierre">
        <div className="container text-center px-8 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: UI_CONFIG.animationDuration, ease: "easeOut" }}
            className="flex flex-col items-center"
            style={{ willChange: 'opacity, transform' }}
          >
            <h2 className="text-6xl md:text-[10rem] font-black mb-8 md:mb-12 leading-none select-none">
              EL RELOJ NO <span className="uber-text-accent" style={{ color: BRAND_COLORS.accent }}>PERDONA.</span>
            </h2>
            <p className="text-zinc-400 text-xl md:text-2xl mb-12 md:mb-16 max-w-2xl mx-auto font-light">
              El tiempo pasará de todos modos. Haz que estas horas cuenten.
            </p>
            
            {/* CTA optimized for thumb reachability (centered/large) */}
            <button 
              className="btn-primary transform-gpu px-12 py-6 md:px-16 md:py-8 text-xl"
              data-testid="final-cta"
              aria-label="Iniciar Registro en Gorilapp"
            >
              INICIAR REGISTRO
            </button>
          </motion.div>
          
          <footer className="absolute bottom-8 left-0 w-full px-12 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-black tracking-[0.4em] opacity-30 select-none gap-4">
            <div className="flex gap-8">
              <p>PROGRESS WITHOUT AUDIENCE</p>
              <a href="/privacy" className="hover:opacity-100 pointer-events-auto transition-opacity" title="Privacidad">PRIVACIDAD</a>
              <a href="/terms" className="hover:opacity-100 pointer-events-auto transition-opacity" title="Términos">TÉRMINOS</a>
            </div>
            <p>GORILAPP v0.1.2 // ESTADO: ALPHA</p>
            <p>© 2026 // BIOMECHANICS & DATA</p>
          </footer>
        </div>
      </section>
      </div>
    </>
  );
}

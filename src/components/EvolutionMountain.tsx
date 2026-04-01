'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { EVOLUTION_LEVELS, BRAND_COLORS } from '@/config/branding';

export default function EvolutionMountain() {
  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef, { once: true, amount: 0.2 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Desktop Path vs Mobile Path
  const desktopD = "M 50 450 L 150 400 L 250 370 L 350 320 L 450 280 L 550 220 L 650 180 L 750 120 L 850 80 L 950 20";
  const mobileD = "M 100 50 L 100 100 L 100 150 L 100 200 L 100 250 L 100 300 L 100 350 L 100 400 L 100 450 L 100 500"; 
  // Custom mobile vertical peak for better one-hand usage
  const responsiveD = isMobile 
    ? "M 50 20 L 50 60 L 50 100 L 50 140 L 50 180 L 50 220 L 50 260 L 50 300 L 50 340 L 50 380"
    : desktopD;

  const getPoints = () => {
    if (isMobile) {
      return EVOLUTION_LEVELS.map((_, i) => ({ x: 50, y: 20 + i * 40 }));
    }
    return [
      {x: 50, y: 450}, {x: 150, y: 400}, {x: 250, y: 370}, {x: 350, y: 320}, 
      {x: 450, y: 280}, {x: 550, y: 220}, {x: 650, y: 180}, {x: 750, y: 120}, 
      {x: 850, y: 80}, {x: 950, y: 20}
    ];
  };

  const points = getPoints();

  return (
    <section 
      className="section-full bg-[#000000] p-6 md:p-12 overflow-visible" 
      ref={scrollRef}
      aria-label="Evolución del Atleta: El Camino del Monolito"
      role="region"
    >
      <div className="container relative h-[80vh] flex flex-col justify-end">
        <h2 className="text-4xl md:text-8xl font-black mb-8 md:mb-12 opacity-80 select-none pointer-events-none">
          EL CAMINO DEL <span className="uber-text-accent">MONOLITO</span>
        </h2>
        
        {/* SVG Mountain Path */}
        <div className="relative w-full h-full max-h-[500px]">
          <svg 
            className="w-full h-full overflow-visible" 
            viewBox={isMobile ? "0 0 400 450" : "0 0 1000 500"} 
            preserveAspectRatio={isMobile ? "xMidYMid meet" : "none"}
            role="img"
          >
            <title>Gráfica de ascenso de niveles de Gorilapp</title>
            {/* Background 'Shadow' Peak for depth */}
            {!isMobile && (
              <motion.path
                d="M 0 480 L 200 420 L 400 450 L 600 350 L 800 380 L 1000 250"
                fill="none"
                stroke="rgba(255,255,255,0.02)"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 4 }}
              />
            )}

            <motion.path
              d={responsiveD}
              fill="none"
              stroke={BRAND_COLORS.accent}
              strokeWidth={isMobile ? "6" : "6"}
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: isMobile ? 1.5 : 3, ease: "easeInOut" }}
              style={{ willChange: 'path-length' }}
            />
            {/* Glow Path */}
            <motion.path
              d={responsiveD}
              fill="none"
              stroke={BRAND_COLORS.accentGlow}
              strokeWidth={isMobile ? "12" : "20"}
              strokeLinejoin="round"
              className="blur-xl"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: isMobile ? 1.8 : 3.5, ease: "easeInOut" }}
              style={{ filter: 'blur(20px)', willChange: 'path-length' }}
            />
            
            {/* Level Nodes */}
            {points.map((pt, index) => (
              <motion.g
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 * index + 0.5, duration: 0.4 }}
                data-testid={`level-node-${index}`}
              >
                {/* Node Bloom for Desktop */}
                {!isMobile && (
                  <circle cx={pt.x} cy={pt.y} r="20" fill={BRAND_COLORS.accentGlow} className="blur-lg opacity-40" />
                )}
                <circle cx={pt.x} cy={pt.y} r={isMobile ? "12" : "10"} fill={BRAND_COLORS.accent} className="shadow-2xl cursor-pointer" />
                <foreignObject 
                  x={isMobile ? pt.x + 25 : pt.x + 20} 
                  y={isMobile ? pt.y - 15 : pt.y - 100} 
                  width={isMobile ? "300" : "250"} 
                  height="120" 
                  className="overflow-visible"
                >
                  <div 
                    className="flex flex-col text-left transition-transform duration-200 hover:scale-110 active:scale-95"
                    style={{ willChange: 'transform' }}
                  >
                    <span className="uber-text-accent text-[8px] md:text-[11px] font-black tracking-widest uppercase opacity-70 mb-2">Nvl {index + 1}</span>
                    <h4 className="text-white text-xs md:text-xl font-black uppercase leading-none tracking-tight">{EVOLUTION_LEVELS[index].title}</h4>
                    {!isMobile && <p className="text-[11px] text-zinc-500 mt-2 max-w-[150px] leading-snug">{EVOLUTION_LEVELS[index].desc}</p>}
                  </div>
                </foreignObject>
              </motion.g>
            ))}
          </svg>
        </div>
      </div>
      
      {/* Scroll indicator for mobile (one-handed UX) */}
      <div className="absolute bottom-10 right-10 block md:hidden opacity-30 select-none animate-pulse">
        <span className="text-[8px] font-black tracking-[0.5em] vertical-text">SCROLL TO ASCEND</span>
      </div>
    </section>
  );
}

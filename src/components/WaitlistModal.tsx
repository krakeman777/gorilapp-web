"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useWaitlist } from "@/hooks/useWaitlist";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const { status, submitEmail, resetStatus } = useWaitlist();
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Reset status when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      resetStatus();
      setEmail("");
    }
  }, [isOpen, resetStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!executeRecaptcha) {
      console.warn("reCAPTCHA not yet available");
      return;
    }

    const token = await executeRecaptcha('waitlist_submit');
    const success = await submitEmail(email, token);
    
    if (success) {
      setEmail("");
      setTimeout(() => {
        onClose();
      }, 2500);
    }
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center sm:items-center px-4 overflow-hidden">
          {/* Backdrop (optimized with GPU acceleration) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl will-change-opacity"
          />

          {/* Modal Container (Ergonomics: Higher Y on mobile to keep input in lower-middle "thumb zone") */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 100 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm overflow-hidden bg-uber-surface border border-uber-border shadow-2xl rounded-[32px] md:rounded-2xl flex flex-col translate-y-20 sm:translate-y-0"
          >
            {/* Close Button (Larger touch target) */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-brand-text-muted hover:text-brand-text transition-colors bg-white/5 rounded-full"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>

            <div className="p-8 sm:p-10 pt-16">
              <div className="mb-10">
                <h2 className="text-3xl sm:text-4xl font-display font-black text-brand-text tracking-tight uppercase mb-3 leading-[1.1]">
                  Únete a la <span className="text-brand-primary">Manada</span>
                </h2>
                <p className="text-brand-text-muted font-mono text-[10px] uppercase tracking-widest leading-loose">
                  SÉ PIONERO EN GORILAPP
                </p>
              </div>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-brand-primary/5 border border-brand-primary/20 p-8 rounded-3xl text-center flex flex-col items-center"
                >
                  <CheckCircle2 className="text-brand-primary mb-4" size={40} />
                  <p className="text-brand-primary font-display font-black text-xl mb-2 uppercase tracking-wide">¡BIENVENIDO!</p>
                  <p className="text-brand-text-muted text-sm leading-relaxed">
                    Te informaremos en cuanto estemos listos para el despliegue.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative group">
                    <input
                      type="email"
                      required
                      placeholder="tu@correo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading"}
                      className="w-full bg-black/40 border-2 border-uber-border focus:border-brand-primary text-brand-text px-6 py-5 rounded-2xl outline-none transition-all font-mono text-base group-hover:border-uber-border-strong disabled:opacity-50"
                    />
                    
                    {status === "error" && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute -bottom-7 left-1 flex items-center gap-1 text-[10px] text-danger font-mono uppercase tracking-wider"
                      >
                        <AlertCircle size={10} />
                        <span>Email inválido o error de red</span>
                      </motion.div>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={status === "loading" || !email}
                    className="w-full bg-brand-primary hover:bg-brand-text hover:text-black disabled:bg-uber-border disabled:text-brand-text-muted text-black font-display font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-95 touch-manipulation shadow-lg shadow-brand-primary/5"
                  >
                    {status === "loading" ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : (
                      <>
                        <span className="tracking-[0.1em]">RESERVAR ACCESO</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}

              <div className="mt-12 pt-8 border-t border-uber-border/50 text-center">
                <p className="text-[9px] text-brand-text-muted/40 font-mono uppercase tracking-[0.3em] leading-loose max-w-[200px] mx-auto">
                  LA HERRAMIENTA DEFINITIVA <br /> PARA EL CULTURISMO SERIO.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

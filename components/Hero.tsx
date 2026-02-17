import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Layer - Cinematic Dark Tone */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1920&auto=format&fit=crop" 
          alt="Luxury Ritual Atmosphere" 
          className="w-full h-full object-cover opacity-80 scale-105 filter contrast-110 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#292524]" />
      </div>

      {/* Content - 2026 Editorial Style */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center md:items-start text-center md:text-left">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="mb-6 flex items-center gap-2"
        >
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-[#d4af37] fill-[#d4af37]" />)}
          </div>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/80">
            Eccellenza Olistica • Bergamo
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#f3e9d2] leading-[0.9] tracking-tighter mb-8 mix-blend-overlay"
        >
          NON È <br/>
          PER TUTTI.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-2xl font-light text-white/90 mb-12 max-w-xl leading-relaxed"
        >
          Se cerchi un massaggio veloce, scorri oltre. <br/>
          Se cerchi di <span className="text-[#d4af37] italic font-serif">riconnetterti</span> con la parte più profonda di te, sei arrivata a casa.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col md:flex-row gap-6 items-center"
        >
          <Link
            to="/booking"
            className="group relative px-12 py-5 bg-[#f3e9d2] text-[#292524] overflow-hidden rounded-none"
          >
            <span className="relative z-10 uppercase tracking-[0.2em] text-xs font-bold group-hover:text-white transition-colors duration-300">
              Prenota l'Esclusiva
            </span>
            <div className="absolute inset-0 bg-[#c07a60] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Link>
          
          <Link to="/about" className="text-white/80 hover:text-[#d4af37] transition-colors uppercase tracking-widest text-xs border-b border-transparent hover:border-[#d4af37] pb-1">
            Scopri la Filosofia
          </Link>
        </motion.div>
      </div>

      {/* Social Proof Ticker Bottom */}
      <div className="absolute bottom-0 left-0 w-full bg-black/30 backdrop-blur-md border-t border-white/10 py-4 overflow-hidden">
        <div className="whitespace-nowrap animate-marquee flex gap-12 text-white/50 text-xs uppercase tracking-[0.2em]">
            <span>• Il Lusso del Silenzio</span>
            <span>• Solo 5 Appuntamenti al Giorno</span>
            <span>• Olistico non è Estetico</span>
            <span>• Rituali su Misura</span>
            <span>• Yuli Olistico © 2026</span>
            <span>• Il Lusso del Silenzio</span>
            <span>• Solo 5 Appuntamenti al Giorno</span>
            <span>• Olistico non è Estetico</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, Key } from 'lucide-react';

const Membership: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-[#292524] text-[#faf9f6] relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
      
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="border border-[#d4af37]/30 p-12 md:p-20 relative bg-[#292524]/50 backdrop-blur-sm"
        >
          {/* Ornamental Border Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]"></div>

          <Crown className="w-12 h-12 text-[#d4af37] mx-auto mb-6" />
          
          <span className="text-[#d4af37] uppercase tracking-[0.4em] text-xs font-bold block mb-4">Solo su Invito</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-8 text-white">
            The Sanctuary <br/> Membership
          </h2>
          
          <p className="text-lg md:text-xl font-light text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            Per chi ha scelto il benessere come priorità non negoziabile.
            Accedi a slot riservati, rituali fuori menù ed esperienze stagionali esclusive.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-left max-w-3xl mx-auto">
            <div className="flex flex-col gap-3 p-6 bg-white/5 border border-white/10 hover:border-[#d4af37]/50 transition-colors">
              <Star className="w-6 h-6 text-[#d4af37]" />
              <h4 className="font-serif text-lg">Priority Booking</h4>
              <p className="text-sm text-white/60">Salta la lista d'attesa. Il tuo tempo è sacro.</p>
            </div>
            <div className="flex flex-col gap-3 p-6 bg-white/5 border border-white/10 hover:border-[#d4af37]/50 transition-colors">
              <Key className="w-6 h-6 text-[#d4af37]" />
              <h4 className="font-serif text-lg">Secret Menu</h4>
              <p className="text-sm text-white/60">Accesso a trattamenti antichi non disponibili al pubblico.</p>
            </div>
            <div className="flex flex-col gap-3 p-6 bg-white/5 border border-white/10 hover:border-[#d4af37]/50 transition-colors">
              <Crown className="w-6 h-6 text-[#d4af37]" />
              <h4 className="font-serif text-lg">Yuli Signature</h4>
              <p className="text-sm text-white/60">Sessione di consulenza trimestrale per mappare la tua evoluzione.</p>
            </div>
          </div>

          <button className="px-10 py-4 bg-[#d4af37] text-[#292524] font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors">
            Candidati per l'Accesso
          </button>
          
          <p className="mt-6 text-[10px] text-white/40 uppercase tracking-widest">
            * Lista d'attesa attuale: 3 settimane
          </p>

        </motion.div>
      </div>
    </section>
  );
};

export default Membership;
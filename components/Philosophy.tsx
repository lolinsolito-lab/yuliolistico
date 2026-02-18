import React from 'react';
import { motion } from 'framer-motion';

const Philosophy: React.FC = () => {
  return (
    <section id="filosofia" className="py-32 bg-[#292524] text-[#faf9f6] relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c07a60] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-pulse" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#849b87] uppercase tracking-[0.3em] text-xs font-bold">Il Manifesto 2026</span>
            <h2 className="text-5xl md:text-6xl font-serif mt-6 leading-tight">
              Siamo l'antidoto <br />
              alla <span className="italic text-[#d4af37]">fretta</span>.
            </h2>
          </motion.div>

          <div className="space-y-6 text-lg font-light text-white/80 leading-relaxed">
            <p>
              Là fuori è una catena di montaggio. Corpi trattati come oggetti da riparare in 30 minuti.
              Rumore. Luci al neon. Freddezza.
            </p>
            <p className="text-xl text-white font-normal border-l-2 border-[#c07a60] pl-6">
              Qui è diverso. O ci tieni alla qualità del tempo che dedichi a te stessa, o questo non è il posto per te.
            </p>
            <p>
              Yuli Olistico non vende "massaggi". Vende un ritorno al corpo.
              Ogni rituale è un'opera unica, disegnata sulla tua energia del momento.
              Non seguiamo protocolli standard. Seguiamo te.
            </p>
          </div>
        </div>

        <div className="relative">
          <motion.div
            className="aspect-[3/4] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1591343395082-e120087004b4?q=80&w=800&auto=format&fit=crop"
              alt="Artistic Touch"
              className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700 ease-out"
            />
          </motion.div>
          {/* Floating Badge */}
          <div className="absolute -bottom-10 -left-10 bg-[#faf9f6] text-[#292524] p-8 max-w-xs shadow-2xl hidden md:block">
            <p className="font-serif italic text-xl">"La qualità non ha fretta. La tua anima ringrazia."</p>
            <p className="text-xs uppercase tracking-widest mt-4 text-[#c07a60] font-bold">— Yuliantini</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Philosophy;
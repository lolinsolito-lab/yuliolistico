import React from 'react';
import { useServices } from '../hooks/useServices';
import { TreatmentType } from '../types';
import { ArrowRight, Sparkles, Flame, Crown, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
  const { services, loading } = useServices();

  const manualServices = services.filter(s => s.category === TreatmentType.MANUAL);
  const toolServices = services.filter(s => s.category === TreatmentType.TOOLS);
  const ritualServices = services.filter(s => s.category === TreatmentType.RITUAL);

  if (loading) {
    return (
      <section id="esperienze" className="bg-[#faf9f6] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-8 h-8 text-[#c07a60] animate-spin" />
          <p className="text-[#57534e] font-serif tracking-widest text-sm">CARICAMENTO ESPERIENZE...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="esperienze" className="bg-[#faf9f6]">
      {/* ── TIER 1: ESSENTIALS (Light) ──────────────── */}
      <div className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <span className="text-[#849b87] uppercase tracking-[0.2em] text-xs font-bold flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> Le Fondamenta
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#292524] mt-3 mb-6">
              Riscopri il Contatto.
            </h2>
            <p className="text-[#57534e] max-w-2xl mx-auto font-light leading-relaxed">
              Il punto di partenza. Dove il corpo impara di nuovo a fidarsi delle mani e lascia andare le prime barriere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {manualServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} tier="essential" />
            ))}
          </div>
        </div>
      </div>

      {/* ── TIER 2: DEEP TOOLS (Warm) ──────────────── */}
      <div className="py-24 px-6 bg-[#f3e9d2] relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <span className="text-[#c07a60] uppercase tracking-[0.2em] text-xs font-bold flex items-center justify-center gap-2">
              <Flame className="w-4 h-4" /> La Profondità
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#292524] mt-3 mb-6">
              Oltre le Mani.
            </h2>
            <p className="text-[#57534e] max-w-2xl mx-auto font-light leading-relaxed">
              Strumenti antichi – legno, pietre, cristalli – per raggiungere tensioni che le dita non possono toccare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {toolServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} tier="advanced" />
            ))}
          </div>
        </div>
      </div>

      {/* ── TIER 3: SOVEREIGNTY (Dark Luxury) ──────── */}
      <div className="py-32 px-6 bg-[#1c1917] text-[#faf9f6] relative border-t border-[#d4af37]/20">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1c1917] p-4 border border-[#d4af37]/20 rounded-full">
          <Crown className="w-6 h-6 text-[#d4af37]" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <span className="text-[#d4af37] uppercase tracking-[0.2em] text-xs font-bold flex items-center justify-center gap-2">
              La Sovranità
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-[#f3e9d2] mt-3 mb-6">
              Il Tempo Sospeso.
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
              Esperienze totali. Non prenoti un'ora, prenoti una trasformazione. Oli pregiati, rituali completi, silenzio assoluto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ritualServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} tier="luxury" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index, tier }: { service: any, index: number, tier: 'essential' | 'advanced' | 'luxury' }) => {
  const isLuxury = tier === 'luxury';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group relative overflow-hidden cursor-pointer h-full flex flex-col ${isLuxury ? 'border border-[#d4af37]/30 hover:border-[#d4af37]/80' : 'bg-white'
        } transition-all duration-500`}
    >
      <div className="aspect-[4/5] overflow-hidden relative">
        <div className={`absolute inset-0 z-10 transition-colors duration-500 ${isLuxury ? 'bg-black/20 group-hover:bg-transparent' : 'bg-black/10 group-hover:bg-transparent'
          }`} />
        <img
          src={service.imageUrl}
          alt={service.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute top-4 left-4 z-20">
          <span className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold backdrop-blur-md ${isLuxury ? 'bg-[#d4af37] text-[#292524]' : 'bg-white/90 text-[#292524]'
            }`}>
            {service.duration}
          </span>
        </div>
      </div>

      <div className={`p-8 flex flex-col flex-grow ${isLuxury ? 'bg-[#292524]' : 'bg-white'}`}>
        <div className="flex justify-between items-start mb-4">
          <h3 className={`font-serif text-2xl leading-none ${isLuxury ? 'text-[#f3e9d2]' : 'text-[#292524]'}`}>
            {service.title}
          </h3>
        </div>

        <p className={`text-sm font-light leading-relaxed mb-8 flex-grow ${isLuxury ? 'text-white/70' : 'text-[#57534e]'}`}>
          {service.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-current border-opacity-10">
          <span className={`font-serif text-lg ${isLuxury ? 'text-[#d4af37]' : 'text-[#292524]'}`}>
            {service.price}
          </span>
          <a href="/booking" className={`uppercase text-[10px] tracking-widest font-bold flex items-center gap-2 group-hover:gap-3 transition-all ${isLuxury ? 'text-white group-hover:text-[#d4af37]' : 'text-[#c07a60] group-hover:text-[#292524]'
            }`}>
            Prenota <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Services;
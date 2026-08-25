import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const defaultContent = {
  badgeText: "Il Manifesto 2026",
  titleLine1: "Siamo l'antidoto",
  titleLine2: "alla fretta.",
  text1: "In un mondo che corre veloce, fermarsi è l'atto più rivoluzionario. Il tuo corpo non è una macchina da riparare in 30 minuti, ma un tempio da onorare con lentezza.",
  quote: "Qui il tempo si dilata. O ci tieni alla qualità del respiro che dedichi a te stessa, o questo non è il posto per te.",
  text2: "Yuli Olistico non vende \"trattamenti\". Custodisce il tuo ritorno all'essenziale. Ogni rituale è un'opera unica, disegnata sulla tua energia del momento. Non seguiamo protocolli standard. Ascoltiamo il tuo silenzio.",
  imageOverlayQuote: "La qualità non ha fretta. La tua anima ringrazia.",
  imageOverlayAuthor: "Yuliantini",
  imageUrl: "https://images.unsplash.com/photo-1591343395082-e120087004b4?q=80&w=800&auto=format&fit=crop"
};

const Philosophy: React.FC = () => {
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase
      .from('site_content')
      .select('content')
      .eq('section', 'philosophy')
      .single();

    if (data?.content) {
      setContent({ ...defaultContent, ...data.content });
    }
  };

  return (
    <section id="filosofia" className="py-32 bg-[#292524] text-[#faf9f6] relative overflow-hidden">

      {/* ── BACKGROUND FX ──────────────── */}
      {/* Deep glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c07a60]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Particles (CSS animation would be better but simple divs work for subtle fx) */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 w-2 h-2 bg-[#d4af37] rounded-full blur-[1px]"
      />
      <motion.div
        animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 right-20 w-3 h-3 bg-[#d4af37] rounded-full blur-[2px]"
      />
      <motion.div
        animate={{ x: [0, 20, 0], opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 right-1/3 w-1 h-1 bg-[#d4af37] rounded-full"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse" />
              <span className="text-[#849b87] uppercase tracking-[0.3em] text-xs font-bold">{content.badgeText}</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-serif mt-6 leading-tight">
              {content.titleLine1} <br />
              <span className="italic text-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">{content.titleLine2}</span>
            </h2>
          </motion.div>

          <div className="space-y-6 text-lg font-light text-white/80 leading-relaxed">
            <p>
              {content.text1}
            </p>
            <p className="text-xl text-white font-normal border-l-2 border-[#d4af37] pl-6 py-2 relative">
              <span className="absolute -left-[9px] -top-2 text-[#d4af37] text-4xl leading-none opacity-50">"</span>
              {content.quote}
            </p>
            <p>
              {content.text2}
            </p>
          </div>
        </div>

        <div className="relative group">
          <motion.div
            className="aspect-[3/4] overflow-hidden rounded-sm relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Overlay Gradient for moody luxury look */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#292524] via-transparent to-transparent opacity-60 z-10" />

            <motion.img
              src={content.imageUrl}
              alt="Artistic Touch"
              className="w-full h-full object-cover opacity-90"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Glassmorphism Badge */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="absolute -bottom-10 -left-10 bg-[#faf9f6]/10 backdrop-blur-xl border border-white/20 p-8 max-w-xs shadow-2xl hidden md:block z-20 group-hover:bg-[#faf9f6]/20 transition-all duration-500"
          >
            <p className="font-serif italic text-xl text-[#f3e9d2]">"{content.imageOverlayQuote}"</p>
            <div className="w-10 h-[1px] bg-[#d4af37] mt-6 mb-2"></div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-bold">{content.imageOverlayAuthor}</p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Philosophy;
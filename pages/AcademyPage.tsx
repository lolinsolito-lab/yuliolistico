import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Mail, Sparkles, ArrowRight } from 'lucide-react';

const AcademyPage: React.FC = () => {
    return (
        <section className="min-h-screen bg-[#1c1917] text-[#f3e9d2] flex flex-col relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#849b87]/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 text-center">

                {/* Icon */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-8 p-6 rounded-full border border-[#d4af37]/30 bg-[#292524]/50 backdrop-blur-md"
                >
                    <GraduationCap className="w-12 h-12 text-[#d4af37]" />
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <span className="text-[#849b87] uppercase tracking-[0.3em] text-xs font-bold flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-3 h-3" /> Prossimamente
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif text-[#f3e9d2] mb-6">
                        Yuli Academy
                    </h1>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-2xl mx-auto text-lg text-white/60 font-light leading-relaxed mb-12"
                >
                    Stiamo distillando l'essenza di 8 anni di esperienza in un percorso formativo per i nuovi Maestri del tocco.
                    <br /><br />
                    <span className="italic text-[#d4af37]">"Non insegniamo protocolli. Insegniamo ad ascoltare."</span>
                </motion.p>

                {/* Newsletter / Action */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-2 flex flex-col md:flex-row gap-2"
                >
                    <div className="flex-grow flex items-center px-4">
                        <Mail className="w-5 h-5 text-[#849b87] mr-3" />
                        <input
                            type="email"
                            placeholder="La tua email..."
                            className="bg-transparent border-none outline-none text-[#f3e9d2] placeholder-white/30 text-sm w-full h-12"
                        />
                    </div>
                    <button className="h-12 px-6 bg-[#d4af37] text-[#292524] font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-[#eac54f] transition-colors flex items-center justify-center gap-2">
                        Avvisami <ArrowRight className="w-4 h-4" />
                    </button>
                </motion.div>

                <p className="mt-6 text-xs text-white/30 uppercase tracking-widest">
                    Posti limitati • Apertura Iscrizioni 2026
                </p>

            </div>
        </section>
    );
};

export default AcademyPage;

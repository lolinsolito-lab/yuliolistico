
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AcademyTeaserSection: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* ── Visual Separator ── */}
            <div className="bg-[#faf9f6] pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <div className="flex items-center justify-center gap-6 mb-4">
                            <div className="h-px w-16 bg-[#d4af37]/40" />
                            <GraduationCap className="w-6 h-6 text-[#d4af37]" />
                            <div className="h-px w-16 bg-[#d4af37]/40" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#d4af37]">
                            Academy — Coming Soon
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* ── Academy Teaser ── */}
            <section className="py-16 bg-[#1c1917] relative overflow-hidden text-[#faf9f6]">
                {/* Background Texture */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#d4af37]/10 to-transparent" />

                <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl md:text-4xl font-serif leading-tight">
                            Non è solo un massaggio.<br />
                            <span className="italic text-[#d4af37]">È un'Arte.</span>
                        </h2>

                        <p className="text-white/60 font-light text-base leading-relaxed max-w-lg">
                            Noi insegniamo la <strong className="text-white/80">Presenza</strong>. Yuli Olistico sta costruendo
                            una nuova generazione di professionisti del benessere.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                                <span className="text-sm text-white/50">Protocolli Sovrani</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Star className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                                <span className="text-sm text-white/50">Mindset d'Eccellenza</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/academy')}
                            className="group mt-4 px-6 py-3 bg-[#d4af37] text-[#1c1917] font-bold uppercase tracking-widest text-xs hover:bg-white transition-all flex items-center gap-3 w-fit"
                        >
                            Scopri l'Accademia <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>

                    {/* Image Side — Compact */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[3/2] bg-stone-800 rounded-lg overflow-hidden relative border border-[#d4af37]/20 group">
                            <div className="absolute inset-0 bg-black/30 z-10" />

                            {/* Status Badge */}
                            <div className="absolute top-4 right-4 z-30 bg-[#c07a60] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-full shadow-lg animate-pulse">
                                Coming Soon
                            </div>

                            <img
                                src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800"
                                alt="Academy — Holistic Wellness Training"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Overlay Quote */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1c1917] to-transparent p-6 z-20">
                                <p className="font-serif text-lg italic text-white/90">"Ho smesso di vendere ore. Ho iniziato a vendere trasformazioni."</p>
                                <p className="text-xs text-[#d4af37] uppercase tracking-widest font-bold mt-1">— Studente Masterclass 2024</p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </section>
        </>
    );
};

export default AcademyTeaserSection;

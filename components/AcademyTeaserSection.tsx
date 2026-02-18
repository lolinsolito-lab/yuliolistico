
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AcademyTeaserSection: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="py-24 bg-[#1c1917] relative overflow-hidden text-[#faf9f6]">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#d4af37]/10 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Content Side */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div className="flex items-center gap-2 text-[#d4af37]">
                        <GraduationCap className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Yuli Olistico Academy</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-serif leading-tight">
                        Non è solo un massaggio.<br />
                        <span className="italic text-[#d4af37]">È un'Arte.</span>
                    </h2>

                    <p className="text-white/70 font-light text-lg leading-relaxed">
                        Molti pensano che il benessere sia "tecnica". Noi insegniamo la <strong>Presenza</strong>.
                        In un mondo saturato da trattamenti standard e superficiali, Yuli Olistico sta costruendo
                        una nuova generazione di professionisti.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-[#d4af37]/10 rounded-full text-[#d4af37] mt-1">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-serif text-xl">Protocolli Sovrani</h4>
                                <p className="text-sm text-white/50">Metodologie proprietarie che non troverai in nessun corso regionale.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-[#d4af37]/10 rounded-full text-[#d4af37] mt-1">
                                <Star className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-serif text-xl">Mindset d'Eccellenza</h4>
                                <p className="text-sm text-white/50">Trasformiamo operatori in Autorità del settore.</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/academy')}
                        className="group mt-8 px-8 py-4 bg-[#d4af37] text-[#1c1917] font-bold uppercase tracking-widest text-xs hover:bg-white transition-all flex items-center gap-3"
                    >
                        Scopri l'Accademia <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>

                {/* Image/Visual Side */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="aspect-[4/5] bg-stone-800 rounded-lg overflow-hidden relative border border-[#d4af37]/20 group">
                        <div className="absolute inset-0 bg-black/40 z-10" />

                        {/* Status Badge */}
                        <div className="absolute top-4 right-4 z-30 bg-[#c07a60] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-full shadow-lg animate-pulse">
                            Coming Soon
                        </div>

                        <img
                            src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80"
                            alt="Luxury Oil Texture"
                            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                        />

                        {/* Overlay Card */}
                        <div className="absolute bottom-8 left-8 right-8 bg-[#1c1917]/90 backdrop-blur-md p-6 border-l-4 border-[#d4af37] z-20">
                            <p className="font-serif text-xl italic text-white mb-2">"Ho smesso di vendere ore. Ho iniziato a vendere trasformazioni."</p>
                            <p className="text-xs text-[#d4af37] uppercase tracking-widest font-bold">— Studente Masterclass 2024</p>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#d4af37]/30 rounded-tr-3xl" />
                    <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#d4af37]/30 rounded-bl-3xl" />
                </motion.div>

            </div>
        </section>
    );
};

export default AcademyTeaserSection;

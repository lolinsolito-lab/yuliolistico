import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, BrainCircuit, Heart, Activity, Scale, Zap, Shield } from 'lucide-react';

const SolutionBridge: React.FC = () => {
    return (
        <section className="py-32 bg-[#faf9f6] relative overflow-hidden">
            {/* Background noise texture for 'film grain' luxury feel */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 mix-blend-multiply pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* 1. Header: The Disruption Statement */}
                <div className="text-center mb-24 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[#c07a60] uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
                            Il Nuovo Standard • 2026
                        </span>
                        <h2 className="text-6xl md:text-8xl font-serif text-[#292524] mb-8 leading-[0.9] tracking-tighter">
                            L'ERA DEL <br />
                            <span className="italic text-[#a8a29e] opacity-50 decoration-double line-through decoration-[#c07a60]">MASSAGGIO</span><br />
                            È FINITA.
                        </h2>
                        <p className="text-[#57534e] text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
                            Non sei qui per farti "coccolare". Sei qui per farti <span className="font-semibold text-[#292524]">ricalibrare</span>.
                            <br />Benvenuta nell'era della <span className="italic font-serif text-[#c07a60]">Bio-Architettura Emotiva.</span>
                        </p>
                    </motion.div>
                </div>

                {/* 2. The Monoliths (Services) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                    {/* Connecting Line behind visual */}
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c07a60]/30 to-transparent hidden md:block"></div>

                    {[
                        {
                            id: "01",
                            title: "Bio-Ricalibrazione",
                            subtitle: "Physical",
                            desc: "Non scogliamo solo i nodi. Riscriviamo la postura profonda. Disinneschiamo il dolore cronico alla radice.",
                            icon: Activity,
                            delay: 0
                        },
                        {
                            id: "02",
                            title: "Decompressione",
                            subtitle: "Emotional",
                            desc: "Il corpo tiene il conto di ogni trauma. Qui saldiamo il debito. Spazio sicuro per lasciar andare ciò che ti appesantisce.",
                            icon: Heart,
                            delay: 0.2
                        },
                        {
                            id: "03",
                            title: "Silenzio Neurale",
                            subtitle: "Mental",
                            desc: "Spegniamo il rumore di fondo. Un reset completo del sistema nervoso per tornare a pensare con chiarezza cristallina.",
                            icon: BrainCircuit,
                            delay: 0.4
                        }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: item.delay, duration: 0.8 }}
                            className="group relative bg-white/40 backdrop-blur-md border border-white/60 p-10 h-[450px] flex flex-col justify-between overflow-hidden hover:bg-white/80 transition-all duration-500 shadow-sm hover:shadow-2xl rounded-sm"
                        >
                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#c07a60]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <span className="text-6xl font-serif text-[#e7e5e4] group-hover:text-[#c07a60]/20 transition-colors duration-500">{item.id}</span>
                                    <item.icon className="w-8 h-8 text-[#292524] group-hover:text-[#c07a60] transition-colors duration-300 stroke-1" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#a8a29e] mb-2 block">{item.subtitle}</span>
                                <h3 className="text-3xl font-serif text-[#292524] mb-6 leading-none">{item.title}</h3>
                                <p className="text-[#57534e] font-light leading-relaxed">{item.desc}</p>
                            </div>

                            {/* Bottom visual element */}
                            <div className="relative z-10 w-full h-[1px] bg-[#292524]/10 mt-auto group-hover:bg-[#c07a60]/50 transition-colors">
                                <div className="absolute right-0 -top-1 w-2 h-2 bg-[#292524] rounded-full group-hover:bg-[#c07a60] transition-colors"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 3. Monetization Anchor Value Stack */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-flex items-center gap-4 px-8 py-4 bg-[#292524] text-[#f3e9d2] rounded-full shadow-2xl transform hover:scale-105 transition-transform cursor-crosshair">
                        <Scale className="w-5 h-5 text-[#c07a60]" />
                        <span className="uppercase tracking-widest text-xs font-bold">
                            Valore Reale: 1 Rituale Yuli = 4 Massaggi Standard
                        </span>
                    </div>
                    <p className="mt-4 text-xs text-[#a8a29e] uppercase tracking-widest">
                        Non paghi per un'ora. Paghi per il risultato che dura settimane.
                    </p>
                </motion.div>

            </div>
        </section>
    );
};

export default SolutionBridge;

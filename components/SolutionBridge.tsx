
import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, BrainCircuit, Heart, Activity } from 'lucide-react';

const SolutionBridge: React.FC = () => {
    return (
        <section className="py-24 bg-[#faf9f6] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* 1. The Core Problem & Solution Statement */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[#c07a60] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">
                            Il Metodo Yuli
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-[#292524] mb-6 leading-tight">
                            Perché i trattamenti standard <br />
                            <span className="italic text-[#a8a29e]">non funzionano su di te.</span>
                        </h2>
                        <p className="text-[#57534e] text-lg font-light leading-relaxed mb-6">
                            Il tuo corpo non è una macchina da riparare. È un archivio di emozioni, traumi e stress non detti.
                            Un massaggio "classico" lavora sui muscoli. <strong>Noi lavoriamo sulla memoria cellulare.</strong>
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <Activity className="w-5 h-5 text-[#c07a60] mt-1" />
                                <p className="text-[#57534e] text-sm">Non togliamo solo il dolore momentaneo, disinneschiamo la causa profonda.</p>
                            </li>
                            <li className="flex items-start gap-4">
                                <BrainCircuit className="w-5 h-5 text-[#c07a60] mt-1" />
                                <p className="text-[#57534e] text-sm">Ricalibriamo il sistema nervoso, passando dalla modalità "Sopravvivenza" a "Guarigione".</p>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Visual Metaphor */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative h-[500px] w-full bg-[#1c1917] rounded-lg overflow-hidden flex items-center justify-center p-8"
                    >
                        {/* Abstract Representation of "Reconnection" */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#c07a60] rounded-full blur-[100px] opacity-30 animate-pulse"></div>

                        <div className="relative z-10 text-center space-y-6">
                            <Fingerprint className="w-24 h-24 text-[#f3e9d2]/80 mx-auto stroke-1" />
                            <h3 className="text-[#f3e9d2] font-serif text-2xl">"Ogni corpo ha un codice unico."</h3>
                            <p className="text-white/50 text-sm max-w-xs mx-auto">
                                Non esiste un protocollo uguale per tutti. <br />
                                Ascoltiamo il tuo codice prima di toccare la tua pelle.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* 2. The 3 Pillars (Visual Strategy) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {[
                        { icon: Activity, title: "Sblocco Fisico", desc: "Sciogliamo le tensioni accumulate nella fascia profonda." },
                        { icon: Heart, title: "Rilascio Emotivo", desc: "Creiamo lo spazio sicuro per lasciare andare ciò che ti pesa." },
                        { icon: BrainCircuit, title: "Reset Mentale", desc: "Il silenzio assoluto per fermare il rumore dei pensieri." }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="p-8 border border-[#292524]/10 hover:border-[#c07a60]/50 transition-colors group"
                        >
                            <div className="w-12 h-12 bg-[#faf9f6] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#292524]/10 group-hover:scale-110 transition-transform">
                                <item.icon className="w-6 h-6 text-[#292524] group-hover:text-[#c07a60] transition-colors" />
                            </div>
                            <h4 className="font-serif text-xl text-[#292524] mb-3">{item.title}</h4>
                            <p className="text-[#57534e] text-sm font-light leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default SolutionBridge;

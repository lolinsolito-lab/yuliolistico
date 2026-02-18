
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Mail, Sparkles, ArrowRight, Calendar, BookOpen, Clock } from 'lucide-react';

const AcademyPage: React.FC = () => {
    return (
        <section className="min-h-screen bg-[#1c1917] text-[#f3e9d2] flex flex-col relative overflow-hidden">
            {/* Background Texture - Darker & richer */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#1c1917]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#849b87]/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 flex-grow flex flex-col px-6 py-24 max-w-7xl mx-auto w-full">

                {/* Header - Centered */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="inline-block mb-8 p-6 rounded-full border border-[#d4af37]/20 bg-[#292524]/30 backdrop-blur-sm"
                    >
                        <GraduationCap className="w-12 h-12 text-[#d4af37]" />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-serif text-[#f3e9d2] mb-6">
                        Yuli Academy
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-white/50 font-light leading-relaxed">
                        L'arte del tocco consapevole. Un percorso per chi vuole trasformare la propria pratica in Maestro.
                    </p>
                </div>

                {/* Two Columns Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Column 1: WORKSHOPS (Live) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#292524]/20 border border-[#d4af37]/10 p-8 rounded-2xl relative overflow-hidden group hover:border-[#d4af37]/30 transition-colors"
                    >
                        <div className="absolute top-4 right-4 z-20">
                            <span className="px-3 py-1 bg-[#849b87]/20 text-[#849b87] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#849b87]/20">
                                In Presenza
                            </span>
                        </div>

                        <h2 className="text-3xl font-serif text-[#d4af37] mb-2">Weekend Workshop</h2>
                        <p className="text-white/40 text-sm mb-8 uppercase tracking-widest">Esperienze Intensive</p>

                        <div className="space-y-6">
                            <div className="flex gap-4 items-start">
                                <div className="p-3 bg-[#d4af37]/10 rounded-lg shrink-0">
                                    <Calendar className="w-5 h-5 text-[#d4af37]" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-serif mb-1">Rituali del Corpo</h4>
                                    <p className="text-sm text-white/50 leading-relaxed">2 Giorni di immersione totale nelle tecniche di sblocco profondo.</p>
                                    <div className="mt-2 flex items-center gap-4 text-xs text-white/30">
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 16 Ore</span>
                                        <span>•</span>
                                        <span>Prossima data: Ottobre 2026</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="p-3 bg-[#d4af37]/10 rounded-lg shrink-0">
                                    <Sparkles className="w-5 h-5 text-[#d4af37]" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-serif mb-1">L'Arte del Silenzio</h4>
                                    <p className="text-sm text-white/50 leading-relaxed">Workshop avanzato sulla gestione energetica dello spazio e del cliente.</p>
                                    <div className="mt-2 flex items-center gap-4 text-xs text-white/30">
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 8 Ore</span>
                                        <span>•</span>
                                        <span>Prossima data: Dicembre 2026</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-10 py-4 border border-[#d4af37] text-[#d4af37] font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-[#d4af37] hover:text-[#1c1917] transition-all">
                            Richiedi Calendario
                        </button>
                    </motion.div>

                    {/* Column 2: ONLINE COURSES (Coming Soon) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-[#1c1917] border border-white/5 p-8 rounded-2xl relative overflow-hidden grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-black/40 z-10" />
                        <div className="absolute top-4 right-4 z-20">
                            <span className="px-3 py-1 bg-[#c07a60] text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg animate-pulse">
                                Coming 2026
                            </span>
                        </div>

                        <div className="relative z-20">
                            <h2 className="text-3xl font-serif text-white mb-2">Digital Academy</h2>
                            <p className="text-white/40 text-sm mb-8 uppercase tracking-widest">Formazione a Distanza</p>

                            <div className="space-y-6 opacity-60">
                                <div className="flex gap-4 items-start">
                                    <div className="p-3 bg-white/10 rounded-lg shrink-0">
                                        <BookOpen className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-serif mb-1">Masterclass Teorica</h4>
                                        <p className="text-sm text-white/50 leading-relaxed">Manuali PDF e Video lezioni sui fondamenti del metodo Yuli.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="p-3 bg-white/10 rounded-lg shrink-0">
                                        <BookOpen className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-serif mb-1">Libreria Audio</h4>
                                        <p className="text-sm text-white/50 leading-relaxed">Meditazioni guidate per operatori e clienti.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <p className="text-xs text-center text-[#c07a60] uppercase tracking-widest font-bold mb-4">Iscriviti alla lista d'attesa</p>
                                <div className="flex flex-col md:flex-row gap-2">
                                    <input
                                        type="email"
                                        placeholder="La tua email..."
                                        className="bg-white/5 border border-white/10 outline-none text-[#f3e9d2] placeholder-white/20 text-sm w-full h-12 px-4 rounded-lg focus:border-[#c07a60] transition-colors"
                                    />
                                    <button className="h-12 px-6 bg-[#c07a60] text-white font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-[#a5624b] transition-colors whitespace-nowrap">
                                        Avvisami
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default AcademyPage;

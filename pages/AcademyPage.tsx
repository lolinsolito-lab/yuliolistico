
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

            <div className="relative z-10 flex-grow flex flex-col px-6 py-24 max-w-7xl mx-auto w-full justify-center">

                {/* Hero Section */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="inline-block mb-8 p-4 rounded-full border border-[#d4af37]/20 bg-[#292524]/30 backdrop-blur-sm"
                    >
                        <span className="text-[#d4af37] text-xs font-bold uppercase tracking-[0.3em]">YULI OLISTICO ACADEMY</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-8xl font-serif text-[#f3e9d2] mb-8 leading-[1.1]">
                        Non è solo un massaggio.<br />
                        <span className="italic text-[#d4af37]">È un'Arte.</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 font-light leading-relaxed mb-12">
                        Molti pensano che il benessere sia "tecnica". Noi insegniamo la <strong className="text-white font-normal">Presenza</strong>. <br />
                        In un mercato saturo di protocolli standardizzati e manovre meccaniche, l'Accademia Yuli Olistico nasce per plasmare una nuova élite di professionisti. <br /><br />
                        <span className="text-white border-b border-[#d4af37]/30 pb-1">Non formiamo esecutori. Creiamo Autorevolezza.</span>
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto mb-16">
                        <div className="flex gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#d4af37]/30 transition-colors">
                            <div className="shrink-0 p-3 bg-[#d4af37]/10 rounded-full h-fit">
                                <Sparkles className="w-5 h-5 text-[#d4af37]" />
                            </div>
                            <div>
                                <h3 className="font-serif text-xl text-[#f3e9d2] mb-2">Protocolli Sovrani</h3>
                                <p className="text-sm text-white/50 leading-relaxed">Metodologie proprietarie che non troverai in nessun corso regionale. Fusione di oriente e occidente.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#d4af37]/30 transition-colors">
                            <div className="shrink-0 p-3 bg-[#d4af37]/10 rounded-full h-fit">
                                <GraduationCap className="w-5 h-5 text-[#d4af37]" />
                            </div>
                            <div>
                                <h3 className="font-serif text-xl text-[#f3e9d2] mb-2">Mindset d'Eccellenza</h3>
                                <p className="text-sm text-white/50 leading-relaxed">Trasformiamo operatori in Autorità del settore. Impara a vendere il valore, non il tempo.</p>
                            </div>
                        </div>
                    </div>

                    {/* Exclusive CTA */}
                    <div className="flex flex-col items-center gap-4">
                        <button className="px-10 py-5 bg-[#d4af37] text-[#1c1917] font-bold uppercase tracking-widest rounded-lg hover:bg-[#b5952f] transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center gap-3">
                            Candidati per l'Accesso <ArrowRight className="w-5 h-5" />
                        </button>
                        <p className="text-xs text-white/30 uppercase tracking-widest mt-2 flex items-center gap-2">
                            <Clock className="w-3 h-3" /> Waiting List: Numero Chiuso
                        </p>
                    </div>
                </div>

                {/* Pop-up / Capture Section (Visual Representation inline for now, or could be a modal) */}
                <div className="max-w-xl mx-auto mt-12 p-8 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl text-center">
                    <p className="text-[#c07a60] uppercase tracking-widest text-xs font-bold mb-4">L'eccellenza richiede attenzione assoluta</p>
                    <p className="text-sm text-white/60 leading-relaxed mb-6">
                        Per garantire un affiancamento millimetrico e una vera trasformazione, l'accesso alla Masterclass sarà a numero chiuso. Inserisci la tua email: riceverai l'invito privato <strong>48 ore prima</strong> dell'apertura ufficiale. I posti migliori andranno a chi sa muoversi in anticipo.
                    </p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="La tua email personale..."
                            className="bg-white/5 border border-white/10 text-white px-4 rounded w-full focus:outline-none focus:border-[#d4af37]"
                        />
                        <button className="px-6 py-3 bg-[#292524] border border-white/10 text-white uppercase text-xs font-bold tracking-widest hover:bg-[#d4af37] hover:text-[#1c1917] transition-colors">
                            Iscriviti
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AcademyPage;

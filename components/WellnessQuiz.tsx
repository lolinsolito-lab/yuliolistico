import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RefreshCcw, Cpu } from 'lucide-react';
import { getWellnessRecommendation } from '../services/geminiService';
import { AiRecommendation } from '../types';

const WellnessQuiz: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiRecommendation | null>(null);

  const handleConsult = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const recommendation = await getWellnessRecommendation(input);
      setResult(recommendation);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-32 mb-20 border-b border-[#292524]/5 bg-[#faf9f6] px-6 relative overflow-hidden">
      {/* Tech/Organic Fusion Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 border border-[#292524] rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 border border-[#292524] rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left: Introduction */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-4 h-4 text-[#849b87]" />
              <span className="text-[#849b87] uppercase tracking-[0.2em] text-xs font-bold">Yuli AI • Diagnostic</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-[#292524] mb-8 leading-none">
              Cosa chiede <br />
              la tua <span className="text-[#c07a60] italic">Anima?</span>
            </h2>
            <p className="text-[#57534e] text-xl mb-10 leading-relaxed font-light">
              Non scegliere a caso. Lascia che la tecnologia interpreti il linguaggio del tuo corpo.
              Scrivi come ti senti. Sii onesta. Sii vulnerabile.
              <br /><br />
              <span className="text-sm font-bold uppercase tracking-widest text-[#292524]">Esempio:</span> <span className="italic">"Mi sento prosciugata dal lavoro e ho le spalle di pietra."</span>
            </p>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#849b87] to-[#c07a60] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white p-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Digita qui il tuo stato d'animo..."
                  className="w-full bg-white p-6 outline-none min-h-[120px] text-lg text-[#292524] placeholder:text-stone-300 font-serif resize-none"
                />
                <div className="flex justify-between items-center px-6 pb-4">
                  <span className="text-xs text-stone-400 uppercase tracking-widest">AI Powered</span>
                  <button
                    onClick={handleConsult}
                    disabled={loading || !input}
                    className="flex items-center gap-3 bg-[#292524] text-white px-8 py-3 hover:bg-[#c07a60] transition-colors disabled:opacity-50 uppercase tracking-widest text-xs font-bold"
                  >
                    {loading ? <RefreshCcw className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    {loading ? "Analisi..." : "Genera Rituale"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The Result Card - Glassmorphism */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#f3e9d2] rounded-full blur-[80px] opacity-60"></div>

            <AnimatePresence mode='wait'>
              {!result && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center relative z-10"
                >
                  <h3 className="text-9xl font-serif text-[#292524]/5 select-none">ZEN</h3>
                  <p className="font-serif italic text-2xl text-[#292524] -mt-10">L'algoritmo attende.</p>
                </motion.div>
              )}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-6 relative z-10"
                >
                  <div className="w-24 h-24 border-t-2 border-b-2 border-[#292524] rounded-full animate-spin flex items-center justify-center">
                    <div className="w-16 h-16 border-l-2 border-r-2 border-[#c07a60] rounded-full animate-spin direction-reverse"></div>
                  </div>
                  <p className="text-[#292524] font-serif text-xl tracking-wide">Connessione...</p>
                </motion.div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="bg-white/80 backdrop-blur-xl p-10 shadow-2xl border border-white/50 w-full max-w-md relative z-10 text-center"
                >
                  <div className="inline-block bg-[#292524] text-white px-4 py-1 text-[10px] uppercase tracking-[0.3em] mb-6">
                    Match Trovato
                  </div>

                  <h3 className="text-4xl font-serif text-[#292524] mb-6">
                    {result.treatment}
                  </h3>

                  <div className="mb-8">
                    <p className="text-[#57534e] text-lg font-light italic leading-relaxed">
                      "{result.reasoning}"
                    </p>
                  </div>

                  <div className="border-t border-[#292524]/10 pt-6 mb-8">
                    <span className="block text-xs uppercase tracking-widest text-[#a8a29e] mb-2">Prescrizione Olfattiva</span>
                    <p className="text-[#c07a60] font-serif text-xl">{result.oilRecommendation}</p>
                  </div>

                  <button className="w-full bg-[#292524] text-white py-4 uppercase text-xs tracking-[0.2em] font-bold hover:bg-[#c07a60] transition-colors flex items-center justify-center gap-2 group">
                    Prenota Ora <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WellnessQuiz;
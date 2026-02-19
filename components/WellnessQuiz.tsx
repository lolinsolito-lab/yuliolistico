
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RefreshCcw, Cpu, Lock, CheckCircle } from 'lucide-react';
import { analyzeSymptom } from '../services/diagnosticEngine';
import { saveLead } from '../services/supabaseService';
import { sendLeadEmail } from '../services/emailService'; // Import Email Service
import { AiRecommendation } from '../types';

const WellnessQuiz: React.FC = () => {
  const [step, setStep] = useState<'INPUT' | 'LEAD_GEN' | 'RESULT'>('INPUT');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(""); // For "Wisdom Pill"

  // Form State
  const [symptom, setSymptom] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [result, setResult] = useState<AiRecommendation | null>(null);

  // Step 1: Analyze Symptom & Fake Processing
  const handleAnalyze = async () => {
    if (!symptom.trim() || !name.trim()) return;
    setLoading(true);

    // Sequence 1: Listening
    setLoadingMessage("Ascolto il ritmo del tuo respiro...");
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Sequence 2: Connecting
    setLoadingMessage("Connetto con gli antichi elementi...");
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Sequence 3: Decoding
    setLoadingMessage("L'universo ha una risposta per te...");
    await new Promise(resolve => setTimeout(resolve, 1500));

    const diagnosis = analyzeSymptom(symptom);
    setResult(diagnosis);
    setLoading(false);
    setStep('LEAD_GEN');
  };

  // Step 2: Unlock Result (Lead Gen)
  const handleUnlock = async () => {
    if (!email.trim() || !phone.trim()) return;
    setLoading(true);

    try {
      if (result) {
        // 1. Save to Database
        await saveLead({
          name,
          email,
          phone,
          symptom,
          result_treatment: result.treatment
        });
        console.log("Lead Saved to Supabase");

        // 2. Trigger Email (Simulated for now)
        try {
          await sendLeadEmail(email, name, result);
          console.log("Email trigger sent");
        } catch (emailError) {
          console.error("Failed to trigger email", emailError);
        }
      }
    } catch (error) {
      console.error("Failed to save lead", error);
      // Continue anyway to show result to user
    }

    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setStep('RESULT');
  };

  return (
    <section className="py-32 mb-20 border-b border-[#292524]/5 bg-[#faf9f6] px-6 relative overflow-hidden" id="diagnostic">
      {/* Tech/Organic Fusion Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 border border-[#292524] rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 border border-[#292524] rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left: Introduction & Instructions */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-4 h-4 text-[#849b87]" />
              <span className="text-[#849b87] uppercase tracking-[0.2em] text-xs font-bold">Yuli • Diagnostic Engine</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-[#292524] mb-8 leading-none">
              Cosa chiede <br />
              la tua <span className="text-[#c07a60] italic">Anima?</span>
            </h2>
            <p className="text-[#57534e] text-xl mb-10 leading-relaxed font-light">
              Non scegliere a caso. L'algoritmo di Yuli decodifica il linguaggio del tuo corpo per trovare l'unico rituale di cui hai bisogno oggi.
            </p>

            <AnimatePresence mode='wait'>
              {step === 'INPUT' && (
                <div className="relative">
                  {/* Wisdom Loader Overlay */}
                  <AnimatePresence>
                    {loading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 rounded-sm"
                      >
                        <motion.div
                          key={loadingMessage}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.5 }}
                          className="font-serif text-2xl text-[#c07a60] italic"
                        >
                          "{loadingMessage}"
                        </motion.div>
                        <div className="mt-6 flex gap-1">
                          <div className="w-2 h-2 bg-[#292524] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                          <div className="w-2 h-2 bg-[#292524] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-[#292524] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="relative group bg-white/50 backdrop-blur-sm p-8 border border-[#292524]/10 rounded-sm"
                  >
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-[#a8a29e] mb-2">Come ti chiami?</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Il tuo nome..."
                          className="w-full bg-white p-4 border-b border-[#292524]/20 outline-none font-serif text-xl placeholder:text-[#d6d3d1]"
                          disabled={loading}
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-[#a8a29e] mb-2">Come ti senti oggi? (Sii onesta)</label>
                        <textarea
                          value={symptom}
                          onChange={(e) => setSymptom(e.target.value)}
                          placeholder="Es: 'Ho le spalle di marmo e non dormo da due notti...'"
                          className="w-full bg-white p-4 border-b border-[#292524]/20 outline-none h-32 resize-none font-serif text-xl placeholder:text-[#d6d3d1]"
                          disabled={loading}
                        />
                      </div>
                      <button
                        onClick={handleAnalyze}
                        disabled={loading || !symptom || !name}
                        className="w-full bg-[#292524] text-white py-4 uppercase text-xs tracking-[0.2em] font-bold hover:bg-[#c07a60] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {loading ? <RefreshCcw className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                        {loading ? "Decodifica in corso..." : "Avvia Diagnostica"}
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}

              {step === 'LEAD_GEN' && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="relative bg-white/80 backdrop-blur-md p-8 border border-[#c07a60]/30 shadow-2xl rounded-sm text-center"
                >
                  <div className="w-16 h-16 bg-[#faf9f6] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-6 h-6 text-[#c07a60]" />
                  </div>
                  <h3 className="text-2xl font-serif text-[#292524] mb-2">Analisi Completata, {name}.</h3>
                  <p className="text-[#57534e] mb-8">
                    Abbiamo identificato il blocco. <br />
                    Per sbloccare il tuo <span className="font-bold text-[#c07a60]">Protocollo Personalizzato</span> e ricevere il consiglio dell'esperta, inserisci i tuoi contatti.
                  </p>

                  <div className="space-y-4 text-left">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="La tua Email migliore..."
                      className="w-full bg-white p-4 border border-[#292524]/10 outline-none"
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Il tuo Numero (Solo per conferme)..."
                      className="w-full bg-white p-4 border border-[#292524]/10 outline-none"
                    />
                    <button
                      onClick={handleUnlock}
                      disabled={loading || !email || !phone}
                      className="w-full bg-[#c07a60] text-white py-4 uppercase text-xs tracking-[0.2em] font-bold hover:bg-[#292524] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg"
                    >
                      {loading ? "Sblocco..." : "Sblocca il Risultato"} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[10px] text-[#a8a29e] mt-4 uppercase tracking-widest">Nessuno spam. Solo benessere.</p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right: The Result Card (Locked/Unlocked State) */}
          <div className="relative min-h-[500px] flex items-center justify-center">
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f3e9d2] rounded-full blur-[100px] opacity-40 pointer-events-none"></div>

            <AnimatePresence mode='wait'>
              {/* Result Card */}
              {step === 'RESULT' && result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/95 backdrop-blur-xl p-10 shadow-2xl border border-white/50 w-full max-w-md relative z-10 text-center"
                >
                  <div className="inline-flex items-center gap-2 bg-[#292524] text-white px-4 py-1 text-[10px] uppercase tracking-[0.3em] mb-6">
                    <CheckCircle className="w-3 h-3 text-[#c07a60]" /> Match Confermato
                  </div>

                  <div className="mb-2 text-xs text-[#a8a29e] uppercase tracking-widest">{name}, il tuo Rituale Suggerito</div>
                  <h3 className="text-4xl font-serif text-[#292524] mb-6 leading-tight">
                    {result.treatment}
                  </h3>

                  <div className="mb-8 relative">
                    <span className="absolute -top-4 -left-2 text-6xl text-[#c07a60]/20 font-serif">"</span>
                    <p className="text-[#57534e] text-lg font-light italic leading-relaxed relative z-10">
                      {result.reasoning}
                    </p>
                  </div>

                  <div className="bg-[#faf9f6] p-6 mb-8 border border-[#292524]/5">
                    <span className="block text-xs uppercase tracking-widest text-[#a8a29e] mb-2">Consiglio Sensoriale</span>
                    <p className="text-[#c07a60] font-serif text-xl">{result.oilRecommendation}</p>
                  </div>

                  <button className="w-full bg-[#292524] text-white py-4 uppercase text-xs tracking-[0.2em] font-bold hover:bg-[#c07a60] transition-colors flex items-center justify-center gap-2 group shadow-xl">
                    Prenota Questo Rituale <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}

              {/* Locked State Visualization (When NOT in Result) */}
              {step !== 'RESULT' && (
                <div className="relative z-10 w-full h-full flex flex-col justify-center pointer-events-none select-none opacity-50 grayscale-[0.5]">
                  {/* Fake Result Card - Blurred */}
                  <div className="bg-white p-10 shadow-sm border border-[#292524]/5 rounded-sm blur-sm transform scale-95">
                    <div className="h-4 w-24 bg-gray-200 mb-6 mx-auto"></div>
                    <div className="h-8 w-48 bg-gray-200 mb-6 mx-auto"></div>
                    <div className="space-y-2 mb-8">
                      <div className="h-4 w-full bg-gray-100"></div>
                      <div className="h-4 w-full bg-gray-100"></div>
                      <div className="h-4 w-2/3 bg-gray-100 mx-auto"></div>
                    </div>
                    <div className="h-12 w-full bg-[#292524] opacity-20"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="w-12 h-12 text-[#292524]/30" />
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WellnessQuiz;
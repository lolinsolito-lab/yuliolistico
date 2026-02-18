import React, { useState } from 'react';
import { COLLABORATIONS } from '../constants';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const About: React.FC = () => {
  const [isBioOpen, setIsBioOpen] = useState(false);

  return (
    <section id="chi-sono" className="py-24 bg-[#faf9f6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="order-2 lg:order-1 relative">
            {/* Decorative element */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#f3e9d2] rounded-full mix-blend-multiply opacity-50 blur-2xl"></div>
            <img
              src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800&auto=format&fit=crop"
              alt="Hands massage stone"
              className="relative z-10 w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-1000 shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 shadow-lg z-20 max-w-xs hidden md:block border-l-2 border-[#c07a60]">
              <p className="font-serif italic text-lg text-[#c07a60]">"Il tocco come lingua senza parole."</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="block text-[#849b87] uppercase tracking-[0.2em] text-sm mb-4">La Storia</span>
            <h2 className="text-5xl font-serif text-[#292524] mb-8 leading-tight">
              Dalle radici indonesiane <br /> al cuore dell'Italia.
            </h2>
            <div className="space-y-6 text-[#57534e] text-lg leading-relaxed font-light">
              <p>
                Ogni cammino ha un'origine silenziosa. Il mio inizia in Indonesia, dove il tocco è considerato sacro, una forma di cura tramandata attraverso le generazioni.
              </p>
              <p>
                Da oltre 8 anni, ho portato questa eredità in Italia, fondendo la saggezza orientale con le tecniche occidentali apprese tra Bergamo e Bologna.
              </p>
              <p>
                Io sono <button
                  onClick={() => setIsBioOpen(true)}
                  className="font-serif italic text-[#c07a60] hover:text-[#d4af37] border-b border-[#c07a60]/30 hover:border-[#d4af37] transition-all duration-300 relative group"
                >
                  Yuli Yuliantini
                  <span className="absolute -top-1 -right-2 text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-3 h-3" />
                  </span>
                </button>.
                Non offro solo un trattamento, ma uno spazio sacro. Qui, il tempo rallenta. Le mani ascoltano ciò che la voce non dice.
              </p>
              <p className="font-medium text-[#292524]">
                Scegliamo sempre l'eccellenza.
              </p>
            </div>

            <div className="mt-12 pt-12 border-t border-[#e7e5e4]">
              <span className="block text-xs uppercase tracking-widest text-[#a8a29e] mb-6">Collaborazioni di Prestigio</span>
              <div className="flex flex-wrap gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {COLLABORATIONS.map((collab) => (
                  <span key={collab} className="text-xl font-serif font-bold text-[#292524]">{collab}</span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* VISION MODAL */}
      <AnimatePresence>
        {isBioOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#292524]/90 backdrop-blur-md"
            onClick={() => setIsBioOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#faf9f6] max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsBioOpen(false)}
                className="absolute top-4 right-4 z-10 text-[#292524] hover:text-[#c07a60] transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="w-full md:w-2/5 relative">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop"
                  alt="Yuli Yuliantini Portrait"
                  className="w-full h-full object-cover min-h-[300px]"
                />
                <div className="absolute inset-0 bg-[#c07a60]/10 mix-blend-overlay"></div>
              </div>

              <div className="w-full md:w-3/5 p-10 md:p-14 flex flex-col justify-center">
                <span className="text-[#c07a60] uppercase tracking-[0.2em] text-xs font-bold mb-2">La Visione</span>
                <h3 className="text-4xl font-serif text-[#292524] mb-6">L'Arte del Tocco</h3>

                <div className="space-y-4 text-[#57534e] font-light leading-relaxed">
                  <p>
                    "Sono nata in una terra dove il massaggio non è un lusso, ma una medicina quotidiana. In Indonesia, impariamo a toccare prima ancora di imparare a parlare."
                  </p>
                  <p>
                    "Il mio metodo non segue protocolli rigidi. Segue l'energia. Ogni seduta è un dialogo silenzioso tra le mie mani e la tua storia. Non cerco di 'aggiustare' il corpo, ma di ricordargli la sua perfezione originale."
                  </p>
                  <p>
                    "L'eccellenza non è un atto, è un'abitudine. È la scelta quotidiana di non accontentarsi della superficie."
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#292524]/10">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png"
                    alt="Signature"
                    className="h-12 opacity-50"
                  />
                  <p className="mt-2 text-xs uppercase tracking-widest text-[#a8a29e]">Yuliantini Yuliantini</p>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
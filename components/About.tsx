import React, { useState, useEffect } from 'react';
import { COLLABORATIONS } from '../constants';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

// Default values (fallback if no business_profile row exists)
const DEFAULTS = {
  full_name: 'Yuli Yuliantini',
  role: 'Founder & CEO',
  profile_image_url: '/images/yuli-profile.png',
  signature_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png',
  bio_long: '',
};

const About: React.FC = () => {
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [profile, setProfile] = useState(DEFAULTS);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await supabase
          .from('business_profile')
          .select('full_name, role, profile_image_url, signature_image_url, bio_long')
          .limit(1)
          .maybeSingle();

        if (data) {
          setProfile(prev => ({
            ...prev,
            ...Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null && v !== ''))
          }));
        }
      } catch (err) {
        console.warn('About: using fallback profile data');
      }
    };
    fetchProfile();
  }, []);

  // Parse bio_long into paragraphs (split by double newline or newline)
  const visionParagraphs = profile.bio_long
    ? profile.bio_long.split(/\n\n|\n/).filter(p => p.trim())
    : [
      '"Nella mia terra, non impariamo a massaggiare. Impariamo a sentire. Prima ancora che le mie mani ti tocchino, la mia energia ti ha già accolto."',
      '"Il corpo non mente mai. Trattiene il freddo delle parole non dette, il calore delle emozioni vissute, il peso dei giorni frenetici. Io non \'lavoro\' sui muscoli. Io dialogo con quelle memorie."',
      '"Il mio rituale è restituirti al tuo silenzio originale. Dove non sei madre, non sei manager, non sei ruolo. Sei solo vita che scorre. Pura. Intatta."',
    ];

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
                Ogni cammino ha un'origine silenziosa. Il mio inizia in Indonesia, dove il tocco è considerato sacro, un linguaggio antico che precede la parola.
              </p>
              <p>
                Da oltre 8 anni, porto questa eredità in Italia. Non ho solo applicato tecniche; ho fuso l'istinto ancestrale d'Oriente con i più rigorosi protocolli occidentali, perfezionati a fianco di Maestri internazionali.
              </p>
              <p>
                Io sono <button
                  onClick={() => setIsBioOpen(true)}
                  className="font-serif italic text-[#c07a60] hover:text-[#d4af37] border-b border-[#c07a60]/30 hover:border-[#d4af37] transition-all duration-300 relative group"
                >
                  {profile.full_name}
                  <span className="absolute -top-1 -right-2 text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-3 h-3" />
                  </span>
                </button>.
                Non offro solo un trattamento, ma un tempio di ascolto. Qui, il tempo non esiste. Le mani sentono ciò che la mente nasconde. È una fusione unica: rigore tecnico e sensibilità invisibile.
              </p>
              <p className="font-medium text-[#292524]">
                Scegliamo sempre l'eccellenza.
              </p>
            </div>

            <div className="mt-12 pt-12 border-t border-[#e7e5e4]">
              <span className="block text-xs uppercase tracking-widest text-[#a8a29e] mb-6">Le radici della mia esperienza — Hanno scelto le mie mani</span>
              <div className="flex flex-wrap gap-8 items-center opacity-80 hover:opacity-100 transition-all duration-500">
                {COLLABORATIONS.map((collab) => (
                  <span key={collab} className="text-xl font-serif text-[#c07a60] hover:text-[#d4af37] border-b border-transparent hover:border-[#d4af37] transition-all cursor-default">
                    {collab}
                  </span>
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

              <div className="w-full md:w-2/5 relative overflow-hidden group">
                <img
                  src={profile.profile_image_url}
                  alt={`${profile.full_name} Portrait`}
                  className="w-full h-full object-cover min-h-[300px] grayscale brightness-110 contrast-125 transition-all duration-700 group-hover:grayscale-0"
                />
                {/* Mystic Fog Effect - Left Side */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#292524]/80 via-gray-400/20 to-transparent mix-blend-multiply z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-transparent mix-blend-overlay z-10"></div>

                {/* Gold Highlight Overlay */}
                <div className="absolute inset-0 bg-[#c07a60]/10 mix-blend-overlay z-20"></div>
              </div>

              <div className="w-full md:w-3/5 p-10 md:p-14 flex flex-col justify-center">
                <span className="text-[#c07a60] uppercase tracking-[0.2em] text-xs font-bold mb-2">La Visione</span>
                <h3 className="text-4xl font-serif text-[#292524] mb-6">Sentire oltre la pelle.</h3>

                <div className="space-y-4 text-[#57534e] font-light leading-relaxed italic">
                  {visionParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-[#292524]/10">
                  {profile.signature_image_url && (
                    <img
                      src={profile.signature_image_url}
                      alt="Signature"
                      className="h-12 opacity-50"
                    />
                  )}
                  <p className="mt-2 text-xs uppercase tracking-widest text-[#a8a29e]">{profile.full_name}</p>
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
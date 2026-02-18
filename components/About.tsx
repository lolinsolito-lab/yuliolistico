import React from 'react';
import { COLLABORATIONS } from '../constants';

const About: React.FC = () => {
  return (
    <section id="chi-sono" className="py-24 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="order-2 lg:order-1 relative">
            {/* Decorative element */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#f3e9d2] rounded-full mix-blend-multiply opacity-50 blur-2xl"></div>
            <img
              src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800&auto=format&fit=crop"
              alt="Hands massage stone"
              className="relative z-10 w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-1000 shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 shadow-lg z-20 max-w-xs hidden md:block">
              <p className="font-serif italic text-lg text-[#c07a60]">"Il tocco come lingua senza parole."</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="block text-[#849b87] uppercase tracking-[0.2em] text-sm mb-4">La Storia</span>
            <h2 className="text-5xl font-serif text-[#292524] mb-8">
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
                Non offro solo un trattamento, ma uno spazio sacro. Qui, il tempo rallenta. Le mani ascoltano ciò che la voce non dice. È una fusione unica: una danza lenta tra respiro, energia e presenza.
              </p>
            </div>

            <div className="mt-12 pt-12 border-t border-[#e7e5e4]">
              <span className="block text-xs uppercase tracking-widest text-[#a8a29e] mb-6">Collaborazioni di Prestigio</span>
              <div className="flex flex-wrap gap-8 items-center opacity-60 grayscale">
                {COLLABORATIONS.map((collab) => (
                  <span key={collab} className="text-xl font-serif font-bold text-[#292524]">{collab}</span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
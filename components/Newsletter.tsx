import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
        setStatus('success');
        setEmail('');
    }
  };

  return (
    <section className="bg-[#faf9f6] py-20 px-6 border-t border-[#292524]/10">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-serif text-[#292524] mb-4">
          Non perderti nel rumore.
        </h3>
        <p className="text-[#57534e] mb-8 font-light">
          Ricevi una volta a settimana una "Pillola di Zen". 
          Nessuna promozione, solo saggezza olistica per navigare il caos moderno.
        </p>

        {status === 'success' ? (
             <div className="flex items-center justify-center gap-2 text-[#849b87] animate-pulse">
                <Check className="w-5 h-5" />
                <span className="font-serif text-lg">Sei dentro. Benvenuta nel cerchio.</span>
             </div>
        ) : (
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input 
                type="email" 
                placeholder="La tua email migliore"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-white border border-[#e7e5e4] px-6 py-4 focus:outline-none focus:border-[#c07a60] text-[#292524] placeholder:text-[#a8a29e]"
                required
            />
            <button 
                type="submit"
                className="bg-[#292524] text-white px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#c07a60] transition-colors flex items-center justify-center gap-2"
            >
                Iscriviti <ArrowRight className="w-4 h-4" />
            </button>
            </form>
        )}
        
        <p className="mt-6 text-[10px] text-[#a8a29e] uppercase tracking-widest">
            Rispetteremo il tuo inbox come un tempio.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
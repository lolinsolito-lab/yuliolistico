import React, { useState } from 'react';
import { ArrowRight, Check, Loader } from 'lucide-react';
import { saveLead } from '../services/supabaseService';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already_subscribed'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStatus('loading');
      try {
        await saveLead({ 
            name: 'Newsletter Subscriber', 
            email, 
            phone: '', 
            symptom: '', 
            result_treatment: '',
            marketing_consent: marketingConsent 
        }, 'newsletter', honeypot);
        setStatus('success');
        setEmail('');
      } catch (err: any) {
        console.error(err);
        if (err?.message?.includes('duplicate_subscription')) {
          setStatus('already_subscribed');
        } else {
          setStatus('idle');
        }
      }
    }
  };

  return (
    <section id="newsletter" className="bg-[#faf9f6] py-20 px-6 border-t border-[#292524]/10">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-serif text-[#292524] mb-4">
          Non perderti nel rumore.
        </h3>
        <p className="text-[#57534e] mb-8 font-light">
          Inserendo l'email riceverai una volta a settimana una "Pillola di Zen".
          Nessuna promozione, solo saggezza olistica per navigare il caos moderno.
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-2 text-[#849b87] animate-pulse">
            <Check className="w-5 h-5" />
            <span className="font-serif text-lg">Sei dentro. Controlla la tua email per il benvenuto.</span>
          </div>
        ) : status === 'already_subscribed' ? (
          <div className="flex items-center justify-center gap-2 text-[#c07a60]">
            <Check className="w-5 h-5" />
            <span className="font-serif text-lg">Sei già nella nostra lista — ti aggiorneremo appena ci sono novità.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                {/* Honeypot invisibile */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <label htmlFor="newsletter_website">Website</label>
                  <input
                    type="text"
                    id="newsletter_website"
                    name="newsletter_website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
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
                  disabled={status === 'loading'}
                  className="bg-[#292524] text-white px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#c07a60] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'loading' ? <Loader className="w-4 h-4 animate-spin" /> : "Iscriviti"} {status !== 'loading' && <ArrowRight className="w-4 h-4" />}
                </button>
            </div>
            {/* GDPR Consent */}
            <div className="flex items-start gap-2 text-left">
                <input 
                    type="checkbox" 
                    id="gdpr_newsletter"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="mt-1 accent-[#292524]"
                />
                <label htmlFor="gdpr_newsletter" className="text-[10px] text-stone-500 leading-tight">
                    Acconsento a ricevere approfondimenti e comunicazioni future da Yuli Olistico. (Facoltativo)
                </label>
            </div>
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
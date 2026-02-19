import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Star, Key, X, ArrowRight, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const Membership: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setStatus('sending');
    try {
      const { error } = await supabase.from('leads').insert([{
        name: formData.name,
        email: formData.email,
        phone: '',
        symptom: formData.message || 'Candidatura Sanctuary Membership',
        result_treatment: 'sanctuary_vip',
        status: 'sanctuary_candidate'
      }]);

      if (error) throw error;
      setStatus('success');
      setTimeout(() => {
        setShowModal(false);
        setStatus('idle');
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <section id="membership" className="py-16 px-6 bg-[#292524] text-[#faf9f6] relative overflow-hidden">
        {/* Texture */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }} />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="border border-[#d4af37]/30 p-8 md:p-12 relative bg-[#292524]/50 backdrop-blur-sm"
          >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#d4af37]" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#d4af37]" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#d4af37]" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#d4af37]" />

            {/* Header — Compact */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <Crown className="w-6 h-6 text-[#d4af37]" />
              <span className="text-[#d4af37] uppercase tracking-[0.3em] text-xs font-bold">Solo su Invito</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif mb-4 text-white">
              The Sanctuary Membership
            </h2>

            <p className="text-base font-light text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
              Un cerchio ristretto. Per chi ha scelto il benessere come stile di vita.
            </p>

            {/* Benefits — Inline Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-8">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <span className="text-sm text-white/70">Priority Booking</span>
              </div>
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <span className="text-sm text-white/70">Secret Menu</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <span className="text-sm text-white/70">Yuli Signature</span>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="px-8 py-3 bg-[#d4af37] text-[#292524] font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors"
            >
              Candidati per l'Accesso
            </button>

            <p className="mt-4 text-[10px] text-white/30 uppercase tracking-widest">
              * Lista d'attesa attuale: 3 settimane
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── VIP Candidatura Modal ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => status !== 'sending' && setShowModal(false)} />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-[#1c1917] border border-[#d4af37]/30 p-8 md:p-10 max-w-md w-full text-[#faf9f6] z-10"
            >
              {/* Close */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {status === 'success' ? (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
                  <h3 className="text-2xl font-serif mb-2">Candidatura Ricevuta</h3>
                  <p className="text-sm text-white/50">Ti contatteremo entro 48 ore.</p>
                </motion.div>
              ) : (
                /* Form */
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <Crown className="w-5 h-5 text-[#d4af37]" />
                    <h3 className="text-xl font-serif">Candidatura Sanctuary</h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-white/40 mb-1 block">Nome</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Il tuo nome"
                        className="w-full py-3 px-4 bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-[#d4af37] transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-widest text-white/40 mb-1 block">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="la.tua@email.com"
                        className="w-full py-3 px-4 bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-[#d4af37] transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-widest text-white/40 mb-1 block">Perché desideri accedere?</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Racconta brevemente il tuo rapporto con il benessere..."
                        rows={3}
                        className="w-full py-3 px-4 bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-[#d4af37] transition-colors text-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full py-3 bg-[#d4af37] text-[#1c1917] font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {status === 'sending' ? 'Invio in corso...' : (
                        <>Invia Candidatura <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>

                    {status === 'error' && (
                      <p className="text-xs text-red-400 text-center">Si è verificato un errore. Riprova.</p>
                    )}
                  </form>

                  <p className="mt-4 text-[10px] text-white/25 text-center">
                    I tuoi dati sono al sicuro. Nessuno spam, mai.
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Membership;
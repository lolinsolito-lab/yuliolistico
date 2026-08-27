import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Loader, ChevronLeft } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { EMPIRE_CONFIG } from '../config/integrations';

const BookingModal: React.FC = () => {
    const { isBookingOpen, closeBooking } = useBooking();
    const [isLoading, setIsLoading] = useState(true);

    // Prevent scrolling when modal is open
    React.useEffect(() => {
        if (isBookingOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isBookingOpen]);

    // Reset loading state when modal opens
    React.useEffect(() => {
        if (isBookingOpen) {
            setIsLoading(true);
        }
    }, [isBookingOpen]);

    const isDemo = EMPIRE_CONFIG.LUMINEL_URL.includes("demo-booking");

    return (
        <AnimatePresence>
            {isBookingOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeBooking}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-all duration-300"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-4 md:inset-10 md:left-auto md:right-10 md:w-[500px] z-[101] bg-white shadow-2xl overflow-hidden flex flex-col border border-stone-200"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-[#faf9f6]">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-[#c07a60]" />
                                <span className="font-serif text-lg text-[#292524] tracking-wide">
                                    Prenota Rituale
                                </span>
                            </div>
                            <button
                                onClick={closeBooking}
                                className="p-2 hover:bg-stone-200 rounded-full transition-colors text-stone-500 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content Switcher: Real Iframe vs Mock UI */}
                        <div className="flex-grow relative bg-white overflow-hidden">
                            {isDemo ? (
                                // ✨ MOCK MODE UI (Fallback attesa Settembre)
                                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#faf9f6]">
                                    <div className="max-w-md w-full bg-white p-8 shadow-xl rounded-xl border border-stone-100">
                                        <div className="w-16 h-16 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Calendar className="w-8 h-8 text-[#d4af37]" />
                                        </div>
                                        <h4 className="font-serif text-2xl text-[#292524] mb-2">Prenotazione Diretta</h4>
                                        <p className="text-[#57534e] text-sm mb-8 leading-relaxed">
                                            Il nostro sistema di prenotazione automatica sarà attivo prossimamente.<br /><br />
                                            Nel frattempo, contattaci direttamente per verificare le disponibilità e fissare il tuo appuntamento.
                                        </p>

                                        <div className="space-y-4">
                                            <a href="https://wa.me/393201982629" target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white uppercase text-xs tracking-[0.2em] font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                                                Scrivici su WhatsApp
                                            </a>
                                            <a href="mailto:yuliolistico@gmail.com" className="w-full py-3 bg-[#292524] hover:bg-[#c07a60] text-white uppercase text-xs tracking-[0.2em] font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                                                Invia un'Email
                                            </a>
                                        </div>
                                    </div>
                                    <p className="mt-8 text-[10px] text-[#a8a29e] uppercase tracking-widest">
                                        Luminel Booking Engine — Coming Soon
                                    </p>
                                </div>
                            ) : (
                                // 🚀 REAL MODE IFRAME
                                <>
                                    {isLoading && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-0">
                                            <Loader className="w-8 h-8 text-[#d4af37] animate-spin mb-4" />
                                            <p className="text-[#a8a29e] text-sm uppercase tracking-widest animate-pulse">
                                                Connessione sicura a Luminel...
                                            </p>
                                        </div>
                                    )}

                                    <iframe
                                        src={EMPIRE_CONFIG.LUMINEL_URL}
                                        title="Luminel Booking Engine"
                                        className="w-full h-full border-0 relative z-10"
                                        onLoad={() => setIsLoading(false)}
                                        allow="payment"
                                    />
                                </>
                            )}
                        </div>

                        {/* Footer (Trust Signals) */}
                        <div className="bg-[#faf9f6]/80 p-4 border-t border-stone-100 flex justify-between items-center text-[10px] uppercase tracking-wider text-[#a8a29e]">
                            <span>🔒 Pagamento Sicuro</span>
                            <span>Yuli Olistico © 2026</span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;

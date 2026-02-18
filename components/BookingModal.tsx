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
                                // ✨ MOCK MODE UI
                                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#faf9f6]">
                                    <div className="max-w-md w-full bg-white p-8 shadow-xl rounded-xl border border-stone-100">
                                        <div className="w-16 h-16 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Loader className="w-8 h-8 text-[#d4af37]" />
                                        </div>
                                        <h4 className="font-serif text-2xl text-[#292524] mb-2">Luminel Manager Demo</h4>
                                        <p className="text-[#57534e] text-sm mb-8 leading-relaxed">
                                            Il Booking Engine è in modalità simulazione.<br />
                                            Presto qui apparirà il calendario reale sincronizzato.
                                        </p>

                                        {/* Fake Calendar Grid */}
                                        <div className="grid grid-cols-7 gap-2 mb-8 opacity-50 pointer-events-none select-none">
                                            {['L', 'M', 'M', 'G', 'V', 'S', 'D'].map((day, i) => (
                                                <div key={i} className="text-[10px] uppercase font-bold text-[#a8a29e]">{day}</div>
                                            ))}
                                            {[...Array(31)].map((_, i) => (
                                                <div key={i} className={`h-8 flex items-center justify-center text-xs rounded-full ${i === 14 ? 'bg-[#c07a60] text-white' : 'bg-stone-50 text-[#57534e]'}`}>
                                                    {i + 1}
                                                </div>
                                            ))}
                                        </div>

                                        <button className="w-full py-3 bg-[#292524] text-white uppercase text-xs tracking-[0.2em] font-bold rounded-lg opacity-50 cursor-not-allowed">
                                            Seleziona Orario
                                        </button>
                                    </div>
                                    <p className="mt-8 text-[10px] text-[#a8a29e] uppercase tracking-widest">
                                        Powered by Insolito Empire
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

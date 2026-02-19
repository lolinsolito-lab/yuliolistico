import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const GiftCards: React.FC = () => {
    const { openBooking } = useBooking();
    const [customAmount, setCustomAmount] = useState('');
    const [showAmountInput, setShowAmountInput] = useState(false);

    const gifts = [
        {
            title: "L'Invito",
            price: "€80",
            desc: "Un'ora a scelta tra le Tecniche Manuali Fondamentali. Il primo passo perfetto per ricominciare ad ascoltarsi.",
            color: "bg-[#292524]",
            textColor: "text-[#f3e9d2]",
            cta: "Regala il Rituale",
            isOpen: false,
        },
        {
            title: "Sovereign Touch",
            price: "€120",
            desc: "Novanta minuti di puro abbandono con l'Ayurveda Soul Connection. Il dono per eccellenza per chi ha bisogno di spegnere la mente.",
            color: "bg-[#f3e9d2]",
            textColor: "text-[#292524]",
            cta: "Regala l'Esperienza",
            isOpen: false,
        },
        {
            title: "Carta Bianca",
            price: "Open",
            desc: "Scegli l'importo che desideri. Lascia a chi ami il lusso e la libertà di ascoltare il proprio corpo e scegliere la sua rinascita.",
            color: "bg-[#849b87]",
            textColor: "text-white",
            cta: "Definisci il Valore",
            isOpen: true,
        }
    ];

    const handleCartaBiancaClick = () => {
        setShowAmountInput(!showAmountInput);
    };

    const handleConfirmAmount = () => {
        if (customAmount && parseInt(customAmount) >= 50) {
            openBooking();
        }
    };

    return (
        <section className="py-32 px-6 bg-[#faf9f6]">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <Gift className="w-8 h-8 text-[#c07a60]" />
                        <h2 className="text-5xl md:text-7xl font-serif text-[#292524]">
                            L'Arte del Dono
                        </h2>
                        <p className="text-xl text-[#57534e] font-light max-w-2xl mx-auto leading-relaxed">
                            Il lusso più grande non si può impacchettare: è il tempo ritrovato. <br />
                            Regala un momento di assoluta disconnessione dal rumore del mondo.
                        </p>
                    </motion.div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {gifts.map((gift, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className={`relative group overflow-hidden p-10 ${gift.color} ${gift.textColor} min-h-[400px] flex flex-col justify-between`}
                        >
                            {/* Decorative Circle */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 blur-3xl group-hover:bg-white/10 transition-colors duration-500"></div>

                            <div>
                                <span className="text-xs uppercase tracking-[0.3em] opacity-70 block mb-6">Gift Voucher</span>
                                <h3 className="text-4xl font-serif mb-4 leading-tight">{gift.title}</h3>
                                <p className={`text-lg font-light opacity-90 leading-relaxed`}>
                                    {gift.desc}
                                </p>
                            </div>

                            <div className="mt-12">
                                <div className="text-3xl font-serif mb-8">{gift.price}</div>

                                {/* Custom Amount Input for Carta Bianca */}
                                {gift.isOpen && (
                                    <AnimatePresence>
                                        {showAmountInput && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="mb-6 overflow-hidden"
                                            >
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 font-serif text-lg">€</span>
                                                    <input
                                                        type="number"
                                                        min="50"
                                                        placeholder="da 50"
                                                        value={customAmount}
                                                        onChange={(e) => setCustomAmount(e.target.value)}
                                                        className="w-full py-3 pl-10 pr-4 bg-white/10 border border-white/30 text-white font-serif text-lg placeholder:text-white/40 focus:outline-none focus:border-[#d4af37] transition-colors"
                                                    />
                                                </div>
                                                {customAmount && parseInt(customAmount) >= 50 && (
                                                    <motion.button
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        onClick={handleConfirmAmount}
                                                        className="w-full mt-3 py-3 bg-[#d4af37] text-[#292524] uppercase text-xs tracking-[0.2em] font-bold hover:bg-[#f3e9d2] transition-all duration-300 flex items-center justify-center gap-3"
                                                    >
                                                        Conferma e Regala <ArrowRight className="w-4 h-4" />
                                                    </motion.button>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}

                                <button
                                    onClick={gift.isOpen ? handleCartaBiancaClick : openBooking}
                                    className={`w-full py-4 border border-current uppercase text-xs tracking-[0.2em] font-bold hover:bg-white hover:text-[#292524] transition-all duration-300 flex items-center justify-center gap-3`}
                                >
                                    {gift.cta} <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default GiftCards;

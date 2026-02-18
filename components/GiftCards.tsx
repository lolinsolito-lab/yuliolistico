import React from 'react';
import { motion } from 'framer-motion';
import { Gift, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const GiftCards: React.FC = () => {
    const { openBooking } = useBooking();

    const gifts = [
        {
            title: "Rituale Discovery",
            price: "€80",
            desc: "Un'ora di Thai Royal Flow o Deep Tissue. L'introduzione perfetta.",
            color: "bg-[#292524]",
            textColor: "text-[#f3e9d2]"
        },
        {
            title: "Sovereign Touch",
            price: "€120",
            desc: "90 minuti di Ayurveda Soul Connection. Il regalo per chi merita il massimo.",
            color: "bg-[#f3e9d2]",
            textColor: "text-[#292524]"
        },
        {
            title: "Libertà Assoluta",
            price: "Open",
            desc: "Scegli tu l'importo. Lascia alla persona amata la libertà di scegliere il suo percorso.",
            color: "bg-[#849b87]",
            textColor: "text-white"
        }
    ];

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
                            L'Arte del Donare
                        </h2>
                        <p className="text-xl text-[#57534e] font-light max-w-2xl mx-auto leading-relaxed">
                            Il lusso non è un oggetto. È il tempo ritrovato. <br />
                            Regala un'esperienza che non occuperà spazio in casa, ma nel cuore.
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
                                <button
                                    onClick={openBooking}
                                    className={`w-full py-4 border border-current uppercase text-xs tracking-[0.2em] font-bold hover:bg-white hover:text-[#292524] transition-all duration-300 flex items-center justify-center gap-3`}
                                >
                                    Acquista Ora <ArrowRight className="w-4 h-4" />
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

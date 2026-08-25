import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, ArrowRight, Loader } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { GiftVoucher } from '../types';
import { saveLead } from '../services/supabaseService';

const GiftCards: React.FC = () => {
    const [gifts, setGifts] = useState<GiftVoucher[]>([]);
    const [loading, setLoading] = useState(true);
    const [customAmount, setCustomAmount] = useState('');
    const [showAmountInput, setShowAmountInput] = useState<string | null>(null);
    const [phone, setPhone] = useState('393201982629'); // Default
    const [isProcessing, setIsProcessing] = useState(false);
    const [honeypot, setHoneypot] = useState('');

    useEffect(() => {
        const fetchVouchersAndProfile = async () => {
            // Fetch Vouchers
            const { data: vouchersData } = await supabase
                .from('gift_vouchers')
                .select('*')
                .eq('active', true)
                .order('order', { ascending: true });

            if (vouchersData) {
                setGifts(vouchersData as GiftVoucher[]);
            }

            // Fetch Phone
            const { data: profileData } = await supabase
                .from('business_profile')
                .select('phone')
                .maybeSingle();

            if (profileData && profileData.phone) {
                // Rimuovi spazi dal numero di telefono per l'URL wa.me
                setPhone(profileData.phone.replace(/\s/g, ''));
            }

            setLoading(false);
        };

        fetchVouchersAndProfile();
    }, []);

    const getThemeClasses = (theme: string) => {
        switch (theme) {
            case 'dark': return { bg: 'bg-[#292524]', text: 'text-[#f3e9d2]' };
            case 'light': return { bg: 'bg-[#f3e9d2]', text: 'text-[#292524]' };
            case 'sage': return { bg: 'bg-[#849b87]', text: 'text-white' };
            default: return { bg: 'bg-stone-800', text: 'text-white' }; // Fallback
        }
    };

    const handleAction = async (gift: GiftVoucher) => {
        if (gift.is_custom_amount) {
            // Toggle l'input per la carta bianca
            setShowAmountInput(showAmountInput === gift.id ? null : gift.id);
            return;
        }
        
        await processGiftPurchase(gift, gift.price);
    };

    const handleConfirmAmount = async (gift: GiftVoucher) => {
        if (customAmount && parseInt(customAmount) >= 50) {
            await processGiftPurchase(gift, `€${customAmount}`);
        } else {
            alert("L'importo minimo per la Carta Bianca è €50.");
        }
    };

    const processGiftPurchase = async (gift: GiftVoucher, finalPrice: string) => {
        setIsProcessing(true);
        try {
            // 1. Tracciamo il lead intenzionale (anonimo in questa fase, serve solo per analytics)
            await saveLead({ 
                name: 'Gift Intention', 
                email: 'intent@whatsapp.click', // Dummy per far passare la validazione DB se serve
                phone: '', 
                symptom: `Interesse: ${gift.title} (${finalPrice})`, 
                result_treatment: gift.id 
            }, 'gift', honeypot);
            
            // 2. Apriamo WhatsApp
            const message = `Ciao Yuli! Vorrei regalare il voucher "${gift.title}" da ${finalPrice}. Come possiamo procedere?`;
            const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            
            window.open(waUrl, '_blank');
        } catch (error) {
            console.error("Errore nel salvataggio dell'intenzione:", error);
            // Apriamo comunque WA per non bloccare l'utente
            const message = `Ciao Yuli! Vorrei regalare il voucher "${gift.title}" da ${finalPrice}. Come possiamo procedere?`;
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
        } finally {
            setIsProcessing(false);
            setShowAmountInput(null);
            setCustomAmount('');
        }
    };

    if (loading) {
        return (
            <section className="py-16 px-6 bg-[#faf9f6] min-h-[500px] flex items-center justify-center">
                <Loader className="animate-spin w-8 h-8 text-[#d4af37]" />
            </section>
        );
    }

    return (
        <section className="py-16 px-6 bg-[#faf9f6]">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
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

                {/* Honeypot invisibile globale per il tracciamento dei lead dei regali */}
                <div style={{ display: 'none' }} aria-hidden="true">
                    <label htmlFor="gift_website">Website</label>
                    <input
                        type="text"
                        id="gift_website"
                        name="gift_website"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                    />
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {gifts.map((gift, index) => {
                        const theme = getThemeClasses(gift.color_theme);
                        const isThisAmountOpen = showAmountInput === gift.id;

                        return (
                            <motion.div
                                key={gift.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className={`relative group overflow-hidden p-8 ${theme.bg} ${theme.text} min-h-[340px] flex flex-col justify-between`}
                            >
                                {/* Decorative Circle */}
                                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 blur-3xl group-hover:bg-white/10 transition-colors duration-500"></div>

                                <div>
                                    <span className="text-xs uppercase tracking-[0.3em] opacity-70 block mb-6">Gift Voucher</span>
                                    <h3 className="text-4xl font-serif mb-4 leading-tight">{gift.title}</h3>
                                    <p className={`text-lg font-light opacity-90 leading-relaxed`}>
                                        {gift.description}
                                    </p>
                                </div>

                                <div className="mt-12">
                                    <div className="text-3xl font-serif mb-8">{gift.price}</div>

                                    {/* Custom Amount Input per Carta Bianca */}
                                    {gift.is_custom_amount && (
                                        <AnimatePresence>
                                            {isThisAmountOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="mb-6 overflow-hidden"
                                                >
                                                    <div className="relative">
                                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-current opacity-60 font-serif text-lg">€</span>
                                                        <input
                                                            type="number"
                                                            min="50"
                                                            placeholder="da 50"
                                                            value={customAmount}
                                                            onChange={(e) => setCustomAmount(e.target.value)}
                                                            className={`w-full py-3 pl-10 pr-4 bg-white/10 border border-current/30 text-current font-serif text-lg placeholder:text-current/40 focus:outline-none focus:border-current transition-colors`}
                                                        />
                                                    </div>
                                                    {customAmount && parseInt(customAmount) >= 50 && (
                                                        <motion.button
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            onClick={() => handleConfirmAmount(gift)}
                                                            disabled={isProcessing}
                                                            className="w-full mt-3 py-3 bg-[#d4af37] text-[#292524] uppercase text-xs tracking-[0.2em] font-bold hover:bg-[#f3e9d2] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                                                        >
                                                            {isProcessing ? 'Caricamento...' : 'Conferma e Regala'} <ArrowRight className="w-4 h-4" />
                                                        </motion.button>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}

                                    <button
                                        onClick={() => handleAction(gift)}
                                        disabled={isProcessing}
                                        className={`w-full py-4 border border-current uppercase text-xs tracking-[0.2em] font-bold hover:bg-white hover:text-[#292524] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50`}
                                    >
                                        {gift.cta_text} <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default GiftCards;

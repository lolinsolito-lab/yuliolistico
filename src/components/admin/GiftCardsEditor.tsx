import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { GiftVoucher } from '../../types';
import { Edit2, Eye, EyeOff, X, Loader, Plus, Search, Check, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GiftCardsEditor: React.FC = () => {
    const [vouchers, setVouchers] = useState<GiftVoucher[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Edit Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVoucher, setEditingVoucher] = useState<Partial<GiftVoucher> | null>(null);

    useEffect(() => {
        fetchVouchers();
    }, []);

    const fetchVouchers = async () => {
        setLoading(true);
        const { data } = await supabase
            .from('gift_vouchers')
            .select('*')
            .order('order', { ascending: true });

        if (data) setVouchers(data as GiftVoucher[]);
        setLoading(false);
    };

    const handleEditClick = (voucher: GiftVoucher) => {
        setEditingVoucher(voucher);
        setIsModalOpen(true);
    };

    const handleNewVoucher = () => {
        setEditingVoucher({
            title: 'Nuovo Voucher',
            price: '€0',
            description: '',
            color_theme: 'sage',
            is_custom_amount: false,
            cta_text: 'Regala il Rituale',
            active: false,
            order: vouchers.length + 1
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!window.confirm("Sei sicuro di voler eliminare definitivamente questa gift card? L'azione è irreversibile.")) return;

        const { error } = await supabase.from('gift_vouchers').delete().eq('id', id);

        if (!error) {
            fetchVouchers();
        } else {
            alert("Errore nell'eliminazione: " + error.message);
        }
    };

    const handleSave = async () => {
        if (!editingVoucher) return;

        const voucherData = {
            title: editingVoucher.title,
            price: editingVoucher.price,
            description: editingVoucher.description,
            color_theme: editingVoucher.color_theme,
            is_custom_amount: editingVoucher.is_custom_amount,
            cta_text: editingVoucher.cta_text,
            active: editingVoucher.active,
            order: editingVoucher.order
        };

        let result;
        if (editingVoucher.id) {
            result = await supabase
                .from('gift_vouchers')
                .update(voucherData)
                .eq('id', editingVoucher.id);
        } else {
            result = await supabase
                .from('gift_vouchers')
                .insert([voucherData]);
        }

        if (!result.error) {
            setIsModalOpen(false);
            setEditingVoucher(null);
            fetchVouchers();
        } else {
            alert("Errore nel salvataggio: " + result.error.message);
        }
    };

    const toggleActive = async (id: string, currentStatus: boolean, e: React.MouseEvent) => {
        e.stopPropagation();
        await supabase.from('gift_vouchers').update({ active: !currentStatus }).eq('id', id);
        fetchVouchers();
    };

    // Filter Logic
    const filteredVouchers = vouchers.filter(v =>
        v.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Color Theme Mapping for Admin UI
    const getThemeClasses = (theme: string) => {
        switch (theme) {
            case 'dark': return 'bg-[#292524] text-[#faf9f6] border-[#44403c]';
            case 'light': return 'bg-[#f3e9d2] text-[#292524] border-[#d4af37]/30';
            case 'sage': return 'bg-[#849b87] text-white border-[#849b87]/50';
            default: return 'bg-stone-800 text-white border-stone-600';
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-20 text-stone-400 gap-4">
            <Loader className="animate-spin w-8 h-8 text-[#d4af37]" />
            <span className="text-xs uppercase tracking-widest">Caricamento Carte Regalo...</span>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">

            {/* ── TOOLBAR ── */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-stone-100 sticky top-0 z-30">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                        type="text"
                        placeholder="Cerca tra le gift card..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                    />
                </div>
                <button
                    onClick={handleNewVoucher}
                    className="px-6 py-2 bg-[#292524] text-white text-xs uppercase tracking-widest rounded-lg hover:bg-[#d4af37] transition-colors flex items-center gap-2 shadow-lg shadow-stone-200"
                >
                    <Plus className="w-4 h-4" /> Nuova Card
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVouchers.map((voucher) => (
                    <motion.div
                        key={voucher.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                        className={`group relative rounded-2xl overflow-hidden shadow-sm border cursor-pointer flex flex-col ${getThemeClasses(voucher.color_theme)}`}
                        onClick={() => handleEditClick(voucher)}
                    >
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4 z-10">
                            <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider backdrop-blur-md ${voucher.active ? 'bg-green-500/20 text-green-700 border border-green-500/30' : 'bg-red-500/20 text-red-700 border border-red-500/30'
                                }`}>
                                {voucher.active ? 'Online' : 'Nascosto'}
                            </span>
                        </div>

                        {/* Content Body */}
                        <div className="p-8 flex flex-col flex-grow relative">
                            <div className="flex items-center gap-2 mb-4">
                                <Gift className="w-5 h-5 opacity-60" />
                                <span className="text-xs uppercase tracking-[0.2em] opacity-60">L'Arte del Dono</span>
                            </div>
                            
                            <h4 className="font-serif text-2xl mb-2">{voucher.title}</h4>
                            <p className="text-xl mb-4 font-light">{voucher.price}</p>
                            
                            <p className="text-sm line-clamp-3 mb-6 opacity-80 flex-grow font-light">
                                {voucher.description}
                            </p>

                            <button className="px-6 py-3 w-full border border-current opacity-70 rounded-none text-xs tracking-[0.2em] uppercase cursor-not-allowed">
                                {voucher.cta_text}
                            </button>
                            
                            {/* Action Footer overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                                <button
                                    onClick={(e) => toggleActive(voucher.id, voucher.active, e)}
                                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                                    title="Visibilità"
                                >
                                    {voucher.active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={(e) => handleDelete(voucher.id, e)}
                                    className="p-3 bg-red-500/20 hover:bg-red-500/40 rounded-full text-white transition-colors"
                                    title="Elimina"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <button className="px-6 py-2 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2">
                                    <Edit2 className="w-4 h-4" /> Modifica
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── EDIT MODAL ── */}
            <AnimatePresence>
                {isModalOpen && editingVoucher && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#faf9f6] w-full max-w-2xl rounded-2xl shadow-2xl relative z-60 overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-stone-200 bg-white flex justify-between items-center">
                                <div>
                                    <h3 className="font-serif text-2xl text-[#292524]">{editingVoucher.id ? 'Modifica Gift Card' : 'Nuova Gift Card'}</h3>
                                    <p className="text-xs text-stone-500 uppercase tracking-widest mt-1">ID: {editingVoucher.id ? editingVoucher.id.slice(0, 8) + '...' : 'Generazione...'}</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-stone-400" />
                                </button>
                            </div>

                            {/* Modal Body - Scrollable */}
                            <div className="p-8 overflow-y-auto flex-1 space-y-6">

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Titolo</label>
                                        <input
                                            type="text"
                                            value={editingVoucher.title}
                                            onChange={(e) => setEditingVoucher({ ...editingVoucher, title: e.target.value })}
                                            className="w-full p-3 bg-white border border-stone-200 rounded-lg focus:border-[#d4af37] outline-none font-serif text-lg text-[#292524]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Prezzo / Valore</label>
                                        <input
                                            type="text"
                                            value={editingVoucher.price}
                                            onChange={(e) => setEditingVoucher({ ...editingVoucher, price: e.target.value })}
                                            placeholder="es. €80, €120 o Open"
                                            className="w-full p-3 bg-white border border-stone-200 rounded-lg focus:border-[#d4af37] outline-none text-lg text-[#292524]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Descrizione</label>
                                    <textarea
                                        rows={3}
                                        value={editingVoucher.description || ''}
                                        onChange={(e) => setEditingVoucher({ ...editingVoucher, description: e.target.value })}
                                        className="w-full p-3 bg-white border border-stone-200 rounded-lg focus:border-[#d4af37] outline-none text-[#57534e] text-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Tema Colore</label>
                                        <select
                                            value={editingVoucher.color_theme}
                                            onChange={(e) => setEditingVoucher({ ...editingVoucher, color_theme: e.target.value as 'dark' | 'light' | 'sage' })}
                                            className="w-full p-3 bg-white border border-stone-200 rounded-lg focus:border-[#d4af37] outline-none"
                                        >
                                            <option value="dark">Scurissimo (Dark)</option>
                                            <option value="light">Chiaro (Light)</option>
                                            <option value="sage">Salvia (Sage)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Testo Bottone (CTA)</label>
                                        <input
                                            type="text"
                                            value={editingVoucher.cta_text || ''}
                                            onChange={(e) => setEditingVoucher({ ...editingVoucher, cta_text: e.target.value })}
                                            className="w-full p-3 bg-white border border-stone-200 rounded-lg focus:border-[#d4af37] outline-none text-[#57534e]"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-stone-50 border border-stone-200 rounded-lg">
                                    <input 
                                        type="checkbox" 
                                        id="isCustomAmount"
                                        checked={editingVoucher.is_custom_amount}
                                        onChange={(e) => setEditingVoucher({ ...editingVoucher, is_custom_amount: e.target.checked })}
                                        className="w-5 h-5 accent-[#d4af37]"
                                    />
                                    <div>
                                        <label htmlFor="isCustomAmount" className="text-sm font-bold text-[#292524] cursor-pointer block">Importo Libero</label>
                                        <p className="text-xs text-stone-500">Seleziona questa opzione se l'utente deve poter inserire un importo a sua scelta prima di procedere (es. Carta Bianca).</p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="p-6 border-t border-stone-200 bg-white flex justify-end gap-3">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 text-stone-500 hover:bg-stone-50 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors"
                                >
                                    Annulla
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-8 py-3 bg-[#292524] text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#d4af37] transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                                >
                                    <Check className="w-4 h-4" /> Salva Modifiche
                                </button>
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GiftCardsEditor;

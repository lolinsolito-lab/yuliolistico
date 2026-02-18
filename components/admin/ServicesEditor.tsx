import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Service, TreatmentType } from '../../types';
import { Edit2, Eye, EyeOff, Save, X, Loader, Plus, Search, Filter, Check, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ServicesEditor: React.FC = () => {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState<string>('all');

    // Edit Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Partial<Service> | null>(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('order', { ascending: true });

        if (data) setServices(data);
        setLoading(false);
    };

    const handleEditClick = (service: any) => {
        setEditingService(service);
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        if (!editingService || !editingService.id) return;

        // Use pure Supabase update
        const { error } = await supabase
            .from('services')
            .update({
                title: editingService.title,
                price: editingService.price,
                duration: editingService.duration,
                description: editingService.description, // Added description
                category: editingService.category,
                image_url: editingService.imageUrl // handle mapping if needed, but assuming DB uses snake_case and local might use camel. Warning here.
                // Actually, editingService comes from DB so it has snake_case keys if I set it directly?
                // Let's check fetchServices. It returns data with snake_case.
            })
            .eq('id', editingService.id);

        // Fix: The editingService state might have camelCase if I typed it as Service, but fetched data is snake_case.
        // To be safe, let's map it or just use the keys as they are in the EditModal inputs.
        // I will fix this in the Modal logic below.

        if (!error) {
            setIsModalOpen(false);
            setEditingService(null);
            fetchServices();
        } else {
            alert("Errore nel salvataggio: " + error.message);
        }
    };

    const toggleActive = async (id: string, currentStatus: boolean, e: React.MouseEvent) => {
        e.stopPropagation();
        await supabase.from('services').update({ active: !currentStatus }).eq('id', id);
        fetchServices();
    };

    // Filter Logic
    const filteredServices = services.filter(service => {
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-20 text-stone-400 gap-4">
            <Loader className="animate-spin w-8 h-8 text-[#c07a60]" />
            <span className="text-xs uppercase tracking-widest">Caricamento Asset Impero...</span>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* ── TOOLBAR ── */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-stone-100">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                        type="text"
                        placeholder="Cerca un rituale..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-[#c07a60] transition-colors"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm text-[#57534e] focus:outline-none cursor-pointer"
                    >
                        <option value="all">Tutti i Servizi</option>
                        <option value={TreatmentType.MANUAL}>Tecniche Manuali</option>
                        <option value={TreatmentType.TOOLS}>Strumenti Naturali</option>
                        <option value={TreatmentType.RITUAL}>Rituali Luxury</option>
                    </select>

                    <button className="px-4 py-2 bg-[#292524] text-white text-xs uppercase tracking-widest rounded-lg hover:bg-[#c07a60] transition-colors flex items-center gap-2 shadow-lg shadow-stone-200">
                        <Plus className="w-4 h-4" /> Nuovo
                    </button>
                </div>
            </div>

            {/* ── LIST VIEW (Premium) ── */}
            <div className="grid grid-cols-1 gap-4">
                {filteredServices.map((service) => (
                    <div
                        key={service.id}
                        onClick={() => handleEditClick(service)}
                        className="group bg-white p-4 rounded-xl border border-stone-100 hover:border-[#c07a60]/30 hover:shadow-md transition-all cursor-pointer flex items-center gap-6"
                    >
                        {/* Image Thumbnail */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0 relative">
                            <img src={service.image_url} alt={service.title} className="w-full h-full object-cover" />
                            {!service.active && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><EyeOff className="w-4 h-4 text-stone-400" /></div>}
                        </div>

                        {/* Content */}
                        <div className="flex-grow min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-serif text-lg text-[#292524] truncate group-hover:text-[#c07a60] transition-colors">{service.title}</h3>
                                <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-widest font-bold ${service.active ? 'bg-green-50 text-green-600' : 'bg-stone-100 text-stone-400'
                                    }`}>
                                    {service.active ? 'Online' : 'Nascosto'}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-stone-500">
                                <span className="uppercase tracking-wider">{service.category}</span>
                                <span className="w-1 h-1 bg-stone-300 rounded-full" />
                                <span>{service.duration}</span>
                            </div>
                        </div>

                        {/* Price & Actions */}
                        <div className="text-right flex items-center gap-6">
                            <div className="font-serif text-xl text-[#c07a60]">{service.price}</div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => toggleActive(service.id, service.active, e)}
                                    className="p-2 hover:bg-stone-100 rounded-full text-stone-400 hover:text-[#292524]"
                                    title={service.active ? "Nascondi" : "Pubblica"}
                                >
                                    {service.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </button>
                                <div className="p-2 bg-[#faf9f6] rounded-full text-[#292524]">
                                    <Edit2 className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── EDIT MODAL (Overlay) ── */}
            <AnimatePresence>
                {isModalOpen && editingService && (
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
                                    <h3 className="font-serif text-2xl text-[#292524]">Modifica Rituale</h3>
                                    <p className="text-xs text-stone-500 uppercase tracking-widest mt-1">ID: {editingService.id}</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-stone-400" />
                                </button>
                            </div>

                            {/* Modal Body - Scrollable */}
                            <div className="p-8 overflow-y-auto flex-1 space-y-6">

                                {/* Title & Category */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Nome Servizio</label>
                                        <input
                                            type="text"
                                            value={editingService.title}
                                            onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                                            className="w-full p-3 bg-white border border-stone-200 rounded-lg focus:border-[#c07a60] outline-none font-serif text-lg text-[#292524]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Categoria</label>
                                        <select
                                            value={editingService.category}
                                            onChange={(e) => setEditingService({ ...editingService, category: e.target.value as TreatmentType })}
                                            className="w-full p-3 bg-white border border-stone-200 rounded-lg focus:border-[#c07a60] outline-none"
                                        >
                                            <option value={TreatmentType.MANUAL}>Tecniche Manuali</option>
                                            <option value={TreatmentType.TOOLS}>Strumenti Naturali</option>
                                            <option value={TreatmentType.RITUAL}>Rituali Luxury</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Descrizione Esperienza</label>
                                    <textarea
                                        rows={4}
                                        value={editingService.description}
                                        onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                                        className="w-full p-3 bg-white border border-stone-200 rounded-lg focus:border-[#c07a60] outline-none text-[#57534e] leading-relaxed resize-none"
                                    />
                                </div>

                                {/* Price & Duration */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Prezzo (€)</label>
                                        <input
                                            type="text"
                                            value={editingService.price}
                                            onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                                            className="w-full p-3 bg-white border border-stone-200 rounded-lg focus:border-[#c07a60] outline-none font-bold text-[#c07a60]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Durata</label>
                                        <input
                                            type="text"
                                            value={editingService.duration}
                                            onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                                            className="w-full p-3 bg-white border border-stone-200 rounded-lg focus:border-[#c07a60] outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Image URL (Simple input for now, Upload later) */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">URL Immagine</label>
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 rounded bg-stone-100 flex-shrink-0 overflow-hidden border border-stone-200">
                                            <img src={editingService.image_url || editingService.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                        <input
                                            type="text"
                                            value={editingService.image_url || editingService.imageUrl}
                                            onChange={(e) => setEditingService({ ...editingService, image_url: e.target.value, imageUrl: e.target.value })} // Handle both for safety
                                            className="flex-grow p-3 bg-white border border-stone-200 rounded-lg focus:border-[#c07a60] outline-none text-xs text-stone-500 font-mono"
                                        />
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
                                    className="px-8 py-3 bg-[#292524] text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#c07a60] transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
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

export default ServicesEditor;

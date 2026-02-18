import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Service } from '../../types';
import { Edit2, Eye, EyeOff, Save, X, Loader, Plus } from 'lucide-react';

const ServicesEditor: React.FC = () => {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Service>>({});

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
        setEditingId(service.id);
        setEditForm(service);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleSave = async (id: string) => {
        const { error } = await supabase
            .from('services')
            .update(editForm)
            .eq('id', id);

        if (!error) {
            setEditingId(null);
            fetchServices(); // Refresh
        } else {
            alert("Errore nel salvataggio: " + error.message);
        }
    };

    const toggleActive = async (id: string, currentStatus: boolean) => {
        await supabase.from('services').update({ active: !currentStatus }).eq('id', id);
        fetchServices();
    };

    if (loading) return <div className="p-8 text-center text-stone-400">Caricamento listino...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
                <h3 className="font-serif text-xl text-[#292524]">Gestione Servizi</h3>
                <button className="px-4 py-2 bg-[#292524] text-white text-xs uppercase tracking-widest rounded hover:bg-[#c07a60] transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Nuovo Servizio
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-stone-100 text-[#a8a29e] text-[10px] uppercase tracking-widest">
                        <tr>
                            <th className="p-4 font-semibold">Anteprima</th>
                            <th className="p-4 font-semibold">Titolo</th>
                            <th className="p-4 font-semibold">Categoria</th>
                            <th className="p-4 font-semibold">Prezzo</th>
                            <th className="p-4 font-semibold">Durata</th>
                            <th className="p-4 font-semibold text-center">Stato</th>
                            <th className="p-4 font-semibold text-right">Azioni</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-sm text-[#57534e]">
                        {services.map((service) => (
                            <tr key={service.id} className="hover:bg-stone-50 transition-colors">
                                {editingId === service.id ? (
                                    // EDIT MODE ROW
                                    <>
                                        <td className="p-4 opacity-50"><img src={service.image_url} className="w-10 h-10 rounded object-cover" /></td>
                                        <td className="p-4"><input className="border p-1 w-full" value={editForm.title || ''} onChange={e => setEditForm({ ...editForm, title: e.target.value })} /></td>
                                        <td className="p-4 opacity-50">{service.category}</td>
                                        <td className="p-4"><input className="border p-1 w-20" value={editForm.price || ''} onChange={e => setEditForm({ ...editForm, price: e.target.value })} /></td>
                                        <td className="p-4"><input className="border p-1 w-20" value={editForm.duration || ''} onChange={e => setEditForm({ ...editForm, duration: e.target.value })} /></td>
                                        <td className="p-4 text-center opacity-50">Modification...</td>
                                        <td className="p-4 text-right flex justify-end gap-2">
                                            <button onClick={() => handleSave(service.id)} className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200"><Save className="w-4 h-4" /></button>
                                            <button onClick={handleCancelEdit} className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200"><X className="w-4 h-4" /></button>
                                        </td>
                                    </>
                                ) : (
                                    // VIEW MODE ROW
                                    <>
                                        <td className="p-4">
                                            <img src={service.image_url} alt={service.title} className="w-10 h-10 rounded-md object-cover shadow-sm" />
                                        </td>
                                        <td className="p-4 font-serif text-[#292524] font-medium">{service.title}</td>
                                        <td className="p-4 text-xs font-mono uppercase text-stone-400">{service.category}</td>
                                        <td className="p-4 font-bold text-[#c07a60]">{service.price}</td>
                                        <td className="p-4 text-stone-400">{service.duration}</td>
                                        <td className="p-4 text-center">
                                            <button onClick={() => toggleActive(service.id, service.active)} title={service.active ? "Nascondi dal sito" : "Mostra nel sito"}>
                                                {service.active ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-stone-300" />}
                                            </button>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button onClick={() => handleEditClick(service)} className="p-2 hover:bg-stone-200 rounded-full transition-colors text-stone-500 hover:text-[#292524]">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServicesEditor;

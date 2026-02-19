
import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseService';
import { Lead } from '../../types';
import { Loader, Search, Mail, Phone, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const LeadsViewer: React.FC = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false });

            if (data && !error) {
                setLeads(data);
            } else {
                console.error("Fetch Error:", error);
            }
        } catch (error) {
            console.error('Error fetching leads:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredLeads = leads.filter(lead =>
        (lead.name || '').toLowerCase().includes(filter.toLowerCase()) ||
        (lead.email || '').toLowerCase().includes(filter.toLowerCase()) ||
        (lead.result_treatment || '').toLowerCase().includes(filter.toLowerCase())
    );

    if (loading) return <div className="p-10 flex justify-center"><Loader className="animate-spin text-[#c07a60]" /></div>;

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-serif text-[#292524] mb-2">Diagnostic Leads</h2>
                    <p className="text-stone-500 text-sm">Controlla chi ha completato il quiz e necessita di contatto.</p>
                </div>

                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-[#c07a60] transition-colors" />
                    <input
                        type="text"
                        placeholder="Cerca nome, email..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="pl-10 pr-4 py-3 border border-stone-200 rounded-lg outline-none focus:border-[#c07a60] transition-all bg-white shadow-sm w-64 focus:w-80"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#faf9f6] border-b border-stone-100">
                            <tr>
                                <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-[#a8a29e] font-bold">Data & Contatto</th>
                                <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-[#a8a29e] font-bold">Diagnostica</th>
                                <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-[#a8a29e] font-bold text-right">Stato</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 bg-white">
                            {filteredLeads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-stone-50/50 transition-colors group">
                                    <td className="p-6 align-top w-1/3">
                                        <div className="font-serif text-xl text-[#292524] mb-1 group-hover:text-[#c07a60] transition-colors">
                                            {lead.name}
                                        </div>
                                        <div className="text-xs text-stone-400 mb-4 flex items-center gap-2">
                                            <Calendar className="w-3 h-3" />
                                            {lead.created_at ? new Date(lead.created_at).toLocaleDateString('it-IT') : 'N/A'}
                                        </div>
                                        <div className="space-y-1 text-sm text-stone-600">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-3 h-3 text-[#c07a60]" /> {lead.email}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-3 h-3 text-[#c07a60]" /> {lead.phone}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-6 align-top w-1/2">
                                        <div className="bg-stone-50 p-4 rounded-lg border border-stone-100 mb-3">
                                            <span className="text-[10px] uppercase tracking-widest text-stone-400 block mb-1">Input Utente</span>
                                            <p className="text-stone-600 italic text-sm">"{lead.symptom}"</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] uppercase tracking-widest text-[#a8a29e]">Risultato:</span>
                                            <span className="text-[#c07a60] font-bold text-sm tracking-wide bg-[#c07a60]/10 px-2 py-1 rounded">
                                                {lead.result_treatment}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="p-6 align-top text-right w-1/6">
                                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${lead.status === 'new' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-gray-100 text-gray-500'}`}>
                                            <CheckCircle className="w-3 h-3" /> {lead.status || 'NEW'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredLeads.length === 0 && !loading && (
                    <div className="py-20 text-center">
                        <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-6 h-6 text-stone-300" />
                        </div>
                        <h3 className="text-stone-400 font-serif text-lg">Nessun lead trovato</h3>
                        <p className="text-stone-300 text-sm mt-1">Il database attende i primi contatti.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeadsViewer;

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Loader, Upload, FileText, Headphones, Video, BookOpen, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArchiveResource {
    id: string;
    title: string;
    description: string;
    category: string;
    resource_type: string;
    file_url: string;
    thumbnail_url: string;
    is_free: boolean;
    upsell_service: string;
    upsell_text: string;
    requires_email: boolean;
    download_count: number;
    is_published: boolean;
    sort_order: number;
}

const CATEGORIES = [
    { id: 'mindset', label: 'Mindset', color: 'bg-purple-100 text-purple-700' },
    { id: 'body', label: 'Body Intelligence', color: 'bg-emerald-100 text-emerald-700' },
    { id: 'rituals', label: 'Rituals', color: 'bg-amber-100 text-amber-700' },
    { id: 'guides', label: 'Guides', color: 'bg-blue-100 text-blue-700' },
];

const TYPE_ICONS: Record<string, React.ReactNode> = {
    pdf: <FileText className="w-4 h-4" />,
    audio: <Headphones className="w-4 h-4" />,
    video: <Video className="w-4 h-4" />,
    article: <BookOpen className="w-4 h-4" />,
};

const ArchiveEditor: React.FC = () => {
    const [resources, setResources] = useState<ArchiveResource[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState<Partial<ArchiveResource> | null>(null);
    const [saving, setSaving] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');

    useEffect(() => { fetchResources(); }, []);

    const fetchResources = async () => {
        setLoading(true);
        const { data } = await supabase
            .from('archive_resources')
            .select('*')
            .order('sort_order', { ascending: true });
        if (data) setResources(data);
        setLoading(false);
    };

    const handleSave = async () => {
        if (!editing?.title || !editing?.category) return;
        setSaving(true);
        try {
            if (editing.id) {
                const { error } = await supabase.from('archive_resources').update({
                    title: editing.title,
                    description: editing.description,
                    category: editing.category,
                    resource_type: editing.resource_type,
                    file_url: editing.file_url,
                    thumbnail_url: editing.thumbnail_url,
                    is_free: editing.is_free,
                    upsell_service: editing.upsell_service,
                    upsell_text: editing.upsell_text,
                    requires_email: editing.requires_email,
                    sort_order: editing.sort_order,
                    updated_at: new Date().toISOString(),
                }).eq('id', editing.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('archive_resources').insert([{
                    title: editing.title,
                    description: editing.description || '',
                    category: editing.category,
                    resource_type: editing.resource_type || 'pdf',
                    file_url: editing.file_url || '',
                    thumbnail_url: editing.thumbnail_url || '',
                    is_free: editing.is_free ?? true,
                    upsell_service: editing.upsell_service || '',
                    upsell_text: editing.upsell_text || '',
                    requires_email: editing.requires_email ?? true,
                    sort_order: editing.sort_order || resources.length + 1,
                }]);
                if (error) throw error;
            }
            setStatusMsg('Salvato ✓');
            setTimeout(() => setStatusMsg(''), 2000);
            setIsModalOpen(false);
            setEditing(null);
            fetchResources();
        } catch (err: any) {
            setStatusMsg(`Errore: ${err.message}`);
        }
        setSaving(false);
    };

    const togglePublish = async (resource: ArchiveResource) => {
        await supabase.from('archive_resources').update({ is_published: !resource.is_published }).eq('id', resource.id);
        fetchResources();
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Eliminare questa risorsa?')) return;
        await supabase.from('archive_resources').delete().eq('id', id);
        fetchResources();
    };

    const openEdit = (resource?: ArchiveResource) => {
        setEditing(resource || { category: 'guides', resource_type: 'pdf', is_free: true, requires_email: true, sort_order: resources.length + 1 });
        setIsModalOpen(true);
    };

    const filtered = filterCategory === 'all' ? resources : resources.filter(r => r.category === filterCategory);
    const getCategoryStyle = (cat: string) => CATEGORIES.find(c => c.id === cat)?.color || 'bg-stone-100 text-stone-600';

    if (loading) return <div className="flex items-center justify-center p-12"><Loader className="w-6 h-6 animate-spin text-[#c07a60]" /></div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-serif text-[#292524]">L'Archivio</h2>
                    <p className="text-sm text-stone-500">Gestisci risorse gratuite e lead magnet</p>
                </div>
                <button
                    onClick={() => openEdit()}
                    className="flex items-center gap-2 px-4 py-2 bg-[#292524] text-white text-xs uppercase tracking-widest hover:bg-[#d4af37] transition-colors"
                >
                    <Plus className="w-4 h-4" /> Nuova Risorsa
                </button>
            </div>

            {statusMsg && (
                <div className={`text-sm px-4 py-2 rounded ${statusMsg.includes('Errore') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {statusMsg}
                </div>
            )}

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
                <button onClick={() => setFilterCategory('all')} className={`px-3 py-1 text-xs rounded-full transition-all ${filterCategory === 'all' ? 'bg-[#292524] text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>
                    Tutte ({resources.length})
                </button>
                {CATEGORIES.map(cat => {
                    const count = resources.filter(r => r.category === cat.id).length;
                    return (
                        <button key={cat.id} onClick={() => setFilterCategory(cat.id)} className={`px-3 py-1 text-xs rounded-full transition-all ${filterCategory === cat.id ? 'bg-[#292524] text-white' : `${cat.color} hover:opacity-80`}`}>
                            {cat.label} ({count})
                        </button>
                    );
                })}
            </div>

            {/* Resource Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(resource => (
                    <motion.div
                        key={resource.id}
                        layout
                        className="bg-white rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
                    >
                        {resource.thumbnail_url && (
                            <div className="aspect-video bg-stone-100 overflow-hidden">
                                <img src={resource.thumbnail_url} alt={resource.title} className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold uppercase ${getCategoryStyle(resource.category)}`}>
                                    {resource.category}
                                </span>
                                <span className="flex items-center gap-1 text-[10px] text-stone-400 uppercase">
                                    {TYPE_ICONS[resource.resource_type]} {resource.resource_type}
                                </span>
                            </div>
                            <h3 className="font-serif text-lg mb-1 leading-tight">{resource.title}</h3>
                            <p className="text-xs text-stone-500 line-clamp-2 mb-3">{resource.description}</p>

                            {resource.upsell_service && (
                                <div className="text-[10px] text-[#c07a60] font-bold flex items-center gap-1 mb-3">
                                    <ArrowRight className="w-3 h-3" /> Upsell: {resource.upsell_service}
                                </div>
                            )}

                            <div className="flex items-center justify-between border-t border-stone-100 pt-3">
                                <div className="flex items-center gap-1">
                                    <span className={`w-2 h-2 rounded-full ${resource.is_published ? 'bg-green-500' : 'bg-stone-300'}`} />
                                    <span className="text-[10px] text-stone-400">{resource.is_published ? 'Live' : 'Bozza'}</span>
                                    <span className="text-[10px] text-stone-300 ml-2">↓ {resource.download_count}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={() => togglePublish(resource)} className="p-1.5 hover:bg-stone-100 rounded transition-colors" title={resource.is_published ? 'Nascondi' : 'Pubblica'}>
                                        {resource.is_published ? <EyeOff className="w-3.5 h-3.5 text-stone-400" /> : <Eye className="w-3.5 h-3.5 text-green-500" />}
                                    </button>
                                    <button onClick={() => openEdit(resource)} className="p-1.5 hover:bg-stone-100 rounded transition-colors">
                                        <Edit2 className="w-3.5 h-3.5 text-stone-400" />
                                    </button>
                                    <button onClick={() => handleDelete(resource.id)} className="p-1.5 hover:bg-red-50 rounded transition-colors">
                                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {filtered.length === 0 && (
                    <div className="col-span-full text-center py-12">
                        <FileText className="w-12 h-12 text-stone-200 mx-auto mb-3" />
                        <p className="text-stone-400">Nessuna risorsa trovata</p>
                        <button onClick={() => openEdit()} className="mt-3 text-sm text-[#c07a60] hover:underline">+ Crea la prima risorsa</button>
                    </div>
                )}
            </div>

            {/* ── Edit Modal ── */}
            <AnimatePresence>
                {isModalOpen && editing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-serif text-xl">{editing.id ? 'Modifica Risorsa' : 'Nuova Risorsa'}</h3>
                                <button onClick={() => { setIsModalOpen(false); setEditing(null); }}><X className="w-5 h-5 text-stone-400" /></button>
                            </div>

                            <div className="space-y-4">
                                {/* Title */}
                                <div>
                                    <label className="text-xs uppercase tracking-widest text-stone-400 block mb-1">Titolo *</label>
                                    <input value={editing.title || ''} onChange={e => setEditing({ ...editing, title: e.target.value })}
                                        className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-[#d4af37] text-sm" placeholder="Es: 5 Stretching Mattutini" />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="text-xs uppercase tracking-widest text-stone-400 block mb-1">Descrizione</label>
                                    <textarea value={editing.description || ''} onChange={e => setEditing({ ...editing, description: e.target.value })}
                                        rows={2} className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-[#d4af37] text-sm resize-none" />
                                </div>

                                {/* Category + Type Row */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs uppercase tracking-widest text-stone-400 block mb-1">Categoria *</label>
                                        <select value={editing.category || 'guides'} onChange={e => setEditing({ ...editing, category: e.target.value })}
                                            className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-[#d4af37] text-sm bg-white">
                                            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-widest text-stone-400 block mb-1">Tipo</label>
                                        <select value={editing.resource_type || 'pdf'} onChange={e => setEditing({ ...editing, resource_type: e.target.value })}
                                            className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-[#d4af37] text-sm bg-white">
                                            <option value="pdf">PDF</option>
                                            <option value="audio">Audio</option>
                                            <option value="video">Video</option>
                                            <option value="article">Articolo</option>
                                        </select>
                                    </div>
                                </div>

                                {/* File URL + Thumbnail */}
                                <div>
                                    <label className="text-xs uppercase tracking-widest text-stone-400 block mb-1">URL File</label>
                                    <input value={editing.file_url || ''} onChange={e => setEditing({ ...editing, file_url: e.target.value })}
                                        className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-[#d4af37] text-sm" placeholder="https://..." />
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-widest text-stone-400 block mb-1">URL Thumbnail</label>
                                    <input value={editing.thumbnail_url || ''} onChange={e => setEditing({ ...editing, thumbnail_url: e.target.value })}
                                        className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-[#d4af37] text-sm" placeholder="https://..." />
                                </div>

                                {/* Upsell */}
                                <div className="border-t border-stone-100 pt-4">
                                    <label className="text-xs uppercase tracking-widest text-[#c07a60] block mb-2 font-bold">🎯 Upsell (CTA dopo download)</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <input value={editing.upsell_service || ''} onChange={e => setEditing({ ...editing, upsell_service: e.target.value })}
                                            className="px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-[#d4af37] text-sm" placeholder="Servizio (es: Thai Royal Flow)" />
                                        <input value={editing.upsell_text || ''} onChange={e => setEditing({ ...editing, upsell_text: e.target.value })}
                                            className="px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-[#d4af37] text-sm" placeholder="CTA (es: Prenota il Rituale →)" />
                                    </div>
                                </div>

                                {/* Toggles */}
                                <div className="flex flex-wrap gap-4 border-t border-stone-100 pt-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={editing.is_free ?? true} onChange={e => setEditing({ ...editing, is_free: e.target.checked })} className="accent-[#d4af37]" />
                                        <span className="text-sm">Gratuito</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={editing.requires_email ?? true} onChange={e => setEditing({ ...editing, requires_email: e.target.checked })} className="accent-[#d4af37]" />
                                        <span className="text-sm">Richiedi Email</span>
                                    </label>
                                </div>

                                {/* Sort Order */}
                                <div>
                                    <label className="text-xs uppercase tracking-widest text-stone-400 block mb-1">Ordine</label>
                                    <input type="number" value={editing.sort_order || 0} onChange={e => setEditing({ ...editing, sort_order: parseInt(e.target.value) })}
                                        className="w-20 px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-[#d4af37] text-sm" />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-stone-100">
                                <button onClick={() => { setIsModalOpen(false); setEditing(null); }}
                                    className="px-4 py-2 text-sm text-stone-500 hover:text-stone-700">Annulla</button>
                                <button onClick={handleSave} disabled={saving || !editing.title}
                                    className="px-6 py-2 bg-[#292524] text-white text-xs uppercase tracking-widest hover:bg-[#d4af37] transition-colors disabled:opacity-50">
                                    {saving ? 'Salvataggio...' : 'Salva'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ArchiveEditor;

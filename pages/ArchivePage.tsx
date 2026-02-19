import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Headphones, Video, BookOpen, ArrowRight, X, Download, Lock } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

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
}

const TYPE_META: Record<string, { icon: React.ReactNode; label: string }> = {
    pdf: { icon: <FileText className="w-4 h-4" />, label: 'PDF' },
    audio: { icon: <Headphones className="w-4 h-4" />, label: 'Audio' },
    video: { icon: <Video className="w-4 h-4" />, label: 'Video' },
    article: { icon: <BookOpen className="w-4 h-4" />, label: 'Articolo' },
};

const CATEGORY_LABELS: Record<string, string> = {
    mindset: 'Mindset',
    body: 'Body Intelligence',
    rituals: 'Rituals',
    guides: 'Guides',
};

const ArchivePage: React.FC = () => {
    const { openBooking } = useBooking();
    const [resources, setResources] = useState<ArchiveResource[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('all');
    const [emailModal, setEmailModal] = useState<ArchiveResource | null>(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [unlocked, setUnlocked] = useState(false);

    useEffect(() => {
        const fetchResources = async () => {
            const { data } = await supabase
                .from('archive_resources')
                .select('*')
                .eq('is_published', true)
                .order('sort_order', { ascending: true });
            if (data) setResources(data);
            setLoading(false);
        };
        fetchResources();
    }, []);

    const categories = ['all', ...Array.from(new Set(resources.map(r => r.category)))];
    const filtered = activeCategory === 'all' ? resources : resources.filter(r => r.category === activeCategory);

    const handleUnlock = async (resource: ArchiveResource) => {
        if (!resource.requires_email) {
            window.open(resource.file_url, '_blank');
            return;
        }
        setEmailModal(resource);
    };

    const handleSubmitEmail = async () => {
        if (!email || !emailModal) return;
        try {
            // Save as lead
            await supabase.from('leads').insert([{
                name: name || 'Archivio Visitor',
                email,
                phone: '',
                symptom: `Download: ${emailModal.title}`,
                result_treatment: 'archivio_download',
                status: 'archivio_lead'
            }]);

            // Increment download count (best-effort)
            try {
                await supabase.rpc('increment_download_count', { resource_id: emailModal.id });
            } catch {
                // RPC might not exist yet, fail silently
            }

            setUnlocked(true);
            setTimeout(() => {
                if (emailModal.file_url) window.open(emailModal.file_url, '_blank');
                setEmailModal(null);
                setUnlocked(false);
                setEmail('');
                setName('');
            }, 2000);
        } catch {
            // Fail silently, still allow download
            if (emailModal.file_url) window.open(emailModal.file_url, '_blank');
            setEmailModal(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#faf9f6]">
            {/* Hero */}
            <section className="pt-32 pb-16 px-6 bg-[#1c1917] text-[#faf9f6] text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto"
                >
                    <span className="text-[#d4af37] uppercase tracking-[0.3em] text-xs font-bold block mb-4">
                        L'Archivio Olistico
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif mb-4">
                        Saggezza. <span className="italic text-[#d4af37]">Gratis.</span>
                    </h1>
                    <p className="text-white/50 font-light text-lg max-w-xl mx-auto leading-relaxed">
                        Guide, audio e risorse selezionate per iniziare il tuo percorso di ascolto profondo.
                    </p>
                </motion.div>
            </section>

            {/* Category Tabs */}
            <div className="sticky top-[72px] z-30 bg-[#faf9f6] border-b border-stone-200">
                <div className="max-w-5xl mx-auto px-6 py-4 flex gap-3 overflow-x-auto">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 text-xs uppercase tracking-widest font-bold whitespace-nowrap transition-all ${activeCategory === cat
                                ? 'bg-[#292524] text-white'
                                : 'text-stone-500 hover:text-[#292524] bg-white border border-stone-200'
                                }`}
                        >
                            {cat === 'all' ? 'Tutto' : CATEGORY_LABELS[cat] || cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Resources Grid */}
            <section className="py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    {loading ? (
                        <div className="text-center py-20 text-stone-400">Caricamento...</div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-20">
                            <FileText className="w-12 h-12 text-stone-200 mx-auto mb-3" />
                            <p className="text-stone-400">Nuove risorse in arrivo.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((resource, i) => (
                                <motion.div
                                    key={resource.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white border border-stone-100 overflow-hidden group hover:shadow-lg transition-all"
                                >
                                    {/* Thumbnail or Type Badge */}
                                    {resource.thumbnail_url ? (
                                        <div className="aspect-video overflow-hidden relative">
                                            <img src={resource.thumbnail_url} alt={resource.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] uppercase tracking-widest font-bold flex items-center gap-1 text-stone-600">
                                                {TYPE_META[resource.resource_type]?.icon} {TYPE_META[resource.resource_type]?.label}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="aspect-video bg-gradient-to-br from-[#292524] to-[#1c1917] flex items-center justify-center relative">
                                            <div className="text-[#d4af37]/30 scale-150">
                                                {TYPE_META[resource.resource_type]?.icon}
                                            </div>
                                            <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-sm px-2 py-1 text-[10px] uppercase tracking-widest font-bold text-white/60 flex items-center gap-1">
                                                {TYPE_META[resource.resource_type]?.icon} {TYPE_META[resource.resource_type]?.label}
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-5">
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#849b87] font-bold">
                                            {CATEGORY_LABELS[resource.category as keyof typeof CATEGORY_LABELS] || resource.category}
                                        </span>
                                        <h3 className="font-serif text-xl mt-1 mb-2 leading-tight group-hover:text-[#c07a60] transition-colors">
                                            {resource.title}
                                        </h3>
                                        <p className="text-sm text-stone-500 font-light line-clamp-2 mb-4">
                                            {resource.description}
                                        </p>

                                        {/* CTA */}
                                        <button
                                            onClick={() => handleUnlock(resource)}
                                            className="w-full py-3 bg-[#292524] text-white uppercase text-xs tracking-[0.2em] font-bold hover:bg-[#d4af37] transition-colors flex items-center justify-center gap-2"
                                        >
                                            {resource.requires_email ? <Lock className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                                            {resource.is_free ? 'Scarica Gratis' : 'Accedi'}
                                        </button>

                                        {/* Upsell */}
                                        {resource.upsell_text && (
                                            <button
                                                onClick={openBooking}
                                                className="w-full mt-2 py-2 text-[#c07a60] text-xs font-bold flex items-center justify-center gap-1 hover:text-[#292524] transition-colors"
                                            >
                                                {resource.upsell_text} <ArrowRight className="w-3 h-3" />
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── Email Gate Modal ── */}
            <AnimatePresence>
                {emailModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                    >
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEmailModal(null)} />
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative bg-white p-8 max-w-sm w-full z-10 text-center"
                        >
                            <button onClick={() => setEmailModal(null)} className="absolute top-3 right-3 text-stone-400 hover:text-stone-700">
                                <X className="w-5 h-5" />
                            </button>

                            {unlocked ? (
                                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                                    <Download className="w-10 h-10 text-[#d4af37] mx-auto mb-3" />
                                    <h3 className="font-serif text-xl mb-1">Download in corso...</h3>
                                    <p className="text-sm text-stone-500">Grazie per la fiducia ✨</p>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="mb-4">
                                        {TYPE_META[emailModal.resource_type]?.icon && (
                                            <div className="w-12 h-12 bg-[#f3e9d2] rounded-full flex items-center justify-center mx-auto mb-3 text-[#c07a60]">
                                                {TYPE_META[emailModal.resource_type]?.icon}
                                            </div>
                                        )}
                                        <h3 className="font-serif text-lg mb-1">{emailModal.title}</h3>
                                        <p className="text-xs text-stone-400">Inserisci la tua email per il download gratuito</p>
                                    </div>

                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            placeholder="Il tuo nome"
                                            className="w-full py-3 px-4 border border-stone-200 text-sm focus:outline-none focus:border-[#d4af37]"
                                        />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            placeholder="la.tua@email.com"
                                            className="w-full py-3 px-4 border border-stone-200 text-sm focus:outline-none focus:border-[#d4af37]"
                                        />
                                        <button
                                            onClick={handleSubmitEmail}
                                            disabled={!email}
                                            className="w-full py-3 bg-[#292524] text-white uppercase text-xs tracking-[0.2em] font-bold hover:bg-[#d4af37] transition-colors disabled:opacity-40"
                                        >
                                            Scarica Ora
                                        </button>
                                    </div>
                                    <p className="mt-3 text-[10px] text-stone-300">Nessuno spam. Mai.</p>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ArchivePage;

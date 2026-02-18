import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { Save, Loader, AlertCircle, Check } from 'lucide-react';

const PhilosophyEditor: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [content, setContent] = useState({
        badgeText: '',
        titleLine1: '',
        titleLine2: '',
        text1: '',
        quote: '',
        text2: '',
        imageOverlayQuote: '',
        imageOverlayAuthor: '',
        imageUrl: ''
    });

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('site_content')
            .select('content')
            .eq('section', 'philosophy')
            .single();

        if (error) {
            console.warn('Philosophy content not found, using defaults.');
        } else if (data) {
            setContent(data.content);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);

        const { error } = await supabase
            .from('site_content')
            .upsert({
                section: 'philosophy',
                content: content,
                last_updated: new Date().toISOString()
            });

        if (error) {
            setMessage({ type: 'error', text: 'Errore nel salvataggio.' });
        } else {
            setMessage({ type: 'success', text: 'Filosofia aggiornata con successo!' });
        }
        setSaving(false);
    };

    if (loading) return <div className="flex justify-center p-12"><Loader className="animate-spin text-[#c07a60]" /></div>;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-2xl text-[#292524]">Modifica Filosofia</h3>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2 bg-[#292524] text-[#f3e9d2] rounded-lg hover:bg-black transition-all disabled:opacity-50"
                >
                    {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
                    {saving ? 'Salvataggio...' : 'Salva Modifiche'}
                </button>
            </div>

            {message && (
                <div className={`p-4 rounded-lg flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#c07a60] border-b pb-2">Testi Principali</h4>

                    <div>
                        <label className="block text-xs font-bold text-stone-500 mb-1">Badge (es. Il Manifesto 2026)</label>
                        <input
                            type="text"
                            value={content.badgeText}
                            onChange={e => setContent({ ...content, badgeText: e.target.value })}
                            className="w-full p-2 border border-stone-200 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-stone-500 mb-1">Titolo Riga 1</label>
                        <input
                            type="text"
                            value={content.titleLine1}
                            onChange={e => setContent({ ...content, titleLine1: e.target.value })}
                            className="w-full p-2 border border-stone-200 rounded-md font-serif text-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-stone-500 mb-1">Titolo Riga 2 (Highlight)</label>
                        <input
                            type="text"
                            value={content.titleLine2}
                            onChange={e => setContent({ ...content, titleLine2: e.target.value })}
                            className="w-full p-2 border border-stone-200 rounded-md font-serif text-lg text-[#d4af37]"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-stone-500 mb-1">Paragrafo Intro</label>
                        <textarea
                            value={content.text1}
                            onChange={e => setContent({ ...content, text1: e.target.value })}
                            className="w-full p-2 border border-stone-200 rounded-md h-24"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-stone-500 mb-1">Citazione Centrale</label>
                        <textarea
                            value={content.quote}
                            onChange={e => setContent({ ...content, quote: e.target.value })}
                            className="w-full p-2 border border-stone-200 rounded-md italic h-20 border-l-4 border-l-[#d4af37]"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-stone-500 mb-1">Paragrafo Finale</label>
                        <textarea
                            value={content.text2}
                            onChange={e => setContent({ ...content, text2: e.target.value })}
                            className="w-full p-2 border border-stone-200 rounded-md h-24"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#c07a60] border-b pb-2">Immagine & Overlay</h4>

                    <div>
                        <label className="block text-xs font-bold text-stone-500 mb-1">URL Immagine</label>
                        <input
                            type="text"
                            value={content.imageUrl}
                            onChange={e => setContent({ ...content, imageUrl: e.target.value })}
                            className="w-full p-2 border border-stone-200 rounded-md"
                        />
                        {content.imageUrl && (
                            <div className="mt-2 h-40 w-full rounded-lg overflow-hidden bg-stone-100 relative">
                                <img src={content.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>

                    <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                        <label className="block text-xs font-bold text-stone-500 mb-2">Overlay Glass Card</label>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-[10px] text-stone-400">Citazione</label>
                                <input
                                    type="text"
                                    value={content.imageOverlayQuote}
                                    onChange={e => setContent({ ...content, imageOverlayQuote: e.target.value })}
                                    className="w-full p-2 border border-stone-200 rounded-md text-sm italic"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] text-stone-400">Autore</label>
                                <input
                                    type="text"
                                    value={content.imageOverlayAuthor}
                                    onChange={e => setContent({ ...content, imageOverlayAuthor: e.target.value })}
                                    className="w-full p-2 border border-stone-200 rounded-md text-sm font-bold uppercase"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhilosophyEditor;

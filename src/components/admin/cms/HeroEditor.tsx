import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { Save, Loader, AlertCircle, Check } from 'lucide-react';

const HeroEditor: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [content, setContent] = useState({
        title: '',
        subtitle: '',
        backgroundImage: '',
        tickerPhrases: [] as string[]
    });

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('site_content')
            .select('content')
            .eq('section', 'hero')
            .single();

        if (error) {
            console.warn('Hero content not found, using defaults.');
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
                section: 'hero',
                content: content,
                last_updated: new Date().toISOString()
            });

        if (error) {
            setMessage({ type: 'error', text: 'Errore nel salvataggio.' });
        } else {
            setMessage({ type: 'success', text: 'Hero aggiornato con successo!' });
        }
        setSaving(false);
    };

    const handlePhraseChange = (index: number, value: string) => {
        const newPhrases = [...content.tickerPhrases];
        newPhrases[index] = value;
        setContent({ ...content, tickerPhrases: newPhrases });
    };

    if (loading) return <div className="flex justify-center p-12"><Loader className="animate-spin text-[#c07a60]" /></div>;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-2xl text-[#292524]">Modifica Hero Section</h3>
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

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Titolo Principale</label>
                    <textarea
                        value={content.title}
                        onChange={e => setContent({ ...content, title: e.target.value })}
                        className="w-full p-4 border border-stone-200 rounded-lg font-serif text-3xl focus:ring-2 focus:ring-[#c07a60] focus:border-transparent"
                        rows={2}
                        placeholder="NON È PER TUTTI."
                    />
                    <p className="text-xs text-stone-400 mt-1">Usa &lt;br /&gt; per andare a capo.</p>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Sottotitolo</label>
                    <textarea
                        value={content.subtitle}
                        onChange={e => setContent({ ...content, subtitle: e.target.value })}
                        className="w-full p-4 border border-stone-200 rounded-lg text-lg focus:ring-2 focus:ring-[#c07a60] focus:border-transparent"
                        rows={3}
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">URL Immagine di Sfondo</label>
                    <input
                        type="text"
                        value={content.backgroundImage}
                        onChange={e => setContent({ ...content, backgroundImage: e.target.value })}
                        className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-[#c07a60] focus:border-transparent"
                    />
                    {content.backgroundImage && (
                        <div className="mt-2 h-32 w-full rounded-lg overflow-hidden bg-stone-100">
                            <img src={content.backgroundImage} alt="Preview" className="w-full h-full object-cover opacity-50" />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Frasi Scorrevoli (Ticker)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {content.tickerPhrases.map((phrase, i) => (
                            <input
                                key={i}
                                type="text"
                                value={phrase}
                                onChange={e => handlePhraseChange(i, e.target.value)}
                                className="w-full p-2 border border-stone-200 rounded-md text-sm focus:ring-1 focus:ring-[#c07a60]"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroEditor;

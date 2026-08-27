import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Mail, Save, Loader, Eye, ArrowLeft, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmailTemplate {
    source: string;
    subject: string;
    body_content: string;
    updated_at: string;
}

const fakeData: Record<string, string> = {
    '{{name}}': 'Laura Bianchi',
    '{{companyName}}': 'Yuli Olistico',
    '{{title}}': 'Rituale del Sonno Profondo',
    '{{treatment}}': 'Massaggio Olistico Rilassante',
    '{{fileUrl}}': 'https://yuliolistico.com/download/file.pdf'
};

const wrapPreviewHtml = (content: string) => {
    return `
    <div style="font-family: 'Georgia', serif; background-color: #faf9f6; color: #292524; line-height: 1.6; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-top: 4px solid #c07a60;">
            <div style="font-size: 16px; margin-bottom: 30px;">
                ${content.replace(/\n/g, '<br/>')}
            </div>
            <div style="border-top: 1px solid #e7e5e4; padding-top: 20px; font-size: 12px; color: #a8a29e; text-align: center; font-family: 'Helvetica', sans-serif;">
                <p>Ricevi questa email perché hai interagito con Yuli Olistico.</p>
                <p>Per non ricevere più comunicazioni promozionali, puoi <a href="#" style="color: #c07a60;">disiscriverti qui</a>.</p>
            </div>
        </div>
    </div>
    `;
};

const sourceLabels: Record<string, string> = {
    'archive': 'Archivio / Lead Magnet',
    'academy': 'Iscrizione Academy',
    'quiz': 'Risultato Quiz',
    'newsletter': 'Iscrizione Newsletter'
};

const EmailTemplatesEditor: React.FC = () => {
    const [templates, setTemplates] = useState<EmailTemplate[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('email_templates')
            .select('*')
            .order('source', { ascending: true });

        if (data && !error) {
            setTemplates(data);
        } else {
            console.error("Error fetching templates:", error);
        }
        setLoading(false);
    };

    const handleSelect = (tmpl: EmailTemplate) => {
        setSelectedTemplate({ ...tmpl });
        setMessage('');
        setShowPreview(false);
    };

    const handleSave = async () => {
        if (!selectedTemplate) return;
        setSaving(true);
        setMessage('');

        const { error } = await supabase
            .from('email_templates')
            .update({
                subject: selectedTemplate.subject,
                body_content: selectedTemplate.body_content,
                updated_at: new Date().toISOString()
            })
            .eq('source', selectedTemplate.source);

        setSaving(false);
        if (error) {
            setMessage('Errore durante il salvataggio.');
            console.error(error);
        } else {
            setMessage('Salvato con successo!');
            // Aggiorniamo la lista locale
            setTemplates(templates.map(t => t.source === selectedTemplate.source ? selectedTemplate : t));
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const generatePreviewHTML = () => {
        if (!selectedTemplate) return '';
        let html = selectedTemplate.body_content;
        Object.keys(fakeData).forEach(key => {
            html = html.replace(new RegExp(key, 'g'), fakeData[key]);
        });
        return wrapPreviewHtml(html);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader className="w-8 h-8 animate-spin text-[#c07a60]" />
            </div>
        );
    }

    if (!selectedTemplate) {
        return (
            <div>
                <div className="flex items-center gap-3 mb-8">
                    <Mail className="w-6 h-6 text-[#c07a60]" />
                    <h2 className="text-2xl font-serif text-[#292524]">Template Email</h2>
                </div>
                
                <p className="text-stone-500 mb-6">
                    Questi testi verranno usati dal sistema automatico. Scegli un template per modificarlo.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {templates.map(tmpl => (
                        <div 
                            key={tmpl.source} 
                            onClick={() => handleSelect(tmpl)}
                            className="bg-white p-6 border border-stone-200 rounded-xl hover:shadow-md cursor-pointer transition-all hover:border-[#c07a60]/30 group"
                        >
                            <div className="text-xs uppercase tracking-widest text-[#a8a29e] mb-2">{tmpl.source}</div>
                            <h3 className="font-serif text-xl text-[#292524] mb-2">{sourceLabels[tmpl.source] || tmpl.source}</h3>
                            <p className="text-sm text-stone-500 truncate mb-4">Oggetto: {tmpl.subject}</p>
                            <div className="text-xs text-[#c07a60] font-bold group-hover:translate-x-1 transition-transform inline-block">
                                → Modifica Testo
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => setSelectedTemplate(null)} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-stone-600" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-serif text-[#292524]">
                            {sourceLabels[selectedTemplate.source] || selectedTemplate.source}
                        </h2>
                        <p className="text-xs text-stone-500 uppercase tracking-widest mt-1">ID: {selectedTemplate.source}</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setShowPreview(!showPreview)} 
                        className="flex items-center gap-2 px-4 py-2 border border-stone-300 rounded hover:bg-stone-100 text-sm font-bold uppercase tracking-widest transition-colors"
                    >
                        <Eye className="w-4 h-4" /> {showPreview ? 'Chiudi Anteprima' : 'Anteprima'}
                    </button>
                    <button 
                        onClick={handleSave} 
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2 bg-[#292524] text-white rounded hover:bg-[#c07a60] text-sm font-bold uppercase tracking-widest disabled:opacity-50 transition-colors"
                    >
                        {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Salva
                    </button>
                </div>
            </div>

            {message && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg text-sm flex items-center gap-2 border border-green-200">
                    <Info className="w-4 h-4" /> {message}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Editor Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 border border-stone-200 rounded-xl shadow-sm">
                        <label className="block text-xs uppercase tracking-widest text-[#a8a29e] mb-2 font-bold">Oggetto dell'email</label>
                        <input 
                            type="text" 
                            value={selectedTemplate.subject}
                            onChange={(e) => setSelectedTemplate({...selectedTemplate, subject: e.target.value})}
                            className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded focus:outline-none focus:border-[#c07a60] font-medium text-stone-800"
                        />
                    </div>

                    <div className="bg-white p-6 border border-stone-200 rounded-xl shadow-sm">
                        <label className="block text-xs uppercase tracking-widest text-[#a8a29e] mb-2 font-bold">Corpo del Messaggio</label>
                        <p className="text-xs text-stone-500 mb-4">
                            Scrivi qui il tuo messaggio in testo normale. Per andare a capo premi Invio. <br/>
                            L'intestazione, il logo e le note legali (unsubscribe) verranno aggiunte automaticamente.
                        </p>
                        <textarea 
                            value={selectedTemplate.body_content}
                            onChange={(e) => setSelectedTemplate({...selectedTemplate, body_content: e.target.value})}
                            className="w-full h-96 bg-stone-50 border border-stone-200 px-4 py-3 rounded focus:outline-none focus:border-[#c07a60] font-sans text-stone-800 resize-y"
                        />
                    </div>
                </div>

                {/* Right Column: Legenda Segnaposto & Preview */}
                <div className="space-y-6">
                    <div className="bg-[#faf9f6] p-6 border border-[#c07a60]/20 rounded-xl">
                        <h4 className="text-sm font-bold text-[#292524] uppercase tracking-widest mb-4">Segnaposti Speciali</h4>
                        <p className="text-xs text-stone-600 mb-4">
                            Puoi usare questi codici nel testo e nell'oggetto. Verranno sostituiti in automatico con i dati reali del cliente.
                        </p>
                        <ul className="space-y-3">
                            <li className="text-sm border-b border-stone-200 pb-2">
                                <code className="bg-white px-2 py-1 border border-stone-200 rounded text-[#c07a60] font-mono text-xs">{{name}}</code>
                                <div className="text-xs text-stone-500 mt-1">Nome del cliente (es: Laura)</div>
                            </li>
                            <li className="text-sm border-b border-stone-200 pb-2">
                                <code className="bg-white px-2 py-1 border border-stone-200 rounded text-[#c07a60] font-mono text-xs">{{companyName}}</code>
                                <div className="text-xs text-stone-500 mt-1">Nome del tuo brand</div>
                            </li>
                            {selectedTemplate.source === 'quiz' && (
                                <li className="text-sm border-b border-stone-200 pb-2">
                                    <code className="bg-white px-2 py-1 border border-stone-200 rounded text-[#c07a60] font-mono text-xs">{{treatment}}</code>
                                    <div className="text-xs text-stone-500 mt-1">Rituale consigliato dal quiz</div>
                                </li>
                            )}
                            {selectedTemplate.source === 'archive' && (
                                <>
                                <li className="text-sm border-b border-stone-200 pb-2">
                                    <code className="bg-white px-2 py-1 border border-stone-200 rounded text-[#c07a60] font-mono text-xs">{{title}}</code>
                                    <div className="text-xs text-stone-500 mt-1">Titolo del PDF richiesto</div>
                                </li>
                                <li className="text-sm">
                                    <code className="bg-white px-2 py-1 border border-stone-200 rounded text-[#c07a60] font-mono text-xs">{{fileUrl}}</code>
                                    <div className="text-xs text-stone-500 mt-1">Link diretto per scaricare il PDF</div>
                                </li>
                                </>
                            )}
                        </ul>
                    </div>

                    <AnimatePresence>
                        {showPreview && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="bg-white border border-stone-200 shadow-xl rounded-xl overflow-hidden sticky top-32"
                            >
                                <div className="bg-[#292524] text-white p-3 text-xs uppercase tracking-widest font-bold flex items-center justify-between">
                                    <span>Anteprima Email</span>
                                </div>
                                <div className="p-4 bg-stone-100 border-b border-stone-200">
                                    <div className="text-xs text-stone-500 mb-1">Oggetto:</div>
                                    <div className="font-bold text-[#292524]">
                                        {selectedTemplate.subject
                                            .replace(/\{\{name\}\}/g, fakeData['{{name}}'])
                                            .replace(/\{\{title\}\}/g, fakeData['{{title}}'])
                                            .replace(/\{\{companyName\}\}/g, fakeData['{{companyName}}'])
                                        }
                                    </div>
                                </div>
                                {/* Inject raw HTML wrapper per mostrare esattamente come arriva l'email */}
                                <div dangerouslySetInnerHTML={{ __html: generatePreviewHTML() }} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default EmailTemplatesEditor;

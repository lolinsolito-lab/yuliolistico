import React, { useState } from 'react';
import { Construction, Sparkles, BrainCircuit, Droplets, Wind, Mountain, Zap, Plus, X, Save } from 'lucide-react';
import { RULES as initialRules, PRESCRIPTIONS as initialPrescriptions, Archetype } from '../../services/diagnosticEngine';

const QuizConfig: React.FC = () => {

    // Local State for Editing (Deep Copy to avoid mutating imports directly)
    const [rules, setRules] = useState(JSON.parse(JSON.stringify(initialRules)));
    const [prescriptions, setPrescriptions] = useState(JSON.parse(JSON.stringify(initialPrescriptions)));
    const [activeTab, setActiveTab] = useState<'RULES' | 'SOLUTIONS'>('RULES');
    const [showSaveSuccess, setShowSaveSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Load Data on Mount
    React.useEffect(() => {
        const loadData = async () => {
            const config = await import('../../services/diagnosticEngine').then(m => m.fetchQuizConfig());
            if (config) {
                setRules(JSON.parse(JSON.stringify(config.rules)));
                setPrescriptions(JSON.parse(JSON.stringify(config.prescriptions)));
            }
            setIsLoading(false);
        };
        loadData();
    }, []);

    // Handlers for Rules (Keywords)
    const handleAddKeyword = (archetypeIndex: number) => {
        const newRules = [...rules];
        newRules[archetypeIndex].keywords.push("nuova_parola");
        setRules(newRules);
    };

    const handleRemoveKeyword = (archetypeIndex: number, keywordIndex: number) => {
        const newRules = [...rules];
        newRules[archetypeIndex].keywords.splice(keywordIndex, 1);
        setRules(newRules);
    };

    const handleKeywordChange = (archetypeIndex: number, keywordIndex: number, value: string) => {
        const newRules = [...rules];
        newRules[archetypeIndex].keywords[keywordIndex] = value.toLowerCase();
        setRules(newRules);
    };

    // Handlers for Prescriptions (Solutions)
    const handlePrescriptionChange = (archetype: Archetype, index: number, field: string, value: string) => {
        const newPrescriptions = { ...prescriptions };
        newPrescriptions[archetype][index][field] = value;
        setPrescriptions(newPrescriptions);
    };

    const handleSave = async () => {
        console.log("Saving Configuration...", { rules, prescriptions });

        // Dynamic Import to avoid circular dependencies if any, though here it's fine
        const { saveQuizConfig } = await import('../../services/diagnosticEngine');

        const result = await saveQuizConfig(rules, prescriptions);

        if (result.success) {
            setShowSaveSuccess(true);
            setTimeout(() => setShowSaveSuccess(false), 3000);
        } else {
            alert("Errore durante il salvataggio: " + JSON.stringify(result.error));
        }
    };

    const getIcon = (type: Archetype) => {
        switch (type) {
            case 'PIETRA': return <Mountain className="w-6 h-6 text-stone-600" />;
            case 'RUMORE_BIANCO': return <Wind className="w-6 h-6 text-sky-400" />;
            case 'ACQUA_FERMA': return <Droplets className="w-6 h-6 text-blue-500" />;
            case 'ESAURIMENTO': return <Zap className="w-6 h-6 text-red-500" />;
        }
    };

    const getLabel = (type: Archetype) => {
        switch (type) {
            case 'PIETRA': return "Pietra (Tensione)";
            case 'RUMORE_BIANCO': return "Rumore Bianco (Mente)";
            case 'ACQUA_FERMA': return "Acqua Ferma (Ristagno)";
            case 'ESAURIMENTO': return "Esaurimento (Burnout)";
        }
    };



    return (
        <div className="max-w-6xl mx-auto pb-40">
            {/* Header Sticky */}
            <div className="sticky top-0 z-30 bg-[#faf9f6]/95 backdrop-blur-sm py-8 border-b border-stone-200 mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-serif text-[#292524] mb-1">Configurazione Motore (God Mode)</h2>
                    <p className="text-stone-500 text-sm">Controlla la logica neurale dell'AI.</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex bg-white rounded-full p-1 border border-stone-200">
                        <button
                            onClick={() => setActiveTab('RULES')}
                            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'RULES' ? 'bg-[#292524] text-white shadow-md' : 'text-stone-400 hover:text-[#292524]'}`}
                        >
                            Trigger (Keywords)
                        </button>
                        <button
                            onClick={() => setActiveTab('SOLUTIONS')}
                            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'SOLUTIONS' ? 'bg-[#c07a60] text-white shadow-md' : 'text-stone-400 hover:text-[#c07a60]'}`}
                        >
                            Soluzioni (Output)
                        </button>
                    </div>
                    <button
                        onClick={handleSave}
                        className="bg-green-600 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-green-700 transition-colors shadow-lg hover:shadow-green-200"
                    >
                        <Save className="w-4 h-4" /> Salva Configurazione
                    </button>
                </div>
            </div>

            {/* Success Toast */}
            {showSaveSuccess && (
                <div className="fixed bottom-10 right-10 bg-[#292524] text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
                    <Sparkles className="w-5 h-5 text-green-400" />
                    <div>
                        <div className="font-bold text-sm">Configurazione Salvata</div>
                        <div className="text-xs text-stone-400">Il cervello di Yuli è stato aggiornato.</div>
                    </div>
                </div>
            )}

            {/* ERROR / INFO Alert if no DB */}
            {!isLoading && (
                <div className="mb-8 bg-emerald-50 border border-emerald-200 p-4 rounded-lg flex gap-3 text-emerald-800 text-sm">
                    <Sparkles className="w-5 h-5 flex-shrink-0" />
                    <div>
                        <strong>God Mode Attiva.</strong> Le modifiche vengono salvate nel database in tempo reale.
                        Il cervello di Yuli si aggiornerà istantaneamente per tutti gli utenti.
                    </div>
                </div>
            )}

            {/* Content Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* RULES TAB */}
                {activeTab === 'RULES' && rules.map((rule: any, idx: number) => (
                    <div key={rule.archetype} className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden group hover:border-[#292524]/20 transition-colors">
                        {/* Header */}
                        <div className="bg-[#faf9f6] p-6 border-b border-stone-100 flex items-center gap-4">
                            <div className="bg-white p-3 rounded-full shadow-sm">
                                {getIcon(rule.archetype)}
                            </div>
                            <div>
                                <h3 className="font-serif text-xl text-[#292524]">{getLabel(rule.archetype)}</h3>
                                <p className="text-xs text-stone-400 uppercase tracking-widest">Peso Neurale: {rule.priority}</p>
                            </div>
                        </div>

                        {/* Keywords Editor */}
                        <div className="p-6">
                            <div className="text-xs text-[#a8a29e] uppercase tracking-widest mb-4 flex items-center justify-between">
                                <span className="flex items-center gap-2"><BrainCircuit className="w-3 h-3" /> Parole Chiave (Trigger)</span>
                                <button onClick={() => handleAddKeyword(idx)} className="text-[#c07a60] hover:bg-[#c07a60]/10 p-1 rounded transition-colors"><Plus className="w-4 h-4" /></button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {rule.keywords.map((k: string, kIdx: number) => (
                                    <div key={kIdx} className="relative group/tag">
                                        <input
                                            value={k}
                                            onChange={(e) => handleKeywordChange(idx, kIdx, e.target.value)}
                                            className="px-3 py-1 bg-white text-stone-600 rounded-md text-sm border border-stone-200 focus:border-[#c07a60] focus:ring-1 focus:ring-[#c07a60] outline-none min-w-[60px]"
                                        />
                                        <button
                                            onClick={() => handleRemoveKeyword(idx, kIdx)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover/tag:opacity-100 transition-opacity transform scale-75 hover:scale-100"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                {/* SOLUTIONS TAB */}
                {activeTab === 'SOLUTIONS' && Object.keys(prescriptions).map((key) => {
                    const archetype = key as Archetype;
                    return (
                        <div key={archetype} className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden col-span-2">
                            <div className="bg-[#faf9f6]/50 p-4 border-b border-stone-100 flex items-center gap-2">
                                {getIcon(archetype)}
                                <span className="font-serif text-lg text-[#292524]">{getLabel(archetype)}</span>
                            </div>

                            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {prescriptions[archetype].map((p: any, pIdx: number) => (
                                    <div key={pIdx} className="bg-stone-50/50 p-6 rounded-lg border border-stone-100 relative hover:bg-white hover:shadow-md transition-all">
                                        <div className="absolute top-2 right-2 text-xs text-stone-300 font-bold">VARIANTE {pIdx + 1}</div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs uppercase tracking-widest text-[#a8a29e] mb-1">Nome Rituale</label>
                                                <input
                                                    value={p.treatment}
                                                    onChange={(e) => handlePrescriptionChange(archetype, pIdx, 'treatment', e.target.value)}
                                                    className="w-full bg-white px-3 py-2 border border-stone-200 rounded-md font-serif text-[#c07a60] text-lg outline-none focus:border-[#c07a60]"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs uppercase tracking-widest text-[#a8a29e] mb-1">Motivazione (Reasoning)</label>
                                                <textarea
                                                    value={p.reasoning}
                                                    onChange={(e) => handlePrescriptionChange(archetype, pIdx, 'reasoning', e.target.value)}
                                                    className="w-full bg-white px-3 py-2 border border-stone-200 rounded-md text-sm text-stone-500 italic min-h-[80px] outline-none focus:border-[#c07a60] resize-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs uppercase tracking-widest text-[#a8a29e] mb-1">Cocktail Olfattivo</label>
                                                <div className="relative">
                                                    <Droplets className="absolute top-2.5 left-3 w-4 h-4 text-stone-400" />
                                                    <input
                                                        value={p.oilRecommendation}
                                                        onChange={(e) => handlePrescriptionChange(archetype, pIdx, 'oilRecommendation', e.target.value)}
                                                        className="w-full bg-white pl-10 pr-3 py-2 border border-stone-200 rounded-md text-sm font-bold text-stone-600 outline-none focus:border-[#c07a60]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
};

export default QuizConfig;

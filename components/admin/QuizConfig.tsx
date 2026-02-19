
import React from 'react';
import { Construction, Sparkles } from 'lucide-react';

const QuizConfig: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-serif text-[#292524] mb-2">Configurazione Quiz</h2>
                <p className="text-stone-500">Gestisci la logica del Diagnostic Engine e le risposte automatiche.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-12 text-center">
                <div className="w-20 h-20 bg-[#faf9f6] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8 text-[#c07a60]" />
                </div>
                <h3 className="font-serif text-2xl mb-4">Motore Diagnostico Attivo</h3>
                <p className="text-stone-500 max-w-md mx-auto mb-8">
                    La logica a "4 Archetipi" (Pietra, Rumore, Acqua, Esaurimento) è attualmente hardcoded nel sistema per massima velocità.
                    <br /><br />
                    In futuro, qui potrai modificare i punteggi delle parole chiave e i testi delle risposte senza toccare il codice.
                </p>
                <div className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-100 text-stone-400 rounded-full text-sm font-bold uppercase tracking-widest cursor-not-allowed">
                    <Construction className="w-4 h-4" /> Modulo in Arrivo (Fase 2)
                </div>
            </div>
        </div>
    );
};

export default QuizConfig;

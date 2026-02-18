
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, FileText, Lock, Plus } from 'lucide-react';

const AcademyEditor: React.FC = () => {
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-serif text-[#292524] mb-2">Academy Manager</h1>
                    <p className="text-[#57534e]">Gestisci i corsi, le guide PDF e i contenuti educativi.</p>
                </div>
                <button className="flex items-center gap-2 bg-[#292524] text-white px-6 py-3 rounded-lg hover:bg-[#44403c] transition-colors">
                    <Plus className="w-4 h-4" /> Nuovo Corso
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Module Card Placeholder 1 */}
                <div className="group relative bg-white border border-[#292524]/10 rounded-xl overflow-hidden hover:shadow-xl transition-all p-6 cursor-pointer">
                    <div className="absolute top-4 right-4 p-2 bg-[#f3e9d2] rounded-full text-[#c07a60]">
                        <Video className="w-4 h-4" />
                    </div>
                    <div className="w-12 h-12 bg-[#292524] rounded-lg flex items-center justify-center text-[#d4af37] mb-6">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-serif text-[#292524] mb-2">I Fondamenti del Tocco</h3>
                    <p className="text-sm text-[#a8a29e] mb-4">Video Corso • 12 Moduli</p>
                    <div className="w-full bg-[#f5f5f4] h-2 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-[#849b87]"></div>
                    </div>
                    <p className="text-xs text-[#57534e] mt-2 text-right">Draft</p>
                </div>

                {/* Module Card Placeholder 2 */}
                <div className="group relative bg-white border border-[#292524]/10 rounded-xl overflow-hidden hover:shadow-xl transition-all p-6 cursor-pointer">
                    <div className="absolute top-4 right-4 p-2 bg-[#f3e9d2] rounded-full text-[#c07a60]">
                        <FileText className="w-4 h-4" />
                    </div>
                    <div className="w-12 h-12 bg-[#292524] rounded-lg flex items-center justify-center text-[#d4af37] mb-6">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-serif text-[#292524] mb-2">Anatomia Energetica</h3>
                    <p className="text-sm text-[#a8a29e] mb-4">PDF Guide • 45 Pagine</p>
                    <div className="w-full bg-[#f5f5f4] h-2 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-[#c07a60]"></div>
                    </div>
                    <p className="text-xs text-[#57534e] mt-2 text-right">Published</p>
                </div>

                {/* Add New Placeholder */}
                <div className="border-2 border-dashed border-[#292524]/20 rounded-xl flex flex-col items-center justify-center p-6 text-[#a8a29e] hover:border-[#c07a60] hover:text-[#c07a60] transition-colors cursor-pointer min-h-[250px]">
                    <Plus className="w-8 h-8 mb-2" />
                    <span className="text-sm font-bold uppercase tracking-widest">Crea Contenuto</span>
                </div>

            </div>

            <div className="mt-16 bg-[#1c1917] p-8 rounded-2xl relative overflow-hidden text-[#faf9f6]">
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <Lock className="w-6 h-6 text-[#d4af37]" />
                        <h3 className="text-2xl font-serif">Area Riservata Studenti</h3>
                    </div>
                    <p className="text-white/60 max-w-xl mb-6">
                        Qui potrai gestire gli accessi, sbloccare moduli specifici per studenti e monitorare i progressi.
                        Questa sezione è in fase di sviluppo (Coming Soon).
                    </p>
                    <button className="px-6 py-2 border border-[#d4af37] text-[#d4af37] rounded hover:bg-[#d4af37] hover:text-[#1c1917] transition-colors text-xs uppercase tracking-widest">
                        Visualizza Anteprima
                    </button>
                </div>
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37] rounded-full blur-[80px] opacity-10"></div>
            </div>
        </div>
    );
};

export default AcademyEditor;

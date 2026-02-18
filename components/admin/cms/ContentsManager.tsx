import React, { useState } from 'react';
import HeroEditor from './HeroEditor';
import PhilosophyEditor from './PhilosophyEditor';
import { LayoutTemplate, AlignLeft } from 'lucide-react';

const ContentsManager: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'hero' | 'philosophy'>('hero');

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-stone-200 pb-4">
                <button
                    onClick={() => setActiveTab('hero')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === 'hero'
                        ? 'bg-[#292524] text-[#f3e9d2] shadow-lg'
                        : 'text-stone-500 hover:bg-stone-100'}`}
                >
                    <LayoutTemplate size={18} />
                    <span className="font-bold text-sm tracking-wide">Hero Section</span>
                </button>
                <button
                    onClick={() => setActiveTab('philosophy')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === 'philosophy'
                        ? 'bg-[#292524] text-[#f3e9d2] shadow-lg'
                        : 'text-stone-500 hover:bg-stone-100'}`}
                >
                    <AlignLeft size={18} />
                    <span className="font-bold text-sm tracking-wide">Filosofia</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-8 min-h-[500px]">
                {activeTab === 'hero' && <HeroEditor />}
                {activeTab === 'philosophy' && <PhilosophyEditor />}
            </div>
        </div>
    );
};

export default ContentsManager;

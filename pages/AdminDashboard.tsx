import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Sparkles, BookOpen, Settings } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const { user, signOut, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    if (loading) return <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#faf9f6] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#292524] text-white fixed h-full z-10 hidden md:flex flex-col">
                <div className="p-8 border-b border-white/10">
                    <h1 className="font-serif text-xl tracking-wide text-[#f3e9d2]">Yuli Olistico</h1>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">Admin Console</p>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    <div className="px-4 py-3 bg-[#c07a60]/20 text-[#c07a60] rounded-lg cursor-pointer flex items-center gap-3">
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="text-sm font-medium">Panoramica</span>
                    </div>

                    <div className="px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer flex items-center gap-3 transition-colors">
                        <Sparkles className="w-5 h-5" />
                        <span className="text-sm font-medium">Servizi & Rituali</span>
                    </div>

                    <div className="px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer flex items-center gap-3 transition-colors">
                        <BookOpen className="w-5 h-5" />
                        <span className="text-sm font-medium">Journal & Blog</span>
                    </div>

                    <div className="px-4 py-3 text-white/70 hover:bg-white/5 rounded-lg cursor-pointer flex items-center gap-3 transition-colors">
                        <Settings className="w-5 h-5" />
                        <span className="text-sm font-medium">Configurazione</span>
                    </div>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={signOut}
                        className="w-full py-2 px-4 bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white/50 rounded flex items-center justify-center gap-2 text-xs uppercase tracking-widest transition-all"
                    >
                        <LogOut className="w-4 h-4" /> Disconnetti
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="font-serif text-3xl text-[#292524] mb-1">Benvenuta, Yuli</h2>
                        <p className="text-[#57534e]">Ecco cosa succede nel tuo Impero oggi.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="px-4 py-1 bg-[#849b87]/10 text-[#849b87] rounded-full text-xs font-bold uppercase tracking-wider">
                            System Online
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                        <div className="text-[#a8a29e] text-xs uppercase tracking-widest mb-2">Servizi Attivi</div>
                        <div className="text-4xl font-serif text-[#292524]">13</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                        <div className="text-[#a8a29e] text-xs uppercase tracking-widest mb-2">Articoli Blog</div>
                        <div className="text-4xl font-serif text-[#292524]">3</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                        <div className="text-[#a8a29e] text-xs uppercase tracking-widest mb-2">Stato Database</div>
                        <div className="text-4xl font-serif text-[#849b87]">Connesso</div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                        <LayoutDashboard className="w-6 h-6 text-stone-400" />
                    </div>
                    <p className="text-stone-500 max-w-md mx-auto mb-6">
                        Seleziona una voce dal menu laterale per iniziare a gestire i contenuti.
                        <br />(Funzionalità Editors in arrivo nella Phase 5C)
                    </p>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;

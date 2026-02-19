import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    Globe,
    GraduationCap,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    BrainCircuit,
    ChevronRight,
    Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminLayoutProps {
    children: React.ReactNode;
    activeSection: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeSection }) => {
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const menuItems = [
        { id: 'overview', label: 'Panoramica', icon: LayoutDashboard, path: '/admin' },
        { id: 'website', label: 'Sito Web (CMS)', icon: Globe, path: '/admin/cms' },
        { id: 'services', label: 'Servizi & Rituali', icon: Sparkles, path: '/admin/services' },
        { id: 'academy', label: 'Accademia (LMS)', icon: GraduationCap, path: '/admin/academy' },
        { id: 'clients', label: 'Clienti (CRM)', icon: Users, path: '/admin/crm' },
        { id: 'settings', label: 'Impostazioni', icon: Settings, path: '/admin/settings' },
    ];

    return (
        <div className="min-h-screen bg-[#faf9f6] flex font-sans text-[#292524]">
            {/* ── MOBILE TOGGLE ──────────────── */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="fixed top-4 left-4 z-50 p-2 bg-[#292524] text-[#f3e9d2] rounded-lg md:hidden shadow-lg"
            >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* ── SIDEBAR ────────────────────── */}
            <AnimatePresence mode="wait">
                {(isSidebarOpen || window.innerWidth >= 768) && (
                    <motion.aside
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={`fixed md:relative z-40 w-72 h-screen bg-[#1c1917] text-[#faf9f6] flex flex-col border-r border-[#d4af37]/10 shadow-2xl`}
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center text-[#1c1917] font-bold font-serif">Y</div>
                                <h1 className="font-serif text-xl tracking-wide text-[#f3e9d2]">Yuli Olistico</h1>
                            </div>
                            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] pl-11">Command Center</p>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                            {menuItems.map((item) => {
                                const isActive = activeSection === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => navigate(item.path)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 group
                      ${isActive
                                                ? 'bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                                                : 'text-white/60 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className={`w-5 h-5 ${isActive ? 'text-[#d4af37]' : 'text-current'}`} />
                                            <span className={`text-sm font-medium tracking-wide ${isActive ? 'font-bold' : ''}`}>
                                                {item.label}
                                            </span>
                                        </div>
                                        {isActive && <ChevronRight className="w-4 h-4 text-[#d4af37]" />}
                                    </button>
                                );
                            })}
                        </nav>

                        {/* Footer */}
                        <div className="p-4 border-t border-white/5 bg-[#171514]">
                            <div className="flex items-center gap-3 mb-4 px-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#c07a60] to-[#f3e9d2]" />
                                <div>
                                    <p className="text-xs font-bold text-[#f3e9d2]">Yuliya</p>
                                    <p className="text-[10px] text-white/40">Super Admin</p>
                                </div>
                            </div>
                            <button
                                onClick={signOut}
                                className="w-full py-3 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg flex items-center justify-center gap-2 text-xs uppercase tracking-widest transition-all duration-300 group border border-transparent hover:border-red-500/30"
                            >
                                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Disconnetti
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* ── MAIN CONTENT ───────────────── */}
            <main className="flex-1 h-screen overflow-y-auto relative custom-scrollbar bg-[#faf9f6]">
                {/* Top Bar glass effect */}
                <header className="sticky top-0 z-30 bg-[#faf9f6]/80 backdrop-blur-md px-8 py-4 border-b border-stone-200 flex justify-between items-center">
                    <div>
                        <span className="text-xs font-bold text-[#c07a60] uppercase tracking-wider mb-1 block">
                            {menuItems.find(i => i.id === activeSection)?.label}
                        </span>
                        <h2 className="font-serif text-2xl text-[#292524]">
                            {activeSection === 'overview' && "Bentornata al Comando."}
                            {activeSection === 'website' && "Gestione Contenuti Digitali."}
                            {activeSection === 'services' && "Catalogo Esperienze & Rituali."}
                            {activeSection === 'academy' && "Accademia Imperiale."}
                            {activeSection === 'clients' && "Registro Clienti Olistici."}
                            {activeSection === 'settings' && "Configurazione Sistema."}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold flex items-center gap-2 uppercase tracking-wide border border-green-200">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            Vercel Live
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;

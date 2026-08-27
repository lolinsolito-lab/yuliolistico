
import React, { useEffect } from 'react';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../../components/admin/AdminLayout';
import ContentsManager from '../../components/admin/cms/ContentsManager';
import ServicesEditor from '../../components/admin/ServicesEditor';
import AcademyEditor from '../../components/admin/AcademyEditor';
import QuizConfig from '../../components/admin/QuizConfig'; // Import new config page
import LeadsViewer from '../../components/admin/LeadsViewer';
import ProfileEditor from '../../components/admin/ProfileEditor';
import ArchiveEditor from '../../components/admin/ArchiveEditor';
import JournalEditor from '../../components/admin/JournalEditor';
import GiftCardsEditor from '../../components/admin/GiftCardsEditor';
import EmailTemplatesEditor from '../../components/admin/EmailTemplatesEditor';
import { 
    Construction, Loader, Users, Globe, Sparkles, Gift, 
    GraduationCap, BookOpen, Feather, Mail, BrainCircuit, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard: React.FC = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Derived active section from path
    const getActiveSection = () => {
        const path = location.pathname;
        if (path.includes('/cms')) return 'website';
        if (path.includes('/services')) return 'services';
        if (path.includes('/giftcards')) return 'giftcards';
        if (path.includes('/academy')) return 'academy';
        if (path.includes('/quiz-logic')) return 'quiz'; // Add logic mapping
        if (path.includes('/leads') || path.includes('/crm')) return 'clients'; // Redirect 'leads' to the clients/CRM tab visually
        if (path.includes('/emails')) return 'emails';
        if (path.includes('/profile')) return 'profile';
        if (path.includes('/archivio')) return 'archivio';
        if (path.includes('/journal')) return 'journal';
        if (path.includes('/settings')) return 'settings';
        return 'overview';
    };

    const activeSection = getActiveSection();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    if (loading) return <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center"><Loader className="animate-spin text-[#c07a60]" /></div>;

    const SettingsPlaceholder = () => (
        <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-12 text-center">
            <Construction className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h3 className="font-serif text-xl mb-2">Configurazione Sistema</h3>
            <p className="text-stone-500">Impostazioni avanzate in arrivo.</p>
        </div>
    );

    const overviewCards = [
        { id: 'leads', path: '/admin/leads', title: 'Leads', subtitle: 'Nuovi Contatti', icon: Users, color: 'from-[#c07a60] to-[#d4af37]', status: 'active' },
        { id: 'cms', path: '/admin/cms', title: 'Sito Web', subtitle: 'CMS Status', icon: Globe, color: 'from-green-500 to-emerald-700', status: 'live' },
        { id: 'services', path: '/admin/services', title: 'Catalogo', subtitle: 'Servizi Attivi', icon: Sparkles, color: 'from-[#292524] to-[#c07a60]' },
        { id: 'gift', path: '/admin/giftcards', title: 'Gestione Gift', subtitle: 'Carte Regalo', icon: Gift, color: 'from-[#d4af37] to-yellow-600' },
        { id: 'academy', path: '/admin/academy', title: 'Corsi & Materiali', subtitle: 'Academy LMS', icon: GraduationCap, color: 'from-purple-600 to-indigo-800' },
        { id: 'archivio', path: '/admin/archivio', title: 'Lead Magnet', subtitle: "L'Archivio", icon: BookOpen, color: 'from-blue-500 to-cyan-700' },
        { id: 'journal', path: '/admin/journal', title: 'Vetrina VIP', subtitle: 'Journal', icon: Feather, color: 'from-[#292524] to-black' },
        { id: 'emails', path: '/admin/emails', title: 'Automazioni', subtitle: 'Template Email', icon: Mail, color: 'from-[#c07a60] to-orange-600' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    const Overview = () => (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 relative z-10"
        >
            {overviewCards.map((card) => (
                <motion.div
                    key={card.id}
                    variants={itemVariants}
                    onClick={() => navigate(card.path)}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="relative overflow-hidden bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 cursor-pointer group transition-all duration-300 hover:shadow-[0_8px_30px_rgb(192,122,96,0.15)] hover:border-[#c07a60]/30"
                >
                    {/* Background Icon (Futuristic watermark) */}
                    <card.icon className="absolute -right-6 -bottom-6 w-32 h-32 text-stone-100 group-hover:text-[#c07a60]/5 group-hover:scale-110 transition-all duration-500 transform -rotate-12" />
                    
                    {/* Glowing gradient orb */}
                    <div className={`absolute -top-10 -left-10 w-24 h-24 bg-gradient-to-br ${card.color} rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-opacity duration-500`}></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#a8a29e] group-hover:text-[#c07a60] transition-colors">{card.subtitle}</div>
                            {card.status === 'active' && (
                                <span className="flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                </span>
                            )}
                            {card.status === 'live' && (
                                <div className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-green-100 text-green-700 border border-green-200">
                                    Live
                                </div>
                            )}
                        </div>
                        
                        <h3 className="text-2xl font-serif text-[#292524] mb-2">{card.title}</h3>
                        
                        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-stone-400 group-hover:text-[#c07a60] transition-colors uppercase tracking-widest">
                            <span>Gestisci</span>
                            <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );

    return (
        <AdminLayout activeSection={activeSection}>
            <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/cms" element={<ContentsManager />} />
                <Route path="/services" element={<ServicesEditor />} />
                <Route path="/giftcards" element={<GiftCardsEditor />} />
                <Route path="/academy" element={<AcademyEditor />} />
                <Route path="/quiz-logic" element={<QuizConfig />} />
                <Route path="/leads" element={<LeadsViewer />} />
                <Route path="/crm" element={<LeadsViewer />} /> 
                <Route path="/emails" element={<EmailTemplatesEditor />} />
                <Route path="/profile" element={<ProfileEditor />} />
                <Route path="/archivio" element={<ArchiveEditor />} />
                <Route path="/journal" element={<JournalEditor />} />
                <Route path="/settings" element={<SettingsPlaceholder />} />
            </Routes>
        </AdminLayout>
    );
};

export default AdminDashboard;


import React, { useEffect } from 'react';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/admin/AdminLayout';
import ContentsManager from '../components/admin/cms/ContentsManager';
import ServicesEditor from '../components/admin/ServicesEditor';
import AcademyEditor from '../components/admin/AcademyEditor';
import QuizConfig from '../components/admin/QuizConfig'; // Import new config page
import LeadsViewer from '../components/admin/LeadsViewer';
import ProfileEditor from '../components/admin/ProfileEditor';
import ArchiveEditor from '../components/admin/ArchiveEditor';
import { Construction, Loader, Users } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Derived active section from path
    const getActiveSection = () => {
        const path = location.pathname;
        if (path.includes('/cms')) return 'website';
        if (path.includes('/services')) return 'services';
        if (path.includes('/academy')) return 'academy';
        if (path.includes('/quiz-logic')) return 'quiz'; // Add logic mapping
        if (path.includes('/leads')) return 'clients'; // Redirect 'leads' to the clients/CRM tab visually
        if (path.includes('/profile')) return 'profile';
        if (path.includes('/archivio')) return 'archivio';
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

    const Overview = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 cursor-pointer hover:shadow-md transition-all group" onClick={() => navigate('/admin/leads')}>
                <div className="text-[#a8a29e] text-xs uppercase tracking-widest mb-2 flex justify-between">
                    <div>Nuovi Contatti</div>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                <div className="text-2xl font-serif text-[#292524] group-hover:text-[#c07a60] transition-colors">Leads</div>
                <div className="mt-2 text-xs text-[#c07a60] font-bold flex items-center gap-1">
                    → Visualizza
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 cursor-pointer hover:shadow-md transition-all" onClick={() => navigate('/admin/cms')}>
                <div className="text-[#a8a29e] text-xs uppercase tracking-widest mb-2">CMS Status</div>
                <div className="text-2xl font-serif text-[#292524]">Sito Web</div>
                <div className="mt-2 text-xs text-green-600 font-bold flex items-center gap-1">
                    ● Live
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 cursor-pointer hover:shadow-md transition-all" onClick={() => navigate('/admin/services')}>
                <div className="text-[#a8a29e] text-xs uppercase tracking-widest mb-2">Servizi Attivi</div>
                <div className="text-2xl font-serif text-[#292524]">Gestione Catalogo</div>
                <div className="mt-2 text-xs text-[#c07a60] font-bold flex items-center gap-1">
                    → Gestisci
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 cursor-pointer hover:shadow-md transition-all" onClick={() => navigate('/admin/academy')}>
                <div className="text-[#a8a29e] text-xs uppercase tracking-widest mb-2">Academy</div>
                <div className="text-2xl font-serif text-[#292524]">Corsi & Materiali</div>
                <div className="mt-2 text-xs text-[#c07a60] font-bold flex items-center gap-1">
                    → Accedi
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 cursor-pointer hover:shadow-md transition-all" onClick={() => navigate('/admin/archivio')}>
                <div className="text-[#a8a29e] text-xs uppercase tracking-widest mb-2">L'Archivio</div>
                <div className="text-2xl font-serif text-[#292524]">Lead Magnet</div>
                <div className="mt-2 text-xs text-[#c07a60] font-bold flex items-center gap-1">
                    → Gestisci
                </div>
            </div>
        </div>
    );

    return (
        <AdminLayout activeSection={activeSection}>
            <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/cms" element={<ContentsManager />} />
                <Route path="/services" element={<ServicesEditor />} />
                <Route path="/academy" element={<AcademyEditor />} />
                <Route path="/quiz-logic" element={<QuizConfig />} /> {/* Add Route */}
                <Route path="/leads" element={<LeadsViewer />} />
                <Route path="/crm" element={<LeadsViewer />} /> {/* CRM acts as alias for now */}
                <Route path="/profile" element={<ProfileEditor />} />
                <Route path="/archivio" element={<ArchiveEditor />} />
                <Route path="/settings" element={<SettingsPlaceholder />} />
            </Routes>
        </AdminLayout>
    );
};

export default AdminDashboard;

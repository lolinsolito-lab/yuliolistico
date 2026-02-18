import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/admin/AdminLayout';
import AcademyEditor from '../components/admin/AcademyEditor';

const AdminDashboard: React.FC = () => {
    // ... imports ...

    // ... existing code ...

    return (
        <AdminLayout activeSection={activeSection}>
            <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/cms" element={<ContentsManager />} />
                <Route path="/services" element={<ServicesEditor />} />
                <Route path="/academy" element={<AcademyEditor />} />
                <Route path="/crm" element={<CRMPlaceholder />} />
                <Route path="/settings" element={<SettingsPlaceholder />} />
            </Routes>
        </AdminLayout>
    );
};
const { user, loading } = useAuth();
const navigate = useNavigate();
const location = useLocation();

// Derived active section from path
const getActiveSection = () => {
    const path = location.pathname;
    if (path.includes('/cms')) return 'website';
    if (path.includes('/services')) return 'services';
    if (path.includes('/academy')) return 'academy';
    if (path.includes('/crm')) return 'clients';
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

// Placeholder Components for now
const AcademyPlaceholder = () => (
    <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-12 text-center">
        <Construction className="w-16 h-16 text-stone-300 mx-auto mb-4" />
        <h3 className="font-serif text-xl mb-2">Accademia Imperiale - Coming Soon</h3>
        <p className="text-stone-500">Il modulo LMS sarà attivato nella Fase 8.</p>
    </div>
);

const CRMPlaceholder = () => (
    <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-12 text-center">
        <Construction className="w-16 h-16 text-stone-300 mx-auto mb-4" />
        <h3 className="font-serif text-xl mb-2">Registro Clienti - Coming Soon</h3>
        <p className="text-stone-500">Il modulo CRM sarà attivato nella Fase 8.</p>
    </div>
);

const SettingsPlaceholder = () => (
    <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-12 text-center">
        <Construction className="w-16 h-16 text-stone-300 mx-auto mb-4" />
        <h3 className="font-serif text-xl mb-2">Configurazione Sistema</h3>
        <p className="text-stone-500">Impostazioni avanzate in arrivo.</p>
    </div>
);

const Overview = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 cursor-pointer hover:shadow-md transition-all" onClick={() => navigate('/admin/cms')}>
            <div className="text-[#a8a29e] text-xs uppercase tracking-widest mb-2">CMS Status</div>
            <div className="text-2xl font-serif text-[#292524]">Sito Web</div>
            <div className="mt-2 text-xs text-green-600 font-bold flex items-center gap-1">
                ● Live
            </div>
        </div>
        {/* Add more overview cards */}
    </div>
);

return (
    <AdminLayout activeSection={activeSection}>
        <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/cms" element={<ContentsManager />} />
            <Route path="/services" element={<ServicesEditor />} />
            <Route path="/academy" element={<AcademyPlaceholder />} />
            <Route path="/crm" element={<CRMPlaceholder />} />
            <Route path="/settings" element={<SettingsPlaceholder />} />
        </Routes>
    </AdminLayout>
);
};

export default AdminDashboard;


import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import {
    Save,
    Loader,
    User,
    Mail,
    Phone,
    MapPin,
    FileText,
    Globe,
    Instagram,
    Clock,
    Upload,
    CheckCircle,
    AlertCircle,
    Plus,
    X,
    Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BusinessProfile {
    id?: string;
    brand_name: string;
    full_name: string;
    role: string;
    bio_short: string;
    bio_long: string;
    profile_image_url: string;
    signature_image_url: string;
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    vat_number: string;
    social_links: Record<string, string>;
    business_hours: Record<string, { open: string; close: string; closed: boolean }>;
    hero_headline: string;
    hero_subheadline: string;
}

const DEFAULT_PROFILE: BusinessProfile = {
    brand_name: 'Yuli Olistico',
    full_name: 'Yuli Yuliantini',
    role: 'Founder & CEO',
    bio_short: '',
    bio_long: '',
    profile_image_url: '/images/yuli-profile.png',
    signature_image_url: '',
    email: 'yuliolistico@gmail.com',
    phone: '+39 320 198 26 29',
    whatsapp: '+39 320 198 26 29',
    address: 'Bergamo e provincia',
    vat_number: '',
    social_links: { instagram: '@yuli_olistico' },
    business_hours: {
        lunedi: { open: '09:00', close: '19:00', closed: false },
        martedi: { open: '09:00', close: '19:00', closed: false },
        mercoledi: { open: '09:00', close: '19:00', closed: false },
        giovedi: { open: '09:00', close: '19:00', closed: false },
        venerdi: { open: '09:00', close: '19:00', closed: false },
        sabato: { open: '10:00', close: '16:00', closed: false },
        domenica: { open: '', close: '', closed: true },
    },
    hero_headline: '',
    hero_subheadline: '',
};

const DAYS_IT = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica'];
const DAYS_LABELS: Record<string, string> = {
    lunedi: 'Lunedì', martedi: 'Martedì', mercoledi: 'Mercoledì',
    giovedi: 'Giovedì', venerdi: 'Venerdì', sabato: 'Sabato', domenica: 'Domenica'
};

const ProfileEditor: React.FC = () => {
    const [profile, setProfile] = useState<BusinessProfile>(DEFAULT_PROFILE);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'identity' | 'contact' | 'hours' | 'vision'>('identity');
    const [uploadingImage, setUploadingImage] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const { data, error: fetchError } = await supabase
                .from('business_profile')
                .select('*')
                .limit(1)
                .maybeSingle();

            if (fetchError) throw fetchError;
            if (data) {
                setProfile({
                    ...DEFAULT_PROFILE,
                    ...data,
                    social_links: data.social_links || DEFAULT_PROFILE.social_links,
                    business_hours: data.business_hours || DEFAULT_PROFILE.business_hours,
                });
            }
        } catch (err: any) {
            console.error('Error fetching profile:', err);
            setError('Impossibile caricare il profilo. Verifica che la tabella business_profile esista in Supabase.');
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        setSaved(false);

        try {
            const payload = {
                ...profile,
                updated_at: new Date().toISOString(),
            };

            if (profile.id) {
                // Update existing
                const { error: updateError } = await supabase
                    .from('business_profile')
                    .update(payload)
                    .eq('id', profile.id);
                if (updateError) throw updateError;
            } else {
                // Insert new
                const { data, error: insertError } = await supabase
                    .from('business_profile')
                    .insert([payload])
                    .select()
                    .single();
                if (insertError) throw insertError;
                if (data) setProfile(prev => ({ ...prev, id: data.id }));
            }

            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err: any) {
            console.error('Error saving profile:', err);
            setError(`Errore nel salvataggio: ${err.message}`);
        }
        setSaving(false);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `profile-${Date.now()}.${fileExt}`;
            const filePath = `brand/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            setProfile(prev => ({ ...prev, profile_image_url: publicUrl }));
        } catch (err: any) {
            console.error('Upload error:', err);
            setError(`Errore upload: ${err.message}. Puoi anche inserire un URL direttamente.`);
        }
        setUploadingImage(false);
    };

    const updateField = (field: keyof BusinessProfile, value: any) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    const updateSocialLink = (key: string, value: string) => {
        setProfile(prev => ({
            ...prev,
            social_links: { ...prev.social_links, [key]: value }
        }));
    };

    const updateBusinessHour = (day: string, field: string, value: string | boolean) => {
        setProfile(prev => ({
            ...prev,
            business_hours: {
                ...prev.business_hours,
                [day]: { ...prev.business_hours[day], [field]: value }
            }
        }));
    };

    const tabs = [
        { id: 'identity' as const, label: 'Identità', icon: User },
        { id: 'contact' as const, label: 'Contatti & Legale', icon: Mail },
        { id: 'hours' as const, label: 'Orari', icon: Clock },
        { id: 'vision' as const, label: 'Visione & About', icon: FileText },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader className="w-8 h-8 animate-spin text-[#c07a60]" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Status Bar */}
            <AnimatePresence>
                {saved && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
                    >
                        <CheckCircle className="w-4 h-4" />
                        Profilo salvato con successo.
                    </motion.div>
                )}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                    >
                        <AlertCircle className="w-4 h-4" />
                        {error}
                        <button onClick={() => setError(null)} className="ml-auto">
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                ? 'bg-[#292524] text-[#f3e9d2] shadow-lg'
                                : 'bg-white text-stone-500 hover:bg-stone-50 border border-stone-200'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-8">

                {/* ─── TAB: IDENTITA ─── */}
                {activeTab === 'identity' && (
                    <div className="space-y-8">
                        <h3 className="font-serif text-xl text-[#292524] border-b border-stone-100 pb-4">
                            Identità del Brand
                        </h3>

                        {/* Profile Image Section */}
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="relative group">
                                <div className="w-40 h-40 rounded-2xl overflow-hidden border-2 border-stone-200 shadow-md">
                                    {profile.profile_image_url ? (
                                        <img
                                            src={profile.profile_image_url}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                                            <ImageIcon className="w-10 h-10 text-stone-300" />
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploadingImage}
                                    className="absolute -bottom-2 -right-2 p-2 bg-[#c07a60] text-white rounded-full shadow-lg hover:bg-[#a86750] transition-colors"
                                >
                                    {uploadingImage ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </div>
                            <div className="flex-1 space-y-1">
                                <label className="text-xs text-stone-400 uppercase tracking-widest">URL Immagine Profilo</label>
                                <input
                                    type="text"
                                    value={profile.profile_image_url}
                                    onChange={e => updateField('profile_image_url', e.target.value)}
                                    placeholder="/images/yuli-profile.png o URL esterno"
                                    className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-[#c07a60] text-sm font-mono"
                                />
                                <p className="text-xs text-stone-400">Puoi caricare un file o inserire un URL diretto.</p>
                            </div>
                        </div>

                        {/* Brand & Professional Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Nome Brand"
                                value={profile.brand_name}
                                onChange={v => updateField('brand_name', v)}
                                placeholder="Yuli Olistico"
                            />
                            <InputField
                                label="Nome Completo"
                                value={profile.full_name}
                                onChange={v => updateField('full_name', v)}
                                placeholder="Yuli Yuliantini"
                            />
                            <InputField
                                label="Ruolo / Titolo"
                                value={profile.role}
                                onChange={v => updateField('role', v)}
                                placeholder="Founder & CEO"
                            />
                            <InputField
                                label="URL Firma (Immagine)"
                                value={profile.signature_image_url}
                                onChange={v => updateField('signature_image_url', v)}
                                placeholder="URL dell'immagine della firma"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs text-stone-400 uppercase tracking-widest">Bio Breve</label>
                            <textarea
                                value={profile.bio_short}
                                onChange={e => updateField('bio_short', e.target.value)}
                                placeholder="Una riga che descrive chi sei e cosa fai..."
                                rows={2}
                                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-[#c07a60] text-sm resize-none"
                            />
                        </div>
                    </div>
                )}

                {/* ─── TAB: CONTATTI & LEGALE ─── */}
                {activeTab === 'contact' && (
                    <div className="space-y-8">
                        <h3 className="font-serif text-xl text-[#292524] border-b border-stone-100 pb-4">
                            Contatti & Informazioni Legali
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Email"
                                value={profile.email}
                                onChange={v => updateField('email', v)}
                                placeholder="yuliolistico@gmail.com"
                                icon={<Mail className="w-4 h-4" />}
                            />
                            <InputField
                                label="Telefono"
                                value={profile.phone}
                                onChange={v => updateField('phone', v)}
                                placeholder="+39 320 198 26 29"
                                icon={<Phone className="w-4 h-4" />}
                            />
                            <InputField
                                label="WhatsApp"
                                value={profile.whatsapp}
                                onChange={v => updateField('whatsapp', v)}
                                placeholder="+39 320 198 26 29"
                                icon={<Phone className="w-4 h-4" />}
                            />
                            <InputField
                                label="Indirizzo / Zona"
                                value={profile.address}
                                onChange={v => updateField('address', v)}
                                placeholder="Bergamo e provincia"
                                icon={<MapPin className="w-4 h-4" />}
                            />
                            <InputField
                                label="Partita IVA"
                                value={profile.vat_number}
                                onChange={v => updateField('vat_number', v)}
                                placeholder="IT12345678901"
                                icon={<FileText className="w-4 h-4" />}
                            />
                        </div>

                        {/* Social Links */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-stone-600 uppercase tracking-widest">Social Media</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField
                                    label="Instagram"
                                    value={profile.social_links.instagram || ''}
                                    onChange={v => updateSocialLink('instagram', v)}
                                    placeholder="@yuli_olistico"
                                    icon={<Instagram className="w-4 h-4" />}
                                />
                                <InputField
                                    label="Sito Web"
                                    value={profile.social_links.website || ''}
                                    onChange={v => updateSocialLink('website', v)}
                                    placeholder="https://yuliolistico.it"
                                    icon={<Globe className="w-4 h-4" />}
                                />
                                <InputField
                                    label="Facebook"
                                    value={profile.social_links.facebook || ''}
                                    onChange={v => updateSocialLink('facebook', v)}
                                    placeholder="URL pagina Facebook"
                                    icon={<Globe className="w-4 h-4" />}
                                />
                                <InputField
                                    label="TikTok"
                                    value={profile.social_links.tiktok || ''}
                                    onChange={v => updateSocialLink('tiktok', v)}
                                    placeholder="@yuli_olistico"
                                    icon={<Globe className="w-4 h-4" />}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* ─── TAB: ORARI ─── */}
                {activeTab === 'hours' && (
                    <div className="space-y-6">
                        <h3 className="font-serif text-xl text-[#292524] border-b border-stone-100 pb-4">
                            Orari di Lavoro
                        </h3>
                        <div className="space-y-3">
                            {DAYS_IT.map(day => {
                                const hours = profile.business_hours[day] || { open: '', close: '', closed: false };
                                return (
                                    <div key={day} className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${hours.closed ? 'bg-stone-50 border-stone-100 opacity-60' : 'bg-white border-stone-200'
                                        }`}>
                                        <div className="w-28 font-medium text-sm text-[#292524]">
                                            {DAYS_LABELS[day]}
                                        </div>

                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={hours.closed}
                                                onChange={e => updateBusinessHour(day, 'closed', e.target.checked)}
                                                className="accent-[#c07a60]"
                                            />
                                            <span className="text-xs text-stone-500">Chiuso</span>
                                        </label>

                                        {!hours.closed && (
                                            <div className="flex items-center gap-2 ml-auto">
                                                <input
                                                    type="time"
                                                    value={hours.open}
                                                    onChange={e => updateBusinessHour(day, 'open', e.target.value)}
                                                    className="px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-[#c07a60]"
                                                />
                                                <span className="text-stone-400">—</span>
                                                <input
                                                    type="time"
                                                    value={hours.close}
                                                    onChange={e => updateBusinessHour(day, 'close', e.target.value)}
                                                    className="px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-[#c07a60]"
                                                />
                                            </div>
                                        )}

                                        {hours.closed && (
                                            <span className="ml-auto text-xs text-stone-400 italic">Chiuso</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ─── TAB: VISIONE ─── */}
                {activeTab === 'vision' && (
                    <div className="space-y-8">
                        <h3 className="font-serif text-xl text-[#292524] border-b border-stone-100 pb-4">
                            La Tua Visione
                        </h3>
                        <p className="text-sm text-stone-500">
                            Questi testi appariranno nella sezione "Chi Sono" del sito pubblico.
                        </p>

                        <div className="space-y-1">
                            <label className="text-xs text-stone-400 uppercase tracking-widest">Bio Completa / Visione</label>
                            <textarea
                                value={profile.bio_long}
                                onChange={e => updateField('bio_long', e.target.value)}
                                placeholder={`"Nella mia terra, non impariamo a massaggiare. Impariamo a sentire..."`}
                                rows={8}
                                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-[#c07a60] text-sm resize-none leading-relaxed"
                            />
                            <p className="text-xs text-stone-400">Supporta più paragrafi. Ogni riga verrà mostrata come un blocco separato.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Headline Hero (opzionale)"
                                value={profile.hero_headline}
                                onChange={v => updateField('hero_headline', v)}
                                placeholder="Sentire oltre la pelle."
                            />
                            <InputField
                                label="Sub-headline Hero (opzionale)"
                                value={profile.hero_subheadline}
                                onChange={v => updateField('hero_subheadline', v)}
                                placeholder="LA VISIONE"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-3 px-8 py-4 bg-[#292524] text-[#f3e9d2] rounded-lg hover:bg-[#1c1917] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 font-medium"
                >
                    {saving ? (
                        <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                        <Save className="w-5 h-5" />
                    )}
                    {saving ? 'Salvataggio...' : 'Salva Profilo'}
                </button>
            </div>
        </div>
    );
};

/* ─── Reusable Input Component ─── */
interface InputFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, placeholder, icon }) => (
    <div className="space-y-1">
        <label className="text-xs text-stone-400 uppercase tracking-widest">{label}</label>
        <div className="relative">
            {icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                    {icon}
                </div>
            )}
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className={`w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:border-[#c07a60] text-sm transition-colors ${icon ? 'pl-10' : ''
                    }`}
            />
        </div>
    </div>
);

export default ProfileEditor;

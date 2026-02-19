import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Video, FileText, Lock, Plus, Search, Loader, MoreVertical, Edit, Trash2, ArrowLeft, Save, Upload } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { Course, Module } from '../../types';

// Course Detail Editor Component
const CourseDetailEditor = ({ course, onBack }: { course: Course; onBack: () => void }) => {
    const [modules, setModules] = useState<Module[]>([]);
    const [isLoadingModules, setIsLoadingModules] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    // New Module State
    const [isAddingModule, setIsAddingModule] = useState(false);
    const [newModuleTitle, setNewModuleTitle] = useState("");
    const [newModuleType, setNewModuleType] = useState<'VIDEO' | 'PDF' | 'AUDIO'>('VIDEO');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        fetchModules();
    }, [course.id]);

    const fetchModules = async () => {
        const { data, error } = await supabase
            .from('modules')
            .select('*')
            .eq('course_id', course.id)
            .order('sort_order', { ascending: true });

        if (data) setModules(data);
        setIsLoadingModules(false);
    };

    const handleFileUpload = async () => {
        if (!file) return null;
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${course.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('academy_content')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('academy_content').getPublicUrl(filePath);
        return data.publicUrl;
    };

    const handleCreateModule = async () => {
        if (!newModuleTitle || !file) {
            alert("Compila tutti i campi e carica un file.");
            return;
        }

        setIsUploading(true);

        try {
            const publicUrl = await handleFileUpload();

            const { data, error } = await supabase.from('modules').insert([{
                course_id: course.id,
                title: newModuleTitle,
                type: newModuleType,
                content_url: publicUrl,
                sort_order: modules.length // Append to end
            }]).select().single();

            if (error) throw error;

            if (data) {
                setModules([...modules, data]);
                setIsAddingModule(false);
                setNewModuleTitle("");
                setFile(null);
            }
        } catch (error: any) {
            alert("Errore upload: " + error.message);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteModule = async (id: string) => {
        if (!confirm("Eliminare questo modulo?")) return;
        const { error } = await supabase.from('modules').delete().eq('id', id);
        if (!error) {
            setModules(modules.filter(m => m.id !== id));
        }
    };

    return (
        <div className="p-8 pb-40">
            <button onClick={onBack} className="flex items-center gap-2 text-stone-500 hover:text-[#292524] mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Torna ai Corsi
            </button>
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h2 className="text-3xl font-serif text-[#292524] mb-2">{course.title}</h2>
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-widest ${course.is_published ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'}`}>
                        {course.is_published ? 'Pubblicato' : 'Bozza'}
                    </span>
                </div>
                <button
                    onClick={() => setIsAddingModule(true)}
                    className="flex items-center gap-2 bg-[#292524] text-white px-4 py-2 rounded-lg hover:bg-[#44403c] transition-colors"
                >
                    <Plus className="w-4 h-4" /> Aggiungi Modulo
                </button>
            </div>

            {/* ADD MODULE FORM */}
            <AnimatePresence>
                {isAddingModule && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-stone-50 p-6 rounded-xl border border-stone-200 mb-8 overflow-hidden"
                    >
                        <h3 className="font-serif text-lg mb-4">Nuovo Modulo</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input
                                value={newModuleTitle}
                                onChange={e => setNewModuleTitle(e.target.value)}
                                placeholder="Titolo del Modulo"
                                className="p-2 border rounded"
                            />
                            <select
                                value={newModuleType}
                                onChange={(e: any) => setNewModuleType(e.target.value)}
                                className="p-2 border rounded"
                            >
                                <option value="VIDEO">Video</option>
                                <option value="PDF">PDF</option>
                                <option value="AUDIO">Audio</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="flex items-center justify-center p-4 border-2 border-dashed border-stone-300 rounded-lg cursor-pointer hover:bg-stone-100 transition-colors">
                                <input type="file" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
                                <div className="text-center text-stone-500">
                                    <Upload className="w-6 h-6 mx-auto mb-2" />
                                    {file ? <span className="text-[#c07a60] font-bold">{file.name}</span> : "Clicca per caricare il file (Video/PDF/Audio)"}
                                </div>
                            </label>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setIsAddingModule(false)} className="px-4 py-2 text-stone-500">Annulla</button>
                            <button
                                onClick={handleCreateModule}
                                disabled={isUploading}
                                className="px-4 py-2 bg-[#c07a60] text-white rounded flex items-center gap-2"
                            >
                                {isUploading && <Loader className="w-3 h-3 animate-spin" />}
                                {isUploading ? "Caricamento in corso..." : "Salva Modulo"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MODULES LIST */}
            <div className="space-y-3">
                {isLoadingModules ? (
                    <div className="text-center py-10"><Loader className="w-6 h-6 animate-spin mx-auto text-[#c07a60]" /></div>
                ) : modules.length === 0 ? (
                    <div className="text-center py-12 text-stone-400 border-2 border-dashed border-stone-100 rounded-xl">
                        Nessun modulo presente. Inizia aggiungendone uno.
                    </div>
                ) : (
                    modules.map((module, idx) => (
                        <div key={module.id} className="bg-white p-4 rounded-lg border border-stone-100 flex items-center justify-between hover:shadow-sm transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-stone-100 rounded flex items-center justify-center text-stone-400 font-serif font-bold">
                                    {idx + 1}
                                </div>
                                <div>
                                    <h4 className="font-medium text-[#292524]">{module.title}</h4>
                                    <div className="flex items-center gap-2 text-xs text-stone-400 uppercase tracking-widest">
                                        {module.type === 'VIDEO' && <Video className="w-3 h-3" />}
                                        {module.type === 'PDF' && <FileText className="w-3 h-3" />}
                                        {module.type === 'AUDIO' && <div className="w-3 h-3 bg-stone-300 rounded-full" />}
                                        {module.type}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleDeleteModule(module.id)} className="p-2 text-stone-300 hover:text-red-500 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

// Construction Icon helper
const Construction = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="6" width="20" height="8" rx="1" /><path d="M17 14v7" /><path d="M7 14v7" /><path d="M17 3v3" /><path d="M7 3v3" /><path d="M10 14 2.3 6.3" /><path d="m14 6 7.7 7.7" /><path d="m8 6 8 8" /></svg>
);

const AcademyEditor: React.FC = () => {
    const [view, setView] = useState<'LIST' | 'EDIT' | 'CREATE'>('LIST');
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    // Create Form State
    const [newCourseTitle, setNewCourseTitle] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    // Initial Fetch
    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching courses:', error);
        } else {
            setCourses(data || []);
        }
        setIsLoading(false);
    };

    const handleCreateCourse = async () => {
        if (!newCourseTitle.trim()) return;
        setIsCreating(true);

        const { data, error } = await supabase
            .from('courses')
            .insert([{
                title: newCourseTitle,
                is_published: false,
                price_eur: 0
            }])
            .select() // Return the created row
            .single();

        if (error) {
            alert("Errore creazione corso: " + error.message);
        } else if (data) {
            setCourses([data, ...courses]);
            setView('LIST');
            setNewCourseTitle("");
            // Optional: Auto-open edit mode
            // setSelectedCourse(data);
            // setView('EDIT');
        }
        setIsCreating(false);
    };

    const handleEditClick = (course: Course) => {
        setSelectedCourse(course);
        setView('EDIT');
    };

    const handleDeleteCourse = async (id: string) => {
        if (!window.confirm("Sei sicuro di voler eliminare questo corso e tutti i suoi moduli?")) return;

        const { error } = await supabase.from('courses').delete().eq('id', id);
        if (error) {
            alert("Errore eliminazione: " + error.message);
        } else {
            setCourses(courses.filter(c => c.id !== id));
        }
    };


    // RENDER: EDIT MODE
    if (view === 'EDIT' && selectedCourse) {
        return <CourseDetailEditor course={selectedCourse} onBack={() => { setSelectedCourse(null); setView('LIST'); }} />;
    }

    // RENDER: CREATE MODE (Simple Overlay or Inline? Let's use the 'LIST' view with a Modal-like behavior for simplicity or just a clean dedicated view)
    // Actually, let's keep it simple.

    return (
        <div className="p-8 pb-40">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-serif text-[#292524] mb-2">Academy Manager</h1>
                    <p className="text-[#57534e]">Gestisci i corsi, le guide PDF e i contenuti educativi.</p>
                </div>
                {view === 'LIST' && (
                    <button
                        onClick={() => setView('CREATE')}
                        className="flex items-center gap-2 bg-[#292524] text-white px-6 py-3 rounded-lg hover:bg-[#44403c] transition-colors shadow-lg"
                    >
                        <Plus className="w-4 h-4" /> Nuovo Corso
                    </button>
                )}
            </div>

            {/* CREATE VIEW */}
            <AnimatePresence>
                {view === 'CREATE' && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-8 bg-white p-8 rounded-xl shadow-lg border border-stone-200 max-w-2xl"
                    >
                        <h3 className="text-xl font-serif text-[#292524] mb-6">Crea un nuovo corso</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-[#a8a29e] mb-2">Titolo del Corso</label>
                                <input
                                    value={newCourseTitle}
                                    onChange={(e) => setNewCourseTitle(e.target.value)}
                                    placeholder="Es. I Fondamenti del Tocco..."
                                    className="w-full text-2xl font-serif border-b-2 border-stone-200 focus:border-[#c07a60] outline-none py-2 bg-transparent placeholder-stone-300 text-[#292524]"
                                    autoFocus
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-8">
                                <button
                                    onClick={() => setView('LIST')}
                                    className="px-6 py-2 text-stone-500 hover:bg-stone-100 rounded-lg transition-colors"
                                >
                                    Annulla
                                </button>
                                <button
                                    onClick={handleCreateCourse}
                                    disabled={!newCourseTitle.trim() || isCreating}
                                    className="px-8 py-2 bg-[#c07a60] text-white rounded-lg hover:bg-[#a56750] transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isCreating && <Loader className="w-4 h-4 animate-spin" />}
                                    Crea Corso
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* LIST VIEW */}
            {view === 'LIST' && (
                isLoading ? (
                    <div className="flex justify-center py-20 text-[#c07a60]">
                        <Loader className="w-8 h-8 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Course Cards */}
                        {courses.map((course) => (
                            <div key={course.id} className="group relative bg-white border border-[#292524]/10 rounded-xl overflow-hidden hover:shadow-xl transition-all p-6 cursor-pointer flex flex-col h-[280px]">
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${course.is_published ? 'bg-green-100/50 text-green-700' : 'bg-stone-100 text-stone-400'}`}>
                                        {course.is_published ? 'LIVE' : 'DRAFT'}
                                    </span>
                                </div>

                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-white text-xl font-serif ${course.price_eur > 0 ? 'bg-[#292524] text-[#d4af37]' : 'bg-stone-200 text-stone-500'}`}>
                                    {course.price_eur > 0 ? '€' : 'Free'}
                                </div>

                                <h3 className="text-xl font-serif text-[#292524] mb-2 line-clamp-2">{course.title}</h3>
                                <p className="text-sm text-[#a8a29e] mb-auto line-clamp-2">{course.description || "Nessuna descrizione."}</p>

                                <div className="mt-6 pt-6 border-t border-stone-100 flex items-center justify-between">
                                    <span className="text-xs text-stone-400 font-mono">ID: {course.id.substring(0, 6)}...</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDeleteCourse(course.id); }}
                                            className="p-2 text-stone-300 hover:text-red-500 transition-colors"
                                            title="Elimina"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleEditClick(course)}
                                            className="p-2 bg-[#faf9f6] text-[#292524] rounded-lg hover:bg-[#292524] hover:text-white transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Valid "Add New" Card if list is empty or just as an option at the end */}
                        {courses.length === 0 && (
                            <div
                                onClick={() => setView('CREATE')}
                                className="border-2 border-dashed border-[#292524]/20 rounded-xl flex flex-col items-center justify-center p-6 text-[#a8a29e] hover:border-[#c07a60] hover:text-[#c07a60] transition-colors cursor-pointer min-h-[250px]"
                            >
                                <Plus className="w-8 h-8 mb-2" />
                                <span className="text-sm font-bold uppercase tracking-widest">Crea il primo corso</span>
                            </div>
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default AcademyEditor;

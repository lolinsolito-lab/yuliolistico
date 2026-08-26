import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Trash2, Edit2, Check, X, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface Post {
    id: string;
    title: string;
    content: string;
    category: string;
    image_url: string;
    published: boolean;
    created_at: string;
}

const JournalEditor: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    const fetchPosts = async () => {
        const { data } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });
        if (data) setPosts(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSave = async () => {
        if (!editingPost) return;

        if (editingPost.id) {
            await supabase.from('posts').update({
                title: editingPost.title,
                content: editingPost.content,
                category: editingPost.category,
                image_url: editingPost.image_url,
                published: editingPost.published,
            }).eq('id', editingPost.id);
        } else {
            await supabase.from('posts').insert({
                title: editingPost.title,
                content: editingPost.content,
                category: editingPost.category,
                image_url: editingPost.image_url,
                published: editingPost.published,
            });
        }
        setEditingPost(null);
        fetchPosts();
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Sei sicura di voler eliminare questo articolo?')) {
            await supabase.from('posts').delete().eq('id', id);
            fetchPosts();
        }
    };

    const togglePublish = async (post: Post) => {
        await supabase.from('posts').update({ published: !post.published }).eq('id', post.id);
        fetchPosts();
    };

    return (
        <AdminLayout activeSection="journal">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-xl font-serif">I tuoi Articoli</h3>
                    <p className="text-stone-500 text-sm">Gestisci la tua Vetrina VIP</p>
                </div>
                <button
                    onClick={() => setEditingPost({ id: '', title: '', content: '', category: 'Mindset', image_url: '', published: false, created_at: '' })}
                    className="bg-[#292524] text-[#f3e9d2] px-4 py-2 rounded flex items-center gap-2 text-xs uppercase tracking-widest hover:bg-[#c07a60] transition-colors"
                >
                    <Plus className="w-4 h-4" /> Nuovo Articolo
                </button>
            </div>

            {loading ? (
                <div className="text-center py-10 text-stone-400">Caricamento...</div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm flex flex-col">
                            {post.image_url && (
                                <img src={post.image_url} alt="cover" className="w-full h-48 object-cover rounded-md mb-4" />
                            )}
                            <div className="flex gap-2 items-center mb-2">
                                <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                                    {post.category}
                                </span>
                            </div>
                            <h4 className="font-serif text-xl text-[#292524] mb-2">{post.title}</h4>
                            <p className="text-stone-500 text-sm line-clamp-3 mb-6 flex-1">
                                {post.content}
                            </p>
                            
                            <div className="flex justify-between items-center pt-4 border-t border-stone-100">
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${post.published ? 'bg-green-500' : 'bg-stone-300'}`} />
                                    <span className="text-[10px] text-stone-400">{post.published ? 'Pubblico' : 'Bozza'}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => togglePublish(post)} className="p-1.5 hover:bg-stone-100 rounded text-stone-400" title={post.published ? 'Nascondi' : 'Pubblica'}>
                                        {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-green-500" />}
                                    </button>
                                    <button onClick={() => setEditingPost(post)} className="p-1.5 hover:bg-stone-100 rounded text-stone-400 hover:text-[#c07a60]">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(post.id)} className="p-1.5 hover:bg-red-50 rounded text-stone-400 hover:text-red-500">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal di Edit */}
            {editingPost && (
                <div className="fixed inset-0 bg-black/60 z-50 flex justify-end">
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        className="w-full max-w-2xl bg-white h-full overflow-y-auto shadow-2xl flex flex-col"
                    >
                        <div className="p-6 border-b border-stone-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h3 className="font-serif text-xl">{editingPost.id ? 'Modifica Articolo' : 'Nuovo Articolo'}</h3>
                            <button onClick={() => setEditingPost(null)} className="text-stone-400 hover:text-stone-800">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="p-8 space-y-6 flex-1">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Titolo</label>
                                <input
                                    type="text"
                                    value={editingPost.title}
                                    onChange={e => setEditingPost({ ...editingPost, title: e.target.value })}
                                    className="w-full bg-stone-50 border border-stone-200 rounded p-3 font-serif text-xl outline-none focus:border-[#d4af37]"
                                    placeholder="Es. Il potere del tocco"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Categoria</label>
                                    <select
                                        value={editingPost.category}
                                        onChange={e => setEditingPost({ ...editingPost, category: e.target.value })}
                                        className="w-full bg-stone-50 border border-stone-200 rounded p-3 text-sm outline-none focus:border-[#d4af37]"
                                    >
                                        <option value="Mindset">Mindset</option>
                                        <option value="Story">Storytelling</option>
                                        <option value="Rituals">Rituali e Trattamenti</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Stato</label>
                                    <select
                                        value={editingPost.published ? 'true' : 'false'}
                                        onChange={e => setEditingPost({ ...editingPost, published: e.target.value === 'true' })}
                                        className="w-full bg-stone-50 border border-stone-200 rounded p-3 text-sm outline-none focus:border-[#d4af37]"
                                    >
                                        <option value="false">Bozza (Invisibile)</option>
                                        <option value="true">Pubblicato (Visibile)</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Immagine Copertina (URL Unsplash)</label>
                                <input
                                    type="text"
                                    value={editingPost.image_url}
                                    onChange={e => setEditingPost({ ...editingPost, image_url: e.target.value })}
                                    className="w-full bg-stone-50 border border-stone-200 rounded p-3 text-sm outline-none focus:border-[#d4af37]"
                                    placeholder="https://images.unsplash.com/..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Contenuto (Testo dell'articolo)</label>
                                <textarea
                                    value={editingPost.content}
                                    onChange={e => setEditingPost({ ...editingPost, content: e.target.value })}
                                    className="w-full bg-stone-50 border border-stone-200 rounded p-3 text-base h-96 outline-none focus:border-[#d4af37] resize-none"
                                    placeholder="Inizia a scrivere qui..."
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-stone-100 bg-stone-50 sticky bottom-0">
                            <button
                                onClick={handleSave}
                                className="w-full bg-[#c07a60] text-white py-3 rounded text-sm uppercase tracking-widest font-bold hover:bg-[#a8654d] transition-colors flex items-center justify-center gap-2"
                            >
                                <Check className="w-4 h-4" /> Salva Articolo
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AdminLayout>
    );
};

export default JournalEditor;

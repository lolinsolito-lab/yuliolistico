import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { ArrowLeft, ArrowUpRight, Clock, Calendar, Share2, Facebook, Twitter, Linkedin, Link2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCanonical } from '../../hooks/useCanonical';

interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string;
  category: string;
  created_at: string;
}

const JournalPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  useCanonical(`https://yuliolistico.com/journal/${id}`);
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (data) setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f8] pt-32 pb-20 flex items-center justify-center">
        <div className="text-stone-400 font-serif italic text-xl animate-pulse">Caricamento...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#faf9f8] pt-32 pb-20 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-serif mb-4">Articolo non trovato</h1>
        <button onClick={() => navigate('/journal')} className="text-[#c07a60] underline">
          Torna al Journal
        </button>
      </div>
    );
  }

  // Basic paragraph splitting for reading view
  const paragraphs = post.content.split('\n\n').filter(p => p.trim() !== '');

  return (
    <article className="min-h-screen bg-[#faf9f8] pt-24 pb-24 selection:bg-[#d4af37]/30">
      
      {/* Hero Image */}
      <div className="w-full h-[60vh] md:h-[70vh] relative mb-16">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img 
          src={post.image_url} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-white/90 px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold text-stone-800 mb-6 inline-block">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-white max-w-4xl mx-auto leading-tight drop-shadow-lg">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <button 
          onClick={() => navigate('/journal')}
          className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-800 transition-colors mb-12"
        >
          <ArrowLeft className="w-3 h-3" /> Torna alla Galleria
        </button>

        {/* Content */}
        <div className="prose prose-stone prose-lg md:prose-xl max-w-none">
          {paragraphs.map((p, i) => (
            <motion.p 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`font-light text-stone-600 leading-relaxed mb-8 ${i === 0 ? 'text-xl md:text-2xl font-serif text-stone-800' : ''}`}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 pt-10 border-t border-stone-200 text-center">
          <p className="text-stone-500 italic mb-6">Vuoi esplorare l'archivio gratuito o prenotare un rituale?</p>
          <div className="flex gap-6 justify-center">
            <button onClick={() => navigate('/archivio')} className="text-xs uppercase tracking-widest font-bold text-stone-800 border-b border-stone-800 pb-1">
              Archivio Gratuito
            </button>
            <button onClick={() => navigate('/prenota')} className="text-xs uppercase tracking-widest font-bold text-[#c07a60] border-b border-[#c07a60] pb-1 flex items-center gap-1">
              Prenota Ora <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

    </article>
  );
};

export default JournalPostPage;

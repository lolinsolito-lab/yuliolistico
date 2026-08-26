import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string;
  category: string;
  created_at: string;
}

const JournalPage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (data) setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f8] pt-32 pb-20 flex items-center justify-center">
        <div className="text-stone-400 font-serif italic text-xl animate-pulse">Caricamento Saggezza...</div>
      </div>
    );
  }

  // Split posts for asymmetric layout: first post is featured (full width)
  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-[#faf9f8] pt-32 pb-20 selection:bg-[#d4af37]/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20 max-w-2xl mx-auto"
        >
          <div className="flex justify-center mb-6">
            <Sparkles className="w-6 h-6 text-[#d4af37]" />
          </div>
          <span className="text-[#849b87] uppercase tracking-[0.3em] text-xs font-bold block mb-4">
            Il Journal Olistico
          </span>
          <h1 className="text-5xl md:text-6xl font-serif text-[#292524] mb-6 leading-tight">
            Saggezza <span className="italic text-[#d4af37]">Ancestrale.</span>
          </h1>
          <p className="text-stone-500 font-light text-lg leading-relaxed">
            Riflessioni, storie e approfondimenti sui rituali per elevare la tua consapevolezza corporea e spirituale.
          </p>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20 cursor-pointer group"
            onClick={() => navigate(`/journal/${featuredPost.id}`)}
          >
            <div className="relative aspect-[2/1] md:aspect-[21/9] overflow-hidden rounded-sm mb-6">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
              <img 
                src={featuredPost.image_url} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]"
              />
              <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-sm px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold text-stone-800">
                {featuredPost.category}
              </div>
            </div>
            <div className="max-w-3xl mx-auto text-center px-4">
              <h2 className="text-3xl md:text-4xl font-serif text-[#292524] mb-4 group-hover:text-[#c07a60] transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-stone-500 font-light line-clamp-2 text-lg mb-6">
                {featuredPost.content.substring(0, 150)}...
              </p>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border-b border-stone-300 pb-1 group-hover:border-[#c07a60] group-hover:text-[#c07a60] transition-colors">
                Leggi l'articolo <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </motion.div>
        )}

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 gap-x-8">
          {gridPosts.map((post, index) => {
            // Create an asymmetrical masonry-like feel
            const isLarge = index % 5 === 0 || index % 5 === 3;
            const colSpan = isLarge ? 'md:col-span-7' : 'md:col-span-5';
            
            return (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`group cursor-pointer ${colSpan} flex flex-col`}
                onClick={() => navigate(`/journal/${post.id}`)}
              >
                <div className={`relative overflow-hidden mb-5 ${isLarge ? 'aspect-[4/3]' : 'aspect-[3/4]'}`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={post.image_url} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-white/90 px-3 py-1 text-[9px] uppercase tracking-widest font-bold text-stone-800">
                    {post.category}
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-[#292524] mb-3 group-hover:text-[#c07a60] transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-stone-500 font-light text-sm line-clamp-3 mb-4">
                  {post.content.substring(0, 120)}...
                </p>
                <div className="mt-auto">
                  <span className="text-[10px] uppercase tracking-widest text-[#d4af37] border-b border-[#d4af37]/30 pb-0.5 group-hover:border-[#d4af37] transition-colors">
                    Esplora
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default JournalPage;

import React from 'react';
import { JOURNAL_POSTS } from '../data/journalPosts';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Journal: React.FC = () => {
  return (
    <section id="journal" className="py-16 bg-white px-6 border-t border-[#292524]/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#849b87] uppercase tracking-[0.2em] text-xs font-bold">L'Archivio Olistico</span>
            <h2 className="text-4xl font-serif text-[#292524] mt-3">
              Saggezza Ancestrale.
            </h2>
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center gap-2 text-[#c07a60] uppercase tracking-widest text-xs font-bold border-b border-[#c07a60] pb-1 hover:text-[#292524] hover:border-[#292524] transition-all"
          >
            Leggi l'Editoriale <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden mb-4 aspect-[3/2] relative">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#a8a29e]">{post.category}</span>
                <h3 className="text-2xl font-serif text-[#292524] group-hover:text-[#c07a60] transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-[#57534e] text-sm font-light leading-relaxed line-clamp-2">
                  {post.preview}
                </p>
                <span className="text-xs underline decoration-[#d4af37] underline-offset-4 mt-2 inline-block opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                  Leggi Articolo
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journal;
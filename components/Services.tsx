import React from 'react';
import { SERVICES } from '../constants';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-[#292524]/10 pb-8">
          <div>
            <span className="text-[#c07a60] uppercase tracking-[0.2em] text-xs font-bold">Collezione Rituali</span>
            <h2 className="text-4xl md:text-7xl font-serif text-[#292524] mt-2">Signature.</h2>
          </div>
          <p className="max-w-md text-[#57534e] mt-6 md:mt-0 font-light text-right">
            Non semplici trattamenti, ma esperienze trasformative. <br/>
            Scegli come vuoi sentirti oggi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-stone-200">
                 {/* Image Hover Effect */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                />
                
                {/* Overlay Button */}
                <div className="absolute bottom-6 right-6 z-20 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full text-[#292524]">
                        <ArrowUpRight className="w-5 h-5" />
                    </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-6 left-6 z-20">
                    <span className="bg-white/90 backdrop-blur-sm px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-[#292524]">
                        {service.category}
                    </span>
                </div>
              </div>

              <div className="pr-4">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-3xl font-serif text-[#292524] leading-none group-hover:text-[#c07a60] transition-colors">
                    {service.title}
                    </h3>
                </div>
                
                <p className="text-[#57534e] text-sm leading-relaxed mb-4 border-l border-[#d4af37] pl-4">
                    {service.description}
                </p>

                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#a8a29e]">
                    <span>{service.duration}</span>
                    <span className="w-1 h-1 bg-[#d4af37] rounded-full"></span>
                    <span className="text-[#292524]">{service.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
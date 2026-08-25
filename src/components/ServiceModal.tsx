import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Sparkles } from 'lucide-react';
import { Service } from '../types';

interface ServiceModalProps {
    service: Service | null;
    isOpen: boolean;
    onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, isOpen, onClose }) => {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!service) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center pointer-events-none">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto cursor-pointer"
                    />

                    {/* Modal Content - Bottom Sheet on Mobile, Centered Card on Desktop */}
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="pointer-events-auto bg-[#faf9f6] w-full md:max-w-4xl md:h-[85vh] h-[92vh] md:rounded-2xl rounded-t-3xl shadow-2xl relative flex flex-col overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* 1. Header Image Section */}
                        <div className="relative h-64 md:h-80 w-full flex-shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f6] via-transparent to-black/30 z-10" />
                            <img
                                src={service.imageUrl}
                                alt={service.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-6 left-6 md:left-10 z-20">
                                <span className="inline-block px-3 py-1 mb-3 text-[10px] tracking-[0.2em] uppercase font-bold text-white bg-black/30 backdrop-blur-sm rounded-full border border-white/10">
                                    {service.category}
                                </span>
                                <h2 className="text-3xl md:text-5xl font-serif text-[#292524]">{service.title}</h2>
                            </div>
                        </div>

                        {/* 2. Scrollable Body */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-10 space-y-12 pb-32 custom-scrollbar">

                            {/* THE SOUL (L'Anima) */}
                            {service.soul_description && (
                                <div className="space-y-4 max-w-2xl">
                                    <div className="flex items-center gap-3">
                                        <Sparkles className="w-5 h-5 text-[#849b87]" />
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#849b87]">L'Anima del Rituale</h3>
                                    </div>
                                    <p className="font-serif text-xl md:text-2xl text-[#57534e] italic leading-relaxed">
                                        "{service.soul_description}"
                                    </p>
                                </div>
                            )}

                            {/* THE GIFTS (I Doni - Benefits) */}
                            {service.benefits && service.benefits.length > 0 && (
                                <div className="space-y-6">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#c07a60]">I Doni (Benefici)</h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {service.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                                                <div className="mt-1 w-2 h-2 rounded-full bg-[#c07a60] flex-shrink-0" />
                                                <span className="text-[#57534e] text-lg font-light">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* DESCRIPTION (Standard) */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Il Percorso</h3>
                                <p className="text-[#57534e] leading-relaxed text-lg">
                                    {service.description}
                                </p>
                            </div>

                        </div>

                        {/* 3. Sticky Footer Action */}
                        <div className="absolute bottom-0 left-0 w-full p-6 bg-white/80 backdrop-blur-md border-t border-stone-200 flex items-center justify-between md:rounded-b-2xl">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 text-[#57534e]">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm uppercase tracking-wider">{service.duration}</span>
                                </div>
                                <span className="font-serif text-2xl text-[#c07a60]">{service.price}</span>
                            </div>

                            <a
                                href="https://wa.me/393201982629" // Update with real booking link if context allows
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-[#292524] text-[#f3e9d2] text-sm font-bold uppercase tracking-widest rounded-full hover:bg-[#c07a60] transition-colors shadow-lg shadow-[#c07a60]/20"
                            >
                                Prenota Esperienza
                            </a>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ServiceModal;

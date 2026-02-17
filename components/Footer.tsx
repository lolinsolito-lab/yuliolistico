import React from 'react';
import { Instagram, Mail, Phone } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#292524] text-[#a8a29e] py-16 px-6 border-t border-[#44403c]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Logo className="w-8 h-8 text-[#849b87]" color="currentColor" />
            <h3 className="text-white font-serif text-2xl">Yuli Olistico</h3>
          </div>
          <p className="font-light text-sm leading-relaxed max-w-sm mb-6">
            "L'arte del tocco, l'equilibrio dell'anima."
            <br/><br/>
            Un rifugio per ritrovare armonia tra corpo e mente attraverso trattamenti olistici personalizzati.
          </p>
          <div className="text-xs opacity-60 max-w-md">
            <p className="mb-2 font-bold uppercase tracking-wider text-[#c07a60]">Note Legali</p>
            <p>
              Attività professionale disciplinata ai sensi della Legge 4/2013. 
              I trattamenti offerti sono di natura olistica e finalizzati al benessere psicofisico. 
              Non sono prestazioni sanitarie, mediche o estetiche e non si sostituiscono in alcun modo al parere medico.
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-white font-serif text-lg mb-6">Contatti</h4>
          <div className="space-y-4 text-sm font-light">
            <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
              <Mail className="w-4 h-4" />
              <span>info@yuliolistico.com</span>
            </div>
            <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
              <Phone className="w-4 h-4" />
              <span>+39 333 000 0000</span>
            </div>
            <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
              <Instagram className="w-4 h-4" />
              <span>@yuli_olistico</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-white font-serif text-lg mb-6">Orari Studio</h4>
          <ul className="space-y-2 text-sm font-light">
            <li className="flex justify-between max-w-[200px]">
              <span>Lun - Ven</span>
              <span>09:00 - 19:00</span>
            </li>
            <li className="flex justify-between max-w-[200px]">
              <span>Sabato</span>
              <span>10:00 - 17:00</span>
            </li>
            <li className="flex justify-between max-w-[200px]">
              <span>Domenica</span>
              <span>Riposo</span>
            </li>
          </ul>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest opacity-50">
        <span>© 2024 Yuli Olistico. All rights reserved.</span>
        <span>P.IVA 00000000000</span>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { Calendar, Droplets, History, User } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="bg-[#faf9f6] min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <span className="text-[#849b87] uppercase tracking-widest text-sm">Benvenuta</span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#292524] mt-2">Giulia Rossi</h1>
          </div>
          <div className="hidden md:block">
            <button className="bg-[#292524] text-white px-6 py-3 uppercase tracking-widest text-xs hover:bg-[#c07a60] transition-colors">
              Prenota Nuovo Rituale
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Next Appointment */}
          <div className="bg-white p-8 shadow-sm border border-[#e7e5e4] col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#f3e9d2] p-3 rounded-full">
                <Calendar className="w-6 h-6 text-[#c07a60]" />
              </div>
              <h2 className="text-xl font-serif text-[#292524]">Prossimo Rituale</h2>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center bg-[#faf9f6] p-6 border-l-4 border-[#849b87]">
              <div>
                <p className="text-lg font-bold text-[#292524]">Rituale Olistico Drenante</p>
                <p className="text-[#57534e]">Giovedì, 24 Ottobre • 17:30</p>
                <p className="text-sm text-[#a8a29e] mt-1">Presso: Studio Privato Bergamo</p>
              </div>
              <span className="mt-4 md:mt-0 px-4 py-1 bg-[#849b87]/10 text-[#849b87] text-xs uppercase tracking-widest font-bold">
                Confermato
              </span>
            </div>
          </div>

          {/* Card 2: Holistic Tips (Dynamic) */}
          <div className="bg-[#849b87] p-8 shadow-sm text-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white/20 p-3 rounded-full">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-serif">Consiglio Energetico</h2>
            </div>
            <p className="font-light italic leading-relaxed mb-6 opacity-90">
              "Dopo il rituale distensivo, concediti momenti di silenzio e bevi tisane calde per prolungare l'effetto di rilassamento."
            </p>
            <div className="pt-6 border-t border-white/20">
              <span className="text-xs uppercase tracking-widest opacity-70 block mb-2">Essenza Suggerita</span>
              <p className="font-serif text-lg">Olio essenziale di Cipresso</p>
            </div>
          </div>

          {/* Card 3: History */}
          <div className="bg-white p-8 shadow-sm border border-[#e7e5e4] col-span-1 md:col-span-3">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#f3e9d2] p-3 rounded-full">
                <History className="w-6 h-6 text-[#c07a60]" />
              </div>
              <h2 className="text-xl font-serif text-[#292524]">Il Tuo Percorso</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-xs uppercase tracking-widest text-[#a8a29e] border-b border-[#e7e5e4]">
                  <tr>
                    <th className="pb-4">Data</th>
                    <th className="pb-4">Trattamento</th>
                    <th className="pb-4">Luogo</th>
                    <th className="pb-4 text-right">Stato</th>
                  </tr>
                </thead>
                <tbody className="text-[#57534e]">
                  <tr className="border-b border-[#faf9f6]">
                    <td className="py-4">10 Ott 2023</td>
                    <td className="py-4">Massaggio Tradizionale Thai</td>
                    <td className="py-4">Baan Thai</td>
                    <td className="py-4 text-right text-xs uppercase text-[#849b87]">Completato</td>
                  </tr>
                  <tr>
                    <td className="py-4">25 Set 2023</td>
                    <td className="py-4">Wood Massage</td>
                    <td className="py-4">I Club San Marco</td>
                    <td className="py-4 text-right text-xs uppercase text-[#849b87]">Completato</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
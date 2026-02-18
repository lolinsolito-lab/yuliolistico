import React, { useState } from 'react';
import { SERVICES } from '../constants';
import { Calendar, Clock, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BookingCalendar: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [legalAccepted, setLegalAccepted] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // Anti-bot

  // Mock dates (next 5 days)
  const today = new Date();
  const dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return d;
  });

  const timeSlots = [
    "09:00", "10:30", "12:00", "14:30", "16:00", "17:30", "19:00"
  ];

  const handleBooking = () => {
    // Anti-bot check
    if (honeypot) return;
    if (!legalAccepted) return;

    setIsSubmitting(true);
    // Simulation of API Call to Google Calendar
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
    }, 2000);
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  return (
    <div className="bg-white shadow-xl border border-[#e7e5e4] max-w-4xl mx-auto overflow-hidden min-h-[500px] flex flex-col">
      {/* Header Progress */}
      <div className="bg-[#faf9f6] p-4 flex justify-between items-center border-b border-[#e7e5e4]">
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-2 w-16 rounded-full transition-colors ${step >= s ? 'bg-[#849b87]' : 'bg-[#e7e5e4]'}`} />
          ))}
        </div>
        <span className="text-xs uppercase tracking-widest text-[#a8a29e]">
          {step === 1 && "Scegli Rituale"}
          {step === 2 && "Data & Ora"}
          {step === 3 && "Conferma"}
          {step === 4 && "Completato"}
        </span>
      </div>

      <div className="p-8 flex-grow relative">
        <AnimatePresence mode="wait">

          {/* Step 1: Select Service */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-serif text-[#292524] mb-6">Seleziona il tuo Rituale</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`p-4 border cursor-pointer transition-all flex justify-between items-center group ${selectedService === service.id
                        ? 'border-[#849b87] bg-[#849b87]/5'
                        : 'border-[#e7e5e4] hover:border-[#c07a60]'
                      }`}
                  >
                    <div>
                      <h4 className="font-serif text-[#292524]">{service.title}</h4>
                      <span className="text-xs text-[#a8a29e] uppercase tracking-wider">{service.duration} • {service.price}</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border border-[#a8a29e] flex items-center justify-center ${selectedService === service.id ? 'border-[#849b87]' : ''}`}>
                      {selectedService === service.id && <div className="w-2 h-2 rounded-full bg-[#849b87]" />}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-8">
                <button
                  disabled={!selectedService}
                  onClick={() => setStep(2)}
                  className="bg-[#292524] text-white px-8 py-3 uppercase tracking-widest text-xs disabled:opacity-50 hover:bg-[#c07a60] transition-colors"
                >
                  Avanti
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="text-2xl font-serif text-[#292524] mb-6">Scegli il Momento</h3>

              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest text-[#849b87] mb-3">Giorni Disponibili</p>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {dates.map((date) => {
                    const dateStr = date.toISOString().split('T')[0];
                    const dayName = date.toLocaleDateString('it-IT', { weekday: 'short' });
                    const dayNum = date.getDate();
                    return (
                      <button
                        key={dateStr}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`min-w-[70px] p-3 text-center border transition-all ${selectedDate === dateStr
                            ? 'bg-[#292524] text-white border-[#292524]'
                            : 'bg-white text-[#57534e] border-[#e7e5e4] hover:border-[#c07a60]'
                          }`}
                      >
                        <span className="block text-xs uppercase">{dayName}</span>
                        <span className="block text-xl font-serif">{dayNum}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {selectedDate && (
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-widest text-[#849b87] mb-3">Orari Disponibili</p>
                  <div className="grid grid-cols-4 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 text-sm border transition-all ${selectedTime === time
                            ? 'bg-[#849b87] text-white border-[#849b87]'
                            : 'text-[#57534e] border-[#e7e5e4] hover:border-[#c07a60]'
                          }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button onClick={() => setStep(1)} className="text-[#a8a29e] hover:text-[#292524] text-xs uppercase tracking-widest flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4" /> Indietro
                </button>
                <button
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep(3)}
                  className="bg-[#292524] text-white px-8 py-3 uppercase tracking-widest text-xs disabled:opacity-50 hover:bg-[#c07a60] transition-colors"
                >
                  Avanti
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="text-2xl font-serif text-[#292524] mb-6">Riepilogo Prenotazione</h3>

              <div className="bg-[#faf9f6] p-6 border border-[#e7e5e4] mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-white p-2 rounded-full border border-[#e7e5e4]">
                    <CheckCircle className="w-5 h-5 text-[#849b87]" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#a8a29e]">Esperienza</p>
                    <p className="text-lg font-serif text-[#292524]">
                      {SERVICES.find(s => s.id === selectedService)?.title}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white p-2 rounded-full border border-[#e7e5e4]">
                    <Calendar className="w-5 h-5 text-[#c07a60]" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#a8a29e]">Data e Ora</p>
                    <p className="text-lg font-serif text-[#292524]">
                      {selectedDate} alle {selectedTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Legal Disclaimer Checkbox */}
              <label className="flex items-start gap-3 p-4 border border-[#e7e5e4] bg-white mb-6 cursor-pointer hover:border-[#849b87] transition-colors">
                <input
                  type="checkbox"
                  checked={legalAccepted}
                  onChange={(e) => setLegalAccepted(e.target.checked)}
                  className="mt-1 accent-[#849b87] w-4 h-4"
                />
                <span className="text-xs text-[#57534e] leading-relaxed">
                  Confermo di aver compreso che i servizi offerti da Yuli Olistico sono di natura olistica e del benessere
                  (ai sensi L.4/2013) e non hanno finalità medico-sanitarie. Accetto i
                  <span className="text-[#c07a60] underline">Termini e Condizioni</span> e la
                  <span className="text-[#c07a60] underline">Privacy Policy</span>.
                </span>
              </label>

              {/* Honeypot anti-bot (hidden) */}
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ position: 'absolute', left: '-9999px', tabIndex: -1 } as any}
                autoComplete="off"
                aria-hidden="true"
              />

              {isSubmitting ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-12 h-12 border-4 border-[#849b87] border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-[#849b87] font-serif">Sincronizzazione con Google Calendar...</p>
                </div>
              ) : (
                <div className="flex justify-between mt-8">
                  <button onClick={() => setStep(2)} className="text-[#a8a29e] hover:text-[#292524] text-xs uppercase tracking-widest flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" /> Indietro
                  </button>
                  <button
                    onClick={handleBooking}
                    disabled={!legalAccepted}
                    className="bg-[#849b87] text-white px-8 py-3 uppercase tracking-widest text-xs hover:bg-[#6b7e6d] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Conferma Prenotazione
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-[#849b87] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-serif text-[#292524] mb-4">Richiesta Ricevuta!</h3>
              <p className="text-[#57534e] max-w-md mx-auto mb-8">
                Grazie per la tua richiesta! Ti ricontatterò entro 24h per confermare l'appuntamento.
                Per urgenze puoi scrivermi a yuliolistico@gmail.com
              </p>
              <button
                onClick={resetBooking}
                className="text-[#c07a60] border-b border-[#c07a60] pb-1 uppercase tracking-widest text-xs"
              >
                Prenota un altro trattamento
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookingCalendar;
import React from 'react';
import BookingCalendar from '../components/BookingCalendar';

const BookingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#faf9f6] pt-28 pb-20 px-4">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-4xl md:text-5xl font-serif text-[#292524] mb-4">Prenota la tua Armonia</h2>
        <p className="text-[#57534e] font-light leading-relaxed">
          Seleziona il trattamento e l'orario che preferisci. 
          Il sistema sincronizzerà automaticamente la tua richiesta con il calendario dello studio.
          <br/>
          <span className="text-xs italic text-[#a8a29e] mt-2 block">
            Trattamenti esclusivamente olistici ai sensi della Legge 4/2013.
          </span>
        </p>
      </div>
      
      <BookingCalendar />
    </div>
  );
};

export default BookingPage;
import React, { useState, useEffect } from 'react';
import { Instagram, Mail, Phone, X } from 'lucide-react';
import Logo from './Logo';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

// Default footer data (fallback)
const FOOTER_DEFAULTS = {
  brand_name: 'Yuli Olistico',
  email: 'yuliolistico@gmail.com',
  phone: '+39 320 198 26 29',
  address: 'Bergamo e provincia',
  social_links: { instagram: '@yuli_olistico' } as Record<string, string>,
};

// Legal popup modal content
const LEGAL_CONTENT: Record<string, { title: string; content: string }> = {
  privacy: {
    title: 'Privacy Policy',
    content: `INFORMATIVA SULLA PRIVACY — Yuli Olistico

Titolare del Trattamento: Yuliantini Yuliantini
Email: yuliolistico@gmail.com

1. DATI RACCOLTI
Raccogliamo solo i dati necessari per gestire le prenotazioni: nome, cognome, email, numero di telefono. Non raccogliamo dati clinici o sanitari.

2. FINALITÀ DEL TRATTAMENTO E AUTOMAZIONE (AI)
I dati personali sono trattati per:
• Gestione delle prenotazioni e comunicazioni relative al servizio
• Erogazione di valutazioni olistiche personalizzate tramite il "Motore Olistico" (Quiz)
• Invio di comunicazioni automatizzate e suggerimenti su misura, anche tramite l'ausilio di algoritmi e strumenti di Intelligenza Artificiale (AI), al fine di personalizzare l'esperienza olistica
• Invio di comunicazioni promozionali (solo con consenso esplicito)
• Adempimenti di legge

3. BASE GIURIDICA
Il trattamento si basa sul consenso dell'interessato e sull'esecuzione del contratto di servizio. L'elaborazione algoritmica ha il solo scopo di ottimizzare il servizio offerto.

4. CONSERVAZIONE E PROTEZIONE AI
I dati vengono conservati per il tempo strettamente necessario (max 24 mesi). Qualora i dati vengano processati da sistemi di automazione o AI, garantiamo che nessun dato personale verrà mai venduto a terzi, ceduto per scopi di marketing esterno o utilizzato per addestrare modelli linguistici pubblici.

5. DIRITTI DELL'INTERESSATO
Ai sensi degli artt. 15-22 del GDPR, hai diritto di: accesso, rettifica, cancellazione, portabilità e opposizione al trattamento automatizzato (profilazione). Scrivi a yuliolistico@gmail.com.

6. SICUREZZA
Adottiamo misure tecniche e organizzative appropriate, crittografia avanzata e rigidi controlli di accesso per proteggere i tuoi dati personali, anche quando elaborati da sistemi automatizzati.

Ultimo aggiornamento: Agosto 2026`
  },
  cookies: {
    title: 'Cookie Policy',
    content: `COOKIE POLICY — Yuli Olistico

Questo sito utilizza esclusivamente cookie tecnici necessari per il corretto funzionamento del sito. Non utilizziamo cookie di profilazione o di terze parti a fini pubblicitari.

COOKIE TECNICI UTILIZZATI:
• Cookie di sessione: necessari per la navigazione
• Cookie di preferenza: per memorizzare le tue scelte

Non è richiesto il consenso per i cookie tecnici ai sensi dell'art. 122 del Codice Privacy (D.Lgs. 196/2003) come modificato dal D.Lgs. 101/2018.

Per qualsiasi domanda, contattaci a yuliolistico@gmail.com.

Ultimo aggiornamento: Agosto 2026`
  },
  terms: {
    title: 'Termini e Condizioni',
    content: `TERMINI E CONDIZIONI — Yuli Olistico

1. NATURA DEI SERVIZI E "MOTORE OLISTICO"
I servizi offerti da Yuli Olistico sono di natura olistica e del benessere, ai sensi della Legge 4/2013 (Disposizioni in materia di professioni non organizzate). NON sono prestazioni sanitarie, mediche, fisioterapiche o estetiche e non sostituiscono in alcun modo il parere, la diagnosi o il trattamento medico. 
Il "Motore Olistico" (Quiz) presente sul sito è un algoritmo basato su regole preimpostate (non Intelligenza Artificiale generativa) e serve unicamente ad abbinare parole chiave ai trattamenti di benessere offerti. Non elabora diagnosi mediche e non conserva dati sanitari.

2. PRENOTAZIONI E CANCELLAZIONI
• Le prenotazioni si intendono confermate previo contatto diretto
• Cancellazione gratuita entro 24 ore prima dell'appuntamento
• Cancellazione tardiva (< 24h) o mancata presentazione: addebito del 50% del costo del servizio
• In caso di ritardo superiore a 15 minuti, il trattamento potrebbe essere ridotto o annullato

3. PAGAMENTI
• Il pagamento avviene al termine del trattamento
• Metodi accettati: contanti, bonifico bancario, Satispay
• I prezzi esposti sono comprensivi di IVA ove applicabile

4. RESPONSABILITÀ DEL CLIENTE
• Il cliente è tenuto a comunicare eventuali condizioni di salute, allergie o patologie prima del trattamento
• L'operatrice si riserva il diritto di rifiutare o interrompere il trattamento se ritiene che possa essere inappropriato per la persona
• Yuli Olistico non è responsabile per eventuali reazioni individuali ai trattamenti

5. SERVIZIO A DOMICILIO
• Per i servizi a domicilio è previsto un supplemento di €20
• L'area di copertura è limitata a Bergamo e provincia
• È necessario garantire uno spazio adeguato e pulito per il trattamento

6. PROPRIETÀ INTELLETTUALE
Tutti i contenuti del sito (testi, immagini, design) sono di proprietà di Yuli Olistico e non possono essere riprodotti senza autorizzazione.

7. FORO COMPETENTE
Per qualsiasi controversia è competente il Foro di Bergamo.

Ultimo aggiornamento: Febbraio 2026`
  }
};

// Legal Popup Component
const LegalPopup: React.FC<{ type: string; onClose: () => void }> = ({ type, onClose }) => {
  const content = LEGAL_CONTENT[type];
  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#faf9f6] max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#292524] text-white p-5 flex justify-between items-center">
          <h3 className="font-serif text-lg">{content.title}</h3>
          <button onClick={onClose} className="hover:text-[#c07a60] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 md:p-8 text-[#57534e] text-sm leading-relaxed whitespace-pre-line font-light">
          {content.content}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Footer: React.FC = () => {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [footerData, setFooterData] = useState(FOOTER_DEFAULTS);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const { data } = await supabase
          .from('business_profile')
          .select('brand_name, email, phone, address, social_links')
          .limit(1)
          .maybeSingle();

        if (data) {
          setFooterData(prev => ({
            ...prev,
            ...Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null && v !== '')),
            social_links: data.social_links && Object.keys(data.social_links).length > 0
              ? data.social_links
              : prev.social_links,
          }));
        }
      } catch (err) {
        console.warn('Footer: using fallback data');
      }
    };
    fetchFooterData();
  }, []);

  const igHandle = footerData.social_links.instagram || '@yuli_olistico';
  const igUrl = igHandle.startsWith('http')
    ? igHandle
    : `https://instagram.com/${igHandle.replace('@', '')}`;

  return (
    <>
      <footer className="bg-[#292524] text-[#a8a29e] py-6 md:py-10 px-6 border-t border-[#44403c]">
        {/* Main Footer Content - Compact 2 columns on mobile, 3 on desktop */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 md:gap-8 items-start">

          {/* Brand + Quote */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Logo className="w-6 h-6 text-[#849b87]" color="currentColor" />
              <h3 className="text-white font-serif text-lg">{footerData.brand_name}</h3>
            </div>
            <p className="font-light text-xs leading-relaxed max-w-xs opacity-80 italic">
              "Ogni corpo ha una storia. Ogni rituale la ascolta."
            </p>
            <p className="font-light text-[10px] leading-relaxed max-w-xs opacity-50 mt-2">
              Benessere naturale • Bergamo, Italia
            </p>
          </div>

          {/* Contacts */}
          <div className="space-y-2 text-sm font-light">
            <p className="text-white text-xs uppercase tracking-widest mb-3 font-bold">Contatti</p>
            <a href={`mailto:${footerData.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5" /> {footerData.email}
            </a>
            <a href={`tel:${footerData.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" /> {footerData.phone}
            </a>
            <a href={igUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <Instagram className="w-3.5 h-3.5" /> {igHandle}
            </a>
          </div>

          {/* Info */}
          <div className="space-y-2 text-sm font-light">
            <p className="text-white text-xs uppercase tracking-widest mb-3 font-bold">Info</p>
            <p className="opacity-80">📍 {footerData.address}</p>
            <p className="opacity-80">🗓️ Solo su appuntamento</p>
            <p className="opacity-80">🚗 Servizio a domicilio disponibile</p>
          </div>

        </div>

        {/* Legal disclaimer + links */}
        <div className="max-w-7xl mx-auto mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/10">
          <p className="text-[8px] md:text-[10px] text-white/40 leading-relaxed max-w-3xl mb-3 md:mb-6 text-center md:text-left mx-auto md:mx-0">
            Attività professionale disciplinata ai sensi della Legge 4/2013. I trattamenti offerti sono di natura olistica
            e finalizzati al benessere psicofisico. Non sono prestazioni sanitarie, mediche o estetiche e non si sostituiscono
            in alcun modo al parere medico.
          </p>

          <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-[8px] md:text-[10px] uppercase tracking-widest opacity-50 text-center md:text-left">
            <span className="order-2 md:order-1 mt-1 md:mt-0">© 2026 Yuli Olistico. Tutti i diritti riservati.</span>
            <div className="order-1 md:order-2 flex flex-wrap justify-center md:justify-end items-center gap-x-2 md:gap-x-3 gap-y-1">
              <a
                href="https://www.michaelluminels.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[8px] md:text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity flex items-center gap-1"
              >
                Created by <span className="font-bold text-[#d4af37]">Insolito</span>
              </a>
              <span className="hidden md:inline text-white/20">|</span>
              <button
                onClick={() => setActivePopup('privacy')}
                className="hover:text-white hover:opacity-100 transition-all cursor-pointer bg-transparent border-none text-[#a8a29e] uppercase tracking-widest text-[8px] md:text-[10px]"
              >
                Privacy Policy
              </button>
              <span className="hidden md:inline text-white/20">|</span>
              <button
                onClick={() => setActivePopup('cookies')}
                className="hover:text-white hover:opacity-100 transition-all cursor-pointer bg-transparent border-none text-[#a8a29e] uppercase tracking-widest text-[8px] md:text-[10px]"
              >
                Cookie
              </button>
              <span className="hidden md:inline text-white/20">|</span>
              <button
                onClick={() => setActivePopup('terms')}
                className="hover:text-white hover:opacity-100 transition-all cursor-pointer bg-transparent border-none text-[#a8a29e] uppercase tracking-widest text-[8px] md:text-[10px]"
              >
                Termini
              </button>
            </div>
          </div>
        </div>

        {/* Scrolling Ticker Bar */}
        <div className="mt-6 -mx-6 -mb-10 overflow-hidden bg-[#1c1917] py-2.5 border-t border-white/5">
          <div className="ticker-track">
            <div className="ticker-content">
              <span>Il silenzio è il vero lusso</span>
              <span className="ticker-dot">✦</span>
              <span>Esperienze su misura</span>
              <span className="ticker-dot">✦</span>
              <span>Solo su appuntamento</span>
              <span className="ticker-dot">✦</span>
              <span>Non è per tutti. È per te</span>
              <span className="ticker-dot">✦</span>
              <span>Ogni corpo racconta</span>
              <span className="ticker-dot">✦</span>
              <span>8+ anni di eccellenza</span>
              <span className="ticker-dot">✦</span>
              <span>Bergamo &amp; Milano</span>
              <span className="ticker-dot">✦</span>
              <span>Benessere, mai estetica</span>
              <span className="ticker-dot">✦</span>
            </div>
            <div className="ticker-content" aria-hidden="true">
              <span>Il silenzio è il vero lusso</span>
              <span className="ticker-dot">✦</span>
              <span>Esperienze su misura</span>
              <span className="ticker-dot">✦</span>
              <span>Solo su appuntamento</span>
              <span className="ticker-dot">✦</span>
              <span>Non è per tutti. È per te</span>
              <span className="ticker-dot">✦</span>
              <span>Ogni corpo racconta</span>
              <span className="ticker-dot">✦</span>
              <span>8+ anni di eccellenza</span>
              <span className="ticker-dot">✦</span>
              <span>Bergamo &amp; Milano</span>
              <span className="ticker-dot">✦</span>
              <span>Benessere, mai estetica</span>
              <span className="ticker-dot">✦</span>
            </div>
          </div>
          <style>{`
            .ticker-track {
              display: flex;
              width: max-content;
              animation: ticker-scroll 30s linear infinite;
            }
            .ticker-content {
              display: flex;
              align-items: center;
              gap: 0;
              white-space: nowrap;
              flex-shrink: 0;
            }
            .ticker-content span {
              font-size: 10px;
              text-transform: uppercase;
              letter-spacing: 0.15em;
              color: rgba(168, 162, 158, 0.5);
              padding: 0 12px;
              font-family: 'Lato', sans-serif;
              font-weight: 300;
            }
            .ticker-dot {
              color: rgba(132, 155, 135, 0.4) !important;
              font-size: 6px !important;
              padding: 0 4px !important;
            }
            @keyframes ticker-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .ticker-track:hover {
              animation-play-state: paused;
            }
          `}</style>
        </div>

      </footer>

      {/* Legal Popups */}
      <AnimatePresence>
        {activePopup && (
          <LegalPopup type={activePopup} onClose={() => setActivePopup(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
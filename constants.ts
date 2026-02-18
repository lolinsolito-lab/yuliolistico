import { Service, TreatmentType, Testimonial } from './types';

export const BRAND_COLORS = {
  sage: '#849b87',
  terracotta: '#c07a60',
  cream: '#f3e9d2',
  gold: '#d4af37',
  stone: '#faf9f6',
  textMain: '#292524', // stone-800
};

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Thai Royal Flow',
    category: TreatmentType.MANUAL,
    description: 'Non il solito stretching. Una coreografia millenaria che sblocca le porte energetiche del tuo corpo. Intenso. Necessario.',
    duration: '60 min',
    price: '€80',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Rituale Olistico Drenante',
    category: TreatmentType.MANUAL,
    description: 'Il tuo corpo trattiene ciò che la mente non lascia andare. Questo rituale insegna alle tue cellule a respirare di nuovo.',
    duration: '50 min',
    price: '€75',
    imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Wood Therapy Sculpt',
    category: TreatmentType.TOOLS,
    description: 'L\'intelligenza del legno contro la stasi della materia. Rimodella non solo la silhouette, ma la tua percezione di leggerezza.',
    duration: '45 min',
    price: '€70',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Bamboo Deep Force',
    category: TreatmentType.TOOLS,
    description: 'Per chi porta il peso del mondo sulle spalle. La forza del bamboo penetra dove le mani non arrivano. Liberatorio.',
    duration: '50 min',
    price: '€75',
    imageUrl: 'https://images.unsplash.com/photo-1632920202241-118833909e7d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '5',
    title: 'Ayurveda Soul Connection',
    category: TreatmentType.RITUAL,
    description: 'Il lusso supremo. Oli caldi colati a filo, silenzio assoluto, tempo sospeso. Non è un massaggio, è un viaggio astrale.',
    duration: '90 min',
    price: '€120',
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800&auto=format&fit=crop'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Elena R.',
    role: 'CEO & Founder',
    text: '"Non vado da Yuli per farmi massaggiare. Vado per ricordarmi chi sono. Vale ogni singolo euro."'
  },
  {
    id: '2',
    name: 'Marco B.',
    role: 'Atleta Pro',
    text: '"Ho girato fisioterapisti in tutta Europa. Nessuno ha la sua sensibilità. È un livello superiore."'
  }
];

// Collaborazioni REALI dal CV di Yuliantini
export const COLLABORATIONS = [
  "Baan Thai",
  "I Club San Marco Spa & Wellness",
  "HG Abetone & Piramidi Resort"
];

export const JOURNAL_POSTS = [
  {
    id: 1,
    category: "Mindset",
    title: "Perché il Silenzio ti spaventa (e perché ne hai bisogno).",
    preview: "Nel rumore costante del 2026, fermarsi è l'unico vero atto di ribellione rimasto.",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    category: "Body Intelligence",
    title: "Le tue spalle stanno urlando quello che la tua bocca tace.",
    preview: "La somatizzazione non è un mito. È la mappa geografica dei tuoi traumi non risolti.",
    image: "https://images.unsplash.com/photo-1518107616985-bd48230d3b20?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    category: "Rituals",
    title: "L'arte di non fare nulla: il recupero attivo.",
    preview: "Siamo ossessionati dalla produttività. Ma un campo che non riposa, smette di dare frutti.",
    image: "https://images.unsplash.com/photo-1528319725582-ddc096101511?q=80&w=800&auto=format&fit=crop"
  }
];
import { Service, TreatmentType } from './types';

export const BRAND_COLORS = {
  sage: '#849b87',
  terracotta: '#c07a60',
  cream: '#f3e9d2',
  gold: '#d4af37',
  stone: '#faf9f6',
  textMain: '#292524', // stone-800
};

export const SERVICES: Service[] = [
  // ── TIER 1: The Essentials (Iniziazione) ──────────────────────────
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
    imageUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800&auto=format&fit=crop' // Updated image
  },
  {
    id: '3',
    title: 'Bamboo Deep Force',
    category: TreatmentType.MANUAL,
    description: 'Per chi porta il peso del mondo sulle spalle. La forza del bamboo penetra dove le mani non arrivano. Liberatorio.',
    duration: '50 min',
    price: '€75',
    imageUrl: 'https://images.unsplash.com/photo-1620147512372-9e00421556bb?q=80&w=800&auto=format&fit=crop' // Fixed broken image
  },
  {
    id: '4',
    title: 'Candle Ritual — Luce Calda',
    category: TreatmentType.MANUAL,
    description: 'Una candela si scioglie lentamente. La cera diventa olio caldo, profumato, che scorre sul tuo corpo come una carezza liquida. Il silenzio fa il resto.',
    duration: '45 min',
    price: '€70',
    imageUrl: 'https://images.unsplash.com/photo-1602607316744-803274944474?q=80&w=800&auto=format&fit=crop' // Luxury candle image
  },

  // ── TIER 2: Ancient Tools (Profondità) ────────────────────────
  {
    id: '5',
    title: 'Wood Therapy Sculpt',
    category: TreatmentType.TOOLS,
    description: 'L\'intelligenza del legno contro la stasi della materia. Rimodella non solo la silhouette, ma la tua percezione di leggerezza.',
    duration: '45 min',
    price: '€70',
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800&auto=format&fit=crop' // New Wood/Spa image
  },
  {
    id: '6',
    title: 'Hot Stone Volcanic Journey',
    category: TreatmentType.TOOLS,
    description: 'Pietre laviche di basalto, levigate dal tempo. Posate lungo i meridiani, il calore vulcanico parla direttamente al sistema nervoso.',
    duration: '75 min',
    price: '€95',
    imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=800&auto=format&fit=crop' // Stone detail
  },
  {
    id: '7',
    title: 'Himalayan Salt Stone Ritual',
    category: TreatmentType.TOOLS,
    description: 'Sfere di puro sale rosa, scaldate dalla terra. Il calore minerale penetra nei tessuti, scioglie le tensioni e riequilibra l\'energia.',
    duration: '60 min',
    price: '€90',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop' // Salt/Pink texture
  },
  {
    id: '8',
    title: 'Crystal Gua Sha — Rituale Viso',
    category: TreatmentType.TOOLS,
    description: 'Un viaggio sensoriale per il tuo viso. Quarzo rosa e giada naturale rilasciano la tensione. Il volto si distende, lo sguardo cambia.',
    duration: '40 min',
    price: '€65',
    imageUrl: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800&auto=format&fit=crop' // Crystal/Face tool
  },
  {
    id: '9',
    title: 'Coppettazione Olistica',
    category: TreatmentType.TOOLS,
    description: 'Una tecnica che il mondo orientale conosce da millenni. Le coppette creano un vuoto gentile che risveglia la circolazione profonda.',
    duration: '40 min',
    price: '€60',
    imageUrl: 'https://images.unsplash.com/photo-1598901844391-7eb9b51e51c4?q=80&w=800&auto=format&fit=crop' // Cupping/Back detail
  },
  {
    id: '10',
    title: 'Tibetan Sound Bath — Armonia Sonora',
    category: TreatmentType.TOOLS,
    description: 'Non solo orecchie. Le vibrazioni delle campane tibetane attraversano l\'acqua del tuo corpo, riordinando le frequenze disarmoniche.',
    duration: '45 min',
    price: '€65',
    imageUrl: 'https://images.unsplash.com/photo-1519757656910-b99616e2b694?q=80&w=800&auto=format&fit=crop' // Singing bowls
  },

  // ── TIER 3: The Sovereignty (Rituali Luxury) ────────────────────────
  {
    id: '11',
    title: 'Ayurveda Soul Connection',
    category: TreatmentType.RITUAL,
    description: 'Il lusso supremo. Oli caldi colati a filo, silenzio assoluto, tempo sospeso. Non è un trattamento, è un viaggio astrale.',
    duration: '90 min',
    price: '€120',
    imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '12',
    title: 'Rituale delle Origini',
    category: TreatmentType.RITUAL,
    description: 'Un viaggio di due ore che ripercorre le radici di Yuli. Si parte dal Thai ancestrale, si attraversa il calore delle pietre vulcaniche, si arriva all\'abbraccio degli oli aromatici.',
    duration: '120 min',
    price: '€160',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop' // Abstract origin/oil
  },
  {
    id: '13',
    title: 'Yuli Signature — L\'Esperienza Totale',
    category: TreatmentType.RITUAL,
    description: 'L\'esperienza che solo Yuli può darti. Scrub minerale, olio caldo, pietre vulcaniche, rituale viso. Quando torni nel mondo, non sei la stessa persona.',
    duration: '150 min',
    price: '€200',
    imageUrl: 'https://images.unsplash.com/photo-1616394585067-d3d0411a7fd9?q=80&w=800&auto=format&fit=crop' // High end spa dark moody
  }
];

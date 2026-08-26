-- =====================================================
-- 14_SEED_SERVICES.sql
-- Popola la tabella 'services' con i 13 rituali iniziali.
-- Eseguire solo se la tabella è vuota per migrare i dati da constants.ts al Database.
-- =====================================================

-- 1. Creiamo il vincolo di unicità sul titolo per prevenire duplicati (in modo sicuro)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'services_title_unique') THEN
    ALTER TABLE public.services ADD CONSTRAINT services_title_unique UNIQUE (title);
  END IF;
END $$;

-- 2. Inseriamo i rituali con sicurezza
INSERT INTO public.services (title, subtitle, category, description, soul_description, duration, price, image_url, active, "order")
VALUES 
-- TIER 1: Le Fondamenta (Manuale)
(
  'Thai Royal Flow', 
  '', 
  'MANUAL', 
  'Non il solito stretching. Una coreografia millenaria che sblocca le porte energetiche del tuo corpo. Intenso. Necessario.', 
  'Un fluire antico che ti ricollega alla terra.', 
  '60 min', 
  '€80', 
  'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80', 
  true, 
  1
),
(
  'Rituale Olistico Drenante', 
  '', 
  'MANUAL', 
  'Il tuo corpo trattiene ciò che la mente non lascia andare. Questo rituale insegna alle tue cellule a respirare di nuovo.', 
  'Come l''acqua che scorre e purifica ogni blocco.', 
  '50 min', 
  '€75', 
  'https://images.unsplash.com/photo-1600334089648-b0d9c3024ea2?auto=format&fit=crop&w=800&q=80', 
  true, 
  2
),
(
  'Bamboo Deep Force', 
  '', 
  'MANUAL', 
  'Per chi porta il peso del mondo sulle spalle. La forza del bamboo penetra dove le mani non arrivano. Liberatorio.', 
  'Forza e flessibilità, per spezzare le catene dello stress.', 
  '50 min', 
  '€75', 
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80', 
  true, 
  3
),
(
  'Candle Ritual — Luce Calda', 
  'Luce Calda', 
  'MANUAL', 
  'Una candela si scioglie lentamente. La cera diventa olio caldo, profumato, che scorre sul tuo corpo come una carezza liquida. Il silenzio fa il resto.', 
  'Il calore che scioglie anche i pensieri più freddi.', 
  '45 min', 
  '€70', 
  'https://images.unsplash.com/photo-1528255909304-4ceafc8eb44b?auto=format&fit=crop&w=800&q=80', 
  true, 
  4
),

-- TIER 2: La Profondità (Strumenti)
(
  'Wood Therapy Sculpt', 
  '', 
  'TOOLS', 
  'L''intelligenza del legno contro la stasi della materia. Rimodella non solo la silhouette, ma la tua percezione di leggerezza.', 
  'La natura che plasma e scolpisce la tua forma.', 
  '45 min', 
  '€70', 
  'https://images.unsplash.com/photo-1591343395082-e1200ce414dc?auto=format&fit=crop&w=800&q=80', 
  true, 
  5
),
(
  'Hot Stone Volcanic Journey', 
  '', 
  'TOOLS', 
  'Pietre laviche di basalto, levigate dal tempo. Posate lungo i meridiani, il calore vulcanico parla direttamente al sistema nervoso.', 
  'Fuoco e terra uniti per calmare il fuoco interiore.', 
  '75 min', 
  '€95', 
  'https://images.unsplash.com/photo-1556760544-74068565a05c?auto=format&fit=crop&w=800&q=80', 
  true, 
  6
),
(
  'Himalayan Salt Stone Ritual', 
  '', 
  'TOOLS', 
  'Sfere di puro sale rosa, scaldate dalla terra. Il calore minerale penetra nei tessuti, scioglie le tensioni e riequilibra l''energia.', 
  'La purezza del mare primordiale sulla tua pelle.', 
  '60 min', 
  '€90', 
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', 
  true, 
  7
),
(
  'Crystal Gua Sha — Rituale Viso', 
  'Rituale Viso', 
  'TOOLS', 
  'Un viaggio sensoriale per il tuo viso. Quarzo rosa e giada naturale rilasciano la tensione. Il volto si distende, lo sguardo cambia.', 
  'Cristalli che riflettono la tua luce più autentica.', 
  '40 min', 
  '€65', 
  'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80', 
  true, 
  8
),
(
  'Coppettazione Olistica', 
  '', 
  'TOOLS', 
  'Una tecnica che il mondo orientale conosce da millenni. Le coppette creano un vuoto gentile che risveglia la circolazione profonda.', 
  'Respirare attraverso la pelle, rilasciare l''invisibile.', 
  '40 min', 
  '€60', 
  'https://images.unsplash.com/photo-1570534249117-66a7b7eb6c85?auto=format&fit=crop&w=800&q=80', 
  true, 
  9
),
(
  'Tibetan Sound Bath — Armonia Sonora', 
  'Armonia Sonora', 
  'TOOLS', 
  'Non solo orecchie. Le vibrazioni delle campane tibetane attraversano l''acqua del tuo corpo, riordinando le frequenze disarmoniche.', 
  'Il suono che cura il silenzio.', 
  '45 min', 
  '€65', 
  'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&w=800&q=80', 
  true, 
  10
),

-- TIER 3: La Sovranità (Rituali)
(
  'Ayurveda Soul Connection', 
  '', 
  'RITUAL', 
  'Il lusso supremo. Oli caldi colati a filo, silenzio assoluto, tempo sospeso. Non è un trattamento, è un viaggio astrale.', 
  'L''abbandono totale, dove l''anima si riunisce al corpo.', 
  '90 min', 
  '€120', 
  'https://images.unsplash.com/photo-1608282361718-4796cefc692c?auto=format&fit=crop&w=800&q=80', 
  true, 
  11
),
(
  'Rituale delle Origini', 
  '', 
  'RITUAL', 
  'Un viaggio di due ore che ripercorre le radici di Yuli. Si parte dal Thai ancestrale, si attraversa il calore delle pietre vulcaniche, si arriva all''abbraccio degli oli aromatici.', 
  'Un ritorno alla matrice primordiale del benessere.', 
  '120 min', 
  '€160', 
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', 
  true, 
  12
),
(
  'Yuli Signature — L''Esperienza Totale', 
  'L''Esperienza Totale', 
  'RITUAL', 
  'L''esperienza che solo Yuli può darti. Scrub minerale, olio caldo, pietre vulcaniche, rituale viso. Quando torni nel mondo, non sei la stessa persona.', 
  'La celebrazione definitiva del tuo essere.', 
  '150 min', 
  '€200', 
  'https://images.unsplash.com/photo-1544161513-01f14371f435?auto=format&fit=crop&w=800&q=80', 
  true, 
  13
)
ON CONFLICT (title) DO UPDATE SET 
    image_url = EXCLUDED.image_url,
    description = EXCLUDED.description,
    soul_description = EXCLUDED.soul_description,
    price = EXCLUDED.price,
    duration = EXCLUDED.duration,
    category = EXCLUDED.category,
    active = EXCLUDED.active,
    "order" = EXCLUDED."order";

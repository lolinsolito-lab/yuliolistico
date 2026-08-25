-- =====================================================
-- 12_SYNC_QUIZ_CONFIG.sql
-- Aggiorna la tabella quiz_config Rimuovendo price e duration.
-- I nomi in 'treatment' DEVONO combaciare esattamente con 'title' in 'services'.
-- =====================================================

UPDATE public.quiz_config
SET 
  rules = '[
    {
      "archetype": "PIETRA",
      "priority": 2,
      "keywords": ["spalle", "schiena", "collo", "cervicale", "dolore", "male", "contrattura", "blocc", "rigid", "pc", "sedut", "tensione", "muscol", "nodo", "marmo", "pezzo di legno"]
    },
    {
      "archetype": "RUMORE_BIANCO",
      "priority": 2,
      "keywords": ["testa", "cervello", "pensieri", "dormo", "sonno", "insonnia", "ansia", "stress", "respiro", "affanno", "caos", "rumore", "spegnere", "controllo", "preoccup", "cortisolo"]
    },
    {
      "archetype": "ACQUA_FERMA",
      "priority": 2,
      "keywords": ["gonfi", "pesant", "gambe", "ritenzione", "tossin", "metabolismo", "cellulite", "ferma", "palude", "circolazione", "fredd", "liquid"]
    },
    {
      "archetype": "ESAURIMENTO",
      "priority": 3,
      "keywords": ["stanch", "mort", "tutto", "basta", "sparire", "miracolo", "crollo", "burnout", "esaurit", "senza forze", "batteria", "zerbino", "ricaric", "vacanza"]
    }
  ]'::jsonb,
  prescriptions = '{
    "PIETRA": [
        {
            "treatment": "Bamboo Deep Force",
            "reasoning": "Il tuo corpo è diventato un''armatura per proteggerti. Ma un guerriero non dorme con l''armatura. Le canne di bambù scioglieranno le difese profonde che le mani non possono raggiungere.",
            "oilRecommendation": "Arnica Montana & Ginepro"
        },
        {
            "treatment": "Thai Royal Flow",
            "reasoning": "Ti senti ''corto'', come se la gravità ti stesse schiacciando a terra. Hai bisogno di spazio tra le vertebre. Questo non è un massaggio, è yoga passivo per chi non ha la forza di muoversi.",
            "oilRecommendation": "Balsamo di Tigre & Canfora"
        }
    ],
    "RUMORE_BIANCO": [
        {
            "treatment": "Ayurveda Soul Connection",
            "reasoning": "La tua mente è un browser con 100 tab aperte. Non serve ''lavorare'' sui muscoli, serve ''oliare'' il sistema nervoso. L''olio caldo colato sulla fronte non è estetica, è un comando di spegnimento per il cervello.",
            "oilRecommendation": "Sesamo Caldo & Lavanda Officinale"
        },
        {
            "treatment": "Tibetan Sound Bath — Armonia Sonora",
            "reasoning": "Non sei stanca, sei scordata. Come uno strumento musicale che ha perso l''intonazione. Le vibrazioni delle campane non si ascoltano: si sentono nelle ossa per riallineare la frequenza.",
            "oilRecommendation": "Sandalo & Franchincenso"
        }
    ],
    "ACQUA_FERMA": [
        {
            "treatment": "Rituale Olistico Drenante",
            "reasoning": "Ti senti una palude, non un fiume. L''acqua stagnante crea peso e tristezza. Dobbiamo riaprire le chiuse del tuo sistema linfatico e lasciar scorrere via tutto ciò che stai trattenendo.",
            "oilRecommendation": "Cipresso & Pompelmo Rosa"
        },
        {
            "treatment": "Himalayan Salt Stone Ritual",
            "reasoning": "La tua pelle è spenta, il corpo pesante. Il sale rosa non solo esfolia, ma per osmosi attira fuori le tossine emotive che ti appesantiscono. È una purificazione, non solo un trattamento.",
            "oilRecommendation": "Sale Rosa & Olio di Mandorle Dolci"
        }
    ],
    "ESAURIMENTO": [
        {
            "treatment": "Yuli Signature — L''Esperienza Totale",
            "reasoning": "Non hai bisogno di un ''trattamento''. Hai bisogno di una rinascita. Quando il sistema è in tilt, serve un reset completo: corpo, mente e spirito. Un''ora e mezza fuori dal mondo per ricordarti chi sei.",
            "oilRecommendation": "Neroli & Rosa Damascena (Il profumo dell''Anima)"
        },
        {
            "treatment": "Hot Stone Volcanic Journey",
            "reasoning": "Sei fredda dentro. L''energia non gira più. Le pietre laviche portano il calore della terra direttamente nel tuo nucleo, sciogliendo quel gelo emotivo che ti blocca.",
            "oilRecommendation": "Pietre Basaltiche & Olii Caldi"
        }
    ]
  }'::jsonb,
  updated_at = now()
WHERE is_active = true;

-- =====================================================
-- 06_QUIZ_CONFIG.sql
-- Yuli Olistico — Configurazione dinamica del Wellness Quiz
-- =====================================================

create table if not exists quiz_config (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  is_active boolean default true,
  rules jsonb not null, 
  prescriptions jsonb not null
);

-- Enable RLS
alter table quiz_config enable row level security;

create policy "Allow Public Read" on quiz_config
  for select using (true);

create policy "Allow Admin Manage" on quiz_config
  for all using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Initial Seed
insert into quiz_config (rules, prescriptions)
values (
  '[
    {
      "archetype": "PIETRA",
      "priority": 2,
      "keywords": ["spalle", "schiena", "collo", "cervicale", "dolore", "male", "contrattura", "blocc", "rigid", "pc", "sedut", "tensione", "muscol", "nodo", "marmo", "pezzo di legno"]
    },
    {
      "archetype": "RUMORE_BIANCO",
      "priority": 3,
      "keywords": ["testa", "pensier", "dorm", "insonn", "ansia", "stress", "mentale", "preoccup", "stac", "caos", "rumore", "veloc", "fretta", "burnout", "esaurit"]
    },
    {
      "archetype": "ACQUA_FERMA",
      "priority": 1,
      "keywords": ["gamb", "gonfi", "pesant", "riten", "liquid", "cellulit", "circolaz", "linfa", "vascol", "fredd", "stanc"]
    },
    {
      "archetype": "ESAURIMENTO",
      "priority": 4,
      "keywords": ["stanchiss", "mort", "energi", "fin", "terra", "sonno", "ripos", "batteri", "giù", "spegn", "nulla"]
    }
  ]'::jsonb,
  '{
    "PIETRA": [
        {
            "treatment": "Bamboo Deep Force",
            "reasoning": "Il tuo corpo è diventato un''armatura per proteggerti. Ma un guerriero non dorme con l''armatura. Le canne di bambù scioglieranno le difese profonde che le mani non possono raggiungere.",
            "oilRecommendation": "Arnica Montana & Ginepro"
        },
        {
            "treatment": "Decontratturante Deep",
            "reasoning": "La rigidità è la voce del corpo che urla. Ascolteremo ogni singolo nodo e lo scioglieremo con manovre profonde e lente, restituendo spazio tra le vertebre.",
            "oilRecommendation": "Canfora & Rosmarino"
        }
    ],
    "RUMORE_BIANCO": [
        {
            "treatment": "Head Spa & Shirodhara",
            "reasoning": "La tua mente è un browser con 100 schede aperte. Non serve parlare, serve spegnere. Un flusso continuo di olio caldo sulla fronte (terzo occhio) indurrà un silenzio neurale immediato.",
            "oilRecommendation": "Lavanda & Sandalo"
        },
        {
            "treatment": "Rituale del Sonno",
            "reasoning": "Il sonno non è solo chiudere gli occhi, è abbandonarsi. Attraverso il tocco lento e avvolgente, insegneremo al tuo sistema nervoso che è sicuro lasciarsi andare.",
            "oilRecommendation": "Neroli & Arancio Amaro"
        }
    ],
    "ACQUA_FERMA": [
        {
            "treatment": "Drenante Vodder Originale",
            "reasoning": "Tutto ciò che ristagna diventa palude. Il tuo corpo ha bisogno di tornare fiume. Movimenti piumati e ritmici spingeranno i liquidi a fluire di nuovo, portando via la pesantezza.",
            "oilRecommendation": "Cipresso & Pompelmo"
        },
        {
            "treatment": "Ice & Fire Toning",
            "reasoning": "La circolazione va svegliata con lo shock termico controllato. Alterneremo calore profondo e pietre fredde per creare una ginnastica vascolare che riattiva la vita nelle gambe.",
            "oilRecommendation": "Menta Piperita & Eucalipto"
        }
    ],
    "ESAURIMENTO": [
        {
            "treatment": "Recharge Hot Stone",
            "reasoning": "Sei una batteria allo 0%. Non ti serve un massaggio, ti serve calore. Le pietre laviche cederanno la loro energia millenaria ai tuoi muscoli, ricaricandoti dal nucleo.",
            "oilRecommendation": "Vaniglia & Olibano"
        },
        {
            "treatment": "Californiano Emozionale",
            "reasoning": "Quando non si ha più nulla da dare, bisogna solo ricevere. Un abbraccio infinito che percorre tutto il corpo con olio caldo, ricucendo i pezzi della tua energia frammentata.",
            "oilRecommendation": "Rosa Damascena & Ylang Ylang"
        }
    ]
  }'::jsonb
);

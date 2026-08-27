
import { supabase } from '../lib/supabaseClient';
import { AiRecommendation } from "../types";

// 1. Define the 4 Archetypes
export type Archetype = 'PIETRA' | 'RUMORE_BIANCO' | 'ACQUA_FERMA' | 'ESAURIMENTO';

export interface DiagnosisRule {
    archetype: Archetype;
    keywords: string[];
    priority: number; // Higher number = more weight
}

// 2. The Keyword Database (The "Brain")
export const DEFAULT_RULES: DiagnosisRule[] = [
    {
        archetype: 'PIETRA', // Tensione, Dolore, Blocchi
        keywords: ['spalle', 'schiena', 'collo', 'cervicale', 'dolore', 'male', 'contrattura', 'blocc', 'rigid', 'pc', 'sedut', 'tensione', 'muscol', 'nodo', 'marmo', 'pezzo di legno'],
        priority: 2
    },
    {
        archetype: 'RUMORE_BIANCO', // Ansia, Mente, Insonnia
        keywords: ['testa', 'cervello', 'pensieri', 'dormo', 'sonno', 'insonnia', 'ansia', 'stress', 'respiro', 'affanno', 'caos', 'rumore', 'spegnere', 'controllo', 'preoccup', 'cortisolo'],
        priority: 2
    },
    {
        archetype: 'ACQUA_FERMA', // Gonfiore, Peso, Ristagno
        keywords: ['gonfi', 'pesant', 'gambe', 'ritenzione', 'tossin', 'metabolismo', 'cellulite', 'ferma', 'palude', 'circolazione', 'fredd', 'liquid'],
        priority: 2
    },
    {
        archetype: 'ESAURIMENTO', // Burnout, Crollo
        keywords: ['stanch', 'mort', 'tutto', 'basta', 'sparire', 'miracolo', 'crollo', 'burnout', 'esaurit', 'senza forze', 'batteria', 'zerbino', 'ricaric', 'vacanza'],
        priority: 3 // Higher priority because burnout overrides simple pain
    }
];

// Exporting Mutable Variables for the App to use
export let RULES = [...DEFAULT_RULES];

// 3. The Ritual Prescriptions (The "Solution")
export const DEFAULT_PRESCRIPTIONS: Record<Archetype, AiRecommendation[]> = {
    PIETRA: [
        {
            treatment: "Bamboo Deep Force",
            reasoning: "Il tuo corpo è diventato un'armatura per proteggerti. Ma un guerriero non dorme con l'armatura. Le canne di bambù scioglieranno le difese profonde che le mani non possono raggiungere.",
            oilRecommendation: "Arnica Montana & Ginepro"
        },
        {
            treatment: "Thai Royal Flow",
            reasoning: "Ti senti 'corto', come se la gravità ti stesse schiacciando a terra. Hai bisogno di spazio tra le vertebre. Questo non è un massaggio, è yoga passivo per chi non ha la forza di muoversi.",
            oilRecommendation: "Balsamo di Tigre & Canfora"
        }
    ],
    RUMORE_BIANCO: [
        {
            treatment: "Ayurveda Soul Connection",
            reasoning: "La tua mente è un browser con 100 tab aperte. Non serve 'lavorare' sui muscoli, serve 'oliare' il sistema nervoso. L'olio caldo colato sulla fronte non è estetica, è un comando di spegnimento per il cervello.",
            oilRecommendation: "Sesamo Caldo & Lavanda Officinale"
        },
        {
            treatment: "Tibetan Sound Bath — Armonia Sonora",
            reasoning: "Non sei stanca, sei scordata. Come uno strumento musicale che ha perso l'intonazione. Le vibrazioni delle campane non si ascoltano: si sentono nelle ossa per riallineare la frequenza.",
            oilRecommendation: "Sandalo & Franchincenso"
        }
    ],
    ACQUA_FERMA: [
        {
            treatment: "Rituale Olistico Drenante",
            reasoning: "Ti senti una palude, non un fiume. L'acqua stagnante crea peso e tristezza. Dobbiamo riaprire le chiuse del tuo sistema linfatico e lasciar scorrere via tutto ciò che stai trattenendo.",
            oilRecommendation: "Cipresso & Pompelmo Rosa"
        },
        {
            treatment: "Himalayan Salt Stone Ritual",
            reasoning: "La tua pelle è spenta, il corpo pesante. Il sale rosa non solo esfolia, ma per osmosi attira fuori le tossine emotive che ti appesantiscono. È una purificazione, non solo un trattamento.",
            oilRecommendation: "Sale Rosa & Olio di Mandorle Dolci"
        }
    ],
    ESAURIMENTO: [
        {
            treatment: "Yuli Signature — L'Esperienza Totale",
            reasoning: "Non hai bisogno di un 'trattamento'. Hai bisogno di una rinascita. Quando il sistema è in tilt, serve un reset completo: corpo, mente e spirito. Un'ora e mezza fuori dal mondo per ricordarti chi sei.",
            oilRecommendation: "Neroli & Rosa Damascena (Il profumo dell'Anima)"
        },
        {
            treatment: "Hot Stone Volcanic Journey",
            reasoning: "Sei fredda dentro. L'energia non gira più. Le pietre laviche portano il calore della terra direttamente nel tuo nucleo, sciogliendo quel gelo emotivo che ti blocca.",
            oilRecommendation: "Pietre Basaltiche & Olii Caldi"
        }
    ]
};

export let PRESCRIPTIONS = { ...DEFAULT_PRESCRIPTIONS };

// --- DYNAMIC CONFIGURATION ENGINE ---

// 1. Fetch Config from DB (Called on App Init)
export const fetchQuizConfig = async () => {
    try {
        const { data, error } = await supabase
            .from('quiz_config')
            .select('rules, prescriptions')
            .eq('is_active', true)
            .single();

        if (error) {
            console.warn("⚠️ Using Default Quiz Logic (DB Error or Offline):", error.message);
            return false;
        }

        if (data) {
            console.log("🧠 Yuli AI: Logic Updated from Database.");
            RULES = data.rules;
            PRESCRIPTIONS = data.prescriptions;
            return { rules: RULES, prescriptions: PRESCRIPTIONS };
        }
    } catch (err) {
        console.error("Critical Holistic Engine Error:", err);
    }
    return false;
};

// 2. Save Config to DB (Called by Admin Editor)
export const saveQuizConfig = async (newRules: DiagnosisRule[], newPrescriptions: Record<Archetype, AiRecommendation[]>) => {
    // Basic validation could go here
    const { data, error } = await supabase
        .from('quiz_config')
        .update({
            rules: newRules,
            prescriptions: newPrescriptions,
            updated_at: new Date()
        })
        .eq('is_active', true);

    // If update fails (maybe row doesn't exist yet?), try insert for the first time
    if (error || !data) {
        // Fallback: Check if ANY row exists, if not insert.
        const { count } = await supabase.from('quiz_config').select('*', { count: 'exact', head: true });
        if (count === 0) {
            const { error: insertError } = await supabase.from('quiz_config').insert([{
                rules: newRules,
                prescriptions: newPrescriptions,
                is_active: true
            }]);
            if (insertError) return { success: false, error: insertError };
            // Update local state and return success
            RULES = newRules;
            PRESCRIPTIONS = newPrescriptions;
            return { success: true };
        }
        return { success: false, error };
    }

    // Update local state immediately so app feels fast
    RULES = newRules;
    PRESCRIPTIONS = newPrescriptions;

    return { success: true };
};

// 4. The Diagnostic Logic
export const analyzeSymptom = (input: string): AiRecommendation => {
    const normalizedInput = input.toLowerCase();

    // Scoring System
    const scores: Record<Archetype, number> = {
        PIETRA: 0,
        RUMORE_BIANCO: 0,
        ACQUA_FERMA: 0,
        ESAURIMENTO: 0
    };

    // Analyze Keywords
    RULES.forEach(rule => {
        rule.keywords.forEach(keyword => {
            if (normalizedInput.includes(keyword)) {
                scores[rule.archetype] += rule.priority;
            }
        });
    });

    // Find Top 2 Winners
    const sortedArchetypes = (Object.keys(scores) as Archetype[]).sort((a, b) => scores[b] - scores[a]);
    
    const primaryWinner = sortedArchetypes[0];
    const secondaryWinner = sortedArchetypes[1];
    const maxScore = scores[primaryWinner];
    const secondScore = scores[secondaryWinner];

    if (maxScore === 0) {
        return {
            treatment: "Rituale della Scoperta",
            reasoning: "Il tuo corpo parla una lingua profonda che oggi sfugge a una singola etichetta. Ti proponiamo un rituale esplorativo in cui ascolteremo il tuo corpo dal vivo, adattando le tecniche in tempo reale per trovare esattamente la sinergia di cui hai bisogno.",
            oilRecommendation: "Olio di Mandorle Dolci & Lavanda (Equilibrio Universale)",
            duration: "60 min",
            price: "€80"
        };
    }

    // Pick a primary ritual
    const primaryOptions = PRESCRIPTIONS[primaryWinner];
    const primarySelected = primaryOptions[Math.floor(Math.random() * primaryOptions.length)];

    let result: AiRecommendation = { ...primarySelected };

    // If there's a strong secondary emotion/symptom, add a synergistic complementary ritual
    if (secondScore > 0 && secondScore >= maxScore * 0.5) {
        const secondaryOptions = PRESCRIPTIONS[secondaryWinner];
        const secondarySelected = secondaryOptions[Math.floor(Math.random() * secondaryOptions.length)];
        
        // Ensure it's not the exact same treatment (impossible due to archetypes, but just in case)
        if (secondarySelected.treatment !== primarySelected.treatment) {
            result.reasoning = `${primarySelected.reasoning} \n\nTuttavia, avverto anche un'altra risonanza in te. C'è una sovrapposizione emotiva complessa. Per questo motivo, ti suggerisco una sinergia profonda con un secondo rituale complementare.`;
            result.secondary = {
                treatment: secondarySelected.treatment,
                reasoning: secondarySelected.reasoning,
                oilRecommendation: secondarySelected.oilRecommendation,
                price: secondarySelected.price,
                duration: secondarySelected.duration
            };
        }
    }

    return result;
};

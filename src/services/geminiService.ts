import { GoogleGenAI, Type } from "@google/genai";
import { AiRecommendation } from "../types";
import { SERVICES } from "../constants";

// Safe initialization
// In production, this comes from your .env file
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Mock Recommendations for Demo Mode (when no API key is present)
const MOCK_RECOMMENDATIONS: AiRecommendation[] = [
  {
    treatment: "Massaggio Ayurvedico",
    reasoning: "Il tuo corpo segnala un eccesso di Vata (aria/movimento). Hai bisogno di radicamento, olio caldo e movimenti avvolgenti per fermare il turbinio mentale.",
    oilRecommendation: "Sesamo caldo e sandalo"
  },
  {
    treatment: "Thai Royal Flow",
    reasoning: "Sento blocchi energetici nelle linee Sen. Il tuo corpo non è solo stanco, è stagnante. Chiede di essere sbloccato con pressioni ritmiche e stretching profondo.",
    oilRecommendation: "Balsamo di tigre e lemongrass"
  },
  {
    treatment: "Tibetan Sound Bath",
    reasoning: "Il disordine non è nei muscoli, è nelle frequenze. Le vibrazioni delle campane riporteranno l'armonia cellulare dove ora c'è caos.",
    oilRecommendation: "Incenso puro Olibano"
  },
  {
    treatment: "Deep Tissue & Cupping",
    reasoning: "Porti il peso del mondo sulle trapezi. Non serve una carezza, serve un intervento deciso per liberare le tossine emotive intrappolate nei tessuti.",
    oilRecommendation: "Arnica e Ginepro"
  }
];

export const getWellnessRecommendation = async (feeling: string): Promise<AiRecommendation> => {
  // DEMO MODE: If no API Key is set, return a random mock result to simulate the experience
  if (!API_KEY) {
    console.warn("⚠️ Gemini API Key missing. Running in DEMO MODE.");
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Return random recommendation
    return MOCK_RECOMMENDATIONS[Math.floor(Math.random() * MOCK_RECOMMENDATIONS.length)];
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const modelName = "gemini-1.5-flash"; // Use a stable model name

  const prompt = `
    Sei Yuliantini, una operatrice olistica esperta.
    Il tuo tono è empatico, solare, profondo e leggermente poetico.
    
    Un cliente ti dice che si sente: "${feeling}".
    
    Basandoti su questo, suggerisci UNO dei seguenti trattamenti:
    - Massaggio Thailandese
    - Linfodrenante
    - Decontratturante
    - Maderoterapia
    - Massaggio Ayurvedico
    - Bamboo Massage
    - Campane Tibetane

    Fornisci anche un consiglio su un olio essenziale e una motivazione profonda.
    Rispondi rigorosamente in formato JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            treatment: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            oilRecommendation: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response");
    return JSON.parse(text) as AiRecommendation;

  } catch (error) {
    console.error("AI Error:", error);
    // Fallback to random mock on error too
    return MOCK_RECOMMENDATIONS[0];
  }
};

export const getChatResponse = async (userMessage: string): Promise<string> => {
  if (!API_KEY) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return "✨ Modalità Demo: La mia connessione spirituale è in fase di calibrazione. Ma sento che hai bisogno di relax. (API Key non configurata)";
  }

  const servicesContext = SERVICES.map(s => `- ${s.title} (${s.duration}, ${s.price}): ${s.description}`).join('\n');
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const modelName = "gemini-1.5-flash";

  const prompt = `
      Sei l'assistente virtuale di "Yuli Olistico". Ti chiami "Aura".
      Tono: Zen, calma, professionale.
      
      Servizi:
      ${servicesContext}
      
      Rispondi in modo conciso.
      Messaggio utente: "${userMessage}"
    `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
    });
    return response.text || "Energia in ascolto...";
  } catch (error) {
    return "Il silenzio è una risposta. (Errore di connessione)";
  }
};
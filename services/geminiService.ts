import { GoogleGenAI, Type } from "@google/genai";
import { AiRecommendation } from "../types";
import { SERVICES } from "../constants";

// Initialize Gemini Client
// IMPORTANT: The API key must be provided in the environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelName = "gemini-3-flash-preview";

export const getWellnessRecommendation = async (feeling: string): Promise<AiRecommendation> => {
  const prompt = `
    Sei Yuliantini, una operatrice olistica esperta e massaggiatrice professionale con origini indonesiane.
    Il tuo tono di voce è empatico, solare, profondo e leggermente poetico.
    
    Un cliente ti dice che si sente: "${feeling}".
    
    Basandoti su questo stato d'animo/fisico, suggerisci UNO dei seguenti trattamenti:
    - Massaggio Thailandese
    - Linfodrenante
    - Decontratturante
    - Maderoterapia
    - Massaggio Ayurvedico
    - Bamboo Massage

    Fornisci anche un consiglio su un olio essenziale o aromaterapia da abbinare.

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
            treatment: { type: Type.STRING, description: "Nome del trattamento suggerito" },
            reasoning: { type: Type.STRING, description: "Spiegazione breve e poetica del perché (max 30 parole)" },
            oilRecommendation: { type: Type.STRING, description: "Olio essenziale consigliato" }
          },
          required: ["treatment", "reasoning", "oilRecommendation"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Nessuna risposta generata dall'AI.");
    }

    return JSON.parse(text) as AiRecommendation;

  } catch (error) {
    console.error("Errore durante la consultazione dell'Oracolo:", error);
    // Fallback in case of error
    return {
      treatment: "Massaggio Ayurvedico",
      reasoning: "Per ritrovare l'equilibrio universale quando la tecnologia fallisce, torniamo alle origini.",
      oilRecommendation: "Lavanda e Sandalo"
    };
  }
};

export const getChatResponse = async (userMessage: string): Promise<string> => {
    // Construct context from services
    const servicesContext = SERVICES.map(s => `- ${s.title} (${s.duration}, ${s.price}): ${s.description}`).join('\n');
    
    const prompt = `
      Sei l'assistente virtuale di "Yuli Olistico", un centro benessere olistico.
      Ti chiami "Aura". Il tuo tono è gentile, calmo, professionale e accogliente (Zen).
      
      Informazioni sui servizi:
      ${servicesContext}
      
      Regole Importanti:
      1. Non dare consigli medici o sanitari. Usa termini come "benessere", "armonia", "distensione", "riequilibrio".
      2. Non usare parole come "curare", "terapia medica", "paziente". Usa "trattare", "rituale", "cliente".
      3. Se ti chiedono di prenotare, invitali ad usare la sezione "Prenota" del sito o a cliccare sul tasto calendario.
      4. Rispondi in modo conciso ma cordiale (max 3 frasi).
      
      Messaggio utente: "${userMessage}"
    `;
  
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
      });
      return response.text || "Mi dispiace, la mia energia è bassa al momento. Riprova tra poco.";
    } catch (error) {
      console.error("Chat Error:", error);
      return "Mi dispiace, non riesco a connettermi al momento. Per favore riprova.";
    }
  };
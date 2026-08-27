import { supabase } from '../lib/supabaseClient';
import { Lead } from '../types';

// Re-export the single Supabase client for backward compatibility
export { supabase };

export const saveLead = async (lead: Lead, source: 'quiz' | 'newsletter' | 'academy' | 'archive' | 'gift' | 'sanctuary', honeypot: string = '') => {
    // Chiamata all'endpoint unificato di Vercel per la sicurezza (insert + email)
    const response = await fetch('/api/submit-and-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            lead,
            source,
            honeypot
        })
    });

    const result = await response.json();

    if (!response.ok) {
        console.error("Error saving lead via unified API:", result.error);
        throw new Error(result.error || "Failed to submit lead");
    }

    return result;
};

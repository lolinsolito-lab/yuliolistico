
import { supabase } from '../lib/supabaseClient';
import { Lead } from '../types';

// Re-export the single Supabase client for backward compatibility
export { supabase };

export const saveLead = async (lead: Lead, source: 'quiz' | 'newsletter' | 'academy' | 'archive' | 'gift', honeypot: string = '') => {
    const { data, error } = await supabase
        .rpc('submit_lead', {
            p_name: lead.name,
            p_email: lead.email,
            p_phone: lead.phone,
            p_symptom: lead.symptom,
            p_result_treatment: lead.result_treatment,
            p_source: source,
            p_resource_id: lead.resource_id || null,
            p_honeypot: honeypot
        });

    if (error) {
        console.error("Error saving lead:", error);
        throw error;
    }

    return data;
};

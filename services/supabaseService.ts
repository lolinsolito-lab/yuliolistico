
import { supabase } from '../lib/supabaseClient';
import { Lead } from '../types';

// Re-export the single Supabase client for backward compatibility
export { supabase };

export const saveLead = async (lead: Lead) => {
    const { data, error } = await supabase
        .from('leads')
        .insert([
            {
                name: lead.name,
                email: lead.email,
                phone: lead.phone,
                symptom: lead.symptom,
                result_treatment: lead.result_treatment,
                status: 'new'
            }
        ])
        .select();

    if (error) {
        console.error("Error saving lead:", error);
        throw error;
    }

    return data;
};


import { createClient } from '@supabase/supabase-js';
import { Lead } from '../types';

// Ensure environment variables are loaded
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("⚠️ Supabase credentials missing! Check .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

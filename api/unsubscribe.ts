import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req: any, res: any) {
    try {
        const email = (req.query.email || '').toString();
        if (!email) return res.status(400).send('Email mancante');

        await supabaseAnon.rpc('unsubscribe_lead', { p_email: email });

        return res.status(200).send(`
            <html><body style="font-family: Georgia, serif; text-align:center; padding: 60px 20px; background:#faf9f6;">
                <h2 style="color:#292524;">Fatto.</h2>
                <p style="color:#57534e;">Non riceverai più comunicazioni di marketing da Yuli Olistico.</p>
            </body></html>
        `);
    } catch (e) {
        console.error('Unsubscribe error:', e);
        return res.status(500).send('Si è verificato un errore. Scrivici direttamente per essere rimossa/o dalla lista.');
    }
}

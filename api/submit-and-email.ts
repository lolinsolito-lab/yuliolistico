import { createClient } from '@supabase/supabase-js';

// Vercel Serverless Function: Unified Endpoint for inserting a lead and sending emails via Resend.
// Strict Anon Key Usage for Security (Least Privilege Principle) for insertion
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''; // Necessaria per leggere i template email
const resendApiKey = process.env.RESEND_API_KEY || ''; // Deve essere configurato in Vercel

const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);
// Client con Service Role per bypassare RLS in lettura (NON fare fallback ad anon per evitare fallimenti silenziosi)
const supabaseAdmin = supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

// Funzione di utilità per escaping HTML base (anti-XSS)
function escapeHtml(unsafe: string): string {
    if (!unsafe) return '';
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

// Funzione di utilità per ripulire l'oggetto dell'email da ritorni a capo (Header Injection)
function stripNewlines(text: string): string {
    if (!text) return '';
    return text.replace(/[\r\n]+/g, " ").trim();
}

// Guscio HTML fisso in cui inseriamo il testo scritto da Yuli
function wrapInHtmlShell(bodyContent: string, companyName: string): string {
    // Convertiamo i normali a capo testuali (\n) in tag <br> per l'HTML
    const formattedContent = bodyContent.replace(/\n/g, '<br/>');
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: 'Georgia', serif; background-color: #faf9f6; color: #292524; line-height: 1.6; margin: 0; padding: 0; }
        .container { max-w-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-top: 4px solid #c07a60; }
        .content { font-size: 16px; margin-bottom: 30px; }
        .footer { border-top: 1px solid #e7e5e4; padding-top: 20px; font-size: 12px; color: #a8a29e; text-align: center; font-family: 'Helvetica', sans-serif; }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            ${formattedContent}
        </div>
        <div class="footer">
            <p>Ricevi questa email perché hai interagito con ${companyName}.</p>
            <p>Per non ricevere più comunicazioni promozionali, puoi <a href="#" style="color: #c07a60;">disiscriverti qui</a>.</p>
        </div>
    </div>
</body>
</html>
    `;
}

export default async function handler(req: any, res: any) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        const { lead, source, honeypot } = req.body;

        // 1. Inserimento blindato nel DB tramite RPC (usando Anon Key)
        const { data: dbData, error: dbError } = await supabaseAnon.rpc('submit_lead', {
            p_name: lead.name,
            p_email: lead.email,
            p_phone: lead.phone,
            p_symptom: lead.symptom,
            p_result_treatment: lead.result_treatment,
            p_source: source,
            p_resource_id: lead.resource_id || null,
            p_honeypot: honeypot || '',
            p_marketing_consent: lead.marketing_consent || false
        });

        if (dbError) {
            console.error("Database Error:", dbError);
            return res.status(500).json({ error: "Failed to save lead in database", details: dbError });
        }

        // Se la source è 'gift' (Gift Card), non inviamo nessuna email, il database era l'unico scopo.
        if (source === 'gift') {
            return res.status(200).json({ success: true, emailSent: false, message: 'Lead saved, email skipped for gift.' });
        }

        // Se l'honeypot era compilato, la RPC ignora silenziosamente, non mandiamo email per non spammare l'admin.
        if (honeypot) {
            return res.status(200).json({ success: true, emailSent: false, message: 'Honeypot filled, ignoring.' });
        }

        // 2. Recupero dinamico dati azienda
        const { data: profile } = await supabaseAnon.from('business_profile').select('email, company_name').single();
        const adminEmail = profile?.email || 'yuli@yuliolistico.com';
        const companyName = profile?.company_name || 'Yuli Olistico';
        const senderEmail = `Yuli Olistico <onboarding@resend.dev>`; // Resend default per test

        // 3. Preparazione Email Admin (Hardcoded, è solo interna)
        const adminSubject = stripNewlines(`Nuovo Lead (${source}): ${lead.name || lead.email}`);
        const adminHtml = `
            <h2>Nuovo Lead Acquisito</h2>
            <p><strong>Origine:</strong> ${escapeHtml(source)}</p>
            <p><strong>Nome:</strong> ${escapeHtml(lead.name || 'N/A')}</p>
            <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
            <p><strong>Telefono:</strong> ${escapeHtml(lead.phone || 'N/A')}</p>
            <p><strong>Sintomo/Richiesta:</strong> ${escapeHtml(lead.symptom || 'N/A')}</p>
            <p><strong>Risultato/Trattamento:</strong> ${escapeHtml(lead.result_treatment || 'N/A')}</p>
            <p><strong>Consenso Marketing:</strong> ${lead.marketing_consent ? 'Sì' : 'No'}</p>
        `;

        // 4. Preparazione Email Cliente tramite CMS
        let clientSubject = '';
        let clientHtml = '';

        if (!supabaseAdmin) {
            console.error("FATAL: SUPABASE_SERVICE_ROLE_KEY mancante. Impossibile leggere i template email e completare l'invio via Resend.");
            return res.status(200).json({ success: true, emailSent: false, message: 'DB Success, Email Failed due to missing Service Role Key' });
        }

        // Recuperiamo il template dal DB usando il Service Role (per bypassare RLS in lettura)
        const { data: templateData, error: templateError } = await supabaseAdmin
            .from('email_templates')
            .select('subject, body_content')
            .eq('source', source)
            .single();

        if (templateData && !templateError) {
            // Prepariamo i dati per i segnaposto, assicurandoci di escapare l'HTML e ripulire gli a capo
            const safeName = escapeHtml(lead.name || '');
            const safeSubjectName = stripNewlines(safeName);
            const safeTreatment = escapeHtml(lead.result_treatment || '');
            const safeCompanyName = escapeHtml(companyName);
            
            let safeFileUrl = '#';
            let safeFileTitle = 'il tuo materiale';
            if (lead.resource_id) {
                const { data: resource } = await supabaseAnon.from('archive_resources').select('file_url, title').eq('id', lead.resource_id).single();
                if (resource) {
                    // fileUrl è un URL generato da noi, ma lo facciamo passare da escape per sicurezza se il link fosse strano
                    safeFileUrl = escapeHtml(resource.file_url);
                    safeFileTitle = escapeHtml(resource.title);
                }
            }

            // Sostituzione segnaposto nel Subject (usando valori ripuliti dai ritorni a capo per l'header)
            clientSubject = templateData.subject
                .replace(/\{\{name\}\}/g, safeSubjectName)
                .replace(/\{\{title\}\}/g, stripNewlines(safeFileTitle))
                .replace(/\{\{companyName\}\}/g, stripNewlines(safeCompanyName));

            // Sostituzione segnaposto nel Body (usando valori solo escapati in HTML)
            let rawBody = templateData.body_content
                .replace(/\{\{name\}\}/g, safeName)
                .replace(/\{\{treatment\}\}/g, safeTreatment)
                .replace(/\{\{title\}\}/g, safeFileTitle)
                .replace(/\{\{fileUrl\}\}/g, safeFileUrl)
                .replace(/\{\{companyName\}\}/g, safeCompanyName);

            // Avvolgiamo il testo nudo nel guscio HTML fisso
            clientHtml = wrapInHtmlShell(rawBody, safeCompanyName);
        }

        // 5. Invio via Resend
        try {
            const adminEmailReq = fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${resendApiKey}` },
                body: JSON.stringify({ from: senderEmail, to: adminEmail, subject: adminSubject, html: adminHtml, reply_to: adminEmail })
            });

            // Inviamo l'email al cliente solo se abbiamo trovato un template valido
            const clientEmailReq = (clientSubject && clientHtml) ? fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${resendApiKey}` },
                body: JSON.stringify({ from: senderEmail, to: lead.email, subject: clientSubject, html: clientHtml, reply_to: adminEmail })
            }) : Promise.resolve({ ok: true });

            const [adminRes, clientRes] = await Promise.all([adminEmailReq, clientEmailReq]);

            if (!adminRes.ok || !clientRes.ok) {
                console.warn("Resend API Error (Partial Failure)");
                return res.status(200).json({ success: true, emailSent: false, message: 'DB Success, Email Failed' });
            }

            return res.status(200).json({ success: true, emailSent: true });

        } catch (emailError) {
            console.error("Resend Network Error:", emailError);
            return res.status(200).json({ success: true, emailSent: false, message: 'DB Success, Email Failed' });
        }
    } catch (globalError: any) {
        console.error("FATAL UNCAUGHT EXCEPTION IN VERCEL HANDLER:", globalError);
        return res.status(500).json({ 
            error: "internal_error",
            message: "Si è verificato un errore temporaneo. Riprova tra poco."
        });
    }
}


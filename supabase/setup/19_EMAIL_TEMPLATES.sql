-- 19_EMAIL_TEMPLATES.sql
-- Creazione tabella per la gestione dei template email testuali tramite interfaccia Admin.

-- 1. Creazione della tabella
CREATE TABLE IF NOT EXISTS public.email_templates (
    source TEXT PRIMARY KEY,
    subject TEXT NOT NULL,
    body_content TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Sicurezza (RLS chiusa a tutti tranne Admin)
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- Lettura e Scrittura consentite SOLO agli utenti autenticati (Admin nel pannello)
-- Nota: L'endpoint Vercel userà la Service Role Key, quindi bypasserà questa policy in lettura automaticamente.
CREATE POLICY "Enable read access for authenticated users only" ON public.email_templates
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable update access for authenticated users only" ON public.email_templates
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable insert access for authenticated users only" ON public.email_templates
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable delete access for authenticated users only" ON public.email_templates
    FOR DELETE TO authenticated USING (true);

-- TODO: Quando verrà implementata l'Academy (Studenti login), queste policy "authenticated"
-- dovranno essere ristrette verificando un ruolo admin (es. auth.jwt()->>'role' = 'admin' o tabella claims)
-- per evitare che gli studenti possano modificare le email.

-- 3. Inserimento dei Template di Default
-- I template contengono solo il testo e i segnaposto. Il backend Vercel si occuperà 
-- di avvolgerli nel "Guscio HTML" (logo, footer, unsubscribe) e di rimpiazzare le variabili.

INSERT INTO public.email_templates (source, subject, body_content)
VALUES 
(
    'archive', 
    'Il tuo download: {{title}} - {{companyName}}', 
    'Ciao {{name}},

Grazie per aver richiesto {{title}}.

Puoi scaricare il tuo materiale dal nostro archivio olistico.
Link di download: {{fileUrl}}

A presto,
Il team di {{companyName}}'
),
(
    'academy',
    'Sei in lista d''attesa - {{companyName}} Academy',
    'Benvenuta nell''élite, {{name}}.

La tua iscrizione alla lista d''attesa è confermata.

Riceverai l''invito privato e il materiale preparatorio 48 ore prima dell''apertura ufficiale. I posti migliori andranno a chi sa muoversi in anticipo.

A presto,
Il team di {{companyName}}'
),
(
    'quiz',
    'Il tuo responso olistico - {{companyName}}',
    'Ciao {{name}},

Il nostro motore diagnostico ha elaborato la tua richiesta.

Il rituale suggerito per il tuo sblocco è: {{treatment}}

Ti aspettiamo in studio per far iniziare il tuo viaggio.

A presto,
Il team di {{companyName}}'
),
(
    'newsletter',
    'Benvenuta nel cerchio - {{companyName}}',
    'Ciao {{name}},

Ti confermiamo che sei entrata a far parte del nostro cerchio privato. 
Presto inizierai a ricevere le nostre comunicazioni.

A presto,
Il team di {{companyName}}'
)
ON CONFLICT (source) DO NOTHING; -- Fondamentale: non sovrascrive i template se lo script viene rieseguito

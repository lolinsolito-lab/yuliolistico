-- =====================================================
-- 18_MARKETING_CONSENT.sql
-- Yuli Olistico — Aggiunta consenso GDPR Marketing
-- =====================================================

-- 1. Aggiungiamo le colonne in modo sicuro (idempotente)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema='public' 
                     AND table_name='leads' 
                     AND column_name='marketing_consent') THEN
        ALTER TABLE public.leads ADD COLUMN marketing_consent boolean DEFAULT false;
        ALTER TABLE public.leads ADD COLUMN consent_given_at timestamp with time zone;
    END IF;
END $$;

-- 2. Eliminiamo la VECCHIA funzione esplicitamente per evitare conflitti di firma (overloading)
DROP FUNCTION IF EXISTS public.submit_lead(text, text, text, text, text, text, text, uuid);

-- 3. Eliminiamo preventivamente anche la NUOVA firma, se stiamo ri-eseguendo lo script
DROP FUNCTION IF EXISTS public.submit_lead(text, text, text, text, text, text, text, uuid, boolean);

-- 4. Creiamo la NUOVA funzione con la firma aggiornata (9 parametri)
CREATE FUNCTION public.submit_lead(
    p_name text,
    p_email text,
    p_phone text,
    p_symptom text,
    p_result_treatment text,
    p_source text,
    p_honeypot text,
    p_resource_id uuid DEFAULT NULL,
    p_marketing_consent boolean DEFAULT false
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Se il bot ha compilato l'honeypot, usciamo silenziosamente con un finto successo
    IF p_honeypot IS NOT NULL AND p_honeypot <> '' THEN
        RETURN;
    END IF;

    -- Validazione Source (come ulteriore scudo interno)
    IF p_source NOT IN ('quiz', 'newsletter', 'academy', 'archive', 'gift') THEN
        RAISE EXCEPTION 'Invalid lead source';
    END IF;

    -- Anti-Spam: Previeni iscrizioni multiple per le stesse fonti (tranne quiz)
    IF p_source != 'quiz' THEN
        IF EXISTS (
            SELECT 1 FROM public.leads 
            WHERE email = p_email AND source = p_source
        ) THEN
            RAISE EXCEPTION 'duplicate_subscription';
        END IF;
    END IF;

    -- Inserimento del lead effettivo con il marketing consent
    INSERT INTO public.leads (
        name, 
        email, 
        phone, 
        symptom, 
        result_treatment, 
        source,
        resource_id,
        marketing_consent,
        consent_given_at,
        status
    ) VALUES (
        p_name, 
        p_email, 
        p_phone, 
        p_symptom, 
        p_result_treatment, 
        p_source,
        p_resource_id,
        p_marketing_consent,
        CASE WHEN p_marketing_consent THEN now() ELSE null END,
        'new'
    );
END;
$$;

-- 5. Riassegnamo i permessi esplicitamente alla nuova firma
GRANT EXECUTE ON FUNCTION public.submit_lead(text, text, text, text, text, text, text, uuid, boolean) TO anon, authenticated;

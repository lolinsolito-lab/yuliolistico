-- =====================================================
-- 16_LEADS_RPC.sql
-- Yuli Olistico — Anti-Spam RPC per i Leads
-- =====================================================

-- 1. Rimuoviamo la policy di insert pubblico per blindare l'API REST diretta
DROP POLICY IF EXISTS "Public Insert Leads" ON public.leads;

-- 2. Creiamo la funzione RPC sicura (SECURITY DEFINER)
-- SECURITY DEFINER permette alla funzione di aggirare RLS (visto che abbiamo appena tolto i permessi all'utente anonimo)
CREATE OR REPLACE FUNCTION public.submit_lead(
    p_name text,
    p_email text,
    p_phone text,
    p_symptom text,
    p_result_treatment text,
    p_source text,
    p_resource_id uuid DEFAULT NULL,
    p_honeypot text DEFAULT '',
    p_status text DEFAULT 'new'
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

    -- Validazione Source (come ulteriore scudo interno rispetto al constraint di tabella)
    IF p_source NOT IN ('quiz', 'newsletter', 'academy', 'archive', 'gift') THEN
        RAISE EXCEPTION 'Invalid lead source';
    END IF;

    -- Inserimento del lead effettivo
    INSERT INTO public.leads (
        name, 
        email, 
        phone, 
        symptom, 
        result_treatment, 
        source,
        resource_id,
        status
    ) VALUES (
        p_name, 
        p_email, 
        p_phone, 
        p_symptom, 
        p_result_treatment, 
        p_source,
        p_resource_id,
        p_status
    );
END;
$$;

-- 3. Consentiamo l'esecuzione pubblica esclusivamente a questa RPC
GRANT EXECUTE ON FUNCTION public.submit_lead TO anon, authenticated;

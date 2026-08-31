-- 1. Amplia il constraint
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_source_check;
ALTER TABLE public.leads ADD CONSTRAINT leads_source_check 
    CHECK (source IN ('quiz', 'newsletter', 'academy', 'archive', 'gift', 'sanctuary'));

-- 2. CREATE OR REPLACE con firma e default IDENTICI a quelli reali in produzione
CREATE OR REPLACE FUNCTION public.submit_lead(
    p_name text,
    p_email text,
    p_phone text,
    p_symptom text,
    p_result_treatment text,
    p_source text,
    p_honeypot text,
    p_resource_id uuid DEFAULT NULL::uuid,
    p_marketing_consent boolean DEFAULT false
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
    IF p_honeypot IS NOT NULL AND p_honeypot <> '' THEN
        RETURN;
    END IF;

    IF p_source NOT IN ('quiz', 'newsletter', 'academy', 'archive', 'gift', 'sanctuary') THEN
        RAISE EXCEPTION 'Invalid lead source';
    END IF;

    IF p_source != 'quiz' THEN
        IF EXISTS (
            SELECT 1 FROM public.leads 
            WHERE email = p_email AND source = p_source
        ) THEN
            RAISE EXCEPTION 'duplicate_subscription';
        END IF;
    END IF;

    INSERT INTO public.leads (
        name, email, phone, symptom, result_treatment, source, resource_id, marketing_consent, consent_given_at, status
    ) VALUES (
        p_name, p_email, p_phone, p_symptom, p_result_treatment, p_source, p_resource_id, p_marketing_consent,
        CASE WHEN p_marketing_consent THEN now() ELSE null END, 'new'
    );
END;
$function$;

-- 3. Ridondante ma a costo zero, per sicurezza assoluta
GRANT EXECUTE ON FUNCTION public.submit_lead(text, text, text, text, text, text, text, uuid, boolean) TO anon, authenticated;

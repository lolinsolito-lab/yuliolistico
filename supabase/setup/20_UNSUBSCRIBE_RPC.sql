CREATE OR REPLACE FUNCTION public.unsubscribe_lead(p_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE public.leads
    SET marketing_consent = false
    WHERE email = p_email;
END;
$$;

GRANT EXECUTE ON FUNCTION public.unsubscribe_lead(text) TO anon, authenticated;

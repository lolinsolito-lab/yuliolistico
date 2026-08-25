-- =====================================================
-- 02_ALTER_SERVICES.sql
-- Yuli Olistico — Estende la tabella services (Anima, Doni, Dettagli)
-- =====================================================

-- 1. Add "The Soul" (L'Anima) - Descrizione filosofica
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS soul_description text;

-- 2. Add "The Gifts" (I Doni) - Array di benefici (JSONB per flessibilità futura)
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS benefits jsonb default '[]'::jsonb;

-- 3. Add "Technical Details" (Dettagli Tecnici) - Dati extra
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS program_details jsonb default '{}'::jsonb;

-- 4. Add "Subtitle" - Descrizione breve distinta dalla principale
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS subtitle text;

-- Verifica che le colonne siano state aggiunte
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'services';

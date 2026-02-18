-- 👑 YULI OLISTICO - SERVICE DEEP DIVE MIGRATION
-- Run this in the Supabase SQL Editor

-- 1. Add "The Soul" (L'Anima) - Philosophical description
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS soul_description text;

-- 2. Add "The Gifts" (I Doni) - Array of benefits
-- We store this as text[] (array of strings) or jsonb. 
-- Using jsonb is more flexible for future (e.g. adding icons per benefit), 
-- but text[] is simpler for just a list. Let's use JSONB to be safe for "icon + text" future.
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS benefits jsonb default '[]'::jsonb;

-- 3. Add "Technical Details" (Dettagli Tecnici) - Extra JSON data
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS program_details jsonb default '{}'::jsonb;

-- 4. Add "Subtitle" or "Short Description" if needed distinct from main description
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS subtitle text;

-- Confirms the columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'services';

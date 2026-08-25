-- =====================================================
-- 15_GIFT_VOUCHERS.sql
-- Yuli Olistico — Tabella per le Gift Card (L'Arte del Dono)
-- =====================================================

-- 1. Aggiornamento Constraint su 'leads' per supportare la source 'gift'
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_source_check;
ALTER TABLE public.leads ADD CONSTRAINT leads_source_check 
CHECK (source in ('quiz', 'newsletter', 'academy', 'archive', 'gift'));

-- 2. Creazione Tabella gift_vouchers
CREATE TABLE IF NOT EXISTS public.gift_vouchers (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null unique,
  price text, -- Può essere "€80", "€120" o "Open"
  description text not null,
  color_theme text not null CHECK (color_theme in ('dark', 'light', 'sage')),
  is_custom_amount boolean default false,
  cta_text text not null default 'Regala il Rituale',
  active boolean default true,
  "order" integer default 0
);

-- 3. Trigger per updated_at
DROP TRIGGER IF EXISTS update_gift_vouchers_modtime ON gift_vouchers;
CREATE TRIGGER update_gift_vouchers_modtime
BEFORE UPDATE ON gift_vouchers
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- 4. Sicurezza RLS
ALTER TABLE public.gift_vouchers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Active Gift Vouchers" ON public.gift_vouchers
  FOR SELECT USING (active = true);

CREATE POLICY "Admin Write Gift Vouchers" ON public.gift_vouchers
  FOR ALL USING (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- 5. Seeding dei dati attuali con copy reale
INSERT INTO public.gift_vouchers (title, price, description, color_theme, is_custom_amount, cta_text, "order")
VALUES 
(
  'L''Invito', 
  '€80', 
  'Un''ora a scelta tra le Tecniche Manuali Fondamentali. Il primo passo perfetto per ricominciare ad ascoltarsi.', 
  'dark', 
  false, 
  'Regala il Rituale', 
  1
),
(
  'Sovereign Touch', 
  '€120', 
  'Novanta minuti di puro abbandono con l''Ayurveda Soul Connection. Il dono per eccellenza per chi ha bisogno di spegnere la mente.', 
  'light', 
  false, 
  'Regala l''Esperienza', 
  2
),
(
  'Carta Bianca', 
  'Open', 
  'Scegli l''importo che desideri. Lascia a chi ami il lusso e la libertà di ascoltare il proprio corpo e scegliere la sua rinascita.', 
  'sage', 
  true, 
  'Definisci il Valore', 
  3
)
ON CONFLICT (title) DO NOTHING;

-- =====================================================
-- 10_OPTIMIZATIONS.sql
-- Yuli Olistico — Rifiniture minori (Indici e Limiti Storage)
-- =====================================================

-- 1. Creazione Indici per la tabella Leads (per velocizzare le query della Dashboard)
create index if not exists idx_leads_status on public.leads(status);
create index if not exists idx_leads_email on public.leads(email);

-- 2. Limiti di dimensione per i Bucket (Prevenzione costi imprevisti)
-- Imposta un limite di ~100MB (104857600 byte) per i bucket di contenuti pesanti
update storage.buckets 
set file_size_limit = 104857600 
where id in ('archive_files', 'academy_content');

-- Imposta un limite di ~10MB (10485760 byte) per le immagini standard
update storage.buckets 
set file_size_limit = 10485760 
where id = 'images';

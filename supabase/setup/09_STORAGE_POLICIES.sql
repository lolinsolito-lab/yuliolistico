-- =====================================================
-- 09_STORAGE_POLICIES.sql
-- Yuli Olistico — Setup e sicurezza dei Bucket per file multimediali
-- =====================================================

-- 1. Creazione dei Buckets
insert into storage.buckets (id, name, public) values 
('images', 'images', true),
('archive_files', 'archive_files', true),
('academy_content', 'academy_content', true)
on conflict (id) do nothing;

-- ⚠️ TEMPORANEO: academy_content è pubblico solo perché non esiste ancora
-- contenuto corsi reale da proteggere. Prima di caricare video/PDF a
-- pagamento, questo bucket va reso privato (public = false) e serviranno 
-- policy di lettura collegate alla tabella "enrollments".

-- PREVENZIONE ERRORI: Elimino le policy se esistono già, così lo script
-- può essere lanciato più volte senza bloccarsi.
DROP POLICY IF EXISTS "Public Read Images" ON storage.objects;
DROP POLICY IF EXISTS "Public Read Archive" ON storage.objects;
DROP POLICY IF EXISTS "Public Read Academy Content" ON storage.objects;
DROP POLICY IF EXISTS "Admin Write Objects" ON storage.objects;

-- 2. Policy di Storage (Lettura pubblica per tutti e 3)
create policy "Public Read Images"
on storage.objects for select
using ( bucket_id = 'images' );

create policy "Public Read Archive"
on storage.objects for select
using ( bucket_id = 'archive_files' );

create policy "Public Read Academy Content"
on storage.objects for select
using ( bucket_id = 'academy_content' );

-- 3. Policy di Storage (Scrittura/Modifica/Cancellazione SOLO Admin)
create policy "Admin Write Objects"
on storage.objects for all
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  )
);

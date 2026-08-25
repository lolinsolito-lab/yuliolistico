-- =====================================================
-- 11_ARCHIVE_DOWNLOAD_RPC.sql
-- Funzione sicura (Security Definer) per incrementare 
-- i download dell'archivio risorse senza aprire 
-- permessi UPDATE anonimi pubblici sulla tabella.
-- =====================================================

create or replace function increment_resource_download(resource_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update archive_resources
  set download_count = download_count + 1
  where id = resource_id;
end;
$$;

-- Consentiamo l'esecuzione sia ad utenti anonimi (visitatori) che autenticati (admin)
grant execute on function increment_resource_download(uuid) to anon, authenticated;

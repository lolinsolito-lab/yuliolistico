-- =====================================================
-- 08_LEADS.sql
-- Yuli Olistico — Tabella centrale per CRM (Quiz, Newsletter, Waitlist, Archivio)
-- =====================================================

create table if not exists public.leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text,
  email text not null,
  phone text,
  symptom text,
  result_treatment text,
  source text check (source in ('quiz', 'newsletter', 'academy', 'archive')),
  status text default 'new' check (status in ('new', 'contacted')),
  resource_id uuid references public.archive_resources(id) on delete set null
);

alter table public.leads enable row level security;

-- Public can insert (for forms without login)
create policy "Public Insert Leads" on public.leads
  for insert with check (true);

-- Admin can read/update/delete
create policy "Admin Manage Leads" on public.leads
  for all using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

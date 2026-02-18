-- 👑 YULI OLISTICO DATABASE SCHEMA
-- Run this in the Supabase SQL Editor

-- 1. PROFILES (Admin Users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  role text default 'admin'
);

-- 2. SERVICES (I Trattamenti)
create table public.services (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  category text not null, -- 'MANUAL', 'TOOLS', 'RITUAL'
  description text,
  duration text,
  price text,
  image_url text,
  active boolean default true,
  "order" integer default 0
);

-- 3. SITE SETTINGS (Configurazione Globale)
create table public.site_settings (
  key text primary key,
  value jsonb not null,
  description text
);

-- 4. POSTS (Journal/Blog)
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  content text,
  image_url text,
  category text,
  published boolean default false
);

-- 🛡️ ROW LEVEL SECURITY (Sicurezza)
-- Abilita RLS su tutte le tabelle
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.site_settings enable row level security;
alter table public.posts enable row level security;

-- POLICIES (Regole)

-- Chiunque può LEGGERE (Public Read)
create policy "Public Read Services" on public.services for select using (true);
create policy "Public Read Settings" on public.site_settings for select using (true);
create policy "Public Read Posts" on public.posts for select using (published = true);

-- Solo gli Admin (autenticati) possono SCRIVERE (Insert/Update/Delete)
create policy "Admin Write Services" on public.services for all using (auth.role() = 'authenticated');
create policy "Admin Write Settings" on public.site_settings for all using (auth.role() = 'authenticated');
create policy "Admin Write Posts" on public.posts for all using (auth.role() = 'authenticated');

-- 💾 STORAGE (Bucket per le immagini)
-- Nota: Crea un bucket chiamato 'images' dal pannello Storage di Supabase e rendilo Pubblico.

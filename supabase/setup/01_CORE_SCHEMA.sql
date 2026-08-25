-- =====================================================
-- 01_CORE_SCHEMA.sql
-- Yuli Olistico — Schema di base (profiles, services, site_settings, posts)
-- =====================================================

create extension if not exists "uuid-ossp";

-- 1. PROFILES (Utenti Admin)
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  role text default 'admin'
);

-- 2. SERVICES (I Trattamenti)
create table if not exists public.services (
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
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  description text
);

-- 4. POSTS (Journal/Blog)
create table if not exists public.posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  content text,
  image_url text,
  category text,
  published boolean default false
);

-- 🛡️ ROW LEVEL SECURITY
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.site_settings enable row level security;
alter table public.posts enable row level security;

-- ============================
-- POLICIES: PROFILES
-- ============================
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

-- ============================
-- POLICIES: SERVICES
-- ============================
create policy "Public Read Services" on public.services
  for select using (true);

create policy "Admin Write Services" on public.services
  for all using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- ============================
-- POLICIES: SITE SETTINGS
-- ============================
create policy "Public Read Settings" on public.site_settings
  for select using (true);

create policy "Admin Write Settings" on public.site_settings
  for all using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- ============================
-- POLICIES: POSTS
-- ============================
create policy "Public Read Posts" on public.posts
  for select using (published = true);

create policy "Admin Write Posts" on public.posts
  for all using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

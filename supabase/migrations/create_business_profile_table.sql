-- Create a table for the Business Profile / Global Settings
create table if not exists business_profile (
  id uuid default uuid_generate_v4() primary key,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Brand Identity
  brand_name text default 'Yuli Olistico',
  hero_headline text,
  hero_subheadline text,
  
  -- Professional Info
  full_name text default 'Yuli Yuliantini',
  role text default 'Founder & CEO',
  bio_short text,
  bio_long text, -- Can contain markdown or HTML
  profile_image_url text, -- The 'Fog' image
  signature_image_url text,

  -- Contact & Legal
  email text,
  phone text,
  whatsapp text,
  address text,
  vat_number text, -- P.IVA
  
  -- Social Media (JSON)
  social_links jsonb default '{}'::jsonb,
  
  -- Hours/Availability (JSON)
  business_hours jsonb default '{}'::jsonb
);

-- Enable RLS
alter table business_profile enable row level security;

-- Policies
-- Public can read everything
create policy "Public view business profile" on business_profile
  for select using (true);

-- Only Admin can update
create policy "Admin manage business profile" on business_profile
  for all using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Insert default row if not exists
insert into business_profile (full_name, role, email, profile_image_url)
select 'Yuli Yuliantini', 'Founder & CEO', 'yuliolistico@gmail.com', '/images/yuli-profile.png'
where not exists (select 1 from business_profile);


-- 1. COURSES Table (The Containers)
create table if not exists courses (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  thumbnail_url text, -- Cover image for the course
  price_eur integer default 0, -- Price in Euro (0 = Free)
  is_published boolean default false,
  slug text unique -- For URL routing (e.g. /academy/fondamenti-tocco)
);

-- 2. MODULES Table (The Content - 1:N with Courses)
create table if not exists modules (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  course_id uuid references courses(id) on delete cascade,
  title text not null,
  description text,
  type text check (type in ('VIDEO', 'PDF', 'AUDIO')),
  content_url text not null, -- Supabase Storage URL or Vimeo/YouTube ID
  thumbnail_url text,
  duration integer, -- Duration in minutes (optional)
  sort_order integer default 0 -- To order modules within the course
);

-- 3. ENROLLMENTS Table (Access Control)
create table if not exists enrollments (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  status text default 'active' check (status in ('active', 'revoked', 'expired')),
  unique(user_id, course_id) -- Prevent duplicate enrollments
);

-- Enable RLS
alter table courses enable row level security;
alter table modules enable row level security;
alter table enrollments enable row level security;

-- POLICIES

-- Courses: Public can read PUBLISHED courses.
create policy "Public view published courses" on courses
  for select using (is_published = true);

-- Admin Policy: Checks if user has 'admin' role in profiles table
create policy "Admin manage courses" on courses
  for all using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Modules: Only Enrolled Users or Admins.
create policy "Enrolled users view modules" on modules
  for select using (
    exists (
      select 1 from enrollments
      where enrollments.user_id = auth.uid()
      and enrollments.course_id = modules.course_id
      and enrollments.status = 'active'
    )
    OR
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

create policy "Admin manage modules" on modules
  for all using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Enrollments: Users see their own. Admins manage all.
create policy "Users view own enrollments" on enrollments
  for select using (auth.uid() = user_id);

create policy "Admin manage enrollments" on enrollments
  for all using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

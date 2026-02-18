-- Create a table to store dynamic site content (CMS)
create table if not exists site_content (
  section text primary key, -- e.g., 'hero', 'philosophy', 'about'
  content jsonb not null default '{}'::jsonb,
  last_updated timestamptz default now()
);

-- Enable Row Level Security
alter table site_content enable row level security;

-- Policy: Everyone can read content (public site)
create policy "Public content is viewable by everyone"
  on site_content for select
  using ( true );

-- Policy: Only authenticated users can update (admins)
create policy "Admins can update content"
  on site_content for update
  using ( auth.role() = 'authenticated' );

-- Policy: Only authenticated users can insert (admins)
create policy "Admins can insert content"
  on site_content for insert
  with check ( auth.role() = 'authenticated' );

-- Insert default Hero content if not exists
insert into site_content (section, content)
values (
  'hero',
  '{
    "title": "NON È PER TUTTI.",
    "subtitle": "Se cerchi un trattamento veloce, scorri oltre. Se cerchi di riconnetterti con la parte più profonda di te, sei arrivata a casa.",
    "backgroundImage": "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1920&auto=format&fit=crop",
    "tickerPhrases": [
      "Il silenzio è il vero lusso",
      "Esperienze su misura",
      "Solo su appuntamento",
      "Non è per tutti. È per te",
      "Ogni corpo racconta",
      "8+ anni di eccellenza",
      "Bergamo & Milano",
      "Benessere, mai estetica"
    ]
  }'::jsonb
) on conflict (section) do nothing;

-- Insert default Philosophy content if not exists
insert into site_content (section, content)
values (
  'philosophy',
  '{
    "badgeText": "Il Manifesto 2026",
    "titleLine1": "Siamo l''antidoto",
    "titleLine2": "alla fretta.",
    "text1": "Là fuori è una catena di montaggio. Corpi trattati come oggetti da riparare in 30 minuti. Rumore. Luci al neon. Freddezza.",
    "quote": "Qui è diverso. O ci tieni alla qualità del tempo che dedichi a te stessa, o questo non è il posto per te.",
    "text2": "Yuli Olistico non vende \"trattamenti\". Vende un ritorno al corpo. Ogni rituale è un''opera unica, disegnata sulla tua energia del momento. Non seguiamo protocolli standard. Seguiamo te.",
    "imageOverlayQuote": "La qualità non ha fretta. La tua anima ringrazia.",
    "imageOverlayAuthor": "Yuliantini",
    "imageUrl": "https://images.unsplash.com/photo-1591343395082-e120087004b4?q=80&w=800&auto=format&fit=crop"
  }'::jsonb
) on conflict (section) do nothing;

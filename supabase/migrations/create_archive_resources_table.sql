-- =============================================
-- L'Archivio: Content Marketing Resources
-- =============================================
-- Run in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS archive_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL DEFAULT 'guides',     -- 'mindset' | 'body' | 'rituals' | 'guides'
    resource_type TEXT NOT NULL DEFAULT 'pdf',    -- 'pdf' | 'audio' | 'video' | 'article'
    file_url TEXT,                                -- Supabase Storage URL
    thumbnail_url TEXT,
    is_free BOOLEAN DEFAULT true,
    upsell_service TEXT,                          -- e.g. "Thai Royal Flow"
    upsell_text TEXT,                             -- e.g. "Prenota il Rituale Completo"
    requires_email BOOLEAN DEFAULT true,
    download_count INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: Public can read published, Admin can do everything
ALTER TABLE archive_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published resources"
    ON archive_resources FOR SELECT
    USING (is_published = true);

CREATE POLICY "Admin full access to resources"
    ON archive_resources FOR ALL
    USING (true)
    WITH CHECK (true);

-- Seed with sample categories
INSERT INTO archive_resources (title, description, category, resource_type, is_free, requires_email, upsell_service, upsell_text, is_published, sort_order) VALUES
    ('5 Stretching che il tuo Corpo ti Sta Chiedendo', 'Mini-guida PDF con i 5 movimenti fondamentali per risvegliare il corpo ogni mattina.', 'body', 'pdf', true, true, 'Thai Royal Flow', 'Prenota il Rituale Completo →', false, 1),
    ('Meditazione del Silenzio — 10 Minuti', 'Audio guidato per disconnetterti dal rumore e ritrovare il centro.', 'mindset', 'audio', true, true, 'Ayurveda Soul Connection', 'Prenota l''Esperienza Completa →', false, 2),
    ('Il Manuale del Recupero Attivo', 'Come trasformare il riposo da passivo a strategico. Guida completa.', 'rituals', 'pdf', true, true, 'Deep Tissue Release', 'Prenota la Sessione →', false, 3);

-- =====================================================
-- 13_UPDATE_IMAGES.sql
-- Aggiorna le immagini rotte o generiche con foto
-- di alta qualità e contestuali (Unsplash) per TUTTI i trattamenti.
-- =====================================================

-- 1. Thai Royal Flow
UPDATE public.services 
SET image_url = 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80'
WHERE title = 'Thai Royal Flow';

-- 2. Rituale Olistico Drenante
UPDATE public.services 
SET image_url = 'https://images.unsplash.com/photo-1600334089648-b0d9c3024ea2?auto=format&fit=crop&w=800&q=80'
WHERE title = 'Rituale Olistico Drenante';

-- 3. Bamboo Deep Force
UPDATE public.services 
SET image_url = 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80'
WHERE title = 'Bamboo Deep Force';

-- 4. Candle Ritual — Luce Calda
UPDATE public.services 
SET image_url = 'https://images.unsplash.com/photo-1528255909304-4ceafc8eb44b?auto=format&fit=crop&w=800&q=80'
WHERE title = 'Candle Ritual — Luce Calda';

-- 5. Wood Therapy Sculpt
UPDATE public.services 
SET image_url = 'https://images.unsplash.com/photo-1591343395082-e1200ce414dc?auto=format&fit=crop&w=800&q=80'
WHERE title = 'Wood Therapy Sculpt';

-- 6. Hot Stone Volcanic Journey
UPDATE public.services 
SET image_url = 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80'
WHERE title = 'Hot Stone Volcanic Journey';

-- 7. Himalayan Salt Stone Ritual
UPDATE public.services 
SET image_url = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
WHERE title = 'Himalayan Salt Stone Ritual';

-- 8. Crystal Gua Sha — Rituale Viso
UPDATE public.services 
SET image_url = 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80'
WHERE title = 'Crystal Gua Sha — Rituale Viso';

-- 9. Coppettazione Olistica
UPDATE public.services 
SET image_url = 'https://images.unsplash.com/photo-1570534249117-66a7b7eb6c85?auto=format&fit=crop&w=800&q=80'
WHERE title = 'Coppettazione Olistica';

-- 10. Tibetan Sound Bath — Armonia Sonora
UPDATE public.services 
SET image_url = 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&w=800&q=80'
WHERE title = 'Tibetan Sound Bath — Armonia Sonora';

-- 11. Ayurveda Soul Connection
UPDATE public.services 
SET image_url = 'https://images.unsplash.com/photo-1608282361718-4796cefc692c?auto=format&fit=crop&w=800&q=80'
WHERE title = 'Ayurveda Soul Connection';

-- 12. Rituale delle Origini
UPDATE public.services 
SET image_url = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
WHERE title = 'Rituale delle Origini';

-- 13. Yuli Signature — L''Esperienza Totale
UPDATE public.services 
SET image_url = 'https://images.unsplash.com/photo-1544161513-01f14371f435?auto=format&fit=crop&w=800&q=80'
WHERE title = 'Yuli Signature — L''Esperienza Totale';

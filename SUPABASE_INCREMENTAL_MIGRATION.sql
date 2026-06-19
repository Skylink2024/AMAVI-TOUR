-- =============================================================================
-- Angola Rhythms — INCREMENTAL migration only (for existing Supabase projects)
-- Run this in Supabase → SQL Editor. Safe to re-run: uses IF NOT EXISTS / DROP IF EXISTS.
-- Do NOT run the full SUPABASE_SCHEMA.sql if tables and policies already exist.
-- =============================================================================

-- Hero: editable tagline above title (Culture · Identity · Legacy)
ALTER TABLE hero_sections
  ADD COLUMN IF NOT EXISTS eyebrow TEXT NOT NULL DEFAULT 'Culture · Identity · Legacy';

-- RLS policies (recreate if missing or outdated)
DROP POLICY IF EXISTS "Allow authenticated users to insert hero sections" ON hero_sections;
CREATE POLICY "Allow authenticated users to insert hero sections" ON hero_sections
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to update gallery items" ON gallery_items;
CREATE POLICY "Allow authenticated users to update gallery items" ON gallery_items
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to update team members" ON team_members;
CREATE POLICY "Allow authenticated users to update team members" ON team_members
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Indexes (skip if already present)
CREATE INDEX IF NOT EXISTS idx_dances_created_at ON dances(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date DESC);
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
CREATE INDEX IF NOT EXISTS idx_gallery_type ON gallery_items(type);

-- Storage: dance images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('dance-images', 'dance-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies (additive / idempotent names)
DROP POLICY IF EXISTS "Public read dance-images" ON storage.objects;
CREATE POLICY "Public read dance-images" ON storage.objects
  FOR SELECT USING (bucket_id = 'dance-images');

DROP POLICY IF EXISTS "Authenticated upload about and dance images" ON storage.objects;
CREATE POLICY "Authenticated upload about and dance images" ON storage.objects
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated'
    AND bucket_id IN ('about-images', 'dance-images')
  );

DROP POLICY IF EXISTS "Authenticated update content images" ON storage.objects;
CREATE POLICY "Authenticated update content images" ON storage.objects
  FOR UPDATE USING (
    auth.role() = 'authenticated'
    AND bucket_id IN (
      'hero-images',
      'about-images',
      'gallery-images',
      'videos',
      'course-images',
      'event-images',
      'hotel-images',
      'dance-images'
    )
  );

DROP POLICY IF EXISTS "Authenticated delete about and dance images" ON storage.objects;
CREATE POLICY "Authenticated delete about and dance images" ON storage.objects
  FOR DELETE USING (
    auth.role() = 'authenticated'
    AND bucket_id IN ('about-images', 'dance-images')
  );

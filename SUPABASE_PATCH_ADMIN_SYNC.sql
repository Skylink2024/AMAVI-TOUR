-- Patch for existing Angola Rhythms Supabase projects (run once in SQL Editor).
-- Adds: hero INSERT, gallery/team UPDATE, dance-images bucket, storage policies for
-- about-images + dance-images uploads, upserts (UPDATE on storage.objects).

-- Hero eyebrow line (Culture · Identity · Legacy), editable from admin
ALTER TABLE hero_sections
  ADD COLUMN IF NOT EXISTS eyebrow TEXT NOT NULL DEFAULT 'Culture · Identity · Legacy';

-- --- Tables: RLS ---
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

-- --- Storage bucket ---
INSERT INTO storage.buckets (id, name, public)
VALUES ('dance-images', 'dance-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public read for dance images (additive with your existing "Public Access" policy)
DROP POLICY IF EXISTS "Public read dance-images" ON storage.objects;
CREATE POLICY "Public read dance-images" ON storage.objects
  FOR SELECT USING (bucket_id = 'dance-images');

-- Uploads for buckets missing from older schema (additive)
DROP POLICY IF EXISTS "Authenticated upload about and dance images" ON storage.objects;
CREATE POLICY "Authenticated upload about and dance images" ON storage.objects
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated'
    AND bucket_id IN ('about-images', 'dance-images')
  );

-- Upsert / replace files (required when upload uses upsert: true)
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

-- Delete own uploads in about + dance buckets (additive)
DROP POLICY IF EXISTS "Authenticated delete about and dance images" ON storage.objects;
CREATE POLICY "Authenticated delete about and dance images" ON storage.objects
  FOR DELETE USING (
    auth.role() = 'authenticated'
    AND bucket_id IN ('about-images', 'dance-images')
  );

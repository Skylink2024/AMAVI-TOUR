-- Enable unrestricted uploads for all media formats
-- Run these SQL commands in Supabase SQL editor

-- Allow all image formats for gallery
CREATE POLICY "Allow all image uploads" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'gallery-images' 
    OR bucket_id = 'hero-images'
    OR bucket_id = 'about-images'
    OR bucket_id = 'course-images'
    OR bucket_id = 'event-images'
    OR bucket_id = 'hotel-images'
    OR bucket_id = 'dance-images'
  );

-- Allow all video formats for videos
CREATE POLICY "Allow all video uploads" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'videos'
  );

-- Allow public read access to all buckets
CREATE POLICY "Allow public read" ON storage.objects
  FOR SELECT USING (true);

-- Allow authenticated users to delete files from their buckets
CREATE POLICY "Allow authenticated delete" ON storage.objects
  FOR DELETE TO authenticated USING (true);

-- Increase max upload size (example: 500MB)
-- Note: This must be done via Supabase dashboard Settings > Storage > File size limits
-- Set to: 500000000 (bytes) or higher for large videos

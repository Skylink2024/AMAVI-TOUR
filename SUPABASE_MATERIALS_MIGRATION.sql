-- Migration: Add Materials, Guests tables and Team Images bucket
-- This creates the materials and guests tables with associated policies for the admin backend

-- Materials Table
CREATE TABLE IF NOT EXISTS materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  price DECIMAL(10, 2) NOT NULL,
  link TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Guests Table
CREATE TABLE IF NOT EXISTS guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image_url TEXT,
  initials TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_materials_created_at ON materials(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_guests_created_at ON guests(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- Materials Policies
CREATE POLICY IF NOT EXISTS "Allow anyone to view materials" ON materials
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Allow authenticated users to manage materials" ON materials
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Allow authenticated users to update materials" ON materials
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Allow authenticated users to delete materials" ON materials
  FOR DELETE USING (auth.role() = 'authenticated');

-- Guests Policies
CREATE POLICY IF NOT EXISTS "Allow anyone to view guests" ON guests
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Allow authenticated users to manage guests" ON guests
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Allow authenticated users to update guests" ON guests
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Allow authenticated users to delete guests" ON guests
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create storage buckets for materials, team, and guest images
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('material-images', 'material-images', true),
  ('team-images', 'team-images', true),
  ('guest-images', 'guest-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for material-images bucket
CREATE POLICY IF NOT EXISTS "Public Access for Materials" ON storage.objects
  FOR SELECT USING (bucket_id = 'material-images');

CREATE POLICY IF NOT EXISTS "Authenticated users can upload materials" ON storage.objects
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND 
    bucket_id = 'material-images'
  );

CREATE POLICY IF NOT EXISTS "Authenticated users can update material storage objects" ON storage.objects
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND 
    bucket_id = 'material-images'
  );

CREATE POLICY IF NOT EXISTS "Authenticated users can delete material storage" ON storage.objects
  FOR DELETE USING (
    auth.role() = 'authenticated' AND 
    bucket_id = 'material-images'
  );

-- Storage policies for team-images bucket
CREATE POLICY IF NOT EXISTS "Public Access for Team" ON storage.objects
  FOR SELECT USING (bucket_id = 'team-images');

CREATE POLICY IF NOT EXISTS "Authenticated users can upload team" ON storage.objects
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND 
    bucket_id = 'team-images'
  );

CREATE POLICY IF NOT EXISTS "Authenticated users can update team storage objects" ON storage.objects
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND 
    bucket_id = 'team-images'
  );

CREATE POLICY IF NOT EXISTS "Authenticated users can delete team storage" ON storage.objects
  FOR DELETE USING (
    auth.role() = 'authenticated' AND 
    bucket_id = 'team-images'
  );

-- Storage policies for guest-images bucket
CREATE POLICY IF NOT EXISTS "Public Access for Guests" ON storage.objects
  FOR SELECT USING (bucket_id = 'guest-images');

CREATE POLICY IF NOT EXISTS "Authenticated users can upload guests" ON storage.objects
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND 
    bucket_id = 'guest-images'
  );

CREATE POLICY IF NOT EXISTS "Authenticated users can update guest storage objects" ON storage.objects
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND 
    bucket_id = 'guest-images'
  );

CREATE POLICY IF NOT EXISTS "Authenticated users can delete guest storage" ON storage.objects
  FOR DELETE USING (
    auth.role() = 'authenticated' AND 
    bucket_id = 'guest-images'
  );
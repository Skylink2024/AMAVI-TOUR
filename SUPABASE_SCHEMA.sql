-- Angola Rhythms Live - Supabase Database Schema
-- This SQL script creates all necessary tables and policies for the admin backend
--
-- IMPORTANT: If your Supabase project already has these tables/policies, do NOT run
-- this whole file — it will error on duplicate policies. Use instead:
--   SUPABASE_INCREMENTAL_MIGRATION.sql
-- (safe ALTER / DROP IF EXISTS / additive storage policies only.)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Hero Sections Table
CREATE TABLE IF NOT EXISTS hero_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  eyebrow TEXT NOT NULL DEFAULT 'Culture · Identity · Legacy',
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  image_url TEXT,
  cta_text TEXT,
  cta_link TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- About Section Table
CREATE TABLE IF NOT EXISTS about (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Dances Table
CREATE TABLE IF NOT EXISTS dances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT,
  price DECIMAL(10, 2) NOT NULL,
  capacity INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration_weeks INTEGER NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Gallery Items Table
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  image_url TEXT,
  video_url TEXT,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Hotels Table
CREATE TABLE IF NOT EXISTS hotels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  address TEXT NOT NULL,
  price_per_night DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  link TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image_url TEXT,
  bio TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_dances_created_at ON dances(created_at DESC);
CREATE INDEX idx_events_date ON events(date DESC);
CREATE INDEX idx_courses_level ON courses(level);
CREATE INDEX idx_gallery_type ON gallery_items(type);

-- Enable Row Level Security (RLS)
ALTER TABLE hero_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE dances ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admin only)
-- These policies should be used after setting up proper authentication

-- Hero Sections Policies
CREATE POLICY "Allow authenticated users to view hero sections" ON hero_sections
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to update hero sections" ON hero_sections
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert hero sections" ON hero_sections
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- About Policies
CREATE POLICY "Allow anyone to view about" ON about
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage about" ON about
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update about" ON about
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Dances Policies
CREATE POLICY "Allow anyone to view dances" ON dances
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage dances" ON dances
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update dances" ON dances
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete dances" ON dances
  FOR DELETE USING (auth.role() = 'authenticated');

-- Events Policies
CREATE POLICY "Allow anyone to view events" ON events
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage events" ON events
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update events" ON events
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete events" ON events
  FOR DELETE USING (auth.role() = 'authenticated');

-- Courses Policies
CREATE POLICY "Allow anyone to view courses" ON courses
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage courses" ON courses
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update courses" ON courses
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete courses" ON courses
  FOR DELETE USING (auth.role() = 'authenticated');

-- Gallery Policies
CREATE POLICY "Allow anyone to view gallery" ON gallery_items
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage gallery" ON gallery_items
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete gallery items" ON gallery_items
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update gallery items" ON gallery_items
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Hotels Policies
CREATE POLICY "Allow anyone to view hotels" ON hotels
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage hotels" ON hotels
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update hotels" ON hotels
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete hotels" ON hotels
  FOR DELETE USING (auth.role() = 'authenticated');

-- Team Members Policies
CREATE POLICY "Allow anyone to view team members" ON team_members
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage team members" ON team_members
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete team members" ON team_members
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update team members" ON team_members
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('hero-images', 'hero-images', true),
  ('about-images', 'about-images', true),
  ('gallery-images', 'gallery-images', true),
  ('videos', 'videos', true),
  ('course-images', 'course-images', true),
  ('event-images', 'event-images', true),
  ('hotel-images', 'hotel-images', true),
  ('dance-images', 'dance-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for public access
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id IN ('hero-images', 'about-images', 'gallery-images', 'videos', 'course-images', 'event-images', 'hotel-images', 'dance-images'));

CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND 
    bucket_id IN ('hero-images', 'about-images', 'gallery-images', 'videos', 'course-images', 'event-images', 'hotel-images', 'dance-images')
  );

CREATE POLICY "Authenticated users can update storage objects" ON storage.objects
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND 
    bucket_id IN ('hero-images', 'about-images', 'gallery-images', 'videos', 'course-images', 'event-images', 'hotel-images', 'dance-images')
  );

CREATE POLICY "Authenticated users can delete" ON storage.objects
  FOR DELETE USING (
    auth.role() = 'authenticated' AND 
    bucket_id IN ('hero-images', 'about-images', 'gallery-images', 'videos', 'course-images', 'event-images', 'hotel-images', 'dance-images')
  );

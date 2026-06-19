# Supabase SQL Schema Documentation

## Overview
This document explains each part of the `SUPABASE_SCHEMA.sql` file and how to use it.

---

## 1. Enable UUID Extension

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

**What it does:** Enables UUID generation support for unique IDs
**Why:** Supabase uses UUIDs for secure, unique identifiers

---

## 2. Hero Sections Table

```sql
CREATE TABLE IF NOT EXISTS hero_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  image_url TEXT,
  cta_text TEXT,
  cta_link TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Purpose:** Store hero banner content
**Fields:**
- `title` - Main headline
- `subtitle` - Subheading text
- `image_url` - Background image URL
- `cta_text` - Call-to-action button text
- `cta_link` - Button link destination

**Example Query:**
```sql
SELECT * FROM hero_sections;
```

---

## 3. Dances Table

```sql
CREATE TABLE IF NOT EXISTS dances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Purpose:** Store dance types and offerings
**Fields:**
- `name` - Dance name (e.g., "Semba")
- `description` - What the dance is about
- `image_url` - Dance image
- `price` - Cost in decimal format (10.50 for $10.50)

**Example Query:**
```sql
-- Get all dances ordered by newest
SELECT * FROM dances ORDER BY created_at DESC;

-- Find dances under $50
SELECT * FROM dances WHERE price < 50;

-- Update a dance price
UPDATE dances SET price = 45.00 WHERE name = 'Semba';
```

---

## 4. Events Table

```sql
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
```

**Purpose:** Store event listings
**Fields:**
- `date` - Event date (format: YYYY-MM-DD)
- `time` - Event time (format: HH:MM:SS)
- `location` - Where the event happens
- `capacity` - Number of attendees allowed
- `price` - Ticket price

**Example Query:**
```sql
-- Get upcoming events
SELECT * FROM events WHERE date >= CURRENT_DATE ORDER BY date;

-- Get events at a specific location
SELECT * FROM events WHERE location = 'Grand Hall, Luanda';

-- Find capacity for an event
SELECT title, capacity FROM events WHERE id = 'uuid-here';
```

---

## 5. Courses Table

```sql
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
```

**Purpose:** Store dance course information
**Fields:**
- `duration_weeks` - How long the course runs
- `level` - Skill level (MUST be: beginner, intermediate, or advanced)

**Example Query:**
```sql
-- Get all beginner courses
SELECT * FROM courses WHERE level = 'beginner';

-- Get courses under 8 weeks
SELECT * FROM courses WHERE duration_weeks < 8;

-- Get advanced courses sorted by price
SELECT * FROM courses WHERE level = 'advanced' ORDER BY price DESC;
```

---

## 6. Gallery Items Table

```sql
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  image_url TEXT,
  video_url TEXT,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Purpose:** Store gallery images and videos
**Fields:**
- `type` - MUST be 'image' or 'video'
- `image_url` - Only for images
- `video_url` - Only for videos (YouTube/Vimeo links)

**Example Query:**
```sql
-- Get all images
SELECT * FROM gallery_items WHERE type = 'image';

-- Get all videos
SELECT * FROM gallery_items WHERE type = 'video';

-- Delete old gallery items
DELETE FROM gallery_items WHERE created_at < NOW() - INTERVAL '1 year';
```

---

## 7. Hotels Table

```sql
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
```

**Purpose:** Store hotel recommendations
**Fields:**
- `price_per_night` - Nightly rate
- `link` - Booking URL (e.g., booking.com link)

**Example Query:**
```sql
-- Get hotels under $150/night
SELECT * FROM hotels WHERE price_per_night < 150 ORDER BY price_per_night;

-- Get hotel by name
SELECT * FROM hotels WHERE LOWER(name) LIKE '%luxury%';
```

---

## 8. Team Members Table

```sql
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image_url TEXT,
  bio TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Purpose:** Store team member profiles
**Fields:**
- `role` - Job title or position
- `bio` - Short biography

**Example Query:**
```sql
-- Get all team members
SELECT * FROM team_members ORDER BY name;

-- Find specific role
SELECT * FROM team_members WHERE role = 'Dance Instructor';
```

---

## 9. Create Indexes

```sql
CREATE INDEX idx_dances_created_at ON dances(created_at DESC);
CREATE INDEX idx_events_date ON events(date DESC);
CREATE INDEX idx_courses_level ON courses(level);
CREATE INDEX idx_gallery_type ON gallery_items(type);
```

**What it does:** Speed up common queries
**Example queries that benefit:**
- Sorting dances by newest → uses `idx_dances_created_at`
- Filtering courses by level → uses `idx_courses_level`

---

## 10. Row Level Security (RLS)

```sql
ALTER TABLE hero_sections ENABLE ROW LEVEL SECURITY;
-- ... (for all tables)
```

**What it does:** Enables security policies on tables

---

## 11. Security Policies

### Public Read Access
```sql
CREATE POLICY "Allow authenticated users to view hero sections" ON hero_sections
  FOR SELECT USING (true);
```

**What it does:** Anyone can read hero sections (but only authenticated users can modify)

### Authenticated Write Access
```sql
CREATE POLICY "Allow authenticated users to manage dances" ON dances
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

**What it does:** Only logged-in admin users can create/update/delete

---

## 12. Storage Buckets

```sql
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('hero-images', 'hero-images', true),
  ('gallery-images', 'gallery-images', true),
  -- ... etc
```

**What it does:** Creates storage buckets for file uploads

**Buckets created:**
- `hero-images` - Hero section images
- `gallery-images` - Gallery photos
- `videos` - Video files
- `course-images` - Course thumbnails
- `event-images` - Event posters
- `hotel-images` - Hotel photos

---

## Common SQL Queries

### Get Total Records
```sql
SELECT COUNT(*) FROM dances;
SELECT COUNT(*) FROM events;
```

### Search Records
```sql
SELECT * FROM dances WHERE name LIKE '%semba%';
SELECT * FROM events WHERE title LIKE '%festival%';
```

### Update Records
```sql
UPDATE dances SET price = 50.00 WHERE id = 'uuid-here';
UPDATE courses SET level = 'intermediate' WHERE id = 'uuid-here';
```

### Delete Records
```sql
DELETE FROM dances WHERE id = 'uuid-here';
DELETE FROM gallery_items WHERE created_at < NOW() - INTERVAL '30 days';
```

### Join Multiple Tables (Advanced)
```sql
-- This shows how to structure complex queries if needed
SELECT d.name, COUNT(*) as popularity
FROM dances d
GROUP BY d.name
ORDER BY popularity DESC;
```

---

## Troubleshooting

### "Duplicate key error"
- You're trying to insert duplicate data
- Solution: Check if record already exists

### "Permission denied"
- Your user doesn't have rights
- Solution: Check RLS policies and user role

### "Column does not exist"
- You're querying a column that doesn't exist
- Solution: Run the full schema script again

### Data not showing
- Check RLS policies
- Verify user is authenticated
- Check with: `SELECT auth.role();`

---

## Backup Your Data

```sql
-- Export all dances
SELECT * FROM dances;

-- Export all events
SELECT * FROM events;

-- Export specific records
SELECT * FROM courses WHERE level = 'beginner';
```

Copy results to CSV for backup.

---

## Maintenance

### Regular Checks
```sql
-- Check table sizes
SELECT relname, pg_size_pretty(pg_total_relation_size(relid)) FROM pg_stat_user_tables;

-- Check for old records
SELECT COUNT(*) FROM gallery_items WHERE created_at < NOW() - INTERVAL '90 days';

-- Verify indexes
SELECT * FROM pg_stat_user_indexes;
```

---

## Important Notes

1. **UUIDs** - Always use UUID for IDs, never sequential numbers
2. **Timestamps** - created_at/updated_at are automatic
3. **Decimals** - Use DECIMAL(10, 2) for money (10 digits, 2 decimals)
4. **Constraints** - level and type fields have strict allowed values
5. **NOT NULL** - Some fields can't be empty

---

## API Integration

When using the admin panel, these queries run automatically:

```tsx
// TypeScript/React automatically converts to:
supabase.from('dances').select().order('created_at', { ascending: false })

// Which runs:
SELECT * FROM dances ORDER BY created_at DESC;
```

No need to write SQL directly!

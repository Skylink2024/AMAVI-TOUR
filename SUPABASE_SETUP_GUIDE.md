# Angola Rhythms Live - Supabase Admin Backend Setup Guide

## Overview
This guide will help you set up the complete admin backend for your Angola Rhythms Live website using Supabase.

## What's Included
✅ Full admin dashboard with authentication
✅ Hero section editor
✅ Dances management (add, edit, delete)
✅ Events management
✅ Courses management
✅ Gallery (images & videos)
✅ Hotels recommendations
✅ Team members management
✅ File storage for images and videos

---

## Step 1: Set Up Supabase Project

### 1.1 Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up or login with your account
3. Click "New Project"
4. Project name: `Angola Rhythms Live`
5. Database password: Create a strong password
6. Region: Choose the closest to your location
7. Wait for the project to initialize (5-10 minutes)

### 1.2 Get Your Credentials
1. Go to Project Settings → API
2. Copy:
   - **Project URL** - This is your `VITE_SUPABASE_URL`
   - **anon key** - This is your `VITE_SUPABASE_ANON_KEY`

---

## Step 2: Set Up Database Schema

### 2.1 Run SQL Script
1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire content from `SUPABASE_SCHEMA.sql` file
4. Paste it into the SQL editor
5. Click "Run"
6. Wait for all queries to complete (should see green checkmarks)

### 2.2 Verify Tables Created
Go to **Table Editor** in Supabase and verify these tables exist:
- `hero_sections`
- `dances`
- `events`
- `courses`
- `gallery_items`
- `hotels`
- `team_members`

---

## Step 3: Set Up Storage Buckets

### 3.1 Create Storage Buckets
1. Go to **Storage** in Supabase
2. The buckets should already be created by the SQL script:
   - `hero-images`
   - `gallery-images`
   - `videos`
   - `course-images`
   - `event-images`
   - `hotel-images`

### 3.2 Configure Bucket Policies
Each bucket should be public to allow viewing:
1. Click on each bucket
2. Go to "Policies"
3. Make sure "Public Access" policy is enabled

---

## Step 4: Set Up Authentication

### 4.1 Enable Email Authentication
1. Go to **Authentication** → **Providers**
2. Make sure "Email" is enabled
3. Go to **Email Templates** and customize if needed

### 4.2 Create Admin User
1. Go to **Authentication** → **Users**
2. Click "Add user"
3. Email: admin@angola-rhythms.com (or your email)
4. Password: Create a strong password
5. Save the password somewhere safe

---

## Step 5: Update Your Local Environment

### 5.1 Environment Variables
The `.env.local` file has been created with your credentials. Make sure it contains:

```
VITE_SUPABASE_URL=https://cseifqhxcfbylosowlrp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzZWhmcWh4Y2ZieWxvc293bHJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1NDQ0MzksImV4cCI6MjA5NDEyMDQzOX0.He5zKwpjAVMrOo7o4i8OoE0KxTS-JeOzirqSdxAtQp0
```

---

## Step 6: Install Dependencies

Run in your project terminal:

```bash
npm install
```

This installs the new Supabase dependency along with all others.

---

## Step 7: Set Up Admin Routes

### 7.1 Update App.tsx
Add the admin route to your App.tsx:

```tsx
import AdminPage from './pages/Admin'

// Add to Routes:
<Route path="/admin" element={<Layout><AdminPage /></Layout>} />
```

---

## Step 8: Test the Admin Panel

1. Start your development server:
```bash
npm run dev
```

2. Go to http://localhost:5173/admin

3. Click "Login" and enter:
   - Email: admin@angola-rhythms.com
   - Password: The password you created

4. You should now see the full admin dashboard!

---

## Using the Admin Dashboard

### Hero Section
- Edit the main hero image and text
- Update CTA button text and link

### Dances
- Add new dance types with images and prices
- Edit existing dances
- Delete dances

### Events
- Create events with date, time, location, capacity
- Upload event images
- Set ticket prices
- Edit and delete events

### Courses
- Add courses with difficulty levels
- Set duration and pricing
- Upload course images
- Manage course listings

### Gallery
- Upload images and videos
- Organize gallery content
- Delete items

### Hotels
- Add hotel recommendations
- Set nightly rates
- Add booking links
- Edit hotel information

### Team
- Add team members with bio
- Upload team member images
- Remove team members

---

## Database Backup

### Regular Backups
1. Go to **Settings** → **Backups**
2. Set up automatic backups
3. Download backups before major changes

### Manual Backup
1. Go to **SQL Editor**
2. Run:
```sql
SELECT * FROM dances;
SELECT * FROM events;
SELECT * FROM courses;
-- etc...
```
3. Export results as needed

---

## Troubleshooting

### Issue: Can't login
- Check email and password
- Verify auth is enabled in Supabase
- Check browser console for errors

### Issue: Images not uploading
- Check storage bucket permissions
- Verify bucket is public
- Check file size limits (usually 50MB)

### Issue: Data not showing
- Verify RLS policies are correct
- Check network tab in browser DevTools
- Ensure tables exist in database

### Issue: Slow performance
- Check database indexes
- Limit query results with LIMIT clause
- Use proper pagination

---

## Security Tips

1. **Protect your admin panel:**
   - Use a strong password
   - Enable 2FA on your Supabase account
   - Don't share credentials

2. **Environment variables:**
   - Never commit `.env.local` to git
   - Use `.gitignore` to exclude it
   - Rotate keys periodically

3. **Row Level Security:**
   - All policies are already configured
   - Only authenticated users can modify data
   - Public users can only view

---

## Next Steps

1. **Customize the admin panel** - Add your branding and colors
2. **Create content** - Start adding dances, events, and courses
3. **Deploy to production** - Use Vercel, Netlify, or your preferred host
4. **Monitor usage** - Check Supabase dashboard for usage stats

---

## Support

For issues:
- Supabase Docs: https://supabase.com/docs
- Check browser console for error messages
- Review network requests in DevTools

---

## Database Schema Reference

### hero_sections
```
- id (UUID)
- title (TEXT)
- subtitle (TEXT)
- image_url (TEXT)
- cta_text (TEXT)
- cta_link (TEXT)
- created_at, updated_at
```

### dances
```
- id (UUID)
- name (TEXT)
- description (TEXT)
- image_url (TEXT)
- price (DECIMAL)
- created_at, updated_at
```

### events
```
- id (UUID)
- title (TEXT)
- description (TEXT)
- date (DATE)
- time (TIME)
- location (TEXT)
- image_url (TEXT)
- price (DECIMAL)
- capacity (INTEGER)
- created_at, updated_at
```

### courses
```
- id (UUID)
- title (TEXT)
- description (TEXT)
- image_url (TEXT)
- price (DECIMAL)
- duration_weeks (INTEGER)
- level (TEXT: beginner|intermediate|advanced)
- created_at, updated_at
```

### gallery_items
```
- id (UUID)
- title (TEXT)
- image_url (TEXT)
- video_url (TEXT)
- type (TEXT: image|video)
- created_at, updated_at
```

### hotels
```
- id (UUID)
- name (TEXT)
- description (TEXT)
- address (TEXT)
- price_per_night (DECIMAL)
- image_url (TEXT)
- link (TEXT)
- created_at, updated_at
```

### team_members
```
- id (UUID)
- name (TEXT)
- role (TEXT)
- image_url (TEXT)
- bio (TEXT)
- created_at, updated_at
```

---

**Your Supabase backend is now ready! 🚀**

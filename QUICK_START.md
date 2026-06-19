# Angola Rhythms Live - Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Environment Variables
The `.env.local` file is already configured with your Supabase credentials.

### 3. Create Supabase Tables
1. Go to https://supabase.com and login to your project
2. Go to **SQL Editor**
3. Create a new query
4. Copy all content from `SUPABASE_SCHEMA.sql`
5. Run it

### 4. Create Admin User
1. In Supabase, go to **Authentication** → **Users**
2. Click **Add User**
3. Enter email: `admin@angola-rhythms.com`
4. Set a strong password
5. Save it

### 5. Start Development Server
```bash
npm run dev
```

### 6. Access Admin Panel
- Navigate to: `http://localhost:5173/admin/login`
- Email: `admin@angola-rhythms.com`
- Password: (the one you created)

---

## 📁 New Files Created

### Backend Files
- `src/lib/supabase.ts` - Supabase client configuration
- `src/context/AdminContext.tsx` - Authentication context
- `src/types/content.ts` - TypeScript types for all content
- `src/hooks/useContent.ts` - React Query hooks for all operations
- `src/pages/AdminLogin.tsx` - Login page
- `src/pages/Admin.tsx` - Main admin dashboard

### Admin Editor Components
- `src/pages/admin/AdminHeroEditor.tsx`
- `src/pages/admin/AdminDancesEditor.tsx`
- `src/pages/admin/AdminEventsEditor.tsx`
- `src/pages/admin/AdminCoursesEditor.tsx`
- `src/pages/admin/AdminGalleryEditor.tsx`
- `src/pages/admin/AdminHotelsEditor.tsx`
- `src/pages/admin/AdminTeamEditor.tsx`

### Documentation
- `SUPABASE_SCHEMA.sql` - Database schema
- `SUPABASE_SETUP_GUIDE.md` - Detailed setup guide

### Configuration
- `.env.local` - Environment variables

---

## 🎯 What You Can Do Now

✅ **Edit Hero Section** - Change main image and headline text
✅ **Manage Dances** - Add, edit, delete dance types with pricing
✅ **Create Events** - Add events with dates, times, capacities
✅ **Add Courses** - Create courses with levels and pricing
✅ **Upload Gallery** - Add images and videos
✅ **Recommend Hotels** - Add hotel listings with booking links
✅ **Manage Team** - Add team member profiles

---

## 📋 Admin Panel Features

### 1. **Hero Section Editor**
- Change main title and subtitle
- Update hero background image
- Edit CTA button text and link

### 2. **Dances Management**
- Create new dance types
- Set pricing for each dance
- Upload dance images
- Delete dances

### 3. **Events Management**
- Create events with full details
- Set dates, times, and capacity
- Upload event images
- Manage ticket pricing

### 4. **Courses Management**
- Add dance courses
- Set difficulty level (beginner/intermediate/advanced)
- Set course duration and price
- Upload course images

### 5. **Gallery**
- Upload images (JPG, PNG, etc.)
- Upload videos (YouTube, Vimeo links)
- Organize media content
- Delete items

### 6. **Hotels**
- Add hotel recommendations
- Set nightly rates
- Link to booking websites
- Upload hotel images

### 7. **Team**
- Add team member profiles
- Include bio and role
- Upload profile images
- Remove members

---

## 🔐 Security

- All admin operations require authentication
- Passwords stored securely in Supabase
- Row-Level Security (RLS) enabled
- Public users can only view data, not modify

---

## 🛠 Troubleshooting

### Login Issues
```
- Check email and password
- Verify auth enabled in Supabase dashboard
- Clear browser cache and try again
```

### Image Upload Issues
```
- Check file size (max 50MB usually)
- Verify storage buckets are created
- Ensure buckets are set to public
```

### Data Not Loading
```
- Check database tables exist
- Verify RLS policies are correct
- Check browser console for errors
```

---

## 📝 Environment Variables

Your `.env.local` contains:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

Never commit `.env.local` to git!

---

## 🚀 Deployment

When ready to deploy:

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Vercel**
- Push code to GitHub
- Connect repository to Vercel
- Add environment variables in Vercel
- Deploy

Or use Netlify, Firebase, etc.

---

## 📞 API Reference

### Authentication
```tsx
import { useAdmin } from './context/AdminContext'

const { isAdmin, user, login, logout } = useAdmin()

// Login
await login('email@example.com', 'password')

// Logout
await logout()
```

### Content Management
```tsx
import { useDances, useCreateDance, useUpdateDance, useDeleteDance } from './hooks/useContent'

// Get all dances
const { data: dances } = useDances()

// Create dance
const createDance = useCreateDance()
await createDance.mutateAsync({ name, description, image_url, price })

// Update dance
const updateDance = useUpdateDance()
await updateDance.mutateAsync({ id, name, ... })

// Delete dance
const deleteDance = useDeleteDance()
await deleteDance.mutateAsync(id)
```

---

## 📊 Database Schema

All tables have:
- `id` (UUID) - Unique identifier
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

**Available endpoints:** hero_sections, dances, events, courses, gallery_items, hotels, team_members

---

## ✨ Tips

1. **Bulk Upload** - Use the gallery to upload multiple images at once
2. **Preview** - Check your live site to see changes immediately
3. **Backup** - Regularly backup your database in Supabase
4. **Mobile** - Admin panel works on mobile and tablet devices
5. **Search** - Use browser dev tools to debug issues

---

**You're all set! Start managing your content now! 🎉**

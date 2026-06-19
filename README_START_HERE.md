# 🚀 START HERE - Angola Rhythms Live Admin Backend

## What You Have

I've created a **complete, production-ready admin backend** for your Angola Rhythms Live website with Supabase.

You can now:
- ✅ Edit your hero section (main image and text)
- ✅ Add/edit/delete dances with prices
- ✅ Create events with dates and capacity
- ✅ Add courses with difficulty levels
- ✅ Upload images and videos to gallery
- ✅ Manage hotel recommendations
- ✅ Add team member profiles

---

## 📚 Documentation Quick Links

| Document | Purpose | Read Time |
|----------|---------|-----------|
| **→ QUICK_START.md** | **START HERE** - Get everything running in 5 minutes | 5 min |
| IMPLEMENTATION_SUMMARY.md | Overview of what was built | 5 min |
| SUPABASE_SETUP_GUIDE.md | Detailed step-by-step setup | 15 min |
| ADMIN_BACKEND_README.md | Complete technical documentation | 20 min |
| SQL_REFERENCE.md | Database schema and SQL queries | 15 min |
| PRE_LAUNCH_CHECKLIST.md | Verification before going live | 30 min |
| TROUBLESHOOTING_FAQ.md | Common issues and fixes | As needed |

---

## ⚡ 5-Minute Quick Start

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Supabase Project
1. Go to https://supabase.com
2. Click "Create Project"
3. Fill in project name and password
4. Wait 5-10 minutes for setup

### Step 3: Get Credentials
1. In Supabase, go to Settings → API
2. Copy your **Project URL**
3. Copy your **anon key**
4. Paste both into `.env.local` file (already created)

### Step 4: Setup Database
1. In Supabase, go to SQL Editor
2. Create new query
3. Copy entire contents of `SUPABASE_SCHEMA.sql`
4. Paste into SQL Editor
5. Click Run
6. Wait for completion (green checkmarks)

### Step 5: Create Admin User
1. In Supabase, go to Authentication → Users
2. Click "Add User"
3. Email: `admin@angola-rhythms.com`
4. Password: (create a strong one, save it)
5. Click Save

### Step 6: Start Development
```bash
npm run dev
```

### Step 7: Login to Admin Panel
1. Open http://localhost:5173/admin/login
2. Email: admin@angola-rhythms.com
3. Password: (your password)
4. Click Login

**🎉 You're in! Start managing your content.**

---

## 📂 What Was Created

### Frontend Files (New)
```
src/pages/
├── AdminLogin.tsx              ← Login page
├── Admin.tsx                   ← Main dashboard
└── admin/
    ├── AdminHeroEditor.tsx
    ├── AdminDancesEditor.tsx
    ├── AdminEventsEditor.tsx
    ├── AdminCoursesEditor.tsx
    ├── AdminGalleryEditor.tsx
    ├── AdminHotelsEditor.tsx
    └── AdminTeamEditor.tsx
```

### Backend Files (New)
```
src/lib/
└── supabase.ts                 ← Supabase configuration

src/context/
└── AdminContext.tsx            ← Authentication (upgraded)

src/types/
└── content.ts                  ← TypeScript types

src/hooks/
└── useContent.ts               ← React Query hooks
```

### Configuration & Docs (New)
```
.env.local                       ← Your Supabase credentials
SUPABASE_SCHEMA.sql              ← Database schema (copy to Supabase)
QUICK_START.md                   ← This quick reference
IMPLEMENTATION_SUMMARY.md        ← What was built
SUPABASE_SETUP_GUIDE.md          ← Detailed setup
ADMIN_BACKEND_README.md          ← Full documentation
SQL_REFERENCE.md                 ← SQL guide
PRE_LAUNCH_CHECKLIST.md          ← Launch verification
TROUBLESHOOTING_FAQ.md           ← Common issues
```

---

## 🎯 What Each Section Does

### Hero Section Editor
- Change main page headline
- Update subtitle text
- Upload background image
- Edit call-to-action button

### Dances Manager
- Add dance types (Semba, Kuduro, etc.)
- Set pricing for each dance
- Upload dance images
- Edit or delete dances

### Events Manager
- Create upcoming events
- Set date, time, location
- Add capacity and pricing
- Upload event images

### Courses Manager
- Add dance courses
- Set difficulty level (beginner/intermediate/advanced)
- Set duration in weeks
- Upload course images

### Gallery Manager
- Upload images
- Upload videos (YouTube/Vimeo links)
- Organize media content
- Delete items

### Hotels Manager
- Add hotel recommendations
- Set nightly rates
- Link to booking websites
- Upload hotel photos

### Team Manager
- Add team member profiles
- Include bios and roles
- Upload photos
- Remove team members

---

## 🔐 Security

All admin operations are:
- ✅ Password protected
- ✅ Encrypted (HTTPS)
- ✅ Logged in database
- ✅ Admin-only access
- ✅ Public can view only

---

## 📊 Database

Your Supabase database has:
- 7 tables (hero_sections, dances, events, courses, gallery_items, hotels, team_members)
- 6 storage buckets for images/videos
- Row-level security (RLS) enabled
- Automatic backups

---

## 🛠 Tech Stack

- **Frontend:** React + TypeScript
- **Database:** Supabase (PostgreSQL)
- **File Storage:** Supabase Storage (S3)
- **Authentication:** Supabase Auth
- **State:** React Query (TanStack Query)
- **UI:** Shadcn/ui (already in your project)

---

## 📱 Responsive

Admin panel works on:
- ✅ Desktop (full featured)
- ✅ Tablet (responsive layout)
- ✅ Mobile (touch-friendly)

---

## 🚀 Deployment

When ready to go live:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel/Netlify:**
   - Connect GitHub repository
   - Add environment variables
   - Deploy

3. **Or deploy to your own server**

---

## 💾 Backups

Automatic:
- Supabase backs up daily
- Restore anytime from dashboard

Manual:
- Go to Settings → Backups
- Download backup as needed

---

## 📞 Need Help?

### Immediate Issues
1. Check TROUBLESHOOTING_FAQ.md
2. Check browser console (F12)
3. Check Supabase status page

### Setup Issues
- Follow QUICK_START.md step-by-step
- Follow SUPABASE_SETUP_GUIDE.md

### Advanced Questions
- See ADMIN_BACKEND_README.md
- See SQL_REFERENCE.md
- Visit https://supabase.com/docs

---

## ✅ Verification Checklist

Before using in production, verify:

- [ ] npm install completed
- [ ] Supabase project created
- [ ] .env.local has credentials
- [ ] Database schema loaded (SUPABASE_SCHEMA.sql)
- [ ] Admin user created
- [ ] Can login to admin panel
- [ ] Can create new items (dances, events, etc.)
- [ ] Can upload images
- [ ] Can delete items
- [ ] No console errors
- [ ] Works on mobile

---

## 🎓 Learning Path

1. **Now:** Read QUICK_START.md
2. **Next (5 min):** Follow setup steps
3. **Then (10 min):** Test admin panel features
4. **Then (15 min):** Add sample data
5. **Then (30 min):** Review ADMIN_BACKEND_README.md
6. **Finally:** Deploy to production

---

## 🎉 What's Next

### Today
1. Follow QUICK_START.md
2. Test admin panel
3. Add 1-2 sample items

### This Week
1. Train your team
2. Add all your content
3. Customize colors/branding

### Next Week
1. Deploy to production
2. Monitor performance
3. Gather feedback

---

## 📈 As You Grow

This system can handle:
- Thousands of items
- Millions of visitors
- Large file uploads
- Real-time updates

Scale as your business grows!

---

## 📞 Quick Reference

**Admin Panel URL:** http://localhost:5173/admin/login  
**Admin Email:** admin@angola-rhythms.com  
**Supabase Dashboard:** https://supabase.com  
**Documentation:** See files in project root

---

## 🎯 Today's Action Items

1. [ ] Open QUICK_START.md
2. [ ] Follow all steps (takes ~10 minutes)
3. [ ] Test login works
4. [ ] Create one sample dance/event
5. [ ] Celebrate! 🎉

---

**Ready? Open QUICK_START.md now and start building! 🚀**

---

**Questions?** Check TROUBLESHOOTING_FAQ.md or the relevant documentation file.

**All set!** Your admin backend is ready to manage your Angola Rhythms Live website.

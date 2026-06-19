# Pre-Launch Verification Checklist

Complete this checklist before launching your admin backend to production.

## 🚀 Pre-Deployment Setup

### Environment & Dependencies
- [ ] Run `npm install` successfully
- [ ] No TypeScript errors: `npm run build` completes without errors
- [ ] `.env.local` file exists with Supabase credentials
- [ ] `.env.local` is in `.gitignore` (checked with `git status`)
- [ ] `.env.local` is NOT committed to git

### Supabase Project
- [ ] Supabase project created and initialized
- [ ] Project URL copied to `.env.local`
- [ ] Anon key copied to `.env.local`
- [ ] Project is in desired region

### Database Setup
- [ ] Logged into Supabase dashboard
- [ ] Went to SQL Editor
- [ ] Copied `SUPABASE_SCHEMA.sql` file content
- [ ] Pasted into Supabase SQL Editor
- [ ] Clicked Run and waited for completion
- [ ] All queries completed successfully (green checkmarks)

### Verify Tables Created
In Supabase, check Table Editor shows:
- [ ] `hero_sections` table exists
- [ ] `dances` table exists
- [ ] `events` table exists
- [ ] `courses` table exists
- [ ] `gallery_items` table exists
- [ ] `hotels` table exists
- [ ] `team_members` table exists

### Storage Buckets
In Supabase Storage, verify buckets exist:
- [ ] `hero-images` (public)
- [ ] `gallery-images` (public)
- [ ] `videos` (public)
- [ ] `course-images` (public)
- [ ] `event-images` (public)
- [ ] `hotel-images` (public)

### Authentication
- [ ] Email authentication enabled in Supabase
- [ ] Admin user created (admin@angola-rhythms.com)
- [ ] Admin user password saved securely
- [ ] Test login works with admin credentials

---

## 🧪 Local Testing

### Start Development Server
- [ ] Run `npm run dev`
- [ ] Server starts without errors
- [ ] No console warnings or errors

### Admin Login
- [ ] Navigate to `http://localhost:5173/admin/login`
- [ ] Page loads without errors
- [ ] Login form displays correctly

### Login Test
- [ ] Enter admin email and password
- [ ] Click login button
- [ ] Redirected to admin dashboard
- [ ] No errors in console

### Admin Dashboard
- [ ] Dashboard loads successfully
- [ ] All tabs visible: Hero, Dances, Events, Courses, Gallery, Hotels, Team
- [ ] Admin username displayed
- [ ] Logout button present

### Hero Section Editor
- [ ] Click "Hero" tab
- [ ] Form loads with existing data
- [ ] Can edit title
- [ ] Can edit subtitle
- [ ] Can edit CTA text
- [ ] Can edit CTA link
- [ ] "Save Changes" button works
- [ ] Success toast appears after save

### Dances Management
- [ ] Click "Dances" tab
- [ ] "Add Dance" button present
- [ ] Click "Add Dance"
- [ ] Dialog opens
- [ ] Fill in form and submit
- [ ] New dance appears in list
- [ ] Edit dance button works
- [ ] Delete dance button works with confirmation
- [ ] Deleted dance removed from list

### Events Management
- [ ] Click "Events" tab
- [ ] "Add Event" button present
- [ ] Create new event with all fields
- [ ] Event appears in list
- [ ] Edit and delete work correctly
- [ ] Date and time format correct

### Courses Management
- [ ] Click "Courses" tab
- [ ] Create course with all fields
- [ ] Level dropdown works (beginner/intermediate/advanced)
- [ ] Duration in weeks field works
- [ ] Course appears and can be edited/deleted

### Gallery Management
- [ ] Click "Gallery" tab
- [ ] "Add Item" button present
- [ ] Create image entry
- [ ] Create video entry
- [ ] Items appear in list
- [ ] Can delete items

### Hotels Management
- [ ] Click "Hotels" tab
- [ ] Create hotel with all fields
- [ ] Price format correct (decimal)
- [ ] Link field accepts URL
- [ ] Hotel appears and can be edited/deleted

### Team Management
- [ ] Click "Team" tab
- [ ] Create team member
- [ ] All fields populate correctly
- [ ] Member appears in list
- [ ] Can delete member

### Image Uploads
- [ ] Upload image file (JPG, PNG)
- [ ] File uploads successfully
- [ ] Preview shows in form
- [ ] Save completes successfully
- [ ] Image displays in record

---

## 🔐 Security Verification

### Authentication
- [ ] Can't access admin without login
- [ ] Can't access admin dashboard directly without token
- [ ] Logout clears session properly
- [ ] Login with wrong password fails
- [ ] Only authenticated users can create/edit/delete

### Row Level Security (RLS)
- [ ] RLS policies enabled in database
- [ ] Policies allow authenticated users to modify
- [ ] Policies allow public to read
- [ ] Test with Supabase SQL queries if needed

### Credentials Security
- [ ] `.env.local` not committed to git
- [ ] Supabase key is "anon key" (not "service role")
- [ ] Plan to rotate keys before production
- [ ] Plan to enable 2FA on Supabase account

---

## 📊 Data Verification

### Create Test Data
- [ ] Create 2-3 test dances
- [ ] Create 2-3 test events
- [ ] Create 2-3 test courses
- [ ] Add test gallery items
- [ ] Add test hotels
- [ ] Add test team members

### Verify Data Persistence
- [ ] Refresh page and data still shows
- [ ] Log out and log back in - data still there
- [ ] Data appears in Supabase dashboard

### Verify Data Relationships
- [ ] Dates format correctly
- [ ] Prices show with $ and decimals
- [ ] Images display properly
- [ ] Text truncation works on cards

---

## 🎨 UI/UX Verification

### Responsive Design
- [ ] Test on desktop (1920x1080)
- [ ] Test on tablet (768px width)
- [ ] Test on mobile (375px width)
- [ ] All tabs accessible on mobile
- [ ] Forms are usable on mobile
- [ ] Images scale properly

### Form Validation
- [ ] Required fields can't be empty
- [ ] Email field validates email format
- [ ] Number fields accept only numbers
- [ ] Price fields accept decimals
- [ ] Date fields show date picker

### Error Handling
- [ ] Toast messages appear on success
- [ ] Toast messages appear on errors
- [ ] Form errors display clearly
- [ ] Network errors handled gracefully

### Performance
- [ ] Page loads quickly (< 3 seconds)
- [ ] Images load without delay
- [ ] No console errors
- [ ] No console warnings

---

## 📚 Documentation Verification

- [ ] `QUICK_START.md` is accurate
- [ ] `SUPABASE_SETUP_GUIDE.md` is complete
- [ ] `SQL_REFERENCE.md` is helpful
- [ ] `ADMIN_BACKEND_README.md` covers all features
- [ ] All code has comments where needed

---

## 🚢 Deployment Preparation

### Before Going Live
- [ ] Admin credentials saved securely (password manager)
- [ ] Backup created in Supabase
- [ ] All test data deleted from production database
- [ ] Environment variables configured on hosting platform
- [ ] Build succeeds: `npm run build`
- [ ] No build warnings

### Hosting Platform Setup
- [ ] Project connected to Git repository
- [ ] Environment variables added to hosting platform
- [ ] Deployment preview tested
- [ ] Staging environment matches production

### Post-Deployment
- [ ] Test admin panel on live URL
- [ ] Verify database connections work
- [ ] Check images load from CDN
- [ ] Confirm backups are working
- [ ] Set up monitoring/error tracking

---

## 📝 Post-Launch Tasks

### Week 1
- [ ] Monitor error logs daily
- [ ] Check database usage
- [ ] Get team feedback
- [ ] Document any issues

### Month 1
- [ ] Review usage statistics
- [ ] Plan feature additions
- [ ] Schedule training for admins
- [ ] Document best practices

### Ongoing
- [ ] Regular backups verified
- [ ] Security updates applied
- [ ] Performance monitored
- [ ] Team trained on admin panel

---

## 🆘 Emergency Contacts & Resources

### Supabase Support
- Docs: https://supabase.com/docs
- Status: https://status.supabase.com
- Discord: https://discord.gg/supabase

### React/TypeScript
- React Docs: https://react.dev
- TypeScript: https://www.typescriptlang.org/docs/

### Your Project
- GitHub Issues: [your repo]
- Local dev: `npm run dev`
- Build test: `npm run build`

---

## ✅ Final Checklist

Complete all items above:

- [ ] All Environment setup complete
- [ ] All Database setup complete
- [ ] All Local testing complete
- [ ] All Security verification complete
- [ ] All Data verification complete
- [ ] All UI/UX verification complete
- [ ] All Documentation complete
- [ ] Ready for deployment

---

## 🎉 Launch Readiness

If all checkboxes are checked, you're ready to:

1. Deploy to production
2. Announce admin panel to your team
3. Start managing your content
4. Monitor performance

**Congratulations! Your admin backend is ready! 🚀**

---

## 📞 Troubleshooting Reference

If something breaks, check:

1. **Can't login?**
   - Verify admin user exists in Supabase
   - Check .env.local has correct credentials
   - Clear browser cache

2. **Data not showing?**
   - Verify tables exist in Supabase
   - Check RLS policies
   - Review browser console errors

3. **Images not uploading?**
   - Check storage bucket exists and is public
   - Verify file size < 50MB
   - Check browser console for errors

4. **Build errors?**
   - Run `npm install` again
   - Check for TypeScript errors
   - Review error messages carefully

5. **Performance issues?**
   - Check database query times
   - Verify indexes are created
   - Monitor network requests

---

Keep this checklist for future reference and updates!

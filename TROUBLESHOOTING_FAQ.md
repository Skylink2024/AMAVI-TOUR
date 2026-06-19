# Admin Backend - Troubleshooting & FAQ

## 🆘 Troubleshooting Guide

### Problem: TypeScript Errors During Development

**Error Message:**
```
Type 'string | null' is not assignable to type 'string'
```

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild TypeScript
npm run build

# Clear Vite cache
rm -rf .vite
npm run dev
```

---

### Problem: "Cannot find module '@supabase/supabase-js'"

**Error Message:**
```
Module not found: Can't resolve '@supabase/supabase-js'
```

**Solution:**
```bash
# Install Supabase package
npm install @supabase/supabase-js

# Verify installation
npm list @supabase/supabase-js
```

---

### Problem: .env.local Variables Not Loading

**Error Message:**
```
VITE_SUPABASE_URL is undefined
```

**Solution:**
1. Verify `.env.local` file exists in project root (not in src/)
2. Check file contains:
   ```
   VITE_SUPABASE_URL=https://...
   VITE_SUPABASE_ANON_KEY=...
   ```
3. Restart dev server: `npm run dev`
4. Verify in browser console: `import.meta.env.VITE_SUPABASE_URL`

---

### Problem: Can't Login to Admin Panel

**Symptom:** Login button does nothing or shows error

**Solution:**

1. **Check Supabase Authentication Enabled:**
   - Supabase Dashboard → Authentication → Providers
   - Email should be enabled

2. **Verify Admin User Exists:**
   - Supabase → Authentication → Users
   - Should see admin@angola-rhythms.com

3. **Check Credentials:**
   - Email: admin@angola-rhythms.com
   - Password: Exactly as you created it (case-sensitive)

4. **Check Browser Console:**
   - Press F12
   - Look for error messages
   - Take screenshot and troubleshoot

5. **Clear Cache:**
   ```bash
   # In browser: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
   # Select "Cookies and cached images and files"
   # Clear data
   # Refresh page
   ```

6. **Reset Admin User:**
   - Delete the user in Supabase
   - Create new user with same email
   - Try login again

---

### Problem: Database Tables Don't Exist

**Symptom:** Error saying table doesn't exist

**Solution:**

1. **Verify Tables Exist:**
   - Supabase → Table Editor
   - Should see: hero_sections, dances, events, courses, gallery_items, hotels, team_members

2. **If Tables Missing:**
   - Go to SQL Editor
   - Create new query
   - Copy ALL content from `SUPABASE_SCHEMA.sql`
   - Paste into SQL Editor
   - Click Run
   - Wait for completion (green checkmarks)

3. **If Some Queries Failed:**
   - Delete any partially created tables
   - Clear SQL editor
   - Run schema script again from scratch

4. **Verify Table Structure:**
   ```sql
   -- Check if table exists
   SELECT EXISTS (
     SELECT FROM information_schema.tables 
     WHERE table_name = 'dances'
   );
   ```

---

### Problem: Images Won't Upload

**Symptom:** Upload button does nothing or shows error

**Solution:**

1. **Check Storage Buckets Exist:**
   - Supabase → Storage
   - Should see 6 buckets (hero-images, gallery-images, etc.)

2. **If Buckets Missing:**
   - Run `SUPABASE_SCHEMA.sql` again
   - The script creates buckets automatically

3. **Make Buckets Public:**
   - For each bucket, click it
   - Go to Policies tab
   - Enable "Public Access" policy

4. **Check File Size:**
   - Max file size: 50MB typically
   - Resize large images before uploading
   - Use tools like ImageOptim (Mac) or TinyPNG online

5. **Browser Console Check:**
   - Press F12 → Console tab
   - Look for errors during upload
   - Screenshot error for troubleshooting

6. **Try Different Browser:**
   - Safari, Chrome, Firefox may behave differently
   - Try another browser to isolate issue

---

### Problem: Data Doesn't Save After Creating Item

**Symptom:** Item appears briefly then disappears

**Solution:**

1. **Check Supabase Connection:**
   - Console: `import.meta.env.VITE_SUPABASE_URL`
   - Should show your Supabase URL

2. **Check RLS Policies:**
   - Supabase → SQL Editor
   - Run:
     ```sql
     SELECT * FROM dances LIMIT 1;
     ```
   - Should show data if policies correct

3. **Check Authentication:**
   - Verify you're logged in
   - Check token in localStorage:
     - F12 → Application → localStorage
     - Look for Supabase token

4. **Check Network Requests:**
   - F12 → Network tab
   - Try creating item
   - Look for failed requests (red)
   - Check response for error message

5. **React Query Issue:**
   - Component may not be re-fetching data
   - Try refreshing page (F5)
   - Should see data if it was saved

---

### Problem: Slow Performance / Lag

**Symptom:** Admin panel takes long to load or respond

**Solution:**

1. **Check Internet Connection:**
   - Open speedtest.net
   - Should have at least 5Mbps

2. **Check Supabase Status:**
   - Visit https://status.supabase.com
   - Should show all systems operational

3. **Reduce Data:**
   - Delete old test data
   - Delete unused gallery items
   - Archive old events

4. **Check Browser:**
   - Close unused tabs
   - Restart browser
   - Try incognito mode

5. **Check Device:**
   - Close background apps
   - Restart computer
   - Check disk space (need at least 1GB free)

6. **Check Database:**
   - Supabase → Logs
   - Look for slow queries
   - May need database optimization

---

### Problem: "Unauthorized" or "403" Errors

**Symptom:** Getting permission denied errors

**Solution:**

1. **Verify Authentication:**
   - Make sure you're logged in
   - Check token is valid
   - Try logging out and back in

2. **Check RLS Policies:**
   - Supabase → Tables → Select table
   - Go to RLS tab
   - Policies should allow authenticated users

3. **Re-run Schema:**
   ```sql
   -- Policies may be misconfigured
   -- Run SUPABASE_SCHEMA.sql again
   -- This resets all policies
   ```

4. **Check API Key:**
   - Ensure using "anon key" (not "service_role")
   - Verify key in `.env.local` is correct
   - Copy from Supabase dashboard again

---

### Problem: TypeScript/Build Errors with New Code

**Solution:**
```bash
# 1. Check for syntax errors
npm run lint

# 2. Build and see full errors
npm run build

# 3. Fix each error listed

# 4. Type check specifically
npx tsc --noEmit

# 5. Clear cache and rebuild
rm -rf dist .vite
npm run build
```

---

### Problem: Admin Routes Not Working

**Symptom:** /admin/login or /admin/dashboard shows blank page

**Solution:**

1. **Check Routes Added:**
   - Edit `src/App.tsx`
   - Verify these lines exist:
     ```tsx
     import AdminLoginPage from './pages/AdminLogin'
     import AdminPage from './pages/Admin'
     
     <Route path="/admin/login" element={<AdminLoginPage />} />
     <Route path="/admin/dashboard" element={<AdminPage />} />
     ```

2. **Verify Files Exist:**
   - Check `src/pages/AdminLogin.tsx` exists
   - Check `src/pages/Admin.tsx` exists
   - Check admin subfolder exists with all editors

3. **Restart Dev Server:**
   ```bash
   # Stop server (Ctrl+C)
   # Clear cache
   rm -rf .vite
   # Restart
   npm run dev
   ```

---

## ❓ Frequently Asked Questions

### Q: How do I change the admin password?

**A:** In Supabase:
1. Go to Authentication → Users
2. Find admin user
3. Click the user
4. Scroll down
5. Click "Reset password"
6. Email sent with reset link
7. Follow link to set new password

---

### Q: Can multiple people be admins?

**A:** Yes! In Supabase → Authentication → Users, click "Add User" to create more admin accounts. All will have equal access.

---

### Q: How do I backup my data?

**A:** Two ways:

**Option 1: Automatic**
- Supabase does daily automatic backups
- Go to Settings → Backups → Download

**Option 2: Manual Export**
- Supabase → SQL Editor → Run SELECT queries
- Export results to CSV

---

### Q: Can I move to a different hosting provider?

**A:** Yes! Since you're using Supabase (third-party), your database is portable:
1. Export data from Supabase
2. Create new Supabase project elsewhere (or use different provider)
3. Import data
4. Update `.env.local` with new credentials

---

### Q: What if I forget the admin password?

**A:** 
1. Go to Supabase → Authentication → Users
2. Click on admin user
3. Scroll down and click "Reset password"
4. Email sent with reset link
5. Check email and set new password

---

### Q: How do I delete old content?

**A:** In admin panel:
- Click the section (Dances, Events, etc.)
- Find the item
- Click "Delete" button
- Confirm deletion

Data is permanently deleted from Supabase.

---

### Q: Can I edit the admin panel UI?

**A:** Yes! The code is fully customizable:
- Edit components in `src/pages/admin/`
- Update colors in Tailwind CSS
- Add new fields as needed
- Rebuild with `npm run build`

---

### Q: What happens if the internet goes down?

**A:** 
- Admin panel won't work (needs internet to connect to Supabase)
- Your live website will work if using static hosting
- Supabase handles this on their end

---

### Q: How much does this cost?

**A:** Supabase pricing:
- **Free tier:** Up to 500k API requests/month, 1GB storage
- **Pro tier:** Starts at $25/month
- Most small-to-medium sites fit in free tier

---

### Q: Can I sync data to my other tools?

**A:** Yes! Supabase provides:
- REST API (make HTTP requests)
- GraphQL API
- Webhooks (trigger actions on data changes)
- See: https://supabase.com/docs

---

### Q: How do I prevent accidental data deletion?

**A:** 
1. Take backups regularly
2. Enable "soft delete" (mark as deleted instead)
3. Add confirmation dialogs (already done!)
4. Limit admin accounts to trusted people

---

### Q: What if I need to change the database schema?

**A:** Only if you need to add new fields:

1. **Add new column:**
   ```sql
   ALTER TABLE dances ADD COLUMN new_field TEXT;
   ```

2. **Edit form in React:**
   - Update component to include new field
   - Add to form submission

3. **Test thoroughly before production**

---

### Q: How do I monitor who changed what?

**A:** 
1. Use Supabase Audit Logs
2. Supabase → Project Settings → Database Logs
3. See all SQL queries and who ran them

Or add tracking:
- Store user ID with each record
- Add "modified_by" field to tables

---

### Q: Can I add payment processing?

**A:** Yes! Popular options:
- **Stripe** - Credit/debit cards
- **PayPal** - PayPal accounts
- See React/Node.js documentation for integration

---

### Q: What if I need help with custom features?

**A:** Resources:
1. **Supabase Docs:** https://supabase.com/docs
2. **React Docs:** https://react.dev
3. **Stack Overflow:** Ask questions
4. **Hire Developer:** Use Upwork, Fiverr, etc.

---

## 🔧 Advanced Troubleshooting

### Check Database Logs
```sql
-- In Supabase SQL Editor
SELECT * FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

### Check Auth Logs
```
Supabase → Auth → Logs tab
See all login attempts and errors
```

### Monitor Storage
```
Supabase → Storage → Usage
Check how much space used
```

### View API Activity
```
Supabase → Logs → API
See all requests and responses
```

---

## 📞 When to Contact Support

Contact Supabase support if:
- Database is down (check status.supabase.com first)
- Can't access admin dashboard
- Automatic backups failing
- Strange database errors

Contact your developer/support if:
- React components not working
- Form validation issues
- UI looks broken
- Custom feature problems

---

## 💡 Prevention Tips

1. **Backup Regularly**
   - Download backup weekly
   - Store in secure location

2. **Update Dependencies**
   ```bash
   npm update
   npm audit fix
   ```

3. **Test Changes**
   - Always test locally first
   - Use staging environment if available

4. **Monitor Usage**
   - Check Supabase dashboard weekly
   - Watch for unusual activity

5. **Document Changes**
   - Note any customizations made
   - Keep admin documentation

---

## 🚨 Emergency Recovery

If you completely break the database:

1. **Download Latest Backup:**
   - Supabase → Backups
   - Download most recent

2. **Create New Database:**
   - Create new Supabase project

3. **Run Schema Again:**
   - Copy SUPABASE_SCHEMA.sql to new project

4. **Import Data:**
   - Use backup export
   - Import into new tables

5. **Test Everything:**
   - Verify all features work

---

**Still stuck? Check the main documentation files or contact Supabase support!**

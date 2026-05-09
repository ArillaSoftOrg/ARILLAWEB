# Vercel Production Database Setup Guide

## Context

**Production URL:** https://arillasoft.com

**Current Status:**
- ✅ Marketing site live (/, /randevual, /admin/login return 200)
- ✅ www.arillasoft.com redirects to apex domain
- ❌ POST /api/appointment returns 404 HTML error page
- ✅ Local build includes /api/appointment and works correctly
- ✅ Custom domain (arillasoft.com) properly configured in Vercel

**Blocking Issue:**
The appointment API endpoint fails in production because `DATABASE_URL` is not configured in Vercel environment variables. Without this, Prisma cannot connect to a PostgreSQL database, and the route handler never executes.

**Why /api/appointment fails:**
1. Vercel needs a hosted PostgreSQL connection string (DATABASE_URL)
2. Prisma migrations must be applied to the production database
3. Only then will POST requests to /api/appointment work

---

## Step-by-Step Setup Checklist

### ☐ Step 1: Verify Vercel Deployment is Current

Confirm that Vercel is running the latest code from main branch.

1. Go to https://vercel.com/dashboard
2. Select project: **arillaweb**
3. Click **Deployments** tab
4. Verify the latest deployment shows:
   - Source: `main` branch
   - Status: `Ready` ✓
   - Timestamp: Recent (within last hour or so)
5. If not latest, manually trigger redeploy:
   - Click **Redeploy** next to latest commit
   - Wait for build to complete

**Why this matters:** We need to ensure the code with /api/appointment is deployed before setting up the database.

---

### ☐ Step 2: Choose a Hosted PostgreSQL Provider

Select one of these PostgreSQL hosting options. All are compatible with Vercel.

| Provider | Cost | Setup Time | Notes |
|---|---|---|---|
| **Vercel Postgres** | ~$15/month starter | 2 min | Native Vercel integration, simplest setup |
| **Neon** | Free tier available, ~$15/month paid | 3 min | Serverless PostgreSQL, excellent free tier |
| **Supabase** | Free tier + ~$25/month | 5 min | PostgreSQL + auth + storage, overkill but good |
| **Railway** | ~$5-15/month | 5 min | Simple, developer-friendly |
| **AWS RDS** | ~$15-50/month | 10 min | Industry standard, more complex |

**Recommendation for this project:**
- **If you want zero hassle:** → Use **Vercel Postgres** (native integration)
- **If you want free tier first:** → Use **Neon** (free + paid upgrade path)
- **If you already have credits:** → Use **AWS RDS** (via existing account)

**For this guide, we'll use Neon as an example (easy + free option).**

---

### ☐ Step 3: Create Production PostgreSQL Database

#### Option A: Using Neon (Recommended for simplicity)

1. Go to https://console.neon.tech
2. Sign up or log in
3. Click **New Project**
4. Configure:
   - **Name:** `arillasoft-prod` (or similar)
   - **Database name:** `arillaweb`
   - **Region:** Select closest to Vercel region (US East, EU)
5. Click **Create Project**
6. Wait for database to initialize (30 seconds)
7. Go to **Connection Strings**
8. Copy the **Postgres** connection string (starts with `postgresql://`)
   - Example format: `postgresql://user:password@host/dbname?sslmode=require`

**Save this connection string — you'll need it in Step 5.**

#### Option B: Using Vercel Postgres

1. Go to https://vercel.com/dashboard
2. Select project: **arillaweb**
3. Go to **Settings** → **Storage**
4. Click **Create Database** → **Postgres**
5. Fill in:
   - **Database name:** `arillaweb`
6. Click **Create**
7. Once created, click **Show Secret** next to `.env.local`
8. Copy the value shown (full connection string)

#### Option C: Using Supabase

1. Go to https://supabase.com
2. Sign up or log in
3. Click **New Project**
4. Configure:
   - **Name:** `arillasoft`
   - **Database password:** Generate strong password
   - **Region:** Closest to Vercel
5. Click **Create new project** and wait (~1 minute)
6. Go to **Settings** → **Database**
7. Under **Connection Pooling**, copy the **Connection string**
   - Must use pooled connection (set Mode to `Transaction`)

**Save the connection string before moving to Step 4.**

---

### ☐ Step 4: Verify Connection String Format

Before adding to Vercel, verify your connection string is correct.

**Valid PostgreSQL connection string format:**
```
postgresql://username:password@hostname:5432/databasename?sslmode=require
```

**Check:**
- [ ] Starts with `postgresql://` (not `postgres://`)
- [ ] Contains `username` and `password`
- [ ] Contains `hostname` (database server address)
- [ ] Contains `/databasename` (database name)
- [ ] Ends with `?sslmode=require` or similar SSL config

**If your provider gave you a short string, it likely needs SSL mode added:**
```bash
# Example: If provider gives:
postgresql://user:pass@host/db

# Convert to:
postgresql://user:pass@host/db?sslmode=require
```

**Do NOT test the connection locally yet.** We'll verify after adding to Vercel.

---

### ☐ Step 5: Add DATABASE_URL to Vercel Environment Variables

1. Go to https://vercel.com/dashboard
2. Select project: **arillaweb**
3. Click **Settings** → **Environment Variables**
4. Click **Add New**
5. Fill in:
   - **Name:** `DATABASE_URL`
   - **Value:** Paste your connection string from Step 3
   - **Environments:** Check `Production`, `Preview`, `Development`
6. Click **Add**
7. Verify it appears in the list (will show masked as `postgresql://***`)

**Do NOT click Save Project Settings yet — continue to Step 6.**

---

### ☐ Step 6: Add/Verify Admin Auth Environment Variables

These credentials are already in your local `.env` file. Verify they're set in Vercel.

1. In Vercel **Environment Variables**, add or verify:

   **Variable 1: ADMIN_EMAIL**
   - Name: `ADMIN_EMAIL`
   - Value: Copy from your local `.env` file (ADMIN_EMAIL=...)
   - Environments: Production, Preview, Development

   **Variable 2: ADMIN_PASSWORD_HASH**
   - Name: `ADMIN_PASSWORD_HASH`
   - Value: Copy from your local `.env` file (ADMIN_PASSWORD_HASH=...)
   - Environments: Production, Preview, Development

   **Variable 3: ADMIN_AUTH_SECRET**
   - Name: `ADMIN_AUTH_SECRET`
   - Value: Copy from your local `.env` file (ADMIN_AUTH_SECRET=...)
   - Environments: Production, Preview, Development

2. Verify all three variables appear in the list

**⚠️ SECURITY NOTE:** These credentials are in your local `.env`. If you're collaborating:
- Use different credentials for production
- Rotate these secrets if they've been exposed
- Never commit `.env` to git (verify with `git status`)

---

### ☐ Step 7: Add/Verify Cloudinary Environment Variables

The appointment API doesn't use Cloudinary, but verify these are set for the marketing site images.

1. In Vercel **Environment Variables**, verify or add:

   **Variable 1: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME**
   - Name: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - Value: Copy from your local `.env` file (NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...)
   - Environments: Production, Preview, Development
   - Note: This is PUBLIC (next to variable name)

   **Variable 2: NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET**
   - Name: `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
   - Value: Copy from your local `.env` file (NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=...)
   - Environments: Production, Preview, Development
   - Note: This is PUBLIC

2. Verify both appear in the list

**Note:** `NEXT_PUBLIC_*` variables are intentionally public and safe to expose.

---

### ☐ Step 8: Review All Environment Variables Before Saving

Before proceeding, verify Vercel shows all required variables (values masked):

```
✓ DATABASE_URL                              postgresql://***
✓ ADMIN_EMAIL                               *** (from .env)
✓ ADMIN_PASSWORD_HASH                       *** (from .env)
✓ ADMIN_AUTH_SECRET                         *** (from .env)
✓ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME         *** (from .env)
✓ NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET      *** (from .env)
```

**If all are present, click anywhere outside the form to auto-save, or manually save the page.**

**Note:** Vercel auto-saves environment variables, but deployment doesn't use them until the next build.

---

### ☐ Step 9: Run Prisma Migration on Production Database

This creates the `AppointmentRequest` table (and others) in the production database.

**IMPORTANT: Do this from your local machine, NOT from Vercel CLI.**

1. Open terminal/PowerShell in the project directory:
   ```bash
   cd C:\Users\Yusuf\Desktop\anasayfa\ArillaSoft\ARILLAWEB
   ```

2. Verify your local DATABASE_URL is NOT pointing to production:
   ```bash
   cat .env | grep DATABASE_URL
   ```
   - Should show: `postgresql://postgres:123456789@127.0.0.1:5432/arillaweb` (localhost)
   - If it shows a remote host, restore the local version before proceeding

3. Set the production DATABASE_URL temporarily:
   ```bash
   # Linux/Mac:
   export DATABASE_URL="<paste-your-neon-or-supabase-connection-string-here>"
   
   # PowerShell (Windows):
   $env:DATABASE_URL="<paste-your-connection-string-here>"
   ```

4. Run the migration:
   ```bash
   npx prisma migrate deploy
   ```

5. Expected output:
   ```
   Environment variables loaded from .env
   Prisma schema loaded from prisma/schema.prisma
   
   ✔ Migrations to apply:
   migration_lock.toml
   20260426054436_init
   20260508221251_add_appointment_request
   
   ✔ Applied 2 migrations
   ```

6. If successful, restore your local .env:
   ```bash
   # Just confirm .env still has localhost database
   cat .env | grep DATABASE_URL
   # Should show: postgresql://postgres:123456789@127.0.0.1:5432/arillaweb
   ```

**If migration fails:**
- Check connection string has no typos
- Verify DATABASE_URL includes SSL mode: `?sslmode=require`
- Verify your PostgreSQL provider allows connections from your IP
- Check firewall/VPN isn't blocking the connection

---

### ☐ Step 10: Redeploy Vercel

Now that environment variables are set, redeploy the application.

1. Go to https://vercel.com/dashboard
2. Select project: **arillaweb**
3. Click **Deployments** tab
4. Click **Redeploy** next to the latest commit
5. Wait for build to complete
   - You should see **Ready ✓** within 1-2 minutes
6. Once ready, click on the deployment to view **Logs**
7. Verify in logs:
   - `prisma generate` succeeded
   - `next build` succeeded with zero TypeScript errors
   - No database connection errors

**If build fails:**
- Check Logs for specific error
- Common issues:
  - DATABASE_URL typo or missing SSL mode
  - Prisma client generation failed (syntax error in schema)
  - Missing environment variable

---

### ☐ Step 11: Retest /api/appointment with Valid POST

Test the production appointment API on https://arillasoft.com.

```bash
# PowerShell:
$body = @{
    service = "Kuaför"
    date = "2026-05-25"
    time = "15:00"
    name = "Test User"
    contact = "test@arillasoft.com"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://arillasoft.com/api/appointment" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body `
  -StatusCodeVariable status

Write-Host "Status: $status"
```

Or using curl:
```bash
curl -X POST https://arillasoft.com/api/appointment \
  -H "Content-Type: application/json" \
  -d '{
    "service": "Kuaför",
    "date": "2026-05-25",
    "time": "15:00",
    "name": "Test User",
    "contact": "test@arillasoft.com"
  }'
```

**Expected response:**
```json
{"ok":true}
```

**Expected HTTP status: 200**

✅ **If you see `{"ok":true}` → Appointment API is working!**

❌ **If you still see 404 error page:**
- Wait 5 minutes (Vercel cache may need to clear)
- Do a hard refresh in browser (Ctrl+Shift+R)
- Check Vercel Logs again for errors
- Verify DATABASE_URL is actually set in Vercel (not masked)

---

### ☐ Step 12: Retest /api/appointment with Invalid POST

Verify validation is working.

```bash
curl -X POST https://arillasoft.com/api/appointment \
  -H "Content-Type: application/json" \
  -d '{"name": "Test"}'
```

**Expected response:**
```json
{
  "error": {
    "formErrors": [],
    "fieldErrors": {
      "service": ["Required"],
      "date": ["Required"],
      "time": ["Required"],
      "contact": ["Required"]
    }
  }
}
```

**Expected HTTP status: 400**

✅ **If you see validation errors → API validation is working!**

---

### ☐ Step 13: Retest Frontend Pages

Verify that the appointment form and other pages still work on production.

#### Test 1: Appointment Form Page
```
URL: https://arillasoft.com/randevual
Expected: Form page loads with calendar and time picker
Status: 200 OK
```

Try filling out and submitting the form:
- Select a date (in future)
- Select a time
- Enter name
- Enter email or phone
- Click submit
- Should see "Randevu talep ediliyor..." or success message

#### Test 2: Admin Appointments Dashboard
```
URL: https://arillasoft.com/admin/appointments
Expected: Redirects to /admin/login (because not authenticated)
Status: 307 Redirect (first visit)
```

Then:
1. Go to https://arillasoft.com/admin/login
2. Log in with credentials:
   - Email: `arillasoft@gmail.com`
   - Password: (the plain-text password you're using locally)
3. Navigate to `/admin/appointments`
4. Should see list of appointment requests (including test from Step 11)
5. Try:
   - Mark one as read
   - Delete one
   - Verify operations work

#### Test 3: Marketing Pages Still Work
```
https://arillasoft.com/                         → 200 (homepage)
https://arillasoft.com/hizmetler                → 200 (services)
https://arillasoft.com/sektorel-yazilimlar     → 200 (solutions)
https://arillasoft.com/kurumsal/blog            → 200 (blog)
https://www.arillasoft.com/                     → 308 → arillasoft.com (redirect)
```

✅ **If all pages load without errors → Production is ready!**

---

## Verification Checklist

After completing all 13 steps, you should have:

- [ ] DATABASE_URL set in Vercel (pointing to hosted PostgreSQL)
- [ ] ADMIN_EMAIL, ADMIN_PASSWORD_HASH, ADMIN_AUTH_SECRET in Vercel
- [ ] Cloudinary variables in Vercel
- [ ] Prisma migrations applied to production database
- [ ] Vercel redeployed successfully
- [ ] POST /api/appointment (valid) returns `{"ok":true}` with status 200
- [ ] POST /api/appointment (invalid) returns validation errors with status 400
- [ ] Appointments appear in admin dashboard (/admin/appointments)
- [ ] Appointment form page loads (/randevual)
- [ ] Marketing pages load without errors
- [ ] www.arillasoft.com redirects to arillasoft.com

**If all are checked, production appointment flow is ready.**

---

## Security Notes

### .env File
- ✅ `.env` is in `.gitignore` — never commit it
- ✅ `.env.example` contains only placeholders (`"..."`)
- ✅ Verify with `git status` before committing

### Secret Rotation
If any credentials have been exposed:
- Generate new ADMIN_PASSWORD_HASH in local `.env`
- Generate new ADMIN_AUTH_SECRET (random 32+ char string, base64 encoded)
- Update Vercel environment variables
- Redeploy

### Database Access
- Only DATABASE_URL is needed in Vercel (not stored locally as secret)
- Database credentials are embedded in DATABASE_URL connection string
- If compromised, rotate database user password immediately in PostgreSQL provider

### Backup
- Hosted PostgreSQL providers (Neon, Supabase, Railway) provide automatic backups
- For production, enable daily backups in your provider's dashboard
- Test backup restoration periodically

---

## Troubleshooting

### Issue: `npx prisma migrate deploy` fails with "connection refused"

**Solution:**
- Verify DATABASE_URL is correct (copy/paste from provider again)
- Check if your ISP/VPN blocks PostgreSQL port 5432
- Try connecting with `psql` command if available:
  ```bash
  psql "postgresql://user:pass@host/db"
  ```

### Issue: Vercel shows 404 for /api/appointment after redeploy

**Solution:**
- Check Vercel Logs (Deployments → click latest → Logs)
- Look for `DATABASE_URL` errors
- Wait 5 minutes and try again (edge cache)
- Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)

### Issue: Appointment form submits but nothing happens

**Solution:**
- Open browser DevTools (F12)
- Go to Network tab
- Try submitting form again
- Check POST request to /api/appointment
- Look at response (should be JSON `{"ok":true}`)

### Issue: Can't log into /admin/login

**Solution:**
- Verify ADMIN_EMAIL and ADMIN_PASSWORD_HASH are in Vercel
- Password must match the hash in ADMIN_PASSWORD_HASH
- Clear browser cookies (might have old session)
- Try incognito window

### Issue: Prisma migrate deploy says "no migrations to apply"

**Solution (this is normal):**
- Migrations already applied to that database
- Check that AppointmentRequest table exists:
  ```bash
  export DATABASE_URL="<your-prod-db-url>"
  npx prisma db push --skip-generate
  ```

---

## Next Steps (After Production is Ready)

1. **Email Notifications (Future):** When appointment requests are received, send confirmation email to customer and notification to admin
2. **SMS Notifications (Future):** Send appointment confirmations via SMS
3. **Appointment Status Tracking:** Allow customers to view/update their appointment status
4. **Dashboard Business Flow:** Add full business product management and multi-tenant support

---

## Reference Files

- `prisma/schema.prisma` — Database schema (includes AppointmentRequest model)
- `src/app/api/appointment/route.ts` — Appointment API handler
- `src/lib/validations/appointment.ts` — Appointment form validation
- `.env.example` — Template for environment variables
- `TESTING_STRATEGY.md` — Full regression checklist for testing

---

**Document Status:** Ready for production setup
**Last Updated:** 2026-05-09
**Vercel Project:** arillaweb (prj_YuQwcPP09FlGi4Ap3JLOl5m3t6tM)
**Production Domain:** https://arillasoft.com

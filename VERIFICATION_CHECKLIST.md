# Manual Verification Checklist

## Phase 1: Database & Build Verification

### Step 1: Verify Docker Container
```powershell
docker ps
```
**Expected output:**
```
CONTAINER ID   IMAGE         COMMAND                  CREATED        STATUS        PORTS                    NAMES
<id>           postgres:16   "docker-entrypoint.s…"   <time>         Up <time>     0.0.0.0:5432->5432/tcp  arilla-postgres
```
✅ **Success:** Container is running with status `Up`
❌ **Failure:** No container or status is `Exited` → Run `docker start arilla-postgres`

---

### Step 2: Verify PostgreSQL Connection
```powershell
pg_isready -h localhost -p 5432 -U postgres
```
**Expected output:**
```
localhost:5432 - accepting connections
```
✅ **Success:** Exit code 0, message says "accepting connections"
❌ **Failure:** Exit code 2, "no response" → Wait 30 seconds and retry, or check `docker logs arilla-postgres`

---

### Step 3: Navigate to Project
```powershell
cd C:\Users\Yusuf\Desktop\anasayfa\ArillaSoft\ARILLAWEB
```

---

### Step 4: Generate Prisma Client
```powershell
npx prisma generate
```
**Expected output:**
```
✔ Generated Prisma Client (v6.19.3) to .\node_modules\@prisma\client in XXXms
```
✅ **Success:** No errors, client generated
❌ **Failure:** Error messages → Check schema.prisma syntax

---

### Step 5: Build the App
```powershell
npm run build
```
**Expected output:**
```
✓ Compiled successfully in XXs
  Running TypeScript ...
  Finished TypeScript in XXs ...
  Collecting page data using 1 worker ...
  Generating static pages using 1 worker (XX/XX) ...
✓ Generating static pages using 1 worker (XX/XX) in XXs
  Finalizing page optimization ...

Route (app)
├ ○ /admin/appointments
├ ○ /admin/login
├ ƒ /api/appointment
├ ○ /randevual
...
```
✅ **Success:** Zero TypeScript errors, routes include `/admin/appointments`, `/api/appointment`, `/randevual`
❌ **Failure:** Build fails or TS errors remain → Check TypeScript output carefully

---

### Step 6: Start Dev Server
```powershell
npm run dev
```
**Expected output:**
```
  ▲ Next.js 16.2.3
  - Local:        http://localhost:3000
  
  Ready in XXXms
```
✅ **Success:** Server ready, listening on port 3000
❌ **Failure:** Port already in use → Kill process on port 3000 or use different port

---

## Phase 2: Browser Testing

### Step 7: Test `/randevual` Form Submission

1. **Open browser:** `http://localhost:3000/randevual`

2. **Fill form with:**
   - **Hizmet (Service):** "Web Geliştirme"
   - **Tarih (Date):** Pick a future date (e.g., May 15, 2026)
   - **Saat (Time):** Pick a time (e.g., 14:00)
   - **İsim (Name):** "Test User"
   - **İletişim (Contact):** "test@example.com"
   - **Mesaj (Message):** "This is a test appointment"

3. **Click "Ön Görüşme Planla" button**

**Expected result:**
```
✅ "Randevu Talebiniz Alındı!" success message appears
✅ Form auto-resets after 3 seconds
✅ Browser console shows no errors
```

**Check Network tab in DevTools:**
```
POST http://localhost:3000/api/appointment
Status: 200
Response: { ok: true }
```

❌ **Failure scenarios:**
- 400 error → Validation failed (check date/time format in network response)
- 500 error → Database connection error (verify PostgreSQL is running)
- Form doesn't submit → JavaScript error in console

---

### Step 8: Test Admin Login

1. **Open browser:** `http://localhost:3000/admin/login`

2. **Enter credentials:**
   - **Email:** your admin account email
   - **Password:** your admin password (never commit real credentials)

3. **Click "Giriş Yap"**

**Expected result:**
```
✅ Redirects to http://localhost:3000/admin (dashboard)
✅ No error message
```

**Verify JWT Cookie (DevTools):**
1. Press `F12` → **Application** tab → **Cookies** → `localhost:3000`
2. Find `admin-auth` cookie

**Expected cookie value:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyaWxsYXNvZnRAZ21haWwuY29tIiwiaWF0IjoxNzE0OTU4MDAwLCJleHAiOjE3MTQ5OTAwMDB9.xxxxxx...
(Long base64-encoded JWT string)
```

✅ **Success:** Cookie contains JWT token (NOT the string `true`)
❌ **Failure:** Cookie is `true` → Old auth logic is still active

**Test JWT Verification (Spoofing Prevention):**
1. **Right-click** `admin-auth` cookie → **Edit**
2. **Change value** to: `true`
3. **Save**
4. **Refresh page** (`F5`)

**Expected result:**
```
✅ Redirected to http://localhost:3000/admin/login
✅ Invalid/expired cookie is rejected by middleware
```

❌ **Failure:** Page loads admin panel with forged cookie → JWT verification not working

---

### Step 9: Test `/admin/appointments` Page

1. **Open browser:** `http://localhost:3000/admin/appointments`

**Expected initial state:**
```
✅ Page loads
✅ Shows "Randevu Talepleri" header
✅ Shows the test appointment from Step 7:
   - Name: "Test User"
   - Contact: "test@example.com"
   - Service: "Web Geliştirme"
   - Appointment Date: "15 Mayıs 2026 14:00"
   - Status: Unread (blue icon, "1 okunmamış" badge)
```

**Test Mark as Read:**
1. Click the **calendar icon** on the appointment row
2. **Expected:** Icon changes to checkmark, row becomes less prominent, unread count decreases

**Test Delete:**
1. Click the **trash icon** on the appointment row
2. **Confirm** in the modal
3. **Expected:** Row disappears, page refreshes, count updates

---

## Phase 3: Database Verification (Prisma Studio)

### Step 10: Verify Appointment Record in Database

1. **In PowerShell (while dev server is running), open new terminal:**
```powershell
cd C:\Users\Yusuf\Desktop\anasayfa\ArillaSoft\ARILLAWEB
npx prisma studio
```

2. **Browser opens to:** `http://localhost:5555`

3. **Navigate to:** "AppointmentRequest" table (left sidebar)

**Expected result:**
```
✅ Table shows one record:
   - id: <auto-generated cuid>
   - service: "Web Geliştirme"
   - date: "2026-05-15"
   - time: "14:00"
   - name: "Test User"
   - contact: "test@example.com"
   - message: "This is a test appointment"
   - isRead: false (or true if you tested mark-as-read)
   - createdAt: <current timestamp>
```

✅ **Success:** Record is there with correct data
❌ **Failure:** Table empty or no AppointmentRequest model → Migration didn't complete

---

## Summary of Expected Outcomes

| Step | Status | What to Check |
|------|--------|---------------|
| 1. Docker | ✅ | Container running with name `arilla-postgres` |
| 2. PostgreSQL | ✅ | `pg_isready` returns "accepting connections" |
| 3. Prisma Generate | ✅ | Client generated without errors |
| 4. Build | ✅ | Zero TS errors, routes include `/admin/appointments`, `/api/appointment` |
| 5. Dev Server | ✅ | Server ready on port 3000 |
| 6. `/randevual` submit | ✅ | Success message, 200 response, form resets |
| 7. Admin login | ✅ | Redirects to `/admin`, JWT cookie set (NOT `true`) |
| 8. JWT spoofing | ✅ | Forged `admin-auth=true` is rejected, redirects to login |
| 9. `/admin/appointments` | ✅ | Lists submitted appointment, mark-as-read/delete work |
| 10. Prisma Studio | ✅ | AppointmentRequest table shows record with correct data |

---

## Troubleshooting

### "Can't reach database server at localhost:5432"
- Check: `docker ps` — container running?
- Check: `pg_isready` — PostgreSQL responding?
- Check: `docker logs arilla-postgres` — initialization errors?
- Solution: Restart container: `docker restart arilla-postgres`

### Port 3000 already in use
```powershell
# Find process on port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID)
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

### Build fails with TypeScript errors
- Check: Files modified unintentionally?
- Check: `.env` file has correct DATABASE_URL?
- Solution: Run `npx prisma generate` again

### AppointmentRequest table doesn't exist
- Check: Did `npx prisma migrate dev --name add_appointment_request` complete?
- Check: `docker logs arilla-postgres` for migration errors
- Solution: Re-run migration: `npx prisma migrate dev --name add_appointment_request`

---

## What NOT to Do

❌ Do not implement email notifications yet (Phase 4 only)
❌ Do not modify unrelated files
❌ Do not commit real secrets (`.env` is gitignored)
❌ Do not manually edit `.env` — use generated hashes/secrets

---

## Next Steps After Verification

Once all steps pass:
1. ✅ Phases 1-3 are complete and tested
2. 📋 Phase 4: Email notifications (Resend integration) — confirm when ready
3. 🚀 Ready for deployment or further development

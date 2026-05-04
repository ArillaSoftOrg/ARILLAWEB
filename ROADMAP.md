# Implementation Roadmap — Arilla Soft SaaS Platform

Each phase has a clearly defined scope and a gate condition.
**Do not begin a phase until the previous phase gate is confirmed passed.**

---

## Phase 0 — Documentation (Current)

**Status:** In progress
**Goal:** Establish the full project specification in documentation before any code is written.

### Deliverables
- `CLAUDE.md` — agent instruction file with terminology and constraints
- `PRODUCT_SPEC.md` — product vision and multi-tenancy model
- `ROADMAP.md` — this file
- `ARCHITECTURE.md` — technical stack and route group design
- `DATABASE_MODEL.md` — existing and planned data models
- `PERMISSIONS_MODEL.md` — role-based access control specification
- `MODULES.md` — product/module catalog and public URL architecture
- `TESTING_STRATEGY.md` — regression checklist and safety rules

### Constraints
- No application code changes
- No dashboard routes created
- No auth implementation
- No middleware edits
- No Prisma schema edits
- No migrations
- No API routes
- No UI components

### Gate Condition
All 8 documentation files created, reviewed, and confirmed by project owner.

---

## Phase 1 — Dashboard Foundation

**Goal:** Create the `(dashboard)` route group with a static layout skeleton.
No authentication, no database queries — layout and navigation structure only.

### Deliverables
- `src/app/(dashboard)/layout.tsx` — dashboard shell (sidebar + topbar placeholder)
- `src/app/(dashboard)/dashboard/page.tsx` — placeholder dashboard home page
- `src/components/dashboard/DashboardSidebar.tsx` — sidebar skeleton with nav links
- `src/components/dashboard/DashboardTopbar.tsx` — topbar skeleton

### Constraints
- Do NOT modify `src/app/(public)/` or `src/app/admin/`
- Do NOT modify `src/middleware.ts`
- Do NOT connect to database
- Do NOT implement auth
- No new Prisma models yet

### Gate Condition
`npm run build` passes. Marketing site and `/admin` regression checklist pass.
`/dashboard` renders a static placeholder page.

---

## Phase 2 — Business Authentication

**Goal:** Implement customer-facing authentication fully separate from admin auth.

### Deliverables
- `src/lib/dashboard-auth.ts` — NextAuth config for Business accounts (separate from admin)
- `src/app/(dashboard)/login/page.tsx` — customer login page
- `src/app/(dashboard)/register/page.tsx` — customer registration page
- Middleware extension: protect `/dashboard/*` routes, redirect to `/dashboard/login`
- Session token for BusinessMember (separate from admin-auth cookie)

### Constraints
- Do NOT modify existing admin auth logic in `src/lib/auth.ts`
- Do NOT share session tokens between admin and customer auth
- Admin login (`/admin/login`) must still work independently

### Gate Condition
Unauthenticated `/dashboard` redirects to `/dashboard/login`.
`/admin/login` still works independently. Build passes. Regression checklist passes.

---

## Phase 3 — Business & BusinessMember Models

**Goal:** Add core multi-tenancy data models to the Prisma schema.

### Deliverables
- New Prisma models: `Business`, `BusinessMember`
- `Role` enum: `business_owner`, `manager`, `staff`
- Business onboarding flow: registration creates a Business and assigns creator as `business_owner`
- `src/app/(dashboard)/onboarding/page.tsx` — onboarding wizard
- Server actions for Business creation and member invitation

### Constraints
- Add only new models — do not modify existing models
- Run `db:migrate dev` on local only — never `db:push` to production
- All new queries use the shared `src/lib/prisma.ts` singleton

### Gate Condition
Migrations apply cleanly. `npx prisma studio` shows new models.
Build passes. Full regression checklist passes.

---

## Phase 4 — Product & BusinessProduct Access Model

**Goal:** Implement the product catalog and per-business product activation.

### Deliverables
- New Prisma models: `Product`, `BusinessProduct`
- Seed data: QR Menu and Randevu products in the `Product` table
- Dashboard home updated: shows activated products for the current Business
- `src/components/dashboard/ProductCard.tsx` — product tile component
- Dynamic product routing: `(dashboard)/[productSlug]/page.tsx`
- Access guard: BusinessProduct existence check before rendering product pages

### Gate Condition
A Business with an activated Product sees it on the dashboard.
A Business without an activated Product cannot access its route.
Build passes. Regression checklist passes.

---

## Phase 5 — QR Menu Module

**Goal:** Full QR Menu product implementation.

### Deliverables
- Dashboard: `(dashboard)/qr-menu/` — category and item management
- Public page: `src/app/m/[businessSlug]/page.tsx` — unauthenticated menu display
- Prisma models: `QrMenuCategory`, `QrMenuItem`
- API routes: `/api/dashboard/qr-menu/` — CRUD for categories and items
- QR code generation (linking to `/m/[businessSlug]`)
- Server actions for menu management

### Gate Condition
A business_owner can create categories and items.
Public menu at `/m/[businessSlug]` renders without login.
Marketing page at `/sektorel-yazilimlar/qr-menu` still renders unchanged.
Build passes. Regression checklist passes.

---

## Phase 6 — Randevu Module

**Goal:** Full appointment system product implementation.

### Deliverables
- Dashboard: `(dashboard)/randevu/` — service, staff, and appointment management
- Public page: `src/app/b/[businessSlug]/page.tsx` — unauthenticated booking page
- Prisma models: `RandevuService`, `RandevuClient`, `RandevuAppointment`, `RandevuAvailability`
- API routes: `/api/dashboard/randevu/` — CRUD for appointments and services
- Booking flow: client selects service, date, time → appointment created
- Notification hooks (email or SMS — TBD)

### Gate Condition
A client can book an appointment at `/b/[businessSlug]` without logging in.
Business dashboard shows the appointment in the calendar.
Marketing pages at `/sektorel-yazilimlar/randevu-sistemi/...` still render unchanged.
Build passes. Regression checklist passes.

---

## Phase 7 — Internal Admin Expansion (Optional)

**Goal:** Extend the existing `/admin` CMS to allow Arilla Soft staff to manage Businesses
and their Product subscriptions from the internal panel.

### Deliverables
- `/admin/businesses` — list and manage all registered Businesses
- `/admin/businesses/[id]` — view Business details and activate/deactivate Products
- `/admin/products` — manage the Product catalog

### Constraints
- Extend existing admin layout — do not restructure it
- Add nav items to sidebar — do not remove existing items
- All new admin pages use existing admin auth (AdminUser, not BusinessMember)

### Gate Condition
Arilla Soft staff can view and manage Businesses from `/admin`.
All existing admin pages still function.
Build passes. Full regression checklist passes.

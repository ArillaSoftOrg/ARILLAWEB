# Testing Strategy — Arilla Soft SaaS Platform

## Core Principle

The marketing website and internal admin CMS are live and in use.
**Any change to this codebase — no matter how isolated — must not break them.**

Every phase gate requires the regression checklist to pass in full.

---

## Regression Checklist

Run this checklist manually after every change, before considering any phase complete.

### Marketing Website
- [ ] `/` — Homepage renders (hero, services section, blog preview, CTA)
- [ ] `/hizmetler` — Services listing page renders
- [ ] `/hizmetler/[any-slug]` — Individual service detail page renders
- [ ] `/kurumsal/blog` — Blog listing page renders
- [ ] `/kurumsal/blog/[any-slug]` — Blog detail page renders
- [ ] `/kurumsal/iletisim` — Contact page renders, form is visible
- [ ] `/kurumsal/hakkimizda` — About page renders
- [ ] `/sektorel-yazilimlar/qr-menu` — QR Menu marketing page renders
- [ ] `/sektorel-yazilimlar/randevu-sistemi` — Randevu marketing page renders
- [ ] `/teklif-al` — Quote request page renders, form is visible
- [ ] Navbar renders on all public pages with correct links
- [ ] Footer renders on all public pages

### Internal Admin CMS
- [ ] `/admin` — Unauthenticated request redirects to `/admin/login`
- [ ] `/admin/login` — Login page renders
- [ ] `/admin/login` — Login with valid credentials succeeds and redirects to `/admin`
- [ ] `/admin` — Dashboard page loads with stats after login
- [ ] `/admin/blog` — Blog management page renders
- [ ] `/admin/services` — Services management page renders
- [ ] `/admin/projects` — Projects management page renders
- [ ] `/admin/contact` — Contact messages page renders
- [ ] `/admin/settings` — Site settings page renders

### Build Verification
- [ ] `npm run build` — completes with zero TypeScript errors
- [ ] `npm run build` — no missing module errors
- [ ] `npm run lint` — no new ESLint errors introduced

---

## Phase Gate Protocol

Before beginning any new phase:

1. Run the full regression checklist — all items must pass
2. Run `npm run build` — must succeed with zero errors
3. Confirm with the project owner that the previous phase is complete

If any regression checklist item fails after a change:
- Do not proceed to the next phase
- Identify the root cause
- Revert or fix before continuing

---

## Database Safety Rules

### Migrations
- Always use `npx prisma migrate dev --name <descriptive-name>` on local development
- Never use `npx prisma db push` — it skips migration history and is unsafe for production
- Never run migrations against the production database without explicit instruction from the project owner
- Test migrations with `npx prisma studio` to verify tables and relations after each migration
- After a migration, run `npm run build` to verify the generated Prisma client has no type errors

### Schema Rules
- Only add new models and fields — never rename or remove existing ones
- Existing production data must not be affected by new migrations
- If a field needs to change type or be removed, discuss with the project owner first

### Seed Data
- Seed scripts live in `prisma/seed.ts`
- Running `npm run db:seed` must be idempotent (safe to run multiple times)
- New seed data (e.g., Product records) should use upsert to avoid duplicate errors

---

## Middleware Safety Rules

`src/middleware.ts` is a critical file. Errors in this file can lock all users out of the application.

When modifying middleware:
1. Only extend the `matcher` array — never remove existing matchers
2. Never replace the existing `admin-auth` cookie check
3. After any middleware change, manually verify:
   - [ ] Unauthenticated `/admin/blog` redirects to `/admin/login`
   - [ ] Authenticated admin session can access `/admin/blog`
   - [ ] Unauthenticated `/dashboard` redirects to `/dashboard/login` (Phase 2+)
   - [ ] Public pages (`/`, `/hizmetler`, `/m/[slug]`, `/b/[slug]`) are NOT intercepted by middleware

---

## Authentication Isolation Rules

The admin auth system and customer auth system must remain fully separate.

- [ ] Logging into `/admin/login` does NOT grant access to `/dashboard`
- [ ] Logging into `/dashboard/login` does NOT grant access to `/admin`
- [ ] Session cookies for admin and customer have different names
- [ ] Clearing one session does not affect the other

These must be manually verified whenever auth code is changed.

---

## Cross-Business Data Isolation Rules

When dashboard server actions and API routes are implemented (Phase 3+):

- [ ] All database queries in dashboard routes are scoped to the current `businessId`
- [ ] A `BusinessMember` of Business A cannot read data belonging to Business B
- [ ] The `businessId` used in queries comes from the server-side session — never from a URL parameter or request body without server-side verification

---

## Public Page Safety Rules

When public pages (`/m/[businessSlug]`, `/b/[businessSlug]`) are implemented (Phase 5+):

- [ ] Pages render without any authentication
- [ ] Pages return 404 if the `businessSlug` does not exist
- [ ] Pages return 404 if the relevant `BusinessProduct` is inactive
- [ ] Pages do not expose any BusinessMember credentials or internal dashboard data
- [ ] Pages are included in `src/app/sitemap.ts` if SEO is desired (confirm with project owner)

---

## File Safety Rules

Before modifying any file, check if it appears in this list:

| File | Why It's Risky |
|---|---|
| `src/middleware.ts` | Controls auth for all protected routes |
| `src/app/layout.tsx` | Affects every route — SEO metadata, rendering |
| `src/app/(public)/layout.tsx` | Wraps all marketing pages |
| `prisma/schema.prisma` | Schema changes require migrations |
| `src/lib/constants/index.ts` | Navbar breaks if existing exports are removed |
| `next.config.ts` | Cloudinary images break if remotePatterns are removed |
| `src/lib/prisma.ts` | Shared singleton — re-instantiation causes connection pool issues |
| `.env` | Never commit to git |

If you need to modify one of these files, state the change explicitly and confirm before proceeding.

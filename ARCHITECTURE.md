# Technical Architecture — Arilla Soft SaaS Platform

## Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js App Router | 16.2.3 |
| Runtime | React | 19.2.4 |
| Language | TypeScript | 5 |
| Styling | Tailwind CSS (PostCSS plugin) | 4 |
| ORM | Prisma | 6.5.0 |
| Database | PostgreSQL | — |
| Auth | NextAuth | 5.0.0-beta.25 |
| Image CDN | Cloudinary | — |
| Forms | React Hook Form + Zod | 7.54.2 / 3.24.1 |
| Icons | Lucide React | 0.469.0 |
| Animations | Framer Motion | 11.18.2 |
| UI Primitives | Radix UI (via Shadcn) | — |

> **Warning:** Next.js 16.2.3 includes breaking API changes from prior versions.
> Read `node_modules/next/dist/docs/` before writing any Next.js-specific code.
> Tailwind v4 has no `tailwind.config.ts` — configuration is in `postcss.config.mjs`.

---

## Route Group Architecture

The codebase uses Next.js route groups to isolate four distinct areas.
Each area has its own layout, auth model, and visual design. They must never be merged.

```
src/app/
├── (public)/               ← Marketing website
│   ├── layout.tsx          ← Navbar + Footer wrapper
│   ├── page.tsx            ← Homepage
│   ├── hizmetler/
│   ├── kurumsal/
│   ├── sektorel-yazilimlar/
│   └── teklif-al/
│
├── admin/                  ← Internal Arilla Soft CMS  [EXISTS]
│   ├── layout.tsx          ← Dark sidebar layout
│   ├── login/
│   ├── blog/
│   ├── services/
│   ├── projects/
│   ├── contact/
│   └── settings/
│
├── (dashboard)/            ← Customer Business dashboard  [FUTURE - Phase 1+]
│   ├── layout.tsx          ← Dashboard shell (sidebar + topbar)
│   ├── login/
│   ├── register/
│   ├── onboarding/
│   ├── dashboard/
│   └── [productSlug]/
│
├── m/                      ← Public QR menu pages  [FUTURE - Phase 5+]
│   └── [businessSlug]/
│       └── page.tsx        ← Unauthenticated, mobile-optimized menu
│
├── b/                      ← Public booking pages  [FUTURE - Phase 6+]
│   └── [businessSlug]/
│       └── page.tsx        ← Unauthenticated appointment booking
│
├── api/
│   ├── blog/               ← Existing
│   ├── contact/            ← Existing
│   ├── services/           ← Existing
│   ├── settings/           ← Existing
│   └── dashboard/          ← Future dashboard API routes
│
├── layout.tsx              ← Root layout (SEO metadata, lang="tr")
├── robots.ts               ← SEO
└── sitemap.ts              ← SEO
```

---

## Authentication Architecture

Two completely separate authentication systems coexist in this project.

### System 1 — Internal Admin Auth (Existing)
- **Who:** Arilla Soft staff only
- **Entry point:** `/admin/login`
- **Mechanism:** NextAuth v5 Credentials provider → sets `admin-auth` cookie
- **Protection:** `src/middleware.ts` checks `admin-auth` cookie for `/admin/*` routes
- **Roles:** `SUPER_ADMIN`, `ADMIN`, `EDITOR` (on `AdminUser` Prisma model)
- **Files:** `src/lib/auth.ts`, `src/middleware.ts`
- **Must not be modified without extreme caution**

### System 2 — Customer Business Auth (Future — Phase 2)
- **Who:** Business owners and members
- **Entry point:** `/dashboard/login`
- **Mechanism:** Separate NextAuth config → separate session token
- **Protection:** Middleware extended to cover `/dashboard/*` routes
- **Roles:** `business_owner`, `manager`, `staff` (on `BusinessMember` Prisma model)
- **Files (future):** `src/lib/dashboard-auth.ts`
- **Must never share tokens or sessions with admin auth**

### Rule
The `admin-auth` cookie and the customer session token must remain fully separate.
Unauthenticated `/admin` → redirect to `/admin/login`.
Unauthenticated `/dashboard` → redirect to `/dashboard/login`.
These redirects must never cross.

---

## Component Layer Architecture

```
src/components/
├── ui/                 ← Shadcn/Radix UI primitives (accordion, button, card, dialog, etc.)
│                         Shared across all areas. Modify with caution.
│
├── layout/             ← Navbar.tsx, Footer.tsx (marketing website only)
│
├── sections/           ← Page section components (marketing website only)
│                         ProductHero, FeatureGrid, HowItWorks, FAQSection, etc.
│
├── forms/              ← ContactForm, QuoteForm (marketing website only)
│
├── seo/                ← JSON-LD structured data components (marketing website only)
│
├── admin/              ← Admin CMS components (CloudinaryUpload, AdminLogoutButton)
│
└── dashboard/          ← [FUTURE] Customer dashboard components
                          DashboardSidebar, DashboardTopbar, ProductCard, StatsWidget
```

---

## Library Layer Architecture

```
src/lib/
├── prisma.ts               ← Singleton Prisma client — shared across all areas
├── auth.ts                 ← Admin auth config (NextAuth — do not modify for customer auth)
├── utils.ts                ← cn(), slugify(), formatDate(), truncate()
├── constants/
│   └── index.ts            ← SITE_NAME, SITE_URL, NAV_LINKS, labels — do not remove exports
├── validations/            ← Zod schemas for forms
│   ├── contact.ts
│   ├── quote.ts
│   └── teklif-al.ts
├── *-actions.ts            ← Server actions (blog, contact, project, service, settings)
├── *-db.ts                 ← Database query utilities
│
├── dashboard-auth.ts       ← [FUTURE Phase 2] Customer Business auth config
└── modules/                ← [FUTURE Phase 4+] Per-product server actions
    ├── qr-menu/
    └── randevu/
```

---

## Critical Files — Do Not Break

These files are load-bearing. Modifying them incorrectly can break production.

| File | Risk | Rule |
|---|---|---|
| `src/middleware.ts` | Breaks admin auth | Only extend matcher — never replace existing cookie check |
| `src/app/layout.tsx` | Breaks all routes (SEO, rendering) | Only add wrappers — never remove metadata logic |
| `src/app/(public)/layout.tsx` | Breaks all marketing pages | Do not touch |
| `prisma/schema.prisma` | Destructive if migrated wrong | Add only — never rename or remove existing fields |
| `src/lib/constants/index.ts` | Breaks Navbar | Never remove existing exports |
| `next.config.ts` | Breaks Cloudinary images | Never remove existing `remotePatterns` entries |
| `.env` | App will not start without DATABASE_URL | Never commit to git |
| `src/lib/prisma.ts` | Shared singleton — affects all DB queries | Do not re-instantiate |

---

## Environment Variables

| Variable | Used For |
|---|---|
| `DATABASE_URL` | PostgreSQL connection (Prisma) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary image uploads |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary upload preset |

Future variables (Phase 2+):
| Variable | Used For |
|---|---|
| `NEXTAUTH_SECRET` | NextAuth session signing |
| `NEXTAUTH_URL` | NextAuth callback base URL |

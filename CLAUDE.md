@AGENTS.md

# Arilla Soft — Agent Instructions

This file defines the rules, terminology, and constraints for all agents working on this codebase.
Read this file in full before writing any code.

---

## Project Documentation Index

| File | Purpose |
|---|---|
| `PRODUCT_SPEC.md` | Product vision, SaaS model, business goals |
| `ARCHITECTURE.md` | Technical stack, route groups, auth layers, critical files |
| `DATABASE_MODEL.md` | Existing and planned Prisma models |
| `PERMISSIONS_MODEL.md` | Role-based access control for dashboard and internal CMS |
| `MODULES.md` | Product/module catalog, public URL patterns, dashboard structure |
| `ROADMAP.md` | Phased implementation plan with constraints per phase |
| `TESTING_STRATEGY.md` | Regression checklist, build gates, database safety rules |

---

## Canonical Terminology

Use these terms consistently. Do not substitute synonyms.

| Term | Definition |
|---|---|
| `Business` | A customer organization registered on the platform |
| `BusinessMember` | A user who belongs to a Business, assigned a Role |
| `Product` | A module/feature available on the platform (e.g., QR Menu, Randevu) |
| `BusinessProduct` | The activation record linking a Business to a Product it has access to |
| `Role` | The permission level of a BusinessMember within their Business |

Do **not** use: Tenant, TenantUser, Module, TenantModule, Subscription (unless explicitly instructed).

---

## Route Group Separation

This project has four distinct route areas. They must never be confused or merged.

| Route | Area | Description |
|---|---|---|
| `src/app/(public)/` | Marketing website | Public-facing company website. Navbar + Footer. No auth. |
| `src/app/admin/` | Internal CMS | Arilla Soft staff dashboard. Cookie-based auth. Separate from customer auth. |
| `src/app/(dashboard)/` | Customer dashboard | Business owner/member dashboard. Business auth. To be built in Phase 1+. |
| `src/app/b/[businessSlug]/` | Public booking | Unauthenticated appointment booking page per business. |
| `src/app/m/[businessSlug]/` | Public QR menu | Unauthenticated digital menu page per business. |

---

## Role Separation

### Customer Dashboard Roles (BusinessMember)
Used in `(dashboard)/` routes. Defined per Business.

- `business_owner` — Full access including billing and member management
- `manager` — Full product access, manage staff, no billing
- `staff` — Operational access only (appointments, orders, etc.)

### Internal CMS Roles (AdminUser)
Used in `admin/` routes. Entirely separate from customer roles.

- `SUPER_ADMIN` — Full platform access
- `ADMIN` — Content and configuration access
- `EDITOR` — Content only

These two role systems must never be merged or confused.

---

## Inviolable Constraints

These rules apply at all times regardless of the current phase:

1. **Never modify** `src/app/(public)/` — existing marketing pages must always render
2. **Never modify** `src/app/admin/` structure — existing CMS must always function
3. **Never break** `src/middleware.ts` — admin auth protection must remain intact
4. **Never modify** `prisma/schema.prisma` without a migration plan reviewed first
5. **Never run** `db:push` — always use `db:migrate dev` on local, never on production
6. **Never remove** existing exports from `src/lib/constants/index.ts` — Navbar depends on them
7. **Never remove** existing `remotePatterns` from `next.config.ts` — Cloudinary images depend on them
8. **Run `npm run build`** and confirm zero TypeScript errors before considering any phase complete
9. **Run the regression checklist** from `TESTING_STRATEGY.md` after every change

---

## Next.js Version Warning

This project uses **Next.js 16.2.3**. This version includes breaking changes from prior versions.
APIs, file conventions, and routing behavior may differ from training data.
Read `node_modules/next/dist/docs/` before writing any Next.js-specific code.

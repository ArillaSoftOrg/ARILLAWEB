# Product Specification — Arilla Soft SaaS Platform

## Overview

Arilla Soft is building a modular SaaS platform for small and medium businesses (SMBs).
The platform enables businesses to subscribe to digital products (modules) and manage them
through a unified customer dashboard.

The existing corporate website (`arillasoft.com`) serves as the marketing layer.
The SaaS platform is a separate operational layer built within the same codebase.

---

## Three Distinct Areas

### 1. Marketing Website — `/`
The existing Arilla Soft corporate website. Serves as the public-facing product and company
presentation layer.

- Routes live under `src/app/(public)/`
- No authentication required
- Includes: homepage, services, blog, about, contact, sector-specific product landing pages
- Must be preserved exactly as-is

### 2. Internal Admin CMS — `/admin`
The existing Arilla Soft staff dashboard. Used by Arilla Soft employees to manage website
content, view contact submissions, and configure site settings.

- Routes live under `src/app/admin/`
- Protected by cookie-based auth (`admin-auth` cookie) + NextAuth
- Roles: `SUPER_ADMIN`, `ADMIN`, `EDITOR`
- Must be preserved exactly as-is
- **This is NOT the customer dashboard.**

### 3. Customer Dashboard — `/dashboard` *(to be built)*
The SaaS customer-facing dashboard. Used by Business owners and their team members to manage
their subscribed Products.

- Routes will live under `src/app/(dashboard)/`
- Protected by Business-level authentication (separate from admin auth)
- Roles per Business: `business_owner`, `manager`, `staff`
- Each Business can access only their own data and their activated Products

---

## Multi-Tenancy Model

Each customer organization is called a **Business**.

- A `Business` has a unique `slug` used in public-facing URLs
- A `Business` can have multiple `BusinessMember` records (users)
- Each `BusinessMember` has a `Role` within that Business
- A `Business` activates Products via `BusinessProduct` records
- A `BusinessProduct` represents the activation of one Product for one Business

---

## Products

Products are the individual modules a Business can subscribe to.

### QR Menu
A digital menu system for restaurants, cafes, and food businesses.

- Business manages their menu via `(dashboard)/qr-menu/`
- Customers access the public menu at `/m/[businessSlug]` — no login required
- Accessible from any device via QR code scan

### Randevu (Appointment System)
An appointment booking system for salons, clinics, beauty centers, and similar businesses.

- Business manages appointments and availability via `(dashboard)/randevu/`
- Customers book appointments at `/b/[businessSlug]` — no login required
- Supports service types, staff availability, and time slots

### Future Products
Additional products may be added. Each follows the same pattern:
- Dashboard area under `(dashboard)/[productSlug]/`
- Public URL if applicable (per product architecture)
- Activation via `BusinessProduct`

---

## Public URL Conventions

| URL Pattern | Purpose | Auth Required |
|---|---|---|
| `/m/[businessSlug]` | Public QR menu for a Business | No |
| `/b/[businessSlug]` | Public booking page for a Business | No |
| `/dashboard` | Customer dashboard home | Yes (Business auth) |
| `/admin` | Internal Arilla Soft CMS | Yes (AdminUser auth) |

---

## What This Platform Is Not

- Not a white-label builder — businesses get a standardized interface
- Not a marketplace — Arilla Soft controls which Products exist
- Not multi-region — single deployment, Turkish market primary focus
- The `/admin` route is not the customer dashboard — it is Arilla Soft's internal tool

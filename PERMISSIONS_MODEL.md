# Permissions Model — Arilla Soft SaaS Platform

This project has two entirely separate permission systems.
They must never be merged, confused, or share session tokens.

---

## System 1 — Internal Admin CMS Roles

Used in: `src/app/admin/`
Stored on: `AdminUser.role` (`AdminRole` enum)
Authentication: Cookie-based (`admin-auth`) + NextAuth Credentials provider
Entry point: `/admin/login`

These roles are for Arilla Soft employees managing the corporate website and platform.

| Role | Access Level |
|---|---|
| `SUPER_ADMIN` | Full platform access. Can manage all content, settings, users, and future tenant data. |
| `ADMIN` | Content and configuration access. Cannot manage other admin users. |
| `EDITOR` | Content only (blog, services, projects). No configuration or settings access. |

### Internal Admin Permission Matrix

| Action | SUPER_ADMIN | ADMIN | EDITOR |
|---|---|---|---|
| Manage blog posts | Yes | Yes | Yes |
| Manage services | Yes | Yes | Yes |
| Manage projects | Yes | Yes | Yes |
| View contact messages | Yes | Yes | No |
| Edit site settings | Yes | Yes | No |
| Manage admin users | Yes | No | No |
| Manage Businesses (Phase 7+) | Yes | Yes | No |
| Manage Products/subscriptions (Phase 7+) | Yes | Yes | No |

---

## System 2 — Customer Dashboard Roles (BusinessRole)

Used in: `src/app/(dashboard)/`
Stored on: `BusinessMember.role` (`BusinessRole` enum)
Authentication: Separate NextAuth config (`src/lib/dashboard-auth.ts` — Phase 2)
Entry point: `/dashboard/login`

These roles are scoped **per Business**. A user can be a `manager` in Business A
and a `staff` member in Business B (if multiple memberships are supported in future).

### Role Definitions

#### `business_owner`
The primary account owner. Automatically assigned to the person who registered the Business.

- Full access to all activated Products within their Business
- Can invite and remove BusinessMembers
- Can change member roles
- Can manage billing and plan (Phase 7+)
- Can deactivate or delete the Business account
- Cannot access other Businesses' data

#### `manager`
A trusted team lead or operations manager.

- Full access to all activated Products within their Business
- Can invite `staff` members (cannot invite `manager` or higher)
- Cannot access billing or delete the Business
- Cannot remove the `business_owner`

#### `staff`
A frontline team member (e.g., receptionist, waiter, technician).

- Operational access to activated Products (create/update appointments, orders, etc.)
- Cannot access Product settings or configuration
- Cannot manage BusinessMembers
- Read-only access to analytics and reports

### Customer Dashboard Permission Matrix

| Action | business_owner | manager | staff |
|---|---|---|---|
| View dashboard home | Yes | Yes | Yes |
| View activated Products | Yes | Yes | Yes |
| Use Product features (create/edit records) | Yes | Yes | Yes |
| Configure Product settings | Yes | Yes | No |
| Generate/share public links | Yes | Yes | No |
| View analytics/reports | Yes | Yes | Read-only |
| Invite staff members | Yes | Yes | No |
| Invite managers | Yes | No | No |
| Remove members | Yes | No | No |
| Change member roles | Yes | No | No |
| Manage billing (Phase 7+) | Yes | No | No |
| Delete Business account | Yes | No | No |

---

## Public Access (No Auth)

Certain pages are publicly accessible with no authentication of any kind.
These are served per Business based on their `slug`.

| URL | Who can access | What they see |
|---|---|---|
| `/m/[businessSlug]` | Anyone (unauthenticated) | QR Menu for that Business |
| `/b/[businessSlug]` | Anyone (unauthenticated) | Appointment booking page for that Business |

Public pages:
- Do not require login
- Do not expose dashboard data
- Only display data the Business has configured to be public (menu items, available slots)
- Must be mobile-optimized (accessed via QR scan or shared link)
- A Business must have the relevant `BusinessProduct` active for their public page to be accessible

---

## Access Control Rules

### Dashboard Route Guards
- Any route under `/dashboard/*` requires a valid `BusinessMember` session
- Unauthenticated requests redirect to `/dashboard/login`
- After login, users are redirected to `/dashboard` (their Business home)
- Role checks are enforced at the server action and API level — not only in UI

### Product Route Guards
- Routes under `/dashboard/[productSlug]/` require:
  1. Valid `BusinessMember` session
  2. A `BusinessProduct` record linking the current Business to that Product with `active: true`
- If the BusinessProduct does not exist → redirect to dashboard home with appropriate message

### Admin Route Guards
- Any route under `/admin/*` requires a valid `admin-auth` cookie
- Unauthenticated requests redirect to `/admin/login`
- Admin session and customer session are fully independent — having one does not grant the other

### Cross-Business Data Isolation
- All database queries in dashboard routes must be scoped to `businessId` from the current session
- No query in the customer dashboard may return data from another Business
- This must be enforced at the server action level — not only in the UI layer

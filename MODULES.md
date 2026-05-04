# Modules (Products) — Arilla Soft SaaS Platform

## What Is a Module/Product?

A **Product** is a functional module that a Business can activate on the platform.
Activation is tracked via a `BusinessProduct` record.

Each Product has:
- A **dashboard area** where the Business manages it: `(dashboard)/[productSlug]/`
- A **settings page**: `(dashboard)/[productSlug]/settings/`
- Optionally, a **public URL** for end-customer access (no login required)

Products are defined by Arilla Soft staff and seeded into the `Product` table.
Businesses cannot create their own products.

---

## Existing Marketing Pages (Must Be Preserved)

The following marketing pages exist on the website and describe the products.
They are entirely separate from the dashboard implementation.
Do not modify them when implementing the dashboard.

| Marketing URL | Route File |
|---|---|
| `/sektorel-yazilimlar/qr-menu` | `src/app/(public)/sektorel-yazilimlar/qr-menu/page.tsx` |
| `/sektorel-yazilimlar/randevu-sistemi` | `src/app/(public)/sektorel-yazilimlar/randevu-sistemi/page.tsx` |
| `/sektorel-yazilimlar/randevu-sistemi/kuafor-randevu-sistemi` | `...kuafor-randevu-sistemi/page.tsx` |
| `/sektorel-yazilimlar/randevu-sistemi/klinik-randevu-sistemi` | `...klinik-randevu-sistemi/page.tsx` |
| `/sektorel-yazilimlar/randevu-sistemi/guzellik-merkezi-randevu-sistemi` | `...guzellik-merkezi-randevu-sistemi/page.tsx` |

These pages link to the product landing pages. The actual product functionality lives in the
dashboard and public routes — not on these marketing pages.

---

## Product: QR Menu

**Slug:** `qr-menu`
**Purpose:** Digital restaurant, cafe, or food business menu accessed via QR code scan.

### Public URL
```
/m/[businessSlug]
```
- No authentication required
- Served from: `src/app/m/[businessSlug]/page.tsx` (Phase 5+)
- Mobile-optimized — designed for QR scan on a customer's phone
- Displays the business's active menu categories and items
- If the business has no active QR Menu (`BusinessProduct` inactive or missing), returns 404

### Dashboard Area
```
/dashboard/qr-menu
```
- Requires `BusinessMember` session + active `BusinessProduct` for `qr-menu`
- Features:
  - Category management (create, reorder, activate/deactivate)
  - Menu item management (name, description, price, image, active)
  - QR code display and download (links to `/m/[businessSlug]`)
  - Menu preview

### Dashboard Settings
```
/dashboard/qr-menu/settings
```
- Features (business_owner and manager only):
  - Business name displayed on menu
  - Currency and locale settings
  - Menu theme/color (future)

### Data Models
- `QrMenuCategory` — scoped to `businessId`
- `QrMenuItem` — scoped to `businessId` and `categoryId`

### Role Access
| Action | business_owner | manager | staff |
|---|---|---|---|
| View menu | Yes | Yes | Yes |
| Create/edit categories | Yes | Yes | Yes |
| Create/edit items | Yes | Yes | Yes |
| Deactivate items | Yes | Yes | Yes |
| Configure settings | Yes | Yes | No |
| Download QR code | Yes | Yes | No |

---

## Product: Randevu (Appointment System)

**Slug:** `randevu`
**Purpose:** Customer-facing online appointment booking for salons, clinics, beauty centers,
and other service businesses.

### Public URL
```
/b/[businessSlug]
```
- No authentication required
- Served from: `src/app/b/[businessSlug]/page.tsx` (Phase 6+)
- Customers select a service → choose a date and time slot → submit their details → appointment created
- If the business has no active Randevu (`BusinessProduct` inactive or missing), returns 404

### Dashboard Area
```
/dashboard/randevu
```
- Requires `BusinessMember` session + active `BusinessProduct` for `randevu`
- Features:
  - Appointment calendar view (day, week, month)
  - Appointment detail view (client name, service, time, status)
  - Appointment status management (confirm, complete, cancel)
  - Client list
  - Service management

### Dashboard Settings
```
/dashboard/randevu/settings
```
- Features (business_owner and manager only):
  - Service management (name, duration, price)
  - Working hours and availability
  - Buffer time between appointments
  - Booking URL display and share
  - Notification preferences (future)

### Data Models
- `RandevuService` — services offered by the business
- `RandevuClient` — client records (from booking form)
- `RandevuAppointment` — appointment records with status
- `RandevuAvailability` — working hours and blocked times (Phase 6 detail)

### Role Access
| Action | business_owner | manager | staff |
|---|---|---|---|
| View appointment calendar | Yes | Yes | Yes |
| Confirm/cancel appointments | Yes | Yes | Yes |
| View client list | Yes | Yes | Yes |
| Add manual appointments | Yes | Yes | Yes |
| Manage services | Yes | Yes | No |
| Configure availability | Yes | Yes | No |
| Configure settings | Yes | Yes | No |
| View booking analytics | Yes | Yes | Read-only |

---

## Adding Future Products

When a new product is added, the following must be created:

1. A `Product` seed record with a unique `slug`
2. Dashboard pages under `src/app/(dashboard)/[productSlug]/`
3. Public URL (if applicable) under `src/app/m/` or `src/app/b/` or a new pattern
4. Prisma models scoped to `businessId`
5. API routes under `src/app/api/dashboard/[productSlug]/`
6. Server actions under `src/lib/modules/[productSlug]/`
7. Documentation entry in this file

The `BusinessProduct` access control pattern is reused for every product without modification.

# Database Model — Arilla Soft SaaS Platform

Database: **PostgreSQL**
ORM: **Prisma v6.5**
Client singleton: `src/lib/prisma.ts`
Schema file: `prisma/schema.prisma`

---

## Rule

**Do not modify existing models.** All existing models are in production use for the marketing
website and internal CMS. Schema changes require a migration plan reviewed before execution.
New models are added only — existing fields are never renamed or removed.

---

## Existing Models (Do Not Modify)

These models exist in the current `prisma/schema.prisma` and are used by the marketing website
and internal admin CMS.

### AdminUser
Internal Arilla Soft staff accounts. Used only for `/admin` routes.

```
AdminUser {
  id        String        @id
  email     String        @unique
  password  String        (bcrypt hashed)
  name      String?
  role      AdminRole
  createdAt DateTime
  updatedAt DateTime
}

enum AdminRole {
  SUPER_ADMIN
  ADMIN
  EDITOR
}
```

### Content Models
Used by the internal CMS and displayed on the marketing website.

- `Service` — service catalog (slug, title, description, icon, featured, sortOrder)
- `Solution` — sector-specific solutions
- `Project` + `ProjectCategory` — portfolio projects with categories, budget range, platforms
- `BlogPost` + `BlogCategory` — blog articles with SEO fields, slug, categories
- `FAQ` — frequently asked questions with categories

### Lead Capture Models
Form submissions from the marketing website.

- `ContactMessage` — contact form submissions
- `QuoteRequest` — project quote requests with budget range and platform targets

### Company Content Models
Displayed on marketing pages.

- `TeamMember` — team member profiles
- `Testimonial` — client testimonials
- `PartnerLogo` — partner/client logos

### Configuration Models

- `SiteSetting` — key/value store for global site configuration (logo, hero title, social links, favicon)

---

## Future Models — Phase 3+

These models will be added in future phases. The schema is not modified until Phase 3 begins.
All new models are additive — they do not touch existing tables.

### Business
A customer organization registered on the SaaS platform.

```
Business {
  id          String    @id
  name        String
  slug        String    @unique    ← used in /m/[slug] and /b/[slug] URLs
  plan        String?              ← future: plan tier
  active      Boolean   @default(true)
  createdAt   DateTime
  updatedAt   DateTime
  members     BusinessMember[]
  products    BusinessProduct[]
}
```

### BusinessMember
A user who belongs to a Business. Holds the customer's login credentials.

```
BusinessMember {
  id          String    @id
  email       String    @unique
  password    String    (bcrypt hashed)
  name        String?
  role        BusinessRole
  businessId  String
  business    Business  @relation(...)
  createdAt   DateTime
  updatedAt   DateTime
}

enum BusinessRole {
  business_owner
  manager
  staff
}
```

### Product
A product/module available on the platform. Seeded by Arilla Soft staff.

```
Product {
  id          String    @id
  name        String
  slug        String    @unique    ← e.g., "qr-menu", "randevu"
  description String?
  active      Boolean   @default(true)
  createdAt   DateTime
  businesses  BusinessProduct[]
}
```

### BusinessProduct
The activation record linking a Business to a Product.
One record per Business per Product.

```
BusinessProduct {
  id          String    @id
  businessId  String
  productId   String
  active      Boolean   @default(true)
  config      Json?     ← product-specific configuration (optional)
  activatedAt DateTime
  business    Business  @relation(...)
  product     Product   @relation(...)

  @@unique([businessId, productId])
}
```

---

## Future Models — Phase 5+ (QR Menu)

Added when the QR Menu module is implemented. Scoped to a Business via BusinessProduct.

```
QrMenuCategory {
  id              String    @id
  businessId      String
  name            String
  sortOrder       Int
  active          Boolean
  items           QrMenuItem[]
}

QrMenuItem {
  id              String    @id
  categoryId      String
  businessId      String
  name            String
  description     String?
  price           Decimal
  imageUrl        String?
  active          Boolean
  sortOrder       Int
}
```

---

## Future Models — Phase 6+ (Randevu)

Added when the Randevu module is implemented. Scoped to a Business via BusinessProduct.

```
RandevuService {
  id              String    @id
  businessId      String
  name            String
  durationMinutes Int
  price           Decimal?
  active          Boolean
}

RandevuClient {
  id              String    @id
  businessId      String
  name            String
  phone           String?
  email           String?
  createdAt       DateTime
}

RandevuAppointment {
  id              String    @id
  businessId      String
  serviceId       String
  clientId        String?
  clientName      String    ← denormalized for walk-ins
  clientPhone     String?
  startAt         DateTime
  endAt           DateTime
  status          AppointmentStatus
  notes           String?
  createdAt       DateTime
}

enum AppointmentStatus {
  pending
  confirmed
  completed
  cancelled
}
```

---

## Relationship Summary

```
Business
  ├── BusinessMember[] (role: business_owner | manager | staff)
  └── BusinessProduct[]
        └── Product (slug: "qr-menu" | "randevu" | ...)

QrMenuCategory → Business
QrMenuItem → QrMenuCategory → Business

RandevuService → Business
RandevuClient → Business
RandevuAppointment → Business, RandevuService, RandevuClient?
```

---

## Migration Protocol

1. Edit `prisma/schema.prisma` with new additive models only
2. Run `npx prisma migrate dev --name <descriptive-name>` on local database
3. Verify with `npx prisma studio` — confirm tables and relations are correct
4. Run `npm run build` — confirm no TypeScript errors from generated Prisma client
5. Run full regression checklist before merging
6. Never run `db:push` — always use `db:migrate`
7. Never migrate production without testing on local first

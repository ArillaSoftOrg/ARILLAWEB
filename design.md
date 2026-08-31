# Arillasoft Design System — v1.0

> Purpose: This file is the single source of truth for the visual refresh of the existing Arillasoft website.
> Phase 1 is a visual-system refactor, not a content or information-architecture rewrite.
> Preserve the existing pages, copy, routes, components, interactions, and functional behavior unless a later task explicitly asks for structural or content changes.

---

## 1. Core Direction

Arillasoft should feel:

- Modern
- Technical
- Minimal
- Premium but not luxurious
- Direct and confident
- Product-led rather than agency-generic
- High-contrast
- Spacious
- Systematic
- Clean rather than decorative

Visual reference direction:

- Strong black / off-white contrast
- Controlled lime accent
- Large grotesk sans-serif typography
- Generous whitespace
- Light borders
- Rounded cards and controls
- Dark sections used as visual anchors
- Accent color used sparingly and intentionally

Do not imitate any reference website pixel-for-pixel.
Use the same design language principles, while keeping Arillasoft visually distinct.

---

## 2. Phase 1 Refactor Rules

For the first redesign pass:

1. Do not rewrite page copy.
2. Do not remove or add major sections.
3. Do not change routes or navigation structure.
4. Do not change business logic.
5. Do not break forms, APIs, tracking, animations, or integrations.
6. Do not introduce a new component library unless the project already uses one.
7. Reuse the existing component architecture where reasonable.
8. Refactor repeated visual values into reusable tokens.
9. Replace arbitrary colors, font sizes, radii, shadows, and spacing with this design system.
10. Preserve responsive behavior, then improve inconsistencies without changing product intent.
11. Keep accessibility and readable contrast.
12. After the visual refresh, content and section-level revisions will be handled separately.

---

# 3. Color System

## 3.1 Core Palette

### Ink
Primary dark color.

`#101010`

Use for:
- Primary text
- Dark backgrounds
- Primary black buttons
- Strong borders where needed

### White

`#FFFFFF`

Use for:
- Primary light backgrounds
- Text on dark surfaces
- Cards on neutral backgrounds

### Canvas

`#F7F7F7`

Use for:
- Alternate sections
- Soft page backgrounds
- Secondary surfaces

### Warm Canvas

`#F6F5F1`

Use for:
- Select alternate sections
- Pricing / editorial sections
- Warm neutral separation

Do not use both Canvas and Warm Canvas randomly.
A section should have a deliberate background role.

---

## 3.2 Brand Lime

### Primary Lime

`#C7F36B`

Main accent color.

Use for:
- Primary accent surfaces
- Selected / active elements
- Badges
- Highlighted words
- Important metrics
- Small status indicators
- Dark-section CTA highlights
- Focus accents
- Selected cards

### Lime Hover

`#B9E85A`

### Lime Active

`#AAD84B`

### Lime Soft

`#F1FAD8`

Use for very light brand-tinted backgrounds only when a full-strength lime surface would be too strong.

### Lime Deep

`#435C20`

Use sparingly for dark brand-toned text or decorative states when required.

---

## 3.3 Text Colors

### Text Primary
`#101010`

### Text Secondary
`#60605C`

### Text Muted
`#858580`

### Text Inverse
`#FFFFFF`

### Text Inverse Secondary
`#B3B3B0`

### Text Accent
`#C7F36B`

Rules:

- Headings on light surfaces should normally use Text Primary.
- Body copy on light surfaces should normally use Text Secondary.
- Muted text is for metadata, helper text, captions, and low-priority information.
- Do not use lime for long paragraphs.
- Do not use low-contrast gray for essential information.

---

## 3.4 Borders

### Border Default
`#E8E7E3`

### Border Strong
`#D4D3CE`

### Border Dark
`#333333`

Rules:

- Prefer subtle borders over strong shadows.
- Dark sections may use Border Dark.
- Do not introduce arbitrary gray border colors.

---

## 3.5 Dark Surfaces

### Dark Background
`#101010`

### Dark Surface
`#181818`

### Dark Elevated
`#202020`

Dark sections should use:

- Primary text: `#FFFFFF`
- Secondary text: `#B3B3B0`
- Accent: `#C7F36B`
- Border: `#333333`

---

## 3.6 Semantic Colors

Semantic colors exist for meaning, not decoration.

### Success
`#22C55E`

### Warning
`#F59E0B`

### Error / Destructive
`#DC2626`

### Info
`#3B82F6`

Do not replace semantic status colors with lime.

---

## 3.7 Color Usage Principles

Approximate visual balance:

- 70–80% neutral light / dark surfaces
- 15–25% black / white contrast
- 5% lime accent

Lime is an accent, not a base color.

Avoid:
- Lime on every button
- Lime borders around every card
- Lime headings everywhere
- Large lime backgrounds without purpose
- Multiple unrelated accent colors
- Default Tailwind palette colors used ad hoc

Never introduce arbitrary colors when an existing token can express the same visual role.

---

# 4. Typography

## 4.1 Font Family

Use one font family across the entire website:

**Open Sauce One**

Do not introduce another font family unless explicitly requested later.

Recommended font stack:

```css
font-family: "Open Sauce One", "Inter", "Helvetica Neue", Arial, sans-serif;
```

`Inter`, `Helvetica Neue`, and `Arial` are fallback fonts only.
They are not part of the visual identity.

---

## 4.2 Font Weights

Use:

- Regular — `400`
- Medium — `500`
- SemiBold — `600`
- Bold — `700`

Usage:

### 400
- Body copy
- Paragraphs
- Descriptions
- FAQ answers
- Supporting text

### 500
- Navigation
- Buttons
- Labels
- Badges
- Form labels
- Small UI emphasis

### 600
- Section headings
- Card headings
- Important UI text
- Most large headings

### 700
- Reserved for rare, high-emphasis hero or display text
- Do not use as the default heading weight

Avoid excessive bold text.
Hierarchy should come from size, spacing, contrast, and layout—not only weight.

---

# 5. Typography Scale

## Desktop

### Display
- Size: `64px`
- Weight: `600`
- Line-height: `68px`
- Letter-spacing: `-0.035em`

### H1
- Size: `56px`
- Weight: `600`
- Line-height: `60px`
- Letter-spacing: `-0.03em`

### H2
- Size: `44px`
- Weight: `600`
- Line-height: `50px`
- Letter-spacing: `-0.025em`

### H3
- Size: `32px`
- Weight: `600`
- Line-height: `38px`
- Letter-spacing: `-0.02em`

### H4
- Size: `24px`
- Weight: `600`
- Line-height: `30px`
- Letter-spacing: `-0.015em`

### Body Large
- Size: `18px`
- Weight: `400`
- Line-height: `28px`
- Letter-spacing: `-0.005em`

### Body
- Size: `16px`
- Weight: `400`
- Line-height: `24px`
- Letter-spacing: `0`

### Small
- Size: `14px`
- Weight: `400`
- Line-height: `20px`
- Letter-spacing: `0`

### Label
- Size: `14px`
- Weight: `500`
- Line-height: `18px`
- Letter-spacing: `0`

### Caption
- Size: `12px`
- Weight: `500`
- Line-height: `16px`
- Letter-spacing: `0.01em`

---

## Mobile

### Display
- Size: `40px`
- Line-height: `44px`

### H1
- Size: `40px`
- Line-height: `44px`

### H2
- Size: `32px`
- Line-height: `38px`

### H3
- Size: `26px`
- Line-height: `32px`

### H4
- Size: `22px`
- Line-height: `28px`

### Body Large
- Size: `17px`
- Line-height: `26px`

### Body
- Size: `16px`
- Line-height: `24px`

### Small
- Size: `14px`
- Line-height: `20px`

Do not make body copy excessively small on mobile.

---

## 5.1 Typography Rules

- Use tight letter-spacing only for larger headings.
- Do not apply negative tracking to normal body copy.
- Body paragraphs should usually remain within approximately `55–70ch`.
- Avoid extremely wide text blocks.
- Use sentence case by default.
- All-caps may be used for small badges or eyebrow labels only.
- Avoid overusing uppercase navigation or headings.
- Use typography scale tokens instead of one-off sizes.

---

# 6. Spacing System

Base spacing unit: `4px`

Approved spacing scale:

- `4px`
- `8px`
- `12px`
- `16px`
- `20px`
- `24px`
- `32px`
- `40px`
- `48px`
- `64px`
- `80px`
- `96px`
- `120px`
- `144px`

Rules:

- Do not use arbitrary spacing values unless required by an existing functional constraint.
- Internal component spacing should normally use `8–32px`.
- Section spacing should normally use `80–144px` on desktop.
- Mobile section spacing should normally use `56–96px`.
- Prefer consistent vertical rhythm across the website.

---

# 7. Layout System

## Container

Default content container:

- Max width: `1280px`
- Centered horizontally

Recommended horizontal page padding:

### Desktop
`32px`

### Tablet
`24px`

### Mobile
`20px`

For very wide screens, content should remain constrained.
Do not stretch primary text and UI across the full viewport unnecessarily.

---

## Grid

Use a 12-column mental model for complex desktop layouts.

Common layouts:

- 12 / full width
- 8 + 4
- 7 + 5
- 6 + 6
- 4 + 4 + 4
- 3 + 3 + 3 + 3

Use CSS Grid or Flexbox based on semantic need.
Do not force all layouts into equal columns.

---

# 8. Border Radius

Approved radius tokens:

### Radius Small
`8px`

### Radius Medium
`12px`

### Radius Large
`16px`

### Radius XL
`24px`

### Radius Pill
`999px`

Recommended use:

- Small controls: `8px`
- Inputs / standard buttons: `10–12px`
- Cards: `16px`
- Large panels: `20–24px`
- Badges / chips / pills: `999px`

Do not introduce random radii such as 7px, 13px, 19px, etc.

---

# 9. Shadows

The design should not depend heavily on shadows.

Prefer:

1. Surface contrast
2. Borders
3. Whitespace
4. Then subtle shadows where elevation is necessary

Approved shadow approach:

### Shadow Small

```css
0 1px 2px rgba(16, 16, 16, 0.05)
```

### Shadow Medium

```css
0 8px 24px rgba(16, 16, 16, 0.08)
```

### Shadow Large

```css
0 20px 50px rgba(16, 16, 16, 0.10)
```

Avoid:
- Strong black drop shadows
- Glow effects
- Colored shadows
- Shadow on every card

---

# 10. Buttons

## Primary Dark Button

Preferred default CTA on light backgrounds.

- Background: `#101010`
- Text: `#FFFFFF`
- Border: transparent
- Font: Open Sauce One
- Weight: `500`
- Radius: pill or `12px`, depending on the component context
- Minimum height: `44px`

Hover:
- Slightly lighter dark surface such as `#202020`

Use for:
- Main page CTA
- Navigation CTA
- High-priority action

---

## Primary Lime Button

Use when strong brand emphasis is needed, especially on dark sections.

- Background: `#C7F36B`
- Text: `#101010`
- Hover: `#B9E85A`
- Active: `#AAD84B`

Do not use lime buttons everywhere.
There should usually be one visually dominant CTA per section.

---

## Secondary Button

- Background: transparent or White
- Text: `#101010`
- Border: `#D4D3CE`

Hover:
- Background: `#F7F7F7`

---

## Ghost Button

- Transparent
- No visible border by default
- Text follows surface context
- Hover uses subtle neutral background

---

## Button Rules

- Avoid oversized text inside buttons.
- Use `14–16px`, usually Medium `500`.
- Keep icon and label spacing consistent.
- Primary CTAs should be visually obvious.
- Do not create more than 3 button styles without a real need.

---

# 11. Cards

Light card:

- Background: `#FFFFFF`
- Border: `#E8E7E3`
- Radius: `16px`
- Shadow: none or Shadow Small
- Padding: normally `24–32px`

Neutral card:

- Background: `#F7F7F7`
- Border: optional depending on section contrast

Dark card:

- Background: `#181818`
- Border: `#333333`
- Text primary: `#FFFFFF`
- Text secondary: `#B3B3B0`

Accent card:

- Background: `#C7F36B`
- Text: `#101010`
- Use sparingly for one highlighted feature, plan, or status.

Do not make all cards equally visually loud.

---

# 12. Forms

Inputs should feel simple and product-like.

Recommended:

- Height: `44–48px`
- Background: `#FFFFFF`
- Border: `#D4D3CE`
- Text: `#101010`
- Placeholder: `#858580`
- Radius: `10–12px`
- Font: Open Sauce One `400`

Focus:
- Strong enough to be visible
- Use a dark or lime-accented focus treatment
- Do not rely only on color if accessibility would suffer

Error:
- Use semantic Error color
- Include readable error text

---

# 13. Badges and Eyebrows

Badges can use:

### Dark badge
- Background: `#101010`
- Text: `#FFFFFF`

### Lime badge
- Background: `#C7F36B`
- Text: `#101010`

### Neutral badge
- Background: `#F7F7F7`
- Border: `#E8E7E3`
- Text: `#101010`

Use:
- `12–14px`
- Weight `500`
- Pill radius

Badges should remain small visual labels, not substitute for headings.

---

# 14. Navigation

Navigation should be minimal.

Preferred behavior:

- White or lightly translucent neutral background
- Dark primary text
- Clear active / hover state
- Primary CTA separated visually from nav links
- Avoid unnecessary dividers
- Avoid overly small nav text

Recommended desktop nav text:
- `14–16px`
- Weight `500`

Mobile navigation must remain easy to scan and tap.

---

# 15. Section Rhythm

Alternate between visual environments deliberately.

Example rhythm:

1. White
2. Canvas
3. White
4. Dark
5. White
6. Warm Canvas
7. Dark / Footer

Do not alternate backgrounds mechanically after every section.
Use dark sections for major product or capability emphasis.

Dark sections are visual anchors and should be relatively rare.

---

# 16. Imagery and Graphics

Preferred direction:

- Product UI visuals
- Browser / dashboard mockups
- Abstract technical visuals
- Clean diagrams
- Controlled 3D only when it supports the product story
- Minimal illustration
- Real screenshots where credibility matters

Avoid:
- Generic stock photography
- Random gradients
- Decorative blobs without meaning
- Multiple unrelated illustration styles
- Excessive glassmorphism

Lime glow / gradient may be used very subtly around featured product visuals, but must never become the dominant design language.

---

# 17. Icons

Use one consistent icon family across the site.

If an icon library already exists in the project, keep it unless it conflicts with the design.

Preferred style:

- Simple outline icons
- Consistent stroke width
- Minimal detail

Common sizes:
- `16px`
- `20px`
- `24px`

Avoid mixing filled, outlined, 3D, and emoji-style icons in the same UI system.

---

# 18. Accessibility

Minimum standards:

- Normal text contrast target: WCAG AA `4.5:1`
- Large text target: `3:1`
- Interactive elements need visible focus states
- Do not communicate status through color alone
- Minimum comfortable touch target: approximately `44px`
- Body text should normally remain `16px` on mobile
- Buttons and links must have distinguishable hover / focus behavior

Lime should not be used for low-contrast small text on white backgrounds.

---

# 19. Motion

Animation should support hierarchy and feedback.

Preferred:

- Subtle fade
- Small translate
- Short hover transitions
- Controlled reveal animations

Recommended duration:
- UI hover: `150–200ms`
- Small transitions: `200–300ms`
- Section reveal: `300–500ms`

Avoid:
- Excessive parallax
- Constant looping movement
- Long easing that slows interaction
- Motion on every component

Respect `prefers-reduced-motion`.

---

# 20. Responsive Rules

Design mobile intentionally rather than shrinking desktop.

On smaller screens:

- Collapse multi-column layouts when needed
- Maintain generous but reduced spacing
- Preserve clear hierarchy
- Keep body text readable
- Avoid horizontal scrolling
- Avoid oversized headings breaking into awkward one-word lines
- Cards should stack naturally
- CTAs may become full-width where appropriate
- Preserve minimum touch target sizes

---

# 21. Implementation Rules for Claude

When implementing this design system:

1. First inspect the existing codebase.
2. Identify the current styling architecture:
   - CSS
   - SCSS
   - CSS Modules
   - Tailwind
   - styled-components
   - component library
   - design tokens
3. Extend the existing architecture instead of creating a parallel styling system.
4. Define the design tokens centrally.
5. Replace repeated hardcoded values with semantic tokens.
6. Do not scatter hex values throughout components.
7. Do not invent new colors.
8. Do not add a second font.
9. Do not use arbitrary Tailwind values when an approved token exists.
10. Do not rewrite working components only for stylistic preference.
11. Preserve component APIs where possible.
12. Keep responsive behavior intact.
13. Run the project and check every major page after refactoring.
14. Fix visual regressions introduced by the refactor.
15. Do not change copy or page structure during Phase 1.
16. Do not add decorative elements merely to make the page look “modern”.
17. Prefer simplicity, contrast, typography, spacing, and composition.

---

# 22. Semantic Token Reference

Recommended conceptual naming:

```css
:root {
  --background: #FFFFFF;
  --foreground: #101010;

  --surface: #F7F7F7;
  --surface-warm: #F6F5F1;
  --surface-dark: #101010;
  --surface-dark-raised: #181818;

  --primary: #C7F36B;
  --primary-hover: #B9E85A;
  --primary-active: #AAD84B;
  --primary-soft: #F1FAD8;
  --primary-foreground: #101010;

  --text-primary: #101010;
  --text-secondary: #60605C;
  --text-muted: #858580;
  --text-inverse: #FFFFFF;
  --text-inverse-secondary: #B3B3B0;

  --border: #E8E7E3;
  --border-strong: #D4D3CE;
  --border-dark: #333333;

  --success: #22C55E;
  --warning: #F59E0B;
  --destructive: #DC2626;
  --info: #3B82F6;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 999px;
}
```

If the project already uses a semantic token convention, map these values to the existing naming system rather than duplicating token layers.

---

# 23. Tailwind Guidance

If the project uses Tailwind:

- Map these colors to semantic theme tokens.
- Prefer classes such as:
  - `bg-background`
  - `text-foreground`
  - `bg-primary`
  - `text-primary-foreground`
  - `text-muted-foreground`
  - `border-border`
- Avoid ad hoc usage such as:
  - `text-zinc-500`
  - `bg-lime-300`
  - `border-gray-200`
  unless those utilities are explicitly mapped to the approved design tokens.
- Avoid arbitrary values like `text-[17px]`, `rounded-[13px]`, or `bg-[#C7F36B]` inside components when a system token can be used.

---

# 24. What Not To Do

Do not:

- Add multiple font families
- Introduce blue / purple gradients as decorative brand colors
- Use lime everywhere
- Use default gray, slate, zinc, neutral palettes interchangeably
- Make every card elevated
- Make every section a card grid
- Use excessive rounded rectangles
- Use random font sizes
- Make all text bold
- Make every section dark
- Add glassmorphism without product justification
- Add unnecessary animations
- Rewrite content in this phase
- Rebuild working pages from scratch unless technically necessary

---

# 25. Phase 1 Completion Criteria

The redesign pass is complete when:

- Every major page uses Open Sauce One
- Typography follows the approved scale
- Arbitrary colors have been removed or minimized
- Core colors map to semantic tokens
- Lime is used consistently as an accent
- Light / dark section contrast is coherent
- Borders and radii are consistent
- Buttons follow the defined variants
- Cards follow the defined surface hierarchy
- Responsive layouts still work
- Existing content and functionality are preserved
- No obvious visual regressions remain
- The website feels like one coherent system rather than independently styled pages

---

## Final Principle

Arillasoft should look like a software company that designs systems, not a generic template-based agency.

The interface should communicate this through:

**clarity + hierarchy + contrast + typography + whitespace + restraint**

rather than through excessive decoration.

// Shared framer-motion tokens + variants for the homepage motion system.
// Used by HomeClient.tsx (HeroSection, TestimonialsSection) and every
// component under src/components/home/sections/** — kept in a standalone
// module (no JSX) so neither side needs to import the other, avoiding any
// circular-import risk.
//
// Design intent (see design.md §19 and the per-section audit notes in each
// sections/*.tsx file): premium, restrained motion that reads as immediate
// presentation, not loading. No bounce/elastic/spring, no long waits between
// elements. Sections with a real signature interaction (WebsiteAsBusinessTool's
// dashboard tilt, AutomationIntegrations' pipeline, FinalCtaWaveField, the
// marquees) define their own timing and intentionally don't route through
// these generic tokens.

// Premium easing — mirrors --home-ease-premium in globals.css. Keep the two
// in sync manually; CSS custom properties and JS array literals can't share
// a single source.
export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

// Duration tokens (seconds). Names match the motion-language tiers used
// across the homepage:
// - micro: hover/focus states, chevrons, arrows (handled mostly via Tailwind
//   `duration-*` classes, listed here for reference/consistency: 150-220ms)
// - component: a single card/module/pill/tab settling in (260-360ms)
// - section: heading + body entrance (380-500ms)
// - product: tab/screen content swaps (240-320ms)
export const DURATION = {
  micro: 0.2,
  component: 0.3,
  section: 0.42,
  product: 0.26,
} as const;

// Spacing between staggered repeated items (cards, pills, list rows) — 60-90ms.
export const STAGGER_GAP = 0.08;

// Section-level reveal: H2 / supporting body copy. ~14-18px travel, settles
// well inside 400-600ms once stagger delay is included.
export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.section, ease: EASE_PREMIUM } },
};

// Component-level reveal for a single item inside a staggered list (grid
// cards, capability pills, repeated timeline rows). Shorter travel + shorter
// settle than fadeUp so repeated items don't read as "n separate headings."
export const fadeUpItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.component, ease: EASE_PREMIUM } },
};

// Parent stagger container — pairs with fadeUp/fadeUpItem children.
export const stagger = {
  visible: { transition: { staggerChildren: STAGGER_GAP } },
};

// Reduced-motion / static-grid fallback (no scale zoom, no bounce).
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: DURATION.component, ease: EASE_PREMIUM } },
};

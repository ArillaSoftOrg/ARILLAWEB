# Framer Reference Research — Site Örnekleri

**Status: research only, not implemented.** Nothing in this document has been wired into
`src/lib/design-preview-config.ts`. `EML-01` remains the only design with a live reference.
This file and `docs/framer-reference-research.json` live on the `feat/framer-reference-research`
branch pending approval — see that JSON file for the same data in machine-readable form,
including full score breakdowns.

## Method

1. 8 parallel research agents (one per sector) searched Framer Marketplace and community
   showcases via WebSearch/WebFetch for 5–8 real, live-demo candidates per design, matching
   the design's existing direction (`Modern Dönüşüm` / `Sade Editoryal` / `Premium Koyu`) —
   no new categories were invented, and EML-01 was left untouched.
2. All 136 unique candidate demo URLs were centrally verified with the validated
   `tests/verify-frameable.mjs` tool (`npm run verify:frame`): real Playwright cross-origin
   iframe render (same sandbox flags as production) plus header checks. Result: **135 PASS,
   0 WARN, 1 REJECT** (a dead 404 link, whose free-tier sibling passed and was used instead).
3. Finalists were scored 0–10 per design (Visual 25% / Sector relevance 20% / Iframe
   reliability 20% / Mobile 10% / Desktop 10% / Distinctiveness 10% / Client presentation 5%),
   using the verifier's real render metrics and `--shots` screenshots — not just agent text
   descriptions. This caught two agent-reported "dark theme" claims that were actually wrong
   on visual inspection (see GUZ-03 and MIM-03 notes below) and one candidate rejected for a
   distracting third-party promo popup (see EML-02 notes below).

## Finalists by sector

### Pet Kuaförü ve Pet Hizmetleri

| Code | Direction | Template | Creator | Marketplace | Demo | Iframe | Score | Why selected |
|---|---|---|---|---|---|---|---|---|
| PET-01 | Modern Dönüşüm | CarePaw | Mezario | [link](https://www.framer.com/marketplace/templates/carepaw/) | [demo](https://carepaw.framer.website/) | PASS | 9.0 | Literal vet/pet-care fit, most complete candidate (94/94 images loaded), trustworthy conversion tone |
| PET-02 | Sade Editoryal | Groomix | Dmytri Ivanov | [link](https://www.framer.com/marketplace/templates/groomix/) | [demo](https://groomix.framer.website/) | PASS | 9.2 | Best literal editorial pet-grooming match found across all research, free, fully built |
| PET-03 | Premium Koyu | DRAGO | Sohel Lunat | [link](https://www.framer.com/marketplace/templates/drago/) | [demo](https://drago-template.framer.website/) | PASS | 7.9 | No pure pet-sector dark template exists on the market; genuinely dark/bold style-match, free, no competing CTA |

Other candidates considered: Groomify, Petgro, Groomerly, Bennett's, Pawfect, Petopia, Trotter
(PET-01); Naoto Studio, Rowen, Noun, Rowan, Framewell, Michelle (PET-02) — all style-match
portfolios, weaker sector fit than Groomix; Porto (PET-03, **rejected on screenshot review**:
genuinely dark but branded as a named individual's personal portfolio "GREYO" with a visible
"USE FOR FREE" badge, confusing for a business reference), Narayan (PET-03, dark but explicit
personal-portfolio framing with visible "Buy Template" CTA), Mirage ($279, priciest/SaaS-flavored),
Porto/Narayan/Fade — all rejected as weaker style-matches than DRAGO.

### Kuaför ve Berber

| Code | Direction | Template | Creator | Marketplace | Demo | Iframe | Score | Why selected |
|---|---|---|---|---|---|---|---|---|
| KUA-01 | Modern Dönüşüm | Velvera | — | [link](https://www.framer.com/marketplace/templates/velvera/) | [demo](https://velvera.framer.website/) | PASS | 9.0 | Literal hair-salon/barbershop fit, richest candidate (212/218 images loaded) |
| KUA-02 | Sade Editoryal | Salonix | Nasir Nawaz | [link](https://www.framer.com/community/marketplace/templates/salonix/) | [demo](https://salonix.framer.website/) | PASS | 9.2 | Best literal hair-salon editorial match, free |
| KUA-03 | Premium Koyu | Barón | — | [link](https://www.framer.com/marketplace/templates/baron/) | [demo](https://baron.framer.ai/) | PASS | 9.1 | Screenshot-confirmed dark literal barber-lounge fit, elegant gold-on-black, no competing CTA |

Other candidates considered: HairStyle, Barber, HairLoom, Salona, Salono, Your Best Barber
(KUA-01); Camelia, Kosmetisk, Modern Barber, Satz, Boutiq, Velaa (KUA-02, mostly style-match or
cross-sector-contested with GUZ); KingBarber, Clipster, STYLZ, baronbarber.framer.ai (KUA-03
alt domain of Barón, near-duplicate) — all passed iframe verification but scored lower on
sector fit or distinctiveness than the picks above.

### Güzellik ve Bakım Merkezi

| Code | Direction | Template | Creator | Marketplace | Demo | Iframe | Score | Why selected |
|---|---|---|---|---|---|---|---|---|
| GUZ-01 | Modern Dönüşüm | Xiro SPA | fourtwelve | [link](https://www.framer.com/marketplace/templates/xiro-spa/) | [demo](https://xiro-template.framer.website/) | PASS | 9.0 | Strong literal spa/wellness fit, all images loaded, complete booking/pricing/testimonials |
| GUZ-02 | Sade Editoryal | Lusora | Radu | [link](https://www.framer.com/community/marketplace/templates/lusora/) | [demo](https://lusora.framer.website/) | PASS | 8.9 | Literal spa/wellness fit, "less is more" typography-driven, free |
| GUZ-03 | Premium Koyu | Makeup | Blush Creative | [link](https://www.framer.com/marketplace/templates/makeup/) | [demo](https://makeup-template.framer.website/) | PASS | 8.8 | Screenshot-confirmed genuinely dark, literal beauty-business fit, free |

Other candidates considered: Kosmetisk, Salona, Visage, HolySpa, Zephyr Spa, DreamLand Spa,
SpaDay (GUZ-01); Camelia, Wellbe, Origo.Studio, Noun, Boutiq (GUZ-02); HairLoom, Barber, Razor
(GUZ-03, cross-sector duplicates with KUA/PET, excluded to avoid reuse). **Skins
(skins.framer.website) was the initial GUZ-03 pick and scored well on metrics and agent
description ("dark/luxury theme"), but was rejected after screenshot review — it actually
renders as a light pink/peach gradient, failing the Premium Koyu direction outright.**

### Diş Kliniği ve Özel Klinik

| Code | Direction | Template | Creator | Marketplace | Demo | Iframe | Score | Why selected |
|---|---|---|---|---|---|---|---|---|
| KLI-01 | Modern Dönüşüm | Dental | — | [link](https://www.framer.com/marketplace/templates/dental/) | [demo](https://dental-template.framer.website/) | PASS | 8.7 | Full literal dental-clinic match, free, all images loaded, top pick across all 8 candidates |
| KLI-02 | Sade Editoryal | Laurel | — | [link](https://www.framer.com/marketplace/templates/laurel/) | [demo](https://laurel-template.framer.website/) | PASS | 8.9 | Best literal dermatology-clinic editorial match, restrained palette, trust cues |
| KLI-03 | Premium Koyu | Dentry | — | [link](https://www.framer.com/community/marketplace/templates/dentry/) | [demo](https://dentry.framer.website/) | PASS | 9.0 | Screenshot-confirmed genuinely dark boutique-dental fit — the only literal dental+dark template on the market |

Other candidates considered: Dentora, DENTOI, Curenast, Dentica, HCare, MediCareX, Denty
(KLI-01); Flexora, Cureva, Wellbe, Vistiq, Xiro SPA, Nourish (KLI-02); Klinik, Noir, Noirpro
(unconfirmed/duplicate demo URL, excluded), MedExpert, Epidermis (KLI-03). **The research
agent's own text-only assessment initially flagged Dentry as "leaning light/editorial rather
than dark by default" — screenshot review confirmed the opposite: it is genuinely dark and was
the correct pick.**

### Restoran ve Kafe

| Code | Direction | Template | Creator | Marketplace | Demo | Iframe | Score | Why selected |
|---|---|---|---|---|---|---|---|---|
| RES-01 | Modern Dönüşüm | Sofra | Framerbucket | [link](https://www.framer.com/marketplace/templates/sofra/) | [demo](https://sofra.framer.website/) | PASS | 8.4 | Clean, generic restaurant fit (avoids niche pizza/fast-food framing of alternatives), free |
| RES-02 | Sade Editoryal | Plate | Toni Järvinen | [link](https://www.framer.com/marketplace/templates/plate/) | [demo](https://plate-template.framer.website/) | PASS | 8.5 | Modern-minimal, atmosphere-focused, richest RES-02 candidate by element count, free |
| RES-03 | Premium Koyu | Monks Crave | Design Monks | [link](https://www.framer.com/marketplace/templates/monks-crave/) | [demo](https://monkscrave.framer.website/) | PASS | 9.2 | Screenshot-confirmed genuinely dark, elegant fine-dining, richest RES-03 candidate, free |

Other candidates considered: Qitchen, Pepper, Gusto, Slice Town, La Paloma, Cuisine, Bamzi
(RES-01); Caplatte, Latte, Detox Cafe, Irish Cafe, Holier, Bakes (RES-02); NoirNosh, Privée
(thin content, only 462 chars), Restaura, Savoria, HeavenPalate, Bellevoire (RES-03,
**sector-mismatch**: actually a boutique Paris hotel template, not a restaurant, per the
research agent). `monkscravepro.framer.website` (RES-03 paid tier) is the one candidate across
all 136 URLs that failed verification outright — dead link, 404 — its free sibling was used.

### Emlak Danışmanlığı

| Code | Direction | Template | Creator | Marketplace | Demo | Iframe | Score | Why selected |
|---|---|---|---|---|---|---|---|---|
| EML-01 | Modern Dönüşüm | *(already implemented — Foreal)* | — | — | [demo](https://luxurious-truly-737590.framer.app/) | PASS (prior session) | — | Not part of this research pass |
| EML-02 | Sade Editoryal | Villa Sofia | ena supply | [link](https://www.framer.com/marketplace/templates/villa-sofia/) | [demo](https://villa-sofia.framer.website/) | PASS | 8.6 | Best editorial execution seen in the entire research pass: serif logotype, full-bleed architecture photography, zero clutter |
| EML-03 | Premium Koyu | Tropica | Fikri | [link](https://www.framer.com/marketplace/templates/tropica/) | [demo](https://tropica.framer.website/) | PASS | 9.4 | Screenshot-confirmed genuinely dark, moody luxury-villa photography, 100% images loaded, richest EML-03 candidate |

Other candidates considered: ArchEstate (EML-02, **rejected on screenshot review**: strong
metrics but a visible third-party "Pixsellz Bundle 2025" promo popup on load), Zafron (the same
template abandoned for EML-01 in the prior session over its "Buy Template" CTA — not reused),
Nestify (too listings-portal-like per its search bar), Properto, Giara (EML-02); Royal, Estates,
Havenspot, Monarch, Ambience (EML-03) — all passed verification and are solid backups if Tropica's
minor corner CTAs (see weaknesses) are a concern.

### Otomotiv Servisi ve Araç Bakım

| Code | Direction | Template | Creator | Marketplace | Demo | Iframe | Score | Why selected |
|---|---|---|---|---|---|---|---|---|
| OTO-01 | Modern Dönüşüm | Autofix | — | [link](https://www.framer.com/marketplace/templates/autofix/) | [demo](https://autofix-template.framer.website/) | PASS | 8.8 | Richest OTO-01 candidate, literal auto-service fit, full service/pricing/FAQ/process |
| OTO-02 | Sade Editoryal | Origo.Studio | — | [link](https://www.framer.com/marketplace/templates/origostudio/) | [demo](https://origostudio.framer.media/) | PASS | 8.2 | Genuinely minimal/editorial automotive templates don't exist on Framer; strongest editorial execution available, 100% images loaded |
| OTO-03 | Premium Koyu | RevX | Drew Builds | [link](https://www.framer.com/marketplace/templates/revx/) | [demo](https://revx.framer.website/) | PASS | 8.9 | Screenshot-confirmed genuinely dark, literal body-shop/detailing fit, dark by default, free |

Other candidates considered: AutoVibefix, Forge Auto Studio, Splash, Motix, Carnov (OTO-01);
Atelier, Noun, Studio Minimo, Reliable Cars, Forma Studio (OTO-02 — Reliable Cars is the only
literal-automotive option here but its search-bar/dealership hero reads more conversion-focused
than minimal/editorial, so the cleaner style-match Origo.Studio was preferred); Esteem, LEVRIX,
AVIX Studio, Dark X (OTO-03).

### Mimarlık, Dekorasyon ve İnşaat

| Code | Direction | Template | Creator | Marketplace | Demo | Iframe | Score | Why selected |
|---|---|---|---|---|---|---|---|---|
| MIM-01 | Modern Dönüşüm | Refit | JJ Gerrish | [link](https://www.framer.com/marketplace/templates/refit/) | [demo](https://refit.framer.website/) | PASS | 8.8 | Richest candidate across all 136 verified URLs, free, conversion-focused CTA funnel |
| MIM-02 | Sade Editoryal | Mood Design | Filip Banasiak | [link](https://www.framer.com/marketplace/templates/mood-design/) | [demo](https://mooddesign.framer.website/) | PASS | 9.1 | Built for architecture/interior studios, restrained typography, real project names, 100% images loaded |
| MIM-03 | Premium Koyu | Nave | V2SPACE | [link](https://www.framer.com/marketplace/templates/nave/) | [demo](https://nave.framer.website/) | PASS | 9.4 | Screenshot-confirmed genuinely dark with gold accents, literal architecture-studio fit, 100% images loaded |

Other candidates considered: Struxel, Urbis, Buildpro, Ayano, Movra (MIM-01); FoundFormed,
Intero, Interior, Fiber (MIM-02); Darkfolio, AVIX Studio, BASELANE, Fade (MIM-03). **Constructionn
(constructionn-wbs.framer.website) was the initial MIM-03 pick — the research agent's text
description called it "dark surfaces + yellow accent" and it scored well on metrics, but
screenshot review showed it actually renders as a light cream/beige theme with black and yellow
accents, failing the Premium Koyu direction outright.**

## Verification detail

Full raw verifier output (all 136 URLs, per-URL chars/elements/images/load-time) is not
committed to keep this branch lightweight — it was generated locally via `npm run verify:frame`
during this research pass and can be regenerated at any time by re-running the tool against the
demo URLs listed above or in the JSON artifact.

## Next step

Waiting for approval before wiring any of these 23 URLs into
`src/lib/design-preview-config.ts`. No production file was touched in this research pass.

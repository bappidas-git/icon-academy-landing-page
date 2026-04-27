# 09 — Hero Section

## Objective
Rebuild the above-the-fold hero so that within 2 seconds a prospective student or parent understands: who Icon Commerce College is, what programmes are open, why to choose it, and how to apply. Include one dominant Apply Now CTA, a secondary "Talk to Counsellor" CTA, trust micro-proofs, and a hero visual placeholder.

## Scope
- `src/components/sections/HeroSection/HeroSection.jsx`
- `src/components/sections/HeroSection/HeroSection.module.css`

## Out of Scope
- TrustBar (separate, prompt 10)
- Lead form drawer body (prompt 26)
- Sticky mobile CTA component (prompt 31)
- Header (prompt 08)

## Requirements

### Layout (desktop ≥1024px — two-column, 60/40 split)
- **Left column (60%):**
  - Eyebrow chip: `ADMISSIONS OPEN · 2026–27` (saffron pill on cream tint)
  - H1: `Begin Your Career at Icon Commerce College`
  - Subhead (h2 / p subtitle1): `NEP 2020 aligned undergraduate programmes — B.Com, BBA, BCA, B.A. — affiliated to Gauhati University, Guwahati. 20+ years of nurturing future-ready graduates.`
  - 4 quick benefit chips (icon + label, single line each):
    - `mdi:school-outline` "Affiliated to Gauhati University"
    - `mdi:certificate-outline` "NEP 2020 aligned"
    - `mdi:account-group` "Mentor-led batches"
    - `mdi:trophy-outline` "Estd. 2004 · 20+ Years"
  - CTA row:
    - Primary: `<Button color="cta" size="large">Apply Now</Button>` → opens drawer with `source: 'hero_primary'`
    - Secondary: `<Button variant="outlined" size="large">Talk to a Counsellor</Button>` → opens drawer with `source: 'hero_counsellor'`
  - Trust strip below CTAs (small caption text):
    - `🔒 100% confidential` · `📞 Call within 24 hrs` · `✅ Direct admissions support`
- **Right column (40%):**
  - Hero visual: placeholder `https://placehold.co/720x720?text=Icon+Commerce+College+Campus` rendered as a rounded card (`borderRadius: 24px`, `var(--ic-shadow-lg)`)
  - Floating stats card overlapping the bottom-left corner of the visual: 3 mini-stats in a single row (use `AnimatedCounter`):
    - `2,500+` Students Trained
    - `4` UG Programmes
    - `20+` Years of Excellence
  - Floating "Affiliated by" badge (top-right of visual): heritage maroon pill (`var(--ic-region-gauhati-uni)`) reading `AFFILIATED · GAUHATI UNIVERSITY`

### Layout (mobile <768px — single column, stack)
- Order: Eyebrow → H1 → Subhead → Hero image (full width, 16:9) → benefit chips (2x2 grid) → primary CTA full width → secondary CTA full width → trust strip
- H1 reduces to clamp(2rem, 8vw, 2.75rem) so it fits without horizontal scroll
- Stats card relocates beneath the hero image as a 3-column horizontal strip

### Background
- Top half: cream gradient `linear-gradient(180deg, #FFFBEB 0%, #FFFFFF 100%)`
- Subtle saffron radial gloss in the top-right corner: `radial-gradient(circle at 90% 10%, rgba(217, 119, 6, 0.08), transparent 60%)`
- Optional decorative SVG mesh (low opacity, 0.05) in the bottom-left to add texture; do not block content

### Animation (Framer Motion)
- H1 / subhead / CTA stagger in (delays 0, 0.1, 0.2, 0.3) using existing `Reveal` component from `src/components/common/Reveal`
- Hero visual fades in with a subtle 8 px upward translate (duration 0.5s, easeOut)
- Stats counter starts when the section enters viewport (use existing `useInView` hook)
- Honour `prefers-reduced-motion` (existing `useReducedMotion` hook) — disable transforms when set

### CTA wiring
```jsx
const { openLeadDrawer } = useModal();
// Primary
<Button color="cta" size="large" onClick={() => openLeadDrawer({ source: 'hero_primary' })}>Apply Now</Button>
// Secondary
<Button variant="outlined" size="large" onClick={() => openLeadDrawer({ source: 'hero_counsellor' })}>Talk to a Counsellor</Button>
```
Each click also fires `trackCTAClick('hero_primary' | 'hero_counsellor', 'hero', label)` via existing `gtm.js` helper — already wired through the modal; verify only.

### Section anchor
The `<section>` root must have `id="hero"` and `role="region"` with `aria-label="Hero — Icon Commerce College admissions"`.

## Out of Scope
- Hero video background (the boilerplate has video support — leave the JSX scaffolding intact but render an `<img>` instead; do not delete the video block, gate it behind a `props.useVideo` flag with default `false`)

## Content / Copy
All copy listed above is canonical. Do not invent additional taglines.

## Design Notes
- H1 uses Fraunces (var(--ic-font-heading)) at 700 weight; subhead uses Inter at 400 weight, color `var(--ic-text-secondary)`
- Eyebrow chip: saffron text on `rgba(217, 119, 6, 0.12)` background, 999px radius, height 32 px
- Benefit chips: small icon (20 px, saffron) + Plus Jakarta Sans label at 14 px / 600
- Floating stats card: white surface, `var(--ic-shadow-lg)`, 24 px radius, 24 px padding
- Affiliated badge: heritage maroon (`var(--ic-region-gauhati-uni)`), white text, Plus Jakarta Sans 11 px / 700, letter-spacing 0.12em, uppercase
- Maintain min height 92 vh on desktop, auto on mobile (no forced minHeight that pushes content)

## Placeholder Image Specs
- Hero visual: `https://placehold.co/720x720?text=Icon+Commerce+College+Campus`
- Mobile hero (responsive `srcset`): `https://placehold.co/720x540?text=ICC+Campus` (landscape variant)

## Acceptance Criteria
- [ ] On a 1440 × 900 desktop window, the hero fits in viewport with H1, subhead, benefit chips, both CTAs, and trust strip visible without scrolling
- [ ] On a 375 × 812 mobile window, H1 and subhead render without horizontal overflow; CTAs are full-width and at least 48 px tall
- [ ] Primary CTA opens drawer with `source === 'hero_primary'` (verify via React DevTools)
- [ ] Secondary CTA opens drawer with `source === 'hero_counsellor'`
- [ ] Stats counters animate from 0 to target only when scrolled into view
- [ ] No `Anvil` / `solar` / `kW` strings remain in HeroSection
- [ ] Lighthouse Performance score not regressed below 80 (mobile, throttled)
- [ ] Section root has `id="hero"`

## Dependencies
- 04-color-palette-and-design-tokens.md
- 05-typography-system.md
- 08-header-and-navigation.md

# 24 — Footer Redesign

## Objective
A clean, content-rich footer that acts as a final navigation aid and credibility signal: logo, mission line, quick links to programmes/admissions/contact, social icons, partner / affiliation badges (Gauhati University), copyright, and a compact "back-to-top" anchor.

## Scope
- `src/components/common/Footer/Footer.jsx`
- `src/components/common/Footer/Footer.module.css`

## Out of Scope
- A/B test variants
- Newsletter form (deferred — no email-capture beyond admissions form)
- The persistent floating sticky-CTA / contacts (separate components, prompts 31)

## Requirements

### Layout (desktop ≥1024 px — 4-column grid)
- **Column 1 — Brand:**
  - Logo (placeholder `https://placehold.co/200x60?text=Icon+Commerce+College+inverted`)
  - Tagline: `Where Knowledge Meets Character — Estd. 2004, Guwahati`
  - Address (2 lines): `Rajgarh Road, Chandmari` / `Guwahati - 781003, Assam`
  - Phone + Email rows (icon + clickable link)
  - Social icons row (4 icons)
- **Column 2 — Programmes:** ul of links: `B.Com`, `BBA`, `BCA`, `B.A.`, `Compare Programmes` (anchor `#programs`)
- **Column 3 — Admissions:** ul of links: `Apply Now` (opens drawer `source: 'footer_apply'`), `Fee Structure` (`#fees`), `Scholarships` (`#scholarships`), `Admission Process` (`#admissions`), `Samarth Portal ↗` (external)
- **Column 4 — Quick Links:** ul of links: `About`, `Why Icon`, `Faculty`, `Campus Life`, `Testimonials`, `FAQ`, `Contact`

### Layout (mobile <768 px — stacked accordion)
- Brand block stays open at the top
- Each of the other three columns becomes a collapsible accordion (`+` / `−` indicator)
- Bottom of the screen: social icons row + back-to-top button

### Mid-band — Affiliation strip
- Above the columns: a horizontal saffron-bordered card showing `Affiliated to Gauhati University · NEP 2020 aligned · Samarth College Code 842` in white type on indigo bg, centred

### Bottom band
- Left: copyright `© ${new Date().getFullYear()} Icon Commerce College. All rights reserved.`
- Centre: 3 small footer links: `Privacy Policy`, `Terms of Use`, `Sitemap` (each links to `/privacy`, `/terms`, `/sitemap.xml` respectively — all are placeholders for now; create stubs only if present in prior prompts; otherwise link to `#`)
- Right: built-with credit (small) `Designed & built with care.`
- Back-to-top button floating at bottom-right (24 px from edge): saffron circle, `mdi:arrow-up` icon, smooth-scrolls to `#hero`

## Design Notes
- Footer background: `var(--ic-primary-dark)` (deep indigo `#152659`)
- Text on footer: `var(--ic-text-on-dark)` for body, slightly muted variant `rgba(255,255,255,0.72)` for secondary
- Section padding: 64 px top, 32 px bottom desktop; 48 / 24 mobile
- Affiliation strip card: bg `var(--ic-primary)`, saffron border 1 px, 12 px radius, max-width 800 px, centred
- Column headings: Plus Jakarta Sans 13 px / 700, uppercase, letter-spacing 0.12em, color saffron
- Links: Inter 14 px / 400, white at 0.85 opacity → 1.0 on hover with saffron underline
- Social icons: 24 px white circles → saffron on hover

## A11y
- Footer is `<footer role="contentinfo">`
- Each column heading is `<h2>` (or `<h3>` if MUI typography hierarchy demands)
- Back-to-top button: `aria-label="Back to top"`, focus ring visible
- Social icons: each `<a>` has `aria-label="Visit Icon Commerce College on {platform}"`

## Out of Scope
- Multi-language switcher
- Currency switcher (irrelevant for college site)

## Content / Copy
All copy listed above is canonical. Tagline `Where Knowledge Meets Character — Estd. 2004, Guwahati` must appear verbatim.

## Placeholder Image Specs
- Inverted logo: `https://placehold.co/200x60?text=Icon+Commerce+College+inverted` (matches Header logo dimensions but light-on-dark)

## Acceptance Criteria
- [ ] Desktop footer renders 4 columns + affiliation strip + bottom band
- [ ] Mobile footer collapses Programmes / Admissions / Quick Links into accordions
- [ ] All anchor links scroll to the right section IDs
- [ ] `Apply Now` opens drawer with `source === 'footer_apply'`
- [ ] Samarth Portal link opens `https://assamadmission.samarth.ac.in/` in a new tab
- [ ] Social icons link to env-supplied URLs
- [ ] Back-to-top button visible after scrolling past hero, smooth-scrolls to `#hero` on click
- [ ] Copyright year updates dynamically via `new Date().getFullYear()`
- [ ] No Anvil / solar / kW strings
- [ ] Lighthouse a11y: footer is a labelled landmark; all links have descriptive text or aria-label

## Dependencies
- 02-env-and-package-rebrand.md
- 04-color-palette-and-design-tokens.md
- 05-typography-system.md
- 23-contact-and-location.md

# 10 — Trust Bar / Credibility Strip

## Objective
Add a slim, high-density credibility strip immediately below the hero that anchors the visitor's trust in three glances: an affiliation badge (Gauhati University), a recognition badge (NEP 2020), and a Samarth portal compliance signal — accompanied by a marquee of three rotating animated stats and a subtle "Estd. 2004" anchor.

## Scope
- `src/components/sections/TrustBar/TrustBar.jsx`
- `src/components/sections/TrustBar/TrustBar.module.css`
- `src/data/trustBarData.js` (new — will hold the badges, marquee items)

## Out of Scope
- Hero (prompt 09) — TrustBar sits directly below it
- The full "Why Choose Icon" USP section (prompt 13)

## Requirements

### Layout
- Full-width section, `padding: 32px 0` desktop, `24px 0` mobile, background `var(--ic-bg-soft)`
- Single horizontal row on desktop (≥1024 px); collapses to 2 stacked rows on tablet (768–1024); 1 stacked row on mobile (<768)
- Three columns:
  - **Column A — Affiliations (left, 40%):** three badge cards, each 64 × 64 px circular emblem placeholder + 2-line caption beside it (badge + role)
  - **Column B — Marquee (centre, 35%):** auto-scrolling horizontal marquee of stats / mini-facts; pauses on hover; respects `prefers-reduced-motion`
  - **Column C — Anchor (right, 25%):** "Estd. 2004" eyebrow + "20+ Years of Academic Legacy" caption stacked

### `src/data/trustBarData.js`
```js
export const TRUST_BADGES = [
  {
    id: 'gauhati-univ',
    icon: 'mdi:school',
    label: 'Affiliated to',
    accent: 'Gauhati University',
    img: 'https://placehold.co/96x96?text=GU',
  },
  {
    id: 'nep-2020',
    icon: 'mdi:certificate',
    label: 'Curriculum aligned to',
    accent: 'NEP 2020',
    img: 'https://placehold.co/96x96?text=NEP',
  },
  {
    id: 'samarth',
    icon: 'mdi:check-decagram',
    label: 'Samarth Portal',
    accent: 'College Code 842',
    img: 'https://placehold.co/96x96?text=842',
  },
];

export const MARQUEE_ITEMS = [
  { id: 'students', icon: 'mdi:account-group', text: '2,500+ Students Trained' },
  { id: 'programmes', icon: 'mdi:book-open-variant', text: '4 NEP-aligned UG Programmes' },
  { id: 'years', icon: 'mdi:calendar-clock', text: '20+ Years of Academic Excellence' },
  { id: 'faculty', icon: 'mdi:account-tie', text: '25+ Qualified Faculty (PhD / NET / SLET)' },
  { id: 'alumni', icon: 'mdi:briefcase-check', text: 'Alumni placed at IDFC, SBI, IOC, IIT-Guwahati' },
  { id: 'mentor', icon: 'mdi:human-greeting', text: 'Personal mentor for every student' },
];
```

### `TrustBar.jsx`
- Render badges with subtle entry animation (stagger 80 ms, fadeIn + 4px translateY)
- Marquee: use `framer-motion`'s `animate` on a flex row with duplicated content for seamless loop. 30s cycle desktop, 24s mobile. On hover, set `animate.pauseOnHover = true` (achieved via `useState` + animation control).
- Marquee items styled as 36 px height pills: cream surface, indigo icon, slate text, saffron border.
- Each marquee item has `tabIndex={0}` with `aria-label` for screen readers; full marquee container is `aria-hidden="true"` and we expose a `<ul role="list">` semantic alternative below for AT users (visually-hidden — `clip-path`).
- Right anchor: eyebrow `Estd. 2004` (saffron, 12 px, uppercase) + Plus Jakarta Sans 17 px / 600 caption "20+ Years of Academic Legacy"

### Section anchor
`id="trust"`, `role="region"`, `aria-label="Trust and credibility"`.

## Out of Scope
- Real logos (placeholder-only until stakeholder provides assets — the `img` field of each badge is the swap point)
- Click-through behavior on badges (badges are static — no links)

## Content / Copy
All canonical copy in the data file above. Do not introduce additional badges.

## Design Notes
- Badges: white surface, 1 px border `var(--ic-border)`, 16 px padding, 12 px gap between img and text
- Marquee fade-out gradient on both edges via inset white-to-transparent mask (40 px wide each)
- Reduce-motion: marquee becomes a static row of the first three items, all visible simultaneously, no animation
- Background `var(--ic-bg-soft)` with a 1 px top + bottom border `var(--ic-border)` for visual separation from Hero and About

## Placeholder Image Specs
- 3 badge emblems: 96 × 96 placeholders as listed above
- No other imagery in this section

## Acceptance Criteria
- [ ] Below hero, TrustBar renders three affiliation badges + marquee + Estd anchor in one row on desktop
- [ ] Marquee scrolls horizontally on a continuous loop without visual stutter
- [ ] Hovering the marquee pauses motion
- [ ] `prefers-reduced-motion: reduce` collapses the marquee to a static row
- [ ] On mobile, badges stack vertically and marquee remains visible (full width)
- [ ] No `Anvil` / `solar` strings remain
- [ ] Lighthouse a11y reports the section as a labelled region; no orphan icons (each has aria-label or is `aria-hidden`)

## Dependencies
- 04-color-palette-and-design-tokens.md
- 05-typography-system.md
- 09-hero-section.md

# 13 — Why Choose Icon Commerce College (USPs)

## Objective
A scannable USP grid that converts hesitant visitors. Each USP is a single icon + headline + 14-word supporting line, mapped 1:1 to a real differentiator named in the prospectus. End the section with a soft re-engagement CTA.

## Scope
- Create `src/components/sections/WhyIconSection/WhyIconSection.jsx`
- Create `src/components/sections/WhyIconSection/WhyIconSection.module.css`
- Create `src/components/sections/WhyIconSection/index.js`
- Create `src/data/whyIconData.js`

## Out of Scope
- Faculty showcase (prompt 14)
- Infrastructure (prompt 16)

## Requirements

### `src/data/whyIconData.js`
```js
export const WHY_ICON_USPS = [
  { id: 'gu-affiliation', icon: 'mdi:school', title: 'Gauhati University Affiliated', body: 'A permitted GU examination centre — every degree carries the weight of a recognised state university.' },
  { id: 'nep-2020', icon: 'mdi:certificate-outline', title: 'NEP 2020 Aligned Curriculum', body: 'Multidisciplinary, flexible 3 / 4-year structure with multiple exit points and skill-led learning.' },
  { id: 'qualified-faculty', icon: 'mdi:account-tie', title: 'Faculty You Can Rely On', body: '25+ Asst. Professors with Ph.D., M.Phil., NET, or SLET — many actively pursuing research.' },
  { id: 'mentor-system', icon: 'mdi:account-heart', title: 'Personal Mentor System', body: 'Every student is allotted a faculty mentor who tracks progress and supports academic growth.' },
  { id: 'smart-classrooms', icon: 'mdi:projector-screen-outline', title: 'Smart Classrooms', body: 'Projectors, computers, and interactive teaching — supplemented by online classes via Google Meet.' },
  { id: 'study-materials', icon: 'mdi:book-open-page-variant', title: 'College-Authored Study Materials', body: 'Faculty-prepared notes and guides — built around Gauhati University syllabi for every paper.' },
  { id: 'rich-library', icon: 'mdi:library-shelves', title: 'Well-Stocked Library', body: 'Diverse books, journals, and reference material curated for Commerce, Arts, BBA, and BCA learners.' },
  { id: 'computer-lab', icon: 'mdi:laptop', title: 'Equipped Computer Lab', body: 'A dedicated lab for BCA practicals and digital literacy across all undergraduate streams.' },
  { id: 'campus-life', icon: 'mdi:trophy-variant', title: 'Vibrant Campus Life', body: 'Annual College Week, ICON Shield cricket tournament, debates, quizzes, and the cooking competition.' },
  { id: 'scholarships', icon: 'mdi:medal-outline', title: 'Government Scholarships', body: 'Institute Nodal Officer support helps eligible students avail Government-approved scholarship schemes.' },
  { id: 'discipline', icon: 'mdi:shield-check', title: 'Safe & Disciplined Campus', body: 'Strict anti-ragging policy, dress code, and code of conduct — a respectful learning environment.' },
  { id: 'merit-track', icon: 'mdi:chart-arc', title: 'Track Record of Merit', body: 'Students consistently improve through their tenure — with several earning ranks in GU merit lists.' },
];
```

### `WhyIconSection.jsx`
- Section header:
  - Eyebrow: `WHY ICON COMMERCE COLLEGE`
  - H2: `Twelve Reasons Students & Parents Choose Us`
  - Subhead: `Two decades of teaching, mentoring, and shaping careers in Guwahati and the North-East.`
- Grid: 3 columns desktop, 2 columns tablet, 1 column mobile
- Each USP card:
  - Icon (32 px) in a 56 × 56 saffron-tinted rounded square (`background: rgba(217, 119, 6, 0.12); border-radius: 16px; color: var(--ic-secondary);`)
  - Title (Plus Jakarta Sans 17 px / 700)
  - Body (Inter 14 px / 400, color `var(--ic-text-secondary)`)
  - Cards have hairline border, white surface, 16 px radius, 24 px padding, hover shadow lift
- After the grid, a centred CTA bar:
  - H4: `Make Icon Commerce College your launchpad.`
  - `<Button color="cta" size="large">Apply Now</Button>` (`source: 'why_apply'`)
  - `<Button variant="outlined">Schedule a Campus Visit</Button>` (`source: 'why_visit'`)

### Animation
- Reveal stagger across cards (40 ms per card) when section enters viewport
- Optional: cards subtly tilt (-2deg → 0deg) on first reveal — guard with `useReducedMotion`

### Anchor
- Section root `id="why-icon"`, `role="region"`, `aria-label="Why choose Icon Commerce College"`

## Out of Scope
- USP icons sourced from a custom SVG set (we use Iconify only)
- Animated stat counters (already used in Hero/TrustBar — keep this section focused on differentiators)

## Content / Copy
All copy in the data file is canonical. Do not invent additional USPs beyond the 12 listed (each maps to a prospectus claim).

## Design Notes
- Background: alternating — this section sits on `var(--ic-bg-default)` since About uses cream
- Card hover: lift 4 px, shadow-sm → shadow-md, icon background saturates from `rgba(217, 119, 6, 0.12)` → `rgba(217, 119, 6, 0.20)`
- CTA bar: cream background (`var(--ic-bg-cream)`), 24 px radius, 32 px padding, top margin 64 px

## Placeholder Image Specs
- No imagery in this section — icons only (Iconify)

## Acceptance Criteria
- [ ] 12 USP cards render in a responsive grid (3/2/1 columns by breakpoint)
- [ ] Each card uses the Iconify icon ID specified in data
- [ ] CTA bar at the bottom triggers drawer with the correct `source` strings
- [ ] Section anchor `#why-icon` matches the Header nav anchor
- [ ] No Anvil / solar / kW strings
- [ ] Lighthouse a11y: each card is keyboard-focusable in tab order; icons have `aria-hidden="true"`; titles are `<h3>` for landmark hierarchy
- [ ] Cards hover-lift smoothly on desktop and have no jank on touch devices

## Dependencies
- 04-color-palette-and-design-tokens.md
- 05-typography-system.md
- 12-programs-section.md

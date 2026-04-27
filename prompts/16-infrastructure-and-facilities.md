# 16 — Infrastructure & Facilities Section

## Objective
Show, don't tell. Use a visual gallery of facility cards (Library, Computer Lab, Smart Classrooms, Canteen, Online Learning, Drinking Water) so visitors see the physical and digital infrastructure that supports their academic journey.

## Scope
- Create `src/components/sections/FacilitiesSection/FacilitiesSection.jsx`
- Create `src/components/sections/FacilitiesSection/FacilitiesSection.module.css`
- Create `src/components/sections/FacilitiesSection/FacilityCard.jsx`
- Create `src/components/sections/FacilitiesSection/FacilityCard.module.css`
- Create `src/components/sections/FacilitiesSection/index.js`
- Create `src/data/facilitiesData.js`

## Out of Scope
- Real images (placeholders only — track in `public/ASSETS_TODO.md`)
- Virtual tour (env flag `REACT_APP_ENABLE_VIRTUAL_TOUR` is `false`)

## Requirements

### `src/data/facilitiesData.js`
```js
export const FACILITIES = [
  {
    id: 'library',
    icon: 'mdi:library-shelves',
    title: 'Library',
    body: 'Diverse collection of books, journals, and reference material across Commerce, Arts, BBA, and BCA — open through the academic week to all students and faculty.',
    image: 'https://placehold.co/800x600?text=Library',
    bullets: ['Curated for GU syllabi', 'Reference + lending', 'Quiet reading area'],
  },
  {
    id: 'computer-lab',
    icon: 'mdi:laptop',
    title: 'Computer Lab',
    body: 'A dedicated lab built for BCA practicals and digital literacy workshops, supporting C / C++ / Java / Python / DBMS / Web tech sessions for every batch.',
    image: 'https://placehold.co/800x600?text=Computer+Lab',
    bullets: ['Modern PCs', 'Programming + DBMS practicals', 'Internet-enabled'],
  },
  {
    id: 'smart-classrooms',
    icon: 'mdi:projector-screen-outline',
    title: 'Smart Classrooms',
    body: 'Many of our classrooms are equipped with projectors and computers for interactive teaching — including PowerPoint-led discussions involving the students.',
    image: 'https://placehold.co/800x600?text=Smart+Classroom',
    bullets: ['Projector + audio', 'Interactive teaching', 'Mixed media support'],
  },
  {
    id: 'online-learning',
    icon: 'mdi:google-classroom',
    title: 'Online Classes',
    body: 'Beyond classroom hours, lectures and doubt-clearing happen via Google Meet and dedicated WhatsApp groups for every batch — connecting faculty and students continuously.',
    image: 'https://placehold.co/800x600?text=Online+Classes',
    bullets: ['Google Meet sessions', 'WhatsApp doubt clearing', 'Hybrid teaching'],
  },
  {
    id: 'canteen',
    icon: 'mdi:silverware-fork-knife',
    title: 'In-house Canteen',
    body: 'A hygienic, in-house canteen offers refreshments to staff and students at reasonable rates — a convenient stop between classes and study sessions.',
    image: 'https://placehold.co/800x600?text=Canteen',
    bullets: ['Hygienic kitchen', 'Affordable menu', 'Indoor seating'],
  },
  {
    id: 'drinking-water',
    icon: 'mdi:water-outline',
    title: 'Purified Drinking Water',
    body: 'Purified drinking water facility available across the campus — an everyday essential we take seriously.',
    image: 'https://placehold.co/800x600?text=Drinking+Water',
    bullets: ['Purified', 'Multi-floor access', 'Year-round availability'],
  },
];
```

### `FacilityCard.jsx`
- Card layout: image fills the top half (4:3 ratio, 16 px top-radius), content fills the bottom
- Top-right of image: a small saffron pill with the facility icon + name (e.g. `📚 Library`)
- Body: title (Plus Jakarta Sans 18 px / 700), description (Inter 14 px / 400), 3-bullet list with a saffron check-icon

### `FacilitiesSection.jsx`
- Section header:
  - Eyebrow: `INFRASTRUCTURE & FACILITIES`
  - H2: `Built for Learning, Inside and Outside the Classroom`
  - Subhead: `From a curated library to smart classrooms to online learning — every facility is designed to support how today's students actually study.`
- Grid: 3 columns desktop, 2 columns tablet, 1 column mobile
- Cards rendered from `FACILITIES`
- Below the grid, a callout strip with a campus-visit CTA:
  - Headline: `Want to see the campus in person?`
  - `<Button color="cta">Schedule a Campus Visit</Button>` (`source: 'facilities_visit'`)

### Anchor
- Section root: `id="facilities"`

## Out of Scope
- Real photography
- Virtual 360° tour
- Building floor plans

## Content / Copy
All canonical content in `facilitiesData.js`. Section header copy as listed.

## Design Notes
- Card: white surface, 16 px radius, `var(--ic-shadow-sm)` → `var(--ic-shadow-md)` on hover
- Image overlay pill: saffron bg `rgba(217, 119, 6, 0.92)`, white text, 12 px / 600 Plus Jakarta Sans, 999px radius, top-right offset 12 px
- Bullets: saffron check icon (16 px) + Inter 13 px / 500 slate text
- Background `var(--ic-bg-soft)` for visual rhythm vs prior sections

## Placeholder Image Specs
Card images (each 800 × 600):
- Library: `https://placehold.co/800x600?text=Library`
- Computer Lab: `https://placehold.co/800x600?text=Computer+Lab`
- Smart Classroom: `https://placehold.co/800x600?text=Smart+Classroom`
- Online Classes: `https://placehold.co/800x600?text=Online+Classes`
- Canteen: `https://placehold.co/800x600?text=Canteen`
- Drinking Water: `https://placehold.co/800x600?text=Drinking+Water`

## Acceptance Criteria
- [ ] 6 facility cards render in a responsive grid
- [ ] Each card has the correct title, body, 3 bullets, and image
- [ ] Saffron pill overlay on image shows the facility name
- [ ] Campus visit CTA opens drawer with `source === 'facilities_visit'`
- [ ] Section anchor `#facilities` available
- [ ] No Anvil / solar strings
- [ ] Mobile: cards stack and remain readable

## Dependencies
- 04-color-palette-and-design-tokens.md
- 05-typography-system.md
- 15-results-and-achievements.md

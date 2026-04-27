# 21 — Scholarships Section

## Objective
Reduce financial anxiety by surfacing the Government-approved scholarship facilitation that Icon Commerce College offers, with a clear path: who is eligible, what schemes exist (placeholders), and how to apply via the Institute Nodal Officer.

## Scope
- Create `src/components/sections/ScholarshipsSection/ScholarshipsSection.jsx`
- Create `src/components/sections/ScholarshipsSection/ScholarshipsSection.module.css`
- Create `src/components/sections/ScholarshipsSection/index.js`
- Create `src/data/scholarshipsData.js`

## Out of Scope
- Direct scholarship application form (scholarships are Government-driven; we facilitate, not administer)
- Scholarship-amount calculators

## Requirements

### `src/data/scholarshipsData.js`
```js
// Scheme names below are placeholders representing the broad categories the college can support.
// Stakeholder must replace placeholders with the exact list of schemes ICC currently helps with.
export const SCHOLARSHIP_CATEGORIES = [
  {
    id: 'central',
    icon: 'mdi:flag-variant',
    title: 'Central Government Schemes',
    schemes: [
      'National Scholarship Portal (NSP) schemes',
      'Post Matric Scholarship for SC / ST / OBC students',
      'Pragati / Saksham scholarships (where applicable)',
    ],
  },
  {
    id: 'state',
    icon: 'mdi:map',
    title: 'Assam State Schemes',
    schemes: [
      'Anundoram Borooah Scholarship (eligibility criteria apply)',
      'Pragyan Bharati Scholarship (free admission for eligible HS toppers)',
      'Other Assam Government scholarships notified each year',
    ],
  },
  {
    id: 'institutional',
    icon: 'mdi:school',
    title: 'Institutional Support',
    schemes: [
      'Personal counselling on scheme fit and eligibility',
      'Document checklist guidance from the Institute Nodal Officer',
      'Help in navigating online scholarship portals',
    ],
  },
];

export const ELIGIBILITY_CRITERIA = [
  'Family income within the limit notified by the respective scheme',
  'Caste / category certificate (where required by the scheme)',
  'Aadhaar-linked bank account for direct benefit transfer',
  'Income certificate from a competent authority',
  'Marksheets of the qualifying examination',
];

export const NODAL_OFFICER = {
  title: 'Institute Nodal Officer for Scholarships',
  body: 'Students can avail Government-approved scholarship schemes through Icon Commerce College. For more information and step-by-step support, please contact the Institute Nodal Officer for Scholarships at the college office.',
};
```

### `ScholarshipsSection.jsx`
- Section header:
  - Eyebrow: `SCHOLARSHIPS`
  - H2: `Don't Let Finances Hold You Back`
  - Subhead: `Icon Commerce College facilitates a range of Central, State, and institutional scholarship schemes — eligible students get hands-on guidance from our Nodal Officer.`
- **Three category cards** in a 3-column grid using `SCHOLARSHIP_CATEGORIES`. Each card:
  - Saffron tile with icon (32 px)
  - Title (h3)
  - List of schemes as a `<ul>` with saffron check icons
  - Hairline footer with `Talk to Nodal Officer →` linking to `#contact`
- **Eligibility callout strip** below the cards:
  - Heading: `Common Eligibility Documents`
  - 5-icon row from `ELIGIBILITY_CRITERIA` rendered as small pill-cards
- **Nodal Officer card:**
  - Saffron-bordered card; left side: large `mdi:account-tie` icon; right side: title + body from `NODAL_OFFICER`
  - CTA inside: `<Button color="cta">Get Scholarship Counselling</Button>` (`source: 'scholarships_counsellor'`)
- Disclaimer caption at the bottom: `Scheme availability, eligibility, and amounts are determined by the respective Government bodies and may change each academic year. Confirm details with the Nodal Officer.`

### Anchor
- Section root: `id="scholarships"`

## Out of Scope
- Real-time scheme deadlines (we can't keep them current; defer to Nodal Officer)
- Embedded NSP iframes

## Content / Copy
All canonical content in `scholarshipsData.js`. Treat the scheme names as confirmed-only-by-stakeholder placeholders — keep them generic but accurate. Nodal Officer copy is from prospectus, lightly polished.

## Design Notes
- Section background: `var(--ic-bg-cream)` for warmth
- Cards: white surface, 16 px radius, 24 px padding, 1 px border `var(--ic-border)`
- Eligibility pill-cards: small 28 px saffron icon + Inter 13 px / 500 label, cream fill, hairline border
- Nodal Officer card: saffron 2 px border, cream fill; layout 96 px icon | content
- Disclaimer: Inter 12 px / 400 secondary, italic

## Placeholder Image Specs
- No imagery — icons only

## Acceptance Criteria
- [ ] 3 category cards render with the three categories from data
- [ ] Eligibility row renders 5 pill-cards
- [ ] Nodal Officer card visible with the verbatim prospectus body
- [ ] Counselling CTA opens drawer with `source === 'scholarships_counsellor'`
- [ ] Section anchor `#scholarships` available (linked from FeesSection's secondary CTA)
- [ ] Disclaimer present at the bottom
- [ ] No Anvil / solar / kW strings
- [ ] Mobile: cards stack, lists remain readable

## Dependencies
- 04-color-palette-and-design-tokens.md
- 05-typography-system.md
- 20-fee-structure.md

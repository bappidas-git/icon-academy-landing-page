# 20 — Fee Structure Section

## Objective
Show fees transparently for each programme so neither student nor parent has to dig — admission fee + monthly tuition + application fee + a clear note about Gauhati University fees being separate. Pair the table with an EMI / scholarship hint and an Apply CTA on each row.

## Scope
- Create `src/components/sections/FeesSection/FeesSection.jsx`
- Create `src/components/sections/FeesSection/FeesSection.module.css`
- Create `src/components/sections/FeesSection/FeesTable.jsx`
- Create `src/components/sections/FeesSection/FeesTable.module.css`
- Create `src/components/sections/FeesSection/index.js`
- Create `src/data/feesData.js`

## Out of Scope
- EMI calculator (out of scope — boilerplate had one for solar, removed)
- Scholarship deep-dive (prompt 22)
- Online payment integration

## Requirements

### `src/data/feesData.js`
```js
// All amounts in INR. Source: Prospectus 2026.
export const FEE_ROWS = [
  {
    id: 'bcom',
    program: 'B.Com.',
    fullName: 'Bachelor of Commerce',
    admission: 10900,
    tuitionPerMonth: 1800,
    application: 300,
    notes: 'Includes Admission ₹5,500 · Library ₹800 · ID-Card / Entry Pass ₹100 · Miscellaneous ₹4,500',
    apply: { source: 'fees_bcom_apply', label: 'Apply for B.Com →' },
  },
  {
    id: 'ba',
    program: 'B.A.',
    fullName: 'Bachelor of Arts',
    admission: 10900,
    tuitionPerMonth: 1800,
    application: 300,
    notes: 'Includes Admission ₹5,500 · Library ₹800 · ID-Card / Entry Pass ₹100 · Miscellaneous ₹4,500',
    apply: { source: 'fees_ba_apply', label: 'Apply for B.A. →' },
  },
  {
    id: 'bba',
    program: 'BBA',
    fullName: 'Bachelor of Business Administration',
    admission: 11000,
    tuitionPerMonth: 2000,
    application: 300,
    notes: 'Includes Admission ₹5,500 · Library ₹900 · ID-Card / Entry Pass ₹100 · Miscellaneous ₹4,500',
    apply: { source: 'fees_bba_apply', label: 'Apply for BBA →' },
  },
  {
    id: 'bca',
    program: 'BCA',
    fullName: 'Bachelor of Computer Applications',
    admission: 11000,
    tuitionPerMonth: 2000,
    application: 300,
    notes: 'Includes Admission ₹5,500 · Library ₹900 · ID-Card / Entry Pass ₹100 · Miscellaneous ₹4,500',
    apply: { source: 'fees_bca_apply', label: 'Apply for BCA →' },
  },
];

export const FEE_DISCLAIMERS = [
  'Registration / Enrolment / University Examination / other fees payable to Gauhati University are subject to change and will be charged as per the regulations issued by the concerned authority.',
  'Fees once paid are not refundable under any circumstances.',
  'For the most up-to-date fee schedule, please contact the college office during admission counselling.',
];
```

### `FeesTable.jsx`
- Renders a responsive table using semantic `<table>` markup with sticky header on desktop:
  - Columns: Programme | Admission Fees (1st Sem) | Tuition / Month | Application Fee | Action
- On mobile, transform each row into a stacked card (using CSS Grid / `display: block` with labels visible)
- Last column action: small coral `<Button>` per row with `source` from data
- Below the table, render the disclaimers as `<ol>` in small caption text

### `FeesSection.jsx`
- Section header:
  - Eyebrow: `FEE STRUCTURE 2026`
  - H2: `Transparent Fees, No Surprises`
  - Subhead: `Affordable, transparent admission and tuition fees across all four UG programmes — only Gauhati University fees apply on top.`
- Below the table, three callout strips:
  1. `mdi:medal-outline` Saffron — `Government scholarships available — talk to our Institute Nodal Officer for eligibility.`
  2. `mdi:cash-multiple` Indigo — `Pay at college office or use the methods communicated during your admission counselling.`
  3. `mdi:phone-in-talk` Coral — `Need a break-down? Call our admissions team.`
- Bottom CTA: `<Button color="cta">Apply Now</Button>` + secondary `<Button variant="text">View Scholarships ↓</Button>` (anchor `#scholarships`)

### Anchor
- Section root: `id="fees"`

## Out of Scope
- EMI calculator
- Online fee payment

## Content / Copy
All canonical content in `feesData.js`. Disclaimers are quoted from the prospectus and **must** appear verbatim — they are legally important.

## Design Notes
- Table: cream zebra stripes (alternating rows: `var(--ic-bg-cream)` and `var(--ic-bg-default)`)
- Header row: indigo bg, white text, Plus Jakarta Sans 13 px / 700, uppercase, letter-spacing 0.06em
- Numeric cells: `.numeric` utility class (Plus Jakarta Sans, tabular-nums)
- Disclaimers: caption (Inter 12 px / 400 secondary), italic, 24 px top padding
- Callout strips: 12 px gap row, each is a 1-line pill-card with icon + text on indigo / cream / coral tints respectively

## Placeholder Image Specs
- None.

## Acceptance Criteria
- [ ] Table renders 4 rows (B.Com, B.A., BBA, BCA) with exact amounts: ₹10,900 / ₹10,900 / ₹11,000 / ₹11,000 (admission) and ₹1,800 / ₹1,800 / ₹2,000 / ₹2,000 (tuition/month) and ₹300 (application) for all
- [ ] Mobile renders fee rows as stacked cards (no horizontal scroll)
- [ ] Each row's Apply button opens drawer with the unique `source` from data
- [ ] All three legal disclaimers appear verbatim from the prospectus
- [ ] Section anchor `#fees` matches Header nav
- [ ] No Anvil / solar / kW strings
- [ ] Numbers use tabular-nums and look aligned (no jitter when scrolling)

## Dependencies
- 04-color-palette-and-design-tokens.md
- 05-typography-system.md
- 12-programs-section.md

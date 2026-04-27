# 12 — Programmes Offered Section

## Objective
Surface the four undergraduate programmes (B.Com, BBA, BCA, B.A.) as the most important conversion-driving block on the page. Each programme card communicates duration, eligibility, key skills/subjects, fee snapshot, and offers a per-programme Apply CTA so the lead source carries the programme intent.

## Scope
- Create `src/components/sections/ProgramsSection/ProgramsSection.jsx`
- Create `src/components/sections/ProgramsSection/ProgramsSection.module.css`
- Create `src/components/sections/ProgramsSection/ProgramCard.jsx`
- Create `src/components/sections/ProgramsSection/ProgramCard.module.css`
- Create `src/components/sections/ProgramsSection/index.js` (re-exports)
- Create `src/data/programsData.js` (single source of truth for programme content)

## Out of Scope
- Fee structure deep-dive (prompt 21)
- Admission process (prompt 20)
- FAQ (prompt 23)

## Requirements

### `src/data/programsData.js`
```js
export const PROGRAMS = [
  {
    id: 'bcom',
    code: 'B.Com.',
    name: 'Bachelor of Commerce',
    icon: 'mdi:chart-line',
    accentColor: 'var(--ic-primary)',
    tagline: 'Master the language of business — finance, accounting, taxation, and economics.',
    duration: '3 / 4 Years (6 / 8 Semesters)',
    affiliation: 'Gauhati University · NEP 2020',
    eligibility: 'HS (10+2) in Commerce, Science, or Arts under AHSEC or equivalent.',
    careerOutcomes: ['Chartered Accountancy', 'Banking & Finance', 'Taxation', 'Corporate Roles', 'Higher Studies (M.Com, MBA)'],
    coreSubjects: ['Financial Accounting', 'Business Statistics', 'Economics', 'Business Law', 'Cost Accounting', 'Income Tax', 'Auditing'],
    feeSnapshot: { admission: '₹10,900', tuition: '₹1,800 / month', application: '₹300' },
    apply: { source: 'program_bcom_apply' },
    image: 'https://placehold.co/600x400?text=B.Com+at+ICC',
  },
  {
    id: 'bba',
    code: 'BBA',
    name: 'Bachelor of Business Administration',
    icon: 'mdi:briefcase-variant',
    accentColor: 'var(--ic-secondary)',
    tagline: 'Build managerial muscle — strategy, marketing, HR, and entrepreneurship.',
    duration: '3 / 4 Years (6 / 8 Semesters)',
    affiliation: 'Gauhati University · NEP 2020',
    eligibility: 'HS (10+2) in Commerce, Science, or Arts under AHSEC or equivalent.',
    careerOutcomes: ['Management Trainee', 'Marketing & Sales', 'Operations', 'HR', 'MBA / Higher Studies', 'Entrepreneurship'],
    coreSubjects: ['Principles of Management', 'Marketing Management', 'HRM', 'Financial Management', 'Business Communication', 'Operations Management', 'Entrepreneurship'],
    feeSnapshot: { admission: '₹11,000', tuition: '₹2,000 / month', application: '₹300' },
    apply: { source: 'program_bba_apply' },
    image: 'https://placehold.co/600x400?text=BBA+at+ICC',
  },
  {
    id: 'bca',
    code: 'BCA',
    name: 'Bachelor of Computer Applications',
    icon: 'mdi:laptop',
    accentColor: 'var(--ic-cta)',
    tagline: 'Code your future — software, data, web, and modern application development.',
    duration: '3 / 4 Years (6 / 8 Semesters)',
    affiliation: 'Gauhati University · NEP 2020',
    eligibility: 'HS (10+2) in any stream; Maths or Computer Science at 10+2 preferred. Diploma (CSE / IT) from AICTE-recognised institutes also eligible.',
    careerOutcomes: ['Software Engineer', 'Web Developer', 'Data Analyst', 'System Administrator', 'MCA / Higher Studies'],
    coreSubjects: ['C / C++', 'Java', 'Data Structures', 'DBMS', 'Web Technology', 'Computer Networks', 'Operating Systems', 'Software Engineering'],
    feeSnapshot: { admission: '₹11,000', tuition: '₹2,000 / month', application: '₹300' },
    apply: { source: 'program_bca_apply' },
    image: 'https://placehold.co/600x400?text=BCA+at+ICC',
  },
  {
    id: 'ba',
    code: 'B.A.',
    name: 'Bachelor of Arts',
    icon: 'mdi:book-open-page-variant',
    accentColor: 'var(--ic-region-gauhatiUni)',
    tagline: 'Sharpen your humanities — think critically, communicate powerfully.',
    duration: '3 / 4 Years (6 / 8 Semesters)',
    affiliation: 'Gauhati University · NEP 2020',
    eligibility: 'HS (10+2) from any stream. Honours pathway requires minimum 45 % at HS.',
    careerOutcomes: ['Civil Services Aspirant', 'Teaching', 'Journalism & Media', 'Social Work', 'Higher Studies (MA, MSW)'],
    coreSubjects: ['English / Assamese', 'Political Science', 'Economics', 'Sociology', 'History', 'Education', 'Geography'],
    feeSnapshot: { admission: '₹10,900', tuition: '₹1,800 / month', application: '₹300' },
    apply: { source: 'program_ba_apply' },
    image: 'https://placehold.co/600x400?text=B.A.+at+ICC',
  },
];
```

### `ProgramCard.jsx`
- Props: `program` (one entry from `PROGRAMS`)
- Card layout (two regions): image header (4:3 ratio) on top + content body below
- Image header overlay: dark gradient bottom-left → top-right; programme code (e.g. `BBA`) in big Plus Jakarta Sans 28 px / 800 white; affiliation pill `Gauhati University · NEP 2020` in saffron at top-right
- Content body:
  - Title (h3): full programme name (Fraunces 22 px / 700)
  - Tagline (1 line, italic, slate-600)
  - Three meta rows with icon + label/value:
    - `mdi:clock-outline` Duration → `program.duration`
    - `mdi:school-outline` Eligibility → `program.eligibility` (truncate with `...` after 2 lines on mobile)
    - `mdi:cash` Fee from → `${program.feeSnapshot.admission} (1st sem) · ${program.feeSnapshot.tuition}`
  - Career-outcome chips (horizontal scroll on mobile, wrap on desktop): up to 5 chips, ghost style
  - Apply CTA: full-width coral `<Button color="cta">Apply for {program.code} →</Button>` with `source === program.apply.source`
  - Secondary link: `<Button variant="text" size="small">View core subjects ({program.coreSubjects.length})</Button>` opens an inline accordion (Framer Motion height animation) listing subjects
- Hover: card lifts 4 px (translateY) with shadow-md → shadow-lg transition

### `ProgramsSection.jsx`
- Layout: 2-column grid on desktop (1024–1280) → 4-column scroll-snap rail on wide desktop (>1280) optional, simpler is 2x2 grid
- 1-column stack on tablet/mobile
- Section header:
  - Eyebrow: `OUR PROGRAMMES`
  - H2: `Choose the Path That Fits Your Future`
  - Subhead: `Four NEP 2020 aligned undergraduate programmes — 3 / 4 years, affiliated to Gauhati University. Pick a track and apply via the Samarth portal (Code: 842).`
- Below the grid: a slim "Compare programmes" link that opens a comparison table modal (out of scope for this prompt — render a placeholder Button for now that calls `console.info('Comparison table TBD')`)

### Anchor & a11y
- Section root: `id="programs"`
- Each card is `<article aria-labelledby={`program-${id}-title`}>`

## Out of Scope
- Subject-by-subject syllabi (link to GU site if needed in a future iteration)
- Per-programme placement statistics

## Content / Copy
All canonical copy lives in `programsData.js`. Section header copy as listed above.

## Design Notes
- Card: white surface, 20 px radius, 1 px border `var(--ic-border)`, `var(--ic-shadow-sm)` default → `var(--ic-shadow-md)` on hover
- Accent stripe: 4 px tall band at top of image header in `program.accentColor` to colour-code each programme
- Career chips: cream bg, 12 px Inter / 500, border `var(--ic-border)`
- Fee row uses `.numeric` utility class so digits use Plus Jakarta Sans tabular-nums

## Placeholder Image Specs
- Card image: `https://placehold.co/600x400?text={Programme}+at+ICC` for each (already in data)
- Comparison-table placeholder modal needs no image yet

## Acceptance Criteria
- [ ] `ProgramsSection` renders 4 cards (B.Com, BBA, BCA, B.A.) with content from `programsData.js`
- [ ] Each card's Apply button opens drawer with the unique `source` (`program_bcom_apply`, etc.)
- [ ] Section anchor `id="programs"` works from header nav
- [ ] On mobile, cards stack and remain readable; chips horizontal-scroll
- [ ] Hovering a card on desktop lifts it and increases shadow
- [ ] No Anvil / solar / kW strings
- [ ] Subject accordion expands and collapses smoothly
- [ ] Cards have alt text on images that includes the programme name

## Dependencies
- 04-color-palette-and-design-tokens.md
- 05-typography-system.md
- 11-about-section.md

# 19 — Admission Process Section

## Objective
Convert intent into action by walking the visitor through the exact admission flow: register on Samarth → choose ICC + stream → verification → admission. Make Samarth Portal Code 842 unmissable, and pair the steps with clear documents-required information and a counsellor CTA.

## Scope
- Create `src/components/sections/AdmissionsSection/AdmissionsSection.jsx`
- Create `src/components/sections/AdmissionsSection/AdmissionsSection.module.css`
- Create `src/components/sections/AdmissionsSection/index.js`
- Create `src/data/admissionsData.js`

## Out of Scope
- The lead form itself (prompts 25–26)
- Fee structure (prompt 21)
- Eligibility per programme (already in `programsData.js`)

## Requirements

### `src/data/admissionsData.js`
```js
export const ADMISSION_STEPS = [
  {
    id: 'register-samarth',
    number: '01',
    icon: 'mdi:account-plus-outline',
    title: 'Register on Samarth Portal',
    body: 'Visit the Assam state admissions portal and register with your details. The portal handles centralised admissions for affiliated colleges across the state.',
    cta: { label: 'Open Samarth Portal →', href: 'https://assamadmission.samarth.ac.in/', external: true },
  },
  {
    id: 'choose-icc',
    number: '02',
    icon: 'mdi:school',
    title: 'Choose Icon Commerce College — Code 842',
    body: 'In the portal, select Icon Commerce College as your preferred college using College Code 842 and choose your preferred stream — B.Com, BBA, BCA, or B.A.',
  },
  {
    id: 'verify-docs',
    number: '03',
    icon: 'mdi:file-document-check-outline',
    title: 'Document Verification',
    body: 'Bring your originals to the college office for verification: HS (10+2) marksheet, Registration / Migration Certificate, Gap Certificate (if applicable).',
  },
  {
    id: 'confirm-admission',
    number: '04',
    icon: 'mdi:check-decagram',
    title: 'Confirm Admission (Online or Offline)',
    body: 'After verification, take admission either at the college office or via the online mode. Approved candidates receive a confirmation message on their registered mobile.',
  },
];

export const REQUIRED_DOCS = [
  { id: 'hs-marksheet', icon: 'mdi:file-document-outline', label: 'HS (10+2) Marksheet (Original)' },
  { id: 'registration', icon: 'mdi:certificate-outline', label: 'Registration / Migration Certificate' },
  { id: 'gap', icon: 'mdi:file-clock-outline', label: 'Gap Certificate (Affidavit) — if HS was passed earlier than the current year' },
  { id: 'photos', icon: 'mdi:account-box-outline', label: 'Recent passport-size photographs' },
  { id: 'id-proof', icon: 'mdi:card-account-details-outline', label: 'Government photo ID (Aadhaar / Voter / PAN)' },
];

export const KEY_DATES = [
  { id: 'apply-window', label: 'Application Window', value: 'See Samarth Portal — opens annually as per GU calendar' },
  { id: 'classes-start', label: 'Classes begin', value: '10:00 AM as per the routine, on the notified semester start date' },
];

export const ADMISSION_CTA = {
  helpline: 'Need help with the application? Talk to our admissions team.',
  buttonLabel: 'Get Free Admission Counselling',
  source: 'admissions_counsellor',
};
```

### `AdmissionsSection.jsx`
- Section header:
  - Eyebrow: `HOW TO APPLY`
  - H2: `Your Admission to Icon Commerce College — In Four Simple Steps`
  - Subhead: `Apply through the Samarth Portal under College Code 842. Our counsellors are with you at every step.`
- **Stepper visual** (4 steps): horizontal on desktop with a connecting saffron line, vertical on mobile with a left rail
  - Each step renders the number, icon, title, body
  - Step 01 has its own saffron CTA `Open Samarth Portal →` (opens `https://assamadmission.samarth.ac.in/` in a new tab with `rel="noopener noreferrer"`)
  - Add an inline highlight sub-card inside Step 02: a saffron-bordered card showing `College Code: 842` in extra-large Plus Jakarta Sans (40 px / 800) with copy-to-clipboard button
- **Required documents:** 5-icon grid below the stepper using `REQUIRED_DOCS`
- **Key dates strip:** 2-column row using `KEY_DATES`
- **Bottom CTA bar:** "Need help with the application? Talk to our admissions team." + `<Button color="cta">Get Free Admission Counselling</Button>` (`source: 'admissions_counsellor'`)

### Anchor
- Section root: `id="admissions"`

## Out of Scope
- Embedded Samarth iframe
- Programme-specific eligibility (already covered by Programs section cards)

## Content / Copy
All canonical content in `admissionsData.js`. Exact College Code: `842`. Exact portal URL: `https://assamadmission.samarth.ac.in/`. Both must appear verbatim.

## Design Notes
- Stepper line: 4 px saffron rule connecting step nodes; current/upcoming steps in saffron, completed steps in indigo (purely visual — no real state machine)
- Step number: Fraunces 56 px / 800 in saffron, set in a 96 × 96 cream tile with subtle inner shadow
- Code 842 badge: saffron 1 px border, cream bg, indigo number, copy-button at right
- Required docs: 5-up grid on desktop, 2-up grid on mobile; each tile is white surface, 1 px border, 16 px padding
- Background: `var(--ic-bg-default)` (alternates with cream campus-life section before)

## Placeholder Image Specs
- No imagery in this section (pure stepper / icons)

## Acceptance Criteria
- [ ] 4 admission steps render with correct numbers, icons, titles, bodies
- [ ] Step 01 has the Samarth portal external link (target=_blank rel=noopener noreferrer)
- [ ] Step 02 displays the prominent `College Code: 842` callout with a working copy-to-clipboard button (uses `navigator.clipboard.writeText('842')`)
- [ ] 5 required documents render in a grid with correct icons and labels
- [ ] Bottom CTA opens drawer with `source === 'admissions_counsellor'`
- [ ] Section anchor `#admissions` matches Header nav
- [ ] No Anvil / solar / kW strings
- [ ] Mobile: stepper rotates to vertical without breaking the connecting line

## Dependencies
- 04-color-palette-and-design-tokens.md
- 05-typography-system.md
- 18-student-testimonials.md

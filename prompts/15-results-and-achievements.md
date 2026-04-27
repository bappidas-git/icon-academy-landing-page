# 15 — Results & Achievements Section

## Objective
Surface academic credibility: Gauhati University merit-list mentions, high pass percentages, and notable alumni outcomes — all framed honestly using the prospectus claims, with placeholders for specific numbers that the stakeholder will plug in.

## Scope
- Create `src/components/sections/ResultsSection/ResultsSection.jsx`
- Create `src/components/sections/ResultsSection/ResultsSection.module.css`
- Create `src/components/sections/ResultsSection/index.js`
- Create `src/data/resultsData.js`

## Out of Scope
- Detailed year-on-year stats (data not available — placeholders only)
- Topper headshots / individual mark-sheet images

## Requirements

### `src/data/resultsData.js`
```js
export const STAT_HIGHLIGHTS = [
  { id: 'pass-rate', value: 95, suffix: '%', label: 'Average pass percentage', note: 'Across B.Com, BBA, BCA, B.A. (placeholder — confirm with college)' },
  { id: 'gu-ranks', value: 30, suffix: '+', label: 'GU merit-list ranks earned', note: 'Across batches since 2004 (placeholder — confirm)' },
  { id: 'alumni', value: 2500, suffix: '+', label: 'Alumni placed across India', note: 'Banking, IT, Government, Education, Entrepreneurship' },
  { id: 'years', value: 20, suffix: '+', label: 'Years of academic excellence', note: 'Established 2004 in Guwahati' },
];

export const NOTABLE_ALUMNI = [
  { id: 'bikash', name: 'Bikash Bezbaruah', role: 'Manager (Current Account)', org: 'IDFC First Bank Ltd.', stream: 'Arts', img: 'https://placehold.co/200x200?text=BB' },
  { id: 'pritam', name: 'Pritam Saha', role: 'Senior Business Development Manager', org: 'SBI General', stream: 'Commerce', img: 'https://placehold.co/200x200?text=PS' },
  { id: 'raghav', name: 'Raghav Sarma', role: 'Advocate', org: 'Gauhati High Court', stream: 'Arts', img: 'https://placehold.co/200x200?text=RS' },
  { id: 'devika', name: 'Devika Adhyapak', role: 'Administrative Assistant', org: 'IIT Guwahati', stream: 'BBA', img: 'https://placehold.co/200x200?text=DA' },
  { id: 'dishangka', name: 'Dishangka Jiten Pathak', role: 'Junior Accounts Assistant Trainee', org: 'Indian Oil Corporation Ltd.', stream: 'Commerce', img: 'https://placehold.co/200x200?text=DJP' },
  { id: 'banani', name: 'Banani Bhagawati', role: 'PGT (English)', org: 'Directorate of Secondary Education', stream: 'Arts', img: 'https://placehold.co/200x200?text=BBh' },
  { id: 'akash', name: 'Akash Paul', role: 'Asst. Professor (Commerce)', org: 'Biswanath College', stream: 'Commerce', img: 'https://placehold.co/200x200?text=AP' },
  { id: 'tulika', name: 'Tulika Devi', role: 'Graduate Teacher', org: 'Rangmahal High School, Kamrup', stream: 'Arts', img: 'https://placehold.co/200x200?text=TD' },
  { id: 'shahid', name: 'Shahid Ansari', role: 'Entrepreneur', org: 'Self-employed', stream: 'BBA', img: 'https://placehold.co/200x200?text=SA' },
];

export const ACHIEVEMENT_BADGES = [
  { id: 'gu-permitted-centre', icon: 'mdi:check-decagram', title: 'Permitted Examination Centre', body: 'Authorised by Gauhati University to conduct examinations under GU regulations.' },
  { id: 'nep-aligned', icon: 'mdi:certificate', title: 'NEP 2020 Aligned', body: 'All four undergraduate programmes follow the FYUGP framework as per NEP 2020.' },
  { id: 'samarth-842', icon: 'mdi:identifier', title: 'Samarth College Code 842', body: 'Listed under the Assam state admissions portal for transparent online admissions.' },
];
```

### `ResultsSection.jsx`
- Section header:
  - Eyebrow: `RESULTS & ACHIEVEMENTS`
  - H2: `A Track Record That Speaks for Itself`
  - Subhead: `From Gauhati University merit lists to graduates leading at IDFC, SBI, IOC, IIT Guwahati and the courts — Icon Commerce College builds careers that last.`
- **Stat strip:** 4-column row of `AnimatedCounter` cards with the numbers from `STAT_HIGHLIGHTS` (uses existing `AnimatedCounter` component); below each value, the label and a small saffron note
- **Achievement badges:** 3-column row beneath stats; each badge is icon + title + body in a subtle indigo outline card
- **Notable alumni:** horizontal scrollable rail on mobile, 3x3 grid on desktop. Each alumnus card: portrait + name + role + organisation + stream chip
- Bottom CTA bar: "Want to be the next ICC success story?" + Apply Now button (`source: 'results_apply'`)

### Anchor
- Section root: `id="results"`

## Out of Scope
- Year-by-year result tables (data unavailable)
- Real photographs of alumni

## Content / Copy
All canonical content in `resultsData.js`. Treat the `note` field on each stat as a "TBD — confirm with college" marker; the stakeholder will tune the numbers post-launch.

## Design Notes
- Stats: numbers in Plus Jakarta Sans 48 px / 800, indigo color, tabular-nums; label in Inter 14 px / 500 secondary text
- Achievement badges: outlined cards (1 px indigo border, no fill), 32 px icon in saffron, 12 px gap
- Alumni cards: portrait at top (1:1, 16 px radius), name in Plus Jakarta Sans 16 px / 700, role in Inter 13 px / 500, org in Inter 13 px / 400 secondary, stream as small saffron-tinted chip
- Background: `var(--ic-bg-default)` (alternates with cream sections)

## Placeholder Image Specs
- Alumni portraits: `https://placehold.co/200x200?text={Initials}` (already in data)

## Acceptance Criteria
- [ ] 4 animated counters render and count up when section enters viewport
- [ ] 3 achievement badges render with the indigo outline style
- [ ] 9 alumni cards render with names matching the prospectus spelling exactly
- [ ] Apply CTA opens drawer with `source === 'results_apply'`
- [ ] Section anchor `#results` accessible (verify Header nav can be updated to include this link if desired — optional)
- [ ] No Anvil / solar strings
- [ ] All numeric values are placeholders flagged via `note` field — stakeholder can edit data file post-launch

## Dependencies
- 04-color-palette-and-design-tokens.md
- 05-typography-system.md
- 14-faculty-showcase.md

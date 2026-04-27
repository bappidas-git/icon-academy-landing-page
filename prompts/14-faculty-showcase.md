# 14 — Faculty Showcase Section

## Objective
Showcase the academic strength of Icon Commerce College by featuring leadership and a representative sample of teaching faculty drawn directly from the prospectus. Build trust through visible credentials (Ph.D., M.Phil., NET, SLET, M.Com, MBA, MA, MCA, M.Sc.).

## Scope
- Create `src/components/sections/FacultySection/FacultySection.jsx`
- Create `src/components/sections/FacultySection/FacultySection.module.css`
- Create `src/components/sections/FacultySection/FacultyCard.jsx`
- Create `src/components/sections/FacultySection/FacultyCard.module.css`
- Create `src/components/sections/FacultySection/index.js`
- Create `src/data/facultyData.js`

## Out of Scope
- Per-faculty individual profile pages
- Photos of every faculty member (we use placeholders)

## Requirements

### `src/data/facultyData.js`
```js
export const LEADERSHIP = [
  { id: 'principal', name: 'Dr. Mandira Saha', role: 'Principal', credentials: 'M.Com., M.Phil., Ph.D.', img: 'https://placehold.co/300x300?text=Principal' },
  { id: 'rector', name: 'Sri Sawpon Dowerah', role: 'Rector', credentials: '', img: 'https://placehold.co/300x300?text=Rector' },
  { id: 'director-academic', name: 'Sri Rajib Kumar Das', role: 'Director (Academic)', credentials: '', img: 'https://placehold.co/300x300?text=Director+Academic' },
  { id: 'director', name: 'Smt. Dipanju Bora', role: 'Director', credentials: '', img: 'https://placehold.co/300x300?text=Director' },
  { id: 'academic-advisor', name: 'Dr. Nilanjan Bhattacharjee', role: 'Academic Advisor', credentials: 'M.Com., M.B.A., Ph.D.', img: 'https://placehold.co/300x300?text=Academic+Advisor' },
  { id: 'advisor', name: 'Sri Debasish Bora', role: 'Advisor', credentials: '', img: 'https://placehold.co/300x300?text=Advisor' },
  { id: 'president-gb', name: 'Smt. Dipali Bora', role: 'President, Governing Body', credentials: '', img: 'https://placehold.co/300x300?text=President+GB' },
];

export const FACULTY = [
  { id: 'mandira-sharma', name: 'Mandira Sharma', role: 'Asst. Prof.', credentials: 'M.Sc. (Gold Medalist), M.Phil.', dept: 'Mathematics', img: 'https://placehold.co/300x300?text=MS' },
  { id: 'tridib-kr-handique', name: 'Tridib Kr. Handique', role: 'Asst. Prof. · Examination In-Charge', credentials: 'M.C.A.', dept: 'Computer Applications', img: 'https://placehold.co/300x300?text=TKH' },
  { id: 'rikia-chakraborty', name: 'Rikia Chakraborty', role: 'Asst. Prof.', credentials: 'M.Com, PGDBM', dept: 'Commerce', img: 'https://placehold.co/300x300?text=RC' },
  { id: 'kongkona-bhagawati', name: 'Kongkona Bhagawati', role: 'Asst. Prof. · Coordinator B.C.A.', credentials: 'M.Com, M.B.A.', dept: 'Computer Applications', img: 'https://placehold.co/300x300?text=KB' },
  { id: 'rubi-das', name: 'Dr. Rubi Das', role: 'Asst. Prof. · Coordinator B.Com / BBA', credentials: 'Ph.D.', dept: 'Commerce / BBA', img: 'https://placehold.co/300x300?text=RD' },
  { id: 'loveleena-bora', name: 'Loveleena Bora', role: 'Asst. Prof.', credentials: 'M.A., B.Ed., NET', dept: 'Arts', img: 'https://placehold.co/300x300?text=LB' },
  { id: 'pallabi-dutta', name: 'Pallabi Dutta', role: 'Asst. Prof.', credentials: 'M.A.', dept: 'Arts', img: 'https://placehold.co/300x300?text=PD' },
  { id: 'urmimala-mahanta', name: 'Dr. Urmimala Mahanta', role: 'Asst. Prof.', credentials: 'M.Com., Ph.D.', dept: 'Commerce', img: 'https://placehold.co/300x300?text=UM' },
  { id: 'santashri-barman', name: 'Santashri Barman', role: 'Asst. Prof. · Coordinator B.A.', credentials: 'M.A., SLET', dept: 'Arts', img: 'https://placehold.co/300x300?text=SB' },
  { id: 'antara-gayan', name: 'Dr. Antara Gayan', role: 'Asst. Prof.', credentials: 'M.A., Ph.D.', dept: 'Arts', img: 'https://placehold.co/300x300?text=AG' },
  { id: 'badamon-shisha-shadap', name: 'Badamon Shisha Shadap', role: 'Asst. Prof.', credentials: 'M.A., NET', dept: 'Arts', img: 'https://placehold.co/300x300?text=BSS' },
  { id: 'dipannita-chakraborty', name: 'Dipannita Chakraborty', role: 'Asst. Prof.', credentials: 'M.A., LLB., B.Ed.', dept: 'Arts', img: 'https://placehold.co/300x300?text=DC' },
  { id: 'ruma-das', name: 'Ruma Das', role: 'Asst. Prof.', credentials: 'M.A., NET, B.Ed.', dept: 'Arts', img: 'https://placehold.co/300x300?text=RDS' },
  { id: 'sumit-kr-routh', name: 'Sumit Kr. Routh', role: 'Asst. Prof.', credentials: 'M.Com, NET', dept: 'Commerce', img: 'https://placehold.co/300x300?text=SKR' },
  { id: 'mridusmita-deka', name: 'Mridusmita Deka', role: 'Asst. Prof.', credentials: 'M.Sc.', dept: 'Sciences', img: 'https://placehold.co/300x300?text=MD' },
  { id: 'kankana-sharma', name: 'Kankana Sharma', role: 'Asst. Prof.', credentials: 'M.Com, B.Ed.', dept: 'Commerce', img: 'https://placehold.co/300x300?text=KS' },
  { id: 'nivedita-bayan-baishya', name: 'Nivedita Bayan Baishya', role: 'Asst. Prof.', credentials: 'M.A., B.Ed., M.Phil.', dept: 'Arts', img: 'https://placehold.co/300x300?text=NBB' },
  { id: 'urbimala-hazarika', name: 'Urbimala Hazarika', role: 'Asst. Prof.', credentials: 'M.Sc. (CS)', dept: 'Computer Applications', img: 'https://placehold.co/300x300?text=UH' },
  { id: 'saurav-bhattacharjee', name: 'Saurav Bhattacharjee', role: 'Asst. Prof.', credentials: 'M.Sc.', dept: 'Sciences', img: 'https://placehold.co/300x300?text=SBh' },
  { id: 'sadhna-kashyap', name: 'Sadhna Kashyap', role: 'Asst. Prof.', credentials: 'M.A, NET', dept: 'Arts', img: 'https://placehold.co/300x300?text=SK' },
  { id: 'rimon-borah', name: 'Rimon Borah', role: 'Asst. Prof.', credentials: 'M.A., SLET', dept: 'Arts', img: 'https://placehold.co/300x300?text=RB' },
  { id: 'rinkumani-baishya', name: 'Rinkumani Baishya', role: 'Asst. Prof.', credentials: 'M.A., M.Phil, SLET', dept: 'Arts', img: 'https://placehold.co/300x300?text=RBa' },
  { id: 'manisha-das', name: 'Manisha Das', role: 'Asst. Prof.', credentials: 'MCA, D.El.Ed', dept: 'Computer Applications', img: 'https://placehold.co/300x300?text=MDs' },
  { id: 'namrata-sharma', name: 'Namrata Sharma', role: 'Asst. Prof.', credentials: 'MA, SLET', dept: 'Arts', img: 'https://placehold.co/300x300?text=NS' },
  { id: 'sagarika-paul', name: 'Sagarika Paul', role: 'Asst. Prof.', credentials: 'MBA, NET', dept: 'BBA', img: 'https://placehold.co/300x300?text=SP' },
  { id: 'spondita-goswami', name: 'Spondita Goswami', role: 'Asst. Prof.', credentials: 'MA (PDCA)', dept: 'Arts', img: 'https://placehold.co/300x300?text=SG' },
  { id: 'manorama-thakur', name: 'Asst. Prof.', role: 'Asst. Prof.', credentials: 'MA, NET, SLET, GATE', dept: 'Arts', img: 'https://placehold.co/300x300?text=AP' },
];

export const GUEST_FACULTY = [
  { id: 'biswajit-bhattacharya', name: 'Biswajit Bhattacharya', role: 'Guest Faculty (Retd. Associate Prof. & Former HOD, Accountancy — Gauhati Commerce College)', credentials: '', dept: 'Commerce' },
  { id: 'nripendra-medhi', name: 'Dr. Nripendra Nath Medhi', role: 'Guest Faculty (Retd. Asst. Prof., Dept. of Finance)', credentials: 'M.Com, LLB, PhD', dept: 'Finance' },
];
```

### `FacultyCard.jsx`
- Square portrait at top (1:1, 24 px radius), name, role, credentials chip below
- Optional `dept` chip (saffron tint) at bottom
- Hover: subtle elevation + saffron underline of name

### `FacultySection.jsx`
- Section header:
  - Eyebrow: `MEET OUR EDUCATORS`
  - H2: `Faculty Who Mentor as Much as They Teach`
  - Subhead: `From Gauhati University to NET / SLET to Ph.D. — meet the team that brings two decades of teaching experience into every classroom.`
- **Leadership row** (6–7 cards): horizontal scroll-snap rail on mobile, 4-up grid on desktop with overflow as a small "+N more" pill if needed
- **Faculty grid:** filter pill row at top (`All`, `Commerce`, `BBA`, `BCA`, `Arts`, `Sciences`, `Computer Applications`) — controls a `useState` filter; cards fade-in/out via Framer Motion `AnimatePresence`
- Display first 8 cards by default with a "Show all 25+ faculty" expand toggle
- **Guest Faculty** strip below (compact 2-card row with description)
- Below the section: a soft CTA "Have a question for our faculty? Talk to a counsellor." → opens drawer with `source: 'faculty_counsellor'`

### Anchor
- Section root: `id="faculty"`

## Out of Scope
- Faculty bios / publication lists (cards stay short)
- Faculty photo replacement (drop placeholders for now; document path in `public/ASSETS_TODO.md`)

## Content / Copy
All canonical content in `facultyData.js`. Section header strings as listed.

## Design Notes
- Card: white surface, 1 px border, 16 px radius, 16 px padding, image fills top half edge-to-edge (no padding around image)
- Credentials chip: cream bg, indigo text, 11 px / 600 Plus Jakarta Sans, 999px radius
- Filter pills: indigo selected state (pill with white text), saffron hover
- Section background `var(--ic-bg-cream)` to alternate with prior section

## Placeholder Image Specs
- Each portrait: `https://placehold.co/300x300?text={Initials}` — the data already includes initials/short labels

## Acceptance Criteria
- [ ] Leadership row visible above the main faculty grid with the 7 named leaders from the prospectus
- [ ] Faculty grid renders 25+ faculty cards from data
- [ ] Department filter pills work (clicking `Commerce` filters to commerce faculty only)
- [ ] "Show all" toggle expands/collapses cards beyond the first 8
- [ ] Guest Faculty strip renders 2 named guest faculty
- [ ] Counsellor CTA opens drawer with `source === 'faculty_counsellor'`
- [ ] Section anchor `#faculty` matches Header nav
- [ ] No Anvil / solar / kW strings
- [ ] No console warnings about duplicate React keys
- [ ] All names exactly match the prospectus spelling

## Dependencies
- 04-color-palette-and-design-tokens.md
- 05-typography-system.md
- 13-why-choose-icon.md

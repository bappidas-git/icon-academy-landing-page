# 11 — About Icon Commerce College Section

## Objective
Tell the institution's story in a single scroll: who Icon Commerce College is, the year it was founded, its affiliation, its philosophy, and what makes it distinct — using authoritative copy drawn directly from the prospectus. End with a single CTA inviting the visitor to apply.

## Scope
- Create new file `src/components/sections/AboutSection/AboutSection.jsx`
- Create new file `src/components/sections/AboutSection/AboutSection.module.css`
- Create `src/components/sections/AboutSection/index.js` re-export

## Out of Scope
- Faculty showcase (prompt 14)
- Programmes (prompt 12)
- Infrastructure (prompt 16)

## Requirements

### Layout (desktop ≥1024 px — two-column 50/50)
- **Left column:** content stack
  - Eyebrow: `ABOUT THE COLLEGE`
  - H2: `A Legacy of Quality Higher Education in Guwahati`
  - Lead paragraph (lg copy): "Established in 2004, Icon Commerce College is one of the most promising educational institutions in Assam — affiliated to Gauhati University and committed to providing quality undergraduate education in Commerce, Arts, Business Administration, and Computer Applications."
  - Body paragraph: "We serve as a permitted Examination centre under Gauhati University and follow all GU regulations. Our learned faculty — many holding Ph.D., M.Phil., NET, and SLET qualifications — combine classroom teaching, smart-classroom technology, and personal mentorship to nurture every student's all-round development."
  - Signature card: small portrait placeholder + name `Dr. Mandira Saha` and role `Principal — Icon Commerce College` and credentials `M.Com., M.Phil., Ph.D.`
  - CTA row: `<Button color="cta">Apply for 2026 Admissions</Button>` (`source: 'about_apply'`) and `<Button variant="text">Read Principal's Message →</Button>` (anchors to `#leadership` if leadership section is added later; otherwise a no-op for now)
- **Right column:** visual stack
  - Hero photo placeholder: `https://placehold.co/640x720?text=Icon+Commerce+College+Building`
  - Three pillar cards floating to the right (or beneath visual on tablet):
    - Pillar 1 — `mdi:school-outline` "Academic Excellence" — "Faculty pursuing Ph.D., NET, SLET — high pass percentages, GU merit-list ranks."
    - Pillar 2 — `mdi:account-heart-outline` "Holistic Development" — "Annual College Week, sports, debate, cooking competition, and seminars."
    - Pillar 3 — `mdi:shield-check-outline` "Student-First Culture" — "Each faculty mentors a student group; strict anti-ragging, transparent governance."

### Layout (mobile <768 px — stacked)
- Order: eyebrow → H2 → lead paragraph → visual (16:9 cropped) → body paragraph → 3 pillar cards stacked → signature card → CTA buttons (full width)

### Background
- `var(--ic-bg-cream)` for visual rhythm vs the white sections above and below.

### Animation
- Reveal stagger on text column (50 ms steps), visual column fades in with 12 px translate
- Pillar cards animate in sequentially with 100 ms stagger when section enters viewport

### Anchor
- Section root: `id="about"`, `role="region"`, `aria-label="About Icon Commerce College"`

## Out of Scope
- Leadership grid (President, Advisor, Director, etc.) — could be a future section but is **not** part of this prompt; if the visitor clicks `Read Principal's Message →`, the link is a placeholder for now (`href="#leadership"` — no-op).

## Content / Copy

Canonical copy (do not paraphrase further):

**Eyebrow:** `ABOUT THE COLLEGE`

**H2:** `A Legacy of Quality Higher Education in Guwahati`

**Lead:** `Established in 2004, Icon Commerce College is one of the most promising educational institutions in Assam — affiliated to Gauhati University and committed to providing quality undergraduate education in Commerce, Arts, Business Administration, and Computer Applications.`

**Body:** `We serve as a permitted Examination centre under Gauhati University and follow all GU regulations. Our learned faculty — many holding Ph.D., M.Phil., NET, and SLET qualifications — combine classroom teaching, smart-classroom technology, and personal mentorship to nurture every student's all-round development.`

**Signature card:** Name `Dr. Mandira Saha` · Role `Principal — Icon Commerce College` · Credentials `M.Com., M.Phil., Ph.D.`

**Pillars:** (icon, title, copy) as listed above.

**Primary CTA:** `Apply for 2026 Admissions`
**Secondary CTA:** `Read Principal's Message`

## Design Notes
- Pillar cards: white surface, 16 px radius, `var(--ic-shadow-sm)`, 24 px padding; saffron icon (28 px); title in Plus Jakarta Sans 17 px / 700; copy in Inter 14 px / 400, color `var(--ic-text-secondary)`
- Signature card: indigo left border (4 px), portrait 56 × 56 circular placeholder, 12 px gap, name in Plus Jakarta Sans 16 px / 700, role/credentials in Inter 13 px / 500
- Section padding: 96 px top/bottom desktop, 64 px mobile
- Maximum content width: 1200 px container

## Placeholder Image Specs
- Building visual: `https://placehold.co/640x720?text=Icon+Commerce+College+Building`
- Principal portrait: `https://placehold.co/120x120?text=Principal`

## Acceptance Criteria
- [ ] `AboutSection` renders below TrustBar with the canonical copy verbatim
- [ ] Section has `id="about"` matching the Header nav anchor
- [ ] Three pillar cards visible and animated
- [ ] Primary CTA opens drawer with `source === 'about_apply'`
- [ ] Mobile view: single column, all elements visible without horizontal overflow
- [ ] No Anvil / solar / kW references
- [ ] Verbal review: copy reads in the third-person institutional voice; no first-person "I" / "my" remnants from the prospectus letters

## Dependencies
- 04-color-palette-and-design-tokens.md
- 05-typography-system.md
- 09-hero-section.md
- 10-trust-bar.md

# 22 — FAQ Section

## Objective
Address the highest-friction admission questions in a clean, accessible accordion. Pull questions from `seoConfig.faqs` (set in prompt 07) so the visible FAQ and the JSON-LD schema stay in sync. Includes a deflection link at the bottom for unanswered questions.

## Scope
- Refactor `src/components/sections/FAQSection/FAQSection.jsx`
- Refactor `src/components/sections/FAQSection/FAQSection.module.css`
- `src/data/faqData.js` — replace empty stub (cleared in prompt 01) with a thin re-export so other sections can `import { FAQS } from 'src/data/faqData'`. The actual content lives in `seoConfig.faqs` to avoid drift.

## Out of Scope
- Search-as-you-type filter (overkill for ~10 FAQs)
- Multi-category tabs (FAQs are short enough to remain in one column)

## Requirements

### `src/data/faqData.js`
```js
import seoConfig from '../config/seo';
export const FAQS = seoConfig.faqs;
```

### `FAQSection.jsx`
- Section header:
  - Eyebrow: `FREQUENTLY ASKED QUESTIONS`
  - H2: `Everything You Need to Know — Before You Apply`
  - Subhead: `Got more questions? Talk to our admissions team and we'll walk you through the process.`
- Accordion list using MUI `Accordion` (already imported by the codebase) — single-expand mode (only one open at a time)
- Each item:
  - Summary (collapsed): question text in Plus Jakarta Sans 16 px / 600, with a `+` / `−` indicator on the right (saffron) animating rotation on toggle
  - Details (expanded): answer text in Inter 15 px / 400, color `var(--ic-text-secondary)`
- First item open by default
- Below the accordion, a CTA bar:
  - Headline: `Still have questions?`
  - `<Button color="cta">Talk to Counsellor</Button>` (`source: 'faq_counsellor'`)
  - Secondary `<Button variant="outlined">WhatsApp Us</Button>` linking to `https://wa.me/{REACT_APP_WHATSAPP_NUMBER}` with prefilled message `Hi, I have a question about admissions to Icon Commerce College.`

### Anchor
- Section root: `id="faq"`

## Out of Scope
- Per-FAQ deep links (URL hash for each question)

## Content / Copy
Pulled live from `seoConfig.faqs` (10 items defined in prompt 07). Do **not** duplicate content here — read from the config file.

## Design Notes
- Accordion: white surface; each item separated by 1 px hairline; rounded outer card 16 px radius
- Hover on summary: subtle cream tint
- Open state: saffron left rule (4 px) for visual emphasis; smooth height animation 240 ms cubic-bezier(0.16, 1, 0.3, 1)
- WhatsApp CTA: WhatsApp green icon, indigo border for variant="outlined"
- Section background: `var(--ic-bg-default)`

## Placeholder Image Specs
- None (text-only)

## Acceptance Criteria
- [ ] FAQs render exactly the 10 items from `seoConfig.faqs` (no drift between visible content and JSON-LD)
- [ ] First FAQ open by default
- [ ] Accordion toggle works (only one open at a time)
- [ ] Counsellor CTA opens drawer with `source === 'faq_counsellor'`
- [ ] WhatsApp button opens `https://wa.me/{number}?text=...` correctly with URL-encoded message
- [ ] Section anchor `#faq` matches Header nav
- [ ] No Anvil / solar / kW strings
- [ ] Lighthouse a11y: each accordion item has `aria-expanded`, `aria-controls`; arrow keys navigate items (MUI default)

## Dependencies
- 04-color-palette-and-design-tokens.md
- 05-typography-system.md
- 07-seo-config-and-schemas.md

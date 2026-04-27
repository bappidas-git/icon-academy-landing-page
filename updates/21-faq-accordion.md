# 21 — FAQ Accordion Section

## Context
First-time solar buyers have the same 10 questions. Answering them above the footer kills last-mile objections and is a massive SEO win via FAQPage JSON-LD (wired in prompt 28). Regional references in the answers reinforce local relevance.

## Files to create
- `src/components/sections/FAQSection/FAQSection.jsx`
- `src/components/sections/FAQSection/FAQSection.module.css`
- `src/data/faqData.js`

## Files to modify
- `src/App.jsx` — lazy-mount after `InstallGallery`

## Implementation

### `faqData.js`
```js
export const faqData = [
  {
    q: 'How much can I really save on my electricity bill?',
    a: 'Most Anvil customers cut their bill by 70–90%. A 3 kW system in Assam or Odisha saves roughly ₹4,000–₹6,000 every month. Move the sliders in the Savings Calculator above to see your exact number.',
  },
  {
    q: 'What does a rooftop solar system cost after subsidy?',
    a: 'A 3 kW residential system is around ₹1,65,000 before subsidy. The PM Surya Ghar subsidy takes ₹78,000 off, bringing it to ~₹87,000. With a 5-year EMI at 7% your monthly payment is ~₹1,750 — typically less than your current bill.',
  },
  {
    q: 'How long does installation take?',
    a: '2–3 days for a typical on-grid home system. Hybrid systems with battery take 3–4 days. We handle all DISCOM paperwork (APDCL in Assam, Dept of Power in Nagaland, TPCODL/CESU in Odisha) in parallel — that adds 1–2 weeks but doesn\'t interrupt your power.',
  },
  {
    q: 'Will solar work during the monsoon in the Northeast?',
    a: 'Yes. Panels still generate 30–50% on cloudy days. Our system sizing for Assam and Nagaland assumes a conservative 4.6–4.8 peak sun hours to account for the monsoon months. Annual output still covers most of your consumption.',
  },
  {
    q: 'What if I lose power during a grid outage?',
    a: 'On-grid systems shut off for safety during outages. If power cuts are common where you live, go with a Hybrid system — the lithium battery keeps essentials (lights, fans, fridge, Wi-Fi) running automatically. Most Nagaland customers choose hybrid.',
  },
  {
    q: 'Who handles the PM Surya Ghar subsidy paperwork?',
    a: 'Anvil does. Your Saathi files the PM Surya Ghar application, DISCOM approval, net-meter installation, and subsidy disbursal. The ₹78,000 lands directly in your bank account after commissioning — no middlemen.',
  },
  {
    q: 'Is EMI really "zero down payment"?',
    a: 'Yes, for eligible homeowners. Our partner banks (SBI, HDFC, ICICI, Canara, Union) offer solar loans from 7% p.a. with tenors up to 10 years and no processing fee on Anvil referrals. The subsidy is adjusted in-loan, so your EMI is based on the post-subsidy cost.',
  },
  {
    q: 'What warranty do I get?',
    a: 'Panels: 25-year linear power output warranty from the OEM. Inverter: 10-year standard warranty (5 + 5). Workmanship: 5-year Anvil guarantee on mounting and wiring. Battery (if chosen): 10-year warranty on the lithium pack.',
  },
  {
    q: 'Can I install solar on a tin-shed or sloping roof?',
    a: 'Yes. We have mounting solutions for RCC (concrete), tin/metal sheet, tile, and sloping roofs. Your site visit confirms the mounting approach. In Nagaland we routinely install on hillside homes with custom tilt frames.',
  },
  {
    q: 'What happens after I submit this form?',
    a: 'Within 24 hours, an Anvil Saathi calls you to understand your bill and goals. They share a rough savings estimate on WhatsApp, schedule a free site visit, and walk you through the subsidy + finance options. No obligation — you decide if and when to proceed.',
  },
];
```

### `FAQSection.jsx`
Uses `Section` + `SectionHeading`.
- `id="faq"`, `variant="default"`, `size="lg"`.
- Eyebrow: `"Common questions"`.
- Title: `"Answered, honestly — no jargon."`
- Subtitle: `"Still unsure? Ask on WhatsApp: 1800 2020 001 — we reply within 10 minutes on weekdays."`

Implementation: MUI `Accordion` (already styled in `muiTheme.js`). Use `defaultExpanded={index === 0}` for the first FAQ so users see an answer instantly.

Each accordion:
- Summary: gold `+` icon on left rotating to `×` on expand, question text in `var(--fs-md)` weight 600.
- Details: answer in `var(--fs-base)` `line-height: 1.7`.
- Divider between items — `border-bottom: 1px solid var(--border-gray)`.

Below the accordion, a small help block with CTA:
```
Still have questions?  [Talk to an Anvil Saathi] (opens lead drawer, source='faq')
```

### `FAQSection.module.css`
- `.wrap { max-width: 820px; margin: 40px auto 0; }`
- `.item { border-bottom: 1px solid var(--border-gray); }`
- `.question { font-family: var(--font-heading); font-weight: 600; font-size: var(--fs-md); color: var(--ink); padding: 20px 0; }`
- `.answer { font-size: var(--fs-base); color: var(--ink-muted); line-height: 1.7; padding-bottom: 20px; }`
- `.plus { color: var(--accent-gold); font-size: 22px; margin-right: 12px; transition: transform 0.3s ease; }`
- `.plus.expanded { transform: rotate(45deg); }`
- `.bottomHelp { margin: 40px auto 0; max-width: 820px; padding: 20px 24px; background: var(--surface-muted); border-radius: 14px; display: flex; flex-wrap: wrap; gap: 16px; justify-content: space-between; align-items: center; }`
- `.bottomHelp .text { font-size: 0.9375rem; color: var(--ink); font-weight: 500; }`
- `.bottomHelp .btn { padding: 12px 20px; background: var(--cta-primary); color: var(--white); border: none; border-radius: 10px; font-weight: 700; cursor: pointer; box-shadow: var(--elev-cta); }`

## Acceptance criteria
- [ ] `#faq` shows all 10 Q&As in an accordion.
- [ ] First FAQ is pre-expanded.
- [ ] Clicking a question smoothly expands its answer and rotates the `+` to `×`.
- [ ] "Talk to an Anvil Saathi" button opens the lead drawer with `source: 'faq'`.
- [ ] Nav link "FAQs" in the header scrolls to `#faq`.
- [ ] Keyboard: Tab focuses questions, Enter/Space toggles.

## Do-not-touch
- Other sections.
- MUI Accordion theme overrides.

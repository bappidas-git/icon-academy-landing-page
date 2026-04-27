# 12 — Solutions Section: Content, Imagery & CTA Wiring

## Context
Prompt 11 built the empty structure. This prompt populates the four cards with final copy, iconography, and placeholder images so the section visually ships and every CTA passes a `solution` tag into the multi-step form.

## Files to modify
- `src/data/solutionsData.js` — fill all four entries

## Implementation

Replace the four stubs in `src/data/solutionsData.js` with these exact entries (in this order):

```js
export const solutionsData = [
  {
    id: 'residential-rooftop',
    accent: 'gold',
    icon: 'mdi:home-lightning-bolt',
    title: 'Residential Rooftop',
    tagline: 'For independent homes — the Anvil bestseller.',
    image: 'https://placehold.co/800x500?text=Independent+Home+Rooftop+Solar+Assam',
    solutionTag: 'Residential Rooftop',
    benefits: [
      'Cut bills by 70–90% with a 2–5 kW on-grid system',
      'PM Surya Ghar subsidy up to ₹78,000 included',
      'Installed in 2–3 days with zero dust inside your home',
    ],
  },
  {
    id: 'villa-large-home',
    accent: 'orange',
    icon: 'mdi:home-variant-outline',
    title: 'Villa & Large Home',
    tagline: 'For 5+ ACs, home offices, and premium homes.',
    image: 'https://placehold.co/800x500?text=Villa+Solar+Installation+Bhubaneswar',
    solutionTag: 'Villa / Large Home',
    benefits: [
      'Custom 5–10 kW design with premium Tier-1 panels',
      'Optional lithium battery for power-cut-proof comfort',
      'Dedicated Saathi + quarterly performance reports',
    ],
  },
  {
    id: 'housing-society',
    accent: 'purple',
    icon: 'mdi:office-building-outline',
    title: 'Housing Society',
    tagline: 'Common-area solar for RWAs & apartments.',
    image: 'https://placehold.co/800x500?text=Housing+Society+Rooftop+Solar+Odisha',
    solutionTag: 'Housing Society',
    benefits: [
      'Lift, pump, lighting — run them on sunshine',
      'RESCO / Capex / Opex models available',
      'Typical payback 3–4 years, then free power for 20+',
    ],
  },
  {
    id: 'solar-battery',
    accent: 'green',
    icon: 'mdi:battery-charging-high',
    title: 'Solar + Battery Backup',
    tagline: 'For areas with frequent power cuts.',
    image: 'https://placehold.co/800x500?text=Hybrid+Solar+With+Battery+Backup+Nagaland',
    solutionTag: 'Solar + Battery (Hybrid)',
    benefits: [
      'Lights, fans, fridge, Wi-Fi stay on during outages',
      '4–10 kWh lithium battery, 10-year warranty',
      'Seamless auto-switchover — no UPS needed',
    ],
  },
];
```

### Image note
All four URLs use `https://placehold.co/800x500` matching the card's 16:10 aspect ratio. Each has a descriptive `?text=` label so when you review visually you can tell which card is which. **I will swap these for real hi-res photos manually after the rebuild** — do not replace with real image URLs in this prompt.

### CTA verification
Each card's CTA already fires `openLeadDrawer({ source: 'solutions', solution: solution.solutionTag })` (set up in prompt 11). Verify:
- Opening a Villa card's CTA, completing all 3 steps, then checking GTM dataLayer — the submission event should show `service_interest: "Villa / Large Home"`.
- Similarly, the webhook body's `service_interest` field carries the tag.

### Subtle hover enhancement
Add to `SolutionCard.module.css`:
```css
.card:hover .ctaBtn { box-shadow: 0 12px 32px rgba(255,107,53,0.5); }
```

## Acceptance criteria
- [ ] All four cards display final titles, taglines, benefits, and image placeholders at 16:10.
- [ ] CTA button labels dynamically read `"Get my {title} quote →"` (e.g. `"Get my Residential Rooftop quote →"`).
- [ ] Opening the drawer from the Villa card and submitting results in a webhook payload with `service_interest` = `"Villa / Large Home"`.
- [ ] Four accents render distinctly: gold, orange, purple, green.
- [ ] Cards are fully keyboard accessible — CTA buttons are `<button>`, focus visible.

## Do-not-touch
- Card structural styles from prompt 11.
- `MultiStepLeadForm`, `ModalContext`, `LeadFormDrawer`.
- Tokens, Section primitives.

# 17 — Savings & Government Subsidies (Assam / Nagaland / Odisha)

## Context
The highest-converting content on any solar landing page is **local money**: exactly how much a homeowner in Guwahati or Bhubaneswar can save, which central and state subsidies apply, and what the out-of-pocket figure looks like after all incentives. This section is where abstract "90% savings" becomes a concrete ₹78,000 cheque.

## Files to create
- `src/components/sections/SubsidiesSection/SubsidiesSection.jsx`
- `src/components/sections/SubsidiesSection/SubsidiesSection.module.css`
- `src/data/subsidiesData.js`

## Files to modify
- `src/App.jsx` — lazy-mount after `HowItWorksSection`

## Implementation

### `subsidiesData.js`
```js
export const centralSubsidy = {
  name: 'PM Surya Ghar: Muft Bijli Yojana',
  tagline: 'India\'s flagship rooftop solar subsidy — launched Feb 2024.',
  image: 'https://placehold.co/800x400?text=PM+Surya+Ghar+Subsidy+Scheme',
  tiers: [
    { size: '1 kW',  subsidy: '₹30,000' },
    { size: '2 kW',  subsidy: '₹60,000' },
    { size: '3 kW+', subsidy: '₹78,000 (cap)' },
  ],
  highlights: [
    'Direct bank transfer to your account',
    'Applies to every homeowner across India',
    'Anvil files the paperwork for you — free',
  ],
};

export const stateData = [
  {
    state: 'Assam',
    accent: 'var(--region-assam)',
    icon: 'mdi:map-marker',
    image: 'https://placehold.co/600x360?text=Assam+Rooftop+Solar+Savings',
    avgBill: '₹ 3,500 – ₹ 6,000',
    avgSavings: '₹ 42,000 – ₹ 72,000 / year',
    subsidyNote: 'Full central subsidy (₹78,000) applies. APDCL net-metering supported.',
    climate: 'Ample sun 8–9 months. Monsoon adjusted for in our design.',
  },
  {
    state: 'Nagaland',
    accent: 'var(--region-nagaland)',
    icon: 'mdi:map-marker',
    image: 'https://placehold.co/600x360?text=Nagaland+Solar+Installation+Savings',
    avgBill: '₹ 2,500 – ₹ 5,000',
    avgSavings: '₹ 30,000 – ₹ 60,000 / year',
    subsidyNote: 'Central subsidy ₹78,000 plus Dept. of Power Nagaland net-metering.',
    climate: 'Hill terrain considered in mounting. Reliable supply = hybrid optional.',
  },
  {
    state: 'Odisha (Bhubaneswar)',
    accent: 'var(--region-odisha)',
    icon: 'mdi:map-marker',
    image: 'https://placehold.co/600x360?text=Bhubaneswar+Solar+Installation+Odisha',
    avgBill: '₹ 4,000 – ₹ 9,000',
    avgSavings: '₹ 48,000 – ₹ 1,08,000 / year',
    subsidyNote: 'Central subsidy ₹78,000. TPCODL / OEM DISCOMs support net-metering.',
    climate: 'Strong sun year-round. Payback often under 4 years.',
  },
];
```

### `SubsidiesSection.jsx`
Uses `Section` + `SectionHeading`.
- `id="subsidies"`, `variant="default"`, `size="lg"`.
- Eyebrow: `"Subsidies & savings"`.
- Title: `"₹78,000 off your system — before you even see the sun."`
- Subtitle: `"Every Anvil install unlocks the PM Surya Ghar central subsidy plus local DISCOM net-metering. Here's exactly what that means in your state."`

Layout:
- **Top: central subsidy showcase card** (full-width).
  - Left: image + "PM Surya Ghar" gold badge.
  - Right: tagline, three tiers in a mini table, 3 highlight bullets with green checkmarks, and a CTA button `See my exact subsidy →` that opens the drawer (`source: 'subsidy_card'`).
- **Below: 3-up state grid** (responsive: 1 col mobile, 3 col desktop at ≥1024px).
  - Each card: image top, state name + pin icon row, `Avg. monthly bill`, `Avg. annual savings` (in savings-green), `Subsidies` note, `Local note`, tiny CTA `Calculate for my {state} home →` that scrolls to `#calculator` AND calls `setState(state)` on `useSolarCalculator`.

### How to pass state to the calculator
Expose `useSolarCalculator` via a small context (or a ref on window for simplicity): add `window.__anvilCalc = { setState };` inside `CalculatorSection.jsx`'s effect, and call it from the state card click. If a context feels cleaner, wrap the section in a tiny `CalculatorContext.Provider` — pick the simplest path that works without refactoring.

### `SubsidiesSection.module.css`
- `.central { background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-dark-alt) 100%); color: var(--white); border-radius: 20px; padding: 32px; display: grid; grid-template-columns: 1fr; gap: 24px; margin-top: 32px; box-shadow: var(--elev-3); }`
- `@media (min-width: 900px) { .central { grid-template-columns: 1fr 1.3fr; align-items: center; } }`
- `.centralImage { width: 100%; aspect-ratio: 2 / 1; object-fit: cover; border-radius: 14px; }`
- `.badge { display: inline-block; background: var(--accent-gold); color: var(--primary-dark); font-weight: 700; font-size: 0.75rem; letter-spacing: 0.08em; padding: 4px 12px; border-radius: 999px; text-transform: uppercase; margin-bottom: 8px; }`
- `.tiers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 16px 0; }`
- `.tier { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 12px; text-align: center; }`
- `.tierSize { font-size: 0.75rem; opacity: 0.8; }`
- `.tierValue { font-family: var(--font-heading); font-weight: 800; font-size: 1.125rem; color: var(--accent-gold); margin-top: 4px; }`
- `.stateGrid { display: grid; grid-template-columns: 1fr; gap: 20px; margin-top: 32px; }`
- `@media (min-width: 1024px) { .stateGrid { grid-template-columns: repeat(3, 1fr); gap: 24px; } }`
- `.stateCard { background: var(--white); border-radius: 16px; overflow: hidden; box-shadow: var(--elev-2); border-top: 4px solid; display: flex; flex-direction: column; }` (border-top color set inline via `style={{ borderTopColor: state.accent }}`)
- `.stateCard:hover { box-shadow: var(--elev-3); transform: translateY(-4px); }`
- `.stateImage { width: 100%; aspect-ratio: 5 / 3; object-fit: cover; }`
- `.stateBody { padding: 20px; display: flex; flex-direction: column; gap: 10px; flex: 1; }`
- `.stateName { font-family: var(--font-heading); font-weight: 700; font-size: var(--fs-lg); color: var(--ink); display: flex; align-items: center; gap: 6px; }`
- `.stateRow { display: flex; justify-content: space-between; font-size: 0.875rem; color: var(--ink-muted); }`
- `.stateRow strong { color: var(--savings-green-dark); }`
- `.stateNote { font-size: 0.8125rem; color: var(--ink-muted); line-height: 1.5; padding-top: 8px; border-top: 1px solid var(--border-gray); }`
- `.stateCta { margin-top: auto; align-self: flex-start; background: transparent; border: 1.5px solid var(--ink); color: var(--ink); padding: 8px 14px; border-radius: 999px; font-size: 0.8125rem; font-weight: 600; cursor: pointer; }`
- `.stateCta:hover { background: var(--ink); color: var(--white); }`

## Acceptance criteria
- [ ] `#subsidies` section renders central subsidy card + three state cards.
- [ ] Tier table shows ₹30,000 / ₹60,000 / ₹78,000 clearly.
- [ ] State cards have distinct accent borders (green/orange/purple).
- [ ] `See my exact subsidy →` opens the lead drawer.
- [ ] Clicking `Calculate for my Assam home →` smooth-scrolls to `#calculator` AND updates the calculator's state select to "Assam".
- [ ] Nav link "Subsidies & EMI" scrolls to this section.

## Do-not-touch
- Calculator core logic.
- Other sections.

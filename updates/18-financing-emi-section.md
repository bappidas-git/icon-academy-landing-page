# 18 — Financing & EMI Options

## Context
Even after the ₹78,000 subsidy, a 3 kW system costs ~₹1.2 lakh out of pocket. Most Indian homeowners can't pay that up front. A visible financing section with three EMI tiers, a tiny monthly-payment widget, and partner bank logos converts the "too expensive" objection in 10 seconds.

## Files to create
- `src/components/sections/FinancingSection/FinancingSection.jsx`
- `src/components/sections/FinancingSection/FinancingSection.module.css`
- `src/data/financingData.js`

## Files to modify
- `src/App.jsx` — lazy-mount after `SubsidiesSection`

## Implementation

### `financingData.js`
```js
export const financingTiers = [
  {
    label: 'Short term',
    duration: '3 years',
    interestRate: '7.5% p.a.',
    emiFor3kw: '₹ 3,700 / month',
    bestFor: 'Homeowners who want to finish payments fast and maximise lifetime savings.',
    icon: 'mdi:flash',
    accent: 'var(--cta-primary)',
  },
  {
    label: 'Most popular',
    duration: '5 years',
    interestRate: '7% p.a.',
    emiFor3kw: '₹ 2,400 / month',
    bestFor: 'EMI roughly equals your current electricity bill — power bill becomes loan bill.',
    icon: 'mdi:star',
    accent: 'var(--accent-gold)',
    featured: true,
  },
  {
    label: 'Lowest EMI',
    duration: '10 years',
    interestRate: '7.5% p.a.',
    emiFor3kw: '₹ 1,450 / month',
    bestFor: 'Smallest monthly outgo. Still cash-positive from day one thanks to savings.',
    icon: 'mdi:trending-down',
    accent: 'var(--savings-green)',
  },
];

export const financingPartners = [
  { name: 'SBI', logo: 'https://placehold.co/160x60?text=SBI' },
  { name: 'HDFC Bank', logo: 'https://placehold.co/160x60?text=HDFC+Bank' },
  { name: 'ICICI Bank', logo: 'https://placehold.co/160x60?text=ICICI+Bank' },
  { name: 'Canara Bank', logo: 'https://placehold.co/160x60?text=Canara+Bank' },
  { name: 'Union Bank', logo: 'https://placehold.co/160x60?text=Union+Bank' },
];
```

### `FinancingSection.jsx`
Uses `Section` + `SectionHeading`. Merges visually with `SubsidiesSection`.
- `id="financing"` (no separate nav slot — header "Subsidies & EMI" covers both, so this can sit directly below Subsidies without a new anchor, but include the id in case).
- `variant="muted"`, `size="lg"`.
- Eyebrow: `"Financing made simple"`.
- Title: `"Pay monthly. Start saving immediately."`
- Subtitle: `"Zero-down-payment EMIs from our partner banks. Most Anvil customers' EMI is less than their old electricity bill."`

Layout:
- **Tiers row**: 1/1/3 responsive grid of three cards with the middle one scaled larger (`transform: scale(1.04)`) and wearing a "Most Popular" gold ribbon.
  - Each card: icon, label uppercase, big duration (e.g. `5 years`), interest rate, EMI amount (large, bold, in `var(--ink)`), "Best for" line, CTA button `Apply with this plan →`.
  - CTA fires `openLeadDrawer({ source: 'financing', solution: tier.duration + ' EMI' })`.
- **Partner bar**: six greyscale logo placeholders in a row. On hover: colour + slight lift.
  - Above it, small centred text: `Bank partners — choose the one you already bank with.`

### `FinancingSection.module.css`
- `.tierGrid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 32px; align-items: stretch; }`
- `@media (min-width: 900px) { .tierGrid { grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: center; } }`
- `.tier { background: var(--white); border-radius: 16px; padding: 24px; box-shadow: var(--elev-2); border: 1px solid var(--border-gray); display: flex; flex-direction: column; gap: 10px; position: relative; transition: transform 0.3s ease, box-shadow 0.3s ease; }`
- `.tier.featured { border: 2px solid var(--accent-gold); box-shadow: var(--elev-3); transform: scale(1); }`
- `@media (min-width: 900px) { .tier.featured { transform: scale(1.04); } }`
- `.tier:hover { box-shadow: var(--elev-3); transform: translateY(-3px); }`
- `.ribbon { position: absolute; top: -12px; right: 16px; background: var(--accent-gold); color: var(--primary-dark); font-weight: 700; font-size: 0.75rem; padding: 4px 10px; border-radius: 999px; letter-spacing: 0.05em; text-transform: uppercase; box-shadow: 0 4px 12px rgba(255,184,0,0.4); }`
- `.tierIcon { font-size: 28px; }`
- `.tierLabel { font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-muted); font-weight: 700; }`
- `.tierDuration { font-family: var(--font-heading); font-weight: 800; font-size: var(--fs-2xl); color: var(--ink); line-height: 1; }`
- `.tierRate { font-size: 0.875rem; color: var(--ink-muted); }`
- `.tierEmi { font-family: var(--font-heading); font-weight: 700; font-size: var(--fs-xl); color: var(--savings-green-dark); margin-top: 8px; padding: 8px 12px; background: var(--savings-green-bg); border-radius: 10px; align-self: flex-start; }`
- `.tierBestFor { font-size: 0.875rem; color: var(--ink-muted); line-height: 1.55; min-height: 52px; }`
- `.tierCta { margin-top: auto; padding: 12px 16px; background: var(--cta-primary); color: var(--white); border: none; border-radius: 10px; font-weight: 700; font-size: 0.9375rem; cursor: pointer; box-shadow: var(--elev-cta); transition: all 0.2s ease; }`
- `.tierCta:hover { background: var(--cta-primary-hover); transform: translateY(-2px); }`
- `.partnerBar { margin-top: 48px; text-align: center; }`
- `.partnerCaption { font-size: 0.8125rem; color: var(--ink-muted); margin-bottom: 16px; }`
- `.partnerRow { display: flex; flex-wrap: wrap; gap: 24px; justify-content: center; align-items: center; filter: grayscale(1) opacity(0.7); }`
- `.partnerLogo { height: 40px; width: auto; transition: filter 0.2s ease, transform 0.2s ease; }`
- `.partnerRow img:hover { filter: none; transform: translateY(-2px); }`

### EMI note
Below the partner bar, small print:
```
EMI examples use a ₹1,20,000 post-subsidy loan for a 3 kW system at quoted rates. Actual EMI may vary based on your credit profile. No processing fee with Anvil referrals.
```

## Acceptance criteria
- [ ] Three EMI tier cards render; middle one has gold "Most Popular" ribbon and is visually larger on desktop.
- [ ] Each tier CTA opens the drawer with `source: 'financing'` and a `solution` reflecting the tier duration.
- [ ] Partner bar renders 5 placeholder logos that desaturate until hover.
- [ ] Small print below the partner bar is present and legible.
- [ ] On mobile, tiers stack and the featured card loses the scale transform but keeps the gold border + ribbon.

## Do-not-touch
- Subsidies section above.
- `MultiStepLeadForm`, `ModalContext`.

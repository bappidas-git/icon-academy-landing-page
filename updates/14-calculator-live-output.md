# 14 — Solar Calculator: Live Output Panel

## Context
The output panel is the magic. It must feel instant — three numbers jump to life as you drag the slider. Monthly savings, system size, payback years, and CO₂ offset create an emotional "I need this" moment. Accurate enough to be trustworthy, simple enough to not require disclaimers that scare homeowners.

## Files to create
- `src/components/sections/CalculatorSection/CalculatorOutput.jsx`
- `src/components/sections/CalculatorSection/CalculatorOutput.module.css`
- `src/utils/solarMath.js` — pure math functions, unit-testable

## Files to modify
- `src/hooks/useSolarCalculator.js` — fill `outputs` by calling `solarMath`
- `src/components/sections/CalculatorSection/CalculatorSection.jsx` — replace `outputPlaceholder` div with `<CalculatorOutput />`

## Implementation

### `solarMath.js`
Pure functions, no React. Average tariff ₹8/kWh, panel CUF factor, etc.

```js
export const AVG_TARIFF_INR_PER_KWH = 8;
export const CUF = 0.18;                  // India-average capacity utilisation
export const CO2_PER_KWH_KG = 0.82;
export const PANEL_COST_INR_PER_KW = 55000;   // installed, pre-subsidy
export const SUBSIDY_PER_KW = 15000;
export const SUBSIDY_CAP_INR = 78000;

// Approx usable roof area per kW (sq ft). 1 kW ≈ 80 sq ft.
export const SQFT_PER_KW = 80;

export function calculateSystem({ monthlyBill, roofArea, sunHours }) {
  // Required system kW based on bill: monthlyBillKwh = monthlyBill / tariff
  const monthlyKwhConsumed = monthlyBill / AVG_TARIFF_INR_PER_KWH;
  const dailyKwhConsumed = monthlyKwhConsumed / 30;
  const billKwSize = dailyKwhConsumed / sunHours / CUF; // rough sizing

  // Roof cap
  const roofKwSize = roofArea / SQFT_PER_KW;

  const systemKw = Math.max(1, Math.min(billKwSize, roofKwSize));
  const roundedKw = Math.round(systemKw * 10) / 10;

  const dailyGeneration = roundedKw * sunHours;          // kWh / day
  const annualGeneration = dailyGeneration * 365;        // kWh / year
  const monthlyGeneration = annualGeneration / 12;

  const monthlySavings = Math.min(monthlyBill, monthlyGeneration * AVG_TARIFF_INR_PER_KWH);
  const annualSavings = monthlySavings * 12;

  const grossCost = roundedKw * PANEL_COST_INR_PER_KW;
  const subsidy = Math.min(SUBSIDY_CAP_INR, roundedKw * SUBSIDY_PER_KW);
  const netCost = grossCost - subsidy;
  const paybackYears = annualSavings > 0 ? netCost / annualSavings : 0;

  const co2PerYearKg = annualGeneration * CO2_PER_KWH_KG;
  const savings25yr = annualSavings * 25 * 0.9;  // 10% derate + slight tariff adj

  return {
    systemKw: roundedKw,
    monthlySavings: Math.round(monthlySavings),
    annualSavings: Math.round(annualSavings),
    paybackYears: Math.round(paybackYears * 10) / 10,
    co2PerYearKg: Math.round(co2PerYearKg),
    grossCost: Math.round(grossCost),
    subsidy: Math.round(subsidy),
    netCost: Math.round(netCost),
    savings25yr: Math.round(savings25yr),
  };
}
```

### `useSolarCalculator.js` update
Import `calculateSystem` from `src/utils/solarMath.js`. Memo-compute `outputs` whenever `inputs` change:
```js
const outputs = useMemo(
  () => calculateSystem({
    monthlyBill: inputs.monthlyBill,
    roofArea: inputs.roofArea,
    sunHours: inputs.sunHours,
  }),
  [inputs.monthlyBill, inputs.roofArea, inputs.sunHours]
);
```

### `CalculatorOutput.jsx`
Props: `{ outputs, inputs, onGetQuote }`.

Layout — a dark navy card that feels like an "energy dashboard":

**Top row — primary metric (large):**
- Headline: `You could save`
- Number: `₹ {monthlySavings.toLocaleString('en-IN')}` in huge gold text (60px desktop, 40px mobile)
- Sub-line: `every month — ₹{(savings25yr / 100000).toFixed(1)} lakh over 25 years`
- Small caption: `Based on ₹8/unit. Actual savings depend on your DISCOM tariff.`

**Mid-grid — 2×2 secondary metrics:**
| Metric | Value | Icon |
|---|---|---|
| System size | `{systemKw} kW` | `mdi:solar-power` |
| Payback period | `{paybackYears} years` | `mdi:cash-clock` |
| Net cost after subsidy | `₹{netCost.toLocaleString('en-IN')}` | `mdi:tag-outline` |
| CO₂ offset/year | `{(co2PerYearKg / 1000).toFixed(1)} tonnes` | `mdi:leaf` |

Each metric in a glass-morphism card: `background: rgba(255,255,255,0.07)`, `border: 1px solid rgba(255,255,255,0.12)`, `border-radius: 12px`, `padding: 14px`.

**Bottom CTA:** a full-width orange button labelled `Get My Detailed Quote →`. On click fires `onGetQuote(snapshot)` where `snapshot = { monthlyBill, state, systemKw, monthlySavings, paybackYears }`. Prompt 15 wires this CTA to the multi-step form.

Use Framer Motion `animate` on the primary number — whenever `monthlySavings` changes, briefly pulse the text (scale 1 → 1.06 → 1) so the output feels alive.

### `CalculatorOutput.module.css`
- `.panel { background: var(--calc-output-bg); color: var(--white); border-radius: 20px; padding: 32px 28px; position: relative; overflow: hidden; }`
- `.panel::before { content: ''; position: absolute; top: -40px; right: -40px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(255,184,0,0.25), transparent); border-radius: 50%; pointer-events: none; }`
- `.primaryLabel { font-size: 0.875rem; opacity: 0.75; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; }`
- `.primaryValue { font-family: var(--font-heading); font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 800; color: var(--accent-gold); line-height: 1; margin: 8px 0; }`
- `.primarySub { font-size: 1rem; opacity: 0.9; }`
- `.primaryCaption { font-size: 0.75rem; opacity: 0.55; margin-top: 6px; }`
- `.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 24px 0; }`
- `.metric { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 14px; }`
- `.metricIcon { color: var(--accent-gold); font-size: 22px; margin-bottom: 8px; }`
- `.metricLabel { font-size: 0.75rem; opacity: 0.75; }`
- `.metricValue { font-weight: 700; font-size: 1.125rem; margin-top: 2px; }`
- `.cta { width: 100%; padding: 16px; background: var(--cta-primary); color: var(--white); border: none; border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer; box-shadow: var(--elev-cta); display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s ease; }`
- `.cta:hover { background: var(--cta-primary-hover); transform: translateY(-2px); }`

### `CalculatorSection.jsx` update
Replace the output placeholder with:
```jsx
<CalculatorOutput
  outputs={outputs}
  inputs={inputs}
  onGetQuote={(snapshot) => openLeadDrawer({
    source: 'calculator',
    calculatorSnapshot: snapshot,
  })}
/>
```

## Acceptance criteria
- [ ] Output panel updates every metric as sliders move — no debounce delay perceptible.
- [ ] Primary savings number pulses when it changes.
- [ ] At monthly bill = ₹4,000 / roof 400 / Assam: outputs are sane (systemKw ≈ 1.5–2, payback ≈ 3–5 yrs).
- [ ] Output uses Indian number formatting (commas at lakhs/crores).
- [ ] Mobile (≤640px): metrics stack to 1 column if needed; primary value remains readable.
- [ ] CTA `Get My Detailed Quote →` opens the drawer (empty calculatorSnapshot wiring is fine for this prompt; prompt 15 uses the snapshot inside the form).

## Do-not-touch
- Slider styling / inputs.
- `MultiStepLeadForm`.
- Other sections.

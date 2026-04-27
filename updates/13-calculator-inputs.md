# 13 — Solar Calculator: Inputs

## Context
The calculator is the other conversion engine. Unlike the parent site's calculator (which requires 6 dropdown selections before computing), ours is **instant and interactive**. Three sliders + one dropdown, all debounced, feeding a live output panel (built in prompt 14). This prompt is inputs only.

## Files to create
- `src/components/sections/CalculatorSection/CalculatorSection.jsx` — section shell + layout split
- `src/components/sections/CalculatorSection/CalculatorSection.module.css`
- `src/components/sections/CalculatorSection/CalculatorInputs.jsx`
- `src/components/sections/CalculatorSection/CalculatorInputs.module.css`
- `src/hooks/useSolarCalculator.js` — exposes input state, output values, resetters

## Files to modify
- `src/App.jsx` — lazy-mount `CalculatorSection` after `SolutionsSection`

## Implementation

### `useSolarCalculator.js`
Encapsulates all calculator state. Exports default hook that returns:
```js
{
  inputs: {
    monthlyBill: 4000,       // ₹ (slider range 500–25000)
    roofArea: 400,           // sq ft (slider range 100–3000)
    state: 'Assam',          // default to Assam
    sunHours: 5.2,           // derived from state (see below), not directly edited
  },
  setters: {
    setMonthlyBill(n),
    setRoofArea(n),
    setState(s),
    reset(),
  },
  outputs: { /* filled by prompt 14 — leave as {} for this prompt */ }
}
```

State → sun hours mapping (used for output later, but declared here):
```js
const SUN_HOURS_BY_STATE = {
  Assam: 4.8,
  Nagaland: 4.6,
  Odisha: 5.4,
  Delhi: 5.5,
  Karnataka: 5.6,
  'Tamil Nadu': 5.7,
  Maharashtra: 5.5,
  Gujarat: 5.8,
  Rajasthan: 6.0,
  'West Bengal': 4.9,
  Default: 5.2,
};
```
Derive `sunHours` inside the hook whenever `state` changes.

### `CalculatorInputs.jsx`
Props: `{ inputs, setters }`.

Three input groups, each with:
- Label row: left-aligned label + right-aligned current value (e.g. `"₹ 4,200"`).
- MUI `Slider` with `valueLabelDisplay="auto"`.
- Tick marks at sensible increments (4–5 marks, not too many).

1. **Monthly electricity bill**
   - Label: `Monthly bill`
   - Range 500–25000, step 100, marks at 1k, 5k, 10k, 20k.
   - Display value formatted `new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)`.

2. **Rooftop area**
   - Label: `Roof area (sq ft)`
   - Range 100–3000, step 25, marks at 200, 500, 1000, 2000.
   - Display value: `${value.toLocaleString('en-IN')} sq ft`.
   - Tiny hint text below: `Not sure? Most Indian homes have 300–600 sq ft of usable roof.`

3. **State selector**
   - Label: `Your state`
   - MUI `Select` (not slider). Options: Assam, Nagaland, Odisha, Delhi, Karnataka, Tamil Nadu, Maharashtra, Gujarat, Rajasthan, West Bengal, Other.
   - Below selected value: a small gold pill showing `☀️ ~{sunHours} peak sun hours/day` (derived).

Group styling: each group in a rounded card with padding 20px, `background: var(--white)`, `border: 1px solid var(--border-gray)`, `box-shadow: var(--elev-1)`.

### `CalculatorSection.jsx`
Uses `Section` primitive.
- `id="calculator"`, `variant="default"`, `size="lg"`.
- `SectionHeading` eyebrow: `"Solar Savings Calculator"`, title: `"See how much you'll save — in under 10 seconds."`, subtitle: `"Move the sliders. We'll show your savings, system size, and payback period live."`.
- Below heading, a 2-column layout (1 column on mobile):
  - Left column: `<CalculatorInputs .../>` (from this prompt)
  - Right column: `<CalculatorOutput .../>` — **placeholder in this prompt**, a `<div>` rendering current input values. Prompt 14 replaces this.
- Mount `useSolarCalculator` at section level and pass `inputs`/`setters` down.

### `CalculatorSection.module.css`
- `.grid { display: grid; grid-template-columns: 1fr; gap: 24px; margin-top: 32px; align-items: start; }`
- `@media (min-width: 1024px) { .grid { grid-template-columns: 1.1fr 1fr; gap: 40px; } }`
- `.outputPlaceholder { min-height: 400px; background: var(--primary-dark); color: var(--white); border-radius: 16px; padding: 32px; display: flex; align-items: center; justify-content: center; }`

### `App.jsx`
Lazy import and mount `CalculatorSection` **after** `SolutionsSection`. Add to `useIdlePreload` array.

## Acceptance criteria
- [ ] `#calculator` section renders with two columns (inputs left, placeholder right).
- [ ] Moving the Monthly Bill slider updates the live currency display next to the label.
- [ ] Moving the Roof Area slider updates the sq-ft label.
- [ ] Changing the state updates the "☀️ peak sun hours" pill under the state select.
- [ ] On mobile, columns stack (inputs on top, output below).
- [ ] Nav link "See My Savings" → `#calculator` now scrolls correctly.
- [ ] `useSolarCalculator` hook usable in isolation (no DOM dependencies).

## Do-not-touch
- `MultiStepLeadForm`, `SolutionsSection`.
- Existing sections / sliders / MUI theme.
- Tokens.

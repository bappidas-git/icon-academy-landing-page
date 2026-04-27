# 07 — Multi-Step Lead Form: Step 2 (Property, Roof & System)

## Context
Step 2 narrows the technical fit: property type (sizes the business model), roof type (feasibility), and system preference (on-grid vs hybrid). Three one-tap choices; no free text. This is the step that lets the sales team arrive with an accurate first quote.

## Files to create
- `src/components/common/MultiStepLeadForm/steps/Step2Property.jsx`
- `src/components/common/MultiStepLeadForm/steps/Step2Property.module.css`

## Files to modify
- `src/components/common/MultiStepLeadForm/MultiStepLeadForm.jsx` — replace step 2 placeholder

## Implementation

### `Step2Property.jsx`
Props: `{ data, errors, onChange }`.

Three stacked sub-questions, each using the same `.chipGrid` + `.chip` pattern as step 1 for visual consistency (reuse the classes — import `step1Styles from '../steps/Step1BillRegion.module.css'` OR copy the two classes into this file's CSS module; pick whichever keeps the file self-contained).

**Question 1 — Property type**
- Heading: `What kind of home is it?`
- Options (2×2 grid on all sizes ≤ a breakpoint, 1×4 on desktop):
  - `{ value: 'Independent Home', label: 'Independent Home', icon: 'mdi:home-outline' }`
  - `{ value: 'Villa', label: 'Villa / Large Home', icon: 'mdi:home-variant-outline' }`
  - `{ value: 'Housing Society', label: 'Housing Society', icon: 'mdi:office-building-outline' }`
  - `{ value: 'Commercial', label: 'Shop / Commercial', icon: 'mdi:store-outline' }`

**Question 2 — Roof type**
- Heading: `What's your roof like?`
- Subtitle: `Not sure? Just pick the closest — an Anvil Saathi will confirm during the free site visit.`
- Options:
  - `{ value: 'Concrete', label: 'Concrete / RCC', icon: 'mdi:wall' }`
  - `{ value: 'Tin-shed', label: 'Tin / Metal Sheet', icon: 'mdi:home-roof' }`
  - `{ value: 'Mixed', label: 'Mixed', icon: 'mdi:layers-outline' }`
  - `{ value: 'Not sure', label: 'Not sure', icon: 'mdi:help-circle-outline' }`

**Question 3 — System preference**
- Heading: `Do you want battery backup?`
- Subtitle: `Power cuts in your area? Hybrid keeps your lights on. On-grid is cheaper if supply is steady.`
- Option cards (1×3 on desktop, 1×3 stacked on mobile), each slightly taller with a short benefit line:
  ```
  { value: 'On-Grid',
    label: 'On-Grid',
    benefit: 'Lowest cost. Export power, earn credits.',
    icon: 'mdi:transmission-tower' }

  { value: 'Hybrid (battery backup)',
    label: 'Hybrid with Battery',
    benefit: 'Power-cut proof. Runs essentials during outages.',
    icon: 'mdi:battery-charging-high' }

  { value: 'Not sure',
    label: 'Help me decide',
    benefit: 'Saathi will recommend based on your area.',
    icon: 'mdi:lightbulb-on-outline' }
  ```

### `Step2Property.module.css`
- `.question { margin-bottom: 24px; }`
- `.question h4 { font-family: var(--font-heading); font-weight: 700; font-size: var(--fs-lg); color: var(--ink); margin-bottom: 4px; }`
- `.hint { font-size: 0.825rem; color: var(--ink-muted); margin-bottom: 10px; line-height: 1.5; }`
- `.chipGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }`
- `@media (min-width: 640px) { .chipGrid.four { grid-template-columns: repeat(4, 1fr); } }`
- `.chipGrid.three { grid-template-columns: 1fr; }`  (system preference cards stack)
- `@media (min-width: 640px) { .chipGrid.three { grid-template-columns: repeat(3, 1fr); } }`
- `.chip` — same styling as step 1 chip (padding 14px, border, icon top, label below)
- `.chipBig` — same as chip but `padding: 18px 16px; text-align: left; min-height: 120px;`  with `.chipBig .benefit { font-size: 0.75rem; color: var(--ink-muted); font-weight: 400; margin-top: 6px; }`
- `.chip.selected, .chipBig.selected` — `border: 2px solid var(--accent-gold); background: var(--region-pill-bg); box-shadow: var(--elev-2);`

### Error helper text
If `errors.propertyType` / `errors.roofType` / `errors.systemPreference` set, show `"Please select an option"` under that group.

### Wire-in
In `MultiStepLeadForm.jsx`, replace the step 2 placeholder with:
```jsx
{state.step === 2 && (
  <Step2Property data={state.data} errors={state.errors} onChange={actions.setField} />
)}
```
Set `StepShell` title = `"Quick question 2 of 3"`, subtitle = `"A little about your property so we get the design right."`.

## Acceptance criteria
- [ ] Step 2 renders three grouped questions with exact copy above.
- [ ] Chips & cards visually match step 1's style (same radius, border, selected treatment).
- [ ] Back button returns to step 1 with previously selected values preserved.
- [ ] Clicking Continue without all three answered shows three helper-text errors.
- [ ] When all answered, Continue advances to step 3.
- [ ] Step indicator moves step 1 to "complete" (green check) and step 2 to "active" gold.

## Do-not-touch
- Step 1, Step 3 placeholder, form machine hook.
- `UnifiedLeadForm.jsx`.
- Tokens, Section primitives.

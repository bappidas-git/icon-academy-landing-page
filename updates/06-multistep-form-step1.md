# 06 — Multi-Step Lead Form: Step 1 (Bill & Region)

## Context
Step 1 qualifies on the two questions that matter most: how big is the electricity bill (savings potential) and which state the homeowner is in (subsidy + installation logistics). Both are answered as visual chip selections — no typing, one tap per field. Homeowners advance in under 10 seconds.

## Files to create
- `src/components/common/MultiStepLeadForm/steps/Step1BillRegion.jsx`
- `src/components/common/MultiStepLeadForm/steps/Step1BillRegion.module.css`

## Files to modify
- `src/components/common/MultiStepLeadForm/MultiStepLeadForm.jsx` — replace step 1 placeholder with the real component

## Implementation

### `Step1BillRegion.jsx`
Props: `{ data, errors, onChange }` (receives values and setter from the form machine).

Layout (top to bottom):

**Question 1 — Monthly electricity bill**
- Heading: `Your current monthly electricity bill`
- Subtitle: `An honest number helps us size your system right. No judgement.`
- Chip grid (2×2 on mobile, 1×4 on ≥640px):
  - `{ value: '<2000', label: 'Under ₹2,000', icon: 'mdi:flash-outline' }`
  - `{ value: '2000-5000', label: '₹2,000 – ₹5,000', icon: 'mdi:flash' }`
  - `{ value: '5000-10000', label: '₹5,000 – ₹10,000', icon: 'mdi:flash-triangle' }`
  - `{ value: '10000+', label: 'Over ₹10,000', icon: 'mdi:flash-alert' }`
- Each chip is a `<button type="button" role="radio">` with an icon above the label. Selected state: border `2px solid var(--accent-gold)`, background `var(--region-pill-bg)`, checkmark top-right.

**Question 2 — State**
- Heading: `Where will we install?`
- Subtitle: `We're serving homeowners across Northeast India and Bhubaneswar right now.`
- Pill row (wrap on overflow):
  - `{ value: 'Assam', label: 'Assam', accent: 'var(--region-assam)' }`
  - `{ value: 'Nagaland', label: 'Nagaland', accent: 'var(--region-nagaland)' }`
  - `{ value: 'Odisha', label: 'Bhubaneswar / Odisha', accent: 'var(--region-odisha)' }`
  - `{ value: 'Other', label: 'Other (all India)', accent: 'var(--text-gray)' }`
- Each pill: left border 4px solid `accent`, rest neutral. Selected state adds `background: accent-10%`.

### Error handling
If `errors.monthlyBill` or `errors.state` is set, render a red helper text under the relevant group: `"Please select an option"`.

### `Step1BillRegion.module.css`
- `.question { margin-bottom: 28px; }`
- `.question h4 { font-family: var(--font-heading); font-weight: 700; font-size: var(--fs-lg); color: var(--ink); margin-bottom: 4px; }`
- `.question p.hint { font-size: 0.875rem; color: var(--ink-muted); margin-bottom: 12px; }`
- `.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }`
- `@media (min-width: 640px) { .grid { grid-template-columns: repeat(4, 1fr); } }`
- `.chip` — `display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 16px 12px; border: 1.5px solid var(--border-gray); border-radius: 12px; background: var(--white); cursor: pointer; transition: all 0.2s ease; font-weight: 600; color: var(--ink); font-size: 0.875rem;`
- `.chip:hover { border-color: var(--accent-gold); transform: translateY(-2px); }`
- `.chip.selected { border: 2px solid var(--accent-gold); background: var(--region-pill-bg); box-shadow: var(--elev-2); }`
- `.pillRow { display: flex; flex-wrap: wrap; gap: 8px; }`
- `.pill` — `display: inline-flex; align-items: center; gap: 6px; padding: 10px 16px; border: 1.5px solid var(--border-gray); border-left-width: 4px; border-radius: 10px; background: var(--white); cursor: pointer; font-weight: 500; font-size: 0.875rem;`
- `.pill.selected { box-shadow: var(--elev-2); font-weight: 700; }`

### Wire-in
In `MultiStepLeadForm.jsx`, replace the step-1 placeholder:
```jsx
{state.step === 1 && (
  <Step1BillRegion
    data={state.data}
    errors={state.errors}
    onChange={actions.setField}
  />
)}
```
Set `StepShell` title = `"Quick question 1 of 3"` and subtitle = `"Tell us about your bill and location."` when on step 1.

## Acceptance criteria
- [ ] Step 1 renders two questions with the exact copy above.
- [ ] Clicking a chip / pill sets the value (visible selected state).
- [ ] Clicking `Continue` with both answered advances to step 2 placeholder.
- [ ] Clicking `Continue` with either unanswered shows inline errors and stays on step 1.
- [ ] Step indicator shows step 1 filled in gold.
- [ ] Keyboard: Tab moves between chips/pills; Space/Enter selects.
- [ ] Mobile layout (≤640px): 2×2 bill grid, region pills wrap cleanly.

## Do-not-touch
- Steps 2/3 placeholders.
- Submission flow.
- Tokens, Section primitives, Header, Hero — all as left after prompts 01–04.

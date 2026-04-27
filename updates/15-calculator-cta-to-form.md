# 15 — Calculator CTA → Pre-Filled Multi-Step Form

## Context
The calculator's live output is useless unless the CTA continues the emotional momentum into a lead submission. This prompt makes the "Get My Detailed Quote" button open the multi-step form with the calculator's inputs already baked in — the user sees a context chip at the top of step 3 ("Your plan: ₹4,000 bill · Assam · 2 kW · ₹96,000 savings/yr"), re-assuring them we captured everything.

## Files to modify
- `src/components/common/MultiStepLeadForm/MultiStepLeadForm.jsx`
- `src/components/common/MultiStepLeadForm/useLeadFormMachine.js`
- `src/components/common/MultiStepLeadForm/steps/Step3Contact.jsx`
- `src/context/ModalContext.jsx` — confirm `drawerConfig.calculatorSnapshot` is forwarded
- `src/components/common/LeadFormDrawer/LeadFormDrawer.jsx` — confirm snapshot pass-through

## Implementation

### 1. `useLeadFormMachine.js`
When `initialContext.calculatorSnapshot` is present:
- **Pre-fill step 1 fields** from the snapshot:
  - `monthlyBill` → map numeric bill to the nearest bucket (`<2000`, `2000-5000`, `5000-10000`, `10000+`).
  - `state` → snapshot's state (or 'Other' if not in the Step 1 chip set).
- **Skip step 1** entirely if both values map successfully. Initial step = 2 (not 1). Step indicator: step 1 shows as complete with a small "Pre-filled from calculator" note.

Helper inside the hook:
```js
function bucketBill(n) {
  if (n < 2000) return '<2000';
  if (n < 5000) return '2000-5000';
  if (n < 10000) return '5000-10000';
  return '10000+';
}
```

### 2. `MultiStepLeadForm.jsx`
Forward `calculatorSnapshot` and `solution` from props into `useLeadFormMachine(initialContext)`:
```js
const machine = useLeadFormMachine({
  source,
  solution,
  calculatorSnapshot,
});
```
If `state.step` was skipped-forward, render a small pill above the step indicator:
```
✓ Your answers from the calculator are saved.
```

### 3. `Step3Contact.jsx` — context chip
Extend the existing context reminder (from prompt 08) to merge in calculator snapshot when present:
```js
const snapshot = context.calculatorSnapshot;
const contextLine = snapshot
  ? `Your plan: ${snapshot.state} · ${snapshot.systemKw} kW · save ₹${snapshot.monthlySavings.toLocaleString('en-IN')}/mo`
  : `Your plan: ${bucketLabel(data.monthlyBill)} bill · ${data.state} · ${data.propertyType} · ${data.systemPreference}`;
```
Display this above the fields, same `.contextChip` styling.

### 4. Submission payload
In `useLeadFormMachine.submit()`, ensure the concatenated `message` string includes snapshot fields when present:
```
"Calc: 2kW, save ₹3,200/mo, payback 4.1yr, Assam, 400 sqft | Property: Villa | Roof: Concrete | Pref: On-Grid"
```

### 5. `ModalContext.jsx`
The `openLeadDrawer` signature from prompt 09 already accepts `{ source, solution, calculatorSnapshot, title, subtitle }`. Confirm `drawerConfig.calculatorSnapshot` is in state and is cleared on `closeLeadDrawer()`.

### 6. `LeadFormDrawer.jsx`
Already passes `drawerConfig.calculatorSnapshot` to `MultiStepLeadForm` (from prompt 09). Verify it.

## Acceptance criteria
- [ ] Clicking `Get My Detailed Quote →` in the calculator opens the drawer starting on **step 2** (not step 1), with step 1 indicator shown as "complete".
- [ ] Step 3's context chip reads: `Your plan: {state} · {systemKw} kW · save ₹{monthlySavings}/mo`.
- [ ] Submitting the lead produces a webhook payload whose `message` contains the calculator snapshot summary.
- [ ] Opening the form from anywhere else (header CTA, solutions card, sticky CTA) still starts on step 1 with no pre-fill.
- [ ] Closing and reopening the drawer clears the snapshot.
- [ ] Analytics events fire once per submission, with `source: 'calculator'`.

## Do-not-touch
- Steps 1 & 2 UI.
- Calculator inputs / outputs / math.
- `submitLeadToWebhook`, `swalHelper`, tracking utils — only consume them.

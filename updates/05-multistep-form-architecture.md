# 05 — Multi-Step Lead Form: Architecture & State

## Context
This is the single most important conversion component. Homeowners abandon long forms. We split the existing 11-field `UnifiedLeadForm` into a 3-step wizard (2 quick qualification steps + 1 contact step) with a progress bar, back button, per-step validation, and a `context` prop so the Calculator and Solutions sections can pre-fill it. This prompt builds **only the shell** — individual step UIs come in 06–08.

## Files to create
- `src/components/common/MultiStepLeadForm/MultiStepLeadForm.jsx` — shell only
- `src/components/common/MultiStepLeadForm/MultiStepLeadForm.module.css`
- `src/components/common/MultiStepLeadForm/useLeadFormMachine.js` — state hook
- `src/components/common/MultiStepLeadForm/StepIndicator.jsx`
- `src/components/common/MultiStepLeadForm/StepIndicator.module.css`
- `src/components/common/MultiStepLeadForm/steps/StepShell.jsx` — wrapper with motion transitions
- `src/components/common/MultiStepLeadForm/index.js`

## State shape
```js
{
  step: 1 | 2 | 3 | 'success',
  data: {
    // Step 1
    monthlyBill: '',          // "<2000" | "2000-5000" | "5000-10000" | "10000+"
    state: '',                // "Assam" | "Nagaland" | "Odisha" | "Other"
    // Step 2
    propertyType: '',         // "Independent Home" | "Villa" | "Housing Society" | "Commercial"
    roofType: '',             // "Concrete" | "Tin-shed" | "Mixed" | "Not sure"
    systemPreference: '',     // "On-Grid" | "Hybrid (battery backup)" | "Not sure"
    // Step 3
    name: '',
    mobile: '',
    email: '',
    consent: false,
  },
  errors: {},
  isSubmitting: false,
  context: {                  // Injected from calling component
    source: 'hero',           // 'hero' | 'calculator' | 'solutions' | 'final-cta' | 'sticky'
    solution: null,           // e.g. "Villa / Large Home" when launched from a solution card
    calculatorSnapshot: null, // e.g. { estimatedSavings: 4200, systemKw: 3, payback: 4.2 }
  }
}
```

## Implementation

### `useLeadFormMachine.js`
- Exports default hook `useLeadFormMachine(initialContext)` returning `{ state, dispatch, actions }`.
- `actions` object:
  - `setField(field, value)`
  - `next()` — validates current step, advances if valid, else sets `errors`
  - `back()` — decrements `step`
  - `submit()` — async, calls `submitLeadToWebhook` from `src/utils/webhookSubmit.js`, fires GTM, Meta Pixel, Meta CAPI, and Google Ads events (replicate the calls from `src/components/common/UnifiedLeadForm/UnifiedLeadForm.jsx` lines 699–795). Concatenates the step-1/step-2 answers + `context.solution` + `context.calculatorSnapshot` into a single `message` string to keep the webhook schema unchanged. Sets `step: 'success'` on success.
- Validators per step:
  - Step 1: `monthlyBill` and `state` required
  - Step 2: `propertyType`, `roofType`, `systemPreference` all required
  - Step 3: `name` ≥ 2 chars, `mobile` 10 digits, `email` optional but must be valid if present, `consent === true`
- Reuse `getNameErrorMessage`, `getMobileErrorMessage`, `getEmailErrorMessage` from `src/utils/validators.js`.
- Reuse `isDuplicateLead`, `markLeadAsSubmitted` from `src/utils/webhookSubmit.js`.
- Reuse `showSuccess`, `showError`, `showInfo` from `src/utils/swalHelper.js`.

### `StepIndicator.jsx`
Props: `current: 1|2|3`, `total: 3`, `labels: string[]`.
Renders a horizontal bar: three pills where current = filled with `var(--step-active)`, completed = `var(--step-complete)` with a check icon, future = `var(--step-pending)`. Framer Motion width tween on progress line.

### `StepShell.jsx`
Wraps each step's content with Framer Motion `AnimatePresence` + horizontal slide. Renders:
- Step title (h3)
- Step subtitle
- Children (the inputs from steps 06/07/08)
- Bottom nav row: `Back` button (hidden on step 1), `Continue`/`Submit` button pinned right

### `MultiStepLeadForm.jsx` (shell only, children added in 06–08)
Props:
```js
{
  source: 'hero' | 'calculator' | 'solutions' | 'final-cta' | 'sticky',
  solution: string | null,
  calculatorSnapshot: object | null,
  variant: 'default' | 'dark' | 'drawer',
  onClose: () => void,          // called after success in drawer variant
  onSuccess: (data) => void,
}
```
Renders:
1. `StepIndicator`
2. `AnimatePresence` containing the active step (placeholders for now — each step is `<div>Step N placeholder — see prompt 0{5+N}.md</div>`)
3. Trust strip footer: `✓ 60-second form · ✓ Free, no obligation · ✓ WhatsApp friendly`
4. On `step === 'success'`: success card with name-based greeting, next-steps list, and a "Talk on WhatsApp" button (href `https://wa.me/911800202001?text=Hi%20Anvil...`).

### `MultiStepLeadForm.module.css`
- `.wrapper` — `padding: 24px; border-radius: 16px; background: var(--surface); box-shadow: var(--elev-3);`
- `.wrapper.dark` — `background: var(--primary-dark); color: var(--white);`
- `.wrapper.drawer` — no extra shadow, full width/height
- `.footerTrust` — `display: flex; gap: 12px; justify-content: center; margin-top: 16px; font-size: 0.75rem; color: var(--text-gray);`
- Framer variants: `slideIn`, `slideOut` (x-axis)

## Acceptance criteria
- [ ] `import MultiStepLeadForm from 'components/common/MultiStepLeadForm'` resolves.
- [ ] Mounting it shows the step indicator and placeholder text for step 1.
- [ ] Clicking `Continue` without valid data sets `errors` on the hook state (no crash).
- [ ] `useLeadFormMachine` exposes the described `actions` API.
- [ ] Submission path (once step 3 has real inputs) will reuse `submitLeadToWebhook`, `trackFormSubmission`, `trackMetaLead`, `sendLeadEvent`, `trackGoogleAdsFormSubmission`, `sendEnhancedConversionData`, `markLeadAsSubmitted`, `sessionStorage.setItem('lead_submitted', 'true')`, and `navigate('/thank-you')` — identical to the existing `UnifiedLeadForm` behaviour.
- [ ] Build passes.

## Do-not-touch
- `UnifiedLeadForm.jsx` — leave it in place for now (still used by `LeadFormDrawer`).
- `webhookSubmit.js`, `swalHelper.js`, `gtm.js`, `metaPixel.js`, `metaCAPI.js`, `googleAds.js`, `enhancedConversions.js`, `eventDedup.js`, `validators.js` — consume only, do not modify.
- `LeadFormDrawer`, `ModalContext` — do not wire into these yet (prompt 09 and 22 do that).

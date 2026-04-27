# 08 — Multi-Step Lead Form: Step 3 + Submit + Success

## Context
Step 3 collects just the contact details needed to call back. Keeping this to **3 inputs (name, mobile, email-optional) + 1 consent checkbox** plus a big submit button maximises completion. We also implement the success state so the user feels completion viscerally, and we wire the full submission pipeline (webhook, GTM, Meta Pixel + CAPI, Google Ads enhanced conversions).

## Files to create
- `src/components/common/MultiStepLeadForm/steps/Step3Contact.jsx`
- `src/components/common/MultiStepLeadForm/steps/Step3Contact.module.css`
- `src/components/common/MultiStepLeadForm/steps/SuccessState.jsx`
- `src/components/common/MultiStepLeadForm/steps/SuccessState.module.css`

## Files to modify
- `src/components/common/MultiStepLeadForm/MultiStepLeadForm.jsx` — wire step 3 + success
- `src/components/common/MultiStepLeadForm/useLeadFormMachine.js` — finalise `submit()` action

## Implementation

### `Step3Contact.jsx`
Props: `{ data, errors, onChange }`.

Rendered fields (MUI `TextField` components, one per row, full width):
1. **Full name** — `TextField` with `startAdornment` icon `mdi:account-outline`. Placeholder `"e.g. Ankit Deka"`. `maxLength=50`.
2. **Mobile** — `TextField` with `startAdornment` `"+91"` static prefix. `inputMode="numeric"`, strip non-digits on change, `maxLength=10`.
3. **Email (optional)** — `TextField` with `startAdornment` icon `mdi:email-outline`. Placeholder `"your@email.com"`. Label copy: `"Email (optional — we'll send your savings plan)"`.
4. **Consent checkbox** — MUI `Checkbox` bound to `data.consent`. Label:
   ```
   I agree to be contacted by Anvil on WhatsApp / call / email about my rooftop solar enquiry. See Privacy Policy.
   ```
   "Privacy Policy" opens the existing privacy modal (import from `UnifiedLeadForm` OR copy the `PrivacyPolicyContent` into a shared module `src/components/common/PrivacyModal/PrivacyModal.jsx` if you prefer — pick one and stay within this file).

Show validation errors beneath each field using MUI's `helperText` (reuse `getNameErrorMessage`, `getMobileErrorMessage`, `getEmailErrorMessage` from `src/utils/validators.js`).

Above the fields, render a tiny "context reminder" line summarising their earlier answers — pulled from `data`:
```
Your plan: {monthlyBill} bill · {state} · {propertyType} · {systemPreference}
```

Beneath the consent row, render three trust badges in a flex row:
```
🔒 100% confidential   ·   ⭐ 4.9 Google rating   ·   ⚡ Reply within 24 hrs
```

### `Step3Contact.module.css`
- `.contextChip { background: var(--surface-muted); border: 1px solid var(--border-gray); border-radius: 10px; padding: 10px 12px; font-size: 0.8125rem; color: var(--ink-muted); margin-bottom: 16px; }`
- `.field + .field { margin-top: 14px; }`
- `.consentRow { display: flex; align-items: flex-start; gap: 8px; margin-top: 16px; font-size: 0.8125rem; color: var(--ink-muted); line-height: 1.5; }`
- `.consentRow a { color: var(--accent-gold); font-weight: 600; cursor: pointer; }`
- `.trustRow { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-top: 16px; font-size: 0.75rem; color: var(--ink-muted); }`

### Submit button (inside `StepShell` footer, controlled by parent)
- Label: `"Get My Free Savings Plan"` (use `submitButtonText` prop override if passed; default to this string).
- When `isSubmitting`, show `CircularProgress` + `"Submitting..."`.
- Background: `var(--cta-primary)` with `box-shadow: var(--elev-cta)`.

### `SuccessState.jsx`
Props: `{ name, context }`.
Layout:
- Large check-circle icon (`mdi:check-circle`) in `var(--savings-green)`, 64px, with a Framer Motion scale-in animation.
- Heading: `Thank you, {name}! 🎉`
- Body:
  ```
  Your free savings plan is on the way. An Anvil Saathi will call you within 24 hours — they'll also send a WhatsApp summary and, once ready, your full PDF quote including subsidy & EMI options.
  ```
- Three-item "what happens next" list with icons:
  1. `mdi:phone-in-talk` — *Anvil Saathi call within 24 hrs*
  2. `mdi:file-pdf-box` — *Personalised savings plan & quote*
  3. `mdi:home-search-outline` — *Free site visit scheduled at your convenience*
- Two CTAs side-by-side:
  - Primary (green): `Chat on WhatsApp` — `href="https://wa.me/911800202001?text=Hi%20Anvil%2C%20I%20just%20submitted%20my%20rooftop%20solar%20enquiry"` `target="_blank"`.
  - Secondary (outlined): `Call 1800 2020 001` — `href="tel:+911800202001"`.

### `SuccessState.module.css`
- `.wrap { text-align: center; padding: 16px 8px; }`
- `.icon { display: inline-flex; color: var(--savings-green); background: var(--savings-green-bg); border-radius: 50%; padding: 14px; margin-bottom: 12px; }`
- `.title { font-family: var(--font-heading); font-weight: 700; font-size: var(--fs-2xl); color: var(--ink); margin-bottom: 8px; }`
- `.body { color: var(--ink-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 20px; }`
- `.steps { display: flex; flex-direction: column; gap: 10px; text-align: left; margin-bottom: 20px; }`
- `.step { display: flex; align-items: center; gap: 12px; padding: 10px 12px; background: var(--surface-muted); border-radius: 10px; }`
- `.ctaRow { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }`

### `useLeadFormMachine.js` — finalise `submit()`
Implement this body (mirror `UnifiedLeadForm.jsx` lines 699–795):
1. Concatenate step 1 + step 2 answers + `context.solution` + `context.calculatorSnapshot` into `message`.
2. Build `leadData = { name, mobile, email, service_interest: context.solution || systemPreference, message, source: context.source }`.
3. `isDuplicateLead` → show info alert and return.
4. `submitLeadToWebhook(leadData)` — on success:
   - `trackFormSubmission(context.source, { serviceInterest })`
   - Generate `metaEventId` via `generateEventId()`
   - `trackMetaLead({ event_id, content_name: context.source, content_category: 'lead_generation' })`
   - `sendLeadEvent({ name, email, mobile, event_id, source })`
   - `trackGoogleAdsFormSubmission(context.source)`
   - `sendEnhancedConversionData(email, mobile, name)`
   - `markLeadAsSubmitted(mobile)`
   - `sessionStorage.setItem('lead_submitted', 'true'); sessionStorage.setItem('lead_name', name);`
   - Dispatch `setStep('success')`.
5. On failure: `showError` and keep state on step 3.

Do **not** navigate to `/thank-you` from inside the hook — the success state lives inside the form. (In drawer usage, after success the `onClose` + the parent's navigate call can still redirect; in inline usage, the user stays on page with SuccessState.)

## Acceptance criteria
- [ ] Step 3 shows the three text fields, consent, trust strip, and context reminder from prior steps.
- [ ] Submit is disabled while `isSubmitting === true` and shows spinner.
- [ ] Successful submission triggers all five tracking utilities (check in browser DevTools `dataLayer`).
- [ ] Success state shows the personalised `"Thank you, {name}!"` plus the three next-steps and both CTAs.
- [ ] Duplicate submissions show the existing info alert and do not re-fire tracking.
- [ ] Back from step 3 preserves all previously entered text.
- [ ] Invalid mobile / empty name blocks submission with field-level errors.

## Do-not-touch
- Steps 1 & 2.
- `UnifiedLeadForm.jsx`.
- `webhookSubmit.js`, `swalHelper.js`, `gtm.js`, `metaPixel.js`, `metaCAPI.js`, `googleAds.js`, `enhancedConversions.js`, `validators.js`.
- `LeadFormDrawer` / `ModalContext` (wired next in prompt 09).

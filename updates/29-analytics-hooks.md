# 29 — Analytics Hooks (GTM dataLayer, Meta Pixel + CAPI, Form Events)

## Context
The page needs to feed every funnel event cleanly into GTM → Google Ads & Meta (Pixel + CAPI) so CPA optimisation works. Most tracking utilities already exist (`src/utils/gtm.js`, `metaPixel.js`, `metaCAPI.js`, `googleAds.js`, `enhancedConversions.js`, `eventDedup.js`). This prompt wires the **new** conversion events introduced by the rebuild and verifies existing ones still fire.

## Files to create
- `src/utils/leadEvents.js` — one thin wrapper that emits the "canonical" event set

## Files to modify
- `src/components/common/MultiStepLeadForm/useLeadFormMachine.js` — emit step events
- `src/components/sections/CalculatorSection/CalculatorSection.jsx` — emit calc-use events
- `src/components/sections/SolutionsSection/SolutionsSection.jsx` — emit solution-click events
- `src/components/common/StickyMobileCTA/StickyMobileCTA.jsx` — track sticky events
- `src/components/common/FloatingContacts/FloatingContacts.jsx` — track floating events
- Any CTA that calls `openLeadDrawer` — emit `cta_click` before opening

## Implementation

### `src/utils/leadEvents.js`
Thin wrapper that standardises event names. Import existing utilities.

```js
import { trackCTAClick, trackFormSubmission } from './gtm';
import { generateEventId } from './eventDedup';

// Emit a structured "lead_funnel" event to GTM dataLayer.
// Uses trackCTAClick under the hood for compatibility with existing tags.
export function trackFunnelStep(step, meta = {}) {
  // step: 'view_hero' | 'cta_click' | 'form_open' | 'form_step_viewed' |
  //       'form_step_completed' | 'form_submitted' | 'calc_interaction' |
  //       'solution_click' | 'whatsapp_click' | 'phone_click'
  if (typeof window === 'undefined' || !window.dataLayer) return;
  window.dataLayer.push({
    event: `lead_${step}`,
    lead_step: step,
    ...meta,
    timestamp: Date.now(),
  });
}

export function trackCtaClickEvent(ctaId, location, label) {
  trackCTAClick(ctaId, location, label);
  trackFunnelStep('cta_click', { ctaId, location, label });
}

export { trackFormSubmission };
```

### `useLeadFormMachine.js`
At these transitions, fire events:
- On mount: `trackFunnelStep('form_open', { source: context.source, solution: context.solution })`.
- On `next()` success: `trackFunnelStep('form_step_completed', { step: currentStep, source: context.source })`. On step change: `trackFunnelStep('form_step_viewed', { step: newStep })`.
- On `submit()` success (in addition to existing Meta/Ads calls): `trackFunnelStep('form_submitted', { source: context.source, solution: context.solution, hasSnapshot: !!context.calculatorSnapshot })`.
- Keep all existing `trackFormSubmission`, `trackMetaLead`, `sendLeadEvent`, `trackGoogleAdsFormSubmission`, `sendEnhancedConversionData` calls — do not remove.

### `CalculatorSection.jsx`
Debounced interaction event (1 per 2 seconds max) when user drags a slider or changes state:
```js
useEffect(() => {
  const t = setTimeout(() => {
    trackFunnelStep('calc_interaction', {
      monthlyBill: inputs.monthlyBill,
      roofArea: inputs.roofArea,
      state: inputs.state,
      systemKw: outputs.systemKw,
      monthlySavings: outputs.monthlySavings,
    });
  }, 1800);
  return () => clearTimeout(t);
}, [inputs, outputs]);
```

### `SolutionsSection.jsx`
On each card CTA click:
```js
trackCtaClickEvent('solutions_card', solution.id, solution.title);
trackFunnelStep('solution_click', { solutionId: solution.id, solutionTag: solution.solutionTag });
```

### `StickyMobileCTA.jsx` / `FloatingContacts.jsx`
On each click:
- WhatsApp: `trackFunnelStep('whatsapp_click', { source: 'sticky_mobile' | 'floating_desktop' });`
- Call: `trackFunnelStep('phone_click', { source: ... });`
- Get Quote (sticky only): `trackCtaClickEvent('sticky_get_quote', 'sticky_bar', 'Get Quote');`

### `Header.jsx` "Get Free Quote" button
Emit `trackCtaClickEvent('header_cta', 'header', 'Get Free Quote')` before `openLeadDrawer`.

### Verify existing events still fire (do not duplicate)
Already wired by `UnifiedLeadForm` / `MultiStepLeadForm`:
- `trackFormSubmission(source, { serviceInterest })` — fires on success
- `trackMetaLead` + `sendLeadEvent` (Pixel + CAPI deduped via `event_id`)
- `trackGoogleAdsFormSubmission(source)` — Google Ads conversion
- `sendEnhancedConversionData(email, mobile, name)` — enhanced conversions

### GTM dataLayer schema reference
After this prompt, a full submission from the calculator path should push (in order):
1. `lead_form_open` · `{ source: 'calculator', solution: null }`
2. `lead_form_step_viewed` · `{ step: 2 }` (step 1 skipped thanks to calc pre-fill)
3. `lead_form_step_completed` · `{ step: 2, source: 'calculator' }`
4. `lead_form_step_viewed` · `{ step: 3 }`
5. `lead_form_submitted` · `{ source: 'calculator', hasSnapshot: true }`
6. `form_submission` (existing from `trackFormSubmission`) · `{ formId: 'calculator' }`
7. `generate_lead` (existing Google Ads conversion) · `{ value, currency }`

## Acceptance criteria
- [ ] Submitting a lead from the calculator path produces all 7 events in GTM Preview / Tag Assistant.
- [ ] Calculator slider drag emits at most 1 `lead_calc_interaction` every ~2 seconds.
- [ ] Clicking a Solutions card emits both `cta_click` and `lead_solution_click`.
- [ ] Clicking sticky WhatsApp emits `lead_whatsapp_click`.
- [ ] Meta Pixel + CAPI Lead event fire once per form submission with the same `event_id` (dedupe intact).
- [ ] No duplicate `generate_lead` events on a single submission.

## Do-not-touch
- `gtm.js`, `metaPixel.js`, `metaCAPI.js`, `googleAds.js`, `enhancedConversions.js`, `eventDedup.js`, `gclidManager.js` internal implementations — only consume.
- Existing `useGTMTracking` hook (page views, scroll depth, time on page).
- Consent mode initialisation.

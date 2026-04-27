# 09 — Wire Multi-Step Form Into Hero & Drawer

## Context
Steps 05–08 built a working `MultiStepLeadForm`. Now we replace the hero's placeholder slot with the real form, and swap the `LeadFormDrawer` contents (the drawer opened by the sticky CTA and the header "Get Free Quote" button) to use the same new component. This is the single biggest visible change of the rebuild.

## Files to modify
- `src/components/sections/HeroSection/HeroSection.jsx` — mount `MultiStepLeadForm` inside `#hero-form-slot`
- `src/components/common/LeadFormDrawer/LeadFormDrawer.jsx` — swap body from `UnifiedLeadForm` to `MultiStepLeadForm`

## Implementation

### 1. `HeroSection.jsx`
At the top, import:
```js
import MultiStepLeadForm from "../../common/MultiStepLeadForm";
```
Replace the `#hero-form-slot` contents (from prompt 04) with:
```jsx
<div id="hero-form-slot" className={styles.formCard}>
  <MultiStepLeadForm
    source="hero"
    variant="dark"
  />
</div>
```

Styling: the dark `formCard` CSS class in `HeroSection.module.css` already has the navy glass background — the `variant="dark"` prop on the form renders white text inside. Verify contrast on each step at 1440px and 375px widths.

### 2. `LeadFormDrawer.jsx`
Read the file first. Replace the `<UnifiedLeadForm .../>` usage with:
```jsx
<MultiStepLeadForm
  source={source || 'drawer'}
  solution={drawerConfig?.solution || null}
  calculatorSnapshot={drawerConfig?.calculatorSnapshot || null}
  variant="drawer"
  onClose={onClose}
/>
```
If the drawer previously set its own `title` / `subtitle` header, keep them — the multi-step form's internal step titles supplement them.

### 3. `ModalContext` — extend `openLeadDrawer` payload
Look at `src/context/ModalContext.jsx`. The existing `openLeadDrawer(source)` likely accepts a string. Extend it to accept an object:
```js
openLeadDrawer({ source, solution = null, calculatorSnapshot = null, title, subtitle })
```
Keep backwards compatibility: if the argument is a string, treat it as `{ source: arg }`. Store `solution` and `calculatorSnapshot` in `drawerConfig` so the drawer forwards them.

### 4. Remove mobile-device hero scroll-to-form behaviour
On mobile, the hero no longer shows the form inline. Replace the "Get My Free Savings Plan" CTA behaviour on mobile to call `openLeadDrawer({ source: 'hero_mobile' })` (it may already do so — confirm).

## Acceptance criteria
- [ ] Desktop hero right column shows the real multi-step form (step 1 chips visible).
- [ ] Completing all three steps in the hero form submits and shows SuccessState inline without reloading the page.
- [ ] Clicking the header "Get Free Quote" opens the drawer with the multi-step form inside.
- [ ] Calling `openLeadDrawer({ source: 'test', solution: 'Villa' })` from the dev console mounts the drawer with step 3 `service_interest` reading "Villa" (after submission, verify in GTM dataLayer).
- [ ] Existing tracking (GTM, Meta Pixel, CAPI, Google Ads, enhanced conversions) still fires exactly once per submission.
- [ ] `UnifiedLeadForm.jsx` is no longer referenced anywhere in `src/` (grep check). Leave the file in place for now — removal happens in prompt 30.

## Do-not-touch
- `MultiStepLeadForm` internals (steps 1–3, machine, StepShell, StepIndicator).
- `webhookSubmit.js`, `swalHelper.js`, any tracking util.
- `MobileDrawer` (navigation drawer), `MobileNavigation` (bottom nav).

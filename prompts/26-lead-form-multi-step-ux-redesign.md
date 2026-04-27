# 26 — Lead Form Multi-Step UX Redesign

## Objective
Visually rebuild the unified 3-step lead form so it feels premium, frictionless, and optimised for mobile-first ad traffic. Update step indicator, field interactions, micro-states (validation, focus, success), and motion. The data model from prompt 25 stays intact — this is purely UX/visual.

## Scope
- `src/components/common/LeadFormDrawer/LeadFormDrawer.jsx` (drawer chrome)
- `src/components/common/LeadFormDrawer/LeadFormDrawer.module.css`
- `src/components/common/MultiStepLeadForm/MultiStepLeadForm.jsx`
- `src/components/common/MultiStepLeadForm/MultiStepLeadForm.module.css`
- `src/components/common/MultiStepLeadForm/StepIndicator.jsx`
- `src/components/common/MultiStepLeadForm/StepIndicator.module.css`
- `src/components/common/MultiStepLeadForm/steps/StepShell.jsx` (presentational wrapper)
- `src/components/common/MultiStepLeadForm/steps/Step1ProgramStream.module.css` (renamed in 25)
- `src/components/common/MultiStepLeadForm/steps/Step2Background.module.css` (renamed in 25)
- `src/components/common/MultiStepLeadForm/steps/Step3Contact.module.css`
- `src/components/common/MultiStepLeadForm/steps/SuccessState.jsx`
- `src/components/common/MultiStepLeadForm/steps/SuccessState.module.css`
- `src/components/common/LeadForm/LeadForm.jsx` and `LeadForm.module.css` (compact variant used inline in Contact section)

## Out of Scope
- Field schema, validation logic, payload assembly (handled in prompt 25)
- ModalContext mechanics, drawer open/close state (preserved)
- Webhook / GTM event firing (preserved)

## Requirements

### Drawer chrome (`LeadFormDrawer.jsx`)
- Right-edge slide-in drawer; width 480 px on desktop, 100 % on mobile
- Background: `var(--ic-bg-default)` with a saffron 4 px left rule
- Header band:
  - Tight padding (24 px / 16 px), saffron eyebrow `2026 ADMISSIONS · BY ICON COMMERCE COLLEGE`, big drawer title (Fraunces 24 px / 700) and subtitle (Inter 14 px / 400 secondary), close button (`mdi:close`) top-right, 44 × 44 px hit area
- Trust strip below the header: 3 micro-icons + labels (`🔒 Confidential`, `⏱ 24 hr response`, `🎓 Direct ICC team`)
- Body: contains `<MultiStepLeadForm>` taking remaining height; vertical scroll if content overflows
- Footer band (sticky to bottom on mobile):
  - Step indicator (left), nav buttons (right) — `Back` (text variant, indigo) and `Next` / `Submit` (coral filled, full-width on mobile)
  - "By submitting…" privacy line beneath buttons
- Close interaction: ESC key closes drawer (existing behavior — verify); clicking the backdrop closes (existing — verify); confirm before close if any form field is dirty (use a small SweetAlert prompt: `You have unsaved info — close anyway?`)

### Step indicator (`StepIndicator.jsx`)
- Horizontal progress with three nodes: each is a 28 × 28 px circle showing step number, with a connecting saffron rule (becomes filled saffron once a step is completed; current step shows indigo ring, future steps in `var(--ic-border)`)
- Below each node: tiny label (`Programme`, `Background`, `Contact`) — Plus Jakarta Sans 11 px / 600 uppercase, color saffron when active, secondary text otherwise
- Animation: rule fills from left to right when advancing (200 ms easeOut); circle scales 1.0 → 1.1 with a tiny pop on becoming active

### Step 1 — Programme & Stream
- Programme picker rendered as 5 large radio cards (B.Com / BBA / BCA / B.A. / Not sure) — each card 88 px tall, full-width on mobile, 2-up grid on desktop drawer (drawer is 480 px so 2-up at 240 each minus padding fits)
  - Layout: icon (32 px saffron) on left, programme code (Plus Jakarta Sans 14 px / 700) and tagline (Inter 12 px / 500) on right; selected state: saffron 2 px border + cream tint; unselected: 1 px border; tap target 44 px+
- HS Stream rendered as 4 pill buttons in a 2 × 2 grid: `Science`, `Commerce`, `Arts`, `Vocational`. Selected: saffron filled; unselected: outline
- Inline help text below each field group: tiny saffron link `Why we ask →` opens a short tooltip explaining purpose

### Step 2 — Background
- State: native `<select>` styled with custom chevron (saffron); MUI `Select` is acceptable as long as it matches the visual language
- Passing year: 3-segment toggle: `2026 (current)`, `2025`, `Earlier`
- City / town: `<TextField>` with leading `mdi:map-marker` icon, placeholder `e.g. Guwahati, Tezpur, Dimapur`

### Step 3 — Contact
- Name: leading `mdi:account` icon, autocomplete `name`, autoCapitalize `words`
- Mobile: `+91` permanent prefix (visual chip — non-editable), 10-digit input, `inputMode="numeric"`, `pattern="[6-9][0-9]{9}"`, autocomplete `tel-national`
- Email (optional): leading `mdi:email-outline` icon, type `email`, autocomplete `email`
- Consent: checkbox + privacy text with a `Privacy Policy` link that opens an inline `<Modal>` (re-use existing `Modal` component) showing the privacy paragraph (re-authored in prompt 25)
- Below the consent: a "soft trust strip" — three micro-elements styled as faint chips: `2 minutes`, `No spam`, `Counsellor calls within 24 hrs`

### Validation feedback
- Inline error message under each field on blur (red text, `mdi:alert-circle-outline` icon, 13 px Inter)
- Field with error: 1 px red border, `var(--ic-error)`
- Submit button disabled until all step-3 fields satisfy validation; tooltip on hover explains why
- Network error / 5xx: SweetAlert error popup (existing `swalHelper.showError`); duplicate (409): SweetAlert info popup (existing `swalHelper.showInfo`) — these flows are unchanged from current code

### Submit & loading state
- Submit button shows spinner + label switches to `Submitting…` while in flight
- Disable the entire form (pointer-events: none) during submission to prevent double-submit
- On success: navigate to `/thank-you` (existing behavior) — set `sessionStorage.setItem('lead_submitted', 'true')`

### Success state (`SuccessState.jsx`)
- Used as a transient inline state (~2 s) before navigation, OR as the body of `/thank-you`
- Big saffron check icon (`mdi:check-circle`) at 80 px, with a `confetti.js` burst (existing `canvas-confetti` dep) for ~600 ms on mount
- Headline: `Thank you, {firstName}!`
- Sub-line: `Our admissions team will call you on +91 {maskedMobile} within 24 hours.`
- Two follow-up CTAs:
  - `<Button variant="text">Save our number to contacts</Button>` (downloads a `.vcf` with college's phone)
  - `<Button color="cta">View Programmes</Button>` (anchors back to `#programs`)

### Compact LeadForm (used inline in Contact section)
- Single-step rendering of all required fields (name, mobile, email, programme dropdown, optional message)
- Same visual language as the multi-step (saffron accents, indigo CTAs converting to coral on Submit)
- Width fluid; submit button full-width on mobile, auto on desktop

### Mobile optimisations
- Auto-focus first input of the active step on mount
- iOS keyboard: numeric for mobile field, tel for phone, email for email
- Tap targets all ≥ 48 px tall
- Smooth keyboard-avoidance: when keyboard opens, scroll the active field into view

## Out of Scope
- New analytics events (already wired)
- Backend changes
- Auto-fill from URL params (out of scope — could be a future iteration)

## Content / Copy
Drawer eyebrow: `2026 ADMISSIONS · BY ICON COMMERCE COLLEGE`
Trust strip: `🔒 Confidential` · `⏱ 24 hr response` · `🎓 Direct ICC team`
Submit privacy line: `By submitting, you agree to be contacted by Icon Commerce College about your admission enquiry.`
Success headline pattern: `Thank you, {firstName}!`
Success sub-line: `Our admissions team will call you on +91 {maskedMobile} within 24 hours.`

## Design Notes
- Drawer entry: 280 ms cubic-bezier(0.16, 1, 0.3, 1)
- Field focus: 2 px saffron ring (replaces blue browser default)
- Step transition: outgoing step fades + slides 16 px left; incoming fades + slides 16 px from right (180 ms)
- Reduced motion: drawer slides without scaling, step transitions become opacity-only
- All buttons inside the drawer use 12 px radius (matches form fields)

## Placeholder Image Specs
- None inside the drawer.
- For the Step 1 programme cards, use Iconify icons (`mdi:chart-line` for B.Com, `mdi:briefcase-variant` for BBA, `mdi:laptop` for BCA, `mdi:book-open-page-variant` for B.A., `mdi:help-circle-outline` for Not sure).

## Acceptance Criteria
- [ ] Drawer opens within 280 ms with the saffron left rule and indigo close button visible
- [ ] Step indicator visually progresses 1 → 2 → 3, with completed steps showing a saffron filled rule
- [ ] Step 1 programme cards: 2-up grid on desktop drawer, 1-up on mobile; selecting toggles saffron border
- [ ] Step 2 fields work: state dropdown, passingYear segmented toggle, city text input
- [ ] Step 3 fields work; consent checkbox blocks submission until checked; privacy modal opens via Privacy Policy link
- [ ] Mobile: tap-targets ≥ 48 px, +91 chip cannot be edited, numeric keyboard appears for the mobile field
- [ ] Submit button shows spinner + disabled state while in flight
- [ ] Success state: confetti fires on mount; honours `prefers-reduced-motion` (no confetti)
- [ ] Form respects `prefers-reduced-motion` — step transitions become opacity-only
- [ ] Compact LeadForm in Contact section visually matches drawer-form aesthetic
- [ ] Lighthouse a11y: every input has `<label>`; error messages link via `aria-describedby`; focus order is logical
- [ ] No Anvil / solar / kW strings; no rooftop iconography

## Dependencies
- 04-color-palette-and-design-tokens.md
- 05-typography-system.md
- 25-lead-form-data-model-and-modal-context.md

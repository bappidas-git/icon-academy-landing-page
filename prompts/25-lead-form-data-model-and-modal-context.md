# 25 — Lead Form Data Model + ModalContext Drawer Configuration

## Objective
Re-shape the unified lead form's internal data model from solar fields (`monthlyBill`, `state`, `propertyType`, `roofType`, `systemPreference`) to admissions fields (`program`, `hsStream`, `state`, `passingYear`, `cityOrTown`), while preserving the outward webhook payload contract (`name, mobile, email, service_interest, message, source`) so the LMS, Pabbly webhook, GTM events, Meta CAPI hashing, and Google Ads enhanced conversions all continue to work without modification.

Also redo the `ModalContext` `DRAWER_TITLES` enum to map the new CTA `source` keys (used by Header, Hero, About, Programs, Why, Faculty, Results, Facilities, Campus, Admissions, Fees, Scholarships, FAQ, Contact, Footer) to programme- and admission-aware drawer titles & subtitles.

## Scope
- `src/components/common/MultiStepLeadForm/useLeadFormMachine.js` — INITIAL_DATA, validation, payload assembly, enrichment
- `src/components/common/MultiStepLeadForm/MultiStepLeadForm.jsx` — STEP_LABELS array
- `src/components/common/MultiStepLeadForm/steps/Step1BillRegion.jsx` → rename to `Step1ProgramStream.jsx`
- `src/components/common/MultiStepLeadForm/steps/Step2Property.jsx` → rename to `Step2Background.jsx`
- `src/components/common/MultiStepLeadForm/steps/Step3Contact.jsx` (keep filename — only field labels & privacy text change)
- `src/components/common/LeadForm/LeadForm.jsx` — `SERVICE_OPTIONS` array, copy strings, optional message field
- `src/context/ModalContext.jsx` — `DRAWER_TITLES` enum
- `src/utils/validators.js` — add `validateProgram(value)` and `validateHsStream(value)` (or accept new field via existing helpers)

## Out of Scope (DO NOT TOUCH)
- `src/utils/webhookSubmit.js` — payload contract preserved; no schema changes
- `src/utils/swalHelper.js`
- `src/utils/gtm.js`, `metaCAPI.js`, `metaPixel.js`, `googleAds.js`, `enhancedConversions.js`, `eventDedup.js`, `gclidManager.js`, `consentMode.js`
- `src/admin/utils/leadService.js` — admin-side schema (handled in prompt 28)
- `src/components/common/MultiStepLeadForm/MultiStepLeadForm.module.css` and step CSS — styling unchanged
- The drawer mechanics in `LeadFormDrawer.jsx`

## Requirements

### Field model (single source of truth — `useLeadFormMachine.js`)
```js
export const INITIAL_DATA = {
  // Step 1
  program: '',           // 'B.Com.' | 'BBA' | 'BCA' | 'B.A.' | 'Not sure yet'
  hsStream: '',          // 'Science' | 'Commerce' | 'Arts' | 'Vocational'

  // Step 2
  state: '',             // 'Assam' | 'Arunachal Pradesh' | 'Manipur' | 'Meghalaya' | 'Mizoram' | 'Nagaland' | 'Sikkim' | 'Tripura' | 'Other'
  passingYear: '',       // '2026' | '2025' | 'Earlier' (handles current vs gap students)
  cityOrTown: '',        // free text — required, min 2 chars

  // Step 3
  name: '',
  mobile: '',
  email: '',
  consent: false,
};
```

### Step labels
```js
export const STEP_LABELS = ['Programme', 'Background', 'Contact'];
```

### Step 1 — `Step1ProgramStream.jsx`
- Title: `What programme do you want to study?`
- Subtitle: `Pick your preferred undergraduate programme — you can change your mind during counselling.`
- Field 1: `program` — radio-card group (one per programme), each card showing icon + name + 1-line tagline + entry fee snapshot
  - Options: `B.Com.`, `BBA`, `BCA`, `B.A.`, `Not sure yet`
- Field 2: `hsStream` — pill-button group
  - Options: `Science`, `Commerce`, `Arts`, `Vocational`
- Validation: both required.

### Step 2 — `Step2Background.jsx`
- Title: `Tell us a bit about you`
- Subtitle: `Helps us share the right scholarship and counselling info.`
- Field 1: `state` — select dropdown (8 NE states + Other)
- Field 2: `passingYear` — segmented buttons: `2026 (current)`, `2025`, `Earlier`
- Field 3: `cityOrTown` — text input, placeholder `e.g. Guwahati`
- Validation: all three required.

### Step 3 — `Step3Contact.jsx`
- Title (data-driven from `DRAWER_TITLES` if present, else default): `Where should our admissions team call you?`
- Subtitle: `We'll review your enquiry and call within 24 hours.`
- Fields: `name`, `mobile` (+91 prefix, 10-digit), `email` (optional), `consent` (checkbox)
- Privacy modal copy must be re-authored for ICC:
  > Icon Commerce College respects your privacy. The information you share is used only to contact you about admission to our undergraduate programmes. Your details are never sold or shared with third parties. For questions, write to privacy@iconcommercecollege.in.
- Trust strip text: `🔒 100% confidential` · `📞 Call within 24 hrs` · `✅ Direct admissions support`

### Webhook payload mapping (in `useLeadFormMachine.js#submit()`)
Keep the outward payload shape identical to before:
```js
const leadData = {
  name: data.name.trim(),
  mobile: data.mobile.trim(),
  email: data.email.trim(),
  service_interest: data.program || context.solution || '',
  message: buildEnrichedMessage(data, context),
  source: context.source || 'general',
  // Pass new fields at top level so admin panel can show them as columns (handled in prompt 28).
  program: data.program,
  hs_stream: data.hsStream,
  state: data.state,
  passing_year: data.passingYear,
  city_or_town: data.cityOrTown,
};
```

`buildEnrichedMessage(data, context)` becomes:
```js
function buildEnrichedMessage(data, context) {
  const parts = [];
  if (data.program) parts.push(`Programme: ${data.program}`);
  if (data.hsStream) parts.push(`HS Stream: ${data.hsStream}`);
  if (data.state) parts.push(`State: ${data.state}`);
  if (data.passingYear) parts.push(`HS Passing Year: ${data.passingYear}`);
  if (data.cityOrTown) parts.push(`City: ${data.cityOrTown}`);
  if (context?.solution && context.solution !== data.program) parts.push(`Source Solution: ${context.solution}`);
  if (context?.source) parts.push(`Source: ${context.source}`);
  return parts.join(' | ');
}
```
Remove all references to `calculatorSnapshot`, `monthlyBill`, `roofType`, `systemPreference`, `propertyType`.

### `LeadForm.jsx` (single-step variant used in inline contact form)
- Replace `SERVICE_OPTIONS` array with:
  ```js
  const PROGRAM_OPTIONS = [
    { value: 'B.Com.', label: 'Bachelor of Commerce (B.Com.)' },
    { value: 'BBA', label: 'Bachelor of Business Administration (BBA)' },
    { value: 'BCA', label: 'Bachelor of Computer Applications (BCA)' },
    { value: 'B.A.', label: 'Bachelor of Arts (B.A.)' },
    { value: 'Not sure yet', label: 'Not sure yet — counsel me' },
  ];
  ```
- Rename the `service_interest` select field label to `Programme of interest`
- Update placeholder `subtitle` default: `Share a few details — our admissions team will call you within 24 hours.`
- Update the success message: `Thanks! Our admissions team will call you within 24 hours.`
- Update the privacy note: `By submitting, you agree to be contacted by Icon Commerce College about your admission enquiry.`

### `ModalContext.jsx` — `DRAWER_TITLES` enum (full rewrite)
```js
export const DRAWER_TITLES = {
  // Header / footer
  header_apply: { title: 'Apply for 2026 Admissions', subtitle: 'Two minutes — and our team will call within 24 hours.' },
  footer_apply: { title: 'Apply for 2026 Admissions', subtitle: 'Two minutes — and our team will call within 24 hours.' },

  // Hero
  hero_primary: { title: 'Apply for 2026 Admissions', subtitle: 'Tell us your programme of interest — we will call within 24 hours.' },
  hero_counsellor: { title: 'Talk to a Counsellor', subtitle: 'A few details and we will guide you through the Samarth process.' },

  // About / Why / Faculty
  about_apply: { title: 'Apply Now', subtitle: 'Take the next step — admissions counselling is free.' },
  why_apply: { title: 'Apply Now', subtitle: 'Pick your programme; we will handle the rest.' },
  why_visit: { title: 'Schedule a Campus Visit', subtitle: 'Walk our halls — talk to faculty — see your future.' },
  faculty_counsellor: { title: 'Talk to a Counsellor', subtitle: 'Ask anything — programmes, faculty, or campus life.' },

  // Programmes
  program_bcom_apply: { title: 'Apply for B.Com.', subtitle: 'Bachelor of Commerce — Gauhati University · NEP 2020.' },
  program_bba_apply: { title: 'Apply for BBA', subtitle: 'Bachelor of Business Administration — Gauhati University · NEP 2020.' },
  program_bca_apply: { title: 'Apply for BCA', subtitle: 'Bachelor of Computer Applications — Gauhati University · NEP 2020.' },
  program_ba_apply: { title: 'Apply for B.A.', subtitle: 'Bachelor of Arts — Gauhati University · NEP 2020.' },

  // Results / Facilities / Campus
  results_apply: { title: 'Become the Next ICC Success Story', subtitle: 'Apply now — admissions counselling is free.' },
  facilities_visit: { title: 'Schedule a Campus Visit', subtitle: 'See the library, computer lab, and classrooms in person.' },
  campus_life_counsellor: { title: 'Talk to a Counsellor', subtitle: 'Curious about events, sports, or competitions? We have answers.' },

  // Admissions / Fees / Scholarships
  admissions_counsellor: { title: 'Get Free Admission Counselling', subtitle: 'We will walk you through the Samarth Portal step by step.' },
  fees_bcom_apply: { title: 'Apply for B.Com.', subtitle: 'Quickest path: share details, our team verifies and guides.' },
  fees_bba_apply: { title: 'Apply for BBA', subtitle: 'Quickest path: share details, our team verifies and guides.' },
  fees_bca_apply: { title: 'Apply for BCA', subtitle: 'Quickest path: share details, our team verifies and guides.' },
  fees_ba_apply: { title: 'Apply for B.A.', subtitle: 'Quickest path: share details, our team verifies and guides.' },
  scholarships_counsellor: { title: 'Get Scholarship Counselling', subtitle: 'Find the schemes you are eligible for.' },

  // FAQ / Contact
  faq_counsellor: { title: 'Talk to a Counsellor', subtitle: 'Real answers from our admissions team — within 24 hours.' },
  contact_inline: { title: 'Send Us a Message', subtitle: 'We will reply on phone, WhatsApp, or email — your choice.' },

  // Default fallback
  general: { title: 'Apply for 2026 Admissions', subtitle: 'Two minutes — and our team will call within 24 hours.' },
};
```

When `openLeadDrawer()` is called with a `source` not present in this map, fall back to the `general` entry (current code already supports that — verify).

When `openLeadDrawer({ source, solution })` is called, the `solution` field maps to a programme override (preselects Step 1's `program` field). Wire that linkage in `useLeadFormMachine.js`'s `setContext(...)` initialiser if not already present.

## Out of Scope
- The visual UI of the form / steps (separate prompt 26)
- Webhook payload server-side parsing
- LMS column mapping (prompt 28)

## Content / Copy
All copy listed above is canonical. Match the exact privacy / consent language so legal/admin can sign off.

## Design Notes
N/A in this prompt — visual changes are in prompt 26.

## Placeholder Image Specs
- N/A.

## Acceptance Criteria
- [ ] `INITIAL_DATA` matches the new field set exactly
- [ ] `STEP_LABELS = ['Programme', 'Background', 'Contact']`
- [ ] Step 1 collects programme + HS stream
- [ ] Step 2 collects state + passingYear + cityOrTown
- [ ] Step 3 collects name + mobile + email + consent (consent must be `true` to submit)
- [ ] Webhook payload (verify in admin panel localStorage post-submit) contains: `name, mobile, email, service_interest (= program), message (enriched), source, program, hs_stream, state, passing_year, city_or_town, lead_id, status, submitted_at, page_url, user_agent, utm_*, gclid`
- [ ] No `monthlyBill`, `roofType`, `systemPreference`, `propertyType`, `calculatorSnapshot` references remain
- [ ] `ModalContext.DRAWER_TITLES` contains all keys listed above
- [ ] Calling `openLeadDrawer({ source: 'general' })` shows the default title/subtitle
- [ ] Calling `openLeadDrawer({ source: 'program_bcom_apply' })` shows the B.Com.-specific title and pre-selects `program: 'B.Com.'` in step 1
- [ ] `validators.js` has new helpers and the regex constants (`INDIAN_MOBILE_REGEX`, `EMAIL_REGEX`, `NAME_REGEX`) untouched
- [ ] `LeadForm.jsx` (single-step variant) uses `PROGRAM_OPTIONS` and updated copy
- [ ] Submitting via the inline contact form (prompt 23) lands a lead in the admin panel with `source === 'contact_inline'`
- [ ] No console errors during the full 3-step happy path
- [ ] No Anvil / solar / kW strings remain in any of the form files

## Dependencies
- 01-project-cleanup-and-rebranding.md
- 12-programs-section.md (so the source `program_bcom_apply` etc. exist as drawer keys)

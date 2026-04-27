# 29 — Tracking & Webhook Integration Verification

## Objective
Verify that every analytics integration (GTM, Meta Pixel, Meta CAPI, Google Ads, Enhanced Conversions, GCLID capture, consent mode, event deduplication) and the Pabbly webhook still fire correctly with the new admissions lead schema. Update event names, custom data, and any solar-context defaults to admissions-context defaults. No mechanism changes — only payload values and copy.

## Scope
- `src/utils/gtm.js` — event names (preserved) but custom data labels updated
- `src/utils/metaPixel.js` — `content_name` / `content_category` defaults
- `src/utils/metaCAPI.js` — `custom_data.content_category` default
- `src/utils/googleAds.js` — conversion value default copy
- `src/utils/enhancedConversions.js` — no behavioural change, just sanity check
- `src/utils/leadEvents.js` — event names list (preserved)
- `public/api/meta-capi.php` — server endpoint (verify; only update if Anvil strings exist in PHP code)
- `public/api/leads.php` — server endpoint (verify; only update if Anvil strings exist)
- `public/api/save-lead.php` — server endpoint (verify; only update if Anvil strings exist)
- `src/utils/webhookSubmit.js` — DUMMY_MODE flag, USE_PABBLY flag, log messages (only console.log strings change)

## Out of Scope (DO NOT TOUCH MECHANISM)
- `eventDedup.js` — UUID generation logic
- `gclidManager.js` — capture / expiry behavior
- `consentMode.js` — default consent matrix
- The hashing / SHA-256 implementation in `metaCAPI.js` and `enhancedConversions.js`
- Meta CAPI server-side proxy logic (only Anvil-string updates if any exist)

## Requirements

### `gtm.js` event names (UNCHANGED — preserve these exactly)
```
virtual_pageview
lead_form_submission
generate_lead
cta_click
phone_click
whatsapp_click
scroll_depth
time_on_page
section_view
navigation
page_visibility
form_field_focus
lead_form_open
lead_form_step_viewed
lead_form_step_completed
lead_form_submitted
lead_cta_click
enhanced_conversions_config
enhanced_conversion_data
```
The keys remain the same so any pre-built GTM container / GA4 destination triggers continue to work without re-mapping.

### `gtm.js` payload changes
- `trackFormSubmission(formSource, programInterest)` — rename second param from `investmentInterest` to `programInterest`; the key in the dataLayer push becomes `program_interest` (keeping `investment_interest` legacy key as a duplicate for one release for backward-compat — emit BOTH keys so any pre-existing GTM tag won't break, and document the rename in `GTM_GUIDE.md`)
- `generate_lead` push now includes `lead_type: 'admission_enquiry'` and `program: leadData.program`
- All comments inside `gtm.js` referring to "solar" / "rooftop" replaced with "admission" / "programme" wording

### `metaPixel.js` payload changes
- `trackLead({ content_name, content_category, ... })` — default `content_category` becomes `'admission_lead'` (was `'solar_lead'`)
- `trackViewContent({ content_name, ... })` — default `content_category` becomes `'admission_landing'`
- `content_name` defaults to the page title string `'Icon Commerce College Admissions Landing'`

### `metaCAPI.js` payload changes
- `sendLeadEvent(leadData)` — `custom_data.content_category` default becomes `'admission_lead'`; `custom_data.content_name` becomes `leadData.program || leadData.source` (programme name carries higher signal than CTA source)
- `event_source_url` unchanged
- Hashing keys (`em`, `ph`, `fn`) unchanged
- Add `custom_data.lead_type: 'admission_enquiry'`

### `googleAds.js` updates
- `trackFormSubmission()` — default `transactionId` argument now uses `lead_id` from the form (no behavior change; just doc)
- `trackConversion()` — default `currency: 'INR'`, default `value: parseInt(process.env.REACT_APP_GOOGLE_ADS_CONVERSION_VALUE || '500', 10)` (admission lead value placeholder ₹500 — flag in `GTM_GUIDE.md`)
- All inline comments updated from solar to admission wording

### `webhookSubmit.js` updates
- Console-log labels: replace `[Solar Lead]` / `[Anvil Lead]` with `[ICC Admission Lead]`
- `console.warn`s about `WEBHOOK_URL` empty: update text to `Pabbly webhook URL not configured. Set REACT_APP_ADMIN_PABBLY_WEBHOOK_URL in .env.`
- Keep `DUMMY_MODE = true` for development (so leads stay local); production deployment will toggle this off via env override (document in PABBLY_GUIDE.md)
- `USE_PABBLY` continues to gate the live webhook — preserve

### Server-side endpoints in `public/api/`
- For each `.php` file, scan and replace any literal `Anvil`, `Anvil Energy`, `solar`, `rooftop`, `kW` strings (likely only in error messages and email templates) with their admissions-context equivalents:
  - `Anvil Energy` → `Icon Commerce College`
  - `solar enquiry` → `admission enquiry`
  - `Anvil Saathi` → `ICC Admissions Team`
- If a PHP file calls `mail()` with a hardcoded sender / signature, update the from-email and signature to ICC equivalents (use `info@iconcommercecollege.in`)
- **Do not change the JSON request/response shape** — backend integrations still expect the same top-level keys

### Sanity-check the live wiring
After edits, run a manual test:
1. Submit a lead from the home page hero
2. Open the browser DevTools → Network tab. Confirm:
   - `dataLayer` has `lead_form_submitted` push with `program`, `hs_stream`, `state`, `source: 'hero_primary'`
   - Meta Pixel `Lead` event fired (visible as `https://www.facebook.com/tr?...&ev=Lead&...`)
   - Google Ads conversion event fires if `REACT_APP_GOOGLE_ADS_ID` is configured
   - POST to `/api/leads.php?action=create` returns 200 (or fails gracefully in DUMMY_MODE)
   - POST to `/api/meta-capi.php` returns 200 (or fails gracefully if endpoint missing)
3. Confirm the lead appears in the Admin Panel at `/admin/leads` with all new fields populated

### Update `GTM_GUIDE.md` and `PABBLY_GUIDE.md` with new event-payload tables (refers back to prompt 03 — verify the tables there match this new payload shape; if not, update)

## Out of Scope
- New tracking pixels (e.g. LinkedIn Insight Tag) — defer
- Server-rendered analytics
- Cookie consent banner UI (`consentMode.js` is wired but no banner UI; defer)

## Content / Copy
- Console log prefix: `[ICC Admission Lead]`
- Pabbly warning: `Pabbly webhook URL not configured. Set REACT_APP_ADMIN_PABBLY_WEBHOOK_URL in .env.`
- Admin email signature: `Icon Commerce College Admissions`

## Design Notes
N/A — wiring only.

## Placeholder Image Specs
N/A.

## Acceptance Criteria
- [ ] All GTM event names listed remain unchanged (regression check)
- [ ] `dataLayer` `generate_lead` event includes `program` and `lead_type: 'admission_enquiry'`
- [ ] Meta Pixel `Lead` event has `content_category: 'admission_lead'`
- [ ] Meta CAPI POST body has `custom_data.content_category: 'admission_lead'` and `custom_data.lead_type: 'admission_enquiry'`
- [ ] Google Ads conversion fires (if env var present) with `currency: 'INR'`, default value 500
- [ ] Server-side PHP files have no `Anvil` / `solar` / `rooftop` / `kW` string literals
- [ ] Submitting a lead end-to-end succeeds: lead appears in admin, no console errors, all tracking events fire
- [ ] `webhookSubmit.js` DUMMY_MODE remains true for dev; PABBLY mode disabled until env URL is set
- [ ] `GTM_GUIDE.md` and `PABBLY_GUIDE.md` reflect the new event payloads
- [ ] Backward compatibility: any pre-existing GTM tag listening on legacy event names continues to fire (verify via GTM Preview mode if container ID is set; otherwise verify via dataLayer console)

## Dependencies
- 25-lead-form-data-model-and-modal-context.md
- 28-lms-admin-field-mapping.md
- 03-readme-and-documentation.md

# 23 — Contact & Location Section (with Map)

## Objective
Make it effortless for a prospective student or parent to reach the college: visible address, phone, email, WhatsApp, social handles, and an embedded map of Rajgarh Road, Chandmari, Guwahati. Pair the contact panel with a small inline form (variant of the unified form) for quick "send us a message" submissions that flow into the same LMS.

## Scope
- Replace `src/data/locationData.js` (cleared in prompt 01) with the canonical Icon Commerce College location data
- Create `src/components/sections/ContactSection/ContactSection.jsx`
- Create `src/components/sections/ContactSection/ContactSection.module.css`
- Create `src/components/sections/ContactSection/index.js`
- The inline form re-uses `<LeadForm variant="compact" source="contact_inline" />` (the existing single-step form component) — do not invent a new form

## Out of Scope
- Multi-location switcher (only one campus)
- Real Google Maps API key — use a static iframe with `https://www.google.com/maps?q=...&output=embed` URL (no key required)

## Requirements

### `src/data/locationData.js`
```js
export const COLLEGE_LOCATION = {
  name: 'Icon Commerce College',
  addressLine1: 'Rajgarh Road, Chandmari',
  addressLine2: 'Guwahati - 781003',
  state: 'Assam',
  country: 'India',
  phone: process.env.REACT_APP_SALES_PHONE || '+91 0000000000',
  whatsapp: process.env.REACT_APP_WHATSAPP_NUMBER || '+910000000000',
  email: process.env.REACT_APP_SALES_EMAIL || 'info@iconcommercecollege.in',
  admissionsEmail: process.env.REACT_APP_SUPPORT_EMAIL || 'admissions@iconcommercecollege.in',
  hours: 'Mon – Sat · 09:30 AM – 05:00 PM (Classes begin at 10:00 AM)',
  mapEmbedUrl: 'https://www.google.com/maps?q=Rajgarh+Road+Chandmari+Guwahati+781003&output=embed',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Rajgarh+Road+Chandmari+Guwahati+781003',
  uniformVendor: {
    name: 'Suman Dresses',
    address: 'Opposite Harisabha, Panbazar, Guwahati - 781001',
    phones: ['0361-2630292', '9864124419', '9864059229'],
  },
  socials: [
    { id: 'facebook', icon: 'mdi:facebook', url: process.env.REACT_APP_FACEBOOK_URL },
    { id: 'instagram', icon: 'mdi:instagram', url: process.env.REACT_APP_INSTAGRAM_URL },
    { id: 'linkedin', icon: 'mdi:linkedin', url: process.env.REACT_APP_LINKEDIN_URL },
    { id: 'youtube', icon: 'mdi:youtube', url: process.env.REACT_APP_YOUTUBE_URL },
  ],
};
```

### `ContactSection.jsx`
Layout (desktop ≥1024 px — two-column 50/50):
- **Left column — Contact panel:**
  - Eyebrow: `GET IN TOUCH`
  - H2: `Visit Us, Call Us, Or Drop a Message`
  - Subhead: `Our admissions team is here to help — by phone, WhatsApp, email, or in person at our Guwahati campus.`
  - Address block: icon + 2-line address; "Get directions →" link (opens `directionsUrl` in new tab)
  - Phone, WhatsApp, Email rows — each is a clickable `<a>` (tel: / wa.me / mailto:) with an icon
  - Hours row
  - Social icons row (all 4)
  - Below: subtle uniform vendor card — saffron border, body: `For uniforms, contact Suman Dresses` + address + phones (each clickable `tel:`)
- **Right column — Map + inline form:**
  - Map: 16:9 iframe embedded from `mapEmbedUrl`, 16 px radius, `var(--ic-shadow-lg)`
  - Below the map: heading `Send us a message` + `<LeadForm variant="compact" source="contact_inline" />` — the form's submit goes through the same `webhookSubmit.js` pipeline as the main drawer form

Layout (mobile <768 px — stacked):
- Order: header → contact panel (single column) → map → inline form

### Anchor
- Section root: `id="contact"`

### A11y
- All `<a>` tels / mailto / wa.me links have aria-labels (e.g. `aria-label="Call Icon Commerce College at +91 0000000000"`)
- Map iframe has `title="Icon Commerce College location on Google Maps"`

## Out of Scope
- Live chat widget (`REACT_APP_ENABLE_CHAT_WIDGET=false`)
- Different forms per channel — re-use the same `<LeadForm variant="compact">`

## Content / Copy
- Address (verbatim from prospectus): `Rajgarh Road, Chandmari, Guwahati - 781003`
- Hours: `Mon – Sat · 09:30 AM – 05:00 PM (Classes begin at 10:00 AM)` (placeholder — confirm office hours)
- Uniform vendor: verbatim from prospectus
- Social handles: from `.env` (placeholders set in prompt 02)
- Phone / email: from `.env`

## Design Notes
- Contact rows: 24 px gap; each row is icon (28 px saffron) + content (label small grey + value Plus Jakarta Sans 16 px / 600 indigo)
- Hover on phone/email/whatsapp rows: subtle cream bg + saffron underline
- Map: rounded card, `var(--ic-shadow-lg)`, lazy-load iframe (`loading="lazy"`)
- Section background: `var(--ic-bg-default)`

## Placeholder Image Specs
- No imagery — map iframe handles visual

## Acceptance Criteria
- [ ] Address renders verbatim: `Rajgarh Road, Chandmari, Guwahati - 781003`
- [ ] Phone, WhatsApp, Email rows are clickable (`tel:`, `https://wa.me/...`, `mailto:`) with proper aria-labels
- [ ] Get directions link opens Google Maps in a new tab
- [ ] 4 social icons render and link to env-supplied URLs
- [ ] Uniform vendor card visible with all three phone numbers (each clickable)
- [ ] Map iframe loads (`loading="lazy"`); no console errors related to missing API key
- [ ] Inline `<LeadForm variant="compact" source="contact_inline">` submits successfully (verify in admin panel)
- [ ] Section anchor `#contact` matches Header nav
- [ ] No Anvil / solar strings

## Dependencies
- 02-env-and-package-rebrand.md
- 04-color-palette-and-design-tokens.md
- 05-typography-system.md
- 22-faq-section.md
- 25-lead-form-data-model-and-modal-context.md (the LeadForm component must already accept the new fields)

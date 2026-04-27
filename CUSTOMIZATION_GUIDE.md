# Customization Guide — Icon Commerce College Admissions Landing Page

A step-by-step playbook for cloning this Icon Commerce College admissions landing page for another educational institution. The defaults below ship configured for **Icon Commerce College** (Rajgarh Road, Chandmari, Guwahati). Replace each value with your own.

> *Tagline this template ships with: "Where Knowledge Meets Character — Admissions Open 2026"*

---

## 1. Clone & Install

```bash
git clone <your-repo-url> my-college-landing-page
cd my-college-landing-page
npm install
```

---

## 2. Configure Environment Variables

Copy the template and fill in your institution's details:

```bash
cp .env.example .env
```

Variables introduced in [02-env-and-package-rebrand](./prompts/02-env-and-package-rebrand.md):

| Variable | Description | Icon Commerce College Default |
|----------|-------------|--------------------------------|
| `REACT_APP_NAME` | Public-facing institution name | `Icon Commerce College` |
| `REACT_APP_PROJECT_NAME` | Internal project key | `icon-commerce-college` |
| `REACT_APP_SALES_PHONE` | Admissions desk phone | `+91-XXXXXXXXXX` |
| `REACT_APP_WHATSAPP_NUMBER` | WhatsApp number, no dashes | `91XXXXXXXXXX` |
| `REACT_APP_SALES_EMAIL` | Admissions email | `admissions@iconcommerce.edu` |
| `REACT_APP_OFFICE_ADDRESS` | Campus address | `Rajgarh Road, Chandmari, Guwahati - 781003` |
| `REACT_APP_ADMIN_USERNAME` | Admin Panel username | — |
| `REACT_APP_ADMIN_PASSWORD` | Admin Panel password | — |
| `REACT_APP_LEADS_API_URL` | Path to `leads.php` | `/api/leads.php` |
| `REACT_APP_LEADS_ADMIN_KEY` | Must match `ADMIN_API_KEY` in `public/api/config.php` | — |
| `REACT_APP_ADMIN_PABBLY_WEBHOOK_URL` | Optional — second Pabbly workflow for admin actions | (leave blank unless needed) |
| `REACT_APP_GTM_ID` | Google Tag Manager container ID | `GTM-XXXXXXX` |
| `REACT_APP_GA4_MEASUREMENT_ID` | GA4 measurement ID | `G-XXXXXXXXXX` |
| `REACT_APP_META_PIXEL_ID` | Meta Pixel ID | — |
| `REACT_APP_GOOGLE_ADS_ID` | Google Ads conversion ID | `AW-XXXXXXXXXX` |
| `REACT_APP_GOOGLE_ADS_CONVERSION_LABEL` | Google Ads conversion label | — |

> **All `REACT_APP_*` env values are inlined at build time. After any change to `.env`, run `npm run build` and redeploy.**

---

## 3. Replace the Logo

The Icon Commerce College placeholder logo lives in three React components plus `index.html`. Find each occurrence and swap in your own asset URL (or import a local file from `public/`):

| File | Location |
|------|----------|
| `src/components/common/Header/Header.jsx` | Top navigation logo |
| `src/components/common/Footer/Footer.jsx` | Footer logo |
| `src/components/common/MobileDrawer/MobileDrawer.jsx` | Mobile drawer header |
| `public/index.html` | OG image, favicon links, JSON-LD `Organization.logo` |
| `public/manifest.json` | PWA install icons |
| `public/favicon.ico`, `public/favicon.png`, `public/apple-touch-icon.png` | Browser/PWA icons |

Recommended logo dimensions:
- Header / Footer / Drawer: SVG preferred; if PNG, 320×80 @ 2x
- OG image: 1200 × 630 JPG/PNG, < 1 MB
- Favicon: 32×32, 64×64, 192×192, 512×512

---

## 4. Update Contact Info

Two places must agree: `.env` (build-time tokens consumed by section components) and `src/data/locationData.js` (the campus address card and Google Maps embed coordinates).

```js
// src/data/locationData.js
export const campus = {
  name: 'Icon Commerce College',
  address: 'Rajgarh Road, Chandmari, Guwahati - 781003',
  phone: '+91-XXXXXXXXXX',
  whatsapp: '91XXXXXXXXXX',
  email: 'admissions@iconcommerce.edu',
  mapsEmbed: 'https://www.google.com/maps/embed?pb=...',
  geo: { latitude: '26.1768', longitude: '91.7567' },
};
```

---

## 5. Update SEO

Crawlers see two layers: static `<head>` tags + JSON-LD blocks in `public/index.html`, and runtime overrides via `src/utils/seo.js` driven by `src/config/seo.js`.

1. **`public/index.html`** — `<title>`, `<meta description>`, Open Graph, Twitter Card, canonical URL, static JSON-LD blocks (`#schema-organization`, `#schema-educational-organization`, `#schema-faq`).
2. **`src/config/seo.js`** — runtime `organization`, `educationalOrganization`, `faqs`, `pages` config. The `EducationalOrganization` / `CollegeOrUniversity` schema replaces the generic `LocalBusiness` schema used in vertical-agnostic templates.
3. **`public/sitemap.xml`** — replace the domain and `lastmod` date.
4. **`public/robots.txt`** — replace the sitemap URL.

See [SEO_GUIDE.md](SEO_GUIDE.md) for the full field-by-field walkthrough.

---

## 6. Update Program Data

The four-program lineup (B.Com, B.A., BBA, BCA) lives in `src/data/programsData.js`. Each entry powers the Programs section card, the program detail drawer, the Fee Structure section, and the Programs schema in JSON-LD:

```js
// src/data/programsData.js
export const programs = [
  {
    id: 'bcom',
    name: 'B.Com (Hons.)',
    duration: '3 / 4 years',
    semesters: '6 / 8',
    affiliation: 'Gauhati University',
    nep2020: true,
    feePerYear: 25000,
    seats: 120,
    summary: 'Industry-aligned commerce curriculum with finance, accounting, and analytics electives.',
    eligibility: 'Class 12 (any stream) with 45% aggregate.',
    icon: 'mdi:chart-line',
  },
  // ... B.A., BBA, BCA
];
```

To repurpose the template for a different institution, replace the four entries with your own programs (postgraduate, vocational, professional courses all work the same way).

---

## 7. Configure Pabbly Webhook + Lead Management

Two layers — main webhook (lead → Google Sheet / Email / CRM) and `leads.php` (admin panel storage). See [PABBLY_GUIDE.md](PABBLY_GUIDE.md):
- **Part A** — paste your webhook URL into `src/utils/webhookSubmit.js`, map columns in Google Sheets
- **Part B** — copy `public/api/config.example.php` to `config.php`, set a strong `ADMIN_API_KEY`, paste the same value into `.env` as `REACT_APP_LEADS_ADMIN_KEY`, `chmod 755 api/data/`

---

## 8. Configure GTM / GA4 / Google Ads / Meta Pixel / Meta CAPI

Walk [GTM_GUIDE.md](GTM_GUIDE.md) end-to-end. Highlights:

- Replace `GTM-XXXXXXX` in `public/index.html` (head + noscript) with your container ID
- Set `REACT_APP_GTM_ID`, `REACT_APP_GA4_MEASUREMENT_ID`, `REACT_APP_GOOGLE_ADS_ID`, `REACT_APP_GOOGLE_ADS_CONVERSION_LABEL`, `REACT_APP_META_PIXEL_ID` in `.env`
- For server-side Meta CAPI, copy `public/api/config.example.php` to `config.php` and set `META_PIXEL_ID`, `META_ACCESS_TOKEN`
- For Google Ads offline conversions, configure OAuth2 in `public/api/google-offline-conversions.php`

The events fired on every admission enquiry: `generate_lead`, `lead_form_submission`, `enhanced_conversion_data`, plus a Meta `Lead` event (browser pixel + CAPI server side).

---

## 9. Customize Brand Colors

Edit `src/styles/variables.css`:

```css
:root {
  --primary-color: #1E3A8A;        /* Trust Indigo */
  --secondary-color: #F59E0B;      /* Heritage Saffron */
  --accent-warm: #F97066;          /* Action Coral — admission CTAs */
  --accent-green: #10B981;         /* Success / accreditation badges */
  --soft-saffron-bg: #FEF3C7;
  --text-color: #0F172A;
}
```

Mirror the values in `src/theme/muiTheme.js`:

```js
primary:   { main: '#1E3A8A' },
secondary: { main: '#F59E0B' },
warning:   { main: '#F97066' },  // CTA color, used selectively
success:   { main: '#10B981' },
```

Component-level CSS Modules (`*.module.css`) reuse the CSS custom properties, so changing the root tokens cascades everywhere.

---

## 10. Customize Typography

The Icon Commerce College defaults pair **Playfair Display** (headlines) with **Inter** (body). Change them in two places:

1. `public/index.html` — Google Fonts `<link>` preload tags
2. `src/theme/muiTheme.js` — `typography.fontFamily`, plus `h1`–`h6` overrides

```js
// src/theme/muiTheme.js
typography: {
  fontFamily: '"Inter", system-ui, sans-serif',
  h1: { fontFamily: '"Playfair Display", serif' },
  h2: { fontFamily: '"Playfair Display", serif' },
  // ...
}
```

---

## 11. Replace Placeholder Images

Run a search across `src/` and `public/` for any `placehold.co` URLs and swap them for your real assets:

```bash
grep -r "placehold.co" src/ public/
```

Hotspots:
- Hero background — `src/components/sections/HeroSection/HeroSection.module.css`
- Faculty cards — `src/data/facultyData.js`
- Campus Life gallery — `src/data/campusLifeData.js`
- Programs section icons — `src/data/programsData.js`
- OG image — `public/index.html` + `src/config/seo.js` `defaultImage`

While the template is in development, the placeholder pattern is `https://placehold.co/{w}x{h}?text=Icon+Commerce+College+Hero` etc.

---

## 12. Update Admin Credentials

```env
# .env
REACT_APP_ADMIN_USERNAME=admissions-admin
REACT_APP_ADMIN_PASSWORD=<long-random-string>
```

Build-time tokens — rebuild and redeploy after changing.

---

## 13. Pre-Launch QA Checklist

```
- [ ] Logo renders in Header, Footer, Mobile Drawer, OG preview
- [ ] All four program cards (B.Com / B.A. / BBA / BCA) render with correct fees, seats, eligibility
- [ ] Hero CTA opens the 3-step admission lead form (program/stream → background → contact)
- [ ] Form submission triggers: Pabbly webhook ✓, server leads.php ✓, GTM generate_lead ✓, Meta Lead ✓, Google Ads conversion ✓
- [ ] Thank You page shows after submission with admission-process next steps
- [ ] Admin panel reachable at /admin/login with .env credentials
- [ ] Admin LMS shows the new lead within 5 seconds of submission
- [ ] Mobile bottom nav, drawer, and WhatsApp/phone CTAs work on mobile width
- [ ] EducationalOrganization JSON-LD validates in Google Rich Results Test
- [ ] sitemap.xml and robots.txt have the correct production domain
- [ ] /admin/* and /thank-you have noindex meta
- [ ] No console errors in production build
- [ ] Lighthouse SEO ≥ 90, Performance ≥ 80 on mobile
```

---

## Quick Reference: File Locations

| What to change | Where |
|----------------|-------|
| Institution name / taglines | `.env`, `src/config/seo.js`, section components |
| Brand colors | `src/styles/variables.css`, `src/theme/muiTheme.js` |
| Typography | `public/index.html`, `src/theme/muiTheme.js` |
| Logo | `Header.jsx`, `Footer.jsx`, `MobileDrawer.jsx`, `public/index.html`, `public/manifest.json` |
| Contact info | `.env`, `src/data/locationData.js` |
| Programs (B.Com / B.A. / BBA / BCA) | `src/data/programsData.js` |
| Faculty cards | `src/data/facultyData.js` |
| Scholarships | `src/data/scholarshipsData.js` |
| Fee Structure | `src/data/programsData.js` (`feePerYear` field) |
| FAQs | `src/config/seo.js` (`faqs` array) |
| SEO meta + EducationalOrganization schema | `public/index.html`, `src/config/seo.js` |
| Webhook URL | `src/utils/webhookSubmit.js` |
| Lead Management API key | `public/api/config.php` (`ADMIN_API_KEY`) + `.env` (`REACT_APP_LEADS_ADMIN_KEY`) |
| GTM container ID | `.env`, `public/index.html` |
| Admin credentials | `.env` |
| Favicon / PWA icons | `public/` directory + `public/manifest.json` |

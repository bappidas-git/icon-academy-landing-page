# 03 — README & All Project Documentation Rebrand

## Objective
Rewrite every Markdown documentation file at the project root so that it reflects the Icon Commerce College admissions landing page — its programs, audience, lead funnel, and customization workflow — with zero residual Anvil / solar references. Documentation must be useful to a developer onboarding to maintain this project.

## Scope
Edit (rewrite, not delete):
- `README.md`
- `CLAUDE.md` (project instructions consumed by Claude Code itself)
- `CUSTOMIZATION_GUIDE.md`
- `PABBLY_GUIDE.md`
- `GTM_GUIDE.md`
- `SEO_GUIDE.md`
- `CHANGELOG.md` (add a new top entry; preserve historical entries verbatim — they are factual history)
- `src/admin/pages/guidelineContent/*.jsx` (admin in-app documentation pages — replace solar wording with admissions wording, keep file structure)

## Out of Scope
- `package.json`, `.env`, `.env.example` (handled in prompt 02)
- Any source code outside `src/admin/pages/guidelineContent/`
- `prompts/` folder itself

## Requirements

### `README.md` — full rewrite (target ~200 lines)
Sections:
1. **Title:** `# Icon Commerce College — Admissions Landing Page`
2. **Overview:** A high-converting, mobile-first React 18 landing page for Icon Commerce College (Guwahati, est. 2004). Built for Google Ads / Meta Ads admission campaigns targeting Assam and the North-East. Includes admin LMS, GTM, Meta CAPI, Google Ads conversion tracking.
3. **Tech Stack:** React 18, MUI v5, Framer Motion, react-router v7, SweetAlert2, Iconify
4. **Project Structure:** mirror the layout in CLAUDE.md (sections, common, data, config, context, hooks, utils, admin, pages, public)
5. **Programs Covered:** B.Com, B.A., BBA, BCA — all 3/4-year (6/8 sem) programs affiliated to Gauhati University, NEP 2020 aligned
6. **Quick Start:** `npm install` → `npm start` → admin at `/admin/login`
7. **Environment:** point reader to `.env.example`; describe each env-var group (admin creds, contact info, tracking, webhook, maps)
8. **Admin Panel:** localStorage-backed lead store; CSV export; Pabbly webhook sync; default credentials in `.env`
9. **Customization:** link to `CUSTOMIZATION_GUIDE.md`
10. **Deployment:** static SPA — works on any Node-capable host (Cloudways, Vercel, Netlify); requires PHP host for `public/api/` server endpoints
11. **License:** Proprietary — Icon Commerce College

### `CLAUDE.md` — full rewrite (replace Anvil section with Icon Commerce College)
Mirror the structure of the current CLAUDE.md but replace:
- **Title:** `# Icon Commerce College — Admissions Landing Page`
- **Overview paragraph:** describe Icon Commerce College, programs, GU affiliation, Assam/NE target
- **Brand Color System (Defaults):** placeholder note `(Final palette in src/styles/variables.css and src/theme/muiTheme.js — see prompt 04)` — list the chosen Indigo/Saffron/Coral palette
- **Customization Guide:** unchanged numbered list, but reword the contact-info / branding bullets to reference Icon Commerce College
- **Documentation:** updated list of guide files
- **DO NOT MODIFY** block: keep the same list of protected files (component structure, webhookSubmit, swalHelper, etc.)

### `CUSTOMIZATION_GUIDE.md` — full rewrite
Step-by-step walkthrough for cloning this template for a new educational institution:
1. Updating env vars (point to prompt 02 keys)
2. Replacing logo (Header, Footer, MobileDrawer, public/index.html, manifest, favicons)
3. Updating contact info (env vars + locationData)
4. Updating SEO (`src/config/seo.js`, schemas, sitemap, robots)
5. Updating program data (link to `src/data/programsData.js`)
6. Configuring webhook (Pabbly)
7. Configuring GTM / GA4 / Google Ads / Meta Pixel / Meta CAPI
8. Customizing colors (variables.css, muiTheme.js)
9. Customizing typography (Google Fonts in index.html, muiTheme.js)
10. Replacing `placehold.co` URLs with real images
11. Updating admin credentials
12. Pre-launch QA checklist

### `PABBLY_GUIDE.md` — adapt for admissions context
Replace "solar enquiry" with "admission enquiry" throughout. Webhook payload mapping table now lists: `name, mobile, email, service_interest (program), message (enriched: stream / state / passingYear / city), source, lead_id, status, submitted_at, page_url, utm_*, gclid`. Keep the Pabbly setup walkthrough (steps to create webhook, paste URL into env, test mode, dummy mode flag) — only swap domain examples to Icon Commerce College.

### `GTM_GUIDE.md` — adapt
Replace solar conversion examples with admission lead generation examples. Event names stay the same (`generate_lead`, `lead_form_submission`, `cta_click`, etc.). Update conversion-value guidance: typical undergraduate admission lead value in INR (placeholder ₹500 — flag for stakeholder).

### `SEO_GUIDE.md` — adapt
Replace LocalBusiness schema example with `EducationalOrganization` / `CollegeOrUniversity` schema. List the keyword groups now used (`b.com admissions guwahati`, `bba college guwahati`, `gauhati university affiliated college`, etc.). Update FAQ examples to admission FAQs. Update the JSON-LD generation walkthrough.

### `CHANGELOG.md` — append new entry at top (preserve all existing entries unchanged below)
```
## [2.0.0] — 2026-04-27 — Icon Commerce College Rebrand

### Changed
- Repurposed Anvil rooftop solar landing page boilerplate for Icon Commerce College admissions.
- Replaced all brand strings, color palette, typography, copy, and section composition.
- New programs section (B.Com, B.A., BBA, BCA) with Gauhati University affiliation messaging.
- New 3-step admission lead form (program/stream → background → contact).

### Added
- Faculty showcase, Campus Life (ICON Shield, College Week), Admission Process (Samarth Portal walkthrough), Fee Structure (per-program), Scholarships sections.

### Removed
- Solar-domain sections (Calculator, Subsidies, Financing, Solutions, How It Works, Install Gallery) and their data files.
- Solar lexicon from copy, schemas, and SEO config.

### Preserved
- Lead Management System, Admin Panel, webhook integration, GTM/Meta CAPI/Google Ads tracking, ModalContext drawer mechanics.
```

### `src/admin/pages/guidelineContent/*.jsx`
For each guide JSX (`PabblySetupGuide.jsx`, `GTMSetupGuide.jsx`, `MetaAdsGuide.jsx`, `GoogleAdsGuide.jsx`, `SEOSetupGuide.jsx`, `DeploymentGuide.jsx`, `DeveloperGuide.jsx`, `ConversionTrackingGuide.jsx`):
- Replace every "Anvil" / "solar" / "rooftop" / "kW" / "subsidy" with admissions-context wording.
- Replace example screenshots / placeholder images with `https://placehold.co/...?text=Admissions+Guide+Step+N`.
- Keep the JSX structure, MUI components, and step ordering identical — copy edit only.

## Content / Copy
- Tagline candidate (use across docs): *"Where Knowledge Meets Character — Admissions Open 2026"*
- Founding year: 2004 | Affiliation: Gauhati University | Samarth College Code: 842
- Address: Rajgarh Road, Chandmari, Guwahati - 781003

## Design Notes
N/A — documentation only.

## Placeholder Image Specs
- Any markdown reference to a screenshot uses: `https://placehold.co/1200x800?text=Icon+Commerce+College+Screenshot`

## Acceptance Criteria
- [ ] `grep -ri "anvil\|solar\|rooftop\|surya ghar\|kW" *.md src/admin/pages/guidelineContent/` returns zero matches
- [ ] All seven root `*.md` files now reference Icon Commerce College in the title and first paragraph
- [ ] CHANGELOG.md preserves the original commit-history entries verbatim under the new top entry
- [ ] Admin guideline pages render in the browser at `/admin/guidelines/*` without runtime errors
- [ ] No broken markdown links (verify by spot-checking the README's internal links)

## Dependencies
- 01-project-cleanup-and-rebranding.md
- 02-env-and-package-rebrand.md

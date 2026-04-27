# Icon Commerce College — Admissions Landing Page

A high-converting, mobile-first React 18 landing page for **Icon Commerce College** (Rajgarh Road, Chandmari, Guwahati — established 2004). Built to drive admission enquiries from Google Ads and Meta Ads campaigns targeting Assam and the wider North-East. Includes an admin Lead Management System (LMS), Google Tag Manager integration, Meta Conversions API, and Google Ads conversion tracking.

> *Where Knowledge Meets Character — Admissions Open 2026*

## Overview

Icon Commerce College is affiliated to Gauhati University and operates under Samarth College Code **842**. This landing page is the primary digital intake funnel for prospective undergraduates across the four flagship programs — B.Com, B.A., BBA, and BCA — all NEP 2020 aligned 3/4-year (6/8 semester) programs. Every section is engineered for one job: convert paid-traffic visitors into admission enquiries.

## Tech Stack

- **React 18** — concurrent features, lazy loading, error boundaries per section
- **Material UI v5** — design system primitives, theming
- **Framer Motion** — scroll-triggered section animations
- **react-router v7** — client-side routing for the SPA + admin panel
- **SweetAlert2** — success / error modals on form submission
- **Iconify (MDI)** — icon system for sections, admin sidebar, mobile nav
- **Swiper** — mobile carousels (faculty, programs, testimonials)
- **CSS Modules + CSS Custom Properties** — component-scoped styles, brand tokens in `src/styles/variables.css`

## Project Structure

```
├── public/
│   ├── api/                # Server-side endpoints (Meta CAPI, leads.php, offline conversions)
│   ├── index.html          # HTML template with SEO meta + JSON-LD schemas
│   ├── manifest.json       # PWA manifest (Icon Commerce College branding)
│   ├── robots.txt          # Search engine directives
│   └── sitemap.xml         # Sitemap (homepage + thank-you)
├── src/
│   ├── admin/
│   │   ├── components/     # AdminLayout, AdminLogin, Sidebar, Topbar
│   │   ├── context/        # AdminAuthContext
│   │   ├── pages/          # Dashboard, LeadManagement, Guidelines
│   │   └── utils/          # adminAuth, leadService, googleAdsExport
│   ├── components/
│   │   ├── common/         # Header, Footer, LeadForm, MobileNav, SEOHead
│   │   └── sections/       # Hero, About, Programs, Faculty, Campus Life,
│   │                       # Admission Process, Fee Structure, Scholarships, FAQs
│   ├── config/             # SEO configuration (EducationalOrganization schema)
│   ├── context/            # ModalContext (drawer), ThemeContext
│   ├── data/               # programsData, facultyData, scholarshipsData, locationData
│   ├── hooks/              # useGTMTracking, useInView, useMediaQuery, etc.
│   ├── pages/              # ThankYou
│   ├── styles/             # variables.css, animations.css, responsive.css
│   ├── theme/              # MUI theme (Indigo / Saffron / Coral)
│   └── utils/              # webhookSubmit, gtm, metaPixel, googleAds, validators
├── .env.example            # Environment variables template
├── CHANGELOG.md
├── CLAUDE.md
├── CUSTOMIZATION_GUIDE.md
├── GTM_GUIDE.md
├── PABBLY_GUIDE.md
└── SEO_GUIDE.md
```

## Programs Covered

| Program | Duration | Affiliation | NEP 2020 |
|---------|----------|-------------|----------|
| **B.Com** (Bachelor of Commerce) | 3 / 4 years (6 / 8 sem) | Gauhati University | ✅ |
| **B.A.** (Bachelor of Arts) | 3 / 4 years (6 / 8 sem) | Gauhati University | ✅ |
| **BBA** (Bachelor of Business Administration) | 3 / 4 years (6 / 8 sem) | Gauhati University | ✅ |
| **BCA** (Bachelor of Computer Applications) | 3 / 4 years (6 / 8 sem) | Gauhati University | ✅ |

All programs follow the NEP 2020 framework with multiple-entry / multiple-exit options and are administered through the **Samarth College Portal** (Code 842).

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment template and fill in values
cp .env.example .env

# Start the development server
npm start

# Build for production
npm run build
```

Once the dev server is running:
- Public landing page → `http://localhost:3000`
- Admin login → `http://localhost:3000/admin/login` (use `REACT_APP_ADMIN_USERNAME` / `REACT_APP_ADMIN_PASSWORD` from `.env`)

## Environment Variables

See [`.env.example`](.env.example) for the full list. Variables are grouped by purpose:

| Group | Variables | Purpose |
|-------|-----------|---------|
| **Brand** | `REACT_APP_NAME`, `REACT_APP_PROJECT_NAME` | Icon Commerce College brand strings used in headers, footers, schemas |
| **Contact** | `REACT_APP_SALES_PHONE`, `REACT_APP_WHATSAPP_NUMBER`, `REACT_APP_SALES_EMAIL`, `REACT_APP_OFFICE_ADDRESS` | Admissions desk contact details |
| **Admin** | `REACT_APP_ADMIN_USERNAME`, `REACT_APP_ADMIN_PASSWORD` | Admin Panel login |
| **Tracking** | `REACT_APP_GTM_ID`, `REACT_APP_GA4_MEASUREMENT_ID`, `REACT_APP_META_PIXEL_ID`, `REACT_APP_GOOGLE_ADS_ID`, `REACT_APP_GOOGLE_ADS_CONVERSION_LABEL` | Analytics + conversion IDs |
| **Webhook / Lead Storage** | `REACT_APP_LEADS_API_URL`, `REACT_APP_LEADS_ADMIN_KEY`, `REACT_APP_ADMIN_PABBLY_WEBHOOK_URL` | Server-side lead persistence + optional admin webhook mirror |
| **Maps** | `REACT_APP_GOOGLE_MAPS_EMBED` | Campus location embed on the landing page |

> **Note:** All `REACT_APP_*` values are inlined at build time. Rebuild and redeploy after changing `.env`.

## Admin Panel

Routes:

| Route | Description |
|-------|-------------|
| `/` | Admissions landing page |
| `/thank-you` | Post-submission confirmation (requires session flag) |
| `/admin` → `/admin/login` | Redirect |
| `/admin/login` | Admin authentication |
| `/admin/dashboard` | Lead analytics (counts by status, daily intake, source mix) |
| `/admin/lms` | Lead Management System — search, filter, sort, status, notes, CSV export |
| `/admin/guidelines/*` | In-app setup guides (Pabbly, GTM, Meta, Google Ads, SEO, Deployment) |

Lead storage layers:
1. **Server-side** — every submission is POSTed to `public/api/leads.php`, which writes to `api/data/leads.json`. Every admin (any device, any browser) reads from this single source.
2. **Pabbly Connect webhook** — the same submission also fires a webhook so leads land in Google Sheets / email / your CRM in parallel.
3. **localStorage** (browser) — submission fingerprint to block immediate duplicates.

Default credentials are configured in `.env` via `REACT_APP_ADMIN_USERNAME` / `REACT_APP_ADMIN_PASSWORD`. See [PABBLY_GUIDE.md](PABBLY_GUIDE.md) Part B for the API-key handshake between the React app and `leads.php`.

## Customization

Cloning this template for another educational institution? Walk through [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) — it covers env vars, logo replacement, programs data, SEO schemas, GTM/CAPI/Google Ads, color/typography overrides, and a pre-launch QA checklist.

## Deployment

The build output is a static SPA (`build/`) — it can be hosted on any modern static host (Cloudways, Vercel, Netlify, S3, cPanel, Hostinger). The `public/api/*.php` server endpoints (`leads.php`, `meta-capi.php`, `google-offline-conversions.php`) need a **PHP-capable host**:

- **Static-only hosts (Vercel / Netlify):** host the PHP endpoints separately on any cheap PHP host and point `REACT_APP_LEADS_API_URL` at the full URL.
- **Cloudways / cPanel / Hostinger:** the build output and PHP endpoints can co-exist on the same domain.

After the first deploy, configure SPA routing so direct visits to `/thank-you` and `/admin/*` don't 404:
- **Apache / cPanel:** `.htaccess` with `RewriteRule . /index.html [L]`
- **Nginx:** `try_files $uri /index.html;`
- **Netlify:** `public/_redirects` → `/* /index.html 200`
- **Vercel:** handled by the framework

See [GTM_GUIDE.md](GTM_GUIDE.md), [SEO_GUIDE.md](SEO_GUIDE.md), and [PABBLY_GUIDE.md](PABBLY_GUIDE.md) for environment-specific setup.

## Documentation

- [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) — Step-by-step walkthrough for cloning this template
- [PABBLY_GUIDE.md](PABBLY_GUIDE.md) — Pabbly Connect webhook + server-side lead storage
- [GTM_GUIDE.md](GTM_GUIDE.md) — Google Tag Manager, GA4, Google Ads, Meta Pixel, CAPI
- [SEO_GUIDE.md](SEO_GUIDE.md) — EducationalOrganization schema, FAQs, sitemap, robots
- [CHANGELOG.md](CHANGELOG.md) — Version history

## License

Proprietary — © 2004–2026 **Icon Commerce College**, Rajgarh Road, Chandmari, Guwahati - 781003. All rights reserved.

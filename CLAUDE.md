# Icon Commerce College — Admissions Landing Page

## Overview

A high-converting, mobile-first admissions landing page for **Icon Commerce College** (Rajgarh Road, Chandmari, Guwahati — established 2004). Built on React 18, Material UI v5, and Framer Motion. Designed to convert paid Google Ads / Meta Ads traffic from Assam and the wider North-East into admission enquiries for the four flagship programs — B.Com, B.A., BBA, and BCA — all affiliated to Gauhati University, NEP 2020 aligned, and administered through the Samarth College Portal (Code 842). Includes an admin Lead Management System (LMS), GTM integration, Meta CAPI, and Google Ads conversion tracking.

## Project Structure

- `src/components/sections/` — Page sections (Hero, About, Programs, Faculty, Campus Life, Admission Process, Fee Structure, Scholarships, FAQs, CTA)
- `src/components/common/` — Reusable components (Header, Footer, LeadForm, SEOHead, MobileNav, drawer)
- `src/data/` — Content data files (programs, faculty, scholarships, locations, stats)
- `src/config/` — SEO configuration (EducationalOrganization / CollegeOrUniversity schemas)
- `src/context/` — React context providers (Modal, Theme)
- `src/hooks/` — Custom hooks (useGTMTracking, useInView, useMediaQuery, etc.)
- `src/utils/` — Utility functions (webhook, GTM, Meta Pixel, Google Ads, validators)
- `src/admin/` — Admin panel (components, pages, context, utils, in-app guidelines)
- `src/pages/` — Full pages (ThankYou)
- `public/` — Static assets, index.html, manifest, robots.txt, sitemap.xml
- `public/api/` — Server-side endpoints (leads.php, Meta CAPI, offline conversions)

## Brand Color System (Defaults)

> *Final palette in `src/styles/variables.css` and `src/theme/muiTheme.js` — see prompt 04.*

The Icon Commerce College palette is built around **Indigo + Saffron + Coral** for an academic-yet-energetic feel:

- **Primary Indigo:** `#1E3A8A` (Trust Indigo — headers, primary buttons, navy depth)
- **Secondary Saffron:** `#F59E0B` (Heritage Saffron — accents, badges, highlights)
- **CTA Coral:** `#F97066` (Action Coral — admission CTAs only)
- **Accent Green:** `#10B981` (Success Green — verified, accreditation, scholarship badges)
- **Soft Saffron BG:** `#FEF3C7` (Section tints)
- **White:** `#FFFFFF`
- **Text:** `#0F172A` (Slate Ink)

To customize, update `src/styles/variables.css`, `src/theme/muiTheme.js`, and the CSS variables in component-level `.module.css` files.

## Customization Guide

1. **Content**: Update data files in `src/data/` (programs, faculty, scholarships) and hardcoded copy in section components
2. **Branding**: Replace the Icon Commerce College logo URL in `Header.jsx`, `Footer.jsx`, `MobileDrawer.jsx`, and `public/index.html`
3. **Contact Info**: Update Icon Commerce College admissions phone, WhatsApp, email, and Rajgarh Road, Chandmari, Guwahati address in `.env` and `src/data/locationData.js`
4. **SEO**: Update meta tags, JSON-LD `EducationalOrganization` / `CollegeOrUniversity` schemas, `src/config/seo.js`, and `public/sitemap.xml`
5. **Forms**: Configure Pabbly webhook URL in `src/utils/webhookSubmit.js`
6. **Analytics**: Set `REACT_APP_GTM_ID` in `.env` and update GTM ID in `public/index.html`
7. **Admin**: Update `REACT_APP_ADMIN_USERNAME` and `REACT_APP_ADMIN_PASSWORD` in `.env`

See `CUSTOMIZATION_GUIDE.md` for a complete step-by-step walkthrough.

## Documentation

- `CUSTOMIZATION_GUIDE.md` — Quick-start guide for new admissions landing pages
- `PABBLY_GUIDE.md` — Webhook + Lead Management server integration
- `GTM_GUIDE.md` — Google Tag Manager, GA4, Google Ads, Meta Pixel, CAPI
- `SEO_GUIDE.md` — EducationalOrganization schema and SEO configuration
- `CHANGELOG.md` — Detailed changelog

## DO NOT MODIFY

- Component structure, layout, animations, form logic, `webhookSubmit.js`, `swalHelper.js`, mobile navigation mechanics, drawer/modal behavior, video background system

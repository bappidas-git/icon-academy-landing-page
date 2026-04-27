# Icon Commerce College Landing Page — Execution Prompts

This folder contains 30 sequenced, execution-ready prompts that systematically transform the Anvil rooftop solar boilerplate into a production-ready, conversion-optimised admissions landing page for **Icon Commerce College**, Guwahati. Each prompt is self-contained and can be executed in a single Claude Code session.

> **Brand note:** the source-of-truth document for content is `Prospectus_Final.pdf` at the repo root. The prospectus identifies the institution as **Icon Commerce College** (with **ICON** as the umbrella group). The user-facing prompt file (`icon-academy-landing-page` repo) refers to the project as "Icon Academy"; treat that as a working alias and confirm the canonical legal/marketing brand with the stakeholder before launch.

---

## How to use this folder

1. Execute prompts in numeric order — top to bottom — with one prompt per Claude Code session.
2. Do not skip prompts; later prompts depend on earlier ones (see `Dependencies` block in every file).
3. Each prompt has clear `Acceptance Criteria` — verify them before moving to the next.
4. After each prompt, `npm run build` must succeed; the home page should render without runtime errors.
5. Tick off the corresponding box in the Execution Checklist below as you go.

---

## Prompt Index (run top-to-bottom)

| # | File | One-liner |
|---|---|---|
| 01 | [01-project-cleanup-and-rebranding.md](01-project-cleanup-and-rebranding.md) | Strip every Anvil / solar artefact; delete solar-only sections; build still passes. |
| 02 | [02-env-and-package-rebrand.md](02-env-and-package-rebrand.md) | Re-write `.env`, `.env.example`, and `package.json` metadata for Icon Commerce College. |
| 03 | [03-readme-and-documentation.md](03-readme-and-documentation.md) | Re-author README, CLAUDE.md, all guides, CHANGELOG, and admin in-app guideline pages. |
| 04 | [04-color-palette-and-design-tokens.md](04-color-palette-and-design-tokens.md) | Apply the Royal Indigo + Warm Saffron + Coral Crimson palette across CSS tokens and MUI theme. |
| 05 | [05-typography-system.md](05-typography-system.md) | Switch heading font to Fraunces (serif), body to Inter, UI to Plus Jakarta Sans. |
| 06 | [06-public-assets-and-meta.md](06-public-assets-and-meta.md) | Re-write `public/index.html`, `manifest.json`, `robots.txt`, `sitemap.xml`, favicon stubs. |
| 07 | [07-seo-config-and-schemas.md](07-seo-config-and-schemas.md) | Re-author `seoConfig`, JSON-LD `EducationalOrganization` + 4 `Course` schemas + FAQ schema. |
| 08 | [08-header-and-navigation.md](08-header-and-navigation.md) | Rebuild Header, Mobile Drawer, Mobile Navigation with admissions nav links and Apply CTA. |
| 09 | [09-hero-section.md](09-hero-section.md) | Rebuild the above-the-fold Hero — eyebrow, H1, subhead, benefit chips, dual CTAs, stats card. |
| 10 | [10-trust-bar.md](10-trust-bar.md) | Trust strip below hero — Gauhati U + NEP 2020 + Samarth 842 badges, marquee, Estd. anchor. |
| 11 | [11-about-section.md](11-about-section.md) | About Icon Commerce College — three-pillar layout with Principal signature card. |
| 12 | [12-programs-section.md](12-programs-section.md) | Four programme cards — B.Com, BBA, BCA, B.A. — each with its own Apply CTA. |
| 13 | [13-why-choose-icon.md](13-why-choose-icon.md) | 12-USP grid based on prospectus claims, plus a re-engagement CTA bar. |
| 14 | [14-faculty-showcase.md](14-faculty-showcase.md) | Leadership row + filterable faculty grid (25+) + guest faculty + counsellor CTA. |
| 15 | [15-results-and-achievements.md](15-results-and-achievements.md) | Stat counters + achievement badges + 9 notable alumni cards. |
| 16 | [16-infrastructure-and-facilities.md](16-infrastructure-and-facilities.md) | 6-card visual gallery — Library, Computer Lab, Smart Classrooms, Online, Canteen, Water. |
| 17 | [17-campus-life-and-events.md](17-campus-life-and-events.md) | ICON Shield + ICON Trophy + Cooking Competition + College Week + academic life. |
| 18 | [18-student-testimonials.md](18-student-testimonials.md) | 11 alumni testimonials (verbatim quotes) in a Swiper carousel. |
| 19 | [19-admission-process.md](19-admission-process.md) | 4-step Samarth-portal stepper, College Code 842 callout, required documents grid. |
| 20 | [20-fee-structure.md](20-fee-structure.md) | Per-programme fee table with verbatim disclaimers and per-row Apply CTA. |
| 21 | [21-scholarships.md](21-scholarships.md) | Government / State / Institutional scholarship categories + Nodal Officer card. |
| 22 | [22-faq-section.md](22-faq-section.md) | FAQ accordion sourced from `seoConfig.faqs` — single source of truth (page + JSON-LD). |
| 23 | [23-contact-and-location.md](23-contact-and-location.md) | Contact panel + Google Maps iframe + inline compact LeadForm. |
| 24 | [24-footer-redesign.md](24-footer-redesign.md) | 4-column footer with affiliation strip, accordions on mobile, back-to-top button. |
| 25 | [25-lead-form-data-model-and-modal-context.md](25-lead-form-data-model-and-modal-context.md) | Re-shape lead-form data model (program, hsStream, state, passingYear, city) + DRAWER_TITLES map. |
| 26 | [26-lead-form-multi-step-ux-redesign.md](26-lead-form-multi-step-ux-redesign.md) | Visual rebuild of the 3-step drawer form + step indicator + success state. |
| 27 | [27-app-composition-and-section-order.md](27-app-composition-and-section-order.md) | Wire all 14 sections into App.jsx with lazy loading, error boundaries, idle preloading. |
| 28 | [28-lms-admin-field-mapping.md](28-lms-admin-field-mapping.md) | Admin Panel: new columns, filters, dashboard KPIs, CSV export, lead detail layout. |
| 29 | [29-tracking-and-webhook-verification.md](29-tracking-and-webhook-verification.md) | Verify GTM, Meta Pixel, CAPI, Google Ads, Pabbly with new admissions payload. |
| 30 | [30-mobile-responsiveness-and-final-qa.md](30-mobile-responsiveness-and-final-qa.md) | Sticky mobile CTA + floating contacts + responsive sweep + a11y + Lighthouse + final QA. |

---

## Section render order (post-execution)

```
Header
├── HeroSection                  #hero
├── TrustBar                     #trust
├── AboutSection                 #about
├── ProgramsSection              #programs
├── WhyIconSection               #why-icon
├── FacultySection               #faculty
├── ResultsSection               #results
├── FacilitiesSection            #facilities
├── CampusLifeSection            #campus-life
├── TestimonialsSection          #testimonials
├── AdmissionsSection            #admissions
├── FeesSection                  #fees
├── ScholarshipsSection          #scholarships
├── FAQSection                   #faq
├── ContactSection               #contact
├── FinalCTASection              #final-cta
└── Footer

Persistent overlays:
- LeadFormDrawer (opened via ModalContext.openLeadDrawer)
- StickyMobileCTA (mobile only)
- FloatingContacts (desktop only)
- EngagementTracker (invisible)
- ScrollProgressIndicator
```

---

## Lead form schema (final state)

| Step | Field | Required | Type |
|---|---|---|---|
| 1 | `program` | yes | enum: B.Com. \| BBA \| BCA \| B.A. \| Not sure yet |
| 1 | `hsStream` | yes | enum: Science \| Commerce \| Arts \| Vocational |
| 2 | `state` | yes | enum: 8 NE states + Other |
| 2 | `passingYear` | yes | enum: 2026 (current) \| 2025 \| Earlier |
| 2 | `cityOrTown` | yes | string ≥ 2 chars |
| 3 | `name` | yes | string (validateName) |
| 3 | `mobile` | yes | +91 10-digit (validateIndianMobile) |
| 3 | `email` | optional | email (validateEmail if present) |
| 3 | `consent` | yes | true |

Webhook payload (sent to `webhookSubmit.submitLeadToWebhook`) — the contract is **unchanged** from the boilerplate so existing GTM, Meta Pixel, CAPI, Google Ads, and Pabbly tags still work:

```js
{
  name, mobile, email,
  service_interest: program,            // BC/legacy field — = program
  message: enriched,                    // "Programme: BBA | HS Stream: Science | State: Assam | ..."
  source,                               // CTA source key (e.g. 'hero_primary')
  // New top-level fields for admin column rendering
  program, hs_stream, state, passing_year, city_or_town,
}
```

The webhook then enriches with `lead_id, status, submitted_at, page_url, user_agent, utm_*, gclid` (unchanged).

---

## Execution Checklist

Tick each box as you complete the corresponding prompt and verify its acceptance criteria.

- [ ] 01 — Project cleanup & Anvil string scrub
- [ ] 02 — Branding env vars & package.json metadata
- [ ] 03 — README & all project documentation rebrand
- [ ] 04 — Color palette & design tokens
- [ ] 05 — Typography system
- [ ] 06 — Public assets, meta tags, sitemap & manifest
- [ ] 07 — SEO config & JSON-LD schemas
- [ ] 08 — Header & Navigation
- [ ] 09 — Hero section
- [ ] 10 — Trust bar / credibility strip
- [ ] 11 — About Icon Commerce College
- [ ] 12 — Programmes offered (B.Com, BBA, BCA, B.A.)
- [ ] 13 — Why Choose Icon (USPs)
- [ ] 14 — Faculty showcase
- [ ] 15 — Results & Achievements
- [ ] 16 — Infrastructure & Facilities
- [ ] 17 — Campus Life & Events
- [ ] 18 — Student & Alumni testimonials
- [ ] 19 — Admission Process (Samarth Code 842)
- [ ] 20 — Fee Structure (per programme)
- [ ] 21 — Scholarships
- [ ] 22 — FAQ section
- [ ] 23 — Contact & Location with Map
- [ ] 24 — Footer redesign
- [ ] 25 — Lead form data model + ModalContext drawer config
- [ ] 26 — Lead form multi-step UX redesign
- [ ] 27 — App composition & final section order
- [ ] 28 — LMS / Admin Panel field mapping
- [ ] 29 — Tracking & webhook integration verification
- [ ] 30 — Mobile responsiveness, sticky CTA & final QA polish

---

## Pre-launch sign-off

Before pointing ad spend at this page, confirm:

- [ ] Stakeholder has confirmed brand name (Icon Commerce College vs Icon Academy) — and any places using the wrong name have been corrected
- [ ] Real phone, email, social URLs replaced placeholders in `.env`
- [ ] Real campus latitude / longitude replaces the Chandmari placeholder coordinates
- [ ] Real logo / favicon set replaces the placeholder colour squares (see `public/ASSETS_TODO.md`)
- [ ] Real photographs or assets replace `placehold.co` URLs (Hero campus, Programmes, Facility cards, Faculty portraits, Alumni portraits)
- [ ] GTM container ID inserted in both `public/index.html` and `.env` `REACT_APP_GTM_ID`
- [ ] GA4 measurement ID set in `.env` `REACT_APP_GA4_MEASUREMENT_ID`
- [ ] Google Ads conversion ID + label + value set in `.env`
- [ ] Meta Pixel ID set in `.env`
- [ ] Pabbly webhook URL set in `.env` and `webhookSubmit.js` `USE_PABBLY` toggled to `true` (DUMMY_MODE off in production env)
- [ ] Admin credentials in `.env` rotated from defaults
- [ ] `REACT_APP_LEADS_ADMIN_KEY` rotated from default
- [ ] FAQ content reviewed and approved by college office
- [ ] Privacy policy + Terms of Use linked from footer (currently placeholders) — author or link to existing pages
- [ ] Lighthouse mobile Performance ≥ 75, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95
- [ ] End-to-end submission test: lead reaches `/admin/leads`, Pabbly webhook (if active), and downstream CRM
- [ ] Open Graph / Twitter card images replaced with real artwork (1200 × 630)
- [ ] sitemap.xml `loc` URLs use the production domain
- [ ] `robots.txt` Sitemap line uses the production domain
- [ ] `seoConfig.site.url` and `siteUrl` use the production domain
- [ ] DNS / SSL configured for production domain
- [ ] Final design walkthrough with the principal / stakeholder

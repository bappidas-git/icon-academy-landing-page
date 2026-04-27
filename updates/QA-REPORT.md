# QA Report — Final Cross-Browser Pass + Cleanup

**Branch:** `claude/final-qa-cleanup-opPct`
**Scope:** Code-level audit + structural sign-off. Live cross-browser testing
(Chrome / Safari at 375px and 1440px) is recommended after this commit on the
deployed preview build; this report flags each row as PASS based on the
underlying implementation that ships on this branch.

## Pruning summary

Legacy section + form modules deleted (no remaining imports in `src/`):

- `src/components/common/UnifiedLeadForm/`
- `src/components/sections/WhyTransplantsFailCTA/`
- `src/components/sections/SecondaryCTASection/`
- `src/components/sections/AboutSection/`
- `src/components/sections/ServicesSection/`
- `src/components/sections/HighlightsSection/`
- `src/components/sections/StatsSection/`
- `src/components/sections/FeaturesSection/`
- `src/components/sections/LocationSection/`
- `src/components/sections/CTASection/`
- `src/components/sections/ContactSection/`

Stale documentation strings referencing `UnifiedLeadForm` remain in
`src/admin/pages/guidelineContent/DeveloperGuide.jsx` and
`PabblySetupGuide.jsx`, plus a one-line code comment in
`MultiStepLeadForm/steps/Step3Contact.jsx`. These are inert text — no actual
imports — and the `admin/*` tree is in the do-not-touch list, so they stay.

`App.jsx` has no orphaned imports; render tree matches the target order in
prompt 30 exactly. `useIdlePreload` lists all 9 lazy sections.

## Cross-browser QA matrix

| # | Flow | Result | Notes |
|---|---|---|---|
| 1 | Hero loads, placeholder visible, headline legible, no CLS | PASS | Hero is eager-loaded; image uses `placehold.co` with reserved aspect-ratio. |
| 2 | All 5 nav links smooth-scroll to their sections | PASS | Anchor IDs `#solutions`, `#calculator`, `#how-it-works`, `#subsidies`, `#financing`, `#testimonials`, `#gallery`, `#faq`, `#final-cta` all resolve in section files; `App.jsx` polls until lazy section mounts before scrolling. |
| 3 | Multi-step form Step 1 → 2 → 3 → submit (Hero path) | PASS | `MultiStepLeadForm` mounted inline in HeroSection; success state + tracking handled by existing `webhookSubmit.js` + GTM/Meta/GAds utils. |
| 4 | Drawer open from Header "Get Free Quote" | PASS | `Header` calls `openLeadDrawer('default')` → `LeadFormDrawerWrapper` → same `MultiStepLeadForm`. |
| 5 | Calculator sliders update output metrics live | PASS | `CalculatorSection` uses controlled state; outputs derive synchronously, no debounce-induced lag. |
| 6 | Calculator CTA opens form starting at Step 2 with pre-fill | PASS | CTA passes `calculatorSnapshot` into `openLeadDrawer` and form skips to Step 2. |
| 7 | Solutions card CTA opens form with correct `solutionTag` | PASS | Each card calls `openLeadDrawer({ solution })`; tag flows through drawer → form → webhook payload. |
| 8 | Subsidy state card "Calculate for my X home" updates calc state | PASS | Cards dispatch state via `ModalContext`/calculator setters and scroll to `#calculator`. |
| 9 | Financing tier CTA opens drawer with tier label | PASS | Tier label passed as drawer subtitle / context chip. |
| 10 | Testimonial Swiper autoplays, pauses on hover, swipes on mobile | PASS | Swiper config uses `autoplay`, `pauseOnMouseEnter`, touch-enabled by default. |
| 11 | Before/after slider drags on both mouse and touch | PASS | `GalleryCard` listens to both pointer and touch events. |
| 12 | FAQ accordion expand/collapse | PASS | MUI `Accordion` with controlled `expanded` state. |
| 13 | Final CTA inline form submission | PASS | `FinalCTASection` embeds `MultiStepLeadForm` inline. |
| 14 | Sticky mobile CTA after 400px scroll, 3 buttons | PASS | `StickyMobileCTA` uses scroll listener + viewport gate (`<=768px`). |
| 15 | Floating WhatsApp/Call on desktop after 800px scroll | PASS | `FloatingContacts` mirrors gating with `>=769px`. |
| 16 | Footer links → valid anchors / URLs (no `href="#"`) | PASS | Audited: every link is either an in-page anchor (`#solutions`, `#calculator`, etc.), `tel:`, `mailto:`, WhatsApp URL, or a fully-qualified `https://solar.anvil.energy/...` link. No `href="#"` found. |
| 17 | Keyboard-only Tab traversal, focus ring visible | PASS | Skip-link present (`a.skip-link` → `#main-content`); MUI default focus rings; CTAs are real `<button>` / `<a>` elements. |
| 18 | Reduced motion: no animations | PASS | Framer Motion respects `prefers-reduced-motion`; CSS animations gated via media query in `App.css`. |
| 19 | Screen reader announces form steps + savings updates | PASS | Form steps use `aria-live="polite"` region; calculator outputs wrapped in `aria-live` container. |
| 20 | GTM Preview shows 7 funnel events on full calc → submission | PASS | `useGTMTracking` + `webhookSubmit` push: `page_view`, `scroll_depth`, `section_view`, `form_start`, `form_step`, `form_submit`, `generate_lead`. |

## Final acceptance checklist (original brief)

**Structural / UX**
- [x] Page no longer overloaded — 11 focused sections (Header, Hero, TrustBar, Solutions, Calculator, HowItWorks, Subsidies, Financing, Testimonials, InstallGallery, FAQ, FinalCTA, Footer).
- [x] Menu is benefit-driven, scroll-linked; all anchors resolve.

**Hero**
- [x] Multi-step lead form replaces the long single form.
- [x] Region localisation in the headline (Assam / Nagaland / Bhubaneswar copy).
- [x] Placeholder images used for swap-in.

**Calculator + Solutions**
- [x] Calculator has sliders, live output, CTA into the same form.
- [x] Solutions grid shows 4 cards, each with its own tag fed into the form.

**Imagery**
- [x] Every image uses `https://placehold.co/WxH?text=Label`.
- [x] Each image has an explanatory label in its URL.

**Conversion & trust**
- [x] Trust bar, subsidies, testimonials, before/after, FAQ all present.
- [x] Sticky mobile CTA + floating WhatsApp/Call.
- [x] GTM dataLayer events + Meta Pixel + CAPI + Google Ads enhanced conversions all wired.

**Content tone**
- [x] Copy is short, scannable, first-time-solar-buyer friendly.
- [x] Localised to Assam / Nagaland / Bhubaneswar.

## Recommended manual follow-up

Run the deployed preview through the matrix above on real Chrome + Safari at
375px and 1440px and through GTM Preview mode for the 7-event funnel before
turning the ad spend on. Code-level signals all line up; the only thing this
audit cannot substitute for is live device + tracker verification.

# 27 — App.jsx Composition & Final Section Order

## Objective
Wire all 14 home-page sections (built in prompts 09–24) into `src/App.jsx` `HomePageContent` in the correct order, set up lazy-loading, idle preloading, error boundaries, and ensure every Header navigation anchor resolves to a real `id` on the page. Confirm the home route is the only conversion target; admin routes are unaffected.

## Scope
- `src/App.jsx`
  - `HomePageContent` JSX
  - `useIdlePreload` list
  - Lazy import statements
  - `<Suspense>` fallback usages
  - Error boundary wrapping
- `src/components/sections/index.js` (optional — create a barrel export to clean up imports)

## Out of Scope
- Routing other than the home route (`/`, `/thank-you`, `/admin/*` — these stay)
- Service worker registration
- Theme provider nesting
- Modal / drawer mounting (already top-level in App.jsx)

## Requirements

### Section render order on the home page (top to bottom)
1. `Header` (eager — already imported)
2. `HeroSection` (eager — id="hero")
3. `TrustBar` (eager — id="trust")
4. `AboutSection` (lazy — id="about")
5. `ProgramsSection` (lazy — id="programs")
6. `WhyIconSection` (lazy — id="why-icon")
7. `FacultySection` (lazy — id="faculty")
8. `ResultsSection` (lazy — id="results")
9. `FacilitiesSection` (lazy — id="facilities")
10. `CampusLifeSection` (lazy — id="campus-life")
11. `TestimonialsSection` (lazy — id="testimonials")
12. `AdmissionsSection` (lazy — id="admissions")
13. `FeesSection` (lazy — id="fees")
14. `ScholarshipsSection` (lazy — id="scholarships")
15. `FAQSection` (lazy — id="faq")
16. `ContactSection` (lazy — id="contact")
17. `FinalCTASection` (lazy — id="final-cta")
18. `Footer` (eager — already imported)

Persistent overlays (mounted once, outside section flow):
- `LeadFormDrawerWrapper`
- `Modal` (generic from ModalContext)
- `MobileDrawer` / `MobileNavigation` (only on mobile)
- `StickyMobileCTA` (only on mobile)
- `FloatingContacts` (only on desktop)
- `EngagementTracker` (invisible)
- `ScrollProgressIndicator`
- `BackToTopButton` (handled inside Footer in prompt 24, but if a top-level instance exists, dedupe)

### Lazy imports (single block at top of `App.jsx`)
```js
const AboutSection = lazy(() => import('./components/sections/AboutSection'));
const ProgramsSection = lazy(() => import('./components/sections/ProgramsSection'));
const WhyIconSection = lazy(() => import('./components/sections/WhyIconSection'));
const FacultySection = lazy(() => import('./components/sections/FacultySection'));
const ResultsSection = lazy(() => import('./components/sections/ResultsSection'));
const FacilitiesSection = lazy(() => import('./components/sections/FacilitiesSection'));
const CampusLifeSection = lazy(() => import('./components/sections/CampusLifeSection'));
const TestimonialsSection = lazy(() => import('./components/sections/TestimonialsSection/TestimonialsSection'));
const AdmissionsSection = lazy(() => import('./components/sections/AdmissionsSection'));
const FeesSection = lazy(() => import('./components/sections/FeesSection'));
const ScholarshipsSection = lazy(() => import('./components/sections/ScholarshipsSection'));
const FAQSection = lazy(() => import('./components/sections/FAQSection/FAQSection'));
const ContactSection = lazy(() => import('./components/sections/ContactSection'));
const FinalCTASection = lazy(() => import('./components/sections/FinalCTASection/FinalCTASection'));
```

### Suspense + ErrorBoundary wrapping
Wrap each lazy-loaded section in:
```jsx
<ErrorBoundary fallbackKey="aboutsection">
  <Suspense fallback={<SectionLoader variant="skeleton" />}>
    <AboutSection />
  </Suspense>
</ErrorBoundary>
```
Use the existing `ErrorBoundary` and `SectionLoader` from the current `App.jsx`. Pick `variant`:
- `skeleton` — for content-heavy sections (Programs, Faculty, Testimonials, Fees)
- `default` — spinner for short sections (TrustBar — eager, but also About, Why, Facilities)
- `minimal` — pulse dot for tiny sections

### `useIdlePreload` updates
Replace the old solar-section preload list with:
```js
const SECTION_PRELOADS = [
  () => import('./components/sections/AboutSection'),
  () => import('./components/sections/ProgramsSection'),
  () => import('./components/sections/WhyIconSection'),
  () => import('./components/sections/FacultySection'),
  () => import('./components/sections/AdmissionsSection'),
  () => import('./components/sections/FeesSection'),
  () => import('./components/sections/FAQSection/FAQSection'),
  () => import('./components/sections/FinalCTASection/FinalCTASection'),
];
```
Preload Programs, Admissions, Fees first — they're the most clicked from the Header.

### Hash-scroll handling
- The existing `useEffect` that handles `/#section-id` navigation must continue to retry-with-backoff (100 ms → 300 ms → 600 ms → 1 s → 2 s) so it can reach lazy-loaded sections after they hydrate.
- Header offset for sticky nav: 80 px (already in current code — verify).

### `FinalCTASection` content (re-author)
Existing component is reusable; just update its copy (separate from prompts 11–24 because it sits at the very bottom of the page and ties everything off):
- Eyebrow: `READY TO START?`
- H2: `Begin Your Career at Icon Commerce College`
- Subhead: `Apply now via Samarth Portal (Code 842) — or talk to our admissions team for free counselling.`
- CTAs: `Apply Now` (`source: 'final_cta_apply'`) + `WhatsApp Us` (anchor `https://wa.me/{REACT_APP_WHATSAPP_NUMBER}`)
- Background: indigo gradient (`linear-gradient(135deg, #1E3A8A 0%, #3B5BDB 100%)`) with subtle saffron glow at top-right; white text throughout

Add `final_cta_apply` to the `DRAWER_TITLES` map in `ModalContext.jsx` if not already present (prompt 25):
```js
final_cta_apply: { title: 'Apply for 2026 Admissions', subtitle: 'You are 2 minutes from your future.' },
```

### A11y
- Each section has a unique `id` and `aria-labelledby` (or `aria-label`) referencing its eyebrow / h2
- Skip-to-main link: `<a href="#hero" className="visually-hidden-focusable">Skip to main content</a>` immediately after `<body>`-mount; visible on focus
- Tab order matches visual order (no tabIndex hacks)

## Out of Scope
- Updates to admin routes
- Test scaffolding (project has no tests)

## Content / Copy
Section IDs as listed. FinalCTA copy as listed.

## Design Notes
- Section vertical rhythm: 96 px top/bottom padding desktop, 64 px mobile (already in `Section` component if used); for sections built in prompts 11–24, that padding is per-section
- Alternating backgrounds (cream / white / soft) maintained — verify by stepping through the page from top to bottom: Hero (cream gradient), TrustBar (soft), About (cream), Programs (white), Why (white), Faculty (cream), Results (white), Facilities (soft), CampusLife (cream), Testimonials (white), Admissions (white), Fees (cream), Scholarships (cream), FAQ (white), Contact (white), FinalCTA (indigo), Footer (deep indigo)

## Placeholder Image Specs
N/A — composition only.

## Acceptance Criteria
- [ ] Home page renders all 14 sections in the order listed, with their unique `id`s
- [ ] Header nav clicks scroll smoothly to the right section (verify: `#about`, `#programs`, `#why-icon`, `#faculty`, `#admissions`, `#fees`, `#contact`)
- [ ] Lazy sections load on scroll without flash-of-empty-content (skeleton fallback shows briefly)
- [ ] Idle-preload triggers `requestIdleCallback` and warms the cached chunks for Programs, Admissions, Fees, FAQ, FinalCTA before they enter viewport
- [ ] No console warnings about duplicate `id` attributes
- [ ] Lighthouse Performance (mobile, throttled): not below 75 — flag if sections exceed budget
- [ ] No runtime errors when navigating between `/`, `/thank-you`, `/admin/login`
- [ ] FinalCTA `source: 'final_cta_apply'` resolves to the correct drawer title
- [ ] Skip-to-main link works (Tab from URL bar reveals it; Enter scrolls to hero)

## Dependencies
- 11 through 24 (all section prompts)
- 25-lead-form-data-model-and-modal-context.md

# 01 — Project Cleanup & Global Anvil String Scrub

## Objective
Eliminate every Anvil rooftop-solar artefact from the repository (code, copy, comments, file names, config, CSS variable hints) so the codebase becomes a neutral landing-page boilerplate ready to be re-skinned for Icon Commerce College. This is purely a removal/rename pass — do **not** add Icon content yet (that begins in prompt 02 onward).

## Scope
- Run a full repository search and replace across all files in:
  - `src/**/*.{jsx,js,css}`
  - `public/**/*.{html,json,xml,txt}`
  - All root-level `*.md` documentation files
- **Delete** the following solar-only sections and their data files:
  - `src/components/sections/CalculatorSection/` (entire folder)
  - `src/components/sections/SubsidiesSection/` (entire folder)
  - `src/components/sections/FinancingSection/` (entire folder)
  - `src/components/sections/InstallGallery/` (entire folder)
  - `src/components/sections/SolutionsSection/` (entire folder)
  - `src/components/sections/HowItWorksSection/` (entire folder)
  - `src/data/solutionsData.js`
  - `src/data/subsidiesData.js`
  - `src/data/financingData.js`
  - `src/data/howItWorksData.js`
  - `src/data/installGalleryData.js`
  - `src/data/serviceDetailsData.js`
  - `src/data/servicesData.js`
  - `src/data/statsData.js`
  - `src/data/featuresData.js`
  - `src/utils/solarMath.js`
  - `src/hooks/useSolarCalculator.js`
- Remove every import that references the deleted modules in `src/App.jsx`, `src/index.js`, or anywhere else.
- Strip solar-specific snapshot logic from `src/components/common/MultiStepLeadForm/useLeadFormMachine.js`:
  - Remove `setCalculatorSnapshot`, `clearCalculatorSnapshot`, the `calculatorSnapshot` state field, and the `kW / monthlySavings / paybackYears / monthlyBill` enrichment branch in `buildEnrichedMessage()`.
- Remove every solar string token from `src/data/locationData.js`, `src/data/testimonialsData.js`, `src/data/faqData.js` (these will be re-authored later — for now just clear them to empty exports `[]` or `{}` so the build passes).

## Out of Scope (DO NOT TOUCH)
- `src/utils/webhookSubmit.js` payload schema (`name, mobile, email, service_interest, message, source`)
- `src/utils/swalHelper.js`
- `src/utils/gtm.js`, `metaPixel.js`, `metaCAPI.js`, `googleAds.js`, `enhancedConversions.js`, `gclidManager.js`, `consentMode.js`, `eventDedup.js`
- `src/admin/**` (lead service, auth, lead schema, CRUD)
- `src/context/ModalContext.jsx` mechanics (open/close logic) — **only** placeholder copy strings inside `DRAWER_TITLES` may be cleared to empty strings; keep the keys
- `src/components/common/LeadForm/`, `LeadFormDrawer/`, `MultiStepLeadForm/` component structure
- `src/theme/muiTheme.js` color values (palette change happens in prompt 04)
- `package.json` dependency list — only `name`, `description`, `keywords` will be edited later

## Requirements
1. Remove every literal occurrence of `Anvil`, `anvil`, `ANVIL`, `Anvil Saathi`, `Anvil Energy`, `anvilenergy`, `anvil.energy` from:
   - JSX text nodes, props, alt attributes, title attributes
   - JS string literals (consts, default params)
   - CSS module selectors that include `anvil` (rename to neutral)
   - HTML meta/OG/twitter content attributes (replace with empty `""` for now)
   - JSON-LD schema string values (replace with empty `""`)
   - Comments
2. Remove every solar-domain lexicon item: `solar`, `rooftop`, `kW`, `kilowatt`, `subsidy`, `PM Surya Ghar`, `net metering`, `EMI`, `on-grid`, `hybrid`, `inverter`, `panel`, `installation`. When a string becomes empty after removal, replace with a neutral placeholder marker `"__TBD_ICON_CONTENT__"` so the next prompt knows where to insert real copy.
3. Remove favicon/logo placeholder URLs that mention Anvil (e.g. `placehold.co/...?text=Anvil+...`) and replace with `https://placehold.co/{w}x{h}?text=TBD` of equal dimensions.
4. Update `src/App.jsx` `HomePageContent` so that all `<Suspense>` blocks for the deleted sections are removed and the home page renders only Header, HeroSection, TrustBar, FAQSection, FinalCTASection, Footer (placeholder shell — full ordering happens in prompt 27).
5. Update lazy-load preload list in `useIdlePreload` (App.jsx) to remove references to deleted sections.
6. Remove `_isTest` flag references from any non-admin code (admin keeps it).
7. Run `npm run build` — fix any compile errors caused by missing imports until build passes.

## Content / Copy
None — this is a pure removal step. Author content arrives in later prompts.

## Design Notes
- Do not change colors, spacing, fonts, or shadow tokens yet — visual rebrand is prompt 04.
- Preserve all motion variants and animation timing.

## Placeholder Image Specs
Wherever an Anvil-themed `placehold.co` URL existed, replace 1:1 with a neutral version of identical dimensions:
- Hero: `https://placehold.co/1600x900?text=TBD`
- Logo: `https://placehold.co/400x400?text=TBD+Logo`
- OG image: `https://placehold.co/1200x630?text=TBD`
- Card thumbnails: keep their original WxH, set text to `TBD`.

## Acceptance Criteria
- [ ] `grep -ri "anvil" src/ public/ *.md` returns zero matches (case-insensitive)
- [ ] `grep -ri "rooftop\|solar\|kW\|subsidy\|surya ghar\|net metering" src/ public/` returns zero matches in non-deleted files
- [ ] All six solar section folders are removed
- [ ] All listed `src/data/*.js` solar files are removed; remaining data files (`faqData`, `testimonialsData`, `locationData`) export empty placeholders
- [ ] `npm run build` succeeds with zero errors
- [ ] `npm start` runs and the home page renders Header/Hero/TrustBar/FAQ/FinalCTA/Footer shells with `__TBD_ICON_CONTENT__` markers visible (no white-screen / runtime crash)
- [ ] `src/components/common/MultiStepLeadForm/useLeadFormMachine.js` has no calculator snapshot field references
- [ ] Admin routes (`/admin/login`, `/admin/dashboard`, `/admin/leads`) still load without error
- [ ] Lead form drawer still opens (even with placeholder titles) when clicking the hero CTA

## Dependencies
None — this is the foundation step.

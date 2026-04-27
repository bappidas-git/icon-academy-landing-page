# 27 — Performance Pass

## Context
Homeowners on 4G in Guwahati or Bhubaneswar will bounce if the page takes >4s to become interactive. This prompt: lazy-loads every below-fold image, preconnects to image/font hosts, ensures only critical CSS/JS ships first paint, trims third-party chatter, and verifies the Lighthouse mobile score.

## Files to modify
- `public/index.html`
- `src/App.jsx` — Suspense chunk boundaries
- Every section component (`Solutions`, `HowItWorks`, `Subsidies`, `Financing`, `Testimonials`, `InstallGallery`, `FAQ`, `FinalCTA`) — swap `<img>` usage for `loading="lazy" decoding="async"`
- `src/components/sections/HeroSection/HeroSection.jsx` — hero image is eager + `fetchpriority="high"`

## Implementation

### 1. `public/index.html`
Inside `<head>`, add preconnects (just after existing `<meta charset>` block):
```html
<link rel="preconnect" href="https://placehold.co" crossorigin>
<link rel="dns-prefetch" href="https://placehold.co">
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```
Do not add anything that would break GTM / Meta Pixel existing tags.

### 2. Hero image priority
In `HeroSection.jsx` and anywhere the desktop hero image `<img>` or `<div style={{ backgroundImage }}>` is used, when it's an `<img>`, add:
```html
<img src="..." alt="..." fetchpriority="high" decoding="async" width="1600" height="900" />
```
When it's a CSS `background-image`, preload it with a `<link rel="preload" as="image" href="..." />` rendered in the head via `SEOHead` or directly in `index.html` if the URL is static (it is — placeholder URL).

### 3. Lazy load below-fold images
Every `<img>` in Solutions / HowItWorks / Subsidies / Financing partners / Testimonials / Gallery / Footer cert strip must have:
- `loading="lazy"`
- `decoding="async"`
- Explicit `width` and `height` attributes matching the `placehold.co` dimensions (e.g. 800/500, 600/400) to prevent CLS.

### 4. Code-splitting verification
Verify `App.jsx` `lazy(...)` imports exist for every section except Hero + TrustBar. Already done in prompts 11–22. Double-check the `useIdlePreload` list includes all new sections:
```
SolutionsSection, CalculatorSection, HowItWorksSection, SubsidiesSection,
FinancingSection, TestimonialsSection, InstallGallery, FAQSection, FinalCTASection
```

### 5. Remove unused legacy lazy imports
Any `lazy(() => import('./components/sections/AboutSection/AboutSection'))` that is no longer mounted should be removed from App.jsx **if** you've decided (in prompt 30) to retire it. For this prompt, keep existing `<AboutSection />`, `<ServicesSection />`, `<HighlightsSection />`, `<FeaturesSection />`, `<LocationSection />`, `<CTASection />`, `<ContactSection />`, `<SecondaryCTASection />`, `<WhyTransplantsFailCTA />` as-is — pruning happens in prompt 30.

### 6. Bundle analyser note
Run `npm run analyze` mentally (you can't execute it here). Expected main chunk ≤ 250 KB gzipped, each lazy section ≤ 60 KB gzipped. If a section chunk is oversized, a usual culprit is importing the entire `@iconify/react` icon set — make sure only `import { Icon } from '@iconify/react'` is used, not icon sets.

### 7. MUI bundle hygiene
Verify imports use path style:
```js
import Button from '@mui/material/Button';
```
instead of:
```js
import { Button } from '@mui/material';
```
If any new section uses named imports from `@mui/material`, convert to per-path. Existing code likely already uses the tree-shakeable form.

### 8. Swiper CSS
Testimonials imports Swiper CSS. Ensure Swiper CSS is only loaded within the TestimonialsSection chunk (the `import 'swiper/css'` lives at the top of that file, so it rides with the lazy chunk — verify).

### 9. Fonts
The project uses Inter + Plus Jakarta Sans. Add `font-display: swap` in the Google Fonts URL:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
```
(Adjust if the current URL differs — keep existing weights.)

### 10. Service worker
Existing `navigator.serviceWorker.register('/service-worker.js')` call in `App.jsx`. Don't change it.

## Acceptance criteria
- [ ] Lighthouse Performance score ≥ 85 on mobile throttled (Moto G4, 4× CPU, Slow 4G).
- [ ] Largest Contentful Paint (LCP) ≤ 2.5s on the above profile.
- [ ] Cumulative Layout Shift (CLS) ≤ 0.05.
- [ ] All below-fold `<img>` have `loading="lazy" decoding="async"` plus `width` and `height`.
- [ ] Hero image has `fetchpriority="high"`.
- [ ] `useIdlePreload` includes every lazy section.
- [ ] No console warnings about unused imports or bundle size.

## Do-not-touch
- GTM / Meta Pixel / CAPI / Google Ads scripts in `index.html` — leave them.
- Service worker.
- Webhook / form submission logic.

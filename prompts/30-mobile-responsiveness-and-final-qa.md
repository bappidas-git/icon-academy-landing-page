# 30 — Mobile Responsiveness, Sticky CTA & Final QA Polish

## Objective
Final pass to ensure the entire landing page is production-ready on mobile, accessible, performant, and visually polished. Updates the persistent sticky-mobile-CTA + floating-contacts layer, runs Lighthouse / pa11y audits, fixes any layout regressions across breakpoints, and confirms the site is conversion-ready.

## Scope
- `src/components/common/StickyMobileCTA/StickyMobileCTA.jsx` and `StickyMobileCTA.module.css`
- `src/components/common/FloatingContacts/FloatingContacts.jsx` and `FloatingContacts.module.css`
- All section CSS module files — responsive breakpoint sweep (smoke test, fix issues found)
- `src/styles/responsive.css`
- `src/styles/global.css` (focus-visible polish)
- `src/components/common/EngagementTracker/EngagementTracker.jsx` — verify scroll-depth thresholds still meaningful for new section count
- `public/index.html` — viewport meta verification

## Out of Scope
- Adding new sections or new content
- Re-architecting state management
- Adding tests (project has none)

## Requirements

### Sticky Mobile CTA (`StickyMobileCTA.jsx`)
- Visible only on screens <768 px (`useMediaQuery('(max-width: 768px)')`)
- Hidden when the LeadFormDrawer is open (subscribe to `useModal().isDrawerOpen`)
- Hidden during the first 100 vh (so it doesn't compete with the hero CTA — show only after user scrolls past the hero)
- Slide-up entrance animation (240 ms ease-out) on first appearance; respect `prefers-reduced-motion`
- Layout: full-width bar pinned to bottom (z-index 950 — below modals, above content)
  - Left half: Phone icon + `Call Admissions` (tap → `tel:` env var)
  - Right half: Coral `Apply Now` button (tap → `openLeadDrawer({ source: 'sticky_mobile_apply' })`)
- Add `sticky_mobile_apply` to `DRAWER_TITLES` map:
  ```js
  sticky_mobile_apply: { title: 'Apply for 2026 Admissions', subtitle: 'Two minutes — and our team will call within 24 hours.' },
  ```
- Bottom inset / safe-area-inset for notched iPhones: `padding-bottom: env(safe-area-inset-bottom);`

### Floating Contacts (`FloatingContacts.jsx`)
- Visible only on screens ≥769 px
- Right-edge floating column at vertical centre: 3 circular buttons (56 × 56 each), 12 px gap
  - Phone (saffron bg, white icon) → `tel:` link
  - WhatsApp (WhatsApp green bg, white icon) → `https://wa.me/{REACT_APP_WHATSAPP_NUMBER}?text=...`
  - Email (indigo bg, white icon) → `mailto:` link
- Each button has `aria-label` and shows a left-pointing tooltip on hover with the channel name
- Hidden when LeadFormDrawer is open (mirrors StickyMobileCTA logic)
- Drop-shadow `var(--ic-shadow-md)`; lift on hover (translateX(-4px) + shadow-lg)

### Responsive sweep — breakpoints to verify
For every section (Hero, TrustBar, About, Programs, Why, Faculty, Results, Facilities, Campus Life, Testimonials, Admissions, Fees, Scholarships, FAQ, Contact, FinalCTA, Footer):
- 320 px (small phone)
- 375 px (iPhone SE)
- 414 px (iPhone Plus / Pro Max)
- 768 px (tablet portrait)
- 1024 px (tablet landscape / small desktop)
- 1280 px (desktop)
- 1920 px (full HD)

Common issues to fix when found:
- Horizontal overflow → audit `overflow-x: hidden` on `body` only as a last resort; prefer fixing the offending element's max-width
- Touch targets <44 px on mobile → expand padding
- Long words / numbers breaking layout → `word-break: break-word` or `overflow-wrap: anywhere` on the parent
- Stat counters jittering → `font-variant-numeric: tabular-nums`
- Sticky header overlapping content on hash-scroll → header offset 80 px (already set)
- Map iframe (Contact section) not loading on slow networks → set `loading="lazy"` (already specified in prompt 23)

### `responsive.css`
Verify / add:
- `:root { --ic-content-max: 1200px; }`
- `.container { width: 100%; max-width: var(--ic-content-max); padding-inline: clamp(16px, 4vw, 32px); margin-inline: auto; }`
- Mobile font-scale fallbacks for browsers that don't support `clamp()` — document but only patch if user-agent stats demand it

### A11y polish (`global.css`)
- `:focus-visible` ring: 3 px saffron, 2 px offset, no outline-style: none anywhere
- `prefers-reduced-motion: reduce` block: disable Framer Motion and CSS keyframes globally:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```
- Skip link styling: `.visually-hidden-focusable:focus` becomes visible (top-left, indigo bg, white text, 12 px padding)
- All interactive elements receive a focus state (button, a, input, select, textarea, summary, [tabindex])
- Verify color contrast on Hero / FinalCTA white text on indigo gradient — must be ≥ 4.5 : 1 (it is — indigo `#1E3A8A` on white is 9.6 : 1)

### Performance
- Run `npm run build` and run `npx serve build`
- Lighthouse mobile audit (throttled): target Performance ≥ 75, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- Lighthouse desktop audit: target Performance ≥ 90 across the board
- Common fixes if Performance < 75:
  - Hero image: serve a smaller mobile variant via `srcset`
  - Lazy-load `<img>` in non-critical sections (`loading="lazy"`)
  - Strip console.log calls in production via React Scripts default
  - Defer Swiper / canvas-confetti chunks (already lazy via section import)

### EngagementTracker thresholds
- Scroll depth fires at 25, 50, 75, 90 (existing). With more sections, 90 % scroll depth is now significantly further down; that's the desired signal.
- Time-on-page fires at 30 s, 1 min, 3 min, 5 min (existing — verify).

### Final QA checklist (run before declaring done)
1. Cold load on a throttled mobile (Slow 4G):
   - Hero visible within 3 s
   - Apply Now CTA tappable within 4 s
2. Submit form happy path on mobile:
   - Drawer opens
   - All 3 steps complete within 60 s
   - Success state appears, navigates to /thank-you
   - Lead visible in /admin/leads with correct fields
3. Visit each Header nav anchor — every link scrolls smoothly to the right section
4. Open / close drawer from each CTA source — confirm the title/subtitle changes correctly per `DRAWER_TITLES` map
5. Verify no console errors / warnings in Chrome on the home page
6. Verify no console errors on /admin/login → /admin/dashboard
7. View source — confirm zero `Anvil` / `solar` / `rooftop` / `kW` / `Surya Ghar` literal in rendered HTML (use Ctrl-F)
8. Run pa11y: `npx pa11y http://localhost:3000` — fix any errors / serious warnings
9. Run `npm run build` — must succeed with no warnings beyond standard CRA noise
10. Inspect bundle size — flag any chunk > 200 KB gzip and consider further splitting

## Out of Scope
- E2E test setup
- A/B testing infra
- Heatmap integration

## Content / Copy
- Sticky mobile CTA labels: `Call Admissions` (left), `Apply Now` (right)
- Floating contacts tooltips: `Call`, `WhatsApp`, `Email`

## Design Notes
- Sticky mobile CTA: bg `var(--ic-bg-default)`, top border 1 px `var(--ic-border)`, top shadow `0 -4px 12px rgba(15, 23, 42, 0.08)`
- Coral Apply button stays fully visible / tap-prominent
- Floating contacts: 999 px radius circular buttons; saffron / WhatsApp green / indigo

## Placeholder Image Specs
N/A.

## Acceptance Criteria
- [ ] Sticky mobile CTA appears on mobile (<768 px) only after scrolling past the hero
- [ ] Sticky mobile CTA hides when drawer is open
- [ ] Tapping `Call Admissions` opens `tel:` correctly; tapping `Apply Now` opens drawer with `source === 'sticky_mobile_apply'`
- [ ] Floating contacts visible on desktop only; each button works (tel / wa.me / mailto)
- [ ] All 16 sections render without horizontal overflow at 320 px width
- [ ] All interactive elements have visible focus rings (saffron, 3 px, 2 px offset)
- [ ] `prefers-reduced-motion` disables animations globally
- [ ] Lighthouse mobile: Performance ≥ 75, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95
- [ ] Lighthouse desktop: Performance ≥ 90 across all categories
- [ ] pa11y: no critical errors
- [ ] `grep -ri "anvil\|solar\|rooftop\|kw\b\|surya ghar" src/ public/ *.md` returns zero matches
- [ ] `npm run build` succeeds; bundle inspection has no chunks > 350 KB gzip without justification
- [ ] Form submission end-to-end works in production build
- [ ] Admin Panel works in production build at `/admin/login`

## Dependencies
- 27-app-composition-and-section-order.md
- 28-lms-admin-field-mapping.md
- 29-tracking-and-webhook-verification.md

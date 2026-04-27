# 23 — Sticky Mobile CTA + Floating WhatsApp / Call

## Context
On mobile, the hero's lead form is hidden (per prompt 04) so the user always needs a 1-tap way to contact us. A sticky bottom bar with WhatsApp + Call + "Get Quote" buttons fixes this. On desktop, floating WhatsApp + Call pills in the bottom-right corner offer the same without stealing content space.

## Files to create
- `src/components/common/StickyMobileCTA/StickyMobileCTA.jsx`
- `src/components/common/StickyMobileCTA/StickyMobileCTA.module.css`
- `src/components/common/FloatingContacts/FloatingContacts.jsx`
- `src/components/common/FloatingContacts/FloatingContacts.module.css`

## Files to modify
- `src/App.jsx` — mount both components globally (outside routes). Both eager-loaded.
- `src/components/common/MobileNavigation/MobileNavigation.jsx` — do not duplicate; if a mobile bottom nav already exists and collides, adjust `z-index` and vertical offset.

## Implementation

### `StickyMobileCTA.jsx`
- Visible only at `≤768px`.
- Hidden on initial viewport (hero CTAs still in view). Appears when user scrolls past 400px using `useScrollPosition` (exists at `src/hooks/useScrollPosition.js`). Framer Motion `slide up` entrance.
- Hidden when the lead drawer is open (read `isDrawerOpen` from `useModal`).
- Hidden on `/thank-you` and `/admin/*` routes.
- Layout: three equal-width cells in a row.
  - Cell 1: Call icon + "Call" label → `tel:+911800202001`
  - Cell 2: WhatsApp icon + "WhatsApp" → `https://wa.me/911800202001`
  - Cell 3 (orange, primary): "Get Quote" label → `openLeadDrawer({ source: 'sticky_mobile' })`
- Height ~60px, fixed bottom, respects `env(safe-area-inset-bottom)`.

### `StickyMobileCTA.module.css`
- `.bar { position: fixed; left: 0; right: 0; bottom: 0; z-index: 950; display: none; background: var(--white); border-top: 1px solid var(--border-gray); box-shadow: 0 -8px 24px rgba(10,31,61,0.12); padding-bottom: env(safe-area-inset-bottom); }`
- `@media (max-width: 768px) { .bar { display: grid; grid-template-columns: 1fr 1fr 1.2fr; } }`
- `.cell { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; padding: 10px 6px; font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.03em; color: var(--ink); text-decoration: none; border: none; background: transparent; cursor: pointer; }`
- `.cell svg, .cell [class^='iconify'] { font-size: 22px; color: var(--ink); }`
- `.cell.whatsapp svg, .cell.whatsapp [class^='iconify'] { color: #25D366; }`
- `.cell.primary { background: var(--cta-primary); color: var(--white); }`
- `.cell.primary svg, .cell.primary [class^='iconify'] { color: var(--white); }`
- `.cell.primary:hover { background: var(--cta-primary-hover); }`

### `FloatingContacts.jsx`
- Visible only at `≥769px`.
- Bottom-right stack, two circular buttons 52×52 with tooltips on hover:
  - WhatsApp (green) → `https://wa.me/911800202001`
  - Phone (navy) → `tel:+911800202001`
- Appears after 800px scroll. Framer Motion scale-in.
- Also hidden during lead drawer open state.

### `FloatingContacts.module.css`
- `.stack { position: fixed; right: 24px; bottom: 96px; display: flex; flex-direction: column; gap: 12px; z-index: 900; }`
- `@media (max-width: 768px) { .stack { display: none; } }`
- `.btn { width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 24px rgba(0,0,0,0.2); cursor: pointer; color: var(--white); border: none; transition: transform 0.2s ease, box-shadow 0.2s ease; }`
- `.btn:hover { transform: scale(1.08); box-shadow: 0 12px 32px rgba(0,0,0,0.25); }`
- `.btn.wa { background: #25D366; }`
- `.btn.call { background: var(--primary-dark); }`
- `.btn svg, .btn [class^='iconify'] { font-size: 24px; }`

### Tracking
On every CTA click (sticky + floating), call `trackCTAClick` from `src/utils/gtm.js` with descriptive names (`"sticky_whatsapp"`, `"sticky_call"`, `"sticky_quote"`, `"float_whatsapp"`, `"float_call"`). The function is already imported in Header — same pattern.

### `App.jsx`
At the bottom of the JSX, just before `<LeadFormDrawerWrapper />`, mount:
```jsx
<StickyMobileCTA />
<FloatingContacts />
```
These live outside the `<Routes>` so they show on every non-admin page. Guard inside each component with `useLocation()` to hide on `/thank-you` and `/admin/*`.

## Acceptance criteria
- [ ] On mobile (≤768px), a 3-button sticky bar appears after 400px scroll and stays docked to the bottom. Three cells: Call, WhatsApp, Get Quote.
- [ ] On desktop (≥769px), two floating circular buttons appear in the bottom-right after 800px scroll.
- [ ] Both hide while the lead drawer is open.
- [ ] Both hide on `/thank-you` and `/admin/*`.
- [ ] Get Quote in sticky bar opens the drawer with `source: 'sticky_mobile'`.
- [ ] GTM event fires for each click.
- [ ] No overlap with `MobileNavigation` (existing bottom nav) — if a conflict exists, the sticky CTA replaces the mobile nav or positions 64px above it. Pick one consistent approach and document inline.

## Do-not-touch
- Page sections.
- `MobileNavigation` internals beyond z-index / vertical offset.
- `useScrollPosition` hook implementation.

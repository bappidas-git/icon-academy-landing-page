# 22 — Final CTA Section

## Context
The bottom of the page is where decided visitors convert. We give them one last emotional nudge — a confident, dark-navy section with a headline, two CTAs, a "what you get" micro-list, and the multi-step form embedded inline (not drawer). Anyone who scrolled this far is hot.

## Files to create
- `src/components/sections/FinalCTASection/FinalCTASection.jsx`
- `src/components/sections/FinalCTASection/FinalCTASection.module.css`

## Files to modify
- `src/App.jsx` — lazy-mount as the last section before Footer (replacing or inserted before `SecondaryCTASection`)

## Implementation

### `FinalCTASection.jsx`
Uses `Section` primitive with `variant="dark"`, `size="lg"`, `id="final-cta"`.

Layout — 2-column on desktop (≥1024px), stacked on mobile:

**Left column (60%)**
- Eyebrow: `"Ready to save?"` — small gold label.
- Title (h2): `"Your free savings plan is 60 seconds away."`
- Body:
  ```
  Design, subsidy, financing, install, warranty — handled end-to-end by your dedicated Anvil Saathi. No surprises. No pushy sales. Just your next power bill that makes you smile.
  ```
- "What you get" checklist (5 items with `mdi:check-circle` in `var(--savings-green-light)`):
  1. Free site visit + custom system design
  2. PM Surya Ghar subsidy ₹78,000 handled for you
  3. Zero-down-payment EMI from 7% p.a.
  4. 25-year panel warranty · 10-year inverter warranty
  5. WhatsApp support 7 days a week
- A row with two CTAs:
  - Primary: `Talk to a Saathi now` → `tel:+911800202001` with icon `mdi:phone-in-talk`.
  - Secondary (outlined white): `WhatsApp 1800 2020 001` → `https://wa.me/911800202001` with `mdi:whatsapp` icon.
- Below CTAs, tiny reassurance: `Free & no obligation. 24-hour response guaranteed.`

**Right column (40%)**
- `MultiStepLeadForm` inline with `variant="dark"` `source="final-cta"`.

### `FinalCTASection.module.css`
- `.grid { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center; }`
- `@media (min-width: 1024px) { .grid { grid-template-columns: 1.2fr 1fr; gap: 64px; } }`
- `.eyebrow { color: var(--accent-gold); font-size: 0.75rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; }`
- `.title { font-family: var(--font-heading); color: var(--white); font-weight: 800; font-size: clamp(2rem, 4vw, 3rem); line-height: 1.1; margin: 12px 0 16px; }`
- `.body { color: rgba(255,255,255,0.8); font-size: var(--fs-md); line-height: 1.6; max-width: 560px; }`
- `.checklist { display: flex; flex-direction: column; gap: 10px; margin: 24px 0 32px; }`
- `.checkItem { display: flex; gap: 10px; align-items: flex-start; color: var(--white); font-size: 0.9375rem; }`
- `.checkIcon { color: var(--savings-green-bg); font-size: 22px; flex-shrink: 0; color: #34D399; margin-top: 2px; }`
- `.ctaRow { display: flex; gap: 12px; flex-wrap: wrap; }`
- `.ctaPrimary { padding: 14px 22px; background: var(--cta-primary); color: var(--white); border: none; border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer; box-shadow: var(--elev-cta); display: inline-flex; align-items: center; gap: 8px; text-decoration: none; transition: all 0.2s ease; }`
- `.ctaPrimary:hover { background: var(--cta-primary-hover); transform: translateY(-2px); }`
- `.ctaGhost { padding: 14px 22px; background: transparent; color: var(--white); border: 2px solid rgba(255,255,255,0.7); border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; transition: all 0.2s ease; }`
- `.ctaGhost:hover { background: rgba(255,255,255,0.1); border-color: var(--white); }`
- `.reassure { color: rgba(255,255,255,0.55); font-size: 0.8125rem; margin-top: 12px; }`
- `.formWrap { background: rgba(255,255,255,0.04); border-radius: 18px; padding: 8px; backdrop-filter: blur(6px); border: 1px solid rgba(255,255,255,0.08); }`

### `App.jsx`
Replace the existing `SecondaryCTASection` lazy block with the new `FinalCTASection` import and mount. Keep `ErrorBoundary` + `Suspense` wrapping. The old `SecondaryCTASection.jsx` file stays on disk (deleted in prompt 30 cleanup).

## Acceptance criteria
- [ ] `#final-cta` renders as the last section before footer, dark navy with gold accent eyebrow.
- [ ] Two clickable CTA buttons: `tel:` link and `https://wa.me/` link open correctly on mobile + desktop.
- [ ] Multi-step form embedded on the right fills 40% width on desktop, full width on mobile.
- [ ] Form submission from here fires tracking with `source: 'final-cta'`.
- [ ] Entire section visually matches `variant="dark"` treatment of the `Section` primitive.

## Do-not-touch
- `SecondaryCTASection.jsx` (leave file in place).
- `MultiStepLeadForm` internals.
- Footer.

# 10 — Trust Bar Under Hero

## Context
Homeowners new to solar will not click deeper until they believe Anvil is real and reputable. A skinny, high-density trust strip immediately under the hero — with install counts, certifications, finance partners, and a Google rating — does that work in one screen-height. This is a single-row component on desktop, a horizontal scroll / 2-row stack on mobile.

## Files to create
- `src/components/sections/TrustBar/TrustBar.jsx`
- `src/components/sections/TrustBar/TrustBar.module.css`

## Files to modify
- `src/App.jsx` — insert `<TrustBar />` directly after `<HeroSection />`, outside the lazy `Suspense` block (it's tiny — eager-load)

## Implementation

### `TrustBar.jsx`
Props: none.

Renders a slim section (64px min-height desktop, 96px mobile two-row) with six items separated by vertical dividers:

```js
const trustItems = [
  { icon: "mdi:home-lightning-bolt", value: "2,400+", label: "Homes powered" },
  { icon: "mdi:star-circle", value: "4.9", label: "Google rating" },
  { icon: "mdi:shield-check", value: "25 yr", label: "Panel warranty" },
  { icon: "mdi:bank", value: "PM Surya Ghar", label: "Subsidy partner" },
  { icon: "mdi:handshake", value: "7% EMI", label: "From SBI, HDFC & more" },
  { icon: "mdi:whatsapp", value: "7-day", label: "WhatsApp support" },
];
```

Above the row, a one-line headline in smaller gold type:
```
Trusted across Assam, Nagaland & Bhubaneswar — and 10,000+ rooftops PAN-India.
```

Background: `var(--surface-muted)` with a subtle top border `1px solid var(--border-gray)`. No dramatic shadow.

### `TrustBar.module.css`
- `.bar { background: var(--surface-muted); border-top: 1px solid var(--border-gray); border-bottom: 1px solid var(--border-gray); padding: 16px 0; }`
- `.tagline { text-align: center; font-size: 0.8125rem; color: var(--accent-gold-dark); font-weight: 700; letter-spacing: 0.02em; margin-bottom: 10px; }`
- `.row { display: flex; gap: 24px; justify-content: center; align-items: center; max-width: var(--container-xl); margin: 0 auto; padding-inline: var(--section-px); flex-wrap: nowrap; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; }`
- `.row::-webkit-scrollbar { display: none; }`
- `.item { display: flex; align-items: center; gap: 10px; flex-shrink: 0; scroll-snap-align: start; }`
- `.icon { font-size: 22px; color: var(--accent-gold); flex-shrink: 0; }`
- `.value { font-weight: 700; color: var(--ink); font-size: 0.9375rem; }`
- `.label { font-size: 0.75rem; color: var(--ink-muted); }`
- `.divider { width: 1px; height: 24px; background: var(--border-gray); flex-shrink: 0; }`
- Mobile: `@media (max-width: 640px) { .row { justify-content: flex-start; gap: 16px; } .divider { display: none; } .item { min-width: 140px; padding: 4px 8px; background: var(--white); border: 1px solid var(--border-gray); border-radius: 10px; } }`

### Insert dividers between items in JSX (desktop only) — render `.divider` between `.item`s.

### `App.jsx` wiring
At the top, add `import TrustBar from './components/sections/TrustBar/TrustBar';` (eager, same as Hero).
Place `<TrustBar />` **immediately after** `<HeroSection />` and **before** the first `<ErrorBoundary>`. It does not need Suspense.

## Acceptance criteria
- [ ] A trust strip appears right under the hero with tagline + 6 items.
- [ ] Desktop: all items in one centred row with thin vertical dividers between them.
- [ ] Mobile (≤640px): horizontal scroll of "card" items, no dividers, with rounded borders.
- [ ] Icons render in gold; values bold; labels muted.
- [ ] Strip is max 96px tall on mobile, max 64px on desktop (rough, visual).
- [ ] No layout shift on page load (text is static, not fetched).

## Do-not-touch
- Hero, Header, any existing section.
- Lazy loading in `App.jsx` for other sections.

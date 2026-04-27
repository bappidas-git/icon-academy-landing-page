# 11 — Solutions Section: Grid Structure

## Context
The Solutions section is one of the two conversion engines. It replaces the current generic `ServicesSection` in the menu flow by showing four distinct home-buyer archetypes with imagery, each with its own CTA that opens the multi-step form pre-tagged. This prompt builds the **structure** (section, grid, card component, hover interactions); content + images come in prompt 12.

## Files to create
- `src/components/sections/SolutionsSection/SolutionsSection.jsx`
- `src/components/sections/SolutionsSection/SolutionsSection.module.css`
- `src/components/sections/SolutionsSection/SolutionCard.jsx`
- `src/components/sections/SolutionsSection/SolutionCard.module.css`
- `src/data/solutionsData.js` — card content (structure only; images + copy filled in prompt 12)

## Files to modify
- `src/App.jsx` — lazy-import `SolutionsSection` and mount after `TrustBar`, before existing `AboutSection`

## Implementation

### `solutionsData.js`
Export an array of exactly four objects, each shaped like:
```js
{
  id: 'residential-rooftop',
  title: '',            // filled in 12
  tagline: '',          // filled in 12
  image: '',            // placeholder URL added in 12
  benefits: [],         // 3 bullets filled in 12
  solutionTag: '',      // value passed to form context, e.g. 'Residential Rooftop'
  accent: 'gold',       // 'gold' | 'green' | 'orange' | 'purple'
  icon: '',             // iconify id
}
```
For now, export four empty stubs with only `id` and `accent` populated:
- `id: 'residential-rooftop', accent: 'gold'`
- `id: 'villa-large-home', accent: 'orange'`
- `id: 'housing-society', accent: 'purple'`
- `id: 'solar-battery', accent: 'green'`

### `SolutionCard.jsx`
Props: `{ solution }` where `solution` matches the schema above. Plus `onCtaClick: () => void`.

Layout (vertical card):
1. Image area on top — 16:10 aspect ratio, `object-fit: cover`, rounded top corners (12px). Hover: image scales 1.05 via Framer Motion.
2. Accent bar: 4px tall ribbon under image using `solution.accent`-mapped colour (gold → `var(--accent-gold)`, green → `var(--savings-green)`, orange → `var(--cta-primary)`, purple → `var(--region-odisha)`).
3. Body:
   - Icon chip (top-left, 40×40, circular, accent-tinted background)
   - Title (h3, `var(--fs-xl)`)
   - Tagline (one line, muted)
   - Benefits list: three bullet points with `mdi:check-circle` in savings-green, 14px font
   - CTA button full-width at bottom: `Get my {title} quote →` — primary orange with `var(--elev-cta)` shadow.

On click, CTA fires `onCtaClick(solution)`, whose parent calls `openLeadDrawer({ source: 'solutions', solution: solution.solutionTag })`.

### `SolutionCard.module.css`
- `.card { display: flex; flex-direction: column; background: var(--white); border-radius: 16px; overflow: hidden; box-shadow: var(--elev-2); transition: all 0.3s ease; height: 100%; border: 1px solid var(--border-gray); }`
- `.card:hover { transform: translateY(-6px); box-shadow: var(--elev-4); }`
- `.imageWrap { aspect-ratio: 16 / 10; overflow: hidden; background: var(--surface-muted); position: relative; }`
- `.image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }`
- `.card:hover .image { transform: scale(1.04); }`
- `.accent { height: 4px; width: 100%; }`
- `.accent.gold { background: var(--accent-gold); }`
- `.accent.green { background: var(--savings-green); }`
- `.accent.orange { background: var(--cta-primary); }`
- `.accent.purple { background: var(--region-odisha); }`
- `.body { padding: 20px 20px 24px; display: flex; flex-direction: column; gap: 10px; flex: 1; }`
- `.iconChip { width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 22px; }`
- `.iconChip.gold { background: rgba(255,184,0,0.15); color: var(--accent-gold-dark); }`
- (repeat for green/orange/purple)
- `.title { font-family: var(--font-heading); font-weight: 700; font-size: var(--fs-xl); color: var(--ink); line-height: 1.25; }`
- `.tagline { font-size: 0.875rem; color: var(--ink-muted); margin-bottom: 4px; }`
- `.benefits { list-style: none; padding: 0; margin: 4px 0 0; display: flex; flex-direction: column; gap: 6px; }`
- `.benefit { display: flex; gap: 8px; align-items: flex-start; font-size: 0.8125rem; color: var(--ink); line-height: 1.5; }`
- `.benefit svg, .benefit [class^='iconify'] { color: var(--savings-green); flex-shrink: 0; margin-top: 2px; }`
- `.ctaBtn { margin-top: 16px; padding: 12px 18px; background: var(--cta-primary); color: var(--white); border: none; border-radius: 12px; font-weight: 700; font-size: 0.9375rem; cursor: pointer; box-shadow: var(--elev-cta); transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; gap: 8px; }`
- `.ctaBtn:hover { background: var(--cta-primary-hover); transform: translateY(-2px); }`

### `SolutionsSection.jsx`
- Uses the `Section` + `SectionHeading` primitives from prompt 02.
- `id="solutions"`, `variant="default"`, `size="lg"`.
- Heading eyebrow: `"Solutions for every home"`.
- Heading title: `"Find the solar setup that fits your home."`
- Subtitle: `"From a single-family rooftop in Guwahati to a housing society in Bhubaneswar — we design, install, and support the right system for you."` (this copy may be tuned in 12).
- Grid: 1 column mobile, 2 columns tablet (≥768px), 4 columns desktop (≥1200px). Uses CSS Grid with `gap: 24px`.
- Import `solutionsData` from `src/data/solutionsData.js`.
- Import `useModal` from `src/context/ModalContext.jsx`. For each card: `onCtaClick={() => openLeadDrawer({ source: 'solutions', solution: solution.solutionTag })}`.

### `SolutionsSection.module.css`
- `.grid { display: grid; grid-template-columns: 1fr; gap: 20px; margin-top: 32px; }`
- `@media (min-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr); gap: 24px; } }`
- `@media (min-width: 1200px) { .grid { grid-template-columns: repeat(4, 1fr); } }`

### `App.jsx`
Add a lazy import:
```js
const SolutionsSection = lazy(() => import('./components/sections/SolutionsSection/SolutionsSection'));
```
Mount it wrapped in `<ErrorBoundary><Suspense fallback={<SectionLoader height={500} variant="skeleton" />}>...</Suspense></ErrorBoundary>` **immediately after `<TrustBar />`** and before the existing `<AboutSection />`.

Also append `SolutionsSection` to the `useIdlePreload` sections array.

## Acceptance criteria
- [ ] `#solutions` section renders with the heading copy above.
- [ ] Four cards render in a 1/2/4-column responsive grid.
- [ ] Cards have empty image placeholders (grey panel) and empty body — prompt 12 fills content.
- [ ] Clicking a card's CTA opens the lead drawer (drawer body may still show the placeholder state if `solution` isn't filled yet — that's fine).
- [ ] Header nav link "Solutions" scrolls to `#solutions`.
- [ ] Build passes.

## Do-not-touch
- `MultiStepLeadForm` internals.
- Existing `ServicesSection` — leave in place for now; prompt 30 decides whether to remove.
- Hero, TrustBar, Header, tokens.

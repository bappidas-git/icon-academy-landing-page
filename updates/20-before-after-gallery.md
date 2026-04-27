# 20 — Before / After Installation Gallery

## Context
Seeing the same rooftop on Day 0 and Day 3 with panels on it is the single most persuasive "it's really this easy" proof. A small interactive before/after slider beats any copy. Six real-feel installations with a drag-to-reveal comparison.

## Files to create
- `src/components/sections/InstallGallery/InstallGallery.jsx`
- `src/components/sections/InstallGallery/InstallGallery.module.css`
- `src/components/sections/InstallGallery/BeforeAfter.jsx` — the drag-to-reveal primitive
- `src/components/sections/InstallGallery/BeforeAfter.module.css`
- `src/data/installGalleryData.js`

## Files to modify
- `src/App.jsx` — lazy-mount after `TestimonialsSection`

## Implementation

### `installGalleryData.js`
```js
export const installGalleryData = [
  {
    id: 'g1',
    location: 'Guwahati, Assam',
    systemKw: '3 kW',
    beforeImage: 'https://placehold.co/1200x800?text=BEFORE+Empty+Rooftop+Guwahati',
    afterImage:  'https://placehold.co/1200x800?text=AFTER+Solar+Panels+Installed+Guwahati',
  },
  {
    id: 'g2',
    location: 'Tezpur, Assam',
    systemKw: '5 kW Hybrid',
    beforeImage: 'https://placehold.co/1200x800?text=BEFORE+Bare+Tin+Roof+Tezpur',
    afterImage:  'https://placehold.co/1200x800?text=AFTER+5kW+Hybrid+System+Tezpur',
  },
  {
    id: 'g3',
    location: 'Dimapur, Nagaland',
    systemKw: '2 kW',
    beforeImage: 'https://placehold.co/1200x800?text=BEFORE+Concrete+Roof+Dimapur',
    afterImage:  'https://placehold.co/1200x800?text=AFTER+Rooftop+Solar+Dimapur',
  },
  {
    id: 'g4',
    location: 'Kohima, Nagaland',
    systemKw: '4 kW Hybrid',
    beforeImage: 'https://placehold.co/1200x800?text=BEFORE+Hillside+Home+Kohima',
    afterImage:  'https://placehold.co/1200x800?text=AFTER+Hillside+Solar+Kohima',
  },
  {
    id: 'g5',
    location: 'Bhubaneswar, Odisha',
    systemKw: '5 kW',
    beforeImage: 'https://placehold.co/1200x800?text=BEFORE+Bhubaneswar+Rooftop',
    afterImage:  'https://placehold.co/1200x800?text=AFTER+5kW+Solar+Bhubaneswar',
  },
  {
    id: 'g6',
    location: 'Cuttack, Odisha',
    systemKw: '3 kW',
    beforeImage: 'https://placehold.co/1200x800?text=BEFORE+Flat+Roof+Cuttack',
    afterImage:  'https://placehold.co/1200x800?text=AFTER+Solar+Panels+Cuttack',
  },
];
```

### `BeforeAfter.jsx`
Props: `{ beforeImage, afterImage, alt }`.
Classic drag-to-reveal slider:
- Container with `position: relative; aspect-ratio: 3/2; overflow: hidden; border-radius: 14px;`.
- Two images absolutely positioned, the "after" image fully visible beneath. The "before" image is clipped with `clip-path: inset(0 {100 - pos}% 0 0)` where `pos` is 0–100.
- A vertical handle `div` at `left: {pos}%` with a circular 32×32 gold grip in the centre and a vertical gold line above/below it.
- Labels: `"Before"` top-left pill, `"After"` top-right pill, both with `background: rgba(10,31,61,0.75)`, white text.
- Pointer events: `onMouseDown` / `onTouchStart` + global `onMouseMove` / `onTouchMove` updates `pos`. Clamp 5–95.
- Default `pos` = 50. Reset on unmount.

### `BeforeAfter.module.css`
- `.wrap { position: relative; aspect-ratio: 3 / 2; overflow: hidden; border-radius: 14px; cursor: ew-resize; user-select: none; background: var(--primary-dark); }`
- `.img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; pointer-events: none; }`
- `.imgBefore { z-index: 2; }`
- `.handle { position: absolute; top: 0; bottom: 0; width: 2px; background: var(--accent-gold); z-index: 3; cursor: ew-resize; transform: translateX(-50%); }`
- `.grip { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; border-radius: 50%; background: var(--accent-gold); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(0,0,0,0.35); color: var(--primary-dark); }`
- `.pill { position: absolute; top: 12px; padding: 4px 10px; background: rgba(10,31,61,0.75); color: var(--white); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; border-radius: 999px; text-transform: uppercase; backdrop-filter: blur(4px); z-index: 4; }`
- `.pillLeft { left: 12px; }`
- `.pillRight { right: 12px; }`

### `InstallGallery.jsx`
Uses `Section` + `SectionHeading`.
- `id="gallery"`, `variant="muted"`, `size="lg"`.
- Eyebrow: `"Installation gallery"`.
- Title: `"See real rooftops, before and after."`
- Subtitle: `"Drag the slider on any install to watch the panels go up. Six recent jobs across Assam, Nagaland & Odisha."`

Grid: 1 col mobile, 2 col tablet (≥768px), 3 col desktop (≥1200px). Each gallery item: `<BeforeAfter />` on top, meta row below with location + system chip.

### `InstallGallery.module.css`
- `.grid { display: grid; grid-template-columns: 1fr; gap: 20px; margin-top: 32px; }`
- `@media (min-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr); gap: 24px; } }`
- `@media (min-width: 1200px) { .grid { grid-template-columns: repeat(3, 1fr); } }`
- `.item { display: flex; flex-direction: column; gap: 10px; }`
- `.meta { display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem; color: var(--ink); }`
- `.location { font-weight: 600; display: inline-flex; gap: 6px; align-items: center; }`
- `.chip { padding: 4px 10px; background: var(--savings-green-bg); color: var(--savings-green-dark); border-radius: 999px; font-weight: 700; font-size: 0.75rem; }`

## Acceptance criteria
- [ ] `#gallery` shows 6 items in responsive grid (1/2/3).
- [ ] Each item has a draggable before/after handle that reveals the panels-installed image as you drag right.
- [ ] Handle works via mouse on desktop AND touch on mobile.
- [ ] "Before" and "After" pill labels visible in top corners.
- [ ] Handle is clamped 5%–95% (never fully hides either image).
- [ ] No performance issues when 6 sliders sit together (verify on a throttled 4x CPU).

## Do-not-touch
- Testimonials slider, any other section, tokens.

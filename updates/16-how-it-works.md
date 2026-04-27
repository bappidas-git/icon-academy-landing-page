# 16 — "How It Works" 4-Step Process Section

## Context
First-time solar buyers don't know what installation looks like. A short 4-step visual timeline ("What happens after you submit the form?") removes fear and lets homeowners mentally commit to the journey. This replaces the existing `AboutSection` in the menu flow.

## Files to create
- `src/components/sections/HowItWorksSection/HowItWorksSection.jsx`
- `src/components/sections/HowItWorksSection/HowItWorksSection.module.css`
- `src/data/howItWorksData.js`

## Files to modify
- `src/App.jsx` — lazy-mount after `CalculatorSection`

## Implementation

### `howItWorksData.js`
```js
export const howItWorksData = [
  {
    number: '01',
    icon: 'mdi:phone-in-talk',
    title: 'Free Saathi Call',
    duration: 'Within 24 hours',
    description: 'A dedicated Anvil Saathi calls you, understands your bill, and shares a rough savings estimate on WhatsApp.',
    image: 'https://placehold.co/600x400?text=Free+Saathi+Consultation+Call',
  },
  {
    number: '02',
    icon: 'mdi:home-search-outline',
    title: 'Free Site Visit',
    duration: '1–3 days later',
    description: 'We visit your home, measure usable roof area, check shading, and design a system that fits your bill and budget.',
    image: 'https://placehold.co/600x400?text=Engineer+Measuring+Rooftop+Area',
  },
  {
    number: '03',
    icon: 'mdi:file-sign',
    title: 'Paperwork & Subsidy',
    duration: '1–2 weeks',
    description: 'We handle the PM Surya Ghar application, DISCOM approval, net-metering paperwork, and bank loan — end to end.',
    image: 'https://placehold.co/600x400?text=PM+Surya+Ghar+Subsidy+Paperwork',
  },
  {
    number: '04',
    icon: 'mdi:solar-panel',
    title: 'Install & Power On',
    duration: '2–3 days',
    description: 'Our crew installs panels, inverter, and monitoring app. Your meter spins backwards from day one. 25-year warranty kicks in.',
    image: 'https://placehold.co/600x400?text=Solar+Panel+Installation+Day',
  },
];
```

### `HowItWorksSection.jsx`
Uses `Section` + `SectionHeading`.
- `id="how-it-works"`, `variant="muted"`, `size="lg"`.
- Eyebrow: `"Simple, no-stress process"`.
- Title: `"From your first click to free power, in 4 steps."`
- Subtitle: `"We handle the design, subsidy paperwork, DISCOM coordination, and install. You only show up for the tea."`

Layout:
- **Desktop (≥1024px)**: horizontal 4-column row with a connecting dashed gold line between steps.
- **Tablet (768–1023px)**: 2×2 grid.
- **Mobile (<768px)**: vertical stack with a left-side dashed line and numbered nodes.

Each step card:
- Number badge (top-left), 40×40 circle, gold background, white text in bold heading font.
- Icon above title.
- Title (h4), duration pill (small chip in savings-green), description (2 lines max).
- Image (16:10) below description, rounded 10px — placeholder URL from data.

Framer Motion: stagger the four cards fading up as the section enters view (use `react-intersection-observer`).

### `HowItWorksSection.module.css`
- `.grid { display: flex; flex-direction: column; gap: 20px; margin-top: 40px; position: relative; }`
- `@media (min-width: 768px) { .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; } }`
- `@media (min-width: 1024px) { .grid { grid-template-columns: repeat(4, 1fr); gap: 20px; } .grid::before { content: ''; position: absolute; top: 32px; left: 8%; right: 8%; height: 2px; background-image: linear-gradient(to right, var(--accent-gold) 50%, transparent 0%); background-size: 16px 2px; z-index: 0; } }`
- `.card { background: var(--white); border-radius: 16px; padding: 24px; box-shadow: var(--elev-2); position: relative; z-index: 1; display: flex; flex-direction: column; gap: 12px; }`
- `.card:hover { box-shadow: var(--elev-3); }`
- `.number { width: 44px; height: 44px; border-radius: 50%; background: var(--accent-gold); color: var(--white); display: inline-flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-weight: 800; font-size: 1rem; box-shadow: 0 4px 12px rgba(255,184,0,0.4); }`
- `.icon { font-size: 28px; color: var(--accent-gold-dark); }`
- `.title { font-family: var(--font-heading); font-weight: 700; font-size: var(--fs-lg); color: var(--ink); }`
- `.duration { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; background: var(--savings-green-bg); color: var(--savings-green-dark); border-radius: 999px; font-size: 0.75rem; font-weight: 600; align-self: flex-start; }`
- `.description { font-size: 0.875rem; color: var(--ink-muted); line-height: 1.55; }`
- `.image { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; border-radius: 10px; background: var(--surface-muted); margin-top: auto; }`

## Acceptance criteria
- [ ] `#how-it-works` section renders with the 4 cards in desktop 4-column, tablet 2×2, mobile stacked.
- [ ] Dashed gold connector line visible between cards on desktop only.
- [ ] Each card has number, icon, title, green duration pill, description, and placeholder image.
- [ ] Scrolling into the section animates cards in with a 100ms stagger.
- [ ] Nav link "How It Works" in the header scrolls to this section.

## Do-not-touch
- Calculator, Solutions, Hero, TrustBar.
- Existing `AboutSection` — leave in place (deleted or disabled in prompt 30 review).

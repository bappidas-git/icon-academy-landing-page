# 01 — Design Tokens & Brand Foundation

## Context
The rebuild needs consistent visual DNA across every new section. We keep Anvil's existing palette (Deep Navy, Solar Gold, Sunrise Orange, Eco Green) but formalise conversion-critical tokens: a visible "savings green" for money claims, a clear CTA hierarchy, shadow + radius scale, and state-specific accent for Assam / Nagaland / Odisha pills. This is the source of truth every later prompt will import.

**Stack decision (confirmed, no new frameworks):** React 18 + MUI v5 + Framer Motion + CSS Modules + Iconify. All tokens live in `src/styles/variables.css` and mirror into `src/theme/muiTheme.js`. Do not introduce Tailwind, styled-components, or new design systems.

## Files to modify
- `src/styles/variables.css` — extend, do not replace
- `src/theme/muiTheme.js` — extend the palette only

## Files to create
- `src/styles/tokens.css` — import-only re-export that documents the public token surface new components should use

## Implementation

### 1. Append these tokens to `src/styles/variables.css` (inside the existing `:root` block, after the existing `--accent-gold-*` block):

```css
/* ========== Conversion Tokens (Anvil Rebuild) ========== */
--savings-green: #10B981;
--savings-green-dark: #047857;
--savings-green-bg: #ECFDF5;

--cta-primary: #FF6B35;           /* sunrise orange — primary CTA */
--cta-primary-hover: #E85A20;
--cta-secondary: #0A1F3D;          /* navy — secondary CTA */
--cta-ghost-border: rgba(255,255,255,0.7);

/* State pills for Assam / Nagaland / Odisha */
--region-assam: #1E7F5A;
--region-nagaland: #C2410C;
--region-odisha: #7C3AED;
--region-pill-bg: rgba(255, 184, 0, 0.12);

/* Calculator output tokens */
--calc-output-bg: linear-gradient(135deg, #0A1F3D 0%, #14315B 100%);
--calc-output-accent: #FFB800;
--calc-output-savings: #10B981;

/* Step indicator for multi-step form */
--step-active: #FFB800;
--step-complete: #10B981;
--step-pending: #D1D9E6;

/* Elevation scale (new, additive) */
--elev-1: 0 1px 2px rgba(10,31,61,0.06);
--elev-2: 0 4px 14px rgba(10,31,61,0.08);
--elev-3: 0 12px 32px rgba(10,31,61,0.10);
--elev-4: 0 24px 56px rgba(10,31,61,0.14);
--elev-cta: 0 8px 24px rgba(255,107,53,0.35);

/* Section rhythm */
--section-y-sm: clamp(2rem, 4vw, 3rem);
--section-y-md: clamp(3rem, 6vw, 5rem);
--section-y-lg: clamp(4rem, 8vw, 7rem);
```

### 2. In `src/theme/muiTheme.js`, extend `colors` (do not rewrite the file). After the existing `colors.orange` block, add:

```js
savings: {
  main: '#10B981',
  light: '#34D399',
  dark: '#047857',
  bg: '#ECFDF5',
  contrastText: '#FFFFFF',
},
region: {
  assam: '#1E7F5A',
  nagaland: '#C2410C',
  odisha: '#7C3AED',
},
```

Also extend `palette.action` to include `{ savingsHover: alpha('#10B981', 0.08) }`.

### 3. Create `src/styles/tokens.css`:

```css
/* Public design tokens for the Anvil rebuild. Import in any new component. */
@import './variables.css';

/* Semantic aliases — always prefer these in new code */
:root {
  --ink: var(--primary-dark);
  --ink-muted: var(--text-gray);
  --surface: var(--white);
  --surface-muted: var(--light-gray);
  --brand: var(--accent-gold);
  --cta: var(--cta-primary);
  --savings: var(--savings-green);
}
```

## Acceptance criteria
- [ ] `src/styles/variables.css` contains every new token above, in one contiguous block, without removing any existing variable.
- [ ] `src/theme/muiTheme.js` compiles and `theme.palette.savings.main` and `theme.palette.region.assam` are both readable from a component.
- [ ] `src/styles/tokens.css` exists and imports `variables.css`.
- [ ] `npm run build` succeeds with no new warnings introduced by this change.
- [ ] No existing component visually changes after this prompt — this is purely additive.

## Do-not-touch
- Any existing variable value (only add new ones).
- `src/App.jsx`, any section component, any existing CSS module.
- `src/theme/muiTheme.js` `components` overrides — leave button/card/input overrides alone.

# 05 — Typography System

## Objective
Replace the current Inter / Plus Jakarta Sans pairing with a typography system that signals scholarly gravitas and modern readability suitable for an established commerce college. Use **Fraunces** (modern serif with optical sizing) for headings, **Inter** (variable, neutral) for body, and **Plus Jakarta Sans** (kept) for UI/numbers/captions. Wire fonts through Google Fonts in `index.html`, update MUI typography variants, and re-balance the type scale for mobile-first display.

## Scope
- `public/index.html` (Google Fonts `<link>` tags)
- `src/theme/muiTheme.js` (`typography` block)
- `src/styles/variables.css` (font-family CSS variables)
- `src/styles/global.css` (default body/heading styles)
- Any `*.module.css` that hardcodes `font-family` (search for `'Inter'`, `'Plus Jakarta'`, `serif`, `sans-serif` literals and switch to CSS variables)

## Out of Scope
- Color tokens (handled in 04)
- Spacing, line-height utilities outside MUI typography variants
- Component-specific font-weight tweaks beyond what MUI variants provide

## Requirements

### Google Fonts injection (`public/index.html`)
Inside `<head>`, replace the existing Google Fonts block with:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap" rel="stylesheet">
```

### CSS variables (`src/styles/variables.css`)
Add to `:root`:
```css
--ic-font-heading: 'Fraunces', 'Playfair Display', Georgia, 'Times New Roman', serif;
--ic-font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
--ic-font-ui: 'Plus Jakarta Sans', 'Inter', sans-serif;
--ic-font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
```

### MUI typography (`src/theme/muiTheme.js`)
Replace the `typography` block with:
```js
typography: {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontFamilyHeading: "'Fraunces', 'Playfair Display', Georgia, serif",
  fontFamilyUI: "'Plus Jakarta Sans', 'Inter', sans-serif",

  // Display / hero
  h1: {
    fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
    fontWeight: 700,
    fontSize: 'clamp(2.5rem, 1.8rem + 3vw, 4.5rem)',
    lineHeight: 1.05,
    letterSpacing: '-0.02em',
    fontVariationSettings: '"opsz" 144',
  },
  h2: {
    fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
    fontWeight: 700,
    fontSize: 'clamp(2rem, 1.4rem + 2.5vw, 3rem)',
    lineHeight: 1.15,
    letterSpacing: '-0.015em',
    fontVariationSettings: '"opsz" 96',
  },
  h3: {
    fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
    fontWeight: 600,
    fontSize: 'clamp(1.625rem, 1.2rem + 1.5vw, 2.25rem)',
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
    fontWeight: 700,
    fontSize: 'clamp(1.375rem, 1.1rem + 1vw, 1.75rem)',
    lineHeight: 1.25,
    letterSpacing: '-0.005em',
  },
  h5: {
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.3,
  },
  h6: {
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
    fontWeight: 600,
    fontSize: '1.0625rem',
    lineHeight: 1.35,
  },

  subtitle1: { fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '1.125rem', lineHeight: 1.5 },
  subtitle2: { fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '0.9375rem', lineHeight: 1.5 },

  body1: { fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '1rem', lineHeight: 1.625 },
  body2: { fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '0.9375rem', lineHeight: 1.6 },

  button: {
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
    fontWeight: 600,
    fontSize: '0.9375rem',
    letterSpacing: '0.005em',
    textTransform: 'none',
  },
  caption: { fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '0.8125rem', lineHeight: 1.45 },
  overline: {
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
    fontWeight: 700,
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: '#D97706',
  },
}
```

### `src/styles/global.css`
- `html, body` use `var(--ic-font-body)` and `font-feature-settings: "ss01", "cv11"` for Inter polish.
- `h1, h2, h3` default to `var(--ic-font-heading)` with `text-rendering: optimizeLegibility`.
- Add a utility class `.eyebrow { font-family: var(--ic-font-ui); text-transform: uppercase; letter-spacing: 0.12em; font-size: 0.75rem; font-weight: 700; color: var(--ic-secondary); }`.
- Add `.numeric { font-family: var(--ic-font-ui); font-variant-numeric: tabular-nums; }` for fee amounts and stats.

### `*.module.css` audit
For every CSS module that hardcoded a font-family, replace with `var(--ic-font-heading)`, `var(--ic-font-body)`, or `var(--ic-font-ui)` as appropriate. Heading-style classes (`.title`, `.heading`, `.eyebrow`) → headings or UI font. Body-style classes (`.description`, `.text`, `.copy`) → body font.

## Content / Copy
N/A.

## Design Notes
- Fraunces is a variable font with `opsz` (optical-size) axis; the `fontVariationSettings` in h1/h2 set the appropriate optical size for display use.
- Don't use Fraunces below 18px (anti-pattern for serifs at small sizes); h4–h6 deliberately use Plus Jakarta Sans for readability.
- Coral / Saffron accent text uses Plus Jakarta Sans so weights line up with surrounding UI elements.

## Placeholder Image Specs
N/A.

## Acceptance Criteria
- [ ] Network panel shows Google Fonts requests for Fraunces, Inter, Plus Jakarta Sans only — no other font families
- [ ] DevTools "Computed style" on `<h1>` reports `font-family: Fraunces`
- [ ] DevTools "Computed style" on `<body>` reports `font-family: Inter`
- [ ] DevTools "Computed style" on `.MuiButton-root` reports `font-family: Plus Jakarta Sans`
- [ ] No `*.module.css` file contains a hardcoded `'Inter'` or `'Plus Jakarta Sans'` literal — all reference CSS variables
- [ ] FCP / LCP do not regress more than 100 ms vs baseline (fonts are `display=swap`)
- [ ] Visual smoke test on mobile (375px) and desktop (1440px) — h1 scales smoothly via clamp, no horizontal overflow

## Dependencies
- 04-color-palette-and-design-tokens.md

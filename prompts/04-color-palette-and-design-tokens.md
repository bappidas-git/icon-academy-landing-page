# 04 — Color Palette & Design Tokens

## Objective
Replace the Anvil navy/orange palette with a fresh Icon Commerce College palette grounded in academic trust and Indian collegiate identity: **Royal Indigo + Warm Saffron + Coral Crimson CTA**, on a Cream/White surface system. Update every CSS token, MUI theme color, gradient, and shadow tint accordingly so the visual rebrand cascades through every component automatically.

## Scope
- `src/styles/variables.css`
- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/styles/animations.css`
- `src/styles/responsive.css`
- `src/App.css`
- `src/theme/muiTheme.js` (palette, shadows, component overrides that reference colors)
- Any `*.module.css` that hardcodes Anvil hex values (search for `#0A1F3D`, `#FFB800`, `#FF6B35`, `#10B981`, `#FFF8E1`, `#1E4A85`, `#061330`, `#FFC939`, `#E6A500`, `#FF8C5A`, `#E85A20`)

## Out of Scope
- Typography (handled in prompt 05)
- Component layout / structure
- Animation timings, easing curves
- Spacing / radii / breakpoint values (only colors change)

## Requirements

### Canonical palette

| Token | Hex | Usage |
|---|---|---|
| `--ic-primary` | `#1E3A8A` | Primary brand colour (Royal Indigo) — headlines, primary buttons, links, navy surfaces |
| `--ic-primary-light` | `#3B5BDB` | Hover states, accent highlights |
| `--ic-primary-dark` | `#152659` | Pressed states, deep navy backgrounds |
| `--ic-primary-50` | `#EEF2FF` | Tinted surfaces |
| `--ic-primary-100` | `#E0E7FF` | Soft chips / pills |
| `--ic-secondary` | `#D97706` | Warm Saffron — secondary brand, badges, accent strokes |
| `--ic-secondary-light` | `#F59E0B` | Hover, gradients |
| `--ic-secondary-dark` | `#B45309` | Pressed, dark backgrounds |
| `--ic-secondary-50` | `#FFFBEB` | Soft saffron background tint |
| `--ic-cta` | `#E11D48` | Coral Crimson — Apply / Submit buttons (single dominant CTA hue) |
| `--ic-cta-light` | `#F43F5E` | CTA hover |
| `--ic-cta-dark` | `#BE123C` | CTA pressed |
| `--ic-success` | `#059669` | Success states, "verified" badges |
| `--ic-success-bg` | `#D1FAE5` | Success surface |
| `--ic-warning` | `#F59E0B` | Warnings (re-uses saffron-light) |
| `--ic-error` | `#DC2626` | Errors |
| `--ic-error-bg` | `#FEE2E2` | Error surface |
| `--ic-info` | `#0284C7` | Informational |
| `--ic-bg-default` | `#FFFFFF` | Default page background |
| `--ic-bg-cream` | `#FFFBEB` | Cream secondary background (alternating sections) |
| `--ic-bg-soft` | `#F8FAFC` | Subtle grey-blue surface |
| `--ic-bg-dark` | `#1E3A8A` | Dark hero / footer surfaces |
| `--ic-text-primary` | `#0F172A` | Primary text (slate-900) |
| `--ic-text-secondary` | `#475569` | Secondary text |
| `--ic-text-muted` | `#94A3B8` | Captions, helper text |
| `--ic-text-on-dark` | `#FFFFFF` | Text on dark backgrounds |
| `--ic-border` | `#E2E8F0` | Default borders |
| `--ic-border-strong` | `#CBD5E1` | Stronger borders, dividers |
| `--ic-shadow-sm` | `0 1px 2px rgba(15, 23, 42, 0.06)` | |
| `--ic-shadow-md` | `0 4px 12px rgba(15, 23, 42, 0.08)` | |
| `--ic-shadow-lg` | `0 12px 28px rgba(15, 23, 42, 0.12)` | |
| `--ic-shadow-cta` | `0 6px 20px rgba(225, 29, 72, 0.35)` | Coral CTA shadow |
| `--ic-shadow-cta-hover` | `0 10px 28px rgba(225, 29, 72, 0.45)` | |

### Region accents (used in TrustBar / Map)
- `--ic-assam: #1E7F5A`
- `--ic-northeast: #7C3AED` (deep purple — represents NE region collectively)
- `--ic-gauhati-uni: #6B1E1E` (heritage maroon — affiliated-with badge)

### `src/styles/variables.css` — replace entire `:root` token list with the table above; remove any solar-themed tokens (`--ic-savings-*`, `--ic-orange-*`, etc.). Maintain BC for any remaining selector that referenced old token names by aliasing once with a deprecation comment.

### `src/theme/muiTheme.js` — palette block must become:
```js
palette: {
  primary: { main: '#1E3A8A', light: '#3B5BDB', dark: '#152659', contrastText: '#FFFFFF' },
  secondary: { main: '#D97706', light: '#F59E0B', dark: '#B45309', contrastText: '#FFFFFF' },
  cta: { main: '#E11D48', light: '#F43F5E', dark: '#BE123C', contrastText: '#FFFFFF' },
  success: { main: '#059669', light: '#34D399', dark: '#047857', contrastText: '#FFFFFF', bg: '#D1FAE5' },
  warning: { main: '#F59E0B', contrastText: '#0F172A' },
  error: { main: '#DC2626', contrastText: '#FFFFFF', bg: '#FEE2E2' },
  info: { main: '#0284C7', contrastText: '#FFFFFF' },
  background: { default: '#FFFFFF', paper: '#FFFFFF', cream: '#FFFBEB', dark: '#1E3A8A', soft: '#F8FAFC' },
  text: { primary: '#0F172A', secondary: '#475569', disabled: '#94A3B8', dark: '#0F172A', light: '#FFFFFF' },
  region: { assam: '#1E7F5A', northeast: '#7C3AED', gauhatiUni: '#6B1E1E' },
  divider: '#E2E8F0',
}
```
- Update the named export `colors` and the `orangeShadow` / `orangeShadowHover` constants — rename to `ctaShadow` / `ctaShadowHover` with the coral RGBA values from the table.
- Update every component override (`MuiButton`, `MuiSlider`, `MuiSwitch`, `MuiCheckbox`, `MuiRadio`, `MuiTabs`, `MuiFab`, `MuiSpeedDial`) so the gradient / accent uses `palette.cta` for primary CTAs and `palette.primary` for navigation/page-chrome buttons. The default `containedPrimary` button should use the indigo primary; introduce a dedicated `containedCta` override (or `<Button color="cta">` via custom palette) for Apply Now / Submit.
- Remove the `orange` palette block entirely.

### `*.module.css` files
Search every `*.module.css` for the legacy hex values listed in scope. Replace each with a `var(--ic-*)` reference. If a hex appears inside a gradient, convert to two tokens.

## Content / Copy
N/A.

## Design Notes
- Single-CTA-color rule: only Apply / Submit / final-stage buttons use `--ic-cta`. All other buttons use `--ic-primary` (filled) or transparent + `--ic-primary` text (ghost).
- Cream background (`--ic-bg-cream`) is reserved for alternating sections to break visual monotony — do not use for hero or footer.
- Maintain WCAG AA contrast: indigo on cream meets AA, coral on white meets AA at 18px+ bold (verify with `npx pa11y` post-change).

## Placeholder Image Specs
N/A — colours only.

## Acceptance Criteria
- [ ] `grep -r "#0A1F3D\|#FFB800\|#FF6B35\|#FFF8E1\|#1E4A85\|#061330\|#FFC939\|#E6A500\|#FF8C5A\|#E85A20" src/` returns zero matches
- [ ] `src/theme/muiTheme.js` exports the new palette object exactly as specified
- [ ] `src/styles/variables.css` contains all `--ic-*` tokens listed
- [ ] `npm start` shows the home page with indigo navigation, cream-tinted alternating sections, and coral Apply CTAs
- [ ] No `*.module.css` file contains a raw hex value that maps to an old Anvil token
- [ ] `console.log(theme.palette.cta.main)` returns `#E11D48` in dev tools
- [ ] Lighthouse / pa11y AA contrast passes for primary text on cream and CTA text on coral

## Dependencies
- 01-project-cleanup-and-rebranding.md

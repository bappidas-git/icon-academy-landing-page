# 02 — Global Layout Primitives

## Context
Every new section needs the same responsive container width, vertical rhythm, and section-heading pattern. Building these once removes 50+ ad-hoc `maxWidth: 1200` props scattered across future sections and guarantees consistent breathing room on mobile.

## Files to create
- `src/components/common/Section/Section.jsx`
- `src/components/common/Section/Section.module.css`
- `src/components/common/Section/index.js`
- `src/components/common/SectionHeading/SectionHeading.jsx`
- `src/components/common/SectionHeading/SectionHeading.module.css`
- `src/components/common/SectionHeading/index.js`

## Implementation

### `Section.jsx`
Props:
- `id` (string, optional) — anchor target
- `variant` — `"default" | "muted" | "dark" | "gold"` (default: `"default"`)
- `size` — `"sm" | "md" | "lg"` (default: `"md"`, maps to `--section-y-*`)
- `containerMaxWidth` — `"lg" | "xl" | "2xl"` (default: `"xl"` → 1280px)
- `children`
- `className`
- `as` — defaults to `"section"`

Renders a `<section>` with CSS-module classes for variant + size, then an inner `.container` div that clamps width using `var(--container-xl)` etc. and applies `--section-px` horizontal padding.

### `Section.module.css`
- `.section` — `position: relative; width: 100%;`
- `.sm` / `.md` / `.lg` — apply `padding-block: var(--section-y-sm | md | lg)`
- `.default` — `background: var(--white)`
- `.muted` — `background: var(--light-gray)`
- `.dark` — `background: linear-gradient(180deg, var(--primary-dark) 0%, var(--primary-dark-alt) 100%); color: var(--white)`
- `.gold` — `background: var(--card-yellow)`
- `.container` — `max-width: var(--container-xl); margin: 0 auto; padding-inline: var(--section-px);`
- `.container-2xl` — `max-width: var(--container-2xl)`
- `.container-lg` — `max-width: var(--container-lg)`

### `SectionHeading.jsx`
Props:
- `eyebrow` (string, optional) — small uppercase label rendered above title
- `title` (string, required) — the h2
- `subtitle` (string, optional) — body paragraph below title
- `align` — `"left" | "center"` (default: `"center"`)
- `inverse` — boolean, renders white text on dark backgrounds
- `maxWidth` — number, caps subtitle width (default 720)

Uses Framer Motion `motion.div` with a simple fade + translateY stagger. Wrap with `useInView` (import from `react-intersection-observer`, which is already a dependency) so animation triggers once when scrolled into view.

### `SectionHeading.module.css`
- `.eyebrow` — `color: var(--accent-gold); font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700;`
- `.title` — uses `--font-heading`, `font-size: var(--fs-3xl)`, `line-height: var(--lh-tight)`, `color: var(--primary-dark)`
- `.subtitle` — `color: var(--text-gray); font-size: var(--fs-md); line-height: var(--lh-relaxed); margin-top: 0.75rem;`
- `.inverse .title` — `color: var(--white)`
- `.inverse .subtitle` — `color: rgba(255,255,255,0.85)`
- `.inverse .eyebrow` — `color: var(--accent-gold-light)`
- `.center` — `text-align: center; margin-inline: auto;`

### `index.js` (both)
Just `export { default } from './Section';` / `'./SectionHeading';`.

## Acceptance criteria
- [ ] `import Section from 'components/common/Section'` and `import SectionHeading from 'components/common/SectionHeading'` both resolve.
- [ ] Rendering `<Section variant="muted" size="lg" id="test"><SectionHeading eyebrow="Test" title="Hello" subtitle="World" /></Section>` in a scratch page produces a centred, padded block with correct colours on both desktop and mobile (test at 375px + 1440px).
- [ ] No existing section uses these yet — they're foundation-only.
- [ ] Build passes.

## Do-not-touch
- Existing section components.
- `src/App.jsx`.
- Tokens from prompt 01.

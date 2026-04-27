# 26 — Accessibility Pass (A11y)

## Context
Accessibility isn't optional for an ads-funded landing page — screen readers, keyboard-only users, and low-vision users are real customers. This prompt does a single focused a11y sweep: contrast fixes, semantic landmarks, ARIA labels on custom widgets, keyboard focus rings, and a motion-reduce acknowledgement (already wired in prompt 25).

## Files to modify
- `src/components/sections/CalculatorSection/CalculatorOutput.jsx` — live-region announcements
- `src/components/common/MultiStepLeadForm/**/*.jsx` — landmarks, aria-describedby, fieldset/legend
- `src/components/sections/SolutionsSection/SolutionCard.jsx`
- `src/components/sections/InstallGallery/BeforeAfter.jsx` — keyboard slider
- `src/components/sections/FAQSection/FAQSection.jsx`
- `src/components/common/StickyMobileCTA/StickyMobileCTA.jsx`
- `src/styles/global.css` — focus-visible ring

## Implementation

### 1. Focus ring (global)
In `src/styles/global.css`, add near the bottom (after any reset):
```css
:where(button, a, [role="button"], input, select, textarea):focus-visible {
  outline: 2px solid var(--accent-gold);
  outline-offset: 2px;
  border-radius: 6px;
}
```
Ensure `:focus` default outline isn't removed anywhere — if any CSS module sets `outline: none;` without a `:focus-visible` equivalent, replace it.

### 2. Semantic landmarks
Each `<Section>` renders `<section>` already. Ensure:
- Header uses `<header>` role — already does.
- Footer uses `<footer>` — already does.
- `<main>` wraps sections — already does (`<main id="main-content">` in App.jsx).
- `SectionHeading` `title` renders as `<h2>` (not h1). Verify.

### 3. Multi-step form
- Wrap each step in a `<fieldset>` with a visually-hidden `<legend>` describing the step purpose (e.g. `Step 1: Your bill and location`).
- `<div role="radiogroup" aria-labelledby="stepN-billQuestion">` around chip groups in Step 1 / Step 2.
- Each chip is `<button role="radio" aria-checked={selected}>`.
- Consent checkbox `aria-describedby` pointing to the hidden consent helper text.
- Submit button has `aria-busy={isSubmitting}` while submitting.
- Step indicator has `role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3} aria-label="Form progress"`.

### 4. Calculator live region
In `CalculatorOutput.jsx`, wrap the primary savings number in `<div aria-live="polite" aria-atomic="true">` so screen readers hear each updated value. Debounce the announcement by 300ms (simple `useEffect` with timeout) so we don't spam the reader while dragging a slider.

### 5. Before/After slider (`BeforeAfter.jsx`)
- Wrap in `<div role="slider" tabIndex={0} aria-label="Before after comparison. Use left and right arrows." aria-valuenow={pos} aria-valuemin={5} aria-valuemax={95}>`.
- Add `onKeyDown`: ArrowLeft / ArrowRight adjust `pos` by 5; Home/End set to 5/95.
- Visible focus ring on the draggable handle.

### 6. FAQ accordion
MUI `Accordion` provides `aria-expanded` out of the box. Verify each `AccordionSummary` has `id="faq-{index}-summary"` and `AccordionDetails` has `aria-labelledby="faq-{index}-summary"`.

### 7. Solutions cards
- The card `<article>` wraps each card (not `<div>`).
- Clicking the card anywhere opens the drawer; keyboard users: the CTA `<button>` is focusable. Decorative icons in the body get `aria-hidden="true"`.
- The card image has `alt` matching the solution title (e.g. `"Residential Rooftop solar installation"`).

### 8. Sticky mobile CTA
- Each cell is a `<button>` or `<a>` with explicit `aria-label` ("Call Anvil", "WhatsApp Anvil", "Get a free quote").
- Icons inside get `aria-hidden="true"`.

### 9. Contrast audit
Fix these flagged pairs — use browser DevTools' contrast checker:
- Hero subhead on dark overlay: ensure contrast ≥ 4.5:1. If the gradient makes it borderline, darken the overlay to `rgba(10,31,61,0.55)` from `0.4`.
- Footer `rgba(255,255,255,0.75)` on `#0A1F3D` — already ~11:1, fine.
- Testimonial quote on white — ensure `var(--ink)` (#0A1F3D) not `--text-gray`.
- Savings-green on white for pill text: use `--savings-green-dark` (#047857) on `--savings-green-bg` (#ECFDF5), not `--savings-green` on white.

### 10. Images
Every `<img>` needs an `alt`. In each placeholder image, set `alt` to the same label as the `?text=` param, humanised (e.g. `alt="Rooftop solar panels on an Assam home at sunrise"`).

### 11. Skip link (already exists in App.jsx)
Verify `Skip to main content` link becomes visible on keyboard focus. The existing `.skip-link` in `App.css` should use `:focus` → position: static / visible.

## Acceptance criteria
- [ ] All interactive elements have a visible 2px gold focus ring on keyboard navigation.
- [ ] Screen reader announces the form step ("Step 1 of 3: Your bill and location") when each step becomes active.
- [ ] Screen reader announces updated savings number (polite, not assertive).
- [ ] Before/after slider can be operated via keyboard (Arrow keys) and announces its value.
- [ ] axe-core or Lighthouse Accessibility score ≥ 95 on the home route.
- [ ] No `<img>` without `alt`.
- [ ] No `<button>` without accessible name.
- [ ] Tab order is logical: skip link → header → hero → trust bar → solutions → calculator → etc.

## Do-not-touch
- Copy text (verified in prior prompts).
- MUI theme component overrides except to add focus-visible outline if missing.
- Framer Motion variants except the reduced-motion branch from prompt 25.

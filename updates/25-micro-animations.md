# 25 — Micro-Animations, Transitions & Loading States

## Context
The page should feel premium without being sluggish. This prompt does a focused pass to (a) unify scroll-reveal animations across new sections, (b) add loading + empty states, (c) smooth form step transitions, and (d) add a single `prefers-reduced-motion` bypass.

## Files to create
- `src/hooks/useReducedMotion.js` — tiny wrapper around `window.matchMedia('(prefers-reduced-motion: reduce)')`
- `src/components/common/Reveal/Reveal.jsx` — shared scroll-reveal wrapper
- `src/components/common/Reveal/Reveal.module.css`

## Files to modify
- `src/components/sections/SolutionsSection/SolutionsSection.jsx`
- `src/components/sections/HowItWorksSection/HowItWorksSection.jsx`
- `src/components/sections/SubsidiesSection/SubsidiesSection.jsx`
- `src/components/sections/FinancingSection/FinancingSection.jsx`
- `src/components/sections/TestimonialsSection/TestimonialsSection.jsx`
- `src/components/sections/InstallGallery/InstallGallery.jsx`
- `src/components/sections/FAQSection/FAQSection.jsx`
- `src/components/sections/FinalCTASection/FinalCTASection.jsx`
- `src/components/common/MultiStepLeadForm/MultiStepLeadForm.jsx` — AnimatePresence polish

## Implementation

### `useReducedMotion.js`
```js
import { useEffect, useState } from 'react';

export default function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}
```

### `Reveal.jsx`
Props:
- `as` — defaults to `"div"`
- `variant` — `"fade" | "slide-up" | "slide-left" | "scale"` (default `"slide-up"`)
- `delay` — number in ms (default 0)
- `once` — default `true`
- `threshold` — default `0.15`
- `children`

Uses `react-intersection-observer`'s `useInView` + Framer Motion `motion[as]` with the chosen variant. If `useReducedMotion()` is true, render children with a plain `<div>` instead of `motion.div` — no animation.

Animation variants:
```js
fade:       { hidden: { opacity: 0 },                   visible: { opacity: 1 } }
slide-up:   { hidden: { opacity: 0, y: 24 },            visible: { opacity: 1, y: 0 } }
slide-left: { hidden: { opacity: 0, x: -24 },           visible: { opacity: 1, x: 0 } }
scale:      { hidden: { opacity: 0, scale: 0.96 },      visible: { opacity: 1, scale: 1 } }
```
Transition: `{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: delay / 1000 }`.

### Apply `<Reveal>` inside each listed section
Wrap each card grid item (Solutions card, HowItWorks card, Testimonial card, etc.) with `<Reveal delay={index * 80}>...`. Keep existing Framer animations on hover (those are interaction animations, not scroll reveals).

### MultiStepLeadForm — refine step transitions
In `MultiStepLeadForm.jsx`, switch the step `AnimatePresence` to use `mode="wait"` so the outgoing step completes its animation before incoming mounts. Variants:
```js
const stepVariants = {
  enter:  { opacity: 0, x: 32 },
  centre: { opacity: 1, x: 0 },
  exit:   { opacity: 0, x: -32 },
};
```
If `useReducedMotion()` is true, fade only (no x shift).

### Loading state
Inside `useLeadFormMachine`'s submit, when `isSubmitting === true`, render the step content with `pointer-events: none; opacity: 0.5`. The submit button already shows spinner. Ensure a single Skeleton strip never flashes unexpectedly.

### Empty state for the calculator
When `inputs.monthlyBill === 0` (shouldn't happen at runtime but guard against it), render the output panel with:
- Greyed metrics
- Callout: `Set your monthly bill and roof area on the left to see savings.`

## Acceptance criteria
- [ ] Scrolling into Solutions reveals cards one by one with a 80ms stagger, slide-up.
- [ ] Scrolling into HowItWorks reveals cards similarly.
- [ ] With `prefers-reduced-motion: reduce` enabled in OS settings, no section animates; content is immediately visible.
- [ ] Multi-step form transitions between steps smoothly with `mode="wait"`.
- [ ] Submit button shows spinner + step content is dimmed while submitting.
- [ ] No console warnings about mismatched `key` props or animation frames.

## Do-not-touch
- Hero animations (already polished).
- Swiper animations in Testimonials (Swiper has its own).
- Drawer / modal animations.

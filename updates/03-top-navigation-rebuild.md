# 03 — Top Navigation Rebuild

## Context
The current menu points `Solar Calculator → #calculator` and `FAQ → #faq` but neither anchor exists, so clicks do nothing. Labels are generic (`Savings`, `FAQ`) and don't compel a click. We replace the menu with four benefit-driven items that scroll to sections we'll build in prompts 11–21, and we surface a prominent right-side CTA that opens the lead drawer.

## Files to modify
- `src/components/common/Header/Header.jsx` — update the `navItems` array, CTA text, and icon map only
- `src/components/common/MobileDrawer/MobileDrawer.jsx` — mirror the new items

## Implementation

### 1. In `Header.jsx`, replace the existing `navItems` constant (around line 24) with:

```js
const navItems = [
  { label: "See My Savings", href: "#calculator", icon: "mdi:calculator-variant-outline" },
  { label: "Solutions", href: "#solutions", icon: "mdi:view-grid-outline" },
  { label: "How It Works", href: "#how-it-works", icon: "mdi:timeline-check-outline" },
  { label: "Subsidies & EMI", href: "#subsidies", icon: "mdi:bank-outline" },
  { label: "FAQs", href: "#faq", icon: "mdi:help-circle-outline" },
];
```

Then update the `iconMap` near line 321 so every label maps to its `icon` (or inline the icon from the array).

### 2. In `Header.jsx`, find the header CTA button (currently labelled "Enquire Now" or similar near line 229) and set its label to **"Get Free Quote"** with `onClick` calling `openLeadDrawer('header_cta')`.

### 3. Smooth-scroll behaviour
The file already has hash-based scroll logic in `App.jsx`. The header link clicks set `location.hash` via React Router. Verify each new anchor (`#calculator`, `#solutions`, `#how-it-works`, `#subsidies`, `#faq`) — these sections will be created in later prompts. If a section doesn't exist yet, clicks will silently no-op, which is acceptable for this prompt.

### 4. In `MobileDrawer.jsx`, replace the mirrored menu array with the same five items above. Keep existing drawer animations, close-on-select, and "Book Consultation" CTA unchanged.

### 5. Active state on scroll
Header already has an IntersectionObserver near line 61 (`const sections = navItems.map((item) => item.href.substring(1))`). This will auto-pick up new IDs — no change needed.

## Acceptance criteria
- [ ] Desktop header shows five labels in order: See My Savings, Solutions, How It Works, Subsidies & EMI, FAQs.
- [ ] Right-hand CTA reads "Get Free Quote" and opens the lead drawer.
- [ ] Mobile drawer shows the same five items with matching icons.
- [ ] Clicking a nav item while the target section exists smooth-scrolls and highlights the active item.
- [ ] Clicking a nav item where the section doesn't yet exist is silent (no console errors).
- [ ] GTM `trackNavigation` event still fires on nav clicks (existing behaviour preserved).

## Do-not-touch
- `App.jsx` hash-scroll polling logic.
- `Header.module.css` — visual styles stay.
- `MobileDrawer.module.css`.
- `LeadFormDrawer`, `ModalContext`, `useGTMTracking`.
- Any logo URL or phone-number display.

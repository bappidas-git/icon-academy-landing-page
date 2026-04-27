# 08 — Header & Navigation

## Objective
Rebuild the site header and mobile navigation drawer for Icon Commerce College: replace the Anvil logo / brand mark with an ICC wordmark, change navigation links to admissions-relevant anchors, switch primary CTA copy to "Apply Now", and re-style for the new indigo/saffron/coral palette.

## Scope
- `src/components/common/Header/Header.jsx`
- `src/components/common/Header/Header.module.css`
- `src/components/common/MobileDrawer/MobileDrawer.jsx`
- `src/components/common/MobileDrawer/MobileDrawer.module.css`
- `src/components/common/MobileNavigation/MobileNavigation.jsx` (if it currently embeds anchor labels)
- `src/components/common/MobileNavigation/MobileNavigation.module.css`

## Out of Scope
- `LeadFormDrawer` mechanics (only the CTA button is updated to call `openLeadDrawer({ source: 'header_apply' })`)
- `ModalContext.jsx` source-key mapping (handled in prompt 27)
- `StickyMobileCTA` — separate component, handled in prompt 31

## Requirements

### Navigation links (used by both desktop Header and MobileDrawer)
Define a single source-of-truth array — preferably in a new `src/data/navigationData.js`:

```js
export const NAV_LINKS = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'programs', label: 'Programmes', href: '#programs' },
  { id: 'why', label: 'Why Icon', href: '#why-icon' },
  { id: 'faculty', label: 'Faculty', href: '#faculty' },
  { id: 'admissions', label: 'Admissions', href: '#admissions' },
  { id: 'fees', label: 'Fees', href: '#fees' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const PRIMARY_CTA = {
  id: 'header_apply',
  label: 'Apply Now',
  source: 'header_apply',
};
```

### `Header.jsx`
- Render a sticky top bar with shadow on scroll (use `useScrollPosition` hook already in repo; toggle a `.scrolled` class when `scrollY > 24`).
- **Logo:** placeholder `<img src="https://placehold.co/200x60?text=Icon+Commerce+College" alt="Icon Commerce College" />` linked to `/`. Beside it, a small saffron eyebrow `<span className="eyebrow">Estd. 2004 · Affiliated to Gauhati University</span>` (visible on desktop only).
- **Nav (desktop, ≥1024px):** map `NAV_LINKS`; smooth-scroll to anchors; underline-on-hover in saffron.
- **CTA (right side):** `<Button color="cta" variant="contained">Apply Now</Button>` — coral pill, calls `useModal().openLeadDrawer({ source: 'header_apply' })`.
- **Mobile (<1024px):** logo + hamburger; CTA is a compact icon button (chat / form icon) with same source.
- Replace any `Anvil`/`solar` strings.

### `MobileDrawer.jsx`
- Slide-in drawer from right; full-height; cream background `var(--ic-bg-cream)`.
- Header of drawer: logo + close button; tagline `Where Knowledge Meets Character`.
- Body: vertical list of `NAV_LINKS` (large tap targets ≥48px); each link auto-closes the drawer on click.
- Footer of drawer: phone link, email link, social icons (use `var(--ic-secondary)` for icon color; use env-supplied URLs); a coral "Apply Now" CTA button at the bottom.
- Z-index above all content but below modals and SweetAlert (current values preserved).

### `MobileNavigation.jsx`
If it exists as the bottom-nav variant (check current file to confirm), simplify to 4 items: Home / Programmes / Apply / Contact, with the centre Apply tile rendered as a coral floating action style.

### Brand colors used
- Header background: `#FFFFFF` (default), `rgba(255,255,255,0.92)` with backdrop-filter blur when scrolled.
- Logo eyebrow: `var(--ic-secondary)`.
- Nav link text: `var(--ic-text-primary)` default, `var(--ic-secondary)` underline on hover.
- CTA button: `color="cta"` (coral) with `var(--ic-shadow-cta)`.
- Drawer background: `var(--ic-bg-cream)`.

### A11y
- Header is `<header role="banner">`; nav is `<nav aria-label="Primary">`.
- Mobile hamburger button has `aria-label="Open navigation"` and `aria-expanded` reflecting drawer state.
- Drawer traps focus while open (use existing focus-trap pattern in MobileDrawer if present; otherwise add one with `useRef` + first/last focusable element loop).
- All anchor links emit a `nav_click` GTM event via existing `trackNavigation()` helper — already wired; verify only.

## Out of Scope
- The modal/drawer body content (stays as `LeadFormDrawer` — handled in prompts 25–26)
- Performance optimizations beyond preserving current code-splitting

## Content / Copy
- Primary CTA label everywhere: `Apply Now`
- Logo alt: `Icon Commerce College`
- Eyebrow on desktop: `Estd. 2004 · Affiliated to Gauhati University`
- Tagline in mobile drawer: `Where Knowledge Meets Character`
- Phone/email/social URLs: read from env vars (already wired in current file).

## Design Notes
- Minimum hit area on mobile: 44×44 px.
- Sticky behavior shows shadow `var(--ic-shadow-md)` at `scrollY > 24`.
- Animation: drawer slides in over 240 ms with `cubic-bezier(0.16, 1, 0.3, 1)`.

## Placeholder Image Specs
- Logo: `https://placehold.co/200x60?text=Icon+Commerce+College` (renders fine on white) — also accept `https://placehold.co/60x60?text=ICC` for compact mobile variant.
- Social icons: use `@iconify/react` (already a dep) for `mdi:facebook`, `mdi:instagram`, `mdi:linkedin`, `mdi:youtube`.

## Acceptance Criteria
- [ ] Desktop header shows: logo (left), nav (centre), Apply Now coral button (right)
- [ ] Eyebrow `Estd. 2004 · Affiliated to Gauhati University` visible above the nav on screens ≥1024px
- [ ] Clicking Apply Now opens the LeadFormDrawer with `source === 'header_apply'`
- [ ] Mobile (<1024px): logo + hamburger; tapping hamburger opens drawer with full nav and an Apply Now CTA at bottom
- [ ] All nav anchor links scroll smoothly to the right section IDs (verify after later prompts have added the sections; for now, missing anchors should not throw — graceful no-op)
- [ ] Sticky header gains shadow on scroll past 24 px
- [ ] No Anvil / solar strings remain in any of the four files
- [ ] Lighthouse a11y audit on Header reports no critical issues (focus order, aria labels, contrast)

## Dependencies
- 04-color-palette-and-design-tokens.md
- 05-typography-system.md

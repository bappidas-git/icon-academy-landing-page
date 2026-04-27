# 24 — Footer Redesign

## Context
The current footer likely reflects a generic boilerplate. The rebuild needs a footer that (a) reinforces trust with certifications + regulator names, (b) surfaces quick contact and nav, and (c) repeats the lead-form CTA one more time. Clean, dense, not busy.

## Files to modify
- `src/components/common/Footer/Footer.jsx`
- `src/components/common/Footer/Footer.module.css`

## Implementation

Rebuild the footer as four stacked strips:

### Strip 1 — Top CTA band
A thin strip above the main footer:
- Left: `Not ready to commit? Start with a 2-minute chat.`
- Right: Button `Chat on WhatsApp →` (green) — `https://wa.me/911800202001`
- Background: `var(--surface-muted)`, border-top 1px var(--border-gray).

### Strip 2 — Main footer (dark navy)
Background `var(--primary-dark)`, text white-ish.

4 columns on desktop (≥1024px), 2×2 on tablet (≥640px), stacked on mobile:

**Col 1 — Brand**
- Anvil logo (use existing logo URL from Header).
- Tagline: `India's hassle-free rooftop solar partner.`
- 4-icon social row (LinkedIn, Instagram, YouTube, Facebook) — use `https://placehold.co/40x40?text={first-letter}` as anchor placeholder until real social URLs are added.

**Col 2 — Solutions**
- Residential Rooftop
- Villa & Large Home
- Housing Society
- Solar + Battery
Each link scrolls to `#solutions`.

**Col 3 — Company**
- How It Works (`#how-it-works`)
- Calculator (`#calculator`)
- Subsidies & EMI (`#subsidies`)
- FAQs (`#faq`)

**Col 4 — Talk to us**
- Phone: 1800 2020 001 (tel link)
- WhatsApp: wa.me/911800202001
- Email: hello@anvil.energy
- Regions: Assam · Nagaland · Bhubaneswar · PAN-India

### Strip 3 — Certifications / regulator strip
A slim row with these placeholder badges:
- `https://placehold.co/120x48?text=MNRE` — Ministry of New and Renewable Energy
- `https://placehold.co/120x48?text=BIS+Certified`
- `https://placehold.co/120x48?text=PM+Surya+Ghar+Partner`
- `https://placehold.co/120x48?text=Startup+India`
- `https://placehold.co/120x48?text=ISO+9001`

### Strip 4 — Bottom bar
- Left: `© 2026 Anvil Energy. All rights reserved.`
- Centre: `Privacy Policy · Terms of Service · Refund Policy` (links to modals/new routes — for now, the Privacy link triggers the existing privacy modal from `UnifiedLeadForm`; Terms & Refund can be `href="#"` for now with a small `TODO: add routes` comment is acceptable... actually no, instead link them to `https://solar.anvil.energy/privacy`, `https://solar.anvil.energy/terms`, `https://solar.anvil.energy/refund` as placeholders so there are no dead links).
- Right: small text `Made for Indian homeowners ⚡`

### `Footer.module.css`
- `.topBand { background: var(--surface-muted); border-top: 1px solid var(--border-gray); padding: 16px 0; }`
- `.topBandInner { max-width: var(--container-xl); margin: 0 auto; padding-inline: var(--section-px); display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }`
- `.topBandText { font-size: 0.9375rem; color: var(--ink); font-weight: 500; }`
- `.topBandCta { padding: 10px 18px; background: #25D366; color: var(--white); border-radius: 999px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }`
- `.topBandCta:hover { background: #1EA855; }`
- `.main { background: var(--primary-dark); color: rgba(255,255,255,0.85); padding: 48px 0 32px; }`
- `.mainInner { max-width: var(--container-xl); margin: 0 auto; padding-inline: var(--section-px); display: grid; grid-template-columns: 1fr; gap: 32px; }`
- `@media (min-width: 640px) { .mainInner { grid-template-columns: 1fr 1fr; } }`
- `@media (min-width: 1024px) { .mainInner { grid-template-columns: 1.4fr 1fr 1fr 1.2fr; gap: 48px; } }`
- `.col h4 { font-family: var(--font-heading); color: var(--white); font-weight: 700; font-size: 0.9375rem; margin-bottom: 16px; letter-spacing: 0.02em; }`
- `.col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }`
- `.col a { color: rgba(255,255,255,0.75); text-decoration: none; font-size: 0.875rem; transition: color 0.2s ease; }`
- `.col a:hover { color: var(--accent-gold); }`
- `.logo { width: 120px; margin-bottom: 16px; }`
- `.tagline { font-size: 0.9375rem; color: rgba(255,255,255,0.75); line-height: 1.6; margin-bottom: 20px; max-width: 320px; }`
- `.social { display: flex; gap: 10px; }`
- `.socialBtn { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; transition: background 0.2s ease; }`
- `.socialBtn:hover { background: var(--accent-gold); color: var(--primary-dark); }`
- `.certs { background: #06152B; border-top: 1px solid rgba(255,255,255,0.08); padding: 24px 0; }`
- `.certsInner { max-width: var(--container-xl); margin: 0 auto; padding-inline: var(--section-px); display: flex; gap: 24px; align-items: center; justify-content: center; flex-wrap: wrap; opacity: 0.85; }`
- `.certBadge { height: 40px; width: auto; filter: grayscale(0.4) brightness(1.1); }`
- `.bottom { background: #06152B; padding: 16px 0; border-top: 1px solid rgba(255,255,255,0.05); }`
- `.bottomInner { max-width: var(--container-xl); margin: 0 auto; padding-inline: var(--section-px); display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; font-size: 0.8125rem; color: rgba(255,255,255,0.55); }`
- `.bottomLinks { display: flex; gap: 16px; }`
- `.bottomLinks a { color: rgba(255,255,255,0.55); text-decoration: none; }`
- `.bottomLinks a:hover { color: var(--accent-gold); }`

## Acceptance criteria
- [ ] Footer has four distinct strips: top CTA, main 4-col, cert strip, bottom copyright.
- [ ] All section anchor links scroll to the correct IDs (`#solutions`, `#calculator`, `#how-it-works`, `#subsidies`, `#faq`).
- [ ] WhatsApp and phone links are clickable tel/wa.me links.
- [ ] Cert strip renders 5 placeholder badges at 40px height.
- [ ] Mobile layout collapses to stacked single column in the main strip.
- [ ] No broken anchor href="#" remains.

## Do-not-touch
- Any section above the footer.
- Privacy modal component (if reused).
- Header.

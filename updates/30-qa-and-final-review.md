# 30 — Cross-Browser QA + Final Review + Cleanup

## Context
Final pass. Three goals: (1) verify every flow works across browsers + mobile, (2) prune legacy sections that are no longer mounted, (3) sign off against the original acceptance checklist.

## Files to modify (pruning)
- `src/App.jsx` — remove imports for sections no longer in the render tree
- Delete (after confirming zero references): `src/components/common/UnifiedLeadForm/*`, `src/components/sections/WhyTransplantsFailCTA/*`, `src/components/sections/SecondaryCTASection/*`, `src/components/sections/AboutSection/*`, `src/components/sections/ServicesSection/*`, `src/components/sections/HighlightsSection/*`, `src/components/sections/StatsSection/*`, `src/components/sections/FeaturesSection/*`, `src/components/sections/LocationSection/*`, `src/components/sections/CTASection/*`, `src/components/sections/ContactSection/*`

⚠️ Before deleting any of the above, grep the entire `src/` tree for references. If something is still imported anywhere (Header, Footer, admin, test files), leave the file and note it inline as "retained because X imports it".

## Final App.jsx section order (target)
```
<Header />
<main>
  <HeroSection />
  <TrustBar />
  <SolutionsSection />          {/* #solutions */}
  <CalculatorSection />         {/* #calculator */}
  <HowItWorksSection />         {/* #how-it-works */}
  <SubsidiesSection />          {/* #subsidies */}
  <FinancingSection />          {/* #financing */}
  <TestimonialsSection />       {/* #testimonials */}
  <InstallGallery />            {/* #gallery */}
  <FAQSection />                {/* #faq */}
  <FinalCTASection />           {/* #final-cta */}
</main>
<Footer />
<StickyMobileCTA />
<FloatingContacts />
<LeadFormDrawerWrapper />
```

Every lazy import above should exist in the `useIdlePreload` sections array.

## Cross-browser QA matrix
Test each of the below in at least two browsers (Chrome + Safari) and two widths (375px and 1440px):

| # | Flow | Expected |
|---|---|---|
| 1 | Hero loads, image placeholder visible, headline legible | Yes, no CLS |
| 2 | All 5 nav links smooth-scroll to their sections | Yes |
| 3 | Multi-step form Step 1 → 2 → 3 → submit (Hero path) | Success state shown, tracking fires |
| 4 | Drawer open from Header "Get Free Quote" | Same flow works |
| 5 | Calculator sliders update all output metrics live | Yes, no lag |
| 6 | Calculator CTA opens form starting at Step 2 with pre-fill | Yes, context chip correct |
| 7 | Solutions card CTA opens form with correct solutionTag | Yes, visible in context chip + webhook payload |
| 8 | Subsidy state card "Calculate for my X home" updates calc state | Yes, scroll + state update |
| 9 | Financing tier CTA opens drawer with tier label | Yes |
| 10 | Testimonial Swiper autoplays, pauses on hover, swipes on mobile | Yes |
| 11 | Before/after slider drags on both mouse and touch | Yes |
| 12 | FAQ accordion expand/collapse works | Yes |
| 13 | Final CTA form inline submission works | Yes |
| 14 | Sticky mobile CTA shows after 400px scroll, 3 buttons work | Yes |
| 15 | Floating WhatsApp/Call on desktop after 800px scroll | Yes |
| 16 | Footer links all lead to valid anchors or URLs (no `href="#"` dead links) | Yes |
| 17 | Keyboard-only: Tab through full page, all CTAs reachable, focus ring visible | Yes |
| 18 | Reduced motion: no animations play | Yes |
| 19 | Screen reader (VoiceOver or TalkBack) announces form steps + savings updates | Yes |
| 20 | GTM Preview shows all 7 funnel events on a full calculator → submission run | Yes |

## Final acceptance checklist (original brief)

**Structural / UX**
- [ ] Page no longer overloaded; ~11 focused sections.
- [ ] Menu is benefit-driven, scroll-linked, all anchors resolve.

**Hero**
- [ ] Multi-step lead form replaces the long single form.
- [ ] Region localisation in the headline.
- [ ] Placeholder images used for swap-in.

**Calculator + Solutions**
- [ ] Calculator has sliders, live output, and CTA into the same form.
- [ ] Solutions grid shows 4 cards, each with its own tag fed into the form.

**Imagery**
- [ ] Every image uses `https://placehold.co/WxH?text=Label`.
- [ ] Each image has an explanatory label in its URL.

**Conversion & trust**
- [ ] Trust bar, subsidies, testimonials, before/after, FAQ all present.
- [ ] Sticky mobile CTA + floating WhatsApp/Call.
- [ ] GTM dataLayer events + Meta Pixel + CAPI + Google Ads enhanced conversions all fire.

**Content tone**
- [ ] Copy is short, scannable, first-time-solar-buyer friendly.
- [ ] Localised to Assam / Nagaland / Bhubaneswar.

## Deliverable
A commit on `claude/landing-page-prompts-WPk9l` titled:
```
feat: rebuild landing page from 30 prompt files (final review)
```
Containing the pruning from this prompt plus a short PASS/FAIL note for each row of the QA matrix in a file at `updates/QA-REPORT.md` (create it here, one file only, under 200 lines).

## Do-not-touch
- `CLAUDE.md`.
- `CHANGELOG.md`.
- `package.json` dependencies (no upgrades as part of this rebuild).
- `admin/*` routes.
- `utils/*` tracking utilities.
- `swalHelper.js`, `webhookSubmit.js`, `validators.js`.

# 04 — Hero Section Shell

## Context
The existing hero crams a 6-field calculator + 5-field lead form on the right — homeowners see a wall of inputs and bounce. We rebuild the hero shell with a tighter left-side value proposition and a right-side **placeholder** for the multi-step form (the form itself comes in prompts 05–09). This prompt changes copy, adds region localisation, swaps the image for a placeholder, and leaves a `<div id="hero-form-slot" />` we'll populate in prompt 09.

## Files to modify
- `src/components/sections/HeroSection/HeroSection.jsx`
- `src/components/sections/HeroSection/HeroSection.module.css` (minor spacing only)

## Implementation

### 1. Replace `HERO_IMAGES` (around line 25) with:

```js
const HERO_IMAGES = {
  desktop: [
    "https://placehold.co/1600x900?text=Assam+Home+With+Rooftop+Solar+Panels+Sunrise",
  ],
  mobile: [
    "https://placehold.co/800x1000?text=Rooftop+Solar+Installation+Northeast+India",
  ],
};
```

### 2. Replace the headline copy (around line 205). The new headline + subhead:

```jsx
<Typography variant="h1" className={styles.heroTitle} sx={{ /* keep existing sx */ }}>
  Cut your power bill by up to{" "}
  <span className={styles.accent}>90%</span>
  <br />with rooftop solar built for your home.
</Typography>
```

Subhead:
```
Free site survey. PM Surya Ghar subsidy up to ₹78,000. Zero-down-payment EMIs from 7%. Trusted by homeowners across Assam, Nagaland & Bhubaneswar.
```

### 3. Replace the launch badge label (around line 172) with:
```
"Serving Assam • Nagaland • Bhubaneswar"
```

### 4. Update `trustIndicators` (around line 83) to exactly four items, mobile-first order:

```js
const trustIndicators = [
  { icon: "mdi:sun-wireless", text: "Free design + savings plan" },
  { icon: "mdi:bank", text: "PM Surya Ghar subsidy ₹78,000" },
  { icon: "mdi:shield-sun", text: "25-yr panel warranty" },
  { icon: "mdi:whatsapp", text: "WhatsApp support 7 days" },
];
```

### 5. Replace the entire right-column desktop form block (lines ~318–369, inside `{isDesktop && (...)}`) with a **slot placeholder**:

```jsx
{isDesktop && (
  <Grid item lg={5}>
    <motion.div
      className={styles.formWrapper}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
    >
      <div id="hero-form-slot" className={styles.formCard}>
        {/* MultiStepLeadForm will be mounted here in prompt 09 */}
        <div style={{ padding: "32px", color: "#FFFFFF", textAlign: "center", minHeight: "420px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div>
            <strong style={{ fontSize: "1.1rem" }}>Get your free savings plan</strong>
            <div style={{ opacity: 0.75, marginTop: "8px", fontSize: "0.9rem" }}>
              Multi-step form mounts here (prompt 09)
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </Grid>
)}
```

### 6. Update the two CTA buttons (around lines 235–300):
- Primary CTA label: `"Get My Free Savings Plan"` (keeps `openLeadDrawer("hero-primary")` behaviour)
- Secondary CTA label: `"See My Savings"` (keeps `href="#calculator"`)

### 7. Remove the existing `UnifiedLeadForm` import — the old single-form path is now severed from the hero.

## Acceptance criteria
- [ ] Hero shows new headline, subhead, region badge, 4 trust indicators.
- [ ] Desktop right column shows a visible placeholder card with the text "Multi-step form mounts here (prompt 09)".
- [ ] Mobile shows no form in the hero — only headline, CTAs, trust indicators (the form accessible via sticky CTA later).
- [ ] The hero image uses the `placehold.co` URL above at 1600×900 on desktop.
- [ ] CTAs labelled exactly "Get My Free Savings Plan" and "See My Savings".
- [ ] `UnifiedLeadForm` is no longer imported by `HeroSection.jsx`.
- [ ] Build passes, no console warnings.

## Do-not-touch
- Framer Motion variants, scroll indicator, background gradient layers, dark overlay — keep as-is.
- `UnifiedLeadForm.jsx` file (we'll deprecate it in a later prompt, not delete yet).
- `LeadFormDrawer`, `ModalContext`.
- `HeroSection.module.css` structural classes; only change spacing if needed for the new copy.

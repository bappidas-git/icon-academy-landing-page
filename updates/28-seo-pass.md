# 28 — SEO Pass (Meta, OpenGraph, JSON-LD)

## Context
Even though this is an ads-funded landing page, organic and paid share previews (WhatsApp, Facebook, LinkedIn) need rich OG tags, and Google's FAQ + LocalBusiness rich results improve CTR. A crisp title + description + social card + structured data takes the rebuild from tactical to professional.

## Files to modify
- `public/index.html` — primary meta, OG, Twitter, favicons
- `src/config/seo.js` — site-wide SEO config
- `src/components/common/SEO/SEOHead.jsx` — inject meta + structured data per route
- `public/sitemap.xml` — update URLs

## Files to create
- (none — reuse existing `SEOHead` + `seo.js`)

## Implementation

### 1. `src/config/seo.js`
Set these values (replace any existing defaults — keep the file's export shape):
```js
export const seoConfig = {
  siteName: 'Anvil Energy',
  siteUrl: 'https://phpstack-780646-6370629.cloudwaysapps.com',
  defaultTitle: 'Rooftop Solar in Assam, Nagaland & Bhubaneswar | Anvil Energy',
  defaultDescription: 'Cut your electricity bill by up to 90% with Anvil rooftop solar. PM Surya Ghar subsidy up to ₹78,000, zero-down-payment EMI from 7%, 25-year warranty. Free site visit across Assam, Nagaland & Bhubaneswar.',
  defaultKeywords: 'rooftop solar, solar panels Assam, solar panels Guwahati, solar Nagaland, solar Bhubaneswar, PM Surya Ghar, solar subsidy, home solar India, solar installation, solar EMI, solar calculator',
  defaultImage: 'https://placehold.co/1200x630?text=Anvil+Rooftop+Solar+For+Indian+Homes',
  twitterHandle: '@anvilenergy',
  locale: 'en_IN',
  themeColor: '#0A1F3D',
  contact: {
    phone: '+911800202001',
    email: 'hello@anvil.energy',
    whatsapp: '911800202001',
  },
};
```

### 2. `public/index.html` `<head>`
Set these:
```html
<title>Rooftop Solar in Assam, Nagaland & Bhubaneswar | Anvil Energy</title>
<meta name="description" content="Cut your electricity bill by up to 90% with Anvil rooftop solar. PM Surya Ghar subsidy up to ₹78,000, zero-down-payment EMI from 7%. Free site visit across Assam, Nagaland & Bhubaneswar." />
<meta name="theme-color" content="#0A1F3D" />
<meta name="keywords" content="rooftop solar Assam, solar Guwahati, solar Nagaland, solar Bhubaneswar, PM Surya Ghar, solar subsidy, solar EMI, home solar India" />

<!-- OpenGraph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://phpstack-780646-6370629.cloudwaysapps.com/" />
<meta property="og:title" content="Rooftop Solar for Indian Homes — Anvil Energy" />
<meta property="og:description" content="Save up to 90% on your power bill. ₹78,000 subsidy + EMI from 7%. Free site visit." />
<meta property="og:image" content="https://placehold.co/1200x630?text=Anvil+Rooftop+Solar+For+Indian+Homes" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="en_IN" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Rooftop Solar — save up to 90% on your bill" />
<meta name="twitter:description" content="Anvil handles subsidy, EMI, install. Free site visit across Assam, Nagaland & Bhubaneswar." />
<meta name="twitter:image" content="https://placehold.co/1200x630?text=Anvil+Rooftop+Solar+For+Indian+Homes" />
```
Do not duplicate the same tags if `SEOHead` already injects them at runtime — in that case leave the HTML static versions as bootstrapping defaults and let `SEOHead` override.

### 3. `src/components/common/SEO/SEOHead.jsx`
Inject these JSON-LD blocks for the home route only:

**Organization / LocalBusiness**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Anvil Energy",
  "url": "https://phpstack-780646-6370629.cloudwaysapps.com",
  "logo": "https://placehold.co/400x400?text=Anvil+Logo",
  "image": "https://placehold.co/1200x630?text=Anvil+Rooftop+Solar",
  "description": "Rooftop solar for homes across Assam, Nagaland, Bhubaneswar and PAN-India. PM Surya Ghar subsidy, EMI financing, 25-year warranty.",
  "telephone": "+911800202001",
  "email": "hello@anvil.energy",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressRegion": "Assam / Nagaland / Odisha / PAN-India"
  },
  "areaServed": ["Assam", "Nagaland", "Odisha", "India"],
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "200" }
}
```

**Service**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Rooftop Solar Installation",
  "provider": { "@type": "Organization", "name": "Anvil Energy" },
  "areaServed": ["Assam", "Nagaland", "Odisha", "India"],
  "offers": {
    "@type": "Offer",
    "description": "Residential rooftop solar with PM Surya Ghar subsidy up to ₹78,000 and 0% down EMI from 7% p.a."
  }
}
```

**FAQPage** — auto-generated from `src/data/faqData.js`:
```js
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map((f) => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }))
}
```

Render each JSON-LD via `<script type="application/ld+json">` tags.

### 4. `public/sitemap.xml`
Update entry to:
```xml
<url>
  <loc>https://phpstack-780646-6370629.cloudwaysapps.com/</loc>
  <lastmod>2026-04-24</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
</url>
<url>
  <loc>https://phpstack-780646-6370629.cloudwaysapps.com/thank-you</loc>
  <lastmod>2026-04-24</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.3</priority>
</url>
```

### 5. Canonical
In `SEOHead`, set `<link rel="canonical" href={`${siteUrl}${pathname}`} />` on every route.

### 6. `robots.txt`
Verify the existing `public/robots.txt` still points to the correct sitemap URL. Update if needed:
```
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://phpstack-780646-6370629.cloudwaysapps.com/sitemap.xml
```

## Acceptance criteria
- [ ] Sharing the URL on WhatsApp produces an OG card with the 1200×630 placeholder and the new title/description.
- [ ] Google Rich Results Test (mentally verify JSON — cannot run tool) shows three schema blocks: LocalBusiness, Service, FAQPage.
- [ ] Each FAQ from `faqData.js` is represented in FAQPage JSON-LD.
- [ ] `<link rel="canonical">` is present on `/` and `/thank-you`.
- [ ] `sitemap.xml` lists the two URLs with today's date.
- [ ] Meta description is ≤160 characters, title ≤60 characters (measure).

## Do-not-touch
- `SEO_GUIDE.md` (documentation).
- `CUSTOMIZATION_GUIDE.md`.
- Admin routes' SEO (admin should remain `noindex`).

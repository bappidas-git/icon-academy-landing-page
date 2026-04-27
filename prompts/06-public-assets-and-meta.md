# 06 — Public Assets, Meta Tags, Sitemap & Manifest

## Objective
Replace every Anvil-era public asset and HTML meta tag with Icon Commerce College equivalents. This includes `public/index.html` (title, meta, OG, Twitter, JSON-LD bootstrap, favicon links, GTM/Pixel snippets), `manifest.json` (PWA name/colors), `robots.txt`, `sitemap.xml`, and the static favicon set in `public/`.

## Scope
- `public/index.html`
- `public/manifest.json`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/favicon.ico`, `public/favicon.png`, `public/apple-touch-icon.png` — replace with TBD placeholders (1x1 transparent or simple solid-color squares); document the dimensions in a `public/ASSETS_TODO.md` file so the stakeholder can drop in real artwork
- Any reference inside `src/` to `/favicon.ico` paths or asset URLs that mention Anvil

## Out of Scope
- Server-side endpoints in `public/api/` (handled in prompt 30)
- Source-code SEO config in `src/config/seo.js` (handled in prompt 07 — schemas)
- Image assets inside `src/assets/` (none exist; do not create)

## Requirements

### `public/index.html`
Replace the current head content while keeping the GTM / Meta Pixel placeholder structure:

```html
<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="utf-8" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="theme-color" content="#1E3A8A" />

  <title>Icon Commerce College — Admissions 2026 | B.Com, BBA, BCA, BA in Guwahati</title>
  <meta name="description" content="Build your career at Icon Commerce College, Guwahati — established 2004, affiliated to Gauhati University. Admissions open for B.Com, BBA, BCA, B.A. (NEP 2020). Apply now via Samarth portal." />
  <meta name="keywords" content="Icon Commerce College, Guwahati college admission, B.Com Guwahati, BBA Guwahati, BCA Guwahati, BA Guwahati, Gauhati University affiliated, Assam admissions 2026, NEP 2020 college, Samarth portal" />
  <meta name="author" content="Icon Commerce College" />
  <meta name="robots" content="index, follow, max-image-preview:large" />

  <link rel="canonical" href="https://www.iconcommercecollege.in/" />
  <link rel="apple-touch-icon" href="%PUBLIC_URL%/apple-touch-icon.png" />
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_IN" />
  <meta property="og:site_name" content="Icon Commerce College" />
  <meta property="og:title" content="Icon Commerce College — Admissions 2026 | Guwahati" />
  <meta property="og:description" content="Affiliated to Gauhati University. NEP 2020 aligned. Apply for B.Com, BBA, BCA, B.A. — Samarth College Code 842." />
  <meta property="og:url" content="https://www.iconcommercecollege.in/" />
  <meta property="og:image" content="https://placehold.co/1200x630?text=Icon+Commerce+College+Admissions+2026" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Icon Commerce College campus and admissions banner" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Icon Commerce College — Admissions 2026" />
  <meta name="twitter:description" content="Apply for B.Com, BBA, BCA, B.A. at Icon Commerce College, Guwahati. Affiliated to Gauhati University." />
  <meta name="twitter:image" content="https://placehold.co/1200x630?text=Icon+Commerce+College" />

  <!-- Preconnect — Google Fonts (kept by prompt 05) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap" rel="stylesheet" />

  <!-- Google Tag Manager — placeholder; replace GTM-XXXXXXX after launch -->
  <script>
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
    j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl; f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-XXXXXXX');
  </script>
  <!-- End Google Tag Manager -->
</head>
<body>
  <noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" height="0" width="0" style="display:none;visibility:hidden"></iframe>
  </noscript>
  <noscript>You need to enable JavaScript to run this admissions portal.</noscript>
  <div id="root"></div>
  <div id="initial-loader" aria-hidden="true">
    <div class="loader-spinner"></div>
  </div>
</body>
</html>
```

Notes:
- Keep `%PUBLIC_URL%` substitution for CRA.
- Initial-loader HTML and inline CSS remain as-is from the current file — only the user-facing `<title>`, meta, OG, Twitter, and `<noscript>` text change. Leave the inline CSS for the spinner alone.
- If the current file has a `<script type="application/ld+json">` JSON-LD block in `<head>`, **delete it** — schemas will be injected at runtime by `SEOHead.jsx` (prompt 07).

### `public/manifest.json`
```json
{
  "short_name": "Icon Commerce",
  "name": "Icon Commerce College — Admissions",
  "description": "Admissions portal for Icon Commerce College, Guwahati. Affiliated to Gauhati University.",
  "icons": [
    { "src": "favicon.ico", "sizes": "64x64 32x32 24x24 16x16", "type": "image/x-icon" },
    { "src": "favicon.png", "sizes": "192x192", "type": "image/png" },
    { "src": "apple-touch-icon.png", "sizes": "180x180", "type": "image/png" }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#1E3A8A",
  "background_color": "#FFFBEB",
  "orientation": "portrait",
  "scope": "/",
  "lang": "en-IN",
  "categories": ["education", "college", "admissions"]
}
```

### `public/robots.txt`
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://www.iconcommercecollege.in/sitemap.xml
```

### `public/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.iconcommercecollege.in/</loc>
    <lastmod>2026-04-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.iconcommercecollege.in/thank-you</loc>
    <lastmod>2026-04-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

### Favicons & touch icons
- Replace `public/favicon.ico`, `public/favicon.png`, `public/apple-touch-icon.png` with simple solid-indigo (`#1E3A8A`) squares at the correct dimensions OR keep the file present but write a `public/ASSETS_TODO.md` listing exact pixel dimensions and where they're referenced (16/32/48/64 for `.ico`, 192 for `.png`, 180 for apple-touch-icon).
- Document in `ASSETS_TODO.md`:
  ```
  # Icon Commerce College — Asset Drop List
  Replace these placeholders with stakeholder-supplied artwork before launch.

  | File | Dimensions | Usage |
  |---|---|---|
  | public/favicon.ico | 16/32/48/64 multi-res | Browser tab icon |
  | public/favicon.png | 192x192 | PWA icon, Android |
  | public/apple-touch-icon.png | 180x180 | iOS home screen |
  | (logo svg in src/assets/) | scalable | Header / Footer logo |

  Brand colour: #1E3A8A (Royal Indigo)
  ```

## Out of Scope (DO NOT TOUCH)
- The initial loader inline CSS / spinner element
- Any `<link rel="preload">` for app JS bundles auto-managed by CRA
- Service worker (`registerServiceWorker` in `index.js`)

## Content / Copy
All canonical content listed above.

## Design Notes
- `theme-color: #1E3A8A` matches the indigo primary chosen in prompt 04 — drives Android URL-bar tinting and PWA splash.
- `background_color: #FFFBEB` cream — matches alternating-section surface; gentler PWA splash on Android.

## Placeholder Image Specs
- OG / Twitter image: `https://placehold.co/1200x630?text=Icon+Commerce+College+Admissions+2026`
- Favicons: replace with solid `#1E3A8A` squares of correct dimensions.

## Acceptance Criteria
- [ ] `public/index.html` `<title>` reads `Icon Commerce College — Admissions 2026 | B.Com, BBA, BCA, BA in Guwahati`
- [ ] No occurrence of `Anvil`, `solar`, `rooftop`, `kW`, or `Surya Ghar` in any `public/` file
- [ ] `theme-color` meta is `#1E3A8A`
- [ ] `manifest.json` validates (try `npx web-app-manifest-validator public/manifest.json` or open in Chrome DevTools → Application → Manifest)
- [ ] `sitemap.xml` validates against the standard sitemap schema (no XML errors)
- [ ] `robots.txt` disallows `/admin/` and `/api/`
- [ ] `public/ASSETS_TODO.md` exists with the asset drop-list table

## Dependencies
- 02-env-and-package-rebrand.md
- 04-color-palette-and-design-tokens.md
- 05-typography-system.md

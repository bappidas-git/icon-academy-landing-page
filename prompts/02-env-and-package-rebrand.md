# 02 — Branding Env Vars & package.json Metadata

## Objective
Replace every Anvil-specific environment variable, build identifier, and package descriptor with Icon Commerce College values. This makes the boilerplate's hardcoded brand strings (read at runtime by Header, Footer, SEO config, FloatingContacts, etc.) point to the correct college identity.

## Scope
- `.env`
- `.env.example`
- `package.json` (`name`, `description`, `keywords`, `author`, `homepage` only)
- Any reference to `process.env.REACT_APP_*` already wired into the app — no new vars required, only value updates

## Out of Scope
- Dependency list in `package.json`
- Build scripts
- Webhook URL / API endpoint paths (keep `/api/leads.php`, `/api/meta-capi.php` unchanged)
- Tracking pixel IDs (leave empty — to be filled by client during launch)

## Requirements
Update `.env` and `.env.example` with these values (replace existing Anvil values; preserve all keys already present):

```
# --- Application ---
REACT_APP_NAME="Icon Commerce College"
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=development
REACT_APP_PROJECT_NAME="Icon Commerce College – Admissions 2026"
REACT_APP_DEVELOPER_NAME="Icon Commerce College"
REACT_APP_PROJECT_LOCATION="Guwahati, Assam"

# --- Admin Credentials ---
REACT_APP_ADMIN_USERNAME="iconadmin"
REACT_APP_ADMIN_PASSWORD="icon@2026admissions"

# --- Contact ---
REACT_APP_SALES_PHONE="+91 0000000000"
REACT_APP_WHATSAPP_NUMBER="+910000000000"
REACT_APP_SALES_EMAIL="info@iconcommercecollege.in"
REACT_APP_SUPPORT_EMAIL="admissions@iconcommercecollege.in"

# --- Office Address ---
REACT_APP_OFFICE_ADDRESS="Icon Commerce College, Rajgarh Road, Chandmari, Guwahati - 781003, Assam"

# --- Social Media (placeholders — confirm with stakeholder) ---
REACT_APP_FACEBOOK_URL="https://www.facebook.com/iconcommercecollege"
REACT_APP_INSTAGRAM_URL="https://www.instagram.com/iconcommercecollege"
REACT_APP_YOUTUBE_URL="https://www.youtube.com/@iconcommercecollege"
REACT_APP_LINKEDIN_URL="https://www.linkedin.com/school/icon-commerce-college"

# --- Google Maps ---
REACT_APP_GOOGLE_MAPS_API_KEY=""
REACT_APP_PROJECT_LATITUDE="26.1884"
REACT_APP_PROJECT_LONGITUDE="91.7569"

# --- Analytics & Tracking (leave empty for client to fill) ---
REACT_APP_GTM_ID=""
REACT_APP_GA4_MEASUREMENT_ID=""
REACT_APP_GOOGLE_ADS_ID=""
REACT_APP_GOOGLE_ADS_CONVERSION_LABEL=""
REACT_APP_GOOGLE_ADS_CONVERSION_VALUE=""
REACT_APP_GOOGLE_ADS_ENHANCED_CONVERSIONS=false
REACT_APP_META_PIXEL_ID=""
REACT_APP_FB_PIXEL_ID=""
REACT_APP_META_CAPI_ENDPOINT="/api/meta-capi.php"
REACT_APP_META_TEST_EVENT_CODE=""
REACT_APP_ENABLE_CONSENT_MODE=false

# --- API ---
REACT_APP_API_BASE_URL=""
REACT_APP_LEAD_SUBMISSION_ENDPOINT="/api/lead-handler.php"
REACT_APP_LEADS_API_URL="/api/leads.php"
REACT_APP_LEADS_ADMIN_KEY="REPLACE_BEFORE_DEPLOY"

# --- Feature Flags ---
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_CHAT_WIDGET=false
REACT_APP_ENABLE_VIRTUAL_TOUR=false

# --- Performance ---
REACT_APP_IMAGE_CDN_URL=""
REACT_APP_LAZY_LOAD_OFFSET=100

# --- Webhooks (Pabbly) ---
REACT_APP_ADMIN_PABBLY_WEBHOOK_URL=""
```

Notes on values:
- Latitude/Longitude `26.1884, 91.7569` is the approximate centre of Chandmari, Guwahati — placeholder until stakeholder confirms exact campus coordinates.
- Phone, email, social URLs are best-effort placeholders flagged in `.env.example` with `# TODO: confirm with stakeholder`.
- Drop `REACT_APP_ENABLE_EMI_CALCULATOR` entirely (solar-only flag from old project).

Update `package.json`:
```json
{
  "name": "icon-commerce-college-landing",
  "version": "1.0.0",
  "description": "Conversion-optimized admissions landing page for Icon Commerce College, Guwahati",
  "keywords": ["icon-commerce-college", "guwahati", "admissions", "gauhati-university", "b-com", "bba", "bca", "ba", "landing-page", "react"],
  "author": "Icon Commerce College",
  "homepage": "."
}
```

## Out of Scope
- Do not edit `dependencies`, `devDependencies`, or `scripts` blocks.
- Do not alter `.gitattributes` or `.gitignore`.

## Content / Copy
All values listed above are the canonical content; do not invent additional copy.

## Design Notes
N/A — config only.

## Placeholder Image Specs
N/A.

## Acceptance Criteria
- [ ] `.env` and `.env.example` contain all keys above with the exact values listed
- [ ] No occurrence of `Anvil`, `anvil`, `solar`, `rooftop` remains in either env file
- [ ] `package.json` has the new `name`, `description`, `keywords`, `author`, `homepage`
- [ ] `dependencies` block in `package.json` is byte-identical to before
- [ ] `npm install` runs cleanly (no warnings about renamed package)
- [ ] `npm run build` succeeds
- [ ] At runtime, Header / Footer / FloatingContacts / StickyMobileCTA pull the new phone, email, address from env (sanity check by searching old hardcoded `+91 1800` strings — should be gone)

## Dependencies
- 01-project-cleanup-and-rebranding.md

# Pabbly Connect + Lead Management — Icon Commerce College

> **Who is this for?** The admissions team or developer setting up the **Icon Commerce College** admissions landing page (or any institution cloning this template). No code experience required — follow each step in order.

---

## 1. The Big Picture (in plain English)

When a prospective student fills the admission enquiry form, their details need to reach **three** places:

| Where | Why it matters | Who reads it |
|-------|----------------|--------------|
| 📮 **Pabbly Connect** | Forwards the enquiry to Google Sheets / Email / WhatsApp / your CRM | The admissions counselling team |
| 🗄️ **Your web server's `leads.json` file** | A shared filing cabinet every admin can read from | The Admin LMS |
| 💾 **Visitor's browser** | Prevents duplicate submissions from the same phone | The landing page itself |

```
Prospective student submits admission enquiry
        │
        ├──▶ Pabbly webhook      ──▶  Google Sheet / Email / Counselling CRM
        │
        ├──▶ Your server         ──▶  Admin LMS (all devices)
        │    (/api/leads.php)         (/admin/lms)
        │
        └──▶ Visitor's browser   ──▶  "Already enquired" check
```

All of this happens in **under 2 seconds** — the visitor just sees a "Thank You — our admissions counsellor will call you" page.

---

## 2. What You Need Before You Start

| Thing | Where to get it | Cost |
|-------|----------------|------|
| A Pabbly Connect account | https://www.pabbly.com/connect/ | Free tier available |
| A Google account (for Sheets) | https://accounts.google.com | Free |
| The Icon Commerce College landing page hosted on a PHP-capable server (Cloudways, cPanel, Hostinger, VPS) | — | Your existing hosting |
| Access to the `.env` file of your project | Your code editor / hosting file manager | — |

> **⚠️ Important:** The Lead Management system uses a small PHP file (`public/api/leads.php`) to store enquiries. Your hosting must support PHP (most shared hosting does — Netlify / Vercel static hosting do NOT). If you use Netlify/Vercel, host the PHP file on any cheap PHP host (Hostinger, cPanel) and point `REACT_APP_LEADS_API_URL` to that full URL.

---

## 3. Part A — Set Up the Main Pabbly Webhook (for Google Sheets / Email / CRM)

### Step 1: Create a Pabbly Workflow

1. Log in at https://www.pabbly.com/connect/
2. Click **"Create Workflow"**
3. Name it: `Icon Commerce College — Admission Enquiry`
4. For the **Trigger**, choose **Webhook**
5. Pabbly shows a webhook URL like:
   `https://connect.pabbly.com/webhook-listener/webhook/IjU3NjIwNTZ...`
6. Click **Copy URL** — you'll paste it in the next step.

### Step 2: Paste the URL into Your Code

Open the file **`src/utils/webhookSubmit.js`** and find these lines near the top:

```js
const WEBHOOK_URL = "PASTE_YOUR_PABBLY_URL_HERE";
const USE_PABBLY = true;   // must be true for production
const DUMMY_MODE = false;  // must be false for production
```

- Paste your Pabbly URL where it says `PASTE_YOUR_PABBLY_URL_HERE`.
- Save the file.

> **Tip:** While testing on your own computer, you can set `DUMMY_MODE = true` — then submissions are saved only in your browser and never sent anywhere. Useful when you're iterating on the form UI without sending fake leads to the counselling team.

### Step 3: Add a Google Sheets Action in Pabbly

1. In your Pabbly workflow, click the **+** under the webhook trigger.
2. Choose **Google Sheets** → Action: **Add Row**.
3. Click **Connect** and sign in with the Google account that owns the sheet (e.g., `admissions@iconcommerce.edu`).
4. Select your spreadsheet (e.g., `Icon Commerce College Admissions 2026`) and worksheet (e.g., `Enquiries`).
5. Map the columns (see table below).
6. Click **Save & Send Test Request**.

#### Column Mapping Template — Admission Enquiry

Create these headers in Row 1 of your sheet first:

| Column | Header              | Pabbly Field           | Notes |
|--------|---------------------|------------------------|-------|
| A      | Name                | `{{name}}`             | Applicant's full name |
| B      | Mobile              | `{{mobile}}`           | 10-digit Indian mobile |
| C      | Email               | `{{email}}`            | Optional |
| D      | Program of Interest | `{{service_interest}}` | `bcom` / `ba` / `bba` / `bca` |
| E      | Message             | `{{message}}`          | Enriched: stream / state / passing year / city |
| F      | Source              | `{{source}}`           | Which form was used (see §7) |
| G      | Lead ID             | `{{lead_id}}`          | Auto-generated |
| H      | Status              | `{{status}}`           | Always `new` at capture |
| I      | Submitted At        | `{{submitted_at}}`     | ISO timestamp |
| J      | Page URL            | `{{page_url}}`         | Full URL incl. UTMs |
| K      | UTM Source          | `{{utm_source}}`       | `google` / `facebook` / etc. |
| L      | UTM Medium          | `{{utm_medium}}`       | `cpc` / `paid` / `organic` |
| M      | UTM Campaign        | `{{utm_campaign}}`     | e.g. `bcom_admissions_2026` |
| N      | UTM Term            | `{{utm_term}}`         | Keyword |
| O      | UTM Content         | `{{utm_content}}`      | Ad creative variant |
| P      | GCLID               | `{{gclid}}`            | Google Ads click ID |
| Q      | User Agent          | `{{user_agent}}`       | Browser info |

### Step 4 (Optional): Add Email Notification

1. Add another action after Google Sheets.
2. Choose **Email by Pabbly** (free, built-in) or **Gmail**.
3. Subject: `New Admission Enquiry: {{name}} — {{service_interest}}`
4. Body:
   ```
   New admission enquiry from {{source}}

   Applicant Name: {{name}}
   Mobile: {{mobile}}
   Email: {{email}}
   Program of Interest: {{service_interest}}
   Background / Message: {{message}}

   Submitted: {{submitted_at}}
   Page: {{page_url}}
   UTM Source: {{utm_source}} | Campaign: {{utm_campaign}}

   — Counselling team to call within 24 hours.
   ```

### Step 5: Test It

1. Open the Icon Commerce College landing page (`https://landing.iconcommerce.edu/` or your local dev URL).
2. Fill the admission enquiry form with fake data — e.g., program `B.Com`, stream `Commerce`, state `Assam`, passing year `2026`.
3. Inside Pabbly, open your workflow → **History** tab. A new entry should appear within 30 seconds.
4. Open your Google Sheet — a new row should be there.

✅ **Main webhook done.** Admission enquiries are now reaching Google Sheets and the counselling team.

---

## 4. Part B — Set Up Lead Management (Admin Panel)

The Admin LMS at `https://landing.iconcommerce.edu/admin/lms` lets the admissions team see, search, filter, and manage every enquiry — from **any device**. For this to work across devices, leads need to be stored on your **server**, not just in one browser. Here's how to enable it.

### Step 1: Upload the PHP Files

When you build and deploy the site, the folder **`public/api/`** gets copied to your server. Make sure these files end up in your server's `api/` folder:

- `api/leads.php` ← the storage endpoint (already in the project)
- `api/config.example.php` ← the template you'll copy

### Step 2: Create `config.php` on Your Server

On your server (via cPanel File Manager, FTP, or SSH):

1. Navigate to the `api/` folder.
2. Copy **`config.example.php`** → rename the copy to **`config.php`**.
3. Open `config.php` in the editor and find this line near the bottom:
   ```php
   define('ADMIN_API_KEY', 'CHANGE_ME_TO_A_LONG_RANDOM_STRING');
   ```
4. Replace `CHANGE_ME_TO_A_LONG_RANDOM_STRING` with a **long random string** — e.g., generate one at https://www.random.org/strings/ and paste:
   ```php
   define('ADMIN_API_KEY', 'Zk8pQ3mX9yL2wN7bV5rT1jH6cD4fG0aE');
   ```
5. Save the file.

> **⚠️ Keep `config.php` private.** Never commit it to GitHub. It contains your secret key.

### Step 3: Put the Same Key in Your `.env` File

Open the `.env` file in your project and set:

```env
REACT_APP_LEADS_API_URL="/api/leads.php"
REACT_APP_LEADS_ADMIN_KEY="Zk8pQ3mX9yL2wN7bV5rT1jH6cD4fG0aE"
```

**The value of `REACT_APP_LEADS_ADMIN_KEY` must EXACTLY match `ADMIN_API_KEY` in `config.php`.** If they don't match, the admin panel will say "Unauthorized".

If your PHP endpoint lives on a different domain than your landing page (e.g., the SPA is on Vercel and the PHP host is on Hostinger), use the full URL:
```env
REACT_APP_LEADS_API_URL="https://api.iconcommerce.edu/api/leads.php"
```

### Step 4: Rebuild & Redeploy

```bash
npm run build
```

Upload the fresh `build/` folder to your server. The env values get baked into the JavaScript during build — that's why a rebuild is required after changing `.env`.

### Step 5: Make Sure the `data/` Folder Is Writable

The first time an enquiry is submitted, `leads.php` creates a folder at `api/data/` to store `leads.json`. Your PHP process needs write permission.

- On cPanel/shared hosting: usually works out of the box.
- On a VPS: run `chmod 755 public_html/api && chown www-data:www-data public_html/api`.
- If submissions fail silently, manually create `api/data/` and set permissions to `755`.

### Step 6: Test the Admin Panel

1. Open `https://landing.iconcommerce.edu/admin/login`
2. Log in with the credentials from `.env` (`REACT_APP_ADMIN_USERNAME` / `REACT_APP_ADMIN_PASSWORD`).
3. Submit a new test admission enquiry from the landing page on a **different browser or phone**.
4. Refresh the Admin LMS — the enquiry should appear in the lead table.
5. If it doesn't, see the Troubleshooting section at the end.

✅ **Lead Management is live.** Every admissions counsellor sees every enquiry, from every device.

---

## 5. Part C — The Admin Panel Pabbly Webhook (OPTIONAL — skip unless you need it)

> **Short answer: You do NOT need this for Lead Management to work.** The setup above (Part B) already handles everything across all admin devices via your server.

The Admin Panel Pabbly Webhook is only useful if you want admin actions — status changes, notes, deletions — to **also** land in a **second** Pabbly workflow (e.g., to update a separate Google Sheet for the principal, or notify the counselling team on Slack when an enquiry moves to "Converted / Admitted").

### When to set it up

Set `REACT_APP_ADMIN_PABBLY_WEBHOOK_URL` only if you answer **YES** to any of these:

- "I want my Google Sheet to update the status column when a counsellor marks a lead as Contacted / Counselled / Admitted / Lost."
- "I want a Slack/Email ping when any admin adds a note to an enquiry."
- "I want a full audit log of admin actions inside Pabbly for the principal's review."

### When to skip it

Skip it (leave the value blank, or remove the line) if:

- You manage enquiry statuses only inside the Admin LMS itself.
- You don't need external tools to know about admin-side changes.

### Setup (if you need it)

1. Create a **second** Pabbly workflow with a Webhook trigger.
2. Copy its URL.
3. In `.env`:
   ```env
   REACT_APP_ADMIN_PABBLY_WEBHOOK_URL="https://connect.pabbly.com/webhook-listener/webhook/YOUR_SECOND_WORKFLOW_URL"
   ```
4. Rebuild and redeploy.

### Payload Examples

```json
// status_update
{ "action": "status_update", "lead_id": "...", "new_status": "admitted", "old_status": "counselled", "timestamp": "..." }

// note_added
{ "action": "note_added", "lead_id": "...", "note_text": "Called — interested in B.Com Hons. Will visit campus Saturday.", "timestamp": "..." }

// lead_deleted
{ "action": "lead_deleted", "lead_id": "...", "timestamp": "..." }
```

Use Pabbly **Router/Filter** steps to branch each `action` to the right destination.

---

## 6. Environment Variables Cheat Sheet

Put these in your project's `.env` file:

| Variable | Required? | What it does |
|----------|-----------|--------------|
| *(none — set `WEBHOOK_URL` directly in `webhookSubmit.js`)* | **Yes** | The main Pabbly webhook for admission enquiry capture |
| `REACT_APP_LEADS_API_URL` | **Yes** (for Admin Panel) | Path to your `leads.php` endpoint. Default: `/api/leads.php` |
| `REACT_APP_LEADS_ADMIN_KEY` | **Yes** (for Admin Panel) | Secret that must match `ADMIN_API_KEY` in `config.php` |
| `REACT_APP_ADMIN_PABBLY_WEBHOOK_URL` | **No (Optional)** | Second Pabbly webhook for admin-side actions only |
| `REACT_APP_ADMIN_USERNAME` | **Yes** | Admin login username |
| `REACT_APP_ADMIN_PASSWORD` | **Yes** | Admin login password |

On your server, inside `public/api/config.php`:

| Constant | Required? | What it does |
|----------|-----------|--------------|
| `ADMIN_API_KEY` | **Yes** (for Admin Panel) | Secret that must match `REACT_APP_LEADS_ADMIN_KEY` |

---

## 7. Fields Sent to the Webhook

Every admission enquiry submission sends these fields:

| Field | Example | Description |
|-------|---------|-------------|
| `name` | `Rahul Sharma` | Applicant's full name |
| `mobile` | `9876543210` | 10-digit mobile |
| `email` | `rahul@example.com` | Email (optional) |
| `service_interest` | `bcom` | Selected program (`bcom` / `ba` / `bba` / `bca`) |
| `message` | `Stream: Commerce / State: Assam / Year: 2026 / City: Guwahati` | Enriched: stream + state + passing year + city + free-text |
| `source` | `hero-form` | Which form was used (see below) |
| `lead_id` | `a1b2-c3d4-...` | Auto-generated unique ID |
| `status` | `new` | Always "new" at capture |
| `submitted_at` | `2026-04-27T10:30:00.000Z` | Submission timestamp |
| `page_url` | `https://landing.iconcommerce.edu/?utm_source=google&utm_campaign=bcom_admissions_2026` | Full page URL |
| `user_agent` | `Mozilla/5.0 ...` | Browser info |
| `utm_source` / `utm_medium` / `utm_campaign` / `utm_term` / `utm_content` | `google` / `cpc` / `bcom_admissions_2026` / ... | Ad tracking parameters |
| `gclid` | `EAIaIQobChMI...` | Google Ads click ID |

### Form Source Values

| Source | Where it came from |
|--------|-------------------|
| `hero-form` | Main 3-step admission form at the top of the page |
| `contact-form` | Form in the Contact / "Talk to Counsellor" section |
| `drawer-form-apply-now` | Sliding drawer — "Apply Now" |
| `drawer-form-request-callback` | Sliding drawer — "Request Callback" |
| `drawer-form-get-details` | Sliding drawer — "Get Program Details" |
| `drawer-form-download-brochure` | Sliding drawer — "Download Prospectus" |
| `unified-lead-form` | Default (fallback) |

---

## 8. Troubleshooting

| Problem | Fix |
|---------|-----|
| Form submits but Pabbly shows nothing | In `webhookSubmit.js`: confirm `USE_PABBLY = true`, `DUMMY_MODE = false`, and the `WEBHOOK_URL` is correct. Rebuild + redeploy after changes. |
| Admin Panel is empty even though Pabbly receives enquiries | (1) Verify `config.php` exists in `api/` with `ADMIN_API_KEY`. (2) Verify `REACT_APP_LEADS_ADMIN_KEY` in `.env` **exactly** matches `ADMIN_API_KEY`. (3) Verify `api/data/` folder is writable by the PHP process. (4) Open browser DevTools → Network tab → look for `/api/leads.php?action=list` and check its status code. |
| Admin Panel says "Unauthorized" | The two keys don't match. Copy `ADMIN_API_KEY` from `config.php`, paste into `.env` as `REACT_APP_LEADS_ADMIN_KEY`, run `npm run build`, redeploy. |
| 404 or 400 from Pabbly webhook | Regenerate the URL in Pabbly — the old one may have expired or been deleted. |
| Enquiries missing UTM fields | UTMs must be in the landing page URL (e.g. `?utm_source=google&utm_medium=cpc&utm_campaign=bcom_admissions_2026`). |
| GCLID not captured | Check that Google Ads auto-tagging is enabled in your Google Ads account. |
| CORS error in console | Pabbly webhooks accept cross-origin POST; double-check the URL. For the leads API — make sure it's on the same domain or that CORS headers are set (already handled by `leads.php`). |
| Duplicate enquiries appearing | `isDuplicateLead()` checks by mobile number — clear browser localStorage to reset. |
| "leads.json permission denied" in server logs | `chmod 755 api/` and make sure PHP user can write. On cPanel, use File Manager → right-click `api/` → Change Permissions → set to `755`. |

---

## 9. Testing Modes Reference

| Mode | `USE_PABBLY` | `DUMMY_MODE` | Behavior |
|------|--------------|--------------|----------|
| Local testing | `false` | `true` | Enquiries saved only in your browser. No network requests. Great for iterating on form UI. |
| Production | `true` | `false` | Enquiries sent to Pabbly + stored on server. Admin LMS shows all enquiries. |

To inspect test enquiries in the browser, open DevTools → Console and run:
```js
JSON.parse(localStorage.getItem("lp_test_leads"))   // dummy mode enquiries
JSON.parse(localStorage.getItem("lp_submitted_leads")) // real enquiries captured on this device
```

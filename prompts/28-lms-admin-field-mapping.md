# 28 — LMS / Admin Panel Field Mapping & Schema Verification

## Objective
Make sure the renamed lead fields (`program`, `hs_stream`, `state`, `passing_year`, `city_or_town`) flow correctly into the existing Admin Panel — visible as columns in the lead list, queryable via filters, exportable in CSV, and stored alongside the legacy schema fields without data loss. The admin schema and CRUD logic must keep working for any pre-existing leads (DUMMY_MODE leads in localStorage) without migration scripts.

## Scope
- `src/admin/utils/leadService.js` — read schema, list/filter logic, CSV export columns
- `src/admin/pages/Dashboard.jsx` — KPI tile labels (replace solar wording)
- `src/admin/pages/LeadManagement.jsx` — table columns, filters
- `src/admin/pages/LeadDetail.jsx` — detail view layout
- `src/admin/utils/googleAdsExport.js` — CSV column ordering for offline conversions

## Out of Scope (DO NOT TOUCH)
- Auth flow (`adminAuth.js`, `AdminAuthContext.jsx`)
- localStorage storage keys (`lp_submitted_leads`, `lp_test_leads`) — schema additive only
- Pabbly admin webhook URL handling (env-driven)
- Server endpoint paths (`/api/leads.php`)

## Requirements

### Admin lead schema (additive — no removed fields)
The admin lead object now contains:
```js
{
  // Legacy schema fields — unchanged
  lead_id: 'uuid',
  name: '',
  mobile: '',
  email: '',
  service_interest: '',  // = program (for backward-compat with reports)
  source: '',
  status: 'new',
  submitted_at: 'ISO',
  page_url: '',
  user_agent: '',
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_term: '',
  utm_content: '',
  gclid: '',
  notes: [],
  activity: [],

  // New admissions-specific fields (added via prompt 25 webhook payload)
  program: '',           // 'B.Com.' | 'BBA' | 'BCA' | 'B.A.' | 'Not sure yet'
  hs_stream: '',         // 'Science' | 'Commerce' | 'Arts' | 'Vocational'
  state: '',             // NE state name
  passing_year: '',      // '2026' | '2025' | 'Earlier'
  city_or_town: '',
  message: '',           // enriched human-readable summary

  // Internal
  _isTest: false,
}
```

### `leadService.js` updates
- `getLeads(filters)` — extend `filters` object with optional `program`, `hsStream`, `state`, `passingYear` keys; apply each as an `===` filter when present
- The legacy `service` filter (if any) is aliased to filter on `program OR service_interest` for backward compatibility
- `getLeadStats()` — new derived KPIs: `topProgram`, `topState`, `programDistribution: { 'B.Com.': N, 'BBA': N, 'BCA': N, 'B.A.': N }`
- `exportLeadsCSV(leads)` — replace column header set with:
  ```
  Lead ID, Submitted At, Status, Source, Programme, HS Stream, State, Passing Year, City / Town, Name, Mobile, Email, Message, Page URL, UTM Source, UTM Medium, UTM Campaign, UTM Term, UTM Content, GCLID, Notes
  ```
- `importLeadsCSV(csvText)` — accept either the legacy column set (Service Interest column) or the new column set (Programme column); if Programme is present, populate `program` field; if only Service Interest is present, populate `service_interest`

### `Dashboard.jsx` updates
- KPI tiles change copy:
  - `Total Leads` (unchanged)
  - `New (last 24h)` (unchanged)
  - `This Week` (unchanged)
  - `Conversion Rate` (unchanged — uses `status === 'converted'`)
  - **Replace** `Top Source` with two tiles: `Top Programme` (= `topProgram`) and `Top Source Channel` (= `topSource`)
- Recent leads table on Dashboard: add `Programme` column (truncate to programme code on small screens)

### `LeadManagement.jsx` updates
- Table columns (in this order):
  - Submitted At, Name, Mobile, Programme, HS Stream, State, City / Town, Source, Status, Actions
- Filter sidebar / dropdown extensions:
  - **Programme** filter (Select: all / B.Com. / BBA / BCA / B.A. / Not sure yet)
  - **HS Stream** filter (Select)
  - **State** filter (Select with NE state list)
  - **Passing Year** filter (Select)
- Persist filter state in URL search params (existing pattern — verify; if not present, use `useState` only)
- Empty state copy: replace any solar-flavoured "No quote requests yet" with `No admission enquiries yet — they will appear here as soon as students submit the form.`

### `LeadDetail.jsx` updates
- Detail view shows two info cards side-by-side:
  - **Card 1 — Contact:** Name, Mobile (with click-to-call), Email (mailto), City / Town
  - **Card 2 — Application context:** Programme, HS Stream, State, Passing Year, Source, GCLID
- Below: the enriched `message` field rendered as a readable summary
- Notes & Activity log unchanged

### `googleAdsExport.js`
- The offline-conversion CSV expected by Google Ads (Phone Conversions) typically needs columns: `Caller ID, Call start time, Conversion name, Conversion time, Conversion value, Conversion currency`. Verify the existing export — only the `Conversion name` value should change from "Solar Lead" / "Anvil Conversion" to **`ICC Admission Lead`**. Do not change the column structure that Google Ads expects.

### `getLeadStats()` derivation (snippet)
```js
const programDistribution = leads.reduce((acc, l) => {
  const p = l.program || l.service_interest || 'Unknown';
  acc[p] = (acc[p] || 0) + 1;
  return acc;
}, {});
const topProgram = Object.entries(programDistribution).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A';
const topState = (() => {
  const dist = leads.reduce((acc, l) => {
    if (l.state) acc[l.state] = (acc[l.state] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(dist).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A';
})();
return { ...existing, topProgram, topState, programDistribution };
```

### Backward compatibility
- Pre-existing leads in localStorage that don't have the new fields must still render in the admin without crashing — every column should fall back to `—` for missing fields; filters that select a missing field should not throw
- A migration utility is **not** required — fields appear lazily

## Out of Scope
- New auth roles
- Admin UI redesign (visual treatment unchanged — only data and column changes)
- Reporting dashboards beyond the existing Dashboard page

## Content / Copy
- Empty-state copy: `No admission enquiries yet — they will appear here as soon as students submit the form.`
- Conversion name in Google Ads CSV: `ICC Admission Lead`

## Design Notes
- Programme cells in the table render as small chips (cream bg, indigo text); HS Stream as outline chips
- State cells: indigo `mdi:map-marker` + state name
- Passing Year cells: tabular-nums for alignment

## Placeholder Image Specs
- N/A.

## Acceptance Criteria
- [ ] Submitting a lead from the home page (any drawer source) results in an admin lead with all new fields populated correctly (`program`, `hs_stream`, `state`, `passing_year`, `city_or_town`)
- [ ] LeadManagement table shows the new columns in the specified order
- [ ] Programme / HS Stream / State / Passing Year filters work correctly (filter to specific values)
- [ ] Dashboard shows `Top Programme` and `Top Source Channel` tiles
- [ ] CSV export contains the new column set; opening in Excel preserves the header order
- [ ] CSV import accepts both legacy and new column sets
- [ ] Lead detail view shows the two info cards (Contact + Application context) plus enriched message
- [ ] Pre-existing leads (without the new fields) render without crashing — missing values show `—`
- [ ] Google Ads offline-conversion CSV has `Conversion name = ICC Admission Lead`
- [ ] No Anvil / solar / kW strings remain in `src/admin/`
- [ ] No regressions: Notes can still be added, status can still be updated, leads can still be deleted

## Dependencies
- 25-lead-form-data-model-and-modal-context.md
- 03-readme-and-documentation.md (admin guideline pages already rebranded)

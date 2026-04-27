import React from 'react';

const GoogleAdsGuide = ({ styles }) => {
  return (
    <div>
      {/* Section 1: What is Google Ads? */}
      <h2 className={styles.guideTitle}>What is Google Ads?</h2>
      <div className={styles.guideSection}>
        <p className={styles.guideParagraph}>
          Google Ads is Google's online advertising platform that lets you show ads to prospective
          students who are actively searching for an admission. When someone searches "B.Com
          admissions Guwahati" or "BBA college Assam", your Icon Commerce College ad appears at the
          top of the results. You only pay when someone clicks the ad and lands on the admissions
          page.
        </p>
        <p className={styles.guideParagraph}>
          There are several types of Google Ads campaigns (Search, Display, Video, Shopping, etc.),
          but Search campaigns are the most relevant for admission lead generation. With Search
          campaigns, your ads appear when prospective students type specific keywords — meaning
          they already have admission intent and are actively shortlisting colleges.
        </p>
      </div>

      {/* Section 2: Create Your Google Ads Account */}
      <h2 className={styles.guideTitle}>Create Your Google Ads Account</h2>
      <div className={styles.guideSection}>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>
            Go to <code className={styles.guideInlineCode}>https://ads.google.com</code>
          </li>
          <li className={styles.guideStepItem}>
            Click "Start Now" and sign in with your Google account
          </li>
          <li className={styles.guideStepItem}>
            Google will try to guide you through a "Smart Campaign" — skip this by clicking
            "Switch to Expert Mode" at the bottom
          </li>
          <li className={styles.guideStepItem}>
            Select "Create an account without a campaign" (bottom-left link)
          </li>
          <li className={styles.guideStepItem}>
            Set your billing country (India), time zone, and currency (INR). Click Submit.
          </li>
        </ol>
        <div className={styles.guideNote}>
          <strong>Note:</strong> Always choose Expert Mode. Smart Campaigns give you very little
          control over targeting and budget.
        </div>
      </div>

      {/* Section 3: Create a Search Campaign */}
      <h2 className={styles.guideTitle}>Create a Search Campaign</h2>
      <div className={styles.guideSection}>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>
            In your Google Ads dashboard, click "+ New Campaign"
          </li>
          <li className={styles.guideStepItem}>Select goal: "Leads"</li>
          <li className={styles.guideStepItem}>Select campaign type: "Search"</li>
          <li className={styles.guideStepItem}>
            Campaign name: something descriptive like{' '}
            <code className={styles.guideInlineCode}>Icon Commerce College — B.Com Admissions 2026 — Guwahati</code>
          </li>
          <li className={styles.guideStepItem}>
            Networks: Uncheck "Display Network" and "Search Partners" (focus budget on Google
            Search only)
          </li>
          <li className={styles.guideStepItem}>
            Locations: Set to your target city or region. Use "Presence: People in or regularly in
            your targeted locations"
          </li>
          <li className={styles.guideStepItem}>Language: English (or your target language)</li>
          <li className={styles.guideStepItem}>
            Budget: Start with ₹500-1000/day for testing. You can always increase later.
          </li>
        </ol>
        <div className={styles.guideTip}>
          <strong>Tip:</strong> Don't set your budget too low (below ₹300/day). Google needs enough
          budget to show your ads and collect data for optimization.
        </div>
      </div>

      {/* Section 4: Keywords & Ad Groups */}
      <h2 className={styles.guideTitle}>Keywords & Ad Groups</h2>
      <div className={styles.guideSection}>
        <p className={styles.guideParagraph}>
          Keywords are the words and phrases that trigger your ad to show up. When someone types a
          keyword into Google that matches one of your keywords, your ad is eligible to appear. Choosing
          the right keywords is one of the most important parts of running Google Ads.
        </p>

        <h3 className={styles.guideSubtitle}>How to Research Keywords</h3>
        <p className={styles.guideParagraph}>
          Use Google Keyword Planner (free with your Google Ads account) to find relevant keywords.
          To access it: go to your Google Ads dashboard → click "Tools" in the top menu → select
          "Keyword Planner" under Planning. Enter a few words related to admissions ("B.Com Guwahati",
          "BBA college Assam", "Gauhati University admissions") and it will suggest keywords along
          with their monthly search volume and competition level.
        </p>

        <h3 className={styles.guideSubtitle}>Example Keywords</h3>
        <p className={styles.guideParagraph}>
          For Icon Commerce College, group your keywords by program and intent. A starter list:
        </p>
        <pre className={styles.guideCode}>
{`# Program + city
"b.com admissions guwahati"
"bba college guwahati"
"bca admission assam"
"b.a. honours college guwahati"

# Affiliation
"gauhati university affiliated commerce college"
"nep 2020 college guwahati"

# Brand
"icon commerce college"
"icon commerce college admissions 2026"

# Long-tail intent
"best b.com college in chandmari guwahati"
"commerce college near rajgarh road"
"admission process gauhati university 2026"`}
        </pre>

        <h3 className={styles.guideSubtitle}>Match Types</h3>
        <p className={styles.guideParagraph}>
          Google Ads has three keyword match types that control how closely a user's search query
          must match your keyword:
        </p>
        <table className={styles.guideTable}>
          <thead className={styles.guideTableHead}>
            <tr>
              <th>Match Type</th>
              <th>Syntax</th>
              <th>Example</th>
              <th>What It Matches</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.guideTableCell}>Broad Match</td>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>bcom college guwahati</code></td>
              <td className={styles.guideTableCell}>bcom college guwahati</td>
              <td className={styles.guideTableCell}>Related searches, synonyms, misspellings — widest reach but least control</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>Phrase Match</td>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>"bcom college guwahati"</code></td>
              <td className={styles.guideTableCell}>"bcom college guwahati"</td>
              <td className={styles.guideTableCell}>Searches that include the meaning of your keyword — good balance</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>Exact Match</td>
              <td className={styles.guideTableCell}><code className={styles.guideInlineCode}>[bcom college guwahati]</code></td>
              <td className={styles.guideTableCell}>[bcom college guwahati]</td>
              <td className={styles.guideTableCell}>Searches that match the exact meaning — most control but lowest reach</td>
            </tr>
          </tbody>
        </table>
        <div className={styles.guideTip}>
          <strong>Recommendation:</strong> Start with Phrase Match for the best balance between reach
          and relevance. Once you have data, add Exact Match for your best-performing keywords.
        </div>

        <h3 className={styles.guideSubtitle}>Negative Keywords</h3>
        <p className={styles.guideParagraph}>
          Negative keywords prevent your ad from showing for irrelevant searches. For an
          admissions-focused campaign, you don't want clicks from job seekers, MBA aspirants
          (different program), or distance-learning queries. Common negative keywords to add:
        </p>
        <pre className={styles.guideCode}>
{`jobs
vacancy
recruitment
salary
faculty job
teacher job
distance learning
correspondence
mba
post graduate
result 2024
question paper
syllabus pdf
notes free
wikipedia
youtube`}
        </pre>
      </div>

      {/* Section 5: Writing Effective Ads */}
      <h2 className={styles.guideTitle}>Writing Effective Ads</h2>
      <div className={styles.guideSection}>
        <p className={styles.guideParagraph}>
          Google Ads uses Responsive Search Ads (RSA). You provide multiple headlines and descriptions,
          and Google automatically tests different combinations to find what works best. You can add up
          to 15 headlines (30 characters each) and up to 4 descriptions (90 characters each).
        </p>

        <h3 className={styles.guideSubtitle}>Example Headlines (≤ 30 chars)</h3>
        <pre className={styles.guideCode}>
{`Admissions Open 2026 — Guwahati
B.Com / BBA / BCA / B.A. — Apply
Gauhati University Affiliated
NEP 2020 — Industry-Aligned
Icon Commerce College, Chandmari
Talk to Counsellor — Free Call
Scholarships for Toppers
Samarth Portal Code 842
Established 2004 — 20+ Years
Apply Online — Get Prospectus`}
        </pre>

        <h3 className={styles.guideSubtitle}>Example Descriptions (≤ 90 chars)</h3>
        <pre className={styles.guideCode}>
{`Where Knowledge Meets Character. Admissions open for B.Com, BBA, BCA, B.A. — Apply now.
Gauhati University affiliated. NEP 2020 aligned 3/4-year programs in Chandmari, Guwahati.
Talk to a counsellor today. Limited seats. Scholarships for merit & need-based applicants.
Apply through Samarth Portal (Code 842). Industry-aligned curriculum. Trusted since 2004.`}
        </pre>

        <h3 className={styles.guideSubtitle}>Tips for Better Ads</h3>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>Lead with your unique selling points — Gauhati University affiliation, 20+ years legacy, NEP 2020 alignment</li>
          <li className={styles.guideStepItem}>Use specific numbers ("Established 2004", "Samarth Code 842", "Top 100 commerce colleges")</li>
          <li className={styles.guideStepItem}>Include a clear call-to-action ("Apply Now", "Talk to Counsellor", "Download Prospectus")</li>
          <li className={styles.guideStepItem}>Include your target keyword in at least 2–3 headlines (e.g., "B.Com Admissions Guwahati")</li>
          <li className={styles.guideStepItem}>Write at least 10 headlines and 4 descriptions for best results</li>
        </ol>

        <h3 className={styles.guideSubtitle}>Ad Extensions</h3>
        <p className={styles.guideParagraph}>
          Ad extensions add extra information below your ad and improve click-through rates:
        </p>
        <table className={styles.guideTable}>
          <thead className={styles.guideTableHead}>
            <tr>
              <th>Extension</th>
              <th>What It Does</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.guideTableCell}>Sitelinks</td>
              <td className={styles.guideTableCell}>Additional links below your ad (e.g., "Programs", "Fee Structure", "Scholarships", "Talk to Counsellor")</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>Callouts</td>
              <td className={styles.guideTableCell}>Short highlight phrases (e.g., "Free Counselling", "GU Affiliated", "NEP 2020 Aligned", "Scholarships Available")</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>Structured Snippets</td>
              <td className={styles.guideTableCell}>List of programs under a category header (e.g., "Courses: B.Com, BBA, BCA, B.A.")</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 6: Set Up Conversion Tracking */}
      <h2 className={styles.guideTitle}>Set Up Conversion Tracking</h2>
      <div className={styles.guideSection}>
        <p className={styles.guideParagraph}>
          Conversion tracking tells Google Ads when a prospective student submits an admission
          enquiry after clicking your ad. This is essential for measuring ROI and letting Google
          optimize your campaigns toward the keywords / creatives that produce real admission
          enquiries.
        </p>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>
            In Google Ads, go to "Goals" → "Conversions" → "Summary"
          </li>
          <li className={styles.guideStepItem}>Click "+ New conversion action"</li>
          <li className={styles.guideStepItem}>Select "Website"</li>
          <li className={styles.guideStepItem}>Category: "Submit lead form"</li>
          <li className={styles.guideStepItem}>
            Conversion name: <code className={styles.guideInlineCode}>Icon Commerce College — Admission Enquiry</code>
          </li>
          <li className={styles.guideStepItem}>
            Value: Set a fixed value of <strong>₹500</strong> (typical admission enquiry value at
            the form-fill stage in the Indian undergraduate market — confirm with stakeholders
            before going live). If you have historical data — e.g., 1 in 20 enquiries enrols at
            ₹25,000 first-year fees — use <code className={styles.guideInlineCode}>25000 / 20 = 1250</code>.
          </li>
          <li className={styles.guideStepItem}>Count: "One" (count one conversion per click)</li>
          <li className={styles.guideStepItem}>Click-through window: 30 days</li>
          <li className={styles.guideStepItem}>Click "Create and Continue"</li>
          <li className={styles.guideStepItem}>
            You'll see a Conversion ID (format:{' '}
            <code className={styles.guideInlineCode}>AW-XXXXXXXXXX</code>) and Conversion Label —
            copy both
          </li>
        </ol>

        <h3 className={styles.guideSubtitle}>Where to Put These Values</h3>
        <p className={styles.guideParagraph}>
          Open the <code className={styles.guideInlineCode}>.env</code> file in your project root and set
          the following values:
        </p>
        <pre className={styles.guideCode}>
{`REACT_APP_GOOGLE_ADS_ID=AW-XXXXXXXXXX
REACT_APP_GOOGLE_ADS_CONVERSION_LABEL=YourLabel
REACT_APP_ENABLE_ANALYTICS=true`}
        </pre>
        <div className={styles.guideNote}>
          <strong>Note:</strong> The landing page code already has built-in conversion tracking. Once
          you set these values in <code className={styles.guideInlineCode}>.env</code>, an admission
          enquiry conversion will be tracked automatically every time the form is submitted.
        </div>
      </div>

      {/* Section 7: Enhanced Conversions (Optional) */}
      <h2 className={styles.guideTitle}>Enhanced Conversions (Optional)</h2>
      <div className={styles.guideSection}>
        <p className={styles.guideParagraph}>
          Enhanced Conversions sends hashed (encrypted) user data to Google for better conversion
          matching. This is especially useful when cookies are blocked by browsers, as it helps Google
          accurately attribute conversions even without cookie data.
        </p>
        <p className={styles.guideParagraph}>
          To enable Enhanced Conversions, set the following in your{' '}
          <code className={styles.guideInlineCode}>.env</code> file:
        </p>
        <pre className={styles.guideCode}>
{`REACT_APP_GOOGLE_ADS_ENHANCED_CONVERSIONS=true`}
        </pre>
        <p className={styles.guideParagraph}>
          When a user submits a form, their data (email, phone number) is SHA-256 hashed before being
          sent to Google. Google never sees the plain text — only the encrypted hash. This ensures
          user privacy while still allowing Google to match conversions accurately.
        </p>
      </div>

      {/* Section 8: Offline Conversion Import */}
      <h2 className={styles.guideTitle}>Offline Conversion Import</h2>
      <div className={styles.guideSection}>
        <p className={styles.guideParagraph}>
          When an admission enquiry actually becomes an enrolled student (i.e., the applicant pays
          the fees and joins a program), you can tell Google Ads about it. This is called "offline
          conversion import" — it lets Smart Bidding optimise toward the keywords / creatives that
          produce real enrolments, not just form fills.
        </p>

        <h3 className={styles.guideSubtitle}>How It Works</h3>
        <p className={styles.guideParagraph}>
          A GCLID (Google Click ID) is automatically captured when a prospective student clicks
          your ad. This unique ID links each enquiry back to the specific ad click that generated
          it. When a counsellor marks an enquiry as "Admitted" in the LMS, the GCLID is included in
          the export file.
        </p>

        <h3 className={styles.guideSubtitle}>Steps to Export</h3>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>
            Go to Admin Panel → Lead Management
          </li>
          <li className={styles.guideStepItem}>Mark the enquiry as "Admitted" (i.e., the applicant has paid first-year fees)</li>
          <li className={styles.guideStepItem}>Click "Export for Google Ads" to download the CSV file (Conversion Value = first-year fees paid)</li>
        </ol>

        <h3 className={styles.guideSubtitle}>Steps to Upload</h3>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>Go to Google Ads → Tools → Conversions → Uploads</li>
          <li className={styles.guideStepItem}>Upload the CSV file</li>
        </ol>
        <div className={styles.guideNote}>
          <strong>Note:</strong> Only enquiries that have a GCLID (i.e., came from a Google Ads
          click) can be uploaded. Enquiries from organic traffic or other sources won't have a
          GCLID.
        </div>
      </div>

      {/* Section 9: Verifying Conversions Work */}
      <h2 className={styles.guideTitle}>Verifying Conversions Work</h2>
      <div className={styles.guideSection}>
        <p className={styles.guideParagraph}>
          Follow this checklist to verify that conversion tracking is working correctly:
        </p>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>
            Enable Google Ads in <code className={styles.guideInlineCode}>.env</code> (set ID and Label)
          </li>
          <li className={styles.guideStepItem}>Deploy or run locally</li>
          <li className={styles.guideStepItem}>
            Click your ad (or add{' '}
            <code className={styles.guideInlineCode}>?gclid=test123</code> to the URL for testing)
          </li>
          <li className={styles.guideStepItem}>Fill and submit the admission enquiry form</li>
          <li className={styles.guideStepItem}>
            Check Google Ads → Conversions → should show "Recording" status within 24 hours
          </li>
          <li className={styles.guideStepItem}>
            Check browser console → look for{' '}
            <code className={styles.guideInlineCode}>gtag</code> conversion event
          </li>
          <li className={styles.guideStepItem}>
            Check localStorage:{' '}
            <code className={styles.guideInlineCode}>localStorage.getItem('gads_gclid')</code> should
            show your test gclid
          </li>
        </ol>
      </div>

      {/* Section 10: Tips for Better Performance */}
      <h2 className={styles.guideTitle}>Tips for Better Performance</h2>
      <div className={styles.guideSection}>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>
            Start with a small budget (₹500-1000/day) and increase after 2 weeks of data
          </li>
          <li className={styles.guideStepItem}>
            Use phrase match keywords initially, then add exact match for best performers
          </li>
          <li className={styles.guideStepItem}>
            Write at least 10 headlines and 4 descriptions for RSA ads
          </li>
          <li className={styles.guideStepItem}>
            Check search terms report weekly — add irrelevant terms as negative keywords
          </li>
          <li className={styles.guideStepItem}>
            Set up ad scheduling to peak during 4pm–10pm (when prospective students and parents are
            actively researching colleges) and dial back overnight
          </li>
          <li className={styles.guideStepItem}>
            Use location targeting to focus on Assam + Meghalaya + Arunachal Pradesh + Nagaland
            (the campus's natural catchment); exclude regions where you don't have hostel/transport
            support
          </li>
          <li className={styles.guideStepItem}>
            Don't change too many things at once — make one change, wait a week, evaluate
          </li>
        </ol>
      </div>

      {/* Section 11: Troubleshooting */}
      <h2 className={styles.guideTitle}>Troubleshooting</h2>
      <div className={styles.guideSection}>
        <table className={styles.guideTable}>
          <thead className={styles.guideTableHead}>
            <tr>
              <th>Problem</th>
              <th>Solution</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.guideTableCell}>Conversions not showing in Google Ads</td>
              <td className={styles.guideTableCell}>
                Wait 24-48 hours. Verify AW-ID and label in{' '}
                <code className={styles.guideInlineCode}>.env</code>. Check that{' '}
                <code className={styles.guideInlineCode}>REACT_APP_ENABLE_ANALYTICS=true</code>.
              </td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>GCLID not being captured</td>
              <td className={styles.guideTableCell}>
                Make sure auto-tagging is ON in Google Ads (Settings → Account Settings →
                Auto-tagging).
              </td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>Low click-through rate (CTR)</td>
              <td className={styles.guideTableCell}>
                Improve ad headlines. Include specific numbers and benefits. Test different
                descriptions.
              </td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>High cost per admission enquiry</td>
              <td className={styles.guideTableCell}>
                Add negative keywords (jobs / distance learning / mba). Narrow location targeting.
                Improve ad relevance by clustering each program (B.Com / BBA / BCA / B.A.) into
                its own ad group with program-specific headlines.
              </td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>Ads not showing</td>
              <td className={styles.guideTableCell}>
                Check budget, bids, and approval status. New accounts may take 24 hours for review.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GoogleAdsGuide;

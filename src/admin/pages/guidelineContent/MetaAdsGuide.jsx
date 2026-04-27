import React from 'react';

const MetaAdsGuide = ({ styles }) => {
  return (
    <div>
      {/* Section 1: What is Meta Ads? */}
      <h2 className={styles.guideTitle}>What is Meta Ads?</h2>
      <div className={styles.guideSection}>
        <p className={styles.guideParagraph}>
          Meta Ads (formerly Facebook Ads) lets you show ads on Facebook and Instagram to people who
          match your target audience profile. Unlike Google Ads where prospective students actively
          search for you, Meta Ads proactively put Icon Commerce College in front of Class 12
          finishers, parents, and HS-stream students based on age, location, and interests — even if
          they weren't searching yet.
        </p>
        <p className={styles.guideParagraph}>
          Meta Ads are best for admissions awareness campaigns, retargeting prospective students who
          visited but didn't submit an enquiry, and reaching parents in Assam and the wider
          North-East. They complement Google Ads — Google captures intent, Meta builds reach.
        </p>
      </div>

      {/* Section 2: Create Meta Business Account */}
      <h2 className={styles.guideTitle}>Create Meta Business Account</h2>
      <div className={styles.guideSection}>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>
            Go to <code className={styles.guideInlineCode}>https://business.facebook.com</code>
          </li>
          <li className={styles.guideStepItem}>Click "Create Account"</li>
          <li className={styles.guideStepItem}>
            Enter your business name, your name, and business email
          </li>
          <li className={styles.guideStepItem}>Follow the verification steps</li>
          <li className={styles.guideStepItem}>
            Once inside Business Suite, go to "All Tools" → "Events Manager"
          </li>
          <li className={styles.guideStepItem}>
            Click "Connect Data Sources" → "Web" → "Facebook Pixel"
            <ul>
              <li>Name your pixel (e.g., "Icon Commerce College Admissions Pixel")</li>
              <li>Click "Create Pixel"</li>
              <li>You'll see a Pixel ID (15-digit number) — copy it</li>
            </ul>
          </li>
        </ol>
      </div>

      {/* Section 3: Install the Pixel on Your Landing Page */}
      <h2 className={styles.guideTitle}>Install the Pixel on Your Landing Page</h2>
      <div className={styles.guideSection}>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>
            Open your <code className={styles.guideInlineCode}>.env</code> file
          </li>
          <li className={styles.guideStepItem}>
            Set <code className={styles.guideInlineCode}>REACT_APP_META_PIXEL_ID=YOUR_15_DIGIT_PIXEL_ID</code>
          </li>
          <li className={styles.guideStepItem}>
            Set <code className={styles.guideInlineCode}>REACT_APP_ENABLE_ANALYTICS=true</code>
          </li>
          <li className={styles.guideStepItem}>
            Save and restart your dev server (<code className={styles.guideInlineCode}>npm start</code>)
          </li>
        </ol>
        <div className={styles.guideNote}>
          <strong>Note:</strong> The landing page code already has the Meta Pixel integration built in.
          You just need to set the Pixel ID in <code className={styles.guideInlineCode}>.env</code> — no
          code changes needed.
        </div>

        <h3 className={styles.guideSubtitle}>What the Pixel Tracks Automatically</h3>
        <table className={styles.guideTable}>
          <thead className={styles.guideTableHead}>
            <tr>
              <th>Event</th>
              <th>When It Fires</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.guideTableCell}>
                <code className={styles.guideInlineCode}>PageView</code>
              </td>
              <td className={styles.guideTableCell}>When someone visits your page</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>
                <code className={styles.guideInlineCode}>Lead</code>
              </td>
              <td className={styles.guideTableCell}>When a prospective student submits the admission enquiry form</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>
                <code className={styles.guideInlineCode}>Contact</code>
              </td>
              <td className={styles.guideTableCell}>When someone taps the admissions phone or WhatsApp counsellor button</td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>
                <code className={styles.guideInlineCode}>ViewContent</code>
              </td>
              <td className={styles.guideTableCell}>When a visitor views the Programs / Faculty / Fee Structure sections</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 4: Create an Admission Enquiry Campaign */}
      <h2 className={styles.guideTitle}>Create an Admission Enquiry Campaign</h2>
      <div className={styles.guideSection}>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>
            Go to <code className={styles.guideInlineCode}>https://adsmanager.facebook.com</code>
          </li>
          <li className={styles.guideStepItem}>Click "+ Create" for a new campaign</li>
          <li className={styles.guideStepItem}>Objective: Select "Leads"</li>
          <li className={styles.guideStepItem}>
            Campaign name: <code className={styles.guideInlineCode}>Icon Commerce College — Admissions 2026 — [Month]</code>
          </li>
          <li className={styles.guideStepItem}>
            Budget: Start with ₹500–800/day during the admission window. Choose "Daily Budget".
          </li>
          <li className={styles.guideStepItem}>
            Audience: Target Assam + Meghalaya + Arunachal Pradesh + Nagaland; age 17–22 (applicants)
            and 38–55 (parents); interests: Gauhati University, Class 12 results, commerce / arts /
            BBA / BCA streams.
          </li>
          <li className={styles.guideStepItem}>
            Placements: Choose "Advantage+ Placements" (let Meta optimize) OR manually select
            Facebook Feed + Instagram Feed + Reels only.
          </li>
          <li className={styles.guideStepItem}>
            Ad creative: Campus shot or alumni testimonial reel + headline ("Admissions Open 2026 —
            B.Com / BBA / BCA / B.A. at Icon Commerce College, Guwahati") + Apply Now CTA pointing
            to the landing page.
          </li>
        </ol>

        <h3 className={styles.guideSubtitle}>Tips for Better Ad Creative</h3>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>
            Use 15–30s campus walkthrough or student-testimonial videos — they out-perform static
            images for admissions ads.
          </li>
          <li className={styles.guideStepItem}>
            Show real students, real classrooms, and the Gauhati University affiliation seal — avoid
            generic stock photos.
          </li>
          <li className={styles.guideStepItem}>
            Write ad copy in Assamese / Bengali / English mixed — that's how the audience actually
            speaks.
          </li>
          <li className={styles.guideStepItem}>
            The landing page URL should include UTM parameters:
          </li>
        </ol>
        <pre className={styles.guideCode}>
{`https://landing.iconcommerce.edu/?utm_source=facebook&utm_medium=paid&utm_campaign=bcom_admissions_2026`}
        </pre>
      </div>

      {/* Section 5: Set Up Conversions API (CAPI) */}
      <h2 className={styles.guideTitle}>Set Up Conversions API (CAPI)</h2>
      <div className={styles.guideSection}>
        <p className={styles.guideParagraph}>
          Browser-side tracking (the Pixel) can be blocked by ad blockers. CAPI sends events from your
          server directly to Meta, so they're more reliable. Setting up both the Pixel and CAPI together
          gives you the most accurate conversion data.
        </p>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>
            On your hosting server, go to the folder{' '}
            <code className={styles.guideInlineCode}>public/api/</code>
          </li>
          <li className={styles.guideStepItem}>
            Copy <code className={styles.guideInlineCode}>config.example.php</code> to{' '}
            <code className={styles.guideInlineCode}>config.php</code>
          </li>
          <li className={styles.guideStepItem}>
            Open <code className={styles.guideInlineCode}>config.php</code> and fill in:
            <ul>
              <li>
                <code className={styles.guideInlineCode}>META_PIXEL_ID</code>: Your 15-digit Pixel ID
                (same as in <code className={styles.guideInlineCode}>.env</code>)
              </li>
              <li>
                <code className={styles.guideInlineCode}>META_ACCESS_TOKEN</code>: Generate this from
                Events Manager → Settings → Conversions API → "Generate Access Token"
              </li>
              <li>
                <code className={styles.guideInlineCode}>META_API_VERSION</code>: Leave as{' '}
                <code className={styles.guideInlineCode}>v19.0</code>
              </li>
              <li>
                <code className={styles.guideInlineCode}>META_TEST_EVENT_CODE</code>: Get from Events
                Manager → Test Events tab (remove in production)
              </li>
            </ul>
          </li>
          <li className={styles.guideStepItem}>
            Also set in <code className={styles.guideInlineCode}>.env</code>:{' '}
            <code className={styles.guideInlineCode}>REACT_APP_META_CAPI_ENDPOINT=/api/meta-capi.php</code>
          </li>
          <li className={styles.guideStepItem}>
            Set <code className={styles.guideInlineCode}>REACT_APP_META_TEST_EVENT_CODE=YOUR_TEST_CODE</code>{' '}
            (for testing only)
          </li>
          <li className={styles.guideStepItem}>Deploy your code</li>
          <li className={styles.guideStepItem}>
            Submit a test form and check Meta Events Manager → Test Events
          </li>
        </ol>
        <div className={styles.guideNote}>
          <strong>Note:</strong> CAPI requires a server that can run PHP. If you're on static hosting
          (Netlify, Vercel), CAPI won't work — browser pixel alone is fine for most cases.
        </div>
      </div>

      {/* Section 6: Event Deduplication */}
      <h2 className={styles.guideTitle}>Event Deduplication</h2>
      <div className={styles.guideSection}>
        <p className={styles.guideParagraph}>
          Both the browser pixel and server CAPI send the same events. To avoid counting them twice,
          both use the same <code className={styles.guideInlineCode}>event_id</code>. The code handles
          this automatically via <code className={styles.guideInlineCode}>src/utils/eventDedup.js</code>.
        </p>
        <p className={styles.guideParagraph}>
          In Meta Events Manager, you'll see events with "Browser" and "Server" sources — matching{' '}
          <code className={styles.guideInlineCode}>event_id</code> values are automatically
          deduplicated by Meta, so each real event is only counted once.
        </p>
      </div>

      {/* Section 7: Testing Your Setup */}
      <h2 className={styles.guideTitle}>Testing Your Setup</h2>
      <div className={styles.guideSection}>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>
            Set <code className={styles.guideInlineCode}>REACT_APP_META_TEST_EVENT_CODE</code> and{' '}
            <code className={styles.guideInlineCode}>META_TEST_EVENT_CODE</code> (same value)
          </li>
          <li className={styles.guideStepItem}>
            Go to Meta Events Manager → Test Events tab
          </li>
          <li className={styles.guideStepItem}>Open your landing page in a browser</li>
          <li className={styles.guideStepItem}>Submit a test form</li>
          <li className={styles.guideStepItem}>
            Check Test Events tab — you should see:{' '}
            <code className={styles.guideInlineCode}>PageView</code> (Browser),{' '}
            <code className={styles.guideInlineCode}>Lead</code> (Browser), and if CAPI is set up:{' '}
            <code className={styles.guideInlineCode}>Lead</code> (Server)
          </li>
        </ol>
        <div className={styles.guideNoteWarning}>
          <strong>Warning:</strong> Remove the test event code before going live! Test events are not
          counted in your real event data.
        </div>
      </div>

      {/* Section 8: Tips for Better Meta Ads */}
      <h2 className={styles.guideTitle}>Tips for Better Meta Ads</h2>
      <div className={styles.guideSection}>
        <ol className={styles.guideStepList}>
          <li className={styles.guideStepItem}>
            Use video creatives — they typically get 2-3x more engagement than static images
          </li>
          <li className={styles.guideStepItem}>
            Test multiple audiences — create 3-4 ad sets with different targeting
          </li>
          <li className={styles.guideStepItem}>
            Start with "Advantage+ Placements" then optimize based on data
          </li>
          <li className={styles.guideStepItem}>
            Retargeting: Create a custom audience of prospective students who visited the landing
            page but didn't submit the admission enquiry form.
          </li>
          <li className={styles.guideStepItem}>
            Lookalike audiences: After 50+ admission enquiries, create a 1% lookalike from your
            converted-applicant list for sharper targeting.
          </li>
          <li className={styles.guideStepItem}>
            Ad fatigue: Change your ad creative every 2-3 weeks
          </li>
          <li className={styles.guideStepItem}>
            Best posting times: Test different days and times to find what works for your audience
          </li>
        </ol>
      </div>

      {/* Section 9: Troubleshooting */}
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
              <td className={styles.guideTableCell}>Pixel Helper shows "No Pixel Found"</td>
              <td className={styles.guideTableCell}>
                Verify <code className={styles.guideInlineCode}>REACT_APP_META_PIXEL_ID</code> is set
                in <code className={styles.guideInlineCode}>.env</code> and the page is restarted.
              </td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>Lead event not firing on admission enquiry submit</td>
              <td className={styles.guideTableCell}>
                Check browser console for errors. Verify{' '}
                <code className={styles.guideInlineCode}>REACT_APP_ENABLE_ANALYTICS=true</code>.
              </td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>CAPI events not appearing</td>
              <td className={styles.guideTableCell}>
                Check that <code className={styles.guideInlineCode}>config.php</code> exists on server
                with correct credentials. Check server error logs.
              </td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>Events showing "Duplicate" in Events Manager</td>
              <td className={styles.guideTableCell}>
                This is normal and expected — it means deduplication is working correctly.
              </td>
            </tr>
            <tr>
              <td className={styles.guideTableCell}>Low ad delivery</td>
              <td className={styles.guideTableCell}>
                Increase budget, broaden audience, or improve ad relevance score.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MetaAdsGuide;

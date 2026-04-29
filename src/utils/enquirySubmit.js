/* ============================================
   General Enquiry Submission Utility
   Stores "Send us a message" submissions in a
   separate localStorage bucket so the admin
   panel can manage them apart from admission
   leads. Mirrors the same custom-event pattern
   as webhookSubmit.js so the admin Enquiry tab
   refreshes live without a page reload.
   ============================================ */

import { getStoredGclid } from "./gclidManager";

// Separate storage keys so general enquiries never mix with admission leads.
const ENQUIRIES_KEY = "lp_general_enquiries";
const TEST_ENQUIRIES_KEY = "lp_test_enquiries";

const DUMMY_MODE = true;

const generateUUID = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const storeEnquiry = (enquiryData, isTest = false) => {
  const key = isTest ? TEST_ENQUIRIES_KEY : ENQUIRIES_KEY;
  const existing = JSON.parse(localStorage.getItem(key) || "[]");

  if (
    enquiryData.enquiry_id &&
    existing.some((e) => e.enquiry_id === enquiryData.enquiry_id)
  ) {
    return enquiryData;
  }

  const record = {
    ...enquiryData,
    enquiry_id: enquiryData.enquiry_id || generateUUID(),
    status: enquiryData.status || "new",
    notes: [],
    activity: [
      {
        action: "Enquiry created",
        status: "new",
        timestamp: enquiryData.submitted_at || new Date().toISOString(),
      },
    ],
  };
  existing.push(record);
  localStorage.setItem(key, JSON.stringify(existing));

  // Notify any admin panel listeners in the SAME tab — the native
  // `storage` event only fires across tabs, so emit a custom event
  // for same-tab refresh.
  try {
    window.dispatchEvent(
      new CustomEvent("lp:enquiry-submitted", {
        detail: { enquiry: record, isTest },
      })
    );
  } catch (_err) {
    // CustomEvent unsupported — ignore.
  }

  return record;
};

/**
 * Submit a general enquiry from the contact "Send us a message" form.
 * Persists to localStorage so it appears in the admin "General Enquiry" tab.
 */
export const submitEnquiry = async (enquiryData) => {
  const enriched = {
    ...enquiryData,
    enquiry_id: generateUUID(),
    status: "new",
    submitted_at: new Date().toISOString(),
    page_url: window.location.href,
    user_agent: navigator.userAgent,
    utm_source:
      new URLSearchParams(window.location.search).get("utm_source") || "",
    utm_medium:
      new URLSearchParams(window.location.search).get("utm_medium") || "",
    utm_campaign:
      new URLSearchParams(window.location.search).get("utm_campaign") || "",
    utm_term: new URLSearchParams(window.location.search).get("utm_term") || "",
    utm_content:
      new URLSearchParams(window.location.search).get("utm_content") || "",
    gclid:
      new URLSearchParams(window.location.search).get("gclid") ||
      getStoredGclid() ||
      "",
  };

  if (DUMMY_MODE) {
    // Simulate a small network delay for UX parity with the live mode.
    await new Promise((resolve) => setTimeout(resolve, 800));
    storeEnquiry(enriched, true);
    return { success: true, message: "Enquiry captured (test mode)" };
  }

  storeEnquiry(enriched, false);
  return { success: true, message: "Enquiry submitted successfully" };
};

export const ENQUIRIES_STORAGE_KEY = ENQUIRIES_KEY;
export const TEST_ENQUIRIES_STORAGE_KEY = TEST_ENQUIRIES_KEY;

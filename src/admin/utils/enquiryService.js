/* ============================================
   Enquiry Service
   CRUD for general enquiries captured from the
   "Send us a message" form. Storage is kept
   separate from admission leads.
   ============================================ */

import {
  ENQUIRIES_STORAGE_KEY,
  TEST_ENQUIRIES_STORAGE_KEY,
} from "../../utils/enquirySubmit";

const getAllEnquiriesRaw = () => {
  const prod = JSON.parse(localStorage.getItem(ENQUIRIES_STORAGE_KEY) || "[]");
  const test = JSON.parse(
    localStorage.getItem(TEST_ENQUIRIES_STORAGE_KEY) || "[]"
  ).map((e) => ({ ...e, _isTest: true }));
  return [...prod, ...test];
};

const saveEnquiries = (allEnquiries) => {
  const prod = allEnquiries.filter((e) => !e._isTest);
  const test = allEnquiries.filter((e) => e._isTest);
  localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(prod));
  localStorage.setItem(TEST_ENQUIRIES_STORAGE_KEY, JSON.stringify(test));
};

/**
 * Get all enquiries with optional filters
 * @param {Object} filters - { search, status, dateRange, startDate, endDate }
 */
export const getEnquiries = (filters = {}) => {
  let enquiries = getAllEnquiriesRaw();

  if (filters.search) {
    const q = filters.search.toLowerCase();
    enquiries = enquiries.filter(
      (e) =>
        (e.name || "").toLowerCase().includes(q) ||
        (e.email || "").toLowerCase().includes(q) ||
        (e.mobile || "").includes(q) ||
        (e.message || "").toLowerCase().includes(q)
    );
  }

  if (filters.status && filters.status !== "all") {
    enquiries = enquiries.filter((e) => e.status === filters.status);
  }

  if (filters.dateRange && filters.dateRange !== "all") {
    const now = new Date();
    let startDate;
    switch (filters.dateRange) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "week": {
        const day = now.getDay();
        startDate = new Date(now);
        startDate.setDate(now.getDate() - day);
        startDate.setHours(0, 0, 0, 0);
        break;
      }
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "custom":
        if (filters.startDate) startDate = new Date(filters.startDate);
        break;
      default:
        break;
    }

    if (startDate) {
      enquiries = enquiries.filter(
        (e) => new Date(e.submitted_at) >= startDate
      );
    }
    if (filters.dateRange === "custom" && filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      enquiries = enquiries.filter((e) => new Date(e.submitted_at) <= endDate);
    }
  }

  enquiries.sort(
    (a, b) => new Date(b.submitted_at) - new Date(a.submitted_at)
  );

  return enquiries;
};

export const updateEnquiryStatus = (id, status) => {
  const enquiries = getAllEnquiriesRaw();
  const enquiry = enquiries.find((e) => e.enquiry_id === id);
  if (!enquiry) return null;

  const oldStatus = enquiry.status;
  enquiry.status = status;
  if (!enquiry.activity) enquiry.activity = [];
  enquiry.activity.push({
    action: `Status changed from "${oldStatus}" to "${status}"`,
    status,
    timestamp: new Date().toISOString(),
  });

  saveEnquiries(enquiries);
  return enquiry;
};

export const deleteEnquiry = (id) => {
  const enquiries = getAllEnquiriesRaw();
  const filtered = enquiries.filter((e) => e.enquiry_id !== id);
  saveEnquiries(filtered);
  return true;
};

export const deleteEnquiries = (ids) => {
  const idSet = new Set(ids);
  const enquiries = getAllEnquiriesRaw();
  const filtered = enquiries.filter((e) => !idSet.has(e.enquiry_id));
  saveEnquiries(filtered);
  return true;
};

export const exportEnquiriesCSV = (enquiries) => {
  const headers = [
    "Enquiry ID",
    "Submitted At",
    "Status",
    "Name",
    "Mobile",
    "Email",
    "Programme of Interest",
    "Message",
    "Source",
    "Page URL",
    "UTM Source",
    "UTM Medium",
    "UTM Campaign",
  ];

  const escapeCSV = (val) => {
    const str = String(val || "");
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = enquiries.map((e) => [
    e.enquiry_id,
    e.submitted_at,
    e.status,
    e.name,
    e.mobile,
    e.email,
    e.service_interest,
    e.message,
    e.source,
    e.page_url,
    e.utm_source,
    e.utm_medium,
    e.utm_campaign,
  ]);

  const csvContent = [
    headers.map(escapeCSV).join(","),
    ...rows.map((r) => r.map(escapeCSV).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const date = new Date().toISOString().split("T")[0];
  link.href = url;
  link.download = `enquiries_export_${date}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

export const getEnquiryStats = () => {
  const enquiries = getAllEnquiriesRaw();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);

  const total = enquiries.length;
  const newToday = enquiries.filter(
    (e) => new Date(e.submitted_at) >= today
  ).length;
  const thisWeek = enquiries.filter(
    (e) => new Date(e.submitted_at) >= weekStart
  ).length;
  const resolved = enquiries.filter((e) => e.status === "resolved").length;

  return { total, newToday, thisWeek, resolved };
};

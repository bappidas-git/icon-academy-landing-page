/* ============================================
   Scholarships Data — Icon Commerce College
   Government-driven scholarship facilitation copy.
   Scheme names below are placeholders representing
   the broad categories the college can support;
   stakeholder must replace with the exact list of
   schemes ICC currently helps with each year.
   ============================================ */

// Scheme names below are placeholders representing the broad categories the college can support.
// Stakeholder must replace placeholders with the exact list of schemes ICC currently helps with.
export const SCHOLARSHIP_CATEGORIES = [
  {
    id: 'central',
    icon: 'mdi:flag-variant',
    title: 'Central Government Schemes',
    schemes: [
      'National Scholarship Portal (NSP) schemes',
      'Post Matric Scholarship for SC / ST / OBC students',
      'Pragati / Saksham scholarships (where applicable)',
    ],
  },
  {
    id: 'state',
    icon: 'mdi:map',
    title: 'Assam State Schemes',
    schemes: [
      'Anundoram Borooah Scholarship (eligibility criteria apply)',
      'Pragyan Bharati Scholarship (free admission for eligible HS toppers)',
      'Other Assam Government scholarships notified each year',
    ],
  },
  {
    id: 'institutional',
    icon: 'mdi:school',
    title: 'Institutional Support',
    schemes: [
      'Personal counselling on scheme fit and eligibility',
      'Document checklist guidance from the Institute Nodal Officer',
      'Help in navigating online scholarship portals',
    ],
  },
];

export const ELIGIBILITY_CRITERIA = [
  {
    id: 'income-limit',
    icon: 'mdi:cash-check',
    label: 'Family income within the limit notified by the respective scheme',
  },
  {
    id: 'caste-cert',
    icon: 'mdi:card-account-details-outline',
    label: 'Caste / category certificate (where required by the scheme)',
  },
  {
    id: 'aadhaar-bank',
    icon: 'mdi:bank-outline',
    label: 'Aadhaar-linked bank account for direct benefit transfer',
  },
  {
    id: 'income-cert',
    icon: 'mdi:file-document-outline',
    label: 'Income certificate from a competent authority',
  },
  {
    id: 'marksheets',
    icon: 'mdi:certificate-outline',
    label: 'Marksheets of the qualifying examination',
  },
];

export const NODAL_OFFICER = {
  title: 'Institute Nodal Officer for Scholarships',
  body: 'Students can avail Government-approved scholarship schemes through Icon Commerce College. For more information and step-by-step support, please contact the Institute Nodal Officer for Scholarships at the college office.',
  ctaLabel: 'Get Scholarship Counselling',
  ctaSource: 'scholarships_counsellor',
};

export const SCHOLARSHIPS_DISCLAIMER =
  'Scheme availability, eligibility, and amounts are determined by the respective Government bodies and may change each academic year. Confirm details with the Nodal Officer.';

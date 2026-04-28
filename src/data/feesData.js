/* ============================================
   Fees Data — Icon Commerce College
   Canonical fee schedule for the four UG programmes
   (B.Com, B.A., BBA, BCA). All amounts in INR.
   Source: Prospectus 2026. Disclaimers are quoted
   verbatim and must not be edited.
   ============================================ */

export const FEE_ROWS = [
  {
    id: 'bcom',
    program: 'B.Com.',
    fullName: 'Bachelor of Commerce',
    admission: 10900,
    tuitionPerMonth: 1800,
    application: 300,
    notes:
      'Includes Admission ₹5,500 · Library ₹800 · ID-Card / Entry Pass ₹100 · Miscellaneous ₹4,500',
    apply: { source: 'fees_bcom_apply', label: 'Apply for B.Com →' },
  },
  {
    id: 'ba',
    program: 'B.A.',
    fullName: 'Bachelor of Arts',
    admission: 10900,
    tuitionPerMonth: 1800,
    application: 300,
    notes:
      'Includes Admission ₹5,500 · Library ₹800 · ID-Card / Entry Pass ₹100 · Miscellaneous ₹4,500',
    apply: { source: 'fees_ba_apply', label: 'Apply for B.A. →' },
  },
  {
    id: 'bba',
    program: 'BBA',
    fullName: 'Bachelor of Business Administration',
    admission: 11000,
    tuitionPerMonth: 2000,
    application: 300,
    notes:
      'Includes Admission ₹5,500 · Library ₹900 · ID-Card / Entry Pass ₹100 · Miscellaneous ₹4,500',
    apply: { source: 'fees_bba_apply', label: 'Apply for BBA →' },
  },
  {
    id: 'bca',
    program: 'BCA',
    fullName: 'Bachelor of Computer Applications',
    admission: 11000,
    tuitionPerMonth: 2000,
    application: 300,
    notes:
      'Includes Admission ₹5,500 · Library ₹900 · ID-Card / Entry Pass ₹100 · Miscellaneous ₹4,500',
    apply: { source: 'fees_bca_apply', label: 'Apply for BCA →' },
  },
];

export const FEE_DISCLAIMERS = [
  'Registration / Enrolment / University Examination / other fees payable to Gauhati University are subject to change and will be charged as per the regulations issued by the concerned authority.',
  'Fees once paid are not refundable under any circumstances.',
  'For the most up-to-date fee schedule, please contact the college office during admission counselling.',
];

export const FEE_CALLOUTS = [
  {
    id: 'scholarship',
    icon: 'mdi:medal-outline',
    tone: 'saffron',
    text: 'Government scholarships available — talk to our Institute Nodal Officer for eligibility.',
  },
  {
    id: 'payment',
    icon: 'mdi:cash-multiple',
    tone: 'indigo',
    text: 'Pay at college office or use the methods communicated during your admission counselling.',
  },
  {
    id: 'helpline',
    icon: 'mdi:phone-in-talk',
    tone: 'coral',
    text: 'Need a break-down? Call our admissions team.',
  },
];

export const FEE_BOTTOM_CTA = {
  primaryLabel: 'Apply Now',
  primarySource: 'fees_bottom_apply',
  secondaryLabel: 'View Scholarships ↓',
  secondaryHref: '#scholarships',
};

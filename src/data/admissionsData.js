/* ============================================
   Admissions Data — Icon Commerce College
   Canonical content for the four-step admission
   flow, required documents, key dates, and the
   bottom counsellor CTA. Samarth portal URL and
   College Code 842 must remain verbatim.
   ============================================ */

export const ADMISSION_STEPS = [
  {
    id: 'register-samarth',
    number: '01',
    icon: 'mdi:account-plus-outline',
    title: 'Register on Samarth Portal',
    body: 'Visit the Assam state admissions portal and register with your details. The portal handles centralised admissions for affiliated colleges across the state.',
    cta: {
      label: 'Open Samarth Portal →',
      href: 'https://assamadmission.samarth.ac.in/',
      external: true,
    },
  },
  {
    id: 'choose-icc',
    number: '02',
    icon: 'mdi:school',
    title: 'Choose Icon Commerce College — Code 842',
    body: 'In the portal, select Icon Commerce College as your preferred college using College Code 842 and choose your preferred stream — B.Com, BBA, BCA, or B.A.',
  },
  {
    id: 'verify-docs',
    number: '03',
    icon: 'mdi:file-document-check-outline',
    title: 'Document Verification',
    body: 'Bring your originals to the college office for verification: HS (10+2) marksheet, Registration / Migration Certificate, Gap Certificate (if applicable).',
  },
  {
    id: 'confirm-admission',
    number: '04',
    icon: 'mdi:check-decagram',
    title: 'Confirm Admission (Online or Offline)',
    body: 'After verification, take admission either at the college office or via the online mode. Approved candidates receive a confirmation message on their registered mobile.',
  },
];

export const REQUIRED_DOCS = [
  { id: 'hs-marksheet', icon: 'mdi:file-document-outline', label: 'HS (10+2) Marksheet (Original)' },
  { id: 'registration', icon: 'mdi:certificate-outline', label: 'Registration / Migration Certificate' },
  { id: 'gap', icon: 'mdi:file-clock-outline', label: 'Gap Certificate (Affidavit) — if HS was passed earlier than the current year' },
  { id: 'photos', icon: 'mdi:account-box-outline', label: 'Recent passport-size photographs' },
  { id: 'id-proof', icon: 'mdi:card-account-details-outline', label: 'Government photo ID (Aadhaar / Voter / PAN)' },
];

export const KEY_DATES = [
  {
    id: 'apply-window',
    label: 'Application Window',
    value: 'See Samarth Portal — opens annually as per GU calendar',
  },
  {
    id: 'classes-start',
    label: 'Classes begin',
    value: '10:00 AM as per the routine, on the notified semester start date',
  },
];

export const ADMISSION_CTA = {
  helpline: 'Need help with the application? Talk to our admissions team.',
  buttonLabel: 'Get Free Admission Counselling',
  source: 'admissions_counsellor',
};

export const SAMARTH_PORTAL_URL = 'https://assamadmission.samarth.ac.in/';
export const COLLEGE_CODE = '842';

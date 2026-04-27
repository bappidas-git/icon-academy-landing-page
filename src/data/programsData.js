/* ============================================
   Programmes Data — Icon Commerce College
   Single source of truth for the four NEP 2020
   undergraduate programmes (B.Com, BBA, BCA, B.A.)
   surfaced in the ProgramsSection.
   ============================================ */

export const PROGRAMS = [
  {
    id: 'bcom',
    code: 'B.Com.',
    name: 'Bachelor of Commerce',
    icon: 'mdi:chart-line',
    accentColor: 'var(--ic-primary)',
    tagline:
      'Master the language of business — finance, accounting, taxation, and economics.',
    duration: '3 / 4 Years (6 / 8 Semesters)',
    affiliation: 'Gauhati University · NEP 2020',
    eligibility:
      'HS (10+2) in Commerce, Science, or Arts under AHSEC or equivalent.',
    careerOutcomes: [
      'Chartered Accountancy',
      'Banking & Finance',
      'Taxation',
      'Corporate Roles',
      'Higher Studies (M.Com, MBA)',
    ],
    coreSubjects: [
      'Financial Accounting',
      'Business Statistics',
      'Economics',
      'Business Law',
      'Cost Accounting',
      'Income Tax',
      'Auditing',
    ],
    feeSnapshot: {
      admission: '₹10,900',
      tuition: '₹1,800 / month',
      application: '₹300',
    },
    apply: { source: 'program_bcom_apply' },
    image: 'https://placehold.co/600x400?text=B.Com+at+ICC',
  },
  {
    id: 'bba',
    code: 'BBA',
    name: 'Bachelor of Business Administration',
    icon: 'mdi:briefcase-variant',
    accentColor: 'var(--ic-secondary)',
    tagline:
      'Build managerial muscle — strategy, marketing, HR, and entrepreneurship.',
    duration: '3 / 4 Years (6 / 8 Semesters)',
    affiliation: 'Gauhati University · NEP 2020',
    eligibility:
      'HS (10+2) in Commerce, Science, or Arts under AHSEC or equivalent.',
    careerOutcomes: [
      'Management Trainee',
      'Marketing & Sales',
      'Operations',
      'HR',
      'MBA / Higher Studies',
      'Entrepreneurship',
    ],
    coreSubjects: [
      'Principles of Management',
      'Marketing Management',
      'HRM',
      'Financial Management',
      'Business Communication',
      'Operations Management',
      'Entrepreneurship',
    ],
    feeSnapshot: {
      admission: '₹11,000',
      tuition: '₹2,000 / month',
      application: '₹300',
    },
    apply: { source: 'program_bba_apply' },
    image: 'https://placehold.co/600x400?text=BBA+at+ICC',
  },
  {
    id: 'bca',
    code: 'BCA',
    name: 'Bachelor of Computer Applications',
    icon: 'mdi:laptop',
    accentColor: 'var(--ic-cta)',
    tagline:
      'Code your future — software, data, web, and modern application development.',
    duration: '3 / 4 Years (6 / 8 Semesters)',
    affiliation: 'Gauhati University · NEP 2020',
    eligibility:
      'HS (10+2) in any stream; Maths or Computer Science at 10+2 preferred. Diploma (CSE / IT) from AICTE-recognised institutes also eligible.',
    careerOutcomes: [
      'Software Engineer',
      'Web Developer',
      'Data Analyst',
      'System Administrator',
      'MCA / Higher Studies',
    ],
    coreSubjects: [
      'C / C++',
      'Java',
      'Data Structures',
      'DBMS',
      'Web Technology',
      'Computer Networks',
      'Operating Systems',
      'Software Engineering',
    ],
    feeSnapshot: {
      admission: '₹11,000',
      tuition: '₹2,000 / month',
      application: '₹300',
    },
    apply: { source: 'program_bca_apply' },
    image: 'https://placehold.co/600x400?text=BCA+at+ICC',
  },
  {
    id: 'ba',
    code: 'B.A.',
    name: 'Bachelor of Arts',
    icon: 'mdi:book-open-page-variant',
    accentColor: 'var(--ic-gauhati-uni)',
    tagline:
      'Sharpen your humanities — think critically, communicate powerfully.',
    duration: '3 / 4 Years (6 / 8 Semesters)',
    affiliation: 'Gauhati University · NEP 2020',
    eligibility:
      'HS (10+2) from any stream. Honours pathway requires minimum 45 % at HS.',
    careerOutcomes: [
      'Civil Services Aspirant',
      'Teaching',
      'Journalism & Media',
      'Social Work',
      'Higher Studies (MA, MSW)',
    ],
    coreSubjects: [
      'English / Assamese',
      'Political Science',
      'Economics',
      'Sociology',
      'History',
      'Education',
      'Geography',
    ],
    feeSnapshot: {
      admission: '₹10,900',
      tuition: '₹1,800 / month',
      application: '₹300',
    },
    apply: { source: 'program_ba_apply' },
    image: 'https://placehold.co/600x400?text=B.A.+at+ICC',
  },
];

export default PROGRAMS;

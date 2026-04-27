/* ============================================
   SEO Configuration — Icon Commerce College
   Central configuration for site metadata,
   organization details, courses, page-specific
   overrides, and FAQ data used by JSON-LD
   schemas.
   ============================================ */

const seoConfig = {
  // =========================================
  // Site-level Settings
  // =========================================
  site: {
    name: 'Icon Commerce College',
    alternateName: 'ICC',
    url: 'https://www.iconcommercecollege.in',
    defaultTitle:
      'Icon Commerce College — Admissions 2026 | B.Com, BBA, BCA, BA in Guwahati',
    titleTemplate: '%s | Icon Commerce College',
    defaultDescription:
      'Build your career at Icon Commerce College, Guwahati — established 2004, affiliated to Gauhati University. Admissions open for B.Com, BBA, BCA, B.A. (NEP 2020).',
    defaultKeywords:
      'Icon Commerce College, Guwahati admissions, B.Com Guwahati, BBA Guwahati, BCA Guwahati, BA Guwahati, Gauhati University, Assam admissions 2026, NEP 2020 college, Samarth portal',
    defaultImage:
      'https://placehold.co/1200x630?text=Icon+Commerce+College+Admissions+2026',
    twitterHandle: '@iconcommercecollege',
    locale: 'en_IN',
    language: 'en',
    themeColor: '#1E3A8A',
  },

  // =========================================
  // Primary Contact
  // =========================================
  contact: {
    phone: '+910000000000',
    email: 'info@iconcommercecollege.in',
    whatsapp: '910000000000',
  },

  // =========================================
  // Organization (EducationalOrganization /
  // CollegeOrUniversity)
  // =========================================
  organization: {
    name: 'Icon Commerce College',
    alternateName: 'ICC',
    url: 'https://www.iconcommercecollege.in',
    logo: 'https://placehold.co/400x400?text=ICC+Logo',
    email: 'info@iconcommercecollege.in',
    phone: '+910000000000',
    description:
      'Icon Commerce College is a premier undergraduate institution affiliated to Gauhati University, established in 2004. The college offers NEP 2020 aligned 3/4-year programs in Commerce (B.Com), Arts (B.A.), Business Administration (BBA), and Computer Applications (BCA) — committed to academic excellence, holistic development, and moral integrity.',
    foundingDate: '2004',
    address: {
      streetAddress: 'Rajgarh Road, Chandmari',
      addressLocality: 'Guwahati',
      addressRegion: 'Assam',
      postalCode: '781003',
      addressCountry: 'IN',
    },
    geo: {
      latitude: '26.1884',
      longitude: '91.7569',
    },
    areaServed: [
      'Assam',
      'Arunachal Pradesh',
      'Manipur',
      'Meghalaya',
      'Mizoram',
      'Nagaland',
      'Sikkim',
      'Tripura',
      'India',
    ],
    sameAs: [
      'https://www.facebook.com/iconcommercecollege',
      'https://www.instagram.com/iconcommercecollege',
      'https://www.linkedin.com/school/icon-commerce-college',
      'https://www.youtube.com/@iconcommercecollege',
    ],
    parentOrganization: {
      name: 'Gauhati University',
      url: 'https://gauhati.ac.in',
    },
    aggregateRating: {
      ratingValue: '4.7',
      reviewCount: '180',
      bestRating: '5',
      worstRating: '1',
    },
  },

  // =========================================
  // Courses (one per programme)
  // =========================================
  courses: [
    {
      id: 'bcom',
      name: 'Bachelor of Commerce (B.Com.)',
      description:
        'NEP 2020 aligned 3/4-year (6/8 semesters) undergraduate programme in Commerce, affiliated to Gauhati University.',
      provider: 'Icon Commerce College',
      durationP: 'P3Y',
      educationalLevel: 'Undergraduate',
      occupationalCategory: 'Accounting, Finance, Banking, Taxation',
      offers: {
        price: '10900',
        priceCurrency: 'INR',
        category: 'Admission Fees (1st Semester)',
      },
    },
    {
      id: 'bba',
      name: 'Bachelor of Business Administration (BBA)',
      description:
        'NEP 2020 aligned 3/4-year (6/8 semesters) undergraduate programme in Business Administration, affiliated to Gauhati University.',
      provider: 'Icon Commerce College',
      durationP: 'P3Y',
      educationalLevel: 'Undergraduate',
      occupationalCategory: 'Management, Marketing, Operations, Entrepreneurship',
      offers: {
        price: '11000',
        priceCurrency: 'INR',
        category: 'Admission Fees (1st Semester)',
      },
    },
    {
      id: 'bca',
      name: 'Bachelor of Computer Applications (BCA)',
      description:
        'NEP 2020 aligned 3/4-year (6/8 semesters) undergraduate programme in Computer Applications, affiliated to Gauhati University.',
      provider: 'Icon Commerce College',
      durationP: 'P3Y',
      educationalLevel: 'Undergraduate',
      occupationalCategory: 'Software Development, IT Services, Data Analytics',
      offers: {
        price: '11000',
        priceCurrency: 'INR',
        category: 'Admission Fees (1st Semester)',
      },
    },
    {
      id: 'ba',
      name: 'Bachelor of Arts (B.A.)',
      description:
        'NEP 2020 aligned 3/4-year (6/8 semesters) undergraduate programme in Arts, affiliated to Gauhati University.',
      provider: 'Icon Commerce College',
      durationP: 'P3Y',
      educationalLevel: 'Undergraduate',
      occupationalCategory: 'Education, Civil Services, Humanities, Social Work',
      offers: {
        price: '10900',
        priceCurrency: 'INR',
        category: 'Admission Fees (1st Semester)',
      },
    },
  ],

  // =========================================
  // Page-specific overrides
  // =========================================
  pages: {
    home: {
      title:
        'Icon Commerce College — Admissions 2026 | B.Com, BBA, BCA, BA in Guwahati',
      description:
        'Affiliated to Gauhati University. NEP 2020 aligned. Apply for B.Com, BBA, BCA, B.A. via Samarth Portal (College Code: 842).',
      keywords:
        'Icon Commerce College, Guwahati college, BBA Guwahati, BCA Guwahati, B.Com Guwahati, BA Guwahati, Gauhati University admission',
    },
    thankYou: {
      title: 'Thank You — We will call you shortly',
      description:
        'Your admission enquiry has been received. Our admissions team will contact you within 24 hours.',
      robots: 'noindex, nofollow',
    },
    admin: {
      title: 'Admin — Icon Commerce College',
      robots: 'noindex, nofollow',
    },
  },

  // =========================================
  // FAQs (used by FAQ section + FAQPage schema)
  // =========================================
  faqs: [
    {
      q: 'Which programmes does Icon Commerce College offer?',
      a: 'We offer four NEP 2020 aligned undergraduate programmes — Bachelor of Commerce (B.Com.), Bachelor of Arts (B.A.), Bachelor of Business Administration (BBA), and Bachelor of Computer Applications (BCA). All programmes are 3 / 4 years (6 / 8 semesters) and affiliated to Gauhati University.',
    },
    {
      q: 'Is Icon Commerce College affiliated to a recognised university?',
      a: 'Yes. The college is affiliated to Gauhati University and serves as a permitted Examination centre under it, following all GU regulations.',
    },
    {
      q: 'How do I apply for admission?',
      a: 'Register on the Samarth Portal at https://assamadmission.samarth.ac.in, choose Icon Commerce College (College Code: 842) as your preferred college, and select your stream (B.Com / BA / BBA / BCA). After verification you can take admission online or at the college office.',
    },
    {
      q: 'What is the eligibility for admission?',
      a: 'You must have passed the Higher Secondary (10+2) examination from AHSEC or any equivalent board recognised by Gauhati University. For BCA, students with Mathematics or Computer Science as a 10+2 subject are preferred. For Honours in B.A., a minimum of 45% marks is required.',
    },
    {
      q: 'What is the fee structure?',
      a: '1st semester admission fees (2026) are ₹10,900 for B.Com / B.A. and ₹11,000 for BBA / BCA. Monthly tuition is ₹1,800 for B.Com / B.A. and ₹2,000 for BBA / BCA. Application fee is ₹300 across programmes. Other University fees are charged as per Gauhati University regulations.',
    },
    {
      q: 'Where is the college located?',
      a: 'Icon Commerce College is located on Rajgarh Road, Chandmari, Guwahati - 781003, Assam.',
    },
    {
      q: 'Are scholarships available?',
      a: 'Yes. Students can avail Government-approved scholarship schemes through the college. Contact the Institute Nodal Officer for Scholarships for current schemes and eligibility.',
    },
    {
      q: 'What facilities are available on campus?',
      a: 'The campus has a well-equipped Computer Lab, a Library with diverse books and journals, smart classrooms with projectors, an in-house canteen, and purified drinking water. Online classes are also conducted via Google Meet and dedicated WhatsApp groups.',
    },
    {
      q: 'Are class hours strict?',
      a: 'Classes begin at 10:00 AM as per the routine. Regular attendance is compulsory and late arrival is not permitted.',
    },
    {
      q: 'Is there a college uniform?',
      a: 'Yes. All admitted students wear the prescribed uniform. Uniforms are available from Suman Dresses, Opposite Harisabha, Panbazar, Guwahati - 781001 (Phone: 0361-2630292 / 9864124419 / 9864059229).',
    },
  ],
};

export { seoConfig };
export default seoConfig;

/* ============================================
   Location Data — Icon Commerce College
   Single source of truth for campus contact info
   consumed by ContactSection, FloatingContacts,
   Footer, and JSON-LD organisation schema.
   ============================================ */

export const COLLEGE_LOCATION = {
  name: 'Icon Commerce College',
  addressLine1: 'Rajgarh Road, Chandmari',
  addressLine2: 'Guwahati - 781003',
  state: 'Assam',
  country: 'India',
  phone: process.env.REACT_APP_SALES_PHONE || '+91 0000000000',
  whatsapp: process.env.REACT_APP_WHATSAPP_NUMBER || '+910000000000',
  email: process.env.REACT_APP_SALES_EMAIL || 'info@iconcommercecollege.in',
  admissionsEmail:
    process.env.REACT_APP_SUPPORT_EMAIL || 'admissions@iconcommercecollege.in',
  hours:
    'Mon – Sat · 09:30 AM – 05:00 PM (Classes begin at 10:00 AM)',
  mapEmbedUrl:
    'https://www.google.com/maps?q=Rajgarh+Road+Chandmari+Guwahati+781003&output=embed',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Rajgarh+Road+Chandmari+Guwahati+781003',
  uniformVendor: {
    name: 'Suman Dresses',
    address: 'Opposite Harisabha, Panbazar, Guwahati - 781001',
    phones: ['0361-2630292', '9864124419', '9864059229'],
  },
  socials: [
    { id: 'facebook', icon: 'mdi:facebook', url: process.env.REACT_APP_FACEBOOK_URL },
    { id: 'instagram', icon: 'mdi:instagram', url: process.env.REACT_APP_INSTAGRAM_URL },
    { id: 'linkedin', icon: 'mdi:linkedin', url: process.env.REACT_APP_LINKEDIN_URL },
    { id: 'youtube', icon: 'mdi:youtube', url: process.env.REACT_APP_YOUTUBE_URL },
  ],
};

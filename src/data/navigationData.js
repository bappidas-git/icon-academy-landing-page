/* ============================================
   Navigation Data
   Single source of truth for primary site nav.
   Consumed by Header (desktop), MobileDrawer,
   and MobileNavigation (bottom bar).
   ============================================ */

export const NAV_LINKS = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'programs', label: 'Programmes', href: '#programs' },
  { id: 'why', label: 'Why Icon', href: '#why-icon' },
  { id: 'admissions', label: 'Admissions', href: '#admissions' },
  { id: 'fees', label: 'Fees', href: '#fees' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const PRIMARY_CTA = {
  id: 'header_apply',
  label: 'Apply Now',
  source: 'header_apply',
};

export const BRAND = {
  name: 'Icon Commerce College',
  shortName: 'ICC',
  eyebrow: 'Estd. 2004 · Affiliated to Gauhati University',
  tagline: 'Where Knowledge Meets Character',
  logoWide: 'https://res.cloudinary.com/dn9gyaiik/image/upload/v1777447286/icon-logo_ssglnp.png',
  logoCompact: 'https://res.cloudinary.com/dn9gyaiik/image/upload/v1777447286/icon-logo_ssglnp.png',
};

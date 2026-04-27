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
  { id: 'faculty', label: 'Faculty', href: '#faculty' },
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
  logoWide: 'https://placehold.co/200x60?text=Icon+Commerce+College',
  logoCompact: 'https://placehold.co/60x60?text=ICC',
};

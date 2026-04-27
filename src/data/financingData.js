/* ============================================
   Financing data — EMI tiers and bank partners
   ============================================ */

export const financingTiers = [
  {
    label: 'Short term',
    duration: '3 years',
    interestRate: '7.5% p.a.',
    emiFor3kw: '₹ 3,700 / month',
    bestFor:
      'Homeowners who want to finish payments fast and maximise lifetime savings.',
    icon: 'mdi:flash',
    accent: 'var(--cta-primary)',
  },
  {
    label: 'Most popular',
    duration: '5 years',
    interestRate: '7% p.a.',
    emiFor3kw: '₹ 2,400 / month',
    bestFor:
      'EMI roughly equals your current electricity bill — power bill becomes loan bill.',
    icon: 'mdi:star',
    accent: 'var(--accent-gold)',
    featured: true,
  },
  {
    label: 'Lowest EMI',
    duration: '10 years',
    interestRate: '7.5% p.a.',
    emiFor3kw: '₹ 1,450 / month',
    bestFor:
      'Smallest monthly outgo. Still cash-positive from day one thanks to savings.',
    icon: 'mdi:trending-down',
    accent: 'var(--savings-green)',
  },
];

export const financingPartners = [
  { name: 'SBI', logo: 'https://placehold.co/160x60?text=SBI' },
  { name: 'HDFC Bank', logo: 'https://placehold.co/160x60?text=HDFC+Bank' },
  { name: 'ICICI Bank', logo: 'https://placehold.co/160x60?text=ICICI+Bank' },
  { name: 'Canara Bank', logo: 'https://placehold.co/160x60?text=Canara+Bank' },
  { name: 'Union Bank', logo: 'https://placehold.co/160x60?text=Union+Bank' },
];

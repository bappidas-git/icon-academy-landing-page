export const centralSubsidy = {
  name: 'PM Surya Ghar: Muft Bijli Yojana',
  tagline: 'India\'s flagship rooftop solar subsidy — launched Feb 2024.',
  image: 'https://placehold.co/800x400?text=PM+Surya+Ghar+Subsidy+Scheme',
  tiers: [
    { size: '1 kW', subsidy: '₹30,000' },
    { size: '2 kW', subsidy: '₹60,000' },
    { size: '3 kW+', subsidy: '₹78,000 (cap)' },
  ],
  highlights: [
    'Direct bank transfer to your account',
    'Applies to every homeowner across India',
    'Anvil files the paperwork for you — free',
  ],
};

export const stateData = [
  {
    state: 'Assam',
    accent: 'var(--region-assam)',
    icon: 'mdi:map-marker',
    image: 'https://placehold.co/600x360?text=Assam+Rooftop+Solar+Savings',
    avgBill: '₹ 3,500 – ₹ 6,000',
    avgSavings: '₹ 42,000 – ₹ 72,000 / year',
    subsidyNote: 'Full central subsidy (₹78,000) applies. APDCL net-metering supported.',
    climate: 'Ample sun 8–9 months. Monsoon adjusted for in our design.',
  },
  {
    state: 'Nagaland',
    accent: 'var(--region-nagaland)',
    icon: 'mdi:map-marker',
    image: 'https://placehold.co/600x360?text=Nagaland+Solar+Installation+Savings',
    avgBill: '₹ 2,500 – ₹ 5,000',
    avgSavings: '₹ 30,000 – ₹ 60,000 / year',
    subsidyNote: 'Central subsidy ₹78,000 plus Dept. of Power Nagaland net-metering.',
    climate: 'Hill terrain considered in mounting. Reliable supply = hybrid optional.',
  },
  {
    state: 'Odisha (Bhubaneswar)',
    accent: 'var(--region-odisha)',
    icon: 'mdi:map-marker',
    image: 'https://placehold.co/600x360?text=Bhubaneswar+Solar+Installation+Odisha',
    avgBill: '₹ 4,000 – ₹ 9,000',
    avgSavings: '₹ 48,000 – ₹ 1,08,000 / year',
    subsidyNote: 'Central subsidy ₹78,000. TPCODL / OEM DISCOMs support net-metering.',
    climate: 'Strong sun year-round. Payback often under 4 years.',
  },
];

export default { centralSubsidy, stateData };

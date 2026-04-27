/* ============================================
   solarMath
   Pure math helpers for the solar savings
   calculator. No React — safe to unit-test.
   ============================================ */

export const AVG_TARIFF_INR_PER_KWH = 8;
export const CUF = 0.18;                      // India-average capacity utilisation
export const CO2_PER_KWH_KG = 0.82;
export const PANEL_COST_INR_PER_KW = 55000;   // installed, pre-subsidy
export const SUBSIDY_PER_KW = 15000;
export const SUBSIDY_CAP_INR = 78000;

// Approx usable roof area per kW (sq ft). 1 kW ≈ 80 sq ft.
export const SQFT_PER_KW = 80;

export function calculateSystem({ monthlyBill, roofArea, sunHours }) {
  const monthlyKwhConsumed = monthlyBill / AVG_TARIFF_INR_PER_KWH;
  const dailyKwhConsumed = monthlyKwhConsumed / 30;
  const billKwSize = dailyKwhConsumed / sunHours / CUF;

  const roofKwSize = roofArea / SQFT_PER_KW;

  const systemKw = Math.max(1, Math.min(billKwSize, roofKwSize));
  const roundedKw = Math.round(systemKw * 10) / 10;

  const dailyGeneration = roundedKw * sunHours;
  const annualGeneration = dailyGeneration * 365;
  const monthlyGeneration = annualGeneration / 12;

  const monthlySavings = Math.min(monthlyBill, monthlyGeneration * AVG_TARIFF_INR_PER_KWH);
  const annualSavings = monthlySavings * 12;

  const grossCost = roundedKw * PANEL_COST_INR_PER_KW;
  const subsidy = Math.min(SUBSIDY_CAP_INR, roundedKw * SUBSIDY_PER_KW);
  const netCost = grossCost - subsidy;
  const paybackYears = annualSavings > 0 ? netCost / annualSavings : 0;

  const co2PerYearKg = annualGeneration * CO2_PER_KWH_KG;
  const savings25yr = annualSavings * 25 * 0.9;

  return {
    systemKw: roundedKw,
    monthlySavings: Math.round(monthlySavings),
    annualSavings: Math.round(annualSavings),
    paybackYears: Math.round(paybackYears * 10) / 10,
    co2PerYearKg: Math.round(co2PerYearKg),
    grossCost: Math.round(grossCost),
    subsidy: Math.round(subsidy),
    netCost: Math.round(netCost),
    savings25yr: Math.round(savings25yr),
  };
}

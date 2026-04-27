/* ============================================
   CalculatorOutput
   Dark energy-dashboard card that mirrors the
   live calculator outputs and drives the primary
   "Get My Detailed Quote" CTA.
   ============================================ */

import React, { useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import styles from './CalculatorOutput.module.css';

const formatINR = (n) => Number(n || 0).toLocaleString('en-IN');

const CalculatorOutput = ({ outputs, inputs, onGetQuote }) => {
  const {
    systemKw,
    monthlySavings,
    paybackYears,
    co2PerYearKg,
    netCost,
    savings25yr,
  } = outputs;

  const lakhs = useMemo(
    () => (savings25yr / 100000).toFixed(1),
    [savings25yr]
  );

  const co2Tonnes = useMemo(
    () => (co2PerYearKg / 1000).toFixed(1),
    [co2PerYearKg]
  );

  // Debounced announcement so screen readers aren't spammed while dragging sliders
  const [announcedSavings, setAnnouncedSavings] = useState(monthlySavings);
  useEffect(() => {
    const timer = setTimeout(() => setAnnouncedSavings(monthlySavings), 300);
    return () => clearTimeout(timer);
  }, [monthlySavings]);

  const handleGetQuote = () => {
    if (typeof onGetQuote !== 'function') return;
    onGetQuote({
      monthlyBill: inputs.monthlyBill,
      state: inputs.state,
      systemKw,
      monthlySavings,
      paybackYears,
    });
  };

  return (
    <div className={styles.panel}>
      <div className={styles.primary} aria-live="polite" aria-atomic="true">
        <div className={styles.primaryLabel}>You could save</div>
        <motion.div
          key={monthlySavings}
          className={styles.primaryValue}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          aria-hidden="true"
        >
          ₹ {formatINR(monthlySavings)}
        </motion.div>
        <span className="sr-only">
          You could save ₹{formatINR(announcedSavings)} every month.
        </span>
        <div className={styles.primarySub}>
          every month — ₹{lakhs} lakh over 25 years
        </div>
        <div className={styles.primaryCaption}>
          Based on ₹8/unit. Actual savings depend on your DISCOM tariff.
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.metric}>
          <Icon icon="mdi:solar-power" className={styles.metricIcon} aria-hidden="true" />
          <div className={styles.metricLabel}>System size</div>
          <div className={styles.metricValue}>{systemKw} kW</div>
        </div>

        <div className={styles.metric}>
          <Icon icon="mdi:cash-clock" className={styles.metricIcon} aria-hidden="true" />
          <div className={styles.metricLabel}>Payback period</div>
          <div className={styles.metricValue}>{paybackYears} years</div>
        </div>

        <div className={styles.metric}>
          <Icon icon="mdi:tag-outline" className={styles.metricIcon} aria-hidden="true" />
          <div className={styles.metricLabel}>Net cost after subsidy</div>
          <div className={styles.metricValue}>₹{formatINR(netCost)}</div>
        </div>

        <div className={styles.metric}>
          <Icon icon="mdi:leaf" className={styles.metricIcon} aria-hidden="true" />
          <div className={styles.metricLabel}>CO₂ offset / year</div>
          <div className={styles.metricValue}>{co2Tonnes} tonnes</div>
        </div>
      </div>

      <button
        type="button"
        className={styles.cta}
        onClick={handleGetQuote}
      >
        Get My Detailed Quote
        <Icon icon="mdi:arrow-right" aria-hidden="true" />
      </button>
    </div>
  );
};

export default CalculatorOutput;

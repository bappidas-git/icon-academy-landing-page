/* ============================================
   CalculatorInputs
   Three input groups (two sliders + one select)
   feeding the solar savings calculator.
   ============================================ */

import React, { useMemo } from 'react';
import {
  Slider,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { SUN_HOURS_BY_STATE } from '../../../hooks/useSolarCalculator';
import styles from './CalculatorInputs.module.css';

const STATE_OPTIONS = [
  'Assam',
  'Nagaland',
  'Odisha',
  'Delhi',
  'Karnataka',
  'Tamil Nadu',
  'Maharashtra',
  'Gujarat',
  'Rajasthan',
  'West Bengal',
  'Other',
];

const BILL_MARKS = [
  { value: 1000, label: '₹1k' },
  { value: 5000, label: '₹5k' },
  { value: 10000, label: '₹10k' },
  { value: 20000, label: '₹20k' },
];

const AREA_MARKS = [
  { value: 200, label: '200' },
  { value: 500, label: '500' },
  { value: 1000, label: '1k' },
  { value: 2000, label: '2k' },
];

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const CalculatorInputs = ({ inputs, setters }) => {
  const { monthlyBill, roofArea, state, sunHours } = inputs;
  const { setMonthlyBill, setRoofArea, setState } = setters;

  const billDisplay = useMemo(
    () => currencyFormatter.format(monthlyBill),
    [monthlyBill]
  );

  const areaDisplay = useMemo(
    () => `${roofArea.toLocaleString('en-IN')} sq ft`,
    [roofArea]
  );

  const resolvedSunHours =
    state === 'Other'
      ? SUN_HOURS_BY_STATE.Default
      : sunHours;

  return (
    <div className={styles.root}>
      {/* Monthly bill */}
      <div className={styles.group}>
        <div className={styles.labelRow}>
          <label className={styles.label} htmlFor="calc-monthly-bill">
            Monthly bill
          </label>
          <span className={styles.value}>{billDisplay}</span>
        </div>
        <Slider
          id="calc-monthly-bill"
          value={monthlyBill}
          onChange={(_, v) => setMonthlyBill(v)}
          min={500}
          max={25000}
          step={100}
          marks={BILL_MARKS}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => currencyFormatter.format(v)}
          aria-label="Monthly electricity bill in rupees"
          className={styles.slider}
        />
      </div>

      {/* Roof area */}
      <div className={styles.group}>
        <div className={styles.labelRow}>
          <label className={styles.label} htmlFor="calc-roof-area">
            Roof area (sq ft)
          </label>
          <span className={styles.value}>{areaDisplay}</span>
        </div>
        <Slider
          id="calc-roof-area"
          value={roofArea}
          onChange={(_, v) => setRoofArea(v)}
          min={100}
          max={3000}
          step={25}
          marks={AREA_MARKS}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v.toLocaleString('en-IN')} sq ft`}
          aria-label="Rooftop area in square feet"
          className={styles.slider}
        />
        <p className={styles.hint}>
          Not sure? Most Indian homes have 300–600 sq ft of usable roof.
        </p>
      </div>

      {/* State */}
      <div className={styles.group}>
        <div className={styles.labelRow}>
          <label className={styles.label} htmlFor="calc-state">
            Your state
          </label>
        </div>
        <FormControl fullWidth size="small">
          <Select
            id="calc-state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={styles.select}
            inputProps={{ 'aria-label': 'Your state' }}
          >
            {STATE_OPTIONS.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <span className={styles.sunPill}>
          <span aria-hidden="true">☀️</span>
          <span>~{resolvedSunHours} peak sun hours/day</span>
        </span>
      </div>
    </div>
  );
};

export default CalculatorInputs;

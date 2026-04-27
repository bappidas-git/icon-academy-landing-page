/* ============================================
   useSolarCalculator
   Encapsulates all state for the solar savings
   calculator and derives live outputs via
   solarMath.
   ============================================ */

import { useCallback, useMemo, useState } from 'react';
import { calculateSystem } from '../utils/solarMath';

export const SUN_HOURS_BY_STATE = {
  Assam: 4.8,
  Nagaland: 4.6,
  Odisha: 5.4,
  Delhi: 5.5,
  Karnataka: 5.6,
  'Tamil Nadu': 5.7,
  Maharashtra: 5.5,
  Gujarat: 5.8,
  Rajasthan: 6.0,
  'West Bengal': 4.9,
  Default: 5.2,
};

const DEFAULTS = {
  monthlyBill: 4000,
  roofArea: 400,
  state: 'Assam',
};

const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

const useSolarCalculator = () => {
  const [monthlyBill, setMonthlyBillState] = useState(DEFAULTS.monthlyBill);
  const [roofArea, setRoofAreaState] = useState(DEFAULTS.roofArea);
  const [state, setStateState] = useState(DEFAULTS.state);

  const setMonthlyBill = useCallback((n) => {
    setMonthlyBillState(clamp(Number(n) || 0, 500, 25000));
  }, []);

  const setRoofArea = useCallback((n) => {
    setRoofAreaState(clamp(Number(n) || 0, 100, 3000));
  }, []);

  const setState = useCallback((s) => {
    setStateState(s);
  }, []);

  const reset = useCallback(() => {
    setMonthlyBillState(DEFAULTS.monthlyBill);
    setRoofAreaState(DEFAULTS.roofArea);
    setStateState(DEFAULTS.state);
  }, []);

  const sunHours = useMemo(
    () => SUN_HOURS_BY_STATE[state] ?? SUN_HOURS_BY_STATE.Default,
    [state]
  );

  const inputs = useMemo(
    () => ({ monthlyBill, roofArea, state, sunHours }),
    [monthlyBill, roofArea, state, sunHours]
  );

  const setters = useMemo(
    () => ({ setMonthlyBill, setRoofArea, setState, reset }),
    [setMonthlyBill, setRoofArea, setState, reset]
  );

  const outputs = useMemo(
    () =>
      calculateSystem({
        monthlyBill: inputs.monthlyBill,
        roofArea: inputs.roofArea,
        sunHours: inputs.sunHours,
      }),
    [inputs.monthlyBill, inputs.roofArea, inputs.sunHours]
  );

  return { inputs, setters, outputs };
};

export default useSolarCalculator;

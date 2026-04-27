/* ============================================
   CalculatorSection
   Interactive solar savings calculator: inputs on
   the left, live output panel on the right.
   ============================================ */

import React, { useEffect, useRef } from 'react';
import Section from '../../common/Section';
import SectionHeading from '../../common/SectionHeading';
import CalculatorInputs from './CalculatorInputs';
import CalculatorOutput from './CalculatorOutput';
import useSolarCalculator from '../../../hooks/useSolarCalculator';
import { useModal } from '../../../context/ModalContext';
import { trackFunnelStep } from '../../../utils/leadEvents';
import styles from './CalculatorSection.module.css';

const CalculatorSection = () => {
  const { inputs, setters, outputs } = useSolarCalculator();
  const { openLeadDrawer } = useModal();

  // Expose a tiny bridge so other sections (e.g. SubsidiesSection) can
  // pre-select the calculator's state before scrolling here.
  useEffect(() => {
    window.__anvilCalc = { setState: setters.setState };
    return () => {
      if (window.__anvilCalc && window.__anvilCalc.setState === setters.setState) {
        delete window.__anvilCalc;
      }
    };
  }, [setters.setState]);

  // Debounced calculator interaction event — at most one per ~1.8s
  // while the user drags sliders or changes inputs. Skips the very
  // first render so mounting the section doesn't emit an event.
  const isFirstInteractionRef = useRef(true);
  useEffect(() => {
    if (isFirstInteractionRef.current) {
      isFirstInteractionRef.current = false;
      return undefined;
    }
    const t = setTimeout(() => {
      trackFunnelStep('calc_interaction', {
        monthlyBill: inputs.monthlyBill,
        roofArea: inputs.roofArea,
        state: inputs.state,
        systemKw: outputs.systemKw,
        monthlySavings: outputs.monthlySavings,
      });
    }, 1800);
    return () => clearTimeout(t);
  }, [inputs, outputs]);

  return (
    <Section id="calculator" variant="default" size="lg">
      <SectionHeading
        eyebrow="Solar Savings Calculator"
        title="See how much you'll save — in under 10 seconds."
        subtitle="Move the sliders. We'll show your savings, system size, and payback period live."
      />

      <div className={styles.grid}>
        <div className={styles.inputsCol}>
          <CalculatorInputs inputs={inputs} setters={setters} />
        </div>
        <div className={styles.outputCol}>
          <CalculatorOutput
            outputs={outputs}
            inputs={inputs}
            onGetQuote={(snapshot) =>
              openLeadDrawer({
                source: 'calculator',
                calculatorSnapshot: snapshot,
              })
            }
          />
        </div>
      </div>
    </Section>
  );
};

export default CalculatorSection;

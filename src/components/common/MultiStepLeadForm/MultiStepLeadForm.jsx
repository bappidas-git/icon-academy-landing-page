/* ============================================
   MultiStepLeadForm (shell)
   Three-step lead capture wizard. Wires the state
   machine, step indicator, step shell, and the
   success state. Step UIs (bill/state selectors,
   property questions, contact fields) each live in
   `./steps/`.
   ============================================ */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import StepIndicator from "./StepIndicator";
import StepShell from "./steps/StepShell";
import Step1BillRegion from "./steps/Step1BillRegion";
import Step2Property from "./steps/Step2Property";
import Step3Contact from "./steps/Step3Contact";
import useLeadFormMachine from "./useLeadFormMachine";
import styles from "./MultiStepLeadForm.module.css";

const STEP_LABELS = ["Your home", "Rooftop", "Contact"];

const variantClass = (variant) => {
  switch (variant) {
    case "dark":
      return styles.wrapperDark;
    case "drawer":
      return styles.wrapperDrawer;
    default:
      return styles.wrapperDefault;
  }
};

const MultiStepLeadForm = ({
  source = "hero",
  solution = null,
  calculatorSnapshot = null,
  variant = "default",
  submitButtonText = "Get My Free Savings Plan",
  onClose,
  onSuccess,
}) => {
  const navigate = useNavigate();
  const { state, actions } = useLeadFormMachine({
    source,
    solution,
    calculatorSnapshot,
  });

  const { step, isSubmitting, initialStepSkipped } = state;

  const handlePrimary = () => {
    if (step === 3) {
      actions.submit({ onSuccess, onClose });
    } else {
      actions.next();
    }
  };

  useEffect(() => {
    if (step === "success") {
      navigate("/thank-you");
    }
  }, [step, navigate]);

  if (step === "success") {
    return null;
  }

  const renderStepBody = () => {
    if (step === 1) {
      return (
        <StepShell
          stepKey="step-1"
          title="Quick question 1 of 3"
          subtitle="Tell us about your bill and location."
          legend="Step 1 of 3: Your bill and location"
          onPrimary={handlePrimary}
          showBack={false}
          primaryLabel="Continue"
          isSubmitting={isSubmitting}
        >
          <Step1BillRegion
            data={state.data}
            errors={state.errors}
            onChange={actions.setField}
          />
        </StepShell>
      );
    }

    if (step === 2) {
      const canBack = !initialStepSkipped;
      return (
        <StepShell
          stepKey="step-2"
          title="Quick question 2 of 3"
          subtitle="A little about your property so we get the design right."
          legend="Step 2 of 3: Your property details"
          onBack={canBack ? actions.back : undefined}
          showBack={canBack}
          onPrimary={handlePrimary}
          primaryLabel="Continue"
          isSubmitting={isSubmitting}
        >
          <Step2Property
            data={state.data}
            errors={state.errors}
            onChange={actions.setField}
          />
        </StepShell>
      );
    }

    if (step === 3) {
      return (
        <StepShell
          stepKey="step-3"
          title="Where should Anvil Saathi call you?"
          subtitle="Your details stay private — we'll only use them to send your plan."
          legend="Step 3 of 3: Your contact details"
          onBack={actions.back}
          onPrimary={handlePrimary}
          primaryLabel={submitButtonText}
          primaryIcon="mdi:calendar-check"
          isSubmitting={isSubmitting}
        >
          <Step3Contact
            data={state.data}
            errors={state.errors}
            context={state.context}
            onChange={actions.setField}
          />
        </StepShell>
      );
    }

    return null;
  };

  return (
    <div className={`${styles.wrapper} ${variantClass(variant)}`}>
      {initialStepSkipped && (
        <div className={styles.prefillPill} role="status">
          <Icon
            icon="mdi:check-circle"
            aria-hidden="true"
            className={styles.prefillPillIcon}
          />
          <span>Your answers from the calculator are saved.</span>
        </div>
      )}

      <div className={styles.indicatorWrap}>
        <StepIndicator current={step} total={3} labels={STEP_LABELS} />
      </div>

      <div className={styles.stepStage}>
        <AnimatePresence mode="wait" initial={false}>
          {renderStepBody()}
        </AnimatePresence>
      </div>

      <div className={styles.footerTrust}>
        <span>✓ 60-second form</span>
        <span>✓ Free, no obligation</span>
        <span>✓ WhatsApp friendly</span>
      </div>
    </div>
  );
};

export default MultiStepLeadForm;

/* ============================================
   MultiStepLeadForm (shell)
   Three-step lead capture wizard. Wires the state
   machine, step indicator, step shell, and the
   success state. Step UIs each live in `./steps/`.
   ============================================ */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import StepIndicator from "./StepIndicator";
import StepShell from "./steps/StepShell";
import Step1ProgramStream from "./steps/Step1ProgramStream";
import Step2Background from "./steps/Step2Background";
import Step3Contact from "./steps/Step3Contact";
import useLeadFormMachine from "./useLeadFormMachine";
import styles from "./MultiStepLeadForm.module.css";

const STEP_LABELS = ["Programme", "Background", "Contact"];

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
  variant = "default",
  submitButtonText = "Submit enquiry",
  onClose,
  onSuccess,
}) => {
  const navigate = useNavigate();
  const { state, actions } = useLeadFormMachine({
    source,
    solution,
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
          title="What programme do you want to study?"
          subtitle="Pick your preferred undergraduate programme — you can change your mind during counselling."
          legend="Step 1 of 3"
          onPrimary={handlePrimary}
          showBack={false}
          primaryLabel="Continue"
          isSubmitting={isSubmitting}
        >
          <Step1ProgramStream
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
          title="Tell us a bit about you"
          subtitle="Helps us share the right scholarship and counselling info."
          legend="Step 2 of 3"
          onBack={canBack ? actions.back : undefined}
          showBack={canBack}
          onPrimary={handlePrimary}
          primaryLabel="Continue"
          isSubmitting={isSubmitting}
        >
          <Step2Background
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
          title="Where should our admissions team call you?"
          subtitle="We'll review your enquiry and call within 24 hours."
          legend="Step 3 of 3"
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
          <span>Programme prefilled — verify and continue.</span>
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
        <span>🔒 100% confidential · 📞 Call within 24 hrs · ✅ Direct admissions support</span>
      </div>
    </div>
  );
};

export default MultiStepLeadForm;

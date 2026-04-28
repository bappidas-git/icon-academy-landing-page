/* ============================================
   MultiStepLeadForm (shell)
   Three-step lead capture wizard. Wires the state
   machine, step indicator, step shell, and the
   per-step bodies.

   Layout:
   - default / dark variants: indicator at top,
     inline footer with Back + Submit + privacy.
   - drawer variant: chrome-less. Step body fills
     the available height; the indicator + nav
     buttons sit in a sticky footer band so the
     drawer can host them above its viewport edge.
   ============================================ */

import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CircularProgress } from "@mui/material";
import { Icon } from "@iconify/react";
import StepIndicator from "./StepIndicator";
import StepShell from "./steps/StepShell";
import Step1ProgramStream from "./steps/Step1ProgramStream";
import Step2Background from "./steps/Step2Background";
import Step3Contact from "./steps/Step3Contact";
import useLeadFormMachine, { INITIAL_DATA } from "./useLeadFormMachine";
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

const STEP_COPY = {
  1: {
    title: "What programme do you want to study?",
    subtitle:
      "Pick your preferred undergraduate programme — you can change your mind during counselling.",
  },
  2: {
    title: "Tell us a bit about you",
    subtitle:
      "Helps us share the right scholarship and counselling info.",
  },
  3: {
    title: "Where should our admissions team call you?",
    subtitle: "We'll review your enquiry and call within 24 hours.",
  },
};

const isFormDirty = (data, baselineProgram) => {
  if (!data) return false;
  // Treat the form as dirty when any visible field differs from its initial.
  // The programme can be prefilled from the source/solution; only count
  // a *user* change against the baseline.
  if (data.program && data.program !== baselineProgram) return true;
  if (data.hsStream) return true;
  if (data.state) return true;
  if (data.passingYear) return true;
  if (data.cityOrTown && data.cityOrTown.trim()) return true;
  if (data.name && data.name.trim()) return true;
  if (data.mobile && data.mobile.trim()) return true;
  if (data.email && data.email.trim()) return true;
  if (data.consent) return true;
  return false;
};

const MultiStepLeadForm = ({
  source = "hero",
  solution = null,
  variant = "default",
  submitButtonText = "Submit enquiry",
  onClose,
  onSuccess,
  dirtyRef,
}) => {
  const navigate = useNavigate();
  const { state, actions } = useLeadFormMachine({
    source,
    solution,
  });

  const { step, isSubmitting, initialStepSkipped, data, errors, context } =
    state;

  // The programme that was prefilled (if any) — used as the dirty-check
  // baseline so a prefilled programme alone does not count as "edited".
  const baselineProgram = useMemo(() => {
    if (initialStepSkipped) return data.program;
    return INITIAL_DATA.program;
  }, [initialStepSkipped, data.program]);

  // Expose dirty state to parent (drawer) via ref so it can prompt before
  // dismissing. Updated synchronously on every render after data changes.
  useEffect(() => {
    if (dirtyRef && typeof dirtyRef === "object") {
      dirtyRef.current = isFormDirty(data, baselineProgram);
    }
  }, [data, baselineProgram, dirtyRef]);

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

  const stepCopy = STEP_COPY[step] || STEP_COPY[1];

  const canBack = step !== 1 && !(step === 2 && initialStepSkipped);
  const isFinalStep = step === 3;
  const primaryLabel = isFinalStep ? submitButtonText : "Next";
  const primaryIcon = isFinalStep ? "mdi:arrow-right-bold" : "mdi:arrow-right";

  // Submit gating: on step 3 the button is disabled until name + valid mobile
  // + consent are present. Other steps stay enabled — validation runs on click.
  const canSubmit = (() => {
    if (!isFinalStep) return true;
    const mobileOk = /^[6-9]\d{9}$/.test((data.mobile || "").trim());
    const nameOk = (data.name || "").trim().length >= 2;
    return Boolean(nameOk && mobileOk && data.consent);
  })();

  const submitTitle = (() => {
    if (!isFinalStep || canSubmit || isSubmitting) return undefined;
    return "Add your name, a valid 10-digit mobile, and tick the consent box to submit.";
  })();

  const renderStepBody = () => {
    if (step === 1) {
      return (
        <StepShell
          stepKey="step-1"
          title={stepCopy.title}
          subtitle={stepCopy.subtitle}
          legend="Step 1 of 3"
          isSubmitting={isSubmitting}
        >
          <Step1ProgramStream
            data={data}
            errors={errors}
            onChange={actions.setField}
          />
        </StepShell>
      );
    }
    if (step === 2) {
      return (
        <StepShell
          stepKey="step-2"
          title={stepCopy.title}
          subtitle={stepCopy.subtitle}
          legend="Step 2 of 3"
          isSubmitting={isSubmitting}
        >
          <Step2Background
            data={data}
            errors={errors}
            onChange={actions.setField}
          />
        </StepShell>
      );
    }
    if (step === 3) {
      return (
        <StepShell
          stepKey="step-3"
          title={stepCopy.title}
          subtitle={stepCopy.subtitle}
          legend="Step 3 of 3"
          isSubmitting={isSubmitting}
        >
          <Step3Contact
            data={data}
            errors={errors}
            context={context}
            onChange={actions.setField}
          />
        </StepShell>
      );
    }
    return null;
  };

  const isDrawer = variant === "drawer";

  return (
    <div className={`${styles.wrapper} ${variantClass(variant)}`}>
      {initialStepSkipped && step === 2 && (
        <div className={styles.prefillPill} role="status">
          <Icon
            icon="mdi:check-circle"
            aria-hidden="true"
            className={styles.prefillPillIcon}
          />
          <span>Programme prefilled — verify and continue.</span>
        </div>
      )}

      {!isDrawer && (
        <div className={styles.indicatorTop}>
          <StepIndicator current={step} total={3} labels={STEP_LABELS} />
        </div>
      )}

      <div className={styles.stepStage}>
        <AnimatePresence mode="wait" initial={false}>
          {renderStepBody()}
        </AnimatePresence>
      </div>

      <div
        className={`${styles.footer} ${
          isDrawer ? styles.footerDrawer : styles.footerInline
        }`}
      >
        <div className={styles.footerRow}>
          {isDrawer && (
            <div className={styles.footerIndicator}>
              <StepIndicator current={step} total={3} labels={STEP_LABELS} />
            </div>
          )}

          <div className={styles.footerNav}>
            {canBack ? (
              <button
                type="button"
                className={styles.backButton}
                onClick={actions.back}
                disabled={isSubmitting}
              >
                <Icon icon="mdi:arrow-left" aria-hidden="true" />
                <span>Back</span>
              </button>
            ) : null}

            <button
              type="button"
              className={styles.primaryButton}
              onClick={handlePrimary}
              disabled={isSubmitting || !canSubmit}
              aria-busy={isSubmitting || undefined}
              title={submitTitle}
            >
              {isSubmitting ? (
                <span className={styles.loadingState}>
                  <CircularProgress size={18} color="inherit" />
                  <span>Submitting…</span>
                </span>
              ) : (
                <>
                  <span>{primaryLabel}</span>
                  <Icon icon={primaryIcon} aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </div>

        <p className={styles.privacyLine}>
          By submitting, you agree to be contacted by Icon Commerce College
          about your admission enquiry.
        </p>
      </div>
    </div>
  );
};

export default MultiStepLeadForm;

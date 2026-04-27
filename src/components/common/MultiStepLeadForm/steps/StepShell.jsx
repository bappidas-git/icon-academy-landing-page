/* ============================================
   StepShell
   Wraps each step body with a horizontal slide
   transition and the shared bottom nav row.
   ============================================ */

import React from "react";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import { Icon } from "@iconify/react";
import Button from "../../Button/Button";
import useReducedMotion from "../../../../hooks/useReducedMotion";
import shellStyles from "../MultiStepLeadForm.module.css";

const slideVariants = {
  enter: { opacity: 0, x: 32 },
  centre: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -32 },
};

const fadeVariants = {
  enter: { opacity: 0 },
  centre: { opacity: 1 },
  exit: { opacity: 0 },
};

const StepShell = ({
  stepKey,
  title,
  subtitle,
  children,
  onBack,
  onPrimary,
  primaryLabel = "Continue",
  primaryIcon = "mdi:arrow-right",
  showBack = true,
  isSubmitting = false,
  legend,
}) => {
  const reduced = useReducedMotion();
  const variants = reduced ? fadeVariants : slideVariants;

  const bodyClassName = `${shellStyles.stepBody} ${
    isSubmitting ? shellStyles.stepBodySubmitting : ""
  }`.trim();

  return (
    <motion.div
      key={stepKey}
      className={shellStyles.stepShell}
      variants={variants}
      initial="enter"
      animate="centre"
      exit="exit"
      transition={{ duration: reduced ? 0.15 : 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <header className={shellStyles.stepHeader}>
        {title && <h3 className={shellStyles.stepTitle}>{title}</h3>}
        {subtitle && <p className={shellStyles.stepSubtitle}>{subtitle}</p>}
      </header>

      <fieldset
        className={bodyClassName}
        aria-busy={isSubmitting || undefined}
        disabled={isSubmitting}
      >
        {legend && <legend className="sr-only">{legend}</legend>}
        {children}
      </fieldset>

      <div className={shellStyles.stepNav}>
        {showBack ? (
          <button
            type="button"
            className={shellStyles.backButton}
            onClick={onBack}
            disabled={isSubmitting}
          >
            <Icon icon="mdi:arrow-left" aria-hidden="true" />
            <span>Back</span>
          </button>
        ) : (
          <span className={shellStyles.backSpacer} aria-hidden="true" />
        )}

        <Button
          type="button"
          variant="primary"
          onClick={onPrimary}
          disabled={isSubmitting}
          aria-busy={isSubmitting || undefined}
          className={shellStyles.primaryButton}
        >
          {isSubmitting ? (
            <span className={shellStyles.loadingState}>
              <CircularProgress size={18} color="inherit" />
              <span>Submitting...</span>
            </span>
          ) : (
            <>
              <span>{primaryLabel}</span>
              {primaryIcon && <Icon icon={primaryIcon} aria-hidden="true" />}
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default StepShell;

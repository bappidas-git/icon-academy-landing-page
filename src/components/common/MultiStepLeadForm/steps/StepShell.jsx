/* ============================================
   StepShell
   Presentational wrapper for each step body.
   Animates the step in from the right and out to
   the left (fades only under reduced motion). The
   actual Back / Next / Submit controls live in the
   form's footer band, not here.
   ============================================ */

import React from "react";
import { motion } from "framer-motion";
import useReducedMotion from "../../../../hooks/useReducedMotion";
import shellStyles from "../MultiStepLeadForm.module.css";

const slideVariants = {
  enter: { opacity: 0, x: 16 },
  centre: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
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
      transition={{
        duration: reduced ? 0.15 : 0.18,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {(title || subtitle) && (
        <header className={shellStyles.stepHeader}>
          {title && <h3 className={shellStyles.stepTitle}>{title}</h3>}
          {subtitle && <p className={shellStyles.stepSubtitle}>{subtitle}</p>}
        </header>
      )}

      <fieldset
        className={bodyClassName}
        aria-busy={isSubmitting || undefined}
        disabled={isSubmitting}
      >
        {legend && <legend className="sr-only">{legend}</legend>}
        {children}
      </fieldset>
    </motion.div>
  );
};

export default StepShell;

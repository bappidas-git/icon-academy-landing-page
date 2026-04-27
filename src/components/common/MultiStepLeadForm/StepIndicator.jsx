/* ============================================
   StepIndicator
   Three-pill progress bar for the multi-step lead form.
   Tween the underlying progress line with Framer Motion
   as the user advances.
   ============================================ */

import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import styles from "./StepIndicator.module.css";

const StepIndicator = ({ current, total = 3, labels = [] }) => {
  const activeIndex =
    current === "success" ? total : Math.min(Math.max(current, 1), total);

  const progressPct = total > 1 ? ((activeIndex - 1) / (total - 1)) * 100 : 0;

  return (
    <div
      className={styles.root}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={typeof current === "number" ? current : total}
      aria-label="Form progress"
      aria-valuetext={`Step ${activeIndex} of ${total}`}
    >
      <div className={styles.track}>
        <motion.div
          className={styles.fill}
          initial={false}
          animate={{ width: `${progressPct}%` }}
          transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <ol className={styles.pills}>
        {Array.from({ length: total }, (_, i) => {
          const stepNum = i + 1;
          const isComplete = stepNum < activeIndex;
          const isActive = stepNum === activeIndex && current !== "success";
          const stateClass = isComplete
            ? styles.pillComplete
            : isActive
              ? styles.pillActive
              : styles.pillPending;

          return (
            <li key={stepNum} className={`${styles.pill} ${stateClass}`}>
              <span className={styles.pillCircle}>
                {isComplete ? (
                  <Icon icon="mdi:check-bold" className={styles.checkIcon} />
                ) : (
                  stepNum
                )}
              </span>
              {labels[i] && (
                <span className={styles.pillLabel}>{labels[i]}</span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default StepIndicator;

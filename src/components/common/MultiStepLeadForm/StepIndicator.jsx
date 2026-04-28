/* ============================================
   StepIndicator
   Three-node progress chain for the multi-step
   lead form. Each node is a 28x28 circle showing
   the step number (or a check on completion).
   A saffron rule between nodes fills left-to-right
   as the user advances. Active node shows an indigo
   focus ring; future nodes use a neutral border.
   ============================================ */

import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import useReducedMotion from "../../../hooks/useReducedMotion";
import styles from "./StepIndicator.module.css";

const StepIndicator = ({ current, total = 3, labels = [] }) => {
  const reduced = useReducedMotion();

  const activeIndex =
    current === "success" ? total : Math.min(Math.max(current, 1), total);

  const segmentCount = total - 1;
  const completedSegments =
    current === "success" ? segmentCount : Math.max(activeIndex - 1, 0);
  const fillPct =
    segmentCount > 0 ? (completedSegments / segmentCount) * 100 : 0;

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
      <div className={styles.chain}>
        <div className={styles.rail} aria-hidden="true">
          <motion.span
            className={styles.railFill}
            initial={false}
            animate={{ width: `${fillPct}%` }}
            transition={{ duration: reduced ? 0 : 0.2, ease: "easeOut" }}
          />
        </div>

        <ol className={styles.nodes}>
          {Array.from({ length: total }, (_, i) => {
            const stepNum = i + 1;
            const isComplete =
              current === "success" || stepNum < activeIndex;
            const isActive =
              stepNum === activeIndex && current !== "success";
            const stateClass = isComplete
              ? styles.nodeComplete
              : isActive
                ? styles.nodeActive
                : styles.nodePending;

            return (
              <li key={stepNum} className={`${styles.node} ${stateClass}`}>
                <motion.span
                  className={styles.circle}
                  initial={false}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{
                    duration: reduced ? 0 : 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  aria-hidden="true"
                >
                  {isComplete ? (
                    <Icon icon="mdi:check-bold" className={styles.checkIcon} />
                  ) : (
                    <span className={styles.circleNumber}>{stepNum}</span>
                  )}
                </motion.span>
                {labels[i] && (
                  <span className={styles.label}>{labels[i]}</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default StepIndicator;

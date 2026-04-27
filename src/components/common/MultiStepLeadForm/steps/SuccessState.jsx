/* ============================================
   SuccessState
   Rendered in place of the step wizard once the
   lead has been submitted successfully.
   ============================================ */

import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import styles from "./SuccessState.module.css";

const WHATSAPP_HREF = "";
const CALL_HREF = "";

const NEXT_STEPS = [];

const SuccessState = ({ name }) => {
  const firstName = (name || "").trim().split(/\s+/)[0] || "there";

  return (
    <div className={styles.wrap}>
      <motion.span
        className={styles.icon}
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 12, stiffness: 220 }}
        aria-hidden="true"
      >
        <Icon icon="mdi:check-circle" style={{ fontSize: 64 }} />
      </motion.span>

      <h3 className={styles.title}>Thank you, {firstName}! 🎉</h3>
      <p className={styles.body}>__TBD_ICON_CONTENT__</p>

      <ul className={styles.steps}>
        {NEXT_STEPS.map((item) => (
          <li key={item.icon} className={styles.step}>
            <Icon icon={item.icon} aria-hidden="true" />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>

      <div className={styles.ctaRow}>
        <a
          className={`${styles.cta} ${styles.ctaPrimary}`}
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="mdi:whatsapp" aria-hidden="true" />
          <span>__TBD_ICON_CONTENT__</span>
        </a>
        <a
          className={`${styles.cta} ${styles.ctaSecondary}`}
          href={CALL_HREF}
        >
          <Icon icon="mdi:phone-outline" aria-hidden="true" />
          <span>__TBD_ICON_CONTENT__</span>
        </a>
      </div>
    </div>
  );
};

export default SuccessState;

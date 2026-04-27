/* ============================================
   SuccessState
   Rendered in place of the step wizard once the
   lead has been submitted successfully. Gives the
   user a visceral sense of completion and the two
   most useful next actions (WhatsApp / call).
   ============================================ */

import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import styles from "./SuccessState.module.css";

const WHATSAPP_HREF =
  "https://wa.me/911800202001?text=Hi%20Anvil%2C%20I%20just%20submitted%20my%20rooftop%20solar%20enquiry";
const CALL_HREF = "tel:+911800202001";

const NEXT_STEPS = [
  { icon: "mdi:phone-in-talk", label: "Anvil Saathi call within 24 hrs" },
  { icon: "mdi:file-pdf-box", label: "Personalised savings plan & quote" },
  {
    icon: "mdi:home-search-outline",
    label: "Free site visit scheduled at your convenience",
  },
];

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
      <p className={styles.body}>
        Your free savings plan is on the way. An Anvil Saathi will call you
        within 24 hours — they'll also send a WhatsApp summary and, once
        ready, your full PDF quote including subsidy & EMI options.
      </p>

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
          <span>Chat on WhatsApp</span>
        </a>
        <a
          className={`${styles.cta} ${styles.ctaSecondary}`}
          href={CALL_HREF}
        >
          <Icon icon="mdi:phone-outline" aria-hidden="true" />
          <span>Call 1800 2020 001</span>
        </a>
      </div>
    </div>
  );
};

export default SuccessState;

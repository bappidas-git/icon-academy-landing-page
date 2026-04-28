/* ============================================
   SuccessState
   Post-submit confirmation. Used as the body of
   the /thank-you page. Fires a brief confetti
   burst on mount (skipped under reduced motion),
   shows the masked mobile, and offers two CTAs:
   download a .vcf with the college's number, or
   jump back to the programmes section.
   ============================================ */

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import confetti from "canvas-confetti";
import useReducedMotion from "../../../../hooks/useReducedMotion";
import { COLLEGE_LOCATION } from "../../../../data/locationData";
import styles from "./SuccessState.module.css";

const maskMobile = (mobile) => {
  if (!mobile) return "";
  const digits = String(mobile).replace(/\D/g, "");
  if (digits.length < 10) return digits;
  const last10 = digits.slice(-10);
  return `${last10.slice(0, 5)} ${last10.slice(5, 7)}•••`;
};

const buildVCard = () => {
  const phone =
    (COLLEGE_LOCATION?.phone || "+91 0000000000").replace(/\s+/g, "");
  const email = COLLEGE_LOCATION?.email || "info@iconcommercecollege.in";
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Icon Commerce College Admissions",
    "ORG:Icon Commerce College",
    `TEL;TYPE=CELL,VOICE:${phone}`,
    `EMAIL;TYPE=INTERNET:${email}`,
    "END:VCARD",
  ];
  return lines.join("\r\n");
};

const SuccessState = ({ name, mobile, programsHref = "/#programs" }) => {
  const reduced = useReducedMotion();
  const firedRef = useRef(false);

  const firstName = (name || "").trim().split(/\s+/)[0] || "there";
  const masked = maskMobile(mobile);

  useEffect(() => {
    if (reduced) return undefined;
    if (firedRef.current) return undefined;
    firedRef.current = true;

    const colors = ["#D97706", "#F59E0B", "#1E3A8A", "#E11D48"];

    const burstA = confetti({
      particleCount: 90,
      spread: 70,
      startVelocity: 38,
      origin: { x: 0.5, y: 0.45 },
      colors,
      ticks: 90,
    });
    const burstB = confetti({
      particleCount: 50,
      spread: 110,
      startVelocity: 28,
      origin: { x: 0.5, y: 0.55 },
      colors,
      ticks: 80,
    });
    const timer = setTimeout(() => {
      // The library auto-cleans its canvas; nothing to do here.
    }, 700);

    return () => {
      clearTimeout(timer);
      if (burstA && typeof burstA.then !== "function") burstA?.cancel?.();
      if (burstB && typeof burstB.then !== "function") burstB?.cancel?.();
    };
  }, [reduced]);

  const handleSaveContact = () => {
    try {
      const blob = new Blob([buildVCard()], {
        type: "text/vcard;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "icon-commerce-college.vcf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 500);
    } catch (err) {
      console.error("[SuccessState] vCard download failed:", err);
    }
  };

  return (
    <div className={styles.wrap}>
      <motion.span
        className={styles.icon}
        initial={reduced ? false : { scale: 0, rotate: -20 }}
        animate={reduced ? undefined : { scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          damping: 14,
          stiffness: 220,
        }}
        aria-hidden="true"
      >
        <Icon icon="mdi:check-circle" />
      </motion.span>

      <h1 className={styles.title}>Thank you, {firstName}!</h1>
      <p className={styles.subline}>
        Our admissions team will call you on{" "}
        <strong>+91 {masked || "your number"}</strong> within 24 hours.
      </p>

      <div className={styles.ctaRow}>
        <button
          type="button"
          className={`${styles.cta} ${styles.ctaText}`}
          onClick={handleSaveContact}
        >
          <Icon icon="mdi:contacts-outline" aria-hidden="true" />
          <span>Save our number to contacts</span>
        </button>
        <a href={programsHref} className={`${styles.cta} ${styles.ctaPrimary}`}>
          <Icon icon="mdi:arrow-right-bold" aria-hidden="true" />
          <span>View Programmes</span>
        </a>
      </div>
    </div>
  );
};

export default SuccessState;

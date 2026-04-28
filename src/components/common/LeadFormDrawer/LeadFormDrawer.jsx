/* ============================================
   LeadFormDrawer
   Right-edge slide-in drawer (480px on desktop,
   full-width on mobile) hosting the multi-step
   lead form. Provides the header band, trust
   strip, scrollable body, and a dirty-state
   confirmation when the user attempts to close.
   The form itself owns its sticky footer (step
   indicator + nav buttons + privacy line).
   ============================================ */

import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import MultiStepLeadForm from "../MultiStepLeadForm";
import useReducedMotion from "../../../hooks/useReducedMotion";
import { showAlert } from "../../../utils/swalHelper";
import styles from "./LeadFormDrawer.module.css";

const TRUST_BADGES = [
  { icon: "mdi:lock-outline", label: "Confidential" },
  { icon: "mdi:clock-outline", label: "24 hr response" },
  { icon: "mdi:school-outline", label: "Direct ICC team" },
];

const LeadFormDrawer = ({
  isOpen,
  onClose,
  title = "Apply for 2026 Admissions",
  subtitle = "Two minutes — and our team will call within 24 hours.",
  source = "general",
  solution = null,
  onSubmitSuccess,
}) => {
  const reduced = useReducedMotion();
  const dirtyRef = useRef(false);

  const requestClose = useCallback(async () => {
    if (!dirtyRef.current) {
      onClose();
      return;
    }
    const result = await showAlert({
      icon: "warning",
      title: "Close this form?",
      text: "You have unsaved info — close anyway?",
      showCancelButton: true,
      confirmButtonText: "Close",
      cancelButtonText: "Keep editing",
      confirmButtonColor: "#E11D48",
      cancelButtonColor: "#1E3A8A",
      reverseButtons: true,
      focusCancel: true,
    });
    if (result?.isConfirmed) {
      dirtyRef.current = false;
      onClose();
    }
  }, [onClose]);

  // Reset dirty tracking each time the drawer is opened.
  useEffect(() => {
    if (isOpen) dirtyRef.current = false;
  }, [isOpen]);

  // ESC handler routes through requestClose so dirty prompt fires.
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleEscape = (event) => {
      if (event.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, requestClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) requestClose();
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.18 } },
  };

  const drawerVariants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.18 } },
        exit: { opacity: 0, transition: { duration: 0.18 } },
      }
    : {
        hidden: { x: "100%" },
        visible: {
          x: 0,
          transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
        },
        exit: {
          x: "100%",
          transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
        },
      };

  const drawerContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
        >
          <motion.aside
            className={styles.drawer}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-drawer-title"
          >
            <span className={styles.leftRule} aria-hidden="true" />

            <header className={styles.header}>
              <div className={styles.headerText}>
                <p className={styles.eyebrow}>
                  2026 ADMISSIONS · BY ICON COMMERCE COLLEGE
                </p>
                <h2 id="lead-drawer-title" className={styles.title}>
                  {title}
                </h2>
                {subtitle && (
                  <p className={styles.subtitle}>{subtitle}</p>
                )}
              </div>
              <IconButton
                className={styles.closeButton}
                onClick={requestClose}
                aria-label="Close form"
                size="medium"
              >
                <Icon icon="mdi:close" />
              </IconButton>
            </header>

            <div className={styles.trustStrip} aria-hidden="true">
              {TRUST_BADGES.map((badge) => (
                <span key={badge.label} className={styles.trustItem}>
                  <Icon icon={badge.icon} className={styles.trustIcon} />
                  <span>{badge.label}</span>
                </span>
              ))}
            </div>

            <div className={styles.body}>
              <MultiStepLeadForm
                source={source || "general"}
                solution={solution || null}
                variant="drawer"
                onClose={onClose}
                onSuccess={onSubmitSuccess}
                dirtyRef={dirtyRef}
              />
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(drawerContent, document.body);
};

export default LeadFormDrawer;

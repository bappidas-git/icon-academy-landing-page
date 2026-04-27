/* ============================================
   MobileDrawer Component
   Right-slide navigation drawer for Icon Commerce College.
   ============================================ */

import React, { useCallback, useEffect, useRef } from "react";
import { Drawer, Box, IconButton, Divider } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { trackPhoneClick, trackNavigation } from "../../../utils/gtm";
import { trackCtaClickEvent } from "../../../utils/leadEvents";
import { useModal } from "../../../context/ModalContext";
import { NAV_LINKS, PRIMARY_CTA, BRAND } from "../../../data/navigationData";
import styles from "./MobileDrawer.module.css";

const HEADER_OFFSET = 80;

const SALES_PHONE_DISPLAY = process.env.REACT_APP_SALES_PHONE || "";
const SALES_PHONE_TEL = (process.env.REACT_APP_SALES_PHONE || "").replace(/\s+/g, "");
const SALES_EMAIL = process.env.REACT_APP_SALES_EMAIL || "";

const SOCIAL_LINKS = [
  { id: "facebook", icon: "mdi:facebook", label: "Facebook", href: process.env.REACT_APP_FACEBOOK_URL },
  { id: "instagram", icon: "mdi:instagram", label: "Instagram", href: process.env.REACT_APP_INSTAGRAM_URL },
  { id: "linkedin", icon: "mdi:linkedin", label: "LinkedIn", href: process.env.REACT_APP_LINKEDIN_URL },
  { id: "youtube", icon: "mdi:youtube", label: "YouTube", href: process.env.REACT_APP_YOUTUBE_URL },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input:not([disabled]), [role="button"]:not([disabled])';

const MobileDrawer = ({ open, onClose, onOpen, onBookConsultation, activeSection = "" }) => {
  const { openLeadDrawer } = useModal();
  const drawerRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Note: onOpen retained for API compatibility with parent App.jsx wiring
  // (originally used by SwipeableDrawer); a hamburger trigger now controls open.
  void onOpen;

  // Focus trap + escape handling
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return undefined;
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // Move focus to close button when drawer opens
    const focusTimer = setTimeout(() => {
      if (closeBtnRef.current) closeBtnRef.current.focus();
    }, 50);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      clearTimeout(focusTimer);
    };
  }, [open, handleKeyDown]);

  const scrollToSection = (href) => {
    const targetId = href.replace(/^#/, "");
    const target = targetId ? document.getElementById(targetId) : null;
    if (!target) return;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  const handleNavClick = (link) => {
    trackNavigation("mobile_drawer", "click", link.label);
    onClose();
    setTimeout(() => scrollToSection(link.href), 60);
  };

  const handleApplyClick = () => {
    trackCtaClickEvent(PRIMARY_CTA.id, "mobile_drawer", PRIMARY_CTA.label);
    onClose();
    setTimeout(() => {
      if (typeof onBookConsultation === "function") {
        onBookConsultation();
      } else {
        openLeadDrawer({ source: PRIMARY_CTA.source });
      }
    }, 240);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.08 },
    },
    exit: { opacity: 0, transition: { staggerChildren: 0.02, staggerDirection: -1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 320, damping: 28 },
    },
    exit: { opacity: 0, x: 24, transition: { duration: 0.16 } },
  };

  const visibleSocials = SOCIAL_LINKS.filter((s) => !!s.href);

  return (
    <Drawer
      id="mobile-drawer"
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        className: styles.drawerPaper,
        ref: drawerRef,
        sx: { width: { xs: "88vw", sm: 380 }, maxWidth: 420 },
      }}
      transitionDuration={240}
      SlideProps={{
        easing: { enter: "cubic-bezier(0.16, 1, 0.3, 1)", exit: "cubic-bezier(0.16, 1, 0.3, 1)" },
      }}
      BackdropProps={{ className: styles.backdrop }}
    >
      <Box
        className={styles.drawerContent}
        role="dialog"
        aria-modal="true"
        aria-label={`${BRAND.name} navigation`}
      >
        {/* Header */}
        <Box className={styles.drawerHeader}>
          <Box className={styles.brandBlock}>
            <img
              src={BRAND.logoWide}
              alt={BRAND.name}
              className={styles.drawerLogo}
            />
            <p className={styles.drawerTagline}>{BRAND.tagline}</p>
          </Box>
          <IconButton
            ref={closeBtnRef}
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close navigation"
          >
            <Icon icon="mdi:close" />
          </IconButton>
        </Box>

        <Divider className={styles.divider} />

        {/* Nav Body */}
        <AnimatePresence mode="wait">
          {open && (
            <motion.nav
              aria-label="Mobile primary"
              className={styles.navList}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace(/^#/, "");
                const isActive = activeSection === sectionId;
                return (
                  <motion.button
                    key={link.id}
                    type="button"
                    variants={itemVariants}
                    className={`${styles.navItem} ${isActive ? styles.activeItem : ""}`}
                    onClick={() => handleNavClick(link)}
                  >
                    <span className={styles.navItemLabel}>{link.label}</span>
                    <Icon icon="mdi:chevron-right" className={styles.navItemChevron} />
                  </motion.button>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Footer */}
        <Box className={styles.drawerFooter}>
          <Divider className={styles.divider} />

          <Box className={styles.contactBlock}>
            {SALES_PHONE_TEL && (
              <a
                href={`tel:${SALES_PHONE_TEL}`}
                className={styles.contactItem}
                onClick={() => trackPhoneClick(SALES_PHONE_TEL, "mobile_drawer")}
              >
                <Icon icon="mdi:phone" />
                <span>{SALES_PHONE_DISPLAY || "Call us"}</span>
              </a>
            )}
            {SALES_EMAIL && (
              <a href={`mailto:${SALES_EMAIL}`} className={styles.contactItem}>
                <Icon icon="mdi:email-outline" />
                <span>{SALES_EMAIL}</span>
              </a>
            )}
          </Box>

          {visibleSocials.length > 0 && (
            <Box className={styles.socialRow} aria-label="Social media">
              {visibleSocials.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                >
                  <Icon icon={s.icon} />
                </a>
              ))}
            </Box>
          )}

          <button
            type="button"
            className={styles.applyCta}
            onClick={handleApplyClick}
          >
            <Icon icon="mdi:send" />
            <span>{PRIMARY_CTA.label}</span>
          </button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;

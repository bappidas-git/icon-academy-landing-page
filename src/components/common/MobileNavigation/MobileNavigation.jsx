/* ============================================
   MobileNavigation Component
   Bottom sticky tab bar — Icon Commerce College
   ============================================ */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { trackNavigation } from "../../../utils/gtm";
import { trackCtaClickEvent } from "../../../utils/leadEvents";
import { useModal } from "../../../context/ModalContext";
import { PRIMARY_CTA } from "../../../data/navigationData";
import styles from "./MobileNavigation.module.css";

const HEADER_OFFSET = 80;

const TABS = [
  { id: "home", label: "Home", icon: "mdi:home-outline", action: "scroll", target: "home" },
  { id: "programs", label: "Programmes", icon: "mdi:book-open-variant", action: "scroll", target: "programs" },
  { id: "apply", label: "Apply", icon: "mdi:send", action: "apply", primary: true },
  { id: "contact", label: "Contact", icon: "mdi:phone-outline", action: "scroll", target: "contact" },
];

const scrollToSection = (id) => {
  if (!id) return;
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const target = document.getElementById(id);
  if (!target) return;
  const elementPosition = target.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;
  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
};

const MobileNavigation = ({ onEnquiryClick }) => {
  const { openLeadDrawer } = useModal();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY && y > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleTabClick = (tab) => {
    setActiveId(tab.id);
    setTimeout(() => setActiveId(null), 280);

    if (tab.action === "apply") {
      trackCtaClickEvent(PRIMARY_CTA.id, "mobile_bottom_nav", PRIMARY_CTA.label);
      if (typeof onEnquiryClick === "function") {
        onEnquiryClick();
      } else {
        openLeadDrawer({ source: PRIMARY_CTA.source });
      }
      return;
    }
    trackNavigation("mobile_bottom_nav", "click", tab.label);
    scrollToSection(tab.target);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className={styles.mobileNav}
          role="navigation"
          aria-label="Primary mobile"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
        >
          <div className={styles.topBorder} />
          <div className={styles.navContainer}>
            {TABS.map((tab) => {
              const isActive = activeId === tab.id;
              const itemClass = `${styles.navItem} ${tab.primary ? styles.primaryItem : ""} ${isActive ? styles.active : ""}`;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={itemClass}
                  onClick={() => handleTabClick(tab)}
                  aria-label={tab.label}
                >
                  <span className={styles.navIconWrap}>
                    <Icon icon={tab.icon} className={styles.navIcon} />
                  </span>
                  <span className={styles.navLabel}>{tab.label}</span>
                </button>
              );
            })}
          </div>
          <div className={styles.safeAreaBackground} />
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigation;

/* ============================================
   Header Component
   Sticky top bar for Icon Commerce College.
   ============================================ */

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Icon } from "@iconify/react";
import { trackNavigation } from "../../../utils/gtm";
import { trackCtaClickEvent } from "../../../utils/leadEvents";
import { useModal } from "../../../context/ModalContext";
import { useScrolledPast } from "../../../hooks/useScrollPosition";
import { NAV_LINKS, PRIMARY_CTA, BRAND } from "../../../data/navigationData";
import styles from "./Header.module.css";

const HEADER_OFFSET = 80;
const SCROLL_SHADOW_THRESHOLD = 24;

const scrollToAnchor = (href) => {
  const targetId = href.replace(/^#/, "");
  const target = targetId ? document.getElementById(targetId) : null;
  if (!target) return false;

  const elementPosition = target.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;
  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  return true;
};

const Header = ({ forceCloseMenu = false, onMobileMenuToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const isScrolled = useScrolledPast(SCROLL_SHADOW_THRESHOLD);
  const [activeSection, setActiveSection] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openLeadDrawer } = useModal();

  useEffect(() => {
    if (forceCloseMenu && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [forceCloseMenu, isMobileMenuOpen]);

  // Scroll-spy for active section highlight (desktop)
  useEffect(() => {
    if (isMobile) return undefined;

    const handleSpy = () => {
      for (let i = NAV_LINKS.length - 1; i >= 0; i -= 1) {
        const id = NAV_LINKS[i].href.replace(/^#/, "");
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection(null);
    };

    window.addEventListener("scroll", handleSpy, { passive: true });
    handleSpy();
    return () => window.removeEventListener("scroll", handleSpy);
  }, [isMobile]);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    trackNavigation(isMobile ? "mobile_drawer" : "desktop_nav", "click", link.label);
    scrollToAnchor(link.href);
    setIsMobileMenuOpen(false);
  };

  const handleApplyClick = (e, location = "header") => {
    e.preventDefault();
    trackCtaClickEvent(PRIMARY_CTA.id, location, PRIMARY_CTA.label);
    openLeadDrawer({ source: PRIMARY_CTA.source });
    setIsMobileMenuOpen(false);
  };

  const handleHamburgerClick = () => {
    const next = !isMobileMenuOpen;
    trackNavigation("mobile_menu", next ? "open" : "close");
    setIsMobileMenuOpen(next);
    if (typeof onMobileMenuToggle === "function") {
      onMobileMenuToggle(next);
    }
  };

  return (
    <motion.header
      role="banner"
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Container maxWidth="xl" className={styles.headerContainer}>
        {/* Logo */}
        <div className={styles.logoSection}>
          <a
            href="/"
            className={styles.logoLink}
            aria-label={BRAND.name}
          >
            <img
              src={isMobile ? BRAND.logoCompact : BRAND.logoWide}
              alt={BRAND.name}
              className={styles.mainLogo}
            />
          </a>
          {!isMobile && (
            <span className={styles.eyebrow}>{BRAND.eyebrow}</span>
          )}
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className={styles.desktopNav} aria-label="Primary">
            <ul className={styles.navList}>
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace(/^#/, "");
                const isActive = activeSection === sectionId;
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* Right Section */}
        <div className={styles.rightSection}>
          {!isMobile && (
            <button
              type="button"
              className={styles.ctaButton}
              onClick={(e) => handleApplyClick(e, "header")}
            >
              {PRIMARY_CTA.label}
            </button>
          )}

          {isMobile && (
            <>
              <IconButton
                className={styles.mobileCtaIcon}
                onClick={(e) => handleApplyClick(e, "header_mobile")}
                aria-label={PRIMARY_CTA.label}
              >
                <Icon icon="mdi:send-circle-outline" />
              </IconButton>
              <IconButton
                className={styles.menuButton}
                onClick={handleHamburgerClick}
                aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-drawer"
              >
                <Icon
                  icon={isMobileMenuOpen ? "mdi:close" : "mdi:menu"}
                  className={styles.menuIcon}
                />
              </IconButton>
            </>
          )}
        </div>
      </Container>
    </motion.header>
  );
};

export default Header;

/* ============================================
   MobileDrawer Component
   Slide-up menu drawer for mobile navigation
   ============================================ */

import React, { useEffect, useCallback } from "react";
import {
  SwipeableDrawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { trackPhoneClick, trackWhatsAppClick } from "../../../utils/gtm";
import styles from "./MobileDrawer.module.css";

// Navigation menu items
const menuItems = [
  { id: "faq", label: "FAQs", icon: "mdi:help-circle-outline", href: "#faq" },
];

const SALES_PHONE_DISPLAY = process.env.REACT_APP_SALES_PHONE || "";
const SALES_PHONE_TEL = (process.env.REACT_APP_SALES_PHONE || "").replace(/\s+/g, "");
const WHATSAPP_NUMBER = (process.env.REACT_APP_WHATSAPP_NUMBER || "").replace(/[^\d]/g, "");

const SOCIAL_LINKS = [
  { id: "facebook", icon: "mdi:facebook", label: "Facebook", href: process.env.REACT_APP_FACEBOOK_URL },
  { id: "instagram", icon: "mdi:instagram", label: "Instagram", href: process.env.REACT_APP_INSTAGRAM_URL },
  { id: "youtube", icon: "mdi:youtube", label: "YouTube", href: process.env.REACT_APP_YOUTUBE_URL },
  { id: "linkedin", icon: "mdi:linkedin", label: "LinkedIn", href: process.env.REACT_APP_LINKEDIN_URL },
];

const MobileDrawer = ({ open, onClose, onOpen, onBookConsultation, activeSection = "home" }) => {
  // iOS detection for SwipeableDrawer optimization
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  // Handle escape key to close drawer
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [open, handleKeyDown]);

  // Handle menu item click
  const handleMenuClick = (item) => {
    // Store the target href before closing
    const targetHref = item.href;

    // Close drawer first
    onClose();

    // Reset body overflow immediately to enable scrolling
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";

    // Scroll after a brief delay to allow drawer close animation to start
    setTimeout(() => {
      const element = document.querySelector(targetHref);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 50);
  };

  // Animation variants for staggered menu items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Drawer content
  const drawerContent = (
    <Box
      className={styles.drawerContent}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Drawer Handle */}
      <div className={styles.drawerHandle}>
        <div className={styles.handleBar} />
      </div>

      {/* Header */}
      <Box className={styles.drawerHeader}>
        <Box className={styles.logoSection}>
          <img
            src="https://placehold.co/400x400?text=TBD+Logo"
            alt=""
            style={{ height: "32px", width: "auto" }}
          />
          <p className={styles.brandTagline}>__TBD_ICON_CONTENT__</p>
        </Box>
        <IconButton
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close menu"
        >
          <Icon icon="ic:baseline-close" />
        </IconButton>
      </Box>

      <Divider className={styles.divider} />

      {/* Navigation Menu */}
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <List className={styles.menuList}>
              {menuItems.map((item, index) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <ListItem disablePadding className={styles.menuItem}>
                    <ListItemButton
                      onClick={() => handleMenuClick(item)}
                      className={`${styles.menuButton} ${
                        activeSection === item.id ? styles.activeItem : ""
                      }`}
                      sx={{
                        borderRadius: "12px",
                        mx: 1,
                        mb: 0.5,
                        py: 1.5,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "rgba(255, 184, 0, 0.08)",
                        },
                      }}
                    >
                      <ListItemIcon
                        className={styles.menuIcon}
                        sx={{
                          minWidth: 44,
                          color:
                            activeSection === item.id
                              ? "var(--accent-gold)"
                              : "var(--text-gray)",
                        }}
                      >
                        <Icon icon={item.icon} style={{ fontSize: 22 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        className={styles.menuText}
                        sx={{
                          "& .MuiTypography-root": {
                            fontWeight: activeSection === item.id ? 600 : 500,
                            color:
                              activeSection === item.id
                                ? "var(--accent-gold)"
                                : "var(--text-dark-gray)",
                            fontSize: "0.95rem",
                          },
                        }}
                      />
                      {activeSection === item.id && (
                        <motion.div
                          className={styles.activeIndicator}
                          layoutId="activeIndicator"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                </motion.div>
              ))}
            </List>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Contact Info */}
      <Box className={styles.drawerFooter}>
        <Divider className={styles.divider} />
        <Box className={styles.contactInfo}>
          <Typography variant="caption" className={styles.contactLabel}>
            Get in Touch
          </Typography>

          {/* Contact Details */}
          <Box className={styles.contactDetails}>
            <a
              href={`tel:${SALES_PHONE_TEL}`}
              className={styles.contactDetailItem}
              onClick={() => trackPhoneClick(SALES_PHONE_TEL, 'mobile_drawer')}
            >
              <Icon icon="mdi:phone" style={{ color: 'var(--accent-orange)', fontSize: 18 }} />
              <span>{`Call ${SALES_PHONE_DISPLAY}`}</span>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              className={styles.contactDetailItem}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('mobile_drawer')}
            >
              <Icon icon="mdi:whatsapp" style={{ color: '#25D366', fontSize: 18 }} />
              <span>Chat on WhatsApp</span>
            </a>
          </Box>

          {/* Social Links */}
          <Box className={styles.socialLinks}>
            {SOCIAL_LINKS.filter((s) => !!s.href).map((social) => (
              <a
                key={social.id}
                href={social.href}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <Icon icon={social.icon} style={{ fontSize: 20 }} />
              </a>
            ))}
          </Box>

          {/* Book Your Free Call CTA */}
          <motion.button
            className={styles.bookConsultationCta}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              onClose();
              if (onBookConsultation) {
                setTimeout(() => onBookConsultation(), 300);
              }
            }}
          >
            <Icon icon="mdi:calendar-check" style={{ fontSize: 20 }} />
            <span>__TBD_ICON_CONTENT__</span>
          </motion.button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      swipeAreaWidth={30}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        className: styles.drawerPaper,
        sx: {
          borderRadius: "24px 24px 0 0",
          maxHeight: "85vh",
          overflow: "visible",
        },
      }}
      BackdropProps={{
        className: styles.backdrop,
      }}
    >
      {drawerContent}
    </SwipeableDrawer>
  );
};

export default MobileDrawer;

/* ============================================
   ThankYou Page
   Post lead submission confirmation page
   ============================================ */

import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import styles from "./ThankYou.module.css";
import { updatePageSEO } from "../../utils/seo";
import { seoConfig } from "../../config/seo";

const ThankYou = () => {
  const navigate = useNavigate();
  const [, setUserName] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const leadSubmitted = sessionStorage.getItem("lead_submitted");
    const name = sessionStorage.getItem("lead_name");

    if (!leadSubmitted) {
      navigate("/", { replace: true });
      return;
    }

    setIsAuthorized(true);
    setUserName(name || "there");

    updatePageSEO({
      title: seoConfig.pages.thankYou.title,
      description: seoConfig.pages.thankYou.description,
      url: seoConfig.siteUrl + '/thank-you',
      robots: 'noindex, nofollow',
    });

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'virtualPageview',
      pagePath: '/thank-you',
      pageTitle: 'Thank You',
    });
    window.dataLayer.push({
      event: 'lead_form_submission_complete',
      pagePath: '/thank-you',
    });

    const timeout = setTimeout(() => {
      sessionStorage.removeItem("lead_submitted");
      sessionStorage.removeItem("lead_name");
    }, 300000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 10000,
    };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#FFB800", "#FFC939", "#FFD700", "#FFA500"],
      });

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#FFB800", "#FFC939", "#FFD700", "#FFA500"],
      });
    }, 250);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FFB800", "#FFC939", "#FFD700", "#4CAF50", "#2196F3"],
    });
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      const timer = setTimeout(fireConfetti, 300);
      return () => clearTimeout(timer);
    }
  }, [isAuthorized, fireConfetti]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className={styles.thankYouPage}>
      <div className={styles.bgPattern} />
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />

      <Container maxWidth="md">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={styles.content}
        >
          <motion.div variants={itemVariants} className={styles.successCard}>
            <div className={styles.checkmark}>✓</div>
            <h1>__TBD_ICON_CONTENT__</h1>
            <p className={styles.subline}>__TBD_ICON_CONTENT__</p>
          </motion.div>

          <motion.section variants={itemVariants} className={styles.nextSteps}>
            <h2>__TBD_ICON_CONTENT__</h2>
            <ol>
              <li>__TBD_ICON_CONTENT__</li>
            </ol>
          </motion.section>

          <motion.div variants={itemVariants} className={styles.quickActions}>
            <a href="/" className={styles.secondaryAction}>
              🏠 Back to home
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.trustRow}>
            <span>__TBD_ICON_CONTENT__</span>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default ThankYou;

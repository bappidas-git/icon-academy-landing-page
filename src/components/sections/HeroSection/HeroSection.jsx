/* ============================================
   HeroSection — Icon Commerce College
   Above-the-fold admissions hero. Two-column
   60/40 layout on desktop, single-column stack
   on mobile. Cream gradient background, primary
   "Apply Now" CTA + secondary "Talk to a
   Counsellor" CTA, benefit chips, trust strip,
   hero visual with floating stats card and
   "Affiliated · Gauhati University" badge.
   ============================================ */

import React from "react";
import { motion } from "framer-motion";
import { Container, Typography, Button } from "@mui/material";
import { Icon } from "@iconify/react";
import { useModal } from "../../../context/ModalContext";
import AnimatedCounter from "../../common/AnimatedCounter/AnimatedCounter";
import Reveal from "../../common/Reveal/Reveal";
import useReducedMotion from "../../../hooks/useReducedMotion";
import styles from "./HeroSection.module.css";

const BENEFIT_CHIPS = [
  { icon: "mdi:school-outline", label: "Affiliated to Gauhati University" },
  { icon: "mdi:certificate-outline", label: "NEP 2020 aligned" },
  { icon: "mdi:account-group", label: "Mentor-led batches" },
  { icon: "mdi:trophy-outline", label: "Estd. 2004 · 20+ Years" },
];

const HERO_STATS = [
  { value: "98%", label: "Pass Rate" },
  { value: "4", label: "UG Programmes" },
  { value: "20+", label: "Years of Excellence" },
];

const TRUST_STRIP = [
  { icon: "🔒", text: "100% confidential" },
  { icon: "📞", text: "Call within 24 hrs" },
  { icon: "✅", text: "Direct admissions support" },
];

const HERO_IMG_DESKTOP =
  "https://placehold.co/720x720?text=Icon+Commerce+College+Campus";
const HERO_IMG_MOBILE = "https://placehold.co/720x540?text=ICC+Campus";

const HeroSection = ({ useVideo = false, videoSrc = "" }) => {
  const { openLeadDrawer } = useModal();
  const reduced = useReducedMotion();

  const visualInitial = reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 };
  const visualAnimate = { opacity: 1, y: 0 };

  return (
    <section
      id="hero"
      role="region"
      aria-label="Hero — Icon Commerce College admissions"
      className={styles.heroSection}
    >
      {/* Background layers */}
      <div className={styles.heroBackground} aria-hidden="true">
        <div className={styles.bgGradient} />
        <div className={styles.bgRadialGloss} />
        <div className={styles.bgMesh} />
      </div>

      {/* Optional hero video — boilerplate scaffolding, gated off by default */}
      {useVideo && videoSrc ? (
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}

      <Container maxWidth="xl" className={styles.heroContainer}>
        <div className={styles.heroLayout}>
          {/* === Left column === */}
          <div className={styles.heroContent}>
            <Reveal variant="slide-up" delay={0}>
              <span className={styles.eyebrow}>
                ADMISSIONS OPEN · 2026–27
              </span>
            </Reveal>

            <Reveal variant="slide-up" delay={100}>
              <Typography
                variant="h1"
                component="h1"
                className={styles.heroTitle}
              >
                Begin Your Career at Icon Commerce College
              </Typography>
            </Reveal>

            <Reveal variant="slide-up" delay={200}>
              <Typography
                variant="subtitle1"
                component="p"
                className={styles.heroSubtitle}
              >
                NEP 2020 aligned undergraduate programmes — B.Com, BBA, BCA,
                B.A. — affiliated to Gauhati University, Guwahati. 20+ years
                of nurturing future-ready graduates.
              </Typography>
            </Reveal>

            <Reveal variant="slide-up" delay={250}>
              <ul className={styles.benefitChips}>
                {BENEFIT_CHIPS.map((chip) => (
                  <li key={chip.label} className={styles.benefitChip}>
                    <Icon
                      icon={chip.icon}
                      className={styles.benefitChipIcon}
                      width={20}
                      height={20}
                      aria-hidden="true"
                    />
                    <span>{chip.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="slide-up" delay={300}>
              <div className={styles.ctaRow}>
                <Button
                  color="cta"
                  variant="contained"
                  size="large"
                  className={styles.primaryCta}
                  onClick={() => openLeadDrawer({ source: "hero_primary" })}
                >
                  Apply Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  className={styles.secondaryCta}
                  onClick={() =>
                    openLeadDrawer({ source: "hero_counsellor" })
                  }
                >
                  Talk to a Counsellor
                </Button>
              </div>
            </Reveal>

            <Reveal variant="fade" delay={400}>
              <ul className={styles.trustStrip}>
                {TRUST_STRIP.map((item) => (
                  <li key={item.text} className={styles.trustItem}>
                    <span aria-hidden="true">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* === Right column === */}
          <motion.div
            className={styles.heroVisualWrapper}
            initial={visualInitial}
            animate={visualAnimate}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <div className={styles.heroVisualCard}>
              <picture>
                <source media="(max-width: 767px)" srcSet={HERO_IMG_MOBILE} />
                <img
                  src={HERO_IMG_DESKTOP}
                  alt="Icon Commerce College campus"
                  className={styles.heroVisualImg}
                  loading="eager"
                  decoding="async"
                  width="720"
                  height="720"
                />
              </picture>

              <span className={styles.affiliatedBadge}>
                AFFILIATED · GAUHATI UNIVERSITY
              </span>
            </div>

            <div className={styles.statsCard}>
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className={styles.statsItem}>
                  <AnimatedCounter
                    value={stat.value}
                    label={stat.label}
                    color="dark"
                    duration={2}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;

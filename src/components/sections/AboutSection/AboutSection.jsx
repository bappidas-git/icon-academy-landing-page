/* ============================================
   AboutSection — Icon Commerce College
   Modern, centered institutional story. Header band
   with eyebrow → H2 → concise lead → 4-stat strip.
   Single full-width campus image with a floating
   legacy badge. Three pillar cards in a clean row
   below. Closes with a centered CTA pair.
   Honours `prefers-reduced-motion`.
   ============================================ */

import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import { useModal } from '../../../context/ModalContext';
import Reveal from '../../common/Reveal/Reveal';
import useReducedMotion from '../../../hooks/useReducedMotion';
import styles from './AboutSection.module.css';

const STATS = [
  { icon: 'mdi:calendar-star', label: 'Estd. 2004' },
  { icon: 'mdi:school-outline', label: 'Gauhati University' },
  { icon: 'mdi:certificate-outline', label: 'NEP 2020 Aligned' },
  { icon: 'mdi:trophy-outline', label: '20+ Years of Legacy' },
];

const PILLARS = [
  {
    icon: 'mdi:school-outline',
    title: 'Academic Excellence',
    copy: 'Faculty pursuing Ph.D., NET, SLET — high pass percentages and GU merit-list ranks.',
  },
  {
    icon: 'mdi:account-heart-outline',
    title: 'Holistic Development',
    copy: 'Annual College Week, sports, debates, seminars and a vibrant campus culture.',
  },
  {
    icon: 'mdi:shield-check-outline',
    title: 'Student-First Culture',
    copy: 'Personal mentorship, strict anti-ragging, and transparent governance for every student.',
  },
];

const BUILDING_IMG = 'https://placehold.co/1280x640?text=Icon+Commerce+College+Campus';

const LEGACY_BADGES = [
  { value: '20+', label: 'Years of Academic Legacy' },
  { value: '2,500+', label: 'Students Trained' },
  { value: '4', label: 'NEP-Aligned UG Programmes' },
];

const AboutSection = () => {
  const { openLeadDrawer } = useModal();
  const reduced = useReducedMotion();

  const visualInitial = reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 };

  return (
    <section
      id="about"
      role="region"
      aria-label="About Icon Commerce College"
      className={styles.section}
    >
      <Container maxWidth="lg" className={styles.container}>
        {/* === Header === */}
        <header className={styles.header}>
          <Reveal variant="slide-up" delay={0}>
            <span className={styles.eyebrow}>ABOUT THE COLLEGE</span>
          </Reveal>

          <Reveal variant="slide-up" delay={50}>
            <Typography
              variant="h2"
              component="h2"
              className={styles.heading}
            >
              A Legacy of Quality Higher Education in Guwahati
            </Typography>
          </Reveal>

          <Reveal variant="slide-up" delay={100}>
            <Typography component="p" className={styles.lead}>
              Established in 2004, Icon Commerce College is one of Assam's most
              promising institutions — affiliated to Gauhati University and
              committed to nurturing future-ready graduates in Commerce, Arts,
              Business Administration, and Computer Applications.
            </Typography>
          </Reveal>
        </header>

        {/* === Stats strip === */}
        <Reveal variant="slide-up" delay={150}>
          <ul className={styles.statStrip} role="list">
            {STATS.map((stat) => (
              <li key={stat.label} className={styles.statItem}>
                <Icon
                  icon={stat.icon}
                  className={styles.statIcon}
                  width={20}
                  height={20}
                  aria-hidden="true"
                />
                <span className={styles.statLabel}>{stat.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* === Visual hero === */}
        <motion.div
          className={styles.visual}
          initial={visualInitial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className={styles.imageCard}>
            <img
              src={BUILDING_IMG}
              alt="Icon Commerce College campus"
              className={styles.buildingImg}
              width="1280"
              height="640"
              loading="lazy"
              decoding="async"
            />
            <ul className={styles.legacyBadgeRow} role="list">
              {LEGACY_BADGES.map((badge) => (
                <li key={badge.label} className={styles.legacyBadge}>
                  <span className={styles.legacyBadgeYear}>{badge.value}</span>
                  <span className={styles.legacyBadgeLabel}>{badge.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* === Pillars === */}
        <ul className={styles.pillarList} role="list">
          {PILLARS.map((pillar, index) => (
            <motion.li
              key={pillar.title}
              className={styles.pillarCard}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.45,
                ease: 'easeOut',
                delay: reduced ? 0 : index * 0.1,
              }}
            >
              <span className={styles.pillarIconWrap} aria-hidden="true">
                <Icon
                  icon={pillar.icon}
                  className={styles.pillarIcon}
                  width={24}
                  height={24}
                />
              </span>
              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <p className={styles.pillarCopy}>{pillar.copy}</p>
            </motion.li>
          ))}
        </ul>

        {/* === CTA === */}
        <Reveal variant="slide-up" delay={0}>
          <div className={styles.ctaRow}>
            <Button
              color="cta"
              variant="contained"
              size="large"
              className={styles.primaryCta}
              onClick={() => openLeadDrawer({ source: 'about_apply' })}
            >
              Apply for 2026 Admissions
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default AboutSection;

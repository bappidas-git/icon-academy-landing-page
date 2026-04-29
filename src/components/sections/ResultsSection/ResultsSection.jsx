/* ============================================
   ResultsSection — Icon Commerce College
   Surfaces academic credibility: Gauhati University
   merit-list mentions, pass percentages, and notable
   alumni outcomes. Four animated counters lead, three
   indigo-outline achievement badges follow, and a
   nine-card alumni rail (horizontal scroll on mobile,
   3x3 grid on desktop) closes with an Apply CTA bar.
   Numeric values are placeholders flagged via the
   `note` field on each stat — stakeholder edits the
   data file post-launch.
   ============================================ */

import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import { useModal } from '../../../context/ModalContext';
import Reveal from '../../common/Reveal/Reveal';
import AnimatedCounter from '../../common/AnimatedCounter/AnimatedCounter';
import {
  STAT_HIGHLIGHTS,
  ACHIEVEMENT_BADGES,
} from '../../../data/resultsData';
import styles from './ResultsSection.module.css';

const ResultsSection = () => {
  const { openLeadDrawer } = useModal();

  const handleApplyClick = () => {
    openLeadDrawer({ source: 'results_apply' });
  };

  return (
    <section
      id="results"
      role="region"
      aria-label="Results and achievements"
      className={styles.section}
    >
      <Container maxWidth="xl" className={styles.container}>
        <header className={styles.header}>
          <Reveal variant="slide-up" delay={0}>
            <span className={styles.eyebrow}>RESULTS &amp; ACHIEVEMENTS</span>
          </Reveal>

          <Reveal variant="slide-up" delay={50}>
            <Typography
              variant="h2"
              component="h2"
              className={styles.heading}
            >
              A Track Record That Speaks for Itself
            </Typography>
          </Reveal>

          <Reveal variant="slide-up" delay={100}>
            <Typography component="p" className={styles.subhead}>
              From Gauhati University merit lists to graduates leading at IDFC,
              SBI, IOC, IIT Guwahati and the courts — Icon Commerce College
              builds careers that last.
            </Typography>
          </Reveal>
        </header>

        {/* ===== Stat strip ===== */}
        <ul
          className={styles.statStrip}
          role="list"
          aria-label="Key performance highlights"
        >
          {STAT_HIGHLIGHTS.map((stat, index) => (
            <li key={stat.id} className={styles.statItem}>
              <Reveal variant="slide-up" delay={index * 60}>
                <article className={styles.statCard}>
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    color="dark"
                    duration={2}
                  />
                  <p className={styles.statLabel}>{stat.label}</p>
                  <p className={styles.statNote}>{stat.note}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* ===== Achievement badges ===== */}
        <ul
          className={styles.badgeRow}
          role="list"
          aria-label="Institutional achievements"
        >
          {ACHIEVEMENT_BADGES.map((badge, index) => (
            <li key={badge.id} className={styles.badgeItem}>
              <Reveal variant="slide-up" delay={index * 70}>
                <article className={styles.badgeCard}>
                  <span className={styles.badgeIcon} aria-hidden="true">
                    <Icon icon={badge.icon} width={32} height={32} />
                  </span>
                  <h3 className={styles.badgeTitle}>{badge.title}</h3>
                  <p className={styles.badgeBody}>{badge.body}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* ===== Apply CTA bar ===== */}
        <Reveal variant="slide-up" delay={0}>
          <div className={styles.ctaBar}>
            <Typography component="p" className={styles.ctaText}>
              Want to be the next ICC success story?
            </Typography>
            <Button
              color="cta"
              variant="contained"
              size="large"
              className={styles.ctaButton}
              onClick={handleApplyClick}
            >
              Apply Now
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default ResultsSection;

/* ============================================
   FeesSection — Icon Commerce College
   Transparent fee schedule for the four UG
   programmes. Header introduces the FY 2026 fees,
   FeesTable handles the data, and three callout
   strips (scholarships, payment, helpline) sit
   between the table and the bottom CTA pair.
   ============================================ */

import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';

import { useModal } from '../../../context/ModalContext';
import Reveal from '../../common/Reveal/Reveal';
import { FEE_CALLOUTS, FEE_BOTTOM_CTA } from '../../../data/feesData';
import FeesTable from './FeesTable';
import styles from './FeesSection.module.css';

const FeesSection = () => {
  const { openLeadDrawer } = useModal();

  const handleApplyClick = () => {
    openLeadDrawer({ source: FEE_BOTTOM_CTA.primarySource });
  };

  return (
    <section
      id="fees"
      role="region"
      aria-label="Fee structure for 2026"
      className={styles.section}
    >
      <Container maxWidth="xl" className={styles.container}>
        <header className={styles.header}>
          <Reveal variant="slide-up" delay={0}>
            <span className={styles.eyebrow}>FEE STRUCTURE 2026</span>
          </Reveal>

          <Reveal variant="slide-up" delay={50}>
            <Typography
              variant="h2"
              component="h2"
              className={styles.heading}
            >
              Transparent Fees, No Surprises
            </Typography>
          </Reveal>

          <Reveal variant="slide-up" delay={100}>
            <Typography component="p" className={styles.subhead}>
              Affordable, transparent admission and tuition fees across all
              four UG programmes — only Gauhati University fees apply on top.
            </Typography>
          </Reveal>
        </header>

        {/* ===== Fee table + disclaimers ===== */}
        <Reveal variant="slide-up" delay={0}>
          <FeesTable />
        </Reveal>

        {/* ===== Callout strips ===== */}
        <ul
          className={styles.callouts}
          role="list"
          aria-label="Fee help and scholarship information"
        >
          {FEE_CALLOUTS.map((item, index) => (
            <li
              key={item.id}
              className={`${styles.calloutItem} ${styles[`tone-${item.tone}`]}`}
            >
              <Reveal variant="slide-up" delay={index * 60}>
                <div className={styles.calloutCard}>
                  <span className={styles.calloutIconWrap} aria-hidden="true">
                    <Icon
                      icon={item.icon}
                      width={20}
                      height={20}
                      className={styles.calloutIcon}
                    />
                  </span>
                  <span className={styles.calloutText}>{item.text}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* ===== Bottom CTA pair ===== */}
        <Reveal variant="slide-up" delay={0}>
          <div className={styles.bottomCta}>
            <Button
              color="cta"
              variant="contained"
              size="large"
              className={styles.primaryButton}
              onClick={handleApplyClick}
            >
              {FEE_BOTTOM_CTA.primaryLabel}
            </Button>
            <Button
              variant="text"
              size="large"
              href={FEE_BOTTOM_CTA.secondaryHref}
              className={styles.secondaryButton}
            >
              {FEE_BOTTOM_CTA.secondaryLabel}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default FeesSection;

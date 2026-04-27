/* ============================================
   WhyIconSection — Icon Commerce College
   Twelve scannable USP cards (icon + headline +
   supporting line) mapped 1:1 to prospectus
   differentiators. Closes with a soft re-engagement
   CTA bar (Apply / Schedule Visit). 3/2/1 column
   responsive grid; honours `prefers-reduced-motion`.
   ============================================ */

import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import { useModal } from '../../../context/ModalContext';
import Reveal from '../../common/Reveal/Reveal';
import useReducedMotion from '../../../hooks/useReducedMotion';
import { WHY_ICON_USPS } from '../../../data/whyIconData';
import styles from './WhyIconSection.module.css';

const EASE = [0.25, 0.46, 0.45, 0.94];

const WhyIconSection = () => {
  const { openLeadDrawer } = useModal();
  const reduced = useReducedMotion();

  const cardInitial = reduced
    ? { opacity: 1, y: 0, rotate: 0 }
    : { opacity: 0, y: 16, rotate: -2 };
  const cardAnimate = { opacity: 1, y: 0, rotate: 0 };

  return (
    <section
      id="why-icon"
      role="region"
      aria-label="Why choose Icon Commerce College"
      className={styles.section}
    >
      <Container maxWidth="xl" className={styles.container}>
        <header className={styles.header}>
          <Reveal variant="slide-up" delay={0}>
            <span className={styles.eyebrow}>WHY ICON COMMERCE COLLEGE</span>
          </Reveal>

          <Reveal variant="slide-up" delay={50}>
            <Typography
              variant="h2"
              component="h2"
              className={styles.heading}
            >
              Twelve Reasons Students &amp; Parents Choose Us
            </Typography>
          </Reveal>

          <Reveal variant="slide-up" delay={100}>
            <Typography component="p" className={styles.subhead}>
              Two decades of teaching, mentoring, and shaping careers in
              Guwahati and the North-East.
            </Typography>
          </Reveal>
        </header>

        <ul className={styles.grid} role="list">
          {WHY_ICON_USPS.map((usp, index) => (
            <motion.li
              key={usp.id}
              className={styles.card}
              tabIndex={0}
              initial={cardInitial}
              whileInView={cardAnimate}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                ease: EASE,
                delay: reduced ? 0 : index * 0.04,
              }}
            >
              <span className={styles.iconBadge} aria-hidden="true">
                <Icon
                  icon={usp.icon}
                  width={32}
                  height={32}
                  aria-hidden="true"
                />
              </span>
              <h3 className={styles.cardTitle}>{usp.title}</h3>
              <p className={styles.cardBody}>{usp.body}</p>
            </motion.li>
          ))}
        </ul>

        <Reveal variant="slide-up" delay={0}>
          <div className={styles.ctaBar}>
            <Typography
              variant="h4"
              component="h3"
              className={styles.ctaHeading}
            >
              Make Icon Commerce College your launchpad.
            </Typography>
            <div className={styles.ctaActions}>
              <Button
                color="cta"
                variant="contained"
                size="large"
                className={styles.primaryCta}
                onClick={() => openLeadDrawer({ source: 'why_apply' })}
              >
                Apply Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                className={styles.secondaryCta}
                onClick={() => openLeadDrawer({ source: 'why_visit' })}
              >
                Schedule a Campus Visit
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default WhyIconSection;

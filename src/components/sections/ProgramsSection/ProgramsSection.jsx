/* ============================================
   ProgramsSection — Icon Commerce College
   Surfaces the four NEP 2020 undergraduate
   programmes (B.Com, BBA, BCA, B.A.) as the
   page's primary conversion block. 2x2 grid on
   desktop, single column on mobile.
   ============================================ */

import React from 'react';
import { Container, Typography } from '@mui/material';
import Reveal from '../../common/Reveal/Reveal';
import { PROGRAMS } from '../../../data/programsData';
import ProgramCard from './ProgramCard';
import styles from './ProgramsSection.module.css';

const ProgramsSection = () => {
  return (
    <section
      id="programs"
      role="region"
      aria-label="Programmes offered"
      className={styles.section}
    >
      <Container maxWidth="xl" className={styles.container}>
        <header className={styles.header}>
          <Reveal variant="slide-up" delay={0}>
            <span className={styles.eyebrow}>OUR PROGRAMMES</span>
          </Reveal>

          <Reveal variant="slide-up" delay={50}>
            <Typography
              variant="h2"
              component="h2"
              className={styles.heading}
            >
              Choose the Path That Fits Your Future
            </Typography>
          </Reveal>

          <Reveal variant="slide-up" delay={100}>
            <Typography component="p" className={styles.subhead}>
              Four NEP 2020 aligned undergraduate programmes — 3 / 4 years,
              affiliated to Gauhati University. Pick a track and apply via
              the Samarth portal (Code: 842).
            </Typography>
          </Reveal>
        </header>

        <ul className={styles.grid} role="list">
          {PROGRAMS.map((program, index) => (
            <li key={program.id} className={styles.gridItem}>
              <Reveal variant="slide-up" delay={index * 80}>
                <ProgramCard program={program} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default ProgramsSection;

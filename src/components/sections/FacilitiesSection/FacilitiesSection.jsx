/* ============================================
   FacilitiesSection — Icon Commerce College
   Visual gallery of campus facilities (library,
   computer lab, smart classrooms, online classes,
   canteen, drinking water). 3 / 2 / 1 column
   responsive grid; closes with a soft callout
   strip pointing to a campus-visit CTA.
   ============================================ */

import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useModal } from '../../../context/ModalContext';
import Reveal from '../../common/Reveal/Reveal';
import { FACILITIES } from '../../../data/facilitiesData';
import FacilityCard from './FacilityCard';
import styles from './FacilitiesSection.module.css';

const FacilitiesSection = () => {
  const { openLeadDrawer } = useModal();

  const handleVisitClick = () => {
    openLeadDrawer({ source: 'facilities_visit' });
  };

  return (
    <section
      id="facilities"
      role="region"
      aria-label="Infrastructure and facilities"
      className={styles.section}
    >
      <Container maxWidth="xl" className={styles.container}>
        <header className={styles.header}>
          <Reveal variant="slide-up" delay={0}>
            <span className={styles.eyebrow}>
              INFRASTRUCTURE &amp; FACILITIES
            </span>
          </Reveal>

          <Reveal variant="slide-up" delay={50}>
            <Typography
              variant="h2"
              component="h2"
              className={styles.heading}
            >
              Built for Learning, Inside and Outside the Classroom
            </Typography>
          </Reveal>

          <Reveal variant="slide-up" delay={100}>
            <Typography component="p" className={styles.subhead}>
              From a curated library to smart classrooms to online learning —
              every facility is designed to support how today's students
              actually study.
            </Typography>
          </Reveal>
        </header>

        <ul
          className={styles.grid}
          role="list"
          aria-label="Campus facilities"
        >
          {FACILITIES.map((facility, index) => (
            <li key={facility.id} className={styles.gridItem}>
              <Reveal variant="slide-up" delay={index * 60}>
                <FacilityCard facility={facility} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal variant="slide-up" delay={0}>
          <div className={styles.calloutStrip}>
            <Typography component="p" className={styles.calloutHeadline}>
              Want to see the campus in person?
            </Typography>
            <Button
              color="cta"
              variant="contained"
              size="large"
              className={styles.calloutButton}
              onClick={handleVisitClick}
            >
              Schedule a Campus Visit
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default FacilitiesSection;

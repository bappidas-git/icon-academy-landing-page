/* ============================================
   FacultySection — Icon Commerce College
   Showcases leadership and a representative
   sample of teaching faculty with a department
   filter, an expand toggle past the first 8
   cards, a guest faculty strip, and a soft
   counsellor CTA.
   ============================================ */

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Typography, Button } from '@mui/material';
import { useModal } from '../../../context/ModalContext';
import Reveal from '../../common/Reveal/Reveal';
import useReducedMotion from '../../../hooks/useReducedMotion';
import {
  LEADERSHIP,
  FACULTY,
  GUEST_FACULTY,
  FACULTY_DEPARTMENTS,
} from '../../../data/facultyData';
import FacultyCard from './FacultyCard';
import styles from './FacultySection.module.css';

const EASE = [0.25, 0.46, 0.45, 0.94];
const DEFAULT_VISIBLE = 8;

const normalize = (value) =>
  (value || '').toLowerCase().replace(/[.\s/]/g, '');

const matchesFilter = (person, filter) => {
  if (filter === 'All') return true;
  const needle = normalize(filter);
  return (
    normalize(person.dept).includes(needle) ||
    normalize(person.role).includes(needle)
  );
};

const FacultySection = () => {
  const { openLeadDrawer } = useModal();
  const reduced = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const filteredFaculty = useMemo(
    () => FACULTY.filter((person) => matchesFilter(person, activeFilter)),
    [activeFilter]
  );

  const visibleFaculty = showAll
    ? filteredFaculty
    : filteredFaculty.slice(0, DEFAULT_VISIBLE);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setShowAll(false);
  };

  const handleCounsellorClick = () => {
    openLeadDrawer({ source: 'faculty_counsellor' });
  };

  const cardInitial = reduced ? false : { opacity: 0, y: 12 };
  const cardAnimate = reduced ? undefined : { opacity: 1, y: 0 };
  const cardExit = reduced ? undefined : { opacity: 0, y: -12 };

  return (
    <section
      id="faculty"
      role="region"
      aria-label="Faculty showcase"
      className={styles.section}
    >
      <Container maxWidth="xl" className={styles.container}>
        <header className={styles.header}>
          <Reveal variant="slide-up" delay={0}>
            <span className={styles.eyebrow}>MEET OUR EDUCATORS</span>
          </Reveal>

          <Reveal variant="slide-up" delay={50}>
            <Typography
              variant="h2"
              component="h2"
              className={styles.heading}
            >
              Faculty Who Mentor as Much as They Teach
            </Typography>
          </Reveal>

          <Reveal variant="slide-up" delay={100}>
            <Typography component="p" className={styles.subhead}>
              From Gauhati University to NET / SLET to Ph.D. — meet the team
              that brings two decades of teaching experience into every
              classroom.
            </Typography>
          </Reveal>
        </header>

        {/* ===== Leadership rail ===== */}
        <div className={styles.leadershipBlock}>
          <Reveal variant="slide-up" delay={0}>
            <h3 className={styles.subheading}>Leadership</h3>
          </Reveal>

          <ul
            className={styles.leadershipRail}
            role="list"
            aria-label="College leadership"
          >
            {LEADERSHIP.map((leader, index) => (
              <li key={leader.id} className={styles.leadershipItem}>
                <Reveal variant="slide-up" delay={index * 50}>
                  <FacultyCard person={leader} variant="leadership" />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== Faculty grid ===== */}
        <div className={styles.facultyBlock}>
          <Reveal variant="slide-up" delay={0}>
            <h3 className={styles.subheading}>Teaching Faculty</h3>
          </Reveal>

          <div
            className={styles.filterRow}
            role="tablist"
            aria-label="Filter faculty by department"
          >
            {FACULTY_DEPARTMENTS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.filterPill} ${isActive ? styles.filterPillActive : ''}`}
                  onClick={() => handleFilterClick(filter)}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {filteredFaculty.length === 0 ? (
            <p className={styles.emptyState}>
              No faculty currently listed under {activeFilter}.
            </p>
          ) : (
            <ul className={styles.facultyGrid} role="list">
              <AnimatePresence initial={false} mode="popLayout">
                {visibleFaculty.map((person) => (
                  <motion.li
                    key={person.id}
                    layout={!reduced}
                    className={styles.facultyItem}
                    initial={cardInitial}
                    animate={cardAnimate}
                    exit={cardExit}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <FacultyCard person={person} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}

          {filteredFaculty.length > DEFAULT_VISIBLE ? (
            <div className={styles.expandRow}>
              <Button
                variant="outlined"
                size="medium"
                className={styles.expandToggle}
                onClick={() => setShowAll((prev) => !prev)}
                aria-expanded={showAll}
              >
                {showAll
                  ? 'Show fewer'
                  : `Show all ${filteredFaculty.length} faculty`}
              </Button>
            </div>
          ) : null}
        </div>

        {/* ===== Guest faculty strip ===== */}
        <div className={styles.guestBlock}>
          <Reveal variant="slide-up" delay={0}>
            <h3 className={styles.subheading}>Guest Faculty</h3>
          </Reveal>

          <ul className={styles.guestGrid} role="list">
            {GUEST_FACULTY.map((guest, index) => (
              <li key={guest.id} className={styles.guestItem}>
                <Reveal variant="slide-up" delay={index * 60}>
                  <article className={styles.guestCard}>
                    <h4 className={styles.guestName}>{guest.name}</h4>
                    <p className={styles.guestRole}>{guest.role}</p>
                    <div className={styles.guestMeta}>
                      {guest.credentials ? (
                        <span className={styles.guestCredentials}>
                          {guest.credentials}
                        </span>
                      ) : null}
                      {guest.dept ? (
                        <span className={styles.guestDept}>{guest.dept}</span>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== Counsellor CTA ===== */}
        <Reveal variant="slide-up" delay={0}>
          <div className={styles.counsellorCta}>
            <Typography component="p" className={styles.counsellorText}>
              Have a question for our faculty? Talk to a counsellor.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={styles.counsellorButton}
              onClick={handleCounsellorClick}
            >
              Talk to a Counsellor
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default FacultySection;

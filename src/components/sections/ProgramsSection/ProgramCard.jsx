/* ============================================
   ProgramCard — Icon Commerce College
   Single programme card. Image header (4:3) with
   programme code + affiliation pill, content body
   with title, tagline, three meta rows, career
   chips, primary apply CTA, and an inline subject
   accordion (Framer Motion height animation).
   ============================================ */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@mui/material';
import { Icon } from '@iconify/react';
import { useModal } from '../../../context/ModalContext';
import useReducedMotion from '../../../hooks/useReducedMotion';
import styles from './ProgramCard.module.css';

const ProgramCard = ({ program }) => {
  const { openLeadDrawer } = useModal();
  const reduced = useReducedMotion();
  const [subjectsOpen, setSubjectsOpen] = useState(false);

  const titleId = `program-${program.id}-title`;
  const subjectsId = `program-${program.id}-subjects`;

  const handleApply = () => {
    openLeadDrawer({ source: program.apply.source });
  };

  return (
    <article
      className={styles.card}
      aria-labelledby={titleId}
      style={{ '--program-accent': program.accentColor }}
    >
      {/* Image header */}
      <div className={styles.imageHeader}>
        <span className={styles.accentStripe} aria-hidden="true" />
        <img
          src={program.image}
          alt={`${program.name} (${program.code}) at Icon Commerce College`}
          className={styles.image}
          width="600"
          height="400"
          loading="lazy"
          decoding="async"
        />
        <div className={styles.imageOverlay} aria-hidden="true" />
        <span className={styles.affiliationPill}>{program.affiliation}</span>
        <span className={styles.codeBadge}>{program.code}</span>
      </div>

      {/* Content body */}
      <div className={styles.body}>
        <h3 id={titleId} className={styles.title}>
          {program.name}
        </h3>
        <p className={styles.tagline}>{program.tagline}</p>

        <ul className={styles.metaList} role="list">
          <li className={styles.metaRow}>
            <Icon
              icon="mdi:clock-outline"
              className={styles.metaIcon}
              width={20}
              height={20}
              aria-hidden="true"
            />
            <div className={styles.metaText}>
              <span className={styles.metaLabel}>Duration</span>
              <span className={styles.metaValue}>{program.duration}</span>
            </div>
          </li>
          <li className={styles.metaRow}>
            <Icon
              icon="mdi:school-outline"
              className={styles.metaIcon}
              width={20}
              height={20}
              aria-hidden="true"
            />
            <div className={styles.metaText}>
              <span className={styles.metaLabel}>Eligibility</span>
              <span className={`${styles.metaValue} ${styles.metaValueClamp}`}>
                {program.eligibility}
              </span>
            </div>
          </li>
          <li className={styles.metaRow}>
            <Icon
              icon="mdi:cash"
              className={styles.metaIcon}
              width={20}
              height={20}
              aria-hidden="true"
            />
            <div className={styles.metaText}>
              <span className={styles.metaLabel}>Fee from</span>
              <span className={`${styles.metaValue} numeric`}>
                {program.feeSnapshot.admission} (1st sem) ·{' '}
                {program.feeSnapshot.tuition}
              </span>
            </div>
          </li>
        </ul>

        {/* Career chips */}
        <ul className={styles.chipList} role="list" aria-label="Career outcomes">
          {program.careerOutcomes.slice(0, 5).map((outcome) => (
            <li key={outcome} className={styles.chip}>
              {outcome}
            </li>
          ))}
        </ul>

        {/* Apply CTA */}
        <Button
          color="cta"
          variant="contained"
          fullWidth
          className={styles.applyCta}
          onClick={handleApply}
        >
          Apply for {program.code} →
        </Button>

        {/* View subjects toggle */}
        <Button
          variant="text"
          size="small"
          className={styles.subjectsToggle}
          onClick={() => setSubjectsOpen((open) => !open)}
          aria-expanded={subjectsOpen}
          aria-controls={subjectsId}
          endIcon={
            <Icon
              icon={subjectsOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'}
              width={18}
              height={18}
              aria-hidden="true"
            />
          }
        >
          {subjectsOpen ? 'Hide' : 'View'} core subjects (
          {program.coreSubjects.length})
        </Button>

        <AnimatePresence initial={false}>
          {subjectsOpen && (
            <motion.div
              key="subjects"
              id={subjectsId}
              className={styles.subjectsPanel}
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={reduced ? undefined : { height: 'auto', opacity: 1 }}
              exit={reduced ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ overflow: 'hidden' }}
            >
              <ul className={styles.subjectsList} role="list">
                {program.coreSubjects.map((subject) => (
                  <li key={subject} className={styles.subjectItem}>
                    <Icon
                      icon="mdi:check-circle-outline"
                      width={16}
                      height={16}
                      className={styles.subjectIcon}
                      aria-hidden="true"
                    />
                    {subject}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
};

export default ProgramCard;

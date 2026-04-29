/* ============================================
   LegalModal — Icon Commerce College
   Full-screen popup that renders Privacy Policy
   or Terms of Use content from src/data/legalContent.
   Triggered from the footer legal link nav.
   ============================================ */

import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IconButton } from '@mui/material';
import { Icon } from '@iconify/react';

import { LEGAL_CONTENT } from '../../../data/legalContent';
import styles from './LegalModal.module.css';

const LegalModal = ({ isOpen, onClose, type }) => {
  const content = type ? LEGAL_CONTENT[type] : null;

  const handleEscape = useCallback(
    (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } },
  };

  const panelVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 26, stiffness: 280 },
    },
    exit: { opacity: 0, y: 24, transition: { duration: 0.2 } },
  };

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && content && (
        <motion.div
          className={styles.backdrop}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
        >
          <motion.div
            className={styles.panel}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
          >
            <header className={styles.header}>
              <div className={styles.headerText}>
                <h2 id="legal-modal-title" className={styles.title}>
                  {content.title}
                </h2>
                {content.lastUpdated && (
                  <p className={styles.meta}>{content.lastUpdated}</p>
                )}
              </div>
              <IconButton
                className={styles.closeButton}
                onClick={onClose}
                aria-label={`Close ${content.title}`}
              >
                <Icon icon="mdi:close" width={24} height={24} />
              </IconButton>
            </header>

            <div className={styles.body}>
              <div className={styles.bodyInner}>
                {content.intro && (
                  <p className={styles.intro}>{content.intro}</p>
                )}
                {content.sections.map((section) => (
                  <section key={section.heading} className={styles.section}>
                    <h3 className={styles.sectionHeading}>{section.heading}</h3>
                    <p className={styles.sectionBody}>{section.body}</p>
                  </section>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default LegalModal;

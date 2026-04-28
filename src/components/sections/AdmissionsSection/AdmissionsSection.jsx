/* ============================================
   AdmissionsSection — Icon Commerce College
   Walks visitors through the four-step Samarth
   admission flow, surfaces College Code 842 with
   a copy-to-clipboard badge, lists required
   documents and key dates, and closes with a
   counsellor CTA.
   ============================================ */

import React, { useCallback, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';

import { useModal } from '../../../context/ModalContext';
import Reveal from '../../common/Reveal/Reveal';
import {
  ADMISSION_STEPS,
  REQUIRED_DOCS,
  KEY_DATES,
  ADMISSION_CTA,
  COLLEGE_CODE,
} from '../../../data/admissionsData';
import styles from './AdmissionsSection.module.css';

const AdmissionsSection = () => {
  const { openLeadDrawer } = useModal();
  const [copied, setCopied] = useState(false);

  const handleCounsellorClick = () => {
    openLeadDrawer({ source: ADMISSION_CTA.source });
  };

  const handleCopyCode = useCallback(async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(COLLEGE_CODE);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = COLLEGE_CODE;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  return (
    <section
      id="admissions"
      role="region"
      aria-label="How to apply — admission process"
      className={styles.section}
    >
      <Container maxWidth="xl" className={styles.container}>
        <header className={styles.header}>
          <Reveal variant="slide-up" delay={0}>
            <span className={styles.eyebrow}>HOW TO APPLY</span>
          </Reveal>

          <Reveal variant="slide-up" delay={50}>
            <Typography
              variant="h2"
              component="h2"
              className={styles.heading}
            >
              Your Admission to Icon Commerce College — In Four Simple Steps
            </Typography>
          </Reveal>

          <Reveal variant="slide-up" delay={100}>
            <Typography component="p" className={styles.subhead}>
              Apply through the Samarth Portal under College Code 842. Our
              counsellors are with you at every step.
            </Typography>
          </Reveal>
        </header>

        {/* ===== Stepper ===== */}
        <ol
          className={styles.stepper}
          role="list"
          aria-label="Admission process steps"
        >
          {ADMISSION_STEPS.map((step, index) => (
            <li key={step.id} className={styles.stepItem}>
              <Reveal variant="slide-up" delay={index * 80}>
                <article className={styles.stepCard}>
                  <div className={styles.stepHead}>
                    <span className={styles.numberTile} aria-hidden="true">
                      {step.number}
                    </span>
                    <span className={styles.stepIconWrap} aria-hidden="true">
                      <Icon
                        icon={step.icon}
                        width={24}
                        height={24}
                        className={styles.stepIcon}
                      />
                    </span>
                  </div>

                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepBody}>{step.body}</p>

                  {step.id === 'choose-icc' && (
                    <div className={styles.codeCallout}>
                      <div className={styles.codeText}>
                        <span className={styles.codeLabel}>College Code</span>
                        <span className={styles.codeNumber}>
                          {COLLEGE_CODE}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className={styles.copyButton}
                        aria-label={`Copy college code ${COLLEGE_CODE} to clipboard`}
                      >
                        <Icon
                          icon={copied ? 'mdi:check' : 'mdi:content-copy'}
                          width={18}
                          height={18}
                          aria-hidden="true"
                        />
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}

                  {step.cta && (
                    <a
                      className={styles.stepCta}
                      href={step.cta.href}
                      target={step.cta.external ? '_blank' : undefined}
                      rel={
                        step.cta.external ? 'noopener noreferrer' : undefined
                      }
                    >
                      {step.cta.label}
                    </a>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* ===== Required documents ===== */}
        <div className={styles.docsBlock}>
          <Reveal variant="slide-up" delay={0}>
            <h3 className={styles.subheading}>Documents you'll need</h3>
          </Reveal>

          <ul
            className={styles.docsGrid}
            role="list"
            aria-label="Required admission documents"
          >
            {REQUIRED_DOCS.map((doc, index) => (
              <li key={doc.id} className={styles.docItem}>
                <Reveal variant="slide-up" delay={index * 50}>
                  <div className={styles.docTile}>
                    <span className={styles.docIconWrap} aria-hidden="true">
                      <Icon
                        icon={doc.icon}
                        width={24}
                        height={24}
                        className={styles.docIcon}
                      />
                    </span>
                    <span className={styles.docLabel}>{doc.label}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== Key dates strip ===== */}
        <ul
          className={styles.datesStrip}
          role="list"
          aria-label="Key admission dates"
        >
          {KEY_DATES.map((item, index) => (
            <li key={item.id} className={styles.dateItem}>
              <Reveal variant="slide-up" delay={index * 60}>
                <div className={styles.dateTile}>
                  <span className={styles.dateLabel}>{item.label}</span>
                  <span className={styles.dateValue}>{item.value}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* ===== Bottom CTA strip ===== */}
        <Reveal variant="slide-up" delay={0}>
          <div className={styles.calloutStrip}>
            <Typography component="p" className={styles.calloutHeadline}>
              {ADMISSION_CTA.helpline}
            </Typography>
            <Button
              color="cta"
              variant="contained"
              size="large"
              className={styles.calloutButton}
              onClick={handleCounsellorClick}
            >
              {ADMISSION_CTA.buttonLabel}
            </Button>
          </div>
        </Reveal>

      </Container>
    </section>
  );
};

export default AdmissionsSection;

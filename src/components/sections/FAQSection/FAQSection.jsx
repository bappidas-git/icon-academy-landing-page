/* ============================================
   FAQSection — Icon Commerce College
   Addresses the highest-friction admission
   questions in a single-expand accordion. Reads
   live from `seoConfig.faqs` so visible content
   and the FAQPage JSON-LD schema cannot drift.
   First item opens by default; bottom CTA bar
   deflects unanswered questions to the
   admissions team via drawer or WhatsApp.
   ============================================ */

import React, { useState } from 'react';
import { Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Icon } from '@iconify/react';

import Section from '../../common/Section';
import SectionHeading from '../../common/SectionHeading';
import Reveal from '../../common/Reveal/Reveal';
import { useModal } from '../../../context/ModalContext';
import { FAQS } from '../../../data/faqData';
import styles from './FAQSection.module.css';

const WHATSAPP_NUMBER = (process.env.REACT_APP_WHATSAPP_NUMBER || '').replace(/[^0-9]/g, '');
const WHATSAPP_MESSAGE = 'Hi, I have a question about admissions to Icon Commerce College.';

const FAQSection = () => {
  const { openLeadDrawer } = useModal();
  const [expanded, setExpanded] = useState(0);

  const handleChange = (index) => (_event, isExpanded) => {
    setExpanded(isExpanded ? index : null);
  };

  const handleCounsellorClick = () => {
    openLeadDrawer({ source: 'faq_counsellor' });
  };

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <Section id="faq" variant="default" size="lg">
      <SectionHeading
        eyebrow="FREQUENTLY ASKED QUESTIONS"
        title="Everything You Need to Know — Before You Apply"
        subtitle="Got more questions? Talk to our admissions team and we'll walk you through the process."
      />

      <div className={styles.wrap}>
        {FAQS.map((item, index) => {
          const isOpen = expanded === index;
          const summaryId = `faq-${index}-summary`;
          const panelId = `faq-${index}-panel`;

          return (
            <Reveal key={item.q} delay={index * 40} className={styles.itemReveal}>
              <Accordion
                className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}
                expanded={isOpen}
                onChange={handleChange(index)}
                TransitionProps={{ timeout: 240 }}
              >
                <AccordionSummary
                  id={summaryId}
                  aria-controls={panelId}
                  className={styles.summary}
                  expandIcon={
                    <span
                      className={`${styles.indicator} ${isOpen ? styles.indicatorOpen : ''}`}
                      aria-hidden="true"
                    />
                  }
                >
                  <span className={styles.question}>{item.q}</span>
                </AccordionSummary>
                <AccordionDetails
                  id={panelId}
                  aria-labelledby={summaryId}
                  className={styles.details}
                >
                  <p className={styles.answer}>{item.a}</p>
                </AccordionDetails>
              </Accordion>
            </Reveal>
          );
        })}
      </div>

      <Reveal variant="slide-up" className={styles.bottomHelp}>
        <h3 className={styles.bottomHelpHeading}>Still have questions?</h3>
        <div className={styles.bottomHelpActions}>
          <Button
            color="cta"
            variant="contained"
            size="large"
            onClick={handleCounsellorClick}
            className={styles.counsellorBtn}
          >
            Talk to Counsellor
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={
              <Icon
                icon="mdi:whatsapp"
                width={20}
                height={20}
                className={styles.whatsappIcon}
                aria-hidden="true"
              />
            }
            className={styles.whatsappBtn}
          >
            WhatsApp Us
          </Button>
        </div>
      </Reveal>
    </Section>
  );
};

export default FAQSection;

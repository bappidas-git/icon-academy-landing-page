import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Section from '../../common/Section';
import SectionHeading from '../../common/SectionHeading';
import Reveal from '../../common/Reveal/Reveal';
import { useModal } from '../../../context/ModalContext';
import { faqData } from '../../../data/faqData';
import styles from './FAQSection.module.css';

const FAQItem = ({ item, index, defaultExpanded }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const summaryId = `faq-${index}-summary`;
  const panelId = `faq-${index}-panel`;

  return (
    <Accordion
      className={styles.item}
      defaultExpanded={defaultExpanded}
      onChange={(_, isExpanded) => setExpanded(isExpanded)}
    >
      <AccordionSummary
        id={summaryId}
        aria-controls={panelId}
        className={styles.question}
      >
        <span
          className={`${styles.plus} ${expanded ? styles.expanded : ''}`}
          aria-hidden="true"
        >
          +
        </span>
        <span>{item.q}</span>
      </AccordionSummary>
      <AccordionDetails
        id={panelId}
        aria-labelledby={summaryId}
        className={styles.answer}
      >
        {item.a}
      </AccordionDetails>
    </Accordion>
  );
};

const FAQSection = () => {
  const { openLeadDrawer } = useModal();

  const handleTalkToSaathi = () => {
    openLeadDrawer({ source: 'faq' });
  };

  return (
    <Section id="faq" variant="default" size="lg">
      <SectionHeading
        eyebrow="Common questions"
        title="Answered, honestly — no jargon."
        subtitle="Still unsure? Ask on WhatsApp: 1800 2020 001 — we reply within 10 minutes on weekdays."
      />

      <div className={styles.wrap}>
        {faqData.map((item, index) => (
          <Reveal key={item.q} delay={index * 60}>
            <FAQItem
              item={item}
              index={index}
              defaultExpanded={index === 0}
            />
          </Reveal>
        ))}
      </div>

      <div className={styles.bottomHelp}>
        <span className={styles.text}>Still have questions?</span>
        <button
          type="button"
          className={styles.btn}
          onClick={handleTalkToSaathi}
        >
          Talk to an Anvil Saathi
        </button>
      </div>
    </Section>
  );
};

export default FAQSection;

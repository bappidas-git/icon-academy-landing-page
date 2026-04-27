/* ============================================
   FinalCTASection
   Last section before Footer — a confident, dark-navy
   closing nudge with twin CTAs, a "what you get"
   checklist, and the multi-step lead form embedded
   inline on desktop.
   ============================================ */

import React from "react";
import { Icon } from "@iconify/react";
import Section from "../../common/Section";
import Reveal from "../../common/Reveal/Reveal";
import MultiStepLeadForm from "../../common/MultiStepLeadForm";
import styles from "./FinalCTASection.module.css";

const CHECKLIST = [
  "Free site visit + custom system design",
  "PM Surya Ghar subsidy ₹78,000 handled for you",
  "Zero-down-payment EMI from 7% p.a.",
  "25-year panel warranty · 10-year inverter warranty",
  "WhatsApp support 7 days a week",
];

const FinalCTASection = () => {
  return (
    <Section id="final-cta" variant="dark" size="lg">
      <div className={styles.grid}>
        <Reveal variant="slide-left" className={styles.left}>
          <span className={styles.eyebrow}>Ready to save?</span>
          <h2 className={styles.title}>
            Your free savings plan is 60 seconds away.
          </h2>
          <p className={styles.body}>
            Design, subsidy, financing, install, warranty — handled end-to-end
            by your dedicated Anvil Saathi. No surprises. No pushy sales. Just
            your next power bill that makes you smile.
          </p>

          <ul className={styles.checklist}>
            {CHECKLIST.map((item, index) => (
              <Reveal key={item} as="li" delay={index * 80} className={styles.checkItem}>
                <Icon
                  icon="mdi:check-circle"
                  aria-hidden="true"
                  className={styles.checkIcon}
                />
                <span>{item}</span>
              </Reveal>
            ))}
          </ul>

          <div className={styles.ctaRow}>
            <a href="tel:+911800202001" className={styles.ctaPrimary}>
              <Icon icon="mdi:phone-in-talk" aria-hidden="true" />
              <span>Talk to a Saathi now</span>
            </a>
            <a
              href="https://wa.me/911800202001"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaGhost}
            >
              <Icon icon="mdi:whatsapp" aria-hidden="true" />
              <span>WhatsApp 1800 2020 001</span>
            </a>
          </div>

          <p className={styles.reassure}>
            Free &amp; no obligation. 24-hour response guaranteed.
          </p>
        </Reveal>

        <Reveal variant="slide-up" className={styles.formWrap} delay={120}>
          <MultiStepLeadForm source="final-cta" variant="dark" />
        </Reveal>
      </div>
    </Section>
  );
};

export default FinalCTASection;

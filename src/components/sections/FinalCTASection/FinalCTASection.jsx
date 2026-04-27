/* ============================================
   FinalCTASection
   Last section before Footer — a confident, dark
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

const CHECKLIST = [];

const FinalCTASection = () => {
  return (
    <Section id="final-cta" variant="dark" size="lg">
      <div className={styles.grid}>
        <Reveal variant="slide-left" className={styles.left}>
          <span className={styles.eyebrow}>__TBD_ICON_CONTENT__</span>
          <h2 className={styles.title}>__TBD_ICON_CONTENT__</h2>
          <p className={styles.body}>__TBD_ICON_CONTENT__</p>

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
            <a href="#" className={styles.ctaPrimary}>
              <Icon icon="mdi:phone-in-talk" aria-hidden="true" />
              <span>__TBD_ICON_CONTENT__</span>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaGhost}
            >
              <Icon icon="mdi:whatsapp" aria-hidden="true" />
              <span>__TBD_ICON_CONTENT__</span>
            </a>
          </div>

          <p className={styles.reassure}>__TBD_ICON_CONTENT__</p>
        </Reveal>

        <Reveal variant="slide-up" className={styles.formWrap} delay={120}>
          <MultiStepLeadForm source="final-cta" variant="dark" />
        </Reveal>
      </div>
    </Section>
  );
};

export default FinalCTASection;

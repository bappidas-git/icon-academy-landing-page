/* ============================================
   FinalCTASection
   Last section before Footer — an indigo closing
   nudge with twin CTAs (Apply / WhatsApp) and the
   multi-step lead form embedded inline on desktop.
   ============================================ */

import React from "react";
import { Icon } from "@iconify/react";
import Section from "../../common/Section";
import Reveal from "../../common/Reveal/Reveal";
import MultiStepLeadForm from "../../common/MultiStepLeadForm";
import { useModal } from "../../../context/ModalContext";
import styles from "./FinalCTASection.module.css";

const WHATSAPP_NUMBER = (process.env.REACT_APP_WHATSAPP_NUMBER || "").replace(/[^0-9]/g, "");
const WHATSAPP_HREF = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}`
  : "https://wa.me/";

const FinalCTASection = () => {
  const { openLeadDrawer } = useModal();

  const handleApply = () => openLeadDrawer({ source: "final_cta_apply" });

  return (
    <Section
      id="final-cta"
      variant="dark"
      size="lg"
      className={styles.finalCta}
      aria-labelledby="final-cta-title"
    >
      <div className={styles.grid}>
        <Reveal variant="slide-left" className={styles.left}>
          <span className={styles.eyebrow}>READY TO START?</span>
          <h2 id="final-cta-title" className={styles.title}>
            Begin Your Career at Icon Commerce College
          </h2>
          <p className={styles.body}>
            Apply now via Samarth Portal (Code 842) — or talk to our admissions
            team for free counselling.
          </p>

          <div className={styles.ctaRow}>
            <button
              type="button"
              onClick={handleApply}
              className={styles.ctaPrimary}
            >
              <Icon icon="mdi:rocket-launch" aria-hidden="true" />
              <span>Apply Now</span>
            </button>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaGhost}
            >
              <Icon icon="mdi:whatsapp" aria-hidden="true" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          <p className={styles.reassure}>
            No obligation. Free admissions counselling. Response within 24 hours.
          </p>
        </Reveal>

        <Reveal variant="slide-up" className={styles.formWrap} delay={120}>
          <MultiStepLeadForm source="final_cta_apply" variant="dark" />
        </Reveal>
      </div>
    </Section>
  );
};

export default FinalCTASection;

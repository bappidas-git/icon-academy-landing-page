/* ============================================
   SubsidiesSection
   Central (PM Surya Ghar) subsidy showcase plus
   a 3-up state grid for Assam / Nagaland / Odisha
   with localised savings, subsidy note, and a
   CTA that pre-selects the calculator's state.
   ============================================ */

import React from 'react';
import { Icon } from '@iconify/react';
import Section from '../../common/Section';
import SectionHeading from '../../common/SectionHeading';
import Reveal from '../../common/Reveal/Reveal';
import { useModal } from '../../../context/ModalContext';
import { centralSubsidy, stateData } from '../../../data/subsidiesData';
import styles from './SubsidiesSection.module.css';

// Map data-facing state labels to the calculator's state select values.
const CALCULATOR_STATE_KEYS = {
  Assam: 'Assam',
  Nagaland: 'Nagaland',
  'Odisha (Bhubaneswar)': 'Odisha',
};

const SubsidiesSection = () => {
  const { openLeadDrawer } = useModal();

  const handleStateCalculate = (stateLabel) => {
    const targetId = 'calculator';
    const target = document.getElementById(targetId);
    const calcKey = CALCULATOR_STATE_KEYS[stateLabel] || stateLabel;

    if (window.__anvilCalc && typeof window.__anvilCalc.setState === 'function') {
      window.__anvilCalc.setState(calcKey);
    }

    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <Section id="subsidies" variant="default" size="lg">
      <SectionHeading
        eyebrow="Subsidies & savings"
        title="₹78,000 off your system — before you even see the sun."
        subtitle="Every Anvil install unlocks the PM Surya Ghar central subsidy plus local DISCOM net-metering. Here's exactly what that means in your state."
      />

      {/* Central subsidy showcase card */}
      <Reveal className={styles.central} threshold={0.2}>
        <div className={styles.centralMedia}>
          <img
            src={centralSubsidy.image}
            alt={centralSubsidy.name}
            className={styles.centralImage}
            loading="lazy"
            decoding="async"
            width="800"
            height="400"
          />
        </div>

        <div className={styles.centralBody}>
          <span className={styles.badge}>PM Surya Ghar</span>
          <h3 className={styles.centralTitle}>{centralSubsidy.name}</h3>
          <p className={styles.centralTagline}>{centralSubsidy.tagline}</p>

          <div className={styles.tiers} role="table" aria-label="Subsidy tiers">
            {centralSubsidy.tiers.map((tier) => (
              <div key={tier.size} className={styles.tier} role="row">
                <span className={styles.tierSize}>{tier.size}</span>
                <span className={styles.tierValue}>{tier.subsidy}</span>
              </div>
            ))}
          </div>

          <ul className={styles.highlights}>
            {centralSubsidy.highlights.map((item) => (
              <li key={item} className={styles.highlight}>
                <Icon
                  icon="mdi:check-circle"
                  className={styles.highlightIcon}
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={styles.centralCta}
            onClick={() => openLeadDrawer({ source: 'subsidy_card' })}
          >
            See my exact subsidy
            <Icon icon="mdi:arrow-right" aria-hidden="true" />
          </button>
        </div>
      </Reveal>

      {/* State grid */}
      <div className={styles.stateGrid}>
        {stateData.map((s, index) => (
          <Reveal key={s.state} delay={index * 80}>
            <article
              className={styles.stateCard}
              style={{ borderTopColor: s.accent }}
            >
              <img
                src={s.image}
                alt={`${s.state} rooftop solar`}
                className={styles.stateImage}
                loading="lazy"
                decoding="async"
                width="600"
                height="360"
              />
              <div className={styles.stateBody}>
                <h4 className={styles.stateName}>
                  <Icon icon={s.icon} aria-hidden="true" style={{ color: s.accent }} />
                  {s.state}
                </h4>

                <div className={styles.stateRow}>
                  <span>Avg. monthly bill</span>
                  <span>{s.avgBill}</span>
                </div>

                <div className={styles.stateRow}>
                  <span>Avg. annual savings</span>
                  <strong>{s.avgSavings}</strong>
                </div>

                <p className={styles.stateNote}>
                  <strong>Subsidies:</strong> {s.subsidyNote}
                </p>

                <p className={styles.stateNote}>
                  <strong>Local note:</strong> {s.climate}
                </p>

                <button
                  type="button"
                  className={styles.stateCta}
                  onClick={() => handleStateCalculate(s.state)}
                >
                  Calculate for my {s.state} home
                  <Icon icon="mdi:arrow-right" aria-hidden="true" />
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default SubsidiesSection;

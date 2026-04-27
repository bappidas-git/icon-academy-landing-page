/* ============================================
   FinancingSection
   Three EMI tiers, a "most popular" ribbon, and
   a bank-partner bar. Sits directly below the
   SubsidiesSection to answer the "can I afford
   it up front?" objection.
   ============================================ */

import React from 'react';
import { Icon } from '@iconify/react';
import Section from '../../common/Section';
import SectionHeading from '../../common/SectionHeading';
import Reveal from '../../common/Reveal/Reveal';
import { useModal } from '../../../context/ModalContext';
import { financingTiers, financingPartners } from '../../../data/financingData';
import styles from './FinancingSection.module.css';

const FinancingSection = () => {
  const { openLeadDrawer } = useModal();

  const handleApply = (tier) => {
    openLeadDrawer({
      source: 'financing',
      solution: `${tier.duration} EMI`,
    });
  };

  return (
    <Section id="financing" variant="muted" size="lg">
      <SectionHeading
        eyebrow="Financing made simple"
        title="Pay monthly. Start saving immediately."
        subtitle="Zero-down-payment EMIs from our partner banks. Most Anvil customers' EMI is less than their old electricity bill."
      />

      <div className={styles.tierGrid}>
        {financingTiers.map((tier, index) => (
          <Reveal key={tier.duration} delay={index * 80}>
            <article
              className={`${styles.tier} ${tier.featured ? styles.featured : ''}`}
            >
              {tier.featured && <span className={styles.ribbon}>Most Popular</span>}

              <Icon
                icon={tier.icon}
                className={styles.tierIcon}
                style={{ color: tier.accent }}
                aria-hidden="true"
              />
              <span className={styles.tierLabel}>{tier.label}</span>
              <span className={styles.tierDuration}>{tier.duration}</span>
              <span className={styles.tierRate}>Interest rate: {tier.interestRate}</span>
              <span className={styles.tierEmi}>{tier.emiFor3kw}</span>
              <p className={styles.tierBestFor}>
                <strong>Best for:</strong> {tier.bestFor}
              </p>

              <button
                type="button"
                className={styles.tierCta}
                onClick={() => handleApply(tier)}
              >
                Apply with this plan
                <Icon icon="mdi:arrow-right" aria-hidden="true" />
              </button>
            </article>
          </Reveal>
        ))}
      </div>

      <div className={styles.partnerBar}>
        <p className={styles.partnerCaption}>
          Bank partners — choose the one you already bank with.
        </p>
        <div className={styles.partnerRow}>
          {financingPartners.map((partner) => (
            <img
              key={partner.name}
              src={partner.logo}
              alt={partner.name}
              className={styles.partnerLogo}
              loading="lazy"
              decoding="async"
              width="160"
              height="60"
            />
          ))}
        </div>
      </div>

      <p className={styles.finePrint}>
        EMI examples use a ₹1,20,000 post-subsidy loan for a 3 kW system at
        quoted rates. Actual EMI may vary based on your credit profile. No
        processing fee with Anvil referrals.
      </p>
    </Section>
  );
};

export default FinancingSection;

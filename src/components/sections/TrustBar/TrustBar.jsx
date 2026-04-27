/* ============================================
   TrustBar Component
   Slim trust strip below the hero with install
   counts, certifications, finance partners, and
   a Google rating.
   ============================================ */

import React from 'react';
import { Icon } from '@iconify/react';
import styles from './TrustBar.module.css';

const trustItems = [
  { icon: 'mdi:home-lightning-bolt', value: '2,400+', label: 'Homes powered' },
  { icon: 'mdi:star-circle', value: '4.9', label: 'Google rating' },
  { icon: 'mdi:shield-check', value: '25 yr', label: 'Panel warranty' },
  { icon: 'mdi:bank', value: 'PM Surya Ghar', label: 'Subsidy partner' },
  { icon: 'mdi:handshake', value: '7% EMI', label: 'From SBI, HDFC & more' },
  { icon: 'mdi:whatsapp', value: '7-day', label: 'WhatsApp support' },
];

const TrustBar = () => {
  return (
    <section className={styles.bar} aria-label="Trust indicators">
      <p className={styles.tagline}>
        Trusted across Assam, Nagaland &amp; Bhubaneswar — and 10,000+ rooftops PAN-India.
      </p>
      <div className={styles.row}>
        {trustItems.map((item, index) => (
          <React.Fragment key={item.label}>
            <div className={styles.item}>
              <Icon icon={item.icon} className={styles.icon} aria-hidden="true" />
              <div className={styles.text}>
                <span className={styles.value}>{item.value}</span>
                <span className={styles.label}>{item.label}</span>
              </div>
            </div>
            {index < trustItems.length - 1 && (
              <span className={styles.divider} aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default TrustBar;

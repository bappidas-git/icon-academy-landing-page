/* ============================================
   TrustBar Component
   Slim trust strip below the hero.
   ============================================ */

import React from 'react';
import { Icon } from '@iconify/react';
import styles from './TrustBar.module.css';

const trustItems = [];

const TrustBar = () => {
  return (
    <section className={styles.bar} aria-label="Trust indicators">
      <p className={styles.tagline}>__TBD_ICON_CONTENT__</p>
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

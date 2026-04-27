/* ============================================
   FacilityCard — Icon Commerce College
   Visual gallery card for a single campus facility.
   Image fills the top half (4:3) with a saffron
   pill overlay (icon + name) in the top-right.
   Body holds the title, description, and a
   3-bullet list with saffron check icons.
   ============================================ */

import React from 'react';
import { Icon } from '@iconify/react';
import styles from './FacilityCard.module.css';

const FacilityCard = ({ facility }) => {
  const titleId = `facility-${facility.id}-title`;

  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <div className={styles.imageWrap}>
        <img
          src={facility.image}
          alt={`${facility.title} at Icon Commerce College`}
          className={styles.image}
          width="800"
          height="600"
          loading="lazy"
          decoding="async"
        />
        <span className={styles.pill} aria-hidden="true">
          <Icon
            icon={facility.icon}
            width={14}
            height={14}
            className={styles.pillIcon}
          />
          {facility.title}
        </span>
      </div>

      <div className={styles.body}>
        <h3 id={titleId} className={styles.title}>
          {facility.title}
        </h3>
        <p className={styles.description}>{facility.body}</p>

        <ul className={styles.bullets} role="list">
          {facility.bullets.map((bullet) => (
            <li key={bullet} className={styles.bulletItem}>
              <Icon
                icon="mdi:check-circle"
                width={16}
                height={16}
                className={styles.bulletIcon}
                aria-hidden="true"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default FacilityCard;

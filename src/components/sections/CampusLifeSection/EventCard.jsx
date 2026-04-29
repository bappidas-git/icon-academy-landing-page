/* ============================================
   EventCard — Icon Commerce College
   Information-first card for a flagship campus
   event. A gradient accent bar caps the top, a
   saffron icon chip anchors the left of the
   header, and a soft pill badge sits at the
   right. Title, subtitle, and body follow in a
   clear vertical hierarchy.
   ============================================ */

import React from 'react';
import { Icon } from '@iconify/react';
import styles from './EventCard.module.css';

const EventCard = ({ event }) => {
  const titleId = `event-${event.id}-title`;

  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <span className={styles.accentBar} aria-hidden="true" />

      <div className={styles.header}>
        <span className={styles.iconChip} aria-hidden="true">
          <Icon
            icon={event.icon}
            width={22}
            height={22}
            className={styles.iconChipIcon}
          />
        </span>
        <span className={styles.badge}>{event.badge}</span>
      </div>

      <div className={styles.body}>
        <h3 id={titleId} className={styles.title}>
          {event.title}
        </h3>
        <p className={styles.subtitle}>{event.subtitle}</p>
        <p className={styles.description}>{event.body}</p>
      </div>
    </article>
  );
};

export default EventCard;

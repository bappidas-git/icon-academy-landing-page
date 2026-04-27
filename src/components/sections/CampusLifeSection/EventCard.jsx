/* ============================================
   EventCard — Icon Commerce College
   Immersive 16:9 image card for a flagship
   campus event. A saffron badge sits in the
   top-right of the image; a frosted-glass
   overlay at bottom-left holds the title,
   subtitle, and body copy.
   ============================================ */

import React from 'react';
import { Icon } from '@iconify/react';
import styles from './EventCard.module.css';

const EventCard = ({ event }) => {
  const titleId = `event-${event.id}-title`;

  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <div className={styles.imageWrap}>
        <img
          src={event.image}
          alt={`${event.title} at Icon Commerce College`}
          className={styles.image}
          width="900"
          height="600"
          loading="lazy"
          decoding="async"
        />
        <span className={styles.badge} aria-hidden="true">
          {event.badge}
        </span>

        <div className={styles.overlay}>
          <span className={styles.iconChip} aria-hidden="true">
            <Icon
              icon={event.icon}
              width={18}
              height={18}
              className={styles.iconChipIcon}
            />
          </span>
          <h3 id={titleId} className={styles.title}>
            {event.title}
          </h3>
          <p className={styles.subtitle}>{event.subtitle}</p>
          <p className={styles.body}>{event.body}</p>
        </div>
      </div>
    </article>
  );
};

export default EventCard;

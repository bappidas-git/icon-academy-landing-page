/* ============================================
   FacultyCard — Icon Commerce College
   Square portrait at the top edge-to-edge, with
   name, role, credentials chip, and an optional
   department chip below. Used for both the
   leadership rail and the main faculty grid.
   ============================================ */

import React from 'react';
import styles from './FacultyCard.module.css';

const FacultyCard = ({ person, variant = 'default' }) => {
  const titleId = `faculty-${person.id}-name`;

  return (
    <article
      className={`${styles.card} ${variant === 'leadership' ? styles.leadership : ''}`}
      aria-labelledby={titleId}
    >
      {person.img ? (
        <div className={styles.imageWrap}>
          <img
            src={person.img}
            alt={`${person.name} — ${person.role}`}
            className={styles.image}
            width="300"
            height="300"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}

      <div className={styles.body}>
        <h3 id={titleId} className={styles.name}>
          {person.name}
        </h3>
        <p className={styles.role}>{person.role}</p>

        {person.credentials ? (
          <span className={styles.credentialsChip}>{person.credentials}</span>
        ) : null}

        {person.dept ? (
          <span className={styles.deptChip}>{person.dept}</span>
        ) : null}
      </div>
    </article>
  );
};

export default FacultyCard;

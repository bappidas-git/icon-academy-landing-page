/* ============================================
   SolutionCard
   Vertical card used inside the Solutions grid.
   Structure only — copy and imagery come from
   solutionsData (filled in prompt 12).
   ============================================ */

import React from 'react';
import { Icon } from '@iconify/react';
import styles from './SolutionCard.module.css';

const SolutionCard = ({ solution, onCtaClick }) => {
  const accent = solution.accent || 'gold';
  const ctaLabel = solution.title
    ? `Get my ${solution.title} quote`
    : 'Get my quote';

  const handleCtaClick = () => {
    if (typeof onCtaClick === 'function') {
      onCtaClick(solution);
    }
  };

  const imageAlt = solution.title
    ? `${solution.title} solar installation`
    : '';

  return (
    <article className={styles.card} aria-labelledby={`solution-${solution.id}-title`}>
      <div className={styles.imageWrap}>
        {solution.image ? (
          <img
            className={styles.image}
            src={solution.image}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            width="800"
            height="500"
          />
        ) : null}
      </div>

      <div className={`${styles.accent} ${styles[accent]}`} aria-hidden="true" />

      <div className={styles.body}>
        <span className={`${styles.iconChip} ${styles[accent]}`} aria-hidden="true">
          {solution.icon ? <Icon icon={solution.icon} /> : null}
        </span>

        <h3 id={`solution-${solution.id}-title`} className={styles.title}>
          {solution.title}
        </h3>

        {solution.tagline && (
          <p className={styles.tagline}>{solution.tagline}</p>
        )}

        {solution.benefits && solution.benefits.length > 0 && (
          <ul className={styles.benefits}>
            {solution.benefits.map((benefit, idx) => (
              <li key={idx} className={styles.benefit}>
                <Icon
                  icon="mdi:check-circle"
                  width={14}
                  height={14}
                  aria-hidden="true"
                />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          className={styles.ctaBtn}
          onClick={handleCtaClick}
        >
          <span>{ctaLabel}</span>
          <Icon
            icon="mdi:arrow-right"
            width={16}
            height={16}
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  );
};

export default SolutionCard;

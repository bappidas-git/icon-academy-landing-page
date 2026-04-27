import React from 'react';
import { Icon } from '@iconify/react';
import styles from './TestimonialsSection.module.css';

const TestimonialCard = ({ testimonial }) => {
  const {
    name,
    city,
    avatar,
    rooftopPhoto,
    systemKw,
    monthlySavings,
    quote,
    rating = 5,
  } = testimonial;

  return (
    <article className={styles.card}>
      <img
        src={rooftopPhoto}
        alt={`Rooftop solar installation in ${city}`}
        className={styles.photo}
        loading="lazy"
        decoding="async"
        width="600"
        height="400"
      />

      <div className={styles.body}>
        <div
          className={styles.stars}
          role="img"
          aria-label={`${rating} out of 5 stars`}
        >
          {Array.from({ length: rating }).map((_, i) => (
            <Icon key={i} icon="mdi:star" aria-hidden="true" />
          ))}
        </div>

        <p className={styles.quote}>&ldquo;{quote}&rdquo;</p>

        <div className={styles.metrics}>
          <span className={styles.metric}>System: {systemKw}</span>
          <span className={`${styles.metric} ${styles.savings}`}>
            Saves {monthlySavings}/mo
          </span>
        </div>

        <div className={styles.footerRow}>
          <img
            src={avatar}
            alt={name}
            className={styles.avatar}
            loading="lazy"
            decoding="async"
            width="120"
            height="120"
          />
          <div className={styles.identity}>
            <span className={styles.name}>{name}</span>
            <span className={styles.city}>{city}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TestimonialCard;

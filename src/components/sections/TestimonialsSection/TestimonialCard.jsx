/* ============================================
   TestimonialCard
   Single alumni quote card. Saffron decorative
   quote glyph behind the text, top-right star
   row, footer with circular portrait + name +
   role.
   ============================================ */

import React from 'react';
import { Icon } from '@iconify/react';
import styles from './TestimonialsSection.module.css';

const TestimonialCard = ({ testimonial }) => {
  const { id, name, role, img, quote, rating = 5 } = testimonial;

  return (
    <article className={styles.card} tabIndex={0}>
      <Icon
        icon="mdi:format-quote-open"
        className={styles.quoteGlyph}
        aria-hidden="true"
      />

      <div
        className={styles.stars}
        role="img"
        aria-label={`${rating} out of 5 stars`}
      >
        {Array.from({ length: rating }).map((_, i) => (
          <Icon key={i} icon="mdi:star" aria-hidden="true" />
        ))}
      </div>

      <blockquote className={styles.quote} cite={`#${id}`}>
        <p className={styles.quoteText}>{quote}</p>
      </blockquote>

      <footer className={styles.footerRow}>
        <img
          src={img}
          alt=""
          className={styles.avatar}
          loading="lazy"
          decoding="async"
          width="120"
          height="120"
        />
        <div className={styles.identity}>
          <cite className={styles.name}>{name}</cite>
          <span className={styles.role}>{role}</span>
        </div>
      </footer>
    </article>
  );
};

export default TestimonialCard;

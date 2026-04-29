/* ============================================
   TrustBar — Icon Commerce College
   Slim, single-row auto-scrolling credibility
   strip directly below the hero. Consolidates
   affiliation badges + trust facts into one
   minimal, continuously-scrolling marquee that
   pauses on hover and respects
   `prefers-reduced-motion`.
   ============================================ */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Icon } from '@iconify/react';
import useReducedMotion from '../../../hooks/useReducedMotion';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { TRUST_BADGES, MARQUEE_ITEMS } from '../../../data/trustBarData';
import styles from './TrustBar.module.css';

const MARQUEE_DURATION_DESKTOP = 40;
const MARQUEE_DURATION_MOBILE = 28;

const TrustBar = () => {
  const reduced = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const controls = useAnimationControls();
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const duration = isMobile ? MARQUEE_DURATION_MOBILE : MARQUEE_DURATION_DESKTOP;

  // Combine badges + facts into a single unified pill list
  const trackItems = [
    ...TRUST_BADGES.map((b) => ({
      id: `badge-${b.id}`,
      icon: b.icon,
      text: `${b.label} ${b.accent}`,
    })),
    ...MARQUEE_ITEMS.map((m) => ({
      id: `fact-${m.id}`,
      icon: m.icon,
      text: m.text,
    })),
  ];

  useEffect(() => {
    if (reduced) {
      controls.stop();
      controls.set({ x: 0 });
      return;
    }
    if (isPaused) {
      controls.stop();
      return;
    }
    controls.start({
      x: ['0%', '-50%'],
      transition: {
        duration,
        ease: 'linear',
        repeat: Infinity,
      },
    });
  }, [reduced, isPaused, duration, controls]);

  const renderItems = reduced ? trackItems : [...trackItems, ...trackItems];

  return (
    <section
      id="trust"
      role="region"
      aria-label="Trust and credibility"
      className={styles.section}
    >
      <div
        className={styles.inner}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <div
          className={`${styles.marqueeViewport} ${reduced ? styles.marqueeViewportStatic : ''}`}
          aria-hidden="true"
        >
          <motion.div
            ref={trackRef}
            className={`${styles.marqueeTrack} ${reduced ? styles.marqueeTrackStatic : ''}`}
            animate={controls}
          >
            {renderItems.map((item, index) => (
              <span
                key={`${item.id}-${index}`}
                className={styles.marqueeItem}
                tabIndex={0}
                aria-label={item.text}
              >
                <Icon
                  icon={item.icon}
                  className={styles.marqueeIcon}
                  aria-hidden="true"
                />
                <span className={styles.marqueeText}>{item.text}</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Visually-hidden semantic alternative for assistive tech */}
        <ul role="list" className={styles.srOnlyList}>
          {trackItems.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TrustBar;

/* ============================================
   TrustBar — Icon Commerce College
   Slim credibility strip directly below the hero.
   Three columns on desktop:
     A) Affiliation badges (Gauhati Uni, NEP, Samarth)
     B) Auto-scrolling marquee of stats / mini-facts
     C) "Estd. 2004" anchor caption
   Collapses to stacked rows on tablet / mobile.
   Marquee pauses on hover and respects
   `prefers-reduced-motion`.
   ============================================ */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Icon } from '@iconify/react';
import useReducedMotion from '../../../hooks/useReducedMotion';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { TRUST_BADGES, MARQUEE_ITEMS } from '../../../data/trustBarData';
import styles from './TrustBar.module.css';

const MARQUEE_DURATION_DESKTOP = 30;
const MARQUEE_DURATION_MOBILE = 24;

const TrustBar = () => {
  const reduced = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const controls = useAnimationControls();
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const duration = isMobile ? MARQUEE_DURATION_MOBILE : MARQUEE_DURATION_DESKTOP;

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

  const marqueeItems = reduced ? MARQUEE_ITEMS.slice(0, 3) : [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section
      id="trust"
      role="region"
      aria-label="Trust and credibility"
      className={styles.section}
    >
      <div className={styles.inner}>
        {/* === Column A — Affiliation badges === */}
        <div className={styles.badgesCol}>
          {TRUST_BADGES.map((badge, index) => (
            <motion.div
              key={badge.id}
              className={styles.badgeCard}
              initial={reduced ? false : { opacity: 0, y: 4 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.4,
                ease: 'easeOut',
                delay: reduced ? 0 : index * 0.08,
              }}
            >
              <img
                src={badge.img}
                alt=""
                className={styles.badgeImg}
                width="64"
                height="64"
                loading="lazy"
                decoding="async"
                aria-hidden="true"
              />
              <div className={styles.badgeText}>
                <Icon
                  icon={badge.icon}
                  className={styles.badgeIcon}
                  aria-hidden="true"
                />
                <span className={styles.badgeLabel}>{badge.label}</span>
                <span className={styles.badgeAccent}>{badge.accent}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* === Column B — Marquee === */}
        <div
          className={styles.marqueeCol}
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
              {marqueeItems.map((item, index) => (
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
            {MARQUEE_ITEMS.map((item) => (
              <li key={item.id}>{item.text}</li>
            ))}
          </ul>
        </div>

        {/* === Column C — Estd. anchor === */}
        <div className={styles.anchorCol}>
          <span className={styles.anchorEyebrow}>Estd. 2004</span>
          <span className={styles.anchorCaption}>
            20+ Years of Academic Legacy
          </span>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;

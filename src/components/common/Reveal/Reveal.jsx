/* ============================================
   Reveal
   Shared scroll-reveal wrapper. Plays a single
   variant (fade / slide-up / slide-left / scale)
   once the element enters the viewport. Honours
   `prefers-reduced-motion` by rendering children
   unanimated.
   ============================================ */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useReducedMotion from '../../../hooks/useReducedMotion';
import styles from './Reveal.module.css';

const VARIANTS = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'slide-up': {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
};

const EASE = [0.25, 0.46, 0.45, 0.94];

const Reveal = ({
  as = 'div',
  variant = 'slide-up',
  delay = 0,
  once = true,
  threshold = 0.15,
  className = '',
  children,
  ...rest
}) => {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: once, threshold });

  const combinedClassName = `${styles.reveal} ${className}`.trim();

  if (reduced) {
    const Tag = as;
    return (
      <Tag ref={ref} className={combinedClassName} {...rest}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] || motion.div;
  const chosenVariant = VARIANTS[variant] || VARIANTS['slide-up'];

  return (
    <MotionTag
      ref={ref}
      className={combinedClassName}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={chosenVariant}
      transition={{ duration: 0.5, ease: EASE, delay: delay / 1000 }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;

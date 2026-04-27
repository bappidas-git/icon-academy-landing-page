import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './SectionHeading.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  inverse = false,
  maxWidth = 720,
  className = '',
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  const rootClass = [
    styles.root,
    styles[align],
    inverse && styles.inverse,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.div
      ref={ref}
      className={rootClass}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{ maxWidth }}
    >
      {eyebrow && (
        <motion.span className={styles.eyebrow} variants={itemVariants}>
          {eyebrow}
        </motion.span>
      )}
      <motion.h2 className={styles.title} variants={itemVariants}>
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p className={styles.subtitle} variants={itemVariants}>
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;

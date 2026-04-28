/* ============================================
   StickyMobileCTA
   Mobile-only (<768px) bottom-docked bar with two
   tappable halves: "Call Admissions" (tel:) and a
   coral "Apply Now" button that opens the lead
   drawer with source `sticky_mobile_apply`.

   Hidden during the first 100vh so it does not
   compete with the hero CTA, hidden while the lead
   drawer is open, and hidden on /admin and
   /thank-you routes.
   ============================================ */

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useModal } from '../../../context/ModalContext';
import { useScrolledPast } from '../../../hooks/useScrollPosition';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { trackCTAClick } from '../../../utils/gtm';
import { trackCtaClickEvent, trackFunnelStep } from '../../../utils/leadEvents';
import styles from './StickyMobileCTA.module.css';

const SALES_PHONE_TEL = (process.env.REACT_APP_SALES_PHONE || '').replace(/\s+/g, '');

const StickyMobileCTA = () => {
  const location = useLocation();
  const { isDrawerOpen, openLeadDrawer } = useModal();
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Track viewport height so the CTA stays hidden through the entire hero
  // even when the user rotates or the mobile address bar resizes.
  const [heroThreshold, setHeroThreshold] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );
  useEffect(() => {
    const onResize = () => setHeroThreshold(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const scrolledPastHero = useScrolledPast(heroThreshold);

  const isHiddenRoute =
    location.pathname === '/thank-you' || location.pathname.startsWith('/admin');

  const shouldShow = isMobile && scrolledPastHero && !isDrawerOpen && !isHiddenRoute;

  const handleCallClick = () => {
    trackCTAClick('sticky_call', 'sticky_mobile_cta', 'Call Admissions');
    trackFunnelStep('phone_click', { source: 'sticky_mobile' });
  };

  const handleApplyClick = () => {
    trackCtaClickEvent('sticky_mobile_apply', 'sticky_bar', 'Apply Now');
    openLeadDrawer({ source: 'sticky_mobile_apply' });
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          className={styles.bar}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          role="region"
          aria-label="Quick contact actions"
        >
          <a
            href={`tel:${SALES_PHONE_TEL}`}
            className={styles.cell}
            onClick={handleCallClick}
            aria-label="Call Admissions"
          >
            <Icon icon="mdi:phone" aria-hidden="true" />
            <span>Call Admissions</span>
          </a>

          <button
            type="button"
            className={`${styles.cell} ${styles.primary}`}
            onClick={handleApplyClick}
            aria-label="Apply Now"
          >
            <Icon icon="mdi:flash" aria-hidden="true" />
            <span>Apply Now</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyMobileCTA;

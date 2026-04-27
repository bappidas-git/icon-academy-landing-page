/* ============================================
   FloatingContacts
   Circular WhatsApp pill anchored to the bottom-right
   corner on desktop (>=769px). Sits above the
   back-to-top button and aligns with it vertically.
   Appears after 800px scroll; hides on admin/thank-you
   routes and while the lead drawer is open.
   ============================================ */

import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useModal } from '../../../context/ModalContext';
import { useScrolledPast } from '../../../hooks/useScrollPosition';
import { trackCTAClick } from '../../../utils/gtm';
import { trackFunnelStep } from '../../../utils/leadEvents';
import styles from './FloatingContacts.module.css';

const SALES_PHONE_TEL = (process.env.REACT_APP_SALES_PHONE || '+911800202001').replace(/\s+/g, '');
const WHATSAPP_NUMBER = SALES_PHONE_TEL.replace(/[^0-9]/g, '');

const FloatingContacts = () => {
  const location = useLocation();
  const { isDrawerOpen } = useModal();
  const scrolledPast = useScrolledPast(800);

  const isHiddenRoute =
    location.pathname === '/thank-you' || location.pathname.startsWith('/admin');

  const shouldShow = scrolledPast && !isDrawerOpen && !isHiddenRoute;

  const handleWhatsAppClick = () => {
    trackCTAClick('float_whatsapp', 'floating_contacts', 'WhatsApp');
    trackFunnelStep('whatsapp_click', { source: 'floating_desktop' });
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          className={styles.stack}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          aria-label="Floating contact shortcuts"
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btn} ${styles.wa}`}
            onClick={handleWhatsAppClick}
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
          >
            <Icon icon="mdi:whatsapp" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingContacts;

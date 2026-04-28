/* ============================================
   FloatingContacts
   Desktop-only (>=769px) right-edge floating
   column with three circular buttons: Phone,
   WhatsApp, and Email. Vertically centred on
   the viewport, each button shows a left-pointing
   tooltip on hover with the channel name.

   Hidden while the lead drawer is open and on
   /admin and /thank-you routes.
   ============================================ */

import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useModal } from '../../../context/ModalContext';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { trackCTAClick } from '../../../utils/gtm';
import { trackFunnelStep } from '../../../utils/leadEvents';
import styles from './FloatingContacts.module.css';

const SALES_PHONE_TEL = (process.env.REACT_APP_SALES_PHONE || '').replace(/\s+/g, '');
const WHATSAPP_RAW =
  process.env.REACT_APP_WHATSAPP_NUMBER || process.env.REACT_APP_SALES_PHONE || '';
const WHATSAPP_NUMBER = WHATSAPP_RAW.replace(/[^0-9]/g, '');
const SALES_EMAIL = process.env.REACT_APP_SALES_EMAIL || '';

const FloatingContacts = () => {
  const location = useLocation();
  const { isDrawerOpen } = useModal();
  const isDesktop = useMediaQuery('(min-width: 769px)');

  const isHiddenRoute =
    location.pathname === '/thank-you' || location.pathname.startsWith('/admin');

  const shouldShow = isDesktop && !isDrawerOpen && !isHiddenRoute;

  const handlePhoneClick = () => {
    trackCTAClick('float_phone', 'floating_contacts', 'Call');
    trackFunnelStep('phone_click', { source: 'floating_desktop' });
  };

  const handleWhatsAppClick = () => {
    trackCTAClick('float_whatsapp', 'floating_contacts', 'WhatsApp');
    trackFunnelStep('whatsapp_click', { source: 'floating_desktop' });
  };

  const handleEmailClick = () => {
    trackCTAClick('float_email', 'floating_contacts', 'Email');
    trackFunnelStep('email_click', { source: 'floating_desktop' });
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          className={styles.stack}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          aria-label="Floating contact shortcuts"
        >
          <a
            href={`tel:${SALES_PHONE_TEL}`}
            className={`${styles.btn} ${styles.phone}`}
            onClick={handlePhoneClick}
            aria-label="Call admissions"
            data-tooltip="Call"
          >
            <Icon icon="mdi:phone" aria-hidden="true" />
          </a>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              'Hi, I would like to know more about admissions.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btn} ${styles.wa}`}
            onClick={handleWhatsAppClick}
            aria-label="Chat on WhatsApp"
            data-tooltip="WhatsApp"
          >
            <Icon icon="mdi:whatsapp" aria-hidden="true" />
          </a>

          <a
            href={`mailto:${SALES_EMAIL}`}
            className={`${styles.btn} ${styles.email}`}
            onClick={handleEmailClick}
            aria-label="Email admissions"
            data-tooltip="Email"
          >
            <Icon icon="mdi:email" aria-hidden="true" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingContacts;

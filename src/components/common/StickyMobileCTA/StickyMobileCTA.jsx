/* ============================================
   StickyMobileCTA
   Fixed 3-button bar (Call · WhatsApp · Get Quote)
   that docks to the bottom of the viewport on
   mobile once the user scrolls past the hero.

   Conflict with MobileNavigation: both render at
   <= 768px and dock to bottom: 0. We resolve this
   with z-index stacking — StickyMobileCTA (z: 950)
   sits on top of MobileNavigation (z: var(--z-fixed) = 300)
   and effectively replaces it once visible (after 400px
   scroll). This is the "replaces the mobile nav" option
   called out in prompt 23.
   ============================================ */

import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useModal } from '../../../context/ModalContext';
import { useScrolledPast } from '../../../hooks/useScrollPosition';
import { trackCTAClick } from '../../../utils/gtm';
import { trackCtaClickEvent, trackFunnelStep } from '../../../utils/leadEvents';
import styles from './StickyMobileCTA.module.css';

const SALES_PHONE_TEL = (process.env.REACT_APP_SALES_PHONE || '+911800202001').replace(/\s+/g, '');
const WHATSAPP_NUMBER = SALES_PHONE_TEL.replace(/[^0-9]/g, '');

const StickyMobileCTA = () => {
  const location = useLocation();
  const { isDrawerOpen, openLeadDrawer } = useModal();
  const scrolledPast = useScrolledPast(400);

  const isHiddenRoute =
    location.pathname === '/thank-you' || location.pathname.startsWith('/admin');

  const shouldShow = scrolledPast && !isDrawerOpen && !isHiddenRoute;

  const handleCallClick = () => {
    trackCTAClick('sticky_call', 'sticky_mobile_cta', 'Call');
    trackFunnelStep('phone_click', { source: 'sticky_mobile' });
  };

  const handleWhatsAppClick = () => {
    trackCTAClick('sticky_whatsapp', 'sticky_mobile_cta', 'WhatsApp');
    trackFunnelStep('whatsapp_click', { source: 'sticky_mobile' });
  };

  const handleQuoteClick = () => {
    trackCtaClickEvent('sticky_get_quote', 'sticky_bar', 'Get Quote');
    openLeadDrawer({ source: 'sticky_mobile' });
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          className={styles.bar}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          role="region"
          aria-label="Quick contact actions"
        >
          <a
            href={`tel:${SALES_PHONE_TEL}`}
            className={styles.cell}
            onClick={handleCallClick}
            aria-label="Call Anvil"
          >
            <Icon icon="mdi:phone" aria-hidden="true" />
            <span>Call</span>
          </a>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.cell} ${styles.whatsapp}`}
            onClick={handleWhatsAppClick}
            aria-label="WhatsApp Anvil"
          >
            <Icon icon="mdi:whatsapp" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            className={`${styles.cell} ${styles.primary}`}
            onClick={handleQuoteClick}
            aria-label="Get a free quote"
          >
            <Icon icon="mdi:flash" aria-hidden="true" />
            <span>Get Quote</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyMobileCTA;

/* ============================================
   Modal Context
   Handles modal state management across the app
   ============================================ */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { trackCTAClick } from '../utils/gtm';

// Create context
const ModalContext = createContext(null);

// Modal types enum
export const MODAL_TYPES = {
  LEAD_FORM: 'LEAD_FORM',
  SITE_VISIT: 'SITE_VISIT',
  CALLBACK: 'CALLBACK',
  BROCHURE: 'BROCHURE',
  FLOOR_PLAN: 'FLOOR_PLAN',
  GALLERY: 'GALLERY',
  VIDEO: 'VIDEO',
  SUCCESS: 'SUCCESS',
  CUSTOM: 'CUSTOM',
};

// Drawer title mapping based on source/context
// Each CTA source maps to a drawer title + subtitle so the same unified
// lead form can be reused with the appropriate context.
export const DRAWER_TITLES = {
  'header_cta': {
    title: 'Get Your Free Quote',
    subtitle: 'A 60-second form to unlock your rooftop solar savings plan.',
  },
  'hero_primary': {
    title: 'Get Your Free Savings Plan',
    subtitle: 'Share a few quick details — your personalised plan is 60 seconds away.',
  },
  'hero_mobile': {
    title: 'Get Your Free Savings Plan',
    subtitle: 'Share a few quick details — your personalised plan is 60 seconds away.',
  },
  'apply-now': {
    title: 'Get Started With Anvil',
    subtitle: 'Fill in your details and an Anvil Saathi will assist you.',
  },
  'get-details': {
    title: 'Get Full Details',
    subtitle: 'Complete information on your rooftop solar options.',
  },
  'get-course-details': {
    title: 'Get Full Details',
    subtitle: 'Complete information on your rooftop solar options.',
  },
  'book-meeting': {
    title: 'Book a Meeting',
    subtitle: 'Meet our rooftop solar specialists for a detailed discussion.',
  },
  'book-consultation': {
    title: 'Book a Free Consultation',
    subtitle: 'Talk to an Anvil Saathi about the right solar plan for your home.',
  },
  'download-brochure': {
    title: 'Download Brochure',
    subtitle: 'Get the complete brochure delivered to your inbox.',
  },
  'request-callback': {
    title: 'Request a Callback',
    subtitle: 'An Anvil Saathi will call you back within 24 hours.',
  },
  'investment-plans': {
    title: 'View Subsidy & EMI Plans',
    subtitle: 'Explore PM Surya Ghar subsidies and zero-down EMI options.',
  },
  'contact': {
    title: 'Contact Anvil',
    subtitle: 'Share your details and our team will respond within 24 hours.',
  },
  'location-section-site-survey': {
    title: 'Book Your Free Site Survey',
    subtitle: 'A specialist will visit to assess your roof and subsidy eligibility.',
  },
  'calculator': {
    title: 'Lock In Your Savings Plan',
    subtitle: 'We\'ll prepare a personalised quote based on your calculator inputs.',
  },
  'subsidy_card': {
    title: 'See Your Exact Subsidy',
    subtitle: 'Share a few quick details and we\'ll calculate your PM Surya Ghar + state subsidy.',
  },
  'default': {
    title: 'Get Your Free Solar Quote',
    subtitle: 'Fill the form and an Anvil Saathi will assist you.',
  },
};

// Provider component
export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [modalConfig, setModalConfig] = useState({
    showCloseButton: true,
    closeOnBackdrop: true,
    closeOnEscape: true,
    fullScreen: false,
    maxWidth: 'sm',
  });

  // Lead Form Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerConfig, setDrawerConfig] = useState({
    title: DRAWER_TITLES.default.title,
    subtitle: DRAWER_TITLES.default.subtitle,
    source: 'general',
    solution: null,
    calculatorSnapshot: null,
  });

  // Open modal with type and optional data
  const openModal = useCallback((type, data = null, config = {}) => {
    setModalType(type);
    setModalData(data);
    setModalConfig((prev) => ({ ...prev, ...config }));
    setIsOpen(true);
    // Prevent body scroll when modal is open
    // Save current scroll position before locking body
    const scrollY = window.scrollY;
    document.body.dataset.modalScrollY = scrollY;
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add('modal-open');
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalType(null);
    setModalData(null);
    setModalConfig({
      showCloseButton: true,
      closeOnBackdrop: true,
      closeOnEscape: true,
      fullScreen: false,
      maxWidth: 'sm',
    });
    // Restore body scroll
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    // Restore scroll position after unlocking body
    const scrollY = document.body.dataset.modalScrollY;
    document.body.style.top = '';
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY, 10));
      delete document.body.dataset.modalScrollY;
    }
  }, []);

  // Update modal data
  const updateModalData = useCallback((data) => {
    setModalData((prev) => ({ ...prev, ...data }));
  }, []);

  // Shorthand methods for common modals
  const openLeadForm = useCallback((data) => {
    openModal(MODAL_TYPES.LEAD_FORM, data);
  }, [openModal]);

  const openSiteVisit = useCallback((data) => {
    openModal(MODAL_TYPES.SITE_VISIT, data);
  }, [openModal]);

  const openCallback = useCallback((data) => {
    openModal(MODAL_TYPES.CALLBACK, data);
  }, [openModal]);

  const openBrochure = useCallback((data) => {
    openModal(MODAL_TYPES.BROCHURE, data);
  }, [openModal]);

  const openFloorPlan = useCallback((data) => {
    openModal(MODAL_TYPES.FLOOR_PLAN, data, { maxWidth: 'md' });
  }, [openModal]);

  const openGallery = useCallback((data) => {
    openModal(MODAL_TYPES.GALLERY, data, { fullScreen: true, maxWidth: 'lg' });
  }, [openModal]);

  const openVideo = useCallback((data) => {
    openModal(MODAL_TYPES.VIDEO, data, { maxWidth: 'md' });
  }, [openModal]);

  const showSuccess = useCallback((message, title = 'Success') => {
    openModal(MODAL_TYPES.SUCCESS, { message, title });
  }, [openModal]);

  // Open lead form drawer. Accepts either:
  //   - a string source/titleKey (legacy): openLeadDrawer('hero-primary')
  //   - a string + extraData (legacy):     openLeadDrawer('contact', { title, subtitle })
  //   - an object config (new):            openLeadDrawer({ source, solution, calculatorSnapshot, title, subtitle })
  const openLeadDrawer = useCallback((sourceOrConfig = 'default', extraData = {}) => {
    const config =
      typeof sourceOrConfig === 'string'
        ? { source: sourceOrConfig, ...extraData }
        : { ...(sourceOrConfig || {}) };

    const source = config.source || 'default';
    const titleConfig = DRAWER_TITLES[source] || DRAWER_TITLES.default;

    setDrawerConfig({
      title: config.title || titleConfig.title,
      subtitle: config.subtitle || titleConfig.subtitle,
      source,
      solution: config.solution || null,
      calculatorSnapshot: config.calculatorSnapshot || null,
    });
    setIsDrawerOpen(true);
    // Track which CTA triggered the drawer
    trackCTAClick(`drawer_${source}`, 'drawer', titleConfig.title);
    // Save current scroll position before locking body
    const scrollY = window.scrollY;
    document.body.dataset.scrollY = scrollY;
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add('drawer-open');
  }, []);

  // Close lead form drawer
  const closeLeadDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setDrawerConfig({
      title: DRAWER_TITLES.default.title,
      subtitle: DRAWER_TITLES.default.subtitle,
      source: 'general',
      solution: null,
      calculatorSnapshot: null,
    });
    document.body.classList.remove('drawer-open');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    // Restore scroll position after unlocking body
    const scrollY = document.body.dataset.scrollY;
    document.body.style.top = '';
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY, 10));
      delete document.body.dataset.scrollY;
    }
  }, []);

  const value = {
    // State
    isOpen,
    modalType,
    modalData,
    modalConfig,
    // Drawer State
    isDrawerOpen,
    drawerConfig,
    // Actions
    openModal,
    closeModal,
    updateModalData,
    // Drawer Actions
    openLeadDrawer,
    closeLeadDrawer,
    // Shorthand methods
    openLeadForm,
    openSiteVisit,
    openCallback,
    openBrochure,
    openFloorPlan,
    openGallery,
    openVideo,
    showSuccess,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to use modal context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export default ModalContext;

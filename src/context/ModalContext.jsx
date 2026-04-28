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

// Drawer title mapping based on source/context.
// Each `source` key maps to the title/subtitle shown above the lead form
// when `openLeadDrawer({ source })` is called. Unknown sources fall back
// to the `general` entry.
export const DRAWER_TITLES = {
  // Header / footer
  header_apply: {
    title: 'Apply for 2026 Admissions',
    subtitle: 'Two minutes — and our team will call within 24 hours.',
  },
  footer_apply: {
    title: 'Apply for 2026 Admissions',
    subtitle: 'Two minutes — and our team will call within 24 hours.',
  },

  // Hero
  hero_primary: {
    title: 'Apply for 2026 Admissions',
    subtitle: 'Tell us your programme of interest — we will call within 24 hours.',
  },
  hero_counsellor: {
    title: 'Talk to a Counsellor',
    subtitle: 'A few details and we will guide you through the Samarth process.',
  },

  // About / Why / Faculty
  about_apply: {
    title: 'Apply Now',
    subtitle: 'Take the next step — admissions counselling is free.',
  },
  why_apply: {
    title: 'Apply Now',
    subtitle: 'Pick your programme; we will handle the rest.',
  },
  why_visit: {
    title: 'Schedule a Campus Visit',
    subtitle: 'Walk our halls — talk to faculty — see your future.',
  },
  faculty_counsellor: {
    title: 'Talk to a Counsellor',
    subtitle: 'Ask anything — programmes, faculty, or campus life.',
  },

  // Programmes
  program_bcom_apply: {
    title: 'Apply for B.Com.',
    subtitle: 'Bachelor of Commerce — Gauhati University · NEP 2020.',
  },
  program_bba_apply: {
    title: 'Apply for BBA',
    subtitle: 'Bachelor of Business Administration — Gauhati University · NEP 2020.',
  },
  program_bca_apply: {
    title: 'Apply for BCA',
    subtitle: 'Bachelor of Computer Applications — Gauhati University · NEP 2020.',
  },
  program_ba_apply: {
    title: 'Apply for B.A.',
    subtitle: 'Bachelor of Arts — Gauhati University · NEP 2020.',
  },

  // Results / Facilities / Campus
  results_apply: {
    title: 'Become the Next ICC Success Story',
    subtitle: 'Apply now — admissions counselling is free.',
  },
  facilities_visit: {
    title: 'Schedule a Campus Visit',
    subtitle: 'See the library, computer lab, and classrooms in person.',
  },
  campus_life_counsellor: {
    title: 'Talk to a Counsellor',
    subtitle: 'Curious about events, sports, or competitions? We have answers.',
  },

  // Admissions / Fees / Scholarships
  admissions_counsellor: {
    title: 'Get Free Admission Counselling',
    subtitle: 'We will walk you through the Samarth Portal step by step.',
  },
  fees_bcom_apply: {
    title: 'Apply for B.Com.',
    subtitle: 'Quickest path: share details, our team verifies and guides.',
  },
  fees_bba_apply: {
    title: 'Apply for BBA',
    subtitle: 'Quickest path: share details, our team verifies and guides.',
  },
  fees_bca_apply: {
    title: 'Apply for BCA',
    subtitle: 'Quickest path: share details, our team verifies and guides.',
  },
  fees_ba_apply: {
    title: 'Apply for B.A.',
    subtitle: 'Quickest path: share details, our team verifies and guides.',
  },
  scholarships_counsellor: {
    title: 'Get Scholarship Counselling',
    subtitle: 'Find the schemes you are eligible for.',
  },

  // FAQ / Contact
  faq_counsellor: {
    title: 'Talk to a Counsellor',
    subtitle: 'Real answers from our admissions team — within 24 hours.',
  },
  contact_inline: {
    title: 'Send Us a Message',
    subtitle: 'We will reply on phone, WhatsApp, or email — your choice.',
  },

  // Default fallback
  general: {
    title: 'Apply for 2026 Admissions',
    subtitle: 'Two minutes — and our team will call within 24 hours.',
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
    title: DRAWER_TITLES.general.title,
    subtitle: DRAWER_TITLES.general.subtitle,
    source: 'general',
    solution: null,
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
  //   - a string source/titleKey (legacy): openLeadDrawer('hero_primary')
  //   - a string + extraData (legacy):     openLeadDrawer('contact_inline', { title, subtitle })
  //   - an object config (new):            openLeadDrawer({ source, solution, title, subtitle })
  const openLeadDrawer = useCallback((sourceOrConfig = 'general', extraData = {}) => {
    const config =
      typeof sourceOrConfig === 'string'
        ? { source: sourceOrConfig, ...extraData }
        : { ...(sourceOrConfig || {}) };

    const source = config.source || 'general';
    const titleConfig = DRAWER_TITLES[source] || DRAWER_TITLES.general;

    setDrawerConfig({
      title: config.title || titleConfig.title,
      subtitle: config.subtitle || titleConfig.subtitle,
      source,
      solution: config.solution || null,
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
      title: DRAWER_TITLES.general.title,
      subtitle: DRAWER_TITLES.general.subtitle,
      source: 'general',
      solution: null,
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

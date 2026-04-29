/* ============================================
   Footer — Icon Commerce College
   Affiliation strip + 4-column desktop grid
   (Brand / Programmes / Admissions / Quick Links)
   that collapses to stacked accordions on mobile.
   Bottom band carries copyright, legal links, and
   a "designed with care" credit. A floating
   back-to-top button appears once the user has
   scrolled past the hero.
   ============================================ */

import React, { useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';

import { useModal } from '../../../context/ModalContext';
import { useScrolledPast } from '../../../hooks/useScrollPosition';
import { COLLEGE_LOCATION } from '../../../data/locationData';
import styles from './Footer.module.css';

const LOGO_URL =
  'https://res.cloudinary.com/dn9gyaiik/image/upload/v1777447286/icon-logo_ssglnp.png';
const SAMARTH_URL = 'https://assamadmission.samarth.ac.in/';
const BACK_TO_TOP_THRESHOLD = 600;

const stripPhoneForTel = (value) => (value || '').replace(/[^0-9+]/g, '');

const PROGRAMME_LINKS = [
  { label: 'B.Com', href: '#programs' },
  { label: 'BBA', href: '#programs' },
  { label: 'BCA', href: '#programs' },
  { label: 'B.A.', href: '#programs' },
  { label: 'Compare Programmes', href: '#programs' },
];

const QUICK_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Why Icon', href: '#why-icon' },
  { label: 'Campus Life', href: '#campus-life' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_PLATFORM_LABELS = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
};

const Footer = () => {
  const { openLeadDrawer } = useModal();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isScrolledPastHero = useScrolledPast(BACK_TO_TOP_THRESHOLD);
  const [openColumn, setOpenColumn] = useState(null);

  const { name, addressLine1, addressLine2, phone, email, socials } =
    COLLEGE_LOCATION;

  const phoneHref = `tel:${stripPhoneForTel(phone)}`;
  const emailHref = `mailto:${email}`;
  const visibleSocials = socials.filter((s) => !!s.url);
  const currentYear = new Date().getFullYear();

  const handleApplyClick = (event) => {
    event.preventDefault();
    openLeadDrawer({ source: 'footer_apply' });
  };

  const handleColumnToggle = (key) => () => {
    setOpenColumn((current) => (current === key ? null : key));
  };

  const handleBackToTop = () => {
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderColumn = ({ key, heading, children }) => {
    const isOpen = isDesktop || openColumn === key;
    const panelId = `footer-${key}-panel`;
    return (
      <div
        className={`${styles.col} ${isOpen ? styles.colOpen : ''}`}
        data-column={key}
      >
        {isDesktop ? (
          <h2 className={`${styles.colHeading} ${styles.colHeadingStatic}`}>
            <span className={styles.colHeadingText}>{heading}</span>
          </h2>
        ) : (
          <button
            type="button"
            className={styles.colHeading}
            onClick={handleColumnToggle(key)}
            aria-expanded={isOpen}
            aria-controls={panelId}
          >
            <span className={styles.colHeadingText} role="heading" aria-level={2}>
              {heading}
            </span>
            <Icon
              icon={isOpen ? 'mdi:minus' : 'mdi:plus'}
              width={20}
              height={20}
              className={styles.colHeadingIcon}
              aria-hidden="true"
            />
          </button>
        )}
        <div id={panelId} className={styles.colPanel}>
          {children}
        </div>
      </div>
    );
  };

  return (
    <footer
      className={styles.footer}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* ===== Affiliation strip ===== */}
      <div className={styles.affiliationWrap}>
        <div className={styles.affiliationCard}>
          <Icon
            icon="mdi:school-outline"
            width={20}
            height={20}
            className={styles.affiliationIcon}
            aria-hidden="true"
          />
          <span className={styles.affiliationText}>
            Affiliated to Gauhati University · NEP 2020 aligned · Samarth
            College Code 842
          </span>
        </div>
      </div>

      {/* ===== Main columns ===== */}
      <div className={styles.main}>
        <div className={styles.mainInner}>
          {/* Col 1 — Brand (always open on mobile) */}
          <div className={`${styles.col} ${styles.brandCol}`} data-column="brand">
            <img
              src={LOGO_URL}
              alt={`${name} logo`}
              className={styles.logo}
              width={200}
              height={60}
              loading="lazy"
              decoding="async"
            />
            <p className={styles.tagline}>
              Where Knowledge Meets Character — Estd. 2004, Guwahati
            </p>
            <address className={styles.address}>
              <span>{addressLine1}</span>
              <span>
                {addressLine2}, {COLLEGE_LOCATION.state}
              </span>
            </address>
            <ul className={styles.contactList} role="list">
              <li>
                <a href={phoneHref} className={styles.contactLink}>
                  <Icon
                    icon="mdi:phone-outline"
                    width={16}
                    height={16}
                    aria-hidden="true"
                  />
                  <span>{phone}</span>
                </a>
              </li>
              <li>
                <a href={emailHref} className={styles.contactLink}>
                  <Icon
                    icon="mdi:email-outline"
                    width={16}
                    height={16}
                    aria-hidden="true"
                  />
                  <span>{email}</span>
                </a>
              </li>
            </ul>
            {visibleSocials.length > 0 && (
              <ul className={styles.socialList} role="list">
                {visibleSocials.map((social) => {
                  const platformLabel =
                    SOCIAL_PLATFORM_LABELS[social.id] || social.id;
                  return (
                    <li key={social.id}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label={`Visit ${name} on ${platformLabel}`}
                      >
                        <Icon
                          icon={social.icon}
                          width={18}
                          height={18}
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Col 2 — Programmes */}
          {renderColumn({
            key: 'programmes',
            heading: 'Programmes',
            children: (
              <ul className={styles.linkList} role="list">
                {PROGRAMME_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={styles.link}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ),
          })}

          {/* Col 3 — Admissions */}
          {renderColumn({
            key: 'admissions',
            heading: 'Admissions',
            children: (
              <ul className={styles.linkList} role="list">
                <li>
                  <a
                    href="#apply"
                    className={styles.link}
                    onClick={handleApplyClick}
                  >
                    Apply Now
                  </a>
                </li>
                <li>
                  <a href="#fees" className={styles.link}>
                    Fee Structure
                  </a>
                </li>
                <li>
                  <a href="#scholarships" className={styles.link}>
                    Scholarships
                  </a>
                </li>
                <li>
                  <a href="#admissions" className={styles.link}>
                    Admission Process
                  </a>
                </li>
                <li>
                  <a
                    href={SAMARTH_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    Samarth Portal
                    <Icon
                      icon="mdi:open-in-new"
                      width={14}
                      height={14}
                      className={styles.externalIcon}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              </ul>
            ),
          })}

          {/* Col 4 — Quick Links */}
          {renderColumn({
            key: 'quick',
            heading: 'Quick Links',
            children: (
              <ul className={styles.linkList} role="list">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={styles.link}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ),
          })}
        </div>
      </div>

      {/* ===== Bottom band ===== */}
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span className={styles.copyright}>
            &copy; {currentYear} Icon Commerce College. All rights reserved.
          </span>
          <nav
            className={styles.legalLinks}
            aria-label="Footer legal navigation"
          >
            <a href="#" className={styles.legalLink}>
              Privacy Policy
            </a>
            <a href="#" className={styles.legalLink}>
              Terms of Use
            </a>
            <a href="/sitemap.xml" className={styles.legalLink}>
              Sitemap
            </a>
          </nav>
          <span className={styles.credit}>Designed &amp; built with care.</span>
        </div>
      </div>

      {/* ===== Back-to-top floating button ===== */}
      <button
        type="button"
        onClick={handleBackToTop}
        aria-label="Back to top"
        className={`${styles.backToTop} ${
          isScrolledPastHero ? styles.backToTopVisible : ''
        }`}
      >
        <Icon icon="mdi:arrow-up" width={22} height={22} aria-hidden="true" />
      </button>
    </footer>
  );
};

export default Footer;

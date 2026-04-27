/* ============================================
   Footer Component
   Four-strip footer: top CTA band, main dark grid,
   certifications, bottom bar.
   ============================================ */

import React from "react";
import styles from "./Footer.module.css";

const LOGO_URL = "https://placehold.co/400x400?text=TBD+Logo";
const WHATSAPP_URL = "";

const solutionLinks = [];
const companyLinks = [];

const socialLinks = [
  { label: "LinkedIn", letter: "L" },
  { label: "Instagram", letter: "I" },
  { label: "YouTube", letter: "Y" },
  { label: "Facebook", letter: "F" },
];

const certBadges = [];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Strip 1 — Top CTA band */}
      <div className={styles.topBand}>
        <div className={styles.topBandInner}>
          <p className={styles.topBandText}>__TBD_ICON_CONTENT__</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.topBandCta}
          >
            __TBD_ICON_CONTENT__
          </a>
        </div>
      </div>

      {/* Strip 2 — Main footer */}
      <div className={styles.main}>
        <div className={styles.mainInner}>
          {/* Col 1 — Brand */}
          <div className={styles.col}>
            <img src={LOGO_URL} alt="" className={styles.logo} />
            <p className={styles.tagline}>__TBD_ICON_CONTENT__</p>
            <div className={styles.social}>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={`https://placehold.co/40x40?text=${s.letter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label={s.label}
                >
                  <img
                    src={`https://placehold.co/40x40?text=${s.letter}`}
                    alt={s.label}
                    width={36}
                    height={36}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Programs */}
          <div className={styles.col}>
            <h4>__TBD_ICON_CONTENT__</h4>
            <ul>
              {solutionLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div className={styles.col}>
            <h4>__TBD_ICON_CONTENT__</h4>
            <ul>
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Talk to us */}
          <div className={styles.col}>
            <h4>__TBD_ICON_CONTENT__</h4>
            <ul>
              <li className={styles.regions}>__TBD_ICON_CONTENT__</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Strip 3 — Certifications / regulator strip */}
      <div className={styles.certs}>
        <div className={styles.certsInner}>
          {certBadges.map((badge) => (
            <img
              key={badge.alt}
              src={badge.src}
              alt={badge.alt}
              className={styles.certBadge}
              loading="lazy"
              decoding="async"
              width="120"
              height="48"
            />
          ))}
        </div>
      </div>

      {/* Strip 4 — Bottom bar */}
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span>&copy; 2026 __TBD_ICON_CONTENT__. All rights reserved.</span>
          <div className={styles.bottomLinks}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            <span aria-hidden="true">·</span>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>
            <span aria-hidden="true">·</span>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Refund Policy
            </a>
          </div>
          <span className={styles.tagRight}>__TBD_ICON_CONTENT__</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

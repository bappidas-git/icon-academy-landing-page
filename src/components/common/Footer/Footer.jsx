/* ============================================
   Footer Component
   Four-strip footer: top CTA band, main dark grid,
   certifications, bottom bar.
   ============================================ */

import React from "react";
import styles from "./Footer.module.css";

const LOGO_URL = "https://solar.anvil.energy/svgs/logo.svg";
const WHATSAPP_URL = "https://wa.me/911800202001";

const solutionLinks = [
  { label: "Residential Rooftop", href: "#solutions" },
  { label: "Villa & Large Home", href: "#solutions" },
  { label: "Housing Society", href: "#solutions" },
  { label: "Solar + Battery", href: "#solutions" },
];

const companyLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Calculator", href: "#calculator" },
  { label: "Subsidies & EMI", href: "#subsidies" },
  { label: "FAQs", href: "#faq" },
];

const socialLinks = [
  { label: "LinkedIn", letter: "L" },
  { label: "Instagram", letter: "I" },
  { label: "YouTube", letter: "Y" },
  { label: "Facebook", letter: "F" },
];

const certBadges = [
  { src: "https://placehold.co/120x48?text=MNRE", alt: "MNRE — Ministry of New and Renewable Energy" },
  { src: "https://placehold.co/120x48?text=BIS+Certified", alt: "BIS Certified" },
  { src: "https://placehold.co/120x48?text=PM+Surya+Ghar+Partner", alt: "PM Surya Ghar Partner" },
  { src: "https://placehold.co/120x48?text=Startup+India", alt: "Startup India" },
  { src: "https://placehold.co/120x48?text=ISO+9001", alt: "ISO 9001" },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Strip 1 — Top CTA band */}
      <div className={styles.topBand}>
        <div className={styles.topBandInner}>
          <p className={styles.topBandText}>
            Not ready to commit? Start with a 2-minute chat.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.topBandCta}
          >
            Chat on WhatsApp →
          </a>
        </div>
      </div>

      {/* Strip 2 — Main footer */}
      <div className={styles.main}>
        <div className={styles.mainInner}>
          {/* Col 1 — Brand */}
          <div className={styles.col}>
            <img src={LOGO_URL} alt="Anvil Solar" className={styles.logo} />
            <p className={styles.tagline}>
              India&apos;s hassle-free rooftop solar partner.
            </p>
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

          {/* Col 2 — Solutions */}
          <div className={styles.col}>
            <h4>Solutions</h4>
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
            <h4>Company</h4>
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
            <h4>Talk to us</h4>
            <ul>
              <li>
                <a href="tel:+911800202001">1800 2020 001</a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  wa.me/911800202001
                </a>
              </li>
              <li>
                <a href="mailto:hello@anvil.energy">hello@anvil.energy</a>
              </li>
              <li className={styles.regions}>
                Assam · Nagaland · Bhubaneswar · PAN-India
              </li>
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
          <span>&copy; 2026 Anvil Energy. All rights reserved.</span>
          <div className={styles.bottomLinks}>
            <a
              href="https://solar.anvil.energy/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://solar.anvil.energy/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://solar.anvil.energy/refund"
              target="_blank"
              rel="noopener noreferrer"
            >
              Refund Policy
            </a>
          </div>
          <span className={styles.tagRight}>Designed &amp; Developed by Assam Digital</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

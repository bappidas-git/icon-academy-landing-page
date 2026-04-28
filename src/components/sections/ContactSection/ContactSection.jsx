/* ============================================
   ContactSection — Icon Commerce College
   Two-column contact panel + map / inline form
   block. Surfaces address, phone, WhatsApp,
   email, hours, social handles, and uniform
   vendor info on the left; on the right an
   embedded Google Map and the unified
   <LeadForm variant="compact"> for "send us a
   message" submissions that flow through the
   same webhook pipeline as the drawer form.
   ============================================ */

import React from 'react';
import { Icon } from '@iconify/react';

import Section from '../../common/Section';
import SectionHeading from '../../common/SectionHeading';
import Reveal from '../../common/Reveal/Reveal';
import LeadForm from '../../common/LeadForm/LeadForm';
import { COLLEGE_LOCATION } from '../../../data/locationData';
import styles from './ContactSection.module.css';

const stripToDigits = (value) => (value || '').replace(/[^0-9]/g, '');
const stripPhoneForTel = (value) => (value || '').replace(/[^0-9+]/g, '');

const ContactSection = () => {
  const {
    name,
    addressLine1,
    addressLine2,
    phone,
    whatsapp,
    email,
    hours,
    mapEmbedUrl,
    directionsUrl,
    uniformVendor,
    socials,
  } = COLLEGE_LOCATION;

  const phoneHref = `tel:${stripPhoneForTel(phone)}`;
  const whatsappHref = `https://wa.me/${stripToDigits(whatsapp)}`;
  const emailHref = `mailto:${email}`;

  const visibleSocials = socials.filter((s) => !!s.url);

  return (
    <Section id="contact" variant="default" size="lg">
      <SectionHeading
        eyebrow="GET IN TOUCH"
        title="Visit Us, Call Us, Or Drop a Message"
        subtitle="Our admissions team is here to help — by phone, WhatsApp, email, or in person at our Guwahati campus."
      />

      <div className={styles.grid}>
        {/* ===== Left: Contact panel ===== */}
        <Reveal variant="slide-up" className={styles.panelCol}>
          <div className={styles.panel}>
            {/* Address */}
            <div className={styles.row}>
              <span className={styles.iconWrap} aria-hidden="true">
                <Icon icon="mdi:map-marker" width={28} height={28} />
              </span>
              <div className={styles.rowContent}>
                <span className={styles.rowLabel}>Campus Address</span>
                <address className={styles.addressValue}>
                  <span>{name}</span>
                  <span>{addressLine1}</span>
                  <span>{addressLine2}</span>
                </address>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directionsLink}
                  aria-label={`Get directions to ${name} on Google Maps`}
                >
                  Get directions →
                </a>
              </div>
            </div>

            {/* Phone */}
            <a
              href={phoneHref}
              className={`${styles.row} ${styles.rowLink}`}
              aria-label={`Call ${name} at ${phone}`}
            >
              <span className={styles.iconWrap} aria-hidden="true">
                <Icon icon="mdi:phone" width={28} height={28} />
              </span>
              <div className={styles.rowContent}>
                <span className={styles.rowLabel}>Phone</span>
                <span className={styles.rowValue}>{phone}</span>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.row} ${styles.rowLink}`}
              aria-label={`Chat with ${name} on WhatsApp at ${whatsapp}`}
            >
              <span className={styles.iconWrap} aria-hidden="true">
                <Icon icon="mdi:whatsapp" width={28} height={28} />
              </span>
              <div className={styles.rowContent}>
                <span className={styles.rowLabel}>WhatsApp</span>
                <span className={styles.rowValue}>{whatsapp}</span>
              </div>
            </a>

            {/* Email */}
            <a
              href={emailHref}
              className={`${styles.row} ${styles.rowLink}`}
              aria-label={`Email ${name} at ${email}`}
            >
              <span className={styles.iconWrap} aria-hidden="true">
                <Icon icon="mdi:email-outline" width={28} height={28} />
              </span>
              <div className={styles.rowContent}>
                <span className={styles.rowLabel}>Email</span>
                <span className={styles.rowValue}>{email}</span>
              </div>
            </a>

            {/* Hours */}
            <div className={styles.row}>
              <span className={styles.iconWrap} aria-hidden="true">
                <Icon icon="mdi:clock-outline" width={28} height={28} />
              </span>
              <div className={styles.rowContent}>
                <span className={styles.rowLabel}>Office Hours</span>
                <span className={styles.rowValue}>{hours}</span>
              </div>
            </div>

            {/* Socials */}
            {visibleSocials.length > 0 && (
              <div className={styles.socialsRow}>
                <span className={styles.rowLabel}>Follow us</span>
                <ul className={styles.socialList} role="list">
                  {visibleSocials.map((social) => (
                    <li key={social.id}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label={`${name} on ${social.id}`}
                      >
                        <Icon icon={social.icon} width={22} height={22} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Uniform vendor card */}
          <div className={styles.vendorCard}>
            <div className={styles.vendorHead}>
              <Icon
                icon="mdi:tshirt-crew-outline"
                width={22}
                height={22}
                className={styles.vendorIcon}
                aria-hidden="true"
              />
              <span className={styles.vendorTitle}>
                For uniforms, contact {uniformVendor.name}
              </span>
            </div>
            <p className={styles.vendorAddress}>{uniformVendor.address}</p>
            <ul className={styles.vendorPhones} role="list">
              {uniformVendor.phones.map((p) => (
                <li key={p}>
                  <a
                    href={`tel:${stripPhoneForTel(p)}`}
                    className={styles.vendorPhoneLink}
                    aria-label={`Call ${uniformVendor.name} at ${p}`}
                  >
                    <Icon
                      icon="mdi:phone-outline"
                      width={16}
                      height={16}
                      aria-hidden="true"
                    />
                    <span>{p}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* ===== Right: Map + inline form ===== */}
        <Reveal variant="slide-up" delay={80} className={styles.mediaCol}>
          <div className={styles.mapCard}>
            <iframe
              src={mapEmbedUrl}
              title="Icon Commerce College location on Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className={styles.mapFrame}
            />
          </div>

          <div className={styles.formBlock}>
            <h3 className={styles.formHeading}>Send us a message</h3>
            <LeadForm
              variant="compact"
              source="contact_inline"
              showTitle={false}
              showCourseFields={false}
              submitButtonText="Send message"
              formId="contact-inline-lead-form"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

export default ContactSection;

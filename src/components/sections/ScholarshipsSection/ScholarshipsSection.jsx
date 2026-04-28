/* ============================================
   ScholarshipsSection — Icon Commerce College
   Reduces financial anxiety by surfacing the
   Government-approved scholarship facilitation
   ICC offers: three category cards, an eligibility
   document strip, and a Nodal Officer card with
   counselling CTA. All schemes are facilitated —
   not administered — by the college.
   ============================================ */

import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';

import { useModal } from '../../../context/ModalContext';
import Reveal from '../../common/Reveal/Reveal';
import {
  SCHOLARSHIP_CATEGORIES,
  ELIGIBILITY_CRITERIA,
  NODAL_OFFICER,
  SCHOLARSHIPS_DISCLAIMER,
} from '../../../data/scholarshipsData';
import styles from './ScholarshipsSection.module.css';

const ScholarshipsSection = () => {
  const { openLeadDrawer } = useModal();

  const handleCounsellingClick = () => {
    openLeadDrawer({ source: NODAL_OFFICER.ctaSource });
  };

  return (
    <section
      id="scholarships"
      role="region"
      aria-label="Government scholarships and financial support"
      className={styles.section}
    >
      <Container maxWidth="xl" className={styles.container}>
        <header className={styles.header}>
          <Reveal variant="slide-up" delay={0}>
            <span className={styles.eyebrow}>SCHOLARSHIPS</span>
          </Reveal>

          <Reveal variant="slide-up" delay={50}>
            <Typography
              variant="h2"
              component="h2"
              className={styles.heading}
            >
              Don&rsquo;t Let Finances Hold You Back
            </Typography>
          </Reveal>

          <Reveal variant="slide-up" delay={100}>
            <Typography component="p" className={styles.subhead}>
              Icon Commerce College facilitates a range of Central, State, and
              institutional scholarship schemes — eligible students get
              hands-on guidance from our Nodal Officer.
            </Typography>
          </Reveal>
        </header>

        {/* ===== Category cards ===== */}
        <ul
          className={styles.cardGrid}
          role="list"
          aria-label="Scholarship categories"
        >
          {SCHOLARSHIP_CATEGORIES.map((category, index) => (
            <li key={category.id} className={styles.cardItem}>
              <Reveal variant="slide-up" delay={index * 80}>
                <article className={styles.card}>
                  <span className={styles.cardIconTile} aria-hidden="true">
                    <Icon
                      icon={category.icon}
                      width={32}
                      height={32}
                      className={styles.cardIcon}
                    />
                  </span>

                  <h3 className={styles.cardTitle}>{category.title}</h3>

                  <ul
                    className={styles.schemeList}
                    role="list"
                    aria-label={`${category.title} schemes`}
                  >
                    {category.schemes.map((scheme) => (
                      <li key={scheme} className={styles.schemeItem}>
                        <Icon
                          icon="mdi:check-circle"
                          width={18}
                          height={18}
                          className={styles.schemeCheck}
                          aria-hidden="true"
                        />
                        <span>{scheme}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={styles.cardFootLink}
                  >
                    Talk to Nodal Officer →
                  </a>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* ===== Eligibility callout strip ===== */}
        <div className={styles.eligibilityBlock}>
          <Reveal variant="slide-up" delay={0}>
            <h3 className={styles.subheading}>Common Eligibility Documents</h3>
          </Reveal>

          <ul
            className={styles.eligibilityRow}
            role="list"
            aria-label="Common documents required for scholarship applications"
          >
            {ELIGIBILITY_CRITERIA.map((criterion, index) => (
              <li key={criterion.id} className={styles.eligibilityItem}>
                <Reveal variant="slide-up" delay={index * 50}>
                  <div className={styles.pillCard}>
                    <span className={styles.pillIconWrap} aria-hidden="true">
                      <Icon
                        icon={criterion.icon}
                        width={18}
                        height={18}
                        className={styles.pillIcon}
                      />
                    </span>
                    <span className={styles.pillLabel}>{criterion.label}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== Nodal Officer card ===== */}
        <Reveal variant="slide-up" delay={0}>
          <div className={styles.nodalCard}>
            <div className={styles.nodalIconWrap} aria-hidden="true">
              <Icon
                icon="mdi:account-tie"
                width={64}
                height={64}
                className={styles.nodalIcon}
              />
            </div>

            <div className={styles.nodalContent}>
              <h3 className={styles.nodalTitle}>{NODAL_OFFICER.title}</h3>
              <Typography component="p" className={styles.nodalBody}>
                {NODAL_OFFICER.body}
              </Typography>
              <Button
                color="cta"
                variant="contained"
                size="large"
                className={styles.nodalButton}
                onClick={handleCounsellingClick}
              >
                {NODAL_OFFICER.ctaLabel}
              </Button>
            </div>
          </div>
        </Reveal>

        {/* ===== Disclaimer ===== */}
        <Reveal variant="slide-up" delay={0}>
          <p className={styles.disclaimer}>{SCHOLARSHIPS_DISCLAIMER}</p>
        </Reveal>
      </Container>
    </section>
  );
};

export default ScholarshipsSection;

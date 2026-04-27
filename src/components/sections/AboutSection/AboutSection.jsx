/* ============================================
   AboutSection — Icon Commerce College
   Two-column institutional story. Eyebrow → H2 →
   lead → body → signature card → CTAs on the
   left; building photo + three pillar cards on
   the right. Stacks to a single column on mobile.
   Honours `prefers-reduced-motion`.
   ============================================ */

import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import { useModal } from '../../../context/ModalContext';
import Reveal from '../../common/Reveal/Reveal';
import useReducedMotion from '../../../hooks/useReducedMotion';
import styles from './AboutSection.module.css';

const PILLARS = [
  {
    icon: 'mdi:school-outline',
    title: 'Academic Excellence',
    copy: 'Faculty pursuing Ph.D., NET, SLET — high pass percentages, GU merit-list ranks.',
  },
  {
    icon: 'mdi:account-heart-outline',
    title: 'Holistic Development',
    copy: 'Annual College Week, sports, debate, cooking competition, and seminars.',
  },
  {
    icon: 'mdi:shield-check-outline',
    title: 'Student-First Culture',
    copy: 'Each faculty mentors a student group; strict anti-ragging, transparent governance.',
  },
];

const BUILDING_IMG = 'https://placehold.co/640x720?text=Icon+Commerce+College+Building';
const PRINCIPAL_IMG = 'https://placehold.co/120x120?text=Principal';

const AboutSection = () => {
  const { openLeadDrawer } = useModal();
  const reduced = useReducedMotion();

  const visualInitial = reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 };

  return (
    <section
      id="about"
      role="region"
      aria-label="About Icon Commerce College"
      className={styles.section}
    >
      <Container maxWidth="xl" className={styles.container}>
        <div className={styles.layout}>
          {/* === Left column === */}
          <div className={styles.content}>
            <Reveal variant="slide-up" delay={0}>
              <span className={styles.eyebrow}>ABOUT THE COLLEGE</span>
            </Reveal>

            <Reveal variant="slide-up" delay={50}>
              <Typography
                variant="h2"
                component="h2"
                className={styles.heading}
              >
                A Legacy of Quality Higher Education in Guwahati
              </Typography>
            </Reveal>

            <Reveal variant="slide-up" delay={100}>
              <Typography component="p" className={styles.lead}>
                Established in 2004, Icon Commerce College is one of the most
                promising educational institutions in Assam — affiliated to
                Gauhati University and committed to providing quality
                undergraduate education in Commerce, Arts, Business
                Administration, and Computer Applications.
              </Typography>
            </Reveal>

            <Reveal variant="slide-up" delay={150}>
              <Typography component="p" className={styles.body}>
                We serve as a permitted Examination centre under Gauhati
                University and follow all GU regulations. Our learned
                faculty — many holding Ph.D., M.Phil., NET, and SLET
                qualifications — combine classroom teaching, smart-classroom
                technology, and personal mentorship to nurture every student's
                all-round development.
              </Typography>
            </Reveal>

            <Reveal variant="slide-up" delay={200}>
              <div className={styles.signatureCard}>
                <img
                  src={PRINCIPAL_IMG}
                  alt="Dr. Mandira Saha, Principal"
                  className={styles.signaturePortrait}
                  width="56"
                  height="56"
                  loading="lazy"
                  decoding="async"
                />
                <div className={styles.signatureText}>
                  <span className={styles.signatureName}>Dr. Mandira Saha</span>
                  <span className={styles.signatureRole}>
                    Principal — Icon Commerce College
                  </span>
                  <span className={styles.signatureCreds}>
                    M.Com., M.Phil., Ph.D.
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal variant="slide-up" delay={250}>
              <div className={styles.ctaRow}>
                <Button
                  color="cta"
                  variant="contained"
                  size="large"
                  className={styles.primaryCta}
                  onClick={() => openLeadDrawer({ source: 'about_apply' })}
                >
                  Apply for 2026 Admissions
                </Button>
                <Button
                  variant="text"
                  size="large"
                  href="#leadership"
                  className={styles.secondaryCta}
                >
                  Read Principal's Message →
                </Button>
              </div>
            </Reveal>
          </div>

          {/* === Right column === */}
          <motion.div
            className={styles.visual}
            initial={visualInitial}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className={styles.imageCard}>
              <img
                src={BUILDING_IMG}
                alt="Icon Commerce College building"
                className={styles.buildingImg}
                width="640"
                height="720"
                loading="lazy"
                decoding="async"
              />
            </div>

            <ul className={styles.pillarList} role="list">
              {PILLARS.map((pillar, index) => (
                <motion.li
                  key={pillar.title}
                  className={styles.pillarCard}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.45,
                    ease: 'easeOut',
                    delay: reduced ? 0 : index * 0.1,
                  }}
                >
                  <Icon
                    icon={pillar.icon}
                    className={styles.pillarIcon}
                    width={28}
                    height={28}
                    aria-hidden="true"
                  />
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                  <p className={styles.pillarCopy}>{pillar.copy}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection;

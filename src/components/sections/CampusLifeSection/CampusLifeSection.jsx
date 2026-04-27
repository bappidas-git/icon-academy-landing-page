/* ============================================
   CampusLifeSection — Icon Commerce College
   Showcases the student-life dimension: flagship
   events (ICON Shield, ICON Trophy, Inter-College
   Cooking Competition), the Annual College Week
   highlights strip, and Academic Life cards.
   Closes with a soft counsellor CTA strip.
   ============================================ */

import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { useModal } from '../../../context/ModalContext';
import Reveal from '../../common/Reveal/Reveal';
import {
  FLAGSHIP_EVENTS,
  COLLEGE_WEEK_HIGHLIGHTS,
  ACADEMIC_LIFE,
} from '../../../data/campusLifeData';
import EventCard from './EventCard';
import styles from './CampusLifeSection.module.css';

const CampusLifeSection = () => {
  const { openLeadDrawer } = useModal();

  const handleCounsellorClick = () => {
    openLeadDrawer({ source: 'campus_life_counsellor' });
  };

  return (
    <section
      id="campus-life"
      role="region"
      aria-label="Campus life and events"
      className={styles.section}
    >
      <Container maxWidth="xl" className={styles.container}>
        <header className={styles.header}>
          <Reveal variant="slide-up" delay={0}>
            <span className={styles.eyebrow}>CAMPUS LIFE &amp; EVENTS</span>
          </Reveal>

          <Reveal variant="slide-up" delay={50}>
            <Typography
              variant="h2"
              component="h2"
              className={styles.heading}
            >
              Beyond the Books — A College Life Worth Remembering
            </Typography>
          </Reveal>

          <Reveal variant="slide-up" delay={100}>
            <Typography component="p" className={styles.subhead}>
              Sports, debate, quiz, art, literature, food — and lifelong
              friendships. Every year, our students live more than just lectures.
            </Typography>
          </Reveal>
        </header>

        {/* ===== Flagship events: 3-up grid on desktop, carousel on mobile ===== */}
        <div className={styles.flagshipDesktop}>
          <ul
            className={styles.flagshipGrid}
            role="list"
            aria-label="Flagship campus events"
          >
            {FLAGSHIP_EVENTS.map((event, index) => (
              <li key={event.id} className={styles.flagshipItem}>
                <Reveal variant="slide-up" delay={index * 80}>
                  <EventCard event={event} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.flagshipMobile}>
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={1.05}
            aria-label="Flagship campus events carousel"
          >
            {FLAGSHIP_EVENTS.map((event) => (
              <SwiperSlide key={event.id}>
                <EventCard event={event} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ===== Annual College Week ===== */}
        <div className={styles.collegeWeek}>
          <Reveal variant="slide-up" delay={0}>
            <h3 className={styles.subheading}>What happens during College Week</h3>
          </Reveal>

          <ul
            className={styles.weekStrip}
            role="list"
            aria-label="Annual College Week highlights"
          >
            {COLLEGE_WEEK_HIGHLIGHTS.map((item, index) => (
              <li key={item.id} className={styles.weekItem}>
                <Reveal variant="slide-up" delay={index * 50}>
                  <div className={styles.weekTile}>
                    <Icon
                      icon={item.icon}
                      width={28}
                      height={28}
                      className={styles.weekIcon}
                      aria-hidden="true"
                    />
                  </div>
                  <span className={styles.weekLabel}>{item.label}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== Academic Life ===== */}
        <ul
          className={styles.academicGrid}
          role="list"
          aria-label="Academic life activities"
        >
          {ACADEMIC_LIFE.map((item, index) => (
            <li key={item.id} className={styles.academicItem}>
              <Reveal variant="slide-up" delay={index * 60}>
                <article className={styles.academicCard}>
                  <span className={styles.academicIconWrap} aria-hidden="true">
                    <Icon
                      icon={item.icon}
                      width={26}
                      height={26}
                      className={styles.academicIcon}
                    />
                  </span>
                  <h4 className={styles.academicTitle}>{item.title}</h4>
                  <p className={styles.academicBody}>{item.body}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* ===== CTA strip ===== */}
        <Reveal variant="slide-up" delay={0}>
          <div className={styles.calloutStrip}>
            <Typography component="p" className={styles.calloutHeadline}>
              Curious about our annual events? Talk to a counsellor.
            </Typography>
            <Button
              color="cta"
              variant="contained"
              size="large"
              className={styles.calloutButton}
              onClick={handleCounsellorClick}
            >
              Talk to a Counsellor
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default CampusLifeSection;

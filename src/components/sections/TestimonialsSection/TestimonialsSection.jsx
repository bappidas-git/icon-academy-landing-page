/* ============================================
   TestimonialsSection — Icon Commerce College
   Swipeable carousel of alumni voices: 3-up on
   desktop, 2 on tablet, 1 on mobile. Autoplay
   pauses on hover and disables under
   prefers-reduced-motion.
   ============================================ */

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Section from '../../common/Section';
import SectionHeading from '../../common/SectionHeading';
import Reveal from '../../common/Reveal/Reveal';
import useReducedMotion from '../../../hooks/useReducedMotion';
import TestimonialCard from './TestimonialCard';
import { TESTIMONIALS } from '../../../data/testimonialsData';
import styles from './TestimonialsSection.module.css';

const TestimonialsSection = () => {
  const reduced = useReducedMotion();

  const autoplayConfig = reduced
    ? false
    : { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true };

  return (
    <Section id="testimonials" variant="default" size="lg">
      <SectionHeading
        eyebrow="STUDENT VOICES"
        title="What Our Alumni Say"
        subtitle="From banking and government to teaching and entrepreneurship — Icon Commerce College graduates speak for themselves."
      />

      <Reveal variant="fade" className={styles.sliderWrap}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={autoplayConfig}
          loop
          spaceBetween={20}
          slidesPerView={1.05}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 28,
            },
          }}
          aria-label="Alumni testimonials carousel"
        >
          {TESTIMONIALS.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Reveal>

      <p className={styles.shareStrip}>
        <a
          className={styles.shareLink}
          href="mailto:alumni@iconcommercecollege.in"
        >
          Are you an ICC alumnus? Share your story →
        </a>
      </p>
    </Section>
  );
};

export default TestimonialsSection;

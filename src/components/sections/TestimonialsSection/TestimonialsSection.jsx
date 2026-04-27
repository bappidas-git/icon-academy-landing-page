/* ============================================
   TestimonialsSection
   Social proof slider. Swiper: 3-up on desktop,
   1.1-per-view on mobile with autoplay.
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
import TestimonialCard from './TestimonialCard';
import { testimonialsData } from '../../../data/testimonialsData';
import styles from './TestimonialsSection.module.css';

const TestimonialsSection = () => {
  return (
    <Section id="testimonials" variant="default" size="lg">
      <SectionHeading
        eyebrow="__TBD_ICON_CONTENT__"
        title="__TBD_ICON_CONTENT__"
        subtitle="__TBD_ICON_CONTENT__"
      />

      <Reveal variant="fade" className={styles.sliderWrap}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop
          spaceBetween={16}
          slidesPerView={1.1}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
        >
          {testimonialsData.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Reveal>

      <p className={styles.summary}>__TBD_ICON_CONTENT__</p>
    </Section>
  );
};

export default TestimonialsSection;

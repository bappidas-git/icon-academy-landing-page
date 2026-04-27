import React from 'react';
import { Icon } from '@iconify/react';
import Section from '../../common/Section';
import SectionHeading from '../../common/SectionHeading';
import Reveal from '../../common/Reveal/Reveal';
import { howItWorksData } from '../../../data/howItWorksData';
import styles from './HowItWorksSection.module.css';

const HowItWorksSection = () => {
  return (
    <Section id="how-it-works" variant="muted" size="lg">
      <SectionHeading
        eyebrow="Simple, no-stress process"
        title="From your first click to free power, in 4 steps."
        subtitle="We handle the design, subsidy paperwork, DISCOM coordination, and install. You only show up for the tea."
      />

      <div className={styles.grid}>
        {howItWorksData.map((step, index) => (
          <Reveal key={step.number} delay={index * 80}>
            <article className={styles.card}>
              <span className={styles.number}>{step.number}</span>
              <Icon icon={step.icon} className={styles.icon} aria-hidden="true" />
              <h4 className={styles.title}>{step.title}</h4>
              <span className={styles.duration}>
                <Icon icon="mdi:clock-outline" aria-hidden="true" />
                {step.duration}
              </span>
              <p className={styles.description}>{step.description}</p>
              <img
                src={step.image}
                alt={step.title}
                className={styles.image}
                loading="lazy"
                decoding="async"
                width="600"
                height="400"
              />
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default HowItWorksSection;

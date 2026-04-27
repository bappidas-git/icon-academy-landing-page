import React from 'react';

import Section from '../../common/Section';
import SectionHeading from '../../common/SectionHeading';
import Reveal from '../../common/Reveal/Reveal';
import GalleryCard from './GalleryCard';
import { installGalleryData } from '../../../data/installGalleryData';
import styles from './InstallGallery.module.css';

const InstallGallery = () => {
  return (
    <Section id="gallery" variant="muted" size="lg">
      <SectionHeading
        eyebrow="Installation gallery"
        title="Real rooftops. Real families. Real savings."
        subtitle="Recent installs across Assam, Nagaland & Odisha — the homes already running on sunshine."
      />

      <div className={styles.grid}>
        {installGalleryData.map((item, index) => (
          <Reveal key={item.id} delay={index * 80}>
            <GalleryCard
              location={item.location}
              systemKw={item.systemKw}
              type={item.type}
              image={item.image}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default InstallGallery;

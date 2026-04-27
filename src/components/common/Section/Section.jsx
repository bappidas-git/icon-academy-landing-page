import React from 'react';
import styles from './Section.module.css';

const Section = ({
  id,
  variant = 'default',
  size = 'md',
  containerMaxWidth = 'xl',
  children,
  className = '',
  as: Tag = 'section',
  ...rest
}) => {
  const sectionClass = [
    styles.section,
    styles[size],
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const containerClass = [
    styles.container,
    containerMaxWidth === 'lg' && styles['container-lg'],
    containerMaxWidth === '2xl' && styles['container-2xl'],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag id={id} className={sectionClass} {...rest}>
      <div className={containerClass}>{children}</div>
    </Tag>
  );
};

export default Section;

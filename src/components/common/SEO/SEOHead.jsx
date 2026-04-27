/* ============================================
   SEOHead Component
   Manages document head SEO tags dynamically
   per route. Uses direct DOM manipulation since
   this is a CRA-based SPA without react-helmet.
   ============================================ */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { seoConfig } from '../../../config/seo';
import {
  updatePageSEO,
  injectSchema,
  removeSchema,
  generateOrganizationSchema,
  generateCourseSchemas,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from '../../../utils/seo';

// Schema IDs owned by this component on the home route — kept in one place
// so route changes can add/remove them cleanly. One Course schema per
// programme listed in `seoConfig.courses`.
const HOME_SCHEMA_IDS = [
  'organization-schema',
  'course-bcom-schema',
  'course-bba-schema',
  'course-bca-schema',
  'course-ba-schema',
  'faq-schema',
  'breadcrumb-schema',
  'webpage-schema',
];

const SEOHead = () => {
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    const canonicalUrl = seoConfig.site.url + pathname;

    if (pathname === '/') {
      updatePageSEO({
        title: seoConfig.pages.home.title,
        description: seoConfig.pages.home.description,
        url: canonicalUrl,
      });

      injectSchema('organization-schema', generateOrganizationSchema());

      const courseSchemas = generateCourseSchemas();
      seoConfig.courses.forEach((course, idx) => {
        injectSchema(`course-${course.id}-schema`, courseSchemas[idx]);
      });

      injectSchema('faq-schema', generateFAQSchema());
      injectSchema(
        'breadcrumb-schema',
        generateBreadcrumbSchema([
          { name: 'Home', url: seoConfig.site.url + '/' },
        ])
      );
      injectSchema(
        'webpage-schema',
        generateWebPageSchema({
          name: seoConfig.pages.home.title,
          description: seoConfig.pages.home.description,
          url: seoConfig.site.url + '/',
        })
      );
    } else if (pathname === '/thank-you') {
      updatePageSEO({
        title: seoConfig.pages.thankYou.title,
        description: seoConfig.pages.thankYou.description,
        url: canonicalUrl,
        robots: 'noindex, nofollow',
      });
      // Thank-you is noindex but keep canonical so crawlers reconcile the URL.
      HOME_SCHEMA_IDS.forEach(removeSchema);
    } else if (pathname.startsWith('/admin')) {
      updatePageSEO({
        title: seoConfig.pages.admin.title,
        robots: 'noindex, nofollow',
        url: canonicalUrl,
      });
      HOME_SCHEMA_IDS.forEach(removeSchema);
    }
  }, [location]);

  return null;
};

export default SEOHead;

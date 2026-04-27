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
  generateLocalBusinessSchema,
  generateRooftopSolarServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from '../../../utils/seo';

// Schema IDs owned by this component — kept in one place so route changes
// can add/remove them cleanly.
const HOME_SCHEMA_IDS = [
  'schema-organization',
  'schema-localbusiness',
  'schema-service',
  'schema-faq',
  'schema-breadcrumb',
  'schema-webpage',
];

const SEOHead = () => {
  const location = useLocation();

  // Update page SEO + structured data based on current route
  useEffect(() => {
    const { pathname } = location;
    const canonicalUrl = seoConfig.siteUrl + pathname;

    if (pathname === '/') {
      updatePageSEO({
        title: seoConfig.pages.home.title,
        description: seoConfig.pages.home.description,
        url: canonicalUrl,
      });

      // Home-only structured data: LocalBusiness, Service, FAQPage
      // + supporting Organization, Breadcrumb, WebPage
      injectSchema('schema-localbusiness', generateLocalBusinessSchema());
      injectSchema('schema-service', generateRooftopSolarServiceSchema());
      injectSchema('schema-faq', generateFAQSchema());
      injectSchema('schema-organization', generateOrganizationSchema());
      injectSchema(
        'schema-breadcrumb',
        generateBreadcrumbSchema([
          { name: 'Home', url: seoConfig.siteUrl + '/' },
        ])
      );
      injectSchema(
        'schema-webpage',
        generateWebPageSchema({
          name: seoConfig.pages.home.title,
          description: seoConfig.pages.home.description,
          url: seoConfig.siteUrl + '/',
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

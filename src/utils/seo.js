/* ============================================
   SEO Utility Functions — Icon Commerce College
   Dynamic SEO management for SPAs: meta tag
   updates and JSON-LD schema injection.

   Note: the legacy generic-service generator has
   been retired. SEOHead.jsx now calls
   `generateCourseSchemas()` directly (preferred
   approach per spec — call-sites updated rather
   than aliasing a no-op export).
   ============================================ */

import { seoConfig } from '../config/seo';

// =========================================
// Page SEO — Update document title & meta tags
// =========================================

/**
 * Update page title, meta description, OG tags, Twitter cards, and canonical
 * link based on the supplied page-level config. Mirrors the previous public
 * signature: callers pass an object with title / description / image / url /
 * robots / type. SEOHead.jsx feeds this from `seoConfig.pages[<key>]`.
 */
export function updatePageSEO(pageConfig = {}) {
  const {
    title,
    description = seoConfig.site.defaultDescription,
    image = seoConfig.site.defaultImage,
    url,
    robots,
    type = 'website',
  } = pageConfig;

  if (title) {
    document.title = title;
  }

  const setMeta = (attr, key, value) => {
    if (!value) return;
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
  };

  setMeta('name', 'description', description);
  if (robots) {
    setMeta('name', 'robots', robots);
  }

  setMeta('property', 'og:title', title || seoConfig.site.defaultTitle);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:image', image);
  setMeta('property', 'og:type', type);
  setMeta('property', 'og:site_name', seoConfig.site.name);
  setMeta('property', 'og:locale', seoConfig.site.locale);
  if (url) {
    setMeta('property', 'og:url', url);
  }

  setMeta('name', 'twitter:title', title || seoConfig.site.defaultTitle);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', image);
  if (seoConfig.site.twitterHandle) {
    setMeta('name', 'twitter:site', seoConfig.site.twitterHandle);
  }

  if (url) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }
}

// =========================================
// JSON-LD Schema Injection / Removal
// =========================================

export function injectSchema(id, schemaObject) {
  if (!schemaObject) return;
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('id', id);
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schemaObject);
}

export function removeSchema(id) {
  const script = document.getElementById(id);
  if (script && script.parentNode) {
    script.parentNode.removeChild(script);
  }
}

// =========================================
// Schema Generators
// =========================================

function buildPostalAddress(address) {
  return {
    '@type': 'PostalAddress',
    ...(address.streetAddress && { streetAddress: address.streetAddress }),
    ...(address.addressLocality && { addressLocality: address.addressLocality }),
    ...(address.addressRegion && { addressRegion: address.addressRegion }),
    ...(address.postalCode && { postalCode: address.postalCode }),
    addressCountry: address.addressCountry,
  };
}

/**
 * Generate the EducationalOrganization / CollegeOrUniversity schema for the
 * college. Uses an @type array so the page is recognised as both an
 * EducationalOrganization (for the wider knowledge graph) and a
 * CollegeOrUniversity (for higher-ed surfaces).
 */
export function generateOrganizationSchema(config) {
  const org = config || seoConfig.organization;

  const schema = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'CollegeOrUniversity'],
    name: org.name,
    alternateName: org.alternateName,
    url: org.url,
    logo: org.logo,
    description: org.description,
    telephone: org.phone,
    email: org.email,
    address: buildPostalAddress(org.address),
  };

  if (org.geo && org.geo.latitude && org.geo.longitude) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: org.geo.latitude,
      longitude: org.geo.longitude,
    };
  }

  if (org.areaServed && org.areaServed.length > 0) {
    schema.areaServed = org.areaServed;
  }

  if (org.sameAs && org.sameAs.length > 0) {
    schema.sameAs = org.sameAs;
  }

  if (org.foundingDate) {
    schema.foundingDate = org.foundingDate;
  }

  if (org.parentOrganization && org.parentOrganization.name) {
    schema.parentOrganization = {
      '@type': 'CollegeOrUniversity',
      name: org.parentOrganization.name,
      ...(org.parentOrganization.url && { url: org.parentOrganization.url }),
    };
  }

  if (org.aggregateRating && org.aggregateRating.ratingValue) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: org.aggregateRating.ratingValue,
      reviewCount: org.aggregateRating.reviewCount,
      ...(org.aggregateRating.bestRating && { bestRating: org.aggregateRating.bestRating }),
      ...(org.aggregateRating.worstRating && { worstRating: org.aggregateRating.worstRating }),
    };
  }

  return schema;
}

/**
 * Legacy alias retained so SEOHead.jsx imports stay stable. Routes to the
 * EducationalOrganization builder above.
 */
export function generateLocalBusinessSchema(config) {
  return generateOrganizationSchema(config);
}

/**
 * Build one Course schema per programme listed in seoConfig.courses.
 * Each schema also declares a CourseInstance (Google's required `hasCourseInstance`
 * field for Course rich results).
 */
export function generateCourseSchemas() {
  const org = seoConfig.organization;

  return seoConfig.courses.map((course) => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: course.name,
      description: course.description,
      provider: {
        '@type': 'EducationalOrganization',
        name: course.provider || org.name,
        sameAs: org.url,
      },
      educationalLevel: course.educationalLevel,
      occupationalCategory: course.occupationalCategory,
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'Onsite',
        ...(course.durationP && { courseWorkload: course.durationP }),
      },
    };

    if (course.offers) {
      schema.offers = {
        '@type': 'Offer',
        price: course.offers.price,
        priceCurrency: course.offers.priceCurrency,
        category: course.offers.category,
        availability: 'https://schema.org/InStock',
      };
    }

    return schema;
  });
}

/**
 * FAQPage schema sourced from seoConfig.faqs.
 */
export function generateFAQSchema(faqs) {
  const faqItems = faqs || seoConfig.faqs;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.q || faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a || faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateWebPageSchema(config = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: config.name || seoConfig.site.defaultTitle,
    description: config.description || seoConfig.site.defaultDescription,
    url: config.url || seoConfig.site.url,
    inLanguage: seoConfig.site.language,
    isPartOf: {
      '@type': 'WebSite',
      name: seoConfig.site.name,
      url: seoConfig.site.url,
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: seoConfig.organization.name,
      logo: {
        '@type': 'ImageObject',
        url: seoConfig.organization.logo,
      },
    },
  };
}

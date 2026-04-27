/* ============================================
   SEO Utility Functions
   Dynamic SEO management for SPAs including
   meta tag updates and JSON-LD schema injection.
   ============================================ */

import { seoConfig } from '../config/seo';
import { faqData } from '../data/faqData';

// =========================================
// Page SEO — Update document title & meta tags
// =========================================

/**
 * Update page title, meta description, OG tags, and Twitter cards dynamically.
 * @param {Object} pageConfig - Page-specific SEO overrides
 * @param {string} [pageConfig.title] - Page title
 * @param {string} [pageConfig.description] - Meta description (150-160 chars recommended)
 * @param {string} [pageConfig.image] - OG/Twitter image URL
 * @param {string} [pageConfig.url] - Canonical URL for this page
 * @param {string} [pageConfig.robots] - Robots directive (e.g., 'noindex, nofollow')
 * @param {string} [pageConfig.type] - OG type (default: 'website')
 */
export function updatePageSEO(pageConfig = {}) {
  const {
    title,
    description = seoConfig.defaultDescription,
    image = seoConfig.defaultImage,
    url,
    robots,
    type = 'website',
  } = pageConfig;

  // Title
  if (title) {
    document.title = title;
  }

  // Helper to set or create a meta tag
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

  // Standard meta
  setMeta('name', 'description', description);
  if (robots) {
    setMeta('name', 'robots', robots);
  }

  // Open Graph
  setMeta('property', 'og:title', title || seoConfig.defaultTitle);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:image', image);
  setMeta('property', 'og:type', type);
  setMeta('property', 'og:site_name', seoConfig.siteName);
  setMeta('property', 'og:locale', seoConfig.locale);
  if (url) {
    setMeta('property', 'og:url', url);
  }

  // Twitter Card
  setMeta('name', 'twitter:title', title || seoConfig.defaultTitle);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', image);

  // Canonical URL
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

/**
 * Inject a JSON-LD schema into the <head>. If a script with the given ID
 * already exists, its content is replaced.
 * @param {string} id - Unique ID for the script element (e.g., 'schema-organization')
 * @param {Object} schemaObject - The JSON-LD object to inject
 */
export function injectSchema(id, schemaObject) {
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('id', id);
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schemaObject);
}

/**
 * Remove a JSON-LD schema by its script element ID.
 * @param {string} id - The ID of the script element to remove
 */
export function removeSchema(id) {
  const script = document.getElementById(id);
  if (script && script.parentNode) {
    script.parentNode.removeChild(script);
  }
}

// =========================================
// Schema Generators
// =========================================

/**
 * Generate Organization schema from seoConfig.
 * @param {Object} [config] - Override seoConfig.organization
 * @returns {Object} JSON-LD Organization schema
 */
export function generateOrganizationSchema(config) {
  const org = config || seoConfig.organization;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    alternateName: org.alternateName,
    url: org.url,
    logo: org.logo,
    description: org.description,
    telephone: org.phone,
    email: org.email,
    address: {
      '@type': 'PostalAddress',
      ...(org.address.streetAddress && { streetAddress: org.address.streetAddress }),
      ...(org.address.addressLocality && { addressLocality: org.address.addressLocality }),
      ...(org.address.addressRegion && { addressRegion: org.address.addressRegion }),
      ...(org.address.postalCode && { postalCode: org.address.postalCode }),
      addressCountry: org.address.addressCountry,
    },
  };

  if (org.sameAs && org.sameAs.length > 0) {
    schema.sameAs = org.sameAs;
  }

  if (org.founder && org.founder.name) {
    schema.founder = {
      '@type': 'Person',
      name: org.founder.name,
      ...(org.founder.jobTitle && { jobTitle: org.founder.jobTitle }),
    };
  }

  if (org.foundingDate) {
    schema.foundingDate = org.foundingDate;
  }

  return schema;
}

/**
 * Generate FAQPage schema. Reads from the live FAQ data file
 * (src/data/faqData.js) so the rich result stays in sync with what
 * users see on the page.
 * @param {Array} [faqs] - Array of FAQ items. Accepts either
 *   {q, a} (faqData) or {question, answer} shapes.
 * @returns {Object} JSON-LD FAQPage schema
 */
export function generateFAQSchema(faqs) {
  const faqItems = faqs || faqData;
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

/**
 * Generate LocalBusiness schema.
 * @param {Object} [config] - Override seoConfig.localBusiness
 * @returns {Object} JSON-LD LocalBusiness schema
 */
export function generateLocalBusinessSchema(config) {
  const biz = config || seoConfig.localBusiness;
  const org = seoConfig.organization;

  const schema = {
    '@context': 'https://schema.org',
    '@type': biz.type || 'LocalBusiness',
    name: org.name,
    url: org.url,
    logo: org.logo,
    image: org.image || org.logo,
    description: org.description,
    telephone: org.phone,
    email: org.email,
    priceRange: biz.priceRange,
    address: {
      '@type': 'PostalAddress',
      ...(org.address.streetAddress && { streetAddress: org.address.streetAddress }),
      ...(org.address.addressLocality && { addressLocality: org.address.addressLocality }),
      ...(org.address.addressRegion && { addressRegion: org.address.addressRegion }),
      ...(org.address.postalCode && { postalCode: org.address.postalCode }),
      addressCountry: org.address.addressCountry,
    },
  };

  if (org.areaServed && org.areaServed.length > 0) {
    schema.areaServed = org.areaServed;
  }

  if (org.aggregateRating && org.aggregateRating.ratingValue) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: org.aggregateRating.ratingValue,
      reviewCount: org.aggregateRating.reviewCount,
    };
  }

  if (biz.openingHours) {
    schema.openingHoursSpecification = {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: biz.openingHours.days,
      opens: biz.openingHours.opens,
      closes: biz.openingHours.closes,
    };
  }

  if (biz.geo && biz.geo.latitude && biz.geo.longitude) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: biz.geo.latitude,
      longitude: biz.geo.longitude,
    };
  }

  if (biz.hasMap) {
    schema.hasMap = biz.hasMap;
  }

  if (biz.availableService && biz.availableService.length > 0) {
    schema.availableService = biz.availableService.map((service) => ({
      '@type': 'Service',
      name: service.name,
      description: service.description,
    }));
  }

  return schema;
}

/**
 * Generate a top-level Service schema for Anvil's core offering
 * (rooftop solar installation with PM Surya Ghar subsidy).
 * @returns {Object} JSON-LD Service schema
 */
export function generateRooftopSolarServiceSchema() {
  const org = seoConfig.organization;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Rooftop Solar Installation',
    provider: {
      '@type': 'Organization',
      name: org.name,
    },
    areaServed: org.areaServed || ['Assam', 'Nagaland', 'Odisha', 'India'],
    offers: {
      '@type': 'Offer',
      description:
        'Residential rooftop solar with PM Surya Ghar subsidy up to ₹78,000 and 0% down EMI from 7% p.a.',
    },
  };
}

/**
 * Generate BreadcrumbList schema.
 * @param {Array<{name: string, url: string}>} items - Breadcrumb items in order
 * @returns {Object} JSON-LD BreadcrumbList schema
 */
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

/**
 * Generate WebPage schema.
 * @param {Object} config - Page configuration
 * @param {string} config.name - Page name/title
 * @param {string} config.description - Page description
 * @param {string} config.url - Page URL
 * @returns {Object} JSON-LD WebPage schema
 */
export function generateWebPageSchema(config) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: config.name || seoConfig.defaultTitle,
    description: config.description || seoConfig.defaultDescription,
    url: config.url || seoConfig.siteUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: seoConfig.siteName,
      url: seoConfig.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.organization.name,
      logo: {
        '@type': 'ImageObject',
        url: seoConfig.organization.logo,
      },
    },
  };
}

/**
 * Generate Service schema for a list of services/plans.
 * @param {Array<{name: string, description: string, id: string}>} services - Service data
 * @returns {Object} JSON-LD Service schema (ItemList)
 */
export function generateServiceSchema(services) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        provider: {
          '@type': 'Organization',
          name: seoConfig.organization.name,
        },
        ...(service.duration && {
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'INR',
            description: service.duration,
            availability: 'https://schema.org/InStock',
          },
        }),
      },
    })),
  };
}

/**
 * Generate Product schema for service plans with pricing.
 * @param {Array<Object>} products - Product/plan data
 * @param {string} products[].name - Product name
 * @param {string} products[].description - Product description
 * @param {string} [products[].price] - Price (numeric string)
 * @param {string} [products[].currency] - Currency code (default: 'INR')
 * @returns {Object} JSON-LD Product schema (ItemList)
 */
export function generateProductSchema(products) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        brand: {
          '@type': 'Organization',
          name: seoConfig.organization.name,
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: product.currency || 'INR',
          ...(product.price
            ? { price: product.price }
            : { price: '0', description: 'Contact for pricing' }),
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };
}

// =========================================
// Convenience: Inject all default schemas
// =========================================

/**
 * Inject all default schemas (Organization, FAQ, LocalBusiness, BreadcrumbList, WebPage)
 * into the document head. Call this on initial page load.
 */
export function injectDefaultSchemas() {
  injectSchema('schema-organization', generateOrganizationSchema());
  injectSchema('schema-localbusiness', generateLocalBusinessSchema());
  injectSchema('schema-service', generateRooftopSolarServiceSchema());
  injectSchema('schema-faq', generateFAQSchema());
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
}

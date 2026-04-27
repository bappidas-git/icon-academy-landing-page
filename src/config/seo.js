/* ============================================
   SEO Configuration
   Central configuration for all SEO-related
   settings, schemas, and page metadata.
   ============================================ */

export const seoConfig = {
  // =========================================
  // Site-level Settings
  // =========================================
  siteName: "",
  siteUrl: "",
  defaultTitle: "",
  titleTemplate: "%s",
  defaultDescription: "",
  defaultKeywords: "",
  defaultImage: "https://placehold.co/1200x630?text=TBD",
  twitterHandle: "",
  locale: "en_IN",
  language: "en",
  themeColor: "#0A1F3D",

  // =========================================
  // Primary Contact (top-level convenience)
  // =========================================
  contact: {
    phone: "",
    email: "",
    whatsapp: "",
  },

  // =========================================
  // Organization Details
  // =========================================
  organization: {
    name: "",
    alternateName: "",
    url: "",
    logo: "https://placehold.co/400x400?text=TBD+Logo",
    image: "https://placehold.co/1200x630?text=TBD",
    email: "",
    phone: "",
    description: "",
    address: {
      addressRegion: "",
      addressCountry: "IN",
    },
    areaServed: [],
    aggregateRating: {
      ratingValue: "",
      reviewCount: "",
    },
    sameAs: [],
    founder: {
      name: "",
      jobTitle: "",
    },
    foundingDate: "",
  },

  // =========================================
  // Page-specific SEO Settings
  // =========================================
  pages: {
    home: {
      title: "",
      description: "",
      keywords: "",
    },
    thankYou: {
      title: "",
      description: "",
      robots: "noindex, nofollow",
    },
    admin: {
      title: "",
      description: "",
      robots: "noindex, nofollow",
    },
  },

  // =========================================
  // FAQ Schema Data
  // =========================================
  faqs: [],

  // =========================================
  // LocalBusiness Schema Settings
  // =========================================
  localBusiness: {
    type: "LocalBusiness",
    priceRange: "",
    openingHours: {
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
    knowsAbout: [],
    availableService: [],
  },
};

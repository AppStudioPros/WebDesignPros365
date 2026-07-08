/**
 * Auto Schema Generator
 * 
 * Generates the right JSON-LD schema for any page type based on its path.
 * Drop <AutoSchema path="/services/ai-visibility" /> on any page — it figures out the rest.
 */

import { company, services, getPageSEO } from './seo-data';

const BASE = 'https://www.webdesignpros365.com';

// ─── Organization schema (shared across site) ────────────────

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: company.name,
    legalName: company.legalName,
    url: company.url,
    logo: company.logo,
    email: company.email,
    telephone: company.phone,
    founder: {
      '@type': 'Person',
      name: company.founder,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      addressCountry: company.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: company.geo.lat,
      longitude: company.geo.lng,
    },
    priceRange: company.priceRange,
    sameAs: company.sameAs,
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
  };
}

// ─── Service schema ───────────────────────────────────────────

export function serviceSchema(slug: string) {
  const svc = services.find((s) => s.slug === slug);
  if (!svc) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: svc.title,
    description: svc.shortDescription,
    provider: {
      '@type': 'Organization',
      name: company.name,
      url: company.url,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    ...(svc.price && {
      offers: {
        '@type': 'Offer',
        price: svc.price,
        priceCurrency: 'USD',
      },
    }),
  };
}

// ─── Breadcrumb schema ────────────────────────────────────────

export function breadcrumbSchema(path: string) {
  const seo = getPageSEO(path);
  if (!seo.breadcrumbs.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE,
      },
      ...seo.breadcrumbs.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        item: item.url,
      })),
    ],
  };
}

// ─── WebPage schema ───────────────────────────────────────────

export function webPageSchema(path: string) {
  const seo = getPageSEO(path);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: seo.title,
    description: seo.description,
    url: `${BASE}${path === '/' ? '' : path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: company.name,
      url: BASE,
    },
    publisher: {
      '@type': 'Organization',
      name: company.name,
      url: company.url,
    },
  };
}

// ─── Auto-detect: returns the right schemas for any path ──────

export function autoSchema(path: string): Record<string, unknown>[] {
  const schemas: Record<string, unknown>[] = [];

  // Every page gets WebPage
  schemas.push(webPageSchema(path));

  // Every page (except home) gets breadcrumbs
  const bc = breadcrumbSchema(path);
  if (bc) schemas.push(bc);

  // Service pages get Service schema
  if (path.startsWith('/services/')) {
    const slug = path.replace('/services/', '');
    const svc = serviceSchema(slug);
    if (svc) schemas.push(svc);
  }

  // Home page gets Organization
  if (path === '/') {
    schemas.push(organizationSchema());
  }

  return schemas;
}

/**
 * SEO/AEO/GEO Data Layer
 * 
 * Pulls from Sanity CMS with hardcoded fallbacks.
 * Edit content in Sanity Studio → site auto-updates on next revalidation (60s).
 * 
 * Sanity document types:
 *   - companySettings (singleton, _id: "companySettings")
 *   - service (multiple, slug-keyed)
 *   - pageSEO (multiple, path-keyed)
 */

import { sanityFetch } from './sanity';

const BASE = 'https://www.webdesignpros365.com';

export interface PageSEO {
  title: string;
  description: string;
  path: string;
  breadcrumbs: { name: string; url: string }[];
  schema?: Record<string, unknown> | Record<string, unknown>[];
  ogImage?: string;
}

export interface ServiceData {
  title: string;
  slug: string;
  shortDescription: string;
  price?: string;
  features: string[];
}

export interface CompanyData {
  name: string;
  legalName: string;
  url: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  address: { city: string; state: string; country: string };
  geo: { lat: number; lng: number };
  founder: string;
  foundingDate: string;
  priceRange: string;
  logo: string;
  sameAs: string[];
  tagline?: string;
  shortDescription?: string;
  fullDescription?: string;
}

// ─── Sanity Queries ───────────────────────────────────────────

const COMPANY_QUERY = `*[_type == "companySettings"][0]{
  name, legalName, url, email, phone, phoneDisplay,
  founder, foundingDate, priceRange, logo, bbbUrl,
  tagline, shortDescription, fullDescription,
  "address": address{city, state, country},
  "geo": geo{lat, lng}
}`;

const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  title, "slug": slug.current, shortDescription, price, features, isFlagship
}`;

const PAGE_SEO_QUERY = `*[_type == "pageSEO"] { path, title, description }`;

// ─── Hardcoded Fallbacks ──────────────────────────────────────

const FALLBACK_COMPANY: CompanyData = {
  name: 'Web Design Pros 365',
  legalName: 'Lucid Tech Labs LLC',
  url: BASE,
  email: 'info@webdesignpros365.com',
  phone: '+17202760797',
  phoneDisplay: '(720) 276-0797',
  address: { city: 'Denver', state: 'CO', country: 'US' },
  geo: { lat: 39.7392, lng: -104.9903 },
  founder: 'Corey Strange',
  foundingDate: '2024',
  priceRange: '$$$',
  logo: `${BASE}/logo.png`,
  sameAs: ['https://www.bbb.org/us/co/denver/profile/web-design/lucid-tech-labs-llc-1296-90313877'],
};

const FALLBACK_SERVICES: ServiceData[] = [
  { title: 'AI Visibility Stack Website', slug: 'ai-visibility', shortDescription: 'Custom Next.js website with full SEO + AEO + GEO optimization.', price: '3500', features: ['Custom Next.js build', 'Core Web Vitals optimization', 'Structured data / JSON-LD', 'llms.txt for AI crawlers', 'Google AI Overviews optimization', 'Monthly performance reports'] },
  { title: 'Custom AI Solutions', slug: 'custom-ai', shortDescription: 'Custom AI chatbots, content engines, and business automation.', features: ['AI chatbot development', 'Content generation engines', 'Workflow automation', 'API integrations'] },
  { title: 'AI SaaS Platform Development', slug: 'ai-saas-platforms', shortDescription: 'Full-stack AI-powered SaaS platform development from MVP to scale.', features: ['Authentication & billing', 'AI feature integration', 'Cloud infrastructure', 'Admin dashboards'] },
  { title: 'WordPress Migration', slug: 'wordpress-migration', shortDescription: 'Migrate from WordPress, Wix, or Squarespace to blazing-fast Next.js.', price: '3500', features: ['Content migration', 'SEO preservation', '3-5x speed improvement', 'Modern tech stack'] },
];

const FALLBACK_PAGE_SEO: Record<string, { title: string; description: string }> = {
  '/': { title: 'Web Design Pros 365 | AI-Optimized Websites for Denver Businesses', description: 'Custom Next.js websites built for the AI era. SEO + AEO + GEO optimization gets your business found by Google, ChatGPT, Perplexity, and every AI search engine.' },
  '/about': { title: 'About Web Design Pros 365 | Denver Web Development Agency', description: 'Meet the team behind Web Design Pros 365. 20+ years building high-performance websites.' },
  '/contact': { title: 'Contact Web Design Pros 365 | Free AI Visibility Audit', description: 'Get a free AI visibility audit for your website.' },
  '/pricing': { title: 'Pricing | AI-Optimized Websites from $3,500 | Web Design Pros 365', description: 'Transparent pricing for AI-optimized websites.' },
  '/services': { title: 'Services | AI Visibility Stack & Web Development | Web Design Pros 365', description: 'Custom websites, AI visibility optimization, SaaS development, and WordPress migration.' },
  '/media': { title: 'AI Visibility Report | Web Design Pros 365', description: 'See how AI is changing how clients find businesses.' },
};

// ─── Data Fetchers (Sanity with fallback) ─────────────────────

let _companyCache: CompanyData | undefined;
let _servicesCache: ServiceData[] | undefined;
let _pageSEOCache: Record<string, { title: string; description: string }> | undefined;

export async function getCompany(): Promise<CompanyData> {
  if (_companyCache) return _companyCache;
  try {
    const data = await sanityFetch<any>({ query: COMPANY_QUERY, tags: ['companySettings'] });
    if (data?.name) {
      const result: CompanyData = {
        ...FALLBACK_COMPANY,
        ...data,
        url: data.url || BASE,
        logo: data.logo ? `${BASE}${data.logo}` : `${BASE}/logo.png`,
        sameAs: data.bbbUrl ? [data.bbbUrl] : FALLBACK_COMPANY.sameAs,
      };
      _companyCache = result;
      return result;
    }
  } catch (e) { /* fall through */ }
  return FALLBACK_COMPANY;
}

export async function getServices(): Promise<ServiceData[]> {
  if (_servicesCache) return _servicesCache;
  try {
    const data = await sanityFetch<any[]>({ query: SERVICES_QUERY, tags: ['service'] });
    if (data?.length) {
      _servicesCache = data;
      return _servicesCache;
    }
  } catch (e) { /* fall through */ }
  return FALLBACK_SERVICES;
}

async function getPageSEOMap(): Promise<Record<string, { title: string; description: string }>> {
  if (_pageSEOCache) return _pageSEOCache;
  try {
    const data = await sanityFetch<any[]>({ query: PAGE_SEO_QUERY, tags: ['pageSEO'] });
    if (data?.length) {
      _pageSEOCache = {};
      for (const page of data) {
        if (page.path) _pageSEOCache[page.path] = { title: page.title, description: page.description };
      }
      return _pageSEOCache;
    }
  } catch (e) { /* fall through */ }
  return FALLBACK_PAGE_SEO;
}

// ─── Public API ───────────────────────────────────────────────

/** Synchronous company data — use the constant for non-async contexts */
export const company = FALLBACK_COMPANY;

/** Synchronous services — use the constant for non-async contexts */
export const services = FALLBACK_SERVICES;

/** Synchronous pageSEO map — used by autoMetadata and AutoSchema */
export const pageSEO: Record<string, PageSEO> = {};

// Pre-build pageSEO from fallbacks for synchronous access
// (layouts can't be async, so we need sync access)
const SYNC_PAGES: Record<string, { title: string; description: string; breadcrumbs?: { name: string; url: string }[] }> = {
  '/': { title: 'Web Design Pros 365 | AI-Optimized Websites for Denver Businesses', description: 'Custom Next.js websites built for the AI era. SEO + AEO + GEO optimization gets your business found by Google, ChatGPT, Perplexity, and every AI search engine.' },
  '/about': { title: 'About Web Design Pros 365 | Denver Web Development Agency', description: 'Meet the team behind Web Design Pros 365. 20+ years building high-performance websites, now pioneering AI Visibility Stack optimization for businesses.', breadcrumbs: [{ name: 'About', url: `${BASE}/about` }] },
  '/contact': { title: 'Contact Web Design Pros 365 | Free AI Visibility Audit', description: 'Get a free AI visibility audit for your website. See how you show up in ChatGPT, Perplexity, and Google AI Overviews. Denver-based, serving clients nationwide.', breadcrumbs: [{ name: 'Contact', url: `${BASE}/contact` }] },
  '/pricing': { title: 'Pricing | AI-Optimized Websites from $3,500 | Web Design Pros 365', description: 'Transparent pricing for AI-optimized websites. Starter at $3,500, Professional at $7,500, Enterprise custom. Every plan includes SEO + AEO + GEO optimization.', breadcrumbs: [{ name: 'Pricing', url: `${BASE}/pricing` }] },
  '/portfolio': { title: 'Portfolio | High-Performance Websites | Web Design Pros 365', description: 'See our work — fast, AI-optimized websites built on Next.js for real estate, mortgage, insurance, and SaaS companies.', breadcrumbs: [{ name: 'Portfolio', url: `${BASE}/portfolio` }] },
  '/faq': { title: 'FAQ | Web Design Pros 365 | AI Visibility & Web Development', description: 'Common questions about AI-optimized websites, SEO vs AEO vs GEO, pricing, timelines, and how we build sites that AI search engines actually recommend.', breadcrumbs: [{ name: 'FAQ', url: `${BASE}/faq` }] },
  '/blog': { title: 'Blog | AI Visibility & Web Development Insights | Web Design Pros 365', description: 'Expert insights on SEO, AEO, GEO, and building websites that perform in the AI search era.', breadcrumbs: [{ name: 'Blog', url: `${BASE}/blog` }] },
  '/media': { title: 'AI Visibility Report | Web Design Pros 365', description: 'See how AI is changing how clients find real estate agents, mortgage lenders, and insurance brokers. Calculate your visibility gap and learn what it costs to be invisible to AI.', breadcrumbs: [{ name: 'Media', url: `${BASE}/media` }] },
  '/methodology': { title: 'Our Methodology | How We Build AI-Optimized Websites | Web Design Pros 365', description: 'Our proven process for building high-performance, AI-visible websites. From audit to launch to daily optimization.', breadcrumbs: [{ name: 'Methodology', url: `${BASE}/methodology` }] },
  '/partnerships': { title: 'Partnerships | Web Design Pros 365', description: 'Partner with Web Design Pros 365. Referral programs, white-label services, and technology partnerships for agencies and consultants.', breadcrumbs: [{ name: 'Partnerships', url: `${BASE}/partnerships` }] },
  '/case-studies': { title: 'Case Studies | Real Results from AI-Optimized Websites | Web Design Pros 365', description: 'See how our AI Visibility Stack delivers measurable results.', breadcrumbs: [{ name: 'Case Studies', url: `${BASE}/case-studies` }] },
  '/platform-engineering': { title: 'Platform Engineering | Custom SaaS & AI Platforms | Web Design Pros 365', description: 'Enterprise-grade platform engineering. Custom SaaS applications, AI integrations, and scalable architectures.', breadcrumbs: [{ name: 'Platform Engineering', url: `${BASE}/platform-engineering` }] },
  '/services': { title: 'Services | AI Visibility Stack & Web Development | Web Design Pros 365', description: 'Custom websites, AI visibility optimization, SaaS development, and WordPress migration.', breadcrumbs: [{ name: 'Services', url: `${BASE}/services` }] },
  '/services/ai-visibility': { title: 'AI Visibility Optimization | SEO + AEO + GEO | Web Design Pros 365', description: 'Get found by ChatGPT, Perplexity, Google AI Overviews, and traditional search.', breadcrumbs: [{ name: 'Services', url: `${BASE}/services` }, { name: 'AI Visibility', url: `${BASE}/services/ai-visibility` }] },
  '/services/custom-ai': { title: 'Custom AI Solutions | Chatbots, Automation & AI Integration | Web Design Pros 365', description: 'Custom AI chatbots, content engines, and business automation.', breadcrumbs: [{ name: 'Services', url: `${BASE}/services` }, { name: 'Custom AI', url: `${BASE}/services/custom-ai` }] },
  '/services/ai-saas-platforms': { title: 'AI SaaS Platform Development | Web Design Pros 365', description: 'Full-stack AI-powered SaaS platform development.', breadcrumbs: [{ name: 'Services', url: `${BASE}/services` }, { name: 'AI SaaS Platforms', url: `${BASE}/services/ai-saas-platforms` }] },
  '/services/aci-platform': { title: 'ACI Platform | Adaptive Compound Intelligence | Web Design Pros 365', description: 'Our patented AI platform that learns your organization.', breadcrumbs: [{ name: 'Services', url: `${BASE}/services` }, { name: 'ACI Platform', url: `${BASE}/services/aci-platform` }] },
  '/services/program-creation': { title: 'Program Creation & Strategy | Web Design Pros 365', description: 'Strategic program creation for digital transformation.', breadcrumbs: [{ name: 'Services', url: `${BASE}/services` }, { name: 'Program Creation', url: `${BASE}/services/program-creation` }] },
  '/verticals/real-estate': { title: 'AI Websites for Real Estate Agents | Web Design Pros 365', description: '82% of Americans use AI for housing info. Get a website that ChatGPT actually recommends.', breadcrumbs: [{ name: 'Verticals', url: `${BASE}/services` }, { name: 'Real Estate', url: `${BASE}/verticals/real-estate` }] },
  '/verticals/real-estate-financial': { title: 'AI Websites for Mortgage & Financial Services | Web Design Pros 365', description: '76% of homebuyers trust AI to shop for lenders.', breadcrumbs: [{ name: 'Verticals', url: `${BASE}/services` }, { name: 'Mortgage & Financial', url: `${BASE}/verticals/real-estate-financial` }] },
  '/verticals/federal-contracting': { title: 'Websites for Federal Contractors | Web Design Pros 365', description: 'Professional web presence for federal contractors.', breadcrumbs: [{ name: 'Verticals', url: `${BASE}/services` }, { name: 'Federal Contracting', url: `${BASE}/verticals/federal-contracting` }] },
  '/verticals/marketing-agencies': { title: 'White-Label AI Websites for Marketing Agencies | Web Design Pros 365', description: 'White-label AI-optimized website development.', breadcrumbs: [{ name: 'Verticals', url: `${BASE}/services` }, { name: 'Marketing Agencies', url: `${BASE}/verticals/marketing-agencies` }] },
  '/verticals/saas-founders': { title: 'Website & Platform Development for SaaS Founders | Web Design Pros 365', description: 'From landing page to full platform.', breadcrumbs: [{ name: 'Verticals', url: `${BASE}/services` }, { name: 'SaaS Founders', url: `${BASE}/verticals/saas-founders` }] },
  '/verticals/wordpress-migration': { title: 'WordPress to Next.js Migration | Web Design Pros 365', description: 'Migrate from slow WordPress, Wix, or Squarespace to blazing-fast Next.js.', breadcrumbs: [{ name: 'Verticals', url: `${BASE}/services` }, { name: 'WordPress Migration', url: `${BASE}/verticals/wordpress-migration` }] },
};

// Populate the pageSEO export
for (const [path, data] of Object.entries(SYNC_PAGES)) {
  pageSEO[path] = {
    ...data,
    path,
    breadcrumbs: data.breadcrumbs || [],
  };
}

export function getPageSEO(path: string): PageSEO {
  if (pageSEO[path]) return pageSEO[path];

  const segments = path.split('/').filter(Boolean);
  const name = segments[segments.length - 1]
    ?.replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase()) || 'Page';

  return {
    title: `${name} | Web Design Pros 365`,
    description: `Learn more about ${name.toLowerCase()} from Web Design Pros 365.`,
    path,
    breadcrumbs: segments.map((seg, i) => ({
      name: seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      url: `${BASE}/${segments.slice(0, i + 1).join('/')}`,
    })),
  };
}

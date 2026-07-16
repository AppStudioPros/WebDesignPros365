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

// ─── FAQ schema ──────────────────────────────────────────────

export interface FAQItem { q: string; a: string }

export function faqSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

// ─── HowTo schema ─────────────────────────────────────────────

export interface HowToStep { name: string; text: string }

export function howToSchema(name: string, description: string, steps: HowToStep[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

// ─── Per-page FAQ data ────────────────────────────────────────

const PAGE_FAQS: Record<string, FAQItem[]> = {
  '/services/ai-visibility': [
    { q: 'What is the AI Visibility Stack?', a: 'The AI Visibility Stack combines SEO (traditional search ranking), AEO (Answer Engine Optimization for AI Overviews and voice search), and GEO (Generative Engine Optimization for citations in ChatGPT, Claude, and Perplexity) into one integrated service.' },
    { q: 'How long does it take to see results from AEO and GEO?', a: 'SEO improvements typically appear within 60–90 days. AEO and GEO results: citations in AI Overviews and generative engines, typically appear within 30–60 days after structured data and content optimization are deployed.' },
    { q: 'What is the difference between AEO and GEO?', a: 'AEO optimizes your content to be selected as the direct answer in AI Overviews, voice search, and featured snippets. GEO optimizes your brand authority so generative AI models like ChatGPT and Perplexity cite you when answering questions in your domain.' },
    { q: 'Do I need the AI Visibility Stack if I already have good SEO?', a: 'Yes. Traditional SEO only captures clicks on blue links, which is a shrinking share of search behavior. AI Overviews now appear above organic results for most queries, and generative AI usage is growing rapidly. Good traditional SEO does not automatically transfer to AEO or GEO.' },
    { q: 'What structured data schemas do you implement?', a: 'We implement Organization, LocalBusiness, Service, FAQPage, HowTo, WebPage, BreadcrumbList, and WebSite schemas. For specific industries we add RealEstateAgent, MortgageLender, LegalService, and other domain-specific types.' },
  ],
  '/services/aci-platform': [
    { q: 'What is the ACI platform?', a: 'ACI (Adaptive Compound Intelligence) is a patented 5-layer AI architecture developed by Lucid Tech LLC. It combines individual cognitive profiling, knowledge extraction, organizational memory, compound reasoning, and permission-based delivery into a single integrated system.' },
    { q: 'Is the ACI patent granted?', a: 'A U.S. provisional patent application has been filed covering the 5-layer ACI architecture. The named inventor is Corey Strange, founder of Web Design Pros 365 and CTO of Lucid Tech LLC.' },
    { q: 'How is ACI different from standard RAG or agentic AI systems?', a: 'RAG is a retrieval technique. Agentic AI is a behavioral pattern. ACI is an architectural framework that integrates both with organizational memory, individual cognitive profiles, and federal-grade audit-trail compliance into a single compound system.' },
    { q: 'Can ACI be licensed for other products?', a: 'Yes. The ACI patent is held by Lucid Tech LLC and is licensed through partnership agreements that include audit-trail requirements and brand-mention terms. Contact us if you have a vertical application in mind.' },
    { q: 'What industries does ACI serve?', a: 'ACI powers commercial, government, real estate, and legal applications. Current commercial embodiments include Aetherios (company OS), AcuSightPro (federal procurement), and MarqetCore (real estate intelligence).' },
  ],
  '/services/custom-ai': [
    { q: 'What kinds of custom AI solutions do you build?', a: 'We build AI chatbots, content generation engines, workflow automation systems, lead qualification bots, and AI-powered data processing pipelines. Each solution is built on your existing data and integrated with your current tools.' },
    { q: 'How long does a custom AI project take?', a: 'A focused AI chatbot or automation tool typically takes 4–8 weeks from kickoff to production. Larger platforms with custom training, multi-step reasoning, or complex integrations typically take 8–16 weeks.' },
    { q: 'Do you use ChatGPT or do you have your own AI?', a: 'We build on leading foundation models (OpenAI, Anthropic, Google) and apply our proprietary ACI architecture to add organizational memory, cognitive profiling, and compliance disciplines. The result is a system that learns your specific business context rather than giving generic answers.' },
  ],
  '/services/ai-saas-platforms': [
    { q: 'What does AI SaaS platform development include?', a: 'Full-stack development includes authentication, subscription billing (Stripe), AI feature integration, admin dashboards, cloud infrastructure on AWS or Vercel, database design, and API architecture. We build from MVP to production-ready scale.' },
    { q: 'How much does it cost to build an AI SaaS platform?', a: 'MVP AI SaaS platforms typically start at $25,000–$75,000 depending on complexity, AI feature depth, and integration requirements. We provide a detailed scope and fixed-price quote after a discovery call.' },
    { q: 'Do you build white-label platforms?', a: 'Yes. We build white-label AI platforms that agencies and enterprises can brand as their own. This includes custom domains, brand theming, client management, and usage billing infrastructure.' },
  ],
  '/services/ai-ready-seo': [
    { q: 'What makes a website AI-ready for SEO?', a: 'An AI-ready website uses server-side rendering for all content (not client-side JavaScript), implements FAQPage and HowTo structured data, has clear entity definitions, loads in under 2.5 seconds, and explicitly allows AI crawler access in robots.txt.' },
    { q: 'What is the difference between traditional SEO and AI-ready SEO?', a: 'Traditional SEO optimizes page rank in blue-link results. AI-ready SEO additionally optimizes content extractability for AI Overviews, entity authority for generative AI citations, and technical architecture for AI crawler compatibility.' },
  ],
  '/methodology': [
    { q: 'What is your web design and development process?', a: 'Our process runs in four phases: Discovery (goals, audience, competitive audit), Design (wireframes, visual design, client approval), Development (Next.js build, CMS integration, SEO/AEO/GEO implementation), and Launch (QA, performance testing, deployment, 30-day monitoring).' },
    { q: 'How long does a website project take from start to finish?', a: 'A standard marketing website takes 4–8 weeks. Larger sites with custom features, CMS setup, and content migration take 8–16 weeks. We provide a project timeline at the start of every engagement.' },
    { q: 'Do you work with clients outside of Denver?', a: 'Yes. We work with clients across the United States. All project management, design reviews, and delivery happen remotely via scheduled video calls, shared project management tools, and async communication.' },
  ],
  '/faq': [
    { q: 'How much does a website from Web Design Pros 365 cost?', a: 'Our AI Visibility Stack websites start at $3,500 for the Starter plan. The Professional plan is $7,500. Enterprise pricing is custom based on scope. Every plan includes Next.js development, structured data, AI crawler optimization, and core performance tuning.' },
    { q: 'What is included in every website you build?', a: 'Every site includes: Next.js App Router build, Sanity CMS, full structured data (JSON-LD), sitemap.xml, robots.txt with AI crawler access, Core Web Vitals optimization, llms.txt, and Google AI Overviews optimization.' },
    { q: 'Do you offer website maintenance after launch?', a: 'Yes. We offer ongoing maintenance plans that include security updates, performance monitoring, content updates, and monthly AI visibility reports showing your citation performance in ChatGPT, Perplexity, and Google AI Overviews.' },
    { q: 'Can you migrate my existing WordPress site to Next.js?', a: 'Yes. WordPress migration is one of our core services. We migrate all content, preserve your URL structure and SEO equity, redirect old URLs, and deliver a Next.js site that typically loads 3–5x faster than the original WordPress site.' },
  ],
  '/pricing': [
    { q: 'What is included in the Starter plan?', a: 'The Starter plan at $3,500 includes a custom Next.js website, Sanity CMS setup, full SEO and structured data implementation, AI crawler access (AEO + GEO), Core Web Vitals optimization, and 30 days of post-launch support.' },
    { q: 'What is the difference between Starter and Professional?', a: 'The Professional plan at $7,500 adds advanced AI integrations (chatbot, content engine), additional page templates, custom animations, deeper AEO content architecture, and a dedicated project manager.' },
    { q: 'Do you offer payment plans?', a: 'Yes. We typically structure projects as 50% at kickoff and 50% at launch. For larger engagements we can structure milestone-based payment schedules.' },
  ],
};

// ─── HowTo data ───────────────────────────────────────────────

const PAGE_HOWTOS: Record<string, { name: string; description: string; steps: HowToStep[] }> = {
  '/methodology': {
    name: 'How Web Design Pros 365 Builds an AI-Optimized Website',
    description: 'Our proven 4-phase process for building high-performance, AI-visible websites that rank in Google, get cited by ChatGPT, and convert visitors into clients.',
    steps: [
      { name: 'Discovery and Audit', text: 'We audit your existing web presence, competitive landscape, and AI visibility gaps across Google, ChatGPT, Perplexity, and Gemini. We define target keywords, entity definitions, and structured data requirements.' },
      { name: 'Design and Architecture', text: 'We design the full site in Figma, wireframe every page, define the content architecture for AEO (answer-extractable content blocks), and get client approval before writing a line of code.' },
      { name: 'Development and Optimization', text: 'We build on Next.js 16 App Router with TypeScript, Sanity CMS, and Tailwind CSS. We implement all structured data schemas, Core Web Vitals optimization, llms.txt, and AI crawler access during the build, not as an afterthought.' },
      { name: 'QA, Performance Testing, and Launch', text: 'We run Lighthouse audits, cross-device QA, structured data validation in Google Rich Results Test, and AI crawler simulation before launch. We deploy to Vercel with zero-downtime deployment and monitor for 30 days post-launch.' },
    ],
  },
  '/services/ai-visibility': {
    name: 'How to Optimize a Website for AI Visibility (SEO + AEO + GEO)',
    description: 'Step-by-step process for getting your website found by traditional search, AI Overviews, and generative AI engines like ChatGPT and Perplexity.',
    steps: [
      { name: 'Audit current AI visibility', text: 'Run your brand name and target queries through ChatGPT, Perplexity, Gemini, and Google AI Overviews. Document where you appear and where competitors are cited instead.' },
      { name: 'Implement structured data', text: 'Add FAQPage, HowTo, Organization, Service, and WebPage JSON-LD schemas to every relevant page. Validate with Google Rich Results Test.' },
      { name: 'Restructure content for extractability', text: 'Rewrite key pages so each major question is answered with a clear, direct response in the first sentence. Keep FAQ answers between 40 and 60 words for optimal LLM extraction.' },
      { name: 'Create llms.txt and llms-full.txt', text: 'Add an llms.txt navigation index and an llms-full.txt with your top 5–10 pages rendered as clean Markdown. This allows AI crawlers that fetch these files to get full context without JavaScript execution.' },
      { name: 'Allow AI crawlers in robots.txt', text: 'Explicitly allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and Gemini in your robots.txt. Many sites accidentally block these crawlers, preventing AI citation.' },
      { name: 'Monitor citation performance weekly', text: 'Run a weekly citation audit: search target queries in ChatGPT, Perplexity, and Gemini and track whether your brand appears. Adjust content based on which competitor pages are being cited instead.' },
    ],
  },
};

// ─── Auto schema ──────────────────────────────────────────────

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

  // Per-page FAQ schema
  const pageFaqs = PAGE_FAQS[path];
  if (pageFaqs?.length) {
    schemas.push(faqSchema(pageFaqs));
  }

  // Per-page HowTo schema
  const howTo = PAGE_HOWTOS[path];
  if (howTo) {
    schemas.push(howToSchema(howTo.name, howTo.description, howTo.steps));
  }

  return schemas;
}

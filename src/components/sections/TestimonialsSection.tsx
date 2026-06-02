'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';

const testimonials = [
  {
    content: 'Web Design Pros 365 transformed our online presence. Their expertise in Next.js and performance optimization resulted in a 40% increase in conversions.',
    author: 'Ilona Bower',
    authorTitle: 'CEO',
    company: 'Sculpted Beauty',
    rating: 5,
    color: '#8734E1',
  },
  {
    content: 'The GEO work they did put us ahead of competitors in AI search results. Real impact, fast turnaround.',
    author: 'John Cressey',
    authorTitle: 'Marketing Director',
    company: 'PocketFiler',
    rating: 5,
    color: '#2F73EE',
  },
  {
    content: 'Exceptional attention to detail and technical expertise. They delivered our e-commerce platform ahead of schedule with outstanding results.',
    author: 'Chelsea Johnson',
    authorTitle: 'Founder',
    company: 'Fast Track Solutions',
    rating: 5,
    color: '#f59e0b',
  },
  {
    content: 'Their AI chatbot integration increased our customer support efficiency by 60%. Professional team that truly understands modern web development.',
    author: 'Larry Book',
    authorTitle: 'CTO',
    company: 'Contractor Guardians',
    rating: 5,
    color: '#BF5DE0',
  },
];

// Each logo uses Brandfetch's free CDN for real, color, trademarked brand marks.
// Pattern: https://cdn.brandfetch.io/{domain}/w/64/h/64
// When the brand isn't on Brandfetch, fall back to a styled text chip.
type LogoChip = {
  name: string;
  /** Primary brand domain. Drives the Brandfetch logo URL. */
  domain?: string;
  category: 'client' | 'core' | 'ai' | 'commerce' | 'data' | 'vertical';
};

// ROW 1 - Core stack, AI partners, client brands (scrolls left-to-right)
// (Internal Lucid Tech brands PocketFiler + Contractor Guardians removed per spec.)
const row1: LogoChip[] = [
  // External clients
  { name: 'Sculpted Beauty', category: 'client' },
  { name: 'Fast Track Solutions', category: 'client' },
  { name: 'Arrakis Insight', category: 'client' },
  { name: 'Piqsol', category: 'client' },
  { name: 'Leader Magnus', category: 'client' },
  { name: 'PK Page', category: 'client' },
  // Core stack
  { name: 'Next.js', domain: 'nextjs.org', category: 'core' },
  { name: 'Vercel', domain: 'vercel.com', category: 'core' },
  { name: 'React', domain: 'react.dev', category: 'core' },
  { name: 'TypeScript', domain: 'typescriptlang.org', category: 'core' },
  { name: 'Python', domain: 'python.org', category: 'core' },
  { name: 'Node.js', domain: 'nodejs.org', category: 'core' },
  // AI providers
  { name: 'Anthropic', domain: 'anthropic.com', category: 'ai' },
  { name: 'OpenAI', domain: 'openai.com', category: 'ai' },
  { name: 'Pinecone', domain: 'pinecone.io', category: 'ai' },
  // Data + infrastructure
  { name: 'Supabase', domain: 'supabase.com', category: 'data' },
  { name: 'PostgreSQL', domain: 'postgresql.org', category: 'data' },
  { name: 'Cloudflare', domain: 'cloudflare.com', category: 'core' },
];

// ROW 2 - Commerce, CMS, CRM, comms, payments, verticals (scrolls right-to-left)
const row2: LogoChip[] = [
  // Commerce
  { name: 'Shopify', domain: 'shopify.com', category: 'commerce' },
  { name: 'WooCommerce', domain: 'woocommerce.com', category: 'commerce' },
  { name: 'WordPress', domain: 'wordpress.org', category: 'commerce' },
  { name: 'BigCommerce', domain: 'bigcommerce.com', category: 'commerce' },
  // Payments
  { name: 'Stripe', domain: 'stripe.com', category: 'commerce' },
  { name: 'Plaid', domain: 'plaid.com', category: 'commerce' },
  // CRM + Marketing
  { name: 'HubSpot', domain: 'hubspot.com', category: 'commerce' },
  { name: 'Salesforce', domain: 'salesforce.com', category: 'commerce' },
  // CMS
  { name: 'Sanity', domain: 'sanity.io', category: 'data' },
  { name: 'Contentful', domain: 'contentful.com', category: 'data' },
  { name: 'Strapi', domain: 'strapi.io', category: 'data' },
  // Comms
  { name: 'Twilio', domain: 'twilio.com', category: 'commerce' },
  { name: 'Resend', domain: 'resend.com', category: 'commerce' },
  // Auth + infrastructure
  { name: 'Clerk', domain: 'clerk.com', category: 'core' },
  { name: 'GitHub', domain: 'github.com', category: 'core' },
  { name: 'Figma', domain: 'figma.com', category: 'core' },
  { name: 'Notion', domain: 'notion.so', category: 'core' },
  // Verticals — real estate
  { name: 'kvCORE', domain: 'insiderealestate.com', category: 'vertical' },
  { name: 'Sierra Interactive', domain: 'sierrainteractive.com', category: 'vertical' },
  { name: 'BoomTown', domain: 'boomtownroi.com', category: 'vertical' },
  { name: 'Real Geeks', domain: 'realgeeks.com', category: 'vertical' },
  // Verticals — legal
  { name: 'Clio', domain: 'clio.com', category: 'vertical' },
  { name: 'MyCase', domain: 'mycase.com', category: 'vertical' },
  { name: 'PracticePanther', domain: 'practicepanther.com', category: 'vertical' },
  { name: 'Lawmatics', domain: 'lawmatics.com', category: 'vertical' },
  // Verticals — health
  { name: 'Epic FHIR', domain: 'epic.com', category: 'vertical' },
  { name: 'Athenahealth', domain: 'athenahealth.com', category: 'vertical' },
  { name: 'eClinicalWorks', domain: 'eclinicalworks.com', category: 'vertical' },
  // Verticals — fintech
  { name: 'Mercury', domain: 'mercury.com', category: 'vertical' },
  { name: 'Brex', domain: 'brex.com', category: 'vertical' },
  { name: 'Modern Treasury', domain: 'moderntreasury.com', category: 'vertical' },
];

function LogoBadge({ logo }: { logo: LogoChip }) {
  const iconUrl = logo.domain
    ? `https://cdn.brandfetch.io/${logo.domain}/w/64/h/64?c=1idV74_p2cNryY2WzAk`
    : null;
  return (
    <div className="flex-shrink-0 mx-3 py-3">
      <div className="px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium hover:bg-[#f0e6fb] hover:border-[#8734E1] hover:shadow-md transition-all flex items-center gap-2.5 whitespace-nowrap">
        {iconUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={iconUrl}
            alt={`${logo.name} logo`}
            className="w-5 h-5 object-contain"
            loading="lazy"
            onError={(e) => {
              // If Brandfetch has no logo for this domain, hide the broken img
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        )}
        <span className="text-sm">{logo.name}</span>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  // Duplicate each row so the marquee loops seamlessly
  const row1Full = [...row1, ...row1];
  const row2Full = [...row2, ...row2];

  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-white/70" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="container-custom relative z-10">
        {/* TESTIMONIALS HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">
            Testimonials
          </div>
          <h2 className="heading-lg mb-4">
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See what our clients say about working with Web Design Pros 365.
          </p>
        </motion.div>

        {/* TESTIMONIAL CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full p-6 bg-white border-gray-200 hover:shadow-lg transition-shadow">
                <Quote className="w-10 h-10 mb-4" style={{ color: `${testimonial.color}30` }} />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}80)` }}
                  >
                    {testimonial.author.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">
                      {testimonial.authorTitle}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* TRUSTED BY / PARTNERSHIPS - SCROLLING MARQUEE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 uppercase tracking-wider">
              Trusted by 50+ Companies &amp; Partnerships
            </p>
          </div>

          {/* ROW 1 — left to right */}
          <div className="relative overflow-hidden mb-2">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="flex animate-marquee-reverse" style={{ width: 'max-content' }}>
              {row1Full.map((logo, index) => (
                <LogoBadge key={`r1-${logo.name}-${index}`} logo={logo} />
              ))}
            </div>
          </div>

          {/* ROW 2 — right to left, larger logo set */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="flex animate-marquee" style={{ width: 'max-content' }}>
              {row2Full.map((logo, index) => (
                <LogoBadge key={`r2-${logo.name}-${index}`} logo={logo} />
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Active partners across hosting, AI, commerce, CMS, CRM, payments, and vertical platforms.
            See the full list on our{' '}
            <a href="/partnerships" className="text-[#8734E1] hover:underline">
              Partnerships page
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}

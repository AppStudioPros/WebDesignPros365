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

// Each logo uses Simple Icons CDN (open-source SVG icon set) for real brand marks.
// Falls back to text label if image fails to render. Slug = simple-icons identifier.
type LogoChip = {
  name: string;
  slug?: string;
  category: 'client' | 'core' | 'ai' | 'commerce' | 'data' | 'vertical';
};

// ROW 1 - Core stack, AI partners, client brands (scrolls left-to-right)
const row1: LogoChip[] = [
  // Internal clients
  { name: 'PocketFiler', category: 'client' },
  { name: 'Contractor Guardians', category: 'client' },
  { name: 'Sculpted Beauty', category: 'client' },
  { name: 'Fast Track Solutions', category: 'client' },
  { name: 'Arrakis Insight', category: 'client' },
  { name: 'Piqsol', category: 'client' },
  // Core stack
  { name: 'Next.js', slug: 'nextdotjs', category: 'core' },
  { name: 'Vercel', slug: 'vercel', category: 'core' },
  { name: 'React', slug: 'react', category: 'core' },
  { name: 'TypeScript', slug: 'typescript', category: 'core' },
  { name: 'Python', slug: 'python', category: 'core' },
  { name: 'Node.js', slug: 'nodedotjs', category: 'core' },
  // AI providers
  { name: 'Anthropic', slug: 'anthropic', category: 'ai' },
  { name: 'OpenAI', slug: 'openai', category: 'ai' },
  { name: 'Pinecone', category: 'ai' },
  // Data + infrastructure
  { name: 'Supabase', slug: 'supabase', category: 'data' },
  { name: 'PostgreSQL', slug: 'postgresql', category: 'data' },
  { name: 'Cloudflare', slug: 'cloudflare', category: 'core' },
];

// ROW 2 - Commerce, CMS, CRM, comms, payments (scrolls right-to-left for visual variety)
const row2: LogoChip[] = [
  // Commerce
  { name: 'Shopify', slug: 'shopify', category: 'commerce' },
  { name: 'WooCommerce', slug: 'woocommerce', category: 'commerce' },
  { name: 'WordPress', slug: 'wordpress', category: 'commerce' },
  { name: 'BigCommerce', slug: 'bigcommerce', category: 'commerce' },
  // Payments
  { name: 'Stripe', slug: 'stripe', category: 'commerce' },
  { name: 'Plaid', slug: 'plaid', category: 'commerce' },
  // CRM + Marketing
  { name: 'HubSpot', slug: 'hubspot', category: 'commerce' },
  { name: 'Salesforce', slug: 'salesforce', category: 'commerce' },
  // CMS
  { name: 'Sanity', slug: 'sanity', category: 'data' },
  { name: 'Contentful', slug: 'contentful', category: 'data' },
  { name: 'Strapi', slug: 'strapi', category: 'data' },
  // Comms
  { name: 'Twilio', slug: 'twilio', category: 'commerce' },
  { name: 'Resend', slug: 'resend', category: 'commerce' },
  // Auth + infrastructure
  { name: 'Clerk', slug: 'clerk', category: 'core' },
  { name: 'GitHub', slug: 'github', category: 'core' },
  { name: 'Figma', slug: 'figma', category: 'core' },
  { name: 'Notion', slug: 'notion', category: 'core' },
  // Verticals
  { name: 'kvCORE', category: 'vertical' },
  { name: 'Sierra Interactive', category: 'vertical' },
  { name: 'BoomTown', category: 'vertical' },
  { name: 'Real Geeks', category: 'vertical' },
  { name: 'Clio', category: 'vertical' },
  { name: 'MyCase', category: 'vertical' },
  { name: 'PracticePanther', category: 'vertical' },
  { name: 'Lawmatics', category: 'vertical' },
  { name: 'Epic FHIR', category: 'vertical' },
  { name: 'Athenahealth', category: 'vertical' },
  { name: 'eClinicalWorks', category: 'vertical' },
  { name: 'Mercury', slug: 'mercury', category: 'vertical' },
  { name: 'Brex', slug: 'brex', category: 'vertical' },
  { name: 'Modern Treasury', category: 'vertical' },
];

function LogoBadge({ logo }: { logo: LogoChip }) {
  const hasIcon = !!logo.slug;
  return (
    <div className="flex-shrink-0 mx-3 py-3">
      <div className="px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-600 font-medium hover:bg-[#f0e6fb] hover:text-[#8734E1] hover:border-[#8734E1] hover:shadow-md transition-all flex items-center gap-2.5 whitespace-nowrap">
        {hasIcon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://cdn.simpleicons.org/${logo.slug}/777`}
            alt={`${logo.name} logo`}
            className="w-5 h-5 opacity-70"
            loading="lazy"
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

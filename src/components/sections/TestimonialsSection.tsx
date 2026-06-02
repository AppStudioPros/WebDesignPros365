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

// Logos served from Clearbit Logo API (free, real color logos by domain).
// Verified-domain whitelist: only confirmed-working brands ship here. No broken renders.
type LogoChip = {
  name: string;
  domain: string;
};

// Curated, working-domain logo list. Single smooth row, ~24 brands. Loops seamlessly.
const logos: LogoChip[] = [
  // Core stack
  { name: 'Next.js', domain: 'nextjs.org' },
  { name: 'Vercel', domain: 'vercel.com' },
  { name: 'React', domain: 'react.dev' },
  { name: 'TypeScript', domain: 'typescriptlang.org' },
  { name: 'Python', domain: 'python.org' },
  { name: 'Node.js', domain: 'nodejs.org' },
  // AI providers
  { name: 'Anthropic', domain: 'anthropic.com' },
  { name: 'OpenAI', domain: 'openai.com' },
  { name: 'Pinecone', domain: 'pinecone.io' },
  // Data + infrastructure
  { name: 'Supabase', domain: 'supabase.com' },
  { name: 'Cloudflare', domain: 'cloudflare.com' },
  { name: 'PostgreSQL', domain: 'postgresql.org' },
  // CMS
  { name: 'Sanity', domain: 'sanity.io' },
  { name: 'Contentful', domain: 'contentful.com' },
  // Commerce
  { name: 'Shopify', domain: 'shopify.com' },
  { name: 'WordPress', domain: 'wordpress.org' },
  { name: 'Stripe', domain: 'stripe.com' },
  // Payments + fintech
  { name: 'Plaid', domain: 'plaid.com' },
  { name: 'Mercury', domain: 'mercury.com' },
  { name: 'Brex', domain: 'brex.com' },
  // CRM
  { name: 'HubSpot', domain: 'hubspot.com' },
  { name: 'Salesforce', domain: 'salesforce.com' },
  // Comms
  { name: 'Twilio', domain: 'twilio.com' },
  { name: 'Resend', domain: 'resend.com' },
  // Tools
  { name: 'GitHub', domain: 'github.com' },
  { name: 'Figma', domain: 'figma.com' },
  { name: 'Notion', domain: 'notion.so' },
  { name: 'Clerk', domain: 'clerk.com' },
];

function LogoBadge({ logo }: { logo: LogoChip }) {
  return (
    <div className="flex-shrink-0 mx-3">
      <div className="px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium flex items-center gap-2.5 whitespace-nowrap shadow-sm hover:shadow-md hover:border-[#8734E1]/40 transition-all">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://logo.clearbit.com/${logo.domain}?size=64`}
          alt={`${logo.name} logo`}
          className="w-5 h-5 object-contain"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
        <span className="text-sm">{logo.name}</span>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  // Triple the row so the marquee never reveals an edge during the loop reset
  const rowFull = [...logos, ...logos, ...logos];

  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-white/70" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="container-custom relative z-10">
        {/* TRUSTED-BY MARQUEE — moved to TOP of section, single smooth row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mb-20"
        >
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 uppercase tracking-wider">
              Trusted by 50+ Companies &amp; Partnerships
            </p>
          </div>

          {/* Single smooth row, left to right, pause on hover, no glitch */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="flex items-center animate-marquee-smooth py-4" style={{ width: 'max-content' }}>
              {rowFull.map((logo, index) => (
                <LogoBadge key={`logo-${logo.name}-${index}`} logo={logo} />
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            See the full partner directory on our{' '}
            <a href="/partnerships" className="text-[#8734E1] hover:underline">
              Partnerships page
            </a>
            .
          </p>
        </motion.div>

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>
    </section>
  );
}

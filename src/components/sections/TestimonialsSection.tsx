'use client';

import { m } from 'framer-motion';

// All logos served from /public/logos/ — locally hosted SVGs, no CDN dependency.
// Verified-working file set: 26 real brand SVGs downloaded from Devicon, Lobehub, and Simple Icons.
type LogoChip = {
  name: string;
  /** Filename in /public/logos/ (without .svg extension) */
  file: string;
};

const logos: LogoChip[] = [
  // Core stack
  { name: 'Next.js', file: 'nextjs' },
  { name: 'Vercel', file: 'vercel' },
  { name: 'React', file: 'react' },
  { name: 'TypeScript', file: 'typescript' },
  { name: 'Python', file: 'python' },
  { name: 'Node.js', file: 'nodejs' },
  // AI providers
  { name: 'Anthropic', file: 'anthropic' },
  { name: 'OpenAI', file: 'openai' },
  { name: 'Claude', file: 'claude' },
  // Data + infrastructure
  { name: 'Supabase', file: 'supabase' },
  { name: 'Cloudflare', file: 'cloudflare' },
  { name: 'PostgreSQL', file: 'postgresql' },
  // CMS
  { name: 'Sanity', file: 'sanity' },
  { name: 'Contentful', file: 'contentful' },
  // Commerce + shipping
  { name: 'Shopify', file: 'shopify' },
  { name: 'WooCommerce', file: 'woocommerce' },
  { name: 'WordPress', file: 'wordpress' },
  { name: 'Shippo', file: 'shippo' },
  // Payments + fintech
  { name: 'Stripe', file: 'stripe' },
  { name: 'Brex', file: 'brex' },
  { name: 'Wave', file: 'wave' },
  // CRM
  { name: 'HubSpot', file: 'hubspot' },
  { name: 'Salesforce', file: 'salesforce' },
  // Workspace + comms
  { name: 'Slack', file: 'slack' },
  { name: 'Google Workspace', file: 'googleworkspace' },
  { name: 'Zapier', file: 'zapier' },
  { name: 'Twilio', file: 'twilio' },
  { name: 'Resend', file: 'resend' },
  // Social + recruiting
  { name: 'LinkedIn', file: 'linkedin' },
  // Dev tools
  { name: 'GitHub', file: 'github' },
  { name: 'Figma', file: 'figma' },
  { name: 'Notion', file: 'notion' },
  { name: 'Clerk', file: 'clerk' },
];

function LogoBadge({ logo }: { logo: LogoChip }) {
  return (
    <div className="flex-shrink-0 mx-3">
      <div className="px-5 py-3 rounded-xl bg-[#252640] border border-[#3a3858] text-[#c4c0e0] font-medium flex items-center gap-2.5 whitespace-nowrap shadow-sm hover:shadow-md hover:border-[#8734E1]/40 transition-all">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* SVGs are vector — no raster resize needed; unoptimized is correct for SVG */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/logos/${logo.file}.svg`}
          alt={`${logo.name} logo`}
          className="w-5 h-5 object-contain"
          loading="lazy"
          width={20}
          height={20}
          decoding="async"
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
      <div className="absolute inset-0 bg-[#252640]/70" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="container-custom relative z-10">
        {/* TRUSTED-BY MARQUEE — top of section, single smooth row */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mb-20"
        >
          <div className="text-center mb-8">
            <p className="text-sm text-[#8a87a8] uppercase tracking-wider">
              Trusted by 50+ Companies &amp; Partnerships
            </p>
          </div>

          {/* Single smooth row, left-to-right, pause on hover, no glitch */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="flex items-center animate-marquee-smooth py-4" style={{ width: 'max-content' }}>
              {rowFull.map((logo, index) => (
                <LogoBadge key={`logo-${logo.name}-${index}`} logo={logo} />
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-[#8a87a8] mt-4">
            See the full partner directory on our{' '}
            <a href="/partnerships" className="text-[#8734E1] hover:underline">
              Partnerships page
            </a>
            .
          </p>
        </m.div>

        {/* Testimonials removed — will reintroduce only with real, attributable client reviews (Google/BBB/case studies). */}
      </div>
    </section>
  );
}

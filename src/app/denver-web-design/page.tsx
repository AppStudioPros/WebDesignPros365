"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Check, Globe2, Monitor, Layers, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassIcon } from '@/components/ui/glass-icon';
import CTASection from '@/components/sections/CTASection';

const _metadata = {
  title: 'Denver Web Design Agency | Custom Next.js Websites',
  description:
    'Denver web design agency building high-performance custom websites on Next.js 16, React and Vercel. Engineered for speed, conversions, and AI discovery. Web Design Pros 365.',
};

const differentiators = [
  {
    icon: Zap,
    title: 'Built for speed from the start',
    body: 'Every site is built on Next.js 16 with React 19, deployed to Vercel Edge — so it loads fast everywhere. No WordPress bloat, no page builders, no performance debt.',
    color: '#2F73EE',
  },
  {
    icon: Globe2,
    title: 'Engineered for search and AI discovery',
    body: 'Speed is the foundation, not the ceiling. Every build includes technical SEO, structured data, and the content architecture needed to surface in Google and AI-powered search.',
    color: '#8734E1',
  },
  {
    icon: Monitor,
    title: 'Designed to convert',
    body: 'A beautiful site that doesn\'t generate leads is a liability. We design with conversion in mind — clear hierarchy, compelling CTAs, and user flows that turn visitors into clients.',
    color: '#EC4899',
  },
  {
    icon: Layers,
    title: 'Custom, not templated',
    body: 'No ThemeForest. No Elementor. Every component is written for your business, your brand, and your audience — built to last, not to patch.',
    color: '#10B981',
  },
];

const deliverables = [
  'Custom Next.js 16 codebase (App Router)',
  'React 19 components, TypeScript',
  'Vercel Edge deployment — global CDN',
  'Core Web Vitals optimized (target: 95+ Lighthouse)',
  'Technical SEO foundation built in',
  'Structured data (JSON-LD) on every page',
  'Mobile-first responsive design',
  'Sitemap, robots.txt, OG images',
  'Contact form with email delivery',
  'GitHub repository handoff',
];

const faqs = [
  {
    q: 'Why Next.js instead of WordPress or Squarespace?',
    a: "Next.js is a production-grade React framework that delivers dramatically faster load times, better Core Web Vitals scores, and cleaner code architecture than CMS-based platforms. For businesses that care about search rankings and AI discoverability, the technical foundation matters. WordPress sites require constant maintenance, are vulnerable to plugins breaking, and struggle to score well on modern performance benchmarks.",
  },
  {
    q: 'How long does a custom website build take?',
    a: "Most 5-8 page custom builds take 2-4 weeks from kickoff to launch, depending on how quickly content and feedback come in. We work in focused sprints — you always know what's being built and when.",
  },
  {
    q: 'Do you design or just develop?',
    a: "Both. Web Design Pros 365 handles design and development as a single integrated process. We don't hand off a Figma file to a separate dev team — the same people who design it build it, which means faster iteration and cleaner execution.",
  },
  {
    q: 'What does "engineered for AI discovery" mean on a web design project?',
    a: "It means the content architecture, structured data, metadata, and technical foundations are built so your site is easy for AI systems — ChatGPT, Google AI Overviews, Perplexity, Claude — to understand, index, and cite. This is built into every project, not an add-on.",
  },
  {
    q: 'Do you serve businesses outside of Denver?',
    a: "Yes. We're based in Denver but work with businesses across Colorado and nationally. Our best clients value the quality of the work regardless of geography.",
  },
];

export default function DenverWebDesignPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-[#1a1930] to-[#1e2030]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#2F73EE]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#8734E1]/6 rounded-full blur-3xl" />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-6 bg-[#1e1c35] text-[#2F73EE] border-[#2F73EE]/40">Denver, Colorado</Badge>
            <h1 className="heading-xl mb-6 text-white">
              Denver Web Design Agency<br />
              <span style={{ color: '#2F73EE' }}>for High-Performance Websites</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Custom websites built in Denver on Next.js 16, React and Vercel — engineered for speed, conversions, Google search, and AI discovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#2F73EE] hover:bg-[#2563cc] text-white px-8">
                <Link href="/contact">Start Your Project <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8">
                <Link href="/portfolio">See Our Work</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="section bg-[#1e2030]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="heading-lg text-white mb-4">Not just a website. A system that works.</h2>
            <p className="text-white/60 max-w-xl mx-auto text-center">Most web design agencies stop at pretty. We build for performance, search, and the way customers actually find businesses in 2026.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {differentiators.map((d, i) => (
              <motion.div key={d.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-[#252640] border-[#3a3858] p-6 h-full">
                  <GlassIcon Icon={d.icon} color={d.color} className="mb-4" />
                  <h3 className="font-semibold text-white mb-2">{d.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{d.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="section bg-[#252640]">
        <div className="container-custom">
          <div className="flex flex-col items-center gap-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="mb-4 bg-[#1e1c35] text-[#2F73EE] border-[#2F73EE]/40">What's included</Badge>
              <h2 className="heading-lg text-white mb-6">Everything, built right</h2>
              <p className="text-white/60 leading-relaxed mb-6 text-center">
                Every Denver web design project at Web Design Pros 365 ships with a complete technical stack — not a template with a new coat of paint.
              </p>
              <Button asChild className="bg-[#2F73EE] hover:bg-[#2563cc] text-white">
                <Link href="/contact">Get a Project Quote <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="grid grid-cols-1 gap-3">
                {deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-[#1e2030] rounded-lg px-4 py-3">
                    <Check className="w-4 h-4 text-[#2F73EE] flex-shrink-0" />
                    <span className="text-sm text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CROSSLINK — AI VISIBILITY */}
      <section className="section bg-[#1e2030]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
            <BarChart3 className="w-10 h-10 mx-auto mb-4" style={{ color: '#8734E1' }} />
            <h2 className="heading-lg text-white mb-4">Every website includes AI visibility foundations</h2>
            <p className="text-white/60 leading-relaxed mb-8 text-center">
              Every project ships with technical SEO, structured data, and AEO architecture built in. For businesses that want to go deeper — we also offer dedicated{' '}
              <Link href="/denver-ai-seo" className="text-[#8734E1] hover:underline">Denver AI SEO</Link>{' '}
              and{' '}
              <Link href="/denver-generative-engine-optimization" className="text-[#8734E1] hover:underline">Generative Engine Optimization</Link>{' '}
              services.
            </p>
            <Button asChild variant="outline" className="border-[#8734E1]/40 text-[#8734E1] hover:bg-[#8734E1]/10">
              <Link href="/denver-ai-web-design">See Our AI-Ready Web Design Approach <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="heading-lg text-white mb-4">Denver web design — common questions</h2>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="bg-[#1e2030] border border-[#3a3858] rounded-2xl p-6">
                  <h3 className="font-semibold text-white mb-3">{faq.q}</h3>
                  <p className="text-[#a8a4c8] leading-relaxed text-sm">{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

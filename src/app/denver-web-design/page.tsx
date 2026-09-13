"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CTASection from '@/components/sections/CTASection';

const _metadata = {
  title: 'Denver Web Design Agency | Custom Next.js Websites',
  description:
    'Denver web design agency building high-performance custom websites on Next.js 16, React and Vercel. Engineered for speed, conversions, and AI discovery. Web Design Pros 365.',
};

const differentiators = [
  {
    title: 'Built for speed from the start',
    body: 'Every site is built on Next.js 16 with React 19, deployed to Vercel Edge. Fast everywhere, no exceptions. No WordPress bloat, no page builders, no performance debt.',
  },
  {
    title: 'Engineered for search and AI discovery',
    body: 'Speed is the floor, not the ceiling. Every build includes technical SEO, structured data, and the content architecture needed to show up in Google and AI-powered search.',
  },
  {
    title: 'Designed to convert',
    body: "A good-looking site that doesn't generate leads is a liability. We design with conversion in mind: clear hierarchy, strong CTAs, and paths that move visitors toward action.",
  },
  {
    title: 'Custom, not templated',
    body: "No ThemeForest. No Elementor. Every component is written for your business, your brand, and your audience , built to last, not swapped out next year.",
  },
];

const deliverables = [
  'Custom Next.js 16 codebase (App Router)',
  'React 19 components, TypeScript',
  'Vercel Edge deployment, global CDN',
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
    a: "Next.js delivers faster load times, better Core Web Vitals scores, and cleaner architecture than CMS-based platforms. WordPress sites need constant maintenance, break when plugins conflict, and routinely score poorly on modern performance tests. For businesses that care about search rankings and AI discoverability, the technical foundation matters.",
  },
  {
    q: 'How long does a custom website build take?',
    a: "Most 5-8 page custom builds take 2-4 weeks from kickoff to launch, depending on how quickly content and feedback come in. We work in focused sprints, so you always know what's being built and when.",
  },
  {
    q: 'Do you handle design and development, or just one?',
    a: "Both. Web Design Pros 365 handles design and development as one integrated process. The same team that designs it builds it. Faster iteration, cleaner result, no Figma handoff to a separate dev shop.",
  },
  {
    q: 'What does "engineered for AI discovery" mean on a web design project?',
    a: "It means the content architecture, structured data, metadata, and technical foundations are built so AI systems (ChatGPT, Google AI Overviews, Perplexity, Claude) can find, read, and cite your business. This is standard in every project, not an add-on.",
  },
  {
    q: 'Do you work with businesses outside Denver?',
    a: "Yes. We're based in Denver but work with businesses across Colorado and nationally. Most client relationships are fully remote.",
  },
];

export default function DenverWebDesignPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
              Custom websites built in Denver on Next.js 16, React and Vercel. Built for speed, conversions, Google search, and AI discovery.
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

      {/* DIFFERENTIATORS */}
      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="heading-lg text-white mb-4">Not just a website. A system that works.</h2>
            <p className="text-white/60 max-w-xl mx-auto">Most web design agencies stop at pretty. We build for performance, search, and the way customers find businesses today.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {differentiators.map((d, i) => (
              <motion.div key={d.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="h-full">
                <Card className="bg-[#1e2030] border-[#3a3858] p-8 h-full text-center">
                  <h3 className="font-semibold text-white mb-3">{d.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{d.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="section bg-[#252640]">
        <div className="container-custom max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }} viewport={{ once: true }} className="mb-10">
            <Badge className="mb-4 bg-[#1e1c35] text-[#2F73EE] border-[#2F73EE]/40">What's included</Badge>
            <h2 className="heading-lg text-white mb-4">Everything, built right</h2>
            <p className="text-white/60 leading-relaxed">
              Every Denver web design project ships with a complete technical stack, not a theme with fresh colors.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }} viewport={{ once: true }} className="mb-8">
            <div className="grid grid-cols-1 gap-3 text-left">
              {deliverables.map((item) => (
                <div key={item} className="flex items-center gap-3 bg-[#1e2030] rounded-lg px-4 py-3">
                  <Check className="w-4 h-4 text-[#2F73EE] flex-shrink-0" />
                  <span className="text-sm text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <Button asChild className="bg-[#2F73EE] hover:bg-[#2563cc] text-white">
            <Link href="/contact">Get a Project Quote <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </section>

      {/* CROSSLINK */}
      <section className="section bg-[#1e2030]">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }} viewport={{ once: true }}>
            <h2 className="heading-lg text-white mb-4">Every website includes AI visibility foundations</h2>
            <p className="text-white/60 leading-relaxed mb-8">
              Every project ships with technical SEO, structured data, and AEO architecture built in. For businesses that want to go further, we offer dedicated{' '}
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

      {/* FAQ — accordion */}
      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="heading-lg text-white mb-4">Denver web design: common questions</h2>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="bg-[#1e2030] border border-[#3a3858] rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#1c1d30] transition-colors"
                  >
                    <span className="font-semibold text-white pr-4 text-sm md:text-base">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} style={{ color: '#2F73EE' }} />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                        <div className="px-6 pb-5 border-t border-[#3a3858]">
                          <p className="text-[#a8a4c8] leading-relaxed text-sm pt-4">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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

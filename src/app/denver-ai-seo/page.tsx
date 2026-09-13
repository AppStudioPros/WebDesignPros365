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
  title: 'Denver AI SEO Agency | Search & Answer Optimization',
  description:
    'Denver AI SEO agency combining technical SEO with answer engine optimization (AEO). Rank in Google and become easy for AI systems to understand, trust, and recommend. Web Design Pros 365.',
};

const seoServices = [
  {
    title: 'Technical SEO',
    color: '#2F73EE',
    items: [
      'Core Web Vitals optimization',
      'Crawlability and indexability audit',
      'Schema markup (JSON-LD) implementation',
      'Site architecture and internal linking',
      'Page speed and server response optimization',
      'Canonical tags and duplicate content resolution',
    ],
  },
  {
    title: 'Answer Engine Optimization (AEO)',
    color: '#EC4899',
    items: [
      'FAQPage and HowTo schema markup',
      'Speakable schema for voice and AI readability',
      'Answer-first content restructuring',
      'Google AI Overview optimization',
      'Featured snippet targeting',
      'Entity and topic authority building',
    ],
  },
  {
    title: 'On-Page SEO',
    color: '#10B981',
    items: [
      'Keyword intent mapping and targeting',
      'Title tags and meta descriptions',
      'Heading hierarchy (H1/H2/H3)',
      'Image alt text and file optimization',
      'Internal link strategy',
      'Content gap analysis',
    ],
  },
  {
    title: 'Reporting and Visibility',
    color: '#F59E0B',
    items: [
      'Google Search Console setup and monitoring',
      'Bing Webmaster Tools for Copilot',
      'AI search appearance tracking',
      'Core Web Vitals monitoring',
      'Monthly ranking and visibility reports',
      'Competitor tracking',
    ],
  },
];

const comparison = [
  {
    label: 'Traditional SEO goal',
    desc: 'Rank in the blue links on page 1 of Google',
    color: '#2F73EE',
  },
  {
    label: 'AEO goal',
    desc: 'Be selected as the direct answer in AI Overviews, voice search, and featured snippets',
    color: '#EC4899',
  },
  {
    label: 'How they work together',
    desc: 'Strong SEO builds the authority that makes AEO more effective. AEO signals help traditional rankings. They are not competing strategies.',
    color: '#8734E1',
  },
];

const faqs = [
  {
    q: 'What is AI SEO and how is it different from regular SEO?',
    a: "AI SEO is SEO updated for the current reality: search results now include AI-generated answers, not just blue links. Regular SEO optimizes for ranking. AI SEO also optimizes for selection — making sure your content is structured so AI Overviews, voice search, and answer engines choose your page as the source. Technical SEO remains the foundation; answer engine optimization (AEO) is the layer on top.",
  },
  {
    q: 'What is AEO (Answer Engine Optimization)?',
    a: "AEO is the practice of structuring content so AI systems pick your page as the direct answer to a query. Key tactics include FAQPage and HowTo schema, Speakable schema, answer-first formatting, and entity-based optimization. AEO focuses on being selected by an AI system — different from SEO which focuses on ranking in a list.",
  },
  {
    q: 'How long does it take to see AI SEO results?',
    a: "Technical improvements — page speed, Core Web Vitals, structured data — show up in Google Search Console within days to weeks. Ranking changes typically show meaningful movement in 30-90 days. AEO signals like FAQ schema can drive featured snippets in as few as 2-4 weeks. AI search appearance (Perplexity, ChatGPT) responds to structural changes in as little as 2-7 days.",
  },
  {
    q: 'Do you offer AI SEO for existing websites?',
    a: "Yes. We can audit and optimize any existing website regardless of platform. If critical technical issues exist — like a WordPress site with severe speed problems or a page builder that blocks clean semantic HTML — we may recommend addressing those first.",
  },
  {
    q: 'Is AI SEO different from Generative Engine Optimization (GEO)?',
    a: "Yes. AI SEO and AEO focus on Google-adjacent signals: ranking, featured snippets, AI Overviews. GEO is specifically about getting cited by conversational AI engines — ChatGPT, Gemini, Claude, Perplexity. They require overlapping but different strategies. Our dedicated GEO service handles the citation-building layer.",
  },
];

export default function DenverAiSeoPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* HERO */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-[#1a1930] to-[#1e2030]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#2F73EE]/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#EC4899]/6 rounded-full blur-3xl" />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-6 bg-[#1e1c35] text-[#2F73EE] border-[#2F73EE]/40">Denver, Colorado</Badge>
            <h1 className="heading-xl mb-6 text-white">
              Denver AI SEO<br />
              <span style={{ color: '#2F73EE' }}>for Google and AI-Powered Search</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Rank in traditional search and become easier for AI systems to understand, trust, and recommend. Technical SEO and Answer Engine Optimization, working together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#2F73EE] hover:bg-[#2563cc] text-white px-8">
                <Link href="/contact">Get an SEO Audit <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8">
                <Link href="/services/ai-visibility">How AI Search Works</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO vs AEO */}
      <section className="section bg-[#1e2030]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="heading-lg text-white mb-4">SEO and AEO: two disciplines, one system</h2>
            <p className="text-white/60 max-w-xl mx-auto">They're not competing approaches. They work together.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-stretch">
            {comparison.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="h-full">
                <Card className="bg-[#252640] border-[#3a3858] p-6 h-full text-center hover:border-[#2F73EE] hover:shadow-lg transition-all">
                  <div className="w-2 h-2 rounded-full mx-auto mb-4" style={{ backgroundColor: item.color }} />
                  <p className="font-semibold text-white text-sm mb-3">{item.label}</p>
                  <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="heading-lg text-white mb-4">What's included in Denver AI SEO</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {seoServices.map((service, i) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="h-full">
                <Card className="bg-[#1e2030] border-[#3a3858] p-6 h-full text-center hover:border-[#2F73EE] hover:shadow-lg transition-all">
                  <h3 className="font-semibold text-white mb-4">{service.title}</h3>
                  <ul className="space-y-2 text-left">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: service.color }} />
                        <span className="text-xs text-white/60">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CROSSLINK — GEO */}
      <section className="section bg-[#1e2030]">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="heading-lg text-white mb-4">Need to get cited by ChatGPT and Claude?</h2>
            <p className="text-white/60 leading-relaxed mb-8">
              AI SEO makes you rankable and extractable. For businesses that want to go further — getting your brand cited by conversational AI engines — that's{' '}
              <Link href="/denver-generative-engine-optimization" className="text-[#8734E1] hover:underline">Generative Engine Optimization (GEO)</Link>.
              Ranking isn't enough anymore. Become the source AI cites.
            </p>
            <Button asChild className="bg-[#8734E1] hover:bg-[#7228C0] text-white">
              <Link href="/denver-generative-engine-optimization">Explore Denver GEO <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ — accordion */}
      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="heading-lg text-white mb-4">Denver AI SEO — common questions</h2>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
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

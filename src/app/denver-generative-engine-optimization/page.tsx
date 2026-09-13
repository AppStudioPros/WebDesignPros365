"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Quote, Check, Globe2, Bot, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassIcon } from '@/components/ui/glass-icon';
import CTASection from '@/components/sections/CTASection';

const _metadata = {
  title: 'Denver GEO Agency | Generative Engine Optimization',
  description:
    'Get your Denver business discovered, understood, and cited by ChatGPT, Gemini, Claude, Perplexity and AI-powered search. Denver GEO agency — Web Design Pros 365.',
};

const geoSignals = [
  {
    icon: Globe2,
    title: 'Entity optimization',
    body: 'AI systems build a model of your business as an entity — name, location, industry, expertise, associations. We make that model accurate, complete, and consistent across the web.',
    color: '#8734E1',
  },
  {
    icon: FileText,
    title: 'Citation-worthy content architecture',
    body: 'AI systems cite sources that are authoritative, specific, and structured. We restructure your content so it\'s the kind of source an LLM would want to reference.',
    color: '#2F73EE',
  },
  {
    icon: Bot,
    title: 'llms.txt and AI crawler access',
    body: 'We implement llms.txt files, ensure all major AI crawlers are invited and unblocked, and structure content metadata for AI parsing — not just human reading.',
    color: '#EC4899',
  },
  {
    icon: Sparkles,
    title: 'E-E-A-T authority signals',
    body: 'Experience, Expertise, Authoritativeness, Trustworthiness — the signals AI systems and Google use to evaluate whether a source is worth citing. We build them systematically.',
    color: '#10B981',
  },
];

const denverStats = [
  { stat: '86%', label: 'of Denver local businesses invisible to all tested AI systems (recent study)' },
  { stat: '12.7%', label: 'of 581 Denver businesses ever cited by an AI assistant in the same study' },
  { stat: '63%+', label: 'of people now use AI to find and vet businesses before contacting them' },
  { stat: '5-7 days', label: 'average time for Perplexity to reflect structural content changes' },
];

const geoProcess = [
  { step: '01', title: 'AI visibility audit', body: 'We test how your business currently appears in ChatGPT, Gemini, Claude, and Perplexity. Most Denver businesses don\'t appear at all. This is your baseline.' },
  { step: '02', title: 'Entity and citation gap analysis', body: 'We identify what signals your business is missing — structured data gaps, content structure issues, authority source presence, crawler access problems.' },
  { step: '03', title: 'Content and architecture work', body: 'We restructure pages for AI extraction, implement llms.txt, fix schema gaps, and build citation-worthy content that AI systems want to reference.' },
  { step: '04', title: 'Authority signal building', body: 'We expand your presence on the sources AI systems pull from most — and ensure your brand is mentioned consistently, accurately, and authoritatively.' },
  { step: '05', title: 'Monitoring and iteration', body: 'GEO is not a one-time fix. AI search evolves fast. We track your citation presence across AI engines and iterate as the landscape shifts.' },
];

const aiPlatforms = [
  { name: 'ChatGPT / SearchGPT', note: 'Brand mention frequency is the strongest predictor of ChatGPT citation. Consistency across the open web.', color: '#10A37F' },
  { name: 'Perplexity', note: 'Cites more sources per answer than any other engine. Responds to structural changes in 2-7 days.', color: '#1B1F23' },
  { name: 'Claude', note: '30% more likely to cite bullet-pointed, well-structured pages. Hierarchy and directness matter.', color: '#8B6FE2' },
  { name: 'Google AI Overviews', note: 'Hybrid of traditional SEO signals and community sources. Strong technical SEO is the foundation.', color: '#4285F4' },
  { name: 'Gemini', note: 'Tightly tied to Google search behavior. Video and multimodal content adds signal.', color: '#1A73E8' },
  { name: 'Bing Copilot', note: 'Builds on Bing Webmaster Tools signals. Submitting sitemap to Bing is underutilized by most Denver businesses.', color: '#0078D4' },
];

const faqs = [
  {
    q: 'What is Generative Engine Optimization (GEO)?',
    a: "GEO is the practice of making your brand discoverable and citable by conversational AI engines — ChatGPT, Gemini, Claude, Perplexity, and Google AI Overviews. It's distinct from SEO (which optimizes for ranking in blue links) and AEO (which optimizes for being the answer in AI Overviews). GEO specifically targets the signals that make an LLM want to mention and cite your business when a user asks a relevant question.",
  },
  {
    q: 'How is GEO different from SEO and AEO?',
    a: "SEO = rank in search results. AEO = be selected as the answer in AI Overviews and featured snippets. GEO = get cited by conversational AI when users ask questions. They require overlapping but distinct strategies. Strong SEO and AEO create the technical foundation that makes GEO more effective — they're not competing approaches.",
  },
  {
    q: 'How do I know if my Denver business is being cited by AI?',
    a: "Most Denver businesses aren't — a recent study found 86% of local businesses are completely invisible to AI systems. The first step is a GEO audit: we query ChatGPT, Claude, Perplexity, and Gemini with the questions your target customers would ask and measure whether and how your business appears.",
  },
  {
    q: 'How long does GEO take to show results?',
    a: "Faster than you'd expect. Perplexity reflects structural content changes in as little as 2-7 days. ChatGPT and Claude take longer to update their knowledge — weeks to months depending on crawl schedules. Entity-level signals (brand mentions, authority source presence) build over time. We set realistic timelines based on your starting position.",
  },
  {
    q: 'Does GEO replace SEO?',
    a: "No. GEO is built on top of a strong SEO foundation. Trying to do GEO without solid technical SEO and content authority is like trying to build a second floor without a first. Our recommended approach is always to fix technical SEO first, layer AEO on top, and then build GEO as the final authority layer.",
  },
  {
    q: 'What Denver businesses benefit most from GEO?',
    a: "Businesses in categories where customers ask AI tools for recommendations — professional services (legal, financial, medical), agencies, consultants, specialty retail, and B2B companies. If your customers ask AI things like 'who is the best [your service] in Denver?' — GEO determines whether you're the answer.",
  },
];

export default function DenverGeoPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-[#1a1930] to-[#1e2030]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#8734E1]/12 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8734E1]/6 rounded-full blur-3xl" />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-6 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]/40">Denver, Colorado</Badge>
            <h1 className="heading-xl mb-6 text-white">
              Generative Engine Optimization<br />
              <span style={{ color: '#8734E1' }}>for Denver Brands</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-4 leading-relaxed">
              Get your company discovered, understood, and cited by ChatGPT, Gemini, Claude, Perplexity, and AI-powered search.
            </p>
            <div className="inline-block bg-[#252640] border border-[#8734E1]/30 rounded-xl px-6 py-3 mb-8">
              <p className="text-[#8734E1] font-semibold text-sm">Ranking isn't enough anymore. Become the source AI cites.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#8734E1] hover:bg-[#7228C0] text-white px-8">
                <Link href="/contact">Get a GEO Audit <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8">
                <Link href="/services/ai-visibility">How AI Search Works</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DENVER STATS */}
      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="heading-lg text-white mb-4">The Denver AI visibility gap</h2>
            <p className="text-white/60 max-w-xl mx-auto">Most Denver businesses don't know how invisible they are to AI search. The data is stark.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {denverStats.map((s, i) => (
              <motion.div key={s.stat} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-[#1e2030] border-[#3a3858] p-6 text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#8734E1' }}>{s.stat}</p>
                  <p className="text-xs text-white/60 leading-relaxed">{s.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GEO SIGNALS */}
      <section className="section bg-[#1e2030]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="heading-lg text-white mb-4">What GEO actually optimizes</h2>
            <p className="text-white/60 max-w-xl mx-auto">GEO targets the signals that determine whether an AI system cites your brand — not just whether it can find your site.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {geoSignals.map((signal, i) => (
              <motion.div key={signal.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-[#252640] border-[#3a3858] p-6 h-full">
                  <GlassIcon Icon={signal.icon} color={signal.color} className="mb-4" />
                  <h3 className="font-semibold text-white mb-2">{signal.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{signal.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI PLATFORMS */}
      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="heading-lg text-white mb-4">How each AI engine cites — and what we do about it</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {aiPlatforms.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <div className="bg-[#1e2030] border border-[#3a3858] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                    <p className="font-semibold text-white text-sm">{p.name}</p>
                  </div>
                  <p className="text-xs text-white/55 leading-relaxed">{p.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section bg-[#1e2030]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="heading-lg text-white mb-4">How GEO works in practice</h2>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-4">
            {geoProcess.map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="bg-[#252640] border border-[#3a3858] rounded-2xl p-6 flex gap-5">
                  <p className="text-2xl font-bold font-mono flex-shrink-0" style={{ color: '#8734E1' }}>{step.step}</p>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CROSSLINKS */}
      <section className="section bg-[#252640]">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="heading-lg text-white mb-4">GEO works best on a strong foundation</h2>
            <p className="text-white/60 leading-relaxed mb-8">
              GEO is the top layer. Before building citation authority, every business needs solid technical SEO and AEO foundations.{' '}
              <Link href="/denver-ai-seo" className="text-[#2F73EE] hover:underline">Our Denver AI SEO service</Link>{' '}
              handles both — and pairs naturally with GEO for a complete AI search strategy. Or if you need the website built first,{' '}
              <Link href="/denver-ai-web-design" className="text-[#8734E1] hover:underline">AI-ready web design</Link>{' '}
              starts with all the right technical foundations already in place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-[#8734E1] hover:bg-[#7228C0] text-white">
                <Link href="/contact">Start With a GEO Audit <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Link href="/denver-ai-seo">See Denver AI SEO</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-[#1e2030]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="heading-lg text-white mb-4">GEO — frequently asked questions</h2>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="bg-[#252640] border border-[#3a3858] rounded-2xl p-6">
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

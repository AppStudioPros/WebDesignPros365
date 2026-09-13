"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Search, Bot, Check, Code2, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassIcon } from '@/components/ui/glass-icon';
import CTASection from '@/components/sections/CTASection';

const _metadata = {
  title: 'Denver AI Web Design Agency | AI-Ready Next.js Websites',
  description:
    'Denver AI web design agency building custom Next.js websites for the way customers search now — Google, AI Overviews, ChatGPT, Gemini, Claude and Perplexity. Web Design Pros 365.',
};

const buildLayers = [
  { step: '01', label: 'Design', detail: 'Custom visual design, brand system, UX/UI' },
  { step: '02', label: 'Development', detail: 'Next.js 16, React 19, TypeScript, Vercel' },
  { step: '03', label: 'Technical SEO', detail: 'Core Web Vitals, structured data, sitemap, canonicals' },
  { step: '04', label: 'AEO', detail: 'Schema markup, FAQ structure, answer-first content' },
  { step: '05', label: 'GEO', detail: 'llms.txt, entity optimization, citation architecture' },
  { step: '06', label: 'AI Visibility', detail: 'ChatGPT, Gemini, Claude, Perplexity readiness' },
];

const aiSearchEngines = [
  { name: 'ChatGPT Search', color: '#10A37F', note: 'Favors brand mentions and authority sources across the web' },
  { name: 'Google AI Overviews', color: '#4285F4', note: 'Pulls from strong SEO signals + structured content' },
  { name: 'Perplexity', color: '#1B1F23', note: 'Cites frequently — rewards fresh, structured, citable content' },
  { name: 'Claude', color: '#8B6FE2', note: 'Prefers depth and hierarchy — well-structured pages win' },
  { name: 'Gemini', color: '#1A73E8', note: 'Tied to Google signals — video and multimodal helps' },
  { name: 'Bing Copilot', color: '#0078D4', note: 'Builds on Bing webmaster signals + indexed content' },
];

const differentiators = [
  {
    icon: Code2,
    title: 'The website and the visibility system are one build',
    body: "Most shops either build websites or sell AI SEO. We do both in the same project. The structured data, content architecture, and technical signals that AI systems rely on are built into the site from day one — not retrofitted later.",
    color: '#8734E1',
  },
  {
    icon: Zap,
    title: 'Speed that search engines can measure',
    body: 'A slow website loses in both traditional search and AI-powered search. Every build targets 95+ Lighthouse performance — not because it\'s a vanity metric, but because page speed is a direct ranking and citation signal.',
    color: '#2F73EE',
  },
  {
    icon: Search,
    title: 'Structured for extraction, not just reading',
    body: "AI systems don't read your website the way a human does — they extract. We structure content with that extraction in mind: clear hierarchy, lead-with-the-answer formatting, JSON-LD schema, and Speakable metadata.",
    color: '#10B981',
  },
  {
    icon: Bot,
    title: 'Built for how search is changing in Denver',
    body: 'A recent study found 86% of Denver local businesses are invisible to AI search systems. Your next website shouldn\'t be one of them.',
    color: '#EC4899',
  },
];

const faqs = [
  {
    q: 'What does "AI-ready web design" actually mean?',
    a: "It means the website is built so AI systems — ChatGPT, Google AI Overviews, Perplexity, Claude — can find, understand, and cite your business. That requires specific technical decisions: structured data (JSON-LD), answer-first content formatting, llms.txt, Speakable schema, and clean semantic HTML. These are built into every AI-ready project at Web Design Pros 365.",
  },
  {
    q: 'Why is this different from regular Denver web design?',
    a: "A conventional web design project optimizes for how a human reads a webpage. AI-ready design also optimizes for how an AI system parses and extracts information from a page. The visual design can look identical — the difference is invisible to the eye but significant to search systems.",
  },
  {
    q: 'How do you combine design, development, and AI visibility in one project?',
    a: "Our process integrates all three disciplines from the start rather than treating them as sequential phases. The content architect and the developer work together — which means the structured data, the content hierarchy, and the technical SEO are planned before a line of code is written, not added on at the end.",
  },
  {
    q: 'Do you offer ongoing AI visibility services after the site launches?',
    a: "Yes. For businesses that want to go deeper, we offer dedicated Denver AI SEO and Generative Engine Optimization services that continue building AI search presence after launch. The website is the foundation — ongoing work builds the citation authority on top of it.",
  },
  {
    q: 'What makes WDP365 the right choice for AI-ready web design in Denver?',
    a: "We build the website AND the visibility system — most agencies do one or the other. The technical stack (Next.js 16, structured data, Vercel Edge), the content strategy (AEO, GEO), and the design all come from the same team with the same goal: a site that performs in Google and gets cited by AI.",
  },
];

export default function DenverAiWebDesignPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-[#1a1930] to-[#1e2030]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#8734E1]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2F73EE]/6 rounded-full blur-3xl" />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-6 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]/40">Denver, Colorado</Badge>
            <h1 className="heading-xl mb-6 text-white">
              AI-Ready Web Design<br />
              <span style={{ color: '#8734E1' }}>for Denver Businesses</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-4 leading-relaxed">
              We build custom Next.js websites designed for the way customers search now — Google, AI Overviews, ChatGPT, Gemini, Claude and Perplexity.
            </p>
            <p className="text-sm text-white/50 max-w-xl mx-auto mb-10">
              86% of Denver businesses are invisible to AI search systems. Your next website doesn't have to be.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#8734E1] hover:bg-[#7228C0] text-white px-8">
                <Link href="/contact">Start Your AI-Ready Build <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8">
                <Link href="/services/ai-visibility">How AI Visibility Works</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BUILD LAYERS */}
      <section className="section bg-[#1e2030]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="heading-lg text-white mb-4">One build. Every layer.</h2>
            <p className="text-white/60 max-w-xl mx-auto text-center">Design, development, and AI visibility are not separate projects. They're one integrated system.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {buildLayers.map((layer, i) => (
              <motion.div key={layer.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="bg-[#252640] border-[#3a3858] p-4 text-center h-full">
                  <p className="text-xs font-mono text-[#8734E1] mb-2">{layer.step}</p>
                  <p className="font-semibold text-white text-sm mb-1">{layer.label}</p>
                  <p className="text-xs text-white/50 leading-snug">{layer.detail}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="heading-lg text-white mb-4">Why this is different</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {differentiators.map((d, i) => (
              <motion.div key={d.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-[#1e2030] border-[#3a3858] p-6 h-full">
                  <GlassIcon Icon={d.icon} color={d.color} className="mb-4" />
                  <h3 className="font-semibold text-white mb-2">{d.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{d.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI ENGINES */}
      <section className="section bg-[#1e2030]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="heading-lg text-white mb-4">Built to be found everywhere search is going</h2>
            <p className="text-white/60 max-w-xl mx-auto text-center">Every AI system has different patterns. We build for all of them.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {aiSearchEngines.map((engine, i) => (
              <motion.div key={engine.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <div className="bg-[#252640] border border-[#3a3858] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: engine.color }} />
                    <p className="font-semibold text-white text-sm">{engine.name}</p>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">{engine.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CROSSLINKS */}
      <section className="section bg-[#252640]">
        <div className="container-custom max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="heading-lg text-white mb-4">Go deeper with AI search</h2>
            <p className="text-white/60">Every AI-ready website includes our technical SEO and AEO foundation. For ongoing AI search visibility, pair it with:</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#1e2030] border-[#3a3858] p-6">
              <Search className="w-6 h-6 mb-3" style={{ color: '#2F73EE' }} />
              <h3 className="font-semibold text-white mb-2">Denver AI SEO + AEO</h3>
              <p className="text-sm text-white/60 mb-4 leading-relaxed">Rank in traditional search and become easy for AI systems to understand, trust, and recommend.</p>
              <Button asChild variant="outline" className="border-[#2F73EE]/40 text-[#2F73EE] hover:bg-[#2F73EE]/10">
                <Link href="/denver-ai-seo">Learn More <ArrowRight className="ml-2 w-3 h-3" /></Link>
              </Button>
            </Card>
            <Card className="bg-[#1e2030] border-[#3a3858] p-6">
              <Sparkles className="w-6 h-6 mb-3" style={{ color: '#8734E1' }} />
              <h3 className="font-semibold text-white mb-2">Generative Engine Optimization</h3>
              <p className="text-sm text-white/60 mb-4 leading-relaxed">Ranking isn't enough anymore. Become the source AI cites. Our Denver GEO service builds citation authority.</p>
              <Button asChild variant="outline" className="border-[#8734E1]/40 text-[#8734E1] hover:bg-[#8734E1]/10">
                <Link href="/denver-generative-engine-optimization">Learn More <ArrowRight className="ml-2 w-3 h-3" /></Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-[#1e2030]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="heading-lg text-white mb-4">AI-ready web design — questions</h2>
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

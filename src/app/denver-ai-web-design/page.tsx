"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  { name: 'Google AI Overviews', color: '#4285F4', note: 'Pulls from strong SEO signals and structured content' },
  { name: 'Perplexity', color: '#6366f1', note: 'Cites frequently — rewards fresh, structured, citable content' },
  { name: 'Claude', color: '#8B6FE2', note: 'Prefers depth and hierarchy — well-structured pages win' },
  { name: 'Gemini', color: '#1A73E8', note: 'Tied to Google signals — video and multimodal content helps' },
  { name: 'Bing Copilot', color: '#0078D4', note: 'Builds on Bing webmaster signals and indexed content' },
];

const differentiators = [
  {
    title: 'The website and the visibility system are one build',
    body: "Most shops either build websites or sell AI SEO. We do both in the same project. The structured data, content architecture, and technical signals that AI systems rely on are built into the site from day one — not added later.",
  },
  {
    title: 'Speed that search engines can measure',
    body: "A slow website loses in both traditional search and AI-powered search. Every build targets 95+ Lighthouse performance — because page speed is a direct ranking and citation signal.",
  },
  {
    title: 'Structured for extraction, not just reading',
    body: "AI systems don't read your website the way a human does — they extract. We structure content with that in mind: clear hierarchy, lead-with-the-answer formatting, JSON-LD schema, and Speakable metadata.",
  },
  {
    title: 'Built for how search is changing in Denver',
    body: "A recent study found 86% of Denver local businesses are invisible to AI search systems. Your next website shouldn't be one of them.",
  },
];

const faqs = [
  {
    q: 'What does "AI-ready web design" actually mean?',
    a: "It means the website is built so AI systems — ChatGPT, Google AI Overviews, Perplexity, Claude — can find, understand, and cite your business. That requires specific technical decisions: structured data (JSON-LD), answer-first content formatting, llms.txt, Speakable schema, and clean semantic HTML. These are standard in every AI-ready project at Web Design Pros 365.",
  },
  {
    q: 'How is this different from regular Denver web design?',
    a: "A conventional web design project optimizes for how a human reads a webpage. AI-ready design also optimizes for how an AI system parses and extracts information. The visual design can look identical — the difference is under the hood, but it's significant to search systems.",
  },
  {
    q: 'How do you combine design, development, and AI visibility in one project?',
    a: "All three disciplines are integrated from the start rather than treated as separate phases. Content architecture and development planning happen together — which means the structured data, content hierarchy, and technical SEO are built before a line of code is written, not added at the end.",
  },
  {
    q: 'Do you offer ongoing AI visibility after the site launches?',
    a: "Yes. For businesses that want to go further, we offer Denver AI SEO and Generative Engine Optimization services that continue building AI search presence after launch. The website is the foundation — ongoing work builds the citation authority on top.",
  },
  {
    q: 'Why is WDP365 the right choice for AI-ready web design in Denver?',
    a: "We build the website and the visibility system together — most agencies do one or the other. The technical stack (Next.js 16, structured data, Vercel Edge), the content strategy (AEO, GEO), and the design all come from the same team with the same goal.",
  },
];

export default function DenverAiWebDesignPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
              Custom Next.js websites built for the way customers search now — Google, AI Overviews, ChatGPT, Gemini, Claude, and Perplexity.
            </p>
            <p className="text-sm text-white/50 max-w-xl mx-auto mb-10">
              86% of Denver businesses are invisible to AI search. Your next website doesn't have to be.
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="heading-lg text-white mb-4">One build. Every layer.</h2>
            <p className="text-white/60 max-w-xl mx-auto">Design, development, and AI visibility aren't separate projects. They're one system.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto items-stretch">
            {buildLayers.map((layer, i) => (
              <motion.div key={layer.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="h-full">
                <Card className="bg-[#252640] border-[#3a3858] p-4 text-center h-full flex flex-col justify-center">
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="heading-lg text-white mb-4">Why this is different</h2>
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

      {/* AI ENGINES */}
      <section className="section bg-[#1e2030]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="heading-lg text-white mb-4">Built to be found everywhere search is going</h2>
            <p className="text-white/60 max-w-xl mx-auto">Every AI system has different patterns. We build for all of them.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto items-stretch">
            {aiSearchEngines.map((engine, i) => (
              <motion.div key={engine.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="h-full">
                <div className="bg-[#252640] border border-[#3a3858] rounded-xl p-5 h-full flex flex-col text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: engine.color }} />
                    <p className="font-semibold text-white text-sm">{engine.name}</p>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed flex-1">{engine.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CROSSLINKS */}
      <section className="section bg-[#252640]">
        <div className="container-custom max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="heading-lg text-white mb-4">Go deeper with AI search</h2>
            <p className="text-white/60">Every AI-ready website includes our technical SEO and AEO foundation. For ongoing AI search visibility, pair it with:</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <Card className="bg-[#1e2030] border-[#3a3858] p-6 text-center">
              <h3 className="font-semibold text-white mb-2">Denver AI SEO + AEO</h3>
              <p className="text-sm text-white/60 mb-4 leading-relaxed">Rank in traditional search and become easy for AI systems to understand, trust, and recommend.</p>
              <Button asChild variant="outline" size="sm" className="border-[#2F73EE]/40 text-[#2F73EE] hover:bg-[#2F73EE]/10">
                <Link href="/denver-ai-seo">Learn More <ArrowRight className="ml-2 w-3 h-3" /></Link>
              </Button>
            </Card>
            <Card className="bg-[#1e2030] border-[#3a3858] p-6 text-center">
              <h3 className="font-semibold text-white mb-2">Generative Engine Optimization</h3>
              <p className="text-sm text-white/60 mb-4 leading-relaxed">Ranking isn't enough anymore. Become the source AI cites. Our Denver GEO service builds citation authority.</p>
              <Button asChild variant="outline" size="sm" className="border-[#8734E1]/40 text-[#8734E1] hover:bg-[#8734E1]/10">
                <Link href="/denver-generative-engine-optimization">Learn More <ArrowRight className="ml-2 w-3 h-3" /></Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ — accordion */}
      <section className="section bg-[#1e2030]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="heading-lg text-white mb-4">AI-ready web design — questions</h2>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="bg-[#252640] border border-[#3a3858] rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#1c1d30] transition-colors"
                  >
                    <span className="font-semibold text-white pr-4 text-sm md:text-base">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} style={{ color: '#8734E1' }} />
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

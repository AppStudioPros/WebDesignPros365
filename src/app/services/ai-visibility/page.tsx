"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Search,
  Bot,
  Sparkles,
  ChevronDown,
  Check,
  Globe2,
  BarChart3,
  Quote,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassIcon } from '@/components/ui/glass-icon';
import CTASection from '@/components/sections/CTASection';

const threeDisciplines = [
  {
    name: 'SEO',
    long: 'Search Engine Optimization',
    icon: Search,
    color: '#2F73EE',
    goal: 'Rank in the blue links.',
    optimizes: 'Pages, keywords, backlinks, Core Web Vitals',
    audience: 'Users who click search results',
    judge: 'Google\'s algorithm + your backlink profile',
    summary:
      "What most people still call 'SEO' optimizes a page to rank in traditional Google search results. Necessary, mature, well-understood. But it only captures the user who actually clicks the blue links, which is a shrinking share of search behavior.",
  },
  {
    name: 'AEO',
    long: 'Answer Engine Optimization',
    icon: Bot,
    color: '#EC4899',
    goal: 'Be the answer in the box at the top.',
    optimizes: 'Schema markup, content extractability, FAQ/HowTo structure, voice readiness',
    audience: 'Users who read AI Overviews, voice search, snippets',
    judge: "The answer engine selecting your content as the trusted source",
    summary:
      "AEO is the practice of structuring content so AI Overviews, Google Assistant, Siri, and featured snippets pick YOUR content as the direct answer. The difference from SEO: SEO optimizes for RANKING, AEO optimizes for SELECTION.",
  },
  {
    name: 'GEO',
    long: 'Generative Engine Optimization',
    icon: Sparkles,
    color: '#8734E1',
    goal: 'Get cited by ChatGPT, Claude, Gemini, Perplexity.',
    optimizes: 'E-E-A-T authority, brand mentions, structured data, llms.txt, citation worthiness',
    audience: 'Users asking generative AI engines questions in your domain',
    judge: 'The LLM choosing your brand as a credible source to cite',
    summary:
      "GEO is the brand-visibility layer for the generative AI era. When a user asks ChatGPT or Claude a question, you want your brand to be the one the AI mentions. Different signals matter: E-E-A-T authority, brand mention frequency across the open web, and content the model would actually want to cite.",
  },
];

const citationData = [
  { source: 'Reddit', percentage: 40.1, color: '#FF4500', note: 'Highest single source in 2026 studies' },
  { source: 'Wikipedia', percentage: 26.3, color: '#000000', note: '#1 source for ChatGPT specifically' },
  { source: 'YouTube', percentage: 23.0, color: '#FF0000', note: 'Strong in product + tutorial queries' },
  { source: 'LinkedIn', percentage: 9.5, color: '#0A66C2', note: 'B2B authority + thought leadership' },
  { source: 'Quora', percentage: 6.0, color: '#B92B27', note: 'Long-tail Q&A queries' },
  { source: 'NerdWallet', percentage: 4.2, color: '#2C8C46', note: 'Top finance/personal-finance source' },
  { source: 'Forbes', percentage: 3.8, color: '#000000', note: 'Concentrated citations in ChatGPT' },
];

const platformPatterns = [
  {
    platform: 'ChatGPT',
    pattern:
      'Favors consensus and authority sources. Cites Wikipedia at 7.8% of all citations. Strong on Forbes, Business Insider, established media. Uses utm_source=chatgpt.com since June 2025 for attribution.',
    play: 'Get into Wikipedia. Get cited on established media. Brand mention frequency across the open web is the strongest predictor of ChatGPT citation (r=0.334-0.664 in studies).',
    color: '#10A37F',
  },
  {
    platform: 'Claude',
    pattern:
      'Prioritizes depth and structure. 30% more likely to cite bullet-pointed and well-formatted pages. Rewards clean semantic HTML and clear hierarchy.',
    play: 'Structure content with H2/H3 hierarchy. Use bulleted lists for key claims. Lead each section with a citable, direct answer before context.',
    color: '#8B6FE2',
  },
  {
    platform: 'Perplexity',
    pattern:
      'Recency-primary. Cites more sources per answer than any other engine. Heavy Reddit influence. Responds to structural changes in 2-7 days (fastest of any engine).',
    play: 'Publish often. Update existing content. Structure for Perplexity\'s "browsing" behavior by surfacing recent timestamps and fresh data points.',
    color: '#1B1F23',
  },
  {
    platform: 'Google AI Overviews',
    pattern:
      "Hybrid: pulls from traditional SEO signals AND community sources. Wikipedia + YouTube + Reddit + Quora appear together in 13%/9%/6% of AIO responses respectively.",
    play: 'Strong technical SEO is the foundation. Add Speakable and FAQ schema. Build presence on Reddit and Quora in your topic clusters. Show up in YouTube.',
    color: '#4285F4',
  },
  {
    platform: 'Gemini',
    pattern:
      'Tightly tied to Google search behavior. Recent emphasis on multimodal sources (video, images). Picks Wikipedia frequently for foundational facts.',
    play: 'Same playbook as Google AI Overviews. Add video and visual content. Keep Wikipedia presence accurate and updated.',
    color: '#1A73E8',
  },
];

const aeoBestPractices = [
  {
    title: 'Lead with the answer, then context',
    body: "Every section should open with a direct, citable answer in the first 1-2 sentences. Save context, nuance, and supporting detail for AFTER the answer. This is how answer engines extract.",
  },
  {
    title: 'FAQPage schema is mandatory',
    body: 'The single most useful schema type for AEO. Mark up question-answer pairs. Make sure questions match how real users phrase queries (not how you would phrase them).',
  },
  {
    title: 'HowTo schema for procedural content',
    body: 'For step-by-step guides, How-To schema dramatically increases extraction probability. Each step gets its own structured entry.',
  },
  {
    title: 'Speakable schema for voice',
    body: 'Identifies content suitable for voice-assistant reading. Critical for Siri, Google Assistant, and Alexa. Mark up the 30-50 word answers most likely to be read aloud.',
  },
  {
    title: 'Concise factual blocks',
    body: 'Aim for 30-50 word answers to specific questions. LLMs prefer short, factual, citable blocks. Long paragraphs get summarized away.',
  },
  {
    title: 'Author bylines and credentials',
    body: 'E-E-A-T signals (Experience, Expertise, Authoritativeness, Trustworthiness) matter for selection. Real author names, real bios, real credentials, structured with Person schema.',
  },
];

const geoBestPractices = [
  {
    title: 'Brand mention frequency is the moat',
    body: "Get mentioned by name across the open web. Press, Reddit discussions, YouTube reviews, podcast appearances, GitHub README mentions. Brand-mention correlation with ChatGPT citation runs 0.334-0.664. Volume of mentions matters more than backlinks for GEO.",
  },
  {
    title: 'Deploy llms.txt at site root',
    body: 'The de facto standard for AI crawler discovery. A clean llms.txt at yourdomain.com/llms.txt tells AI engines exactly how to understand and cite your site. We did it for ourselves.',
  },
  {
    title: 'Wikipedia presence (if applicable)',
    body: 'Wikipedia is the #1 source ChatGPT cites and #2 across all engines. If your brand qualifies for a Wikipedia article (real notability, secondary-source coverage), it pays off massively in GEO.',
  },
  {
    title: 'Methodology corpus / public documentation',
    body: "Publish your methodologies as citable public PDFs or pages. AI engines treat published methodology as authority. The federal acquisition world has been doing this for decades. Apply it to your commercial work.",
  },
  {
    title: 'Reddit + YouTube + LinkedIn presence',
    body: 'These three platforms account for the majority of social-signal citations in 2026. You do not need to dominate. You need to BE THERE with substantive contributions on the topics where you want to be cited.',
  },
  {
    title: 'Track citation traffic in GA4',
    body: 'ChatGPT now appends utm_source=chatgpt.com to citation links. Set up a custom GA4 channel matching chatgpt.com, perplexity.ai, claude.ai, gemini.google.com, copilot.microsoft.com. Watch the trend. AI traffic is a measurable channel now.',
  },
];

const faqs = [
  {
    q: "What's the difference between SEO, AEO, and GEO?",
    a: "SEO optimizes pages to RANK in traditional search. AEO optimizes content to be SELECTED as the direct answer in Google AI Overviews, voice search, and featured snippets. GEO optimizes brand presence to be CITED by generative AI engines like ChatGPT, Claude, Gemini, and Perplexity. They are three different jobs that share some technical foundations. SEO is mature. AEO is emerging fast. GEO is the newest discipline and the hardest to game.",
  },
  {
    q: 'Do I still need SEO if I do AEO and GEO?',
    a: "Yes. SEO remains the foundation. Strong technical SEO (Core Web Vitals, structured data, clean information architecture) is what makes AEO and GEO possible. Without good SEO, the answer engines and generative engines do not even find your content. AEO and GEO add layers on top of SEO, they do not replace it.",
  },
  {
    q: 'Who dominates AI citations right now?',
    a: "Per Semrush\'s 2026 analysis of 150,000+ LLM citations, Reddit is the single most-cited source at 40.1%, Wikipedia at 26.3%, YouTube at 23%, and LinkedIn at 9.5%. NerdWallet dominates personal finance. Forbes is concentrated in ChatGPT specifically. The pattern: community platforms + Wikipedia + structured publishers + niche category leaders. The good news is that this means brand authority and content quality matter MORE than backlink games.",
  },
  {
    q: 'How is each AI platform different?',
    a: "ChatGPT loves consensus sources (Wikipedia 7.8%, Forbes, Business Insider) and rewards brand-mention frequency across the open web. Claude rewards structured content (30% more likely to cite bullet-pointed pages). Perplexity is recency-primary and cites more sources per answer than any other engine. Google AI Overviews blend traditional SEO with community signals from Reddit, YouTube, and Quora. Gemini follows Google AI Overviews closely with multimodal emphasis. The implication: you do not optimize for ONE engine. You build broad authority signals that satisfy all of them.",
  },
  {
    q: 'How fast can you see results from AEO?',
    a: 'Perplexity responds fastest, often picking up structural changes in 2-7 days. Google AI Overviews typically takes 2-4 weeks for the AIO to reflect new content. ChatGPT depends on its training data update schedule, which is opaque, but live retrieval (with browsing enabled) picks up changes within hours. Claude similar. So: technical AEO changes show up in days. Brand-level GEO changes show up in months.',
  },
  {
    q: 'Can I measure my AI visibility?',
    a: 'Yes, three ways. First, GA4 custom channel tracking AI engine referrers (chatgpt.com, perplexity.ai, claude.ai, gemini.google.com, copilot.microsoft.com). Second, manual citation checks: ask the engines questions in your domain and see whether you appear. Third, third-party tools like Otterly, Profound, Scrunch, and SEMrush\'s AI tracking which monitor citation share over time. We use a combination.',
  },
  {
    q: 'What does WDP365 actually do for AI Visibility?',
    a: "We run the technical foundation (Core Web Vitals, schema deployment, llms.txt, structured data), the AEO content layer (FAQ/HowTo schema, answer-engine-friendly content blocks, Speakable markup for voice), and the GEO authority layer (E-E-A-T signaling, methodology publication, citation tracking, brand-mention strategy). Our advantage is we are an AI-native engineering shop with the patented ACI platform underneath. We do not bolt AI on top of a 2018 stack. We build for the AI era from the foundation up.",
  },
  {
    q: 'Is there paid placement in AI search?',
    a: 'No. As of 2026, none of the major AI engines (ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews) accept paid placement for citations. You earn citation through authority, structure, and brand presence. That is exactly why it matters: AI search results are unbiddable. The brands that show up are the ones that did the work.',
  },
];

export default function AiVisibilityPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* HERO */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f9fc]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#8734E1]/5 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#2F73EE]/5 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">
              Flagship Service
            </Badge>
            <h1 className="heading-xl mb-6">
              The <span className="gradient-text">AI Visibility Stack</span>:<br />
              SEO + AEO + GEO
            </h1>
            <p className="text-lg md:text-xl text-[#a8a4c8] max-w-3xl mx-auto mb-8">
              Rank in Google. Be the answer in AI Overviews. Get cited by ChatGPT, Claude,
              Gemini, and Perplexity. Three disciplines, one engagement. Backed by 2026 research
              and the patented ACI platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact?topic=ai-visibility">
                <Button size="lg" className="bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90 text-white">
                  Book a Visibility Audit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="#three">
                <Button variant="outline" size="lg">
                  Learn the Three Disciplines
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* THE THREE DISCIPLINES */}
      <section id="three" className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">The Three Disciplines</Badge>
            <h2 className="heading-lg mb-4">
              SEO ranks. AEO answers. <span className="gradient-text">GEO gets cited.</span>
            </h2>
            <p className="text-[#a8a4c8]">
              Three different jobs. Three different judges. Three different audience moments.
              Most agencies still only do the first one. We do all three.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {threeDisciplines.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={d.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg hover:border-[#8734E1] transition-all">
                    <div className="mb-4">
                      <GlassIcon Icon={Icon} color={d.color} />
                    </div>
                    <div className="mb-3">
                      <h3 className="text-2xl font-bold" style={{ color: d.color }}>{d.name}</h3>
                      <p className="text-xs text-[#8a87a8] uppercase tracking-wider">{d.long}</p>
                    </div>
                    <p className="text-base font-semibold text-[#f0eef8] mb-4">{d.goal}</p>
                    <div className="space-y-2 text-sm mb-4">
                      <div>
                        <span className="text-[#8a87a8]">Optimizes for:</span>{' '}
                        <span className="text-[#dddaf0]">{d.optimizes}</span>
                      </div>
                      <div>
                        <span className="text-[#8a87a8]">Audience:</span>{' '}
                        <span className="text-[#dddaf0]">{d.audience}</span>
                      </div>
                      <div>
                        <span className="text-[#8a87a8]">Judged by:</span>{' '}
                        <span className="text-[#dddaf0]">{d.judge}</span>
                      </div>
                    </div>
                    <p className="text-sm text-[#a8a4c8] leading-relaxed pt-3 border-t border-[#2e2c48]">
                      {d.summary}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CITATION DATA */}
      <section className="section bg-[#181928]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">Who Dominates AI Citations</Badge>
            <h2 className="heading-lg mb-4">
              The <span className="gradient-text">data behind the answers.</span>
            </h2>
            <p className="text-[#a8a4c8]">
              Based on multiple 2026 studies: Semrush analyzed 150,000+ LLM citations, 5W indexed
              680M+ citations across five platforms, Lantern tracked 200M+ from the AI interfaces directly.
              The pattern is consistent.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-[#f0eef8]">Top sources cited by AI engines (2026)</h3>
                <BarChart3 className="w-5 h-5 text-[#8734E1]" />
              </div>
              <div className="space-y-4">
                {citationData.map((row, i) => (
                  <motion.div
                    key={row.source}
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-[#f0eef8] text-sm">{row.source}</span>
                      <span className="text-sm font-mono text-[#8a87a8]">{row.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#191a2c] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${(row.percentage / 40.1) * 100}%`, backgroundColor: row.color }}
                      ></div>
                    </div>
                    <p className="text-xs text-[#8a87a8] mt-1">{row.note}</p>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-[#8a87a8] mt-6 pt-4 border-t border-[#2e2c48]">
                Source: Semrush 2026 LLM Citation Analysis (150K+ citations). 5W AI Platform Citation
                Source Index 2026 (680M+ citations, Aug 2024-Apr 2026). Lantern AI Citation Content
                Visibility Report Feb 2026 (200M+ citations). Composite data, weighted average.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* PLATFORM PATTERNS */}
      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">Platform by Platform</Badge>
            <h2 className="heading-lg mb-4">
              Each AI engine plays <span className="gradient-text">a different game.</span>
            </h2>
            <p className="text-[#a8a4c8]">
              You do not optimize for one engine. You build broad authority signals that satisfy
              all of them. But understanding each platform&apos;s bias is how you decide where to
              focus first.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {platformPatterns.map((p, i) => (
              <motion.div
                key={p.platform}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: p.color }}
                    >
                      {p.platform[0]}
                    </div>
                    <h3 className="font-semibold text-[#f0eef8]">{p.platform}</h3>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs text-[#8a87a8] uppercase tracking-wider mb-1">Pattern</p>
                    <p className="text-sm text-[#c4c0e0] leading-relaxed">{p.pattern}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#8a87a8] uppercase tracking-wider mb-1">The Play</p>
                    <p className="text-sm text-[#c4c0e0] leading-relaxed">{p.play}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AEO BEST PRACTICES */}
      <section className="section bg-[#181928]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-pink-100 text-pink-700 border-pink-300">AEO Best Practices</Badge>
            <h2 className="heading-lg mb-4">
              Win the <span className="gradient-text">direct-answer slot.</span>
            </h2>
            <p className="text-[#a8a4c8]">
              Six things that move the needle on Answer Engine Optimization in 2026.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {aeoBestPractices.map((bp, i) => (
              <motion.div
                key={bp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-5 h-full hover:shadow-lg transition-all">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mb-3">
                    <Check className="w-4 h-4 text-pink-600" />
                  </div>
                  <h3 className="font-semibold text-[#f0eef8] mb-2 text-sm">{bp.title}</h3>
                  <p className="text-xs text-[#a8a4c8] leading-relaxed">{bp.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GEO BEST PRACTICES */}
      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">GEO Best Practices</Badge>
            <h2 className="heading-lg mb-4">
              Get cited by <span className="gradient-text">the generative engines.</span>
            </h2>
            <p className="text-[#a8a4c8]">
              Six things that move the needle on Generative Engine Optimization in 2026.
              Brand mention frequency is the moat.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {geoBestPractices.map((bp, i) => (
              <motion.div
                key={bp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-5 h-full hover:shadow-lg transition-all">
                  <div className="w-8 h-8 rounded-full bg-[#1e1c35] flex items-center justify-center mb-3">
                    <Quote className="w-4 h-4 text-[#8734E1]" />
                  </div>
                  <h3 className="font-semibold text-[#f0eef8] mb-2 text-sm">{bp.title}</h3>
                  <p className="text-xs text-[#a8a4c8] leading-relaxed">{bp.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR METHODOLOGY */}
      <section className="section bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#8734E1]/20 rounded-full blur-3xl" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-[#8734E1]/30 text-white border-[#8734E1]/50">
                The WDP365 Methodology
              </Badge>
              <h2 className="heading-lg mb-4 text-white">
                A 6-week engagement that hits all three surfaces.
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                We do not sell mystery. We publish how we work. Every engagement runs the same
                stages, in the same order, with the same deliverables.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  step: 'Week 1-2',
                  title: 'Visibility Audit',
                  body: 'Technical SEO baseline, AEO extraction audit, GEO citation snapshot. We measure where you stand on all three surfaces before touching anything.',
                },
                {
                  step: 'Week 3-4',
                  title: 'Foundation + AEO',
                  body: 'Core Web Vitals tuning, schema deployment (FAQ, HowTo, Speakable, Organization, Person), llms.txt at root, content restructuring for answer extractability.',
                },
                {
                  step: 'Week 5-6',
                  title: 'GEO + Authority',
                  body: 'E-E-A-T signaling, methodology publication, brand-mention strategy, citation tracking setup in GA4. Recommendations for content cadence and platform presence.',
                },
              ].map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="bg-[#252640]/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 h-full">
                    <p className="text-xs text-[#BF5DE0] font-mono uppercase tracking-wider mb-2">{s.step}</p>
                    <h3 className="font-semibold text-white mb-2">{s.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{s.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">FAQ</Badge>
            <h2 className="heading-lg mb-4">SEO, AEO, GEO: the common questions</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <div className="bg-[#252640] border border-[#3a3858] rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#1c1d30] transition-colors"
                  >
                    <span className="font-medium text-[#f0eef8] pr-8">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#8734E1] transition-transform duration-300 flex-shrink-0 ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-5">
                          <p className="text-[#a8a4c8] leading-relaxed">{faq.a}</p>
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

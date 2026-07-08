"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Search,
  Brain,
  Shield,
  MapPin,
  Star,
  DollarSign,
  Check,
  Zap,
  Globe,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassIcon } from '@/components/ui/glass-icon';
import CTASection from '@/components/sections/CTASection';

const stats = [
  {
    number: '68%',
    label: 'of Google searches end with zero clicks in 2026',
    sub: 'Up from 60% in 2024. The click SEO was built to capture is increasingly never made.',
  },
  {
    number: '83%',
    label: 'no-click rate when Google AI Overview appears',
    sub: 'In full AI Mode that number hits 93%. AI is answering the question before users reach your site.',
  },
  {
    number: '527%',
    label: 'year-over-year growth in AI referral traffic',
    sub: 'And that traffic converts at 4 to 5 times the rate of traditional organic search.',
  },
  {
    number: '61%',
    label: 'of home shoppers say AI made them smarter about the market',
    sub: 'Nearly tied with real estate agents at 62%. AI is now a primary research tool for buyers.',
  },
];

const buyerJourney = [
  {
    icon: Search,
    step: '1. AI Query',
    label: 'They ask an AI first',
    body: '"Best neighborhoods in Denver for families" or "top rated real estate agents near me" goes straight to ChatGPT, Perplexity, or Google AI. If your content is not the source AI cites, you do not exist at this step.',
  },
  {
    icon: MapPin,
    step: '2. Neighborhood Research',
    label: 'They investigate the area',
    body: 'School ratings, crime stats, walkability, commute times, nearby amenities. Structured data and location-specific content pages are what get cited here. Generic "we serve the area" copy gets ignored.',
  },
  {
    icon: Star,
    step: '3. Agent Vetting',
    label: 'They research who to trust',
    body: '88% of buyers use an agent (NAR 2025). But they found that agent by researching reputation, reviews, and credentials online first. This is the biggest financial decision of most people\'s lives. They vet hard.',
  },
  {
    icon: DollarSign,
    step: '4. Mortgage Research',
    label: 'They compare rates and lenders',
    body: 'Current rates, lender reviews, calculator tools, FAQ content around loan types. Lenders that show up in AI answers at this step win deals before the first call.',
  },
  {
    icon: Shield,
    step: '5. Final Vetting',
    label: 'They verify everything',
    body: 'License lookup, BBB ratings, third-party reviews, social proof. Structured review schema and authoritative content signals are what AI engines pull from when making a recommendation.',
  },
];

const whatWeBuild = [
  {
    icon: Globe,
    title: 'Agent and brokerage sites built for AI citation',
    body: 'LocalBusiness + Person schema, neighborhood guide pages, agent bio pages structured so ChatGPT and Perplexity know who you are and what areas you serve.',
  },
  {
    icon: MapPin,
    title: 'Neighborhood content pages',
    body: 'Dedicated pages for every market you serve. Schools, safety, walkability, market data. Built to rank in traditional search AND get cited in AI answers.',
  },
  {
    icon: DollarSign,
    title: 'Mortgage and rate pages with live data',
    body: 'Python-powered rate widgets, mortgage calculators, FAQ schema for every common loan question. Structured so AI engines pull your content when buyers ask about rates.',
  },
  {
    icon: Star,
    title: 'Review and reputation integration',
    body: 'Google, Zillow, Realtor.com review signals pulled in with proper markup. Reputation is how buyers vet. It needs to be machine-readable, not just visible.',
  },
  {
    icon: Brain,
    title: 'AEO-optimized FAQ content',
    body: 'Every common buyer, seller, and mortgage question answered in structured format. Question headings, direct answers, FAQPage schema. Built to be the source AI cites.',
  },
  {
    icon: Zap,
    title: 'Technical SEO foundation',
    body: 'Core Web Vitals scores that Google measures in rankings, clean crawl paths, structured data validation. The foundation that makes everything else work.',
  },
];

const whyStack = [
  {
    title: 'Next.js',
    body: 'Server-side rendering and static generation mean neighborhood pages, agent bios, and listing pages load fast and get indexed cleanly. Core Web Vitals scores that directly affect where you rank.',
  },
  {
    title: 'Python backend',
    body: 'Handles live mortgage rate feeds, neighborhood data APIs (Walk Score, GreatSchools, Census), and agent reputation scoring. The dynamic data layer that makes your content authoritative and current.',
  },
  {
    title: 'Structured data + schema',
    body: 'The language AI engines speak. RealEstateListing, LocalBusiness, Person, FAQPage, Review schema is what gets you cited in ChatGPT, Perplexity, and Google AI Overviews instead of your competitor.',
  },
  {
    title: 'AEO and GEO content architecture',
    body: 'Answer Engine Optimization and Generative Engine Optimization built into the page structure from day one. Not an afterthought. Not a plugin. Baked into how every page is written and organized.',
  },
];

export default function RealEstateFinancialPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f9fc]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">
              Real Estate and Financial Services
            </Badge>
            <h1 className="heading-xl mb-6">
              When someone asks AI{' '}
              <span className="gradient-text">"who is the best agent in Florida?"</span>
              {' '}are you the answer?
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Home buyers are making the biggest financial decision of their lives. They are not
              casually browsing. They are vetting. And more and more, they are vetting through AI.
              We build the web presence that gets cited, recommended, and trusted.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video 4 — The AI Search Revolution in Real Estate */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 text-center">
              <span className="text-[#8734E1] text-xs uppercase tracking-widest font-semibold">THE OPPORTUNITY</span>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">The AI Search Revolution in Real Estate</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-xl mx-auto">Your clients are already asking AI to find agents, compare lenders, and vet providers. This is what that shift looks like — and what it means for your business.</p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: '16/9' }}>
              <video
                controls
                playsInline
                poster="/videos/ai-search-revolution-poster.jpg"
                className="w-full h-full object-cover"
              >
                <source src="/videos/ai-search-revolution.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Shift Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-14"
          >
            <Badge className="mb-4 bg-red-100 text-red-700 border-red-300">The Search Shift</Badge>
            <h2 className="heading-lg mb-4">
              The click SEO was designed to capture{' '}
              <span className="gradient-text">is increasingly never made.</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Traditional SEO gets you ranked. That used to mean traffic. In 2026, AI answers the
              question before the user reaches your site. The game is now about being the source AI
              cites, not the link users click.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {stats.map((s, i) => (
              <motion.div
                key={s.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 h-full text-center border-[#8734E1]/20 hover:border-[#8734E1]/50 transition-all">
                  <div className="text-4xl font-bold gradient-text mb-2">{s.number}</div>
                  <div className="font-semibold text-gray-900 mb-2 text-sm">{s.label}</div>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.sub}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer Journey */}
      <section className="section bg-[#f8f9fc]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-14"
          >
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">The Buyer Journey</Badge>
            <h2 className="heading-lg mb-4">
              Five steps where you either{' '}
              <span className="gradient-text">get found or get skipped.</span>
            </h2>
            <p className="text-gray-600 text-lg">
              41 to 47 percent of home buyers start with an online search (NAR 2025). Here is what
              that search actually looks like in 2026, and where your web presence either shows up or
              disappears.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {buyerJourney.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="p-6 hover:shadow-md hover:border-[#8734E1]/30 transition-all">
                    <div className="flex flex-col items-center text-center gap-3">
                      <GlassIcon Icon={Icon} color="#8734E1" />
                      <div>
                        <div className="text-xs font-semibold text-[#8734E1] uppercase tracking-wider mb-1">
                          {step.step}
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{step.label}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{step.body}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video 5 — The Future of Real Estate Marketing */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 text-center">
              <span className="text-[#8734E1] text-xs uppercase tracking-widest font-semibold">THE FUTURE</span>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">The Future of Real Estate Marketing</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-xl mx-auto">See how the top-performing agents and brokers are combining AI-powered websites, daily content optimization, and GEO to dominate their markets.</p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: '16/9' }}>
              <video
                controls
                playsInline
                poster="/videos/real-estate-future-poster.jpg"
                className="w-full h-full object-cover"
              >
                <source src="/videos/real-estate-future.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why This Industry Is Different */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-amber-100 text-amber-700 border-amber-300">
                Why This Industry Is Different
              </Badge>
              <h2 className="heading-lg mb-4">
                No other industry carries this much{' '}
                <span className="gradient-text">trust weight.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  stat: '88%',
                  label: 'of buyers used a real estate agent in 2025',
                  body: 'NAR 2025 Profile of Home Buyers and Sellers. The agent relationship still wins. But buyers found and vetted that agent online first.',
                },
                {
                  stat: '91%',
                  label: 'of sellers used a real estate agent in 2025',
                  body: 'Matching the highest percentage ever recorded. Trust in the professional relationship is high. The question is whether your digital presence earns that call.',
                },
                {
                  stat: '#1',
                  label: 'reason buying was easier: a good agent',
                  body: '45% of buyers who found the process easier than expected said it was because of their agent. Discovery starts online. Reputation is the filter.',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.stat}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-6 text-center h-full border-amber-200 bg-amber-50/30">
                    <div className="text-4xl font-bold text-amber-600 mb-2">{item.stat}</div>
                    <div className="font-semibold text-gray-900 text-sm mb-3">{item.label}</div>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.body}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Stack */}
      <section className="section bg-[#f8f9fc]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">
              The Stack That Makes It Work
            </Badge>
            <h2 className="heading-lg mb-4">
              Technical SEO, AEO, and GEO{' '}
              <span className="gradient-text">are not separate strategies.</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Traditional SEO, Answer Engine Optimization, and Generative Engine Optimization work
              together on one foundation. Here is what that foundation looks like for real estate and
              financial services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {whyStack.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="p-6 h-full text-center hover:shadow-lg hover:border-[#8734E1] transition-all">
                  <h3 className="font-semibold text-[#8734E1] mb-3 text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">What We Build</Badge>
            <h2 className="heading-lg mb-4">
              Six things every real estate and{' '}
              <span className="gradient-text">financial services site needs.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whatWeBuild.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="p-6 h-full text-center hover:shadow-lg hover:border-[#8734E1] transition-all">
                    <div className="mb-4 flex justify-center">
                      <GlassIcon Icon={Icon} color="#8734E1" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="section bg-[#f8f9fc]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">
                What You Get
              </Badge>
              <h2 className="heading-lg mb-4">
                Built to be found by people{' '}
                <span className="gradient-text">and by AI.</span>
              </h2>
            </motion.div>

            <ul className="space-y-3 text-left inline-block w-full">
              {[
                'Next.js site with server-side rendering and static generation for fast load times and clean indexing',
                'Full schema markup: LocalBusiness, Person (agent), RealEstateListing, FAQPage, Review',
                'Neighborhood guide pages built for both Google ranking and AI citation',
                'AEO content structure on every key page: question headings, direct answers, structured FAQs',
                'Python-powered live data: mortgage rates, school ratings, neighborhood scores',
                'Review and reputation integration from Google, Zillow, and Realtor.com',
                'Core Web Vitals scores that meet Google performance benchmarks',
                'AI visibility audit showing where you currently appear (or do not) in ChatGPT, Perplexity, and Google AI',
              ].map((item) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <div className="w-6 h-6 rounded-full bg-[#f0e6fb] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-[#8734E1]" />
                  </div>
                  <span className="leading-relaxed text-sm">{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10"
            >
              <Link href="/contact?topic=real-estate-financial">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90 text-white"
                >
                  Get Your Free AI Visibility Audit <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

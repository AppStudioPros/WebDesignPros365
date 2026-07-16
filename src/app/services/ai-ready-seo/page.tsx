"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Search,
  Bot,
  MapPin,
  CheckCircle2,
  ChevronDown,
  Database,
  RefreshCw,
  Globe2,
  FileText,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassIcon } from '@/components/ui/glass-icon';
import CTASection from '@/components/sections/CTASection';

const threeLayers = [
  {
    name: 'SEO',
    long: 'Search Engine Optimization',
    icon: Search,
    color: '#2F73EE',
    goal: 'Rank in the blue links.',
    what: 'Titles, meta descriptions, structured data, sitemap, Core Web Vitals.',
    why: 'The foundation. Without it, nothing else works.',
  },
  {
    name: 'AEO',
    long: 'Answer Engine Optimization',
    icon: Bot,
    color: '#EC4899',
    goal: 'Be the direct answer in AI Overviews and voice search.',
    what: 'FAQ/HowTo schema, answer-first content blocks, Speakable markup, llms.txt.',
    why: 'AI selects your content as the trusted source for a query.',
  },
  {
    name: 'GEO',
    long: 'Generative Engine Optimization',
    icon: MapPin,
    color: '#8734E1',
    goal: 'Get cited by ChatGPT, Gemini, Perplexity, Claude.',
    what: 'E-E-A-T signals, brand mention strategy, entity disambiguation, service area data.',
    why: "When someone asks AI 'best [service] in [city]', your name comes up.",
  },
];

const included = [
  { icon: FileText, text: 'Unique title + meta description on every page' },
  { icon: Database, text: 'JSON-LD structured data (LocalBusiness, Service, FAQ)' },
  { icon: RefreshCw, text: 'Dynamic sitemap.xml — updates automatically' },
  { icon: Globe2, text: 'robots.txt configured for all AI crawlers' },
  { icon: Bot, text: 'llms.txt — the AI equivalent of robots.txt' },
  { icon: Search, text: 'FAQ content structured for AI answer extraction' },
  { icon: MapPin, text: 'Service area signals for local AI recommendations' },
  { icon: Database, text: 'Sanity CMS — update content without touching code' },
];

const steps = [
  {
    n: '01',
    title: 'We build your site',
    body: 'Your Next.js site is built and deployed as normal. AI-Ready SEO is wired in from day one, not bolted on after.',
  },
  {
    n: '02',
    title: 'We seed the CMS',
    body: 'Sanity is populated with your business data, services, and FAQs in minutes. Every page gets the right metadata instantly.',
  },
  {
    n: '03',
    title: "You're everywhere",
    body: 'Google indexes you. AI engines cite you. Update any content in Sanity Studio — live on your site in under 60 seconds.',
  },
];

const faqs = [
  {
    q: 'What makes this different from regular SEO?',
    a: 'Traditional SEO optimizes for Google rankings. AI-Ready SEO adds two more layers: AEO (being selected as the direct answer in AI Overviews and voice search) and GEO (being cited by ChatGPT, Perplexity, and Gemini when someone asks about your industry or location). Most agencies only do the first layer. We do all three.',
  },
  {
    q: 'Do I still need SEO if I have AEO and GEO?',
    a: 'Yes — SEO is the foundation. Strong technical SEO is what makes AEO and GEO possible. Without it, AI engines and answer engines don\'t find your content in the first place. AEO and GEO add layers on top, they don\'t replace it.',
  },
  {
    q: 'What is llms.txt and why does it matter?',
    a: 'llms.txt is a plain-text file at your domain root that tells AI crawlers exactly how to understand and cite your site — the AI equivalent of robots.txt. It\'s a fast-growing standard. ChatGPT, Perplexity, and Claude all read it. We deploy it automatically and generate it dynamically from your Sanity content.',
  },
  {
    q: 'Can I update content without a developer?',
    a: 'Yes — that\'s the whole point of the Sanity CMS layer. Log into Sanity Studio, change a service description or update your phone number, and it\'s live on your site within 60 seconds. No code deploy, no waiting.',
  },
  {
    q: 'Is this available for existing WDP sites?',
    a: 'Yes. We can wire the AI-Ready SEO layer into any existing WDP site, not just new builds. Ask us about a retrofit engagement.',
  },
];

export default function AIReadySEOPage() {
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
              Add-On Service
            </Badge>
            <h1 className="heading-xl mb-6">
              Your Business Found on{' '}
              <span className="gradient-text">Google. And ChatGPT. And Perplexity.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#a8a4c8] max-w-3xl mx-auto mb-10">
              AI search is the fastest-growing way people find local businesses. Most websites are
              invisible to it. Yours won&apos;t be. We optimize for all three search surfaces — SEO,
              AEO, and GEO in one engagement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact?topic=ai-ready-seo">
                <Button size="lg" className="bg-gradient-to-r from-[#8734E1] to-[#BF4DE0] hover:opacity-90 text-white">
                  Add to my project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg">
                  See how it works
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#0f0f1a] text-white py-10 px-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { stat: '2.5B+', label: 'AI search queries per month on ChatGPT alone' },
              { stat: '73%', label: 'of people trust AI recommendations for local businesses' },
              { stat: '94%', label: 'of websites are invisible to AI crawlers' },
            ].map(({ stat, label }) => (
              <div key={stat}>
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#8734E1] to-[#2F73EE] bg-clip-text text-transparent">{stat}</div>
                <div className="text-white/70 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THREE LAYERS */}
      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">The Three Layers</Badge>
            <h2 className="heading-lg mb-4">
              SEO ranks. AEO answers.{' '}
              <span className="gradient-text">GEO gets cited.</span>
            </h2>
            <p className="text-[#a8a4c8]">
              Three different jobs. Three different judges. Most agencies only do the first one. We do all three.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {threeLayers.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <motion.div
                  key={layer.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg hover:border-[#8734E1] transition-all">
                    <div className="mb-4">
                      <GlassIcon Icon={Icon} color={layer.color} />
                    </div>
                    <div className="mb-3">
                      <h3 className="text-2xl font-bold" style={{ color: layer.color }}>{layer.name}</h3>
                      <p className="text-xs text-[#8a87a8] uppercase tracking-wider">{layer.long}</p>
                    </div>
                    <p className="text-base font-semibold text-[#f0eef8] mb-4">{layer.goal}</p>
                    <div className="space-y-2 text-sm mb-4">
                      <div><span className="text-[#8a87a8]">Optimizes for: </span><span className="text-[#dddaf0]">{layer.what}</span></div>
                      <div><span className="text-[#8a87a8]">Why it matters: </span><span className="text-[#dddaf0]">{layer.why}</span></div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="section bg-[#181928]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">What&apos;s Included</Badge>
            <h2 className="heading-lg mb-4">
              Everything we{' '}
              <span className="gradient-text">set up for you.</span>
            </h2>
            <p className="text-[#a8a4c8]">
              One engagement. Every surface covered. Zero ongoing code changes needed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {included.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-4 flex items-start gap-3 hover:shadow-md transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#1e1c35] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#8734E1]" />
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#c4c0e0]">{text}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">How It Works</Badge>
            <h2 className="heading-lg mb-4">
              Three steps.{' '}
              <span className="gradient-text">Done in one engagement.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all">
                  <p className="text-xs font-mono text-[#8734E1] uppercase tracking-wider mb-3">{s.n}</p>
                  <h3 className="font-semibold text-[#f0eef8] mb-2 text-lg">{s.title}</h3>
                  <p className="text-sm text-[#a8a4c8] leading-relaxed">{s.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY WDP */}
      <section className="section bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#8734E1]/20 rounded-full blur-3xl" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-[#8734E1]/30 text-white border-[#8734E1]/50">
              Why WDP365
            </Badge>
            <h2 className="heading-lg mb-6 text-white">
              Most agencies build you a site.<br />
              We build you a site that{' '}
              <span className="text-[#BF4DE0]">shows up everywhere.</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Including the AI search results your competitors don&apos;t even know exist yet.
              We&apos;re an AI-native engineering shop with the patented ACI platform underneath.
              We don&apos;t bolt AI on top of a 2018 stack. We build for the AI era from the foundation up.
            </p>
            <Link href="/contact?topic=ai-ready-seo">
              <Button size="lg" className="bg-[#252640] text-[#1a0b2e] hover:bg-[#191a2c] font-semibold">
                Get started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
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
            <h2 className="heading-lg mb-4">Common questions</h2>
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
                  {openFaq === i && (
                    <div className="px-6 pb-5">
                      <p className="text-[#a8a4c8] leading-relaxed">{faq.a}</p>
                    </div>
                  )}
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

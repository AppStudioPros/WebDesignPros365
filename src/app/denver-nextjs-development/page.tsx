"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Zap, Server, Check, GitBranch, Globe2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassIcon } from '@/components/ui/glass-icon';
import CTASection from '@/components/sections/CTASection';

const _metadata = {
  title: 'Denver Next.js Development Agency | Web Design Pros 365',
  description:
    'Production-grade Next.js 16 and React 19 development for Denver businesses. App Router, SSR, ISR, TypeScript, Sanity CMS, Vercel Edge. Web Design Pros 365.',
};

const techStack = [
  { label: 'Next.js 16', note: 'App Router, Server Components, streaming' },
  { label: 'React 19', note: 'Concurrent features, use() hook, RSC' },
  { label: 'TypeScript', note: 'Strict mode, full type coverage' },
  { label: 'Tailwind CSS', note: 'Utility-first, zero runtime CSS-in-JS' },
  { label: 'Sanity CMS', note: 'Structured content, GROQ, live preview' },
  { label: 'Vercel Edge', note: 'Global CDN, edge functions, instant rollbacks' },
  { label: 'Vercel AI SDK', note: 'LLM integration, streaming, tool use' },
  { label: 'Playwright / Vitest', note: 'E2E testing, unit testing' },
];

const capabilities = [
  {
    icon: Code2,
    title: 'App Router architecture',
    body: 'Layouts, loading states, error boundaries, and nested routing — done right from day one, not bolted on after launch.',
    color: '#2F73EE',
  },
  {
    icon: Server,
    title: 'SSR, SSG, and ISR',
    body: 'The right rendering strategy for every page — static where it makes sense, server-rendered where it doesn\'t, and incrementally regenerated where freshness matters.',
    color: '#8734E1',
  },
  {
    icon: Zap,
    title: 'Core Web Vitals engineered in',
    body: 'Not a Lighthouse afterthought. Font loading, image optimization, layout stability, and bundle splitting are architectural decisions made at the start, not fixes applied at the end.',
    color: '#10B981',
  },
  {
    icon: GitBranch,
    title: 'Structured data and SEO built in',
    body: 'Every page gets JSON-LD schema, canonical tags, Open Graph, and sitemap entries — all from the framework level, not via plugin.',
    color: '#EC4899',
  },
  {
    icon: Globe2,
    title: 'Sanity CMS integration',
    body: 'Content editors get a clean, structured CMS. Engineers get typed GROQ queries and live preview. No plugin hell, no database maintenance.',
    color: '#F59E0B',
  },
  {
    icon: Check,
    title: 'Production-grade delivery',
    body: 'GitHub repo, CI/CD on Vercel, environment variables, branch previews, and a clean handoff. Your team can maintain and extend it after launch.',
    color: '#06B6D4',
  },
];

const faqs = [
  {
    q: 'Why Next.js 16 specifically?',
    a: "Next.js 16 with the App Router represents a fundamental shift in how React applications are architected — Server Components, Suspense, and streaming enable dramatically better performance and developer experience. It's the current production standard for serious web projects.",
  },
  {
    q: 'What is the difference between SSR, SSG, and ISR?',
    a: "Server-Side Rendering (SSR) generates pages on request — best for personalized or frequently changing content. Static Site Generation (SSG) pre-builds pages at deploy time — best for content that rarely changes. Incremental Static Regeneration (ISR) rebuilds individual pages on a schedule — best for content that changes but not constantly. Next.js lets you mix all three across different routes in the same application.",
  },
  {
    q: 'Do you build APIs and backend logic or just frontend?',
    a: "Both. Next.js API routes handle server-side logic, database calls, third-party integrations, and webhook processing — all in the same codebase. For complex backend needs, we also build standalone APIs on Vercel Edge Functions.",
  },
  {
    q: 'Can you work with an existing codebase or design system?',
    a: "Yes. We regularly extend existing Next.js projects, migrate from older React setups, and integrate with established design systems. We review the codebase before quoting to give you an accurate scope.",
  },
  {
    q: 'How does this connect to AI visibility?',
    a: "Next.js\'s rendering architecture makes structured data implementation clean, semantic HTML natural, and page speed high — all foundational signals for AI search systems. Paired with our AEO and GEO services, the technical foundation and the AI visibility strategy become one coherent system.",
  },
];

export default function DenverNextjsPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-[#1a1930] to-[#1e2030]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#2F73EE]/8 rounded-full blur-3xl" />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-6 bg-[#1e1c35] text-[#2F73EE] border-[#2F73EE]/40">Denver, Colorado</Badge>
            <h1 className="heading-xl mb-6 text-white">
              Denver Next.js Development<br />
              <span style={{ color: '#2F73EE' }}>for Fast, Scalable Websites</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Production-grade Next.js 16 and React 19 websites and applications for Denver businesses. App Router, TypeScript, Sanity, and Vercel Edge — built to scale.
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

      {/* TECH STACK */}
      <section className="section bg-[#1e2030]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="heading-lg text-white mb-4">The stack we ship in Denver</h2>
            <p className="text-white/60 max-w-xl mx-auto text-center">Every tool chosen for production performance, developer experience, and long-term maintainability.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {techStack.map((t, i) => (
              <motion.div key={t.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="bg-[#252640] border-[#3a3858] p-4 text-center">
                  <p className="font-semibold text-white text-sm mb-1">{t.label}</p>
                  <p className="text-xs text-white/50 leading-snug">{t.note}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="heading-lg text-white mb-4">What we actually build</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="bg-[#1e2030] border-[#3a3858] p-6 h-full">
                  <GlassIcon Icon={c.icon} color={c.color} className="mb-4" />
                  <h3 className="font-semibold text-white mb-2 text-sm">{c.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed">{c.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CROSSLINK */}
      <section className="section bg-[#1e2030]">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="heading-lg text-white mb-4">Need the website AND AI visibility?</h2>
            <p className="text-white/60 leading-relaxed mb-8 text-center">
              Our{' '}
              <Link href="/denver-ai-web-design" className="text-[#8734E1] hover:underline">Denver AI Web Design</Link>{' '}
              service combines Next.js development with a complete SEO, AEO, and GEO architecture — so you get the engineering and the visibility system in one build.
            </p>
            <Button asChild className="bg-[#8734E1] hover:bg-[#7228C0] text-white">
              <Link href="/denver-ai-web-design">See AI-Ready Web Design <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="heading-lg text-white mb-4">Denver Next.js development — questions</h2>
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

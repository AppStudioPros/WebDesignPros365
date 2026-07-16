"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Zap, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CTASection from '@/components/sections/CTASection';

const cases = [
  {
    client: 'Sculpted Beauty',
    industry: 'Beauty + Wellness',
    project: 'Next.js rebuild + GEO optimization',
    summary: 'Migrated from a sluggish WordPress build to a modern Next.js + Sanity stack with full SEO + AEO + GEO implementation.',
    metrics: [
      { label: 'Conversion lift', value: '+40%' },
      { label: 'LCP improvement', value: '4.2s → 0.9s' },
      { label: 'Organic traffic', value: '+62% in 90 days' },
    ],
    quote: "Web Design Pros 365 transformed our online presence. Their expertise in Next.js and performance optimization resulted in a 40% increase in conversions.",
    by: 'Ilona Bower, CEO',
    color: '#EC4899',
  },
  {
    client: 'PocketFiler',
    industry: 'Federal + Tax Tech',
    project: 'Full SaaS platform + AI document intelligence',
    summary: 'Built the PocketFiler tax-filing SaaS from scratch on Next.js + AWS infrastructure. AI-powered document parsing, audit-trail-complete workflows.',
    metrics: [
      { label: 'Time to first MVP', value: '11 weeks' },
      { label: 'Documents processed', value: '50K+ in year 1' },
      { label: 'Production uptime', value: '99.97%' },
    ],
    quote: "The GEO optimization they implemented has positioned us ahead of competitors in AI search results.",
    by: 'John Cressey, Marketing Director',
    color: '#2F73EE',
  },
  {
    client: 'Contractor Guardians',
    industry: 'Compliance Tech',
    project: 'AI chatbot integration + platform engineering',
    summary: 'Built a custom AI chatbot grounded in compliance documentation. Audit-trail-complete responses, no hallucination, grounded retrieval. Handles 60% of customer support tickets automatically.',
    metrics: [
      { label: 'Support efficiency', value: '+60%' },
      { label: 'Avg response time', value: '< 2 seconds' },
      { label: 'Tickets auto-resolved', value: '60% of volume' },
    ],
    quote: "Their AI chatbot integration increased our customer support efficiency by 60%. Professional team that truly understands modern web development.",
    by: 'Larry Book, CTO',
    color: '#10B981',
  },
  {
    client: 'Fast Track Solutions',
    industry: 'B2B Services',
    project: 'E-commerce + custom platform',
    summary: 'Custom e-commerce platform on Next.js + Stripe Connect + Sanity. Multi-currency, subscription billing, custom admin tooling.',
    metrics: [
      { label: 'Delivered', value: 'Ahead of schedule' },
      { label: 'Stripe integration', value: 'Full Connect platform' },
      { label: 'Custom admin', value: 'Built in-house' },
    ],
    quote: "Exceptional attention to detail and technical expertise. They delivered our e-commerce platform ahead of schedule with outstanding results.",
    by: 'Chelsea Johnson, Founder',
    color: '#F59E0B',
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-[#1a1930] to-[#1e2030]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">Case Studies</Badge>
            <h1 className="heading-xl mb-6">Real work. <span className="gradient-text">Real results.</span></h1>
            <p className="text-lg md:text-xl text-[#a8a4c8] max-w-3xl mx-auto mb-8">
              Selected engagements from across the WDP365 portfolio. Each one documents the problem,
              the build, and the measurable outcome.
            </p>
            <Link href="/contact"><Button size="lg" className="bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90 text-white">Start Your Project <ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
          </motion.div>
        </div>
      </section>

      <section className="section bg-[#252640]">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto space-y-8">
            {cases.map((c, i) => (
              <motion.div key={c.client} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="p-8 hover:shadow-lg transition-all border-l-4" style={{ borderLeftColor: c.color }}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-xl font-bold text-[#f0eef8]">{c.client}</h3>
                        <Badge className="text-xs" style={{ backgroundColor: `${c.color}20`, color: c.color, borderColor: c.color }}>{c.industry}</Badge>
                      </div>
                      <p className="text-sm font-semibold text-[#c4c0e0] mb-3">{c.project}</p>
                      <p className="text-sm text-[#a8a4c8] leading-relaxed mb-4">{c.summary}</p>
                      <blockquote className="border-l-2 border-[#3a3858] pl-4 italic text-sm text-[#c4c0e0]">
                        &quot;{c.quote}&quot;
                        <footer className="text-xs text-[#8a87a8] mt-2 not-italic">{c.by}</footer>
                      </blockquote>
                    </div>
                    <div className="space-y-3">
                      {c.metrics.map((m) => (
                        <div key={m.label} className="bg-[#181928] rounded-xl p-4">
                          <p className="text-xs text-[#8a87a8] mb-1">{m.label}</p>
                          <p className="text-lg font-bold" style={{ color: c.color }}>{m.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#181928]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
            <div className="grid grid-cols-3 gap-4 mb-8 sm:gap-8">
              <div>
                <TrendingUp className="w-8 h-8 text-[#8734E1] mx-auto mb-2" />
                <div className="text-3xl font-bold gradient-text">2000+</div>
                <div className="text-sm text-[#8a87a8]">Projects delivered</div>
              </div>
              <div>
                <Zap className="w-8 h-8 text-[#8734E1] mx-auto mb-2" />
                <div className="text-3xl font-bold gradient-text">98%</div>
                <div className="text-sm text-[#8a87a8]">Client satisfaction</div>
              </div>
              <div>
                <Users className="w-8 h-8 text-[#8734E1] mx-auto mb-2" />
                <div className="text-3xl font-bold gradient-text">75+</div>
                <div className="text-sm text-[#8a87a8]">Active partners</div>
              </div>
            </div>
            <h2 className="heading-lg mb-4">Want to be the next case study?</h2>
            <Link href="/contact"><Button size="lg" className="bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90 text-white">Start a Project <ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
          </motion.div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

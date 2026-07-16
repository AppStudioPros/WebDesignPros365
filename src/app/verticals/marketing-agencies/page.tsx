"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Bot, BarChart3, Building2, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassIcon } from '@/components/ui/glass-icon';
import CTASection from '@/components/sections/CTASection';

const painPoints = [
  { title: 'Stuck on HighLevel rent forever', body: 'Per-location pricing means every client growth dollar gets eaten by HighLevel. The platform takes a permanent cut you cannot avoid.' },
  { title: '"AI" that is a GPT-mini wrapper', body: 'Every agency platform now claims AI. Most are thin wrappers over commodity LLMs that hallucinate, refuse simple questions, and impress nobody.' },
  { title: 'Per-tier feature gating', body: 'The features your clients actually need are always one tier up. You pay more, your clients pay more, the platform wins.' },
  { title: 'Multi-tenant features you cannot extend', body: 'You can white-label, but you cannot change the core UX, cannot add custom integrations, cannot ship anything proprietary to your agency.' },
];

const competitors = [
  { name: 'GoHighLevel', body: 'The dominant agency-SaaS platform. Per-location pricing. Mature multi-tenant flywheel. Mediocre UX, commodity AI, locked stack.' },
  { name: 'Vendasta', body: 'Marketplace-style agency platform. Good for resale-first agencies. Less depth on customization.' },
  { name: 'AgencyAnalytics', body: 'Reporting-focused. Strong dashboards. Limited on actual marketing automation.' },
  { name: 'Sendible', body: 'Social-media-first. Good for social-only agencies. Weak on CRM and automation.' },
  { name: 'Birdeye', body: 'Reputation-management-first. Strong on reviews and surveys. Narrow scope.' },
];

const howWeHelp = [
  { icon: Layers, title: 'Custom HighLevel replacement', body: 'Next.js + Supabase + Vercel + ACI. Every module HighLevel has, on a modern stack. You own the code. Per-location rent goes to zero.' },
  { icon: Bot, title: 'Real AI, not wrappers', body: 'Anthropic Claude through the patented ACI platform. Audit-trail-complete. No hallucination. The kind of AI you can actually charge clients premium for.' },
  { icon: Building2, title: 'Multi-tenant agency mode', body: 'White-label sub-accounts, custom domains per client, role-based access, agency-of-agencies patterns. The actual moat HighLevel has. Buildable.' },
  { icon: BarChart3, title: 'Proprietary modules', body: 'Build the thing your competitors do not have. Industry-specific automation, custom AI agents, vertical playbooks. Your agency, your IP.' },
];

const advantages = [
  'Patented ACI architecture for the real-AI layer',
  'Full HighLevel feature replacement scoped in our Platform Engineering practice',
  'Real-world experience: we have helped agencies leave HighLevel for custom builds',
  'Per-location rent eliminated (one-time build + retainer instead)',
  'You own the codebase and the customer relationship',
  'Modern stack: Next.js 16 + Supabase + Vercel + Anthropic Claude',
];

export default function MarketingAgenciesPage() {
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f9fc]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">Vertical: Marketing Agencies</Badge>
            <h1 className="heading-xl mb-6">For agencies <span className="gradient-text">ready to leave HighLevel.</span></h1>
            <p className="text-lg md:text-xl text-[#a8a4c8] max-w-3xl mx-auto mb-8">
              You are an agency. You are paying HighLevel $200-$2,000 per month per location for a
              clunky UX, hallucinating AI, and a platform you do not own. We build the custom
              replacement so you keep your customers, own your stack, and stop paying rent forever.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/platform-engineering"><Button size="lg" className="bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90 text-white">See the Platform Engineering Pitch <ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
              <Link href="/contact?topic=marketing-agency"><Button variant="outline" size="lg">Book a Call</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-red-100 text-red-700 border-red-300">The Agency Tax</Badge>
            <h2 className="heading-lg mb-4">What renting HighLevel actually costs you</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {painPoints.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="p-6 h-full border-red-100 bg-red-50/30 text-center">
                  <h3 className="font-semibold text-[#f0eef8] mb-2">{p.title}</h3>
                  <p className="text-sm text-[#c4c0e0]">{p.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#181928]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">The Competitive Landscape</Badge>
            <h2 className="heading-lg mb-4">Where the <span className="gradient-text">agency platforms</span> stand today</h2>
          </motion.div>
          <div className="max-w-4xl mx-auto space-y-3">
            {competitors.map((c, i) => (
              <motion.div key={c.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="p-5">
                  <div className="flex items-start gap-4">
                    <h3 className="font-semibold text-[#f0eef8] w-40 flex-shrink-0">{c.name}</h3>
                    <p className="text-sm text-[#a8a4c8] leading-relaxed">{c.body}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-[#8a87a8] mt-6">All five are real platforms doing real work. None of them give you the option of owning the platform yourself.</p>
        </div>
      </section>

      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">How We Help</Badge>
            <h2 className="heading-lg mb-4">Four shapes <span className="gradient-text">we ship for agencies.</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {howWeHelp.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div key={h.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Card className="p-6 h-full hover:shadow-lg hover:border-[#8734E1] transition-all flex flex-col items-center text-center">
                    <div className="mb-4"><GlassIcon Icon={Icon} color="#8734E1" /></div>
                    <h3 className="font-semibold text-[#f0eef8] mb-2">{h.title}</h3>
                    <p className="text-sm text-[#a8a4c8] leading-relaxed">{h.body}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-[#181928]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">The WDP365 Agency Advantage</Badge>
            <h2 className="heading-lg mb-6">Why agencies finally walk away</h2>
            <ul className="space-y-3">
              {advantages.map((a) => (
                <li key={a} className="flex items-start gap-3 text-[#c4c0e0]">
                  <div className="w-6 h-6 rounded-full bg-[#1e1c35] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-[#8734E1]" />
                  </div>
                  <span className="leading-relaxed">{a}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/platform-engineering" className="text-[#8734E1] hover:underline text-sm">Read the full Platform Engineering pitch →</Link>
            </div>
          </motion.div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

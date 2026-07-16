"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Boxes, Rocket, Users, Workflow, BarChart3, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CTASection from '@/components/sections/CTASection';

const phases = [
  {
    phase: 'Phase 1',
    title: 'MVP (8-14 weeks)',
    body: 'Single-tenant or early multi-tenant. Auth, billing, core workflow, basic admin. Ships in 8-14 weeks. Typical range $50K-$150K.',
  },
  {
    phase: 'Phase 2',
    title: 'Multi-Tenant Production (4-9 months)',
    body: 'Multi-tenant architecture, role-based access, real analytics, integrations layer, admin tooling, QA hardening. Typical range $150K-$500K total.',
  },
  {
    phase: 'Phase 3',
    title: 'Enterprise / Compliance (8-18 months)',
    body: 'SOC 2 controls, custom SSO, advanced reporting, SLA hardening, compliance scope. Federal-grade discipline if needed. Typical range past $500K.',
  },
];

const capabilities = [
  { icon: Boxes, title: 'Multi-tenancy patterns', body: 'Clean tenant isolation with Postgres + Row Level Security. Per-tenant feature flags. Tested at 50K+ tenants on similar architectures.' },
  { icon: Users, title: 'Auth + RBAC', body: 'Production-grade auth (Clerk, Auth.js, Supabase Auth, or custom). Real role-based access control. SSO integration when needed.' },
  { icon: Workflow, title: 'Billing + payments', body: 'Stripe Connect, subscription billing, usage-based pricing, multi-currency, ACH, invoicing. Money flows to you, not held by the platform.' },
  { icon: BarChart3, title: 'Analytics + observability', body: 'Real product analytics, custom dashboards, alerting, log aggregation. Not just Google Analytics. The kind of telemetry that catches problems before customers do.' },
  { icon: ShieldCheck, title: 'Compliance hardening', body: 'SOC 2 controls, GDPR, HIPAA-conscious patterns where needed. Federal-grade audit trails for regulated industries. The same discipline we apply to government work.' },
  { icon: Rocket, title: 'Vercel + Supabase + ACI', body: 'Modern stack from the foundation up. Next.js 16, Supabase Postgres + Auth + Realtime + Vector, Vercel Edge deployment, ACI for the AI layer. All current generation.' },
];

const faqs = [
  {
    q: 'How is this different from a standard web build?',
    a: 'A web build ships a marketing site or simple app. A SaaS platform is a product. The work is fundamentally different: multi-tenant architecture, billing infrastructure, real product analytics, role-based access, customer support workflows, and enough operational telemetry to run a business on. Web builds finish at launch. SaaS platforms keep evolving for years.',
  },
  {
    q: 'Can you take a SaaS from idea to production?',
    a: 'Yes. We have shipped from idea to MVP to multi-tenant production across five verticals. The shape we recommend: 8-14 weeks to a working MVP that has paying customers or signed pilots, then layer in multi-tenancy and scale features in Phase 2. Avoid building enterprise features for customers you have not won yet.',
  },
  {
    q: 'What if I already have a SaaS and need to modernize?',
    a: 'Common case. We help SaaS companies migrate off legacy stacks (PHP, Rails 4, jQuery-heavy frontends) to modern Next.js + Supabase + Vercel. We can also bolt AI capability onto an existing product using our ACI platform as a layer that does not require rewriting your core app.',
  },
  {
    q: 'Do you white-label?',
    a: 'Yes. Several of our SaaS builds ship under our clients\' brands with no WDP365 attribution. We are comfortable being invisible if that is what the engagement requires.',
  },
  {
    q: 'What does a SaaS engagement actually cost?',
    a: 'MVP tier $50K-$150K. Production multi-tenant tier $150K-$500K. Enterprise/compliance tier $500K+. These are total project costs through phase delivery, not annual retainers. Ongoing dev support after launch typically runs $5K-$15K per month depending on velocity.',
  },
];

export default function AiSaasPlatformsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f9fc]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">AI SaaS Platforms</Badge>
            <h1 className="heading-xl mb-6">Build a real <span className="gradient-text">AI-native SaaS.</span></h1>
            <p className="text-lg md:text-xl text-[#a8a4c8] max-w-3xl mx-auto mb-8">
              We are the engineering arm for founders, vertical specialists, and existing software
              companies who need to ship a production AI SaaS. From MVP to multi-tenant production to
              enterprise-grade compliance. On the same modern stack we use for everything else.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact?topic=ai-saas">
                <Button size="lg" className="bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90 text-white">
                  Talk About Your Platform <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/services/aci-platform"><Button variant="outline" size="lg">See the ACI Stack</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">The Three Phases</Badge>
            <h2 className="heading-lg mb-4">From idea to <span className="gradient-text">enterprise-grade.</span></h2>
            <p className="text-[#a8a4c8]">SaaS builds run in phases. We do not pretend an MVP is a production system. We do not pretend a production system is enterprise-grade. Each phase has clear scope and clear pricing.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {phases.map((p, i) => (
              <motion.div key={p.phase} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="p-6 h-full hover:shadow-lg hover:border-[#8734E1] transition-all">
                  <div className="text-3xl font-bold text-[#8734E1]/30 mb-2">{p.phase}</div>
                  <h3 className="font-semibold text-[#f0eef8] mb-2">{p.title}</h3>
                  <p className="text-sm text-[#a8a4c8] leading-relaxed">{p.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#181928]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">Production Capabilities</Badge>
            <h2 className="heading-lg mb-4">What we ship on <span className="gradient-text">every platform.</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Card className="p-5 h-full hover:shadow-lg transition-all">
                    <div className="w-10 h-10 rounded-xl bg-[#1e1c35] flex items-center justify-center mb-3"><Icon className="w-5 h-5 text-[#8734E1]" /></div>
                    <h3 className="font-semibold text-[#f0eef8] mb-2 text-sm">{c.title}</h3>
                    <p className="text-xs text-[#a8a4c8] leading-relaxed">{c.body}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">FAQ</Badge>
            <h2 className="heading-lg mb-4">Common SaaS-build questions</h2>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                <div className="bg-[#252640] border border-[#3a3858] rounded-2xl overflow-hidden shadow-sm">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#1c1d30] transition-colors">
                    <span className="font-medium text-[#f0eef8] pr-8">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#8734E1] transition-transform duration-300 flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <div className="px-6 pb-5"><p className="text-[#a8a4c8] leading-relaxed">{faq.a}</p></div>
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

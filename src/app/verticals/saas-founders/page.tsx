"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Rocket, Code2, Boxes, Users, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassIcon } from '@/components/ui/glass-icon';
import CTASection from '@/components/sections/CTASection';

const painPoints = [
  { title: 'Domain expertise without engineering', body: 'You know your industry cold. You see the broken thing. But you cannot ship software at the speed your idea deserves.' },
  { title: 'Offshore shops produce garbage', body: 'You tried Upwork, Toptal, agencies in Eastern Europe. The MVP that comes back is half-broken, unmaintainable, and built on stacks from 2018.' },
  { title: 'In-house hiring is brutally slow', body: 'A senior full-stack engineer takes 4-9 months to recruit, costs $200K+ all-in, and may quit in year 1. Then you have nobody.' },
  { title: 'AI wrappers are not products', body: 'You can spin up a GPT wrapper in a weekend. So can your competitor. None of those become real businesses. The product needs to be deeper than the wrapper.' },
];

const platforms = [
  'Stripe Atlas', 'Mercury', 'Brex', 'Modern Treasury', 'Plaid',
  'Clerk', 'Auth.js', 'WorkOS', 'Supabase Auth',
  'Vercel', 'Cloudflare', 'AWS', 'Railway', 'Fly.io',
  'Anthropic', 'OpenAI', 'Pinecone', 'pgvector', 'LangChain',
  'PostHog', 'Mixpanel', 'Sentry', 'LogRocket',
];

const howWeHelp = [
  { icon: Rocket, title: 'Idea to MVP in 8-14 weeks', body: 'We take your domain expertise and ship a working MVP your first paying customers can actually use. Not a clickable prototype. A real product.' },
  { icon: Boxes, title: 'Multi-tenant from day one', body: 'We do NOT build a single-tenant MVP that has to be rewritten in 6 months. Tenant isolation patterns, row-level security, billing infrastructure, all from the start.' },
  { icon: Code2, title: 'You own the code', body: 'Source code, deployment docs, ongoing dev handoff. You can take it anywhere. We do not lock you into us through proprietary infrastructure.' },
  { icon: Users, title: 'Phase-2 with you, not for you', body: 'After MVP we shift to retainer for ongoing dev velocity. Your hire-able internal team replaces us over time. We make ourselves replaceable on purpose.' },
];

const advantages = [
  'Shipped vertical SaaS in real estate, federal, marketing, compliance, and tax verticals',
  'Patented ACI architecture for the AI layer (real moat, not a wrapper)',
  'Modern stack from day one (Next.js 16, Supabase, Vercel, Anthropic)',
  'Multi-tenancy patterns tested at 50K+ tenants on similar architectures',
  'Compliance-aware (SOC 2, HIPAA-conscious, federal-grade audit trails)',
];

export default function SaasFoundersPage() {
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f9fc]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">Vertical: SaaS Founders + Vertical Platforms</Badge>
            <h1 className="heading-xl mb-6">For domain experts <span className="gradient-text">building real products.</span></h1>
            <p className="text-lg md:text-xl text-[#a8a4c8] max-w-3xl mx-auto mb-8">
              You know the industry. You see the broken thing. We are the engineering arm that ships
              what you envision. From MVP to multi-tenant production to enterprise-grade compliance.
              On the same modern stack we use for everything: Next.js 16, Supabase, Vercel, ACI.
            </p>
            <Link href="/contact?topic=saas-founder"><Button size="lg" className="bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90 text-white">Book a Founder Call <ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
          </motion.div>
        </div>
      </section>

      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-red-100 text-red-700 border-red-300">Why Most SaaS MVPs Fail</Badge>
            <h2 className="heading-lg mb-4">The four traps</h2>
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
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">How We Help</Badge>
            <h2 className="heading-lg mb-4">Four shapes <span className="gradient-text">we ship for founders.</span></h2>
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

      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">SaaS Stack We Use</Badge>
            <h2 className="heading-lg mb-4">Where we <span className="gradient-text">plug in.</span></h2>
            <p className="text-[#a8a4c8]">Modern stack from auth to billing to AI. Production-tested patterns, not new-shiny experiments.</p>
          </motion.div>
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3">
            {platforms.map((p) => (
              <div key={p} className="px-4 py-2 rounded-xl bg-[#181928] border border-[#3a3858] text-[#c4c0e0] text-sm font-medium">{p}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#181928]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">The WDP365 Founder Advantage</Badge>
            <h2 className="heading-lg mb-6">Why vertical SaaS founders pick us</h2>
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
              <Link href="/services/ai-saas-platforms" className="text-[#8734E1] hover:underline text-sm">Read the full AI SaaS Platforms service →</Link>
            </div>
          </motion.div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

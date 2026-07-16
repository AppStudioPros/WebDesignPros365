"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Layers,
  Cpu,
  Workflow,
  Database,
  ShieldCheck,
  Sparkles,
  Globe2,
  Boxes,
  Rocket,
  Users,
  Check,
  GitBranch,
  Server,
  LayoutDashboard,
  Lock,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassIcon } from '@/components/ui/glass-icon';
import CTASection from '@/components/sections/CTASection';

const partnerCategories = [
  {
    name: 'Marketing Automation',
    examples: 'GoHighLevel resellers, Keap, ActiveCampaign agencies, ClickFunnels partners',
    icon: Workflow,
    color: '#8734E1',
  },
  {
    name: 'CRM + Sales Tech',
    examples: 'HubSpot partners, Salesforce ISVs, Pipedrive resellers, Close CRM',
    icon: Database,
    color: '#2F73EE',
  },
  {
    name: 'AI + LLM Platforms',
    examples: 'Anthropic, OpenAI, Pinecone, LangChain enterprise, Inkeep, Vapi',
    icon: Cpu,
    color: '#EC4899',
  },
  {
    name: 'Headless CMS + Content',
    examples: 'Sanity, Contentful, Strapi, Storyblok, Builder.io',
    icon: Layers,
    color: '#F59E0B',
  },
  {
    name: 'Hosting + Infrastructure',
    examples: 'Vercel, Cloudflare, Supabase, Neon, Railway, Fly.io',
    icon: Globe2,
    color: '#10B981',
  },
  {
    name: 'Federal + Regulated',
    examples: 'SDVOSB contractors, GovCon primes, healthcare-grade integrators',
    icon: ShieldCheck,
    color: '#BF5DE0',
  },
  {
    name: 'Vertical Software',
    examples: 'Real estate platforms (MarqetCore), legal tech, fintech, healthtech',
    icon: Boxes,
    color: '#06B6D4',
  },
  {
    name: 'Indie Founders + Studios',
    examples: 'Solo SaaS founders, design studios, dev shops needing AI capability',
    icon: Rocket,
    color: '#84CC16',
  },
];

const adminFeatures = [
  {
    title: 'Vercel Deployment Pipeline',
    icon: GitBranch,
    color: '#000000',
    badge: 'CI/CD',
    body:
      'Git push triggers preview deploys for every branch. Production deploys on merge to main. Sub-100ms global edge cache. Rollback in one click.',
    proof: ['Sub-100ms edge', 'Zero-downtime', 'Instant rollback'],
  },
  {
    title: 'Multi-Environment Management',
    icon: Server,
    color: '#10B981',
    badge: 'INFRA',
    body:
      'Production, preview, and development environments fully isolated. Per-environment env vars, domains, and access controls. Auto-promotion or gated promotion (your choice).',
    proof: ['3 isolated envs', 'Per-env secrets', 'Gated promotion'],
  },
  {
    title: 'Custom Admin Dashboards',
    icon: LayoutDashboard,
    color: '#8734E1',
    badge: 'OPS',
    body:
      'We build your team a custom admin panel that mirrors Vercel\'s dev UX but is scoped to your operations. CRM views, content workflows, deployment controls, all on one screen.',
    proof: ['One pane of glass', 'CRM + content + deploys', 'Branded to your team'],
  },
  {
    title: 'Role-Based Access Control',
    icon: Lock,
    color: '#F59E0B',
    badge: 'SECURITY',
    body:
      'Real RBAC out of the box. Owners, admins, content editors, support agents, read-only auditors. Every action audited.',
    proof: ['5 default roles', 'Custom roles', 'Audit-trail-complete'],
  },
];

const partnerFAQs = [
  {
    q: 'What kind of partnerships are you looking for?',
    a: "Three types. First, technology partnerships where we integrate your platform into our builds (think Sanity, Vercel, Supabase, Anthropic). Second, channel partnerships where you bring us client work and we deliver (agencies, consultancies, fractional CTOs). Third, vertical partnerships where you own a specific industry and we provide the AI-native engineering layer (real estate, legal, healthcare, fintech).",
  },
  {
    q: "Why does your stack matter for partnership?",
    a: "Because the modern stack actually composes. Next.js + Vercel + Supabase + Anthropic Claude + Sanity all work together cleanly. The legacy stack (PHP monoliths, jQuery, MySQL, custom hosting) does not. When you partner with us, you get a team that can integrate with any modern API and ship in days instead of months.",
  },
  {
    q: 'Do you do white-label work?',
    a: 'Yes. Plenty of our work ships under partner brands. We are comfortable being invisible if that is what the deal requires. We can also co-brand or be visibly named, your call.',
  },
  {
    q: 'How do partnership economics work?',
    a: 'Several models depending on the deal. Referral fees on closed work (10-15% standard). Reseller margin if you bring us in as the engineering arm (you set client pricing, we set wholesale, your margin is the spread). Joint venture for vertical-specific platforms (equity split case-by-case). For technology partnerships (API integrations, listing on our stack), no money changes hands. We just ship.',
  },
  {
    q: 'Can you replicate the patented ACI platform for our clients?',
    a: 'Yes. Our ACI license covers commercial deployment. We can integrate ACI into your clients\' platforms, white-labeled if needed, with the audit-trail-complete and no-hallucination disciplines intact. The patent stays with Lucid Tech LLC. The deployment is yours to brand.',
  },
  {
    q: 'How fast can you onboard a new partner?',
    a: 'A discovery call within 48 hours. A proposal within a week. A signed partnership doc usually within two weeks. First joint project kickoff inside 30 days. We move fast because the partners who pick us are usually trying to escape a slow-moving incumbent.',
  },
  {
    q: 'Do you work with international partners?',
    a: 'Yes. We have shipped for US, Canada, UK, and EU partners. Time zones flex around the work. Payment in USD via wire or Stripe.',
  },
];

export default function PartnershipsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* HERO */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-[#1a1930] to-[#1e2030]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#8734E1]/5 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#2F73EE]/5 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">Partnerships</Badge>
            <h1 className="heading-xl mb-4">
              We work with{' '}
              <span className="gradient-text">75+ platforms and partners.</span>
            </h1>
            <p
              className="shimmer-gold-text font-bold whitespace-nowrap mb-6 mx-auto"
              data-text="We are the platform behind the curtains"
              style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', lineHeight: 1.1, letterSpacing: '-0.01em' }}
            >
              We are the platform behind the curtains
            </p>
            <p className="text-lg md:text-xl text-[#a8a4c8] max-w-3xl mx-auto mb-8">
              Custom AI applications and Next.js + Python platforms built for marketing automation companies,
              CRM resellers, vertical SaaS founders, federal contractors, and design studios that need a real
              engineering arm. If you ship to customers and your stack is starting to crack, let&apos;s talk.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact?topic=partnership">
                <Button size="lg" className="bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90 text-white">
                  Book a Partnership Call
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="#categories">
                <Button variant="outline" size="lg">
                  See Partner Categories
                </Button>
              </Link>
            </div>
            <p className="text-xs text-[#8a87a8] mt-4">
              No pricing on this page. Partnerships are scoped per-deal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHO WE WORK WITH (counter strip) */}
      <section className="py-12 bg-[#181928] border-y border-[#3a3858]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold gradient-text mb-1">75+</div>
              <div className="text-sm text-[#8a87a8]">Platforms + partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-1">2000+</div>
              <div className="text-sm text-[#8a87a8]">Projects shipped</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-1">A+</div>
              <div className="text-sm text-[#8a87a8]">BBB rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-1">20+</div>
              <div className="text-sm text-[#8a87a8]">Years building on the web</div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER CATEGORIES */}
      <section id="categories" className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">Partner Categories</Badge>
            <h2 className="heading-lg mb-4">
              Who we <span className="gradient-text">build with.</span>
            </h2>
            <p className="text-[#c4c0e0] font-medium mb-4 max-w-2xl mx-auto">
              Due to the sensitivity of government projects and contractors, as well as the parallel
              vertical companies we work with, we remain anonymous to protect integrity in our processes.
              This is our agreement and our firm position.
            </p>
            <p className="text-[#a8a4c8] max-w-2xl mx-auto">
              Eight categories. Different shapes of partnership in each. If you do not see your category
              listed, that does not mean we can&apos;t work together. It just means we have not done it
              yet. Tell us about it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {partnerCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg hover:border-[#8734E1] transition-all">
                    <div className="mb-4">
                      <GlassIcon Icon={Icon} color={cat.color} />
                    </div>
                    <h3 className="font-semibold text-[#f0eef8] mb-2">{cat.name}</h3>
                    <p className="text-sm text-[#a8a4c8] leading-relaxed">{cat.examples}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VERCEL ADMIN PANEL MOCK */}
      <section className="section bg-[#0a0a0f] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-[#252640]/10 text-white border-white/20">Built On Vercel</Badge>
            <h2 className="heading-lg mb-4 text-white">
              Every site, every platform, on{' '}
              <span className="bg-gradient-to-r from-[#BF5DE0] to-[#2F73EE] bg-clip-text text-transparent">
                Vercel Edge.
              </span>
            </h2>
            <p className="text-white/70">
              We deploy every partner build through Vercel&apos;s edge network. Sub-100ms cold starts.
              Preview deploys per branch. Rollback in one click. Custom admin dashboards layered on top.
            </p>
          </motion.div>

          {/* Stylized Vercel-like admin panel mock */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-[#0f0f17] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              {/* Title bar */}
              <div className="bg-[#1a1a24] px-4 py-3 flex items-center gap-2 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-white/40 font-mono">
                    vercel.com/webdesignpros/dashboard
                  </span>
                </div>
              </div>

              {/* Top bar */}
              <div className="bg-[#0f0f17] px-6 py-3 border-b border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-white">▲ Vercel</span>
                  <span className="text-white/40">/</span>
                  <span className="text-white/80">webdesignpros</span>
                  <span className="text-white/40">/</span>
                  <span className="text-white/80">Production</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/60">Pro</span>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#8734E1] to-[#2F73EE]"></div>
                </div>
              </div>

              {/* Sidebar + Main */}
              <div className="flex">
                <div className="w-44 bg-[#0a0a0f] border-r border-white/10 p-4 text-xs space-y-1 hidden md:block">
                  {[
                    'Overview',
                    'Deployments',
                    'Analytics',
                    'Domains',
                    'Functions',
                    'Logs',
                    'Storage',
                    'Edge Config',
                    'Team',
                    'Settings',
                  ].map((item, i) => (
                    <div
                      key={item}
                      className={`px-3 py-1.5 rounded ${
                        i === 1 ? 'bg-[#252640]/10 text-white' : 'text-white/50 hover:bg-[#252640]/5'
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="flex-1 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Deployments</h3>
                    <div className="flex gap-2">
                      <div className="px-3 py-1 text-xs rounded bg-[#252640]/10 text-white/80">All branches</div>
                      <div className="px-3 py-1 text-xs rounded bg-emerald-500/20 text-emerald-300">
                        ● Ready
                      </div>
                    </div>
                  </div>

                  {/* Deployment rows */}
                  <div className="space-y-2">
                    {[
                      {
                        commit: 'feat: AI Visibility Stack rollout + AEO schema deploy',
                        status: 'Ready',
                        branch: 'main',
                        time: '2h ago',
                        duration: '14s',
                      },
                      {
                        commit: 'Add llms.txt + Platform Engineering page',
                        status: 'Ready',
                        branch: 'main',
                        time: '4h ago',
                        duration: '18s',
                      },
                      {
                        commit: 'Update Next.js 16 callouts + 5-tier pricing',
                        status: 'Ready',
                        branch: 'main',
                        time: '6h ago',
                        duration: '12s',
                      },
                      {
                        commit: 'preview: partner onboarding flow v2',
                        status: 'Building',
                        branch: 'partner-flow-v2',
                        time: '8m ago',
                        duration: '—',
                      },
                      {
                        commit: 'fix: ACI-Powered tier CTA copy',
                        status: 'Ready',
                        branch: 'main',
                        time: '1d ago',
                        duration: '11s',
                      },
                    ].map((d, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-3 rounded-lg border border-white/10 hover:bg-[#252640]/5"
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            d.status === 'Ready'
                              ? 'bg-emerald-400'
                              : 'bg-amber-400 animate-pulse'
                          }`}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-white truncate">{d.commit}</div>
                          <div className="text-xs text-white/40 font-mono">
                            {d.branch} · {d.time}
                          </div>
                        </div>
                        <div className="text-xs text-white/60 hidden md:block">{d.duration}</div>
                        <div
                          className={`px-2 py-0.5 rounded text-xs ${
                            d.status === 'Ready'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {d.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-white/40 mt-4">
              Illustrative dashboard. Real partner deployments tracked through Vercel&apos;s production console.
            </p>
          </motion.div>

          {/* What we layer on top — 4 admin features with varied icons + proof chips */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mt-12">
            {adminFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="relative bg-[#252640]/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 h-full hover:bg-[#252640]/10 transition-colors">
                    {/* Top accent strip */}
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                      style={{ background: `linear-gradient(90deg, ${f.color}, ${f.color}80, transparent)` }}
                    />
                    {/* Icon + badge row */}
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${f.color}, ${f.color}cc)`,
                          boxShadow: `0 4px 12px -2px ${f.color}40`,
                        }}
                      >
                        <Icon className="w-5 h-5 text-white" strokeWidth={2.25} />
                      </div>
                      <span
                        className="text-[9px] font-mono uppercase tracking-wider px-2 py-1 rounded-md"
                        style={{ background: `${f.color}25`, color: f.color }}
                      >
                        {f.badge}
                      </span>
                    </div>
                    <h3 className="font-semibold text-white mb-2 text-sm">{f.title}</h3>
                    <p className="text-xs text-white/70 leading-relaxed mb-4">{f.body}</p>
                    {/* Proof chips */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                      {f.proof.map((p) => (
                        <span
                          key={p}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-[#252640]/5 text-white/60 border border-white/10"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* THREE PARTNERSHIP MODELS */}
      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">How It Works</Badge>
            <h2 className="heading-lg mb-4">
              Three <span className="gradient-text">partnership models.</span>
            </h2>
            <p className="text-[#a8a4c8]">
              Pick the shape that fits. We can also combine them for the right deal.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'Technology Partnership',
                body:
                  'You provide a platform, API, or service. We integrate it into our builds and recommend it to clients. No money up front. We just ship together. Best for: Sanity, Vercel, Supabase, Anthropic, Pinecone, similar.',
                cta: 'No money, just ships',
              },
              {
                title: 'Channel + Reseller',
                body:
                  'You bring us client work. We deliver. You can be visible (co-branded) or invisible (white-label). Standard 10-15% referral on closed work, or reseller margin if you set retail pricing. Best for: agencies, consultancies, fractional CTOs, design studios.',
                cta: 'Standard agency economics',
              },
              {
                title: 'Vertical JV',
                body:
                  'You own a specific industry. We provide the AI-native engineering layer. Equity split case-by-case. Examples: MarqetCore for real estate, federal partner for government acquisition, similar setups for legal or healthcare. Best for: domain experts ready to build vertical platforms.',
                cta: 'Equity-based, long-term',
              },
            ].map((model, i) => (
              <motion.div
                key={model.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg hover:border-[#8734E1] transition-all">
                  <h3 className="font-semibold text-[#f0eef8] mb-3">{model.title}</h3>
                  <p className="text-sm text-[#a8a4c8] mb-4 leading-relaxed">{model.body}</p>
                  <Badge className="bg-[#1e1c35] text-[#8734E1] border-[#8734E1] text-xs">{model.cta}</Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="section bg-[#181928]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Card className="p-10 border-[#8734E1]/30 bg-gradient-to-br from-[#252640] to-[#1e1c35] text-center">
              <Users className="w-12 h-12 text-[#8734E1] mx-auto mb-4" />
              <h2 className="heading-lg mb-3">
                Let&apos;s see if there&apos;s a fit.
              </h2>
              <p className="text-[#a8a4c8] max-w-xl mx-auto mb-6">
                Book a free 30-minute partnership call. No pitch, no pressure. Just a conversation
                about what you&apos;re building and whether we should ship something together.
              </p>
              <Link href="/contact?topic=partnership">
                <Button size="lg" className="bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90 text-white">
                  Book the Call
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <p className="text-xs text-[#8a87a8] mt-4">
                Partnership scoping varies by deal shape. We do not publish standard pricing for partner work.
              </p>
            </Card>
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
            <h2 className="heading-lg mb-4">Partnership questions</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {partnerFAQs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
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

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Check,
  X,
  Database,
  Workflow,
  Calendar,
  Bot,
  CreditCard,
  Layers,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  ShieldOff,
  Anchor,
  UserCheck,
  FileText,
  BookOpenCheck,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassIcon } from '@/components/ui/glass-icon';
import CTASection from '@/components/sections/CTASection';
import { HighLevelDemo } from '@/components/sections/HighLevelDemo';

const painPoints = [
  {
    title: '"Click here, click there, click that..."',
    body:
      "Every support call ends with the agency teaching YOU how to use HighLevel. That's not service. That's billable training on someone else's broken UX.",
  },
  {
    title: 'AI that sounds like a printer support script',
    body:
      'The "AI" bolted onto HighLevel is a thin wrapper over commodity LLMs. It deflects, redirects, and never actually does the work. You\'re paying for a chatbot pretending to be intelligent.',
  },
  {
    title: 'Outsourced to Upwork the next day',
    body:
      'The agency you pay $500-$2,000/month for "HighLevel support" hires Upwork freelancers to handle your actual builds. You\'re paying retail for wholesale work.',
  },
  {
    title: 'A flaming dumpster fire of UI',
    body:
      "Fourteen years of feature accretion. Twenty-seven tabs to find a setting. Workflows that break when you sneeze. Your team hates opening it.",
  },
];

const comparison = [
  {
    feature: 'Underlying tech stack',
    highlevel: 'Legacy monolith (PHP-era roots)',
    wdp: 'Next.js 16 + React 19 + Vercel Edge',
    advantage: 'wdp',
  },
  {
    feature: 'AI engine',
    highlevel: 'GPT-4o-mini wrapper (commodity tier)',
    wdp: 'Anthropic Claude via patented ACI platform',
    advantage: 'wdp',
  },
  {
    feature: 'AI quality',
    highlevel: 'Hallucinations, drift, refuses simple questions',
    wdp: 'No hallucination. No drift. Always human-in-the-loop.',
    advantage: 'wdp',
  },
  {
    feature: 'Page builder',
    highlevel: 'Drag-drop with 1990s constraints',
    wdp: 'Plasmic + Sanity headless + custom blocks',
    advantage: 'wdp',
  },
  {
    feature: 'Workflow automation',
    highlevel: 'Visual builder, slow, frequent breaks',
    wdp: 'Modern visual builder + real reliability',
    advantage: 'wdp',
  },
  {
    feature: 'Page load (Core Web Vitals)',
    highlevel: 'Mediocre. Vendor-controlled CDN.',
    wdp: 'Sub-100ms via Vercel Edge globally',
    advantage: 'wdp',
  },
  {
    feature: 'Cost per agency seat',
    highlevel: '$97-$497/month per location',
    wdp: 'One-time build + retainer (your platform, your costs)',
    advantage: 'wdp',
  },
  {
    feature: 'Ownership',
    highlevel: 'You rent. They own everything.',
    wdp: 'You own the codebase. Period.',
    advantage: 'wdp',
  },
  {
    feature: 'Customization',
    highlevel: 'Locked to their feature roadmap',
    wdp: 'Anything you can describe, we can build',
    advantage: 'wdp',
  },
  {
    feature: 'Audit trail / compliance',
    highlevel: 'Limited. Not designed for regulated industries.',
    wdp: 'Audit-trail-complete (federal-grade)',
    advantage: 'wdp',
  },
  {
    feature: 'Agency reseller flywheel',
    highlevel: 'Mature. Sub-account / white-label out of the box.',
    wdp: 'Buildable as a custom module (Custom tier+)',
    advantage: 'highlevel',
  },
  {
    feature: 'Time to ship a new feature',
    highlevel: 'Wait for their roadmap (months or never)',
    wdp: 'Discovery to deploy in days/weeks',
    advantage: 'wdp',
  },
  {
    feature: 'Vendor lock-in',
    highlevel: 'Total. Migration is a project.',
    wdp: 'Open formats. Your data exports cleanly.',
    advantage: 'wdp',
  },
];

const modules = [
  {
    icon: Database,
    title: 'CRM & Contact Management',
    body:
      'Postgres-backed CRM with custom fields, tags, lifecycle stages, lead scoring, and real-time multi-user collaboration. Supabase under the hood, with vector search ready out of the box.',
    color: '#8734E1',
  },
  {
    icon: Workflow,
    title: 'Visual Workflow Automation',
    body:
      'Drag-drop automation builder with triggers, actions, branches, and waits. Integrates with email, SMS, calendar, payments, and any API. ACI-powered: workflows can call AI agents to decide, draft, and act.',
    color: '#2F73EE',
  },
  {
    icon: Layers,
    title: 'Funnel & Landing Page Builder',
    body:
      'Block-based page builder on top of Plasmic + Sanity. Faster than HighLevel pages. Better Core Web Vitals. Real A/B testing infrastructure. Your team edits, your visitors get sub-100ms loads.',
    color: '#EC4899',
  },
  {
    icon: Calendar,
    title: 'Scheduling & Bookings',
    body:
      'Calendar booking with availability rules, buffers, timezone smarts, group events, and round-robin team scheduling. Syncs with Google Cal, Outlook, Apple Calendar.',
    color: '#10B981',
  },
  {
    icon: Bot,
    title: 'ACI-Powered AI Assistant',
    body:
      'Custom AI agents trained on YOUR domain. Drafts proposals, answers customer questions, logs to CRM, schedules follow-ups, books meetings. Not a GPT-mini wrapper. Actual Anthropic Claude on the patented ACI platform.',
    color: '#F59E0B',
  },
  {
    icon: MessageSquare,
    title: 'Email + SMS + Inbox',
    body:
      'Unified inbox for email and SMS conversations. Bulk send, transactional, drip campaigns. Resend and Twilio under the hood for modern deliverability.',
    color: '#06B6D4',
  },
  {
    icon: CreditCard,
    title: 'Invoicing & Payments',
    body:
      'Stripe Connect integration. Invoice generation, subscription billing, payment links, ACH, card payments. Multi-currency. Your money flows direct to you, not held by the platform.',
    color: '#BF5DE0',
  },
  {
    icon: ShieldCheck,
    title: 'Reputation Management',
    body:
      'Google + Facebook reviews aggregation, response workflow, sentiment tracking, review request automation. Send the right review request to the right customer at the right time.',
    color: '#84CC16',
  },
];

const aciDifferentiators = [
  {
    title: 'No hallucination',
    icon: ShieldOff,
    body:
      "Every AI response is grounded in workspace state, your documents, your data, or cited sources. If the system doesn't know, it says so. Hallucinations don't ship.",
  },
  {
    title: 'No drift',
    icon: Anchor,
    body:
      "The AI cannot wander off the workspace context. Every exchange is anchored to a specific deal, customer, or campaign. No more 'wait, what were we talking about?' moments.",
  },
  {
    title: 'Always human-in-the-loop',
    icon: UserCheck,
    body:
      "Auto-approve only what's pre-authorized. Everything else surfaces for your sign-off. The AI proposes; humans dispose. You stay in control of every outbound action.",
  },
  {
    title: 'Audit-trail-complete',
    icon: FileText,
    body:
      'Every AI decision, every input, every output, every action recorded and exportable. The same compliance discipline we use on federal procurement contracts applies to your customer comms.',
  },
  {
    title: 'Methodology-bound',
    icon: BookOpenCheck,
    body:
      "The AI operates within YOUR published methodology. Your brand voice, your sales playbook, your compliance constraints, all cited and verifiable. Not vibes. Verifiable doctrine.",
  },
];

const faqs = [
  {
    q: 'How long does it take to migrate off HighLevel?',
    a: 'A realistic Phase 1 build (CRM + automation + bookings + AI chatbot + email/SMS + invoicing) ships in 6-12 weeks. We migrate your existing HighLevel data in parallel. You can keep HighLevel running until the new platform is fully live. No flag day, no panic switchover.',
  },
  {
    q: 'What does this actually cost vs HighLevel?',
    a: 'HighLevel costs $97-$497 per location per month, plus AI tokens, plus add-ons. Over 3 years for an agency with 20 client locations, that\'s $50K-$200K paid to HighLevel, with zero asset left at the end. A custom platform from us is a one-time build (typically $30K-$150K depending on scope) plus a modest retainer. You break even versus HighLevel typically in 12-24 months, and at the end, you own the platform.',
  },
  {
    q: 'Do I own the code?',
    a: 'Yes. The custom-built platform is yours. We deliver source code, deployment instructions, and operational handoff. You can fork, modify, white-label, or sell it. We can also continue maintaining it via retainer, your call.',
  },
  {
    q: 'Can the AI actually do work, or just answer questions?',
    a: 'Both. Our ACI-powered agents can draft proposals, send replies (with your approval), update CRM records, schedule follow-ups, and call APIs. That\'s the agentic side. They also answer questions grounded in your data, the conversational side. Most platforms only do the latter (and badly). We do both.',
  },
  {
    q: 'What happens to my HighLevel data?',
    a: 'We export your contacts, conversations, pipelines, custom fields, workflows, calendar events, and campaigns. Some data (like opaque proprietary automation logic) requires us to reverse-engineer and rebuild. We scope this in the discovery call so there are no surprises.',
  },
  {
    q: 'Can you build the agency-of-agencies / sub-account / white-label feature?',
    a: 'Yes, but it\'s a real build, not a checkbox. The white-label / multi-tenant feature is HighLevel\'s actual moat (most of their other features are commodity). Building a clean version takes 6-10 weeks on top of the core platform. We typically scope this as a Phase 2 once your core platform is shipping value.',
  },
  {
    q: 'Will the AI work as well as ChatGPT or Claude directly?',
    a: 'Better, for your use case. Direct ChatGPT/Claude doesn\'t know your customers, your products, your sales playbook, or your brand voice. Our ACI integration grounds the AI in YOUR data with audit-trail-complete responses. For raw frontier-model capability, you\'re still using Anthropic Claude underneath. We don\'t downgrade to GPT-4o-mini like HighLevel does.',
  },
  {
    q: 'What if I decide to switch back?',
    a: 'Data exports cleanly in open formats (JSON, CSV, SQL). You can take your platform anywhere. We deliberately don\'t use proprietary lock-in tactics. We earn renewal through value, not handcuffs.',
  },
];

export default function PlatformEngineeringPage() {
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
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">Platform Engineering</Badge>
            <h1 className="heading-xl mb-6">
              Replace <span className="line-through text-gray-400">HighLevel</span> with{' '}
              <span className="gradient-text">a platform you actually own.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Custom Next.js + Supabase platforms with patented ACI AI integration. CRM, automation, funnels,
              booking, AI agents. Everything HighLevel does, plus everything HighLevel can&apos;t do, on a
              modern AI-native stack. Yours forever. No more per-location rent.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90 text-white">
                  Book a Free Discovery Call
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="#comparison">
                <Button variant="outline" size="lg">
                  See the Comparison
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-red-100 text-red-700 border-red-300">The HighLevel Tax</Badge>
            <h2 className="heading-lg mb-4">Why agencies finally walk away</h2>
            <p className="text-gray-600">
              You&apos;re not the only one tired of it. Every agency we&apos;ve helped migrate had the same
              four complaints.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {painPoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 h-full border-red-100 bg-red-50/30">
                  <h3 className="font-semibold text-gray-900 mb-2">{point.title}</h3>
                  <p className="text-sm text-gray-700">{point.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON CHART */}
      <section id="comparison" className="section bg-[#f8f9fc]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">Head to Head</Badge>
            <h2 className="heading-lg mb-4">
              HighLevel <span className="text-gray-400">vs</span>{' '}
              <span className="gradient-text">Custom WDP365 Platform</span>
            </h2>
            <p className="text-gray-600">
              We don&apos;t hide the one thing HighLevel does better. Everything else, we crush.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto overflow-x-auto"
          >
            <table className="w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-gradient-to-r from-[#8734E1]/10 to-[#2F73EE]/10">
                  <th className="text-left p-4 text-sm font-semibold text-gray-900">Feature</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">HighLevel</th>
                  <th className="text-left p-4 text-sm font-semibold text-[#8734E1]">WDP365 Custom Platform</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}
                  >
                    <td className="p-4 text-sm font-medium text-gray-900 border-t border-gray-100">
                      {row.feature}
                    </td>
                    <td className="p-4 text-sm text-gray-600 border-t border-gray-100">
                      <div className="flex items-start gap-2">
                        {row.advantage === 'highlevel' ? (
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        )}
                        <span>{row.highlevel}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-900 border-t border-gray-100">
                      <div className="flex items-start gap-2">
                        {row.advantage === 'wdp' ? (
                          <Check className="w-4 h-4 text-[#8734E1] flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        )}
                        <span className="font-medium">{row.wdp}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <p className="text-center text-sm text-gray-500 mt-6 max-w-2xl mx-auto">
            Honest disclosure: HighLevel&apos;s mature multi-tenant agency-of-agencies feature is genuinely
            their moat. We can build it, but it&apos;s a real engagement, not a checkbox. Every other line
            on this chart is where modern stack + patented AI architecture beats legacy hands down.
          </p>
        </div>
      </section>

      {/* INTERACTIVE FEATURE COMPARISON */}
      <HighLevelDemo />

      {/* MODULES */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">The Modules</Badge>
            <h2 className="heading-lg mb-4">
              Everything HighLevel does. <span className="gradient-text">Built modern.</span>
            </h2>
            <p className="text-gray-600">
              Eight production modules. Built on the modern Next.js 16 + Supabase + Vercel Edge stack with
              patented ACI AI layered through every interaction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {modules.map((module, i) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg hover:border-[#8734E1] transition-all">
                    <div className="mb-4">
                      <GlassIcon Icon={Icon} color={module.color} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{module.title}</h3>
                    <p className="text-sm text-gray-600">{module.body}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ACI DIFFERENTIATORS */}
      <section className="section bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#8734E1]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#2F73EE]/20 rounded-full blur-3xl" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-[#8734E1]/30 text-white border-[#8734E1]/50">The ACI Difference</Badge>
            <h2 className="heading-lg mb-4 text-white">
              No hallucination. <span className="bg-gradient-to-r from-[#BF5DE0] to-[#2F73EE] bg-clip-text text-transparent">No drift.</span> Always human.
            </h2>
            <p className="text-white/80">
              Our platforms run on the patented ACI (Adaptive Compound Intelligence) architecture,
              the same federal-grade discipline we apply to government acquisition contracts, now powering
              your customer comms.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {aciDifferentiators.map((diff, i) => {
              const Icon = diff.icon;
              return (
                <motion.div
                  key={diff.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 h-full">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8734E1] to-[#2F73EE] flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{diff.title}</h3>
                    <p className="text-xs text-white/70 leading-relaxed">{diff.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="text-center text-sm text-white/60 mt-8 max-w-2xl mx-auto">
            Based on U.S. provisional patent #63/987,765, Adaptive Compound Intelligence architecture.
          </p>
        </div>
      </section>

      {/* TROJAN HORSE / MODULAR STRATEGY */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">The Modular Path</Badge>
              <h2 className="heading-lg mb-4">
                Start with <span className="gradient-text">one module.</span> Grow into the whole platform.
              </h2>
              <p className="text-gray-600">
                You don&apos;t need to migrate everything at once. Buy the module that solves your biggest pain
                (CRM, automation, AI assistant, or funnel builder) and add the rest when ready.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: 'Start with one module',
                  body:
                    'Most common starting points: the CRM (escape HighLevel\'s contact mess), the AI assistant (replace EVIE-style wrappers), or the funnel builder (escape page-builder hell). Pick the one that hurts most.',
                },
                {
                  step: '02',
                  title: 'Layer in the rest',
                  body:
                    'As your team gets comfortable, we layer in automation, bookings, payments, reputation management, and email/SMS. Each module ships in 2-6 weeks. No big-bang migrations.',
                },
                {
                  step: '03',
                  title: 'Own the whole stack',
                  body:
                    'By the time HighLevel sends their next price increase email, you\'re fully off the platform. Running a modern stack you own, with AI that actually works, and zero per-location rent.',
                },
              ].map((s) => (
                <Card key={s.step} className="p-6 h-full">
                  <div className="text-3xl font-bold text-[#8734E1]/30 mb-2">{s.step}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600">{s.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING CTA */}
      <section className="section bg-[#f8f9fc]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-10 border-[#8734E1]/30 bg-gradient-to-br from-white to-[#f0e6fb]/30">
              <div className="text-center mb-6">
                <Badge className="mb-3 bg-[#8734E1] text-white">Pricing</Badge>
                <h2 className="heading-lg mb-3">Typical engagement size</h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                  Platform engagements span our Pro through ACI-Powered tiers, depending on scope.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-white rounded-xl p-5 border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Single-Module Build</p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">$30,000+</p>
                  <p className="text-xs text-gray-600">e.g. CRM only, or AI assistant only, or funnel builder only</p>
                </div>
                <div className="bg-white rounded-xl p-5 border-2 border-[#8734E1] shadow-md relative">
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8734E1] text-white text-xs">
                    Most Common
                  </Badge>
                  <p className="text-sm text-gray-500 mb-1">Multi-Module Platform</p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">$50,000+</p>
                  <p className="text-xs text-gray-600">e.g. CRM + automation + bookings + AI assistant + email/SMS</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Full ACI-Powered Platform</p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">$75,000+</p>
                  <p className="text-xs text-gray-600">Full platform with custom AI agents on patented ACI architecture</p>
                </div>
              </div>

              <p className="text-center text-sm text-gray-500 mt-6">
                Plus retainer from $5,000/month for ongoing dev, support, and continuous AI improvements.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
                <Link href="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90 text-white">
                    Get a Custom Quote
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg">
                    See All Pricing Tiers
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">FAQ</Badge>
            <h2 className="heading-lg mb-4">Common questions about leaving HighLevel</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 pr-8">{faq.q}</span>
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
                          <p className="text-gray-600 leading-relaxed">{faq.a}</p>
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

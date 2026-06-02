"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles, Brain, Network, Database, ShieldCheck, Workflow } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassIcon } from '@/components/ui/glass-icon';
import CTASection from '@/components/sections/CTASection';

const layers = [
  { icon: Brain, name: 'Individual Intelligence', body: 'Cognitive profiles per user. Communication style, expertise depth, decision patterns. The AI adapts to each person instead of one-size-fits-all.', color: '#8734E1' },
  { icon: Database, name: 'Knowledge Extraction', body: 'Conversations and documents converted into structured insights and stored in organizational memory. Captured at the turn level, not waiting on compaction events.', color: '#2F73EE' },
  { icon: Network, name: 'Organizational Memory', body: 'Shared, permission-gated knowledge with semantic search. Every team interaction makes the system smarter for everyone with appropriate access.', color: '#EC4899' },
  { icon: Workflow, name: 'Compound Reasoning', body: 'Cross-user pattern detection. Heartbeat scans for drift, contradictions, opportunities. Proactive intelligence instead of reactive answers.', color: '#F59E0B' },
  { icon: ShieldCheck, name: 'Permission + Delivery', body: 'RBAC at every layer. Multi-channel delivery (chat, email, in-app, webhooks). Consent-first, audit-trail-complete. Federal-grade compliance.', color: '#10B981' },
];

const claims = [
  { name: 'No hallucination', body: 'Every response grounded in workspace state, methodology library, or cited federal source. If it does not know, it says so.' },
  { name: 'No drift', body: 'Context-bound architecture. The AI cannot wander off the workspace state. Every exchange anchored.' },
  { name: 'Always human-in-the-loop', body: 'Adaptive escalation. Auto-approve only what is pre-authorized. Everything else surfaces for sign-off.' },
  { name: 'Audit-trail-complete', body: 'Every decision, input, AI response, and action recorded and exportable. Protest-defensible.' },
  { name: 'Methodology-bound', body: 'AI operates within published, citable methodology. Not vibes. Verifiable doctrine.' },
];

const faqs = [
  {
    q: 'What does the ACI patent actually cover?',
    a: 'U.S. provisional patent #63/987,765 (with non-provisional utility filed Feb 26, 2026) covers the 5-layer Adaptive Compound Intelligence architecture: Individual Intelligence, Knowledge Extraction, Organizational Memory, Compound Reasoning, and Permission + Delivery. The patent treats this as a single integrated system where each layer feeds the next. Commercial embodiments include Aetherios (commercial Company OS), Acumen-7 (federal procurement), MarqetCore (real estate), and the customer-facing applications we ship for clients.',
  },
  {
    q: 'How is ACI different from "RAG" or "agentic AI" terms I have heard?',
    a: 'RAG (Retrieval Augmented Generation) is one technique. Agentic AI is a behavior pattern. ACI is an architectural framework that combines them with cognitive profiles, organizational memory, and federal-grade compliance disciplines. You can implement ACI using RAG and agentic patterns internally, but the patent claim is the integrated 5-layer system, not any single technique.',
  },
  {
    q: 'Do you license ACI to other companies?',
    a: 'Yes, under partnership terms. The patent is held by Lucid Tech LLC. ACI is licensed for commercial deployment through partnership agreements that include audit-trail disciplines and brand-mention requirements. Talk to us if you have a vertical application in mind.',
  },
  {
    q: 'Can I get ACI without the full ACI-Powered tier?',
    a: 'The ACI architecture underlies AI work we ship at every tier. The dedicated ACI-Powered tier ($75K+) is for engagements that explicitly require the full audit-trail-complete, methodology-bound, human-in-the-loop discipline (regulated industries, federal-adjacent buyers, compliance-critical applications). Smaller engagements still benefit from the architecture, just without the full compliance scope.',
  },
  {
    q: 'How does ACI handle data privacy?',
    a: 'ACI is designed permission-first. Each layer respects role-based access. No data leaks across roles, agencies, tenants, or contracts. Customer data trains YOUR ACI instance only, never cross-bleeds to ours or anyone else\'s. Audit trails are tenant-scoped. The architecture was built with regulated-industry deployment in mind from day one.',
  },
];

export default function AciPlatformPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#8734E1]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#2F73EE]/20 rounded-full blur-3xl" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-[#8734E1]/30 text-white border-[#8734E1]/50">The ACI Platform</Badge>
            <h1 className="heading-xl mb-6 text-white">Patented AI architecture. <span className="bg-gradient-to-r from-[#BF5DE0] to-[#2F73EE] bg-clip-text text-transparent">Five layers. One engine.</span></h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Adaptive Compound Intelligence is the patented AI architecture underlying every AI system we
              ship. U.S. provisional patent #63/987,765. Five layers that combine to deliver no hallucination,
              no drift, always human-in-the-loop, audit-trail-complete, and methodology-bound AI.
            </p>
            <Link href="/contact?topic=aci-platform">
              <Button size="lg" className="bg-white text-[#8734E1] hover:bg-white/90">
                Talk to Us About ACI <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-xs text-white/60 mt-4">U.S. Provisional Patent #63/987,765 — Adaptive Compound Intelligence Architecture</p>
          </motion.div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">The Five Layers</Badge>
            <h2 className="heading-lg mb-4">How <span className="gradient-text">ACI works.</span></h2>
            <p className="text-gray-600">Each layer feeds the next. Together they produce AI that is not just smart but also trustworthy, traceable, and bounded.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {layers.map((l, i) => {
              const Icon = l.icon;
              return (
                <motion.div key={l.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Card className="p-5 h-full hover:shadow-lg transition-all">
                    <div className="mb-3">
                      <GlassIcon Icon={Icon} color={l.color} size="w-12 h-12" iconSize="w-6 h-6" />
                    </div>
                    <div className="text-xs text-gray-400 font-mono mb-1">Layer {i + 1}</div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">{l.name}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{l.body}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-[#f8f9fc]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">What ACI Guarantees</Badge>
            <h2 className="heading-lg mb-4">Five disciplines, <span className="gradient-text">all the time.</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {claims.map((c, i) => (
              <motion.div key={c.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="p-5 h-full hover:shadow-lg transition-all">
                  <Sparkles className="w-6 h-6 text-[#8734E1] mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">{c.name}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{c.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">FAQ</Badge>
            <h2 className="heading-lg mb-4">ACI questions</h2>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-gray-900 pr-8">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#8734E1] transition-transform duration-300 flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <div className="px-6 pb-5"><p className="text-gray-600 leading-relaxed">{faq.a}</p></div>
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

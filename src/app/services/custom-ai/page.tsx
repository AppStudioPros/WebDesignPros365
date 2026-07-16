"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Bot, ChevronDown, Workflow, FileSearch, Shield, Layers, Database, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassIcon } from '@/components/ui/glass-icon';
import CTASection from '@/components/sections/CTASection';

const useCases = [
  {
    icon: Workflow,
    title: 'Agentic workflows',
    body: 'AI agents that DO work. Draft proposals, send replies (with approval), update CRM records, schedule follow-ups, call APIs. Not just answer questions.',
    color: '#8734E1',
  },
  {
    icon: FileSearch,
    title: 'Document intelligence',
    body: 'Upload contracts, RFPs, financial statements, inspection reports. AI extracts, summarizes, flags risks, generates negotiation language. Audit-trail-complete.',
    color: '#2F73EE',
  },
  {
    icon: Bot,
    title: 'Decision intelligence',
    body: 'Multi-dimensional scoring engines with methodology binding. The same architecture we built for federal acquisition, applied to your decision space.',
    color: '#EC4899',
  },
  {
    icon: Database,
    title: 'Vector + RAG systems',
    body: 'Semantic search across your knowledge base. Customer comms, internal wikis, support tickets, product docs. Grounded retrieval, no hallucination.',
    color: '#F59E0B',
  },
  {
    icon: Layers,
    title: 'Vertical AI products',
    body: 'Industry-specific AI built on the ACI architecture. Real estate, legal, healthcare, fintech, federal procurement. We have shipped in five verticals.',
    color: '#10B981',
  },
  {
    icon: Shield,
    title: 'Compliance-grade AI',
    body: 'For regulated industries. HIPAA-conscious patterns. Federal-grade audit trails. SOC 2-ready architectures. Patent-anchored ACI underneath.',
    color: '#BF5DE0',
  },
];

const faqs = [
  {
    q: 'How is this different from "just use ChatGPT"?',
    a: 'Direct ChatGPT does not know your customers, your products, your sales playbook, or your brand voice. It also has no audit trail, no methodology binding, and no permission gating. Custom AI built on the ACI architecture grounds the AI in YOUR data, logs every decision, and stays within your published methodology. Federal-grade discipline applied to commercial use.',
  },
  {
    q: 'What is ACI and why does it matter?',
    a: 'ACI (Adaptive Compound Intelligence) is our patented 5-layer architecture under everything we ship. The five layers: Individual Intelligence, Knowledge Extraction, Organizational Memory, Compound Reasoning, and Permission + Delivery. The result is AI with audit-trail-complete responses, methodology binding, and human-in-the-loop guarantees. Wrappers cannot do this.',
  },
  {
    q: 'Can you build on top of OpenAI / Claude / Gemini APIs?',
    a: 'Yes. Our default is Anthropic Claude because the audit-trail and methodology-binding patterns work cleanly with it. We also build on OpenAI, Google Gemini, and open-source models when the engagement calls for it. The ACI layer sits ABOVE the model, so the model is swappable.',
  },
  {
    q: 'What does a custom AI project cost?',
    a: 'Typical engagements run $30K to $150K depending on scope. A focused single-purpose agent (document analyzer, chatbot with workflow) sits at the lower end. A multi-agent platform with custom UI and integrations sits higher. Larger ACI-Powered builds start at $75K. We scope every project in a free discovery call before quoting.',
  },
  {
    q: 'Do you do AI strategy consulting separately?',
    a: 'Yes, for clients who want strategic guidance without a full build. We charge for time when the deliverable is an audit, a roadmap, or a strategy memo. When it converts into a build, the strategy fee credits against the build fee.',
  },
];

export default function CustomAiPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-[#1a1930] to-[#1e2030]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">Custom AI Applications</Badge>
            <h1 className="heading-xl mb-6">AI that does work, <span className="gradient-text">not just answers questions.</span></h1>
            <p className="text-lg md:text-xl text-[#a8a4c8] max-w-3xl mx-auto mb-8">
              We build production AI applications on the patented ACI platform. Agentic workflows, document
              intelligence, decision engines, vector + RAG systems. Audit-trail-complete and grounded in your
              data, not a wrapper over commodity LLMs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact?topic=custom-ai">
                <Button size="lg" className="bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90 text-white">
                  Book a Discovery Call <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/services/aci-platform">
                <Button variant="outline" size="lg">Learn about ACI</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">Use Cases</Badge>
            <h2 className="heading-lg mb-4">Six shapes <span className="gradient-text">we ship most.</span></h2>
            <p className="text-[#a8a4c8]">Every project is custom, but most fit one of these patterns. If yours does not, we will tell you on the call.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {useCases.map((u, i) => {
              const Icon = u.icon;
              return (
                <motion.div key={u.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Card className="p-6 h-full hover:shadow-lg hover:border-[#8734E1] transition-all">
                    <div className="mb-4">
                      <GlassIcon Icon={Icon} color={u.color} />
                    </div>
                    <h3 className="font-semibold text-[#f0eef8] mb-2">{u.title}</h3>
                    <p className="text-sm text-[#a8a4c8] leading-relaxed">{u.body}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center">
            <Sparkles className="w-12 h-12 text-[#BF5DE0] mx-auto mb-4" />
            <h2 className="heading-lg mb-4 text-white">No hallucination. No drift. Always human.</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Every custom AI we ship inherits the ACI discipline. Patented architecture, audit-trail-complete
              responses, methodology binding, human-in-the-loop by default. The same discipline applied to
              federal acquisition contracts.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section bg-[#252640]">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">FAQ</Badge>
            <h2 className="heading-lg mb-4">Common questions</h2>
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

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Users, Sparkles, Code2, Layers, Cpu, GitBranch, Workflow, Globe2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CTASection from '@/components/sections/CTASection';

const values = [
  {
    title: 'Modern by default',
    description:
      'We use the current generation of web tools (Next.js 16, React 19, Vercel Edge, Sanity, Supabase) instead of whatever was popular three years ago. The same applies to our AI work, which runs on the patented ACI platform.',
  },
  {
    title: 'Honest about scope',
    description:
      "If something will be hard, we say so up front. If something will not work, we say that too. You will never get a quote that quietly grows by 40% mid-project.",
  },
  {
    title: 'Quality before launch',
    description:
      "We do not cut corners. Every project goes through technical review, accessibility audit, performance testing, and a real QA pass before it ships.",
  },
  {
    title: 'No surprises',
    description:
      "Clear communication, honest pricing, weekly updates. You always know where your project stands and what it costs.",
  },
];

const highlights = [
  '2000+ projects delivered',
  '98% client satisfaction',
  'Next.js 16 + React 19',
  'ACI-Powered AI integration',
  'Full AI Visibility Stack (SEO + AEO + GEO)',
  'Sanity CMS experts',
  'Federal contractor experience',
  'Denver-based, working globally',
];

type Person = {
  name: string;
  role: string;
  bio: string;
  highlights: string[];
};

const team: Person[] = [
  {
    name: 'Corey Strange',
    role: 'Founder & CTO',
    bio: "Corey has been in the full-circle technical space for almost 30 years, including running the #1-rated independent IT company in Denver, CO for 26+ years. Full-stack developer and web designer since 2005. Top 1% cohort at Oxford AI University. Today he serves as Chief AI Officer and Chief Technology Officer for a federal contracting company, where he architects AI systems for government acquisition workflows. He is also the named inventor on the parent ACI (Adaptive Compound Intelligence) patent, which underlies our flagship ACI-Powered service tier.",
    highlights: [
      'Founder of Web Design Pros 365 (2005)',
      'Inventor, ACI (Adaptive Compound Intelligence) patent',
      'CAO + CTO of an SDVOSB federal contracting partner',
      'Architect on every Lucid Tech production system',
    ],
  },
  {
    name: 'Kelsi Strange',
    role: 'Design Lead',
    bio: "Kelsi heads our design practice. She owns brand systems, visual identity, certification mark design, and the human-feel layer across every site we ship. She is the reason our work does not look like every other Next.js agency portfolio. When she is not on a build, she is mentoring on visual systems and conversion-focused UX.",
    highlights: [
      'Design Lead, Web Design Pros 365',
      'Brand systems + visual identity',
      'Certification mark and badge design',
      'Conversion-focused UX',
    ],
  },
  {
    name: 'William Mocas',
    role: 'Strategic Partnerships',
    bio: 'William runs strategic partnerships and channel relationships. With a background in enterprise sales and federal acquisition, he is the connection point between our engineering team and the agencies, contractors, and resellers we work with. He owns the channel-partner program and the federal-contractor partnership track.',
    highlights: [
      'Strategic Partnerships + Channel',
      'Enterprise sales + federal acquisition background',
      'Owns federal contractor partnership track',
      'Connects engineering with channel resellers',
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f9fc]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">About Us</Badge>
            <h1 className="heading-xl mb-6 max-w-2xl mx-auto leading-tight">
              Web design that <span className="gradient-text">does the work.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A small Denver-based team shipping production websites and platforms on a modern
              stack. No theme shops, no offshore fulfillment, no &ldquo;we&rsquo;ll get back to you next month.&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* THE COMPANY */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="heading-lg mb-6">
                Why <span className="gradient-text">Web Design Pros 365</span>
              </h2>
              <p className="text-gray-600 mb-6">
                Founded in 2005, WDP365 has been the umbrella for every web project Corey
                Strange has shipped for 20+ years. Today we operate at the intersection of
                modern web engineering, applied AI, and federal-grade compliance discipline.
              </p>
              <p className="text-gray-600 mb-8">
                We are different from most agencies because we hold actual technical IP. The
                ACI (Adaptive Compound Intelligence) provisional patent, filed with the USPTO,
                underlies the AI systems we deploy for clients. That same architecture also
                runs in federal acquisition systems through our SDVOSB contracting partner,
                which means the discipline applied to your customer comms is the same we apply
                to government acquisition workflows.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#f0e6fb] flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-[#8734E1]" />
                    </div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Compact logo card, top-aligned with the heading */}
              <div className="rounded-2xl bg-gradient-to-br from-[#8734E1] to-[#2F73EE] p-0.5 max-w-[280px] mx-auto lg:mx-0">
                <div className="rounded-2xl bg-white flex items-center justify-center p-8 aspect-[4/3]">
                  <img
                    src="https://customer-assets.emergentagent.com/job_designpros-test/artifacts/tf1dbj7e_Web%20Design%20Pros%20365%20noborder.png"
                    alt="Web Design Pros 365"
                    className="max-w-full h-auto"
                  />
                </div>
                <div className="text-center text-xs text-gray-500 mt-3">
                  Denver, Colorado · Est. 2005
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEDERAL CONNECTION */}
      <section className="section bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#8734E1]/20 rounded-full blur-3xl" />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-[#8734E1]/30 text-white border-[#8734E1]/50">
                Federal Contractor Connection
              </Badge>
              <h2 className="heading-lg mb-4 text-white">
                The same discipline,{' '}
                <span className="bg-gradient-to-r from-[#BF5DE0] to-[#2F73EE] bg-clip-text text-transparent">
                  applied commercially.
                </span>
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Corey serves as Chief AI Officer and CTO for an SDVOSB-verified federal
                contracting partner. The AI architecture you get through Web Design Pros 365
                is the same architecture being deployed for federal acquisition workflows.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                <ShieldCheck className="w-8 h-8 text-[#BF5DE0] mb-3" />
                <h3 className="font-semibold text-white mb-2">Federal-grade compliance</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Audit-trail-complete AI. Every decision traceable. Built to survive a GAO
                  protest, so your customer comms are bulletproof too.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                <Sparkles className="w-8 h-8 text-[#BF5DE0] mb-3" />
                <h3 className="font-semibold text-white mb-2">Patented architecture</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Our ACI patent covers a 5-layer Adaptive Compound Intelligence stack.
                  Filed U.S. provisional patent. Real IP under the hood, not a wrapper.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                <Users className="w-8 h-8 text-[#BF5DE0] mb-3" />
                <h3 className="font-semibold text-white mb-2">Same AI, both worlds</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  The same Acumen-7 reasoning engine that powers federal acquisition systems
                  also runs your CRM, your chatbot, your marketing automation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">The Team</Badge>
            <h2 className="heading-lg">
              The people <span className="gradient-text">building it.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {team.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8734E1] to-[#2F73EE] flex items-center justify-center text-white text-xl font-bold mb-3">
                      {person.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
                    <p className="text-sm text-[#8734E1] font-medium">{person.role}</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{person.bio}</p>
                  <ul className="space-y-2 pt-4 border-t border-gray-100">
                    {person.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs text-gray-700">
                        <div className="w-4 h-4 rounded-full bg-[#f0e6fb] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#8734E1]" />
                        </div>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* 4th card — horizontal extended team card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="max-w-6xl mx-auto mt-6"
          >
            <Card className="p-8 hover:shadow-lg transition-shadow relative overflow-hidden">
              {/* Subtle gradient accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8734E1]/5 via-transparent to-[#2F73EE]/5 pointer-events-none" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-start">
                {/* Left: badge cluster */}
                <div className="flex flex-col items-start gap-3 lg:max-w-[200px]">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8734E1] to-[#2F73EE] flex items-center justify-center text-white">
                      <Users className="w-7 h-7" strokeWidth={1.75} />
                    </div>
                    <div>
                      <div className="text-3xl font-bold gradient-text leading-none">25+</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Builders</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                    Full Stack AI &amp; <span className="gradient-text">Development Team</span>
                  </h3>
                  <p className="text-xs text-[#8734E1] font-medium">The bench behind every build</p>
                </div>

                {/* Right: description + capability chips */}
                <div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    Beyond the leadership trio, WDP365 operates with a deep bench of seasoned full-stack
                    engineers, AI specialists, designers, and DevOps professionals. Senior-level talent
                    across frontend, backend, AI integration, data engineering, infrastructure, and design.
                    Every project draws from this team based on what the work actually needs.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { icon: Code2, label: 'Full-stack engineering' },
                      { icon: Cpu, label: 'AI / ML integration' },
                      { icon: Layers, label: 'Frontend + UX' },
                      { icon: GitBranch, label: 'DevOps + CI/CD' },
                      { icon: Workflow, label: 'Data + automation' },
                      { icon: Globe2, label: 'Global delivery' },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-7 h-7 rounded-lg bg-[#f0e6fb] flex items-center justify-center flex-shrink-0">
                            <Icon className="w-3.5 h-3.5 text-[#8734E1]" strokeWidth={1.75} />
                          </div>
                          <span>{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section bg-[#f8f9fc]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">Our Values</Badge>
            <h2 className="heading-lg">
              How we <span className="gradient-text">actually work.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

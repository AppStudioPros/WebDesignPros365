"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2, ArrowRight, Zap, Globe, Shield, BarChart3,
  Bot, BookOpen, Cookie, Lock, Calendar, Users, Mail,
  Calculator, FileText, Star, ExternalLink, Building2,
  TrendingUp, Award, Clock, Infinity
} from 'lucide-react';

const INCLUDED_FEATURES = [
  { icon: Globe, label: "1–5 custom pages (Next.js 16 + Vercel)", desc: "The same tech stack used by Fortune 500 companies" },
  { icon: Users, label: "Professional design — headshot, bio, contact card, team", desc: "Built to convert borrowers and impress referral partners" },
  { icon: TrendingUp, label: "CTAs built to close — pre-approvals, consults, rate inquiries", desc: "Every button and form optimized for lead capture" },
  { icon: BookOpen, label: "Blog page (client-managed CMS)", desc: "Post rate updates and market insights yourself" },
  { icon: Bot, label: "AI chat bot — trained on your programs and FAQs", desc: "Answers borrower questions 24/7 without you lifting a finger" },
  { icon: FileText, label: "FAQ card section", desc: "Structured to appear in AI search answers and voice results" },
  { icon: BarChart3, label: "Admin tracking panel", desc: "See who visited, what they clicked, where they came from" },
  { icon: Shield, label: "SSL, security headers, CSP — included", desc: "Bank-grade security out of the box" },
  { icon: Cookie, label: "Cookie consent banner (CCPA / GDPR compliant)", desc: "Required for compliance in most states" },
  { icon: FileText, label: "Terms of Service + Privacy Policy pages", desc: "Pre-written, compliant, ready to go" },
  { icon: Lock, label: "NMLS licensing disclosure and compliance footer", desc: "Auto-formatted, state-aware" },
];

const AI_FEATURES = [
  { label: "Technical SEO", desc: "Structured data, schema markup, Core Web Vitals, sitemap, robots.txt — the foundation AI needs to index and trust you" },
  { label: "AEO — Answer Engine Optimization", desc: "Content structured so AI Overviews, Siri, and voice search select YOUR answers when borrowers ask mortgage questions" },
  { label: "GEO — Generative Engine Optimization", desc: "Brand citation optimization so ChatGPT, Claude, Perplexity, and Gemini name you when someone asks for a loan officer in your market" },
];

const ADD_ONS = [
  {
    category: "Scheduling + Calendar",
    items: [
      "Calendly embed or custom booking system",
      "Google Calendar sync",
      "Outlook / Microsoft 365 calendar integration",
      "Automated appointment confirmations and reminders (email + SMS)",
    ]
  },
  {
    category: "CRM Connections",
    items: [
      "ARIVE (Loan Origination System) — lead sync + pipeline visibility",
      "Total Expert CRM integration",
      "Jungo (Salesforce-based mortgage CRM) connector",
      "BNTouch CRM lead routing",
      "Surefire CRM marketing automation",
      "Velocify lead distribution",
      "MLOFLO pipeline sync",
    ]
  },
  {
    category: "Lead Capture + Qualification",
    items: [
      "Mortgage calculator (purchase, refinance, payment estimator)",
      "Pre-approval request form with CRM routing",
      "Home affordability calculator",
      "Refinance savings estimator",
      "Rate inquiry form with lead scoring",
    ]
  },
  {
    category: "Communication + Marketing",
    items: [
      "BombBomb video email embed",
      "Mailchimp or ActiveCampaign list capture",
      "SMS opt-in form",
      "Automated follow-up sequences (email + SMS) for new inquiries",
    ]
  },
  {
    category: "Realtor Partner Tools",
    items: [
      "Mortgage Coach presentation embed",
      "Floify POS borrower portal link",
      "Co-branding pages for Realtor partnerships",
      "Open house lead capture landing pages",
    ]
  },
  {
    category: "Analytics + Compliance",
    items: [
      "Google Analytics 4 + custom conversion tracking",
      "Lead source attribution dashboard",
      "Heatmap integration",
      "Monthly performance report automation",
      "Equal Housing Lender badge and state disclosures",
      "Rate disclaimer automation",
    ]
  },
];

const GROWTHPILOT_FEATURES = [
  { icon: Zap, label: "One post. Nine networks.", desc: "Write once. AABOS rewrites it for LinkedIn, Instagram, X, Facebook, YouTube, TikTok, Pinterest, Google Business, and Reddit — each version matches the platform and your voice." },
  { icon: Bot, label: "AABOS AI — your brand voice, permanently.", desc: "AABOS scrapes your site and builds a living Brand Soul. Every post makes it sharper. After 90 days, no competitor can replicate what you have." },
  { icon: Mail, label: "Email + CRM + Invoicing. One login.", desc: "Newsletter broadcasting, drip sequences, contact pipeline, proposals, and invoicing. No more Mailchimp + HubSpot + FreshBooks stacked on top of each other." },
  { icon: Infinity, label: "Multi-brand. Enterprise scale.", desc: "Run multiple brands, locations, or clients. Each gets its own AI, voice, and content history. Add brands for $14.99/mo." },
];

export default function PartnerProgramPage() {
  const [companyName, setCompanyName] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleUnlock = () => {
    if (companyName.trim().length < 2) {
      setError('Please enter your parent company name to continue.');
      return;
    }
    setError('');
    setUnlocked(true);
    setTimeout(() => {
      document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#1e2030]">

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1930] to-[#1e2030]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#8734E1]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container-custom relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8734E1]/20 border border-[#8734E1]/40 text-[#c084fc] text-sm font-medium mb-6">
            <Building2 className="w-4 h-4" />
            Exclusive Partner Offer
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#f0eef8] mb-6 leading-tight">
            Your website should be{' '}
            <span className="gradient-text">working harder than you are.</span>
          </h1>
          <p className="text-lg text-[#a8a4c8] max-w-2xl mx-auto mb-4">
            As a loan officer with one of our partner companies, you qualify for an exclusive package
            — a professionally built, AI-optimized website at a price that should not exist.
          </p>
          <p className="text-base text-[#8a87a8] max-w-xl mx-auto mb-10">
            70–80% of borrowers in finance are now using AI to find and vet professionals before
            making contact. The LO who shows up in those results closes the deal.
            The one who does not may never know they lost it.
          </p>

          {/* Gate */}
          {!unlocked ? (
            <div className="bg-[#252640] border border-[#3a3858] rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-[#f0eef8] font-semibold mb-2">Verify your partner access</p>
              <p className="text-sm text-[#8a87a8] mb-5">Enter your parent company name to unlock the offer.</p>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                placeholder="Parent company name"
                className="w-full px-4 py-3 rounded-xl bg-[#1c1d30] border border-[#3a3858] text-[#f0eef8] placeholder:text-[#6e6b88] mb-3 focus:outline-none focus:border-[#8734E1] transition-colors"
              />
              {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
              <button
                onClick={handleUnlock}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8734E1] to-[#2F73EE] text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Unlock Offer <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-medium">
              <CheckCircle2 className="w-5 h-5" />
              Access unlocked — welcome, {companyName} partner
            </div>
          )}
        </div>
      </section>

      {/* Offer — shown after unlock */}
      {unlocked && (
        <>
          {/* Pricing */}
          <section id="offer" className="section bg-[#1a1b2e] py-20">
            <div className="container-custom max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-[#a8a4c8] text-sm uppercase tracking-widest mb-2">Partner Exclusive</p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#f0eef8]">Everything you need. One price.</h2>
              </div>

              <div className="bg-[#252640] border-2 border-[#8734E1]/50 rounded-2xl overflow-hidden shadow-2xl shadow-[#8734E1]/10">
                {/* Price header */}
                <div className="bg-gradient-to-r from-[#8734E1]/20 to-[#2F73EE]/20 border-b border-[#3a3858] p-8 text-center">
                  <div className="inline-block px-4 py-1 rounded-full bg-[#8734E1] text-white text-xs font-bold uppercase tracking-widest mb-4">
                    Partner Price
                  </div>
                  <div className="flex items-baseline justify-center gap-3 mb-2">
                    <span className="text-6xl font-black text-[#f0eef8]">$1,999<span className="text-3xl">.99</span></span>
                    <span className="text-[#8a87a8] text-sm">one time</span>
                  </div>
                  <p className="text-[#8a87a8] mb-4">
                    <span className="line-through text-[#6e6b88]">Normally $9,599.97</span>
                    {' '}
                    <span className="text-emerald-400 font-semibold">— you save $7,599.99</span>
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-[#a8a4c8]">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" />Custom Next.js website build</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" />3 months daily SEO + AEO + GEO</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" />Everything listed below</span>
                  </div>
                </div>

                {/* Savings breakdown */}
                <div className="p-6 border-b border-[#3a3858]">
                  <p className="text-xs uppercase tracking-widest text-[#8a87a8] mb-4">What this package normally costs</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-[#c4c0e0]">
                      <span>Custom Next.js website build (1–5 pages)</span>
                      <span className="text-[#8a87a8]">$7,500.00</span>
                    </div>
                    <div className="flex justify-between text-[#c4c0e0]">
                      <span>Daily SEO + AEO + GEO optimization × 3 months</span>
                      <span className="text-[#8a87a8]">$2,099.97</span>
                    </div>
                    <div className="flex justify-between text-[#f0eef8] font-semibold border-t border-[#3a3858] pt-2 mt-2">
                      <span>Normal total</span>
                      <span className="line-through text-[#6e6b88]">$9,599.97</span>
                    </div>
                    <div className="flex justify-between text-emerald-400 font-bold text-base">
                      <span>Your partner price</span>
                      <span>$1,999.99</span>
                    </div>
                  </div>
                </div>

                {/* Ongoing */}
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-[#8a87a8] mb-4">After your 3 months</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 bg-[#1e2030] rounded-xl p-4 border border-[#3a3858]">
                      <p className="text-[#f0eef8] font-bold text-xl mb-1">$299<span className="text-sm text-[#8a87a8] font-normal">/month</span></p>
                      <p className="text-xs text-[#8a87a8]">Ongoing daily optimization — partner rate</p>
                      <p className="text-xs text-[#6e6b88] mt-1">(Normal: $699.99/month)</p>
                    </div>
                    <div className="flex-1 bg-[#1e1c35] rounded-xl p-4 border border-[#8734E1]/30">
                      <p className="text-[#c084fc] font-bold text-base mb-1">Lock in for the rest of the year</p>
                      <p className="text-xs text-[#8a87a8]">Pay remaining months upfront at signing or at end of month 3 — exclusive to partner LOs.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What's included */}
          <section className="section py-20 bg-[#1e2030]">
            <div className="container-custom max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#f0eef8] mb-3">Everything that comes with your build</h2>
                <p className="text-[#a8a4c8]">No templates. No shortcuts. A real site built the way enterprise companies build.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INCLUDED_FEATURES.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.label} className="flex gap-4 p-4 bg-[#252640] rounded-xl border border-[#3a3858]">
                      <div className="w-9 h-9 rounded-lg bg-[#8734E1]/20 border border-[#8734E1]/30 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-[#c084fc]" />
                      </div>
                      <div>
                        <p className="text-[#f0eef8] font-medium text-sm">{f.label}</p>
                        <p className="text-[#8a87a8] text-xs mt-0.5">{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* AI Visibility Stack */}
              <div className="mt-8 bg-gradient-to-br from-[#1e1c35] to-[#252640] border border-[#8734E1]/30 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#8734E1]/20 border border-[#8734E1]/30 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#c084fc]" />
                  </div>
                  <div>
                    <p className="text-[#f0eef8] font-bold">AI Visibility Stack — 3 Months Daily</p>
                    <p className="text-xs text-[#8a87a8]">Not monthly. Not weekly. Daily.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {AI_FEATURES.map((f) => (
                    <div key={f.label} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#8734E1] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[#f0eef8] font-semibold text-sm">{f.label}</p>
                        <p className="text-[#8a87a8] text-sm">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* AI is choosing winners */}
          <section className="py-20 bg-[#1a1b2e]">
            <div className="container-custom max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2F73EE]/20 border border-[#2F73EE]/40 text-[#60a5fa] text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4" />
                The Market Reality
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#f0eef8] mb-6 leading-tight">
                70–80% of borrowers in finance are using AI to find and vet their next loan officer.
                <span className="gradient-text"> Right now.</span>
              </h2>
              <p className="text-lg text-[#a8a4c8] mb-10 max-w-2xl mx-auto">
                When a borrower types "best mortgage broker in Denver" into ChatGPT, Perplexity, or Google AI Overview —
                someone gets cited. Someone gets called. Someone closes the deal. That name should be yours.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  { stat: "200–400%", label: "Typical year-one ROI", sub: "Conservative estimate from organic traffic alone" },
                  { stat: "Month 6", label: "When leads start compounding", sub: "8–40 organic leads/month by mid-year" },
                  { stat: "$8–$25", label: "Cost per lead vs. paid ads", sub: "After AI visibility stack is established" },
                ].map((item) => (
                  <div key={item.stat} className="bg-[#252640] border border-[#3a3858] rounded-xl p-6">
                    <p className="text-3xl font-black gradient-text mb-1">{item.stat}</p>
                    <p className="text-[#f0eef8] font-semibold text-sm mb-1">{item.label}</p>
                    <p className="text-[#8a87a8] text-xs">{item.sub}</p>
                  </div>
                ))}
              </div>

              <blockquote className="text-2xl md:text-3xl font-bold text-[#f0eef8] border-l-4 border-[#8734E1] pl-6 text-left max-w-2xl mx-auto">
                "AI is choosing winners right this moment. Are you one of them?"
              </blockquote>
            </div>
          </section>

          {/* Add-ons */}
          <section className="section py-20 bg-[#1e2030]">
            <div className="container-custom max-w-5xl mx-auto">
              <div className="text-center mb-4">
                <h2 className="text-3xl font-bold text-[#f0eef8] mb-3">Add-on integrations</h2>
                <p className="text-[#a8a4c8] max-w-2xl mx-auto">
                  Every tool a loan officer needs, built in. One-time charge of{' '}
                  <span className="text-[#f0eef8] font-semibold">$99 to $499 depending on complexity.</span>
                  {' '}No monthly fees. Ever. You own it.
                </p>
              </div>

              <div className="bg-[#252640] border border-[#3a3858] rounded-xl px-6 py-4 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex items-center gap-2 text-[#c084fc]">
                  <Lock className="w-5 h-5" />
                  <span className="font-bold text-sm">You own everything.</span>
                </div>
                <p className="text-sm text-[#a8a4c8]">
                  No HighLevel subscriptions. No platform lock-in. If you leave your parent company tomorrow, the site goes with you.
                  Bring in your own dev team whenever you want — full documentation provided.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ADD_ONS.map((group) => (
                  <div key={group.category} className="bg-[#252640] border border-[#3a3858] rounded-xl p-6">
                    <h3 className="text-[#f0eef8] font-bold mb-4 text-sm uppercase tracking-wide">{group.category}</h3>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-[#a8a4c8]">
                          <CheckCircle2 className="w-4 h-4 text-[#8734E1] flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* GrowthPilot */}
          <section className="py-20 bg-[#1a1b2e]">
            <div className="container-custom max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8734E1]/20 border border-[#8734E1]/40 text-[#c084fc] text-sm font-medium mb-5">
                    <Award className="w-4 h-4" />
                    Partner Exclusive — 25% Off for Life
                  </div>
                  <h2 className="text-3xl font-bold text-[#f0eef8] mb-4">
                    MarqetCore GrowthPilot
                  </h2>
                  <p className="text-[#a8a4c8] mb-6">
                    The all-in-one marketing platform with a built-in business operating system.
                    AABOS learns your exact brand DNA, cross-mutates your content for 9 networks,
                    and broadcasts trackable email newsletters — all on autopilot.
                  </p>
                  <p className="text-[#8a87a8] text-sm mb-8">
                    Replaces Buffer, Mailchimp, HubSpot CRM, FreshBooks, and your social media manager.
                    Starts at $149.99/month. Your partner price: <span className="text-[#c084fc] font-semibold">25% off, for life.</span>
                  </p>
                  <Link
                    href="https://marqetcore.com/growth-pilot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8734E1] to-[#2F73EE] text-white font-semibold hover:opacity-90 transition-opacity text-sm"
                  >
                    See GrowthPilot <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
                <div className="space-y-4">
                  {GROWTHPILOT_FEATURES.map((f) => {
                    const Icon = f.icon;
                    return (
                      <div key={f.label} className="flex gap-4 p-4 bg-[#252640] rounded-xl border border-[#3a3858]">
                        <div className="w-9 h-9 rounded-lg bg-[#8734E1]/20 border border-[#8734E1]/30 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-[#c084fc]" />
                        </div>
                        <div>
                          <p className="text-[#f0eef8] font-semibold text-sm">{f.label}</p>
                          <p className="text-[#8a87a8] text-xs mt-0.5">{f.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* CTA / Contact */}
          <section className="py-20 bg-gradient-to-b from-[#1e2030] to-[#1a1930]">
            <div className="container-custom max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-[#f0eef8] mb-3">Ready to get started?</h2>
                <p className="text-[#a8a4c8]">
                  Drop your info below and we will reach out within one business day to kick off your build.
                </p>
              </div>

              {submitted ? (
                <div className="bg-[#252640] border border-emerald-500/40 rounded-2xl p-10 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-[#f0eef8] font-bold text-xl mb-2">You're in.</h3>
                  <p className="text-[#a8a4c8]">We'll reach out within one business day. Welcome to the program.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-[#252640] border border-[#3a3858] rounded-2xl p-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#8a87a8] mb-1.5 uppercase tracking-wide">Full Name</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 rounded-xl bg-[#1c1d30] border border-[#3a3858] text-[#f0eef8] placeholder:text-[#6e6b88] focus:outline-none focus:border-[#8734E1] transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#8a87a8] mb-1.5 uppercase tracking-wide">Email</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@mortgage.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#1c1d30] border border-[#3a3858] text-[#f0eef8] placeholder:text-[#6e6b88] focus:outline-none focus:border-[#8734E1] transition-colors text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#8a87a8] mb-1.5 uppercase tracking-wide">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(720) 555-0100"
                      className="w-full px-4 py-3 rounded-xl bg-[#1c1d30] border border-[#3a3858] text-[#f0eef8] placeholder:text-[#6e6b88] focus:outline-none focus:border-[#8734E1] transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#8a87a8] mb-1.5 uppercase tracking-wide">Anything else we should know?</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Your market, specific programs you offer, existing site URL if you have one..."
                      className="w-full px-4 py-3 rounded-xl bg-[#1c1d30] border border-[#3a3858] text-[#f0eef8] placeholder:text-[#6e6b88] focus:outline-none focus:border-[#8734E1] transition-colors text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8734E1] to-[#2F73EE] text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    Claim Your Partner Package <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-center text-xs text-[#6e6b88]">
                    No deposit required to start the conversation. Build begins once scope is confirmed.
                  </p>
                </form>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

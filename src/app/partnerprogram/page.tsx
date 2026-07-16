"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2, ArrowRight, Zap, Globe, Shield, BarChart3,
  Bot, BookOpen, Cookie, Lock, Calendar, Users, Mail,
  Calculator, FileText, Star, ExternalLink, Building2,
  TrendingUp, Award, Clock, Infinity, ChevronDown, ChevronUp,
  Layers, Key, MessageSquare, CreditCard
} from 'lucide-react';

const INCLUDED_FEATURES = [
  {
    icon: Globe,
    label: "1 to 5 custom pages (Next.js 16 + Vercel)",
    desc: "The same tech stack used by Fortune 500 companies",
    details: "Built on Next.js 16 App Router with React 19, TypeScript, and Tailwind CSS. Deployed on Vercel with global edge network, sub-second response times, and automatic CI/CD. Every page scores 85+ on Google Lighthouse out of the box. You get a GitHub repository with full ownership of every line of code."
  },
  {
    icon: Users,
    label: "Professional design with headshot, bio, contact card, team",
    desc: "Built to convert borrowers and impress referral partners",
    details: "Custom hero section with your photo, credentials, and NMLS number prominently placed. Bio section structured for trust signals. Team grid if needed. Every layout is mobile-first and tested for conversion. Realtors, financial planners, and builders who vet you online will see something that commands respect."
  },
  {
    icon: TrendingUp,
    label: "CTAs built to close pre-approvals, consults, rate inquiries",
    desc: "Every button and form optimized for lead capture",
    details: "Pre-approval request form, consultation scheduling, rate inquiry, and refinance interest forms all routed to your inbox or CRM. Each form is structured with the questions needed to pre-qualify intent. Lead notification emails sent instantly on every submission. Forms are RESPA-aware and non-binding by default."
  },
  {
    icon: BookOpen,
    label: "Blog page with client-managed CMS",
    desc: "Post rate updates and market insights yourself",
    details: "Powered by Sanity CMS. You log in, write a post, hit publish. No developer needed. Blog posts are SEO-structured with schema markup so they can appear in AI Overviews and Google Search. Ideal for weekly rate commentary, market updates, and first-time buyer guides that build your authority over time."
  },
  {
    icon: Bot,
    label: "AI chat bot trained on your programs and FAQs",
    desc: "Answers borrower questions 24/7 without you lifting a finger",
    details: "Custom trained on your loan programs, service areas, typical rates, process timeline, and FAQ. Handles common borrower questions, collects contact info, and routes qualified leads to you. Operates outside business hours. You define what it knows, what it says, and when it escalates to you."
  },
  {
    icon: FileText,
    label: "FAQ card section",
    desc: "Structured to appear in AI search answers and voice results",
    details: "Each FAQ answer is wrapped in FAQPage schema markup so Google and AI engines can extract and cite your answers directly in search results and AI Overviews. Questions are written to match what borrowers actually type into ChatGPT, Perplexity, and voice search. Expandable card UI, clean on mobile."
  },
  {
    icon: BarChart3,
    label: "Admin tracking panel",
    desc: "See who visited, what they clicked, where they came from",
    details: "Vercel Analytics plus custom event tracking shows you page views, conversion rates per form, lead source breakdown (organic, direct, referral), and top-performing pages. You see which Realtors visited, which loan program pages converted, and where visitors drop off. No Google Analytics account required, included in your build."
  },
  {
    icon: Shield,
    label: "SSL, security headers, CSP included",
    desc: "Bank-grade security out of the box",
    details: "HTTPS enforced globally via Vercel. Content Security Policy headers block cross-site scripting attacks. HSTS, X-Frame-Options, and Referrer-Policy configured out of the box. Your borrowers' contact data and form submissions are encrypted in transit. No extra setup, no security plugin to maintain."
  },
  {
    icon: Cookie,
    label: "Cookie consent banner (CCPA / GDPR compliant)",
    desc: "Required for compliance in most states",
    details: "Auto-blocks analytics and tracking scripts until visitor consent is given. Covers CCPA requirements for California residents and GDPR for any international traffic. Consent preferences stored per user. Dismissable, non-intrusive, and styled to match your site. Required if you run retargeting ads or use any analytics tools."
  },
  {
    icon: FileText,
    label: "Terms of Service and Privacy Policy pages",
    desc: "Pre-written, compliant, ready to go",
    details: "Attorney-reviewed templates covering data collection, use of cookies, lead form submissions, and contact information handling. Includes mortgage-specific language around NMLS disclosures, non-binding communication, and equal housing. You review and confirm before launch. Updates handled as regulations change."
  },
  {
    icon: Lock,
    label: "NMLS licensing disclosure and compliance footer",
    desc: "Auto-formatted, state-aware",
    details: "Your NMLS number, company NMLS, state licensing, and Equal Housing Lender badge formatted correctly per CFPB guidance. Appears on every page automatically. State-specific disclosure language included where required. No compliance headaches on launch day."
  },
];

const AI_FEATURES = [
  {
    label: "Technical SEO",
    desc: "Structured data, schema markup, Core Web Vitals, sitemap, robots.txt",
    details: "JSON-LD schema for your business, services, FAQ, and local market. Sitemap auto-generated and submitted to Google Search Console. Core Web Vitals maintained at 85+ Lighthouse score. robots.txt configured to allow all major AI crawlers including GPTBot, PerplexityBot, ClaudeBot, and Google-Extended. The foundation AI needs to index and trust you."
  },
  {
    label: "AEO (Answer Engine Optimization)",
    desc: "Content structured so AI Overviews and voice search select your answers",
    details: "FAQ and blog content written in the direct question-and-answer format that AI engines prefer to extract and cite. Structured to appear when borrowers ask Siri, Google Assistant, or Alexa about mortgage questions in your market. Answer length and format calibrated to citation patterns across ChatGPT, Perplexity, and Google AI Overviews."
  },
  {
    label: "GEO (Generative Engine Optimization)",
    desc: "Brand citation optimization so AI names you when borrowers search",
    details: "Active campaign to get your name cited in AI responses when someone asks 'best mortgage broker in [city]' or 'who is a good loan officer for first-time buyers in [state].' Includes brand mention seeding, authority content publication, and monthly citation audit across ChatGPT, Claude, Perplexity, and Gemini."
  },
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
      "ARIVE (Loan Origination System) lead sync and pipeline visibility",
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
      "Google Analytics 4 with custom conversion tracking",
      "Lead source attribution dashboard",
      "Heatmap integration",
      "Monthly performance report automation",
      "Equal Housing Lender badge and state disclosures",
      "Rate disclaimer automation",
    ]
  },
];

const GROWTHPILOT_FEATURES = [
  { icon: Zap, label: "One post. Nine networks.", desc: "Write once. AABOS rewrites it for LinkedIn, Instagram, X, Facebook, YouTube, TikTok, Pinterest, Google Business, and Reddit. Each version matches the platform and your voice." },
  { icon: Bot, label: "AABOS AI: your brand voice, permanently.", desc: "AABOS crawls your site and builds a living Brand Soul. Every post makes it sharper. After 90 days no competitor can replicate what you have." },
  { icon: Mail, label: "Email + CRM + Invoicing. One login.", desc: "Newsletter broadcasting, drip sequences, contact pipeline, proposals, and invoicing. No more paying for Mailchimp, HubSpot, and FreshBooks separately." },
  { icon: Infinity, label: "Multi-brand. Enterprise scale.", desc: "Run multiple brands, locations, or clients. Each gets its own AI, voice, and content history." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`bg-[#252640] rounded-xl border cursor-pointer transition-all ${open ? 'border-[#8734E1]/50' : 'border-[#3a3858] hover:border-[#8734E1]/30'}`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start justify-between gap-4 p-5">
        <p className="text-[#f0eef8] font-medium text-sm leading-snug">{q}</p>
        <span className="flex-shrink-0 text-[#6e6b88] mt-0.5">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </div>
      {open && (
        <div className="px-5 pb-5 border-t border-[#3a3858] pt-4">
          <p className="text-sm text-[#a8a4c8] leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

function FeatureCard({ feature }: { feature: typeof INCLUDED_FEATURES[0] }) {
  const [open, setOpen] = useState(false);
  const Icon = feature.icon;
  return (
    <div
      className={`bg-[#252640] rounded-xl border transition-all cursor-pointer ${open ? 'border-[#8734E1]/60' : 'border-[#3a3858] hover:border-[#8734E1]/30'}`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex gap-4 p-4 items-start">
        <div className="w-9 h-9 rounded-lg bg-[#8734E1]/20 border border-[#8734E1]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon className="w-4 h-4 text-[#c084fc]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[#f0eef8] font-medium text-sm">{feature.label}</p>
          <p className="text-[#8a87a8] text-xs mt-0.5">{feature.desc}</p>
        </div>
        <div className="flex-shrink-0 text-[#6e6b88] mt-0.5">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>
      {open && (
        <div className="px-4 pb-4 pt-0 border-t border-[#3a3858]">
          <p className="text-sm text-[#a8a4c8] leading-relaxed pt-3">{feature.details}</p>
        </div>
      )}
    </div>
  );
}

function AIFeatureCard({ feature }: { feature: typeof AI_FEATURES[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex gap-3 items-start">
        <CheckCircle2 className="w-5 h-5 text-[#8734E1] flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-[#f0eef8] font-semibold text-sm">{feature.label}</p>
            <span className="text-[#6e6b88]">{open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}</span>
          </div>
          <p className="text-[#8a87a8] text-sm">{feature.desc}</p>
          {open && (
            <p className="text-sm text-[#a8a4c8] mt-2 leading-relaxed border-l-2 border-[#8734E1]/40 pl-3">{feature.details}</p>
          )}
        </div>
      </div>
    </div>
  );
}

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
            Your website should be working{' '}
            <span className="gradient-text">as hard as you.</span>
          </h1>
          <p className="text-lg text-[#a8a4c8] max-w-2xl mx-auto mb-4">
            70-80% of your potential clients are looking for you using AI, and vetting you the same way.
            As a loan officer with one of our partner companies, you qualify for an exclusive package
            built for exactly that reality.
          </p>
          <p className="text-base text-[#8a87a8] max-w-xl mx-auto mb-10">
            The LO who shows up in AI search results closes the deal.
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
              Access unlocked. Welcome, {companyName} partner.
            </div>
          )}
        </div>
      </section>

      {/* Offer shown after unlock */}
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
                    {' '}<span className="text-emerald-400 font-semibold">you save $7,599.99</span>
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-[#a8a4c8]">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" />Custom Next.js website build</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" />3 months daily SEO + AEO + GEO</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" />Everything listed below</span>
                  </div>
                </div>

                <div className="p-6 border-b border-[#3a3858]">
                  <p className="text-xs uppercase tracking-widest text-[#8a87a8] mb-4">What this package normally costs</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-[#c4c0e0]">
                      <span>Custom Next.js website build (1 to 5 pages)</span>
                      <span className="text-[#8a87a8]">$7,500.00</span>
                    </div>
                    <div className="flex justify-between text-[#c4c0e0]">
                      <span>Daily SEO + AEO + GEO optimization x 3 months</span>
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

                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-[#8a87a8] mb-4">After your 3 months</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 bg-[#1e2030] rounded-xl p-4 border border-[#3a3858]">
                      <p className="text-[#f0eef8] font-bold text-xl mb-1">$299<span className="text-sm text-[#8a87a8] font-normal">/month</span></p>
                      <p className="text-xs text-[#8a87a8]">Ongoing daily optimization at partner rate</p>
                      <p className="text-xs text-[#6e6b88] mt-1">(Normal: $699.99/month)</p>
                    </div>
                    <div className="flex-1 bg-[#1e1c35] rounded-xl p-4 border border-[#8734E1]/30">
                      <p className="text-[#c084fc] font-bold text-base mb-1">Lock in for the rest of the year</p>
                      <p className="text-xs text-[#8a87a8]">Pay remaining months upfront at signing or at the end of month 3. Exclusive to partner LOs.</p>
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
                <p className="text-[#a8a4c8]">No templates. No shortcuts. A real site built the way enterprise companies build. Click any item for details.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {INCLUDED_FEATURES.map((f) => (
                  <FeatureCard key={f.label} feature={f} />
                ))}
              </div>

              {/* AI Visibility Stack */}
              <div className="mt-8 bg-gradient-to-br from-[#1e1c35] to-[#252640] border border-[#8734E1]/30 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#8734E1]/20 border border-[#8734E1]/30 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#c084fc]" />
                  </div>
                  <div>
                    <p className="text-[#f0eef8] font-bold">AI Visibility Stack: 3 Months Daily</p>
                    <p className="text-xs text-[#8a87a8]">Not monthly. Not weekly. Daily. Click each to expand.</p>
                  </div>
                </div>
                <div className="space-y-5">
                  {AI_FEATURES.map((f) => (
                    <AIFeatureCard key={f.label} feature={f} />
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
                70-80% of borrowers in finance are using AI to find and vet their next loan officer.
                <span className="gradient-text"> Right now.</span>
              </h2>
              <p className="text-lg text-[#a8a4c8] mb-10 max-w-2xl mx-auto">
                When a borrower types "best mortgage broker in Denver" into ChatGPT, Perplexity, or Google AI Overview,
                someone gets cited. Someone gets called. Someone closes the deal.
                That name should be yours.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  { stat: "200-400%", label: "Typical year-one ROI", sub: "Conservative estimate from organic traffic alone" },
                  { stat: "Month 6", label: "When leads start compounding", sub: "8 to 40 organic leads per month by mid-year" },
                  { stat: "$8-$25", label: "Cost per lead vs paid ads", sub: "After AI visibility stack is established" },
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
                  Bring in your own dev team whenever you want. Full documentation provided.
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
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8734E1]/20 border border-[#8734E1]/40 text-[#c084fc] text-sm font-medium mb-4">
                  <Award className="w-4 h-4" />
                  Partner Exclusive: 25% Off for Life
                </div>
                <h2 className="text-3xl font-bold text-[#f0eef8] mb-3">MarqetCore GrowthPilot</h2>
                <p className="text-[#a8a4c8] max-w-2xl mx-auto">
                  The all-in-one marketing platform with a built-in business operating system.
                  AABOS learns your exact brand DNA, cross-mutates your content for 9 networks, and broadcasts trackable email newsletters on autopilot.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                {/* Screenshot */}
                <Link
                  href="https://marqetcore.com/growth-pilot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="relative rounded-2xl overflow-hidden border border-[#3a3858] group-hover:border-[#8734E1]/50 transition-all shadow-xl shadow-black/40">
                    <Image
                      src="/images/growthpilot-screenshot.png"
                      alt="MarqetCore GrowthPilot"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b2e]/60 to-transparent flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white font-semibold flex items-center gap-2 text-sm">
                        Visit GrowthPilot <ExternalLink className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  <p className="text-center text-xs text-[#6e6b88] mt-2">marqetcore.com/growth-pilot</p>
                </Link>

                {/* Features */}
                <div>
                  <div className="space-y-4 mb-6">
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
                  <div className="bg-[#1e1c35] border border-[#8734E1]/30 rounded-xl p-5">
                    <p className="text-[#f0eef8] font-bold mb-1">Replaces $500/month in tools</p>
                    <p className="text-sm text-[#a8a4c8] mb-4">Buffer, Mailchimp, HubSpot CRM, FreshBooks. Starts at $149.99/month. Your partner price: 25% off, for life.</p>
                    <Link
                      href="https://marqetcore.com/growth-pilot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8734E1] to-[#2F73EE] text-white font-semibold hover:opacity-90 transition-opacity text-sm"
                    >
                      See GrowthPilot <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-20 bg-[#1e2030]">
            <div className="container-custom max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#f0eef8] mb-3">Frequently asked questions</h2>
                <p className="text-[#a8a4c8]">Everything loan officers ask before getting started.</p>
              </div>
              <div className="space-y-3">
                {[
                  {
                    q: "Can you add photos and pictures to my site?",
                    a: "Yes. We include a professional headshot section, team photos, office photos, and any brand imagery you provide. If you do not have professional photos yet, we can use high-quality licensed real estate and finance photography as placeholders and swap them in when you have shots ready."
                  },
                  {
                    q: "Can you copy or rebuild my current website?",
                    a: "Yes. If you have an existing site you like, send us the URL and we will use it as a reference for layout, content, and branding. We rebuild everything from scratch on the new stack so it is faster, more secure, and AI-optimized — you end up with the look you want and the performance you need."
                  },
                  {
                    q: "Will I own the website?",
                    a: "Yes, as long as the build is paid in full. Once payment clears, the GitHub repository, all code, all content, and your domain configuration belong to you. You can take it to any developer at any time. If you leave your parent company, the site goes with you. You are not renting anything."
                  },
                  {
                    q: "How long does the build take?",
                    a: "Most builds are completed in 1 to 3 weeks depending on the current queue and how quickly we receive your content (photos, bio, loan programs, service areas). Simpler single-page builds can launch in under a week. We keep you updated throughout and do not go dark mid-build."
                  },
                  {
                    q: "How long before I start seeing results?",
                    a: "AI citations and search visibility can show movement in as little as 2 to 4 weeks, especially in lower-competition markets. SEO takes a bit longer to compound but most clients see measurable organic lead activity within 60 to 90 days. The daily optimization is cumulative — every week builds on the last."
                  },
                  {
                    q: "Do I need to know how to code or manage the site myself?",
                    a: "No. You log into a simple CMS dashboard to add or edit blog posts, update your bio, and change photos. Everything else is handled. If you want to make layout or design changes, that is a quick request to us. No technical knowledge required."
                  },
                  {
                    q: "What is the difference between SEO, AEO, and GEO?",
                    a: "SEO gets you ranked in Google search results. AEO (Answer Engine Optimization) gets your content selected as the direct answer in AI Overviews, Siri, and voice search. GEO (Generative Engine Optimization) gets your name cited when someone asks ChatGPT, Perplexity, Claude, or Gemini to recommend a loan officer. We do all three, daily."
                  },
                  {
                    q: "Can I keep my existing domain?",
                    a: "Yes. We will configure your new site to work with whatever domain you already have. If you need a new domain, we can help you register one. Domain costs are separate but typically around $15 to $20 per year."
                  },
                  {
                    q: "What do I need to provide to get started?",
                    a: "Your NMLS number, a short bio, your headshot or photos, the loan programs you offer, your service area, and any existing branding (logo, colors). If you do not have some of these, we can work with what you have and fill in the gaps with solid defaults."
                  },
                  {
                    q: "Is the site compliant for mortgage?",
                    a: "Yes. We include NMLS disclosure formatting, Equal Housing Lender badges, state-specific licensing display, rate disclaimer automation, CCPA/GDPR cookie consent, Terms of Service, and Privacy Policy pages. You review everything before launch."
                  },
                  {
                    q: "What happens after my 3 months of included optimization?",
                    a: "You choose. As a partner LO you have access to our ongoing rate of $299 per month (normal rate is $699.99). You can lock that in at signing or at the end of your 3 months. If you want to pay out the remainder of the calendar year upfront, that option is available exclusively to partner program members. No pressure either way."
                  },
                  {
                    q: "Can I add more pages or integrations after launch?",
                    a: "Yes. Additional pages are available separately, and any of the listed add-on integrations (CRM connections, calculators, co-branding pages, etc.) can be added at any time as one-time builds with no monthly fees."
                  },
                  {
                    q: "What if I am not happy with the design?",
                    a: "We do a design review before development starts and two rounds of revision are included. We do not launch anything without your sign-off. In practice, most LOs love the first version because we reference your existing site or comparable examples you like before we write a single line of code."
                  },
                  {
                    q: "Can I use the GrowthPilot 25% discount even if I already have a subscription?",
                    a: "The 25% discount applies to new subscriptions. It must be activated at the time of signing your build agreement or at the end of your 3-month optimization period. It cannot be applied retroactively to an existing account."
                  },
                  {
                    q: "Does this work in my state and market?",
                    a: "Yes. We have built for loan officers across the country. The AI visibility work is tailored to your specific city and state — we optimize for your local search queries, your market's competition level, and the loan programs that matter in your area."
                  },
                ].map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
              </div>
            </div>
          </section>

          {/* CTA */}
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
                  <p className="text-[#a8a4c8]">We will reach out within one business day. Welcome to the program.</p>
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

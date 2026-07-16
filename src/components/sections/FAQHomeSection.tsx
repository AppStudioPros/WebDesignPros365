'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What is the AI Visibility Stack (SEO + AEO + GEO)?',
    answer: 'Our flagship offering combines three disciplines to make your brand visible across every modern search surface. SEO ranks your pages in Google. AEO (Answer Engine Optimization) gets you selected as the direct answer in AI Overviews, voice search, and snippets. GEO (Generative Engine Optimization) makes sure your brand gets cited by ChatGPT, Claude, Gemini, and Perplexity when users ask questions in your domain. Most agencies still only do SEO. We do all three.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity. A Launch package typically takes 4-6 weeks, Growth packages 8-12 weeks, Pro projects 10-16 weeks, and Custom/ACI-Powered engagements 14-24 weeks. We provide detailed timelines during our discovery phase.',
  },
  {
    question: 'What technologies do you use?',
    answer: 'We specialize in modern web technologies: Next.js 16, React 19, TypeScript, Tailwind CSS, and Sanity CMS. For deployment, we use Vercel for edge performance. For AI work, we build on our patented ACI (Adaptive Compound Intelligence) platform, integrating Anthropic Claude and OpenAI with our own audit-trail-complete architecture.',
  },
  {
    question: 'Do you offer ongoing support?',
    answer: 'Yes. Every package includes post-launch support (30 days on Launch, 60 on Growth, 90 on Pro, customized on Custom and ACI-Powered tiers). For ongoing needs, we offer retainer packages starting at $5,000/month that include priority support, updates, performance reporting, and continuous SEO + AEO + GEO optimization.',
  },
  {
    question: 'What is your payment structure?',
    answer: 'We typically work with a 50% deposit to begin, 25% at design approval, and 25% at launch. For larger projects, we can arrange milestone-based payments. Enterprise retainers are billed monthly.',
  },
  {
    question: "Can you work with our existing design team?",
    answer: "Absolutely! We often collaborate with in-house design teams or can work from existing Figma designs. We're flexible and can adapt to your workflow while ensuring technical excellence.",
  },
];

export default function FAQHomeSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-[#181928]/70" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="container-custom relative z-10">
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">
            FAQ
          </div>
          <h2 className="heading-lg mb-4">
            Common <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-[#a8a4c8] max-w-2xl mx-auto">
            Find answers to frequently asked questions about our services and process.
          </p>
        </m.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className="bg-[#252640] border border-[#3a3858] rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#1c1d30] transition-colors"
                >
                  <span className="font-medium text-[#f0eef8] pr-8">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8734E1] transition-transform duration-300 flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5">
                        <p className="text-[#a8a4c8] leading-relaxed">{faq.answer}</p>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}

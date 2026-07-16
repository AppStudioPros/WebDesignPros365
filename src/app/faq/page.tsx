"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CTASection from '@/components/sections/CTASection';
import JsonLd from '@/components/JsonLd';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What technologies do you use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We specialize in Next.js 16, React 19, TypeScript, Tailwind CSS, and Sanity.io for content management. We deploy on Vercel for optimal performance. For AI work, we build on our patented ACI (Adaptive Compound Intelligence) platform."
      }
    },
    {
      "@type": "Question",
      "name": "What is the AI Visibility Stack (SEO + AEO + GEO)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our flagship offering. SEO ranks your pages in Google search results. AEO (Answer Engine Optimization) gets your content selected as the direct answer in Google AI Overviews, voice search, and featured snippets. GEO (Generative Engine Optimization) makes your brand get cited by ChatGPT, Claude, Gemini, and Perplexity when users ask questions in your domain. Most agencies only do SEO. We do all three."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a typical project take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A simple website typically takes 4 to 6 weeks. More complex applications take 8 to 16 weeks. We provide a detailed timeline during the initial consultation."
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide ongoing support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All packages include a support period after launch. We also offer extended support and maintenance plans to keep your website updated, secure, and performing well."
      }
    },
    {
      "@type": "Question",
      "name": "Can you integrate AI features into my website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We specialize in AI integration including custom chatbots, AI-powered content generation, intelligent search, and personalization features built on our ACI platform."
      }
    },
    {
      "@type": "Question",
      "name": "What is your payment structure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We work with a 50% upfront payment and 50% upon completion. For larger projects we can arrange milestone-based payments. We accept bank transfer and credit cards."
      }
    }
  ]
};

const faqs = [
  {
    question: 'What technologies do you use?',
    answer: 'We specialize in modern web technologies including Next.js 16, React 19, TypeScript, Tailwind CSS, and Sanity.io for content management. For deployment, we use Vercel for optimal performance and scalability. For AI work, we build on our patented ACI (Adaptive Compound Intelligence) platform.',
  },
  {
    question: 'What is the AI Visibility Stack (SEO + AEO + GEO)?',
    answer: 'Our flagship offering. SEO ranks your pages in Google search results. AEO (Answer Engine Optimization) gets your content selected as the direct answer in Google AI Overviews, voice search, and featured snippets. GEO (Generative Engine Optimization) makes your brand get cited by ChatGPT, Claude, Gemini, and Perplexity when users ask questions in your domain. Most agencies still only do SEO. We do all three.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity. A simple website typically takes 4-6 weeks, while more complex applications can take 8-16 weeks. We\'ll provide a detailed timeline during our initial consultation.',
  },
  {
    question: 'Do you provide ongoing support?',
    answer: 'Yes! All our packages include a support period. We also offer extended support and maintenance plans to keep your website updated, secure, and performing optimally.',
  },
  {
    question: 'Can you integrate AI features into my website?',
    answer: 'Absolutely! We specialize in AI integration, including custom chatbots, AI-powered content generation, intelligent search, and personalization features. We can discuss your specific needs during our consultation.',
  },
  {
    question: 'What is your payment structure?',
    answer: 'We typically work with a 50% upfront payment and 50% upon completion. For larger projects, we can arrange milestone-based payments. We accept various payment methods including bank transfer and credit cards.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <JsonLd data={faqSchema} />
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f9fc]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">FAQ</Badge>
            <h1 className="heading-xl mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-lg text-[#a8a4c8]">
              Find answers to common questions about our services and process.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section bg-[#252640]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-[#3a3858]"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full py-6 flex items-center justify-between text-left"
                >
                  <span className="text-lg font-medium text-[#f0eef8] pr-8">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8734E1] transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-[#a8a4c8]">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

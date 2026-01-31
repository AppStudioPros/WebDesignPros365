"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CTASection from '@/components/sections/CTASection';

const faqs = [
  {
    question: 'What technologies do you use?',
    answer: 'We specialize in modern web technologies including Next.js 15, TypeScript, Tailwind CSS, and Sanity.io for content management. For deployment, we use Vercel for optimal performance and scalability.',
  },
  {
    question: 'What is GEO (Generative Engine Optimization)?',
    answer: 'GEO is our flagship service that optimizes your website content for AI-powered search engines and LLMs like ChatGPT, Claude, and Google AI. This ensures your content is easily understood and cited by AI assistants.',
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
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f9fc]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">FAQ</Badge>
            <h1 className="heading-xl mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-lg text-gray-600">
              Find answers to common questions about our services and process.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-200"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full py-6 flex items-center justify-between text-left"
                >
                  <span className="text-lg font-medium text-gray-900 pr-8">{faq.question}</span>
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
                      <p className="pb-6 text-gray-600">{faq.answer}</p>
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

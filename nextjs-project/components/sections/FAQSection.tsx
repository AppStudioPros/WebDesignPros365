'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui'

// FAQ data (would come from Sanity in production)
const faqs = [
  {
    question: 'What is GEO (Generative Engine Optimization)?',
    answer: 'GEO is our flagship service that optimizes your website for AI-powered search engines and LLMs like ChatGPT and Claude. As more users turn to AI for answers, GEO ensures your content is discoverable and accurately represented in AI responses.',
    category: 'general',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity. A Starter package typically takes 4-6 weeks, Growth packages 8-12 weeks, and Premium/Enterprise projects 12-20 weeks. We provide detailed timelines during our discovery phase.',
    category: 'process',
  },
  {
    question: 'What technologies do you use?',
    answer: 'We specialize in modern web technologies: Next.js 15, React, TypeScript, Tailwind CSS, and Sanity CMS. For deployment, we use Vercel for edge performance. We also integrate AI tools like OpenAI and custom chatbot solutions.',
    category: 'technical',
  },
  {
    question: 'Do you offer ongoing support?',
    answer: 'Yes! All packages include 30 days of post-launch support. For ongoing needs, we offer retainer packages starting at $3,000/month that include priority support, updates, and continuous optimization.',
    category: 'support',
  },
  {
    question: 'What is your payment structure?',
    answer: 'We typically work with a 50% deposit to begin, 25% at design approval, and 25% at launch. For larger projects, we can arrange milestone-based payments. Enterprise retainers are billed monthly.',
    category: 'pricing',
  },
  {
    question: 'Can you work with our existing design team?',
    answer: 'Absolutely! We often collaborate with in-house design teams or can work from existing Figma designs. We\'re flexible and can adapt to your workflow while ensuring technical excellence.',
    category: 'process',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="section relative overflow-hidden bg-dark-secondary">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="primary" className="mb-4">
            FAQ
          </Badge>
          <h2 className="heading-lg mb-4">
            Common <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Find answers to frequently asked questions about our services and process.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className="glass overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-white pr-8">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-accent transition-transform duration-300 flex-shrink-0 ${
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
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5">
                        <p className="text-white/60 leading-relaxed">{faq.answer}</p>
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
  )
}

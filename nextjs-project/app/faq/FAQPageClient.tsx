'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'
import { Badge, Input, Card } from '@/components/ui'
import { CTASection } from '@/components/sections'

// FAQ data (would come from Sanity in production)
const faqs = [
  {
    question: 'What is GEO (Generative Engine Optimization)?',
    answer: 'GEO is our flagship service that optimizes your website for AI-powered search engines and Large Language Models (LLMs) like ChatGPT, Claude, and Perplexity. As more users turn to AI for information, GEO ensures your content is discoverable, accurately cited, and well-represented in AI-generated responses. This includes implementing LLMs.txt files, semantic markup, and content strategies designed for AI comprehension.',
    category: 'services',
  },
  {
    question: 'How is GEO different from traditional SEO?',
    answer: 'While traditional SEO focuses on search engine rankings and keywords, GEO focuses on how AI systems understand and cite your content. GEO involves structured data for AI, content formatting that AI can easily parse, citation building with authoritative sources, and creating machine-readable guides (LLMs.txt). Both are important - SEO for Google/Bing, GEO for AI assistants.',
    category: 'services',
  },
  {
    question: 'What technologies do you specialize in?',
    answer: 'We specialize in the modern web stack: Next.js 15 (App Router, Server Components, TypeScript), Sanity.io for headless CMS, Tailwind CSS for styling, Framer Motion for animations, and Vercel for edge deployment. We also integrate AI tools like OpenAI for chatbots and automation.',
    category: 'technical',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity: Starter packages typically take 4-6 weeks, Growth packages 8-12 weeks, and Premium/Enterprise projects 12-20 weeks. We provide detailed timelines during our discovery phase. Timeline depends on project scope, feedback cycles, and content delivery.',
    category: 'process',
  },
  {
    question: 'What is your development process?',
    answer: 'We follow a structured 6-step process: 1) Discovery - understanding your goals, 2) Strategy - defining tech stack and roadmap, 3) Design - creating UI/UX, 4) Development - building with modern tech, 5) Testing - rigorous QA, 6) Launch - deployment and handoff. We maintain clear communication throughout.',
    category: 'process',
  },
  {
    question: 'Do you offer ongoing support after launch?',
    answer: 'Yes! All packages include post-launch support: Starter (30 days), Growth (60 days), Premium (90 days). For ongoing needs, we offer retainer packages starting at $3,000/month that include priority support, continuous optimization, and new feature development.',
    category: 'support',
  },
  {
    question: 'What is your payment structure?',
    answer: 'We typically work with a 50% deposit to begin, 25% at design approval, and 25% at launch. For larger projects, we can arrange milestone-based payments. Enterprise retainers are billed monthly. We accept bank transfers and major credit cards.',
    category: 'pricing',
  },
  {
    question: 'Can you work with our existing design team?',
    answer: 'Absolutely! We often collaborate with in-house design teams or work from existing Figma/Sketch designs. We\'re flexible and can adapt to your workflow while ensuring technical excellence in implementation.',
    category: 'process',
  },
  {
    question: 'Do you provide hosting and maintenance?',
    answer: 'We typically deploy to Vercel, which provides excellent hosting with edge caching, automatic HTTPS, and seamless deployments. Hosting costs are separate (usually $20-100/month depending on traffic). We can manage hosting as part of a retainer or hand off credentials.',
    category: 'technical',
  },
  {
    question: 'What is a headless CMS and why should I use one?',
    answer: 'A headless CMS (like Sanity.io) separates content management from the website frontend. This means faster load times, better security, and more flexibility. Your team can edit content without touching code, and the same content can power your website, app, or any other platform.',
    category: 'technical',
  },
  {
    question: 'Can you help with e-commerce?',
    answer: 'Yes! We build e-commerce solutions using Shopify (headless with Storefront API), WooCommerce, or custom solutions. Our Growth and Premium packages include e-commerce capabilities with features like custom checkout, inventory management, and payment processing.',
    category: 'services',
  },
  {
    question: 'What about AI chatbot integration?',
    answer: 'We integrate custom AI chatbots using OpenAI\'s API, trained on your business knowledge base. These can handle customer support, lead qualification, FAQ responses, and more. AI integration is included in our Premium package or available as an add-on.',
    category: 'services',
  },
  {
    question: 'How do you ensure website performance?',
    answer: 'We optimize for Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1), targeting Lighthouse scores of 90+. This includes image optimization, code splitting, edge caching, and efficient rendering strategies with Next.js Server Components.',
    category: 'technical',
  },
  {
    question: 'Do you offer custom quotes?',
    answer: 'Absolutely! Every project is unique. Contact us for a custom quote tailored to your specific requirements, timeline, and goals. We\'ll have a discovery call to understand your needs and provide a detailed proposal.',
    category: 'pricing',
  },
]

const categories = [
  { id: 'all', name: 'All Questions' },
  { id: 'services', name: 'Services' },
  { id: 'process', name: 'Process' },
  { id: 'technical', name: 'Technical' },
  { id: 'pricing', name: 'Pricing' },
  { id: 'support', name: 'Support' },
]

export default function FAQPageClient() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="accent" className="mb-4">
              FAQ
            </Badge>
            <h1 className="heading-xl mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-lg text-white/60">
              Find answers to common questions about our services, process, and pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 sticky top-16 z-30 bg-dark/80 backdrop-blur-xl border-b border-white/10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-accent text-dark'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-4">
            {filteredFaqs.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-white/60">No questions found matching your search.</p>
              </Card>
            ) : (
              filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <Card className="overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3 pr-4">
                        <Badge variant="primary" className="text-xs flex-shrink-0">
                          {categories.find((c) => c.id === faq.category)?.name}
                        </Badge>
                        <span className="font-medium text-white">{faq.question}</span>
                      </div>
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
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}

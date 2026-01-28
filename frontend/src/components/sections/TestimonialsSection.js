import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent, Badge } from '../ui';

const testimonials = [
  {
    content: 'Web Design Pros 365 transformed our online presence. Their expertise in Next.js and performance optimization resulted in a 40% increase in conversions.',
    author: 'Ilona Bower',
    authorTitle: 'CEO',
    company: 'Sculpted Beauty',
    rating: 5,
    color: '#8734E1',
  },
  {
    content: 'The GEO optimization they implemented has positioned us ahead of competitors in AI search results. Truly cutting-edge work!',
    author: 'John Cressey',
    authorTitle: 'Marketing Director',
    company: 'PocketFiler',
    rating: 5,
    color: '#2F73EE',
  },
  {
    content: 'Exceptional attention to detail and technical expertise. They delivered our e-commerce platform ahead of schedule with outstanding results.',
    author: 'Chelsea Johnson',
    authorTitle: 'Founder',
    company: 'Fast Track Solutions',
    rating: 5,
    color: '#f59e0b',
  },
  {
    content: 'Their AI chatbot integration increased our customer support efficiency by 60%. Professional team that truly understands modern web development.',
    author: 'Larry Book',
    authorTitle: 'CTO',
    company: 'Contractor Guardians',
    rating: 5,
    color: '#BF5DE0',
  },
];

const clientLogos = [
  'PocketFiler', 'Contractor Guardians', 'Sculpted', 'Piqsol', 'Fast Track',
  'Arrakis', 'Insight Leader', 'Magnus', 'Crypto KOL', 'PK Page',
];

export default function TestimonialsSection() {
  return (
    <section className="section relative overflow-hidden">
      {/* Semi-transparent overlay - video visible underneath */}
      <div className="absolute inset-0 bg-white/70" />
      {/* Grid pattern on top */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="primary" className="mb-4">Testimonials</Badge>
          <h2 className="heading-lg mb-4">
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See what our clients say about working with Web Design Pros 365.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full p-6 bg-white border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <Quote className="w-10 h-10 mb-4" style={{ color: `${testimonial.color}30` }} />
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-6">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                      style={{ background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}80)` }}
                    >
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">
                        {testimonial.authorTitle}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Client Logos Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 uppercase tracking-wider">Trusted by 50+ companies</p>
          </div>

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="flex animate-marquee">
              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <div
                  key={`${logo}-${index}`}
                  className="flex-shrink-0 mx-8 py-4"
                >
                  <div className="px-6 py-3 rounded-xl bg-[#f8f9fc] border border-gray-200 text-gray-500 font-medium hover:bg-[#f0e6fb] hover:text-[#8734E1] hover:border-[#8734E1] transition-colors">
                    {logo}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CTASection from '@/components/sections/CTASection';

const values = [
  { title: 'Innovation First', description: 'We stay ahead of the curve, adopting cutting-edge technologies like GEO and AI integration before they become mainstream.' },
  { title: 'Client-Centric', description: 'Your success is our success. We work closely with you to understand your needs and deliver tailored solutions.' },
  { title: 'Quality Obsessed', description: "We don't cut corners. Every project undergoes rigorous testing and optimization before launch." },
  { title: 'Transparent Process', description: "Clear communication, honest pricing, and no surprises. You'll always know where your project stands." },
];

const highlights = [
  '2000+ Projects Delivered',
  '98% Client Satisfaction',
  'Next.js 15 & TypeScript',
  'AI & GEO Integration',
  'Sanity CMS Experts',
  'Vercel Deployment',
];

export default function AboutPage() {
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
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">About Us</Badge>
            <h1 className="heading-xl mb-6">
              Building the <span className="gradient-text">Future</span> of Web
            </h1>
            <p className="text-lg text-gray-600">
              We&apos;re a team of passionate developers, designers, and strategists dedicated
              to crafting exceptional digital experiences.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-lg mb-6">Why Choose <span className="gradient-text">Web Design Pros 365</span>?</h2>
              <p className="text-gray-600 mb-6">
                We combine cutting-edge technology with creative excellence to deliver
                websites that not only look stunning but perform exceptionally.
              </p>
              <p className="text-gray-600 mb-8">
                Our team specializes in Next.js, TypeScript, and modern web technologies,
                ensuring your website is fast, secure, and optimized for the future.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
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
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#8734E1] to-[#2F73EE] p-1">
                <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                  <img
                    src="https://customer-assets.emergentagent.com/job_designpros-test/artifacts/tf1dbj7e_Web%20Design%20Pros%20365%20noborder.png"
                    alt="Web Design Pros 365"
                    className="w-2/3"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-[#f8f9fc]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">Our Values</Badge>
            <h2 className="heading-lg">What We <span className="gradient-text">Stand For</span></h2>
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
                  <p className="text-sm text-gray-600">{value.description}</p>
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

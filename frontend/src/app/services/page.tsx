"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Check, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { services } from '@/data/services';
import CTASection from '@/components/sections/CTASection';

const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'development', name: 'Development' },
  { id: 'ai', name: 'AI & Automation' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'geo', name: 'GEO' },
];

function ServiceModal({ service, isOpen, onClose }: { service: typeof services[0] | null; isOpen: boolean; onClose: () => void }) {
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto pointer-events-auto"
            >
              <div
                className="relative p-6 pb-8"
                style={{ background: `linear-gradient(135deg, ${service.color}15, ${service.color}05)` }}
              >
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-start gap-4">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${service.color}20` }}
                  >
                    🚀
                  </div>
                  <div className="flex-1">
                    {service.isFlagship && (
                      <Badge className="mb-2 bg-[#8734E1] text-white">Flagship Service</Badge>
                    )}
                    <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">Typical timeline: {service.timeline}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Overview</h4>
                  <p className="text-gray-700 leading-relaxed">{service.fullDescription}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">What&apos;s Included</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: `${service.color}20` }}
                        >
                          <Check className="w-3 h-3" style={{ color: service.color }} />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Deliverables</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.deliverables.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 rounded-full text-sm font-medium"
                        style={{ backgroundColor: `${service.color}10`, color: service.color }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <Link href="/contact" onClick={onClose}>
                    <Button className="w-full bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] text-white">
                      Get Started
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

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
            <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">Our Services</Badge>
            <h1 className="heading-xl mb-6">
              Comprehensive <span className="gradient-text">Digital Solutions</span>
            </h1>
            <p className="text-lg text-gray-600">
              From cutting-edge AI integration to performance optimization,
              we deliver everything you need to succeed online.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 sticky top-16 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-[#8734E1] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  onClick={() => setSelectedService(service)}
                  className={`h-full p-6 group cursor-pointer hover:shadow-lg hover:border-[#8734E1] transition-all ${
                    service.isFlagship ? 'border-[#8734E1] bg-[#f0e6fb]' : ''
                  }`}
                >
                  <CardContent className="p-0">
                    {service.isFlagship && (
                      <Badge className="mb-4 bg-[#8734E1] text-white">Flagship</Badge>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#8734E1] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{service.shortDescription}</p>
                    <div className="flex items-center text-sm text-[#8734E1] group-hover:gap-2 transition-all">
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection />

      <ServiceModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </>
  );
}

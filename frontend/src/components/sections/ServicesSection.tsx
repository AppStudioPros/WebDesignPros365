"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { services } from '@/data/services';

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

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const displayServices = services.slice(0, 6);

  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-[#f8f9fc]/70" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-[#f0e6fb] text-[#8734E1] border-[#8734E1]">Our Services</Badge>
          <h2 className="heading-lg mb-4">
            What We <span className="gradient-text">Build</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From cutting-edge AI integration to performance optimization,
            we deliver comprehensive digital solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                onClick={() => setSelectedService(service)}
                className={`h-full p-6 group cursor-pointer bg-white border-gray-200 hover:border-[#8734E1]/30 hover:shadow-lg transition-all ${
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <Button variant="outline" size="lg">
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>

      <ServiceModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}

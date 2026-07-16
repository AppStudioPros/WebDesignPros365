"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GlassIcon } from '@/components/ui/glass-icon';
import { services } from '@/data/services';
import { getServiceIcon } from '@/lib/service-icons';

function ServiceModal({ service, isOpen, onClose }: { service: typeof services[0] | null; isOpen: boolean; onClose: () => void }) {
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-xl bg-[#252640] rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto pointer-events-auto"
            >
              <div
                className="relative p-6 pb-8"
                style={{ background: `linear-gradient(135deg, ${service.color}15, ${service.color}05)` }}
              >
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-[#252640]/80 hover:bg-[#252640] text-[#8a87a8] hover:text-[#c4c0e0] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-start gap-4">
                  <GlassIcon Icon={getServiceIcon(service._id)} color={service.color} size="w-16 h-16" iconSize="w-8 h-8" />
                  <div className="flex-1">
                    {service.isFlagship && (
                      <Badge className="mb-2 bg-[#8734E1] text-white">Flagship Service</Badge>
                    )}
                    <h3 className="text-2xl font-bold text-[#f0eef8]">{service.title}</h3>
                    <p className="text-sm text-[#8a87a8] mt-1">Typical timeline: {service.timeline}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-[#8a87a8] uppercase tracking-wider mb-2">Overview</h4>
                  <p className="text-[#c4c0e0] leading-relaxed">{service.fullDescription}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#8a87a8] uppercase tracking-wider mb-3">What&apos;s Included</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: `${service.color}20` }}
                        >
                          <Check className="w-3 h-3" style={{ color: service.color }} />
                        </div>
                        <span className="text-[#c4c0e0]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#8a87a8] uppercase tracking-wider mb-3">Deliverables</h4>
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
                <div className="pt-4 border-t border-[#2e2c48]">
                  <Link href="/contact" onClick={onClose}>
                    <Button className="w-full bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] text-white">
                      Get Started
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </m.div>
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
      <div className="absolute inset-0 bg-[#181928]/70" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="container-custom relative z-10">
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-[#1e1c35] text-[#8734E1] border-[#8734E1]">Our Services</Badge>
          <h2 className="heading-lg mb-4">
            What We <span className="gradient-text">Build</span>
          </h2>
          <p className="text-[#a8a4c8] max-w-2xl mx-auto">
            From modern AI integration to performance optimization,
            we deliver comprehensive digital solutions.
          </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((service, index) => (
            <m.div
              key={service._id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                onClick={() => setSelectedService(service)}
                className={`h-full p-6 group cursor-pointer bg-[#252640] border-[#3a3858] hover:border-[#8734E1]/30 hover:shadow-lg transition-all relative overflow-hidden ${
                  service.isFlagship ? 'border-[#8734E1] bg-[#1e1c35]' : ''
                }`}
              >
                {/* Top accent gradient bar in service color */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: `linear-gradient(90deg, ${service.color}, ${service.color}80)` }}
                />
                <CardContent className="p-0 pt-2 flex flex-col items-center text-center">
                  <div className="flex flex-col items-center mb-4 gap-2">
                    <GlassIcon Icon={getServiceIcon(service._id)} color={service.color} />
                    {service.isFlagship && (
                      <Badge className="bg-[#8734E1] text-white">Flagship</Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-[#f0eef8] mb-2 group-hover:text-[#8734E1] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#a8a4c8] mb-4">{service.shortDescription}</p>
                  <div className="flex items-center justify-center text-sm font-medium group-hover:gap-2 transition-all" style={{ color: service.color }}>
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </m.div>
          ))}
        </div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <Button variant="outline" size="lg">
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </m.div>
      </div>

      <ServiceModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}
